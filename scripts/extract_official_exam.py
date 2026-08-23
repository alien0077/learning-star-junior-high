#!/usr/bin/env python3
"""下載並擷取國中教育會考官方題本，供章節題庫人工核對使用。

不產生或改寫試題；輸出保留官方年度、科目、題本網址與原始文字，
讓後續題目對照可以逐題回到官方來源驗證。
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

from pypdf import PdfReader


ARCHIVE = "https://cap.rcpet.edu.tw/exam/{year}/{year}exam.html"
SUBJECT_LABELS = {
    "國文科": "國文",
    "英語（閱讀）": "英文",
    "數學科": "數學",
    "社會科": "社會",
    "自然科": "自然",
}

# 參考答案表前 21 題依序為：國文、英語閱讀、英語聽力、數學、社會、自然。
# 英聽在第 21 題結束；數學在第 25 題結束、國文在第 42 題結束、
# 英語閱讀在第 43 題結束，因此答案表會隨題號左移，不能以固定欄位讀取。
# 本專案僅將選擇題納入章節練習；非選擇題不因文字擷取不完整而誤收。


def fetch(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (official-exam-indexer)"})
    with urlopen(request, timeout=45) as response:
        return response.read()


def parse_subject_links(page: str) -> dict[str, str]:
    links: dict[str, str] = {}
    for href, label in re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', page, flags=re.I | re.S):
        name = re.sub(r"<[^>]+>", "", html.unescape(label)).strip()
        if name in SUBJECT_LABELS:
            links[SUBJECT_LABELS[name]] = html.unescape(href)
    return links


def parse_answer_link(page: str) -> str | None:
    for href, label in re.findall(r'<a\s+href="([^"]+)"[^>]*>(.*?)</a>', page, flags=re.I | re.S):
        name = re.sub(r"<[^>]+>", "", html.unescape(label)).strip()
        if name == "參考答案":
            return html.unescape(href)
    return None


def google_file_id(url: str) -> str | None:
    match = re.search(r"/d/([^/]+)", url)
    if match:
        return match.group(1)
    return parse_qs(urlparse(url).query).get("id", [None])[0]


def download_pdf(source_url: str) -> bytes:
    file_id = google_file_id(source_url)
    if not file_id:
        raise ValueError(f"找不到 Google Drive 檔案 ID：{source_url}")
    return fetch(f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t")


def extract_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    return "\n".join((page.extract_text() or "") for page in reader.pages)


def normalise_question_text(value: str) -> str:
    """保留原字與選項，只收斂 PDF 擷取時的連續空白。"""
    return "\n".join(re.sub(r"[ \t]+", " ", line).strip() for line in value.splitlines()).strip()


def parse_choice_questions(text: str) -> list[dict[str, object]]:
    """從題本中切出有 A-D 選項的原始選擇題，不嘗試判讀圖片內容。"""
    anchors = [
        re.search(r"第一部分[：:]\s*(?:單題|選擇題).*?\n(?=\s*1\.)", text, flags=re.S),
        re.search(r"一、單題[：:][^\n]*\n(?=\s*1\.)", text),
        re.search(r"聽到.*?翻頁作答.*?\n\s*1\s*\n(?=\s*1\.)", text, flags=re.S),
    ]
    start = next((anchor for anchor in anchors if anchor), None)
    if start is None:
        return []
    end = re.search(r"第二部分[：:]\s*非選擇題", text[start.end():])
    section = text[start.end(): start.end() + end.start()] if end else text[start.end():]
    matches = list(re.finditer(r"(?m)^\s*(\d{1,2})\.\s*", section))
    questions: list[dict[str, object]] = []
    seen: set[int] = set()
    for index, match in enumerate(matches):
        next_start = matches[index + 1].start() if index + 1 < len(matches) else len(section)
        raw = normalise_question_text(section[match.start():next_start])
        # 題組前言、跨頁頁碼或圖號可能被辨識成數字；四選一題至少要有 A-D。
        number = int(match.group(1))
        if number not in seen and all(re.search(rf"\(\s*{choice}\s*\)", raw) for choice in "ABCD"):
            questions.append({"number": number, "raw_text": raw})
            seen.add(number)
    return questions


def parse_answer_key(text: str, subject: str) -> dict[str, str]:
    """擷取官方參考答案表中該科所有選擇題的答案。"""
    # 109 年答案表沒有英語聽力欄；其餘目前已收錄年度的前 21 題有該欄。
    # 必須從實際表頭判斷，不能把某一年度的欄位位置套用到全部年度。
    has_english_listening = "聽力" in "\n".join(text.splitlines()[:12])

    def answer_position(number: int) -> int | None:
        if subject == "國文":
            return 0 if number <= 42 else None
        if subject == "英文":
            return 1 if number <= 43 else None
        if subject == "數學":
            if has_english_listening and number <= 21:
                return 3
            return 2 if number <= 25 else None
        if subject == "社會":
            if has_english_listening and number <= 21:
                return 4
            if number <= 25:
                return 3
            if number <= 42:
                return 2
            if number == 43:
                return 1
            return 0 if number <= 54 else None
        if subject == "自然":
            if has_english_listening and number <= 21:
                return 5
            if number <= 25:
                return 4
            if number <= 42:
                return 3
            if number == 43:
                return 2
            return 1 if number <= 50 else None
        return None

    answers: dict[str, str] = {}
    lines = text.splitlines()
    for line_index, line in enumerate(lines):
        tokens = re.findall(r"[A-D]|\d+", line)
        if not tokens or not tokens[0].isdigit():
            continue
        number = int(tokens[0])
        position = answer_position(number)
        if position is None:
            continue
        values = [token for token in tokens[1:] if token in "ABCD"]
        # PDF 的最末欄有時會被拆到下一行；延續到下一題題號前，
        # 且只補到目前科目所需欄位為止。
        if len(values) <= position:
            for continuation in lines[line_index + 1:line_index + 5]:
                if re.search(r"\d", continuation):
                    break
                values.extend(re.findall(r"[A-D]", continuation))
                if len(values) > position:
                    break
        if len(values) > position:
            answers[str(number)] = values[position]
    return answers


def index_choice_questions(questions: list[dict[str, object]], answer_key: dict[str, str]) -> list[dict[str, object]]:
    """補上答案與視覺審查旗標；未取得官方答案者不列為可收錄候選題。"""
    indexed: list[dict[str, object]] = []
    for question in questions:
        number = str(question["number"])
        answer = answer_key.get(number)
        if not answer:
            continue
        raw_text = str(question["raw_text"])
        requires_visual_review = bool(re.search(r"(?:如圖|下圖|右圖|左圖|附圖|圖\s*[（(]|表\s*[（(])", raw_text))
        indexed.append({
            **question,
            "answer": answer,
            "requires_visual_review": requires_visual_review,
            "candidate_status": "needs_visual_review" if requires_visual_review else "text_ready",
        })
    return indexed


def main() -> int:
    parser = argparse.ArgumentParser(description="擷取國中教育會考官方題本原文與來源。")
    parser.add_argument("--years", type=int, nargs="+", default=[114, 115])
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--cache-dir", type=Path, default=Path("/private/tmp/official-exam-pdfs"))
    args = parser.parse_args()
    args.cache_dir.mkdir(parents=True, exist_ok=True)
    records = []

    for year in args.years:
        archive_url = ARCHIVE.format(year=year)
        page = fetch(archive_url).decode("utf-8", errors="replace")
        links = parse_subject_links(page)
        answer_url = parse_answer_link(page)
        answer_text = ""
        if answer_url:
            answer_path = args.cache_dir / f"{year}-參考答案.pdf"
            if not answer_path.exists():
                answer_path.write_bytes(download_pdf(answer_url))
            answer_text = extract_text(answer_path)
        missing = sorted(set(SUBJECT_LABELS.values()) - set(links))
        if missing:
            print(f"{year} 年缺少科目：{', '.join(missing)}", file=sys.stderr)
        for subject, source_url in links.items():
            pdf_path = args.cache_dir / f"{year}-{subject}.pdf"
            if not pdf_path.exists():
                pdf_path.write_bytes(download_pdf(source_url))
                time.sleep(0.5)
            source_text = extract_text(pdf_path)
            answer_key = parse_answer_key(answer_text, subject)
            choice_questions = index_choice_questions(parse_choice_questions(source_text), answer_key)
            records.append({
                "year": year,
                "subject": subject,
                "archive_url": archive_url,
                "source_url": source_url,
                "text": source_text,
                "answer_url": answer_url,
                "answer_text": answer_text,
                "choice_questions": choice_questions,
                "text_ready_question_count": sum(not question["requires_visual_review"] for question in choice_questions),
                "answer_key": answer_key,
            })
            print(f"已擷取：{year} {subject}", file=sys.stderr)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"輸出 {len(records)} 份官方題本至 {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
