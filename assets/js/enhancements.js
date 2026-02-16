/*
  Kürşat Portfolyo — Etkileşim / Performans Katmanı
  Backend yok. Cookie / storage yok. Tamamen tarayıcı tarafı.
*/

(function () {
  'use strict';

  const d = document;
  const w = window;

  const prefersReducedMotion = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointerCoarse = w.matchMedia && w.matchMedia('(pointer: coarse)').matches;

  // --- 1) Cross-document View Transitions (Chrome/Edge destekli) ---
  try {
    // Not: Cross-document geçiş için her sayfada <meta name="view-transition" content="same-origin"> bulunuyor.
    if ('startViewTransition' in d) {
      d.documentElement.classList.add('supports-view-transitions');
    }
  } catch (_) {}

  // --- 2) Service Worker / PWA ---
  // (Deploy ortamı destekliyorsa site “app gibi” açılır, offline cache çalışır.)
  try {
    if ('serviceWorker' in navigator) {
      w.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').catch(() => {});
      }, { once: true });
    }
  } catch (_) {}

  // --- 3) Güvenli Prefetch (hover/touch ile) ---
  (function setupPrefetch() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = !!(conn && conn.saveData);
    const effectiveType = (conn && conn.effectiveType) ? String(conn.effectiveType) : '';
    const allow = !saveData && !/2g/.test(effectiveType);
    if (!allow) return;

    const seen = new Set();

    function normalize(url) {
      try {
        const u = new URL(url, location.href);
        u.hash = '';
        return u.href;
      } catch {
        return null;
      }
    }

    function shouldPrefetch(a) {
      if (!a || !a.href) return false;
      const u = normalize(a.href);
      if (!u) return false;
      try {
        const nu = new URL(u);
        if (nu.origin !== location.origin) return false;
        if (nu.pathname.endsWith('.pdf')) return false;
        if (a.hasAttribute('download')) return false;
        if (seen.has(u)) return false;
        if (u === location.href.split('#')[0]) return false;
        return true;
      } catch {
        return false;
      }
    }

    function prefetch(a) {
      const href = normalize(a.href);
      if (!href) return;
      seen.add(href);
      const link = d.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'document';
      d.head.appendChild(link);
    }

    let timer = null;
    d.addEventListener('pointerover', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      if (!shouldPrefetch(a)) return;
      clearTimeout(timer);
      timer = setTimeout(() => prefetch(a), 90);
    }, { passive: true });

    d.addEventListener('touchstart', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      if (!shouldPrefetch(a)) return;
      prefetch(a);
    }, { passive: true });
  })();

  // --- 4) Scroll reveal (WOW yerine içerik eklemeden premium akış) ---
  (function setupReveal() {
    if (prefersReducedMotion) return;

    const candidates = new Set();

    // Sayfa genelinde “kart” ve başlık bloklarını otomatik yakalayıp reveal’e sokuyorum.
    const selectors = [
      '.section-title',
      '.service-box-items',
      '.portfolio-box-items',
      '.blog-card, .blog-box-items, .news-box-items',
      '.contact-wrapper, .contact-form-items, .contact-info-items',
      '.faq-wrapper, .faq-items',
      '.about-content, .about-image, .about-wrapper'
    ].join(',');

    d.querySelectorAll(selectors).forEach(el => {
      if (!el || el.classList.contains('wow')) return; // wow kullanıyorsa dokunmuyorum
      candidates.add(el);
    });

    if (!candidates.size) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-in');
          io.unobserve(el);
        }
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    let i = 0;
    for (const el of candidates) {
      el.classList.add('k-reveal');
      // Aynı satırdaki kartlar “dip dibe” animasyon yapmasın diye küçük gecikme veriyorum
      el.style.transitionDelay = `${Math.min(240, i * 40)}ms`;
      io.observe(el);
      i++;
    }
  })();

  // --- 5) 3D Tilt (kartlarda premium hover) ---
  (function setupTilt() {
    if (prefersReducedMotion || pointerCoarse) return;

    const cards = Array.from(d.querySelectorAll('.portfolio-box-items, .service-box-items, .blog-box-items, .blog-card'));
    if (!cards.length) return;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    for (const card of cards) {
      card.classList.add('k-tilt');

      let raf = 0;
      let rect = null;

      const onEnter = () => {
        rect = card.getBoundingClientRect();
        card.classList.add('k-tilt-active');
      };

      const onMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotY = clamp((x - 0.5) * 10, -7, 7);
        const rotX = clamp((0.5 - y) * 10, -7, 7);
        const lift = 6;

        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) translateY(-${lift}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });
      };

      const onLeave = () => {
        rect = null;
        card.classList.remove('k-tilt-active');
        card.style.transform = '';
      };

      card.addEventListener('pointerenter', onEnter, { passive: true });
      card.addEventListener('pointermove', onMove, { passive: true });
      card.addEventListener('pointerleave', onLeave, { passive: true });
    }
  })();

  // --- 6) Magnetic Buttons (butonlar daha “canlı” hissedilir) ---
  (function setupMagnetic() {
    if (prefersReducedMotion || pointerCoarse) return;

    const btns = Array.from(d.querySelectorAll('a.theme-btn, button.theme-btn, .hero-btn-wrapper a, .hero-btn-wrapper button, .header-btn a'));
    if (!btns.length) return;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    for (const btn of btns) {
      btn.classList.add('k-magnetic');

      let rect = null;
      const strength = 10;

      const onEnter = () => { rect = btn.getBoundingClientRect(); };
      const onMove = (e) => {
        if (!rect) rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const tx = clamp(x / rect.width * strength, -strength, strength);
        const ty = clamp(y / rect.height * strength, -strength, strength);
        btn.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      };
      const onLeave = () => {
        rect = null;
        btn.style.transform = '';
      };

      btn.addEventListener('pointerenter', onEnter, { passive: true });
      btn.addEventListener('pointermove', onMove, { passive: true });
      btn.addEventListener('pointerleave', onLeave, { passive: true });
    }
  })();

  // --- 7) Canvas Particle FX (sayfaya “teknoloji” hissi — hafif) ---
  (function setupCanvasFX() {
    if (prefersReducedMotion) return;

    // Ana görsel alanı (hero/breadcrumb) bulunduğunda içine canvas ekliyorum.
    const host = d.querySelector('.hero-section') || d.querySelector('.breadcrumb-wrapper') || d.querySelector('.bg-cover.fix');
    if (!host) return;

    host.classList.add('kfx-wrap');

    const canvas = d.createElement('canvas');
    canvas.id = 'kfx-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.insertBefore(canvas, host.firstChild);

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let W = 0, H = 0, DPR = Math.min(2, w.devicePixelRatio || 1);
    let particles = [];
    let running = true;

    const accent = { r: 0, g: 255, b: 140 }; // temadaki yeşile yakın

    const maxParticles = () => {
      const area = (W * H);
      if (area < 240000) return 22;
      if (area < 520000) return 34;
      return 46;
    };

    function resize() {
      const r = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      DPR = Math.min(2, w.devicePixelRatio || 1);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const target = maxParticles();
      if (particles.length > target) particles = particles.slice(0, target);
      while (particles.length < target) particles.push(spawn());
    }

    function spawn() {
      const speed = 0.12 + Math.random() * 0.28;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.1 + Math.random() * 1.8,
      };
    }

    function step() {
      if (!running) return;

      // FPS limiti: 30
      const now = performance.now();
      if (step._last && (now - step._last) < 33) {
        requestAnimationFrame(step);
        return;
      }
      step._last = now;

      ctx.clearRect(0, 0, W, H);

      // update
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = 140;
          if (dist < maxD) {
            const alpha = (1 - dist / maxD) * 0.35;
            ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(step);
    }

    function onVisibility() {
      running = !d.hidden;
      if (running) requestAnimationFrame(step);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(host);
    d.addEventListener('visibilitychange', onVisibility, { passive: true });

    resize();
    requestAnimationFrame(step);
  })();

  // --- 8) Lightbox (görselleri premium inceleme) ---
  (function setupLightbox() {
    // Projede zaten magnific popup var; varsa onu kullanıyorum.
    function initWithJQ() {
      if (!w.jQuery) return false;
      const $ = w.jQuery;
      if (!$.fn || !$.fn.magnificPopup) return false;

      // Otomatik: görsel linklerini lightbox’a sokuyorum.
      const imgLinkSel = 'a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".webp"],a[href$=".gif"]';
      $(imgLinkSel).each(function () {
        const $a = $(this);
        if ($a.hasClass('js-lightbox') || $a.hasClass('popup-image')) return;
        // Sadece site içi görseller
        const href = String($a.attr('href') || '');
        if (!href.includes('assets/img/')) return;
        $a.addClass('js-lightbox');
      });

      $('.js-lightbox, .popup-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: { enabled: true },
      });

      return true;
    }

    // DOM hazır olunca deniyorum.
    if (d.readyState === 'loading') {
      d.addEventListener('DOMContentLoaded', initWithJQ, { once: true });
    } else {
      initWithJQ();
    }
  })();

  // --- 9) Komut Paleti (Ctrl/Cmd+K) ---
  (function setupCommandPalette() {
    // İçerik eklemeden: DOM’u JS ile enjekte ediyorum.
    const items = [];

    function buildIndex() {
      const anchors = Array.from(d.querySelectorAll('a[href]'));
      const seen = new Set();

      for (const a of anchors) {
        const href = a.getAttribute('href');
        if (!href) continue;
        if (href.startsWith('#')) continue;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;

        // Dış linkleri de gösterebilir; ama önce site içi odak.
        let url;
        try { url = new URL(href, location.href); } catch { continue; }

        const key = url.href;
        if (seen.has(key)) continue;
        seen.add(key);

        const text = (a.textContent || '').trim().replace(/\s+/g, ' ');
        if (!text || text.length < 2) continue;

        // Menü/CTA linkleri daha değerli; basitçe hepsini listeleyip aramada süzüyoruz.
        items.push({
          title: text,
          hint: url.origin === location.origin ? url.pathname.replace(/^\//, '') || 'Ana sayfa' : url.hostname,
          href: url.href,
          internal: url.origin === location.origin,
        });
      }

      // İç linkleri üstte tut.
      items.sort((a, b) => Number(b.internal) - Number(a.internal));
    }

    function score(query, text) {
      // Çok hafif bir fuzzy: sıralı karakter eşleşmesi + prefix bonus
      if (!query) return 0;
      const q = query.toLowerCase();
      const t = text.toLowerCase();
      if (t.startsWith(q)) return 1000 - t.length;
      let ti = 0;
      let s = 0;
      for (let i = 0; i < q.length; i++) {
        const ch = q[i];
        ti = t.indexOf(ch, ti);
        if (ti === -1) return -1;
        s += 10;
        ti += 1;
      }
      return s;
    }

    function createUI() {
      const wrap = d.createElement('div');
      wrap.className = 'k-cmdk';
      wrap.innerHTML = `
        <div class="k-cmdk__backdrop" data-cmdk-close></div>
        <div class="k-cmdk__panel" role="dialog" aria-modal="true" aria-label="Hızlı gezinme">
          <input class="k-cmdk__input" type="search" autocomplete="off" spellcheck="false" placeholder="Sayfa ara... (Projeler, Hizmetler, Sertifikalar, İletişim)" />
          <div class="k-cmdk__list" role="listbox"></div>
        </div>
      `;
      d.body.appendChild(wrap);

      const input = wrap.querySelector('.k-cmdk__input');
      const list = wrap.querySelector('.k-cmdk__list');

      let activeIndex = 0;
      let current = [];

      function render(q) {
        const query = (q || '').trim();
        const scored = items
          .map(it => ({ it, s: score(query, it.title + ' ' + it.hint) }))
          .filter(x => query ? x.s >= 0 : true)
          .sort((a, b) => b.s - a.s)
          .slice(0, 12)
          .map(x => x.it);

        current = scored;
        activeIndex = 0;

        list.innerHTML = current.map((it, idx) => {
          const kbd = it.internal ? 'Enter' : '↗';
          return `
            <div class="k-cmdk__item ${idx === 0 ? 'is-active' : ''}" role="option" data-idx="${idx}">
              <div class="k-cmdk__left">
                <div class="k-cmdk__title">${escapeHTML(it.title)}</div>
                <div class="k-cmdk__hint">${escapeHTML(it.hint)}</div>
              </div>
              <div class="k-cmdk__kbd">${kbd}</div>
            </div>
          `;
        }).join('');
      }

      function setActive(idx) {
        const itemsEls = Array.from(list.querySelectorAll('.k-cmdk__item'));
        itemsEls.forEach(el => el.classList.remove('is-active'));
        const el = itemsEls[idx];
        if (el) {
          el.classList.add('is-active');
          el.scrollIntoView({ block: 'nearest' });
        }
      }

      function open() {
        wrap.classList.add('is-open');
        d.body.style.overflow = 'hidden';
        input.value = '';
        render('');
        setTimeout(() => input.focus(), 0);
      }

      function close() {
        wrap.classList.remove('is-open');
        d.body.style.overflow = '';
      }

      function go(idx) {
        const it = current[idx];
        if (!it) return;
        close();
        // Aynı origin ise normal navigasyon; ViewTransition meta devreye girer.
        location.href = it.href;
      }

      wrap.addEventListener('click', (e) => {
        const closeEl = e.target && e.target.closest ? e.target.closest('[data-cmdk-close]') : null;
        if (closeEl) close();

        const itemEl = e.target && e.target.closest ? e.target.closest('.k-cmdk__item') : null;
        if (itemEl) {
          const idx = Number(itemEl.getAttribute('data-idx') || '0');
          go(idx);
        }
      });

      input.addEventListener('input', () => render(input.value));

      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { e.preventDefault(); close(); return; }
        if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, current.length - 1); setActive(activeIndex); return; }
        if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); setActive(activeIndex); return; }
        if (e.key === 'Enter') { e.preventDefault(); go(activeIndex); return; }
      });

      // Global kısayol
      d.addEventListener('keydown', (e) => {
        const k = e.key.toLowerCase();
        const cmd = e.metaKey || e.ctrlKey;
        if (cmd && k === 'k') {
          e.preventDefault();
          if (wrap.classList.contains('is-open')) close(); else open();
        }
      });

      // Expose minimal for debug
      w.__kcmdk = { open, close };
    }

    function escapeHTML(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Build once DOM ready.
    const init = () => {
      buildIndex();
      if (items.length) createUI();
    };

    if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
  })();

})();
