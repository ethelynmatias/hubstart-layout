/* ============================================================
   Reverdia — assets/js/main.js
   Nav scroll state · mobile menu · reveal · counters ·
   parallax · button ripple · back-to-top
   ============================================================ */
(function () {
  'use strict';

  var header   = document.getElementById('siteHeader');
  var toTop     = document.getElementById('toTop');
  var body     = document.body;
  var navToggle = document.getElementById('navToggle');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll state (nav + back-to-top + parallax) ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScrollFrame() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 30);
    if (toTop) toTop.classList.toggle('show', y > 500);

    if (!reduceMotion) {
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
          el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
        }
      });
    }
    ticking = false;
  }
  function requestScroll() {
    if (!ticking) { window.requestAnimationFrame(onScrollFrame); ticking = true; }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  onScrollFrame();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile full-screen menu ---------- */
  function closeMenu() { body.classList.remove('menu-open'); if (navToggle) navToggle.setAttribute('aria-expanded', 'false'); }
  function toggleMenu() {
    var open = body.classList.toggle('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (navToggle) navToggle.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-menu a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Reveal on scroll (fade-in / slide-up) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.slice.call(el.parentElement.children);
          var delay = Math.min(siblings.indexOf(el), 5) * 90;
          setTimeout(function () { el.classList.add('in'); }, delay);
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Animated counters ---------- */
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var decimals = (el.getAttribute('data-decimals') | 0);
    var duration = 1500, start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (eased * target).toFixed(decimals);
      if (p < 1) window.requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals);
    }
    window.requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); countObs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
