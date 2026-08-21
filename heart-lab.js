/* 心臟課的步驟式互動：以血液方向建立概念，不以裝飾性的假 3D 取代學習。 */
(() => {
  const steps = [
    "全身組織使用氧氣後，含氧較少的血由上、下腔靜脈回到心臟。",
    "右心房接收來自全身的血；它是入口，不是主要送血的幫浦。",
    "血通過瓣膜進入右心室；右心室收縮時把血送往肺部。",
    "血由肺動脈離開心臟，到肺泡周圍交換二氧化碳和氧氣。",
    "交換後的含氧血由肺靜脈回到心臟。肺靜脈是少數帶含氧血的靜脈。",
    "左心房接收肺靜脈回流的含氧血。",
    "血進入左心室；它的心肌最厚，因為要把血送到全身。",
    "左心室收縮，血由主動脈離開，送到全身微血管進行物質交換。"
  ];

  document.addEventListener("click", event => {
    const stepButton = event.target.closest("[data-heart-step]");
    if (stepButton) {
      const index = Number(stepButton.dataset.heartStep);
      document.querySelectorAll("[data-heart-step]").forEach(button => button.classList.toggle("active", button === stepButton));
      document.querySelectorAll(".route").forEach(route => route.classList.remove("is-active"));
      document.querySelector(`.r${index + 1}`)?.classList.add("is-active");
      const callout = document.querySelector("#heartCallout");
      if (callout) callout.innerHTML = `<b>第 ${index + 1} 步｜${stepButton.textContent.trim()}</b><span>${steps[index]}</span>`;
      return;
    }
    if (event.target.closest("[data-heart-reveal]")) document.querySelector("#heartReveal").hidden = false;
    const viewButton = event.target.closest("[data-heart-view]");
    if (viewButton) {
      document.querySelectorAll("[data-heart-view]").forEach(button => button.classList.toggle("active", button === viewButton));
      const diagram = document.querySelector(".anatomical-heart");
      const viewer = document.querySelector("[data-heart-3d-view]");
      const isThreeD = viewButton.dataset.heartView === "threeD";
      if (viewer) viewer.hidden = !isThreeD;
      if (diagram) diagram.closest(".heart-diagram-wrap").hidden = isThreeD;
      if (diagram) diagram.classList.remove("is-surface");
    }
  });
})();
