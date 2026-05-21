// 1. Generate text indicator toggle behavior
function genButtonClick(buttonID) {
  const btn = document.getElementById(buttonID);
  if (!btn) return;
  btn.innerHTML = (btn.innerHTML === "Generate") ? "Generating..." : "Generate";
}

// 2. Info modal instructions toggle behavior
function toggleInfoModal(isOpen) {
  const modal = document.getElementById('infoModal');
  if (modal) {
    if (isOpen) modal.classList.add('active');
    else modal.classList.remove('active');
  }
}

// 3. Movement buttons dynamic text change controller
document.addEventListener("DOMContentLoaded", () => {
  const movementContainer = document.getElementById('movementContainer');

  const keyToButtonId = {
    'a': 'button_A', 's': 'button_S', 'd': 'button_D', 'w': 'button_W',
    'arrowup': 'button_I', 'arrowdown': 'button_K', 'arrowleft': 'button_J', 'arrowright': 'button_L',
    ' ': 'button_F', 'x': 'button_X', 'g': 'button_G'
  };

  function updateButtonState(button, isHolding) {
    if (!button) return;
    if (isHolding) {
      button.textContent = '+';
    } else {
      button.textContent = button.getAttribute('data-original');
    }
  }

  // Pointer press handlers
  const handlePress = (e) => {
    const targetBtn = e.target.closest('.game-key');
    if (targetBtn) {
      if (e.cancelable) e.preventDefault();
      updateButtonState(targetBtn, true);
    }
  };

  const handleRelease = (e) => {
    const targetBtn = e.target.closest('.game-key');
    if (targetBtn) updateButtonState(targetBtn, false);
  };

  // Attach pointer triggers
  if (movementContainer) {
    movementContainer.addEventListener('mousedown', handlePress);
    movementContainer.addEventListener('mouseup', handleRelease);
    movementContainer.addEventListener('mouseleave', handleRelease);

    movementContainer.addEventListener('touchstart', handlePress, { passive: false });
    movementContainer.addEventListener('touchend', handleRelease);
    movementContainer.addEventListener('touchcancel', handleRelease);
  }

  // Keyboard Event Routing Matrix
  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const btnId = keyToButtonId[e.key.toLowerCase()];
    if (btnId) {
      const button = document.getElementById(btnId);
      updateButtonState(button, true);
    }
  });

  document.addEventListener('keyup', (e) => {
    const btnId = keyToButtonId[e.key.toLowerCase()];
    if (btnId) {
      const button = document.getElementById(btnId);
      updateButtonState(button, false);
    }
  });

  // 4. Panel mutual display controller (FIXED TARGETING)
  const wrenchToggleBtn = document.getElementById("wrenchToggleBtn");
  const arrowsToggleBtn = document.getElementById("arrowsToggleBtn");
  const configCloseBtn = document.getElementById("configCloseBtn");
  const movementCloseBtn = document.getElementById("movementCloseBtn");
  
  const configDrawer = document.getElementById("configDrawer");
  const movementDrawer = document.getElementById("movementDrawer"); // Fixed to match HTML ID

  wrenchToggleBtn.addEventListener("click", () => {
    movementDrawer.classList.remove("pane-visible");
    configDrawer.classList.toggle("pane-visible");
  });

  arrowsToggleBtn.addEventListener("click", () => {
    configDrawer.classList.remove("pane-visible");
    movementDrawer.classList.toggle("pane-visible");
  });

  configCloseBtn.addEventListener("click", () => {
    configDrawer.classList.remove("pane-visible");
  });

  movementCloseBtn.addEventListener("click", () => {
    movementDrawer.classList.remove("pane-visible");
  });
});