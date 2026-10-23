
(function () {
  var root = document.documentElement;
  var KEY = 'mtech-lang';

  function setLang(v) {
    // Only allow English or Chinese
    if (v !== 'en' && v !== 'zh') {
      v = 'en';
    }

    root.setAttribute('data-lang', v);

    // Update language buttons
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute(
        'aria-pressed',
        String(b.dataset.setLang === v)
      );
    });

    // Set document language
    root.lang = (v === 'zh') ? 'zh-CN' : 'en';

    // Save selected language
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {}
  }

  // Get saved language
  var saved = null;

  try {
    saved = localStorage.getItem(KEY);
  } catch (e) {}

  // Default to English
  if (saved === 'zh') {
    setLang('zh');
  } else {
    setLang('en');
  }

  // Language buttons
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      setLang(b.dataset.setLang);
    });
  });

  // Mobile menu
  var toc = document.getElementById('toc');
  var btn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('tocClose');

  function openToc() {
    toc.classList.add('open');
    toc.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    setTimeout(function () {
      closeBtn.focus();
    }, 50);
  }

  function closeToc() {
    toc.classList.remove('open');
    toc.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    btn.focus({ preventScroll: true });
  }

  btn.addEventListener('click', openToc);

  toc.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      closeToc();
    });
  });

  closeBtn.addEventListener('click', closeToc);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toc.classList.contains('open')) {
      closeToc();
    }
  });
})();





document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".hero-slider");

  if (!slider) return;

  const slides = [...slider.querySelectorAll(".hero-slide")];

  const prev = slider.querySelector(".hero-prev");
  const next = slider.querySelector(".hero-next");
  const progress = slider.querySelector(".hero-progress-bar");

  let current = 0;
  let timer;

  const duration = 6000;


  function showSlide(index) {

    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    /* restart progress animation */
    progress.style.animation = "none";

    void progress.offsetWidth;

    progress.style.animation =
      `heroProgress ${duration}ms linear`;
  }


  function nextSlide() {
    showSlide(current + 1);
    restartTimer();
  }


  function prevSlide() {
    showSlide(current - 1);
    restartTimer();
  }


  function restartTimer() {

    clearInterval(timer);

    timer = setInterval(() => {
      showSlide(current + 1);
    }, duration);
  }


  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);


  /* pause when mouse is over hero */
  slider.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  slider.addEventListener("mouseleave", () => {
    restartTimer();
  });


  /* keyboard */
  document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {
      nextSlide();
    }

    if (e.key === "ArrowLeft") {
      prevSlide();
    }

  });


  showSlide(0);
  restartTimer();

});


/* =========================================================
   HOME LANDING PANELS
========================================================= */

(function () {
  // The Home landing is intentionally static; no carousel behavior.
  return;

  const hero = document.querySelector('.hero');
  const cover = document.querySelector('.home-cover-slide');
  const panels = [...document.querySelectorAll('.landing-slide')];
  const dots = [...document.querySelectorAll('.landing-dot')];
  const previous = document.querySelector('.landing-prev');
  const next = document.querySelector('.landing-next');

  if (!hero || !cover || panels.length === 0 || !previous || !next) return;

  const total = panels.length + 1;
  const autoplayDelay = 3000;
  let current = 0;
  let autoplayTimer;

  function showPanel(index) {
    current = (index + total) % total;
    cover.hidden = current !== 0;

    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle('is-active', panelIndex + 1 === current);
    });

    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => showPanel(current + 1), autoplayDelay);
  }

  previous.addEventListener('click', () => {
    showPanel(current - 1);
    startAutoplay();
  });
  next.addEventListener('click', () => {
    showPanel(current + 1);
    startAutoplay();
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showPanel(Number(dot.dataset.homeTarget));
      startAutoplay();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      showPanel(current - 1);
      startAutoplay();
    }
    if (event.key === 'ArrowRight') {
      showPanel(current + 1);
      startAutoplay();
    }
  });

  hero.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  hero.addEventListener('mouseleave', startAutoplay);
  hero.addEventListener('focusin', () => clearInterval(autoplayTimer));
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) startAutoplay();
  });

  showPanel(0);
  startAutoplay();
})();


/* =========================================================
   FIXED-HEADER SECTION NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    window.history.replaceState(null, '', targetId);
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  });
});








/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems = document.querySelectorAll(
  '.sec-head, .two, .stat, .cert-card, ' +
  '.why-list li, .pcard, .opt, .bank-grid li, .step, ' +
  '.office, .gallery li, .listcard, .benefits li, .division'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('reveal', 'visible');

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -70px 0px'
  }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

