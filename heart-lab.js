/* 心臟視圖切換與不受角度限制的剖面探索。 */
(() => {
  const frontOrbit = '0deg 90deg 105%';
  let freeOrbit = { x: 0, y: 0, startX: 0, startY: 0, baseX: 0, baseY: 0, dragging: false };

  const renderFreeOrbit = element => {
    element.style.setProperty('--orbit-x', `${freeOrbit.x}deg`);
    element.style.setProperty('--orbit-y', `${freeOrbit.y}deg`);
  };

  const resetFreeOrbit = () => {
    freeOrbit = { ...freeOrbit, x: 0, y: 0 };
    const orbit = document.querySelector('[data-heart-free-orbit]');
    if (orbit) renderFreeOrbit(orbit);
  };

  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-heart-view]');
    if (viewButton) {
      document.querySelectorAll('[data-heart-view]').forEach(button => button.classList.toggle('active', button === viewButton));
      const isThreeD = viewButton.dataset.heartView === 'threeD';
      const outer = document.querySelector('[data-heart-3d-view]');
      const cutaway = document.querySelector('[data-heart-cutaway-view]');
      if (outer) outer.hidden = !isThreeD;
      if (cutaway) cutaway.hidden = isThreeD;
      return;
    }

    if (event.target.closest('[data-heart-reset-view]')) {
      const model = document.querySelector('[data-heart-3d-object]');
      if (model) {
        model.cameraOrbit = frontOrbit;
        model.setAttribute('camera-orbit', frontOrbit);
        model.jumpCameraToGoal?.();
      }
      return;
    }

    if (event.target.closest('[data-heart-reset-cutaway]')) resetFreeOrbit();
  });

  document.addEventListener('pointerdown', event => {
    const orbit = event.target.closest('[data-heart-free-orbit]');
    if (!orbit) return;
    freeOrbit = { ...freeOrbit, dragging: true, startX: event.clientX, startY: event.clientY, baseX: freeOrbit.x, baseY: freeOrbit.y };
    orbit.setPointerCapture?.(event.pointerId);
    orbit.classList.add('is-dragging');
  });

  document.addEventListener('pointermove', event => {
    if (!freeOrbit.dragging) return;
    const orbit = document.querySelector('[data-heart-free-orbit]');
    if (!orbit) return;
    freeOrbit.x = freeOrbit.baseX + (event.clientX - freeOrbit.startX) * 0.55;
    freeOrbit.y = freeOrbit.baseY - (event.clientY - freeOrbit.startY) * 0.38;
    renderFreeOrbit(orbit);
  });

  document.addEventListener('pointerup', event => {
    if (!freeOrbit.dragging) return;
    freeOrbit = { ...freeOrbit, dragging: false };
    event.target.closest('[data-heart-free-orbit]')?.classList.remove('is-dragging');
  });
})();
