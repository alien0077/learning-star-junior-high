/* 將已核對的公開筆記檢索紀錄轉成前端可讀的來源表。 */
import fs from 'node:fs';

const records = JSON.parse(fs.readFileSync('chapter-note-research.json', 'utf8'));
const sources = {};
for (const entry of Object.values(records)) {
  if (!entry.note || entry.note.matchScore < 0.5) continue;
  (sources[entry.subject] ||= {})[entry.title] = {
    title: entry.note.title,
    url: entry.note.url,
    searchedAt: entry.checkedAt
  };
}
const body = `/* 由 scripts/research-clearnote-sources.mjs 產生；只含公開筆記標題與連結。 */\nwindow.CHAPTER_NOTE_SOURCES = ${JSON.stringify(sources, null, 2)};\n`;
fs.writeFileSync('chapter-note-sources.js', body);
const count = Object.values(sources).reduce((total, subject) => total + Object.keys(subject).length, 0);
console.log(`已建立 ${count} 筆高關聯公開筆記來源。`);
