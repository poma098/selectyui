let activeShift = false;
let activeAlt = false;
let activeCtrl = false;
let activeMeta = false;
let activeLeft = false;
let activeRight = false;
let activeCenter = false;

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.shiftKey) {
    activeShift = true;
  }

  if (event.altKey) {
    activeAlt = true;
  }

  if (event.ctrlKey) {
    activeCtrl = true;
  }

  if (event.metaKey) {
    activeMeta = true;
  }
})

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.shiftKey) {
    activeShift = false;
  }

  if (event.altKey) {
    activeAlt = false;
  }

  if (event.ctrlKey) {
    activeCtrl = false;
  }

  if (event.metaKey) {
    activeMeta = false;
  }
})

window.addEventListener('mousedown', (event: MouseEvent) => {
  if (event.button === 0) {
    activeLeft = true;
  }

  if (event.button === 2) {
    activeRight = true;
  }

  if (event.button === 1) {
    activeCenter = true;
  }
})

window.addEventListener('mouseup', (event: MouseEvent) => {
  if (event.button === 0) {
    activeLeft = false;
  }

  if (event.button === 2) {
    activeRight = false;
  }

  if (event.button === 1) {
    activeCenter = false;
  }
})

window.addEventListener('blur', () => {
  activeShift = false;
  activeAlt = false;
  activeCtrl = false;
  activeMeta = false;
  activeLeft = false;
  activeRight = false;
  activeCenter = false;
})

document.addEventListener('visibilitychange', () => {
  activeShift = false;
  activeAlt = false;
  activeCtrl = false;
  activeMeta = false;
  activeLeft = false;
  activeRight = false;
  activeCenter = false;
})

export function getActiveKeys(): ActiveKeys {
  return {
    shift: activeShift,
    alt: activeAlt,
    ctrl: activeCtrl,
    meta: activeMeta,
    left: activeLeft,
    right: activeRight,
    center: activeCenter
  }
}

export interface ActiveKeys {
  shift: boolean;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  left: boolean;
  right: boolean;
  center: boolean;
}