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
