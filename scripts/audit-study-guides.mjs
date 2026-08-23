#!/usr/bin/env node
/*
 * 課程重點完整性閘門：依網站實際載入順序建立目錄與學習指南，
 * 確保每個顯示章節都有至少六個不重複的可學習重點。
 */
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = file => fs.readFileSync(new URL(file, root), 'utf8');
const context = { window: {} };
vm.createContext(context);

for (const file of [
  'chapter-catalog.js',
  'chapter-study-guides.js',
  'chapter-study-guides-language.js',
  'chapter-study-guides-chinese.js',
  'chapter-study-guides-social.js',
  'chapter-study-guides-expansion.js',
  'kangxuan-115-grade7-chinese.js',
  'nani-115-grade7-english.js',
  'hanlin-115-grade7-math.js',
  'hanlin-115-grade7-natural.js',
  'hanlin-115-grade8-math.js',
  'hanlin-115-grade9-math.js'
]) vm.runInContext(read(file), context, { filename: file });

const errors = [];
let total = 0;
const duplicateTitles = new Map();
for (const [grade, subjects] of Object.entries(context.window.CHAPTER_CATALOG || {})) {
  for (const [subject, semesters] of Object.entries(subjects)) {
    for (const [semester, chapters] of Object.entries(semesters)) {
      for (const [, title] of chapters) {
        total += 1;
        const duplicateKey = `${subject}|${title}`;
        duplicateTitles.set(duplicateKey, [...(duplicateTitles.get(duplicateKey) || []), { grade, title }]);
        const points = context.window.getChapterStudyGuide?.(grade, subject, title)
          || context.window.CHAPTER_STUDY_GUIDES?.[subject]?.[title];
        const unique = Array.isArray(points) ? new Set(points.map(point => point.trim())).size : 0;
        if (!Array.isArray(points) || unique < 6) {
          errors.push(`${grade}:${subject}:${semester}:${title}：需要至少 6 個不重複重點，目前 ${unique}`);
        }
      }
    }
  }
}

// 同科同名但跨年級的單元，不能共用最後載入者的內容。
for (const [key, rows] of duplicateTitles) {
  if (rows.length < 2) continue;
  const [subject, title] = key.split('|');
  const gradeGuides = rows.map(({ grade }) => context.window.CHAPTER_STUDY_GUIDES_BY_GRADE?.[grade]?.[subject]?.[title]);
  if (gradeGuides.some(points => !Array.isArray(points) || points.length < 6)) {
    errors.push(`${key}：跨年級同名章節缺少年級隔離的教材重點`);
  } else if (gradeGuides.every(points => JSON.stringify(points) === JSON.stringify(gradeGuides[0]))) {
    errors.push(`${key}：跨年級同名章節內容完全相同，疑似覆蓋或共用模板`);
  }
}

// 已逐節校對的翰林教材，重點數要隨實際子題增減，不能退化成全數固定六點模板。
const verifiedSeries = [[7, '數學'], [7, '自然'], [8, '數學'], [9, '數學']];
for (const [grade, subject] of verifiedSeries) for (const semester of ['上', '下']) {
  const chapters = context.window.CHAPTER_CATALOG?.[grade]?.[subject]?.[semester] || [];
  const pointsFor = title => context.window.getChapterStudyGuide?.(grade, subject, title)
    || context.window.CHAPTER_STUDY_GUIDES?.[subject]?.[title];
  const counts = chapters.map(([, title]) => pointsFor(title)?.length || 0);
  const tooShort = chapters.filter(([, title]) => (pointsFor(title)?.length || 0) < 7);
  if (tooShort.length) errors.push(`${grade}:${subject}:${semester}：${tooShort.map(([, title]) => title).join('、')} 未補足至少 7 個依子題拆分的重點`);
  if (new Set(counts).size < 2) errors.push(`${grade}:${subject}:${semester}：所有章節重點數相同，疑似回退為固定模板`);
}

if (errors.length) {
  console.error(`課程重點稽核未通過：${errors.length}/${total} 章不足。`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`通過：${total}/${total} 章皆至少有 6 個不重複重點。`);
}
