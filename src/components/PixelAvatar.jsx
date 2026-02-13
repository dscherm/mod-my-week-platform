import { useEffect, useRef } from 'react';

// 32x64 pixel grid scaled 4x → 128x256 canvas
const SCALE = 4;
const GRID_W = 32 * SCALE;  // 128
const GRID_H = 64 * SCALE;  // 256

const DEFAULT_COLORS = {
  skin: '#C68642',
  hair: '#2C1B0E',
  eye: '#4A90D9',
  teeColor: '#1a1a1a',
  jeansColor: '#2B5797',
  shoeColor: '#111111'
};

// --- Helpers ---

function darken(hex, amount) {
  const c = hex.startsWith('rgb') ? hex : hex;
  const num = parseInt(c.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SCALE, y * SCALE, (w || 1) * SCALE, (h || 1) * SCALE);
}

function block(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
}

// ==============================
//        HAIR STYLES
// ==============================
// Head occupies roughly x:10-21, y:4-17

function drawHairShort(ctx, color) {
  const dark = darken(color, 20);
  block(ctx, 10, 2, 12, 2, color);
  block(ctx, 9, 3, 14, 2, color);
  block(ctx, 8, 4, 2, 4, color);
  block(ctx, 22, 4, 2, 4, color);
  block(ctx, 10, 4, 12, 2, dark);
  block(ctx, 10, 4, 4, 1, lighten(color, 15));
}

function drawHairLong(ctx, color) {
  const dark = darken(color, 20);
  block(ctx, 10, 2, 12, 2, color);
  block(ctx, 9, 3, 14, 2, color);
  block(ctx, 8, 4, 2, 16, color);
  block(ctx, 22, 4, 2, 16, color);
  block(ctx, 10, 4, 12, 2, dark);
  block(ctx, 8, 18, 2, 2, dark);
  block(ctx, 22, 18, 2, 2, dark);
}

function drawHairCurly(ctx, color) {
  const dark = darken(color, 15);
  const light = lighten(color, 20);
  block(ctx, 8, 1, 16, 2, color);
  block(ctx, 7, 2, 18, 3, color);
  block(ctx, 6, 4, 3, 8, color);
  block(ctx, 23, 4, 3, 8, color);
  [[8,2],[12,1],[16,1],[20,2],[7,5],[24,5],[7,8],[24,8],[9,3],[19,3]].forEach(([cx,cy]) => px(ctx, cx, cy, 1, 1, dark));
  [[10,1],[14,1],[18,1],[8,4],[23,4]].forEach(([cx,cy]) => px(ctx, cx, cy, 1, 1, light));
}

function drawHairBuzz(ctx, color) {
  const dark = darken(color, 10);
  block(ctx, 10, 3, 12, 2, color);
  block(ctx, 9, 4, 14, 1, dark);
  for (let x = 10; x <= 21; x += 2) {
    px(ctx, x, 4, 1, 1, color);
  }
}

function drawHairPonytail(ctx, color) {
  const dark = darken(color, 20);
  block(ctx, 10, 2, 12, 2, color);
  block(ctx, 9, 3, 14, 2, color);
  block(ctx, 8, 4, 2, 4, color);
  block(ctx, 22, 4, 2, 4, color);
  block(ctx, 10, 4, 12, 2, dark);
  block(ctx, 24, 5, 2, 2, color);
  block(ctx, 25, 7, 2, 2, color);
  block(ctx, 26, 9, 2, 3, color);
  block(ctx, 25, 12, 2, 3, dark);
  block(ctx, 24, 6, 1, 1, '#888888');
}

// --- NEW cyberpunk hair styles ---

function drawHairMohawk(ctx, color) {
  const dark = darken(color, 20);
  const light = lighten(color, 30);
  // Tall center strip
  block(ctx, 13, -2, 6, 7, color);
  block(ctx, 12, 1, 8, 4, color);
  // Spiky tips
  px(ctx, 14, -3, 2, 1, color);
  px(ctx, 16, -4, 1, 1, color);
  px(ctx, 15, -3, 1, 1, light);
  // Highlight edges
  px(ctx, 12, 1, 1, 4, light);
  px(ctx, 19, 1, 1, 4, light);
  // Shaved sides texture
  for (let x = 9; x <= 11; x += 2) {
    for (let y = 4; y <= 7; y += 2) px(ctx, x, y, 1, 1, darken(color, 50));
  }
  for (let x = 21; x <= 23; x += 2) {
    for (let y = 4; y <= 7; y += 2) px(ctx, x, y, 1, 1, darken(color, 50));
  }
  block(ctx, 12, 4, 8, 1, dark);
}

function drawHairUndercut(ctx, color) {
  const dark = darken(color, 20);
  // Shaved sides (stubble)
  for (let x = 9; x <= 11; x++) {
    for (let y = 4; y <= 8; y += 2) px(ctx, x, y, 1, 1, darken(color, 40));
  }
  for (let x = 20; x <= 22; x++) {
    for (let y = 4; y <= 8; y += 2) px(ctx, x, y, 1, 1, darken(color, 40));
  }
  // Top volume swept to one side
  block(ctx, 10, 2, 12, 2, color);
  block(ctx, 9, 3, 14, 2, color);
  // Swept fringe to the left
  block(ctx, 6, 4, 6, 3, color);
  block(ctx, 5, 5, 5, 2, color);
  block(ctx, 7, 4, 3, 1, lighten(color, 20));
  block(ctx, 10, 4, 12, 1, dark);
}

function drawHairSpiky(ctx, color) {
  const dark = darken(color, 25);
  const light = lighten(color, 30);
  // Base
  block(ctx, 9, 3, 14, 3, color);
  // Spikes pointing up
  px(ctx, 10, 1, 2, 2, color);
  px(ctx, 13, 0, 2, 3, color);
  px(ctx, 16, -1, 2, 4, color);
  px(ctx, 19, 0, 2, 3, color);
  px(ctx, 22, 1, 1, 2, color);
  // Spike tips glow
  px(ctx, 11, 0, 1, 1, light);
  px(ctx, 14, -1, 1, 1, light);
  px(ctx, 17, -2, 1, 1, light);
  px(ctx, 20, -1, 1, 1, light);
  // Side spikes
  block(ctx, 7, 4, 2, 3, color);
  block(ctx, 23, 4, 2, 3, color);
  px(ctx, 6, 5, 1, 2, color);
  px(ctx, 25, 5, 1, 2, color);
  block(ctx, 10, 4, 12, 1, dark);
}

function drawHairSideshave(ctx, color) {
  const dark = darken(color, 20);
  // Shaved right side
  for (let x = 20; x <= 22; x++) {
    for (let y = 4; y <= 9; y += 2) px(ctx, x, y, 1, 1, darken(color, 45));
  }
  // Long left side
  block(ctx, 10, 2, 10, 2, color);
  block(ctx, 9, 3, 12, 2, color);
  block(ctx, 7, 4, 4, 14, color);
  block(ctx, 6, 6, 2, 10, color);
  // Fringe swept left
  block(ctx, 8, 5, 5, 2, lighten(color, 15));
  // Tips
  block(ctx, 6, 14, 2, 3, dark);
  block(ctx, 7, 16, 2, 2, dark);
}

function drawHairCyberdreads(ctx, color) {
  const dark = darken(color, 25);
  // Top
  block(ctx, 9, 2, 14, 3, color);
  block(ctx, 8, 3, 16, 2, color);
  // Left dreads
  block(ctx, 7, 4, 3, 18, color);
  block(ctx, 6, 6, 2, 14, color);
  // Right dreads
  block(ctx, 22, 4, 3, 18, color);
  block(ctx, 24, 6, 2, 14, color);
  // Dread segments with metal beads
  for (let y = 6; y <= 20; y += 3) {
    px(ctx, 7, y, 2, 1, dark);
    px(ctx, 22, y, 2, 1, dark);
    px(ctx, 6, y + 1, 1, 1, '#999999');
    px(ctx, 25, y + 1, 1, 1, '#999999');
  }
  // Neon tips
  px(ctx, 6, 19, 2, 1, lighten(color, 40));
  px(ctx, 24, 19, 2, 1, lighten(color, 40));
  block(ctx, 10, 4, 12, 2, dark);
}

function drawHairFauxhawk(ctx, color) {
  const dark = darken(color, 20);
  const light = lighten(color, 20);
  // Medium height center strip (shorter than mohawk)
  block(ctx, 12, 1, 8, 4, color);
  block(ctx, 11, 2, 10, 3, color);
  // Tapered sides
  block(ctx, 9, 4, 3, 2, color);
  block(ctx, 20, 4, 3, 2, color);
  // Top texture
  block(ctx, 13, 1, 6, 1, light);
  block(ctx, 11, 4, 10, 1, dark);
  // Fade on sides
  for (let y = 5; y <= 7; y++) {
    px(ctx, 9, y, 1, 1, darken(color, 30 + (y - 5) * 10));
    px(ctx, 22, y, 1, 1, darken(color, 30 + (y - 5) * 10));
  }
}

function drawHairBraids(ctx, color) {
  const dark = darken(color, 20);
  // Top
  block(ctx, 10, 2, 12, 2, color);
  block(ctx, 9, 3, 14, 2, color);
  // Two braids falling down
  // Left braid
  for (let y = 5; y <= 22; y++) {
    const offset = y % 2 === 0 ? 0 : 1;
    px(ctx, 7 + offset, y, 2, 1, color);
    if (y % 3 === 0) px(ctx, 7 + offset, y, 2, 1, dark);
  }
  // Right braid
  for (let y = 5; y <= 22; y++) {
    const offset = y % 2 === 0 ? 1 : 0;
    px(ctx, 22 + offset, y, 2, 1, color);
    if (y % 3 === 0) px(ctx, 22 + offset, y, 2, 1, dark);
  }
  // Braid ties
  px(ctx, 7, 22, 3, 1, '#999999');
  px(ctx, 22, 22, 3, 1, '#999999');
  block(ctx, 10, 4, 12, 2, dark);
}

function drawHairAfro(ctx, color) {
  const dark = darken(color, 15);
  const light = lighten(color, 15);
  // Big rounded afro shape — extends well beyond the head (x:10-21, y:4-17)
  // Top dome
  block(ctx, 11, 0, 10, 1, color);
  block(ctx, 9, 1, 14, 1, color);
  block(ctx, 7, 2, 18, 2, color);
  block(ctx, 6, 4, 20, 2, color);
  block(ctx, 5, 6, 22, 2, color);
  // Sides flanking the head
  block(ctx, 5, 8, 4, 7, color);   // left side
  block(ctx, 23, 8, 4, 7, color);  // right side
  // Top of head fill
  block(ctx, 9, 4, 14, 4, dark);
  // Texture / volume highlights
  px(ctx, 8, 3, 2, 1, light);
  px(ctx, 22, 3, 2, 1, light);
  px(ctx, 6, 7, 2, 1, light);
  px(ctx, 24, 7, 2, 1, light);
  px(ctx, 6, 11, 1, 2, light);
  px(ctx, 26, 11, 1, 2, light);
  px(ctx, 12, 1, 3, 1, light);
  px(ctx, 18, 1, 2, 1, light);
  // Bottom rounded edge
  block(ctx, 6, 15, 3, 1, color);
  block(ctx, 23, 15, 3, 1, color);
  block(ctx, 7, 16, 2, 1, color);
  block(ctx, 23, 16, 2, 1, color);
}

const HAIR_DRAWERS = {
  short: drawHairShort,
  long: drawHairLong,
  curly: drawHairCurly,
  buzz: drawHairBuzz,
  ponytail: drawHairPonytail,
  mohawk: drawHairMohawk,
  undercut: drawHairUndercut,
  spiky: drawHairSpiky,
  sideshave: drawHairSideshave,
  cyberdreads: drawHairCyberdreads,
  fauxhawk: drawHairFauxhawk,
  braids: drawHairBraids,
  afro: drawHairAfro,
};

// ==============================
//     CLOTHING RENDERERS
// ==============================
// Torso: x 10-21, y 20-35
// Arms: x 6-9 (left), x 22-25 (right), y 20-35
// Legs: x 10-15 (left), x 16-21 (right), y 36-53
// Shoes: x 8-15 (left), x 16-23 (right), y 54-57

const CLOTHING_RENDERERS = {
  top: {
    tshirt: (ctx, color) => {
      const dark = darken(color, 20);
      block(ctx, 10, 20, 12, 16, color);
      block(ctx, 13, 19, 6, 1, color);
      block(ctx, 14, 19, 4, 1, dark);
      block(ctx, 6, 20, 4, 8, color);
      block(ctx, 22, 20, 4, 8, color);
      block(ctx, 6, 27, 4, 1, dark);
      block(ctx, 22, 27, 4, 1, dark);
      block(ctx, 10, 35, 12, 1, dark);
      for (let y = 20; y <= 35; y++) {
        px(ctx, 10, y, 1, 1, dark);
        px(ctx, 21, y, 1, 1, dark);
      }
    },
    hoodie: (ctx, color) => {
      const dark = darken(color, 25);
      const light = lighten(color, 15);
      block(ctx, 10, 20, 12, 16, color);
      block(ctx, 6, 20, 4, 14, color);
      block(ctx, 22, 20, 4, 14, color);
      block(ctx, 6, 33, 4, 1, dark);
      block(ctx, 6, 34, 4, 1, color);
      block(ctx, 22, 33, 4, 1, dark);
      block(ctx, 22, 34, 4, 1, color);
      block(ctx, 8, 16, 2, 4, color);
      block(ctx, 22, 16, 2, 4, color);
      block(ctx, 8, 15, 16, 1, color);
      px(ctx, 14, 21, 1, 3, light);
      px(ctx, 17, 21, 1, 3, light);
      block(ctx, 12, 29, 8, 4, dark);
      block(ctx, 13, 30, 6, 2, color);
      block(ctx, 10, 35, 12, 1, dark);
      for (let y = 20; y <= 35; y++) {
        px(ctx, 15, y, 2, 1, dark);
      }
    },
    jacket: (ctx, color) => {
      const dark = darken(color, 30);
      const light = lighten(color, 10);
      block(ctx, 10, 20, 12, 16, color);
      block(ctx, 10, 18, 12, 2, color);
      block(ctx, 11, 18, 10, 1, dark);
      block(ctx, 6, 20, 4, 12, color);
      block(ctx, 22, 20, 4, 12, color);
      block(ctx, 6, 31, 4, 1, dark);
      block(ctx, 22, 31, 4, 1, dark);
      for (let y = 20; y <= 35; y++) {
        px(ctx, 15, y, 1, 1, '#888888');
        px(ctx, 16, y, 1, 1, '#666666');
      }
      block(ctx, 15, 20, 2, 1, '#AAAAAA');
      block(ctx, 11, 28, 3, 3, dark);
      block(ctx, 18, 28, 3, 3, dark);
      block(ctx, 11, 28, 3, 1, light);
      block(ctx, 18, 28, 3, 1, light);
      block(ctx, 10, 35, 12, 1, dark);
    },
    vest: (ctx, color) => {
      const dark = darken(color, 25);
      const light = lighten(color, 15);
      // Draw default black tee underneath
      CLOTHING_RENDERERS.top.tshirt(ctx, '#1a1a1a');
      // Vest panels (open front)
      block(ctx, 10, 20, 5, 16, color);
      block(ctx, 17, 20, 5, 16, color);
      // Collar
      px(ctx, 14, 19, 1, 2, color);
      px(ctx, 17, 19, 1, 2, color);
      // Pockets with zipper pulls
      block(ctx, 11, 26, 3, 3, dark);
      block(ctx, 18, 26, 3, 3, dark);
      px(ctx, 11, 26, 1, 1, '#AAAAAA');
      px(ctx, 20, 26, 1, 1, '#AAAAAA');
      // Buckle straps across chest
      block(ctx, 14, 22, 4, 1, '#666666');
      block(ctx, 14, 28, 4, 1, '#666666');
      px(ctx, 15, 22, 2, 1, '#CCCCCC');
      px(ctx, 15, 28, 2, 1, '#CCCCCC');
      // Neon trim on edges
      for (let y = 20; y <= 35; y++) {
        px(ctx, 10, y, 1, 1, light);
        px(ctx, 21, y, 1, 1, light);
      }
      block(ctx, 10, 35, 12, 1, dark);
    },
    cyberjacket: (ctx, color) => {
      const dark = darken(color, 30);
      const light = lighten(color, 15);
      // Base jacket
      block(ctx, 10, 20, 12, 16, color);
      // High collar
      block(ctx, 10, 17, 12, 3, color);
      block(ctx, 11, 17, 10, 1, dark);
      block(ctx, 12, 18, 8, 1, darken(color, 15));
      // Sleeves
      block(ctx, 6, 20, 4, 14, color);
      block(ctx, 22, 20, 4, 14, color);
      // Sleeve cuffs
      block(ctx, 6, 33, 4, 1, dark);
      block(ctx, 22, 33, 4, 1, dark);
      // Neon accent lines down sleeves
      for (let y = 20; y <= 33; y += 2) {
        px(ctx, 6, y, 1, 1, lighten(color, 50));
        px(ctx, 25, y, 1, 1, lighten(color, 50));
      }
      // Center seam with LED strip effect
      for (let y = 20; y <= 35; y++) {
        px(ctx, 15, y, 2, 1, dark);
        if (y % 3 === 0) px(ctx, 15, y, 2, 1, '#00FFFF');
      }
      // Shoulder pads
      block(ctx, 9, 19, 2, 2, dark);
      block(ctx, 21, 19, 2, 2, dark);
      // Tech pockets
      block(ctx, 11, 27, 3, 4, dark);
      block(ctx, 18, 27, 3, 4, dark);
      block(ctx, 12, 28, 1, 2, '#00FFFF');
      block(ctx, 19, 28, 1, 2, '#00FFFF');
      block(ctx, 10, 35, 12, 1, dark);
    },
  },
  bottom: {
    jeans: (ctx, color) => {
      const dark = darken(color, 20);
      const light = lighten(color, 15);
      block(ctx, 10, 36, 6, 18, color);
      block(ctx, 16, 36, 6, 18, color);
      block(ctx, 10, 36, 12, 2, dark);
      px(ctx, 12, 36, 1, 2, light);
      px(ctx, 15, 36, 1, 2, light);
      px(ctx, 18, 36, 1, 2, light);
      px(ctx, 15, 40, 2, 1, dark);
      px(ctx, 15, 41, 2, 1, dark);
      px(ctx, 11, 38, 1, 1, light);
      px(ctx, 12, 39, 1, 1, light);
      px(ctx, 11, 39, 1, 1, light);
      px(ctx, 20, 38, 1, 1, light);
      px(ctx, 19, 39, 1, 1, light);
      px(ctx, 20, 39, 1, 1, light);
      block(ctx, 11, 46, 4, 2, light);
      block(ctx, 17, 46, 4, 2, light);
      block(ctx, 10, 53, 6, 1, dark);
      block(ctx, 16, 53, 6, 1, dark);
    },
    shorts: (ctx, color) => {
      const dark = darken(color, 20);
      block(ctx, 10, 36, 6, 10, color);
      block(ctx, 16, 36, 6, 10, color);
      block(ctx, 10, 36, 12, 2, dark);
      px(ctx, 15, 40, 2, 1, dark);
      block(ctx, 10, 45, 6, 1, dark);
      block(ctx, 16, 45, 6, 1, dark);
      for (let y = 38; y <= 45; y++) {
        px(ctx, 10, y, 1, 1, dark);
        px(ctx, 21, y, 1, 1, dark);
      }
    },
    khakis: (ctx, color) => {
      const dark = darken(color, 15);
      const light = lighten(color, 10);
      block(ctx, 10, 36, 6, 18, color);
      block(ctx, 16, 36, 6, 18, color);
      block(ctx, 10, 36, 12, 2, dark);
      block(ctx, 10, 36, 12, 1, '#8B7355');
      px(ctx, 15, 36, 2, 1, '#C0A060');
      for (let y = 40; y <= 52; y += 2) {
        px(ctx, 13, y, 1, 1, light);
        px(ctx, 18, y, 1, 1, light);
      }
      block(ctx, 10, 52, 6, 2, dark);
      block(ctx, 16, 52, 6, 2, dark);
    },
    cargopants: (ctx, color) => {
      const dark = darken(color, 20);
      const light = lighten(color, 10);
      // Legs
      block(ctx, 10, 36, 6, 18, color);
      block(ctx, 16, 36, 6, 18, color);
      // Waistband with utility belt
      block(ctx, 10, 36, 12, 2, '#444444');
      px(ctx, 14, 36, 4, 1, '#888888');
      px(ctx, 15, 36, 2, 1, '#CCCCCC');
      // Cargo pockets on thighs
      block(ctx, 11, 42, 4, 4, dark);
      block(ctx, 17, 42, 4, 4, dark);
      // Pocket flaps
      block(ctx, 11, 42, 4, 1, light);
      block(ctx, 17, 42, 4, 1, light);
      // Pocket buckles
      px(ctx, 13, 42, 1, 1, '#999999');
      px(ctx, 19, 42, 1, 1, '#999999');
      // Knee pads
      block(ctx, 11, 48, 4, 2, darken(color, 30));
      block(ctx, 17, 48, 4, 2, darken(color, 30));
      // Cuff straps
      block(ctx, 10, 53, 6, 1, '#555555');
      block(ctx, 16, 53, 6, 1, '#555555');
      // Crotch seam
      px(ctx, 15, 40, 2, 2, dark);
    },
  },
  shoes: {
    sneakers: (ctx, color) => {
      const dark = darken(color, 30);
      const sole = '#333333';
      block(ctx, 8, 54, 8, 3, color);
      block(ctx, 8, 57, 8, 1, sole);
      block(ctx, 8, 54, 2, 2, lighten(color, 20));
      block(ctx, 15, 54, 1, 3, dark);
      block(ctx, 10, 55, 4, 1, dark);
      block(ctx, 16, 54, 8, 3, color);
      block(ctx, 16, 57, 8, 1, sole);
      block(ctx, 22, 54, 2, 2, lighten(color, 20));
      block(ctx, 16, 54, 1, 3, dark);
      block(ctx, 18, 55, 4, 1, dark);
      px(ctx, 11, 54, 2, 1, '#FFFFFF');
      px(ctx, 19, 54, 2, 1, '#FFFFFF');
    },
    boots: (ctx, color) => {
      const dark = darken(color, 30);
      const sole = '#222222';
      // Tall boots (extend up into leg area)
      block(ctx, 8, 50, 8, 7, color);
      block(ctx, 16, 50, 8, 7, color);
      // Soles
      block(ctx, 8, 57, 8, 1, sole);
      block(ctx, 16, 57, 8, 1, sole);
      // Boot tops
      block(ctx, 8, 50, 8, 1, dark);
      block(ctx, 16, 50, 8, 1, dark);
      // Buckle straps
      block(ctx, 9, 52, 6, 1, '#555555');
      block(ctx, 17, 52, 6, 1, '#555555');
      px(ctx, 12, 52, 1, 1, '#CCCCCC');
      px(ctx, 20, 52, 1, 1, '#CCCCCC');
      // Toe caps
      block(ctx, 8, 55, 3, 2, dark);
      block(ctx, 22, 55, 2, 2, dark);
    },
    cyberboots: (ctx, color) => {
      const dark = darken(color, 30);
      // Tall armored boots
      block(ctx, 8, 48, 8, 9, color);
      block(ctx, 16, 48, 8, 9, color);
      // Soles with neon
      block(ctx, 8, 57, 8, 1, '#00FFFF');
      block(ctx, 16, 57, 8, 1, '#00FFFF');
      // Armor plating segments
      block(ctx, 8, 48, 8, 1, dark);
      block(ctx, 16, 48, 8, 1, dark);
      block(ctx, 8, 51, 8, 1, dark);
      block(ctx, 16, 51, 8, 1, dark);
      block(ctx, 8, 54, 8, 1, dark);
      block(ctx, 16, 54, 8, 1, dark);
      // Neon accent strips
      px(ctx, 8, 49, 1, 2, '#00FFFF');
      px(ctx, 15, 49, 1, 2, '#00FFFF');
      px(ctx, 16, 49, 1, 2, '#00FFFF');
      px(ctx, 23, 49, 1, 2, '#00FFFF');
      // Toe armor
      block(ctx, 8, 55, 3, 2, darken(color, 15));
      block(ctx, 22, 55, 2, 2, darken(color, 15));
    },
  },
  hat: {
    cap: (ctx, color) => {
      const dark = darken(color, 25);
      block(ctx, 9, 1, 14, 3, color);
      block(ctx, 8, 2, 16, 2, color);
      block(ctx, 6, 4, 14, 2, dark);
      block(ctx, 5, 5, 14, 1, darken(color, 40));
      px(ctx, 15, 0, 2, 1, dark);
      px(ctx, 12, 1, 1, 3, dark);
      px(ctx, 19, 1, 1, 3, dark);
      block(ctx, 14, 2, 4, 2, lighten(color, 25));
    },
    beanie: (ctx, color) => {
      const dark = darken(color, 20);
      const light = lighten(color, 15);
      block(ctx, 9, 1, 14, 5, color);
      block(ctx, 8, 3, 16, 2, color);
      block(ctx, 8, 4, 16, 2, dark);
      for (let x = 9; x <= 23; x += 2) {
        px(ctx, x, 4, 1, 2, color);
      }
      block(ctx, 9, 3, 14, 1, light);
      block(ctx, 13, -2, 6, 3, color);
      block(ctx, 14, -3, 4, 1, color);
      block(ctx, 14, -1, 4, 1, light);
      px(ctx, 15, -2, 2, 1, light);
    },
    cybervisor: (ctx, color) => {
      const dark = darken(color, 25);
      // Sleek visor/headband
      block(ctx, 8, 3, 16, 3, color);
      // Visor screen (tinted)
      block(ctx, 8, 4, 16, 2, darken(color, 40));
      // Neon accent line
      block(ctx, 8, 3, 16, 1, lighten(color, 40));
      // Side tech bits
      block(ctx, 7, 4, 2, 2, '#555555');
      block(ctx, 23, 4, 2, 2, '#555555');
      px(ctx, 7, 4, 1, 1, color);
      px(ctx, 24, 4, 1, 1, color);
      // Antenna on right
      px(ctx, 24, 2, 1, 2, '#888888');
      px(ctx, 24, 1, 1, 1, color);
    },
  },
  face: {
    sunglasses: (ctx, color) => {
      // Frame
      block(ctx, 11, 8, 5, 4, '#111111');
      block(ctx, 16, 8, 5, 4, '#111111');
      // Lenses
      block(ctx, 12, 9, 3, 3, color);
      block(ctx, 17, 9, 3, 3, color);
      // Lens shine
      px(ctx, 12, 9, 1, 1, lighten(color, 60));
      px(ctx, 17, 9, 1, 1, lighten(color, 60));
      // Bridge
      block(ctx, 15, 10, 2, 1, '#111111');
      // Temple arms
      px(ctx, 9, 10, 2, 1, '#111111');
      px(ctx, 21, 10, 2, 1, '#111111');
    },
    cybervisor_face: (ctx, color) => {
      // Full face visor/scanner
      block(ctx, 10, 8, 12, 4, darken(color, 40));
      // Neon scan line across
      block(ctx, 10, 10, 12, 1, color);
      // Edge glow
      block(ctx, 10, 8, 12, 1, lighten(color, 30));
      block(ctx, 10, 11, 12, 1, lighten(color, 10));
      // Side mounts
      px(ctx, 9, 9, 1, 2, '#666666');
      px(ctx, 22, 9, 1, 2, '#666666');
    },
    piercings: (ctx, color) => {
      // Nose ring
      px(ctx, 14, 13, 1, 1, color);
      px(ctx, 13, 13, 1, 1, darken(color, 20));
      // Ear studs
      px(ctx, 9, 9, 1, 1, color);
      px(ctx, 22, 9, 1, 1, color);
      // Lip ring
      px(ctx, 14, 16, 1, 1, color);
      // Eyebrow piercing (right)
      px(ctx, 20, 7, 1, 1, color);
      px(ctx, 21, 7, 1, 1, lighten(color, 30));
    },
    mask: (ctx, color) => {
      const dark = darken(color, 25);
      // Lower face mask / respirator
      block(ctx, 11, 13, 10, 5, color);
      // Vent slits
      px(ctx, 13, 14, 1, 1, '#111111');
      px(ctx, 15, 14, 1, 1, '#111111');
      px(ctx, 17, 14, 1, 1, '#111111');
      px(ctx, 19, 14, 1, 1, '#111111');
      // Filter canister on side
      block(ctx, 21, 14, 2, 3, dark);
      px(ctx, 22, 15, 1, 1, '#888888');
      // Neon accent
      block(ctx, 11, 13, 10, 1, lighten(color, 20));
      // Strap
      px(ctx, 9, 14, 2, 1, '#444444');
      px(ctx, 21, 14, 1, 1, '#444444');
    },
  },
  cyborg: {
    cyber_arm: (ctx, color) => {
      const metal = color || '#8899AA';
      const dark = darken(metal, 30);
      const light = lighten(metal, 25);
      // Replace right arm with mechanical arm
      block(ctx, 22, 20, 4, 16, metal);
      // Segments
      block(ctx, 22, 20, 4, 1, dark);
      block(ctx, 22, 24, 4, 1, dark);
      block(ctx, 22, 28, 4, 1, dark);
      block(ctx, 22, 32, 4, 1, dark);
      // Joint highlights
      px(ctx, 23, 24, 2, 1, light);
      px(ctx, 23, 28, 2, 1, light);
      // Neon accent lines
      px(ctx, 22, 21, 1, 3, '#00FFFF');
      px(ctx, 22, 25, 1, 3, '#00FFFF');
      px(ctx, 22, 29, 1, 3, '#00FFFF');
      // Mechanical hand
      block(ctx, 22, 34, 4, 2, metal);
      px(ctx, 23, 35, 2, 1, dark);
      // Fingertip glow
      px(ctx, 22, 35, 1, 1, '#00FFFF');
      px(ctx, 25, 35, 1, 1, '#00FFFF');
    },
    cyber_eye: (ctx, color) => {
      const glow = color || '#FF0044';
      // Metal plate around right eye
      block(ctx, 16, 8, 6, 5, '#555566');
      // Implant socket
      block(ctx, 17, 9, 3, 3, '#222233');
      // Glowing iris
      block(ctx, 18, 10, 2, 2, glow);
      px(ctx, 18, 10, 1, 1, lighten(glow, 60));
      // Scanner beam extending
      px(ctx, 17, 10, 1, 1, glow);
      px(ctx, 20, 10, 1, 1, glow);
      // Circuit traces from implant
      px(ctx, 22, 9, 1, 1, glow);
      px(ctx, 22, 10, 1, 1, darken(glow, 20));
      px(ctx, 22, 11, 1, 1, glow);
      // LED indicator
      px(ctx, 21, 8, 1, 1, glow);
    },
    cyber_jaw: (ctx, color) => {
      const metal = color || '#778899';
      const dark = darken(metal, 25);
      // Mechanical lower face
      block(ctx, 11, 14, 10, 4, metal);
      // Segments
      block(ctx, 11, 14, 10, 1, dark);
      block(ctx, 11, 17, 10, 1, dark);
      // Vent slits
      px(ctx, 13, 15, 1, 1, '#111111');
      px(ctx, 15, 15, 1, 1, '#111111');
      px(ctx, 17, 15, 1, 1, '#111111');
      px(ctx, 19, 15, 1, 1, '#111111');
      // Neon accent dots
      px(ctx, 12, 16, 1, 1, '#00FFFF');
      px(ctx, 19, 16, 1, 1, '#00FFFF');
    },
  },
};

// ==============================
//       MAIN DRAW FUNCTION
// ==============================

function drawAvatar(canvas, config, clothingItems = {}) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const skin = config?.skinTone || DEFAULT_COLORS.skin;
  const hairColor = config?.hairColor || DEFAULT_COLORS.hair;
  const eyeColor = config?.eyeColor || DEFAULT_COLORS.eye;
  const hairStyle = config?.hairStyle || 'short';
  const equipped = config?.equippedClothing || {};

  const skinDark = darken(skin, 20);
  const skinLight = lighten(skin, 10);

  // === HEAD (x:10-21, y:4-17) ===
  block(ctx, 10, 4, 12, 14, skin);
  // Jaw contour
  block(ctx, 11, 16, 10, 2, skin);
  block(ctx, 12, 17, 8, 1, skin);
  // Ear nubs
  block(ctx, 9, 8, 1, 4, skin);
  block(ctx, 22, 8, 1, 4, skin);
  px(ctx, 9, 9, 1, 2, skinDark);
  px(ctx, 22, 9, 1, 2, skinDark);

  // === EYES ===
  block(ctx, 12, 9, 3, 3, '#FFFFFF');
  block(ctx, 17, 9, 3, 3, '#FFFFFF');
  block(ctx, 12, 10, 2, 2, eyeColor);
  block(ctx, 17, 10, 2, 2, eyeColor);
  px(ctx, 13, 10, 1, 1, '#111111');
  px(ctx, 18, 10, 1, 1, '#111111');
  px(ctx, 12, 9, 1, 1, '#FFFFFF');
  px(ctx, 17, 9, 1, 1, '#FFFFFF');
  // Eyebrows
  block(ctx, 11, 8, 4, 1, darken(hairColor, 10));
  block(ctx, 17, 8, 4, 1, darken(hairColor, 10));

  // === NOSE ===
  px(ctx, 15, 12, 2, 1, skinDark);
  px(ctx, 15, 13, 1, 1, skinDark);

  // === MOUTH ===
  block(ctx, 14, 15, 4, 1, darken(skin, 50));
  px(ctx, 15, 15, 2, 1, '#CC6666');

  // === NECK (x:13-18, y:18-19) ===
  block(ctx, 13, 18, 6, 2, skin);

  // === BODY / TORSO (x:10-21, y:20-35) ===
  block(ctx, 10, 20, 12, 16, skin);

  // === ARMS (x:6-9, x:22-25, y:20-35) ===
  block(ctx, 6, 20, 4, 16, skin);
  block(ctx, 22, 20, 4, 16, skin);
  // Hands
  block(ctx, 6, 34, 4, 2, skin);
  block(ctx, 22, 34, 4, 2, skin);
  px(ctx, 7, 35, 2, 1, skinDark);
  px(ctx, 23, 35, 2, 1, skinDark);

  // === LEGS (skin base, visible with shorts) ===
  block(ctx, 10, 36, 6, 18, skin);
  block(ctx, 16, 36, 6, 18, skin);

  // === CLOTHING ===
  // Top
  const topItem = equipped.top ? clothingItems[equipped.top] : null;
  const topColor = topItem?.clothingColor || DEFAULT_COLORS.teeColor;
  const topStyle = topItem?.clothingStyle || 'tshirt';
  const topRenderer = CLOTHING_RENDERERS.top[topStyle] || CLOTHING_RENDERERS.top.tshirt;
  topRenderer(ctx, topColor);

  // Bottom
  const bottomItem = equipped.bottom ? clothingItems[equipped.bottom] : null;
  const bottomColor = bottomItem?.clothingColor || DEFAULT_COLORS.jeansColor;
  const bottomStyle = bottomItem?.clothingStyle || 'jeans';
  const bottomRenderer = CLOTHING_RENDERERS.bottom[bottomStyle] || CLOTHING_RENDERERS.bottom.jeans;
  bottomRenderer(ctx, bottomColor);

  // Shoes
  const shoeItem = equipped.shoes ? clothingItems[equipped.shoes] : null;
  const shoeColor = shoeItem?.clothingColor || DEFAULT_COLORS.shoeColor;
  const shoeStyle = shoeItem?.clothingStyle || 'sneakers';
  const shoeRenderer = CLOTHING_RENDERERS.shoes[shoeStyle] || CLOTHING_RENDERERS.shoes.sneakers;
  shoeRenderer(ctx, shoeColor);

  // === CYBORG (drawn over clothing, before hair) ===
  const cyborgItem = equipped.cyborg ? clothingItems[equipped.cyborg] : null;
  if (cyborgItem) {
    const cyborgColor = cyborgItem.clothingColor || '#8899AA';
    const cyborgStyle = cyborgItem.clothingStyle || 'cyber_arm';
    const cyborgRenderer = CLOTHING_RENDERERS.cyborg[cyborgStyle];
    if (cyborgRenderer) cyborgRenderer(ctx, cyborgColor);
  }

  // === HAIR (drawn over head) ===
  const hairDrawer = HAIR_DRAWERS[hairStyle] || HAIR_DRAWERS.short;
  hairDrawer(ctx, hairColor);

  // === FACE ACCESSORIES (drawn over hair/face) ===
  const faceItem = equipped.face ? clothingItems[equipped.face] : null;
  if (faceItem) {
    const faceColor = faceItem.clothingColor || '#CCCCCC';
    const faceStyle = faceItem.clothingStyle || 'sunglasses';
    const faceRenderer = CLOTHING_RENDERERS.face[faceStyle];
    if (faceRenderer) faceRenderer(ctx, faceColor);
  }

  // === HAT (drawn over everything) ===
  const hatItem = equipped.hat ? clothingItems[equipped.hat] : null;
  if (hatItem) {
    const hatColor = hatItem.clothingColor || '#CC3333';
    const hatStyle = hatItem.clothingStyle || 'cap';
    const hatRenderer = CLOTHING_RENDERERS.hat[hatStyle];
    if (hatRenderer) hatRenderer(ctx, hatColor);
  }
}

// === Component ===

const PixelAvatar = ({ avatarConfig, size = 128, clothingItems = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = GRID_W;   // 128 (already scaled)
    canvas.height = GRID_H;  // 256
    drawAvatar(canvas, avatarConfig, clothingItems);
  }, [avatarConfig, clothingItems]);

  return (
    <div className="pixel-avatar" style={{ width: size, height: size * (GRID_H / GRID_W) }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default PixelAvatar;
