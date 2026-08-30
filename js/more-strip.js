(function () {
  var strip = document.getElementById('more-strip');
  if (!strip) return;

  // Detect current gallery slug from URL path
  // e.g. /flights-of-fantasy/index.html → "flights-of-fantasy"
  var parts = window.location.pathname.replace(/\/$/, '').split('/');
  var currentSlug = '';
  for (var i = parts.length - 1; i >= 0; i--) {
    if (parts[i] && parts[i] !== 'index.html') {
      currentSlug = parts[i];
      break;
    }
  }

  // Resolve the correct depth for the data path
  // Gallery indexes are one level deep: /gallery-slug/index.html
  // So /data/galleries.json is at ../../data/ — but using root-relative is cleaner
  var dataUrl = '/data/galleries.json';

  fetch(dataUrl)
    .then(function (res) { return res.json(); })
    .then(function (galleries) {
      var html = '';
      galleries.forEach(function (g) {
        if (g.slug === currentSlug) return; // skip current gallery
        html +=
          '<a class="more-card" href="/' + g.slug + '/index.html" role="listitem">' +
            '<div class="more-card-thumb">' +
              '<img src="' + g.thumb + '" alt="' + g.name + '" loading="lazy" />' +
            '</div>' +
            '<p class="more-card-name">' + g.name + '</p>' +
            '<span class="more-card-count">' + g.count + ' wallpapers</span>' +
          '</a>';
      });
      strip.innerHTML = html;
    })
    .catch(function () {
      // Silent fail — strip stays empty rather than breaking the page
    });
})();
