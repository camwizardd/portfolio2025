import { gsap } from "gsap";

// BURGER MENU----------------------------------------------------------------------------------------------------------------------

var burger = document.querySelector(".header-burger");
var menu = document.querySelector(".header-menu");

function toggleMenu() {
  menu.classList.toggle("is-active");
}

burger.addEventListener("click", toggleMenu);

gsap.to(".header-burger", {
  repeat: -1,
  duration: 10,
  delay: 0,
  // stagger:1,
  // yoyo: true,
  rotation: -360,
});
