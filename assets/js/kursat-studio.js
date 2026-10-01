// Brief stüdyosu: ziyaretçinin seçimlerinden net bir proje özeti ve e-posta taslağı çıkarıyorum.
// Gönderim sırası: EmailJS (anahtarlar girildiyse) → FormSubmit (backend gerektirmez) → Gmail taslağı.
(function () {
  "use strict";

  const K = window.Kursat;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function initStudio() {
    const root = document.querySelector("[data-kursat-studio]");
    if (!root) return;

    const $ = (sel) => root.querySelector(sel);
    const field = (name) => root.querySelector(`[data-kursat-field="${name}"]`);

    const youEl = $("[data-kursat-you]");
    const meEl = $("[data-kursat-me]");
    const copyBtn = $("[data-kursat-action='copy']");
    const mailBtn = $("[data-kursat-action='gmail']");
    const sendBtn = $("[data-kursat-action='send']");
    const fillBtn = $("[data-kursat-action='fill']");
    const shortBtn = $("[data-kursat-action='short']");
    const statusEl = $("[data-kursat-status]");

    let isSending = false;

    const preview = {
      subject: $("[data-kursat-preview='subject']"),
      to: $("[data-kursat-preview='to']"),
      from: $("[data-kursat-preview='from']"),
      body: $("[data-kursat-preview='body']")
    };

    const fields = {
      typeWrap: field("type"),
      needsWrap: field("needs"),
      prioritiesWrap: field("priorities"),
      deadlineWrap: field("deadline"),
      pagesWrap: field("pages"),
      langWrap: field("lang"),
      contentWrap: field("content"),
      budgetWrap: field("budget"),
      goal: field("goal"),
      notes: field("notes"),
      url: field("url"),
      scopeWrap: field("scope"),
      name: field("name"),
      company: field("company"),
      from: field("from"),
      phone: field("phone"),
      templateWrap: field("template"),
      toneWrap: field("tone"),
      audience: field("audience"),
      refs: field("refs"),
      integrations: field("integrations"),
      pagesList: field("pagesList"),
      questionsWrap: field("questions")
    };

    const emailTo = (root.dataset.kursatEmail || "info.cankaroglu@gmail.com").trim();
    const emailjsPublic = (root.dataset.kursatEmailjsPublic || "").trim();
    const emailjsService = (root.dataset.kursatEmailjsService || "").trim();
    const emailjsTemplate = (root.dataset.kursatEmailjsTemplate || "").trim();

    const impact = {
      briefScore: $("[data-kursat-brief-score]"),
      ring: $("[data-kursat-ring]"),
      ringLabel: $("[data-kursat-ring-label]"),
      focus: $("[data-kursat-focus]"),
      focusDesc: $("[data-kursat-focus-desc]"),
      missingList: $("[data-kursat-missing]"),
      roadmap: $("[data-kursat-roadmap]"),
      estimate: $("[data-kursat-estimate]"),
      deliver: $("[data-kursat-deliver]"),
      wins: $("[data-kursat-wins]"),
      risks: $("[data-kursat-risks]")
    };

    // --- EmailJS: sadece gerçek anahtarlar girildiğinde devreye giriyor ---
    function canEmailJS() {
      return !!(window.emailjs && emailjsPublic && emailjsService && emailjsTemplate &&
        emailjsPublic !== "YOUR_PUBLIC_KEY" && emailjsService !== "YOUR_SERVICE_ID" && emailjsTemplate !== "YOUR_TEMPLATE_ID");
    }

    function initEmailJS() {
      try {
        if (!canEmailJS()) return false;
        if (window.__kursatEmailjsInit) return true;
        window.emailjs.init({ publicKey: emailjsPublic });
        window.__kursatEmailjsInit = true;
        return true;
      } catch (_) {
        return false;
      }
    }

    // --- seçim okuma/yazma ---
    const chipValue = (b) => (b.dataset.value || b.textContent || "").trim();

    function getActiveValue(wrap) {
      if (!wrap) return "";
      const btn = wrap.querySelector(".kursat-chip.is-active") || wrap.querySelector(".kursat-chip");
      return btn ? chipValue(btn) : "";
    }

    function setActiveValue(wrap, value) {
      if (!wrap) return;
      wrap.querySelectorAll(".kursat-chip").forEach((b) => {
        const active = chipValue(b) === value;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    function getCheckedValues(wrap) {
      if (!wrap) return [];
      return Array.from(wrap.querySelectorAll('input[type="checkbox"]'))
        .filter((i) => i.checked)
        .map((i) => (i.value || "").trim())
        .filter(Boolean);
    }

    function parseCommaList(v) {
      const t = String(v || "").trim();
      if (!t) return [];
      return t.split(/\n|,|;/g).map((x) => x.trim()).filter(Boolean).slice(0, 10);
    }

    function readSelectedChips(wrap) {
      if (!wrap) return [];
      return Array.from(wrap.querySelectorAll(".kursat-chip.is-selected")).map(chipValue).filter(Boolean);
    }

    function setSelectedChip(btn, on) {
      if (!btn) return;
      btn.classList.toggle("is-selected", !!on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }

    // Öncelikler: çoklu ve sıralı. Sıra data-order ile chip üzerinde tutuluyor.
    function readPriorityOrder() {
      if (!fields.prioritiesWrap) return [];
      const selected = Array.from(fields.prioritiesWrap.querySelectorAll(".kursat-chip.is-selected"))
        .map((b) => ({ v: chipValue(b), o: parseInt(b.getAttribute("data-order") || "0", 10) || 0 }))
        .filter((x) => x.v);
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
      const btns = Array.from(fields.prioritiesWrap.querySelectorAll(".kursat-chip"));
      const set = new Set(values);
      btns.forEach((b) => {
        setSelectedChip(b, set.has(chipValue(b)));
        b.removeAttribute("data-order");
      });
      values.forEach((v, idx) => {
        const el = btns.find((b) => chipValue(b) === v);
        if (el) el.setAttribute("data-order", String(idx + 1));
      });
    }

    const state = {};

    function readState() {
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
      state.scope = getCheckedValues(fields.scopeWrap);
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
      state.questions = getCheckedValues(fields.questionsWrap);
      state.priorities = readPriorityOrder();
    }

    // --- analiz ---
    function primaryPriority() {
      return (state.priorities && state.priorities[0]) ? state.priorities[0] : "Site hızı & hızlı açılış";
    }

    function estimateTime() {
      const count = (state.scope || []).length;
      const type = (state.type || "").toLocaleLowerCase("tr-TR");

      let w = 1 + Math.ceil(count / 2);
      if (!count) w = 2;
      if (type.includes("yeni")) w += 2;
      if (type.includes("saas") || type.includes("uygulama")) w += 3;
      if (type.includes("e-ticaret")) w += 3;
      if (type.includes("panel") || type.includes("dashboard")) w += 2;
      if (type.includes("landing")) w = Math.max(1, w - 1);

      if (w <= 1) return "1 hafta";
      if (w <= 2) return "1–2 hafta";
      if (w <= 3) return "2–3 hafta";
      if (w <= 4) return "3–4 hafta";
      if (w <= 6) return "4–6 hafta";
      return "6–8 hafta";
    }

    function computeBriefScore() {
      let s = 0;
      const add = (cond, pts) => { if (cond) s += pts; };
      add(!!(state.type && state.type.trim()), 10);
      add((state.priorities || []).length > 0, 10);
      add((state.needs || []).length > 0, 10);
      add((state.goal || "").trim().length > 10, 15);
      add(!!(state.deadline && state.deadline.trim()), 8);
      add(!!(state.pages && state.pages.trim()), 4);
      add(!!(state.lang && state.lang.trim()), 4);
      add(!!(state.content && state.content.trim()), 6);
      add((state.scope || []).length > 0, 12);
      add(!!(state.url && state.url.trim()), 7);
      add(!!(state.budget && state.budget.toLocaleLowerCase("tr-TR") !== "belirsiz"), 4);
      add(!!((state.name || "").trim() && (state.from || "").trim()), 6);
      add((state.notes || "").trim().length > 8, 4);
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
      const t = String(p1 || "").toLocaleLowerCase("tr-TR");
      const goal = (state.goal || "").toLocaleLowerCase("tr-TR");
      const needs = (state.needs || []).join(" ").toLocaleLowerCase("tr-TR");
      const scope = (state.scope || []).join(" ").toLocaleLowerCase("tr-TR");

      let key = "content";
      let desc = "Kapsamı netleştirip önce hızlı kazanımları alalım, sonra ölçekleyelim.";
      let steps = [
        "Ön analiz (ölçüm + kontrol listesi) ve kapsam netleştirme",
        "Hızlı kazanımlar (arayüz, akış, SEO) ve temel düzenlemeler",
        "Test, yayına alma ve sonraki sprint listesi"
      ];

      if (t.includes("hız") || t.includes("performans") || t.includes("cwv")) {
        key = "performance";
        desc = "Ölçüm, darboğaz analizi, ardından hız ve akıcılık; skor kalıcı olsun.";
        steps = [
          "Ölçüm: Lighthouse, WebPageTest ve gerçek cihaz kontrolü",
          "Hızlı kazanımlar: görsel, font, cache ve kritik istekler",
          "Kalıcı hız: JS azaltma ve kritik yükleme yolunu iyileştirme"
        ];
      } else if (t.includes("google") || t.includes("seo")) {
        key = "content";
        desc = "Bilgi mimarisi, başlık düzeni, schema ve sitemap ile indekslenebilirliği güçlendirelim.";
        steps = [
          "Sayfa kurgusu: içerik hiyerarşisi ve başlık (H1–H3) düzeni",
          "Teknik SEO: title/meta, schema, sitemap ve robots",
          "İçerik planı: ana sayfalar ve blog/SSS taslakları"
        ];
      } else if (t.includes("dönüş") || t.includes("teklif") || t.includes("cta")) {
        key = "conversion";
        desc = "Çağrı akışı, mikro metinler ve sade formlarla teklif ve randevu dönüşümünü artırırız.";
        steps = [
          "Çağrı haritası: ana aksiyonlar ve mikro metinler",
          "Form ve akış: adım azaltma, doğrulama, spam koruması",
          "Ölçüm: GA4/GTM olay planı ve hedef tanımı"
        ];
      } else if (t.includes("içerik") || t.includes("bakım") || t.includes("güven")) {
        key = "maintenance";
        desc = "Bakımı kolay bir yapı kurup güncelleme ve entegrasyonları güvenli hâle getiririz.";
        steps = [
          "Teknik yapı: bileşen sistemi ve modüler mimari",
          "İçerik ve entegrasyon: içerik modeli, akışlar, yetki",
          "Sağlamlaştırma: temel güvenlik kontrolleri ve izleme"
        ];
      } else if (t.includes("modern") || t.includes("kullanım")) {
        key = "content";
        desc = "Tasarım sistemi ve bileşen setiyle güçlü bir görünüm ve hızlı geliştirme sağlar.";
        steps = [
          "Tasarım değişkenleri: renk, tipografi, boşluk ve grid",
          "Bileşen seti: buton, kart, form ve bölümler",
          "Hareket ve detay: mikro etkileşimler ve duyarlı düzen"
        ];
      }

      if ((needs.includes("rapor") || scope.includes("rapor")) && !steps[2].toLocaleLowerCase("tr-TR").includes("ölçüm")) {
        steps[2] = "Ölçüm: GA4/GTM olay planı ve rapor ekranı";
      }
      if ((goal.includes("randevu") || goal.includes("teklif")) && key !== "conversion") {
        steps[1] = "Çağrı akışı: randevu/teklif formu ve mikro metinler";
      }
      return { key, desc, steps };
    }

    function computePillarScores() {
      const p1 = String(primaryPriority() || "").toLocaleLowerCase("tr-TR");
      const needs = (state.needs || []).join(" ").toLocaleLowerCase("tr-TR");
      const scope = (state.scope || []).join(" ").toLocaleLowerCase("tr-TR");
      const goal = (state.goal || "").toLocaleLowerCase("tr-TR");
      const content = (state.content || "").toLocaleLowerCase("tr-TR");

      let contentScore = 78;
      if (goal.trim().length > 15) contentScore += 6;
      if (needs.includes("içerik") || needs.includes("google")) contentScore += 8;
      if (scope.includes("seo")) contentScore += 6;
      if (content.includes("hazır (")) contentScore += 4;
      if (content.includes("hazır değil")) contentScore -= 4;

      let perfScore = 76;
      if (p1.includes("hız") || p1.includes("performans")) perfScore += 12;
      if (needs.includes("hız") || scope.includes("hız")) perfScore += 8;

      let convScore = 76;
      if (p1.includes("dönüş") || p1.includes("teklif")) convScore += 12;
      if (needs.includes("dönüşüm") || scope.includes("dönüşüm")) convScore += 8;
      if (goal.includes("randevu") || goal.includes("teklif") || goal.includes("satış")) convScore += 5;

      let maintScore = 78;
      if (p1.includes("içerik") || p1.includes("bakım") || p1.includes("güven")) maintScore += 10;
      if (needs.includes("panel") || scope.includes("cms")) maintScore += 8;
      if (needs.includes("güvenlik") || scope.includes("güvenlik")) maintScore += 4;
      if (needs.includes("bağlantı") || scope.includes("entegrasyon")) maintScore += 4;

      return {
        content: clamp(Math.round(contentScore), 55, 100),
        performance: clamp(Math.round(perfScore), 55, 100),
        conversion: clamp(Math.round(convScore), 55, 100),
        maintenance: clamp(Math.round(maintScore), 55, 100)
      };
    }

    function computeMissingItems() {
      const items = [];
      const type = (state.type || "").toLocaleLowerCase("tr-TR");
      if (!(state.goal || "").trim()) items.push("Hedef: neyi başarmak istiyorsunuz? (teklif, randevu, satış, bilinirlik)");
      if (!(state.priorities || []).length) items.push("Öncelik sırası: 1, 2, 3 olarak seçin");
      if (!(state.needs || []).length) items.push("İhtiyaçlar: neler kesin olsun?");
      if (type.includes("revize") && !(state.url || "").trim()) items.push("Mevcut site linki (revize için)");
      if (!(state.name || "").trim()) items.push("Ad soyad");
      if (!(state.from || "").trim()) items.push("E-posta");
      if (!(state.phone || "").trim()) items.push("Telefon");
      return items.slice(0, 3);
    }

    function uniq(list) {
      const seen = new Set();
      return (list || []).map((x) => String(x || "").trim()).filter((v) => {
        if (!v) return false;
        const k = v.toLocaleLowerCase("tr-TR");
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }

    function computeDeliverables() {
      const needs = (state.needs || []).join(" ").toLocaleLowerCase("tr-TR");
      const scope = (state.scope || []).join(" ").toLocaleLowerCase("tr-TR");
      const goal = (state.goal || "").toLocaleLowerCase("tr-TR");
      const items = [
        "Kapsam ve yapılacaklar listesi",
        "Ön analiz raporu",
        "İlk sprint planı (3 adım)",
        `Tahmini süre: ${estimateTime()}`
      ];
      if (needs.includes("google") || scope.includes("seo")) items.push("SEO kontrol listesi ve temel yapılandırma");
      if (needs.includes("rapor") || scope.includes("analitik")) items.push("GA4/GTM ölçüm planı");
      if (needs.includes("panel") || scope.includes("cms")) items.push("İçerik modeli ve yönetim akışı");
      if (needs.includes("bağlantı") || scope.includes("entegrasyon")) items.push("Entegrasyon planı ve risk listesi");
      if (goal.includes("satış") || goal.includes("randevu") || goal.includes("teklif")) items.push("Dönüşüm kurgusu ve çağrı haritası");
      return uniq(items).slice(0, 7);
    }

    function computeQuickWins(p1) {
      const p1l = String(p1 || "").toLocaleLowerCase("tr-TR");
      const needs = (state.needs || []).join(" ").toLocaleLowerCase("tr-TR");
      const items = [];
      if (p1l.includes("hız") || p1l.includes("performans") || needs.includes("hız")) {
        items.push("Görsel ve font optimizasyonu, cache politikası");
        items.push("JS küçültme ve kritik yolun temizliği");
      }
      if (p1l.includes("dönüş") || p1l.includes("teklif") || needs.includes("dönüşüm")) {
        items.push("Çağrı akışı ve mikro metin revizyonu");
        items.push("Form sadeleştirme ve spam koruması");
      }
      if (needs.includes("google") || p1l.includes("google") || p1l.includes("içerik")) {
        items.push("Title/meta ve başlık hiyerarşisi");
        items.push("Schema, sitemap ve robots kontrolü");
      }
      if (needs.includes("panel") || p1l.includes("bakım")) items.push("Bileşen sistemi ve modüler yapı");
      if (!items.length) {
        items.push("Kapsam netleştirme ve hızlı kazanımlar listesi");
        items.push("Arayüz ve akış düzenlemeleri, teknik kontrol");
      }
      return uniq(items).slice(0, 4);
    }

    function computeRisks() {
      const risks = [];
      const type = (state.type || "").toLocaleLowerCase("tr-TR");
      const deadline = (state.deadline || "").toLocaleLowerCase("tr-TR");
      const scopeCount = (state.scope || []).length;
      const content = (state.content || "").toLocaleLowerCase("tr-TR");
      const lang = (state.lang || "").toLocaleLowerCase("tr-TR");
      const needs = (state.needs || []).join(" ").toLocaleLowerCase("tr-TR");
      if (deadline.includes("acil")) risks.push("Acil takvim: kapsamı daraltmak gerekebilir.");
      if (type.includes("revize") && !(state.url || "").trim()) risks.push("Revize için mevcut site linki gerekli.");
      if (content.includes("hazır değil")) risks.push("İçerik yoksa takvim uzar (metin ve görsel toplama).");
      if (scopeCount >= 8) risks.push("Geniş kapsam: işi fazlara bölmek daha sağlıklı.");
      if (needs.includes("bağlantı")) risks.push("Entegrasyon bağımlılıkları (API, CRM, ödeme) erken netleşmeli.");
      if (lang.includes("en") || lang.includes("çoklu")) risks.push("Çoklu dil, içerik ve SEO yapısına ek iş getirir.");
      if (!(state.from || "").trim()) risks.push("Geri dönüş için e-posta gerekli.");
      return uniq(risks).slice(0, 4);
    }

    // --- çizim ---
    function renderPills(container, items) {
      if (!container) return;
      container.innerHTML = "";
      (items || []).forEach((t) => {
        const sp = document.createElement("span");
        sp.className = "kursat-pill";
        sp.textContent = t;
        container.appendChild(sp);
      });
    }

    function renderList(ul, items, { risk = false, empty = "" } = {}) {
      if (!ul) return;
      ul.innerHTML = "";
      const list = items && items.length ? items : (empty ? [empty] : []);
      list.forEach((t) => {
        const li = document.createElement("li");
        if (risk && items.length) li.classList.add("is-risk");
        li.textContent = t;
        ul.appendChild(li);
      });
    }

    function formatPriorities(max = 3) {
      const arr = (state.priorities || []).slice(0, max);
      if (!arr.length) return "—";
      return arr.map((v, i) => `${i + 1}. öncelik: ${v}`).join(" • ");
    }

    function formatNeeds(max = 4) {
      const arr = (state.needs || []).slice(0, max);
      if (!arr.length) return "—";
      const more = (state.needs || []).length - max;
      return arr.join(" • ") + (more > 0 ? ` (+${more})` : "");
    }

    const cleanUrl = (u) => (u || "").trim().replace(/^https?:\/\//, "");

    function safeEmailBody(body, max = 1850) {
      const b = String(body || "");
      if (b.length <= max) return b;
      return b.slice(0, max).trim() + "\n\n(…devamını kopyalayabilirsiniz)";
    }

    function gmailComposeHref(to, subject, body) {
      return "https://mail.google.com/mail/?view=cm&fs=1" +
        `&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // Backend olmadan mail taslağı oluşturup Gmail penceresini açıyorum.
    function openGmailCompose(to, subject, body) {
      const url = gmailComposeHref(to, subject, body);
      const w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w) window.location.href = url;
    }

    function buildSummaryLine() {
      const parts = [(state.type || "Proje").trim(), formatPriorities(3)];
      if (state.pages) parts.push(`Sayfa: ${state.pages}`);
      if (state.lang) parts.push(`Dil: ${state.lang}`);
      if (state.needs && state.needs.length) parts.push(`İhtiyaç: ${formatNeeds(3)}`);
      if (state.deadline) parts.push(`Zaman: ${state.deadline}`);
      if (state.budget && state.budget.toLocaleLowerCase("tr-TR") !== "belirsiz") parts.push(`Bütçe: ${state.budget}`);
      if (state.url) parts.push(`Site: ${cleanUrl(state.url)}`);
      const g = (state.goal || "").trim();
      if (g) parts.push(g.length > 80 ? g.slice(0, 80).trim() + "…" : g);
      return parts.join(" • ");
    }

    function buildPlanPreview() {
      const pri = (state.priorities || []).slice(0, 3);
      const allNeeds = state.needs || [];
      const needs = allNeeds.slice(0, 6);
      const lines = ["Mini brief özeti hazır.", ""];
      if (state.type) lines.push(`• İş türü: ${state.type}`);
      if (state.deadline) lines.push(`• Zaman: ${state.deadline}`);
      if (state.pages) lines.push(`• Sayfa: ${state.pages}`);
      if (state.lang) lines.push(`• Dil: ${state.lang}`);
      if (state.content) lines.push(`• İçerik: ${state.content}`);
      if (state.url) lines.push(`• Mevcut site: ${cleanUrl(state.url)}`);
      if (needs.length) {
        lines.push("", "İstediğiniz başlıklar:");
        needs.forEach((n) => lines.push(`• ${n}`));
        if (allNeeds.length > needs.length) lines.push(`• (+${allNeeds.length - needs.length} madde)`);
      }
      if (pri.length) {
        lines.push("", "En önemli konular (sırayla):");
        pri.forEach((v, i) => lines.push(`${i + 1}) ${v}`));
      }
      lines.push("", "Çalışma akışım:", "1) 2–3 kısa soruyla netleştirme (5 dk)", "2) Net kapsam, fiyat ve zaman planı", `3) Uygulama, test ve yayına alma (${estimateTime()})`);
      return lines.join("\n");
    }

    function buildEmailDraft() {
      // Bu oturum için sabit bir talep kodu
      if (!state._ref) {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
        state._ref = `KC-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${rnd}`;
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
      lines.push("Merhaba Kürşatcan,", "");
      lines.push("Web siteniz üzerinden bir proje talebi oluşturdum. Uygun olduğunuzda aşağıdaki özet üzerinden dönüş yapabilir misiniz?", "");

      lines.push("İLETİŞİM");
      lines.push(`Ad Soyad: ${name}`);
      lines.push(`E-posta: ${fromEmail}`);
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
      lines.push("Uygun olduğunuzda 2–3 kısa soruyla kapsamı netleştirebiliriz. Ardından teklif ve takvim için yönlendirmenizi rica ederim.", "");
      lines.push("Teşekkürler,");
      lines.push(name);
      lines.push(`Talep kodu: ${state._ref}`);

      return { subject, body: lines.join("\n") };
    }

    const MAIL_HEADINGS = ["İLETİŞİM", "PROJE ÖZETİ", "ÖNCELİKLER (sırayla)", "İSTENENLER", "EK NOT (opsiyonel)", "SIRADAKİ ADIM"];

    function updateEmailPreview(draft) {
      if (!preview.body) return;
      if (preview.subject) preview.subject.textContent = draft.subject || "Mini brief";
      if (preview.to) preview.to.textContent = emailTo;
      if (preview.from) preview.from.textContent = String(state.from || "").trim() || "E-posta girilmedi";

      const raw = String(draft.body || "").trim() || "Alanları doldurdukça bu bölüm otomatik olarak oluşur.";
      const html = K.escapeHtml(raw).split("\n").map((line) => {
        const t = String(line || "").trim();
        if (!t) return "";
        if (MAIL_HEADINGS.includes(t)) return `<span class="kursat-mail-heading">${line}</span>`;
        return line;
      }).join("<br>");
      preview.body.innerHTML = html;

      preview.body.classList.remove("is-flash");
      void preview.body.offsetWidth;
      preview.body.classList.add("is-flash");
    }

    const buildCopyText = () => {
      const d = buildEmailDraft();
      return [`Konu: ${d.subject}`, "", d.body].join("\n").trim();
    };

    function buildShortMsg() {
      const name = (state.name || "").trim();
      const from = (state.from || "").trim();
      const type = (state.type || "proje").trim();
      const p1 = primaryPriority();
      const deadline = (state.deadline || "").trim();
      const url = (state.url || "").trim();
      const g = (state.goal || "").trim();
      const parts = [`Merhaba, ${type} için destek istiyorum.`];
      if (p1) parts.push(`En önemli konu: ${p1}.`);
      if (deadline) parts.push(`Zaman: ${deadline}.`);
      if (g) parts.push(`Hedef: ${g.length > 120 ? g.slice(0, 120).trim() + "…" : g}.`);
      if (url) parts.push(`Site: ${cleanUrl(url)}`);
      if (name) parts.push(`Ad: ${name}.`);
      if (from) parts.push(`Mail: ${from}.`);
      return parts.join(" ");
    }

    function render() {
      readState();
      if (youEl) youEl.textContent = buildSummaryLine() || "—";
      if (meEl) meEl.textContent = buildPlanPreview();

      const p1 = primaryPriority();
      const kit = focusKit(p1);

      const briefScore = computeBriefScore();
      if (impact.briefScore) impact.briefScore.textContent = String(briefScore);
      if (impact.ring) impact.ring.style.setProperty("--p", String(briefScore));
      if (impact.ringLabel) impact.ringLabel.textContent = String(briefScore);
      if (impact.focus) impact.focus.textContent = p1;
      if (impact.focusDesc) impact.focusDesc.textContent = kit.desc;
      if (impact.estimate) impact.estimate.textContent = estimateTime();

      renderList(impact.missingList, computeMissingItems(), { empty: "Brief gayet net; ön analizle devam edebilirim." });
      renderPills(impact.deliver, computeDeliverables());
      renderList(impact.wins, computeQuickWins(p1));
      renderList(impact.risks, computeRisks(), { risk: true, empty: "Net; ek risk görünmüyor." });
      if (impact.roadmap) {
        impact.roadmap.innerHTML = "";
        kit.steps.slice(0, 3).forEach((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          impact.roadmap.appendChild(li);
        });
      }

      // Dört sütun puanı ve odak vurgusu
      const pillar = computePillarScores();
      root.querySelectorAll("[data-kursat-kpi]").forEach((card) => {
        const key = card.dataset.kursatKpi;
        const v = pillar[key];
        card.classList.toggle("is-active", key === kit.key);
        if (typeof v !== "number") return;
        const valueEl = card.querySelector("[data-kursat-kpi-value]");
        const gradeEl = card.querySelector("[data-kursat-kpi-grade]");
        const bar = card.querySelector(".kursat-kpi-bar i");
        if (valueEl) valueEl.textContent = String(v);
        if (gradeEl) gradeEl.textContent = gradeFor(v);
        if (bar) bar.style.width = v + "%";
      });

      try { updateEmailPreview(buildEmailDraft()); } catch (_) { /* önizleme kritik değil */ }
      syncActionState();
    }

    // --- etkileşimler ---
    function bindSingleChoice(wrap) {
      if (!wrap) return;
      wrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".kursat-chip");
        if (!btn) return;
        setActiveValue(wrap, chipValue(btn));
        render();
      });
    }

    function addChipToWrap(wrap, value, select) {
      if (!wrap || !value) return;
      const v = String(value).trim();
      if (!v) return;
      const exists = Array.from(wrap.querySelectorAll(".kursat-chip")).some((b) => chipValue(b).toLocaleLowerCase("tr-TR") === v.toLocaleLowerCase("tr-TR"));
      if (exists) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "kursat-chip";
      btn.dataset.value = v;
      btn.textContent = v.length > 22 ? v.slice(0, 22).trim() + "…" : v;
      if (select) setSelectedChip(btn, true);
      wrap.appendChild(btn);
    }

    function bindChipAdder(key, wrap) {
      const input = root.querySelector(`[data-kursat-add-input="${key}"]`);
      const btn = root.querySelector(`[data-kursat-add-button="${key}"]`);
      if (!input || !btn || !wrap) return;
      const submit = () => {
        const v = (input.value || "").trim();
        if (!v) return;
        addChipToWrap(wrap, v, true);
        if (key === "priorities") {
          let order = readPriorityOrder();
          if (!order.includes(v)) order.push(v);
          writePriorityOrder(order.slice(0, 5));
        }
        input.value = "";
        render();
      };
      btn.addEventListener("click", submit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); submit(); }
      });
    }

    ["typeWrap", "deadlineWrap", "pagesWrap", "langWrap", "contentWrap", "budgetWrap", "templateWrap", "toneWrap"]
      .forEach((k) => bindSingleChoice(fields[k]));
    bindChipAdder("needs", fields.needsWrap);
    bindChipAdder("priorities", fields.prioritiesWrap);

    if (fields.needsWrap) {
      fields.needsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".kursat-chip");
        if (!btn) return;
        setSelectedChip(btn, !btn.classList.contains("is-selected"));
        // okunabilirlik için en fazla 10
        if (readSelectedChips(fields.needsWrap).length > 10) setSelectedChip(btn, false);
        render();
      });
    }

    if (fields.prioritiesWrap) {
      fields.prioritiesWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".kursat-chip");
        if (!btn) return;
        const v = chipValue(btn);
        let order = readPriorityOrder();
        order = order.includes(v) ? order.filter((x) => x !== v) : order.concat(v);
        writePriorityOrder(order.slice(0, 5));
        render();
      });
    }

    ["goal", "notes", "url", "name", "company", "from", "phone", "audience", "refs", "integrations", "pagesList"]
      .forEach((k) => { if (fields[k]) fields[k].addEventListener("input", render); });
    ["questionsWrap", "scopeWrap"].forEach((k) => { if (fields[k]) fields[k].addEventListener("change", render); });

    function flashLabel(btn, label) {
      if (!btn) return;
      const old = btn.textContent;
      btn.textContent = label;
      btn.classList.add("is-done");
      window.setTimeout(() => { btn.textContent = old; btn.classList.remove("is-done"); }, 1400);
    }

    function setStatus(text, level) {
      if (!statusEl) return;
      statusEl.classList.remove("is-warn", "is-bad", "is-ok");
      if (level) statusEl.classList.add(`is-${level}`);
      statusEl.textContent = String(text || "");
    }

    function markInvalid(inputEl, on) {
      const wrap = inputEl && inputEl.closest(".kursat-field");
      if (wrap) wrap.classList.toggle("is-invalid", !!on);
    }

    function syncActionState() {
      if (isSending) return;
      const nameOk = !!String(state.name || "").trim();
      const emailOk = !!String(state.from || "").trim();
      const phoneOk = !!String(state.phone || "").trim();
      const touched = root.dataset.kursatTouched === "1";
      markInvalid(fields.name, touched && !nameOk);
      markInvalid(fields.from, touched && !emailOk);
      markInvalid(fields.phone, touched && !phoneOk);

      const missing = [];
      if (!nameOk) missing.push("ad soyad");
      if (!emailOk) missing.push("e-posta");
      if (!phoneOk) missing.push("telefon");
      const ready = missing.length === 0;
      if (sendBtn) sendBtn.disabled = !ready;
      if (mailBtn) mailBtn.disabled = !ready;
      const tip = ready ? "" : "Göndermek için doldurun: " + missing.join(", ");
      if (sendBtn) sendBtn.title = tip;
      if (mailBtn) mailBtn.title = tip;
      if (!ready) setStatus(`Göndermek için gerekli: ${missing.join(", ")}`, "warn");
      else setStatus("Hazır. Direkt gönderebilirsiniz.", "ok");
    }

    // Kişi alanlarından birine dokunulunca zorunlu alan uyarıları görünür olsun
    ["name", "from", "phone"].forEach((k) => {
      if (fields[k]) fields[k].addEventListener("blur", () => { root.dataset.kursatTouched = "1"; syncActionState(); });
    });

    function requireContact() {
      const checks = [["name", "Ad soyad gerekli."], ["from", "E-posta gerekli."], ["phone", "Telefon gerekli."]];
      for (const [k, msg] of checks) {
        if (!String(state[k] || "").trim()) {
          root.dataset.kursatTouched = "1";
          syncActionState();
          if (fields[k]) fields[k].focus();
          setStatus(msg + " Lütfen alanı doldurun.", "warn");
          return false;
        }
      }
      return true;
    }

    copyBtn?.addEventListener("click", () => K.copyText(buildCopyText(), "Brief kopyalandı"));

    mailBtn?.addEventListener("click", () => {
      readState();
      if (!requireContact()) return;
      const d = buildEmailDraft();
      openGmailCompose(emailTo, d.subject, safeEmailBody(d.body));
      setStatus("Gmail taslağı açıldı.", "ok");
      flashLabel(mailBtn, "Açıldı");
    });

    // Backend olmadan formu göndermek için FormSubmit'e gizli bir form post ediyorum.
    function submitToFormSubmit(payload, openNewTab) {
      try {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `https://formsubmit.co/${emailTo}`;
        form.style.display = "none";
        if (openNewTab) {
          form.target = "_blank";
        } else {
          let frame = document.querySelector('iframe[name="kursat-formsubmit-frame"]');
          if (!frame) {
            frame = document.createElement("iframe");
            frame.name = "kursat-formsubmit-frame";
            frame.title = "Form gönderimi";
            frame.style.display = "none";
            document.body.appendChild(frame);
          }
          form.target = "kursat-formsubmit-frame";
        }
        const add = (k, v) => {
          const i = document.createElement("input");
          i.type = "hidden";
          i.name = k;
          i.value = String(v == null ? "" : v);
          form.appendChild(i);
        };
        Object.keys(payload || {}).forEach((k) => add(k, payload[k]));
        add("_captcha", "false");
        // "basic" şablonu gelen kutusunda daha sade görünüyor
        add("_template", "basic");
        document.body.appendChild(form);
        form.submit();
        window.setTimeout(() => { try { form.remove(); } catch (_) { /* yok say */ } }, 1200);
        return true;
      } catch (_) {
        return false;
      }
    }

    async function sendViaFormSubmit(d, overrides = {}) {
      // FormSubmit alıcı adreste bir kerelik aktivasyon istiyor (formsubmit.co).
      let payload = null;
      try {
        const nameNow = String(overrides.name || state.name || "").trim();
        const fromEmail = String(overrides.email || state.from || "").trim();
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
          _replyto: fromEmail
        };

        // Yerel dosyadan test ederken fetch CORS'a takılıyor; o durumda yeni sekmede normal form gönderimi.
        if (location.protocol === "file:") {
          submitToFormSubmit(payload, true);
          return { ok: true, via: "form" };
        }
        return { ok: submitToFormSubmit(payload, false), via: "form" };
      } catch (e) {
        try { if (payload) submitToFormSubmit(payload, false); } catch (_) { /* yok say */ }
        return { ok: !!payload, reason: payload ? "form_fallback" : "failed", error: e };
      }
    }

    async function sendDirectDraft(d) {
      // EmailJS şablon değişkenleri: to_email, subject, message, from_name, reply_to, phone, company,
      // project_type, priorities, needs, deadline, pages, lang, budget, url, audience, refs, integrations
      if (!initEmailJS()) return { ok: false, reason: "not_configured" };
      const vars = {
        to_email: emailTo,
        subject: d.subject,
        message: d.body,
        from_name: (state.name || "Portfolyo ziyaretçisi").trim(),
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
        audience: String(state.audience || "").trim(),
        refs: parseCommaList(state.refs).join(" • "),
        integrations: parseCommaList(state.integrations).join(" • "),
        pages_list: String(state.pagesList || "").trim(),
        questions: (state.questions || []).join("\n- "),
        template: (state.template || "").trim(),
        tone: (state.tone || "").trim()
      };
      try {
        await window.emailjs.send(emailjsService, emailjsTemplate, vars);
        return { ok: true };
      } catch (e) {
        return { ok: false, reason: "send_failed", error: e };
      }
    }

    sendBtn?.addEventListener("click", async () => {
      readState();
      if (!requireContact()) return;
      const d = buildEmailDraft();

      isSending = true;
      sendBtn.disabled = true;
      const old = sendBtn.textContent;
      const hasEmailJS = canEmailJS();

      // Açılır pencere engelleyicisine takılmamak için yedek sekmeyi tıklama anında açıyorum.
      let preWin = null;
      if (hasEmailJS) {
        try { preWin = window.open("about:blank", "_blank", "noopener,noreferrer"); } catch (_) { preWin = null; }
      }

      sendBtn.textContent = "Gönderiliyor…";
      setStatus("Gönderiliyor…");

      const res = hasEmailJS ? await sendDirectDraft(d) : await sendViaFormSubmit(d);
      const finish = () => {
        window.setTimeout(() => {
          sendBtn.textContent = old;
          sendBtn.classList.remove("is-done");
          sendBtn.disabled = false;
          isSending = false;
          syncActionState();
        }, 1800);
      };

      if (res && res.ok) {
        try { if (preWin && !preWin.closed) preWin.close(); } catch (_) { /* yok say */ }
        sendBtn.textContent = "Gönderildi";
        sendBtn.classList.add("is-done");
        setStatus(hasEmailJS ? "Gönderildi. En kısa sürede dönüş yapacağım." : "İletildi. İlk kullanımda FormSubmit bir aktivasyon e-postası gönderebilir.", "ok");
        K.toast("Brief iletildi");
        finish();
        return;
      }

      // Yedek: aynı taslakla Gmail
      const url = gmailComposeHref(emailTo, d.subject, safeEmailBody(d.body));
      if (preWin && !preWin.closed) {
        try { preWin.location.href = url; } catch (_) { /* yok say */ }
      } else {
        openGmailCompose(emailTo, d.subject, safeEmailBody(d.body));
      }
      sendBtn.textContent = "Gmail açıldı";
      setStatus("Direkt gönderilemedi; Gmail taslağı açıldı.", "warn");
      finish();
    });

    fillBtn?.addEventListener("click", () => {
      readState();
      const form = document.querySelector("[data-kursat-contact-form]");
      if (form) {
        const set = (sel, v) => { const el = form.querySelector(sel); if (el && v) el.value = v; };
        set('input[name="name"]', state.name);
        set('input[name="phone"]', state.phone);
        set('input[name="email"]', state.from);
        const t = form.querySelector('textarea[name="message"]');
        if (t) t.value = buildCopyText();
        form.scrollIntoView({ behavior: K.reducedMotion() ? "auto" : "smooth", block: "start" });
      }
      flashLabel(fillBtn, "Dolduruldu");
    });

    shortBtn?.addEventListener("click", async () => {
      readState();
      await K.copyText(buildShortMsg(), "Kısa mesaj kopyalandı");
      setStatus("Kısa mesaj kopyalandı; WhatsApp ya da DM'e yapıştırabilirsiniz.", "ok");
    });

    // Klasik form: EmailJS varsa onunla, yoksa FormSubmit, o da olmazsa Gmail taslağı
    const classicForm = document.querySelector("[data-kursat-contact-form]");
    if (classicForm) {
      // FormSubmit JS'siz gönderimde yönlenecek tam adres
      const next = classicForm.querySelector('input[name="_next"]');
      if (next && /^https?:$/.test(location.protocol)) next.value = new URL("contact.html?sent=1", location.href).href;

      classicForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msgEl = classicForm.querySelector("[data-kursat-form-note]");
        const btn = classicForm.querySelector('button[type="submit"]');
        const fd = new FormData(classicForm);
        const say = (t) => { if (msgEl) msgEl.textContent = t; };
        const unlock = () => { if (btn) btn.disabled = false; };

        // Bal küpü: botlar gizli alanı dolduruyor
        if (String(fd.get("website") || "").trim()) {
          say("Gönderildi.");
          try { classicForm.reset(); } catch (_) { /* yok say */ }
          return;
        }

        readState();
        const name = String(fd.get("name") || state.name || "").trim();
        const email = String(fd.get("email") || state.from || "").trim();
        const phone = String(fd.get("phone") || state.phone || "").trim();
        const messageRaw = String(fd.get("message") || "").trim();
        if (!name || !email || !phone) {
          say("Lütfen ad soyad, e-posta ve telefon alanlarını doldurun.");
          return;
        }

        const draft = buildEmailDraft();
        const body = messageRaw.length > 20 ? messageRaw : draft.body;
        if (btn) btn.disabled = true;
        say("Gönderiliyor…");

        if (canEmailJS()) {
          try {
            initEmailJS();
            await window.emailjs.send(emailjsService, emailjsTemplate, {
              to_email: emailTo, subject: draft.subject, message: body,
              from_name: name || "Portfolyo ziyaretçisi", reply_to: email, phone
            });
            say("Gönderildi. En kısa sürede dönüş yapacağım.");
            unlock();
            classicForm.reset();
            return;
          } catch (_) { /* yedeğe geç */ }
        }

        const res = await sendViaFormSubmit({ subject: draft.subject, body }, { name, email, phone, message: body });
        if (res && res.ok) {
          say("İletildi. En kısa sürede dönüş yapacağım.");
          K.toast("Mesajınız iletildi");
          unlock();
          classicForm.reset();
          return;
        }

        openGmailCompose(emailTo, draft.subject, safeEmailBody(body));
        say("Gmail ekranı açıldı.");
        unlock();
      });
    }

    // URL parametreleri: ?proje=…&p1=…&hedef=…
    try {
      const q = new URLSearchParams(window.location.search);
      const proje = q.get("proje");
      const p1 = q.get("p1") || q.get("odak");
      const hedef = q.get("hedef");
      if (proje) setActiveValue(fields.typeWrap, proje);
      if (hedef && fields.goal) fields.goal.value = hedef;
      if (p1 && fields.prioritiesWrap) writePriorityOrder([p1]);
      if (q.get("sent") === "1") K.toast("Mesajınız iletildi");
    } catch (_) { /* yok say */ }

    writePriorityOrder(readPriorityOrder());
    render();
  }

  document.addEventListener("DOMContentLoaded", initStudio);
})();
