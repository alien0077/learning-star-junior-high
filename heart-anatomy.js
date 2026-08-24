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
        <!-- 血液循環路徑疊加層（完全照維基百科心臟圖，白色箭頭在心臟內部） -->
        <svg class="blood-overlay" viewBox="0 0 640 640" aria-hidden="true">
          <defs>
            <!-- 白色粗箭頭（依維基百科樣式） -->
            <marker id="aw" markerWidth="12" markerHeight="9" refX="11" refY="4.5" orient="auto"><path d="M0,0 L0,9 L12,4.5z" fill="#fff"/></marker>
            <filter id="glow"><feDropShadow stdDeviation="1.5" flood-color="#fff" flood-opacity="0.95"/></filter>
          </defs>

          <!-- ============================================================
               完全照維基百科《心臟》標準圖
               白色粗箭頭標示血流方向，全部在心臟輪廓內部
               ============================================================ -->

          <!-- ===== 白色方向箭頭（一一對應 wiki.png） ===== -->
          <!-- ① 上腔大靜脈 → ↓ 右心房 -->
          <path d="M78,115 L78,170" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ② 下腔大靜脈 → ↑ 右心房 -->
          <path d="M78,410 L78,355" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ③ 右心房 → ↓ 三尖瓣 → 右心室 -->
          <path d="M108,250 L108,300" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ④ 右心室 → ↑ 肺動脈瓣 → 肺動脈 -->
          <path d="M148,295 L175,210" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑤ 肺動脈 → ↑ 分支到肺（左） -->
          <path d="M250,105 L210,80" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑥ 肺動脈 → ↑ 分支到肺（右） -->
          <path d="M300,100 L340,78" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑦ 肺靜脈 → ↓ 左心房（從右側進入） -->
          <path d="M445,130 L435,175" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑧ 左心房 → ↓ 二尖瓣 → 左心室 -->
          <path d="M425,235 L420,280" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑨ 左心室 → ↑ 大動脈瓣 → 大動脈 -->
          <path d="M400,285 L365,200" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>
          <!-- ⑩ 大動脈 → ↑ 到全身 -->
          <path d="M270,70 L235,48" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#aw)"/>

          <!-- ===== 動態血流粒子路徑（在心臟內部流動） ===== -->
          <!-- 藍色循環：上腔靜脈→右心房→右心室→肺動脈→肺 -->
          <path id="pDeoxy"
                d="M78,95 L78,165 C78,195 90,215 108,235 C108,250 110,265 115,280 C118,295 130,310 145,295 C155,280 165,255 175,225 C185,200 200,175 225,155 C250,135 275,115 305,100 L350,78"
                fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
          <path d="M78,95 L78,165 C78,195 90,215 108,235 C108,250 110,265 115,280 C118,295 130,310 145,295 C155,280 165,255 175,225 C185,200 200,175 225,155 C250,135 275,115 305,100 L350,78"
                fill="none" stroke="#5ba8e0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>

          <!-- 紅色循環：肺→肺靜脈→左心房→左心室→大動脈→全身 -->
          <path id="pOxy"
                d="M350,78 L395,95 C415,108 430,125 438,150 C442,170 440,190 435,210 C432,225 428,245 422,265 C418,280 408,295 395,285 C380,270 365,245 350,215 C340,195 325,170 305,150 C285,130 265,108 240,88 L215,65 L195,45"
                fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>
          <path d="M350,78 L395,95 C415,108 430,125 438,150 C442,170 440,190 435,210 C432,225 428,245 422,265 C418,280 408,295 395,285 C380,270 365,245 350,215 C340,195 325,170 305,150 C285,130 265,108 240,88 L215,65 L195,45"
                fill="none" stroke="#e87580" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>

          <!-- ===== 腔室標示 ===== -->
          <g class="chamber-labels" filter="url(#glow)">
            <text x="72" y="230" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心房</text>
            <text x="95" y="330" font-size="15" font-weight="900" fill="#1a3a5c" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">右心室</text>
            <text x="400" y="200" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心房</text>
            <text x="390" y="300" font-size="15" font-weight="900" fill="#8b1a2b" paint-order="stroke" stroke="#fff" stroke-width="4px" stroke-linejoin="round">左心室</text>
          </g>

          <!-- ===== 血管標示 ===== -->
          <text x="8" y="88" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">上腔大靜脈</text>
          <text x="8" y="430" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">下腔大靜脈</text>
          <text x="248" y="98" font-size="12" font-weight="700" fill="#2d8bc9" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺動脈</text>
          <text x="448" y="128" font-size="12" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺靜脈</text>
          <text x="278" y="118" font-size="13" font-weight="700" fill="#d4354e" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">大動脈</text>
          <text x="360" y="65" font-size="11" font-weight="700" fill="#2d7a3f" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">肺</text>
          <text x="180" y="38" font-size="11" font-weight="700" fill="#c62828" paint-order="stroke" stroke="#fff" stroke-width="3px" stroke-linejoin="round">全身</text>

          <!-- ===== 瓣膜標示（照維基百科命名） ===== -->
          <text x="55" y="310" font-size="10" font-weight="700" fill="#4a6a8a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">三尖瓣</text>
          <text x="55" y="258" font-size="10" font-weight="700" fill="#4a6a8a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">肺動脈瓣／半月瓣</text>
          <text x="448" y="248" font-size="10" font-weight="700" fill="#8b4a5a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">二尖瓣</text>
          <text x="448" y="288" font-size="10" font-weight="700" fill="#8b4a5a" paint-order="stroke" stroke="#fff" stroke-width="2.5px" stroke-linejoin="round">大動脈瓣／半月瓣</text>

          <!-- ===== 動態血流粒子（白色外框 + 藍/紅填充） ===== -->
          <!-- 藍色粒子 x3 -->
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" begin="-1.67s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5s" begin="-1.67s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" begin="-3.33s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>
          <circle r="4.5" fill="#2d8bc9"><animateMotion dur="5s" begin="-3.33s" repeatCount="indefinite" rotate="auto"><mpath href="#pDeoxy"/></animateMotion></circle>

          <!-- 紅色粒子 x3 -->
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" begin="-1.67s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5s" begin="-1.67s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="7" fill="#fff" opacity="0.92"><animateMotion dur="5s" begin="-3.33s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>
          <circle r="4.5" fill="#d4354e"><animateMotion dur="5s" begin="-3.33s" repeatCount="indefinite" rotate="auto"><mpath href="#pOxy"/></animateMotion></circle>

          <!-- 底部說明 -->
          <text x="320" y="625" text-anchor="middle" font-size="11" fill="#60758a" font-weight="600">圖中左、右為「人體的左、右」；面對圖時方向與你自己相反</text>
        </svg>
      </div>
      <figcaption id="heartFlowCaption"><b>動態血流示意</b>：藍色粒子為含氧較少的血液（全身→右心→肺），紅色粒子為含氧較多的血液（肺→左心→全身）。<a href="https://commons.wikimedia.org/wiki/File:P_Anatomy.svg" target="_blank" rel="noopener">底圖：P Anatomy.svg（Public Domain）</a>；配置參考<a href="https://zh.wikipedia.org/zh-tw/%E5%B7%A6%E5%BF%83%E5%AE%A4" target="_blank" rel="noopener">維基百科〈左心室〉</a>。</figcaption>
    </figure>
  </section>`;
