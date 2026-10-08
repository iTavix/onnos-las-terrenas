(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Il sito parte sempre dall'intro: niente ripristino della posizione o ancore residue al ricaricamento.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  scrollTo(0, 0);
  const toTop = () => { scrollTo(0, 0); if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true }); };
  addEventListener('load', toTop);
  addEventListener('pageshow', toTop);

  /* ---------------- gallery data ---------------- */
  const cats = { beach: [11, 12, 13, 19, 20], food: [14, 15, 16, 17, 18, 21, 22, 23, 24, 25], drinks: [26, 27, 28, 29], nights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30] };
  const order = [19, 7, 22, 27, 12, 3, 17, 26, 1, 16, 13, 9, 23, 29, 5, 11, 15, 2, 24, 28, 8, 20, 18, 6, 21, 4, 25, 10, 14, 30];
  const catOf = n => Object.keys(cats).find(k => cats[k].includes(n));
  const pad = n => String(n).padStart(2, '0');
  const masonry = $('#masonry');
  order.forEach(n => {
    const f = document.createElement('figure');
    f.className = 'tile';
    f.dataset.cat = catOf(n);
    f.dataset.n = n;
    f.innerHTML = `<img src="thumb/${pad(n)}.jpg" alt="Onno's Las Terrenas — ${catOf(n)}" loading="lazy">`;
    masonry.appendChild(f);
  });

  /* ---------------- i18n ---------------- */
  const es = {
    'nav.story': 'Historia', 'nav.kitchen': 'Cocina', 'nav.bar': 'Bar', 'nav.nights': 'Noches', 'nav.gallery': 'Galería', 'nav.visit': 'Visítanos',
    'cta.reserve': 'Reservar', 'cta.menu': 'Ver el menú', 'cta.reserveWa': 'Reservar por WhatsApp',
    'hero.eyebrow': 'Beach club · Restaurante · Vida nocturna',
    'hero.meta': 'En plena playa, en el corazón de Las Terrenas, Samaná.<br>Abierto todos los días, 10am – 2am.',
    'hero.scroll': 'Desliza',
    'story.eyebrow': '01 — El lugar',
    'story.title': 'El nuevo <em>hotspot</em> frente al mar de República Dominicana.',
    'story.p1': 'En plena playa, en el corazón del pueblo, Onno\'s Las Terrenas es EL lugar para relajarse, comer, beber y bailar. Tapas, Tex-Mex y fusión asiática con cócteles de autor — con los pies en la arena.',
    'stats.hours': 'horas abiertos, todos los días', 'stats.locations': 'Onno\'s en la isla', 'stats.sunsets': 'atardeceres en la arena',
    'day.eyebrow': '02 — Un día en Onno\'s', 'day.title': 'Del café de la mañana <em>a la última ronda.</em>',
    'day.c1t': 'Café de la mañana', 'day.c1': 'El bar abre sobre la arena, el mar aún en calma.',
    'day.c2t': 'Días de playa', 'day.c2': 'Puffs, agua turquesa y algo bien frío.',
    'day.c3t': 'Sunset Sessions', 'day.c3': 'DJs internacionales mientras el cielo se vuelve rosa.',
    'day.c4t': 'Cena', 'day.c4': 'Tapas, sushi y tacos bajo las lámparas.',
    'day.c5t': 'De madrugada', 'day.c5': 'La playa se convierte en pista de baile. Hasta las 2am.',
    'kitchen.eyebrow': '03 — La cocina', 'kitchen.title': 'Tapas, Tex-Mex <em>y fusión asiática.</em>',
    'kitchen.p': 'Platos para compartir, desde nigiri fresco hasta sartenes chisporroteantes. Para comer sin prisa, con el mar a pocos pasos.',
    'tue.eyebrow': 'Todos los martes', 'tue.margs': 'Margaritas a',
    'bar.eyebrow': '04 — El bar', 'bar.title': 'Cócteles de autor, <em>pies en la arena.</em>',
    'bar.p': 'Menta fresca, ron local, tequila y un bartender que recuerda tu nombre. Mojitos al mediodía, spritz al atardecer, shots después de medianoche.',
    'nights.eyebrow': '05 — Las noches', 'nights.title': 'Cuando la playa se vuelve <em>pista de baile.</em>',
    'nights.p': 'Sunset Sessions con DJs internacionales, luego la cena, luego la fiesta. Bolas de discoteca, láseres y el sonido de las olas detrás del bajo.',
    'gal.eyebrow': '06 — Galería', 'gal.title': 'Momentos <em>en Onno\'s.</em>',
    'gal.all': 'Todo', 'gal.beach': 'Playa', 'gal.food': 'Comida', 'gal.drinks': 'Bebidas', 'gal.nights': 'Noches',
    'visit.eyebrow': '07 — Visítanos', 'visit.title': 'Nos vemos <em>en la arena.</em>',
    'visit.where': 'Dónde', 'visit.hours': 'Horario', 'visit.hoursv': 'Todos los días<br>10am – 2am', 'visit.call': 'Llama', 'visit.follow': 'Síguenos',
    'foot.other': 'Otras ubicaciones', 'foot.more': 'Más', 'foot.feedback': 'Comentarios', 'foot.team': 'Trabaja con nosotros'
  };
  const en = {};
  $$('[data-i18n]').forEach(el => en[el.dataset.i18n] = el.innerHTML);
  $$('[data-i18n-html]').forEach(el => en[el.dataset.i18nHtml] = el.innerHTML);
  const setLang = lang => {
    const d = lang === 'es' ? es : en;
    $$('[data-i18n]').forEach(el => { const v = d[el.dataset.i18n]; if (v) el.innerHTML = v; });
    $$('[data-i18n-html]').forEach(el => { const v = d[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
    document.documentElement.lang = lang;
    $$('.lang button').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
    try { localStorage.setItem('onnos-lang', lang); } catch (e) {}
  };
  $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  try { const saved = localStorage.getItem('onnos-lang'); if (saved === 'es') setLang('es'); } catch (e) {}

  /* ---------------- loader ---------------- */
  document.body.classList.add('is-loading');
  const loader = $('#loader'), countEl = $('#loaderCount');
  const t0 = performance.now(), dur = reduce ? 200 : 1600;
  const tick = now => {
    const p = Math.min(1, (now - t0) / dur);
    countEl.textContent = Math.round(p * 100);
    if (p < 1) return requestAnimationFrame(tick);
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    toTop();
    if (window.__lenis) window.__lenis.start();
    setTimeout(() => document.body.classList.add('is-ready'), reduce ? 0 : 1000);
  };
  requestAnimationFrame(tick);

  /* ---------------- hero slideshow ---------------- */
  const slides = $$('.hero__media img'), dots = $('#heroDots');
  let cur = 0, timer;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Slide ${i + 1}`);
    b.addEventListener('click', () => { go(i); restart(); });
    dots.appendChild(b);
  });
  const go = i => {
    slides[cur].classList.remove('is-active'); dots.children[cur].classList.remove('is-active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('is-active'); dots.children[cur].classList.add('is-active');
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5500); };
  dots.children[0].classList.add('is-active');
  if (!reduce) restart();

  /* ---------------- reveals ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  $$('.reveal, .img-reveal').forEach(el => io.observe(el));

  const tileIO = new IntersectionObserver(es => es.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('is-in'), i * 70); tileIO.unobserve(e.target); }
  }), { threshold: .05 });
  $$('.tile').forEach(t => tileIO.observe(t));

  /* ---------------- counters ---------------- */
  const cIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, s = performance.now();
    const step = now => { const p = Math.min(1, (now - s) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); cIO.unobserve(el);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cIO.observe(el));

  /* ---------------- theme by section ---------------- */
  const darkSections = $$('main [data-theme="dark"]:not(.hero), .footer');
  const themeIO = new IntersectionObserver(() => {
    const mid = innerHeight * .5;
    const dark = darkSections.some(s => { const r = s.getBoundingClientRect(); return r.top < mid && r.bottom > mid; });
    document.body.classList.toggle('is-dark', dark);
  }, { threshold: [0, .25, .5, .75, 1], rootMargin: '-45% 0px -45% 0px' });
  darkSections.forEach(s => themeIO.observe(s));

  /* ---------------- scroll loop ---------------- */
  // Le misure di layout si leggono solo al resize: nel ciclo per-frame si scrive e basta,
  // cosi' niente layout forzati e niente sfasamento tra scroll e trasformazioni.
  const nav = $('#nav'), progress = $('#progress'), hero = $('.hero'), heroContent = $('.hero__content');
  const marquee = $('#marquee'), dn = $('#daynight'), dnTrack = $('#dnTrack'), dnBar = $('#dnBar');
  const parallax = fine ? $$('[data-speed]') : [];
  const navLinks = $$('.nav__links a');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  let M = {};
  const docTop = el => el.getBoundingClientRect().top + scrollY;
  const measure = () => {
    parallax.forEach(el => el.style.translate = '');
    dnTrack.style.transform = '';
    M = {
      vh: innerHeight,
      max: document.documentElement.scrollHeight - innerHeight,
      hero: hero.offsetHeight,
      half: marquee.scrollWidth / 2,
      dnTop: docTop(dn), dnLen: dn.offsetHeight - innerHeight,
      dnMax: Math.max(0, dnTrack.scrollWidth - innerWidth),
      secs: sections.map(s => s ? docTop(s) : Infinity),
      par: parallax.map(el => { const p = el.parentElement; return { el, c: docTop(p) + p.offsetHeight / 2, h: p.offsetHeight, s: +el.dataset.speed }; })
    };
  };
  measure();
  addEventListener('resize', measure);
  addEventListener('load', measure);
  if (document.fonts) document.fonts.ready.then(measure);
  new ResizeObserver(measure).observe(document.body);

  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.stop();
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = $(a.getAttribute('href')); if (!t) return;
      e.preventDefault(); document.body.classList.remove('menu-open'); lenis.scrollTo(t, { offset: 0 });
    }));
  }

  let lastY = -1, mx = 0, vel = 0, navHidden = false, solid = null, curSec = -2;
  const setNavHidden = v => { if (v !== navHidden) { navHidden = v; nav.classList.toggle('is-hidden', v); } };
  const r2 = n => Math.round(n * 100) / 100;

  const frame = time => {
    if (lenis) lenis.raf(time);
    const y = lenis ? lenis.scroll : scrollY;
    const dy = lastY < 0 ? 0 : y - lastY;
    vel += (dy - vel) * .12;

    if (dy !== 0 || lastY < 0) {
      progress.style.transform = `scaleX(${M.max > 0 ? r2(y / M.max) : 0})`;

      const s = y > M.hero - 80;
      if (s !== solid) { solid = s; nav.classList.toggle('is-solid', s); }
      if (!document.body.classList.contains('menu-open')) {
        if (dy > 4 && y > 300) setNavHidden(true);
        else if (dy < -4) setNavHidden(false);
      }

      let idx = -1;
      M.secs.forEach((t, i) => { if (t - y < M.vh * .4) idx = i; });
      if (idx !== curSec) { curSec = idx; navLinks.forEach((a, i) => a.classList.toggle('is-current', i === idx)); }

      if (!reduce) {
        M.par.forEach(p => {
          const c = p.c - y - M.vh / 2;
          if (Math.abs(c) > M.vh + p.h) return;
          p.el.style.translate = `0 ${r2(c * p.s)}px`;
        });
        if (y < M.vh * 1.2) {
          const hp = Math.min(1, y / M.vh);
          heroContent.style.transform = `translate3d(0,${r2(hp * 120)}px,0)`;
          heroContent.style.opacity = r2(Math.max(0, 1 - hp * 1.2));
        }
      }

      const p = Math.max(0, Math.min(1, (y - M.dnTop) / M.dnLen));
      dnTrack.style.transform = `translate3d(${r2(-p * M.dnMax)}px,0,0)`;
      dnBar.style.transform = `scaleX(${r2(p)})`;
    }

    if (!reduce) {
      mx -= 0.6 + Math.min(14, Math.abs(vel) * .3);
      if (-mx > M.half) mx += M.half;
      marquee.style.transform = `translate3d(${r2(mx)}px,0,0) skewX(${r2(Math.max(-8, Math.min(8, -vel * .25)))}deg)`;
    }

    lastY = y;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ---------------- mobile menu ---------------- */
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  navLinks.forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* ---------------- gallery filters ---------------- */
  $$('#filters button').forEach(b => b.addEventListener('click', () => {
    $$('#filters button').forEach(x => x.classList.toggle('is-active', x === b));
    const f = b.dataset.filter;
    const tiles = $$('.tile');
    tiles.forEach(t => t.classList.remove('is-in'));
    setTimeout(() => {
      tiles.forEach(t => t.classList.toggle('is-out', f !== 'all' && t.dataset.cat !== f));
      tiles.filter(t => !t.classList.contains('is-out')).forEach((t, i) => setTimeout(() => t.classList.add('is-in'), 40 + i * 45));
    }, 350);
  }));

  /* ---------------- lightbox ---------------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCount = $('#lbCount');
  let list = [], li = 0;
  const show = i => {
    li = (i + list.length) % list.length;
    lbImg.classList.remove('is-in');
    const n = list[li];
    const img = new Image();
    img.onload = () => { lbImg.src = img.src; lbImg.alt = `Onno's Las Terrenas photo ${n}`; requestAnimationFrame(() => lbImg.classList.add('is-in')); };
    img.src = `img/${pad(n)}.jpg`;
    lbCount.textContent = `${pad(li + 1)} / ${pad(list.length)}`;
  };
  const open = n => {
    list = $$('.tile:not(.is-out)').map(t => +t.dataset.n);
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; if (window.__lenis) window.__lenis.stop();
    show(list.indexOf(n));
  };
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (window.__lenis) window.__lenis.start(); };
  masonry.addEventListener('click', e => { const t = e.target.closest('.tile'); if (t) open(+t.dataset.n); });
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => show(li - 1));
  $('#lbNext').addEventListener('click', () => show(li + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(li - 1);
    if (e.key === 'ArrowRight') show(li + 1);
  });
  let sx = null;
  lb.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener('touchend', e => {
    if (sx === null) return;
    const d = e.changedTouches[0].clientX - sx;
    if (Math.abs(d) > 50) show(li + (d < 0 ? 1 : -1));
    sx = null;
  });

  /* ---------------- cursor + magnetic ---------------- */
  if (fine && !reduce) {
    const cur = $('#cursor'), label = $('#cursorLabel');
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    const follow = () => { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(follow); };
    follow();
    document.addEventListener('mouseover', e => {
      const tile = e.target.closest('.tile, .dish, .dn-card');
      const link = e.target.closest('a, button');
      cur.classList.toggle('is-view', !!tile);
      label.textContent = tile ? (tile.classList.contains('tile') ? 'View' : '') : '';
      if (tile && !tile.classList.contains('tile')) cur.classList.remove('is-view');
      cur.classList.toggle('is-hover', !tile && !!link || (!!tile && !tile.classList.contains('tile')));
    });
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }
})();
