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
    'nav.story': 'Historia', 'nav.kitchen': 'Cocina', 'nav.bar': 'Bar', 'nav.nights': 'Noches', 'nav.gallery': 'Galería', 'nav.visit': 'Visítanos', 'nav.events': 'Agenda',
    'ev.eyebrow': '06 — Agenda', 'ev.title': 'Cada día, <em>una excusa.</em>', 'ev.sunsetHour': 'Todos los días — precios especiales en bebidas seleccionadas',
    'cta.reserve': 'Reservar', 'cta.menu': 'Ver el menú', 'cta.reserveWa': 'Reservar por WhatsApp',
    'hero.eyebrow': 'Beach club · Restaurante · Vida nocturna',
    'hero.meta': 'En plena playa, en el corazón de Las Terrenas, Samaná.<br>Abierto todos los días, del café a la última ronda.',
    'hero.scroll': 'Desliza',
    'story.eyebrow': '01 — El lugar',
    'story.title': 'El nuevo <em>hotspot</em> frente al mar de República Dominicana.',
    'story.p1': 'En plena playa, en el corazón del pueblo, Onno\'s Las Terrenas es EL lugar para relajarse, comer, beber y bailar. Tapas, Tex-Mex y fusión asiática con cócteles de autor — con los pies en la arena.',
    'stats.hours': 'días a la semana, del sol a las estrellas', 'stats.locations': 'Onno\'s en la isla', 'stats.sunsets': 'atardeceres en la arena',
    'day.eyebrow': '02 — Un día en Onno\'s', 'day.title': 'Del café de la mañana <em>a la última ronda.</em>',
    'day.c1t': 'Café de la mañana', 'day.c1': 'El bar abre sobre la arena, el mar aún en calma.',
    'day.c2t': 'Días de playa', 'day.c2': 'Puffs, agua turquesa y algo bien frío.',
    'day.c3t': 'Sunset Sessions', 'day.c3': 'DJs internacionales mientras el cielo se vuelve rosa.',
    'day.c4t': 'Cena', 'day.c4': 'Tapas, sushi y tacos bajo las lámparas.',
    'day.c5t': 'De madrugada', 'day.c5': 'La playa se convierte en pista de baile. Hasta las 2am, las 3am los fines de semana.',
    'kitchen.eyebrow': '03 — La cocina', 'kitchen.title': 'Tapas, Tex-Mex <em>y fusión asiática.</em>',
    'kitchen.p': 'Platos para compartir, desde nigiri fresco hasta sartenes chisporroteantes. Para comer sin prisa, con el mar a pocos pasos.',
    'tue.eyebrow': 'Todos los martes', 'tue.margs': 'Margaritas a', 'tue.when': '5 – 11pm · Tacos desde RD$119', 'kitchen.hint': 'Toca un plato para ver ingredientes y precio.',
    'bar.eyebrow': '04 — El bar', 'bar.title': 'Cócteles de autor, <em>pies en la arena.</em>',
    'bar.p': 'Menta fresca, ron local, tequila y un bartender que recuerda tu nombre. Mojitos al mediodía, spritz al atardecer, shots después de medianoche.',
    'nights.eyebrow': '05 — Las noches', 'nights.title': 'Cuando la playa se vuelve <em>pista de baile.</em>',
    'nights.p': 'Sunset Sessions con DJs internacionales, luego la cena, luego la fiesta. Bolas de discoteca, láseres y el sonido de las olas detrás del bajo.',
    'gal.eyebrow': '07 — Galería', 'gal.title': 'Momentos <em>en Onno\'s.</em>',
    'gal.all': 'Todo', 'gal.beach': 'Playa', 'gal.food': 'Comida', 'gal.drinks': 'Bebidas', 'gal.nights': 'Noches',
    'visit.eyebrow': '08 — Visítanos', 'visit.title': 'Nos vemos <em>en la arena.</em>',
    'visit.where': 'Dónde', 'visit.hours': 'Horario', 'visit.hoursv': 'Dom – Jue 10am – 2am<br>Vie – Sáb 10am – 3am<br><small>Lunes desde las 4pm</small>', 'visit.call': 'Llama', 'visit.follow': 'Síguenos',
    'foot.other': 'Otras ubicaciones', 'foot.more': 'Más', 'foot.feedback': 'Comentarios', 'foot.team': 'Trabaja con nosotros'
  };
  const en = {};
  $$('[data-i18n]').forEach(el => en[el.dataset.i18n] = el.innerHTML);
  $$('[data-i18n-html]').forEach(el => en[el.dataset.i18nHtml] = el.innerHTML);
  let curLang = 'en';
  const onLang = [];
  const setLang = lang => {
    curLang = lang;
    const d = lang === 'es' ? es : en;
    $$('[data-i18n]').forEach(el => { const v = d[el.dataset.i18n]; if (v) el.innerHTML = v; });
    $$('[data-i18n-html]').forEach(el => { const v = d[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
    document.documentElement.lang = lang;
    onLang.forEach(fn => fn(lang));
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
  const dnCount = $('#dnCount'), dnHint = $('#dnHint'), dnN = $$('.dn-card').length;
  // Su touch/schermi stretti la sezione e' un carosello nativo (swipe), su desktop resta "pinned".
  const carouselMQ = matchMedia('(hover: none), (pointer: coarse), (max-width: 960px)');
  let carousel = carouselMQ.matches, dnMoved = false, dnIdx = -1;
  const setCarouselClass = () => {
    document.documentElement.classList.toggle('dn-carousel', carousel);
    if (carousel) dnTrack.setAttribute('data-lenis-prevent-wheel', ''); else dnTrack.removeAttribute('data-lenis-prevent-wheel');
  };
  setCarouselClass();
  const setHint = () => {
    const es = curLang === 'es';
    dnHint.textContent = carousel ? (es ? 'Desliza →' : 'Swipe →') : (es ? 'Desliza ↓' : 'Scroll ↓');
    dnHint.classList.toggle('is-gone', dnMoved);
  };
  const updateDn = p => {
    dnBar.style.transform = `scaleX(${Math.round(p * 1000) / 1000})`;
    const idx = Math.round(p * (dnN - 1)) + 1;
    if (idx !== dnIdx) { dnIdx = idx; dnCount.textContent = `${pad(idx)} / ${pad(dnN)}`; }
    if (!dnMoved && p > .02) { dnMoved = true; dnHint.classList.add('is-gone'); }
  };
  setHint();
  onLang.push(setHint);
  const parallax = fine ? $$('[data-speed]') : [];
  const navLinks = $$('.nav__links > a');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  let M = {};
  const docTop = el => el.getBoundingClientRect().top + scrollY;
  const measure = () => {
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
  let measureQueued = false;
  const queueMeasure = () => {
    if (measureQueued) return; measureQueued = true;
    requestAnimationFrame(() => { measureQueued = false; measure(); lastY = -1; });
  };
  addEventListener('resize', queueMeasure);
  addEventListener('load', queueMeasure);
  if (document.fonts) document.fonts.ready.then(queueMeasure);
  new ResizeObserver(queueMeasure).observe(document.body);

  carouselMQ.addEventListener('change', () => {
    carousel = carouselMQ.matches; setCarouselClass();
    dnTrack.scrollLeft = 0; dnTrack.style.transform = ''; dnMoved = false; dnIdx = -1;
    measure(); setHint(); updateDn(0); lastY = -1;
  });
  // carosello: avanzamento e contatore dallo scroll orizzontale nativo
  dnTrack.addEventListener('scroll', () => {
    if (!carousel) return;
    const max = dnTrack.scrollWidth - dnTrack.clientWidth;
    updateDn(max > 0 ? Math.min(1, dnTrack.scrollLeft / max) : 0);
  }, { passive: true });

  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.stop();
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = $(a.getAttribute('href')); if (!t) return;
      e.preventDefault();
      if (document.body.classList.contains('menu-open')) { document.body.classList.remove('menu-open'); document.documentElement.style.overflow = ''; lenis.start(); }
      lenis.scrollTo(t, { offset: 0 });
    }));
  }

  // in ascolto sulla finestra: ai bordi della sezione il puntatore puo' essere gia' sopra la sezione vicina
  addEventListener('wheel', e => {
    if (carousel || Math.abs(e.deltaX) < 3 || Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 2) return;
    if (lenis && Math.abs(lenis.velocity) > 6) return;
    const y = lenis ? lenis.scroll : scrollY;
    const start = M.dnTop, end = M.dnTop + M.dnLen, edge = M.vh * .6;
    if (y < start - edge - 4 || y > end + edge + 4) return;
    e.preventDefault();
    const ratio = M.dnMax > 0 ? M.dnLen / M.dnMax : 1;
    const from = lenis ? (lenis.targetScroll ?? lenis.scroll) : y;
    // oltre la prima/ultima card il gesto laterale accompagna la pagina fuori dalla sezione (max ~mezza schermata)
    const target = Math.max(start - edge, Math.min(end + edge, from + e.deltaX * ratio));
    if (lenis) lenis.scrollTo(target, { lerp: .12 }); else scrollTo(0, target);
  }, { passive: false });

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
        if (fine && y < M.vh * 1.2) {
          const hp = Math.min(1, y / M.vh);
          heroContent.style.transform = `translate3d(0,${r2(hp * 120)}px,0)`;
          heroContent.style.opacity = r2(Math.max(0, 1 - hp * 1.2));
        }
      }

      if (!carousel) {
        const p = Math.max(0, Math.min(1, (y - M.dnTop) / M.dnLen));
        dnTrack.style.transform = `translate3d(${r2(-p * M.dnMax)}px,0,0)`;
        updateDn(p);
      }
    }

    if (!reduce) {
      mx -= 0.6 + (fine ? Math.min(14, Math.abs(vel) * .3) : 0);
      if (-mx > M.half) mx += M.half;
      const skew = fine ? r2(Math.max(-8, Math.min(8, -vel * .25))) : 0;
      marquee.style.transform = `translate3d(${r2(mx)}px,0,0) skewX(${skew}deg)`;
    }

    lastY = y;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ---------------- mobile menu ---------------- */
  const setMenu = on => {
    document.body.classList.toggle('menu-open', on);
    document.documentElement.style.overflow = on ? 'hidden' : '';
    $('#burger').setAttribute('aria-expanded', on);
    if (window.__lenis) on ? window.__lenis.stop() : window.__lenis.start();
    if (on) setNavHidden(false);
  };
  $('#burger').addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  navLinks.forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });
  matchMedia('(min-width: 961px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

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
    const img = new Image();
    img.onload = () => { lbImg.src = img.src; lbImg.alt = `Onno's Las Terrenas — ${li + 1}`; requestAnimationFrame(() => lbImg.classList.add('is-in')); };
    img.src = list[li];
    lbCount.textContent = `${pad(li + 1)} / ${pad(list.length)}`;
  };
  const open = (srcs, start = 0) => {
    list = srcs;
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; if (window.__lenis) window.__lenis.stop();
    show(start);
  };
  const close = () => { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (window.__lenis) window.__lenis.start(); };
  masonry.addEventListener('click', e => { const t = e.target.closest('.tile'); if (!t) return;
    const tiles = $$('.tile:not(.is-out)');
    open(tiles.map(x => `img/${pad(+x.dataset.n)}.jpg`), tiles.indexOf(t));
  });
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

  /* ---------------- dish detail (dal menu PDF) ---------------- */
  const S = { en: 'Spicy', es: 'Picante' };
  const dishes = {
    sushi: { img: 'img/24.jpg', cat: { en: 'Sushi bar', es: 'Barra de sushi' }, name: 'Sushi & rolls',
      desc: { en: 'Rolls, nigiri and sashimi, prepared fresh to order.', es: 'Rolls, nigiri y sashimi, preparados al momento.' },
      ask: true },
    tacos: { img: 'img/17.jpg', cat: { en: 'Tacos · flour or corn tortillas', es: 'Tacos · tortillas de harina o maíz' }, name: 'Tacos',
      desc: { en: 'Pick your filling. Every taco is made to order.', es: 'Elige tu relleno. Cada taco se prepara al momento.' },
      variants: [
        ['Al Pastor', { en: 'Pineapple · Cabbage · Chicharrón', es: 'Piña · Repollo · Chicharrón' }, 399],
        ['Carne Asada', { en: 'Diablo sauce · Chimichurri · Guacamole', es: 'Salsa diablo · Chimichurri · Guacamole' }, 399],
        ['Chicken Tinga', { en: 'Cabbage · Guacamole · Cilantro cream', es: 'Repollo · Guacamole · Crema de cilantro' }, 399],
        ['Pork Belly', { en: 'Sriracha garlic · Cabbage · Cilantro', es: 'Ajo sriracha · Repollo · Cilantro' }, 399, true],
        ['Quesabirria', { en: 'Onion · Cilantro · 3 tacos · Corn tortillas', es: 'Cebolla · Cilantro · 3 tacos · Tortillas de maíz' }, 399],
        ['Chicken Teriyaki', { en: 'Cabbage · Teriyaki chicken', es: 'Repollo · Pollo teriyaki' }, 419],
        ['Diablo Shrimp', { en: 'Diablo sauce · Guacamole · Cabbage', es: 'Salsa diablo · Guacamole · Repollo' }, 449, true],
        ['Sweet Chili Shrimp', { en: 'Chili aioli · Cabbage · Cilantro', es: 'Chili aioli · Repollo · Cilantro' }, 449],
        ['Ahi Tuna', { en: '4 tacos · Fresh tuna · Avocado', es: '4 tacos · Atún fresco · Aguacate' }, 539, true]],
      note: { en: 'Tacos & Tequila Tuesday, 5 – 11pm: tacos from RD$119, margaritas RD$229, taco sampler RD$629.', es: 'Tacos & Tequila Tuesday, 5 – 11pm: tacos desde RD$119, margaritas a RD$229, taco sampler RD$629.' } },
    fajitas: { img: 'img/15.jpg', cat: { en: 'Mains', es: 'Platos fuertes' }, name: 'Fajitas',
      desc: { en: 'Served sizzling with guacamole, pico de gallo, sour cream, cheese and refried beans.', es: 'Guacamole · Pico de gallo · Crema agria · Queso · Habichuela refrita.' },
      variants: [['Chicken', { en: '', es: 'Pollo' }, 699], ['Steak', { en: '', es: 'Res' }, 789], ['Shrimp', { en: '', es: 'Camarones' }, 889]] },
    poke: { img: 'img/16.jpg', cat: { en: 'Mains', es: 'Platos fuertes' }, name: 'Poke Bowl',
      desc: { en: 'Rice, pineapple, seaweed, avocado and cucumber.', es: 'Arroz · Piña · Alga · Aguacate · Pepino.' },
      variants: [['Ahi Tuna', { en: '', es: 'Atún' }, 799], ['Diablo Shrimp', { en: '', es: 'Camarones diablo' }, 719, true], ['Chicken Teriyaki', { en: '', es: 'Pollo teriyaki' }, 699]] },
    potstickers: { img: 'img/18.jpg', cat: { en: 'Tapas · sharing', es: 'Tapas · para compartir' }, name: 'Pot Stickers',
      desc: { en: 'Pan-fried pork dumplings.', es: 'Dumplings de cerdo a la plancha.' },
      variants: [['Classic', { en: 'Sweet spicy soy', es: 'Soya dulce picante' }, 499], ['Red Curry', { en: 'Curry sauce', es: 'Curry' }, 519]] },
    crispytuna: { img: 'img/14.jpg', cat: { en: 'Tapas · sharing', es: 'Tapas · para compartir' }, name: 'Crispy Rice Tuna', spicy: true,
      desc: { en: 'Crispy rice bites topped with tuna, soy and aioli.', es: 'Arroz crujiente con atún, soya y aioli.' }, price: 699 }
  };
  const dishOrder = $$('.dish[data-dish]').map(d => d.dataset.dish);
  const fmt = n => 'RD$' + n.toLocaleString('en-US');
  const minPrice = d => d.price || (d.variants ? Math.min(...d.variants.map(v => v[2])) : null);
  const setDishPrices = () => $$('.dish[data-dish]').forEach(el => {
    const d = dishes[el.dataset.dish], i = $('i[data-price]', el); if (!i) return;
    const p = minPrice(d);
    i.textContent = d.variants && d.variants.length > 1 ? `${curLang === 'es' ? 'desde' : 'from'} ${fmt(p)}` : fmt(p);
  });
  setDishPrices(); onLang.push(setDishPrices);

  const dm = $('#dishModal'), dmImg = $('#dmImg'), dmContent = $('#dmContent'), dmCount = $('#dmCount');
  let dmKey = null;
  const dmHTML = key => {
    const d = dishes[key], L = curLang, es = L === 'es';
    const spicy = d.spicy ? `<span class="dm__spicy">${S[L]}</span>` : '';
    let price = '';
    if (d.price) price = `<p class="dm__price">${fmt(d.price)}${spicy}</p>`;
    else if (d.variants) price = `<p class="dm__price"><small>${es ? 'desde' : 'from'}</small>${fmt(minPrice(d))}</p>`;
    const variants = d.variants ? `<ul class="dm__variants">${d.variants.map(([n, sub, p, hot]) =>
      `<li><div><strong>${esc(n)}${hot ? ` <span class="dm__spicy">${S[L]}</span>` : ''}</strong>${sub[L] ? `<span>${esc(sub[L])}</span>` : ''}</div><b>${p.toLocaleString('en-US')}</b></li>`).join('')}</ul>` : '';
    const ask = d.ask ? `<p class="dm__note">${es ? 'Pregunta a tu mesero por la selección del día.' : 'Ask your server for today\'s selection.'}</p>` : '';
    const note = d.note ? `<p class="dm__note">${esc(d.note[L])}</p>` : '';
    const wa = `https://wa.me/18093306821?text=${encodeURIComponent(`Hi! I'd like to book a table at Onno's Las Terrenas (${d.name}).`)}`;
    return `<p class="dm__cat">${esc(d.cat[L])}</p>
      <h3 class="dm__name" id="dmName">${esc(d.name)}</h3>
      <p class="dm__desc">${esc(d.desc[L])}</p>
      ${price}${variants}${ask}${note}
      ${d.ask ? '' : `<p class="dm__tax">${es ? 'Precios en pesos dominicanos. 18% de impuestos y 10% de servicio no incluidos.' : 'Prices in Dominican pesos. 18% tax and 10% service charge not included.'}</p>`}
      <div class="dm__cta">
        <a class="btn" href="${wa}" target="_blank" rel="noopener">${es ? 'Reservar mesa' : 'Book a table'}</a>
        <a class="btn btn--ghost" href="https://onnosdr.com/las-terrenas/menu" target="_blank" rel="noopener">${es ? 'Menú completo' : 'Full menu'}</a>
      </div>`;
  };
  const dmFill = (key, animate) => {
    const apply = () => {
      dmKey = key;
      dmImg.src = dishes[key].img; dmImg.alt = dishes[key].name;
      dmContent.innerHTML = dmHTML(key); dmContent.scrollTop = 0;
      dmCount.textContent = `${pad(dishOrder.indexOf(key) + 1)} / ${pad(dishOrder.length)}`;
      requestAnimationFrame(() => { dmContent.classList.remove('is-swap'); dmImg.classList.remove('is-swap'); });
    };
    if (animate && !reduce) { dmContent.classList.add('is-swap'); dmImg.classList.add('is-swap'); setTimeout(apply, 260); } else apply();
  };
  let dmLastFocus = null;
  const dmOpen = key => {
    dmLastFocus = document.activeElement;
    dmFill(key, false);
    dm.classList.add('is-open'); dm.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    setTimeout(() => $('.dm__close', dm).focus({ preventScroll: true }), 50);
  };
  const dmClose = () => {
    if (!dm.classList.contains('is-open')) return;
    dm.classList.remove('is-open'); dm.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (window.__lenis) window.__lenis.start();
    if (dmLastFocus) dmLastFocus.focus({ preventScroll: true });
  };
  const dmStep = dir => dmFill(dishOrder[(dishOrder.indexOf(dmKey) + dir + dishOrder.length) % dishOrder.length], true);
  $$('.dish[data-dish]').forEach(el => {
    el.addEventListener('click', () => dmOpen(el.dataset.dish));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dmOpen(el.dataset.dish); } });
  });
  dm.addEventListener('click', e => { if (e.target.closest('[data-close]')) dmClose(); });
  $('#dmPrev').addEventListener('click', () => dmStep(-1));
  $('#dmNext').addEventListener('click', () => dmStep(1));
  addEventListener('keydown', e => {
    if (!dm.classList.contains('is-open')) return;
    if (e.key === 'Escape') dmClose();
    if (e.key === 'ArrowRight') dmStep(1);
    if (e.key === 'ArrowLeft') dmStep(-1);
  });
  // swipe orizzontale sulla foto per cambiare piatto (telefono)
  let dmSx = null;
  $('.dm__img', dm).addEventListener('touchstart', e => dmSx = e.touches[0].clientX, { passive: true });
  $('.dm__img', dm).addEventListener('touchend', e => {
    if (dmSx === null) return; const d = e.changedTouches[0].clientX - dmSx; dmSx = null;
    if (Math.abs(d) > 50) dmStep(d < 0 ? 1 : -1);
  });
  onLang.push(() => { if (dmKey && dm.classList.contains('is-open')) dmContent.innerHTML = dmHTML(dmKey); });

  /* ---------------- what's on ---------------- */
  // Programma settimanale ricavato dai volantini di Onno's Las Terrenas.
  const T = { sunset: { en: 'Sunset', es: 'Atardecer' }, night: { en: 'Night', es: 'Noche' }, day: { en: 'Daytime', es: 'De día' } };
  const week = [
    { k: 'sun', en: 'Sunday', es: 'Domingo', hours: '10am – 2am', posters: ['img/eventi/daytime-session.jpg'], events: [
      { name: 'Daytime Session', time: T.day, lineup: ["Francesca Faggella (Gloss 'n Glitter)"] },
      { name: 'Sunset', time: T.sunset, lineup: ['Yendruy Aquinx'] },
      { name: 'Sunday Vibes', time: T.night, lineup: ['XO Musik'] }] },
    { k: 'mon', en: 'Monday', es: 'Lunes', hours: '4pm – 2am', posters: ['thumb/19.jpg'], photo: true, events: [
      { name: 'Sunset Hour', time: { en: '5 – 6pm', es: '5 – 6pm' }, text: { en: 'Doors open at 4pm. Watch the sun go down with special prices on selected drinks.', es: 'Abrimos a las 4pm. Mira la puesta de sol con precios especiales en bebidas seleccionadas.' } }] },
    { k: 'tue', en: 'Tuesday', es: 'Martes', hours: '10am – 2am', posters: ['img/13.jpg'], photo: true, events: [
      { name: 'Tacos & Tequila Tuesday', time: { en: '5 – 11pm', es: '5 – 11pm' }, text: { en: 'Tacos from RD$119, margaritas RD$229 and pitchers RD$1,299. A legend at every Onno\'s.', es: 'Tacos desde RD$119, margaritas a RD$229 y jarras a RD$1,299. Una leyenda en cada Onno\'s.' } }] },
    { k: 'wed', en: 'Wednesday', es: 'Miércoles', hours: '10am – 2am', posters: ['img/eventi/lets-smash.jpg', 'img/eventi/midweek-rhythms.jpg'], events: [
      { name: "Let's Smash", time: { en: 'From 11am', es: 'Desde las 11am' }, text: { en: 'Smash burgers $499 with fries or fried yuca, 2×1 Corona Cero. Classic Oklahoma, Jalapeño, Caramelized Onion, Bacon Cheeseburger, Shroom.', es: 'Smash burgers a $499 con papas o yuca frita, 2×1 de Corona Cero. Classic Oklahoma, Jalapeño, Caramelized Onion, Bacon Cheeseburger, Shroom.' } },
      { name: 'Midweek Rhythms', time: T.sunset, lineup: ['Yendruy Aquinx', 'Chrisoprasa'] }] },
    { k: 'thu', en: 'Thursday', es: 'Jueves', hours: '10am – 2am', posters: ['img/eventi/sunset-session.jpg'], events: [
      { name: 'Sunset Session', time: T.sunset, lineup: ['Yendruy Aquinx'] },
      { name: 'Soulful Thursdays', time: T.night, lineup: ['XO Musik'] }] },
    { k: 'fri', en: 'Friday', es: 'Viernes', hours: '10am – 3am', posters: ['thumb/06.jpg'], photo: true, events: [
      { name: 'Sunset Hour', time: { en: '5 – 6pm', es: '5 – 6pm' }, text: { en: 'Special prices at sunset, then the party runs until 3am.', es: 'Precios especiales al atardecer, luego la fiesta sigue hasta las 3am.' } }] },
    { k: 'sat', en: 'Saturday', es: 'Sábado', hours: '10am – 3am', posters: ['img/eventi/saturday-sunset.jpg'], events: [
      { name: 'Saturday Sunset', time: T.sunset, lineup: ['Chrisoprasa'] },
      { name: "Onno's Boiler Room", time: T.night, lineup: ['XO Musik', 'Julio Rosario'] }] }
  ];
  const weekOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  let todayKey = 'sun';
  try { todayKey = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santo_Domingo', weekday: 'short' }).format(new Date()).slice(0, 3).toLowerCase(); } catch (e) {}
  const daysEl = $('#days'), postersEl = $('#evPosters'), infoEl = $('#evInfo');
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  let activeKey = todayKey;

  const renderDays = () => {
    daysEl.innerHTML = weekOrder.map(k => {
      const d = week.find(x => x.k === k);
      const label = d[curLang].slice(0, 3);
      return `<button role="tab" data-k="${k}" aria-selected="${k === activeKey}" class="${k === activeKey ? 'is-active' : ''}">
        <span>${label}</span>${k === todayKey ? `<i>${curLang === 'es' ? 'Hoy' : 'Today'}</i>` : ''}</button>`;
    }).join('');
  };

  const renderDay = (animate = true) => {
    const d = week.find(x => x.k === activeKey);
    const L = curLang;
    const posters = d.posters.map((src, i) => `<button class="poster${d.photo ? ' poster--photo' : ''}" data-i="${i}" style="--i:${i};--n:${d.posters.length}" aria-label="${L === 'es' ? 'Ver cartel' : 'View flyer'}"><img src="${src}" alt="${esc(d.events[i] ? d.events[i].name : d.events[0].name)} — Onno's Las Terrenas"></button>`).join('');
    const events = d.events.map(ev => `
      <li class="ev">
        <span class="ev__time">${esc(ev.time[L])}</span>
        <h4 class="ev__name">${esc(ev.name)}</h4>
        ${ev.lineup ? `<p class="ev__line"><small>DJ lineup</small>${ev.lineup.map(esc).join(' · ')}</p>` : ''}
        ${ev.text ? `<p class="ev__text">${esc(ev.text[L])}</p>` : ''}
      </li>`).join('');
    const wa = `https://wa.me/18093306821?text=${encodeURIComponent(`Hi! I'd like to book a table at Onno's Las Terrenas for ${d.en}.`)}`;
    const html = `
      <p class="event__day">${d[L]}${d.k === todayKey ? ` <em>— ${L === 'es' ? 'hoy' : 'tonight'}</em>` : ''}</p>
      <p class="event__hours">${L === 'es' ? 'Abierto' : 'Open'} ${d.hours}</p>
      <ul class="ev-list">${events}</ul>
      <a class="btn magnetic" href="${wa}" target="_blank" rel="noopener">${L === 'es' ? 'Reservar mesa' : 'Book a table'}</a>`;
    const swap = () => {
      postersEl.innerHTML = posters; infoEl.innerHTML = html;
      postersEl.dataset.n = d.posters.length;
      requestAnimationFrame(() => requestAnimationFrame(() => { postersEl.classList.remove('is-out'); infoEl.classList.remove('is-out'); }));
    };
    if (animate && !reduce) {
      postersEl.classList.add('is-out'); infoEl.classList.add('is-out');
      setTimeout(swap, 380);
    } else swap();
  };

  daysEl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.dataset.k === activeKey) return;
    activeKey = b.dataset.k; renderDays(); renderDay();
  });
  postersEl.addEventListener('click', e => {
    const b = e.target.closest('.poster'); if (!b) return;
    const d = week.find(x => x.k === activeKey);
    open(d.posters.map(p => p.replace(/^thumb\//, 'img/')), +b.dataset.i);
  });
  // tilt leggero del volantino seguendo il mouse
  if (fine && !reduce) {
    postersEl.addEventListener('mousemove', e => {
      const r = postersEl.getBoundingClientRect();
      postersEl.style.setProperty('--rx', ((e.clientY - r.top) / r.height - .5) * -6 + 'deg');
      postersEl.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 8 + 'deg');
    });
    postersEl.addEventListener('mouseleave', () => { postersEl.style.setProperty('--rx', '0deg'); postersEl.style.setProperty('--ry', '0deg'); });
  }
  renderDays(); renderDay(false);
  onLang.push(() => { renderDays(); renderDay(false); });

  /* ---------------- cursor + magnetic ---------------- */
  if (fine && !reduce) {
    const cur = $('#cursor'), label = $('#cursorLabel');
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    const follow = () => { cx += (tx - cx) * .2; cy += (ty - cy) * .2; cur.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(follow); };
    follow();
    document.addEventListener('mouseover', e => {
      const view = e.target.closest('.tile, .poster, .dish');
      const soft = e.target.closest('.dn-card, a, button');
      cur.classList.toggle('is-view', !!view);
      label.textContent = view ? (view.classList.contains('dish') ? 'Menu' : 'View') : '';
      cur.classList.toggle('is-hover', !view && !!soft);
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
