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
      <div class="heart-flow-canvas">
        <img src="assets/p-anatomy-pd.svg" alt="人體心臟解剖示意圖，呈現左右心房、心室、主動脈及腔靜脈" />
        <svg class="blood-overlay" viewBox="0 0 640 640" aria-hidden="true">
          <defs>
            <marker id="flowArrowBlue" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L0,12 L12,6z" fill="#168ddf"/></marker>
            <marker id="flowArrowRed" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M0,0 L0,12 L12,6z" fill="#d4354e"/></marker>
            <filter id="glow"><feDropShadow stdDeviation="1.5" flood-color="#fff" flood-opacity="0.95"/></filter>
          </defs>

          <!-- wiki.png 的循環順序；每一組只代表一個可獨立播放的步驟。 -->
          <g class="flow-segment is-active" data-flow-segment="0">
            <path id="flowStep1a" class="flow-line blue" d="M83,102 C112,155 157,202 199,240" marker-end="url(#flowArrowBlue)"/>
            <path id="flowStep1b" class="flow-line blue" d="M85,415 C112,382 150,339 190,286" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep1a"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="1">
            <path id="flowStep2" class="flow-line blue" d="M199,240 C202,264 204,292 205,316 C205,338 202,356 200,374" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep2"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="2">
            <path id="flowStep3" class="flow-line blue" d="M200,374 C184,340 188,302 195,257 C201,211 218,169 253,136" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep3"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="3">
            <path id="flowStep4" class="flow-line blue" d="M253,136 C280,110 321,91 365,82" marker-end="url(#flowArrowBlue)"/>
            <circle class="flow-particle blue" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep4"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="4">
            <path id="flowStep5" class="flow-line red" d="M478,171 C452,183 426,201 405,230" marker-end="url(#flowArrowRed)"/>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep5"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="5">
            <path id="flowStep6" class="flow-line red" d="M405,230 C403,254 403,282 407,309 C410,328 410,341 408,352" marker-end="url(#flowArrowRed)"/>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep6"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="6">
            <path id="flowStep7" class="flow-line red" d="M408,352 C387,318 379,281 377,241 C375,198 358,153 312,119" marker-end="url(#flowArrowRed)"/>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep7"/></animateMotion></circle>
          </g>
          <g class="flow-segment" data-flow-segment="7">
            <path id="flowStep8" class="flow-line red" d="M312,119 C279,92 242,70 203,49" marker-end="url(#flowArrowRed)"/>
            <circle class="flow-particle red" r="6"><animateMotion dur="1.35s" repeatCount="indefinite"><mpath href="#flowStep8"/></animateMotion></circle>
          </g>

          <!-- 名稱位置依 wiki.png：腔室名稱放在腔室內；瓣膜名稱以虛線指到正確瓣膜。 -->
          <g class="chamber-labels" filter="url(#glow)">
            <text x="155" y="260" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心房</text>
            <text x="205" y="410" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心室</text>
            <text x="390" y="240" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心房</text>
            <text x="400" y="350" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心室</text>
          </g>

          <text x="80" y="68" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">上腔大靜脈</text>
          <text x="165" y="620" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">下腔大靜脈</text>
          <text x="275" y="115" font-size="13" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">大動脈</text>
          <text x="475" y="125" font-size="12" font-weight="700" fill="#7b5ea7" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺動脈</text>
          <text x="480" y="175" font-size="12" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺靜脈</text>

          <line x1="55" y1="418" x2="175" y2="345" stroke="#4a6a8a" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text x="5" y="423" font-size="11" font-weight="700" fill="#4a6a8a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">三尖瓣</text>

          <line x1="55" y1="355" x2="175" y2="305" stroke="#4a6a8a" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text x="0" y="358" font-size="10" font-weight="700" fill="#4a6a8a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">肺動脈瓣／半月瓣</text>

          <line x1="478" y1="262" x2="415" y2="285" stroke="#8b4a5a" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text x="478" y="265" font-size="11" font-weight="700" fill="#8b4a5a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">二尖瓣</text>

          <line x1="478" y1="312" x2="400" y2="300" stroke="#8b4a5a" stroke-width="1.2" stroke-dasharray="4,3" opacity="0.7"/>
          <text x="478" y="315" font-size="10" font-weight="700" fill="#8b4a5a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">大動脈瓣／半月瓣</text>

          <text x="320" y="625" text-anchor="middle" font-size="11" fill="#60758a" font-weight="600">圖中左、右為「人體的左、右」；面對圖時方向與你自己相反</text>
        </svg>
      </div>
      <div class="flow-steps heart-flow-steps" role="group" aria-label="八步驟血液流動">${['全身 → 腔靜脈 → 右心房','右心房 → 三尖瓣 → 右心室','右心室 → 肺動脈瓣 → 肺動脈','肺動脈 → 肺部','肺靜脈 → 左心房','左心房 → 二尖瓣 → 左心室','左心室 → 大動脈瓣 → 主動脈','主動脈 → 全身'].map((name,index)=>`<button type="button" class="flow-step ${index===0?'active':''}" data-heart-flow-step="${index}" aria-pressed="${index===0?'true':'false'}"><small>${index + 1}</small>${name}</button>`).join('')}</div>
      <figcaption id="heartFlowCaption"><b>動態血流示意</b>：按任一步驟或播放導覽，圖上只高亮該段血流，避免把不同階段混在同一條線上。藍色為含氧較少的血液，紅色為含氧較多的血液。<a href="https://commons.wikimedia.org/wiki/File:P_Anatomy.svg" target="_blank" rel="noopener">底圖：P Anatomy.svg（Public Domain）</a>；名稱與相對位置參照<a href="https://zh.wikipedia.org/zh-tw/%E5%B7%A6%E5%BF%83%E5%AE%A4" target="_blank" rel="noopener">維基百科〈左心室〉</a>。</figcaption>
    </figure>
  </section>`;
