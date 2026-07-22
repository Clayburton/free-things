/* ==========================================================================
   FREE THINGS — the table
   Builds the page from items.js, streams each thing's demo when you click its
   picture, and tells the host iframe how tall it is.

   Nothing audio ships with this page. The demos stream straight from
   clayandkelsy.com on click (preload="none", so the page costs nothing until
   someone wants to hear something), and the shape drawn under each name comes
   from waveforms.js — about 200 bytes per song.

   Debug: window.__free
   ========================================================================== */
(() => {
'use strict';

const $  = (s, r) => (r || document).querySelector(s);
const el = id => document.getElementById(id);

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// tie the last word on so a wrap can't strand it — keeps "Kontakt 6+" together
const bindLast = s => s.replace(/ ([^ ]+)$/, '&nbsp;$1');

// ------------------------------------------------------------------ audio --
// One <audio> element, re-pointed. No AudioContext, no decodeAudioData: a
// 1 MB file decoded up front is a wait, streamed it starts almost at once.
const A = { el: null, curId: null, level: 0, raf: 0, loading: false };

function player() {
  if (A.el) return A.el;
  const a = new Audio();
  a.preload = 'none';
  a.addEventListener('playing', () => { A.loading = false; paintAll(); });
  a.addEventListener('ended',   () => stop());
  a.addEventListener('error',   () => {
    // a demo that won't load shouldn't leave a button that lies
    const c = cards.get(A.curId);
    if (c) { c.item._bad = true; paintOne(c); }
    stop();
  });
  A.el = a;
  return a;
}

function play(item) {
  if (A.curId === item.id) { stop(); return; }
  stop();
  const a = player();
  A.curId = item.id;
  A.loading = true;
  A.level = 0;
  a.src = item.song;
  const p = a.play();
  if (p && p.catch) p.catch(() => { A.curId = null; A.loading = false; paintAll(); });
  paintAll();
  if (!A.raf) tick();
}

function stop() {
  const was = A.curId;
  if (A.el) { try { A.el.pause(); } catch (e) {} }
  A.curId = null; A.loading = false; A.level = 0;
  if (A.raf) { cancelAnimationFrame(A.raf); A.raf = 0; }
  if (was) { paintAll(); drawWave(was); }
}

const progress = () => {
  const a = A.el;
  return (a && a.duration) ? Math.min(1, a.currentTime / a.duration) : 0;
};

function tick() {
  A.raf = requestAnimationFrame(tick);
  if (!A.curId) { cancelAnimationFrame(A.raf); A.raf = 0; return; }
  // the bead breathes with the song's own shape at the playhead — no analyser
  // needed, and it works identically however the audio is served
  const env = envOf(A.curId);
  let v = 0;
  if (env) v = env[Math.min(env.length - 1, Math.floor(progress() * env.length))] || 0;
  A.level += (v - A.level) * 0.14;
  drawWave(A.curId);
}

// ---------------------------------------------------------------- shapes --
const ENV = new Map();
function envOf(id) {
  if (ENV.has(id)) return ENV.get(id);
  const b64 = (window.WAVES || {})[id];
  if (!b64) { ENV.set(id, null); return null; }
  let out = null;
  try {
    const bin = atob(b64);
    out = new Float32Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) / 255;
  } catch (e) { out = null; }
  ENV.set(id, out);
  return out;
}

// ------------------------------------------------------------------ build --
const cards = new Map();
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

  let n = 0;
  items.forEach(it => {
    if (it.divider) {
      if (it.end) { sec.appendChild(soonCard(it)); return; }
      newSection(it.divider);
      return;
    }
    sec.appendChild(thingCard(it, n++));
  });

  table.appendChild(frag);
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

  // This page is the main page for the instruments, so the picture only leads
  // away when the item actually has somewhere to go (DEM-Osc's free checkout).
  // Otherwise the picture IS the play control — a big, obvious target.
  // Either way the chip rides on top as a sibling; a button inside an anchor
  // would be invalid HTML.
  const objTag = it.page
    ? `<a class="obj" href="${esc(it.page)}" target="_top" aria-label="${esc(it.title)} — read more">`
    : it.song
      ? `<button class="obj" type="button" aria-label="Hear ${esc(it.title)}">`
      : `<div class="obj">`;
  const objEnd = it.page ? '</a>' : it.song ? '</button>' : '</div>';

  // the first row is what people see first — everything below can wait
  const eager = i < 3;

  a.innerHTML = `
    <div class="objwrap">
      ${objTag}<img alt="" decoding="async"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}>${objEnd}
      ${it.song ? `<button class="hear" type="button" aria-label="Hear ${esc(it.title)}">
        <svg viewBox="0 0 16 18" aria-hidden="true"><path d="M1.2 1.1 15 9 1.2 16.9Z"/></svg>
        <span class="hl">hear it</span>
      </button>` : ''}
    </div>
    <div class="meta">
      <h2 class="name">${esc(it.title)}</h2>
      ${it.song ? '<canvas class="wave" aria-hidden="true"></canvas>' : ''}
      <p class="story">${esc(it.story)}</p>
      <p class="specs">${(it.specs || []).map(s =>
        `<span${s.length < 20 ? ' class="nb"' : ''}>${bindLast(esc(s))}</span>`).join('<i>·</i>')}</p>
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

  if (it.song) {
    const toggle = e => { e.preventDefault(); e.stopPropagation(); if (!it._bad) play(it); };
    hear.addEventListener('click', toggle);
    obj.addEventListener('click', toggle);
  }

  cards.set(it.id, { item: it, root: a, wave: $('.wave', a), hear, obj });
  return a;
}

// ------------------------------------------------------------------ paint --
function paintOne(c) {
  const on   = A.curId === c.item.id;
  const busy = on && A.loading;
  c.root.classList.toggle('is-playing', on);
  if (c.hear) {
    c.hear.hidden = !!c.item._bad;
    const l = $('.hl', c.hear);
    if (l) l.textContent = busy ? 'loading' : on ? 'playing' : 'hear it';
  }
  if (c.obj && c.obj.tagName === 'BUTTON') c.obj.disabled = !!c.item._bad;
}

function paintAll() {
  cards.forEach(paintOne);
  const b = el('soundBtn');
  b.hidden = !A.curId;                       // it's a stop button, so only while playing
  b.setAttribute('aria-pressed', A.curId ? 'true' : 'false');
}

function sizeWave(c) {
  if (!c.wave) return;
  const w = c.wave.clientWidth, h = c.wave.clientHeight;
  if (!w || !h) return;
  c.wave.width  = Math.round(w * DPR);
  c.wave.height = Math.round(h * DPR);
  drawWave(c.item.id);
}

function drawWave(id) {
  const c = cards.get(id);
  if (!c || !c.wave || !c.wave.width) return;
  const x = c.wave.getContext('2d');
  const w = c.wave.width, h = c.wave.height, mid = h / 2;
  x.clearRect(0, 0, w, h);

  x.strokeStyle = 'rgba(43,35,51,.16)';
  x.lineWidth = Math.max(1, DPR);
  x.beginPath(); x.moveTo(0, mid); x.lineTo(w, mid); x.stroke();

  const env = envOf(id);
  if (!env) return;

  const playing = A.curId === id;
  const inkX = playing ? progress() * w : 0;
  const amp = h * 0.40 * (playing ? (0.82 + 0.30 * A.level) : 0.66);
  const bar = w / env.length;
  for (let i = 0; i < env.length; i++) {
    const bx = i * bar, a = env[i] * amp;
    x.fillStyle = bx < inkX ? 'rgba(204,95,151,.92)' : 'rgba(43,35,51,.20)';
    x.fillRect(bx, mid - a, Math.max(1, bar * 0.6), a * 2);
  }
  if (playing && inkX > 0) {
    x.fillStyle = 'rgba(179,74,130,1)';
    const r = Math.max(1.6, DPR * 1.5) * (1 + A.level * 0.5);
    x.beginPath(); x.arc(inkX, mid, r, 0, 6.2832); x.fill();
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

  el('soundBtn').addEventListener('click', stop);

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

window.__free = {
  A, cards, play, stop, postHeight, drawWave, envOf,
  get height() { return lastH; }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();

})();
