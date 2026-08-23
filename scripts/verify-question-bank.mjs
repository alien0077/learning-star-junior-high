#!/usr/bin/env node
/*
 * 題庫品質閘門：每一章只能收錄可回溯的外部考題，不能以站內模板題補數。
 * 題庫資料檔載入後必須提供 window.CHAPTER_QUESTION_BANK。
 */
import fs from 'node:fs';
import vm from 'node:vm';

const read = name => fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(read('chapter-catalog.js'), context, { filename: 'chapter-catalog.js' });
vm.runInContext(read('kangxuan-115-grade7-chinese.js'), context, { filename: 'kangxuan-115-grade7-chinese.js' });
vm.runInContext(read('nani-115-grade7-english.js'), context, { filename: 'nani-115-grade7-english.js' });
vm.runInContext(read('hanlin-115-grade7-math.js'), context, { filename: 'hanlin-115-grade7-math.js' });
vm.runInContext(read('hanlin-115-grade7-natural.js'), context, { filename: 'hanlin-115-grade7-natural.js' });
vm.runInContext(read('hanlin-115-grade8-math.js'), context, { filename: 'hanlin-115-grade8-math.js' });
vm.runInContext(read('hanlin-115-grade9-math.js'), context, { filename: 'hanlin-115-grade9-math.js' });
vm.runInContext(read('chapter-question-bank.js'), context, { filename: 'chapter-question-bank.js' });

const chapters = [];
for (const [grade, subjects] of Object.entries(context.window.CHAPTER_CATALOG)) {
  for (const [subject, terms] of Object.entries(subjects)) {
    for (const rows of Object.values(terms)) {
      for (const [, title] of rows) chapters.push(`${grade}:${subject}:${title}`);
    }
  }
}

const allowedOrigins = new Set(['國中教育會考官方題本', '公立國中正式段考題本']);
const bank = context.window.CHAPTER_QUESTION_BANK || {};
const errors = [];
for (const key of chapters) {
  const questions = bank[key];
  if (!Array.isArray(questions) || questions.length !== 10) {
    errors.push(`${key}：需要剛好 10 題可追溯考題，目前 ${Array.isArray(questions) ? questions.length : 0} 題`);
    continue;
  }
  questions.forEach((question, index) => {
    const label = `${key} 第 ${index + 1} 題`;
    if (!allowedOrigins.has(question.origin)) errors.push(`${label}：來源必須是官方會考或公立國中正式段考題本`);
    if (!/^https:\/\//.test(question.sourceUrl || '')) errors.push(`${label}：缺少 https 題本來源連結`);
    if (!/^https:\/\//.test(question.sourceAnswerUrl || '')) errors.push(`${label}：缺少 https 答案來源連結`);
    if (!Number.isInteger(question.questionNumber) || question.questionNumber < 1) errors.push(`${label}：缺少原題題號`);
    if (!Array.isArray(question.tags) || !question.tags.includes(key.split(':').at(-1))) errors.push(`${label}：沒有標示對應章節考點`);
    if (question.adapted === true || question.generated === true) errors.push(`${label}：不得使用改寫或自創題目`);
    if (typeof question.screening !== 'string' || question.screening.length < 12) errors.push(`${label}：缺少篩選理由`);
    if (typeof question.question !== 'string' || question.question.length < 8) errors.push(`${label}：缺少原題題幹`);
    const isShortAnswer = question.responseType === 'short-answer';
    if (isShortAnswer) {
      if (typeof question.answer !== 'string' || question.answer.trim().length < 1) errors.push(`${label}：短答題缺少原題答案`);
      if (question.sourceAnswer !== question.answer) errors.push(`${label}：來源答案與短答答案不一致`);
    } else {
      if (!Array.isArray(question.answers) || question.answers.length < 2) errors.push(`${label}：缺少原題選項`);
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= (question.answers || []).length) errors.push(`${label}：答案索引不正確`);
    }
    if (question.sourceTextVerified !== true) errors.push(`${label}：尚未逐字核對題幹與選項`);
    if (question.visualDependency !== false) errors.push(`${label}：圖片／表格相依題尚未完成可呈現性核對`);
    if (question.reviewStatus !== 'approved') errors.push(`${label}：尚未通過章節與答案人工複核`);
    if (!isShortAnswer) {
      const answerLetter = Number.isInteger(question.correct) ? String.fromCharCode(65 + question.correct) : '';
      if (question.sourceAnswer !== answerLetter) errors.push(`${label}：來源答案與本站正確選項不一致`);
    }
  });
}

if (errors.length) {
  console.error(`題庫尚未通過：${errors.length} 項問題`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`通過：${chapters.length} 章、${chapters.length * 10} 題，全部具來源與章節篩選紀錄。`);
}
