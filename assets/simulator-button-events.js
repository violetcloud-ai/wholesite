function genButtonClick(buttonID) {
  const btn = document.getElementById(buttonID);
  if (!btn) return;
  btn.innerHTML = (btn.innerHTML === "Generate") ? "Generating..." : "Generate";
}

function toggleInfoModal(isOpen) {
  const modal = document.getElementById('infoModal');
  if (modal) {
    if (isOpen) modal.classList.add('active');
    else modal.classList.remove('active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const movementContainer = document.getElementById('movementContainer');
  const keyToButtonId = {
    'a': 'button_A', 's': 'button_S', 'd': 'button_D', 'w': 'button_W',
    'i': 'button_I', 'k': 'button_K', 'j': 'button_J', 'l': 'button_L',
    'f': 'button_F', 'x': 'button_X', 'g': 'button_G'
  };

  function updateButtonState(button, isHolding) {
    if (!button) return;
    button.textContent = isHolding ? '+' : button.getAttribute('data-original');
  }

  const handlePress = (e) => {
    const targetBtn = e.target.closest('.game-key');
    if (targetBtn) { e.preventDefault(); updateButtonState(targetBtn, true); }
  };
  const handleRelease = (e) => {
    const targetBtn = e.target.closest('.game-key');
    if (targetBtn) updateButtonState(targetBtn, false);
  };

  if (movementContainer) {
    movementContainer.addEventListener('mousedown', handlePress);
    movementContainer.addEventListener('mouseup', handleRelease);
    movementContainer.addEventListener('mouseleave', handleRelease);
    movementContainer.addEventListener('touchstart', handlePress, { passive: false });
    movementContainer.addEventListener('touchend', handleRelease);
    movementContainer.addEventListener('touchcancel', handleRelease);
  }

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const button = document.getElementById(keyToButtonId[e.key.toLowerCase()]);
    if (button) updateButtonState(button, true);
  });
  document.addEventListener('keyup', (e) => {
    const button = document.getElementById(keyToButtonId[e.key.toLowerCase()]);
    if (button) updateButtonState(button, false);
  });

  // PANEL DRAWER INTERLOCK SWITCHES
  const wrenchToggleBtn = document.getElementById("wrenchToggleBtn");
  const arrowsToggleBtn = document.getElementById("arrowsToggleBtn");
  const configCloseBtn = document.getElementById("configCloseBtn");
  const movementCloseBtn = document.getElementById("movementCloseBtn");
  const configDrawer = document.getElementById("configDrawer");
  const movementDrawer = document.getElementById("movementDrawer");

  if(wrenchToggleBtn && arrowsToggleBtn) {
    wrenchToggleBtn.addEventListener("click", () => { movementDrawer.classList.remove("pane-visible"); configDrawer.classList.toggle("pane-visible"); });
    arrowsToggleBtn.addEventListener("click", () => { configDrawer.classList.remove("pane-visible"); movementDrawer.classList.toggle("pane-visible"); });
    configCloseBtn.addEventListener("click", () => { configDrawer.classList.remove("pane-visible"); });
    movementCloseBtn.addEventListener("click", () => { movementDrawer.classList.remove("pane-visible"); });
  }
});