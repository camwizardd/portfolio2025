import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin);

document.addEventListener("DOMContentLoaded", function () {
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

  // PARALLAX EFFECT----------------------------------------------------------------------------------------------------------------------

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".detail-project-parallax",
        // markers: true,
        id: "parallax",
        start: "top bottom",
        scrub: true,
      },
    })
    .to(
      ".parallax1",
      {
        y: "-200",
        duration: 5,
      },
      "<"
    )
    .to(
      ".parallax2",
      {
        y: "-50",
        duration: 5,
      },
      "<"
    )
    .to(
      ".parallax3",
      {
        y: "-100",
        duration: 5,
      },
      "<"
    );

  // SCROLL SMOOTHER----------------------------------------------------------------------------------------------------------------------

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    smoothTouch: 0.1,
    effects: true,
  });

  //  DRAGGABLE----------------------------------------------------------------------------------------------------------------------

  Draggable.create(".kitty-img", {
    bounds: ".kitty-main",
    inertia: true,
    dragClickables: false,
  });
  Draggable.create(".header-cat", {
    type: "rotation",
    inertia: true,
  });
});
