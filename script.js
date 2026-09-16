/* ============ PRELOADER ============ */
window.addEventListener('load', function() {
  setTimeout(function() {
    var preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');
    initAnimations();
  }, 2000);
});

/* ============ NAVIGATION ============ */
var navbar = document.getElementById('navbar');
var menuBtn = document.getElementById('menuBtn');
var menu = document.getElementById('menu');

window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  var topBtn = document.getElementById('topBtn');
  if (topBtn) {
    if (window.scrollY > 400) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  }
});

menuBtn.addEventListener('click', function() {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('open');
});

// Close menu on link click
var menuLinks = menu.querySelectorAll('a');
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', function() {
    menuBtn.classList.remove('active');
    menu.classList.remove('open');
  });
}

/* ============ SMOOTH SCROLL ============ */
var allAnchors = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < allAnchors.length; i++) {
  allAnchors[i].addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      var offset = 70;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
}

/* ============ FAQ ============ */
var faqBtns = document.querySelectorAll('.faq-btn');
for (var i = 0; i < faqBtns.length; i++) {
  faqBtns[i].addEventListener('click', function() {
    var item = this.closest('.faq-item');
    var wasOpen = item.classList.contains('open');
    var allItems = document.querySelectorAll('.faq-item');
    for (var j = 0; j < allItems.length; j++) {
      allItems[j].classList.remove('open');
    }
    if (!wasOpen) item.classList.add('open');
  });
}

/* ============ REVEAL ANIMATION ============ */
function initAnimations() {
  // Basic reveal via IntersectionObserver (fallback safe)
  var reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if no support
    reveals.forEach(function(el) {
      el.classList.add('active');
    });
  }

  // Stats counter
  var statBoxes = document.querySelectorAll('.stat-n');
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-num'));
          var current = 0;
          var duration = 1500;
          var step = target / (duration / 20);
          var timer = setInterval(function() {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current);
          }, 20);
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    
    statBoxes.forEach(function(el) {
      statObserver.observe(el);
    });
  }

  // GSAP animations (if available and desktop)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && window.innerWidth > 768) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax orbs
    gsap.to('.orb1', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      y: -60
    });
    gsap.to('.orb2', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
      y: 40
    });
  }
}
