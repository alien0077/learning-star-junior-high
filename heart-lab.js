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
  const cutawayCues = [
    "第 1 步：在長軸剖面找上、下腔靜脈回到右心房的入口。",
    "第 2 步：定位右心房；它先接收全身回流的血。",
    "第 3 步：從右心房往下找右心室與房室瓣，血經瓣膜前進。",
    "第 4 步：由右心室追到肺動脈；它把血送往肺部交換氣體。",
    "第 5 步：在剖面上方辨認肺靜脈回流；它帶回含氧較多的血。",
    "第 6 步：定位左心房，確認肺靜脈的血先進入這個腔室。",
    "第 7 步：沿瓣膜往下找左心室；它的肌肉最厚。",
    "第 8 步：由左心室一路追到主動脈；血由此送往全身。"
  ];

  document.addEventListener("click", event => {
    const stepButton = event.target.closest("[data-heart-step]");
    if (stepButton) {
      const index = Number(stepButton.dataset.heartStep);
      document.querySelectorAll("[data-heart-step]").forEach(button => button.classList.toggle("active", button === stepButton));
      document.querySelectorAll(".route, .flow-route").forEach(route => route.classList.remove("is-active"));
      document.querySelectorAll(`.r${index + 1}`).forEach(route => route.classList.add("is-active"));
      const callout = document.querySelector("#heartCallout");
      if (callout) callout.innerHTML = `<b>第 ${index + 1} 步｜${stepButton.textContent.trim()}</b><span>${steps[index]}</span>`;
      const cutawayCue = document.querySelector("[data-heart-cutaway-cue]");
      if (cutawayCue) cutawayCue.textContent = cutawayCues[index];
      const cutawayCallout = document.querySelector("[data-heart-cutaway-callout]");
      if (cutawayCallout) cutawayCallout.innerHTML = `<b>第 ${index + 1} 步｜${stepButton.textContent.trim()}</b><span>${steps[index]}</span>`;
      return;
    }
    if (event.target.closest("[data-heart-reveal]")) document.querySelector("#heartReveal").hidden = false;
    const viewButton = event.target.closest("[data-heart-view]");
    if (viewButton) {
      document.querySelectorAll("[data-heart-view]").forEach(button => button.classList.toggle("active", button === viewButton));
      const diagram = document.querySelector(".anatomical-heart");
      const viewer = document.querySelector("[data-heart-3d-view]");
      const cutawayViewer = document.querySelector("[data-heart-cutaway-view]");
      const isThreeD = viewButton.dataset.heartView === "threeD";
      if (viewer) viewer.hidden = !isThreeD;
      if (cutawayViewer) cutawayViewer.hidden = isThreeD;
      if (diagram) diagram.closest(".heart-diagram-wrap").hidden = true;
    }
  });
})();
