/* ===================== v4 — scroll-to-top, reveal, parallax ===================== */

// Floating scroll-to-top button
(function () {
  var btn = document.getElementById('toTop');
  if (!btn) return;
  function onScroll() {
    btn.classList.toggle('show', window.scrollY > 500);
  }
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Scroll-reveal animations, staggered per section
(function () {
  var selector = [
    '.ceiling-eyebrow', '.ceiling-title', '.ceiling-body', '.ceiling-visual',
    '.svc-card',
    '.clients-eyebrow', '.clients-title', '.clients-sub', '.logo-carousel',
    '.how-head', '.how-card', '.how-note',
    '.proof-eyebrow', '.proof-title', '.proof-sub', '.proof-card', '.proof-note',
    '.testi-head', '.testi-card',
    '.cta-eyebrow', '.cta-title', '.cta-text', '.cta-guarantee', '.cta-actions',
    '.footer-grid > *'
  ].join(', ');
  var items = document.querySelectorAll(selector);
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); return; }

  items.forEach(function (el) {
    el.classList.add('reveal');
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = Math.min(idx * 70, 420) + 'ms';
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { obs.observe(el); });
})();

// Parallax background for the Proof section
(function () {
  var bg = document.querySelector('.proof-bg');
  if (!bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var section = bg.closest('.proof');
  var ticking = false;
  function update() {
    var rect = section.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      var y = rect.top * 0.18;              // move slower than the page
      bg.style.transform = 'translate3d(0,' + y + 'px,0)';
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
