let x = 100;
let y = 100;
let dx = 4;
let dy = 3;
const size = 60;

// The part of the screen actually on show (mobile browser toolbars included),
// falling back to the plain window size where visualViewport isn't available.
function visibleWidth() {
  const vv = window.visualViewport;
  return Math.round(vv ? vv.width : windowWidth);
}

function visibleHeight() {
  const vv = window.visualViewport;
  return Math.round(vv ? vv.height : windowHeight);
}

function setup() {
  createCanvas(visibleWidth(), visibleHeight());
}

function draw() {
  background(20);

  x += dx;
  y += dy;

  // bounce off the edges, clamped so the square never escapes the canvas
  if (x < 0 || x > width - size) {
    dx *= -1;
    x = constrain(x, 0, width - size);
  }
  if (y < 0 || y > height - size) {
    dy *= -1;
    y = constrain(y, 0, height - size);
  }

  fill(255, 90, 90);
  noStroke();
  square(x, y, size);
}

// Window resized (browser window, rotation, toolbar shown/hidden)
function windowResized() {
  resizeCanvas(visibleWidth(), visibleHeight());
  keepOnScreen();
}

// visualViewport changes too: mobile toolbar collapse, pinch zoom
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    if (typeof width === 'number') {
      resizeCanvas(visibleWidth(), visibleHeight());
      keepOnScreen();
    }
  });
}

// Shrink the canvas? Pull the square back inside the new bounds.
function keepOnScreen() {
  x = constrain(x, 0, width - size);
  y = constrain(y, 0, height - size);
}
