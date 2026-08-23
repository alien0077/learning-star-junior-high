#!/usr/bin/env python3
"""教育會考答案表欄位解析的迴歸測試。"""

from extract_official_exam import parse_answer_key


WITH_LISTENING = """答案 科目 國文 英語 閱讀 英語 聽力 數學 社會 自然
1 A B C D A B
21 B C D A B C
22 C D A B C
25 D A B C D
26 A B C D
42 B C D A
43 C D A
44 B C
"""

WITHOUT_LISTENING = """答案 科目 國文 英語 閱讀 數學 社會 自然
1 A B C D A
21 B C D A B
22 C D A B C
25 D A B C D
26 A B C D
42 B C D A
43 C D A
44 B C
"""


def check(text: str, expected: dict[str, dict[str, str]]) -> None:
    for subject, answers in expected.items():
        actual = parse_answer_key(text, subject)
        for number, answer in answers.items():
            assert actual[number] == answer, (subject, number, actual.get(number), answer)


check(WITH_LISTENING, {
    "數學": {"1": "D", "21": "A", "22": "A", "25": "B"},
    "社會": {"1": "A", "21": "B", "22": "B", "25": "C", "26": "C", "43": "D", "44": "B"},
    "自然": {"1": "B", "21": "C", "22": "C", "25": "D", "26": "D", "42": "A", "43": "A", "44": "C"},
})
check(WITHOUT_LISTENING, {
    "數學": {"1": "C", "21": "D", "22": "A", "25": "B"},
    "社會": {"1": "D", "21": "A", "22": "B", "25": "C", "26": "C", "43": "D", "44": "B"},
    "自然": {"1": "A", "21": "B", "22": "C", "25": "D", "26": "D", "42": "A", "43": "A", "44": "C"},
})
print("通過：教育會考答案表含／不含英聽欄位的解析皆正確。")
