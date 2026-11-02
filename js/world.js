// Tata letak peta. Koordinat dalam satuan dunia (680 x 620).
export const WORLD = { w: 680, h: 620 };

// f = area bangunan [x, y, lebar, tinggi], door = titik hero berdiri saat diantar ke tempat ini.
// walk = boleh dilewati, nolabel = tanpa papan nama.
export const places = [
  { id: 'rumah', label: 'Rumah panggung', title: 'Rumah orang tua', sub: 'Titik awal · tentang saya', panel: 'about', f: [240, 90, 100, 88], door: [352, 170] },
  { id: 'sawah', label: 'Sawah · skill', title: 'Sawah', sub: 'Yang saya tanam dan rawat · skill', panel: 'skills', f: [20, 80, 184, 170], door: [212, 200], walk: true },
  { id: 'kandang', label: 'Kandang ayam', title: 'Kandang ayam', sub: 'Pelajaran dari orang tua · cara kerja', panel: 'values', f: [391, 100, 68, 50], door: [425, 166] },
  { id: 'kebun', label: 'Kebun · eksperimen', title: 'Kebun jagung', sub: 'Proyek sampingan dan eksperimen', panel: 'experiments', f: [24, 282, 150, 190], door: [186, 380], walk: true },
  { id: 'jembatan', label: 'Jembatan · riwayat', title: 'Jembatan', sub: 'Perjalanan dari kampung · riwayat', panel: 'timeline', f: [318, 12, 44, 52], door: [340, 76], walk: true },
  { id: 'gapura', label: '', title: 'Kompleks D Group', sub: 'Gerbang holding · semua produk', panel: 'holding', f: [304, 210, 112, 40], door: [360, 262], walk: true, nolabel: true },
  { id: 'baruga', label: 'Kantor pusat', title: 'Baruga D Group', sub: 'Kantor pusat · tim', panel: 'team', f: [294, 332, 132, 80], door: [360, 426] },
  { id: 'dicatetin', label: 'Dicatetin', panel: 'product', f: [220, 262, 100, 60], door: [250, 334] },
  { id: 'diresepin', label: 'Diresepin', panel: 'product', f: [408, 262, 100, 60], door: [470, 334] },
  { id: 'dijadwalin', label: 'Dijadwalin', panel: 'product', f: [222, 432, 96, 90], door: [270, 536] },
  { id: 'dikasirin', label: 'Dikasirin', panel: 'product', f: [330, 462, 92, 62], door: [376, 540] },
  { id: 'travel', label: 'Travel', panel: 'product', f: [428, 440, 88, 100], door: [472, 556] },
  { id: 'rs', label: 'Rumah sakit', panel: 'job', f: [571, 92, 103, 82], door: [559, 134] },
  { id: 'kbi', label: 'Kantor KBI', panel: 'job', f: [571, 232, 103, 92], door: [559, 278] },
  { id: 'pilarmedia', label: 'Pilarmedia', panel: 'job', f: [571, 365, 103, 60], door: [559, 395] },
  { id: 'freelance', label: 'Freelance', panel: 'job', f: [571, 455, 103, 58], door: [559, 484] },
  { id: 'umi', label: 'Kampus UMI', panel: 'job', f: [571, 541, 103, 56], door: [559, 569] },
  { id: 'posronda', label: 'Pos ronda · kontak', title: 'Pos ronda', sub: 'Pukul kentongan untuk memanggil saya', panel: 'contact', f: [58, 520, 56, 42], door: [86, 576] },
];

const walls = [
  [200, 240, 122, 8], [398, 240, 127, 8], [200, 240, 8, 365], [200, 597, 325, 8],
  [517, 240, 8, 160], [517, 440, 8, 165], [314, 224, 10, 26], [396, 224, 10, 26],
];

export const solids = places.filter((p) => !p.walk).map((p) => p.f).concat(walls);

export function isBlocked(x, y, r) {
  if (x < r || x > WORLD.w - r || y > WORLD.h - r || y < 14) return true;
  if (y < 62 && !(x > 322 && x < 358)) return true; // sungai, kecuali jembatan
  return solids.some(([a, b, w, h]) => x > a - r && x < a + w + r && y > b - r && y < b + h + r);
}

const lamps = [[262, 130], [318, 130], [360, 380], [248, 302], [292, 302], [426, 300], [376, 505], [600, 150], [640, 150], [595, 285], [650, 285], [83, 548], [425, 128], [593, 401], [652, 401], [593, 490], [652, 490], [593, 575], [652, 575]];

// Gedung riwayat di sisi kota: [x, y, lebar, tinggi, atap, dinding, garis].
const cityRow = [
  [575, 365, 95, 60, '#534AB7', '#EEEDFE', '#26215C'],
  [575, 455, 95, 58, '#993C1D', '#FAECE7', '#4A1B0C'],
  [575, 541, 95, 56, '#3B6D11', '#EAF3DE', '#173404'],
];

function shop(x, y, w, h, roof, wall, ridge) {
  return `<ellipse cx="${x + w / 2}" cy="${y + h + 2}" rx="${w / 2 + 6}" ry="5" fill="#4F7A33"/>
<rect x="${x}" y="${y + h * 0.42}" width="${w}" height="${h * 0.58}" fill="${wall}" stroke="${ridge}"/>
<rect x="${x - 4}" y="${y}" width="${w + 8}" height="${h * 0.44}" rx="2" fill="${roof}"/>
<line x1="${x - 4}" y1="${y + h * 0.2}" x2="${x + w + 4}" y2="${y + h * 0.2}" stroke="${ridge}"/>
<rect x="${x + w / 2 - 6}" y="${y + h - 20}" width="12" height="20" fill="${ridge}"/>`;
}

function palm(x, y) {
  let s = `<ellipse cx="${x + 8}" cy="${y + 3}" rx="14" ry="4" fill="#4F7A33"/><line x1="${x}" y1="${y}" x2="${x + 5}" y2="${y - 26}" stroke="#8C6A43" stroke-width="3"/>`;
  for (let a = 0; a < 6; a++) {
    const cx = (x + 5 + Math.cos(a * 1.047) * 9).toFixed(1);
    const cy = (y - 26 + Math.sin(a * 1.047) * 5).toFixed(1);
    s += `<ellipse cx="${cx}" cy="${cy}" rx="10" ry="3" fill="${a % 2 ? '#3B6D11' : '#639922'}" transform="rotate(${a * 60} ${cx} ${cy})"/>`;
  }
  return s;
}

const PATHS = [
  'M340 62 C345 120,360 180,360 215 L360 244',
  'M360 215 C420 215,480 215,536 220',
  'M360 215 C300 210,230 215,205 215 C190 260,170 480,125 530',
  'M205 215 C205 200,205 180,205 165',
  'M290 180 C300 200,330 212,360 215',
  'M521 420 H536',
];

export function drawWorld(svg) {
  let sawah = '';
  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      sawah += `<rect x="${24 + c * 60}" y="${84 + r * 56}" width="56" height="52" rx="3" fill="url(#padi)" stroke="#4E8044"/>`;
    }
  }
  let garden = '';
  for (let i = 0; i < 3; i++) {
    const x = 440 + i * 26;
    garden += `<rect x="${x}" y="336" width="22" height="32" rx="2" fill="#7A5A35"/>`;
    for (let j = 0; j < 3; j++) garden += `<circle cx="${x + 11}" cy="${342 + j * 10}" r="4" fill="${['#3B6D11', '#639922', '#97C459'][(i + j) % 3]}"/>`;
  }
  let kbiWin = '';
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) kbiWin += `<rect x="${584 + c * 21}" y="${278 + r * 14}" width="14" height="9" fill="#E6F1FB"/>`;
  let awning = '';
  for (let i = 0; i < 8; i++) awning += `<rect x="${336 + i * 10}" y="488" width="10" height="6" fill="${i % 2 ? '#F1EFE8' : '#E24B4A'}"/>`;

  svg.innerHTML = `
<defs>
<pattern id="grass" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="#6FA34A"/><circle cx="4" cy="5" r="1.2" fill="#5E8F3C"/><circle cx="13" cy="13" r="1.1" fill="#86B85E"/><path d="M10 4 l1 -3 l1 3" stroke="#5E8F3C" stroke-width="0.8" fill="none"/></pattern>
<pattern id="yard" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#86B85E"/><circle cx="5" cy="6" r="1" fill="#6FA34A"/><circle cx="12" cy="12" r="1" fill="#97C459"/></pattern>
<pattern id="pave" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#D9D3C2"/><path d="M0 7h14M7 0v7M0 14h14M14 7v7" stroke="#B4AC97" stroke-width="0.8"/></pattern>
<pattern id="water" width="24" height="10" patternUnits="userSpaceOnUse"><rect width="24" height="10" fill="#4F95C9"/><path d="M0 5 Q6 2 12 5 T24 5" fill="none" stroke="#9CC7E6" stroke-width="1"/></pattern>
<pattern id="padi" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#5F9A55"/><path d="M2 6 V2 M5 6 V3" stroke="#B5DB72" stroke-width="1.2"/></pattern>
<pattern id="jagung" width="12" height="10" patternUnits="userSpaceOnUse"><rect width="12" height="10" fill="#7A5A35"/><circle cx="6" cy="5" r="3.2" fill="#639922"/><circle cx="7" cy="4" r="1.2" fill="#EF9F27"/></pattern>
<pattern id="plank" width="44" height="6" patternUnits="userSpaceOnUse"><rect width="44" height="6" fill="#B07A4A"/><line x1="0" y1="5.5" x2="44" y2="5.5" stroke="#7A4B2A" stroke-width="1"/></pattern>
</defs>
<rect x="-1500" y="-1500" width="3680" height="3620" fill="url(#grass)"/>
<g id="river"><path d="M-1500 40 L0 38 C120 20,220 56,340 38 S560 20,680 40 L2180 40" fill="none" stroke="#3F7A3A" stroke-width="44"/>
<path d="M-1500 40 L0 38 C120 20,220 56,340 38 S560 20,680 40 L2180 40" fill="none" stroke="url(#water)" stroke-width="34"/></g>
<rect x="318" y="12" width="44" height="52" fill="url(#plank)" stroke="#7A4B2A"/>
<rect x="536" y="60" width="30" height="2000" fill="#5F5E5A"/>
<line x1="551" y1="64" x2="551" y2="2060" stroke="#F1EFE8" stroke-width="1.5" stroke-dasharray="10 10"/>

<rect x="204" y="244" width="317" height="357" fill="url(#yard)"/>
<rect x="284" y="316" width="152" height="112" rx="10" fill="url(#pave)"/>
<rect x="352" y="244" width="16" height="74" fill="url(#pave)"/>
<rect x="434" y="412" width="90" height="16" fill="url(#pave)"/>

<g fill="none" stroke-linecap="round">
<g stroke="#A47E4C" stroke-width="20">${PATHS.map((d) => `<path d="${d}"/>`).join('')}</g>
<g stroke="#C8A06A" stroke-width="14">${PATHS.map((d) => `<path d="${d}"/>`).join('')}</g>
</g>

${sawah}
<g transform="translate(110,150)"><line x1="0" y1="-14" x2="0" y2="14" stroke="#7A4B2A" stroke-width="2"/><line x1="-10" y1="-4" x2="10" y2="-4" stroke="#7A4B2A" stroke-width="2"/><circle cy="-16" r="4" fill="#F1EFE8"/><ellipse cy="-19" rx="8" ry="2.5" fill="#EF9F27"/></g>
<rect x="24" y="282" width="150" height="190" rx="4" fill="url(#jagung)" stroke="#5A3A1E"/>

<ellipse cx="290" cy="178" rx="54" ry="6" fill="#4F7A33"/>
<path d="M254 146v30M274 146v30M306 146v30M326 146v30" stroke="#5A3A1E" stroke-width="3"/>
<rect x="236" y="94" width="108" height="24" fill="#8C4A24"/><rect x="246" y="116" width="88" height="30" fill="#B07A4A"/>
<line x1="246" y1="146" x2="334" y2="146" stroke="#5A3A1E" stroke-width="3"/>
<rect x="256" y="124" width="12" height="12" fill="#5A3A1E"/><rect x="312" y="124" width="12" height="12" fill="#5A3A1E"/><rect x="284" y="122" width="12" height="24" fill="#7A4B2A"/>
<polygon points="252,118 290,90 328,118" fill="#A0592E" stroke="#6B3418"/>
<path d="M276 108h28M268 113h44M283 103h14" stroke="#6B3418"/>
<rect x="283" y="146" width="14" height="32" fill="#9A6A3C"/><path d="M283 154h14M283 162h14M283 170h14" stroke="#5A3A1E"/>

<rect x="370" y="80" width="150" height="124" rx="6" fill="none" stroke="#A47E4C" stroke-width="3" stroke-dasharray="2 5"/>
<path d="M401 138v12M449 138v12" stroke="#5A3A1E" stroke-width="2"/>
<rect x="391" y="100" width="68" height="16" fill="#9AA3A8"/><line x1="391" y1="108" x2="459" y2="108" stroke="#7B8389"/>
<rect x="395" y="116" width="60" height="22" fill="#C9A86A"/>
<path d="M403 116v22M411 116v22M419 116v22M427 116v22M435 116v22M443 116v22M451 116v22" stroke="#A47E4C"/>
<rect x="470" y="170" width="26" height="7" rx="2" fill="#7A4B2A"/>

<g fill="#B07A4A" stroke="#7A4B2A">${walls.slice(0, 6).map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>
<rect x="314" y="224" width="10" height="26" fill="#8C4A24"/><rect x="396" y="224" width="10" height="26" fill="#8C4A24"/>
<rect x="304" y="210" width="112" height="18" rx="3" fill="#7A3E1E" stroke="#4A1B0C"/>
<text x="360" y="219" text-anchor="middle" dominant-baseline="central" fill="#FAEEDA">Kompleks D Group</text>

<ellipse cx="360" cy="412" rx="66" ry="6" fill="#4F7A33"/>
<path d="M308 366v40M340 366v40M380 366v40M412 366v40" stroke="#5A3A1E" stroke-width="4"/>
<rect x="300" y="400" width="120" height="8" fill="#B07A4A"/>
<rect x="294" y="332" width="132" height="34" rx="2" fill="#8C4A24"/>
<polygon points="312,366 360,336 408,366" fill="#A0592E" stroke="#6B3418"/>
<path d="M344 353h32M334 359h52" stroke="#6B3418"/>
<rect x="342" y="372" width="36" height="12" rx="2" fill="#534AB7"/><text x="360" y="378" text-anchor="middle" dominant-baseline="central" fill="#EEEDFE">D</text>

<line x1="226" y1="346" x2="280" y2="346" stroke="#5A3A1E"/><path d="M226 338v20M280 338v20" stroke="#5A3A1E" stroke-width="2.5"/>
<rect x="232" y="347" width="9" height="12" fill="#E24B4A"/><rect x="245" y="347" width="10" height="9" fill="#F1EFE8"/><rect x="259" y="347" width="8" height="13" fill="#378ADD"/><rect x="270" y="347" width="8" height="10" fill="#FAC775"/>
${garden}
<path d="M232 452v64M262 452v64M292 452v64M312 452v64M226 484h92M226 452h92" stroke="#C9A86A" stroke-width="3"/>
<polygon points="228,452 272,432 316,452" fill="none" stroke="#C9A86A" stroke-width="3"/>
<rect x="238" y="504" width="22" height="5" fill="#7A4B2A"/><rect x="240" y="499" width="22" height="5" fill="#9A6A3C"/>

${shop(224, 262, 92, 58, '#185FA5', '#E6F1FB', '#0C447C')}
<circle cx="248" cy="302" r="6" fill="#B5D4F4" stroke="#0C447C"/><circle cx="292" cy="302" r="6" fill="#B5D4F4" stroke="#0C447C"/>
${shop(412, 262, 92, 58, '#0F6E56', '#E1F5EE', '#04342C')}
<rect x="426" y="298" width="14" height="4" fill="#1D9E75"/><rect x="431" y="293" width="4" height="14" fill="#1D9E75"/>
${shop(334, 462, 84, 62, '#D85A30', '#FAEEDA', '#712B13')}${awning}
${shop(432, 440, 80, 56, '#5F5E5A', '#D3D1C7', '#2C2C2A')}
<rect x="440" y="510" width="50" height="26" rx="5" fill="#F1EFE8" stroke="#888780"/><rect x="448" y="514" width="34" height="9" rx="2" fill="#85B7EB"/><circle cx="449" cy="537" r="4" fill="#2C2C2A"/><circle cx="481" cy="537" r="4" fill="#2C2C2A"/>
${shop(575, 92, 95, 82, '#B4B2A9', '#F1EFE8', '#5F5E5A')}
<rect x="614" y="118" width="18" height="6" fill="#E24B4A"/><rect x="620" y="112" width="6" height="18" fill="#E24B4A"/>
${shop(575, 232, 95, 92, '#185FA5', '#B5D4F4', '#0C447C')}${kbiWin}
${cityRow.map(([x, y, w, h, roof, wall, ridge]) => {
    const wy = Math.round(y + h * 0.42 + 6);
    return `${shop(x, y, w, h, roof, wall, ridge)}<rect x="${x + 12}" y="${wy}" width="12" height="10" fill="${ridge}" opacity="0.7"/><rect x="${x + w - 24}" y="${wy}" width="12" height="10" fill="${ridge}" opacity="0.7"/>`;
  }).join('')}<line x1="622" y1="541" x2="622" y2="521" stroke="#5F5E5A" stroke-width="1.5"/><rect x="622" y="521" width="12" height="4" fill="#E24B4A"/><rect x="622" y="525" width="12" height="4" fill="#FFFFFF"/>
<path d="M64 528v32M108 528v32" stroke="#5A3A1E" stroke-width="3"/><rect x="58" y="520" width="56" height="14" fill="#A47E4C"/><rect x="80" y="537" width="6" height="18" rx="2" fill="#7A3E1E"/>

${[[214, 70], [22, 268], [180, 590], [40, 610], [505, 590], [230, 585], [470, 240], [150, 520], [-40, 200], [720, 120], [-60, 480], [730, 330]].map(([x, y]) => palm(x, y)).join('')}
<rect id="night" x="-1500" y="-1500" width="3680" height="3620" fill="#0B1E3F" opacity="0" pointer-events="none"/>
<g id="lamps" opacity="0" pointer-events="none">${lamps.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#FAC775" opacity="0.3"/><circle cx="${x}" cy="${y}" r="2.5" fill="#FFF1C1"/>`).join('')}</g>
<g id="chickens"></g>
<g id="labels"></g>
<circle id="target" cx="-50" cy="-50" r="6" fill="none" stroke="#FAC775" stroke-width="2"/>
<g id="hero" transform="translate(290,198)">
<ellipse cy="12" rx="9" ry="3" fill="#3F6B2A"/>
<g id="hero-body"><rect id="leg1" x="-5" y="4" width="4" height="8" rx="1" fill="#2C2C2A"/><rect id="leg2" x="1" y="4" width="4" height="8" rx="1" fill="#2C2C2A"/>
<rect x="-7" y="-6" width="14" height="12" rx="3" fill="#185FA5"/><rect x="-7" y="2" width="14" height="5" fill="#993C1D"/>
<circle cy="-11" r="6" fill="#E0B48A"/><rect x="-6" y="-18" width="12" height="5" rx="1.5" fill="#2C2C2A"/><circle cx="3" cy="-10" r="1" fill="#2C2C2A"/></g>
<text y="-23" text-anchor="middle" fill="#FFFFFF" class="name">Alwi</text>
</g>
<g id="hits"></g>`;

  const labels = svg.querySelector('#labels');
  const hits = svg.querySelector('#hits');
  const NS = 'http://www.w3.org/2000/svg';
  for (const p of places) {
    const [x, y, w, h] = p.f;
    if (p.id === 'sawah') {
      for (let c = 0; c < 3; c++) {
        for (let r = 0; r < 3; r++) {
          const hit = document.createElementNS(NS, 'rect');
          Object.entries({ x: 24 + c * 60, y: 84 + r * 56, width: 56, height: 52, rx: 4, class: 'hit', 'data-id': 'sawah', 'data-sub': r * 3 + c }).forEach(([k, v]) => hit.setAttribute(k, v));
          hits.appendChild(hit);
        }
      }
    } else {
      const hit = document.createElementNS(NS, 'rect');
      Object.entries({ x: x - 3, y: y - 3, width: w + 6, height: h + 6, rx: 6, class: 'hit', 'data-id': p.id }).forEach(([k, v]) => hit.setAttribute(k, v));
      hits.appendChild(hit);
    }
    if (p.nolabel) continue;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'label');
    g.setAttribute('data-id', p.id);
    const rect = document.createElementNS(NS, 'rect');
    const text = document.createElementNS(NS, 'text');
    Object.entries({ y: y + h + 5, height: 18, rx: 4 }).forEach(([k, v]) => rect.setAttribute(k, v));
    Object.entries({ y: y + h + 14, 'text-anchor': 'middle', 'dominant-baseline': 'central' }).forEach(([k, v]) => text.setAttribute(k, v));
    text.textContent = p.label;
    g.append(rect, text);
    labels.appendChild(g);
    const tw = text.getComputedTextLength() + 14;
    const rx = Math.max(2, Math.min(WORLD.w - 2 - tw, x + w / 2 - tw / 2));
    rect.setAttribute('x', rx);
    rect.setAttribute('width', tw);
    text.setAttribute('x', rx + tw / 2);
  }
}
