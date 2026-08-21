/* 每一個章節頁都帶有該學科的互動工作臺與原創整理筆記。 */
(() => {
  const app = document.querySelector('#app'); if (!app) return;
  const subjectAdvice = {
    數學:{method:'先把條件放到數線、圖或式子，再逐步運算；每一步保留理由。',trap:'不要只看數字外觀或直接移項；先確認符號、單位與基準。',mode:'數量與關係圖'},
    自然:{method:'先圈出改變、控制、量測三種變因，再用模型說因果。',trap:'現象是證據，不等於原因；不要把一次觀察當成完整結論。',mode:'科學因果流程'},
    英文:{method:'先看句子想表達的時間、人物和任務，再選結構與字詞。',trap:'不能只看單一熟悉單字；要把整句與情境一起讀。',mode:'句子情境組裝'},
    國文:{method:'先抓句子或段落的中心，再找能支持它的詞句與表達效果。',trap:'不要把修辭名稱當答案；還要說明它如何影響意思或語氣。',mode:'文本證據連線'},
    社會:{method:'先定位時間、地點、角色，再連結制度、環境與影響。',trap:'不能只背名詞年份；必須回答背景、事件與改變的關係。',mode:'時間空間因果圖'}
  };
  const q=(s,r=document)=>r.querySelector(s);
  const sourceGuide={
    數學:['公開學生筆記常用「數線、符號表、因數樹、面積模型」整理數學；本站將它們改寫為可操作模型與原創題目。','https://www.clearnotebooks.com/zh-TW/notebooks/2307671'],
    國文:['公開筆記常以注釋、句意重組與主張—證據框架協助閱讀；本站以原創文本與判讀流程呈現，不轉載筆記內容。','https://www.clearnotebooks.com/zh-TW/notebooks/2446570'],
    英文:['公開筆記常把時態畫成時間線、將句型拆成結構；本站以原創例句與互動結構圖重新編寫。','https://www.clearnotebooks.com/zh-TW/notebooks/2017113'],
    自然:['公開筆記常以流程圖、比較表整理生物、理化與地科；本站以因果模型、實驗變因與原創檢核題重新編寫。','https://www.clearnotebooks.com/zh-TW/notebooks/grade/junior-high/subject/science'],
    社會:['公開會考整理常以地圖、年表、制度關係與案例表格組織資料；本站以原創事件鏈與讀圖流程重編。','https://www.clearnotebooks.com/zh-TW/notebooks/1698681']
  };
  const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function flowParts(text){return String(text).split(/\s*(?:→|↔|＋)\s*/).filter(Boolean).slice(0,5);}
  function visualFlow(title, text, type='flow'){
    const parts=flowParts(text); const count=Math.max(parts.length,2);
    const nodes=parts.map((part,index)=>`<button type="button" class="visual-node ${index===0?'is-active':''}" data-visual-node="${index}" aria-label="操作第 ${index+1} 個概念：${esc(part)}"><span>${index+1}</span><strong>${esc(part)}</strong></button>`).join('');
    return `<div class="interactive-visual ${type}" data-visual data-title="${esc(title)}"><div class="visual-instruction">點選節點，讓關係一步一步亮起</div><div class="visual-track" style="--node-count:${count}">${nodes}</div><div class="visual-status" data-visual-status>從「${esc(parts[0]||title)}」開始：先指出它在這一節扮演的角色。</div></div>`;
  }
  function absoluteValueLab(){
    return `<div class="interactive-visual absolute-lab" data-absolute-lab><div class="visual-instruction">拖曳 x：位置在 0 的哪一側？距離又是多少？</div><label class="visual-slider-label">x 的位置 <input type="range" min="-8" max="8" value="-4" step="1" data-absolute-slider><output data-absolute-output>x = −4</output></label><svg class="absolute-svg" data-absolute-svg viewBox="0 0 640 180" role="img" aria-label="可調整的數線與絕對值距離圖"></svg><div class="visual-status" data-absolute-readout>−4 在 0 的左邊；從 0 到 −4 有 4 格，所以 |−4| = 4。</div></div>`;
  }
  function renderAbsolute(lab){
    const input=q('[data-absolute-slider]',lab); if(!input)return;
    const value=Number(input.value), abs=Math.abs(value), svg=q('[data-absolute-svg]',lab), output=q('[data-absolute-output]',lab), readout=q('[data-absolute-readout]',lab);
    const left=54, width=532, zero=left+width/2, unit=width/16, x=zero+value*unit;
    const ticks=Array.from({length:17},(_,i)=>{const n=i-8,px=left+i*unit;return `<g><line x1="${px}" y1="92" x2="${px}" y2="${n===0?116:108}" class="${n===0?'zero-tick':'tick'}"/><text x="${px}" y="139">${n}</text></g>`}).join('');
    svg.innerHTML=`<defs><marker id="abs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3z"/></marker></defs><line class="number-axis" x1="${left}" y1="92" x2="${left+width}" y2="92" marker-end="url(#abs-arrow)"/>${ticks}<line class="distance-line" x1="${zero}" y1="62" x2="${x}" y2="62"/><line class="distance-guide" x1="${zero}" y1="62" x2="${zero}" y2="92"/><line class="distance-guide" x1="${x}" y1="62" x2="${x}" y2="92"/><circle class="zero-dot" cx="${zero}" cy="92" r="7"/><circle class="value-dot" cx="${x}" cy="92" r="12"/><text class="distance-label" x="${(zero+x)/2}" y="45">距離 ${abs} 格</text><text class="value-label" x="${x}" y="170">x = ${value}</text>`;
    output.textContent=`x = ${value<0?'−'+abs:value}`;
    readout.textContent=`${value===0?'x 就在原點，距離是 0 格。':`${value<0?'負':'正'}數 ${value<0?'−'+abs:abs} ${value<0?'在左':'在右'}邊；從 0 到 x 有 ${abs} 格，所以 |${value<0?'−'+abs:abs}| = ${abs}。`}`;
  }
  function integerAdditionLab(){
    return `<div class="interactive-visual integer-lab" data-integer-lab><div class="integer-equation" data-integer-equation>−2 ＋ 5 ＝ 3</div><div class="integer-controls"><label>起點 <input type="range" min="-8" max="8" value="-2" step="1" data-integer-start><output data-integer-start-out>−2</output></label><label>加上 <input type="range" min="-8" max="8" value="5" step="1" data-integer-change><output data-integer-change-out>＋5</output></label></div><div class="visual-instruction">紫點是起點；箭頭向右代表加正數、向左代表加負數；橘點就是答案。</div><svg class="integer-svg" data-integer-svg viewBox="0 0 690 205" role="img" aria-label="整數加減的可調整數線"></svg><div class="visual-status" data-integer-readout>從 −2 出發，加上 ＋5 就向右走 5 格，停在 3。</div></div>`;
  }
  function signed(value,withPlus=false){return value<0?`−${Math.abs(value)}`:(withPlus?`＋${value}`:`${value}`);}
  function renderInteger(lab){
    const start=Number(q('[data-integer-start]',lab).value), change=Number(q('[data-integer-change]',lab).value), end=start+change;
    const min=-12,max=12,left=36,width=618,unit=width/(max-min),px=n=>left+(n-min)*unit, svg=q('[data-integer-svg]',lab);
    const ticks=Array.from({length:max-min+1},(_,i)=>{const n=min+i,x=px(n);return `<g><line x1="${x}" y1="120" x2="${x}" y2="${n===0?146:136}" class="${n===0?'zero-tick':'tick'}"/><text x="${x}" y="170">${n}</text></g>`}).join('');
    const sx=px(start), ex=px(end), within=end>=min&&end<=max;
    svg.innerHTML=`<defs><marker id="integer-arrow" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><path d="M0,0 L0,8 L8,4z" fill="#e58232"/></marker></defs><line class="number-axis" x1="${left}" y1="120" x2="${left+width}" y2="120"/>${ticks}${within?`<path class="move-arrow" d="M ${sx} 76 Q ${(sx+ex)/2} ${Math.max(20,76-Math.abs(ex-sx)*.14)} ${ex} 76" marker-end="url(#integer-arrow)"/><circle class="start-dot" cx="${sx}" cy="120" r="13"/><circle class="end-dot" cx="${ex}" cy="120" r="13"/><text class="start-label" x="${sx}" y="48">起點 ${signed(start)}</text><text class="end-label" x="${ex}" y="202">答案 ${signed(end)}</text>`:`<text class="end-label" x="345" y="70">答案超出目前數線範圍</text>`}`;
    q('[data-integer-equation]',lab).textContent=`${signed(start)} ＋ ${signed(change,true)} ＝ ${signed(end)}`;
    q('[data-integer-start-out]',lab).textContent=signed(start);q('[data-integer-change-out]',lab).textContent=signed(change,true);
    q('[data-integer-readout]',lab).textContent=`從 ${signed(start)} 出發，加上 ${signed(change,true)}，所以${change>=0?'向右':'向左'}走 ${Math.abs(change)} 格，停在 ${signed(end)}。`;
  }
  function mathDiagram(kind,equation){
    if(kind==='signTable')return `<div class="sign-table"><span>×／÷</span><b>＋</b><b>−</b><b>＋</b><strong>＋</strong><strong>−</strong><b>−</b><strong>−</strong><strong>＋</strong></div>`;
    if(kind==='exponent')return `<div class="power-tiles"><i>底數</i><b>2</b><em>×</em><b>2</b><em>×</em><b>2</b><i>重複相乘</i></div>`;
    if(kind==='factorTree')return `<div class="factor-tree"><b>60</b><span>↙　↘</span><b>2</b><b>30</b><span>　　↙　↘</span><i>2 × 2 × 3 × 5</i></div>`;
    if(kind==='fractionBar')return `<div class="fraction-bars"><div><b style="--parts:3;--fill:2"></b><span>2／3</span></div><em>×／＋</em><div><b style="--parts:4;--fill:3"></b><span>3／4</span></div></div>`;
    if(kind==='algebraTiles')return `<div class="algebra-tiles"><b>x</b><b>x</b><b>x</b><i>＋</i><span>1</span><span>1</span><span>1</span><p>同類項才可以合併</p></div>`;
    if(kind==='balance')return `<div class="balance-diagram"><div class="balance-pan">3x − 5</div><div class="balance-pivot">＝</div><div class="balance-pan">10</div><p>兩邊做相同運算，天平才平衡</p></div>`;
    if(kind==='coordinate')return `<svg class="coordinate-diagram" viewBox="0 0 360 180" role="img" aria-label="座標平面"><path d="M25 150H340M180 15V165"/><path class="coord-line" d="M55 142L305 35"/><circle cx="180" cy="89" r="7"/><text x="315" y="28">y</text><text x="342" y="165">x</text><text x="188" y="84">關係點</text></svg>`;
    if(kind==='geometry')return `<svg class="geometry-diagram" viewBox="0 0 340 180" role="img" aria-label="幾何圖形"><path d="M42 145L150 28L286 145Z"/><path class="right-angle" d="M126 119h22v-22"/><text x="82" y="92">a</text><text x="210" y="93">b</text><text x="156" y="155">c</text><text x="152" y="25">直角／對應關係</text></svg>`;
    return `<div class="data-diagram"><i style="--h:35%"></i><i style="--h:68%"></i><i style="--h:48%"></i><i style="--h:86%"></i><b>比較高度、總數與比例</b></div>`;
  }
  function mathVisual(title, equation, explanation, kind){
    return `<div class="interactive-visual math-visual kind-${kind}" data-math-visual><div class="math-model-label">${esc(title)}</div><div class="math-canvas">${mathDiagram(kind,equation)}</div><div class="math-expression">${esc(equation)}</div><div class="visual-controls"><button type="button" data-math-step="0">看圖中條件</button><button type="button" data-math-step="1">操作關係</button><button type="button" data-math-step="2">代回驗證</button></div><div class="visual-status" data-math-status>先指出圖中每個量代表什麼，再開始運算。</div></div>`;
  }
  function replayLab(lab){
    const model=q('[data-model]',lab); model?.classList.remove('is-playing');
    if(lab._replayTimer) clearInterval(lab._replayTimer);
    requestAnimationFrame(()=>model?.classList.add('is-playing'));
    const absolute=q('[data-absolute-lab]',lab);
    if(absolute){const input=q('[data-absolute-slider]',absolute), values=[-4,0,5,-2], readout=q('[data-absolute-readout]',absolute);let step=0;const show=()=>{if(step>=values.length){clearInterval(lab._replayTimer);lab._replayTimer=null;return;}input.value=values[step];renderAbsolute(absolute);readout.textContent=`播放第 ${step+1} 步：${readout.textContent}`;step+=1;};show();lab._replayTimer=setInterval(show,850);return;}
    const integer=q('[data-integer-lab]',lab);
    if(integer){const start=q('[data-integer-start]',integer),change=q('[data-integer-change]',integer),values=[[-2,5],[3,-6],[-5,-3]];let step=0;const show=()=>{if(step>=values.length){clearInterval(lab._replayTimer);lab._replayTimer=null;return;}[start.value,change.value]=values[step];renderInteger(integer);q('[data-integer-readout]',integer).textContent=`播放第 ${step+1} 步：${q('[data-integer-readout]',integer).textContent}`;step+=1;};show();lab._replayTimer=setInterval(show,1000);return;}
    const concept=q('[data-concept-visual]',lab);
    if(concept){const options=[...concept.querySelectorAll('[data-concept-option]')];let step=0;const show=()=>{if(step>=options.length){clearInterval(lab._replayTimer);lab._replayTimer=null;return;}options.forEach((button,index)=>button.classList.toggle('is-active',index===step));q('[data-concept-diagram]',concept).dataset.step=String(step);q('[data-concept-status]',concept).textContent=`播放第 ${step+1} 步：${options[step].textContent}。`;step+=1;};show();lab._replayTimer=setInterval(show,850);return;}
    const visual=q('[data-visual]',lab);
    if(visual){
      const nodes=[...visual.querySelectorAll('[data-visual-node]')]; let step=0;
      nodes.forEach(node=>node.classList.remove('is-active'));
      const show=()=>{const node=nodes[step]; if(!node){clearInterval(lab._replayTimer);lab._replayTimer=null;return;}node.classList.add('is-active');q('[data-visual-status]',visual).textContent=`播放第 ${step+1} 步：${node.textContent.trim()}。`;step+=1;};
      show(); lab._replayTimer=setInterval(show,850); return;
    }
    const math=q('[data-math-visual]',lab);
    if(math){const buttons=[...math.querySelectorAll('[data-math-step]')];let step=0;const messages=['圈出已知條件。','把相同的量建立關係。','代回圖像驗證結果。'];const show=()=>{if(step>=buttons.length){clearInterval(lab._replayTimer);lab._replayTimer=null;return;}buttons.forEach((button,index)=>button.classList.toggle('is-active',index===step));q('[data-math-status]',math).textContent=`播放第 ${step+1} 步：${messages[step]}`;step+=1;};show();lab._replayTimer=setInterval(show,850);}
  }
  function conceptVisual(subject,kind,title,sequence){
    const labels={cell:['細胞膜','細胞核','細胞質'],body:['輸入','運輸／調節','結果'],experiment:['改變的變因','保持不變','量測結果'],physics:['作用','方向','結果'],earth:['地球內部／板塊','相對運動','地表現象'],timeline:['過去','現在','未來／結果'],sentence:['主詞','動詞','補充資訊'],reading:['題目任務','文本線索','有據答案'],word:['字形／詞義','前後語境','正確用法'],text:['主張／中心','證據／詞句','判讀結果'],map:['位置','空間條件','人地影響'],civic:['角色','權利／規則','程序結果']};
    const parts=labels[kind]||['條件','關係','結果'];
    let diagram='';
    if(kind==='cell') diagram=`<svg class="concept-svg cell-svg" viewBox="0 0 380 210"><ellipse cx="190" cy="105" rx="145" ry="78"/><circle cx="190" cy="105" r="35"/><circle cx="108" cy="72" r="12"/><circle cx="272" cy="140" r="12"/><text x="190" y="112">細胞核</text><text x="190" y="28">細胞膜</text><text x="260" y="188">細胞質</text></svg>`;
    else if(kind==='body'){
      if(title.includes('植物'))diagram=`<svg class="concept-svg body-svg" viewBox="0 0 380 210"><circle cx="70" cy="50" r="24"/><path class="process-line" d="M104 55h95m-40-15 40 15-40 15"/><path d="M230 172V68m0 38l-58-45m58 45l58-45m-58 15l-36 48m36-48l36 48"/><text x="70" y="55">光</text><text x="155" y="37">二氧化碳＋水</text><text x="230" y="68">葉</text><text x="310" y="120">養分＋氧氣</text></svg>`;
      else if(title.includes('血液'))diagram=`<svg class="concept-svg body-svg" viewBox="0 0 380 210"><path d="M188 158c-95-67-62-139 0-73 62-66 95 6 0 73z"/><path class="process-line" d="M52 104h95m-24-18 24 18-24 18M229 104h100m-24-18 24 18-24 18"/><text x="82" y="82">全身</text><text x="188" y="113">心臟</text><text x="300" y="82">肺部</text></svg>`;
      else if(title.includes('神經'))diagram=`<svg class="concept-svg body-svg" viewBox="0 0 380 210"><circle cx="70" cy="105" r="24"/><path d="M94 105h78m0 0l45-48m-45 48l45 48m0-96h105"/><circle cx="328" cy="105" r="23"/><text x="70" y="110">受器</text><text x="188" y="90">神經</text><text x="328" y="110">反應</text></svg>`;
      else if(title.includes('遺傳')||title.includes('演化'))diagram=`<div class="gene-grid"><b>親代</b><span>A</span><span>a</span><span>A</span><strong>AA</strong><strong>Aa</strong><span>a</span><strong>Aa</strong><strong>aa</strong></div>`;
      else if(title.includes('生態'))diagram=`<div class="food-web"><b>植物</b><i>→</i><b>昆蟲</b><i>→</i><b>鳥類</b><i>→</i><b>分解者</b></div>`;
      else diagram=`<svg class="concept-svg body-svg" viewBox="0 0 380 210"><circle cx="96" cy="40" r="20"/><path d="M96 60v72m-42-45h84m-42 45l-30 52m30-52l30 52"/><path class="process-line" d="M170 105h155"/><circle class="process-dot" cx="225" cy="105" r="20"/><text x="225" y="111">系統</text><text x="278" y="88">物質／訊息</text></svg>`;
    }
    else if(kind==='experiment') diagram=`<svg class="concept-svg experiment-svg" viewBox="0 0 380 210"><path d="M80 25v86l-30 50q0 22 60 22t60-22l-30-50V25"/><path d="M225 35v120m-28 0h56"/><rect x="258" y="72" width="82" height="58" rx="9"/><text x="110" y="205">操作條件</text><text x="298" y="106">量測</text></svg>`;
    else if(kind==='physics') diagram=`<svg class="concept-svg physics-svg" viewBox="0 0 380 210"><rect x="122" y="100" width="125" height="58" rx="8"/><path class="force-arrow" d="M46 129h74m-18-18l18 18-18 18M250 129h82m-18-18l18 18-18 18"/><text x="185" y="135">物體</text><text x="46" y="93">力／能量</text><text x="273" y="93">運動／變化</text></svg>`;
    else if(kind==='earth') diagram=`<svg class="concept-svg earth-svg" viewBox="0 0 380 210"><path d="M30 133l130-33 30 28 30-28 130 33v44H30z"/><path class="plate-arrow" d="M142 75h-58m15-15-15 15 15 15M238 75h58m-15-15 15 15-15 15"/><circle cx="190" cy="48" r="22"/><text x="190" y="53">板塊</text><text x="190" y="194">地震／火山／地形</text></svg>`;
    else if(kind==='timeline') diagram=`<svg class="concept-svg timeline-svg" viewBox="0 0 380 210"><path d="M34 120h310"/><circle cx="82" cy="120" r="17"/><circle cx="190" cy="120" r="17"/><circle cx="298" cy="120" r="17"/><text x="82" y="82">時間線索</text><text x="190" y="160">動詞／事件</text><text x="298" y="82">答案</text></svg>`;
    else if(kind==='sentence') diagram=`<div class="sentence-slots"><b>誰／什麼</b><i>＋</i><b>做什麼</b><i>＋</i><b>何時／哪裡</b></div>`;
    else if(kind==='reading'||kind==='text') diagram=`<div class="evidence-board"><b>題目要問什麼？</b><span>找回原文的關鍵句</span><strong>用證據選答案</strong></div>`;
    else if(kind==='word') diagram=`<div class="word-board"><b>字形／詞性</b><i>＋</i><b>前後句意</b><i>＝</i><strong>詞義</strong></div>`;
    else if(kind==='map') diagram=`<svg class="concept-svg map-svg" viewBox="0 0 380 210"><path d="M165 25l50 20 32 58-24 78-63 8-31-50 13-70z"/><circle cx="183" cy="106" r="9"/><path class="map-route" d="M55 162l128-56 135-35"/><text x="183" y="203">位置、距離、環境</text></svg>`;
    else diagram=`<div class="civic-board"><b>人民／角色</b><i>→</i><b>權利與規則</b><i>→</i><strong>程序與結果</strong></div>`;
    return `<div class="interactive-visual concept-visual kind-${kind}" data-concept-visual><div class="math-model-label">${esc(title)}</div><div class="concept-diagram" data-concept-diagram>${diagram}</div><div class="concept-options">${parts.map((part,index)=>`<button type="button" data-concept-option="${index}" class="${index===0?'is-active':''}">${part}</button>`).join('')}</div><div class="visual-status" data-concept-status>先點選圖中的「${parts[0]}」，確認它在本節代表什麼。</div></div>`;
  }
  function mathModel(title){
    const models={
      '正負數與絕對值':['數線與距離模型','把滑鼠點在數線左右兩端：位置代表正負，離 0 的格數才是絕對值。','−4　−3　−2　−1　0　1　2　3　4'],
      '整數的加減':['數線移動模型','從第一個數出發；加正往右、加負往左。減法先改寫成「加上相反數」。','起點 −2　→　加 (+5)　→　終點 3'],
      '整數的乘除':['符號決策表','先看兩個數的符號：同號得正、異號得負；再做絕對值的乘除。','(＋)×(＋)=＋　(＋)×(−)=−　(−)×(−)=＋'],
      '指數律':['重複相乘方塊','指數不是乘上一個數，而是底數重複相乘的次數。','2³ = 2 × 2 × 2 = 8'],
      '科學記號':['小數點尺度尺','讓第一個非零數字落在個位；小數點向左移，10 的指數為正。','3,200,000　→　3.2 × 10⁶'],
      '質因數分解':['因數樹','一路拆成質數；葉端相乘必須回到原數。','60　→　2 × 30　→　2 × 2 × 15　→　2² × 3 × 5'],
      '最大公因數與最小公倍數':['共同質因數圈選','共同擁有的質因數取較小次方找最大公因數；全部取較大次方找最小公倍數。','12=2²×3　　18=2×3²'],
      '分數的加減':['同一單位的分數條','分母代表每一份的大小，先通分成相同單位，才可相加減。','1／3　＋　1／6　→　2／6 ＋ 1／6 = 3／6'],
      '分數的乘除':['面積與倒數模型','分數乘法是取「其中的其中」；除以分數改成乘它的倒數。','2／3 × 3／4 = 6／12 = 1／2'],
      '式子的運算':['代數積木','只有同類項能合併；字母與次方相同才算同類項。','3x + 2x − 4　→　5x − 4'],
      '解一元一次方程式':['等式天平','等號兩邊每次做完全相同的運算；目標是讓 x 單獨留在一邊。','3x − 5 = 10　→　3x = 15　→　x = 5'],
      '一元一次方程式應用':['情境翻譯流程','先定義未知數，再把每個句子改成數量關係式，最後代回驗算。','設 x 為單價　→　數量 × x = 總價']
      ,'乘法公式':['面積拼圖','把 (a＋b)² 想成邊長 a＋b 的正方形：a²、2ab、b² 三塊面積相加。','(a＋b)² = a²＋2ab＋b²']
      ,'多項式運算':['分配律展開圖','括號外每一項都要乘進去；合併前先確認是不是同類項。','2(x＋3)−x = 2x＋6−x = x＋6']
      ,'平方根':['面積反推','若正方形面積是 49，邊長是 7；√49 代表非負的主平方根。','√49 = 7；(−7)² = 49']
      ,'畢氏定理':['直角三角形拼圖','只適用直角三角形：兩股平方和等於斜邊平方。','a²＋b² = c²']
      ,'一元二次方程式':['乘積為零門檻','先整理成一邊為 0；兩因式相乘為 0，至少一個因式為 0。','(x−2)(x＋3)=0　→　x=2 或 −3']
      ,'統計圖表':['資料中心尺','平均數看總量分配；中位數看排序中間；眾數看出現最多。','先看資料是否有極端值，再選適合的代表值']
      ,'機率':['等可能分母盤','機率＝符合條件的結果數／所有等可能結果數。','P(事件)=有利結果÷全部結果']
      ,'二元一次方程式圖形':['直線交點','同時滿足兩式的數對，就是兩條直線的交點。','y=2x＋1 與 y=−x＋4 的交點']
      ,'比例與函數':['變量連線','正比 y=kx 通過原點；反比 xy=k，x 增大時 y 變小。','正比：y／x 固定；反比：xy 固定']
      ,'二次函數':['拋物線三把尺','a 決定開口與寬窄；h、k 決定頂點 (h,k) 與對稱軸 x=h。','y=a(x−h)²＋k']
      ,'二次函數應用':['極值定位','先看開口方向，再找頂點；向上頂點是最小值，向下是最大值。','頂點 → 對稱軸 → 交點／範圍']
      ,'相似形':['對應比例表','先排好對應頂點順序；角相等、對應邊成同一比例。','△ABC ∼ △DEF　→　AB／DE=BC／EF']
      ,'圓':['同弧角度圖','同弧的圓心角是圓周角兩倍；先圈出同一段弧。','圓心角 = 2 × 圓周角']
      ,'三角比':['直角三角形標邊','相對指定角：sin=對／斜，cos=鄰／斜，tan=對／鄰。','tan θ = 對邊／鄰邊']
      ,'生活測量':['仰角觀測圖','把水平線、視線與高度畫成直角三角形，保留單位。','tan θ = 高度／水平距離']
      ,'統計與資料判讀':['資料可信度檢查','先檢查來源、樣本、時間、單位與縱軸刻度，才解讀趨勢。','圖大不等於差距大；先看刻度']
      ,'機率模型':['樹狀圖分支','多步驟事件沿樹狀圖相乘；互斥結果再相加。','P(A且B)=P(A)×P(B|A)']
    }; const m=models[title]||['數學關係圖','先把已知條件放進圖或式子，讓關係變得可見。',title];
    if(title==='正負數與絕對值') return absoluteValueLab();
    if(title==='整數的加減') return integerAdditionLab();
    const kind=window.INTERACTIVE_SPECS?.get('數學',title); if(!kind) throw Error(`缺少數學互動模型規格：${title}`);
    return `${mathVisual(title,m[2],m[1],kind)}<details class="visual-caption"><summary>${m[0]}：操作提示</summary><p>${m[1]}</p><code>${m[2]}</code></details>`;
  }
  function scienceModel(title){
    const models={
      '探究自然的方法':['探究迴圈','觀察 → 問題 → 假設 → 實驗 → 資料 → 結論'],
      '基本測量':['測量資料鏈','選工具與單位 → 估讀刻度 → 重複測量 → 記錄不確定性'],
      '生命現象與生物圈':['生命條件網','能量、反應、生長、生殖、感應與環境相連'],
      '細胞的構造':['細胞工廠','細胞膜管進出、細胞質是場所、細胞核含遺傳訊息'],
      '物質進出細胞':['濃度平衡箭頭','粒子由多往少擴散；水分依濃度差滲透'],
      '生物體的組成層次':['生命階梯','細胞 → 組織 → 器官 → 器官系統 → 個體'],
      '食物中的養分':['養分任務卡','醣類脂質供能；蛋白質建構；維生素與礦物質調節'],
      '酵素與消化':['鎖鑰模型','專一受質配合活性部位；溫度、酸鹼影響活性'],
      '植物如何製造養分':['光合作用路徑','二氧化碳＋水 ─光／葉綠體→ 養分＋氧氣'],
      '動物如何獲得養分':['消化管旅行','攝取 → 消化 → 吸收 → 運輸 → 細胞利用'],
      '植物的運輸構造':['雙向運輸管','木質部主要運水與礦物質；韌皮部運送有機養分'],
      '動物的血液循環':['雙循環箭頭','全身 → 右心 → 肺 → 左心 → 全身'],
      '神經系統與反應':['刺激反應線','刺激 → 受器 → 神經 → 中樞 → 反應器'],
      '神經與恆定':['恆定控制迴圈','刺激／偏離 → 受器 → 調節中樞 → 反應器 → 回到適當範圍'],
      '內分泌與恆定':['負回饋迴圈','偏離適當值 → 調節反應 → 回到範圍'],
      '體溫與水分恆定':['恆定儀表板','流汗散熱、血管舒張／收縮與水分調節'],
      '遺傳與基因':['性狀棋盤格','親代配子組合 → 子代基因型 → 表現型比例'],
      '演化與分類':['族群時間線','遺傳變異 → 生存繁殖差異 → 世代比例改變'],
      '生態系與能量流動':['食物網箭頭','能量由被吃者流向吃者；物質可循環'],
      '物質與密度':['密度積木','密度＝質量÷體積；同體積比質量、同質量比體積'],
      '聲音與波動':['波形讀值','振幅影響響度；頻率影響音調；需要介質傳遞'],
      '光與色彩':['光路圖','反射角等於入射角；折射因光速改變而偏折'],
      '溫度與熱':['熱傳三箭頭','傳導、對流、輻射由高溫處往低溫處傳熱'],
      '化學反應':['粒子重組','反應前後原子數守恆；新物質來自重新排列'],
      '酸鹼與指示劑':['pH 光譜','pH 小於 7 酸性，大於 7 鹼性，以 7 為中性基準'],
      '酸鹼鹽':['離子與中和','酸、鹼以 pH 判讀；中和是酸鹼性趨近中性，不是憑顏色猜測'],
      '力與運動':['受力箭頭','合力決定加速度；速度變化代表運動狀態改變'],
      '壓力、浮力與機械':['力的分配','壓力＝力÷面積；浮力與排開液體有關'],
      '電與能量':['電路閉環','電流需完整迴路；能量在元件間轉換'],
      '能源轉換':['能量帳本','輸入能量 → 有用輸出＋損耗；比較效率、安全與環境代價'],
      '電流與磁場':['電磁場環','通電導線周圍有磁場；線圈與鐵芯可增強效果'],
      '板塊與地質':['板塊邊界','聚合、張裂、錯動造成地震、火山與地形'],
      '天文與永續':['日地月與取捨','用運動模型解釋天文現象，再以環境、社會、經濟評估方案'],
      '天文與永續':['系統取捨圖','自然證據、生活需求、社會成本需一起評估']
    }; const m=models[title]||Object.entries(models).find(([key])=>title.includes(key)||key.includes(title))?.[1]||['科學因果流程','條件 → 機制 → 可觀察結果'];
    const kind=window.INTERACTIVE_SPECS?.get('自然',title);if(!kind)throw Error(`缺少自然互動模型規格：${title}`);
    return `${conceptVisual('自然',kind,title,m[1])}<details class="visual-caption"><summary>${m[0]}：觀察提示</summary><p>${m[1]}</p></details>`;
  }
  function languageModel(subject,title){
    const en={
      '自我介紹與人稱代名詞':['人稱配對','I／you／we／they ↔ am／are；he／she／it ↔ is'], '日常作息與現在簡單式':['習慣時間線','every day、usually → 主詞＋原形／第三人稱單數'], '正在發生與現在進行式':['現在進行燈號','now、at the moment → am／is／are＋V-ing'], '名詞、冠詞與數量':['名詞分類籃','可數單數用 a／an；複數或不可數量用 some／any'], '地點與介系詞':['位置地圖','in 在裡面；on 在表面；at 指特定點'], '問句與簡答':['問答樹','be 動詞直接倒裝；一般動詞用 Do／Does'], '過去式與時間線':['過去事件軸','yesterday、last… → 規則 ed 或不規則過去式'], '比較級與最高級':['比較階梯','兩者比較＋than；三者以上用 the 最高級'], '未來計畫與 be going to':['未來箭頭','已有計畫或明顯跡象 → be going to'], '情態助動詞':['語氣儀表板','can 能力／允許；should 建議；must 必要'], '連接詞':['邏輯接線','because 原因；so 結果；but 轉折'], '被動語態入門':['動作焦點切換','承受動作的主詞＋be＋p.p.'], '現在完成式':['過去連到現在','have／has＋p.p. 表經驗、完成或持續'], '關係子句':['名詞標籤','先行詞是人用 who；事物用 which'], '篇章連接':['段落箭頭','however 轉折；therefore 結果'], '推論閱讀':['證據放大鏡','合理推論必須回到文本線索'], '會考寫作':['寫作骨架','任務點 → 段落 → 例子 → 檢查']};
    Object.assign(en,{'不定詞與動名詞':['動詞搭配箭頭','先看前面的動詞；不同搭配決定 to V 或 V-ing'],'分詞與長句':['長句切片','先找主詞＋主要動詞，再把分詞與補充資訊括起來'],'閱讀圖表':['欄位交叉表','先找題目任務，再對照時間、數字與限制詞'],'情境對話':['角色回應卡','先判斷請求、邀請、道歉或建議，再選符合角色的回應'],'段落寫作':['段落三明治','主題句 → 具體細節 → 收束或連接下一句'],'圖表與公告':['任務掃描','圈出人物、時間、地點、價格、not／except 等限制']});
    const zh={
      '字音、字形與詞義':['語境三角形','部首、詞性、前後搭配一起判讀'], '成語與詞語運用':['固定語意盒','成語先整體換白話，再放回句子檢查'], '句型、語法與標點':['句子骨架','找主詞、主要動詞、受詞與修飾語'], '修辭與表達效果':['手法到效果','手法 → 畫面／語氣 → 作者情感'], '記敘文本閱讀':['事件路線','人物 → 事件 → 轉折 → 感受'], '說明文本閱讀':['說明工具箱','定義、分類、因果、舉例各有任務'], '議論文本閱讀':['論證三角','主張 ← 理由 ← 可查證證據'], '文言文句意':['古文解碼','人物／動詞／轉折 → 補省略 → 重組白話'], '古典詩歌意象':['景情連線','景物與動作如何烘托心情'], '跨文本與圖表':['資料比較表','來源、時間、對象、單位、結論逐項比較'], '寫作表達':['段落地圖','中心句 → 細節／例子 → 回扣題目'], '論證閱讀':['主張檢驗台','證據是否足夠？是否有替代原因？'], '國學常識':['背景索引','作品、體裁、稱謂與時代協助閱讀'], '會考閱讀策略':['題幹回查法','先讀任務，再回原文找直接證據']};
    Object.assign(zh,{'字詞與語法':['詞性定位','先辨名詞、動詞、形容詞在句中扮演的角色'],'古典詩文':['古文解碼','人物／動詞／轉折 → 補省略 → 重組白話'],'文言統整':['古文關係網','實詞、虛詞、句式與人物關係要一起判讀'],'抒情文本':['經驗到情感','具體事件與景物如何承載情緒'],'議論寫作':['立場建築','主張 → 理由 → 例證 → 回應不同意見'],'說明與圖表':['圖文對照','文字說明與圖表的單位、範圍必須一起讀'],'修辭應用':['手法到效果','手法 → 畫面／語氣 → 作者情感'],'文言虛詞':['虛詞定位','從前後詞語關係判斷之、其、以、於的功能'],'寫作組織':['段落地圖','中心句 → 細節／例子 → 回扣題目'],'閱讀推論':['證據邊界','只推出文本支持的結論，不加入自己的想像'],'資料判讀':['資料可信度','先檢查單位、樣本、時間與圖表刻度']});
    const m=(subject==='英文'?en:zh)[title]||['語言結構圖','線索 → 結構 → 完整意思'];
    const kind=window.INTERACTIVE_SPECS?.get(subject,title);if(!kind)throw Error(`缺少${subject}互動模型規格：${title}`);
    return `${conceptVisual(subject,kind,title,m[1])}<details class="visual-caption"><summary>${m[0]}：操作提示</summary><p>${m[1]}</p></details>`;
  }
  function socialModel(title){
    const models={'臺灣的自然環境':['臺灣環境層疊圖','位置 → 地形 → 氣候 → 災害與人類調適'],'史前與原住民族':['史料拼圖','考古資料與口傳文化 → 多元族群的生活方式'],'荷西與鄭氏時期':['海洋貿易網','外來政權／貿易 → 統治制度 → 移民與社會改變'],'清代臺灣的治理':['開墾治理線','移民與土地利用 → 行政治理 → 社會結構'],'開港與近代化':['港口連線','通商開港 → 商品與人口流動 → 城市與制度改變'],'近代臺灣與東亞':['區域連動圖','外部局勢 → 地方制度 → 人民生活與回應'],'中國近代變遷':['內外壓力圖','內部問題＋外來衝擊 → 改革／革命 → 社會變遷'],'世界近代史':['工業全球鏈','工業化 → 帝國擴張與交流 → 區域影響'],'現代臺灣':['現代轉型線','民主化／經濟轉型／社會運動 → 權利與生活改變'],'世界現代史':['全球事件網','冷戰／科技／全球化 → 不同地區的連動'],'地圖與地理資訊':['讀圖四步','標題與時間 → 圖例與單位 → 方向比例尺 → 空間判讀'],'臺灣的位置與區域':['區域定位圖','經緯位置＋鄰近區域 → 交通、交流與戰略意義'],'人口與聚落':['人口分布因果','自然條件＋工作機會＋交通 → 人口密度與聚落'],'產業活動與區位':['產業選址表','原料／勞力／交通／市場／政策 → 區位選擇'],'資源與環境問題':['人地回饋圈','資源利用 → 環境影響 → 保育與調適'],'中國與東亞地理':['區域比較尺','位置、地形、氣候、水資源 → 人口與產業'],'人口與產業':['區位證據表','資源、交通、市場、勞力、政策 → 發展差異'],'世界區域地理':['區域比較表','自然環境 → 人文活動 → 區域特色'],'全球化與環境':['跨境流動線','商品、資本、資訊、人口 → 受益與代價'],'永續發展':['三面向天平','環境保護 ↔ 社會公平 ↔ 經濟可行'],'社會生活與規範':['規範同心圓','生活行為 → 道德／社會規範／法律 → 後果'],'人性尊嚴與權利':['權利界線','個人權利 ↔ 他人權利與公共利益'],'家庭與校園生活':['角色關係圖','不同角色 → 權利、義務、溝通與責任'],'社區參與':['公共事務流程','問題 → 蒐集意見與資料 → 參與／監督 → 改善'],'政府與公共服務':['公共服務鏈','共同需求 → 政府資源與程序 → 公共服務'],'媒體與資訊識讀':['資訊檢核漏斗','來源 → 發布時間 → 證據 → 立場與查證'],'法律與生活':['法律案例圖','行為人／事實 → 權利義務 → 規範與程序'],'政府與民主':['權力制衡圖','人民授權 → 政府權力 → 監督與權利保障'],'市場與金融':['市場互動圖','需求／供給 → 價格訊號 → 生產與消費選擇'],'民主政治':['民主運作環','選舉與參與 → 多數決 → 少數權利與監督'],'公共參與':['理性參與鏈','可查證資料 → 理由 → 程序 → 公共決策'],'法律與權利救濟':['救濟路徑','權利受影響 → 依程序申訴／救濟 → 公平處理'],'跨科公共議題':['跨科決策盤','自然證據＋數學資料＋制度程序＋價值取捨']};
    const m=models[title]|| (title.includes('地圖')||title.includes('地理')||title.includes('區域')||title.includes('人口')||title.includes('產業')||title.includes('環境')||title.includes('全球化')||title.includes('永續')?['地圖判讀順序','標題／時間 → 圖例／單位 → 空間分布 → 人地原因']:title.includes('政府')||title.includes('法律')||title.includes('權利')||title.includes('民主')||title.includes('公共')||title.includes('市場')||title.includes('金融')?['公民案例關係圖','行為人／受影響者 → 權利義務 → 規則程序 → 結果']:['歷史因果時間線','背景條件 → 事件／制度 → 不同群體的影響']);
    const kind=window.INTERACTIVE_SPECS?.get('社會',title);if(!kind)throw Error(`缺少社會互動模型規格：${title}`);
    return `${conceptVisual('社會',kind,title,m[1])}<details class="visual-caption"><summary>${m[0]}：操作提示</summary><p>${m[1]}</p></details>`;
  }
  function stage(subject,title,goal){
    if(subject==='數學') return mathModel(title);
    if(subject==='自然') return scienceModel(title);
    if(subject==='英文'||subject==='國文') return languageModel(subject,title);
    if(subject==='社會') return socialModel(title);
    const labels=subject==='英文'?['情境線索','句型與字詞','完整意思']:subject==='國文'?['文本線索','作者意圖','有據的判讀']:['背景條件','事件／制度','群體影響'];
    return `<div class="flow-model">${labels.map((x,i)=>`<span class="flow-node">${x}</span>${i<labels.length-1?'<span class="flow-arrow">→</span>':''}`).join('')}</div><small>把「${title}」放入這條路徑，逐格說出它如何發生、如何被判斷。</small>`;
  }
  function render(){
    if(q('.chapter-lab')) return;
    const meta=q('.lesson-layout .eyebrow'),titleEl=q('.lesson-title'),concept=q('.concept'); if(!meta||!titleEl||!concept||!titleEl.textContent.includes('｜')) return;
    const [subject]=meta.textContent.split(' · '), title=titleEl.textContent.split('｜').slice(1).join('｜').trim(), goal=concept.textContent.replace('本節學習目標：','').trim(), a=subjectAdvice[subject]; if(!a) return;
    const section=document.createElement('section'); section.className='chapter-lab';
    const source=sourceGuide[subject];section.innerHTML=`<header><div class="eyebrow">${a.mode}｜互動式分節教材</div><h2>${title}</h2><p>${goal}</p></header><div class="chapter-workspace"><div class="model-stage" data-model>${stage(subject,title,goal)}</div><aside class="lab-panel"><h3>先做預測</h3><div class="prediction">看到題目時，先不要選答案。請說出：<b>我會先找哪個條件？它和本節概念有什麼關係？</b></div><div class="chapter-choices"><button data-chapter-choice="0">先把題目中的條件標記出來</button><button data-chapter-choice="1">只靠記得的關鍵字猜答案</button><button data-chapter-choice="2">先建立模型／關係，再驗證結論</button></div><div class="chapter-feedback" data-chapter-feedback>點選一個做法，查看解題理由。</div></aside></div><details class="chapter-note-details"><summary>操作後再看：重點、解題法與常見誤解</summary><div class="chapter-note-grid"><article><b>圖像化重點</b><p>${goal}</p></article><article><b>解題整理法</b><p>${a.method}</p></article><article><b>常見誤解</b><p>${a.trap}</p></article></div><div class="source-note"><b>本節整理依據</b><p>${source[0]}</p><a href="${source[1]}" target="_blank" rel="noopener">查看公開筆記的章節整理方式</a><small>本站只參考整理方法與章節脈絡；概念說明、圖示、題目與解答均自行撰寫。</small></div></details><button class="chapter-replay" data-chapter-replay>重新播放圖像路徑</button>`;
    (q('.heart-lab')||q('.visual-box')||q('.concept'))?.after(section);
    const absLab=q('[data-absolute-lab]',section); if(absLab) renderAbsolute(absLab);
    const integerLab=q('[data-integer-lab]',section); if(integerLab) renderInteger(integerLab);
  }
  app.addEventListener('click',e=>{
    const lab=e.target.closest('.chapter-lab'); if(!lab)return;
    const choice=e.target.closest('[data-chapter-choice]'); if(choice){lab.querySelectorAll('[data-chapter-choice]').forEach(b=>b.classList.toggle('active',b===choice));q('[data-chapter-feedback]',lab).textContent=choice.dataset.chapterChoice==='1'?'這樣容易被陷阱帶走。請回到題目的條件，確認它真能支持結論。':'正確方向：先從條件建立關係，再把結論放回題目檢查是否合理。';}
    if(e.target.closest('[data-chapter-replay]')) replayLab(lab);
    const node=e.target.closest('[data-visual-node]'); if(node){const visual=node.closest('[data-visual]');const nodes=[...visual.querySelectorAll('[data-visual-node]')];const current=Number(node.dataset.visualNode);nodes.forEach((item,index)=>item.classList.toggle('is-active',index<=current));q('[data-visual-status]',visual).textContent=`第 ${current+1} 步已亮起：${node.textContent.trim()}。現在請說出它如何連到下一步。`;}
    const mathStep=e.target.closest('[data-math-step]'); if(mathStep){const visual=mathStep.closest('[data-math-visual]');const messages=['先把題目的數、圖形或條件圈出來。','把同一類量連線：確認符號、單位或對應關係。','把答案代回原條件或圖像，檢查是否合理。'];visual.querySelectorAll('[data-math-step]').forEach((button,index)=>button.classList.toggle('is-active',index===Number(mathStep.dataset.mathStep)));q('[data-math-status]',visual).textContent=messages[Number(mathStep.dataset.mathStep)];}
    const conceptOption=e.target.closest('[data-concept-option]');if(conceptOption){const visual=conceptOption.closest('[data-concept-visual]'),options=[...visual.querySelectorAll('[data-concept-option]')],index=Number(conceptOption.dataset.conceptOption);options.forEach((button,i)=>button.classList.toggle('is-active',i===index));q('[data-concept-status]',visual).textContent=`已選取「${conceptOption.textContent}」：請在圖中找出它，接著再點下一個步驟。`;q('[data-concept-diagram]',visual).dataset.step=String(index);}
  });
  app.addEventListener('input',e=>{const abs=e.target.closest('[data-absolute-lab]');if(abs&&e.target.matches('[data-absolute-slider]'))renderAbsolute(abs);const integer=e.target.closest('[data-integer-lab]');if(integer&&e.target.matches('[data-integer-start],[data-integer-change]'))renderInteger(integer);});
  new MutationObserver(render).observe(app,{childList:true,subtree:true}); render();
})();
