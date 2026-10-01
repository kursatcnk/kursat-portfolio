// Veriden üretilen içerik: işler, vaka çalışması, yazılar, sertifikalar, SSS ve hizmet senaryoları.
(function () {
  "use strict";

  const K = window.Kursat;
  const esc = K.escapeHtml;
  const projects = window.KURSAT_PROJECTS || [];
  const posts = (window.KURSAT_POSTS || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const certificates = window.KURSAT_CERTIFICATES || [];

  const MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const MONTHS_SHORT = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

  function formatDate(iso, short) {
    const [y, m, d] = String(iso || "").split("-").map((x) => parseInt(x, 10));
    if (!y || !m) return "";
    const month = (short ? MONTHS_SHORT : MONTHS)[m - 1];
    return d ? `${d} ${month} ${y}` : `${month} ${y}`;
  }

  // Türkçe büyük/küçük harf ve aksan farkını yok sayan arama anahtarı
  function normalize(text) {
    return String(text || "")
      .toLocaleLowerCase("tr-TR")
      .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ç/g, "c")
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function param(name) {
    try { return new URLSearchParams(location.search).get(name) || ""; } catch (_) { return ""; }
  }

  const caseUrl = (slug) => `portfolio-details.html?p=${encodeURIComponent(slug)}`;
  const postUrl = (slug) => `news-details.html?slug=${encodeURIComponent(slug)}`;

  // ---------------------------------------------------------------
  // İşler
  // ---------------------------------------------------------------
  function stageHtml(p, { eager = false } = {}) {
    const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"';
    return `
      <span class="kursat-case-shot kursat-case-shot--main"><img src="${esc(p.cover.main)}" alt="${esc(p.title)} arayüzü" ${loading} decoding="async"></span>
      <span class="kursat-case-shot kursat-case-shot--side"><img src="${esc(p.cover.side)}" alt="" loading="lazy" decoding="async"></span>`;
  }

  function caseHtml(p, index) {
    const no = String(index + 1).padStart(2, "0");
    const github = p.links && p.links.github
      ? `<a class="kursat-link kursat-link--muted" href="${esc(p.links.github)}">GitHub ${K.icons.arrow}</a>` : "";
    return `
      <article class="kursat-case kursat-case--${esc(p.slug)}">
        <a class="kursat-case-stage kursat-reveal" href="${caseUrl(p.slug)}" aria-label="${esc(p.title)} vaka çalışmasını aç">${stageHtml(p)}</a>
        <div class="kursat-grid kursat-case-info kursat-reveal">
          <span class="kursat-case-index">${no}</span>
          <div class="kursat-case-title">
            <h3 class="kursat-h3"><a href="${caseUrl(p.slug)}">${esc(p.title)}</a></h3>
            <p>${esc(p.summary)}</p>
          </div>
          <div class="kursat-case-meta">
            <div><span class="kursat-label">Yıl</span><span>${esc(p.year)}</span></div>
            <div><span class="kursat-label">Tür</span><span>${esc(p.type)}</span></div>
            <div><span class="kursat-label">Rol</span><span>${esc(p.role || "")}</span></div>
          </div>
          <div class="kursat-case-cta">
            <a class="kursat-link" href="${caseUrl(p.slug)}">Vaka çalışmasını oku ${K.icons.arrow}</a>
            ${github}
          </div>
        </div>
      </article>`;
  }

  // Öne çıkan iş: tam ekran sahne. Kompozisyon projeye göre değişiyor.
  function sceneMediaHtml(p) {
    const s = p.scene || {};
    if (s.art) {
      const cards = (s.cards || []).map((src) => `<div class="kursat-scene-card"><img src="${esc(src)}" alt="" loading="lazy" decoding="async"></div>`).join("");
      return `
        <div class="kursat-scene-art"><img src="${esc(s.art)}" alt="" loading="lazy" decoding="async"></div>
        <div class="kursat-scene-cards">${cards}</div>`;
    }
    return (s.shots || []).map((src, i) => `<div class="kursat-scene-shot kursat-scene-shot--${i + 1}"><img src="${esc(src)}" alt="${i === 0 ? esc(p.title) + " arayüzü" : ""}" loading="lazy" decoding="async"></div>`).join("");
  }

  function sceneHtml(p, index, total) {
    const no = String(index + 1).padStart(2, "0");
    const github = p.links && p.links.github
      ? `<a class="kursat-link" href="${esc(p.links.github)}">GitHub ${K.icons.arrow}</a>` : "";
    return `
      <article class="kursat-scene kursat-scene--${esc(p.slug)}" data-kursat-cursor="İncele">
        <div class="kursat-scene-inner">
          <div class="kursat-scene-media" aria-hidden="true">${sceneMediaHtml(p)}</div>
          <div class="kursat-scene-shade"></div>
          <div class="kursat-scene-top"><span class="kursat-label">${no} / ${String(total).padStart(2, "0")}</span><span class="kursat-label">${esc(p.type)} · ${esc(p.year)}</span></div>
          <div class="kursat-container kursat-scene-content">
            <h3><a href="${caseUrl(p.slug)}">${esc(p.sceneTitle || p.title)}</a></h3>
            <p class="kursat-scene-tagline">${esc(p.headline || "")}</p>
            <p class="kursat-scene-summary">${esc(p.summary)}</p>
            <div class="kursat-scene-meta">
              <div><span class="kursat-label">Rol</span><strong>${esc(p.role || "")}</strong></div>
              <div><span class="kursat-label">Teknoloji</span><strong>${esc(p.stack.slice(0, 2).join(" · "))}</strong></div>
            </div>
            <div class="kursat-scene-cta">
              <a class="kursat-button" href="${caseUrl(p.slug)}">Vaka çalışması ${K.icons.arrow}</a>
              ${github}
            </div>
          </div>
        </div>
      </article>`;
  }

  function indexRowHtml(p) {
    if (p.items) {
      const items = p.items.map(([name, provider]) => `<div><strong>${esc(name)}</strong><span>${esc(provider)}</span></div>`).join("");
      return `
        <details>
          <summary class="kursat-index-row">
            <span class="kursat-index-year">${esc(p.year)}</span>
            <span class="kursat-index-name">${esc(p.title)}<small>${esc(p.subtitle)}</small></span>
            <span>${esc(p.type)}</span>
            <span>${esc(p.stack.slice(0, 3).join(" · "))}</span>
            ${K.icons.plus}
          </summary>
          <div class="kursat-index-sub">${items}<div><a class="kursat-link" href="${caseUrl(p.slug)}">Detaylar ${K.icons.arrow}</a></div></div>
        </details>`;
    }
    return `
      <a class="kursat-index-row" href="${caseUrl(p.slug)}">
        <span class="kursat-index-year">${esc(p.year)}</span>
        <span class="kursat-index-name">${esc(p.title)}<small>${esc(p.subtitle || "")}</small></span>
        <span>${esc(p.type)}</span>
        <span>${esc(p.stack.slice(0, 3).join(" · "))}</span>
        ${K.icons.arrow}
      </a>`;
  }

  function renderWork() {
    document.querySelectorAll("[data-kursat-cases]").forEach((el) => {
      el.innerHTML = projects.filter((p) => p.featured).map(caseHtml).join("");
    });
    document.querySelectorAll("[data-kursat-scenes]").forEach((el) => {
      const featured = projects.filter((p) => p.featured);
      el.innerHTML = featured.map((p, i) => sceneHtml(p, i, featured.length)).join("");
    });
    document.querySelectorAll("[data-kursat-index]").forEach((el) => {
      const rows = projects.filter((p) => !p.featured).map(indexRowHtml).join("");
      el.innerHTML = `
        <div class="kursat-index-head kursat-label"><span>Yıl</span><span>Proje</span><span>Tür</span><span>Teknoloji</span><span></span></div>
        ${rows}`;
    });
    document.querySelectorAll("[data-kursat-count]").forEach((el) => {
      const kind = el.getAttribute("data-kursat-count");
      const counts = { featured: projects.filter((p) => p.featured).length, archive: projects.filter((p) => !p.featured).length, posts: posts.length, certificates: certificates.length };
      if (kind in counts) el.textContent = String(counts[kind]);
    });
  }

  // ---------------------------------------------------------------
  // Vaka çalışması
  // ---------------------------------------------------------------
  function listHtml(items) {
    return `<ul class="kursat-cs-list">${items.map((x) => `<li><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></li>`).join("")}</ul>`;
  }

  function block(label, inner) {
    return `
      <section class="kursat-grid kursat-cs-body kursat-section--tight kursat-reveal">
        <div class="kursat-cs-side"><span class="kursat-label">${label}</span></div>
        <div class="kursat-cs-main">${inner}</div>
      </section>`;
  }

  function renderCaseStudy() {
    const host = document.querySelector("[data-kursat-case-study]");
    if (!host) return;
    // Eski sitedeki adresler yeni adlara düşsün
    const aliases = {
      "cnk-fitness-yonetim-sistemi": "cnk-fitness", "rafael-guzellik-merkezi": "rafael-guzellik", "eray-genc-portfolio": "eray-genc",
      "stok-urun-takip-sistemi": "stok-takip", "kutuphane-yonetim-sistemi": "kutuphane", "translator-clone": "ceviri",
      "eticaret-analiz-raporlama": "eticaret-analiz"
    };
    let slug = param("p") || param("slug");
    if (aliases[slug]) slug = aliases[slug];
    else if (slug.indexOf("advancedai-") === 0) slug = "advancedai";
    const index = projects.findIndex((p) => p.slug === slug);
    const p = projects[index];

    if (!p) {
      host.innerHTML = `
        <section class="kursat-page-head kursat-container">
          <span class="kursat-label">Bulunamadı</span>
          <h1 class="kursat-h1">Bu proje burada değil.</h1>
          <p class="kursat-lead">Bağlantı eskimiş olabilir. Tüm işler tek sayfada duruyor.</p>
          <div class="kursat-hero-actions"><a class="kursat-button" href="portfolio.html">Tüm işler ${K.icons.arrow}</a></div>
        </section>`;
      return;
    }

    document.title = `${p.title} — Kürşatcan Çankaroğlu`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", p.summary);

    const links = [];
    if (p.links && p.links.github) links.push(`<a class="kursat-button kursat-button--ghost" href="${esc(p.links.github)}">${K.icons.github} Kaynak kodu</a>`);
    if (p.links && p.links.live) links.push(`<a class="kursat-button" href="${esc(p.links.live)}">Canlı sürüm ${K.icons.arrow}</a>`);

    const facts = [
      ["Yıl", p.year], ["Tür", p.type], ["Rol", p.role || "Tasarım ve geliştirme"], ["Teknoloji", p.stack.slice(0, 3).join(" · ")]
    ].map(([k, v]) => `<div><span class="kursat-label">${k}</span><span>${esc(v)}</span></div>`).join("");

    let body = "";
    const intro = (p.intro || []).map((t) => `<p>${esc(t)}</p>`).join("");

    if (p.featured) {
      body += block("Neden", `${p.headline ? `<h2>${esc(p.headline)}</h2>` : ""}${intro}`);
      if (p.features) body += block("Neler yapıyor", listHtml(p.features));
      if (p.engineering) body += block("Mühendislik", listHtml(p.engineering));
      if (p.gallery) {
        const figs = p.gallery.map((g) => `
          <figure class="${g.wide ? "is-wide" : ""}">
            <div class="kursat-gallery-frame kursat-unveil${g.pad ? " is-pad" : ""}" style="--_stage:${esc(p.stage)}"><img src="${esc(g.src)}" alt="${esc(g.caption)}" loading="lazy" decoding="async"></div>
            <figcaption>${esc(g.caption)}</figcaption>
          </figure>`).join("");
        body += `
          <section class="kursat-section--tight kursat-reveal">
            <div class="kursat-grid kursat-cs-body" style="margin-bottom:28px"><div class="kursat-cs-side"><span class="kursat-label">Ekranlar</span></div></div>
            <div class="kursat-gallery">${figs}</div>
          </section>`;
      }
    } else {
      body += block("Özet", intro);
      if (p.highlights) body += block("Öne çıkanlar", `<ul class="kursat-cs-list">${p.highlights.map((h) => `<li><span>${esc(h)}</span></li>`).join("")}</ul>`);
      if (p.items) body += block("Entegrasyonlar", `<ul class="kursat-cs-list">${p.items.map(([n, s]) => `<li><strong>${esc(n)}</strong><span>${esc(s)}</span></li>`).join("")}</ul>`);
    }
    body += block("Teknoloji", `<div class="kursat-stack">${p.stack.map((s) => `<span class="kursat-tag">${esc(s)}</span>`).join("")}</div>`);

    const next = projects[(index + 1) % projects.length];
    const hero = p.featured ? `
      <div class="kursat-container kursat-cs-hero">
        <div class="kursat-case kursat-case--${esc(p.slug)}"><div class="kursat-case-stage kursat-unveil">${stageHtml(p, { eager: true })}</div></div>
      </div>` : "";

    host.innerHTML = `
      <section class="kursat-page-head kursat-container">
        <nav class="kursat-crumbs" aria-label="Konum"><a href="portfolio.html">İşler</a><span>/</span><span>${esc(p.title)}</span></nav>
        <div class="kursat-grid kursat-cs-head">
          <div class="kursat-cs-head-main">
            <h1 class="kursat-h1">${esc(p.title)}</h1>
            <p class="kursat-lead">${esc(p.summary)}</p>
            ${links.length ? `<div class="kursat-hero-actions">${links.join("")}</div>` : ""}
          </div>
          <div class="kursat-cs-facts">${facts}</div>
        </div>
      </section>
      ${hero}
      <div class="kursat-container">${body}</div>
      <div class="kursat-container">
        <a class="kursat-next" href="${caseUrl(next.slug)}">
          <span><span class="kursat-label">Sıradaki iş</span><br><span class="kursat-h2">${esc(next.title)}</span></span>
          <span class="kursat-icon-button" aria-hidden="true">${K.icons.right}</span>
        </a>
      </div>`;
    K.hardenLinks(host);
    K.observeReveals(host);
  }

  // ---------------------------------------------------------------
  // Yazılar
  // ---------------------------------------------------------------
  function postRowHtml(p) {
    return `
      <a class="kursat-post-row" href="${postUrl(p.slug)}" data-cat="${esc(p.category)}" data-search="${esc(normalize(p.title + " " + p.excerpt + " " + (p.tags || []).join(" ")))}">
        <time datetime="${esc(p.date)}">${formatDate(p.date, true)}</time>
        <div><h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></div>
        <span class="kursat-tag">${esc(p.category)}</span>
        <span class="kursat-post-read">${esc(p.readingTime)} dk</span>
        ${K.icons.arrow}
      </a>`;
  }

  function renderPosts() {
    document.querySelectorAll("[data-kursat-latest-posts]").forEach((el) => {
      const n = parseInt(el.getAttribute("data-kursat-latest-posts"), 10) || 4;
      el.innerHTML = posts.slice(0, n).map(postRowHtml).join("");
    });

    const list = document.querySelector("[data-kursat-posts]");
    if (!list) return;
    list.innerHTML = posts.map(postRowHtml).join("");

    const filters = document.querySelector("[data-kursat-post-filters]");
    const search = document.querySelector("[data-kursat-post-search]");
    const empty = document.querySelector("[data-kursat-post-empty]");
    const cats = [...new Set(posts.map((p) => p.category))];
    let active = "all";

    if (filters) {
      filters.innerHTML = [`<button class="kursat-filter is-active" type="button" data-cat="all">Tümü <small>${posts.length}</small></button>`]
        .concat(cats.map((c) => `<button class="kursat-filter" type="button" data-cat="${esc(c)}">${esc(c)} <small>${posts.filter((p) => p.category === c).length}</small></button>`))
        .join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".kursat-filter");
        if (!b) return;
        active = b.dataset.cat;
        filters.querySelectorAll(".kursat-filter").forEach((x) => x.classList.toggle("is-active", x === b));
        apply();
      });
    }
    if (search) search.addEventListener("input", apply);

    function apply() {
      const q = normalize(search ? search.value.trim() : "");
      let shown = 0;
      list.querySelectorAll(".kursat-post-row").forEach((row) => {
        const ok = (active === "all" || row.dataset.cat === active) && (!q || row.dataset.search.includes(q));
        row.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle("is-visible", shown === 0);
    }
  }

  function renderPostDetail() {
    const host = document.querySelector("[data-kursat-post]");
    if (!host) return;
    const slug = param("slug") || param("p");
    const index = posts.findIndex((p) => p.slug === slug);
    const p = posts[index];
    if (!p) {
      host.innerHTML = `
        <section class="kursat-page-head kursat-container">
          <span class="kursat-label">Bulunamadı</span>
          <h1 class="kursat-h1">Bu yazı burada değil.</h1>
          <div class="kursat-hero-actions"><a class="kursat-button" href="news.html">Tüm yazılar ${K.icons.arrow}</a></div>
        </section>`;
      return;
    }
    document.title = `${p.title} — Kürşatcan Çankaroğlu`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", p.excerpt);

    const prev = posts[index + 1];
    const next = posts[index - 1];
    const tags = (p.tags || []).filter((t, i, a) => a.indexOf(t) === i).map((t) => `<span class="kursat-tag">${esc(t)}</span>`).join("");

    // İçerik kendi veri dosyamdan geliyor, kullanıcı girdisi değil; bu yüzden HTML olarak basıyorum.
    host.innerHTML = `
      <div class="kursat-progress" data-kursat-progress></div>
      <section class="kursat-page-head kursat-container">
        <nav class="kursat-crumbs" aria-label="Konum"><a href="news.html">Yazılar</a><span>/</span><span>${esc(p.category)}</span></nav>
        <div class="kursat-article-head">
          <h1 class="kursat-h1">${esc(p.title)}</h1>
          <p class="kursat-lead">${esc(p.excerpt)}</p>
          <div class="kursat-article-meta kursat-label">
            <span>${formatDate(p.date)}</span><span>${esc(p.readingTime)} dk okuma</span><span>Kürşatcan Çankaroğlu</span>
          </div>
        </div>
      </section>
      <div class="kursat-container"><hr></div>
      <article class="kursat-container"><div class="kursat-article" style="padding-top:clamp(40px,6vw,72px)">${p.content}</div>
        <div class="kursat-article-foot">${tags}<button class="kursat-tag" type="button" data-kursat-copy="${esc(location.href)}" data-kursat-copy-message="Bağlantı kopyalandı">Bağlantıyı kopyala</button></div>
      </article>
      <div class="kursat-container" style="margin-top:clamp(64px,8vw,112px)">
        ${next ? `<a class="kursat-next" href="${postUrl(next.slug)}"><span><span class="kursat-label">Sonraki yazı</span><br><span class="kursat-h3">${esc(next.title)}</span></span><span class="kursat-icon-button" aria-hidden="true">${K.icons.right}</span></a>` : ""}
        ${prev ? `<a class="kursat-next" href="${postUrl(prev.slug)}"><span><span class="kursat-label">Önceki yazı</span><br><span class="kursat-h3">${esc(prev.title)}</span></span><span class="kursat-icon-button" aria-hidden="true">${K.icons.right}</span></a>` : ""}
      </div>`;

    const bar = host.querySelector("[data-kursat-progress]");
    const article = host.querySelector(".kursat-article");
    const onScroll = () => {
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      bar.style.width = (done * 100).toFixed(2) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---------------------------------------------------------------
  // Sertifikalar
  // ---------------------------------------------------------------
  const CERT_CATS = { veri: "Veri & AI", yazilim: "Yazılım & UX", siber: "Siber güvenlik", yonetim: "Yönetim" };

  function certHtml(c) {
    return `
      <article class="kursat-cert" data-cat="${esc(c.cat)}" data-date="${esc(c.date)}" data-title="${esc(c.title)}" data-search="${esc(normalize(c.title + " " + c.id + " " + c.tags.join(" ")))}">
        <div class="kursat-cert-top"><span class="kursat-label">BTK Akademi</span><span class="kursat-label">${formatDate(c.date, true)}</span></div>
        <h3>${esc(c.title)}</h3>
        <div class="kursat-stack">${c.tags.map((t) => `<span class="kursat-tag">${esc(t)}</span>`).join("")}</div>
        <div class="kursat-cert-id">
          <code>${esc(c.id)}</code>
          <button class="kursat-copy" type="button" data-kursat-copy="${esc(c.id)}" data-kursat-copy-message="Credential ID kopyalandı">${K.icons.copy} Kopyala</button>
        </div>
      </article>`;
  }

  function renderCertificates() {
    document.querySelectorAll("[data-kursat-certs-preview]").forEach((el) => {
      const n = parseInt(el.getAttribute("data-kursat-certs-preview"), 10) || 6;
      el.innerHTML = certificates.slice(0, n).map(certHtml).join("");
    });

    const grid = document.querySelector("[data-kursat-certs]");
    if (!grid) return;
    grid.innerHTML = certificates.map(certHtml).join("");
    const filters = document.querySelector("[data-kursat-cert-filters]");
    const search = document.querySelector("[data-kursat-cert-search]");
    const sort = document.querySelector("[data-kursat-cert-sort]");
    const empty = document.querySelector("[data-kursat-cert-empty]");
    const count = document.querySelector("[data-kursat-cert-count]");
    let active = "all";

    if (filters) {
      filters.innerHTML = [`<button class="kursat-filter is-active" type="button" data-cat="all">Tümü <small>${certificates.length}</small></button>`]
        .concat(Object.entries(CERT_CATS).map(([k, v]) => `<button class="kursat-filter" type="button" data-cat="${k}">${v} <small>${certificates.filter((c) => c.cat === k).length}</small></button>`))
        .join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".kursat-filter");
        if (!b) return;
        active = b.dataset.cat;
        filters.querySelectorAll(".kursat-filter").forEach((x) => x.classList.toggle("is-active", x === b));
        apply();
      });
    }
    search?.addEventListener("input", apply);
    sort?.addEventListener("change", apply);

    function apply() {
      const q = normalize(search ? search.value.trim() : "");
      const cards = [...grid.querySelectorAll(".kursat-cert")];
      const mode = sort ? sort.value : "new";
      cards.sort((a, b) => {
        if (mode === "old") return a.dataset.date.localeCompare(b.dataset.date);
        if (mode === "az") return a.dataset.title.localeCompare(b.dataset.title, "tr");
        return b.dataset.date.localeCompare(a.dataset.date);
      }).forEach((c) => grid.appendChild(c));
      let shown = 0;
      cards.forEach((c) => {
        const ok = (active === "all" || c.dataset.cat === active) && (!q || c.dataset.search.includes(q));
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = `${shown} sertifika`;
      if (empty) empty.classList.toggle("is-visible", shown === 0);
    }
    apply();
  }

  // ---------------------------------------------------------------
  // SSS
  // ---------------------------------------------------------------
  function initFaq() {
    const wrap = document.querySelector("[data-kursat-faq]");
    if (!wrap) return;
    const items = [...wrap.querySelectorAll("details")];
    const filters = document.querySelector("[data-kursat-faq-filters]");
    const search = document.querySelector("[data-kursat-faq-search]");
    const empty = document.querySelector("[data-kursat-faq-empty]");
    const toggleAll = document.querySelector("[data-kursat-faq-toggle]");
    items.forEach((d) => { d.dataset.search = normalize(d.textContent); });
    let active = "all";

    filters?.querySelectorAll(".kursat-filter").forEach((b) => {
      const cat = b.dataset.cat;
      const n = cat === "all" ? items.length : items.filter((d) => d.dataset.cat === cat).length;
      const small = b.querySelector("small");
      if (small) small.textContent = String(n);
    });
    filters?.addEventListener("click", (e) => {
      const b = e.target.closest(".kursat-filter");
      if (!b) return;
      active = b.dataset.cat;
      filters.querySelectorAll(".kursat-filter").forEach((x) => x.classList.toggle("is-active", x === b));
      apply();
    });
    search?.addEventListener("input", apply);
    toggleAll?.addEventListener("click", () => {
      const visible = items.filter((d) => !d.hidden);
      const open = visible.some((d) => !d.open);
      visible.forEach((d) => { d.open = open; });
      toggleAll.textContent = open ? "Tümünü kapat" : "Tümünü aç";
    });

    function apply() {
      const q = normalize(search ? search.value.trim() : "");
      let shown = 0;
      items.forEach((d) => {
        const ok = (active === "all" || d.dataset.cat === active) && (!q || d.dataset.search.includes(q));
        d.hidden = !ok;
        if (ok) shown++;
      });
      empty?.classList.toggle("is-visible", shown === 0);
    }
  }

  // ---------------------------------------------------------------
  // Hizmetler: hedefe göre senaryo sekmeleri
  // ---------------------------------------------------------------
  function initScenarios() {
    const wrap = document.querySelector("[data-kursat-scenarios]");
    if (!wrap) return;
    const tabs = [...wrap.querySelectorAll(".kursat-scenario-tab")];
    const panels = [...wrap.querySelectorAll(".kursat-scenario-panel")];
    const activate = (key) => {
      tabs.forEach((t) => { const on = t.dataset.key === key; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", on ? "true" : "false"); });
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.key === key));
    };
    tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.key)));
    if (tabs[0]) activate(tabs[0].dataset.key);
  }

  // Dil seviyesi çubukları görünür olunca dolsun
  function initBars() {
    const bars = document.querySelectorAll(".kursat-lang-bar i");
    if (!bars.length) return;
    if (!("IntersectionObserver" in window)) { bars.forEach((b) => { b.style.width = b.dataset.width; }); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.width; io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    bars.forEach((b) => io.observe(b));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderWork();
    renderCaseStudy();
    renderPosts();
    renderPostDetail();
    renderCertificates();
    initFaq();
    initScenarios();
    initBars();
    K.hardenLinks();
    K.observeReveals();
  });
})();
