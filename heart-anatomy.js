/* 心臟 3D 與血流圖：外觀與剖面均採面對人體的正面起始視角。 */
window.heartAnatomyLab = () => `
  <section class="heart-lab anatomical-heart-lab" aria-label="心臟立體與血流圖">
    <div class="lab-heading">
      <div>
        <span class="eyebrow">循環系統實驗室</span>
        <h3>面對人體的心臟視角</h3>
        <p>預設畫面左側是上、下腔靜脈（通往右心房），符合人眼面對對方身體時的方向。兩個立體視圖都可任意拖曳探索，不限制水平或垂直旋轉。</p>
      </div>
      <div class="oxygen-key"><span class="blood deoxy"></span>含氧較少 <span class="blood oxy"></span>含氧較多</div>
    </div>

    <div class="heart-view-tabs" role="group" aria-label="心臟立體視圖">
      <button class="active" data-heart-view="threeD">心臟 3D</button>
      <button data-heart-view="cutaway">剖面 3D</button>
    </div>

    <div class="heart-3d-view" data-heart-3d-view>
      <div class="heart-3d-stage" aria-label="可自由旋轉的人類心臟三維模型">
        <model-viewer data-heart-3d-object title="可自由旋轉的人類心臟三維模型" src="assets/nih-heart-surface.glb" alt="面對人體的心臟正面三維模型，畫面左側可見上、下腔靜脈" camera-controls interaction-prompt="none" camera-orbit="0deg 90deg 105%" shadow-intensity="1" exposure="1.05"></model-viewer>
        <button class="reset-3d-view" data-heart-reset-view>回到面對人體視角</button>
      </div>
      <p>起始方向：上、下腔靜脈在畫面左側；拖曳可自由旋轉 360°。<a href="https://3d.nih.gov/entries/3DPX-022787/1.01" target="_blank" rel="noopener">外觀模型：NIH 3D（Public Domain）</a></p>
    </div>

    <div class="heart-3d-view" data-heart-cutaway-view hidden>
      <div class="heart-3d-stage heart-cutaway-3d-stage" aria-label="可自由旋轉的心臟剖面視圖">
        <div class="free-orbit" data-heart-free-orbit tabindex="0" role="application" aria-label="可拖曳旋轉的心臟剖面動畫">
          <img src="assets/cg-heart-cutaway-cc-by-sa.gif" alt="面對人體方向的心臟剖面動畫，左側為上、下腔靜脈與右心房" />
        </div>
        <button class="reset-3d-view" data-heart-reset-cutaway>回到面對人體視角</button>
      </div>
      <p>起始方向同樣讓上、下腔靜脈位於畫面左側；可自由拖曳檢視。<a href="https://commons.wikimedia.org/wiki/File:CG_heart_2.gif" target="_blank" rel="noopener">剖面動畫：CG heart 2（CC BY-SA 4.0）</a></p>
    </div>

    <figure class="heart-flow-reference" aria-labelledby="heartFlowCaption">
      <div class="heart-flow-toolbar">
        <div>
          <span class="eyebrow">八步驟血流導覽</span>
          <p id="heartFlowStatus" aria-live="polite">第 1 步／8：全身回流的血經上、下腔大靜脈進入右心房。</p>
        </div>
        <button class="heart-flow-play" type="button" data-heart-flow-play aria-pressed="false">播放 8 步驟</button>
      </div>
      <div class="heart-flow-canvas heart-flow-wiki-canvas">
        <img src="assets/heart-circulation-wiki.png" alt="依維基百科標示位置呈現的心臟剖面圖：上、下腔大靜脈、四個心腔、肺動脈、肺靜脈、主動脈和四種瓣膜" />
        <svg class="blood-overlay" viewBox="0 0 612 668" aria-hidden="true">
          <defs>
            <marker id="flowArrowBlue" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L0,7 L7,3.5z" fill="#168ddf"/></marker>
            <marker id="flowArrowRed" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L0,7 L7,3.5z" fill="#d4354e"/></marker>
          </defs>

          <!-- 所有座標直接以 wiki.png 的 612 × 668 像素尺寸標定。 -->
          <g class="flow-segment is-active" data-flow-segment="0">
            <!-- 上、下腔靜脈各自沿管腔流入右心房的開口，不畫成上下相通的一條線。 -->
            <path id="flowStep1a" class="flow-line blue" d="M176,112 L176,294 C181,318 190,340 201,357" marker-end="url(#flowArrowBlue)"/>
            <path id="flowStep1b" class="flow-line blue" d="M176,626 L176,435 C185,410 193,382 201,357" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep1a"/></animateMotion></circle>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.5s" repeatCount="indefinite"><mpath href="#flowStep1b"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="1">
            <!-- 右心房 → 三尖瓣 → 右心室。 -->
            <path id="flowStep2" class="flow-line blue" d="M201,357 C213,391 227,438 241,478 C252,497 266,516 278,528" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep2"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="2">
            <!-- 右心室 → 肺動脈瓣 → 肺動脈幹。 -->
            <path id="flowStep3" class="flow-line blue" d="M278,528 C279,505 278,490 279,476 C281,447 284,411 288,375" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep3"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="3">
            <!-- 肺動脈幹與右側分支在前景；連到左支的中段被前方結構遮住，不穿過左心房。 -->
            <path id="flowStep4" class="flow-motion" d="M288,375 L288,216 L452,216"/>
            <path class="flow-line blue" d="M288,375 L288,216"/>
            <path class="flow-line blue" d="M288,216 L452,216" marker-end="url(#flowArrowBlue)"/>
            <path class="flow-line blue flow-line-behind" d="M288,216 C245,216 195,216 145,216"/>
            <path id="flowStep4Left" class="flow-line blue" d="M145,216 L86,216" marker-end="url(#flowArrowBlue)"/>
            <text class="flow-back-label" x="205" y="205">背面</text>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep4"/></animateMotion></circle>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.4s" repeatCount="indefinite"><mpath href="#flowStep4Left"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="4">
            <!-- 兩側肺靜脈都指向左心房；虛線段代表被心臟前緣遮住的背面血管。 -->
            <path id="flowStep5" class="flow-line red" d="M505,278 C458,289 414,315 382,343" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red" d="M505,341 C458,344 414,352 382,359" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red" d="M75,278 L175,278" marker-end="url(#flowArrowRed)"/>
            <path id="flowStep5Left" class="flow-line red flow-line-behind" d="M175,278 C250,280 320,305 382,343" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red" d="M75,341 L175,341" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red flow-line-behind" d="M175,341 C250,340 320,345 382,359" marker-end="url(#flowArrowRed)"/>
            <text class="flow-back-label" x="246" y="307">背面</text>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep5"/></animateMotion></circle>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.55s" repeatCount="indefinite"><mpath href="#flowStep5Left"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="5">
            <!-- 左心房 → 二尖瓣 → 左心室。 -->
            <path id="flowStep6" class="flow-line red" d="M382,350 C386,366 389,380 390,395 C401,426 423,486 448,560" marker-end="url(#flowArrowRed)"/>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep6"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="6">
            <!-- 左心室中央先經大動脈瓣；瓣膜後的主動脈根部藏在肺動脈後方。 -->
            <path id="flowStep7" class="flow-motion" d="M390,485 C378,460 364,438 350,420 C330,385 285,330 246,250"/>
            <path class="flow-line red" d="M390,485 C378,460 364,438 350,420"/>
            <path class="flow-line red flow-line-behind" d="M350,420 C330,385 300,350 276,305"/>
            <path class="flow-line red" d="M276,305 C265,285 251,258 246,250" marker-end="url(#flowArrowRed)"/>
            <text class="flow-back-label" x="275" y="337">背面</text>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep7"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="7">
            <!-- 畫面前方可見的主動脈幹向上分到全身。 -->
            <path id="flowStep8" class="flow-motion" d="M246,250 C244,215 248,184 280,155"/>
            <path class="flow-line red" d="M246,250 C244,215 248,184 280,155"/>
            <path class="flow-line red" d="M280,155 C270,130 252,110 246,88" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red" d="M280,155 C290,130 300,105 300,82" marker-end="url(#flowArrowRed)"/>
            <path class="flow-line red" d="M280,155 C315,130 340,110 352,98" marker-end="url(#flowArrowRed)"/>
            <text class="flow-back-label" x="235" y="205">背面</text>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep8"/></animateMotion></circle>
          </g>
        </svg>
      </div>
      <div class="flow-steps heart-flow-steps" role="group" aria-label="八步驟血液流動">${['全身 → 上、下腔大靜脈 → 右心房','右心房 → 三尖瓣 → 右心室','右心室 → 肺動脈瓣 → 肺動脈','肺動脈 → 肺部','肺靜脈 → 左心房','左心房 → 二尖瓣 → 左心室','左心室 → 大動脈瓣 → 主動脈','主動脈 → 全身'].map((name,index)=>`<button type="button" class="flow-step ${index===0?'active':''}" data-heart-flow-step="${index}" aria-pressed="${index===0?'true':'false'}"><small>${index + 1}</small>${name}</button>`).join('')}</div>
      <figcaption id="heartFlowCaption"><b>動態血流示意</b>：底圖就是你指定的 wiki.png；因此所有構造名稱與位置直接沿用該圖，不再由程式重畫或猜測位置。藍色為含氧較少的血液，紅色為含氧較多的血液。圖示出處：<a href="https://zh.wikipedia.org/zh-tw/左心室#" target="_blank" rel="noopener">維基百科〈左心室〉</a>。</figcaption>
    </figure>
  </section>`;
