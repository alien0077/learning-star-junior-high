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
    }; const m=models[title]||['數學關係圖','先把已知條件放進圖或式子，讓關係變得可見。',title];
    return `<div class="math-specific"><b>${m[0]}</b><div class="math-equation">${m[2]}</div><small>${m[1]}</small><button type="button" data-math-model>操作模型，顯示關鍵規則</button><p data-math-model-result>先預測：這個表示法中，哪一個部分決定方向、單位或未知數？</p></div>`;
  }
  function scienceModel(title){
    const models={
      '探究自然的方法':['探究迴圈','觀察 → 問題 → 假設 → 實驗 → 資料 → 結論'],
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
      '力與運動':['受力箭頭','合力決定加速度；速度變化代表運動狀態改變'],
      '壓力、浮力與機械':['力的分配','壓力＝力÷面積；浮力與排開液體有關'],
      '電與能量':['電路閉環','電流需完整迴路；能量在元件間轉換'],
      '電流與磁場':['電磁場環','通電導線周圍有磁場；線圈與鐵芯可增強效果'],
      '板塊與地質':['板塊邊界','聚合、張裂、錯動造成地震、火山與地形'],
      '天文與永續':['系統取捨圖','自然證據、生活需求、社會成本需一起評估']
    }; const m=models[title]||Object.entries(models).find(([key])=>title.includes(key)||key.includes(title))?.[1]||['科學因果流程','條件 → 機制 → 可觀察結果'];
    return `<div class="math-specific science-specific"><b>${m[0]}</b><div class="math-equation">${m[1]}</div><small>按下按鈕，依箭頭用自己的話解釋每一格如何造成下一格。</small><button type="button" data-math-model>播放因果路徑</button><p data-math-model-result>先預測：改變哪一個條件，最可能影響最後的觀察結果？</p></div>`;
  }
  function stage(subject,title,goal){
    if(subject==='數學') return mathModel(title);
    if(subject==='自然') return scienceModel(title);
    const labels=subject==='英文'?['情境線索','句型與字詞','完整意思']:subject==='國文'?['文本線索','作者意圖','有據的判讀']:['背景條件','事件／制度','群體影響'];
    return `<div class="flow-model">${labels.map((x,i)=>`<span class="flow-node">${x}</span>${i<labels.length-1?'<span class="flow-arrow">→</span>':''}`).join('')}</div><small>把「${title}」放入這條路徑，逐格說出它如何發生、如何被判斷。</small>`;
  }
  function render(){
    if(q('.chapter-lab')) return;
    const meta=q('.lesson-layout .eyebrow'),titleEl=q('.lesson-title'),concept=q('.concept'); if(!meta||!titleEl||!concept||!titleEl.textContent.includes('｜')) return;
    const [subject]=meta.textContent.split(' · '), title=titleEl.textContent.split('｜').slice(1).join('｜').trim(), goal=concept.textContent.replace('本節學習目標：','').trim(), a=subjectAdvice[subject]; if(!a) return;
    const section=document.createElement('section'); section.className='chapter-lab';
    section.innerHTML=`<header><div class="eyebrow">${a.mode}｜互動式分節教材</div><h2>${title}</h2><p>${goal}</p></header><div class="chapter-workspace"><div class="model-stage" data-model>${stage(subject,title,goal)}</div><aside class="lab-panel"><h3>先做預測</h3><div class="prediction">看到題目時，先不要選答案。請說出：<b>我會先找哪個條件？它和本節概念有什麼關係？</b></div><div class="chapter-choices"><button data-chapter-choice="0">先把題目中的條件標記出來</button><button data-chapter-choice="1">只靠記得的關鍵字猜答案</button><button data-chapter-choice="2">先建立模型／關係，再驗證結論</button></div><div class="chapter-feedback" data-chapter-feedback>點選一個做法，查看解題理由。</div></aside></div><div class="chapter-note-grid"><article><b>圖像化重點</b><p>${goal}</p></article><article><b>學霸式整理法</b><p>${a.method}</p></article><article><b>常見誤解</b><p>${a.trap}</p></article></div><button class="chapter-replay" data-chapter-replay>播放一次概念路徑</button>`;
    (q('.heart-lab')||q('.visual-box')||q('.concept'))?.after(section);
  }
  app.addEventListener('click',e=>{
    const lab=e.target.closest('.chapter-lab'); if(!lab)return;
    const choice=e.target.closest('[data-chapter-choice]'); if(choice){lab.querySelectorAll('[data-chapter-choice]').forEach(b=>b.classList.toggle('active',b===choice));q('[data-chapter-feedback]',lab).textContent=choice.dataset.chapterChoice==='1'?'這樣容易被陷阱帶走。請回到題目的條件，確認它真能支持結論。':'正確方向：先從條件建立關係，再把結論放回題目檢查是否合理。';}
    if(e.target.closest('[data-chapter-replay]')){const m=q('[data-model]',lab);m.classList.remove('is-playing');requestAnimationFrame(()=>m.classList.add('is-playing'));}
    if(e.target.closest('[data-math-model]')){const result=q('[data-math-model-result]',lab);result.textContent='關鍵規則已顯示：先把「符號、單位、未知數或對應量」找出來，再開始運算。請用本節圖像重述一次。';q('[data-model]',lab).classList.add('is-playing');}
  });
  new MutationObserver(render).observe(app,{childList:true,subtree:true}); render();
})();
