// BURGER MENU----------------------------------------------------------------------------------------------------------------------

var burger = document.querySelector(".header-burger");
var menu = document.querySelector(".header-menu");

function toggleMenu() {
  menu.classList.toggle("is-active");
}

burger.addEventListener("click", toggleMenu);
