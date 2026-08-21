const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
for(const file of ['chapter-catalog.js','interactive-specs.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const missing=[]; let chapters=0;
for(const subjects of Object.values(context.window.CHAPTER_CATALOG)){
  for(const [subject,terms] of Object.entries(subjects)){
    for(const rows of Object.values(terms)) for(const [,title] of rows){
      chapters+=1;
      if(!context.window.INTERACTIVE_SPECS.get(subject,title)) missing.push(`${subject}:${title}`);
    }
  }
}
if(missing.length){console.error(`缺少互動模型規格：\n${missing.join('\n')}`);process.exit(1);}
console.log(`互動模型規格覆蓋完成：${chapters} 個章節。`);
