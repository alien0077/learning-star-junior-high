#!/usr/bin/env node
/* 成功國中 115 學年度選書表的防呆稽核。 */
import fs from 'node:fs';
import vm from 'node:vm';

const read = name => fs.readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(read('chengkung-115-textbook-editions.js'), context, { filename: 'chengkung-115-textbook-editions.js' });

const expected = {
  7: { 國文:'康軒', 英文:'南一', 數學:'翰林', 自然:'翰林', 社會:'康軒' },
  8: { 國文:'康軒', 英文:'康軒', 數學:'翰林', 自然:'康軒', 社會:'康軒' },
  9: { 國文:'康軒', 英文:'翰林', 數學:'翰林', 自然:'南一', 社會:'康軒' }
};
const actual = context.window.SCHOOL_115_TEXTBOOK_EDITIONS;
const errors = [];
for (const [grade, subjects] of Object.entries(expected)) {
  for (const [subject, publisher] of Object.entries(subjects)) {
    if (actual?.[grade]?.[subject] !== publisher) errors.push(`${grade} 年級${subject}應為${publisher}版，目前為${actual?.[grade]?.[subject] || '未設定'}。`);
  }
}
if (!/^https:\/\//.test(context.window.SCHOOL_115_TEXTBOOK_SOURCE?.source || '')) errors.push('缺少成功國中選書公告來源。');

if (errors.length) {
  console.error(`教科書版本稽核未通過：${errors.length} 項。`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('通過：成功國中 115 學年度五科、三年級出版社均與官方決選表一致。');
}
