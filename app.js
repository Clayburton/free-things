/* ==========================================================================
   FREE THINGS — the table
   Builds the page from items.js, plays a demo clip per thing, and tells the
   host iframe how tall it is. No canvas scene, no libraries.

   Debug: window.__free
   ========================================================================== */
(() => {
'use strict';

const $  = (s, r) => (r || document).querySelector(s);
const el = id => document.getElementById(id);

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ------------------------------------------------------------------ audio --
const A = {
  ctx: null, master: null, analyser: null,
  buffers: new Map(), envs: new Map(),
  cur: null, curId: null, startedAt: 0, on: false, level: 0, raf: 0
};

function audioInit() {
  if (A.ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  A.ctx = new AC();
  A.master = A.ctx.createGain();
  A.master.gain.value = 0.62;
  A.analyser = A.ctx.createAnalyser();
  A.analyser.fftSize = 256;
  A.master.connect(A.analyser);
  A.analyser.connect(A.ctx.destination);
}

// Is there actually a clip? Checked once, up front, so the page never offers
// sound it doesn't have — and lights up on its own when the mp3s land.
async function probe(item) {
  if (!item.audio) { item._ok = false; return; }
  try {
    const r = await fetch(item.audio, { method: 'HEAD' });
    item._ok = r.ok;
  } catch (e) { item._ok = false; }
  paintHear(item);
}

async function load(item) {
  if (A.buffers.has(item.id)) return A.buffers.get(item.id);
  const r = await fetch(item.audio, { cache: 'force-cache' });
  if (!r.ok) throw new Error('no clip');
  const buf = await A.ctx.decodeAudioData(await r.arrayBuffer());
  A.buffers.set(item.id, buf);
  A.envs.set(item.id, envelope(buf));
  return buf;
}

// RMS-led, with peak for the jaggedness (same idea as the player)
function envelope(buf, bins = 260) {
  const ch = buf.getChannelData(0);
  const per = Math.max(1, Math.floor(ch.length / bins));
  const out = new Float32Array(bins);
  let lo = 1e9, hi = 0;
  for (let i = 0; i < bins; i++) {
    let sum = 0, peak = 0;
    const s = i * per, e = Math.min(s + per, ch.length);
    for (let j = s; j < e; j++) { const v = ch[j]; sum += v * v; const a = v < 0 ? -v : v; if (a > peak) peak = a; }
    const v = Math.sqrt(sum / Math.max(1, e - s)) * 0.78 + peak * 0.22;
    out[i] = v; if (v < lo) lo = v; if (v > hi) hi = v;
  }
  // Stretch across the clip's own range so structure shows — but only if there
  // IS structure. A held pad has a flat envelope and stretching it makes a slab.
  const span = hi - lo;
  if (span < hi * 0.20) for (let i = 0; i < bins; i++) out[i] = Math.min(1, out[i] / Math.max(1e-4, hi)) * 0.55;
  else                  for (let i = 0; i < bins; i++) out[i] = Math.pow((out[i] - lo) / span, 0.78);
  return out;
}

async function play(item) {
  audioInit();
  if (!A.ctx) return;
  if (A.ctx.state === 'suspended') await A.ctx.resume();
  if (A.curId === item.id) return;
  stop();
  let buf;
  try { buf = await load(item); }
  catch (e) { item._ok = false; paintHear(item); return; }

  const src = A.ctx.createBufferSource();
  src.buffer = buf; src.loop = true;
  const g = A.ctx.createGain();
  g.gain.setValueAtTime(0.0001, A.ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(1, A.ctx.currentTime + 0.28);
  src.connect(g); g.connect(A.master);
  src.start();
  A.cur = { src, g, dur: buf.duration };
  A.curId = item.id; A.startedAt = A.ctx.currentTime; A.on = true;
  paintAll();
  if (!A.raf) tick();
}

function stop() {
  if (A.cur) {
    const { src, g } = A.cur, t = A.ctx.currentTime;
    try {
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      src.stop(t + 0.24);
    } catch (e) {}
  }
  const was = A.curId;
  A.cur = null; A.curId = null;
  if (was) { paintAll(); drawWave(was); }
}

const pos = () => (A.cur && A.ctx) ? ((A.ctx.currentTime - A.startedAt) % A.cur.dur) / A.cur.dur : -1;

function tick() {
  A.raf = requestAnimationFrame(tick);
  if (!A.cur) { cancelAnimationFrame(A.raf); A.raf = 0; return; }
  const arr = new Uint8Array(A.analyser.frequencyBinCount);
  A.analyser.getByteTimeDomainData(arr);
  let peak = 0;
  for (let i = 0; i < arr.length; i++) { const v = Math.abs(arr[i] - 128) / 128; if (v > peak) peak = v; }
  A.level += (peak - A.level) * (peak > A.level ? 0.16 : 0.06);
  drawWave(A.curId);
}

// ------------------------------------------------------------------ build --
const cards = new Map();   // id -> { item, root, wave, hear }
let DPR = 1;

function build() {
  const table = el('table');
  const items = window.ITEMS || [];
  let sec = null;
  const frag = document.createDocumentFragment();

  const newSection = label => {
    sec = document.createElement('div');
    sec.className = 'section';
    if (label) {
      const h = document.createElement('div');
      h.className = 'sec-head';
      h.innerHTML = `<span>${esc(label)}</span>`;
      sec.appendChild(h);
    }
    frag.appendChild(sec);
  };
  newSection(null);

  items.forEach((it, i) => {
    if (it.divider) {
      if (it.end) { sec.appendChild(soonCard(it)); return; }
      newSection(it.divider);
      return;
    }
    sec.appendChild(thingCard(it, i));
  });

  table.appendChild(frag);
  items.filter(i => !i.divider).forEach(probe);
}

function soonCard(it) {
  const a = document.createElement('article');
  a.className = 'thing thing--soon';
  a.innerHTML =
    `<div class="slot"><span>${esc(it.divider)}</span></div>
     <div class="meta"><p class="story">${esc(window.END_NOTE || '')}</p></div>`;
  return a;
}

function thingCard(it, i) {
  const a = document.createElement('article');
  a.className = 'thing';
  // hand-placed, not gridded — a fixed nudge per position, never random
  a.style.setProperty('--rot', (((i * 37) % 7) - 3) * 0.16 + 'deg');
  a.style.setProperty('--tint', it.tint || '#ece5da');

  const take = it.take || {};
  const dl   = take.kind === 'download';
  const meta = dl ? (take.size ? '· ' + take.size : '· free') : '· free';

  a.innerHTML = `
    <button class="obj" type="button" aria-label="Hear ${esc(it.title)}">
      <img alt="" decoding="async">
      <span class="hear" role="presentation" hidden>
        <svg viewBox="0 0 16 18" aria-hidden="true"><path d="M1.2 1.1 15 9 1.2 16.9Z"/></svg>
        <span class="hl">hear it</span>
      </span>
    </button>
    <div class="meta">
      <h2 class="name">${esc(it.title)}</h2>
      <canvas class="wave" aria-hidden="true"></canvas>
      <p class="story">${esc(it.story)}</p>
      <p class="specs">${(it.specs || []).map(s => `<span>${esc(s)}</span>`).join('<i>·</i>')}</p>
      <p class="do">
        <a class="take" href="${esc(take.href || '#')}"${dl ? ' download' : ' target="_top"'}>
          ${esc(take.label || 'take it')} <em>${meta}</em></a>
        ${(it.links || []).map(l =>
          `<a class="more" href="${esc(l.href)}" target="_top" rel="noopener">${esc(l.label)}</a>`).join('')}
      </p>
    </div>`;

  const obj  = $('.obj', a);
  const img  = $('img', a);
  const hear = $('.hear', a);

  img.onload  = () => { img.classList.add('in'); postHeight(); };
  img.onerror = () => postHeight();
  img.src = it.art;

  obj.addEventListener('click', () => {
    if (it._ok !== true) return;
    if (A.curId === it.id) stop(); else play(it);
  });

  cards.set(it.id, { item: it, root: a, wave: $('.wave', a), hear, obj });
  return a;
}

// ------------------------------------------------------------------ paint --
function paintHear(item) {
  const c = cards.get(item.id);
  if (!c) return;
  const has = item._ok === true;
  c.hear.hidden = !has;
  // with no clip the tile does nothing — say so properly rather than leaving a
  // focusable button that lies about what it does
  c.obj.disabled = !has;
  c.obj.style.cursor = has ? 'pointer' : 'default';
  if (!has) c.obj.removeAttribute('aria-label');
  el('soundBtn').hidden = !(window.ITEMS || []).some(i => i._ok === true);
  sizeWave(c);
}

function paintAll() {
  cards.forEach(c => {
    const on = A.curId === c.item.id;
    c.root.classList.toggle('is-playing', on);
    const l = $('.hl', c.root);
    if (l) l.textContent = on ? 'playing' : 'hear it';
  });
  const b = el('soundBtn');
  b.setAttribute('aria-pressed', A.curId ? 'true' : 'false');
  $('.sb-label', b).textContent = A.curId ? 'sound on' : 'sound off';
}

function sizeWave(c) {
  const w = c.wave.clientWidth, h = c.wave.clientHeight;
  if (!w || !h) return;
  c.wave.width = Math.round(w * DPR);
  c.wave.height = Math.round(h * DPR);
  drawWave(c.item.id);
}

function drawWave(id) {
  const c = cards.get(id);
  if (!c || !c.wave.width) return;
  const x = c.wave.getContext('2d');
  const w = c.wave.width, h = c.wave.height, mid = h / 2;
  x.clearRect(0, 0, w, h);

  x.strokeStyle = 'rgba(43,35,51,.16)';
  x.lineWidth = Math.max(1, DPR);
  x.beginPath(); x.moveTo(0, mid); x.lineTo(w, mid); x.stroke();

  const env = A.envs.get(id);
  if (!env) return;

  const playing = A.curId === id;
  const p = playing ? pos() : -1;
  const inkX = p >= 0 ? p * w : 0;
  const amp = h * 0.40 * (playing ? (0.82 + 0.30 * A.level) : 0.66);
  const bar = w / env.length;
  for (let i = 0; i < env.length; i++) {
    const bx = i * bar, a = env[i] * amp;
    x.fillStyle = bx < inkX ? 'rgba(204,95,151,.92)' : 'rgba(43,35,51,.20)';
    x.fillRect(bx, mid - a, Math.max(1, bar * 0.6), a * 2);
  }
}

// ----------------------------------------------------------------- height --
let lastH = 0;
function postHeight() {
  const h = Math.ceil(document.documentElement.getBoundingClientRect().height);
  if (!h || Math.abs(h - lastH) < 8) return;      // a real delta, or nothing
  lastH = h;
  try { parent.postMessage({ ckFree: 'height', h }, '*'); } catch (e) {}
}

// ------------------------------------------------------------------- wire --
function boot() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  build();
  paintAll();

  el('soundBtn').addEventListener('click', () => {
    if (A.curId) { stop(); return; }
    const first = (window.ITEMS || []).find(i => i._ok === true);
    if (first) play(first);
  });

  const relayout = () => {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    cards.forEach(sizeWave);
    postHeight();
  };

  if (window.ResizeObserver) {
    let t = 0;
    new ResizeObserver(() => { clearTimeout(t); t = setTimeout(relayout, 90); })
      .observe(document.documentElement);
  }
  window.addEventListener('resize', () => { clearTimeout(boot._t); boot._t = setTimeout(relayout, 120); });
  window.addEventListener('orientationchange', () => setTimeout(relayout, 240));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  window.addEventListener('load', relayout);
  window.addEventListener('pageshow', relayout);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });

  relayout();
  setTimeout(postHeight, 400);
  setTimeout(postHeight, 1400);
}

window.__free = { A, cards, play, stop, postHeight, drawWave, get height(){ return lastH; } };

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
