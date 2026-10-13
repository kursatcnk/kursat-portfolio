// <head> içinde, CSS'ten önce çalışıyor: kayıtlı temayı ilk boyamadan önce uyguluyorum.
// Varsayılan açık tema; koyu tema yalnızca ziyaretçi seçerse.
(function () {
  var theme = null;
  try { theme = localStorage.getItem("kursat-theme-v2"); } catch (e) { /* depolama kapalı olabilir */ }
  if (theme !== "light" && theme !== "dark") theme = "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("kursat-js");
  // Sayfa geçişleri: tarayıcı View Transitions desteklemiyorsa ya da site dosyadan (file://) açılmışsa
  // çekirdek betikteki yedek devreye girer; Chrome dosya adreslerinde sayfalar arası geçişi çalıştırmıyor
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var native = "CSSViewTransitionRule" in window && location.protocol !== "file:";
  if (!calm && !native) document.documentElement.classList.add("kursat-pt");
})();
