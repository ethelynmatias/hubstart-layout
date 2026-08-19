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

// Header: solid background + shrink on scroll, and hide unless scrolling up
(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;

  var lastY = window.scrollY;
  var ticking = false;
  var REVEAL_AT = 90;   // px scrolled before hiding is allowed at all
  var DEADZONE = 6;     // ignore jitter / trackpad noise

  function update() {
    ticking = false;
    var y = window.scrollY;
    var delta = y - lastY;

    header.classList.toggle('scrolled', y > 40);

    // never hide near the top, while the mobile menu is open, or with a dropdown open
    if (y <= REVEAL_AT || document.body.classList.contains('menu-open') || header.querySelector('.nav-item.open')) {
      header.classList.remove('hidden');
      lastY = y;
      return;
    }

    if (Math.abs(delta) > DEADZONE) {
      header.classList.toggle('hidden', delta > 0);
      lastY = y;
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
})();
