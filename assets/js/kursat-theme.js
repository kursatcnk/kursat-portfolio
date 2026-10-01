// <head> içinde, CSS'ten önce çalışıyor: kayıtlı ya da sistem temasını ilk boyamadan önce uyguluyorum.
(function () {
  var theme = null;
  try { theme = localStorage.getItem("kursat-theme"); } catch (e) { /* depolama kapalı olabilir */ }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("kursat-js");
})();
