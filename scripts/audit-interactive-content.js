const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
for(const file of ['chapter-catalog.js','interactive-specs.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const source=fs.readFileSync('chapter-lessons.js','utf8');
const supported=new Set(['numberLine','signTable','exponent','factorTree','fractionBar','algebraTiles','balance','coordinate','geometry','data','cell','body','experiment','physics','earth','timeline','sentence','reading','word','text','map','civic']);
const count={};const errors=[];
for(const subjects of Object.values(context.window.CHAPTER_CATALOG)) for(const [subject,terms] of Object.entries(subjects)) for(const rows of Object.values(terms)) for(const [,title] of rows){
  const kind=context.window.INTERACTIVE_SPECS.get(subject,title);
  if(!kind)errors.push(`缺少規格：${subject}:${title}`);
  else if(!supported.has(kind))errors.push(`沒有渲染器：${subject}:${title} (${kind})`);
  else count[`${subject}:${kind}`]=(count[`${subject}:${kind}`]||0)+1;
}
for(const prohibited of ['function visualFlow','math-shape shape-a','data-math-model']) if(source.includes(prohibited)) errors.push(`仍保留禁用通用模型：${prohibited}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('互動教材稽核通過：');
for(const [key,value] of Object.entries(count).sort()) console.log(`- ${key}: ${value} 章`);
