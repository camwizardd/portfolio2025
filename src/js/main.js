import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable, InertiaPlugin);

// ============================================================
// LOADING PAGE ANIMATION
// ============================================================

window.addEventListener("load", function () {
  const loadingPage = document.querySelector(".loading-page");
  const loadingCat = document.querySelector(".loading-cat");

  // Animation de rotation du chat avec GSAP
  gsap.to(loadingCat, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: "linear",
  });

  // Cache la loading page après 2 secondes
  setTimeout(() => {
    gsap.to(loadingPage, {
      y: "-100%",
      duration: 0.5,
      ease: "power3.in",
      ease: "power3.in",

      onComplete: () => {
        loadingPage.style.display = "none";
      },
    });
  }, 1000); // Ajuste la durée selon tes besoins
});

document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // BURGER MENU + NEW ICON ANIMATION
  // ============================================================

  const burger = document.querySelector(".header-burger");
  const menu = document.querySelector(".header-menu");

  function toggleMenu() {
    menu.classList.toggle("is-active");
  }

  burger.addEventListener("click", toggleMenu);

  gsap.to(".header-burger, .project-new-desktop-icon", {
    repeat: -1,
    duration: 10,
    delay: 0,
    rotation: -360,
    ease: "none",
  });

  gsap.to(".project-new-mobile-icon", {
    repeat: -1,
    duration: 2,
    delay: 0,
    rotation: -360,
    ease: "none",
  });

  // ============================================================
  // PARALLAX EFFECT (VERSION MOBILE)
  // ============================================================

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".detail-project-parallax",
        id: "parallax",
        start: "top bottom",
        scrub: true,
      },
    })
    .to(".parallax1", { y: "-200", duration: 5 }, "<")
    .to(".parallax2", { y: "-50", duration: 5 }, "<")
    .to(".parallax3", { y: "-100", duration: 5 }, "<");

  // ============================================================
  // SCROLL SMOOTHER
  // ============================================================

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    smoothTouch: 0.1,
    effects: true,
  });

  // ============================================================
  // PIN IMAGES DESKTOP
  // ============================================================

  if (window.innerWidth > 768) {
    ScrollTrigger.create({
      trigger: ".detail-project-parallax-wrapper",
      start: "top top",
      end: () => {
        const wrapper = document.querySelector(".detail-project-main-wrapper");
        return wrapper ? `+=${wrapper.offsetHeight}` : "bottom bottom";
      },
      pin: true,
      pinSpacing: false,
      onRefresh: () => {
        // Réinitialise l'effet après le pin
        initParallaxEffect();
      },
    });
  }

  // ============================================================
  // DRAGGABLE ELEMENTS
  // ============================================================

  // Kitty image
  Draggable.create(".kitty-img", {
    bounds: ".kitty-main",
    inertia: true,
    dragClickables: false,
  });

  // Home silly guy avec retour élastique
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

  // Éléments rotatifs avec retour
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
    },
  );

  // Project icon rotation
  Draggable.create(".project-new-desktop-icon", {
    type: "rotation",
    inertia: true,
  });

  // ============================================================
  // SHOW IMAGE ON HOVER
  // ============================================================

  gsap.set(".project-preview img.swipeimage, video.swipeimage", {
    yPercent: -50,
    xPercent: -50,
  });

  let firstEnter;

  gsap.utils.toArray(".project-preview").forEach((el) => {
    const image = el.querySelectorAll("img.swipeimage, video.swipeimage")[0];
    const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
    const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

    const align = (e) => {
      if (firstEnter) {
        setX(e.clientX, e.clientX);
        setY(e.clientY, e.clientY);
        firstEnter = false;
      } else {
        setX(e.clientX);
        setY(e.clientY);
      }
    };

    const startFollow = () => document.addEventListener("mousemove", align);
    const stopFollow = () => document.removeEventListener("mousemove", align);

    const fade = gsap.to(image, {
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

  // ============================================================
  // TEXT ANIMATION
  // ============================================================

  const titles = document.querySelectorAll(".title");
  const numTitles = titles.length;
  const moveAmount = 50;
  const transitionDuration = 0.3;

  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  for (var i = 0; i < numTitles; i++) {
    tl.to(titles, {
      y: i * moveAmount * -1,
      duration: transitionDuration,
      ease: "power2.inOut",
    });
    if (i == 1) {
      tl.add(() => {}, "+=3");
    } else {
      tl.add(() => {}, "+=1.5");
    }
  }

  // ============================================================
  // EFFECT 000 - HOVER IMAGES AVEC INERTIA (DESKTOP UNIQUEMENT)
  // ============================================================

  function initParallaxEffect() {
    // Vérifie si on est sur desktop (>768px)
    if (window.innerWidth <= 768) {
      console.log("📱 Mobile détecté, effet désactivé");
      return false;
    }

    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;
    let isInitialized = false;

    // Cible uniquement la version desktop
    const desktopSection = document.querySelector(".detail-project-desktop");

    if (!desktopSection) {
      console.log("❌ Section desktop pas trouvée");
      return false;
    }

    const root = desktopSection.querySelector(".detail-project-parallax");

    if (!root) {
      console.log("❌ .detail-project-parallax pas trouvé dans desktop");
      return false;
    }

    const medias = root.querySelectorAll(".detail-project-media");

    if (medias.length === 0) {
      console.log("⏳ Medias pas encore disponibles");
      return false;
    }

    console.log("✅ Initialisation avec", medias.length, "medias trouvés !");

    // Track mouse movement
    root.addEventListener("mousemove", (e) => {
      if (!isInitialized) {
        // ← AJOUTE ÇA
        oldX = e.clientX;
        oldY = e.clientY;
        isInitialized = true;
        return;
      }
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;

      oldX = e.clientX;
      oldY = e.clientY;
    });

    // Apply effect on hover
    medias.forEach((el, index) => {
      el.addEventListener("mouseenter", () => {
        if (!isInitialized) return;
        console.log(
          "🎯 Mouseenter sur média",
          index,
          "avec deltaX:",
          deltaX,
          "deltaY:",
          deltaY,
        );

        const image = el.querySelector("img");

        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });

        tl.timeScale(1.2);

        // Inertia animation
        tl.to(image, {
          inertia: {
            x: {
              velocity: deltaX * 30,
              end: 0,
            },
            y: {
              velocity: deltaY * 30,
              end: 0,
            },
          },
        });

        // Rotation animation
        tl.fromTo(
          image,
          { rotate: 0 },
          {
            duration: 0.5,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<",
        );
      });
    });

    return true;
  }

  // Observer pour détecter l'apparition du contenu dynamique
  const observer = new MutationObserver(() => {
    if (initParallaxEffect()) {
      console.log("🚀 Effet parallax initialisé !");
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Essaie d'initialiser immédiatement
  setTimeout(() => {
    initParallaxEffect();
  }, 100); // Petit délai pour laisser le pin se créer
});
