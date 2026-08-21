/*
 * 針對課程目錄逐節查詢 Clearnote 的公開國中筆記。
 * 僅保存公開筆記的標題、連結與檢索關聯分數，不下載或轉載筆記圖片、正文。
 * 可安全重跑；已成功紀錄的章節會跳過，失敗項目會在下次繼續查。
 */
import fs from 'node:fs';
import vm from 'node:vm';
import https from 'node:https';
import zlib from 'node:zlib';

const root = new URL('..', import.meta.url);
const at = name => new URL(name, root);
const catalogContext = { window: {} };
vm.createContext(catalogContext);
vm.runInContext(fs.readFileSync(at('chapter-catalog.js'), 'utf8'), catalogContext);

const output = at('chapter-note-research.json');
const existing = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, 'utf8')) : {};
const entries = [];
for (const [grade, subjects] of Object.entries(catalogContext.window.CHAPTER_CATALOG)) {
  for (const [subject, terms] of Object.entries(subjects)) {
    for (const chapters of Object.values(terms)) {
      for (const [, title] of chapters) entries.push({ grade, subject, title });
    }
  }
}

const decode = text => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const plain = html => decode(html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
const termsFor = title => title.replace(/[、，／－—\-（）()：:]/g, ' ').split(/\s+/).filter(word => word.length >= 2);
const score = (title, candidate) => {
  const terms = termsFor(title);
  if (!terms.length) return 0;
  return terms.filter(term => candidate.includes(term)).length / terms.length;
};
const request = url => new Promise((resolve, reject) => {
  const req = https.get(url, { headers: { 'user-agent': 'Mozilla/5.0 LearningStarContentAudit/1.0', 'accept-encoding': 'gzip, deflate, br' } }, res => {
    const chunks = [];
    res.on('data', chunk => chunks.push(chunk));
    res.on('end', () => {
      const body = Buffer.concat(chunks);
      const finish = buffer => resolve(buffer.toString('utf8'));
      const encoding = String(res.headers['content-encoding'] || '').toLowerCase();
      if (encoding.includes('gzip')) zlib.gunzip(body, (error, buffer) => error ? reject(error) : finish(buffer));
      else if (encoding.includes('deflate')) zlib.inflate(body, (error, buffer) => error ? reject(error) : finish(buffer));
      else finish(body);
    });
  });
  req.setTimeout(25000, () => req.destroy(new Error('request timeout')));
  req.on('error', reject);
});
const search = async entry => {
  const query = `${entry.subject} ${entry.title}`;
  const url = `https://www.clearnotebooks.com/zh-TW/notebooks/grade/junior-high?q=${encodeURIComponent(query)}`;
  const html = await request(url);
  const matches = [...html.matchAll(/<a class="" data-id="(\d+)"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
    .map(match => ({ id: match[1], title: plain(match[3]) }))
    .filter(item => item.title);
  const candidates = [...new Map(matches.map(item => [item.id, item])).values()];
  const best = candidates.map(item => ({ ...item, score: score(entry.title, item.title) })).sort((a, b) => b.score - a.score)[0];
  return {
    subject: entry.subject,
    title: entry.title,
    grade: Number(entry.grade),
    searchUrl: url,
    note: best ? { title: best.title, url: `https://www.clearnotebooks.com/zh-TW/notebooks/${best.id}`, matchScore: best.score } : null,
    checkedAt: new Date().toISOString()
  };
};
const key = entry => `${entry.grade}|${entry.subject}|${entry.title}`;
const pending = entries.filter(entry => !existing[key(entry)]?.note && !existing[key(entry)]?.failed);
const parallel = 5;
let completed = 0;
const save = () => fs.writeFileSync(output, `${JSON.stringify(existing, null, 2)}\n`);
async function worker() {
  while (pending.length) {
    const entry = pending.shift();
    try { existing[key(entry)] = await search(entry); }
    catch (error) { existing[key(entry)] = { ...entry, failed: String(error.message || error), checkedAt: new Date().toISOString() }; }
    completed += 1;
    save();
    process.stdout.write(`已查 ${completed}/${pending.length + completed}：${entry.subject}／${entry.title}\n`);
  }
}
await Promise.all(Array.from({ length: Math.min(parallel, pending.length) }, worker));
save();
const researched = Object.values(existing).filter(item => item.note);
const related = researched.filter(item => item.note.matchScore >= 0.5);
console.log(JSON.stringify({ chapters: entries.length, researched: researched.length, related: related.length, failed: Object.values(existing).filter(item => item.failed).length }, null, 2));
