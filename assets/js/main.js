// Fundación Edúcate y Crece — funciones compartidas
const WA = '59174002513';

// Menú en celular
const menu = document.getElementById('menu'), burger = document.getElementById('burger');
if (burger) {
  const setOpen = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; };
  burger.onclick = () => setOpen(!menu.classList.contains('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
}

// Aparición suave + contadores
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-n]').forEach(el => {
    const n = +el.dataset.n, t0 = performance.now(), dur = 1200;
    const tick = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Visor de fotos
const lb = document.getElementById('lb');
if (lb) {
  const sel = '.gallery img, .entry-img';
  const img = lb.querySelector('img'), cap = lb.querySelector('p'); let list = [], i = 0;
  const show = n => { i = (n + list.length) % list.length; img.src = list[i].src; img.alt = list[i].alt; cap.textContent = list[i].alt; };
  document.querySelectorAll(sel).forEach(f => f.addEventListener('click', () => { list = [...document.querySelectorAll(sel)]; show(list.indexOf(f)); lb.classList.add('open'); }));
  const close = () => lb.classList.remove('open');
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.prev').onclick = e => { e.stopPropagation(); show(i - 1); };
  lb.querySelector('.next').onclick = e => { e.stopPropagation(); show(i + 1); };
  lb.onclick = e => { if (e.target === lb) close(); };
  addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
}

// Solo un video a la vez
document.querySelectorAll('video').forEach(v => v.addEventListener('play', () => document.querySelectorAll('video').forEach(o => o !== v && o.pause())));

// Formulario → WhatsApp
const form = document.getElementById('form');
if (form) {
  const motivo = new URLSearchParams(location.search).get('motivo');
  if (motivo) [...form.t.options].forEach(o => { if (o.value === motivo) form.t.value = motivo; });
  form.onsubmit = e => {
    e.preventDefault();
    const txt = `Hola, soy ${form.n.value}${form.c.value ? ' (' + form.c.value + ')' : ''}. Motivo: ${form.t.value}.\n${form.msg.value}`;
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(txt), '_blank', 'noopener');
  };
}

document.querySelectorAll('.anio-actual').forEach(el => el.textContent = new Date().getFullYear());
