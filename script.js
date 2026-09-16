// ============================================
// PRELOADER
// ============================================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    document.body.style.overflow = "auto";
    initGSAPAnimations();
  }, 2200);
});

document.body.style.overflow = "hidden";

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

if (cursor && follower && window.innerWidth > 1024) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll("a, button, .btn, .service-card, .faq-question").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      cursor.style.background = "var(--gold-light)";
      follower.style.width = "50px";
      follower.style.height = "50px";
      follower.style.borderColor = "var(--gold-light)";
      follower.style.opacity = "0.3";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursor.style.background = "var(--gold)";
      follower.style.width = "36px";
      follower.style.height = "36px";
      follower.style.borderColor = "var(--gold)";
      follower.style.opacity = "0.5";
    });
  });
}

// ============================================
// NAVBAR
// ============================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  // Back to Top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 600);
  }
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ============================================
// FAQ ACCORDION
// ============================================
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.classList.contains("open");

    // Close all
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));

    // Open clicked if it wasn't open
    if (!wasOpen) {
      item.classList.add("open");
    }
  });
});

// ============================================
// GSAP ANIMATIONS
// ============================================
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Fade up animations
  gsap.utils.toArray("[data-animate='fade-up']").forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      delay: delay,
      ease: "power3.out",
    });
  });

  // Fade right
  gsap.utils.toArray("[data-animate='fade-right']").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      x: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  // Fade left
  gsap.utils.toArray("[data-animate='fade-left']").forEach((el) => {
    const delay = parseFloat(el.dataset.delay) || 0;
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      x: 60,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: "power3.out",
    });
  });

  // Counter animations
  gsap.utils.toArray("[data-animate='counter']").forEach((el) => {
    const target = parseInt(el.dataset.target);
    const numEl = el.querySelector(".stat-number");

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      onEnter: () => {
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              const current = Math.floor(this.targets()[0].val);
              const suffix = numEl.querySelector(".stat-suffix");
              const suffixText = suffix ? suffix.outerHTML : "";
              numEl.innerHTML = current + suffixText;
            },
          }
        );
      },
      once: true,
    });
  });

  // Parallax on hero orbs
  gsap.to(".hero-orb-1", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: -100,
    scale: 0.8,
  });

  gsap.to(".hero-orb-2", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
    y: 80,
    x: 50,
  });

  // Service cards stagger
  ScrollTrigger.batch(".service-card", {
    start: "top 88%",
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    once: true,
  });

  // Testimonial cards stagger
  ScrollTrigger.batch(".testimonial-card", {
    start: "top 88%",
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    once: true,
  });

  // Genre cards stagger
  ScrollTrigger.batch(".genre-card", {
    start: "top 90%",
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    once: true,
  });

  // Process steps stagger
  ScrollTrigger.batch(".process-step", {
    start: "top 88%",
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    once: true,
  });

  // Process line draw
  gsap.fromTo(
    ".process-line",
    { scaleY: 0, transformOrigin: "top" },
    {
      scaleY: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process-timeline",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );

  // Hero title lines
  gsap.from(".hero-line", {
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power4.out",
    delay: 0.3,
  });

  // About image parallax
  gsap.to(".about-image-main", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -30,
  });

  // Navbar links active state on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinksAll = document.querySelectorAll(".nav-link");

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveNav(section.id),
      onEnterBack: () => setActiveNav(section.id),
    });
  });

  function setActiveNav(id) {
    navLinksAll.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + id) {
        link.classList.add("active");
      }
    });
  }

  // Smooth reveal for CTA section
  gsap.from(".cta-content", {
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  // Float cards animation enhancement
  gsap.from(".hero-float-1", {
    x: -40,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: "power3.out",
  });

  gsap.from(".hero-float-2", {
    x: 40,
    opacity: 0,
    duration: 1,
    delay: 1.3,
    ease: "power3.out",
  });

  // Magnetic effect on buttons
  if (window.innerWidth > 1024) {
    document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }

  // Text reveal on about subheadings
  gsap.utils.toArray(".about-subheading").forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Experience badge spin
  gsap.to(".about-experience-badge", {
    scrollTrigger: {
      trigger: ".about-experience-badge",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    rotation: 360,
    duration: 1.5,
    ease: "power3.out",
  });

  // Difference closing fade
  gsap.from(".diff-closing", {
    scrollTrigger: {
      trigger: ".diff-closing",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}

// ============================================
// SMOOTH SCROLL FOR SAFARI
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});