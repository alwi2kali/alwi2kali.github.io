import { drawWorld } from './world.js';
import { startGame } from './game.js';
import { createUI } from './ui.js';

// Lebar papan nama dihitung dari font, jadi tunggu font selesai dimuat.
await document.fonts.ready;

const svg = document.getElementById('world');
drawWorld(svg);

let ui = null;
const game = startGame(svg, {
  onNear: (p) => ui?.near(p),
  onPick: (id, sub) => ui?.open(id, sub),
  onGround: () => ui?.close(),
});
ui = createUI({ game });
document.body.classList.add('ready');
