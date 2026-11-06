/**
 * Movewise - Motion Layer
 * Hero blueprint canvas (LiDAR sweep + furniture motion path), custom cursor,
 * scroll reveals, scroll-spy, card spotlight, tilt & magnetic buttons.
 * Everything degrades gracefully and respects prefers-reduced-motion.
 */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2, seen: false };
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.seen = true;
  }, { passive: true });

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function cssRgb(name) {
    const v = getComputedStyle(root).getPropertyValue(name).trim().replace('#', '');
    const h = v.length === 3 ? v.split('').map((c) => c + c).join('') : v;
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
  }

  /* ---------------- Hero title word split ---------------- */
  function splitWords(el) {
    if (!el) return;
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    const words = text.split(' ');
    const amp = words.indexOf('&');
    el.textContent = '';
    el.setAttribute('aria-label', text);
    words.forEach((w, i) => {
      const outer = document.createElement('span');
      outer.className = 'word';
      outer.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'word-inner' + (amp !== -1 && i > amp ? ' accent' : '');
      inner.style.setProperty('--i', i);
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  function playTitle() {
    const title = document.querySelector('[data-split]');
    if (!title) return;
    splitWords(title);
    title.classList.remove('words-in');
    void title.offsetWidth; // restart transition
    requestAnimationFrame(() => title.classList.add('words-in'));
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal() {
    const groups = [
      ['.section-head', '.badge, .section-title, .section-desc'],
      ['.contrast-list', '.contrast-item'],
      ['.pipeline-grid', '.pipeline-step'],
      ['.target-grid', '.target-card'],
      ['.team-grid', '.team-card'],
      ['.docs-grid', '.doc-card'],
      ['.sim-stats-grid', '.sim-stat-box'],
    ];
    groups.forEach(([parentSel, childSel]) => {
      document.querySelectorAll(parentSel).forEach((parent) => {
        parent.querySelectorAll(childSel).forEach((el, i) => {
          el.classList.add('reveal');
          el.style.setProperty('--rd', `${i * 90}ms`);
        });
      });
    });

    const solo = ['.comparison-wrap', '.simulator-container', '.academic-card', '.pipeline-track'];
    solo.forEach((sel) => document.querySelectorAll(sel).forEach((el) => el.classList.add('reveal')));

    document.querySelectorAll('.contrast-card.problem').forEach((el) => el.classList.add('reveal', 'reveal-left'));
    document.querySelectorAll('.contrast-card.solution').forEach((el) => {
      el.classList.add('reveal', 'reveal-right');
      el.style.setProperty('--rd', '120ms');
    });

    const targets = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        io.unobserve(el);
        // drop the stagger delay afterwards so hovers feel instant
        setTimeout(() => el.style.setProperty('--rd', '0s'), 1400);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach((el) => io.observe(el));
  }

  /* ---------------- Nav: scroll-spy + progress bar ---------------- */
  function initNav() {
    const bar = document.getElementById('scroll-progress');
    const links = [...document.querySelectorAll('.nav-link')];
    const sections = links
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => spy.observe(s));
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;
      // nothing is highlighted while the reader is still in the hero
      if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight * 0.5) {
        links.forEach((a) => a.classList.remove('is-active'));
      }
      heroParallax();
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------- Hero image parallax ---------------- */
  const heroImg = document.querySelector('.hero-image');
  function heroParallax() {
    if (!heroImg || reduceMotion) return;
    const r = heroImg.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    const p = clamp((r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight, -1, 1);
    heroImg.style.transform = `translate3d(0, ${p * 28}px, 0) scale(1.08)`;
  }

  /* ---------------- Card spotlight ---------------- */
  function initSpotlight() {
    if (!finePointer) return;
    const cards = document.querySelectorAll(
      '.metric-card, .pipeline-step, .target-card, .team-card, .doc-card, .contrast-card, .sim-stat-box'
    );
    cards.forEach((card) => {
      card.classList.add('spotlight');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------------- Hero showcase 3D tilt ---------------- */
  function initTilt() {
    const el = document.getElementById('hero-showcase');
    if (!el || !finePointer || reduceMotion) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx = lerp(cx, tx, 0.08);
      cy = lerp(cy, ty, 0.08);
      el.style.transform = `perspective(1400px) rotateX(${cy.toFixed(3)}deg) rotateY(${cx.toFixed(3)}deg)`;
      if (Math.abs(cx - tx) > 0.01 || Math.abs(cy - ty) > 0.01) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx * 5;
      ty = -ny * 4;
      el.style.setProperty('--gx', `${(nx + 0.5) * 100}%`);
      el.style.setProperty('--gy', `${(ny + 0.5) * 100}%`);
      kick();
    });
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
  }

  /* ---------------- Magnetic buttons ---------------- */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll('.hero-cta .btn, #nav-proposal-btn, #academic-download-btn').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        btn.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.translate = '0 0'; });
    });
  }

  /* ---------------- Cursor: tiny truck with two trailers ----------------
     The cab's nose eases toward the pointer; each trailer is towed from the
     previous unit's rear hitch, so turns fold the rig like a real road train. */
  function initCursor() {
    if (!finePointer || reduceMotion) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'cursor-truck';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const COL = {
      egy: cssRgb('--egyptian'),
      egyB: cssRgb('--egyptian-bright'),
      stone: cssRgb('--stone'),
      stoneL: cssRgb('--stone-light'),
      stoneD: cssRgb('--stone-dark'),
      scarlet: cssRgb('--scarlet'),
    };

    const W_BODY = 8;                 // body width (px)
    const GAP = 3;                    // hitch gap between units
    const OFFSET = { x: 14, y: 20 };  // sit just past the arrow tip, never covering it
    const units = [{ len: 12, cab: true }, { len: 16 }, { len: 16 }]
      .map((u) => ({ ...u, f: { x: 0, y: 0 }, r: { x: 0, y: 0 } }));

    let W = 0, H = 0, DPR = 1, dirty = true;
    let placed = false, alpha = 0, alphaGoal = 0, lights = 0, hover = false;
    const interactive = 'a, button, input, label, select, textarea, [role="button"]';

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      dirty = true;
    }
    resize();
    window.addEventListener('resize', resize);

    function place() {
      // lay the rig out horizontally behind the first pointer position
      let x = pointer.x + OFFSET.x;
      const y = pointer.y + OFFSET.y;
      units.forEach((u) => {
        u.f = { x, y };
        u.r = { x: x - u.len, y };
        x -= u.len + GAP;
      });
      placed = true;
    }

    window.addEventListener('pointermove', () => {
      if (!placed) place();
      alphaGoal = 1;
    }, { passive: true });
    document.addEventListener('mouseleave', () => { alphaGoal = 0; });
    document.addEventListener('mouseenter', () => { alphaGoal = 1; });
    document.addEventListener('pointerover', (e) => { hover = !!e.target.closest(interactive); });

    const norm = (x, y) => { const l = Math.hypot(x, y) || 1; return { x: x / l, y: y / l }; };

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else ctx.rect(x, y, w, h);
    }

    function drawUnit(u, isLast) {
      const ang = Math.atan2(u.f.y - u.r.y, u.f.x - u.r.x);
      const L = u.len, hw = W_BODY / 2;
      ctx.save();
      ctx.translate((u.f.x + u.r.x) / 2, (u.f.y + u.r.y) / 2);
      ctx.rotate(ang);

      // soft ground shadow
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      roundRect(-L / 2 + 1, -hw + 1.8, L, W_BODY, 2);
      ctx.fill();

      // wheels peeking out at the sides
      ctx.fillStyle = 'rgba(10,14,24,0.95)';
      const axles = u.cab ? [L / 2 - 3, -L / 2 + 3] : [-L / 2 + 2.5, -L / 2 + 5.5];
      axles.forEach((ax) => {
        ctx.fillRect(ax - 1.5, -hw - 0.9, 3, 1.4);
        ctx.fillRect(ax - 1.5, hw - 0.5, 3, 1.4);
      });

      if (u.cab) {
        const g = ctx.createLinearGradient(0, -hw, 0, hw);
        g.addColorStop(0, `rgb(${COL.egyB})`);
        g.addColorStop(1, `rgb(${COL.egy})`);
        ctx.fillStyle = g;
        roundRect(-L / 2, -hw, L, W_BODY, 2.5);
        ctx.fill();
        // windshield
        ctx.fillStyle = `rgba(${COL.stoneL},0.9)`;
        roundRect(L / 2 - 4, -hw + 1.2, 2.2, W_BODY - 2.4, 1);
        ctx.fill();
        // headlights
        ctx.fillStyle = `rgba(255,236,190,${0.55 + lights * 0.45})`;
        ctx.fillRect(L / 2 - 0.8, -hw + 0.6, 1, 1.6);
        ctx.fillRect(L / 2 - 0.8, hw - 2.2, 1, 1.6);
      } else {
        const g = ctx.createLinearGradient(0, -hw, 0, hw);
        g.addColorStop(0, `rgb(${COL.stoneL})`);
        g.addColorStop(1, `rgb(${COL.stone})`);
        ctx.fillStyle = g;
        roundRect(-L / 2, -hw, L, W_BODY, 1.5);
        ctx.fill();
        // container ribs
        ctx.strokeStyle = `rgba(${COL.stoneD},0.45)`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let x = -L / 2 + 3; x < L / 2 - 1; x += 3) { ctx.moveTo(x, -hw + 0.8); ctx.lineTo(x, hw - 0.8); }
        ctx.stroke();
        // scarlet brand stripe along the roof
        ctx.fillStyle = `rgb(${COL.scarlet})`;
        ctx.fillRect(-L / 2 + 1, -0.6, L - 2, 1.2);
        // tail lights on the last trailer
        if (isLast) {
          ctx.fillStyle = `rgba(${COL.scarlet},0.95)`;
          ctx.fillRect(-L / 2, -hw + 0.6, 0.9, 1.5);
          ctx.fillRect(-L / 2, hw - 2.1, 0.9, 1.5);
        }
      }
      ctx.restore();
    }

    function frame() {
      requestAnimationFrame(frame);
      alpha = lerp(alpha, alphaGoal, 0.12);
      lights = lerp(lights, hover ? 1 : 0, 0.15);
      if (!placed) return;

      // steer: cab nose eases toward the pointer, every unit trails its hitch
      const tail = units[units.length - 1];
      const before = units[0].f.x + units[0].f.y + tail.r.x + tail.r.y;
      const cab = units[0];
      cab.f.x = lerp(cab.f.x, pointer.x + OFFSET.x, 0.2);
      cab.f.y = lerp(cab.f.y, pointer.y + OFFSET.y, 0.2);
      units.forEach((u, i) => {
        if (i > 0) {
          const p = units[i - 1];
          const back = norm(p.r.x - p.f.x, p.r.y - p.f.y);
          u.f = { x: p.r.x + back.x * GAP, y: p.r.y + back.y * GAP };
        }
        const d = norm(u.f.x - u.r.x, u.f.y - u.r.y);
        u.r = { x: u.f.x - d.x * u.len, y: u.f.y - d.y * u.len };
      });
      const after = units[0].f.x + units[0].f.y + tail.r.x + tail.r.y;

      // skip repainting a parked, settled rig
      const settled = Math.abs(after - before) < 0.02 && Math.abs(alpha - alphaGoal) < 0.005 &&
        Math.abs(lights - (hover ? 1 : 0)) < 0.005;
      if (settled && !dirty) return;
      dirty = false;

      ctx.clearRect(0, 0, W, H);
      if (alpha < 0.01) return;
      ctx.globalAlpha = alpha;

      // headlight beams when hovering something clickable
      if (lights > 0.02) {
        ctx.save();
        ctx.translate(cab.f.x, cab.f.y);
        ctx.rotate(Math.atan2(cab.f.y - cab.r.y, cab.f.x - cab.r.x));
        const g = ctx.createLinearGradient(0, 0, 26, 0);
        g.addColorStop(0, `rgba(255,236,190,${0.4 * lights})`);
        g.addColorStop(1, 'rgba(255,236,190,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -3.5);
        ctx.lineTo(26, -10);
        ctx.lineTo(26, 10);
        ctx.lineTo(0, 3.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // couplings
      ctx.strokeStyle = `rgba(${COL.stoneD},0.95)`;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 1; i < units.length; i++) {
        ctx.moveTo(units[i - 1].r.x, units[i - 1].r.y);
        ctx.lineTo(units[i].f.x, units[i].f.y);
      }
      ctx.stroke();

      // draw back-to-front so the cab sits on top
      for (let i = units.length - 1; i >= 0; i--) drawUnit(units[i], i === units.length - 1);
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- Hero blueprint canvas ---------------- */
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COL = {
      egy: cssRgb('--egyptian'),
      egyB: cssRgb('--egyptian-bright'),
      stone: cssRgb('--stone'),
      stoneL: cssRgb('--stone-light'),
      scarlet: cssRgb('--scarlet'),
    };

    // Floor plan in normalized coordinates (x, y in 0..1); gaps are doorways.
    const WALLS = [
      [0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1],
      [0, 1, 0, 0.82], [0, 0.70, 0, 0],                 // front entrance gap
      [0.38, 0, 0.38, 0.40], [0.38, 0.52, 0.38, 1],     // left partition
      [0.66, 0, 0.66, 0.58], [0.66, 0.70, 0.66, 1],     // right partition
      [0, 0.55, 0.14, 0.55], [0.24, 0.55, 0.38, 0.55],  // left rooms split
      [0.66, 0.45, 0.78, 0.45], [0.88, 0.45, 1, 0.45],  // right rooms split
    ];
    // hinge point, swing direction & width for door symbols
    const DOORS = [
      { a: [0, 0.70], b: [0, 0.82] },
      { a: [0.14, 0.55], b: [0.24, 0.55] },
      { a: [0.38, 0.40], b: [0.38, 0.52] },
      { a: [0.66, 0.58], b: [0.66, 0.70] },
      { a: [0.78, 0.45], b: [0.88, 0.45] },
    ];
    // the furniture's verified route: outside → through every doorway → new room
    const ROUTE = [
      [-0.12, 0.76], [0.04, 0.76], [0.17, 0.72], [0.19, 0.6], [0.19, 0.5],
      [0.22, 0.44], [0.32, 0.46], [0.45, 0.46], [0.52, 0.53], [0.57, 0.64],
      [0.72, 0.64], [0.81, 0.58], [0.83, 0.45], [0.83, 0.3], [0.83, 0.24],
    ];
    const SCANNER = [0.13, 0.2];

    let W = 0, H = 0, DPR = 1;
    let ox = 0, oy = 0, bw = 0, bh = 0;
    let walls = [], doors = [], route = [], routeLen = 0, scanner = { x: 0, y: 0 };
    let particles = [], cloud = [];
    let px = 0, py = 0;
    let beam = -Math.PI / 2;
    let running = true, last = 0, cycleStart = 0;
    let boxL = 40, boxW = 18;

    const map = ([x, y]) => ({ x: ox + x * bw, y: oy + y * bh });

    function catmull(pts, steps) {
      const out = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        for (let k = 0; k < steps; k++) {
          const t = k / steps, t2 = t * t, t3 = t2 * t;
          const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
          out.push({ x: f(p0.x, p1.x, p2.x, p3.x), y: f(p0.y, p1.y, p2.y, p3.y) });
        }
      }
      out.push(pts[pts.length - 1]);
      return out;
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const mobile = W < 760;
      ox = W * (mobile ? 0.04 : 0.05);
      oy = H * 0.07;
      bw = W - ox * 2;
      bh = H * 0.8;

      walls = WALLS.map(([x1, y1, x2, y2]) => ({ a: map([x1, y1]), b: map([x2, y2]) }));
      doors = DOORS.map((d) => {
        const a = map(d.a), b = map(d.b);
        return { a, b, c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, glow: 0 };
      });
      scanner = map(SCANNER);

      route = catmull(ROUTE.map(map), 24);
      routeLen = 0;
      route[0].d = 0;
      for (let i = 1; i < route.length; i++) {
        routeLen += Math.hypot(route[i].x - route[i - 1].x, route[i].y - route[i - 1].y);
        route[i].d = routeLen;
      }

      boxL = clamp(bw * 0.045, 26, 58);
      boxW = boxL * 0.45;

      const count = Math.round(clamp((W * H) / 11000, 30, 140));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.03 - Math.random() * 0.1,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    // pose (position + heading) at a given distance along the route
    function poseAt(d) {
      d = clamp(d, 0, routeLen);
      let lo = 0, hi = route.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (route[mid].d < d) lo = mid; else hi = mid;
      }
      const a = route[lo], b = route[hi];
      const seg = b.d - a.d || 1;
      const t = (d - a.d) / seg;
      return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), ang: Math.atan2(b.y - a.y, b.x - a.x) };
    }

    function raycast(ang) {
      const dx = Math.cos(ang), dy = Math.sin(ang);
      let best = Infinity;
      for (const w of walls) {
        const ex = w.b.x - w.a.x, ey = w.b.y - w.a.y;
        const den = dx * ey - dy * ex;
        if (Math.abs(den) < 1e-6) continue;
        const qx = w.a.x - scanner.x, qy = w.a.y - scanner.y;
        const t = (qx * ey - qy * ex) / den;
        const u = (qx * dy - qy * dx) / den;
        if (t > 0.5 && u >= 0 && u <= 1 && t < best) best = t;
      }
      if (!isFinite(best)) best = Math.max(W, H);
      return { x: scanner.x + dx * best, y: scanner.y + dy * best, t: best };
    }

    function drawBox(x, y, ang, stroke, fill, lw) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(-boxL / 2, -boxW / 2, boxL, boxW, 3);
      else ctx.rect(-boxL / 2, -boxW / 2, boxL, boxW);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke;
      ctx.stroke();
      ctx.restore();
    }

    const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    function draw(now) {
      const t = now / 1000;
      const dt = Math.min(0.05, Math.max(0, t - last));
      last = t;
      ctx.clearRect(0, 0, W, H);

      // smoothed pointer parallax
      if (pointer.seen && !reduceMotion) {
        px = lerp(px, (pointer.x / window.innerWidth - 0.5) * -16, 0.05);
        py = lerp(py, (pointer.y / window.innerHeight - 0.5) * -10, 0.05);
      }

      // ambient dust (deeper = slower, less parallax)
      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx * (0.4 + p.z);
          p.y += p.vy * (0.4 + p.z);
          if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
          if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        }
        const a = (0.08 + p.z * 0.3) * (0.65 + 0.35 * Math.sin(t * 1.2 + p.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.z > 0.85 ? COL.egyB : COL.stoneL},${a})`;
        ctx.arc(p.x + px * p.z * 1.6, p.y + py * p.z * 1.6, 0.4 + p.z * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(px * 0.6, py * 0.6);

      // walls
      ctx.lineCap = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${COL.stone},0.2)`;
      ctx.beginPath();
      for (const w of walls) { ctx.moveTo(w.a.x, w.a.y); ctx.lineTo(w.b.x, w.b.y); }
      ctx.stroke();

      // door swing symbols
      ctx.lineWidth = 1;
      for (const d of doors) {
        const r = Math.hypot(d.b.x - d.a.x, d.b.y - d.a.y);
        const base = Math.atan2(d.b.y - d.a.y, d.b.x - d.a.x);
        ctx.strokeStyle = `rgba(${COL.stone},${0.16 + d.glow * 0.4})`;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.arc(d.a.x, d.a.y, r, base - Math.PI / 2, base);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(d.a.x, d.a.y);
        ctx.lineTo(d.a.x + Math.cos(base - Math.PI / 2) * r, d.a.y + Math.sin(base - Math.PI / 2) * r);
        ctx.stroke();

        // clearance check glow while the item passes through
        if (d.glow > 0.02) {
          const g = ctx.createRadialGradient(d.c.x, d.c.y, 0, d.c.x, d.c.y, r * 1.4);
          g.addColorStop(0, `rgba(${COL.egyB},${0.35 * d.glow})`);
          g.addColorStop(1, `rgba(${COL.egyB},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(d.c.x, d.c.y, r * 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(${COL.egyB},${0.9 * d.glow})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(d.a.x, d.a.y);
          ctx.lineTo(d.b.x, d.b.y);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }

      // LiDAR sweep
      const sweepSpeed = 0.75;
      if (!reduceMotion) beam += sweepSpeed * dt;
      const FAN = 16, FAN_STEP = 0.028;
      for (let i = FAN - 1; i >= 0; i--) {
        const hit = raycast(beam - i * FAN_STEP);
        const a = (1 - i / FAN) * 0.3;
        const g = ctx.createLinearGradient(scanner.x, scanner.y, hit.x, hit.y);
        g.addColorStop(0, `rgba(${COL.egyB},${a})`);
        g.addColorStop(1, `rgba(${COL.egyB},${a * 0.15})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = i === 0 ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(scanner.x, scanner.y);
        ctx.lineTo(hit.x, hit.y);
        ctx.stroke();
      }
      if (!reduceMotion) {
        for (let k = 0; k < 3; k++) {
          const h = raycast(beam - Math.random() * sweepSpeed * dt);
          if (h.t < Math.max(W, H)) cloud.push({ x: h.x + (Math.random() - 0.5) * 2, y: h.y + (Math.random() - 0.5) * 2, life: 1 });
        }
        if (cloud.length > 900) cloud.splice(0, cloud.length - 900);
      }
      for (let i = cloud.length - 1; i >= 0; i--) {
        const c = cloud[i];
        if (!reduceMotion) c.life -= dt / 7;
        if (c.life <= 0) { cloud.splice(i, 1); continue; }
        const fresh = c.life > 0.93;
        ctx.fillStyle = fresh ? `rgba(${COL.scarlet},${c.life})` : `rgba(${COL.stoneL},${c.life * 0.55})`;
        ctx.fillRect(c.x - 0.9, c.y - 0.9, fresh ? 2.4 : 1.8, fresh ? 2.4 : 1.8);
      }

      // scanner head
      const pulse = (t * 0.8) % 1;
      ctx.strokeStyle = `rgba(${COL.scarlet},${0.6 * (1 - pulse)})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(scanner.x, scanner.y, 4 + pulse * 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(${COL.scarlet},0.95)`;
      ctx.beginPath();
      ctx.arc(scanner.x, scanner.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // furniture journey along the verified route
      const speed = clamp(W / 12, 70, 130);
      const travel = routeLen / speed;
      const HOLD = 2.2, FADE = 1.2;
      const cycle = travel + HOLD + FADE;
      if (!cycleStart) cycleStart = t;
      let local = reduceMotion ? travel * 0.62 : (t - cycleStart) % cycle;
      const u = clamp(local / travel, 0, 1);
      const dist = easeInOut(u) * routeLen;
      const fade = local > travel + HOLD ? 1 - (local - travel - HOLD) / FADE : 1;
      const parked = local >= travel;

      // planned path ahead (faint) and travelled trail (dashed)
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 7]);
      ctx.strokeStyle = `rgba(${COL.stoneL},${0.18 * fade})`;
      ctx.beginPath();
      route.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.stroke();

      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = reduceMotion ? 0 : -t * 20;
      ctx.strokeStyle = `rgba(${COL.egyB},${0.65 * fade})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i < route.length && route[i].d <= dist; i++) {
        i ? ctx.lineTo(route[i].x, route[i].y) : ctx.moveTo(route[i].x, route[i].y);
      }
      const head = poseAt(dist);
      ctx.lineTo(head.x, head.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      // step-by-step pose snapshots behind the item
      const GAP = boxL * 1.6;
      for (let d = GAP * 0.5; d < dist - boxL; d += GAP) {
        const g = poseAt(d);
        const age = (dist - d) / routeLen;
        drawBox(g.x, g.y, g.ang, `rgba(${COL.stone},${(0.28 - age * 0.18) * fade})`, null, 1);
      }

      // doors light up as the item clears them
      for (const d of doors) {
        const near = Math.hypot(head.x - d.c.x, head.y - d.c.y);
        const goal = fade * clamp(1 - near / (boxL * 2.2), 0, 1);
        d.glow = lerp(d.glow, goal, 0.12);
      }

      // the item itself
      const glowR = boxL * (parked ? 1.6 : 1.1);
      const halo = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowR);
      halo.addColorStop(0, `rgba(${parked ? COL.scarlet : COL.egyB},${0.3 * fade})`);
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(head.x, head.y, glowR, 0, Math.PI * 2);
      ctx.fill();
      drawBox(head.x, head.y, head.ang,
        `rgba(${parked ? COL.scarlet : COL.egyB},${0.95 * fade})`,
        `rgba(${COL.egy},${0.45 * fade})`, 1.6);

      // verified tick once placed in the new room
      if (parked && fade > 0) {
        const k = clamp((local - travel) / 0.6, 0, 1);
        ctx.strokeStyle = `rgba(${COL.scarlet},${fade})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(head.x, head.y, boxL * (0.9 + k * 0.25), -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * easeInOut(k));
        ctx.stroke();
      }

      ctx.restore();

      if (running && !reduceMotion) requestAnimationFrame(draw);
    }

    resize();
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        cloud = [];
        if (reduceMotion) prefillAndDrawStatic();
      }, 120);
    });

    function prefillAndDrawStatic() {
      for (let a = 0; a < Math.PI * 2; a += 0.01) {
        const h = raycast(a);
        if (h.t < Math.max(W, H)) cloud.push({ x: h.x, y: h.y, life: 0.8 });
      }
      draw(performance.now());
    }

    if (reduceMotion) {
      prefillAndDrawStatic();
      return;
    }

    // pause while off-screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        const was = running;
        running = entry.isIntersecting;
        if (running && !was) { last = performance.now() / 1000; requestAnimationFrame(draw); }
      }).observe(canvas);
    }
    requestAnimationFrame(draw);
  }

  /* ---------------- Public hook (used by language switch) ---------------- */
  window.MovewiseMotion = { refreshText: playTitle };

  /* ---------------- Boot ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    playTitle();
    initReveal();
    initNav();
    initSpotlight();
    initTilt();
    initMagnetic();
    initCursor();
    initHeroCanvas();
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-loaded')));
  });
})();
