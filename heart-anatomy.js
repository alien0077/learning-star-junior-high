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
        <img src="assets/p-anatomy-pd.svg" alt="人體心臟解剖示意圖，呈現左右心房、心室、主動脈及腔靜脈" />
        <svg class="blood-particles" viewBox="0 0 690 468" aria-hidden="true">
          <path id="blueFlowA" d="M182 54 C178 128 214 158 240 209 C250 255 255 317 295 356"/>
          <path id="blueFlowB" d="M298 356 C275 296 242 220 191 164"/>
          <path id="redFlowA" d="M463 153 C426 165 407 202 412 253 C418 298 439 335 469 371"/>
          <path id="redFlowB" d="M469 371 C506 288 515 186 499 90"/>
          <circle class="blood-particle blue" r="7"><animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto"><mpath href="#blueFlowA"/></animateMotion></circle>
          <circle class="blood-particle blue" r="7"><animateMotion dur="3.4s" begin="-1.7s" repeatCount="indefinite" rotate="auto"><mpath href="#blueFlowB"/></animateMotion></circle>
          <circle class="blood-particle red" r="7"><animateMotion dur="3.4s" begin="-0.8s" repeatCount="indefinite" rotate="auto"><mpath href="#redFlowA"/></animateMotion></circle>
          <circle class="blood-particle red" r="7"><animateMotion dur="3.4s" begin="-2.5s" repeatCount="indefinite" rotate="auto"><mpath href="#redFlowB"/></animateMotion></circle>
        </svg>
      </div>
      <figcaption id="heartFlowCaption"><b>動態血流示意</b>：以流動粒子呈現回流、肺循環與體循環。底圖為 Wikimedia Commons 的 <a href="https://commons.wikimedia.org/wiki/File:P_Anatomy.svg" target="_blank" rel="noopener">P Anatomy.svg</a>，作者已釋出為公有領域；配置參考<a href="https://zh.wikipedia.org/zh-tw/%E5%B7%A6%E5%BF%83%E5%AE%A4" target="_blank" rel="noopener">維基百科〈左心室〉</a>。</figcaption>
    </figure>
  </section>`;
