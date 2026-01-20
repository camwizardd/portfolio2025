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
  Draggable.create(".home-silly-guy", {
    bounds: ".home",
    inertia: true,
    onThrowComplete: function () {
      gsap.to(this.target, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
    },
  });
  Draggable.create(
    ".header-cat, .header-portfolio-icon-container, .kontakt-drawings-banana, .kontakt-drawings-mail, .kontakt-drawings-tel",
    {
      type: "rotation",
      inertia: true,
      onThrowComplete: function () {
        gsap.to(this.target, {
          rotation: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      },
    }
  );
  Draggable.create(".project-new-desktop-icon", {
    type: "rotation",
    inertia: true,
  });

  //  SHOW IMG ON HOVER----------------------------------------------------------------------------------------------------------------------

  gsap.set(".project-preview img.swipeimage, video.swipeimage", {
    yPercent: -50,
    xPercent: -50,
  });

  let firstEnter;

  gsap.utils.toArray(".project-preview").forEach((el) => {
    const image = el.querySelectorAll("img.swipeimage, video.swipeimage")[0],
      setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" }),
      setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" }),
      align = (e) => {
        if (firstEnter) {
          setX(e.clientX, e.clientX);
          setY(e.clientY, e.clientY);
          firstEnter = false;
        } else {
          setX(e.clientX);
          setY(e.clientY);
        }
      },
      startFollow = () => document.addEventListener("mousemove", align),
      stopFollow = () => document.removeEventListener("mousemove", align),
      fade = gsap.to(image, {
        autoAlpha: 1,
        ease: "none",
        paused: true,
        duration: 0.1,
        onReverseComplete: stopFollow,
      });

    el.addEventListener("mouseenter", (e) => {
      firstEnter = true;
      fade.play();
      startFollow();
      align(e);
    });

    el.addEventListener("mouseleave", () => fade.reverse());
  });
});
