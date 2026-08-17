/* ===================== v4 — navigation behaviour ===================== */

// Hamburger toggle for the mobile menu
(function () {
  var toggle = document.getElementById('navToggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close the menu when a link inside it is tapped
  document.querySelectorAll('#mobileMenu a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Desktop dropdown submenus (click to toggle; hover still opens via CSS)
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
  var triggers = items.filter(function (it) { return it.querySelector('.submenu'); });

  function closeAll(except) {
    triggers.forEach(function (it) {
      if (it === except) return;
      it.classList.remove('open');
      var btn = it.querySelector('.nav-link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  triggers.forEach(function (it) {
    var btn = it.querySelector('.nav-link');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var willOpen = !it.classList.contains('open');
      closeAll(it);
      it.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  // Close when clicking anywhere outside an open dropdown
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) closeAll(null);
  });

  // Close when focus leaves the whole nav (keyboard) or on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll(null);
  });
  document.addEventListener('focusin', function (e) {
    if (!e.target.closest('.nav-item')) closeAll(null);
  });
})();

// Header: solid background + shrink on scroll
(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
