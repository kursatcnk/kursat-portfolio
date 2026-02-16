// custom.js — Projeye özel davranışlarımı burada yönetiyorum.
// Çekirdek (vendor) dosyalara dokunmadan yeni etkileşimleri bu dosyada ekliyorum.


(function () {
  "use strict";

  // JS aktifken küçük iyileştirmeleri açıyorum (progressive enhancement)
  try { document.documentElement.classList.add("kc-js"); } catch (_) {}


  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));


  // ---------------------------
  // Güvenlik: yeni sekmede açılan linkleri güvenli hale getiriyorum (noopener/noreferrer)
  // ---------------------------
  function initExternalLinkHardening() {
    try {
      const links = document.querySelectorAll('a[target="_blank"]');
      links.forEach((a) => {
        const cur = (a.getAttribute('rel') || '').trim();
        const parts = cur ? cur.split(/\s+/).filter(Boolean) : [];
        if (!parts.includes('noopener')) parts.push('noopener');
        if (!parts.includes('noreferrer')) parts.push('noreferrer');
        a.setAttribute('rel', parts.join(' '));
      });
    } catch (_) {}
  }


  // ---------------------------
  // Mikro efekt: kopyalama etkileşiminde mini patlama efekti
  // ---------------------------
  function kcBurstFrom(el) {
    try {
      if (prefersReducedMotion()) return;
      if (!el || !el.getBoundingClientRect) return;
      const r = el.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;

      const root = document.createElement("div");
      root.className = "kc-burst";
      document.body.appendChild(root);

      const count = 12;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        p.className = "kc-burst__p";
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.35;
        const dist = 48 + Math.random() * 46;
        const dx = Math.cos(a) * dist;
        const dy = Math.sin(a) * dist - (12 + Math.random() * 10);
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.setProperty("--dx", dx.toFixed(1) + "px");
        p.style.setProperty("--dy", dy.toFixed(1) + "px");
        root.appendChild(p);
      }

      setTimeout(() => root.remove(), 820);
    } catch (_) {}
  }

  // ---------------------------
  // Mikro efekt: butonlara “manyetik” his veriyorum
  // ---------------------------
  function initMagnetic() {
    if (prefersReducedMotion()) return;
    const els = document.querySelectorAll("[data-kc-magnetic]");
    if (!els.length) return;

    els.forEach((el) => {
      let raf = null;

      function onMove(ev) {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        const sx = clamp(px * 14, -14, 14);
        const sy = clamp(py * 14, -14, 14);

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", sx.toFixed(2) + "px");
          el.style.setProperty("--my", sy.toFixed(2) + "px");
        });
      }

      function onLeave() {
        if (raf) cancelAnimationFrame(raf);
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      }

      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
      el.addEventListener("blur", onLeave, { passive: true });
    });
  }

  // ---------------------------
  // Sertifikalar: kaydırmalı ray (snap + noktalar + oklar)
  // ---------------------------
  function initCertRail() {
    const roots = document.querySelectorAll("[data-kc-cert-rail]");
    if (!roots.length) return;

    roots.forEach((root) => {
      const track = root.querySelector("[data-kc-rail-track]");
      if (!track) return;

      const prev = root.querySelector("[data-kc-rail-prev]");
      const next = root.querySelector("[data-kc-rail-next]");
      const host = root.closest(".kc-cert-showcase2026") || root.parentElement;
      const dotsWrap = host ? host.querySelector("[data-kc-rail-dots]") : null;

      const items = Array.from(track.children).filter((n) => n && n.getBoundingClientRect);
      if (!items.length) return;

      // build dots
      if (dotsWrap) {
        dotsWrap.innerHTML = "";
        items.forEach((_, i) => {
          const d = document.createElement("span");
          d.className = "dot" + (i === 0 ? " is-active" : "");
          dotsWrap.appendChild(d);
        });
      }

      function setActive(idx) {
        if (!dotsWrap) return;
        const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
      }

      function nearestIndex() {
        const tr = track.getBoundingClientRect();
        let best = 0;
        let bestDist = Infinity;
        items.forEach((it, i) => {
          const r = it.getBoundingClientRect();
          const dist = Math.abs((r.left + r.width / 2) - (tr.left + tr.width / 2));
          if (dist < bestDist) { bestDist = dist; best = i; }
        });
        return best;
      }

      let scrollRaf = null;
      track.addEventListener("scroll", () => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => setActive(nearestIndex()));
      }, { passive: true });

      function step(dir) {
        const w = Math.max(240, track.clientWidth * 0.88);
        track.scrollBy({ left: dir * w, behavior: "smooth" });
      }

      if (prev) prev.addEventListener("click", () => step(-1));
      if (next) next.addEventListener("click", () => step(1));

      // keyboard
      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      });

      // initial
      setActive(0);
    });
  }

  // ---------------------------
  // Meter / KPI animasyonları (genel)
  // ---------------------------
  function initMeters() {
    const sections = document.querySelectorAll("[data-kc-impact], [data-kc-impact-panel], [data-kc-studio-impact], .kc-scenario-kpis, .kc-play-kpis, .kc-kpi-stack");
    const meters = document.querySelectorAll("[data-value] .kc-meter-bar .fill, [data-value] .bar .fill");
    if (!sections.length && !meters.length) return;

    // başlangıçta sıfırla
    meters.forEach((fill) => {
      try { fill.style.width = "0%"; } catch (_) {}
    });

    function animateCounts(root) {
      const countEls = Array.from(root.querySelectorAll("[data-kc-count]"));
      if (!countEls.length) return;

      countEls.forEach((el) => {
        const parent = el.closest("[data-value]");
        const to = parent ? Number(parent.getAttribute("data-value") || "100") : 100;
        if (!Number.isFinite(to)) return;

        const start = prefersReducedMotion() ? to : 0;
        const dur = prefersReducedMotion() ? 0 : 650;
        const t0 = performance.now();

        function tick(now) {
          const p = dur === 0 ? 1 : clamp((now - t0) / dur, 0, 1);
          const val = Math.round(start + (to - start) * (1 - Math.pow(1 - p, 3)));
          el.textContent = String(val);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }

    function run(root) {
      // container'ı aç
      root.classList.add("is-on");

      const blocks = Array.from(root.querySelectorAll("[data-value]"));
      blocks.forEach((b) => {
        const v = clamp(Number(b.getAttribute("data-value") || "100"), 0, 100);
        const fill = b.querySelector(".kc-meter-bar .fill, .bar .fill");
        if (fill) {
          // küçük gecikme ile daha iyi animasyon
          window.setTimeout(() => {
            fill.style.width = v + "%";
          }, 60);
        }
      });

      animateCounts(root);
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      sections.forEach(run);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.22 }
    );

    sections.forEach((s) => io.observe(s));
  }


  
  // ---------------------------
  // Sparkline (Etki grafiği)
  // ---------------------------
  function initSparkline() {
    const cards = document.querySelectorAll("[data-kc-impact-card]");
    if (!cards.length) return;

    function animate(svg) {
      const line = svg.querySelector(".line");
      const area = svg.querySelector(".area");
      if (!line || !line.getTotalLength) return;

      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);

      if (area) area.style.opacity = "0";

      const dur = prefersReducedMotion() ? 0 : 900;
      const t0 = performance.now();

      function tick(now) {
        const p = dur === 0 ? 1 : clamp((now - t0) / dur, 0, 1);
        // easeOutCubic
        const e = 1 - Math.pow(1 - p, 3);

        line.style.strokeDashoffset = String(Math.round((1 - e) * len));
        if (area) area.style.opacity = String(0.15 * e);

        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function run(card) {
      card.classList.add("is-on");
      const svg = card.querySelector("[data-kc-spark]");
      if (svg) animate(svg);
    }

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      cards.forEach(run);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          run(e.target);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((c) => io.observe(c));
  }

// ---------------------------
  // 1) Marquee: sonsuz akış için içerik çoğaltma
  // ---------------------------
  function initMarquee() {
    const marquees = document.querySelectorAll("[data-kc-marquee]");
    if (!marquees.length) return;

    marquees.forEach((m) => {
      const track = m.querySelector(".kc-marquee-track");
      if (!track || track.dataset.kcCloned === "1") return;

      const children = Array.from(track.children);
      children.forEach((node) => track.appendChild(node.cloneNode(true)));
      track.dataset.kcCloned = "1";

      if (prefersReducedMotion()) {
        track.style.animation = "none";
        track.style.transform = "none";
      }
    });
  }

  // ---------------------------
  // 2) Case Tabs: küçük, stabil tab sistemi
  // ---------------------------
  function initCaseTabs() {
    const wrap = document.querySelector(".kc-case-tabs");
    const panelsWrap = document.querySelector(".kc-case-panels");
    if (!wrap || !panelsWrap) return;

    const tabs = Array.from(wrap.querySelectorAll("[data-kc-tab]"));
    const panels = Array.from(panelsWrap.querySelectorAll("[data-kc-panel]"));

    function activate(key) {
      tabs.forEach((t) => {
        const active = t.dataset.kcTab === key;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });

      panels.forEach((p) => {
        const active = p.dataset.kcPanel === key;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
    }

    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-kc-tab]");
      if (!btn) return;
      activate(btn.dataset.kcTab);
    });

    const firstActive = tabs.find((t) => t.classList.contains("is-active")) || tabs[0];
    if (firstActive) activate(firstActive.dataset.kcTab);
  }

  // ---------------------------
  // 3) Tilt: mikro etkileşim (hover'da hafif 3D)
  // ---------------------------
  function initTilt() {
    if (prefersReducedMotion()) return;

    const items = document.querySelectorAll("[data-kc-tilt]");
    if (!items.length) return;

    const MAX = 8; // derece

    items.forEach((el) => {
      let raf = null;

      function onMove(ev) {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        const rx = (0.5 - py) * MAX * 2;
        const ry = (px - 0.5) * MAX * 2;

        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--kc-rx", rx.toFixed(2) + "deg");
          el.style.setProperty("--kc-ry", ry.toFixed(2) + "deg");
          // cursor glow vars (used by several KC components)
          el.style.setProperty("--mx", (px * 100).toFixed(2) + "%");
          el.style.setProperty("--my", (py * 100).toFixed(2) + "%");
        });
      }

      function onLeave() {
        if (raf) cancelAnimationFrame(raf);
        el.style.setProperty("--kc-rx", "0deg");
        el.style.setProperty("--kc-ry", "0deg");
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      }

      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
    });
  }

  // ---------------------------
  // ---------------------------
  // 4) Before / After Compare
  // ---------------------------
  function initCompare() {
    const roots = document.querySelectorAll("[data-kc-compare]");
    if (!roots.length) return;

    roots.forEach((root) => {
      const range = root.querySelector("[data-kc-compare-range]");
      const overlay = root.querySelector("[data-kc-compare-overlay]");
      if (!range || !overlay) return;

      function apply() {
        const v = clamp(Number(range.value || 0), 0, 100);
        overlay.style.width = v + "%";
      }

      range.addEventListener("input", apply, { passive: true });
      apply();
    });
  }

  // ---------------------------
  // 5) Playground (Ana sayfa)

// ---------------------------
function initPlayground() {
  const root = document.querySelector("[data-kc-play]");
  const toggles = document.querySelector("[data-kc-play-toggles]");
  if (!root || !toggles) return;

  const impactEl = root.querySelector("[data-kc-play-impact]");
  const actionsEl = root.querySelector("[data-kc-play-actions]");

  const bulletEls = Array.from(document.querySelectorAll("[data-kc-play-b]"));
  const metricScore = root.querySelector('[data-kc-metric="score"]');
  const metricTime = root.querySelector('[data-kc-metric="time"]');
  const metricMsgs = root.querySelector('[data-kc-metric="msgs"]');
  const navPills = Array.from(root.querySelectorAll(".kc-play-nav .pill"));

  const kpisWrap = root.querySelector(".kc-play-kpis");
  const kpiCards = kpisWrap ? Array.from(kpisWrap.querySelectorAll("[data-kc-meter]")) : [];

  const btns = Array.from(toggles.querySelectorAll("[data-kc-mode]"));

  const content = {
    speed: {
      impact: "Ziyaretçi beklemez; sayfa hızlı açılır.",
      actions: "Görselleri sıkıştırır, cache ayarlar, gereksiz dosyaları azaltırım.",
      bullets: [
        "Önce ölçerim: hangi dosya yavaşlatıyor, nerede tıkanıyor?",
        "Görsel/font yükünü toparlar, kritik yükleme sırasını düzeltirim.",
        "Sayfanın daha hızlı ve akıcı açılmasını sağlayan iyileştirmeleri uygularım.",
        "Mobilde dokunma alanlarını ve akışı düzenlerim.",
        "Son kontrolde rapor + net yapılacaklar listesi bırakırım.",
        "CTA’yı bozmadan hız + kullanım dengesini kurarım.",
      ],
      metrics: { score: "100", time: "1.1s", msgs: "+10%" },
      navOn: 0,
      cls: "is-mode-speed",
      activeKpi: "mobile",
    },
    ui: {
      impact: "Site daha premium görünür; güven verir.",
      actions: "Tipografi/boşlukları düzenler, bileşenleri tek dilde toplarım.",
      bullets: [
        "Başlık‑metin hiyerarşisini temizlerim (göz nereye bakacak belli olsun).",
        "Buton/kart gibi parçaları tek tasarım sistemine bağlarım.",
        "Renk ve gölge dengesini modernleştiririm (2026 uyumlu).",
        "Mobilde de premium hissi korurum.",
        "Görsel kalabalığı azaltır, mesajı büyütürüm.",
        "Son dokunuş: micro‑animasyonlar (abartmadan).",
      ],
      metrics: { score: "100", time: "1.4s", msgs: "+12%" },
      navOn: 1,
      cls: "is-mode-ui",
      activeKpi: "readability",
    },
    cta: {
      impact: "Daha çok kişi size mesaj bırakır.",
      actions: "CTA’yı netleştirir, formu kısaltır, metinleri anlaşılır yaparım.",
      bullets: [
        "Tek bir ana hedef belirlerim (teklif/iletişim).",
        "Buton metinlerini “ne olacak?” sorusuna cevap verecek hale getiririm.",
        "Formu sadeleştiririm (gereksiz alanları kaldırırım).",
        "Mobilde tek elle doldurulacak akış kurarım.",
        "Spam önlemi + doğrulama eklerim.",
        "Ölçüm (GA4 event) ile “kaç kişi tıkladı?”yı görünür yaparım.",
      ],
      metrics: { score: "100", time: "1.3s", msgs: "+25%" },
      navOn: 2,
      cls: "is-mode-cta",
      activeKpi: "readability",
    },
    readability: {
      impact: "Herkesin anlayacağı bir akış kurulur.",
      actions: "Tipografi, kontrast ve içerik düzeniyle mesajı netleştiririm.",
      bullets: [
        "Başlıkları kısa ve net yaparım (jargon yok).",
        "Okuma ritmini düzeltirim (satır aralığı, genişlik, boşluk).",
        "Kontrastı yükseltirim (göz yormasın).",
        "İçerik bloklarını mantıklı sıraya dizerim.",
        "İlk izlenim için “5 saniyelik” mesajı sabitlerim.",
        "CTA’yı metnin içine yedirir, yönlendiririm.",
      ],
      metrics: { score: "100", time: "1.4s", msgs: "+15%" },
      navOn: 1,
      cls: "is-mode-readability",
      activeKpi: "readability",
    },
    mobile: {
      impact: "Mobilde her şey yerli yerinde çalışır.",
      actions: "Dokunma alanı, hız ve layout dengesini mobilde kusursuzlaştırırım.",
      bullets: [
        "Tek elle kullanım kurgularım (CTA aşağıda da görünür).",
        "Görsel yükünü mobil odaklı optimize ederim.",
        "Sticky/menü davranışını “rahatsız etmeyecek” hale getiririm.",
        "Form alanlarını büyük ve rahat yaparım.",
        "Hareketleri azaltır, performansı artırırım.",
        "Mobil test: farklı cihazlarda kontrol ederim.",
      ],
      metrics: { score: "100", time: "1.2s", msgs: "+18%" },
      navOn: 0,
      cls: "is-mode-mobile",
      activeKpi: "mobile",
    },
    maintenance: {
      impact: "Site büyütmek kolaylaşır; dağılmaz.",
      actions: "Modüler yapı, temiz sınıf isimleri ve düzenli dosya mantığı kurarım.",
      bullets: [
        "Bileşenleri parçalara ayırırım (hero, kart, buton, form…).",
        "Sınıf isimlerini standardize ederim (okunur ve tekrar kullanılabilir).",
        "Kısa bir dokümantasyon bırakırım (neresi nerede?).",
        "Yeni sayfa ekleme akışını kolaylaştırırım.",
        "Gereksiz bağımlılıkları azaltırım.",
        "Teslim: hızlı devralınabilir bir yapı.",
      ],
      metrics: { score: "100", time: "1.4s", msgs: "+8%" },
      navOn: 2,
      cls: "is-mode-maintenance",
      activeKpi: "maintenance",
    },
  };

  function setNav(onIndex) {
    navPills.forEach((p, i) => p.classList.toggle("is-on", i === onIndex));
  }

  function setMode(mode) {
    const c = content[mode] || content.speed;

    root.classList.remove(
      "is-mode-speed",
      "is-mode-ui",
      "is-mode-cta",
      "is-mode-readability",
      "is-mode-mobile",
      "is-mode-maintenance"
    );
    root.classList.add(c.cls);

    if (impactEl) impactEl.textContent = c.impact;
    if (actionsEl) actionsEl.textContent = c.actions;

    // bullets
    bulletEls.forEach((el) => {
      const idx = Number(el.getAttribute("data-kc-play-b") || "0");
      if (c.bullets[idx]) el.textContent = c.bullets[idx];
    });

    // metrics
    if (metricScore) metricScore.textContent = c.metrics.score;
    if (metricTime) metricTime.textContent = c.metrics.time;
    if (metricMsgs) metricMsgs.textContent = c.metrics.msgs;

    // nav
    setNav(c.navOn);

    // KPI highlight
    if (kpisWrap) {
      kpisWrap.classList.add("is-on");
      kpiCards.forEach((k) => {
        const key = (k.dataset.kcMeterKey || "").trim();
        k.classList.toggle("is-active", key === c.activeKpi);
      });
    }

    btns.forEach((b) => {
      const active = b.dataset.kcMode === mode;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  toggles.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-kc-mode]");
    if (!btn) return;
    setMode(btn.dataset.kcMode);
  });

  // initial
  const first = btns.find((b) => b.classList.contains("is-active")) || btns[0];
  setMode(first ? first.dataset.kcMode : "speed");

  if (prefersReducedMotion()) root.classList.add("is-reduced-motion");
}

// ---------------------------
// 6) Senaryo Planı (Ana sayfa)
// ---------------------------
function initScenarios() {
  const list = document.querySelector("[data-kc-scenarios]");
  const preview = document.querySelector("[data-kc-scenario-preview]");
  const card = document.querySelector("[data-kc-scenario-card]");
  if (!list || !preview || !card) return;

  const btns = Array.from(list.querySelectorAll("[data-kc-scenario]"));

  // Preview elements (left)
  const pTitle = preview.querySelector("[data-kc-preview-title]");
  const pDesc = preview.querySelector("[data-kc-preview-desc]");
  const pBullets = preview.querySelector("[data-kc-preview-bullets]");
  const pGoal = preview.querySelector("[data-kc-preview-goal]");
  const pTime = preview.querySelector("[data-kc-preview-time]");

  // Card elements (right)
  const cTitle = card.querySelector("[data-kc-scenario-title]");
  const cTime = card.querySelector("[data-kc-scenario-time]");
  const cGoal = card.querySelector("[data-kc-scenario-goal]");
  const cGoal2 = card.querySelector("[data-kc-scenario-goal2]");
  const cFocus = card.querySelector("[data-kc-scenario-focus]");
  const cFocus2 = card.querySelector("[data-kc-scenario-focus2]");
  const cSteps = card.querySelector("[data-kc-scenario-steps]");
  const cNeed = card.querySelector("[data-kc-scenario-need]");
  const cOut = card.querySelector("[data-kc-scenario-out]");
  const copyBtn = card.querySelector("[data-kc-scenario-copy]");

  const DATA = {
    speed: {
      previewTitle: "Site yavaş açılıyor",
      previewDesc: "Ziyaretçi beklerse sayfadan çıkabilir. Önce “neyin yavaşlattığını” tespit eder, sonra hızlı ve güvenli iyileştirmeleri uygularım.",
      previewBullets: [
        "Gereksiz yükleri azaltırım (sayfa hafifler).",
        "Mobilde açılışı ve tıklamaları rahatlatırım.",
        "Önce/sonra sonucu size net gösteririm.",
      ],
      time: "1–2 hafta",
      goal: "Ziyaretçi beklemeden sayfayı görsün.",
      goal2: "Hızlı açılış, güven hissini artırır.",
      focus: "Hız + mobil akıcılık",
      focus2: "Öncelik: en çok etki eden 3 düzeltme.",
      steps: [
        { t: "Hedefi netleştiririz", s: "10 dakikada hedefi ve öncelikleri netleştiririz." },
        { t: "Hızlandırırım", s: "Sayfayı hafifletir, gereksiz yükleri temizlerim." },
        { t: "Test + teslim", s: "Her cihazda kontrol eder, kısa rapor bırakırım." },
      ],
      need: [
        "Site linki (varsa yönetim erişimi)",
        "En önemli hedef (mesaj/teklif/randevu)",
        "İletişim yolu tercihi (form/WhatsApp/telefon)",
      ],
      out: [
        "Yapılanlar listesi (sade ve anlaşılır)",
        "Önce/sonra karşılaştırma",
        "Yayın kontrolü",
        "Kısa kullanım notu (güncelleme kolay olsun)",
        "Destek: küçük revize penceresi",
      ],
    },

    clarity: {
      previewTitle: "Ne yaptığınız anlaşılmıyor",
      previewDesc: "Ziyaretçi 5 saniyede anlamazsa sayfadan çıkabilir. Mesajı sadeleştirir, sayfayı net bir akışa oturturum.",
      previewBullets: [
        "Başlıkları kısaltır, mesajı tek cümlede toplarım.",
        "Gözün akışını düzenlerim (boşluk / hiyerarşi).",
        "Buton metnini netleştiririm (ne olacak belli olsun).",
      ],
      time: "5–7 gün",
      goal: "Ziyaretçi hemen anlasın ve güven duysun.",
      goal2: "Net anlatım = daha doğru müşteri.",
      focus: "İçerik + düzen + güven",
      focus2: "Jargon yok; herkesin anlayacağı dil.",
      steps: [
        { t: "Mesajı sadeleştiririm", s: "“Ne yapıyorsunuz?” sorusuna net cevap." },
        { t: "Sayfayı düzenlerim", s: "Başlıklar, metin ve görseller uyumlu olur." },
        { t: "Kontrol + teslim", s: "Son okuma, mobil kontrol ve küçük dokunuşlar." },
      ],
      need: [
        "Kime hizmet veriyorsunuz? (1 cümle)",
        "Ziyaretçi sizden ne yapsın? (iletişim/teklif)",
        "Beğendiğiniz 1–2 örnek (varsa)",
      ],
      out: [
        "Yenilenmiş içerik akışı",
        "Daha okunur başlık/metin düzeni",
        "Güven veren bloklar (süreç/teslimat)",
        "Daha net yönlendirme (butonlar)",
        "Yayın kontrolü",
      ],
    },

    leads: {
      previewTitle: "Daha çok mesaj gelsin",
      previewDesc: "İletişim akışı net değilse ziyaretçi vazgeçebilir. Birincil hedefi seçip akışı sadeleştiririm.",
      previewBullets: [
        "En önemli butonu öne çıkarırım (kafa karışmaz).",
        "Formu kısaltırım (kolay doldurulur).",
        "WhatsApp/telefon gibi seçenekleri doğru yerde sunarım.",
      ],
      time: "5–7 gün",
      goal: "Mesaj/teklif almak daha kolay olsun.",
      goal2: "Daha az adım = daha çok dönüş.",
      focus: "Yönlendirme + form akışı",
      focus2: "Tek hedef: iletişim akışı sorunsuz çalışsın.",
      steps: [
        { t: "Tek hedef belirleriz", s: "Mesaj mı, teklif mi? Birini öne alırız." },
        { t: "Yolu sadeleştiririm", s: "Buton, form ve metinleri netleştiririm." },
        { t: "Test + ölçüm", s: "Tıklamalar/mesajlar çalışıyor mu kontrol ederim." },
      ],
      need: [
        "İletişim kanalı (form/WhatsApp/telefon)",
        "Mesajda hangi bilgileri almak istiyorsunuz? (2–3 madde)",
        "Varsa mevcut form/link",
      ],
      out: [
        "Net CTA düzeni",
        "Kısa ve rahat form",
        "İletişim blokları (WhatsApp/telefon)",
        "Test: tüm linkler ve formlar",
        "Kısa öneri listesi (sonraki adımlar)",
      ],
    },

    mobile: {
      previewTitle: "Mobilde dağınık duruyor",
      previewDesc: "Mobilde kaydırma, tıklama ve okuma zor olunca dönüşüm düşer. Mobil deneyimi baştan sona iyileştiririm.",
      previewBullets: [
        "Butonları ve boşlukları mobil için yeniden kurarım.",
        "Metinleri daha okunur hale getiririm.",
        "Formları tek elle kullanıma uygun yaparım.",
      ],
      time: "5–10 gün",
      goal: "Mobilde her şey düzgün ve rahat çalışsın.",
      goal2: "Telefon kullanıcıları “rahat” hisseder.",
      focus: "Mobil düzen + tıklanabilirlik",
      focus2: "Her cihazda kontrollü görünüm.",
      steps: [
        { t: "Mobil kontrol", s: "Sorunlu alanları tek tek işaretlerim." },
        { t: "Düzenleme", s: "Grid/boşluk/butonları mobil için düzeltirim." },
        { t: "Son test", s: "Farklı ekranlarda kontrol edip teslim ederim." },
      ],
      need: [
        "Sorun yaşadığınız 2–3 ekran görüntüsü (varsa)",
        "En önemli sayfa hangisi?",
        "İletişim hedefi (mesaj/teklif)",
      ],
      out: [
        "Mobil düzen revizesi",
        "Buton ve form iyileştirmesi",
        "Okunabilirlik düzeni",
        "Cihaz kontrol listesi",
        "Yayın sonrası kısa kontrol",
      ],
    },

    maintenance: {
      previewTitle: "Güncellemek zor",
      previewDesc: "Yeni içerik eklerken site dağılmasın. Düzenli bir yapı kurup bakım maliyetini düşürürüm.",
      previewBullets: [
        "Bölümleri daha düzenli hale getiririm.",
        "Tekrarlanan parçaları standartlaştırırım.",
        "Kısa bir kullanım notu bırakırım.",
      ],
      time: "1–2 hafta",
      goal: "Yeni içerik eklemek kolay olsun, site dağılmasın.",
      goal2: "Bakım kolaylığı = uzun vadede rahatlık.",
      focus: "Düzenli yapı + kullanım kolaylığı",
      focus2: "Dosyalar ve alanlar daha anlaşılır olur.",
      steps: [
        { t: "Düzenleme", s: "Bölümleri temizler, tekrarları azaltırım." },
        { t: "Standartlaştırma", s: "Buton/kart gibi parçalar tek dile gelir." },
        { t: "Not bırakma", s: "Neresi nerede? Kısa bir rehber yazarım." },
      ],
      need: [
        "Hangi alanları siz güncelliyorsunuz?",
        "Sık değişen içerikler (yazılar, hizmetler vb.)",
        "Gerekirse mevcut dosyalar/hosting bilgisi",
      ],
      out: [
        "Daha düzenli sayfa yapısı",
        "Standart bileşenler (buton/kart)",
        "Kısa kullanım notu",
        "Küçük iyileştirme listesi",
        "Yayın kontrolü",
      ],
    },
  };

  function renderList(el, items) {
    if (!el) return;
    el.innerHTML = "";
    (items || []).forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      el.appendChild(li);
    });
  }

  function renderSteps(el, steps) {
    if (!el) return;
    el.innerHTML = "";
    (steps || []).forEach((st, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="n">${idx + 1}</span>
        <div><strong>${st.t}</strong><span>${st.s}</span></div>
      `.trim();
      el.appendChild(li);
    });
  }

  function setActive(key) {
    const d = DATA[key] || DATA.speed;

    btns.forEach((b) => {
      const active = b.dataset.kcScenario === key;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    // Preview
    if (pTitle) pTitle.textContent = d.previewTitle;
    if (pDesc) pDesc.textContent = d.previewDesc;
    renderList(pBullets, d.previewBullets);
    if (pGoal) pGoal.textContent = d.goal;
    if (pTime) pTime.textContent = d.time;

    // Card
    if (cTitle) cTitle.textContent = (btns.find((b) => b.dataset.kcScenario === key)?.querySelector(".s")?.textContent || d.previewTitle);
    if (cTime) cTime.textContent = d.time;
    if (cGoal) cGoal.textContent = d.goal;
    if (cGoal2) cGoal2.textContent = d.goal2;
    if (cFocus) cFocus.textContent = d.focus;
    if (cFocus2) cFocus2.textContent = d.focus2;

    renderSteps(cSteps, d.steps);
    renderList(cNeed, d.need);
    renderList(cOut, d.out);

    card.dataset.kcScenario = key;
  }

  // Click list
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-kc-scenario]");
    if (!btn) return;
    setActive(btn.dataset.kcScenario || "speed");
  });

  // Copy
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const key = card.dataset.kcScenario || "speed";
      const d = DATA[key] || DATA.speed;

      const text = [
        `Örnek Plan — ${d.previewTitle}`,
        "",
        `Sizin hedefiniz: ${d.goal}`,
        `Benim odağım: ${d.focus}`,
        "",
        "3 adımda ilerleriz:",
        ...d.steps.map((s, i) => `${i + 1}) ${s.t} — ${s.s}`),
        "",
        "Sizden isteyeceğim 3 şey:",
        ...d.need.map((s) => `- ${s}`),
        "",
        "Size bırakacağım çıktılar:",
        ...d.out.map((s) => `- ${s}`),
        "",
        "Not: Bu bir örnektir. Projenize göre 10 dakikada netleştiririm.",
      ].join("\n").trim();

      try {
        await navigator.clipboard.writeText(text);
        const old = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı';
        setTimeout(() => (copyBtn.innerHTML = old), 1200);
      } catch (_) {}
    });
  }

  // initial
  const first = btns.find((b) => b.classList.contains("is-active")) || btns[0];
  setActive(first ? first.dataset.kcScenario : "speed");
}

function initImpactDashboard() {
  const root = document.querySelector("[data-kc-impact-dashboard]");
  if (!root) return;

  const btns = Array.from(root.querySelectorAll("[data-kc-impact-mode]"));
  const noteEl = root.querySelector("[data-kc-impact-note]");
  const copyBtn = root.querySelector("[data-kc-impact-copy]");

  const metricEls = {
    messages: root.querySelector('[data-kc-metric="messages"]'),
    mobile: root.querySelector('[data-kc-metric="mobile"]'),
    update: root.querySelector('[data-kc-metric="update"]'),
  };

  const svg = root.querySelector("svg.kc-spark");
  const area = svg ? svg.querySelector("path.area") : null;
  const line = svg ? svg.querySelector("path.line") : null;
  const dots = svg ? svg.querySelector("[data-kc-dots]") : null;
  const chartSub = root.querySelector("[data-kc-chart-sub]");

  const MODES = {
    revize: {
      label: "Mevcut siteyi toparlama",
      note:
        "Mevcut yapıyı bozmadan toparlarım: mesajı sadeleştirir, mobil düzeni düzeltir ve güncellemeyi kolaylaştırırım.",
      metrics: { messages: [4, 9], mobile: [6, 8], update: [25, 8] },
      series: [4, 5, 6, 7, 8, 9],
    },
    new: {
      label: "Sıfırdan yeni site",
      note:
        "Sıfırdan tasarladığımızda iş daha hızlı büyür: mesaj yolu çok net olur, mobil deneyim daha premium hisseder ve bakım daha kolay olur.",
      metrics: { messages: [4, 12], mobile: [6, 9], update: [25, 5] },
      series: [4, 6, 7, 9, 10, 12],
    },
  };

  function animateNumber(el, to, dur) {
    if (!el) return;
    const from = prefersReducedMotion() ? to : Number(el.textContent || "0");
    const ms = prefersReducedMotion() ? 0 : (dur || 650);
    const t0 = performance.now();

    function tick(now) {
      const p = ms === 0 ? 1 : clamp((now - t0) / ms, 0, 1);
      const v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      el.textContent = String(v);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function setMetric(key, beforeVal, afterVal) {
    const m = metricEls[key];
    if (!m) return;
    const beforeEl = m.querySelector("[data-kc-before]");
    const afterEl = m.querySelector("[data-kc-after]");
    animateNumber(beforeEl, beforeVal, 520);
    animateNumber(afterEl, afterVal, 700);
  }

  function buildPath(values) {
    const w = 520, h = 160;
    const pad = { l: 22, r: 18, t: 18, b: 26 };
    const n = values.length;

    const minV = Math.min.apply(null, values);
    const maxV = Math.max.apply(null, values);
    const range = maxV - minV || 1;

    const xs = [];
    const ys = [];
    for (let i = 0; i < n; i++) {
      const x = pad.l + (i * (w - pad.l - pad.r)) / (n - 1);
      const y = pad.t + ((maxV - values[i]) * (h - pad.t - pad.b)) / range;
      xs.push(x);
      ys.push(y);
    }

    // line
    let dLine = `M ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < n; i++) dLine += ` L ${xs[i]} ${ys[i]}`;

    // area
    const yBase = h - pad.b;
    let dArea = `M ${xs[0]} ${yBase} L ${xs[0]} ${ys[0]}`;
    for (let i = 1; i < n; i++) dArea += ` L ${xs[i]} ${ys[i]}`;
    dArea += ` L ${xs[n - 1]} ${yBase} Z`;

    return { dLine, dArea, xs, ys };
  }

  function renderSpark(values) {
    if (!svg || !area || !line) return;
    const { dLine, dArea, xs, ys } = buildPath(values);

    area.setAttribute("d", dArea);
    line.setAttribute("d", dLine);

    // dots
    if (dots) {
      dots.innerHTML = "";
      for (let i = 0; i < xs.length; i++) {
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", String(xs[i]));
        c.setAttribute("cy", String(ys[i]));
        c.setAttribute("r", i === xs.length - 1 ? "5" : "4");
        c.setAttribute("class", i === 0 ? "pt is-before" : i === xs.length - 1 ? "pt is-after" : "pt");
        dots.appendChild(c);
      }
    }

    if (prefersReducedMotion()) return;

    // animate line draw
    try {
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      line.getBoundingClientRect(); // reflow
      line.style.transition = "stroke-dashoffset 900ms cubic-bezier(.2,.8,.2,1)";
      line.style.strokeDashoffset = "0";

      if (dots) {
        dots.style.opacity = "0";
        dots.style.transition = "opacity 450ms ease";
        setTimeout(() => (dots.style.opacity = "1"), 320);
      }
    } catch (_) {}
  }

  function applyMode(modeKey) {
    const d = MODES[modeKey] || MODES.revize;
    root.dataset.kcImpactMode = modeKey;

    btns.forEach((b) => {
      const active = b.dataset.kcImpactMode === modeKey;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (noteEl) noteEl.textContent = d.note;

    setMetric("messages", d.metrics.messages[0], d.metrics.messages[1]);
    setMetric("mobile", d.metrics.mobile[0], d.metrics.mobile[1]);
    setMetric("update", d.metrics.update[0], d.metrics.update[1]);

    renderSpark(d.series);

    if (chartSub) chartSub.textContent = "4 hafta içinde";
  }

  // toggle click
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-kc-impact-mode]");
    if (!btn) return;
    applyMode(btn.dataset.kcImpactMode || "revize");
  });

  // copy
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const mode = root.dataset.kcImpactMode || "revize";
      const d = MODES[mode] || MODES.revize;

      const text = [
        `Etki Özeti — ${d.label}`,
        "",
        `Haftalık mesaj: ${d.metrics.messages[0]} → ${d.metrics.messages[1]}`,
        `Mobil rahatlık: ${d.metrics.mobile[0]}/10 → ${d.metrics.mobile[1]}/10`,
        `Güncelleme süresi: ${d.metrics.update[0]} dk → ${d.metrics.update[1]} dk`,
        "",
        d.note,
        "",
        "Not: Değerler örnektir; hedefinize göre netleştiririm.",
      ].join("\n").trim();

      try {
        await navigator.clipboard.writeText(text);
        const old = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Kopyalandı';
        setTimeout(() => (copyBtn.innerHTML = old), 1200);
      } catch (_) {}
    });
  }

  // initial
  applyMode("revize");
}

// ---------------------------
  // 7) Mini Accordion (Ana sayfa): özet kartlarını aç-kapa yönetiyorum
  // ---------------------------
  function initMiniAccordion() {
    const wrap = document.querySelector("[data-kc-accordion]");
    if (!wrap) return;

    const items = Array.from(wrap.querySelectorAll(".kc-acc-item"));
    if (!items.length) return;

    function openItem(item) {
      items.forEach((it) => {
        const isTarget = it === item;
        it.classList.toggle("is-open", isTarget);
        it.setAttribute("aria-expanded", isTarget ? "true" : "false");
      });
    }

    wrap.addEventListener("click", (e) => {
      const item = e.target.closest(".kc-acc-item");
      if (!item) return;
      const already = item.classList.contains("is-open");
      if (already) {
        item.classList.remove("is-open");
        item.setAttribute("aria-expanded", "false");
        return;
      }
      openItem(item);
    });

    // initial
    const firstOpen = items.find((i) => i.classList.contains("is-open")) || items[0];
    if (firstOpen) openItem(firstOpen);
  }

  // ---------------------------
  // 8) İletişim Stüdyosu (Contact)
  // ---------------------------
  // Teklif/brief stüdyosu: ihtiyaçları topluyor, net bir mail taslağı çıkarıyorum.

  function initContactStudio() {
    const root = document.querySelector("[data-kc-studio]");
    const chat = document.querySelector("[data-kc-chat]");
    if (!root || !chat) return;

    const youEl = chat.querySelector("[data-kc-you]");
    const meEl = chat.querySelector("[data-kc-me]");
    const copyBtn = chat.querySelector("[data-kc-copy]");
    const mailBtn = chat.querySelector("[data-kc-mail]");
    const sendBtn = chat.querySelector("[data-kc-send]");
    const fillBtn = chat.querySelector("[data-kc-fill]");
    const shortBtn = chat.querySelector("[data-kc-short]");
    const statusEl = chat.querySelector("[data-kc-status]");

    let isSending = false;

    const preview = {
      subject: chat.querySelector("[data-kc-preview-subject]"),
      to: chat.querySelector("[data-kc-preview-to]"),
      from: chat.querySelector("[data-kc-preview-from]"),
      body: chat.querySelector("[data-kc-preview-body]"),
    };

    const fields = {
      typeWrap: chat.querySelector('[data-kc-field="type"]'),
      needsWrap: chat.querySelector('[data-kc-field="needs"]'),
      prioritiesWrap: chat.querySelector('[data-kc-field="priorities"]'),
      deadlineWrap: chat.querySelector('[data-kc-field="deadline"]'),
      pagesWrap: chat.querySelector('[data-kc-field="pages"]'),
      langWrap: chat.querySelector('[data-kc-field="lang"]'),
      contentWrap: chat.querySelector('[data-kc-field="content"]'),
      budgetWrap: chat.querySelector('[data-kc-field="budget"]'),
      goal: chat.querySelector('[data-kc-field="goal"]'),
      notes: chat.querySelector('[data-kc-field="notes"]'),
      url: chat.querySelector('[data-kc-field="url"]'),
      scopeWrap: chat.querySelector('[data-kc-field="scope"]'),
      name: chat.querySelector('[data-kc-field="name"]'),
      company: chat.querySelector('[data-kc-field="company"]'),
      from: chat.querySelector('[data-kc-field="from"]'),      phone: chat.querySelector('[data-kc-field="phone"]'),
      // v23: details pane
      templateWrap: chat.querySelector('[data-kc-field="template"]'),
      toneWrap: chat.querySelector('[data-kc-field="tone"]'),
      audience: chat.querySelector('[data-kc-field="audience"]'),
      refs: chat.querySelector('[data-kc-field="refs"]'),
      integrations: chat.querySelector('[data-kc-field="integrations"]'),
      pagesList: chat.querySelector('[data-kc-field="pagesList"]'),
      questionsWrap: chat.querySelector('[data-kc-field="questions"]'),
    };

    const emailTo = (root.dataset.kcEmail || "info.cankaroglu@gmail.com").trim();

    const emailjsPublic = (root.dataset.kcEmailjsPublic || "").trim();
    const emailjsService = (root.dataset.kcEmailjsService || "").trim();
    const emailjsTemplate = (root.dataset.kcEmailjsTemplate || "").trim();

    const impact = {
      briefScore: root.querySelector("[data-kc-brief-score]"),
      ring: root.querySelector("[data-kc-ring]"),
      ringLabel: root.querySelector("[data-kc-ring-label]"),
      focus: root.querySelector("[data-kc-focus]"),
      focusDesc: root.querySelector("[data-kc-focus-desc]"),
      missingList: root.querySelector("[data-kc-missing-list]"),
      roadmap: root.querySelector("[data-kc-roadmap]"),
      estimate: root.querySelector("[data-kc-estimate]"),
      deliver: root.querySelector("[data-kc-deliver]"),
      wins: root.querySelector("[data-kc-wins]"),
      risks: root.querySelector("[data-kc-risks]"),
    };


    // --- v22: Mobile view tabs (Brief / Mail / A+) ---
    const viewBtns = Array.from(chat.querySelectorAll("[data-kc-view-btn]"));
    if (viewBtns.length) {
      const setView = (v) => {
        chat.setAttribute("data-kc-view", v);
        viewBtns.forEach((b) => {
          const on = (b.getAttribute("data-kc-view-btn") || "") === v;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
      };

      viewBtns.forEach((b) => {
        b.addEventListener("click", () => setView(b.getAttribute("data-kc-view-btn") || "builder"));
      });

      // initial
      setView(chat.getAttribute("data-kc-view") || "builder");
    }


    function canEmailJS() {
      return !!(window.emailjs && emailjsPublic && emailjsService && emailjsTemplate &&
        emailjsPublic !== "YOUR_PUBLIC_KEY" && emailjsService !== "YOUR_SERVICE_ID" && emailjsTemplate !== "YOUR_TEMPLATE_ID");
    }

    function initEmailJS() {
      try {
        if (!canEmailJS()) return false;
        if (window.__kcEmailjsInit) return true;
        window.emailjs.init({ publicKey: emailjsPublic });
        window.__kcEmailjsInit = true;
        return true;
      } catch (_) {
        return false;
      }
    }

    function getActiveValue(wrap) {
      if (!wrap) return "";
      const btn = wrap.querySelector(".kc-chip.is-active") || wrap.querySelector(".kc-chip");
      return btn ? (btn.dataset.value || btn.textContent || "").trim() : "";
    }

    function setActiveValue(wrap, value) {
      if (!wrap) return;
      const btns = Array.from(wrap.querySelectorAll(".kc-chip"));
      btns.forEach((b) => {
        const v = (b.dataset.value || b.textContent || "").trim();
        const active = v === value;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    function getScopeSelected() {
      if (!fields.scopeWrap) return [];
      const inputs = Array.from(fields.scopeWrap.querySelectorAll('input[type="checkbox"]'));
      return inputs
        .filter((i) => i.checked)
        .map((i) => (i.value || "").trim())
        .filter(Boolean);
    }

    


    function getQuestionsSelected() {
      if (!fields.questionsWrap) return [];
      const inputs = Array.from(fields.questionsWrap.querySelectorAll('input[type="checkbox"]'));
      return inputs
        .filter((i) => i.checked)
        .map((i) => (i.value || '').trim())
        .filter(Boolean);
    }

    function parseCommaList(v) {
      const t = String(v || '').trim();
      if (!t) return [];
      return t
        .split(/\n|,|;/g)
        .map((x) => x.trim())
        .filter(Boolean)
        .slice(0, 10);
    }

    function readSelectedChips(wrap) {
      if (!wrap) return [];
      const btns = Array.from(wrap.querySelectorAll(".kc-chip"));
      return btns
        .filter((b) => b.classList.contains("is-selected"))
        .map((b) => (b.dataset.value || b.textContent || "").trim())
        .filter(Boolean);
    }

    function setSelectedChip(btn, on) {
      if (!btn) return;
      btn.classList.toggle("is-selected", !!on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
// ---- priorities (multi, ordered) ----
    function readPriorityOrder() {
      if (!fields.prioritiesWrap) return [];
      const btns = Array.from(fields.prioritiesWrap.querySelectorAll(".kc-chip"));
      const selected = btns
        .filter((b) => b.classList.contains("is-selected"))
        .map((b) => {
          const v = (b.dataset.value || b.textContent || "").trim();
          const o = parseInt(b.getAttribute("data-order") || "0", 10) || 0;
          return { v, o, el: b };
        })
        .filter((x) => x.v);

      // Sort by existing order; if none, keep DOM order
      selected.sort((a, b) => {
        if (a.o && b.o) return a.o - b.o;
        if (a.o && !b.o) return -1;
        if (!a.o && b.o) return 1;
        return 0;
      });

      return selected.map((x) => x.v);
    }

    function writePriorityOrder(values) {
      if (!fields.prioritiesWrap) return;
      const btns = Array.from(fields.prioritiesWrap.querySelectorAll(".kc-chip"));
      const set = new Set(values);

      const labels = ["1. Öncelik", "2. Öncelik", "3. Öncelik", "Sonra", "İsteğe bağlı"];

      btns.forEach((b) => {
        const v = (b.dataset.value || b.textContent || "").trim();
        const on = set.has(v);
        b.classList.toggle("is-selected", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.removeAttribute("data-order");
        b.removeAttribute("data-priority-label");
      });

      values.forEach((v, idx) => {
        const el = btns.find((b) => ((b.dataset.value || b.textContent || "").trim() === v));
        if (!el) return;
        el.setAttribute("data-order", String(idx + 1));
        el.setAttribute("data-priority-label", labels[idx] || `Öncelik ${idx + 1}`);
      });
    }

    const state = {
      type: getActiveValue(fields.typeWrap),
      needs: readSelectedChips(fields.needsWrap),
      deadline: getActiveValue(fields.deadlineWrap),
      pages: getActiveValue(fields.pagesWrap),
      lang: getActiveValue(fields.langWrap),
      content: getActiveValue(fields.contentWrap),
      budget: getActiveValue(fields.budgetWrap),
      goal: fields.goal ? fields.goal.value : "",
      notes: fields.notes ? fields.notes.value : "",
      url: fields.url ? fields.url.value : "",
      scope: getScopeSelected(),
      name: fields.name ? fields.name.value : "",
      company: fields.company ? fields.company.value : "",
      from: fields.from ? fields.from.value : "",
      phone: fields.phone ? fields.phone.value : "",
      template: getActiveValue(fields.templateWrap),
      tone: getActiveValue(fields.toneWrap),
      audience: fields.audience ? fields.audience.value : "",
      refs: fields.refs ? fields.refs.value : "",
      integrations: fields.integrations ? fields.integrations.value : "",
      pagesList: fields.pagesList ? fields.pagesList.value : "",
      questions: getQuestionsSelected(),
      priorities: readPriorityOrder(),
    };

    function primaryPriority() {
      return (state.priorities && state.priorities[0]) ? state.priorities[0] : "Site hızı & hızlı açılış";
    }

    function estimateTime() {
      const count = (state.scope || []).length;
      const type = (state.type || "").toLowerCase();

      let w = 1 + Math.ceil(count / 2);
      if (!count) w = 2;

      if (type.includes("yeni")) w += 2;
      if (type.includes("saas") || type.includes("uygulama")) w += 3;
      if (type.includes("e-ticaret")) w += 3;
      if (type.includes("panel") || type.includes("dashboard")) w += 2;
      if (type.includes("landing")) w = Math.max(1, w - 1);

      let range = "";
      if (w <= 1) range = "1 hafta";
      else if (w <= 2) range = "1–2 hafta";
      else if (w <= 3) range = "2–3 hafta";
      else if (w <= 4) range = "3–4 hafta";
      else if (w <= 6) range = "4–6 hafta";
      else range = "6–8 hafta";

      return range;
    }

    function computeBriefScore() {
      let s = 0;
      const add = (cond, pts) => { if (cond) s += pts; };

      add(!!(state.type && state.type.trim()), 10);
      add(((state.priorities || []).length > 0), 10);
      add(((state.needs || []).length > 0), 10);
      add(((state.goal || "").trim().length > 10), 15);
      add(!!(state.deadline && state.deadline.trim()), 8);
      add(!!(state.pages && state.pages.trim()), 4);
      add(!!(state.lang && state.lang.trim()), 4);
      add(!!(state.content && state.content.trim()), 6);
      add(((state.scope || []).length > 0), 12);
      add(!!(state.url && state.url.trim()), 7);
      add(!!(state.budget && state.budget.toLowerCase() !== "belirsiz"), 4);
      add(!!((state.name || "").trim() && (state.from || "").trim()), 6);
      add(((state.notes || "").trim().length > 8), 4);

      return clamp(Math.round(s), 0, 100);
    }

    function gradeFor(v) {
      const n = clamp(Number(v) || 0, 0, 100);
      if (n >= 92) return "A+";
      if (n >= 85) return "A";
      if (n >= 78) return "B+";
      if (n >= 70) return "B";
      return "C";
    }

    function focusKit(p1) {
      const t = String(p1 || "").toLowerCase();
      const goal = (state.goal || "").toLowerCase();
      const needs = (state.needs || []).join(" ").toLowerCase();
      const scope = (state.scope || []).join(" ").toLowerCase();

      // defaults
      let key = "content";
      let desc = "Kapsamı netleştirip önce hızlı kazanımları alalım, sonra ölçekleyelim.";
      let steps = [
        "Ön analiz (ölçüm + kontrol listesi) & kapsam netleştirme",
        "Hızlı kazanımlar (UI/akış/SEO) + temel düzenlemeler",
        "Test + yayına alma + sonraki sprint backlog’u",
      ];

      if (t.includes("hız") || t.includes("performans") || t.includes("cwv")) {
        key = "performance";
        desc = "Ölçüm → darboğaz analizi → site hızı & akıcılık + sürdürülebilir skor.";
        steps = [
          "Ölçüm: Lighthouse + WebPageTest + gerçek cihaz kontrolü",
          "Hızlı kazanımlar: görsel/font/cache + kritik istekler",
          "Kalıcı hız: JS/bundle azaltma + kritik yükleme yolu iyileştirme",
        ];
      } else if (t.includes("seo")) {
        key = "content";
        desc = "Bilgi mimarisi + heading düzeni + schema/sitemap ile indekslenebilirliği güçlendirelim.";
        steps = [
          "Sayfa kurgusu: içerik hiyerarşisi & başlık (H1-H3) düzeni",
          "Teknik SEO: title/meta, schema, sitemap/robots",
          "İçerik planı: ana sayfalar + blog/SSS (varsa) taslakları",
        ];
      } else if (t.includes("dönüş") || t.includes("cta")) {
        key = "conversion";
        desc = "CTA akışı + mikro metinler + form sadeleştirme ile teklif/randevu dönüşümünü artırırız.";
        steps = [
          "CTA haritası: ana aksiyonlar + microcopy revize",
          "Form/akış: adım azaltma + doğrulama + spam koruması",
          "Ölçüm: GA4/GTM event planı + hedef/funnel tanımı",
        ];
      } else if (t.includes("cms") || t.includes("bakım") || t.includes("güven")) {
        key = "maintenance";
        desc = "Bakımı kolay bir yapı kurup güncelleme/entegrasyonları güvenli hale getiririz.";
        steps = [
          "Teknik yapı: component system + modüler mimari",
          "CMS/entegrasyon: içerik modeli + akışlar + yetki",
          "Hardening: temel güvenlik kontrolleri + izleme",
        ];
      } else if (t.includes("premium") || t.includes("ui")) {
        key = "content";
        desc = "Tasarım sistemi + bileşen seti ile premium görünüm ve hızlı geliştirme sağlar.";
        steps = [
          "Design tokens: renk/typografi/spacing + grid",
          "Component system: buton/kart/form/section seti",
          "Motion & polish: micro-interactions + responsive detaylar",
        ];
      }

      // goal/needs hints
      if ((needs.includes("analitik") || scope.includes("analitik")) && !steps[2].toLowerCase().includes("ölçüm")) {
        steps[2] = "Ölçüm: GA4/GTM event planı + dashboard";
      }
      if ((goal.includes("randevu") || goal.includes("teklif")) && key !== "conversion") {
        // strengthen conversion step
        steps[1] = "CTA akışı: randevu/teklif formu + mikro metinler";
      }

      return { key, desc, steps };
    }

    function computePillarScores() {
      const p1 = String(primaryPriority() || "").toLowerCase();
      const needs = (state.needs || []).join(" ").toLowerCase();
      const scope = (state.scope || []).join(" ").toLowerCase();
      const goal = (state.goal || "").toLowerCase();
      const content = (state.content || "").toLowerCase();

      let contentScore = 78;
      if (goal.trim().length > 15) contentScore += 6;
      if (needs.includes("içerik") || needs.includes("seo")) contentScore += 8;
      if (scope.includes("seo")) contentScore += 6;
      if (content.includes("hazır")) contentScore += 4;
      if (content.includes("yok")) contentScore -= 4;

      let perfScore = 76;
      if (p1.includes("hız") || p1.includes("performans") || p1.includes("cwv")) perfScore += 12;
      if (needs.includes("hız") || scope.includes("hız") || needs.includes("performans") || scope.includes("performans")) perfScore += 8;

      let convScore = 76;
      if (p1.includes("dönüş") || p1.includes("cta")) convScore += 12;
      if (needs.includes("dönüşüm") || scope.includes("dönüşüm") || scope.includes("cta")) convScore += 8;
      if (goal.includes("randevu") || goal.includes("teklif") || goal.includes("satış")) convScore += 5;

      let maintScore = 78;
      if (p1.includes("cms") || p1.includes("bakım") || p1.includes("güven")) maintScore += 10;
      if (needs.includes("cms") || scope.includes("cms")) maintScore += 8;
      if (scope.includes("güvenlik")) maintScore += 4;
      if (needs.includes("entegrasyon") || scope.includes("entegrasyon")) maintScore += 4;

      return {
        content: clamp(Math.round(contentScore), 55, 100),
        performance: clamp(Math.round(perfScore), 55, 100),
        conversion: clamp(Math.round(convScore), 55, 100),
        maintenance: clamp(Math.round(maintScore), 55, 100),
      };
    }

    function computeMissingItems() {
      const items = [];
      const type = (state.type || "").toLowerCase();

      if (!((state.goal || "").trim())) items.push("Hedef: neyi başarmak istiyorsunuz? (teklif / randevu / satış / bilinirlik)");
      if (!((state.priorities || []).length)) items.push("Öncelik sırası: 1→2→3 seçin");
      if (!((state.needs || []).length)) items.push("İhtiyaçlar / modüller: neler kesin olsun?");
      if (type.includes("revize") && !((state.url || "").trim())) items.push("Mevcut site linki (revize için)");
      if (!((state.scope || []).length)) items.push("Kapsam (SEO, site hızı, CMS, raporlama…)");
      if (!((state.name || "").trim())) items.push("Ad Soyad");
      if (!((state.from || "").trim())) items.push("E‑posta");
      if (!((state.phone || "").trim())) items.push("Telefon");


      return items.slice(0, 3);
    }

    function uniq(list) {
      const seen = new Set();
      const out = [];
      (list || []).forEach((x) => {
        const v = String(x || "").trim();
        if (!v) return;
        const k = v.toLowerCase();
        if (seen.has(k)) return;
        seen.add(k);
        out.push(v);
      });
      return out;
    }

    function computeDeliverables(p1) {
      const needs = (state.needs || []).join(" ").toLowerCase();
      const scope = (state.scope || []).join(" ").toLowerCase();
      const goal = (state.goal || "").toLowerCase();

      const items = [
        "Kapsam & yapılacaklar listesi (1→3)",
        "Ön analiz raporu (ölçüm + checklist)",
        "1. sprint planı (3 adım)",
        `Tahmini süre: ${estimateTime()}`,
      ];

      if (needs.includes("seo") || scope.includes("seo")) items.push("SEO checklist + temel yapılandırma");
      if (needs.includes("analitik") || scope.includes("analitik")) items.push("GA4/GTM ölçüm planı + event listesi");
      if (needs.includes("cms") || scope.includes("cms")) items.push("İçerik modeli + yönetim akışı");
      if (needs.includes("entegrasyon") || scope.includes("entegrasyon")) items.push("Entegrasyon planı + risk listesi");
      if (goal.includes("satış") || goal.includes("randevu") || goal.includes("teklif")) items.push("Dönüşüm/funnel kurgusu + CTA haritası");

      return uniq(items).slice(0, 7);
    }

    function computeQuickWins(p1) {
      const p1l = String(p1 || "").toLowerCase();
      const needs = (state.needs || []).join(" ").toLowerCase();
      const items = [];

      if (p1l.includes("hız") || p1l.includes("performans") || p1l.includes("cwv") || needs.includes("hız") || needs.includes("performans")) {
        items.push("Görsel/font optimizasyonu + cache policy");
        items.push("JS/bundle küçültme + kritik path temizliği");
      }
      if (p1l.includes("dönüş") || p1l.includes("cta") || needs.includes("dönüş")) {
        items.push("CTA akışı + microcopy revize");
        items.push("Form sadeleştirme + spam koruması");
      }
      if (needs.includes("seo") || p1l.includes("seo") || p1l.includes("içerik")) {
        items.push("Title/meta + heading hiyerarşisi");
        items.push("Schema + sitemap/robots kontrolü");
      }
      if (needs.includes("cms") || p1l.includes("bakım")) {
        items.push("Component sistem + modüler yapı");
      }

      if (!items.length) {
        items.push("Kapsam netleştirme + hızlı kazanımlar listesi");
        items.push("UI/akış düzenlemeleri + teknik kontrol");
      }

      return uniq(items).slice(0, 4);
    }

    function computeRisks() {
      const risks = [];
      const type = (state.type || "").toLowerCase();
      const deadline = (state.deadline || "").toLowerCase();
      const scopeCount = (state.scope || []).length;
      const content = (state.content || "").toLowerCase();
      const lang = (state.lang || "").toLowerCase();
      const needs = (state.needs || []).join(" ").toLowerCase();

      if (deadline.includes("acil") || deadline.includes("hemen")) risks.push("Acil takvim → kapsamı daraltmak gerekebilir.");
      if (type.includes("revize") && !((state.url || "").trim())) risks.push("Revize için mevcut site linki gerekli.");
      if (content.includes("yok") || content.includes("hazır değil")) risks.push("İçerik yoksa timeline uzar (metin/görsel toplama).");
      if (scopeCount >= 8) risks.push("Geniş kapsam → işleri fazlara bölmek daha sağlıklı.");
      if (needs.includes("entegrasyon")) risks.push("Entegrasyon bağımlılıkları (API/CRM/ödeme) erken netleşmeli.");
      if (lang.includes("iki") || lang.includes("multi")) risks.push("Çoklu dil → içerik & SEO yapısı ek iş getirir.");
      if (!((state.from || "").trim())) risks.push("Geri dönüş için e‑posta gerekli.");

      return uniq(risks).slice(0, 4);
    }

    function renderPills(container, items) {
      if (!container) return;
      container.innerHTML = "";
      (items || []).forEach((t) => {
        const sp = document.createElement("span");
        sp.className = "kc-pill";
        sp.textContent = t;
        container.appendChild(sp);
      });
    }

    function renderInsightList(ul, items, { risk = false } = {}) {
      if (!ul) return;
      ul.innerHTML = "";
      if (!items || !items.length) {
        const li = document.createElement("li");
        li.innerHTML = '<i class="fa-solid fa-check"></i><span></span>';
        li.querySelector("span").textContent = "Net — ek risk görünmüyor.";
        ul.appendChild(li);
        return;
      }
      items.forEach((t) => {
        const li = document.createElement("li");
        if (risk) li.classList.add("kc-risk");
        li.innerHTML = risk
          ? '<i class="fa-solid fa-triangle-exclamation"></i><span></span>'
          : '<i class="fa-solid fa-check"></i><span></span>';
        li.querySelector("span").textContent = t;
        ul.appendChild(li);
      });
    }


    function formatPriorities(max = 3) {
      const arr = (state.priorities || []).slice(0, max);
      if (!arr.length) return "—";
      const labels = ["1. Öncelik", "2. Öncelik", "3. Öncelik"];
      return arr
        .map((v, i) => `${labels[i] || `Öncelik ${i + 1}`}: ${v}`)
        .join(" • ");
    }
    function formatNeeds(max = 4) {
      const arr = (state.needs || []).slice(0, max);
      if (!arr.length) return "—";
      return arr.join(" • ") + ((state.needs || []).length > max ? ` (+${(state.needs || []).length - max})` : "");
    }


    function cleanUrl(u) {
      return (u || "").trim().replace(/^https?:\/\//, "");
    }

    function escHtml(v) {
      return String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function safeEmailBody(body, max = 1850) {
      const b = String(body || "");
      if (b.length <= max) return b;
      return b.slice(0, max).trim() + "\n\n(…devamı kopyalayabilirsiniz)";
    }

    function gmailComposeHref(to, subject, body) {
      const base = "https://mail.google.com/mail/?view=cm&fs=1";
      const params = `&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return base + params;
    }

    // Backend olmadan mail taslağı oluşturup Gmail penceresini açıyorum.

    function openGmailCompose(to, subject, body, { newTab = true } = {}) {
      const url = gmailComposeHref(to, subject, body);
      if (!newTab) {
        window.location.href = url;
        return;
      }
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w) window.location.href = url;
    }

    function buildSummaryLine() {
      const parts = [];
      parts.push((state.type || "Proje").trim());
      parts.push(formatPriorities(3));
      if (state.pages) parts.push(`Sayfa: ${state.pages}`);
      if (state.lang) parts.push(`Dil: ${state.lang}`);
      if (state.needs && state.needs.length) parts.push(`İhtiyaç: ${formatNeeds(3)}`);
      if (state.deadline) parts.push(`Zaman: ${state.deadline}`);
      if (state.budget && state.budget.toLowerCase() !== "belirsiz") parts.push(`Bütçe: ${state.budget}`);
      if (state.url) parts.push(`Site: ${cleanUrl(state.url)}`);
      const g = (state.goal || "").trim();
      if (g) parts.push(g.length > 80 ? g.slice(0, 80).trim() + "…" : g);
      return parts.join(" • ");
    }
    function buildPlanPreview() {
      const pri = (state.priorities || []).slice(0, 3);
      const allNeeds = state.needs || [];
      const needs = allNeeds.slice(0, 6);
      const time = estimateTime();

      const lines = [];
      lines.push("Tamam — mini brief özeti hazır ✅");
      lines.push("");

      if (state.type) lines.push(`• İş türü: ${state.type}`);
      if (state.deadline) lines.push(`• Zaman: ${state.deadline}`);
      if (state.pages) lines.push(`• Sayfa: ${state.pages}`);
      if (state.lang) lines.push(`• Dil: ${state.lang}`);
      if (state.content) lines.push(`• İçerik: ${state.content}`);
      if (state.url) lines.push(`• Mevcut site: ${cleanUrl(state.url)}`);

      if (needs.length) {
        lines.push("");
        lines.push("İstediğiniz başlıklar:");
        needs.forEach((n) => lines.push(`• ${n}`));
        if (allNeeds.length > needs.length) lines.push(`• (+${allNeeds.length - needs.length} madde)`);
      }

      if (pri.length) {
        lines.push("");
        lines.push("En önemli konular (sırayla):");
        pri.forEach((v, i) => lines.push(`${i + 1}) ${v}`));
      }

      lines.push("");
      lines.push("Benim çalışma akışım:");
      lines.push("1) 2–3 kısa soru ile netleştirme (5 dk)");
      lines.push("2) Net kapsam + fiyat + zaman planı");
      lines.push(`3) Uygulama + test + yayına alma (${time})`);
      lines.push("");
      lines.push("Hazırsanız “Direkt gönder” ile bu özeti bana iletebilirsiniz.");

      return lines.join("\n");
    }
    function buildEmailDraft() {
      // Generate a stable reference code for this session
      if (!state._ref) {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
        state._ref = `KC-${y}${m}${day}-${rnd}`;
      }

      const subjectParts = ["Proje Talebi"];
      if (state.type) subjectParts.push(String(state.type).trim());
      if (state.name) subjectParts.push(String(state.name).trim());
      const subject = subjectParts.join(" • ").slice(0, 140);

      const oneLine = (t, max = 220) => {
        const s = String(t || "").replace(/\s+/g, " ").trim();
        if (!s) return "";
        return s.length > max ? s.slice(0, max).trim() + "…" : s;
      };

      const fromEmail = String(state.from || "").trim();
      const phone = String(state.phone || "").trim();
      const name = String(state.name || "").trim();
      const company = String(state.company || "").trim();

      const goal = oneLine(state.goal, 240);
      const notes = oneLine(state.notes, 420);

      const z = String(state.deadline || "").trim();
      const l = String(state.lang || "").trim();
      const p = String(state.pages || "").trim();
      const content = String(state.content || "").trim();
      const url = String(state.url || "").trim();

      const pri = (state.priorities || []).slice(0, 3);
      const allNeeds = state.needs || [];
      const needs = allNeeds.slice(0, 10);

      const audience = oneLine(state.audience, 220);
      const refs = parseCommaList(state.refs);
      const ints = parseCommaList(state.integrations);

      const lines = [];

      lines.push("Merhaba Kürşatcan,");
      lines.push("");
      lines.push("Web siteniz üzerinden bir proje talebi oluşturdum. Uygun olduğunuzda aşağıdaki özet üzerinden dönüş yapabilir misiniz?");
      lines.push("");

      lines.push("İLETİŞİM");
      lines.push(`Ad Soyad: ${name}`);
      lines.push(`E‑posta: ${fromEmail}`);
      lines.push(`Telefon: ${phone}`);
      if (company) lines.push(`Şirket/Proje: ${company}`);
      lines.push("");

      lines.push("PROJE ÖZETİ");
      lines.push(`Proje türü: ${String(state.type || "").trim() || "—"}`);
      if (z) lines.push(`Zaman beklentisi: ${z}`);
      if (p) lines.push(`Sayfa sayısı: ${p}`);
      if (l) lines.push(`Dil: ${l}`);
      if (url) lines.push(`Mevcut site: ${cleanUrl(url)}`);
      if (content) lines.push(`İçerik durumu: ${content}`);
      if (goal) lines.push(`Hedef: ${goal}`);
      lines.push("");

      if (pri.length) {
        lines.push("ÖNCELİKLER (sırayla)");
        pri.forEach((v, i) => lines.push(`${i + 1}) ${v}`));
        lines.push("");
      }

      if (needs.length) {
        lines.push("İSTENENLER");
        needs.forEach((n) => lines.push(`- ${n}`));
        if (allNeeds.length > needs.length) lines.push(`- (+${allNeeds.length - needs.length} madde daha)`);
        lines.push("");
      }

      const extras = [];
      if (audience) extras.push(`- Hedef kitle: ${audience}`);
      if (refs.length) extras.push(`- Örnek siteler: ${refs.join(" • ")}`);
      if (ints.length) extras.push(`- Kullanılacak bağlantılar / entegrasyonlar: ${ints.join(" • ")}`);
      if (notes) extras.push(`- Ek not: ${notes}`);

      if (extras.length) {
        lines.push("EK NOT (opsiyonel)");
        extras.forEach((x) => lines.push(x));
        lines.push("");
      }

      lines.push("SIRADAKİ ADIM");
      lines.push("Uygun olduğunuzda 2–3 kısa soruyla kapsamı netleştirebiliriz. Ardından teklif ve takvim için yönlendirmenizi rica ederim.");
      lines.push("");
      lines.push("Teşekkürler,");
      lines.push(name);
      lines.push(`Talep kodu: ${state._ref}`);

      const body = lines.join("\n");
      return { subject, body };
    }


function updateEmailPreview({ draft }) {
      if (!preview || (!preview.subject && !preview.body)) return;
      if (preview.subject) preview.subject.textContent = draft.subject || "Mini Brief";
      if (preview.to) preview.to.textContent = emailTo;
      if (preview.from) preview.from.textContent = (String(state.from || "").trim() || "E‑posta girilmedi");
      if (!preview.body) return;

      const raw = String(draft.body || "").trim() || "Mini brief alanlarını doldurdukça bu bölüm otomatik olarak oluşur.";
      const safe = escHtml(raw);

      const isHeading = (t) => {
        const h = ["İLETİŞİM", "PROJE ÖZETİ", "ÖNCELİKLER (sırayla)", "İSTENENLER", "EK NOT (opsiyonel)", "SIRADAKİ ADIM"]; 
        if (h.includes(t)) return true;
        return /^[A-ZÇĞİÖŞÜ0-9 ()\-]{4,}$/.test(t);
      };

      const html = safe
        .split("\n")
        .map((line) => {
          const t = String(line || "").trim();
          if (!t) return "";
          if (isHeading(t)) return `<span class="kc-mailhead">${line}</span>`;
          return line;
        })
        .join("<br>");

      preview.body.innerHTML = `<div class="kc-mailtext">${html}</div>`;

      // tiny "updated" animation for readability
      try {
        preview.body.classList.remove("kc-flash");
        void preview.body.offsetWidth; // reflow
        preview.body.classList.add("kc-flash");
      } catch (_) {}
    }

    function buildCopyText() {
      const d = buildEmailDraft();
      return [`Konu: ${d.subject}`, "", d.body].join("\n").trim();
    }

    function buildShortMsg() {
      const name = (state.name || "").trim();
      const from = (state.from || "").trim();
      const type = (state.type || "proje").trim();
      const p1 = primaryPriority();
      const deadline = (state.deadline || "").trim();
      const url = (state.url || "").trim();
      const g = (state.goal || "").trim();

      const parts = [];
      parts.push(`Merhaba, ${type} için destek istiyorum.`);
      if (p1) parts.push(`En önemli konu: ${p1}.`);
      if (deadline) parts.push(`Zaman: ${deadline}.`);
      if (g) parts.push(`Hedef: ${g.length > 120 ? g.slice(0, 120).trim() + "…" : g}.`);
      if (url) parts.push(`Site: ${cleanUrl(url)}`);
      if (name) parts.push(`Ad: ${name}.`);
      if (from) parts.push(`Mail: ${from}.`);
      return parts.join(" ");
    }

    function render() {
      state.type = getActiveValue(fields.typeWrap);
      state.needs = readSelectedChips(fields.needsWrap);
      state.deadline = getActiveValue(fields.deadlineWrap);
      state.pages = getActiveValue(fields.pagesWrap);
      state.lang = getActiveValue(fields.langWrap);
      state.content = getActiveValue(fields.contentWrap);
      state.budget = getActiveValue(fields.budgetWrap);
      state.goal = fields.goal ? fields.goal.value : "";
      state.notes = fields.notes ? fields.notes.value : "";
      state.url = fields.url ? fields.url.value : "";
      state.scope = getScopeSelected();
      state.name = fields.name ? fields.name.value : "";
      state.company = fields.company ? fields.company.value : "";
      state.from = fields.from ? fields.from.value : "";
      state.phone = fields.phone ? fields.phone.value : "";
      state.template = getActiveValue(fields.templateWrap);
      state.tone = getActiveValue(fields.toneWrap);
      state.audience = fields.audience ? fields.audience.value : "";
      state.refs = fields.refs ? fields.refs.value : "";
      state.integrations = fields.integrations ? fields.integrations.value : "";
      state.pagesList = fields.pagesList ? fields.pagesList.value : "";
      state.questions = getQuestionsSelected();
      state.priorities = readPriorityOrder();

      if (youEl) youEl.textContent = buildSummaryLine() || "—";
      if (meEl) meEl.textContent = buildPlanPreview();

      // KPI focus highlight
      const kpis = Array.from(root.querySelectorAll("[data-kc-studio-kpi]"));
      const p1 = primaryPriority();
      const kit = focusKit(p1);

      if (kpis.length) {
        const p1l = String(p1 || "").toLowerCase();
        const activeKey =
          (p1l.includes("hız") || p1l.includes("performans") || p1l.includes("cwv")) ? "performance" :
          (p1l.includes("dönüş") || p1l.includes("cta")) ? "conversion" :
          (p1l.includes("bakım") || p1l.includes("cms") || p1l.includes("güven")) ? "maintenance" :
          "content";

        kpis.forEach((k) => k.classList.toggle("is-active", (k.dataset.kcStudioKpi || "") === activeKey));
      }

      // A+ panel v2 content
      const briefScore = computeBriefScore();
      if (impact.briefScore) impact.briefScore.textContent = String(briefScore);
      if (impact.ring) impact.ring.style.setProperty("--p", String(briefScore));
      if (impact.ringLabel) impact.ringLabel.textContent = String(briefScore);
      if (impact.focus) impact.focus.textContent = p1;
      if (impact.focusDesc) impact.focusDesc.textContent = kit.desc;
      if (impact.estimate) impact.estimate.textContent = estimateTime();

      const missingItems = computeMissingItems();

      if (impact.missingList) {
        const items = missingItems;
        impact.missingList.innerHTML = "";
        if (!items.length) {
          impact.missingList.innerHTML = '<li><i class="fa-solid fa-check"></i><span>Brief gayet net — ön analizle devam edebilirim.</span></li>';
        } else {
          items.forEach((t) => {
            const li = document.createElement("li");
            li.innerHTML = '<i class="fa-solid fa-check"></i><span></span>';
            li.querySelector("span").textContent = t;
            impact.missingList.appendChild(li);
          });
        }
      }

      const deliver = computeDeliverables(p1);
      renderPills(impact.deliver, deliver);

      const wins = computeQuickWins(p1);
      renderInsightList(impact.wins, wins, { risk: false });

      const risks = computeRisks();
      renderInsightList(impact.risks, risks, { risk: true });


      if (impact.roadmap) {
        impact.roadmap.innerHTML = "";
        (kit.steps || []).slice(0, 3).forEach((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          impact.roadmap.appendChild(li);
        });
      }

      // pillar scores (bars + grade)
      const pillar = computePillarScores();
      kpis.forEach((card) => {
        const key = card.dataset.kcStudioKpi || "";
        const v = pillar[key];
        if (typeof v !== "number") return;

        card.setAttribute("data-value", String(v));

        const countEl = card.querySelector("[data-kc-count]");
        if (countEl) countEl.textContent = String(v);

        const gradeEl = card.querySelector("[data-kc-grade]");
        if (gradeEl) gradeEl.textContent = gradeFor(v);

        const fill = card.querySelector(".kc-meter-bar .fill");
        if (fill) fill.style.width = v + "%";
      });

      // Left email preview panel
      try {
        const draft = buildEmailDraft();
        updateEmailPreview({ draft });
      } catch (_) {}

      // enable/disable actions + inline validation
      syncActionState();

    }

    function bindChipGroup(wrap, key) {
      if (!wrap) return;
      wrap.addEventListener(
        "click",
        (e) => {
          const btn = e.target.closest(".kc-chip");
          if (!btn) return;
          const v = (btn.dataset.value || btn.textContent || "").trim();
          setActiveValue(wrap, v);
          state[key] = v;
          render();
        },
        { passive: true }
      );
    }

    function addChipToWrap(wrap, value, { select = false } = {}) {
      if (!wrap || !value) return;
      const v = String(value).trim();
      if (!v) return;

      const exists = Array.from(wrap.querySelectorAll(".kc-chip")).some((b) => ((b.dataset.value || b.textContent || "").trim().toLowerCase() === v.toLowerCase()));
      if (exists) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kc-chip";
      btn.dataset.value = v;
      btn.textContent = v.length > 22 ? v.slice(0, 22).trim() + "…" : v;

      if (wrap.classList.contains("kc-chip-group--multi")) {
        // multi groups use is-selected
        if (select) setSelectedChip(btn, true);
      } else {
        if (select) btn.classList.add("is-active");
      }

      wrap.appendChild(btn);
    }

    function bindChipAdder(key, wrap, { select = true } = {}) {
      const input = chat.querySelector(`[data-kc-add-input="${key}"]`);
      const btn = chat.querySelector(`[data-kc-add-btn="${key}"]`);
      if (!input || !btn || !wrap) return;

      function submit() {
        const v = (input.value || "").trim();
        if (!v) return;
        addChipToWrap(wrap, v, { select });

        // priorities: auto-append as last selected (P*) for convenience
        if (key === "priorities") {
          let order = readPriorityOrder();
          if (!order.includes(v)) order.push(v);
          if (order.length > 5) order = order.slice(0, 5);
          writePriorityOrder(order);
        }

        input.value = "";
        render();
      }

      btn.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        }
      });
    }


    bindChipGroup(fields.typeWrap, "type");
    bindChipGroup(fields.deadlineWrap, "deadline");
    bindChipGroup(fields.pagesWrap, "pages");
    bindChipGroup(fields.langWrap, "lang");
    bindChipGroup(fields.contentWrap, "content");
    bindChipGroup(fields.budgetWrap, "budget");
    bindChipGroup(fields.templateWrap, "template");
    bindChipGroup(fields.toneWrap, "tone");
    bindChipAdder("needs", fields.needsWrap, { select: true });
    bindChipAdder("priorities", fields.prioritiesWrap, { select: true });

    if (fields.needsWrap) {
      fields.needsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".kc-chip");
        if (!btn) return;
        const on = !btn.classList.contains("is-selected");
        setSelectedChip(btn, on);

        // soft cap for readability
        const chosen = readSelectedChips(fields.needsWrap);
        if (chosen.length > 10) {
          // if exceeded, undo latest
          setSelectedChip(btn, false);
        }
        render();
      }, { passive: true });
    }

    if (fields.prioritiesWrap) {
      fields.prioritiesWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".kc-chip");
        if (!btn) return;
        const v = (btn.dataset.value || btn.textContent || "").trim();
        let order = readPriorityOrder();

        const exists = order.includes(v);
        if (exists) order = order.filter((x) => x !== v);
        else order.push(v);

        // cap to 5 for readability
        if (order.length > 5) order = order.slice(0, 5);

        writePriorityOrder(order);
        render();
      }, { passive: true });
    }

    if (fields.goal) fields.goal.addEventListener("input", render, { passive: true });
    if (fields.notes) fields.notes.addEventListener("input", render, { passive: true });
    if (fields.url) fields.url.addEventListener("input", render, { passive: true });
    if (fields.name) fields.name.addEventListener("input", render, { passive: true });
    if (fields.company) fields.company.addEventListener("input", render, { passive: true });
    if (fields.from) fields.from.addEventListener("input", render, { passive: true });
    if (fields.phone) fields.phone.addEventListener("input", render, { passive: true });
    if (fields.audience) fields.audience.addEventListener("input", render, { passive: true });
    if (fields.refs) fields.refs.addEventListener("input", render, { passive: true });
    if (fields.integrations) fields.integrations.addEventListener("input", render, { passive: true });
    if (fields.pagesList) fields.pagesList.addEventListener("input", render, { passive: true });
    if (fields.questionsWrap) fields.questionsWrap.addEventListener("change", render, { passive: true });
    if (fields.scopeWrap) fields.scopeWrap.addEventListener("change", render, { passive: true });

    async function copyToClipboard(text, btn, okLabel) {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        if (btn) {
          const old = btn.textContent;
          btn.textContent = okLabel || "Kopyalandı ✓";
          btn.classList.add("is-copied");
          window.setTimeout(() => {
            btn.textContent = old;
            btn.classList.remove("is-copied");
          }, 1200);
        }
      } catch (_) {}
    }

    
    function setStatus(text, level) {
      if (!statusEl) return;
      try {
        statusEl.classList.remove("is-warn", "is-bad", "is-ok");
        if (level === "warn") statusEl.classList.add("is-warn");
        else if (level === "bad") statusEl.classList.add("is-bad");
        else if (level === "ok") statusEl.classList.add("is-ok");
      } catch (_) {}

      const spans = statusEl.querySelectorAll("span");
      if (spans && spans.length > 1) spans[1].textContent = String(text || "");
      else statusEl.textContent = String(text || "");
    }

    function markInvalid(inputEl, on) {
      if (!inputEl) return;
      const wrap = inputEl.closest(".kc-field");
      if (!wrap) return;
      wrap.classList.toggle("is-invalid", !!on);
    }

    function syncActionState() {
      if (isSending) return;

      const nameOk = !!String(state.name || "").trim();
      const emailOk = !!String(state.from || "").trim();
      const phoneOk = !!String(state.phone || "").trim();

      markInvalid(fields.name, !nameOk);
      markInvalid(fields.from, !emailOk);
      markInvalid(fields.phone, !phoneOk);

      const missing = [];
      if (!nameOk) missing.push("Ad Soyad");
      if (!emailOk) missing.push("E‑posta");
      if (!phoneOk) missing.push("Telefon");

      const ready = missing.length === 0;
      if (sendBtn) sendBtn.disabled = !ready;
      if (mailBtn) mailBtn.disabled = !ready;

      // Helper tooltip
      const tip = ready ? "" : ("Göndermek için doldurun: " + missing.join(" • "));
      if (sendBtn) sendBtn.title = tip;
      if (mailBtn) mailBtn.title = tip;

      // Keep the status friendly and actionable
      if (!ready) setStatus(`Göndermek için: ${missing.join(" • ")}`, "warn");
      else setStatus("Hazır ✓ Direkt gönderebilirsiniz.", "ok");
    }

if (copyBtn) {
      copyBtn.addEventListener("click", () => copyToClipboard(buildCopyText(), copyBtn, "Kopyalandı ✓"));
    }

    if (mailBtn) {
      mailBtn.addEventListener("click", () => {
        const nameNow = String(state.name || "").trim();
        if (!nameNow) {
          if (fields.name) fields.name.focus();
          setStatus("Ad Soyad gerekli. Lütfen ad soyad alanını doldurun.", "warn");
          return;
        }

        const fromNow = String(state.from || "").trim();
        if (!fromNow) {
          if (fields.from) fields.from.focus();
          setStatus("E‑posta gerekli. Lütfen e‑posta alanını doldurun.", "warn");
          return;
        }

        const phoneNow = String(state.phone || "").trim();
        if (!phoneNow) {
          if (fields.phone) fields.phone.focus();
          setStatus("Telefon gerekli. Lütfen telefon alanını doldurun.", "warn");
          return;
        }

        const d = buildEmailDraft();
        const body = safeEmailBody(d.body);
        openGmailCompose(emailTo, d.subject, body, { newTab: true });

        setStatus("Gmail taslağı açıldı ✓", "ok");

        const old = mailBtn.textContent;
        mailBtn.textContent = "Açıldı ✓";
        mailBtn.classList.add("is-sent");
        window.setTimeout(() => {
          mailBtn.textContent = old;
          mailBtn.classList.remove("is-sent");
        }, 1200);
      });
    }





    
    // Backend olmadan formu göndermek için FormSubmit akışını burada çalıştırıyorum.

    function __kcSubmitFormSubmit(payload, openNewTab) {
      try {
        const action = `https://formsubmit.co/${emailTo}`;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = action;
        form.style.display = "none";

        if (openNewTab) {
          form.target = "_blank";
        } else {
          let frame = document.querySelector('iframe[name="kcFormSubmitFrame"]');
          if (!frame) {
            frame = document.createElement("iframe");
            frame.name = "kcFormSubmitFrame";
            frame.style.display = "none";
            document.body.appendChild(frame);
          }
          form.target = "kcFormSubmitFrame";
        }

        const add = (k, v) => {
          const i = document.createElement("input");
          i.type = "hidden";
          i.name = k;
          i.value = String(v == null ? "" : v);
          form.appendChild(i);
        };

        Object.keys(payload || {}).forEach((k) => add(k, payload[k]));
        // hard defaults (safe)
        add("_captcha", "false");
        // FormSubmit email template (basic / box / table)
        // "basic" avoids the heavy Name/Value box header and looks cleaner in inbox.
        add("_template", "basic");

        document.body.appendChild(form);
        form.submit();
        window.setTimeout(() => { try { form.remove(); } catch (_) {} }, 1200);
        return true;
      } catch (_) {
        return false;
      }
    }

    async function sendViaFormSubmit(d, overrides = {}) {
      // JS-only fallback (no PHP). Uses FormSubmit (requires one-time activation on the receiver email).
      // Docs: formsubmit.co
      let payload = null;

      try {
        const nameNow = String(overrides.name || state.name || "").trim();
        const fromEmail = String(overrides.email || overrides.from || state.from || "").trim();
        const phoneNow = String(overrides.phone || state.phone || "").trim();

        if (!nameNow) return { ok: false, reason: "missing_name" };
        if (!fromEmail) return { ok: false, reason: "missing_email" };
        if (!phoneNow) return { ok: false, reason: "missing_phone" };

        payload = {
          name: nameNow,
          email: fromEmail,
          phone: phoneNow,
          company: String(overrides.company || state.company || "").trim(),
          message: String(overrides.message || d.body || "").trim(),
          _subject: String(d.subject || "Mini Brief").trim(),
          _replyto: fromEmail,
        };

        // Local file tests often fail with CORS for fetch. Use normal form submit in that case.
        const isFile = (location && location.protocol === "file:");
        if (isFile) {
          __kcSubmitFormSubmit(payload, true);
          return { ok: true, via: "form" };
        }

        // Prefer normal form submit (no backend) to avoid CORS/adblock issues on static hosts.
        const ok = __kcSubmitFormSubmit(payload, false);
        return { ok: !!ok, via: "form" };
      } catch (e) {
        // last-resort: form submit (even if we cannot confirm)
        try { if (payload) __kcSubmitFormSubmit(payload, false); } catch (_) {}
        return { ok: payload ? true : false, reason: payload ? "form_fallback" : "fetch_failed", error: e };
      }
    }

async function sendDirectDraft(d) {
      // EmailJS template variables (configure template accordingly):
      // to_email, subject, message, from_name, reply_to, phone, company, project_type, priorities, needs, deadline, pages, lang, budget, url
      if (!initEmailJS()) return { ok: false, reason: "not_configured" };

      const vars = {
        to_email: emailTo,
        subject: d.subject,
        message: d.body,
        from_name: (state.name || "Portfolio ziyaretçisi").trim(),
        reply_to: (state.from || "").trim(),
        from_email: (state.from || "").trim(),
        phone: (state.phone || "").trim(),
        company: (state.company || "").trim(),
        project_type: (state.type || "").trim(),
        priorities: formatPriorities(5),
        needs: formatNeeds(10),
        deadline: (state.deadline || "").trim(),
        pages: (state.pages || "").trim(),
        lang: (state.lang || "").trim(),
        budget: (state.budget || "").trim(),
        url: (state.url || "").trim(),
        audience: String(state.audience || '').trim(),
        refs: parseCommaList(state.refs).join(' • '),
        integrations: parseCommaList(state.integrations).join(' • '),
        pages_list: String(state.pagesList || '').trim(),
        questions: (state.questions || []).join('\n- '),
        template: (state.template || '').trim(),
        tone: (state.tone || '').trim(),
      };

      try {
        await window.emailjs.send(emailjsService, emailjsTemplate, vars);
        return { ok: true };
      } catch (e) {
        return { ok: false, reason: "send_failed", error: e };
      }
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", async () => {
        const d = buildEmailDraft();

        const nameNow = String(state.name || "").trim();
        if (!nameNow) {
          if (fields.name) fields.name.focus();
          setStatus("Ad Soyad gerekli. Lütfen ad soyad alanını doldurun.", "warn");
          return;
        }

        const fromNow = String(state.from || "").trim();
        if (!fromNow) {
          if (fields.from) fields.from.focus();
          setStatus("E‑posta gerekli. Lütfen e‑posta alanını doldurun.", "warn");
          return;
        }

        const phoneNow = String(state.phone || "").trim();
        if (!phoneNow) {
          if (fields.phone) fields.phone.focus();
          setStatus("Telefon gerekli. Lütfen telefon alanını doldurun.", "warn");
          return;
        }

        isSending = true;
        sendBtn.disabled = true;
        const old = sendBtn.textContent;

        const hasEmailJS = canEmailJS();

        // Popup blockers: if we may need a fallback tab later, open a blank tab immediately.
        let preWin = null;
        if (hasEmailJS) {
          try { preWin = window.open("about:blank", "_blank", "noopener,noreferrer"); } catch (_) { preWin = null; }
        }

        sendBtn.textContent = "Gönderiliyor…";
        setStatus("Gönderiliyor…", "info");

        const res = hasEmailJS ? await sendDirectDraft(d) : await sendViaFormSubmit(d);

        if (res && res.ok) {
          try { if (preWin && !preWin.closed) preWin.close(); } catch (_) {}

          sendBtn.textContent = "Gönderildi ✓";
          sendBtn.classList.add("is-sent");

          if (hasEmailJS) setStatus("Gönderildi ✓", "ok");
          else setStatus("İletildi ✓ (İlk kullanımda aktivasyon maili gelebilir.)", "ok");

          window.setTimeout(() => {
            sendBtn.textContent = old;
            sendBtn.classList.remove("is-sent");
            sendBtn.disabled = false;
            isSending = false;
            syncActionState();
          }, 1600);
          return;
        }

        // Fallback: open Gmail compose with the same draft
        const body = safeEmailBody(d.body);
        const url = gmailComposeHref(emailTo, d.subject, body);

        if (preWin && !preWin.closed) {
          try { preWin.location.href = url; } catch (_) {}
        } else {
          openGmailCompose(emailTo, d.subject, body, { newTab: true });
        }

        sendBtn.textContent = "Gmail açıldı ✓";
        sendBtn.classList.add("is-sent");
        setStatus("Direkt gönderilemedi. Gmail taslağı açıldı.", "warn");

        window.setTimeout(() => {
          sendBtn.textContent = old;
          sendBtn.classList.remove("is-sent");
          sendBtn.disabled = false;
          isSending = false;
          syncActionState();
        }, 1600);
      });
    }



    if (fillBtn) {
      fillBtn.addEventListener("click", () => {
        const form = document.querySelector("#contact-form");
        if (form) {
          const n = form.querySelector('input[name="name"]');
          const p = form.querySelector('input[name="phone"]');
          const e = form.querySelector('input[name="email"]');
          const t = form.querySelector('textarea[name="message"]');

          if (n && state.name) n.value = state.name;
          if (p && state.phone) p.value = state.phone;
          if (e && state.from) e.value = state.from;
          if (t) t.value = buildCopyText();
        }

        const target = form || document.querySelector(".contact-form-box") || document.querySelector(".contact-from-section");
        if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

        const old = fillBtn.textContent;
        fillBtn.textContent = "Dolduruldu ✓";
        fillBtn.classList.add("is-copied");
        window.setTimeout(() => {
          fillBtn.textContent = old;
          fillBtn.classList.remove("is-copied");
        }, 1200);
      });
    }

    // classic contact form (no PHP): EmailJS if configured, otherwise mailto fallback
    const classicForm = document.querySelector("[data-kc-contact-form]");
    if (classicForm) {
      classicForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const msgEl = classicForm.querySelector(".form-message");
        const btn = classicForm.querySelector('button[type="submit"]');

        const fd = new FormData(classicForm);
        const hp = String(fd.get("website") || "").trim();

        // Honeypot (anti-spam): bots fill hidden field.
        if (hp) {
          if (msgEl) msgEl.textContent = "Gönderildi ✓";
          if (btn) { btn.disabled = false; btn.classList.remove("disabled"); }
          try { classicForm.reset(); } catch (_) {}
          return;
        }

        const name = String(fd.get("name") || state.name || "").trim();
        const email = String(fd.get("email") || state.from || "").trim();
        const phone = String(fd.get("phone") || state.phone || "").trim();
        const messageRaw = String(fd.get("message") || "").trim();

        if (!name || !email || !phone) {
          if (msgEl) msgEl.textContent = "Lütfen Ad Soyad, E‑posta ve Telefon alanlarını doldurun.";
          if (btn) { btn.disabled = false; btn.classList.remove("disabled"); }
          return;
        }

        const draft = buildEmailDraft();
        const body = messageRaw.length > 20 ? messageRaw : draft.body;

        if (btn) { btn.disabled = true; btn.classList.add("disabled"); }
        if (msgEl) msgEl.textContent = "Gönderiliyor…";

        // try direct send
        if (canEmailJS()) {
          try {
            initEmailJS();
            await window.emailjs.send(emailjsService, emailjsTemplate, {
              to_email: emailTo,
              subject: draft.subject,
              message: body,
              from_name: name || "Portfolio ziyaretçisi",
              reply_to: email,
              phone,
            });

            if (msgEl) msgEl.textContent = "Gönderildi ✓";
            if (btn) { btn.disabled = false; btn.classList.remove("disabled"); }
            classicForm.reset();
            return;
          } catch (_) {
            // continue to fallback
          }
        }

        // fallback: try JS-only send (FormSubmit). If it fails, open Gmail compose.
        const res = await sendViaFormSubmit({ subject: draft.subject, body }, { name, email, phone, message: body });
        if (res && res.ok) {
          if (msgEl) msgEl.textContent = "İletildi ✓";
          if (btn) { btn.disabled = false; btn.classList.remove("disabled"); }
          classicForm.reset();
          return;
        }

        const safeBody = safeEmailBody(body);
        openGmailCompose(emailTo, draft.subject, safeBody, { newTab: true });

        if (msgEl) msgEl.textContent = "Gmail ekranı açıldı ✓";
        if (btn) { btn.disabled = false; btn.classList.remove("disabled"); }
      });
    }

    if (shortBtn) {
      shortBtn.addEventListener("click", async () => {
        await copyToClipboard(buildShortMsg(), shortBtn, "Kopyalandı ✓");
        setStatus("Kısa mesaj kopyalandı ✓", "ok");
      });
    }

    // URL query params: proje, p1, hedef
    try {
      const q = new URLSearchParams(window.location.search);
      const proje = q.get("proje");
      const p1 = q.get("p1") || q.get("odak");
      const hedef = q.get("hedef");

      if (proje) setActiveValue(fields.typeWrap, proje);
      if (hedef && fields.goal) fields.goal.value = hedef;
      if (p1 && fields.prioritiesWrap) {
        writePriorityOrder([p1]);
      }
    } catch (_) {}

    // initial render
    // ensure priority badges are consistent
    writePriorityOrder(readPriorityOrder());
    render();
  }

  // Init
  

  // KC ABOUT ENHANCEMENTS
  function initAboutReveal() {
    const els = document.querySelectorAll("[data-kc-reveal]");
    if (!els.length) return;

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("kc-inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("kc-inview");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
  }

  function initAboutTimelineProgress() {
    const tl = document.querySelector("[data-kc-timeline]");
    if (!tl) return;
    const progress = tl.querySelector(".kc-tl-progress");
    if (!progress) return;

    const update = () => {
      const rect = tl.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Timeline'ın ekranda ne kadar ilerlediğini yumuşak şekilde hesapla
      const start = vh * 0.20;
      const total = rect.height || 1;
      const progressedPx = (vh - rect.top) - start;
      const ratio = clamp(progressedPx / total, 0, 1);
      progress.style.height = (ratio * 100).toFixed(2) + "%";
    };

    let raf = 0;
    const onTick = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    window.addEventListener("scroll", onTick, { passive: true });
    window.addEventListener("resize", onTick);
    update();
  }


  
function initCvModalModern() {
    const modalEl = document.getElementById("cvModal");
    if (!modalEl) return;

    const iframe = modalEl.querySelector(".kc-cv-frame");
    const skel = modalEl.querySelector(".kc-cv2026-skeleton");
    if (!iframe) return;

    const src = iframe.getAttribute("data-src") || iframe.getAttribute("src");
    if (src && !iframe.getAttribute("data-src")) iframe.setAttribute("data-src", src);

    // Lazy load: only attach src when modal opens
    iframe.removeAttribute("src");
    if (skel) skel.style.display = "flex";

    const onShow = () => {
      const data = iframe.getAttribute("data-src");
      if (skel) skel.style.display = "flex";
      if (data && !iframe.getAttribute("src")) iframe.setAttribute("src", data);
    };

    const onHide = () => {
      // Release memory (especially on mobile)
      iframe.removeAttribute("src");
      if (skel) skel.style.display = "flex";
    };

    // When PDF is ready, fade skeleton
    iframe.addEventListener("load", () => {
      if (!skel) return;
      skel.style.opacity = "0";
      setTimeout(() => { skel.style.display = "none"; skel.style.opacity = "1"; }, 220);
    });

    modalEl.addEventListener("shown.bs.modal", onShow);
    modalEl.addEventListener("hidden.bs.modal", onHide);
  }


  // ---------------------------
  // KC CERTS — Ultimate 2026
  // ---------------------------
  function initCertHub2026() {
    const cards = Array.from(document.querySelectorAll("[data-kc-cert]"));
    if (!cards.length) return;

    const grid = document.querySelector("[data-kc-cert-grid]");
    const search = document.getElementById("kcCertSearch");
    const sortSel = document.getElementById("kcCertSort");
    const countEl = document.getElementById("kcCertCount");
    const scopePill = document.getElementById("kcCertActiveScope");
    const modalEl = document.getElementById("kcCertModal");

    const scopeLabels = {
      all: "Tümü",
      "2025": "2025",
      "2024": "2024",
      veri: "Veri & AI",
      yazilim: "Yazılım & UX",
      sec: "Siber",
      yonetim: "Yönetim",
    };

    let scope = "all";

    function norm(s) {
      return (s || "")
        .toString()
        .toLowerCase()
        .replaceAll("ı", "i")
        .replaceAll("ğ", "g")
        .replaceAll("ü", "u")
        .replaceAll("ş", "s")
        .replaceAll("ö", "o")
        .replaceAll("ç", "c");
    }

    function toast(msg) {
      if (prefersReducedMotion()) return;
      const t = document.createElement("div");
      t.className = "kc-toast";
      t.innerHTML = '<i class="fa-solid fa-check"></i><span>' + msg + "</span>";
      document.body.appendChild(t);
      setTimeout(() => t.classList.add("hide"), 1400);
      setTimeout(() => t.remove(), 1650);
    }

    function setPill(sc) {
      if (!scopePill) return;
      const label = scopeLabels[sc] || sc;
      scopePill.innerHTML = '<i class="fa-solid fa-filter"></i> ' + label;
    }

    function matchesScope(card) {
      const s = (card.dataset.scope || "all").split(",").map((x) => x.trim());
      return scope === "all" ? true : s.includes(scope);
    }

    function matchesQuery(card, q) {
      if (!q) return true;
      const blob = [
        card.dataset.title,
        card.dataset.issued,
        card.dataset.year,
        card.dataset.id,
      ].join(" | ");
      return norm(blob).includes(q);
    }

    function applyFilter() {
      const q = search ? norm(search.value) : "";
      let visible = 0;

      cards.forEach((card) => {
        const show = matchesScope(card) && matchesQuery(card, q);
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (countEl) countEl.textContent = String(visible);
      setPill(scope);
    }

    function parseDate(card) {
      const d = card.dataset.date || "";
      const dt = new Date(d);
      return isNaN(dt.getTime()) ? 0 : dt.getTime();
    }

    function sortGrid(mode) {
      if (!grid) return;
      const all = Array.from(grid.querySelectorAll("[data-kc-cert]"));
      const sorted = all.slice().sort((a, b) => {
        if (mode === "az" || mode === "za") {
          const ta = (a.dataset.title || "").toLocaleLowerCase("tr");
          const tb = (b.dataset.title || "").toLocaleLowerCase("tr");
          return mode === "az" ? ta.localeCompare(tb) : tb.localeCompare(ta);
        }
        const da = parseDate(a);
        const db = parseDate(b);
        return mode === "old" ? da - db : db - da;
      });
      sorted.forEach((el) => grid.appendChild(el));
    }

    // Tabs -> scope
    const tabsWrap = document.querySelector(".kc-case-tabs");
    if (tabsWrap) {
      tabsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-kc-tab]");
        if (!btn) return;
        // active state (even if panel system is not present)
        try {
          tabsWrap.querySelectorAll("[data-kc-tab]").forEach((t) => {
            const a = t === btn;
            t.classList.toggle("is-active", a);
            t.setAttribute("aria-selected", a ? "true" : "false");
          });
        } catch (_) {}
        scope = btn.dataset.kcTab || "all";
        applyFilter();
      });
    }

    // Search
    if (search) {
      search.addEventListener("input", () => applyFilter());
    }

    // Sort
    if (sortSel) {
      sortSel.addEventListener("change", () => {
        sortGrid(sortSel.value);
        applyFilter();
      });
    }

    // Cursor glow vars
    cards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });

    // Copy handler (cards + modal)
    document.addEventListener("click", async (e) => {
      const copy = e.target.closest("[data-kc-copy]");
      if (!copy) return;

      e.preventDefault();
      e.stopPropagation();

      const val = copy.getAttribute("data-kc-copy") || "";
      try {
        await navigator.clipboard.writeText(val);
        kcBurstFrom(copy);
        toast("ID kopyalandı");
      } catch {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = val;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        kcBurstFrom(copy);
        toast("ID kopyalandı");
      }
    });

    // Modal
    if (modalEl && window.bootstrap && bootstrap.Modal) {
      const modal = new bootstrap.Modal(modalEl);
      const titleEl = modalEl.querySelector("#kcCertModalTitle");
      const dateEl = modalEl.querySelector("#kcCertModalDate");
      const idEl = modalEl.querySelector("#kcCertModalId");
      const tagsWrap = modalEl.querySelector("#kcCertModalTags");
      const copyBtn = modalEl.querySelector("[data-kc-copy-modal]");

      function renderTags(card) {
        if (!tagsWrap) return;
        tagsWrap.innerHTML = "";
        const scopes = (card.dataset.scope || "").split(",").map((x) => x.trim());
        const tags = scopes.filter((t) => ["veri","ai","geo","sec","yazilim","yonetim","tasarim"].includes(t));
        const map = {
          ai: "Yapay Zeka",
          veri: "Veri",
          geo: "CBS",
          sec: "Siber",
          yazilim: "Yazılım",
          yonetim: "Yönetim",
          tasarim: "UX",
        };
        tags.forEach((t) => {
          const el = document.createElement("span");
          el.className = "kc-chip kc-chip--mini";
          el.innerHTML = '<i class="fa-solid fa-sparkles"></i> ' + (map[t] || t);
          tagsWrap.appendChild(el);
        });
      }

      function open(card) {
        if (titleEl) titleEl.textContent = card.dataset.title || "Sertifika";
        if (dateEl) dateEl.innerHTML = '<i class="fa-regular fa-calendar"></i> ' + (card.dataset.issued || "—");
        if (idEl) idEl.textContent = card.dataset.id || "—";
        renderTags(card);
        if (copyBtn) copyBtn.setAttribute("data-kc-copy", card.dataset.id || "");
        modal.show();
      }

      cards.forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.closest("[data-kc-copy]")) return;
          open(card);
        });

        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open(card);
          }
        });
      });
    }

    // Initial
    if (sortSel) sortGrid(sortSel.value);
    applyFilter();
  }



  // ---------------------------
  // KC ABOUT — Skillboard 2026 (tab + bar anim)
  // ---------------------------
  function initSkillboard2026() {
    const root = document.querySelector(".kc-skillboard2026__frame");
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll("[data-kc-sb-tab]"));
    const panels = Array.from(root.querySelectorAll("[data-kc-sb-panel]"));
    if (!tabs.length || !panels.length) return;

    function animateBars(panelName) {
      const panel = root.querySelector('[data-kc-sb-panel="' + panelName + '"]');
      if (!panel) return;
      const bars = Array.from(panel.querySelectorAll("[data-kc-bar]"));
      bars.forEach((bar) => {
        const p = parseFloat(bar.getAttribute("data-kc-bar") || "0");
        bar.style.setProperty("--p", "0%");
        // next tick animate
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.setProperty("--p", Math.max(0, Math.min(100, p)) + "%");
          });
        });
      });
    }

    function setActive(name) {
      tabs.forEach((t) => {
        const on = (t.getAttribute("data-kc-sb-tab") === name);
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });

      panels.forEach((p) => {
        const on = (p.getAttribute("data-kc-sb-panel") === name);
        p.classList.toggle("is-active", on);
      });

      animateBars(name);

      // ensure reveal animations run inside tabbed panels
      try {
        const panel = root.querySelector('[data-kc-sb-panel="' + name + '"]');
        if (panel) {
          const els = Array.from(panel.querySelectorAll("[data-kc-reveal]"));
          if (!prefersReducedMotion()) {
            els.forEach((el) => el.classList.add("kc-inview"));
          } else {
            els.forEach((el) => el.classList.add("kc-inview"));
          }
        }
      } catch (_) {}
    }

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-kc-sb-tab]");
      if (!btn) return;
      const name = btn.getAttribute("data-kc-sb-tab");
      if (!name) return;
      setActive(name);
    });

    // tiny "popup" for languages (inline expand)
    const langs = Array.from(root.querySelectorAll(".kc-sb-lang"));
    langs.forEach((card) => {
      card.addEventListener("click", (e) => {
        // ignore when clicking on tabs
        if (e.target.closest("[data-kc-sb-tab]")) return;
        // toggle
        const isOpen = card.classList.contains("is-open");
        langs.forEach((c) => c.classList.remove("is-open"));
        if (!isOpen) card.classList.add("is-open");
      });
    });

    // init
    setActive("langs");
  }


  // ---------------------------
  // KC — Reveal Stagger (micro polish)
  // ---------------------------
  function initRevealStagger() {
    try {
      const groups = [
        { sel: ".kc-certs-grid [data-kc-reveal]", step: 45, max: 520 },
        { sel: ".kc-sb-langgrid [data-kc-reveal], .kc-sb-langgrid .kc-sb-lang", step: 55, max: 520 },
        { sel: ".kc-sb-certgrid [data-kc-reveal], .kc-sb-certgrid .kc-sb-cert", step: 55, max: 520 },
        { sel: ".kc-case-tabs .kc-tab", step: 35, max: 420 },
      ];

      groups.forEach((g) => {
        const els = Array.from(document.querySelectorAll(g.sel));
        els.forEach((el, i) => {
          const d = Math.min(g.max, i * g.step);
          el.style.setProperty("--d", d + "ms");
        });
      });
    } catch (_) {}
  }

  // KC — Tabs glow (pointer highlight)
  function initTabGlow() {
    if (prefersReducedMotion()) return;
    const tabs = document.querySelectorAll(".kc-tab, .kc-sb-tab");
    tabs.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", x.toFixed(2) + "%");
        el.style.setProperty("--my", y.toFixed(2) + "%");
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--mx", "50%");
        el.style.setProperty("--my", "50%");
      }, { passive: true });
    });
  }





  
  // KC reveal helper for dynamically injected blocks (posts, etc.)
  function kcRevealStagger(root, stepMs) {
    try {
      if (!root) return;
      const els = Array.from(root.querySelectorAll("[data-kc-reveal]"));
      if (!els.length) return;

      if (prefersReducedMotion()) {
        els.forEach((el) => el.classList.add("kc-inview"));
        return;
      }

      const step = typeof stepMs === "number" ? stepMs : 70;
      els.forEach((el, i) => {
        // reset if re-rendered
        el.classList.remove("kc-inview");
        setTimeout(() => el.classList.add("kc-inview"), i * step);
      });
    } catch (_) {}
  }

/* =========================================================
     KC BLOG 2026 — Yazılar (Liste + Detay + Öne Çıkanlar)
     ========================================================= */
  function kcGetPosts() {
    const arr = Array.isArray(window.KC_POSTS) ? window.KC_POSTS : [];
    // clone + normalize
    return arr.map((p) => ({
      ...p,
      dateObj: p.date ? new Date(p.date + "T12:00:00") : new Date(),
      category: p.category || "Genel",
      readingTime: p.readingTime || 5,
      cover: p.cover || "assets/img/news/4.jpg",
      tags: Array.isArray(p.tags) ? p.tags : [],
      excerpt: p.excerpt || "",
      featured: !!p.featured,
    }));
  }

  function kcFormatDateTR(d) {
    const months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
    try {
      const day = d.getDate();
      const mon = months[d.getMonth()];
      const yr = d.getFullYear();
      return `${day} ${mon} ${yr}`;
    } catch (_) {
      return "";
    }
  }

  function kcGetParam(name) {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    } catch (_) { return null; }
  }

  function kcEscapeHtml(str) {
    return String(str || "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function kcCardHtml(p) {
    const href = `news-details.html?slug=${encodeURIComponent(p.slug)}`;
    const chips = (p.tags || []).slice(0,2).map(t=>`<span class="kc-tag">${kcEscapeHtml(t)}</span>`).join("");
    return `
      <article class="kc-post-card" data-kc-reveal>
        <a class="kc-post-thumb" href="${href}" aria-label="${kcEscapeHtml(p.title)}">
          <img loading="lazy" src="${p.cover}" alt="${kcEscapeHtml(p.title)}">
          <span class="kc-post-chip">${kcEscapeHtml(p.category)}</span>
        </a>
        <div class="kc-post-body">
          <div class="kc-post-meta">
            <span class="kc-post-date">${kcFormatDateTR(p.dateObj)}</span>
            <span class="kc-dot"></span>
            <span class="kc-post-time">${p.readingTime} dk</span>
          </div>
          <h3 class="kc-post-title"><a href="${href}">${kcEscapeHtml(p.title)}</a></h3>
          <p class="kc-post-excerpt">${kcEscapeHtml(p.excerpt)}</p>
          <div class="kc-post-bottom">
            <div class="kc-tags">${chips}</div>
            <a class="kc-readmore" href="${href}">Oku <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </article>`;
  }

  function initPostsFeatured() {
    const host = document.getElementById("kc-featured-posts");
    if (!host) return;

    const posts = kcGetPosts().filter(p=>p.featured).sort((a,b)=>b.dateObj - a.dateObj).slice(0,3);
    host.innerHTML = posts.map((p)=>`<div class="col-lg-4 col-md-6">${kcCardHtml(p)}</div>`).join("");

    
    kcRevealStagger(host, 90);

    // extra micro parallax on hover
    host.querySelectorAll(".kc-post-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--kc-tilt-x", (y * -6).toFixed(2) + "deg");
        card.style.setProperty("--kc-tilt-y", (x * 8).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--kc-tilt-x", "0deg");
        card.style.setProperty("--kc-tilt-y", "0deg");
      });
    });
  }

  function initPostsArchive() {
    const grid = document.getElementById("kc-posts-grid");
    if (!grid) return;

    const posts = kcGetPosts().sort((a,b)=>b.dateObj - a.dateObj);

    const searchEl = document.getElementById("kc-posts-search");
    const catEl = document.getElementById("kc-posts-category");
    const sortEl = document.getElementById("kc-posts-sort");

    // build category list
    if (catEl) {
      const cats = Array.from(new Set(posts.map(p=>p.category))).sort((a,b)=>a.localeCompare(b,"tr"));
      catEl.innerHTML = `<option value="all">Tümü</option>` + cats.map(c=>`<option value="${kcEscapeHtml(c)}">${kcEscapeHtml(c)}</option>`).join("");
    }

    function apply() {
      const q = (searchEl && searchEl.value || "").trim().toLowerCase();
      const cat = (catEl && catEl.value) || "all";
      const sort = (sortEl && sortEl.value) || "new";

      let filtered = posts.filter((p) => {
        const okCat = cat === "all" || p.category === cat;
        const hay = (p.title + " " + p.excerpt + " " + (p.tags||[]).join(" ") + " " + p.category).toLowerCase();
        const okQ = !q || hay.includes(q);
        return okCat && okQ;
      });

      if (sort === "old") filtered = filtered.slice().sort((a,b)=>a.dateObj - b.dateObj);
      if (sort === "az") filtered = filtered.slice().sort((a,b)=>a.title.localeCompare(b.title,"tr"));
      if (sort === "za") filtered = filtered.slice().sort((a,b)=>b.title.localeCompare(a.title,"tr"));

      grid.innerHTML = filtered.map((p)=>`<div class="col-lg-4 col-md-6">${kcCardHtml(p)}</div>`).join("");
      
      kcRevealStagger(grid, 70);

      const empty = document.getElementById("kc-posts-empty");
      if (empty) empty.style.display = filtered.length ? "none" : "block";
    }

    [searchEl, catEl, sortEl].forEach((el) => el && el.addEventListener("input", apply));
    [catEl, sortEl].forEach((el) => el && el.addEventListener("change", apply));
    apply();
  }




  function initPostCardTilt() {
    try {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (reduce || coarse) return;

      const cards = document.querySelectorAll('.kc-post-card');
      if (!cards || !cards.length) return;

      cards.forEach((card) => {
        let raf = 0;

        const setVars = (e) => {
          const r = card.getBoundingClientRect();
          const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
          const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));

          const ry = (px - 0.5) * 10; // deg
          const rx = -(py - 0.5) * 8; // deg

          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            card.style.setProperty('--kc-rx', rx.toFixed(2) + 'deg');
            card.style.setProperty('--kc-ry', ry.toFixed(2) + 'deg');
            card.style.setProperty('--mx', (px * 100).toFixed(2) + '%');
            card.style.setProperty('--my', (py * 100).toFixed(2) + '%');
            card.classList.add('kc-tilt-active');
          });
        };

        const reset = () => {
          if (raf) cancelAnimationFrame(raf);
          card.style.setProperty('--kc-rx', '0deg');
          card.style.setProperty('--kc-ry', '0deg');
          card.classList.remove('kc-tilt-active');
        };

        card.addEventListener('mousemove', setVars, { passive: true });
        card.addEventListener('mouseleave', reset, { passive: true });
        card.addEventListener('blur', reset, { passive: true });
      });
    } catch (e) { /* ignore */ }
  }

  function initPostDetail() {
    const host = document.getElementById("kc-post-detail");
    if (!host) return;

    const posts = kcGetPosts().sort((a,b)=>b.dateObj - a.dateObj);
    const slug = kcGetParam("slug") || (posts[0] && posts[0].slug);
    const post = posts.find(p=>p.slug===slug) || posts[0];
    if (!post) return;

    // hero
    const heroTitle = document.getElementById("kc-post-hero-title");
    const heroMeta = document.getElementById("kc-post-hero-meta");
    const heroCover = document.getElementById("kc-post-hero-cover");
    const heroChip = document.getElementById("kc-post-hero-chip");
    if (heroTitle) heroTitle.textContent = post.title;
    if (heroChip) heroChip.textContent = post.category;
    if (heroMeta) heroMeta.textContent = `${kcFormatDateTR(post.dateObj)} • ${post.readingTime} dk okuma`;
    if (heroCover) heroCover.src = post.cover;

    // content
    const content = document.getElementById("kc-post-content");
    if (content) {
      content.innerHTML = post.content || "";
      // add ids to headings
      const hs = content.querySelectorAll("h2, h3");
      hs.forEach((h, i) => {
        if (!h.id) h.id = `h-${i}-${(h.textContent||"").toLowerCase().replaceAll(/[^a-z0-9ğüşöçıİĞÜŞÖÇ ]/g,"").trim().replaceAll(/\s+/g,"-")}`;
        h.classList.add("kc-post-h");
      });
    }


    // toc
    const toc = document.getElementById("kc-post-toc");
    if (toc && content) {
      const items = Array.from(content.querySelectorAll("h2")).map((h) => ({
        id: h.id,
        text: h.textContent || ""
      }));
      toc.innerHTML = items.map(it=>`<a class="kc-toc-link" href="#${it.id}">${kcEscapeHtml(it.text)}</a>`).join("");
      toc.querySelectorAll("a").forEach(a=>{
        a.addEventListener("click",(e)=>{
          e.preventDefault();
          const id=a.getAttribute("href")?.slice(1);
          const el=id && document.getElementById(id);
          if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
        });
      });
    }

    // next/prev
    const idx = posts.findIndex(p=>p.slug===post.slug);
    const prev = posts[idx+1];
    const next = posts[idx-1];
    const nav = document.getElementById("kc-post-nav");
    if (nav) {
      const pHtml = prev ? `<a class="kc-post-nav-card" href="news-details.html?slug=${encodeURIComponent(prev.slug)}"><span>Önceki</span><strong>${kcEscapeHtml(prev.title)}</strong></a>` : `<div></div>`;
      const nHtml = next ? `<a class="kc-post-nav-card" href="news-details.html?slug=${encodeURIComponent(next.slug)}"><span>Sonraki</span><strong>${kcEscapeHtml(next.title)}</strong></a>` : `<div></div>`;
      nav.innerHTML = pHtml + nHtml;
    }

    // copy link
    const copyBtn = document.getElementById("kc-copy-link");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          copyBtn.classList.add("is-copied");
          setTimeout(()=>copyBtn.classList.remove("is-copied"), 1200);
        } catch(_) {}
      });
    }

    // reading progress
    const bar = document.querySelector(".kc-read-progress > i");
    function onScroll() {
      if (!bar || !content) return;
      const rect = content.getBoundingClientRect();
      const total = content.scrollHeight - window.innerHeight * 0.4;
      const passed = Math.min(Math.max(window.scrollY - (content.offsetTop - 120), 0), total);
      const pct = total ? (passed / total) * 100 : 0;
      bar.style.width = pct.toFixed(1) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // highlight toc
    if (toc && content) {
      const links = Array.from(toc.querySelectorAll("a"));
      const headings = Array.from(content.querySelectorAll("h2"));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = en.target.id;
            links.forEach((a)=>a.classList.toggle("is-active", a.getAttribute("href")==="#"+id));
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 });
      headings.forEach(h=>io.observe(h));
    }
  }

  // -----------------------------
  // 2026 Premium FAQ (SSS)
  // -----------------------------
  function initFaq2026(){
    const list = document.getElementById('kc-faq-list');
    if(!list) return;

    const searchEl = document.getElementById('kc-faq-search');
    const totalEl = document.getElementById('kc-faq-total');
    const visibleEl = document.getElementById('kc-faq-visible');
    const emptyEl = document.getElementById('kc-faq-empty');
    const pills = Array.from(document.querySelectorAll('.kc-faq-pill[data-kc-faq-cat]'));
    const expandBtn = document.getElementById('kc-faq-expand');
    const collapseBtn = document.getElementById('kc-faq-collapse');

    const items = Array.from(list.querySelectorAll('[data-kc-faq-item]'));
    const cache = new Map();

    items.forEach((item, idx) => {
      const q = (item.querySelector('.kc-faq-q')?.innerText || '').trim();
      const a = (item.querySelector('.kc-faq-a__inner')?.innerText || '').trim();
      cache.set(item, (q + ' ' + a).toLowerCase());
      item.dataset.kcFaqIndex = String(idx + 1);
    });

    const catKey = (item) => (item.getAttribute('data-cat') || 'other');

    const applyCounts = () => {
      const map = { all: 0 };
      items.forEach((it) => {
        map.all += 1;
        const c = catKey(it);
        map[c] = (map[c] || 0) + 1;
      });
      document.querySelectorAll('[data-kc-faq-count]').forEach((el) => {
        const key = el.getAttribute('data-kc-faq-count');
        if(!key) return;
        el.textContent = String(map[key] || 0);
      });
      if(totalEl) totalEl.textContent = String(map.all || items.length);
    };

    const setActivePill = (cat) => {
      pills.forEach((p) => {
        const isOn = p.getAttribute('data-kc-faq-cat') === cat;
        p.classList.toggle('is-active', isOn);
        p.setAttribute('aria-selected', isOn ? 'true' : 'false');
      });
    };

    const closeItem = (item) => {
      if(!item.classList.contains('is-open')) return;
      const btn = item.querySelector('.kc-faq-q');
      const panel = item.querySelector('.kc-faq-a');
      if(!btn || !panel) return;
      btn.setAttribute('aria-expanded', 'false');

      panel.style.overflow = 'hidden';
      panel.style.height = panel.scrollHeight + 'px';
      panel.offsetHeight;
      panel.style.transition = 'height 280ms cubic-bezier(.2,.9,.2,1)';
      panel.style.height = '0px';
      item.classList.remove('is-open');

      const done = () => {
        panel.hidden = true;
        panel.style.transition = '';
        panel.style.height = '';
        panel.style.overflow = '';
        panel.removeEventListener('transitionend', done);
      };
      panel.addEventListener('transitionend', done);
    };

    const openItem = (item) => {
      if(item.classList.contains('is-open')) return;
      const btn = item.querySelector('.kc-faq-q');
      const panel = item.querySelector('.kc-faq-a');
      if(!btn || !panel) return;
      btn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;

      panel.style.overflow = 'hidden';
      panel.style.height = '0px';
      panel.offsetHeight;
      const target = panel.scrollHeight;
      panel.style.transition = 'height 320ms cubic-bezier(.2,.9,.2,1)';
      panel.style.height = target + 'px';
      item.classList.add('is-open');

      const done = () => {
        panel.style.transition = '';
        panel.style.height = '';
        panel.style.overflow = '';
        panel.removeEventListener('transitionend', done);
      };
      panel.addEventListener('transitionend', done);
    };

    const toggleItem = (item) => item.classList.contains('is-open') ? closeItem(item) : openItem(item);

    items.forEach((item) => {
      const btn = item.querySelector('.kc-faq-q');
      const panel = item.querySelector('.kc-faq-a');
      if(panel) panel.hidden = true;
      if(btn){
        btn.addEventListener('click', () => toggleItem(item));
        btn.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleItem(item);
          }
        });
      }
    });

    let activeCat = 'all';
    let query = '';

    const applyFilter = () => {
      const q = query.trim().toLowerCase();
      let visible = 0;
      items.forEach((item) => {
        const catOk = activeCat === 'all' || catKey(item) === activeCat;
        const qOk = !q || (cache.get(item) || '').includes(q);
        const show = catOk && qOk;
        item.classList.toggle('is-hidden', !show);
        if(show) visible += 1;
      });
      if(visibleEl) visibleEl.textContent = String(visible);
      if(emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
    };

    const debounce = (fn, ms=140) => {
      let t;
      return (...args) => {
        window.clearTimeout(t);
        t = window.setTimeout(() => fn(...args), ms);
      };
    };

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        activeCat = pill.getAttribute('data-kc-faq-cat') || 'all';
        setActivePill(activeCat);
        applyFilter();
      });
    });

    if(searchEl){
      const onSearch = debounce(() => {
        query = searchEl.value || '';
        applyFilter();
      });
      searchEl.addEventListener('input', onSearch);
    }

    if(expandBtn){
      expandBtn.addEventListener('click', () => {
        items.forEach((it) => {
          if(!it.classList.contains('is-hidden')) openItem(it);
        });
      });
    }
    if(collapseBtn){
      collapseBtn.addEventListener('click', () => {
        items.forEach((it) => closeItem(it));
      });
    }

    applyCounts();
    setActivePill(activeCat);
    applyFilter();
  }


document.addEventListener("DOMContentLoaded", function () {
    const fns = [
      initExternalLinkHardening,
      initMarquee,
      initCaseTabs,
      initTilt,
      initCompare,
      initSparkline,
      initMeters,
      initPlayground,
      initScenarios,
      initImpactDashboard,
      initSkillboard2026,
      initAboutReveal,
      initRevealStagger,
      initTabGlow,
      initAboutTimelineProgress,
      initCertRail,
      initMagnetic,
      initMiniAccordion,
      initContactStudio,
      initCertHub2026,
      initCvModalModern,
      initPostsFeatured,
      initPostsArchive,
      initPostDetail,
      initPostCardTilt,
      initFaq2026,
    ];
    fns.forEach((fn) => {
      try { fn(); } catch (e) { console.warn("[kc]", fn && fn.name, e); }
    });
  });
})();

/* -------------------------------------------------------
   KC Services — mouse-follow glow (ultra-light)
-------------------------------------------------------- */
(function(){
  try{
    const cards = document.querySelectorAll(".kc-svc-card");
    if(!cards || !cards.length) return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce) return;

    const setVars = (el, ev) => {
      const r = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(r.width, ev.clientX - r.left));
      const y = Math.max(0, Math.min(r.height, ev.clientY - r.top));
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
    };

    cards.forEach((card) => {
      card.addEventListener("pointermove", (ev) => setVars(card, ev), { passive: true });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "30%");
      }, { passive: true });
    });
  }catch(e){
    // no-op
  }
})();

/* -------------------------------------------------------
   KC Service Details — dynamic content by query param
   URL: service-details.html?service=kurumsal
-------------------------------------------------------- */
(function(){
  "use strict";

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function getServiceKey(){
    try{
      const sp = new URLSearchParams(window.location.search || "");
      const fromQuery = (sp.get("service") || sp.get("id") || "").trim();
      if(fromQuery) return fromQuery;
      const h = (window.location.hash || "").replace(/^#/, "").trim();
      if(h) return h;
    }catch(_){
      // no-op
    }
    return "";
  }

  function el(id){ return document.getElementById(id); }

  function esc(s){
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  const ORDER = ["kurumsal", "landing", "dashboard", "webapp", "entegrasyon", "performans"]; 

  const DATA = {
    kurumsal: {
      title: "Kurumsal Web Sitesi",
      lead: "Markanızı net anlatan, mobilde kusursuz görünen ve hızlı açılan kurumsal web sitesi teslim ederim.",
      cover: "assets/img/service/covers/svc-kurumsal.svg",
      bullets: [
        { t: "Güven Veren Tasarım", d: "Ziyaretçi siteye girince ne yaptığınızı hemen anlasın; karmaşa yerine net bir akış." },
        { t: "Hız + Temel SEO", d: "Core Web Vitals odaklı hız optimizasyonu ve Google görünürlüğü için teknik düzen." },
        { t: "Bakımı Kolay", d: "İçerik güncellemesi zor olmasın diye sayfa yapısını sade ve yönetilebilir kurarım." },
      ],
      kpis: [
        { k: "Teslim Süresi", v: "2–4 hafta", n: "Kapsama göre" },
        { k: "Uygun Paket", v: "Kurumsal", n: "Marka + güven + iletişim" },
        { k: "Sonuç", v: "Hızlı & net", n: "Mobil, performans, SEO" },
      ],
      deliverables: [
        "Premium, mobil uyumlu arayüz (okunabilir tipografi, net CTA)",
        "Sayfa yapısı: Anasayfa + Hakkımda + Hizmetler/Çözümler + Projeler + İletişim",
        "İletişim formu ve e‑posta yönlendirme (isteğe bağlı WhatsApp butonu)",
        "Temel SEO: başlıklar, meta etiketler, site haritası (sitemap) ve robots",
        "Hız optimizasyonu: görsel sıkıştırma, lazy-load, gereksiz dosyaların temizlenmesi",
        "Yayın desteği: domain/hosting yönlendirme, SSL ve temel kontroller",
      ],
      process: [
        { no: "01", h: "Keşif", p: "Hedefi ve mesajı netleştiririz. Sitenin neyi çözmesi gerektiğini yazılı hale getiririm." },
        { no: "02", h: "İçerik & Akış", p: "Ziyaretçinin izleyeceği yolu çıkarırım: hangi sayfada ne görmeli, hangi CTA olmalı." },
        { no: "03", h: "UI/UX", p: "Premium arayüz tasarımı: grid, boşluk, tipografi ve komponent standardı." },
        { no: "04", h: "Geliştirme", p: "Temiz kod + responsive. Gereksiz efekt yok; hızlı ve stabil bir yapı." },
        { no: "05", h: "Test & Yayın", p: "Mobil/tarayıcı testleri, hız kontrolleri ve yayına alma." },
        { no: "06", h: "Bakım", p: "Küçük iyileştirmeler, içerik güncellemeleri ve performans takibi." },
      ],
      forWho: [
        "Yeni marka/iş: hızlı ve güven veren bir ilk izlenim isteyenler",
        "Mevcut sitesini modern ve hızlı hale getirmek isteyenler",
        "B2B hizmet veren firmalar (referans, süreç ve iletişim odaklı)",
      ],
      tech: ["HTML/CSS/JS", "Bootstrap", "Performans (CWV)", "Temel SEO", "Form/SMTP", "Analytics"],
      techNotes: [
        { t: "Performans yaklaşımı", b: "Görselleri optimize eder, kritik CSS/JS yükünü azaltır, lazy-load ve cache politikalarıyla açılış hızını yükseltirim." },
        { t: "SEO (teknik temel)", b: "Sayfa başlık hiyerarşisi, meta etiketler, canonical, sitemap/robots ve temiz URL yaklaşımı ile Google tarafını düzgün kurarım." },
        { t: "Bakım & sürüm", b: "Değişiklikleri kontrollü ilerletirim. Küçük iyileştirmeler için hızlı geri dönüş sağlayacak şekilde yapıyı sade tutarım." },
      ],
      faqs: [
        { q: "İçerikleri siz mi hazırlıyorsunuz?", a: "İsterseniz sizden ham metin alıp düzenlerim; isterseniz başlık/akış önerisiyle birlikte birlikte çıkarırız." },
        { q: "Site yayına alındıktan sonra destek var mı?", a: "Evet. Bakım/iyileştirme modeliyle küçük güncellemeleri düzenli şekilde yönetebiliriz." },
        { q: "Google’da çıkmak garanti mi?", a: "Garanti veremem; ancak teknik SEO temelini doğru kurar, hız ve sayfa yapısını Google’a uyumlu hale getiririm." },
      ]
    },

    landing: {
      title: "Landing Page & Kampanya",
      lead: "Tek sayfada güçlü mesaj, net CTA ve ölçümleme altyapısıyla kampanyanızı dönüşüm odaklı kurarım.",
      cover: "assets/img/service/covers/svc-landing.svg",
      bullets: [
        { t: "Dönüşüm Odaklı", d: "Ziyaretçinin karar vermesini kolaylaştıran akış: problem → çözüm → kanıt → CTA." },
        { t: "Ölçümleme", d: "Form/WhatsApp tıklamaları ve temel dönüşümleri ölçebileceğiniz kurulum." },
        { t: "Hızlı Yayın", d: "Kampanya kaçmadan canlıya alırız; ardından veriye göre iyileştiririz." },
      ],
      kpis: [
        { k: "Teslim Süresi", v: "3–7 gün", n: "Kapsama göre" },
        { k: "Odak", v: "Dönüşüm", n: "CTA + ölçüm" },
        { k: "Çıktı", v: "Tek sayfa", n: "Hızlı ve net" },
      ],
      deliverables: [
        "Tek sayfa kampanya kurgusu (headline, fayda, sosyal kanıt, CTA)",
        "Form + teşekkür mesajı (isteğe bağlı WhatsApp yönlendirme)",
        "Analytics/Pixel gibi ölçümleme entegrasyonları (isteğe bağlı)",
        "Hız optimizasyonu ve mobil kullanım testleri",
        "A/B varyasyon hazırlığı (başlık/CTA) — ihtiyaç olursa",
      ],
      process: [
        { no: "01", h: "Hedef", p: "Kampanya hedefi: lead mi satış mı? Net KPI belirleriz." },
        { no: "02", h: "Mesaj", p: "Tek cümle mesaj ve CTA'yı kilitleriz. Gereksiz metinleri atarız." },
        { no: "03", h: "Tasarım", p: "Bento/premium tek sayfa tasarım ve güven unsurları." },
        { no: "04", h: "Geliştirme", p: "Hızlı, SEO temelini bozmayan ve stabil yapı." },
        { no: "05", h: "Ölçüm", p: "Event/goal kurulumları ve test." },
        { no: "06", h: "İyileştirme", p: "Veriye göre başlık/CTA/akış iyileştirmeleri." },
      ],
      forWho: [
        "Reklamdan gelen trafiği doğru yönlendirmek isteyenler",
        "Yeni ürün/hizmet tanıtımı yapanlar",
        "Hızlı MVP kampanyası çıkaracak ekipler",
      ],
      tech: ["HTML/CSS/JS", "Form & event tracking", "Analytics", "Pixel", "Core Web Vitals"],
      techNotes: [
        { t: "Dönüşüm takibi", b: "Form gönderimi, WhatsApp tıklaması gibi aksiyonları event olarak işaretler; raporlanabilir hale getiririm." },
        { t: "Hız", b: "Tek sayfa olduğu için dosya boyutları kritik. Görsel ve script yükünü minimumda tutarım." },
      ],
      faqs: [
        { q: "Reklam hesabına erişim gerekiyor mu?", a: "Şart değil. Ölçümleme için gerekiyorsa birlikte kısa kurulum yaparız." },
        { q: "İçerik kimin tarafından yazılacak?", a: "Sizden bilgi alıp kampanya metnini sadeleştirerek birlikte netleştiririz." },
      ]
    },

    dashboard: {
      title: "Yönetim Paneli / Dashboard",
      lead: "Operasyonu kolaylaştıran ekranlar: rol bazlı yetkilendirme, raporlar ve yönetilebilir arayüzler.",
      cover: "assets/img/service/covers/svc-dashboard.svg",
      bullets: [
        { t: "Rol Bazlı Yetki", d: "Kim neyi görsün, neyi düzenlesin? Yetki modelini baştan doğru kurarım." },
        { t: "Raporlama", d: "Veriyi okunur hale getirir: filtre, liste, grafik ve çıktı." },
        { t: "Sürdürülebilir", d: "Yarın yeni modül eklenirken zorlanmayan modüler ekran yapısı." },
      ],
      kpis: [
        { k: "Teslim Süresi", v: "2–6 hafta", n: "Modül sayısına göre" },
        { k: "Dil", v: ".NET Core", n: "API + admin" },
        { k: "Odak", v: "Operasyon", n: "Yetki + rapor" },
      ],
      deliverables: [
        "Güvenli giriş (JWT/Identity) ve rol bazlı erişim",
        "Listeleme, filtreleme, arama ve sayfalama standartları",
        "Temel rapor ekranları ve export (CSV/Excel) — ihtiyaç olursa",
        "Loglama ve hata izleme yaklaşımı",
        "Dokümantasyon: temel kullanım ve yönetici notları",
      ],
      process: [
        { no: "01", h: "Analiz", p: "Kullanıcı rolleri, ekran listesi ve veri akışlarını çıkarırız." },
        { no: "02", h: "Model", p: "Veri modelini ve yetkilendirmeyi tasarlarız." },
        { no: "03", h: "UI", p: "Kullanımı kolay admin arayüzü (bileşen standardı)." },
        { no: "04", h: "API", p: "Güvenli API uçları, validasyon ve error handling." },
        { no: "05", h: "Test", p: "Kritik akış testleri ve performans kontrolleri." },
        { no: "06", h: "Yayın", p: "Canlı ortam kurulum, izleme ve bakım planı." },
      ],
      forWho: [
        "Sipariş/üyelik/içerik yönetimi gibi bir operasyonu olanlar",
        "Excel/manuel iş yükünü azaltmak isteyen ekipler",
        "Rol ve yetki ihtiyacı bulunan iş süreçleri",
      ],
      tech: ["C#", ".NET Core", "REST API", "SQL", "JWT/Identity", "Logging"],
      techNotes: [
        { t: "Güvenlik", b: "Rol bazlı yetki, validasyon, güvenli token yönetimi ve temel OWASP kontrolleriyle ilerlerim." },
        { t: "Veri modeli", b: "Doğru ilişki ve indeks kararlarıyla raporlamayı hızlı ve stabil hale getiririm." },
      ],
      faqs: [
        { q: "Mevcut sistemime entegre olur mu?", a: "Evet. API üzerinden entegrasyon veya veri aktarımı seçeneklerini birlikte planlarız." },
        { q: "Sonradan modül eklemek zor olur mu?", a: "Modüler kurduğum için yeni ekran/modül ekleme daha kontrollü ve hızlı ilerler." },
      ]
    },

    webapp: {
      title: "Web Uygulaması / SaaS",
      lead: "İş akışınıza özel modüllerle ölçeklenebilir, bakımı kolay bir web uygulaması geliştiririm.",
      cover: "assets/img/service/covers/svc-webapp.svg",
      bullets: [
        { t: "Modüler Mimari", d: "Büyüdükçe bozulmayan bir yapı: modüller, servisler ve net sorumluluklar." },
        { t: "Ölçeklenebilir", d: "Kullanıcı sayısı arttığında performansın düşmemesi için doğru kararlar." },
        { t: "Ürün Mantığı", d: "Sadece kod değil: onboarding, yetki, yönetim ekranları ve ölçüm." },
      ],
      kpis: [
        { k: "Teslim", v: "Sprint bazlı", n: "MVP → iterasyon" },
        { k: "Teknoloji", v: ".NET Core", n: "API + modüller" },
        { k: "Odak", v: "Sürdürülebilir", n: "Bakım + ölçek" },
      ],
      deliverables: [
        "MVP kapsamı ve yol haritası (önceliklendirme)",
        "Kullanıcı/rol yönetimi ve güvenli giriş",
        "Modüler geliştirme (özellik ekleme kolaylığı)",
        "Temel izleme: log, hata yakalama, performans metrikleri",
        "Dokümantasyon ve teslim notları",
      ],
      process: [
        { no: "01", h: "MVP", p: "Önce en kritik değeri veren sürümü tanımlarız." },
        { no: "02", h: "Mimari", p: "Modül sınırları, veri modeli ve API sözleşmeleri." },
        { no: "03", h: "Geliştirme", p: "Sprintlerle ilerleyip her sprintte çalışan çıktı alırız." },
        { no: "04", h: "Kalite", p: "Test, validasyon, hata yönetimi ve güvenlik kontrolleri." },
        { no: "05", h: "Yayın", p: "Canlıya güvenli geçiş, log/izleme ve geri dönüş planı." },
        { no: "06", h: "İyileştirme", p: "Kullanıcı geri bildirimi ve metriklere göre iterasyon." },
      ],
      forWho: [
        "Bir fikri ürünleştirmek isteyen girişimler",
        "İç operasyonunu yazılımla ürünleştirmek isteyen işletmeler",
        "Mevcut uygulamasını modernleştirmek isteyen ekipler",
      ],
      tech: ["C#", ".NET Core", "Clean Architecture", "SQL", "Cache", "Monitoring"],
      techNotes: [
        { t: "Mimari", b: "Sorumlulukları ayırır, modüler/katmanlı yapı kurar; sürdürülebilirliği öncelerim." },
        { t: "Performans", b: "Doğru indeks, cache ve ölçüm yaklaşımıyla ölçeklenebilirlik sağlarım." },
      ],
      faqs: [
        { q: "MVP ne kadar sürede çıkar?", a: "Kapsama bağlı. En hızlı şekilde değer üreten çekirdeği hedefler, ardından iterasyonla büyütürüz." },
        { q: "SaaS için abonelik/ödeme eklenebilir mi?", a: "Evet. Ödeme sağlayıcısı ve üyelik modeline göre entegrasyonu planlarız." },
      ]
    },

    entegrasyon: {
      title: "Entegrasyonlar & Otomasyon",
      lead: "WhatsApp, ödeme, CRM, e‑posta gibi sistemleri sorunsuz bağlar; iş akışlarını otomatikleştiririm.",
      cover: "assets/img/service/covers/svc-entegrasyon.svg",
      bullets: [
        { t: "Uçtan Uca Bağlantı", d: "Form → CRM → e‑posta/WhatsApp bildirimleri gibi uçtan uca akışlar." },
        { t: "Hata Dayanımı", d: "Entegrasyon kopmasın diye retry, log ve izleme yaklaşımı." },
        { t: "Dokümantasyon", d: "Kim, nerede, nasıl kullanacak? Kısa ve net teslim notları." },
      ],
      kpis: [
        { k: "Teslim Süresi", v: "3–10 gün", n: "Entegrasyon sayısına göre" },
        { k: "Odak", v: "Otomasyon", n: "Zaman kazancı" },
        { k: "Çıktı", v: "Stabil akış", n: "Log + izleme" },
      ],
      deliverables: [
        "İhtiyaca göre entegrasyon: ödeme, CRM, e‑posta, WhatsApp",
        "Olay bazlı bildirimler (sipariş/lead/başvuru vb.)",
        "Hata yönetimi + loglama (izlenebilirlik)",
        "Gerekirse basit yönetim ekranı (ayarlar, anahtarlar)",
      ],
      process: [
        { no: "01", h: "Haritalama", p: "Hangi sistem → hangi veri? Akışı şemalaştırırız." },
        { no: "02", h: "Yetkilendirme", p: "API anahtarları, webhook'lar, güvenli erişim." },
        { no: "03", h: "Geliştirme", p: "Bağlantılar + validasyon + hata yönetimi." },
        { no: "04", h: "Test", p: "Senaryoları test eder; edge-case'leri yakalarım." },
        { no: "05", h: "Canlı", p: "Canlı ortama geçiş ve izleme." },
        { no: "06", h: "İyileştirme", p: "Metriklere göre optimizasyon ve küçük geliştirmeler." },
      ],
      forWho: [
        "Lead/sipariş süreçlerini otomatikleştirmek isteyenler",
        "Birden fazla araç kullanan ekipler (CRM, e‑posta, ödeme)",
        "Manuel kopyala‑yapıştır işleri azaltmak isteyenler",
      ],
      tech: ["REST API", "Webhooks", "C#", ".NET Core", "Queue/Retry", "Logging"],
      techNotes: [
        { t: "Dayanıklılık", b: "Retry/backoff, timeouts ve loglarla entegrasyonun kopma riskini azaltırım." },
        { t: "Güvenlik", b: "Anahtar yönetimi, IP doğrulama ve imzalı webhook gibi pratiklerle ilerlerim." },
      ],
      faqs: [
        { q: "Hangi araçlarla çalışıyorsunuz?", a: "Kullandığınız araçların API desteğine göre ilerleriz. WhatsApp/CRM/ödeme gibi yaygın ihtiyaçları çözebilirim." },
        { q: "Entegrasyon bozulursa ne olacak?", a: "Log/izleme ile sorunu hızlı bulur, bakım kapsamında düzeltme planı çıkarırım." },
      ]
    },

    performans: {
      title: "Performans, Google & Bakım",
      lead: "Siteniz hızlı, stabil ve güncel kalsın: hız optimizasyonu, teknik SEO ve düzenli bakım ile ilerleriz.",
      cover: "assets/img/service/covers/svc-performans.svg",
      bullets: [
        { t: "Hız Optimizasyonu", d: "Açılış hızını ölçer, darboğazı bulur ve iyileştiririm." },
        { t: "Teknik SEO", d: "Google'ın sevdiği sayfa yapısı ve temel teknik düzenlemeler." },
        { t: "Sürekli İyileştirme", d: "Küçük ama etkili düzenlemelerle siteniz hep güncel kalır." },
      ],
      kpis: [
        { k: "Teslim", v: "1–5 gün", n: "İyileştirme paketi" },
        { k: "Odak", v: "CWV + SEO", n: "Hız & görünürlük" },
        { k: "Model", v: "Bakım", n: "Aylık/isteğe bağlı" },
      ],
      deliverables: [
        "Hız analizi (Lighthouse/CWV) ve iyileştirme listesi",
        "Görsel ve dosya optimizasyonu (lazy-load, cache, bundle temizliği)",
        "Teknik SEO kontrolleri (başlıklar, meta, sitemap/robots)",
        "Güvenlik ve güncelleme kontrolü (temel hijyen)",
        "Bakım planı: küçük geliştirmeler için net iş akışı",
      ],
      process: [
        { no: "01", h: "Ölçüm", p: "Mevcut durum: hız, hatalar, kullanıcı deneyimi." },
        { no: "02", h: "Öncelik", p: "En çok etkisi olan 3–5 iyileştirmeyi seçeriz." },
        { no: "03", h: "Uygulama", p: "Optimize eder, gereksizi temizlerim." },
        { no: "04", h: "Doğrulama", p: "Tekrar ölçer, iyileşmeyi raporlarım." },
        { no: "05", h: "Yayın", p: "Güvenli geçiş ve kontrol." },
        { no: "06", h: "Bakım", p: "Düzenli küçük iyileştirmeler için plan." },
      ],
      forWho: [
        "Sitesi yavaş açılan ve dönüşüm kaybeden işletmeler",
        "Google görünürlüğünü teknik olarak güçlendirmek isteyenler",
        "Yayından sonra “kim bakacak?” sorunu yaşayanlar",
      ],
      tech: ["Lighthouse", "Core Web Vitals", "Cache", "Image optimization", "SEO basics", "Monitoring"],
      techNotes: [
        { t: "Core Web Vitals", b: "LCP/INP/CLS metriklerini takip eder, görsel/JS/CSS yüklerini buna göre düzenlerim." },
        { t: "Bakım modeli", b: "Küçük iyileştirmeleri biriktirmeden, düzenli ve kontrollü şekilde yayına alırız." },
      ],
      faqs: [
        { q: "Kaç puan artar?", a: "Duruma bağlı. Önce ölçer, sonra en etkili iyileştirmeleri uygularız. Hedefim hissedilir fark yaratmak." },
        { q: "Bakım paketinde neler var?", a: "Küçük geliştirmeler, içerik düzenlemeleri, hız kontrolleri ve temel güvenlik hijyeni." },
      ]
    },
  };

  function normalizeKey(k){
    const key = String(k || "").toLowerCase();
    if(DATA[key]) return key;
    // fallback: if key is like 'performans,'
    const cleaned = key.replace(/[^a-z0-9ğüşıöç_-]/g, "");
    if(DATA[cleaned]) return cleaned;
    return "kurumsal";
  }

  function renderBullets(root, bullets){
    if(!root) return;
    root.innerHTML = "";
    bullets.forEach((b) => {
      const div = document.createElement("div");
      div.className = "kc-sdetail-bullet";
      div.innerHTML =
        '<i class="fa-solid fa-check"></i>' +
        '<div><strong>' + esc(b.t) + '</strong><span>' + esc(b.d) + '</span></div>';
      root.appendChild(div);
    });
  }

  function renderKpis(root, kpis){
    if(!root) return;
    root.innerHTML = "";
    kpis.forEach((x) => {
      const d = document.createElement("div");
      d.className = "kc-kpi";
      d.innerHTML =
        '<div class="kc-kpi__label">' + esc(x.k) + '</div>' +
        '<div class="kc-kpi__value">' + esc(x.v) + '</div>' +
        (x.n ? '<div class="kc-kpi__note">' + esc(x.n) + '</div>' : '');
      root.appendChild(d);
    });
  }

  function renderList(root, items){
    if(!root) return;
    root.innerHTML = "";
    items.forEach((t) => {
      const li = document.createElement("li");
      li.innerHTML = '<i class="fa-solid fa-check"></i><span>' + esc(t) + '</span>';
      root.appendChild(li);
    });
  }

  function renderSteps(root, steps){
    if(!root) return;
    root.innerHTML = "";
    steps.forEach((s) => {
      const d = document.createElement("div");
      d.className = "kc-step-card";
      d.innerHTML =
        '<span class="no">' + esc(s.no) + '</span>' +
        '<h5>' + esc(s.h) + '</h5>' +
        '<p>' + esc(s.p) + '</p>';
      root.appendChild(d);
    });
  }

  function renderTags(root, tags){
    if(!root) return;
    root.innerHTML = "";
    tags.forEach((t) => {
      const s = document.createElement("span");
      s.textContent = t;
      root.appendChild(s);
    });
  }

  function renderAccordion(root, parentId, items, idPrefix){
    if(!root) return;
    root.innerHTML = "";
    items.forEach((it, idx) => {
      const hid = idPrefix + "h" + idx;
      const cid = idPrefix + "c" + idx;
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.innerHTML =
        '<h2 class="accordion-header" id="' + hid + '">' +
          '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#' + cid + '" aria-expanded="false" aria-controls="' + cid + '">' +
            esc(it.t || it.q) +
          '</button>' +
        '</h2>' +
        '<div id="' + cid + '" class="accordion-collapse collapse" aria-labelledby="' + hid + '" data-bs-parent="#' + parentId + '">' +
          '<div class="accordion-body">' + esc(it.b || it.a) + '</div>' +
        '</div>';
      root.appendChild(item);
    });
  }

  function renderSideList(root, activeKey){
    if(!root) return;
    root.innerHTML = "";
    const icons = {
      kurumsal: "fa-building",
      landing: "fa-rocket",
      dashboard: "fa-chart-line",
      webapp: "fa-cubes",
      entegrasyon: "fa-plug",
      performans: "fa-shield-halved",
    };
    ORDER.forEach((k, i) => {
      const d = DATA[k];
      const a = document.createElement("a");
      a.className = "kc-side-link" + (k === activeKey ? " is-active" : "");
      a.href = "service-details.html?service=" + encodeURIComponent(k);
      a.innerHTML =
        '<span class="left"><i class="fa-solid ' + (icons[k] || "fa-layer-group") + '"></i><span>' + esc(d.title) + '</span></span>' +
        '<span class="right">' + String(i + 1).padStart(2, "0") + '</span>';
      root.appendChild(a);
    });
  }

  function init(){
    const host = document.querySelector("[data-kc-service-detail]");
    if(!host) return;

    const key = normalizeKey(getServiceKey());
    const d = DATA[key] || DATA.kurumsal;

    const t = el("kcSvcTitle");
    const lead = el("kcSvcLead");
    const cover = el("kcSvcCover");
    const bcT = el("kcSvcBreadcrumbTitle");
    const bcL = el("kcSvcBreadcrumbLabel");

    if(t) t.textContent = d.title;
    if(lead) lead.textContent = d.lead;
    if(cover) cover.setAttribute("src", d.cover || "assets/img/service/1.jpg");
    if(bcT) bcT.textContent = d.title;
    if(bcL) bcL.textContent = d.title;

    try{ document.title = "Kürşatcan Çankaroğlu | " + d.title; }catch(_){ }

    renderBullets(el("kcSvcBullets"), d.bullets || []);
    renderKpis(el("kcSvcKpis"), d.kpis || []);
    renderList(el("kcSvcDeliverables"), d.deliverables || []);
    renderSteps(el("kcSvcProcess"), d.process || []);
    renderList(el("kcSvcFor"), d.forWho || []);
    renderTags(el("kcSvcTechTags"), d.tech || []);
    renderSideList(el("kcSvcSideList"), key);

    renderAccordion(el("kcTechAccordion"), "kcTechAccordion", (d.techNotes || []).map(x => ({ t: x.t, b: x.b })), "kcTech_" + key + "_");    const faqEl = el("kcFaqAccordion");
    if (faqEl) renderAccordion(faqEl, "kcFaqAccordion", (d.faqs || []).map(x => ({ t: x.q, b: x.a })), "kcFaq_" + key + "_");
  }

  ready(init);
})();

/* ------------------------------------------------------
   HOTFIX: Preloader fail-safe (tıklamalar)
   Bazı senaryolarda (cache, script hata, BFCache) preloader
   görünmese bile üstte kalıp tüm tıklamaları engelleyebilir.
   Bu koruma: preloader'ı güvenli biçimde pasifleştirir.
------------------------------------------------------- */
(function () {
  "use strict";

  function disablePreloader() {
    const p = document.getElementById("preloader") || document.querySelector(".preloader");
    if (!p) return;

    // Never block interactions
    p.classList.add("loaded");
    p.style.pointerEvents = "none";

    // If it's still around, remove it
    setTimeout(() => {
      try {
        p.style.display = "none";
      } catch (_) {}
    }, 1200);
  }

  // Run on load and also as a safety timeout
  window.addEventListener("load", () => setTimeout(disablePreloader, 0), { once: true });
  setTimeout(disablePreloader, 3500);
})();


/* ------------------------------------------------------
   HARDENING: Contact inputs should NOT persist
   - BFCache / back-forward restore can keep filled values
   - We explicitly clear contact fields on pagehide/pageshow
   - No localStorage/sessionStorage/cookies used
------------------------------------------------------- */
(function () {
  "use strict";

  function hasContactUI() {
    return !!(document.querySelector("[data-kc-contact-form]") || document.querySelector("[data-kc-chat]"));
  }

  function isBackForwardRestore(e) {
    if (e && e.persisted) return true;
    try {
      const nav = performance && performance.getEntriesByType && performance.getEntriesByType("navigation");
      if (nav && nav[0] && nav[0].type === "back_forward") return true;
    } catch (_) {}
    return false;
  }

  function markEphemeral(root) {
    const els = root.querySelectorAll("input, textarea");
    els.forEach((el) => {
      try {
        el.setAttribute("autocomplete", "off");
        el.setAttribute("autocorrect", "off");
        el.setAttribute("autocapitalize", "off");
        el.setAttribute("spellcheck", "false");
      } catch (_) {}
    });
  }

  function clearContactFields() {
    // classic contact form
    const classic = document.querySelector("[data-kc-contact-form]");
    if (classic) {
      try { classic.reset(); } catch (_) {}
      const msg = classic.querySelector(".form-message");
      if (msg) msg.textContent = "";
    }

    // mini brief studio
    const studio = document.querySelector("[data-kc-chat]");
    if (studio) {
      studio.querySelectorAll("input, textarea").forEach((el) => {
        const type = String(el.type || "").toLowerCase();
        if (type === "checkbox" || type === "radio") return;
        try { el.value = ""; } catch (_) {}
      });
    }
  }

  function init() {
    if (!hasContactUI()) return;

    // enforce autofill-off (best-effort across browsers)
    markEphemeral(document);

    // clear any browser-restored values on first paint
    clearContactFields();
  }

  document.addEventListener("DOMContentLoaded", init);

  // Clear before BFCache snapshot
  window.addEventListener("pagehide", () => {
    if (!hasContactUI()) return;
    clearContactFields();
  }, true);

  // Clear when coming back via back/forward
  window.addEventListener("pageshow", (e) => {
    if (!hasContactUI()) return;
    if (isBackForwardRestore(e)) clearContactFields();
  }, true);
})();


/* ------------------------------------------------------
   UI POLISH (v59)
   - Statik sitede premium hissi artıran mikro etkileşimler
   - WOW olmayan bloklara scroll reveal
   - Görseller: lazy + async decode
   - Anchor smooth scroll
------------------------------------------------------- */
(function () {
  "use strict";

  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initSmartImages() {
    try {
      document.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
        if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
      });
      // hero/above-the-fold görselleri için istisna (varsa)
      const hero = document.querySelector(".hero-section img");
      if (hero) {
        hero.setAttribute("loading", "eager");
        hero.setAttribute("fetchpriority", "high");
      }
    } catch (_) {}
  }

  function initSmoothAnchors() {
    try {
      document.addEventListener("click", (e) => {
        const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
        if (!a) return;
        const href = a.getAttribute("href") || "";
        if (href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: reduced() ? "auto" : "smooth" });
      }, { passive: false });
    } catch (_) {}
  }

  function initReveal() {
    if (reduced()) return;
    if (!("IntersectionObserver" in window)) return;

    const selector = [
      ".section-title",
      ".kc-value-card",
      ".kc-svc-card",
      ".portfolio-item",
      ".blog-item",
      ".contact-left-items",
      ".contact-right-items",
      ".kc-sdetail-hero",
      ".kc-sdetail-card",
      ".kc-cta-card",
    ].join(",");

    const els = Array.from(document.querySelectorAll(selector))
      .filter((el) => !el.classList.contains("wow"))
      .filter((el) => !el.classList.contains("kc-reveal"));

    if (!els.length) return;
    els.forEach((el) => el.classList.add("kc-reveal"));

    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        if (!ent.isIntersecting) return;
        ent.target.classList.add("is-in");
        io.unobserve(ent.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    els.forEach((el) => io.observe(el));
  }

  function initHeaderMicro() {
    const header = document.getElementById("header-sticky");
    if (!header) return;
    let raf = null;
    function onScroll() {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.pageYOffset || 0;
        document.documentElement.classList.toggle("kc-scrolled", y > 8);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initActiveNav() {
    try {
      const path = (location.pathname || "").split("/").pop() || "index.html";
      const links = document.querySelectorAll("header a, .offcanvas__info a");
      links.forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (!href || href.startsWith("mailto:") || href.startsWith("#")) return;
        const clean = href.split("?")[0].split("#")[0];
        const isActive = clean === path;
        if (isActive) {
          const li = a.closest("li");
          if (li) li.classList.add("active");
          a.classList.add("active");
        }
      });
    } catch (_) {}
  }

  function initButtonTactile() {
    // Dokunma hissi (mobil) — abartmadan
    try {
      const btns = document.querySelectorAll(".theme-btn, button, .btn");
      btns.forEach((b) => {
        b.addEventListener("pointerdown", () => b.classList.add("kc-press"), { passive: true });
        b.addEventListener("pointerup", () => b.classList.remove("kc-press"), { passive: true });
        b.addEventListener("pointercancel", () => b.classList.remove("kc-press"), { passive: true });
        b.addEventListener("mouseleave", () => b.classList.remove("kc-press"), { passive: true });
      });
    } catch (_) {}
  }

  function injectPressCSS() {
    try {
      const style = document.createElement("style");
      style.textContent = `
        .kc-press{ transform: translateY(0) scale(.99) !important; filter: saturate(1.05); }
        html.kc-scrolled .header-1{ box-shadow: 0 14px 55px rgba(2,6,23,.10); }
      `;
      document.head.appendChild(style);
    } catch (_) {}
  }

  function init() {
    initSmartImages();
    initSmoothAnchors();
    initReveal();
    initHeaderMicro();
    initActiveNav();
    injectPressCSS();
    initButtonTactile();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
