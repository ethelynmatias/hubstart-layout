/* ===================== v4 — logo + testimonial sliders ===================== */

// Logo sliders (left / right arrows) — supports multiple carousels
(function () {
  document.querySelectorAll('.logo-carousel').forEach(function (car) {
    var track = car.querySelector('.logo-track');
    if (!track) return;
    car.querySelectorAll('.clients-arrow').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.dataset.dir, 10) || 1;
        var step = Math.max(track.clientWidth * 0.7, 260);
        track.scrollBy({ left: dir * step, behavior: 'smooth' });
      });
    });
  });
})();

// Testimonials slider (arrows scroll one card at a time)
(function () {
  var track = document.getElementById('testiTrack');
  if (!track) return;
  document.querySelectorAll('.testi-arrow').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dir = parseInt(btn.dataset.dir, 10) || 1;
      var card = track.querySelector('.testi-card');
      var step = card ? card.getBoundingClientRect().width + 22 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * step, behavior: 'smooth' });
    });
  });
})();

// Metrics menu (arrows + menu items select a metric; progress tracks position)
(function () {
  var menu = document.querySelector('.metrics-menu');
  if (!menu) return;

  var items = Array.prototype.slice.call(menu.querySelectorAll('.metrics-item'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.metrics-panel'));
  var arrows = Array.prototype.slice.call(document.querySelectorAll('.metrics-arrow'));
  var counter = document.getElementById('metricsCurrent');
  var bar = document.getElementById('metricsBar');
  var current = 0;

  function select(index) {
    current = Math.max(0, Math.min(index, items.length - 1));

    items.forEach(function (item, i) {
      var on = i === current;
      item.classList.toggle('is-active', on);
      item.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (panel, i) {
      panel.hidden = i !== current;
      panel.classList.toggle('is-active', i === current);
    });

    if (counter) counter.textContent = ('0' + (current + 1)).slice(-2);
    if (bar) bar.style.width = ((current + 1) / items.length * 100) + '%';
    arrows.forEach(function (btn) {
      var dir = parseInt(btn.dataset.vdir, 10) || 1;
      btn.disabled = dir < 0 ? current === 0 : current === items.length - 1;
    });
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { select(i); });
  });

  arrows.forEach(function (btn) {
    btn.addEventListener('click', function () {
      select(current + (parseInt(btn.dataset.vdir, 10) || 1));
    });
  });

  // arrow keys move through the menu when it has focus
  menu.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    select(current + (e.key === 'ArrowDown' ? 1 : -1));
    items[current].focus();
  });

  select(0);
})();
