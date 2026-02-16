(function ($) {
  "use strict";

  const $documentOn = $(document);
  const $windowOn = $(window);

  $documentOn.ready( function() {
    //>> Mobile Menu Js Start <<//
    $("#mobile-menu").meanmenu({
      meanMenuContainer: ".mobile-menu",
      meanScreenWidth: "1199",
      meanExpand: ['<i class="far fa-plus"></i>'],
    });

    //>> Sidebar Toggle Js Start <<//
    $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
      $(".offcanvas__info").removeClass("info-open");
      $(".offcanvas__overlay").removeClass("overlay-open");
    });
    $(".sidebar__toggle").on("click", function () {
      $(".offcanvas__info").addClass("info-open");
      $(".offcanvas__overlay").addClass("overlay-open");
    });

    //>> Body Overlay Js Start <<//
    $(".body-overlay").on("click", function () {
      $(".offcanvas__area").removeClass("offcanvas-opened");
      $(".df-search-area").removeClass("opened");
      $(".body-overlay").removeClass("opened");
    });

    //>> Sticky Header Js Start <<//
    $windowOn.on("scroll", function () {
      if ($(this).scrollTop() > 250) {
        $("#header-sticky").addClass("sticky");
      } else {
        $("#header-sticky").removeClass("sticky");
      }
    });      

    //>> Video Popup Start <<//
    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    $(".video-popup").magnificPopup({
      type: "iframe",
      callbacks: {},
    });

    //>> Counterup Start <<//
    $(".count").counterUp({
      delay: 15,
      time: 4000,
    });

    //>> Wow Animation Start <<//
    new WOW().init();

    //>> Nice Select Start <<//
    $("select").niceSelect();

    //>> Testimonial Contact Slider Start <<//
    if ($(".testi-content-slider").length > 0) {
      const testiContentSlider = new Swiper(".testi-content-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        pagination: {
          el: ".dot-2",
          clickable: true,
        },
        breakpoints: {
          1199: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //>> Testimonial-slider Slider Start <<//
    if ($(".testimonial-slider").length > 0) {
      const testimonialSliders = new Swiper(".testimonial-slider", {
        spaceBetween: 30,
        speed: 2000,
        loop: true,
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 8,
          perSlideRotate: 2,
          slideShadows: false,
        },
        grabCursor: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".dot",
          clickable: true,
        },
      });
    }

    //>> Testimonials Slider Start <<//
    if ($(".testimonial-slider-2").length > 0) {
      const testimonialSlider2 = new Swiper(".testimonial-slider-2", {
        spaceBetween: 30,
        speed: 2500,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".array-prev",
          prevEl: ".array-next",
        },
        breakpoints: {
          575: {
            slidesPerView: 1,
          },
          0: {
            slidesPerView: 1,
          },
        },
      });
    }

    //>> Client Slider Start <<//
    if ($(".brand-slider").length > 0) {
      const brandSlider = new Swiper(".brand-slider", {
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },

        breakpoints: {
          1199: {
            slidesPerView: 5,
          },
          991: {
            slidesPerView: 4,
          },
          767: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 2,
          },
        },
      });
    }

    //>> Project Hover Js Start <<//
    const getSlide = $('.main-box, .box').length - 1;
    const slideCal = 100 / getSlide + '%';
    
    $('.box').css({
        "width": slideCal
    });
    
    $(document).on('mouseenter', '.box', function() {
        $('.box').removeClass('active');
        $(this).addClass('active');
    });     

    //>> Search Popup Start <<//
    const $searchWrap = $(".search-wrap");
    const $navSearch = $(".nav-search");
    const $searchClose = $("#search-close");

    $(".search-trigger").on("click", function (e) {
      e.preventDefault();
      $searchWrap.animate({ opacity: "toggle" }, 500);
      $navSearch.add($searchClose).addClass("open");
    });

    $(".search-close").on("click", function (e) {
      e.preventDefault();
      $searchWrap.animate({ opacity: "toggle" }, 500);
      $navSearch.add($searchClose).removeClass("open");
    });

    function closeSearch() {
      $searchWrap.fadeOut(200);
      $navSearch.add($searchClose).removeClass("open");
    }

    $(document.body).on("click", function (e) {
      closeSearch();
    });

    $(".search-trigger, .main-search-input").on("click", function (e) {
      e.stopPropagation();
    });

    //>> Mouse Cursor Start <<//
    function mousecursor() {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
    const ENABLE_CUSTOM_CURSOR = false;
    $(function () {
      if (ENABLE_CUSTOM_CURSOR) mousecursor();
    });

    //>> Back To Top Slider Start <<//
    $windowOn.on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $documentOn.on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });
  }); // End Document Ready Function

   //>> Typed Text Start <<//
// Ben burada hero rol metnini Typed.js yerine daha akıcı (jank yapmayan) bir yaz-sil animasyonu ile yönetiyorum.
// - İlk yüklemede donma/jump yaşamamak için animasyonu window.load + fonts.ready sonrasında başlatıyorum.
// - prefers-reduced-motion varsa animasyonu kapatıp ilk metni statik gösteriyorum.
(function () {
  function initHeroTypewriter() {
    const typedEl = document.querySelector('.type-text');
    if (!typedEl) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Rol listesi: Highlight + devamı
    const roles = [
      { h: 'Web', r: ' geliştirici' },
      { h: '.NET', r: ' geliştiricisi' },
      { h: 'Kurumsal', r: ' Web & API' },
      { h: 'Yönetim', r: ' Paneli' },
      { h: 'Performans', r: ' & SEO' },
      { h: 'Güvenlik', r: ' & Yetkilendirme' },
      { h: 'Bakım', r: ' & Destek' },
    ];

    // İçerik span'larını kuruyoruz (HTML enjekte ederek değil, textContent ile güncelliyoruz).
    typedEl.innerHTML = '<span class="highlight"></span><span class="type-rest"></span>';
    const hi = typedEl.querySelector('.highlight');
    const rest = typedEl.querySelector('.type-rest');

    // Genişlik titremesini azaltmak için (fontlar hazırken) maksimum genişliği ölçüp minWidth veriyoruz.
    function lockWidth() {
      try {
        const measure = document.createElement('span');
        const cs = window.getComputedStyle(typedEl);
        measure.style.position = 'absolute';
        measure.style.visibility = 'hidden';
        measure.style.whiteSpace = 'nowrap';
        measure.style.fontSize = cs.fontSize;
        measure.style.fontFamily = cs.fontFamily;
        measure.style.fontWeight = cs.fontWeight;
        document.body.appendChild(measure);

        let maxW = 0;
        for (const role of roles) {
          measure.textContent = role.h + role.r;
          maxW = Math.max(maxW, measure.getBoundingClientRect().width);
        }
        document.body.removeChild(measure);
        typedEl.style.minWidth = Math.ceil(maxW + 2) + 'px';
      } catch (e) {
        // Ölçüm başarısız olsa bile animasyon çalışır.
      }
    }

    // Reduced-motion ise animasyon yok: ilk rolü sabit yaz.
    if (reduce) {
      hi.textContent = roles[0].h;
      rest.textContent = roles[0].r;
      lockWidth();
      return;
    }

    // Animasyon ayarları
    const TYPE_MS = 55;      // harf yazma hızı
    const DELETE_MS = 28;    // harf silme hızı
    const HOLD_MS = 1100;    // kelime tamamlandıktan sonra bekleme
    const GAP_MS = 220;      // silme bittikten sonra bekleme

    let roleIndex = 0;
    let charIndex = 0;
    let direction = 1; // 1: yaz, -1: sil
    let timer = 0;

    function clearTimer() {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
    }

    function render() {
      const role = roles[roleIndex];
      const full = role.h + role.r;
      const visible = full.slice(0, charIndex);

      const hLen = role.h.length;
      hi.textContent = visible.slice(0, Math.min(hLen, visible.length));
      rest.textContent = visible.length > hLen ? visible.slice(hLen) : '';
    }

    function tick() {
      const role = roles[roleIndex];
      const full = role.h + role.r;

      // Yazma
      if (direction === 1) {
        if (charIndex < full.length) {
          charIndex += 1;
          render();
          timer = setTimeout(tick, TYPE_MS);
          return;
        }
        // Kelime tamamlandı
        direction = -1;
        timer = setTimeout(tick, HOLD_MS);
        return;
      }

      // Silme
      if (charIndex > 0) {
        charIndex -= 1;
        render();
        timer = setTimeout(tick, DELETE_MS);
        return;
      }

      // Tamamen silindi -> sıradaki role geç
      roleIndex = (roleIndex + 1) % roles.length;
      direction = 1;
      timer = setTimeout(tick, GAP_MS);
    }

    // Görünürlük değişince (sekme arka planda) animasyonu durdurup geri gelince devam ettiriyoruz.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimer();
      } else {
        clearTimer();
        timer = setTimeout(tick, 50);
      }
    });

    // Başlangıç
    lockWidth();
    render();
    timer = setTimeout(tick, 220);
  }

  function startWhenStable() {
    const run = function () {
      // Fontlar hazır olduğunda ölçüm/animasyon daha stabil oluyor.
      const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      fontsReady.then(function () {
        if (window.requestIdleCallback) {
          requestIdleCallback(function () { initHeroTypewriter(); }, { timeout: 1500 });
        } else {
          setTimeout(initHeroTypewriter, 120);
        }
      });
    };

    if (document.readyState === 'complete') {
      run();
    } else {
      window.addEventListener('load', run, { once: true });
    }
  }

  startWhenStable();
})();

//>> Smooth Anchor Scroll Start <<//
  document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });

  //>> Hero Parallax Start <<//
  document.addEventListener("DOMContentLoaded", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const hero = document.querySelector(".hero-1");
    const card = document.querySelector(".hero-1 .portrait-card");
    if (!hero || !card) return;

    let raf = 0;
    const MAX = 6; // derece

    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = (-y * MAX).toFixed(2);
        const ry = (x * MAX).toFixed(2);
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };

    const onLeave = () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
  });

  //>> Scroll Progress Start <<//
  document.addEventListener("DOMContentLoaded", function () {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = progress + "%";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  });

  //>> Active Menu (Current Page) Start <<//
  document.addEventListener("DOMContentLoaded", function () {
    const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = document.querySelectorAll(".main-menu a");

    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
      if (!href || href === "#" || href.startsWith("javascript")) return;

      // Kök dizinde açıldığında index.html varsayıyoruz.
      const normalizedHref = href === "/" ? "index.html" : href;
      if (normalizedHref === current) a.classList.add("active");
    });
  });

   //>> Thumb Hover Start <<//
   document.addEventListener("DOMContentLoaded", function () {
    const newsThumbs = document.querySelectorAll(".news-item-2");
  
    newsThumbs.forEach((item) => {
      const thumbHover = item.querySelector(".thumb-hover");
  
      // Skip if .thumb-hover not found
      if (!thumbHover) return;
  
      let animationFrame;
  
      item.addEventListener("mousemove", (event) => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
  
        animationFrame = requestAnimationFrame(() => {
          const rect = item.getBoundingClientRect();
          const dx = event.clientX - rect.left;
          const dy = event.clientY - rect.top;
  
          thumbHover.style.transform = `translate(${dx}px, ${dy}px) rotate(24.15deg)`;
        });
      });
  
      item.addEventListener("mouseleave", () => {
        thumbHover.style.transform = "translate(-50%, -50%) rotate(0deg)"; // Reset position
      });
    });
  });

  function loader() {
    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").addClass("loaded");
      $(".preloader").delay(600).fadeOut();
    });
  }

  loader();
})(jQuery); // End jQuery

/* ======================================================
   KC FX PACK — Görsel dokunuşlar (rev12 godmode)
   Bu bölüm: sayfaya ekstra “premium” his veren
   mikro etkileşimleri ekler.
====================================================== */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsFinePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const state = {
    userScrolled: false,
  };

  window.addEventListener(
    "scroll",
    () => {
      state.userScrolled = true;
    },
    { passive: true, once: true }
  );

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const inView = (el, k = 0.78) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * k && r.bottom > vh * (1 - k);
  };

  // Toast
  const toast = (() => {
    let el;
    const ensure = () => {
      if (el) return el;
      el = document.createElement("div");
      el.className = "fx-toast";
      el.innerHTML = '<span class="fx-toast__dot"></span><span class="fx-toast__text"></span>';
      document.body.appendChild(el);
      return el;
    };
    return (text) => {
      try {
        const t = ensure();
        t.querySelector(".fx-toast__text").textContent = text;
        t.classList.add("is-show");
        clearTimeout(t.__kc_to);
        t.__kc_to = setTimeout(() => t.classList.remove("is-show"), 1900);
      } catch (_) {}
    };
  })();

  // 1) Kartlara premium hover efektleri
  const initCards = () => {
    const selectors = [
      ".services-item",
      ".project-items",
      ".price-item",
      ".awards-item",
      ".client-item",
      ".news-item",
      ".news-item-2",
    ];

    $$(selectors.join(",")).forEach((el) => {
      el.classList.add("fx-spotlight", "fx-grad-border");
    });

    // Görsel olan kartlar için hover zoom
    $$(".project-items, .news-item-2").forEach((el) => el.classList.add("fx-zoom-img"));
  };

  // 2) Spotlight koordinatları
  const initSpotlight = () => {
    if (!supportsFinePointer) return;
    $$(".fx-spotlight").forEach((card) => {
      card.addEventListener(
        "mousemove",
        (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          card.style.setProperty("--fx-x", x + "%");
          card.style.setProperty("--fx-y", y + "%");
        },
        { passive: true }
      );
    });
  };

  // 3) Butonlara shimmer + ripple + magnetic
  const initButtons = () => {
    const btns = $$(".theme-btn, .theme-btn-2, button.theme-btn");
    btns.forEach((b) => b.classList.add("fx-shimmer", "fx-ripple"));

    // Ripple
    btns.forEach((btn) => {
      btn.addEventListener("pointerdown", (e) => {
        if (prefersReduced) return;
        const r = btn.getBoundingClientRect();
        const ink = document.createElement("span");
        ink.className = "fx-ripple__ink";
        const size = Math.max(r.width, r.height);
        ink.style.width = ink.style.height = size + "px";
        ink.style.left = e.clientX - r.left - size / 2 + "px";
        ink.style.top = e.clientY - r.top - size / 2 + "px";
        btn.appendChild(ink);
        setTimeout(() => ink.remove(), 700);
      });
    });

    // Magnetic
    if (!supportsFinePointer || prefersReduced) return;
    btns.forEach((btn) => {
      btn.classList.add("fx-magnet");
      const strength = 10;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        btn.style.transform = `translate(${(x * strength).toFixed(2)}px, ${(y * strength).toFixed(2)}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0px,0px)";
      });
    });
  };

  // 4) Scroll reveal (defer: scroll)
  const initReveal = () => {
    const els = $$(".fx-reveal");
    if (!els.length) return;

    // Başlık alt çizgisi için section-title'ları izliyorum
    const titles = $$(".section-title");

    const markVisible = (el) => {
      if (el.classList.contains("is-visible")) return;
      el.classList.add("is-visible");
    };

    const handle = () => {
      els.forEach((el) => {
        if (el.classList.contains("is-visible")) return;
        const defer = el.getAttribute("data-fx-defer") === "scroll";
        if (defer && !state.userScrolled) return;
        if (inView(el)) markVisible(el);
      });

      titles.forEach((t) => {
        if (t.classList.contains("fx-title-on")) return;
        if (inView(t, 0.72)) t.classList.add("fx-title-on");
      });
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
  };

  // 5) Görsellerde blur-up + lazy
  const initImages = () => {
    const imgs = $$("img");
    imgs.forEach((img) => {
      const src = (img.getAttribute("src") || "").toLowerCase();
      if (!src || src.endsWith(".svg")) return;
      if (img.closest(".logo") || img.closest(".offcanvas__logo")) return;
      if (img.classList.contains("fx-blurup")) return;
      img.loading = img.loading || "lazy";
      img.decoding = img.decoding || "async";
      img.classList.add("fx-blurup");

      const done = () => img.classList.add("is-loaded");
      if (img.complete) done();
      else img.addEventListener("load", done, { once: true });
    });
  };

  // 6) Awards/timeline progress
  const initAwardsProgress = () => {
    const wrap = document.querySelector(".awards-wrapper");
    const sec = document.querySelector(".awards-section");
    if (!wrap || !sec) return;

    const update = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = r.height + vh * 0.2;
      const passed = Math.min(total, Math.max(0, vh - r.top));
      const p = total > 0 ? (passed / total) * 100 : 0;
      wrap.style.setProperty("--kc-tl", p.toFixed(2) + "%");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  // 7) Back-to-top progress ring
  const initBackTopRing = () => {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;

    const update = () => {
      const doc = document.documentElement;
      const st = doc.scrollTop || document.body.scrollTop;
      const sh = doc.scrollHeight - doc.clientHeight;
      const p = sh > 0 ? (st / sh) * 100 : 0;
      btn.style.setProperty("--kc-scroll", p.toFixed(2) + "%");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  // 8) Sosyal linklere tooltip + sekme açma
  const initSocial = () => {
    // Hero sol menü
    $$(".hero-info a").forEach((a) => {
      a.classList.add("fx-tip");
      const t = (a.textContent || "").trim();
      a.setAttribute("data-tip", t);
    });

    // Offcanvas ikonlar
    $$(".social-icon a").forEach((a) => {
      a.classList.add("fx-tip");
      const i = a.querySelector("i");
      const label = i ? i.className.replace(/fab |fa-solid |fa-regular |fa-/g, "").trim() : "Link";
      a.setAttribute("data-tip", label || "Link");
    });
  };

  // 9) E-posta kopyalama (ikon ekliyorum)
  const initCopyEmail = () => {
    const emails = $$('a[href^="mailto:"]');
    if (!emails.length) return;

    emails.forEach((a) => {
      if (a.dataset.kcCopyBound) return;
      a.dataset.kcCopyBound = "1";

      // Ben sosyal ikonlarda/ikon-only mail linklerinde ekstra kopyalama butonu göstermiyorum.
      // (Footer sosyal, offcanvas sosyal vb. alanlarda iki ikon yan yana kötü duruyor.)
      const inSocial = a.closest(".socials-icon, .social-icon, .hero-info");
      const iconOnly = a.querySelector("i") && ((a.textContent || "").trim() === "");
      if (inSocial || iconOnly) return;

      const mail = (a.getAttribute("href") || "").replace(/^mailto:/i, "").split("?")[0];
      if (!mail) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fx-copy-btn";
      btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      btn.setAttribute("aria-label", "E-posta kopyala");
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(mail);
          toast("E-posta kopyalandı");
        } catch (_) {
          toast("Kopyalama desteklenmiyor");
        }
      });
      a.insertAdjacentElement("afterend", btn);
    });
  };

  // 10) Bölümlere otomatik glow
  const initSectionGlow = () => {
    $$("section.section-padding").forEach((sec, idx) => {
      // Hepsini glow yapmıyorum; arada bir vurgu daha dengeli duruyor.
      if (idx % 2 === 1) sec.classList.add("fx-section-glow");
    });
  };

  // 11) Hero: ekstra arka plan blob'ları (JS ile ekliyorum)
  const initHeroBlobs = () => {
    if (prefersReduced) return;
    const hero = document.querySelector(".hero-1");
    if (!hero || hero.querySelector(".kc-blobs")) return;

    const wrap = document.createElement("div");
    wrap.className = "kc-blobs";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `
      <span class="kc-blob b1"></span>
      <span class="kc-blob b2"></span>
      <span class="kc-blob b3"></span>
    `;
    hero.appendChild(wrap);
  };

  const injectHeroBlobCss = () => {
    const id = "kc-blob-style";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      .kc-blobs{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
      .kc-blob{position:absolute;display:block;width:420px;height:420px;border-radius:40% 60% 60% 40%/50% 45% 55% 50%;filter: blur(26px);opacity:.18;mix-blend-mode:multiply;animation: kcBlob 10s ease-in-out infinite;}
      .kc-blob.b1{left:-120px;top:10%;background: radial-gradient(circle at 30% 30%, rgba(40,233,140,.75), rgba(40,233,140,0));}
      .kc-blob.b2{right:-140px;top:18%;background: radial-gradient(circle at 30% 30%, rgba(0,194,255,.65), rgba(0,194,255,0));animation-delay:-2.5s;}
      .kc-blob.b3{left:35%;bottom:-180px;background: radial-gradient(circle at 30% 30%, rgba(255,110,199,.55), rgba(255,110,199,0));animation-delay:-5s;}
      @keyframes kcBlob{0%,100%{transform: translate3d(0,0,0) scale(1) rotate(0deg);}50%{transform: translate3d(18px,-12px,0) scale(1.05) rotate(8deg);}}
      @media (prefers-reduced-motion: reduce){.kc-blob{animation:none;}}
    `;
    document.head.appendChild(s);
  };

  // CSS'leri tamamlayıcı küçük parça: copy butonu
  const injectCopyBtnCss = () => {
    const id = "kc-copy-style";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      .fx-copy-btn{margin-left:10px; width:34px; height:34px; border-radius:12px; border:1px solid rgba(28,29,32,.08); background: rgba(255,255,255,.85); box-shadow:0 10px 22px rgba(0,0,0,.08); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; transition: transform .15s ease;}
      .fx-copy-btn:hover{transform: translateY(-2px);} 
    `;
    document.head.appendChild(s);
  };

  // 12) “Görsel yük” / performans: ağır efektleri küçük ekranlarda azalt
  const initPerfFlags = () => {
    const small = window.matchMedia && window.matchMedia("(max-width: 575px)").matches;
    if (small) document.documentElement.classList.add("kc-small");
  };

  // Init
  const init = () => {
    if (prefersReduced) {
      // minimum: yine de blur-up/loaded durumunu yönetelim
      initImages();
      return;
    }
    injectHeroBlobCss();
    injectCopyBtnCss();
    initPerfFlags();
    initHeroBlobs();
    initCards();
    initSpotlight();
    initButtons();
    initReveal();
    initImages();
    initAwardsProgress();
    initBackTopRing();
    initSocial();
    initCopyEmail();
    initSectionGlow();
  };

  document.addEventListener("DOMContentLoaded", init);
})();

