let before_load_time = new Date().getTime();
window.onload = function () {
  document.getElementById("load_time").innerHTML =
    "Время загрузки страницы <b>" + (new Date().getTime() - before_load_time) / 1000 + "</b> секунд";
}