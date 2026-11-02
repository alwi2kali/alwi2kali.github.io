import { profile, contact, skills, values, experiments, jobs, holding, team, products } from './content.js';
import { places } from './world.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const icon = (n) => `<i class="ti ti-${n}" aria-hidden="true"></i>`;
const chips = (list) => (list.length ? `<div class="chips">${list.map((s) => `<span>${esc(s)}</span>`).join('')}</div>` : '');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* mode privat */ } },
};

const NAV = { about: 'rumah', skills: 'sawah', products: 'gapura', timeline: 'jembatan', contact: 'posronda' };
const product = (id) => products.find((p) => p.id === id);
const job = (id) => jobs.find((j) => j.id === id);

export function placeInfo(p) {
  if (p.panel === 'product') {
    const d = product(p.id);
    return { title: d.name, sub: `${d.kind} · ${d.status}` };
  }
  if (p.panel === 'job') {
    const d = job(p.id);
    return { title: d.org, sub: d.title };
  }
  return { title: p.title, sub: p.sub };
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

function linkBtn(url, label, primary) {
  return `<a class="btn${primary ? ' primary' : ''}" href="${esc(url)}" target="_blank" rel="noopener">${label} ${icon('external-link')}</a>`;
}

function openBtn(id, label) {
  return `<button class="btn" data-open="${id}">${label}</button>`;
}

function contactLinks() {
  const out = [];
  if (contact.email) out.push(`<a class="contact" href="mailto:${esc(contact.email)}">${icon('mail')}<span><strong>Email</strong>${esc(contact.email)}</span></a>`);
  if (contact.whatsapp) out.push(`<a class="contact" href="https://wa.me/${esc(contact.whatsapp)}" target="_blank" rel="noopener">${icon('brand-whatsapp')}<span><strong>WhatsApp</strong>+${esc(contact.whatsapp)}</span></a>`);
  if (contact.linkedin) out.push(`<a class="contact" href="${esc(contact.linkedin)}" target="_blank" rel="noopener">${icon('brand-linkedin')}<span><strong>LinkedIn</strong>Alwi Bahar</span></a>`);
  if (contact.github) out.push(`<a class="contact" href="${esc(contact.github)}" target="_blank" rel="noopener">${icon('brand-github')}<span><strong>GitHub</strong>${esc(contact.github.replace(/^https?:\/\//, ''))}</span></a>`);
  if (profile.cv) out.push(`<a class="contact" href="${esc(profile.cv)}" download>${icon('file-cv')}<span><strong>CV</strong>Unduh PDF</span></a>`);
  return out.join('');
}

function productCard(d) {
  return `<article class="card product-card" style="--accent:${d.color}">
<div class="card-head"><h3>${esc(d.name)}</h3><span class="badge${d.status === 'Live' ? ' live' : ''}">${esc(d.status)}</span></div>
<p class="muted">${esc(d.kind)}</p><p>${esc(d.summary)}</p>
<div class="actions">${openBtn(d.id, 'Detail')}${d.url ? linkBtn(d.url, 'Kunjungi situs', true) : ''}</div></article>`;
}

function skillCard(s, i, active) {
  return `<article class="card skill-card${active ? ' active' : ''}" data-skill="${i}"><h3>${icon(s.icon)} ${esc(s.name)}</h3>${chips(s.items)}</article>`;
}

function timelineHtml() {
  const steps = [{ org: 'Kampung, Sulawesi Selatan', title: 'Anak petani dan peternak ayam', period: 'Awal', points: [], place: 'rumah' }]
    .concat(jobs.map((j) => ({ ...j, place: j.id === 'dgroup' ? 'gapura' : j.id })));
  return `<ol class="timeline">${steps.map((s) => `<li><span class="dot"></span><div>
<p class="muted">${esc(s.period || '')}</p><h3>${esc(s.title)}</h3><p><strong>${esc(s.org)}</strong></p>
${s.points.length ? `<ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
<button class="link" data-open="${s.place}">Lihat tempatnya ${icon('map-pin')}</button></div></li>`).join('')}</ol>`;
}

function teamHtml() {
  const filled = team.filter((m) => m.name);
  const rest = team.length - filled.length;
  return `<div class="team">${filled.map((m) => `<div class="member"><span class="avatar">${esc(initials(m.name))}</span><div><strong>${esc(m.name)}</strong><span class="muted">${esc(m.role)}</span></div></div>`).join('')}</div>
${rest > 0 ? `<p class="muted">Dan ${rest} rekan lainnya.</p>` : ''}`;
}

const RENDER = {
  about: () => `<div class="hero-card">${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="${esc(profile.name)}">` : `<span class="avatar big">${esc(initials(profile.name))}</span>`}
<div><h2 id="panel-title">${esc(profile.name)}</h2><p class="muted">${esc(profile.role)} · ${esc(profile.location)}</p></div></div>
${profile.about.map((p) => `<p>${esc(p)}</p>`).join('')}
<div class="actions">${openBtn('sawah', `${icon('plant-2')} Skill`)}${openBtn('gapura', `${icon('building-community')} Produk`)}${openBtn('posronda', `${icon('message-circle')} Kontak`)}</div>`,
  skills: (sub) => `<h2 id="panel-title">Skill</h2><p class="muted">Setiap petak sawah adalah satu kelompok keahlian. Klik petak lain di peta untuk menyorotnya.</p>
<div class="grid">${skills.map((s, i) => skillCard(s, i, i === sub)).join('')}</div>`,
  values: () => `<h2 id="panel-title">Kandang ayam</h2><p class="muted">Yang saya pelajari dari orang tua, dan saya bawa ke setiap proyek.</p>
${values.map((v) => `<article class="card"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join('')}`,
  experiments: () => `<h2 id="panel-title">Kebun eksperimen</h2><p class="muted">Proyek sampingan yang ditanam untuk belajar hal baru.</p>
${experiments.map((x) => `<article class="card"><h3>${esc(x.name)}</h3><p>${esc(x.text)}</p>${chips(x.stack)}</article>`).join('')}`,
  timeline: () => `<h2 id="panel-title">Riwayat</h2><p class="muted">Menyeberang jembatan: dari kampung ke kota, lalu membangun produk sendiri.</p>${timelineHtml()}`,
  holding: () => `<h2 id="panel-title">${esc(holding.name)}</h2><p>${esc(holding.text)}</p><div class="grid">${products.map(productCard).join('')}</div>`,
  team: () => `<h2 id="panel-title">Baruga ${esc(holding.name)}</h2><p>Baruga adalah balai pertemuan khas Bugis-Makassar. Di sinilah tim berkumpul untuk merancang, membangun, dan memasarkan produk.</p>${teamHtml()}
<div class="actions">${openBtn('gapura', 'Lihat semua produk')}</div>`,
  product: (sub, id) => {
    const d = product(id);
    return `<div class="product-head" style="--accent:${d.color}"><h2 id="panel-title">${esc(d.name)}</h2><span class="badge${d.status === 'Live' ? ' live' : ''}">${esc(d.status)}</span></div>
<p class="muted">${esc(d.kind)}</p><p>${esc(d.summary)}</p>
${d.features.length ? `<h3>Fitur utama</h3><ul class="checks">${d.features.map((f) => `<li>${icon('check')} ${esc(f)}</li>`).join('')}</ul>` : ''}
${d.role ? `<h3>Peran saya</h3><p>${esc(d.role)}</p>` : ''}
${d.stack.length ? `<h3>Teknologi</h3>${chips(d.stack)}` : ''}
<div class="actions">${d.url ? linkBtn(d.url, 'Kunjungi situs', true) : ''}${openBtn('gapura', 'Produk lainnya')}</div>`;
  },
  job: (sub, id) => {
    const d = job(id);
    return `<h2 id="panel-title">${esc(d.title)}</h2><p class="muted">${esc(d.org)}${d.period ? ` · ${esc(d.period)}` : ''}</p>
<ul>${d.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul><div class="actions">${openBtn('jembatan', 'Riwayat lengkap')}</div>`;
  },
  contact: () => `<h2 id="panel-title">Pos ronda</h2><p>Kentongan sudah dipukul. Silakan hubungi saya untuk kerja sama, proyek, atau sekadar ngopi.</p><div class="contacts">${contactLinks()}</div>`,
};

export function createUI({ game }) {
  const panel = $('#panel');
  const body = $('#panel-body');
  const prompt = $('#prompt');
  const eggs = $('#eggs');
  const ringkas = $('#ringkas');
  const welcome = $('#welcome');
  const seen = new Set(JSON.parse(store.get('kampung.seen') || '[]').filter((id) => places.some((p) => p.id === id)));
  let current = null;

  eggs.innerHTML = `${icon('egg')}<span class="egg-row">${places.map(() => '<i class="egg"></i>').join('')}</span><span id="egg-count"></span>`;
  function drawEggs() {
    eggs.querySelectorAll('.egg').forEach((e, i) => e.classList.toggle('on', i < seen.size));
    $('#egg-count').textContent = seen.size === places.length ? 'Penuh' : `${seen.size}/${places.length}`;
  }
  drawEggs();

  function open(id, sub) {
    const p = places.find((q) => q.id === id);
    if (!p) return;
    body.innerHTML = RENDER[p.panel](sub, id);
    panel.hidden = false;
    panel.scrollTop = 0;
    prompt.hidden = true;
    current = id;
    game.pause(true);
    if (!seen.has(id)) {
      seen.add(id);
      store.set('kampung.seen', JSON.stringify([...seen]));
      drawEggs();
    }
    history.replaceState(null, '', `#${id}`);
    const active = body.querySelector('.skill-card.active');
    if (active) active.scrollIntoView({ block: 'center' });
    panel.querySelector('.panel-close').focus({ preventScroll: true });
  }

  function close() {
    if (panel.hidden) return;
    panel.hidden = true;
    current = null;
    game.pause(false);
    history.replaceState(null, '', location.pathname);
    near(lastNear);
  }

  function go(id) {
    game.teleport(id);
    open(id);
  }

  panel.addEventListener('click', (e) => {
    const t = e.target.closest('[data-open]');
    if (t) go(t.dataset.open);
    if (e.target.closest('.panel-close')) close();
  });

  document.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => {
    hideRingkas();
    go(NAV[b.dataset.nav]);
  }));

  $('#prompt-open').addEventListener('click', () => current === null && prompt.dataset.id && open(prompt.dataset.id));

  let lastNear = null;
  function near(p) {
    lastNear = p;
    if (!p || !panel.hidden) {
      prompt.hidden = true;
      return;
    }
    const info = placeInfo(p);
    prompt.dataset.id = p.id;
    $('#prompt-title').textContent = info.title;
    $('#prompt-sub').textContent = info.sub;
    prompt.hidden = false;
  }

  function buildRingkas() {
    ringkas.innerHTML = `<div class="ringkas-inner">
<header class="ringkas-head"><div><h1>${esc(profile.name)}</h1><p>${esc(profile.role)} · ${esc(profile.location)}</p><p>${esc(profile.tagline)}</p></div>
<button class="btn primary" id="back-kampung">${icon('map-2')} Jelajahi kampung</button></header>
<section><h2>Tentang</h2>${profile.about.map((p) => `<p>${esc(p)}</p>`).join('')}</section>
<section><h2>Skill</h2><div class="grid">${skills.map((s, i) => skillCard(s, i)).join('')}</div></section>
<section><h2>Produk ${esc(holding.name)}</h2><p>${esc(holding.text)}</p><div class="grid">${products.map((d) => `<article class="card product-card" style="--accent:${d.color}"><div class="card-head"><h3>${esc(d.name)}</h3><span class="badge${d.status === 'Live' ? ' live' : ''}">${esc(d.status)}</span></div><p class="muted">${esc(d.kind)}</p><p>${esc(d.summary)}</p>${d.stack.length ? chips(d.stack) : ''}${d.url ? `<div class="actions">${linkBtn(d.url, 'Kunjungi situs', true)}</div>` : ''}</article>`).join('')}</div></section>
<section><h2>Riwayat</h2>${timelineHtml().replace(/<button class="link"[^>]*>.*?<\/button>/g, '')}</section>
<section><h2>Cara kerja</h2><div class="grid">${values.map((v) => `<article class="card"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join('')}</div></section>
<section><h2>Kontak</h2><div class="contacts">${contactLinks()}</div></section>
</div>`;
    $('#back-kampung').addEventListener('click', hideRingkas);
  }

  function showRingkas() {
    close();
    buildRingkas();
    ringkas.hidden = false;
    document.body.classList.add('ringkas-on');
    game.pause(true);
    history.replaceState(null, '', '#ringkas');
    ringkas.scrollTop = 0;
  }

  function hideRingkas() {
    if (ringkas.hidden) return;
    ringkas.hidden = true;
    document.body.classList.remove('ringkas-on');
    game.pause(false);
    history.replaceState(null, '', location.pathname);
  }

  $('#btn-ringkas').addEventListener('click', showRingkas);

  const night = $('#btn-night');
  function setNight(on) {
    document.body.classList.toggle('night', on);
    night.innerHTML = on ? icon('sun') : icon('moon');
    night.setAttribute('aria-label', on ? 'Ubah ke siang' : 'Ubah ke malam');
  }
  const h = new Date().getHours();
  setNight(h >= 18 || h < 5);
  night.addEventListener('click', () => setNight(!document.body.classList.contains('night')));

  function closeWelcome(mode) {
    welcome.hidden = true;
    store.set('kampung.welcomed', '1');
    if (mode === 'ringkas') showRingkas();
    else game.pause(false);
  }
  $('#welcome-start').addEventListener('click', () => closeWelcome('main'));
  $('#welcome-ringkas').addEventListener('click', () => closeWelcome('ringkas'));

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!welcome.hidden) closeWelcome('main');
    else if (!panel.hidden) close();
    else hideRingkas();
  });

  function fromHash() {
    const hash = location.hash.slice(1);
    if (hash === 'ringkas') showRingkas();
    else if (places.some((p) => p.id === hash)) {
      hideRingkas();
      go(hash);
    } else return false;
    welcome.hidden = true;
    return true;
  }
  window.addEventListener('hashchange', fromHash);

  if (!fromHash() && !store.get('kampung.welcomed')) {
    welcome.hidden = false;
    game.pause(true);
    $('#welcome-start').focus();
  }

  return { open, near, close };
}
