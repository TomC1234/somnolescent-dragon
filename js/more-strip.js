(function () {
  var strip = document.getElementById('more-strip');
  if (!strip) return;

  // Detect current gallery slug from URL path
  // Handles both /gallery-slug/ and /gallery-slug/index.html
  var pathname = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/$/, '');
  var parts = pathname.split('/');
  var currentSlug = parts[parts.length - 1] || '';

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
