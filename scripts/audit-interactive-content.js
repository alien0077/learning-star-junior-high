const fs=require('fs');
const vm=require('vm');
const context={window:{}};
vm.createContext(context);
for(const file of ['chapter-catalog.js','interactive-specs.js']) vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
const source=fs.readFileSync('chapter-lessons.js','utf8');
const supported=new Set(['numberLine','signTable','exponent','factorTree','fractionBar','algebraTiles','balance','coordinate','geometry','data','cell','body','experiment','physics','earth','timeline','sentence','reading','word','text','map','civic']);
const count={};const errors=[];
/* 這份白名單只能放「操作會重算／重畫核心模型」的章節；類型覆蓋不算完成。 */
const realInteraction=new Set([
  '數學:正負數與絕對值','數學:整數的加減','數學:整數的乘除','數學:指數律','數學:科學記號','數學:質因數分解','數學:最大公因數與最小公倍數','數學:分數的加減','數學:分數的乘除','數學:式子的運算','數學:多項式運算','數學:乘法公式','數學:直角坐標平面','數學:二元一次方程式的圖形','數學:二元一次方程式圖形','數學:比例式','數學:正比與反比','數學:比例與函數','數學:二次函數','數學:二次函數應用','數學:平方根','數學:畢氏定理','數學:相似形','數學:圓','數學:三角比','數學:生活測量','數學:統計圖表','數學:統計與資料判讀','數學:機率','數學:機率模型',
  '自然:食物中的養分','自然:酵素與消化','自然:動物如何獲得養分','自然:植物的運輸構造','自然:神經系統與反應','自然:內分泌與恆定','自然:體溫與水分恆定','自然:生殖的基礎','自然:遺傳與基因','自然:演化與分類','自然:生態系與能量流動','自然:神經與恆定','自然:遺傳與演化',
  '自然:探究自然的方法','自然:基本測量','自然:物質與密度','自然:化學反應','自然:酸鹼與指示劑','自然:酸鹼鹽','自然:化學反應速率','自然:聲音與波動','自然:光與色彩','自然:溫度與熱','自然:力與運動','自然:壓力、浮力與機械','自然:電與能量','自然:電流與磁場','自然:能源轉換','自然:板塊與地質','自然:天文與永續',
  '數學:解一元一次方程式','數學:一元一次方程式應用','數學:二元一次方程式','數學:二元一次聯立方程式','數學:聯立方程式應用','數學:一元二次方程式','數學:一元一次不等式','自然:生命現象與生物圈','自然:細胞的構造','自然:物質進出細胞','自然:生物體的組成層次',
  '自然:植物如何製造養分','自然:動物的血液循環','社會:臺灣的自然環境'
]);
const incomplete=[];
for(const subjects of Object.values(context.window.CHAPTER_CATALOG)) for(const [subject,terms] of Object.entries(subjects)) for(const rows of Object.values(terms)) for(const [,title] of rows){
  const kind=context.window.INTERACTIVE_SPECS.get(subject,title);
  if(!kind)errors.push(`缺少規格：${subject}:${title}`);
  else if(!supported.has(kind))errors.push(`沒有渲染器：${subject}:${title} (${kind})`);
  else count[`${subject}:${kind}`]=(count[`${subject}:${kind}`]||0)+1;
  // 不能因為「同科同類型有一個 renderer」就視為完成。語文與社會的
  // 每一節都必須在專屬情境資料中有明確條目，且有對應的事件處理器；
  // 其他科目則維持逐節人工審核白名單。這是結構契約，不替代瀏覽器實測。
  const scenarioEntry=source.includes(`'${title}':[`) && (
    (subject==='英文'&&source.includes('const englishScenarios')) ||
    (subject==='國文'&&source.includes('const chineseScenarios')) ||
    (subject==='社會'&&source.includes('const socialScenarios'))
  );
  const handlerExists=(subject==='英文'&&source.includes('data-english-choice'))||(subject==='國文'&&source.includes('data-chinese-choice'))||(subject==='社會'&&source.includes('data-social-choice'));
  if(!realInteraction.has(`${subject}:${title}`)&&!(scenarioEntry&&handlerExists)) incomplete.push(`${subject}:${title}（${kind}）`);
}
for(const prohibited of ['function visualFlow','math-shape shape-a','data-math-model']) if(source.includes(prohibited)) errors.push(`仍保留禁用通用模型：${prohibited}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`章節類型覆蓋：${Object.values(count).reduce((sum,value)=>sum+value,0)} 節。`);
console.log(`逐節互動結構契約通過：${Object.values(count).reduce((sum,value)=>sum+value,0)-incomplete.length} 節。`);
for(const [key,value] of Object.entries(count).sort()) console.log(`- ${key}: ${value} 章`);
if(incomplete.length){
  console.error(`\n未達實質互動標準：${incomplete.length} 節。`);
  console.error(incomplete.join('\n'));
  process.exit(2);
}
