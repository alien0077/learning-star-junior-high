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
  function stage(subject,title,goal){
    if(subject==='數學') return `<div class="number-track"><i class="tick" style="left:8%"><small>−2</small></i><i class="tick" style="left:32%"><small>−1</small></i><i class="tick" style="left:56%"><small>0</small></i><i class="tick" style="left:80%"><small>1</small></i><i class="walker" style="left:31%"></i></div><small>把題目的量放到數線、圖形或式子上，再觀察位置與關係。</small>`;
    const labels=subject==='自然'?['觀察條件','模型／機制','可驗證結果']:subject==='英文'?['情境線索','句型與字詞','完整意思']:subject==='國文'?['文本線索','作者意圖','有據的判讀']:['背景條件','事件／制度','群體影響'];
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
  });
  new MutationObserver(render).observe(app,{childList:true,subtree:true}); render();
})();
