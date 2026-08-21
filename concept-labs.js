/* 把抽象規則轉成可操作、可觀察、可自我檢核的單元實驗室。 */
(() => {
  const app = document.querySelector('#app');
  if (!app) return;

  const q = (selector, root = document) => root.querySelector(selector);
  const meta = () => q('.lesson-layout .eyebrow')?.textContent.trim() || '';
  const has = unit => meta().endsWith(` · ${unit}`);
  const num = n => Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, '');
  const signed = n => n < 0 ? ` − ${num(Math.abs(n))}` : ` + ${num(n)}`;
  const xTerm = h => h === 0 ? 'x' : h > 0 ? `x − ${num(h)}` : `x + ${num(-h)}`;

  function quadraticLab() {
    return `<section class="concept-lab quadratic-lab" aria-label="二次函數互動圖形實驗室">
      <header class="concept-lab-head"><div class="eyebrow">拖拉後立即看見</div><h2>二次函數圖形實驗室</h2><p>改變一個參數，觀察哪一個圖形特徵跟著變。先預測，再拖拉驗證；這比背「開口、頂點、對稱軸」更能理解它們的關係。</p></header>
      <div class="lab-grid"><div class="quadratic-stage"><svg class="quadratic-graph" viewBox="0 0 620 390" role="img" aria-label="可隨參數變化的拋物線圖"><g data-quad-grid></g><g data-quad-axes></g><line data-quad-axis class="quad-symmetry"/><polyline data-quad-curve class="quad-curve"/><g data-quad-points></g><g data-quad-labels></g></svg></div>
      <aside class="lab-controls"><div class="slider-card"><label for="qa">a：決定開口與寬窄 <output data-value="a">1</output></label><input id="qa" data-quad="a" type="range" min="-3" max="3" step="0.5" value="1" /></div><div class="slider-card"><label for="qh">h：頂點左右位置 <output data-value="h">0</output></label><input id="qh" data-quad="h" type="range" min="-4" max="4" step="1" value="0" /></div><div class="slider-card"><label for="qk">k：頂點上下位置 <output data-value="k">-4</output></label><input id="qk" data-quad="k" type="range" min="-4" max="4" step="1" value="-4" /></div><p class="equation-chip" data-equation></p><div class="lab-insight" data-quad-insight></div><div class="lab-challenge"><b>小挑戰</b><br><span data-challenge>把圖形調成「開口向下」再按檢查。</span><button type="button" data-quad-check>檢查我的圖</button><span class="challenge-feedback" data-challenge-feedback></span></div></aside></div>
      <div class="lab-activity"><h3>用圖回答，而不是背句子</h3><p>現在的圖形，哪個敘述正確？</p><div class="choice-board" data-quad-choices><button type="button" data-answer="direction">開口方向由 a 的正負決定</button><button type="button" data-answer="axis">對稱軸永遠是 y 軸</button><button type="button" data-answer="vertex">頂點不能移動</button></div><p class="activity-result" data-quad-result></p></div></section>`;
  }

  function renderQuadratic(lab) {
    const state = { a: +q('[data-quad="a"]', lab).value, h: +q('[data-quad="h"]', lab).value, k: +q('[data-quad="k"]', lab).value };
    if (state.a === 0) { state.a = 0.5; q('[data-quad="a"]', lab).value = '0.5'; }
    Object.entries(state).forEach(([key, value]) => q(`[data-value="${key}"]`, lab).textContent = num(value));
    q('[data-equation]', lab).textContent = `y = ${num(state.a)}(${xTerm(state.h)})²${signed(state.k)}`;
    const origin = { x: 310, y: 195 }, scale = 38, px = x => origin.x + x * scale, py = y => origin.y - y * scale;
    let grid = '', labels = '';
    for (let i = -7; i <= 7; i++) { grid += `<line class="quad-grid" x1="${px(i)}" y1="0" x2="${px(i)}" y2="390"/><line class="quad-grid" x1="0" y1="${py(i)}" x2="620" y2="${py(i)}"/>`; if (i && i >= -6 && i <= 6) labels += `<text class="quad-tick" x="${px(i) - 4}" y="${origin.y + 16}">${i}</text>`; }
    q('[data-quad-grid]', lab).innerHTML = grid;
    q('[data-quad-axes]', lab).innerHTML = `<line class="quad-axis" x1="0" y1="${origin.y}" x2="620" y2="${origin.y}"/><line class="quad-axis" x1="${origin.x}" y1="0" x2="${origin.x}" y2="390"/>`;
    q('[data-quad-labels]', lab).innerHTML = labels;
    const points = [];
    for (let x = -8; x <= 8; x += .08) { const y = state.a * (x - state.h) ** 2 + state.k; if (y > -8 && y < 8) points.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`); }
    q('[data-quad-curve]', lab).setAttribute('points', points.join(' '));
    const axis = q('[data-quad-axis]', lab); axis.setAttribute('x1', px(state.h)); axis.setAttribute('x2', px(state.h)); axis.setAttribute('y1', 0); axis.setAttribute('y2', 390);
    let roots = []; const r2 = -state.k / state.a; if (r2 >= 0) roots = [state.h - Math.sqrt(r2), state.h + Math.sqrt(r2)];
    q('[data-quad-points]', lab).innerHTML = `<circle class="quad-point" cx="${px(state.h)}" cy="${py(state.k)}" r="7"/><text class="quad-label" x="${px(state.h) + 9}" y="${py(state.k) - 10}">頂點 (${num(state.h)}, ${num(state.k)})</text>${roots.map((x, i) => `<circle class="quad-point" cx="${px(x)}" cy="${origin.y}" r="5"/><text class="quad-label" x="${px(x) - 8}" y="${origin.y - 10}">${num(x)}</text>`).join('')}`;
    const opening = state.a > 0 ? '向上' : '向下'; const width = Math.abs(state.a) > 1 ? '較窄' : Math.abs(state.a) < 1 ? '較寬' : '標準寬度';
    q('[data-quad-insight]', lab).innerHTML = `<p><b>你看到的規律</b></p><p>a = ${num(state.a)}，所以開口<b>${opening}</b>、圖形${width}。</p><p>頂點是 <b>(${num(state.h)}, ${num(state.k)})</b>；虛線對稱軸是 <b>x = ${num(state.h)}</b>。</p><p>${roots.length ? `x 軸交點：<b>${roots.map(num).join('、')}</b>` : '圖形沒有碰到 x 軸，因此沒有實數 x 軸交點。'}</p>`;
  }

  function englishLab() { return `<section class="concept-lab language-lab"><header class="concept-lab-head"><div class="eyebrow">切換情境，看見時態差別</div><h2>英文現在式／進行式造句器</h2><p>不是背 now 或 every day；先選「習慣」或「正在發生」，再讓句子結構自己告訴你為什麼。</p></header><div class="lab-activity"><div class="sentence-parts" data-tense><button data-tense-value="habit" class="active">每天放學後</button><button data-tense-value="now">現在此刻</button></div><p class="sentence-output" data-sentence-output>Amy reads after school every day.</p><p class="activity-result" data-sentence-note>這是反覆的習慣，所以用現在簡單式：<b>reads</b>。</p></div></section>`; }
  function chineseLab() { return `<section class="concept-lab evidence-lab"><header class="concept-lab-head"><div class="eyebrow">點選句子，拆出論證骨架</div><h2>國文閱讀：主張與證據辨識板</h2><p>議論文不是一段話全部都同樣重要。請點選最能直接支持作者主張的兩句資料。</p></header><div class="lab-activity"><p><b>作者主張：</b>學校應設置可重複使用的餐具借用站。</p><div class="evidence-board" data-evidence><button data-evidence="false">一次性餐具的顏色很多，學生可以選自己喜歡的。</button><button data-evidence="true">午餐後垃圾桶中，一次性餐具約占可見垃圾的一大部分。</button><button data-evidence="true">借用站試辦兩週後，餐具垃圾量減少，且多數借用者願意歸還。</button><button data-evidence="false">有些學生喜歡帶自己的餐具。</button></div><button class="lab-challenge" type="button" data-evidence-check>檢查證據</button><p class="activity-result" data-evidence-result></p></div></section>`; }
  function socialLab() { return `<section class="concept-lab history-lab"><header class="concept-lab-head"><div class="eyebrow">按時間順序連成因果</div><h2>社會歷史：背景 → 事件 → 影響</h2><p>日期不是終點。點選每張卡，觀察同一件事如何由外在條件，改變人們的生活與城市。</p></header><div class="lab-activity"><div class="timeline-track" data-timeline><button data-step="0"><b>背景</b><br>國際貿易需求增加</button><button data-step="1"><b>事件</b><br>港口開放、商品進出</button><button data-step="2"><b>影響</b><br>人口與城市發展改變</button></div><div class="timeline-detail" data-timeline-detail><b>背景：</b>海外市場與航運連結提高，地方開始被捲入更大的貿易網絡。</div></div></section>`; }
  function physicsLab() { return `<section class="concept-lab science-lab"><header class="concept-lab-head"><div class="eyebrow">物理實驗室｜只改一個變因</div><h2>力、質量與加速度模擬器</h2><p>推力相同時，購物車越重為什麼越難加速？拖拉數值，看運動箭頭與加速度同時改變。</p></header><div class="lab-grid"><div class="physics-stage"><div class="track"><div class="cart" data-cart>▣</div><div class="motion-arrow" data-motion></div></div><p class="sentence-output" data-physics-output></p></div><aside class="lab-controls"><div class="slider-card"><label>施力 F（N）<output data-force-value>20</output></label><input data-force type="range" min="5" max="50" step="5" value="20"></div><div class="slider-card"><label>質量 m（kg）<output data-mass-value>10</output></label><input data-mass type="range" min="5" max="25" step="5" value="10"></div><div class="lab-insight"><b>模型：</b>a = F ÷ m<br>固定質量、只增加力，加速度變大；固定力、只增加質量，加速度變小。</div></aside></div><div class="lab-activity"><button class="lab-challenge" data-physics-check>檢查：若力加倍、質量不變，a 會如何？</button><p class="activity-result" data-physics-result></p></div></section>`; }
  function chemistryLab() { return `<section class="concept-lab science-lab"><header class="concept-lab-head"><div class="eyebrow">化學實驗室｜以 pH 判斷，不靠感覺</div><h2>酸鹼光譜與中和路徑</h2><p>拖動 pH 值，指示紙與粒子比例會同步改變。先以 7 為基準，再說強弱與中和。</p></header><div class="lab-grid"><div class="chem-stage"><div class="ph-scale"><div class="ph-marker" data-ph-marker></div></div><div class="ph-number" data-ph-number>pH 3</div><div class="particle-field" data-particles></div></div><aside class="lab-controls"><div class="slider-card"><label>溶液 pH <output data-ph-value>3</output></label><input data-ph type="range" min="0" max="14" step="1" value="3"></div><div class="lab-insight" data-ph-insight></div><button class="lab-challenge" data-neutralize>加入鹼性溶液，向 pH 7 中和</button></aside></div><div class="lab-activity"><p><b>判斷練習：</b>pH 3 與 pH 6 都是酸性嗎？哪一個酸性較強？</p><button class="lab-challenge" data-ph-check>顯示原理</button><p class="activity-result" data-ph-result></p></div></section>`; }
  function biologyLab() { return `<section class="concept-lab science-lab"><header class="concept-lab-head"><div class="eyebrow">生物實驗室｜族群不是單一個體</div><h2>天擇與保護色模擬</h2><p>改變環境顏色，讓你看見某一種特徵如何在多個世代後變得常見；不是生物「努力想變」就會改變。</p></header><div class="lab-activity"><div class="habitat" data-habitat><span class="bug light">●</span><span class="bug dark">●</span><span class="bug light">●</span><span class="bug dark">●</span><span class="bug light">●</span><span class="bug dark">●</span></div><div class="choice-board" data-habitat-buttons><button data-habitat-choice="light">淺色岩地</button><button data-habitat-choice="dark">深色岩地</button></div><div class="timeline-detail" data-bio-detail>請選擇環境，預測哪一種甲蟲較不容易被發現。</div></div></section>`; }
  function earthLab() { return `<section class="concept-lab science-lab"><header class="concept-lab-head"><div class="eyebrow">地科實驗室｜改變地軸朝向，不是距離</div><h2>四季日照角度觀察台</h2><p>點選北半球的季節。地球繞太陽公轉時，地軸傾斜方向大致不變；日照角度與白晝長度才是關鍵。</p></header><div class="lab-activity"><div class="season-visual"><div class="sun">☀</div><div class="earth" data-earth>🌍<i></i></div><div class="sun-rays"></div></div><div class="choice-board" data-season-buttons><button data-season="summer">北半球夏季</button><button data-season="winter">北半球冬季</button><button data-season="equinox">春／秋分</button></div><div class="timeline-detail" data-season-detail>點選季節，觀察哪一半球較傾向太陽。</div></div></section>`; }
  function unitStudyLab(subject, unit, d) {
    const icons = {國文:'✎',英文:'Aa',數學:'∿',自然:'◉',社會:'◷'};
    return `<section class="concept-lab unit-study-lab" aria-label="${unit}分節互動教材"><header class="concept-lab-head"><div class="eyebrow">每一節都要親手走一次</div><h2>${icons[subject] || '◆'} ${unit}｜互動概念路徑</h2><p>點選三個節點，讓抽象規則形成可追蹤的關係；最後用本單元情境做一次判斷，而不是直接看答案。</p></header><div class="unit-map" data-unit-map>${d.ideas.map((idea, i) => `<button type="button" class="unit-node ${i === 0 ? 'active' : ''}" data-unit-step="${i}"><span>${i + 1}</span><b>${['先建立畫面','找關係與條件','用情境驗證'][i]}</b><small>${idea}</small></button>`).join('')}</div><div class="unit-explainer" data-unit-explainer><b>第 1 節｜先建立畫面</b><p>${d.ideas[0]}</p><p><strong>想一想：</strong>${d.overview}</p></div><div class="unit-practice"><div><div class="eyebrow">互動檢核</div><h3>這個例子應該連到哪一節？</h3><p>${d.example}</p></div><div class="unit-check-buttons" data-unit-check>${d.ideas.map((idea,i)=>`<button type="button" data-unit-answer="${i}">${i+1}．${['概念','關係','應用'][i]}</button>`).join('')}</div><p class="activity-result" data-unit-result>先選一個節點，再看你是否能說出「因為……所以……」。</p></div><div class="unit-recall"><b>遮住後重述：</b>${d.check}</div></section>`;
  }

  function insert() {
    if (q('.concept-lab')) return;
    const [subject, unit] = meta().split(' · '); const d = window.TEXTBOOK_CONTENT?.[`${window.__lessonGrade || 7}|${subject}|${unit}`];
    let markup = '';
    if (has('二次函數與圖形') || has('二次函數')) markup = quadraticLab();
    else if (has('力、運動、能量與電') || has('力與運動') || has('電磁、能源與科技')) markup = physicsLab();
    else if (has('物質、粒子與化學反應') || has('化學反應') || has('酸鹼鹽與化學反應') || has('酸鹼與指示劑')) markup = chemistryLab();
    else if (has('生態系與生物分類') || has('神經、恆定與演化') || has('神經與恆定') || has('遺傳與演化')) markup = biologyLab();
    else if (has('地球環境與宇宙') || has('氣候與地球系統') || has('天文、地質與永續') || has('板塊與地質') || has('天文與永續')) markup = earthLab();
    else if (has('現在式與進行式')) markup = englishLab();
    else if (has('記敘、說明、議論文本')) markup = chineseLab();
    else if (has('臺灣史、中國史與世界史')) markup = socialLab();
    if (!markup && !d) return;
    if (d) markup += unitStudyLab(subject, unit, d);
    const slot = document.createElement('div'); slot.innerHTML = markup;
    const lab = slot.firstElementChild; (q('.heart-lab') || q('.visual-box') || q('.concept'))?.after(lab);
    const unitLab = q('.unit-study-lab', slot) || (lab.classList.contains('unit-study-lab') ? lab : null);
    if (unitLab && lab !== unitLab) lab.after(unitLab);
    if (lab.classList.contains('quadratic-lab')) renderQuadratic(lab);
    if (lab.querySelector('.physics-stage')) renderPhysics(lab);
    if (lab.querySelector('.chem-stage')) renderChemistry(lab);
  }

  app.addEventListener('input', event => { const lab = event.target.closest('.quadratic-lab'); if (lab && event.target.matches('[data-quad]')) renderQuadratic(lab); });
  app.addEventListener('click', event => {
    const lab = event.target.closest('.concept-lab'); if (!lab) return;
    if (event.target.closest('[data-quad-check]')) { const a = +q('[data-quad="a"]', lab).value; q('[data-challenge-feedback]', lab).textContent = a < 0 ? '成功！a < 0，所以拋物線開口向下。' : '再試一次：把 a 拖到負數，圖形才會向下開口。'; return; }
    if (event.target.closest('[data-physics-check]')) { q('[data-physics-result]', lab).className = 'activity-result good'; q('[data-physics-result]', lab).textContent = '會加倍。由 a = F ÷ m 可知，m 不變、F 加倍，a 也加倍。'; return; }
    if (event.target.closest('[data-neutralize]')) { const slider = q('[data-ph]', lab); slider.value = Math.min(7, +slider.value + 1); renderChemistry(lab); return; }
    if (event.target.closest('[data-ph-check]')) { q('[data-ph-result]', lab).className = 'activity-result good'; q('[data-ph-result]', lab).textContent = '兩者都小於 7，因此都是酸性；pH 3 比 pH 6 更酸。先比較與 7 的位置，不要把酸鹼性和安全性混為一談。'; return; }
    const answer = event.target.closest('[data-quad-choices] button'); if (answer) { const good = answer.dataset.answer === 'direction'; q('[data-quad-result]', lab).className = `activity-result ${good ? 'good' : 'bad'}`; q('[data-quad-result]', lab).textContent = good ? '正確：改變 a 的正負，你已親眼看到開口翻轉。' : '先拖動 h：虛線會左右移動；拖動 k：頂點會上下移動。'; return; }
    const unitStep = event.target.closest('[data-unit-step]'); if (unitStep) { const i = +unitStep.dataset.unitStep, unitLab = unitStep.closest('.unit-study-lab'), idea = unitStep.querySelector('small').textContent; unitLab.querySelectorAll('[data-unit-step]').forEach(x => x.classList.toggle('active', x === unitStep)); q('[data-unit-explainer]', unitLab).innerHTML = `<b>第 ${i + 1} 節｜${['先建立畫面','找關係與條件','用情境驗證'][i]}</b><p>${idea}</p><p><strong>帶著做：</strong>${i === 0 ? '先把規則用圖、箭頭、數線或自己的例子畫出來。' : i === 1 ? '圈出題目條件，逐一連回剛才建立的概念。' : '用下方例子說出「因為……所以……」，確認不是只記住句子。'}</p>`; return; }
    const unitAnswer = event.target.closest('[data-unit-answer]'); if (unitAnswer) { const unitLab = unitAnswer.closest('.unit-study-lab'), picked = +unitAnswer.dataset.unitAnswer; unitLab.querySelectorAll('[data-unit-answer]').forEach(x => x.classList.toggle('active', x === unitAnswer)); q('[data-unit-result]', unitLab).className = 'activity-result good'; q('[data-unit-result]', unitLab).textContent = `你選擇第 ${picked + 1} 節。重點不是背標籤：請用例子補完「因為題目有……，所以我先用……來判斷」。`; return; }
    const tense = event.target.closest('[data-tense-value]'); if (tense) { q('[data-tense-value].active', lab)?.classList.remove('active'); tense.classList.add('active'); const now = tense.dataset.tenseValue === 'now'; q('[data-sentence-output]', lab).textContent = now ? 'Amy is reading now.' : 'Amy reads after school every day.'; q('[data-sentence-note]', lab).innerHTML = now ? '「now」指向正在發生，所以結構是 <b>is + reading</b>。' : '這是反覆的習慣，所以用現在簡單式：<b>reads</b>。'; return; }
    const evidence = event.target.closest('[data-evidence] button'); if (evidence) { evidence.classList.toggle('selected'); return; }
    if (event.target.closest('[data-evidence-check]')) { const selected = [...lab.querySelectorAll('[data-evidence].selected')]; const correct = selected.length === 2 && selected.every(x => x.dataset.evidence === 'true'); lab.querySelectorAll('[data-evidence] button').forEach(x => x.classList.add(x.dataset.evidence === 'true' ? 'correct' : 'wrong')); q('[data-evidence-result]', lab).className = `activity-result ${correct ? 'good' : 'bad'}`; q('[data-evidence-result]', lab).textContent = correct ? '答對：這兩句提供了垃圾量與試辦結果，能直接支持「應設置」的主張。' : '證據必須能回答「為什麼要設置」。喜好本身不足以支持政策；垃圾量與試辦成果才是可檢驗的理由。'; return; }
    const step = event.target.closest('[data-step]'); if (step) { const copy = ['<b>背景：</b>海外市場與航運連結提高，地方開始被捲入更大的貿易網絡。','<b>事件：</b>港口開放後，商品、人員與制度的流動加速；這是「發生了什麼」。','<b>影響：</b>貿易機會改變工作、人口移動與城市發展；這才是歷史題要追問的「改變了誰」。']; lab.querySelectorAll('[data-step]').forEach(x => x.classList.toggle('active', x === step)); q('[data-timeline-detail]', lab).innerHTML = copy[+step.dataset.step]; }
    const habitat = event.target.closest('[data-habitat-choice]'); if (habitat) { const dark = habitat.dataset.habitatChoice === 'dark'; q('[data-habitat]', lab).classList.toggle('dark-ground', dark); q('[data-bio-detail]', lab).innerHTML = dark ? '<b>深色岩地：</b>深色甲蟲較不容易被發現，較可能留下後代；多個世代後深色特徵比例可能上升。' : '<b>淺色岩地：</b>淺色甲蟲較不容易被發現，較可能留下後代；是族群比例改變，不是個體主動變色。'; return; }
    const season = event.target.closest('[data-season]'); if (season) { const copy = {summer:'<b>夏季：</b>北半球傾向太陽，日照較直、白晝較長，所以較暖。', winter:'<b>冬季：</b>北半球背向太陽，日照較斜、白晝較短，所以較冷。', equinox:'<b>春／秋分：</b>兩半球得到的日照較接近，晝夜長度也接近。'}; q('[data-season-detail]', lab).innerHTML = copy[season.dataset.season]; q('[data-earth]',lab).className = `earth ${season.dataset.season}`; }
  });
  app.addEventListener('input', event => { const lab = event.target.closest('.science-lab'); if (!lab) return; if (event.target.matches('[data-force], [data-mass]')) renderPhysics(lab); if (event.target.matches('[data-ph]')) renderChemistry(lab); });
  function renderPhysics(lab) { const F=+q('[data-force]',lab).value, m=+q('[data-mass]',lab).value, a=F/m; q('[data-force-value]',lab).textContent=F; q('[data-mass-value]',lab).textContent=m; q('[data-physics-output]',lab).textContent=`a = ${F} ÷ ${m} = ${a.toFixed(1)} m/s²`; q('[data-motion]',lab).style.width=`${Math.min(78, 14+a*22)}%`; q('[data-cart]',lab).style.left=`${Math.min(74, 8+a*18)}%`; }
  function renderChemistry(lab) { const ph=+q('[data-ph]',lab).value, acid=ph<7, neutral=ph===7; q('[data-ph-value]',lab).textContent=ph; q('[data-ph-number]',lab).textContent=`pH ${ph}`; q('[data-ph-marker]',lab).style.left=`${ph/14*100}%`; q('[data-ph-insight]',lab).innerHTML=neutral ? '<b>中性：</b>pH = 7。酸、鹼不是「消失」，而是溶液的酸鹼性達到中性附近。' : `<b>${acid?'酸性':'鹼性'}：</b>pH ${acid?'<':'>'} 7。${acid?'越靠近 0，酸性越強。':'越靠近 14，鹼性越強。'}`; q('[data-particles]',lab).innerHTML=Array.from({length:9},(_,i)=>`<span class="${acid?'h-ion':'oh-ion'}">${acid?'H⁺':'OH⁻'}</span>`).join(''); }
  new MutationObserver(insert).observe(app, { childList: true, subtree: true }); insert();
  document.addEventListener('DOMContentLoaded', () => { app.querySelectorAll('.physics-stage').forEach(renderPhysics); app.querySelectorAll('.chem-stage').forEach(renderChemistry); });
})();
