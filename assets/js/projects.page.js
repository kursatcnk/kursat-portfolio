(function(){
  'use strict';

  function getParam(name){
    try{
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    }catch(e){ return null; }
  }

  function el(sel){ return document.querySelector(sel); }

  function setText(node, txt){
    if(!node) return;
    node.textContent = (txt || '').toString();
  }

  function splitParagraphs(txt){
    return (txt || '')
      .toString()
      .split(/\n\s*\n|\r\n\s*\r\n|\n|\r/g)
      .map(t => t.trim())
      .filter(Boolean);
  }

  function render(){
    const cover = el('#kc-proj-cover');
    const content = el('#kc-proj-content');
    const sidebar = el('#kc-proj-sidebar');
    if(!cover || !content || !sidebar) return;

    const slug = getParam('slug');
    const list = (window.KC_PROJECTS || []);
    let p = list.find(x => x.slug === slug) || list[0];

    if(!p){
      setText(content, 'Proje bulunamadı.');
      return;
    }

    // Cover
    cover.src = p.cover;
    cover.alt = p.title;

    // Breadcrumb title
    setText(el('#kc-proj-title'), p.title);

    // Main content
    const highlights = (p.highlights || []).map(x => (
      `<li><img src="assets/img/icon/arrow-circle-right.svg" alt="icon"> ${x}</li>`
    )).join('');

    const tech = (p.tech || []).map(x => `<span class="kc-pill">${x}</span>`).join('');

    const descParts = splitParagraphs(p.description || p.excerpt || '');
    const descHtml = (descParts.length ? descParts : [''])
      .map(t => `<p class="mb-3">${t}</p>`)
      .join('');

    const nextStep = `
      <div class="kc-nextbox">
        <h3>Sonraki adım</h3>
        <p>Sizin projeniz için 2–3 kısa soruyla ihtiyacı netleştirip uygulanabilir bir plan/teklif paylaşabilirim.</p>
        <a class="theme-btn" href="contact.html">Teklif Al <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    `;

    content.innerHTML = `
      <span>${(p.category || 'Proje')} • ${(p.year || '')}</span>
      <h2>${p.title}</h2>
      ${descHtml}

      <div class="kc-callout">
        <strong>Kısa özet:</strong> ${(p.excerpt || '')}
      </div>

      <h3 class="mt-3">Öne Çıkanlar</h3>
      <ul class="list-item kc-list">
        ${highlights}
      </ul>

      <h3 class="mt-4">Kullanılan Teknolojiler</h3>
      <div class="kc-pillrow">
        ${tech || '<span class="kc-pill">—</span>'}
      </div>

      ${nextStep}
    `;

    // Sidebar (premium)
    const cat = p.category || 'Proje';
    const year = p.year || '—';
    const techPills = (p.tech || []).slice(0, 8).map(t => `<span class="kc-mini-pill">${t}</span>`).join('') || '<span class="kc-mini-pill">—</span>';

    sidebar.innerHTML = `
      <div class="kc-proj-sidebar">
        <div class="kc-projcard">
          <div class="kc-projcard-head">
            <h3>Proje Bilgileri</h3>
            <span class="kc-year-badge"><i class="fa-regular fa-calendar"></i> ${year}</span>
          </div>

          <dl class="kc-dl">
            <div>
              <dt>Proje</dt>
              <dd>${p.title}</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>${cat}</dd>
            </div>
            <div>
              <dt>Teknolojiler</dt>
              <dd><div class="kc-mini-pillrow">${techPills}</div></dd>
            </div>
          </dl>

          <div class="kc-proj-actions">
            <a href="portfolio.html" title="Tüm projeler"><i class="fa-solid fa-border-all"></i> Tüm Projeler</a>
            <a href="mailto:info.cankaroglu@gmail.com" title="E-posta"><i class="fa-solid fa-envelope"></i> E‑posta</a>
            <a href="contact.html" title="Teklif al"><i class="fa-solid fa-paper-plane"></i> Teklif Al</a>
          </div>
        </div>
      </div>
    `;

    // Title
    try { document.title = p.title + " | Kürşatcan Çankaroğlu"; } catch(e){}
  }

  document.addEventListener('DOMContentLoaded', render);
})();
