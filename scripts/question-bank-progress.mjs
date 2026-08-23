#!/usr/bin/env node
/* 題庫補題進度：只把剛好 10 題且通過來源欄位審核的章節列為完成。 */
import fs from 'node:fs';
import vm from 'node:vm';

const read = name => fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(read('chapter-catalog.js'), context);
vm.runInContext(read('kangxuan-115-grade7-chinese.js'), context);
vm.runInContext(read('nani-115-grade7-english.js'), context);
vm.runInContext(read('hanlin-115-grade7-math.js'), context);
vm.runInContext(read('hanlin-115-grade7-natural.js'), context);
vm.runInContext(read('hanlin-115-grade8-math.js'), context);
vm.runInContext(read('hanlin-115-grade9-math.js'), context);
vm.runInContext(read('chapter-question-bank.js'), context);

const approved = row => {
  const base = row?.reviewStatus === 'approved' && row.sourceTextVerified === true &&
    row.visualDependency === false && /^https:\/\//.test(row.sourceUrl || '') &&
    /^https:\/\//.test(row.sourceAnswerUrl || '');
  if (!base) return false;
  if (row.responseType === 'short-answer') return typeof row.answer === 'string' && row.answer.length > 0 && row.sourceAnswer === row.answer;
  return Array.isArray(row.answers) && Number.isInteger(row.correct) && row.sourceAnswer === String.fromCharCode(65 + row.correct);
};
const counts = new Map();
for (const [grade, subjects] of Object.entries(context.window.CHAPTER_CATALOG)) {
  for (const [subject, terms] of Object.entries(subjects)) {
    for (const rows of Object.values(terms)) for (const [, title] of rows) {
      const key = `${grade}:${subject}:${title}`;
      const questions = context.window.CHAPTER_QUESTION_BANK?.[key];
      const done = Array.isArray(questions) && questions.length === 10 && questions.every(approved);
      const group = `${grade} 年級 ${subject}`;
      const current = counts.get(group) || { done: 0, total: 0 };
      current.total += 1;
      current.done += Number(done);
      counts.set(group, current);
    }
  }
}
let done = 0, total = 0;
for (const [group, count] of counts) {
  done += count.done; total += count.total;
  console.log(`${group}：${count.done}/${count.total}`);
}
console.log(`總計：${done}/${total} 章完成（${done * 10}/${total * 10} 題）`);
