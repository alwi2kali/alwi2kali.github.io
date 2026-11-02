import { WORLD, places, solids, isBlocked } from './world.js';

const SPEED = 130; // satuan dunia per detik
const R = 8;
const NEAR = 18;

export function startGame(svg, { onNear, onPick, onGround }) {
  const hero = svg.querySelector('#hero');
  const body = svg.querySelector('#hero-body');
  const leg1 = svg.querySelector('#leg1');
  const leg2 = svg.querySelector('#leg2');
  const mark = svg.querySelector('#target');
  const [x0, y0] = places[0].door;
  const state = { x: x0, y: y0, face: 1, step: 0, keys: {}, target: null, near: null, paused: false };
  const chickens = spawnChickens(svg.querySelector('#chickens'));

  const KEYMAP = { ArrowUp: 'u', KeyW: 'u', ArrowDown: 'd', KeyS: 'd', ArrowLeft: 'l', KeyA: 'l', ArrowRight: 'r', KeyD: 'r' };
  window.addEventListener('keydown', (e) => {
    if (state.paused) return;
    if (KEYMAP[e.code]) {
      state.keys[KEYMAP[e.code]] = true;
      e.preventDefault();
    } else if ((e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') && state.near) {
      e.preventDefault();
      onPick(state.near.id);
    }
  });
  window.addEventListener('keyup', (e) => {
    if (KEYMAP[e.code]) state.keys[KEYMAP[e.code]] = false;
  });
  window.addEventListener('blur', () => (state.keys = {}));

  svg.addEventListener('click', (e) => {
    const hit = e.target.closest('[data-id]');
    if (hit) {
      onPick(hit.dataset.id, hit.dataset.sub !== undefined ? Number(hit.dataset.sub) : undefined);
      return;
    }
    onGround();
    const p = toWorld(svg, e.clientX, e.clientY);
    state.target = p;
    mark.setAttribute('cx', p.x);
    mark.setAttribute('cy', p.y);
  });

  function clearTarget() {
    state.target = null;
    mark.setAttribute('cx', -50);
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    move(dt);
    updateChickens(chickens, state, dt, now);
    camera(svg, state);
    requestAnimationFrame(frame);
  }

  function move(dt) {
    let dx = (state.keys.r ? 1 : 0) - (state.keys.l ? 1 : 0);
    let dy = (state.keys.d ? 1 : 0) - (state.keys.u ? 1 : 0);
    if (dx || dy) clearTarget();
    else if (state.target) {
      dx = state.target.x - state.x;
      dy = state.target.y - state.y;
      if (Math.hypot(dx, dy) < 3) {
        clearTarget();
        dx = dy = 0;
      }
    }
    const m = Math.hypot(dx, dy);
    if (m > 0 && !state.paused) {
      const vx = (dx / m) * SPEED * dt;
      const vy = (dy / m) * SPEED * dt;
      let moved = false;
      if (!isBlocked(state.x + vx, state.y, R)) { state.x += vx; moved = true; }
      if (!isBlocked(state.x, state.y + vy, R)) { state.y += vy; moved = true; }
      if (!moved && state.target) clearTarget();
      if (Math.abs(vx) > 0.2 * SPEED * dt) state.face = vx > 0 ? 1 : -1;
      state.step += dt * 14;
    } else {
      state.step = 0;
    }
    const swing = Math.sin(state.step) * 2.5;
    leg1.setAttribute('y', 4 + swing);
    leg2.setAttribute('y', 4 - swing);
    body.setAttribute('transform', `scale(${state.face},1)`);
    hero.setAttribute('transform', `translate(${state.x.toFixed(1)},${state.y.toFixed(1)})`);

    let near = null;
    let best = NEAR;
    for (const p of places) {
      const d = distToRect(state.x, state.y, p.f);
      if (d < best) { best = d; near = p; }
    }
    if (near !== state.near) {
      state.near = near;
      onNear(near);
    }
  }

  requestAnimationFrame(frame);

  return {
    teleport(id) {
      const p = places.find((q) => q.id === id);
      if (!p) return;
      [state.x, state.y] = p.door;
      clearTarget();
    },
    pause(v) {
      state.paused = v;
      state.keys = {};
      if (v) clearTarget();
    },
  };
}

function distToRect(x, y, [a, b, w, h]) {
  return Math.hypot(Math.max(a - x, 0, x - (a + w)), Math.max(b - y, 0, y - (b + h)));
}

function toWorld(svg, cx, cy) {
  const pt = svg.createSVGPoint();
  pt.x = cx;
  pt.y = cy;
  const p = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: p.x, y: p.y };
}

// Di layar lebar seluruh kampung terlihat; di HP kamera mengikuti hero.
function camera(svg, s) {
  const W = svg.clientWidth;
  const H = svg.clientHeight;
  if (!W || !H) return; // layar belum punya ukuran (tab tersembunyi)
  const mobile = W < 760;
  const top = mobile ? 64 : 72;
  const bottom = mobile ? 76 : 16;
  const fit = Math.min(W / (WORLD.w + 40), (H - top - bottom) / (WORLD.h + 30));
  const scale = mobile ? Math.max(fit, Math.min(W / 400, 1.6)) : fit;
  const vw = W / scale;
  const vh = H / scale;
  const padTop = top / scale;
  const padBottom = bottom / scale;
  let cx;
  let cy;
  if (vw >= WORLD.w + 40) cx = WORLD.w / 2;
  else cx = clamp(s.x, vw / 2 - 20, WORLD.w + 20 - vw / 2);
  if (vh - padTop - padBottom >= WORLD.h + 30) cy = WORLD.h / 2 - (padTop - padBottom) / 2;
  else cy = clamp(s.y, vh / 2 - padTop - 10, WORLD.h + 10 - vh / 2 + padBottom);
  svg.setAttribute('viewBox', `${(cx - vw / 2).toFixed(1)} ${(cy - vh / 2).toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`);
}

function clamp(v, lo, hi) {
  return lo > hi ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, v));
}

function spawnChickens(group) {
  const NS = 'http://www.w3.org/2000/svg';
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const list = [];
  for (let i = 0; i < 9; i++) {
    const g = document.createElementNS(NS, 'g');
    const b = document.createElementNS(NS, 'g');
    const col = i % 3 ? '#FFFFFF' : '#A0522D';
    b.innerHTML = `<ellipse rx="6" ry="4.5" fill="${col}" stroke="#888780" stroke-width="0.5"/><circle cx="5" cy="-3" r="2.8" fill="${col}" stroke="#888780" stroke-width="0.5"/><path d="M4 -6 l1.5 -2 l1.5 2z" fill="#E24B4A"/><path d="M7.5 -3 l2.5 1 l-2.5 1z" fill="#EF9F27"/><path d="M-6 -1 l-3 -3 l1 4z" fill="${col}"/>`;
    g.appendChild(b);
    group.appendChild(g);
    list.push({ g, b, x: 380 + rnd() * 130, y: 175 + rnd() * 25, vx: 0, vy: 0, t: 0, dir: 1, rnd });
  }
  return list;
}

function updateChickens(list, hero, dt, now) {
  for (const c of list) {
    const d = Math.hypot(c.x - hero.x, c.y - hero.y);
    if (d < 45) {
      const k = 110 / Math.max(d, 1);
      c.vx = (c.x - hero.x) * k;
      c.vy = (c.y - hero.y) * k;
      c.t = 0.7;
    } else if ((c.t -= dt) <= 0) {
      if (c.rnd() < 0.4) c.vx = c.vy = 0;
      else {
        const a = c.rnd() * Math.PI * 2;
        c.vx = Math.cos(a) * 30;
        c.vy = Math.sin(a) * 30;
      }
      c.t = 1 + c.rnd() * 2;
    }
    const nx = c.x + c.vx * dt;
    const ny = c.y + c.vy * dt;
    const out = nx < 225 || nx > 528 || ny < 70 || ny > 230;
    if (out || solids.some(([a, b, w, h]) => nx > a - 6 && nx < a + w + 6 && ny > b - 6 && ny < b + h + 6)) {
      c.vx = -c.vx;
      c.vy = -c.vy;
    } else {
      c.x = nx;
      c.y = ny;
    }
    if (Math.abs(c.vx) > 3) c.dir = c.vx > 0 ? 1 : -1;
    const peck = c.vx === 0 && c.vy === 0 && Math.sin(now / 180 + c.x) > 0.7 ? ' rotate(18)' : '';
    c.g.setAttribute('transform', `translate(${c.x.toFixed(1)},${c.y.toFixed(1)})`);
    c.b.setAttribute('transform', `scale(${c.dir},1)${peck}`);
  }
}
