/* 心臟視圖切換與不受角度限制的剖面探索。 */
(() => {
  const frontOrbit = '0deg 90deg 105%';
  const flowSteps = [
    '全身回流的血經上、下腔大靜脈進入右心房。',
    '血由右心房穿過三尖瓣，進入右心室。',
    '右心室收縮，血穿過肺動脈瓣，流入肺動脈。',
    '肺動脈把含氧較少的血送往肺部進行氣體交換。',
    '交換後的含氧血，經肺靜脈回到左心房。',
    '血由左心房穿過二尖瓣，進入左心室。',
    '左心室收縮，血穿過大動脈瓣，流入主動脈。',
    '主動脈把含氧血送往全身組織。'
  ];
  let activeFlowStep = 0;
  let flowTimer = null;
  let freeOrbit = { x: 0, y: 0, startX: 0, startY: 0, baseX: 0, baseY: 0, dragging: false };

  const stopFlowPlayback = () => {
    if (flowTimer) window.clearInterval(flowTimer);
    flowTimer = null;
    const playButton = document.querySelector('[data-heart-flow-play]');
    if (playButton) {
      playButton.setAttribute('aria-pressed', 'false');
      playButton.textContent = '播放 8 步驟';
    }
  };

  const setFlowStep = index => {
    activeFlowStep = Math.max(0, Math.min(flowSteps.length - 1, index));
    document.querySelectorAll('[data-flow-segment]').forEach(segment => {
      segment.classList.toggle('is-active', Number(segment.dataset.flowSegment) === activeFlowStep);
    });
    document.querySelectorAll('[data-heart-flow-step]').forEach(button => {
      const isActive = Number(button.dataset.heartFlowStep) === activeFlowStep;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    const status = document.querySelector('#heartFlowStatus');
    if (status) status.textContent = `第 ${activeFlowStep + 1} 步／8：${flowSteps[activeFlowStep]}`;
  };

  const startFlowPlayback = () => {
    stopFlowPlayback();
    activeFlowStep = 0;
    setFlowStep(activeFlowStep);
    const playButton = document.querySelector('[data-heart-flow-play]');
    if (playButton) {
      playButton.setAttribute('aria-pressed', 'true');
      playButton.textContent = '播放中…';
    }
    flowTimer = window.setInterval(() => {
      if (activeFlowStep >= flowSteps.length - 1) {
        stopFlowPlayback();
        return;
      }
      setFlowStep(activeFlowStep + 1);
    }, 1500);
  };

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
    const flowStep = event.target.closest('[data-heart-flow-step]');
    if (flowStep) {
      stopFlowPlayback();
      setFlowStep(Number(flowStep.dataset.heartFlowStep));
      return;
    }

    if (event.target.closest('[data-heart-flow-play]')) {
      startFlowPlayback();
      return;
    }

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
