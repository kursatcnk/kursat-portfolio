// <head> içinde, CSS'ten önce çalışıyor: kayıtlı temayı ilk boyamadan önce uyguluyorum.
// Varsayılan krem (açık) tema; koyu tema yalnızca ziyaretçi seçerse.
(function () {
  var theme = null;
  try { theme = localStorage.getItem("kursat-theme-v2"); } catch (e) { /* depolama kapalı olabilir */ }
  if (theme !== "light" && theme !== "dark") theme = "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("kursat-js");
})();
