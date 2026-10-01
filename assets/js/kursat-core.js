// Her sayfada ortak davranışlar: menü, tema, saat, kaydırma geçişleri, kopyalama ve bildirim.
(function () {
  "use strict";

  const root = document.documentElement;
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // JS ile üretilen içerikte kullandığım ikonlar
  const icons = {
    arrow: '<svg class="kursat-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>'
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // --- bildirim ---
  let toastEl = null;
  let toastTimer = 0;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "kursat-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  }

  async function copyText(text, message) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // clipboard API yoksa (http, eski tarayıcı) geçici textarea ile
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (__) { /* yok say */ }
      ta.remove();
    }
    toast(message || "Kopyalandı");
  }

  // --- tema ---
  function initTheme() {
    document.querySelectorAll("[data-kursat-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("kursat-theme-v2", next); } catch (_) { /* yok say */ }
        button.setAttribute("aria-label", next === "light" ? "Koyu temaya geç" : "Açık temaya geç");
      });
    });
  }

  // --- üst menü: kaydırınca zemin, aşağı inerken gizle ---
  function initHeader() {
    const header = document.querySelector(".kursat-header");
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    const nights = () => document.querySelectorAll('[data-kursat-tone="night"]');
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);
      // Menünün altındaki bölüm koyuysa menü de açık renge dönsün
      const probe = header.offsetHeight / 2;
      let onNight = false;
      nights().forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) onNight = true;
      });
      header.classList.toggle("is-night", onNight);
      const drawerOpen = document.body.classList.contains("kursat-drawer-open");
      header.classList.toggle("is-hidden", !drawerOpen && y > 400 && y > lastY + 4);
      if (y < lastY - 4 || y < 400) header.classList.remove("is-hidden");
      lastY = y;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function initDrawer() {
    const button = document.querySelector("[data-kursat-menu]");
    const drawer = document.querySelector(".kursat-drawer");
    if (!button || !drawer) return;
    const setOpen = (open) => {
      drawer.classList.toggle("is-open", open);
      document.body.classList.toggle("kursat-drawer-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) drawer.querySelector("a")?.focus({ preventScroll: true });
    };
    button.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));
    drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) { setOpen(false); button.focus(); } });
    window.addEventListener("resize", () => { if (window.innerWidth > 900) setOpen(false); });
  }

  // --- İstanbul saati ---
  function initClock() {
    const els = document.querySelectorAll("[data-kursat-clock]");
    if (!els.length) return;
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" });
    } catch (_) { return; }
    const tick = () => els.forEach((el) => { el.textContent = "İstanbul " + fmt.format(new Date()); });
    tick();
    window.setInterval(tick, 20000);
  }

  // --- kaydırınca beliren öğeler ---
  let revealObserver = null;
  let revealsReady = false; // açılış perdesi kalkana kadar bekle
  function observeReveals(scope) {
    if (!revealsReady) return;
    const els = (scope || document).querySelectorAll(".kursat-reveal:not(.is-in), .kursat-unveil:not(.is-in)");
    if (!els.length) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    els.forEach((el) => revealObserver.observe(el));
  }

  // --- dış linkler yeni sekmede, güvenli ---
  function hardenLinks(scope) {
    (scope || document).querySelectorAll('a[href^="http"]').forEach((a) => {
      if (a.hostname === location.hostname) return;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    });
  }

  // --- tıklayınca kopyala: data-kursat-copy="metin" ---
  function initCopy() {
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-kursat-copy]");
      if (!el) return;
      e.preventDefault();
      copyText(el.getAttribute("data-kursat-copy"), el.getAttribute("data-kursat-copy-message") || "Kopyalandı");
    });
  }

  // Eski sürümden kalan service worker kaydı varsa kaldır (yeni sürüm offline önbellek kullanmıyor)
  function removeLegacyWorker() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.getRegistrations()
      .then((list) => list.forEach((registration) => registration.unregister()))
      .catch(() => { /* yok say */ });
  }

  function initYear() {
    document.querySelectorAll("[data-kursat-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  }

  // --- kaydırma ilerlemesi: vitrin ve sahneler CSS değişkenleriyle hareket ediyor ---
  function initScrollScenes() {
    const showreels = [...document.querySelectorAll("[data-kursat-showreel]")];
    const scenes = [...document.querySelectorAll(".kursat-scene")];
    if (!showreels.length && !scenes.length) return;
    const desktop = () => window.matchMedia("(min-width: 901px)").matches && !reducedMotion();
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      showreels.forEach((el) => {
        if (!desktop()) { el.style.removeProperty("--p"); return; }
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / vh));
        el.style.setProperty("--p", p.toFixed(4));
      });
      scenes.forEach((scene, i) => {
        const inner = scene.querySelector(".kursat-scene-inner");
        const next = scenes[i + 1];
        if (!inner) return;
        if (!desktop() || !next) { scene.style.setProperty("--cover", "0"); return; }
        const stick = parseFloat(getComputedStyle(scene).top) || 0;
        const top = next.getBoundingClientRect().top - stick;
        const cover = Math.min(1, Math.max(0, 1 - top / (vh - stick)));
        scene.style.setProperty("--cover", cover.toFixed(4));
      });
    };
    const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  }


  // Dışarıya açtıklarım: içerik betikleri bunları kullanıyor
  window.Kursat = { icons, escapeHtml, toast, copyText, observeReveals, hardenLinks, reducedMotion };

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initHeader();
    initDrawer();
    initClock();
    initCopy();
    initYear();
    removeLegacyWorker();
    hardenLinks();
    // İlk boyamadan sonra geçişleri başlat
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.body.classList.add("is-loaded");
      revealsReady = true;
      observeReveals();
      initScrollScenes(); // sahneler içerik betiğiyle çiziliyor, onlardan sonra bağlan
    }));
  });
})();
