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
      <div class="heart-flow-canvas">
        <!-- 原圖保留 -->
        <img src="assets/p-anatomy-pd.svg" alt="人體心臟解剖示意圖，呈現左右心房、心室、主動脈及腔靜脈" />
        <!-- 血液循環路徑疊加層 -->
        <svg class="blood-overlay" viewBox="0 0 640 640" aria-hidden="true">
          <defs>
            <marker id="aB" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#2d8bc9"/></marker>
            <marker id="aR" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3z" fill="#d4354e"/></marker>
            <filter id="glow"><feDropShadow stdDeviation="1.5" flood-color="#fff" flood-opacity="0.95"/></filter>
          </defs>

          <!-- ============================================================
               血液循環路徑 — 座標以原圖 SVG（640×640 viewBox）為準
               圖中左側 = 人體右側（藍色、含氧少）
               圖中右側 = 人體左側（紅色、含氧多）
               ============================================================ -->

          <!-- ▸ 藍色循環（含氧少）：全身 → 上下腔靜脈 → 右心房 → 右心室 → 肺動脈 → 肺 -->
          <path id="pDeoxy"
                d="M30,110 L75,110 L110,155 L110,205 L115,260 L130,290 L145,250 L175,180 L210,145 L260,110 L305,80 L340,60"
                fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.88"/>
          <path d="M30,110 L75,110 L110,155 L110,205 L115,260 L130,290 L145,250 L175,180 L210,145 L260,110 L305,80 L340,60"
                fill="none" stroke="#5ba8e0" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>

          <!-- ▸ 紅色循環（含氧多）：肺 → 肺靜脈 → 左心房 → 左心室 → 主動脈 → 全身 -->
          <path id="pOxy"
                d="M340,60 L380,80 L410,110 L430,155 L430,205 L425,260 L410,290 L395,250 L370,180 L340,145 L310,110 L290,80 L270,50 L255,30"
                fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" opacity="0.88"/>
          <path d="M340,60 L380,80 L410,110 L430,155 L430,205 L425,260 L410,290 L395,250 L370,180 L340,145 L310,110 L290,80 L270,50 L255,30"
                fill="none" stroke="#e87580" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>

          <!-- ===== 方向箭頭 ===== -->
          <!-- 藍色：腔靜脈→右心房 -->
          <path d="M85,110 L105,145" stroke="#2d8bc9" stroke-width="2" fill="none" marker-end="url(#aB)"/>
          <!-- 藍色：右心房→右心室 -->
          <path d="M110,215 L115,250" stroke="#2d8bc9" stroke-width="2" fill="none" marker-end="url(#aB)"/>
          <!-- 藍色：右心室→肺動脈 -->
          <path d="M135,275 L165,195" stroke="#2d8bc9" stroke-width="2" fill="none" marker-end="url(#aB)"/>
          <!-- 藍色：肺動脈→肺 -->
          <path d="M275,105 L310,82" stroke="#2d8bc9" stroke-width="2" fill="none" marker-end="url(#aB)"/>

          <!-- 紅色：肺→肺靜脈 -->
          <path d="M355,68 L375,82" stroke="#d4354e" stroke-width="2" fill="none" marker-end="url(#aR)"/>
          <!-- 紅色：肺靜脈→左心房 -->
          <path d="M420,120 L435,170" stroke="#d4354e" stroke-width="2" fill="none" marker-end="url(#aR)"/>
          <!-- 紅色：左心房→左心室 -->
          <path d="M430,215 L425,250" stroke="#d4354e" stroke-width="2" fill="none" marker-end="url(#aR)"/>
          <!-- 紅色：左心室→主動脈 -->
          <path d="M405,275 L380,195" stroke="#d4354e" stroke-width="2" fill="none" marker-end="url(#aR)"/>
          <!-- 紅色：主動脈→全身 -->
          <path d="M280,55 L260,35" stroke="#d4354e" stroke-width="2" fill="none" marker-end="url(#aR)"/>

          <!-- ===== 腔室標示（白底深字，清晰可讀） ===== -->
          <g class="chamber-labels" filter="url(#glow)">
            <text x="85" y="215" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心房</text>
            <text x="90" y="295" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心室</text>
            <text x="400" y="215" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心房</text>
            <text x="400" y="295" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心室</text>
          </g>

          <!-- ===== 血管標示 ===== -->
          <text x="18" y="100" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">腔靜脈</text>
          <text x="225" y="138" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺動脈</text>
          <text x="440" y="130" font-size="12" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺靜脈</text>
          <text x="310" y="138" font-size="12" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">主動脈</text>
          <text x="330" y="50" font-size="11" font-weight="700" fill="#2d7a3f" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺</text>
          <text x="240" y="22" font-size="11" font-weight="700" fill="#c62828" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">全身</text>

          <!-- ===== 動態血流粒子（白色外框 + 藍/紅填充） ===== -->
          <!-- 藍色粒子 x3 -->
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" begin="-1.83s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5.5s" begin="-1.83s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" begin="-3.66s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5.5s" begin="-3.66s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>

          <!-- 紅色粒子 x3 -->
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" begin="-1.83s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5.5s" begin="-1.83s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5.5s" begin="-3.66s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5.5s" begin="-3.66s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>

          <!-- 底部說明 -->
          <text x="320" y="625" text-anchor="middle" font-size="11" fill="#60758a" font-weight="600">圖中左、右為「人體的左、右」；面對圖時方向與你自己相反</text>
        </svg>
      </div>
      <figcaption id="heartFlowCaption"><b>動態血流示意</b>：藍色粒子為含氧較少的血液（全身→右心→肺），紅色粒子為含氧較多的血液（肺→左心→全身）。<a href="https://commons.wikimedia.org/wiki/File:P_Anatomy.svg" target="_blank" rel="noopener">底圖：P Anatomy.svg（Public Domain）</a>；配置參考<a href="https://zh.wikipedia.org/zh-tw/%E5%B7%A6%E5%BF%83%E5%AE%A4" target="_blank" rel="noopener">維基百科〈左心室〉</a>。</figcaption>
    </figure>
  </section>`;
