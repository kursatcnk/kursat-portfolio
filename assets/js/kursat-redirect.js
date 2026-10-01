// Eski service-details.html?service=... bağlantıları tek sayfadaki ilgili bölüme gitsin.
(function () {
  var known = ["kurumsal", "landing", "dashboard", "webapp", "entegrasyon", "performans"];
  var key = "";
  try { key = new URLSearchParams(location.search).get("service") || ""; } catch (e) { /* eski tarayıcı */ }
  location.replace("service.html" + (known.indexOf(key) > -1 ? "#" + key : ""));
})();
