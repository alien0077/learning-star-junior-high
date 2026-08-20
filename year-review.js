/* 一學年一頁總複習，將既有課本章節合併閱讀，並內嵌官方真題題本。 */
(() => {
  const app = document.querySelector("#app");
  const official = {
    國文:"https://drive.google.com/file/d/102j8F3hoCvGgMCVP6x6oHN9cCd0R6_Ii/preview",
    英文:"https://drive.google.com/file/d/1Or0bC16Jn2hA0uAF2zrryHoY46ywIQjK/preview",
    數學:"https://drive.google.com/file/d/1c2AGC67Bq344EdGSZkO9SZhrY50hHTJx/preview",
    社會:"https://drive.google.com/file/d/1vFl3qctoBXYcCtWbAqKUqhekIMgV6q-m/preview",
    自然:"https://drive.google.com/file/d/18_lHom7zYhyOoMvxHt4hKJS_CynFOoZ1/preview"
  };
  const injectButton = () => {
    const content = app?.querySelector(".course-content");
    if (!content || content.querySelector("[data-year-review]")) return;
    const grade = content.querySelector(".eyebrow")?.textContent.match(/(\d+) 年級/)?.[1];
    if (!grade) return;
    const b=document.createElement("button"); b.className="primary year-review-button"; b.dataset.yearReview=grade; b.textContent=`${grade} 年級一頁總複習`;
    content.querySelector("p")?.after(b);
  };
  const open = grade => {
    const data = window.TEXTBOOK_CONTENT || {};
    const rows = Object.entries(data).filter(([k])=>k.startsWith(`${grade}|`));
    const grouped = ["國文","英文","數學","自然","社會"].map(subject => {
      const units=rows.filter(([k])=>k.split("|")[1]===subject);
      const unitCards = units.map(([key,d]) => { const unit=key.split("|")[2]; return `<article><h3>${unit}</h3><p>${d.overview}</p><ul>${d.ideas.map(x=>`<li>${x}</li>`).join("")}</ul><p class="year-check"><b>複習檢核：</b>${d.check}</p></article>`; }).join("");
      return `<section class="year-subject"><h2>${subject}</h2>${unitCards}<section class="official-exam"><h3>114 年國中會考 ${subject} 科｜官方歷屆真題</h3><p>以下為直接嵌入的官方題本，不是外部連結。請完成與本學年單元相關的題目，再回上方教材比對概念與解法。</p><iframe title="114年國中會考${subject}科官方題本" src="${official[subject]}" loading="lazy"></iframe></section></section>`;
    }).join("");
    app.innerHTML=`<button class="crumb" data-close-year-review>← 回到課程地圖</button><section class="year-review"><div class="eyebrow">${grade} 年級 · 一頁總複習</div><h1>一年課程，連成一張理解地圖</h1><p>依五科連續閱讀全年 20 個單元；每科末尾直接嵌入官方 114 年國中教育會考題本，作答後可回對應單元複習。</p>${grouped}</section>`;
  };
  document.addEventListener("click", e => {
    const openBtn=e.target.closest("[data-year-review]"); if(openBtn){ e.preventDefault(); open(openBtn.dataset.yearReview); }
    if(e.target.closest("[data-close-year-review]")){ e.preventDefault(); location.hash="#courses"; location.reload(); }
  },true);
  new MutationObserver(injectButton).observe(app,{childList:true,subtree:true}); injectButton();
})();
