/* ==============================================================
   MINIMALES JAVASCRIPT (kein Framework)
   Verwendet die in stations.js definierte STATIONS-Datenstruktur.
   0) Generiert die komplette Route aus STATIONS
   1) Aktualisiert die Fortschrittsleiste + Streckenfüllung beim Scrollen
   2) Markiert die aktuell sichtbare Station am Wegrand
   3) Pausiert andere Audioplayer, sobald einer startet
   ============================================================== */
(function () {

  // --- 0: Route aus den Daten generieren ---

  // Wandelt eine Zahl in eine römische Ziffer um (I, II, III, ...),
  // damit die Nummerierung der Meilensteine ohne manuelle Pflege
  // immer zur tatsächlichen Position in STATIONS passt.
  function toRoman(num) {
    var map = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],
                [50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    var result = '';
    map.forEach(function (pair) {
      while (num >= pair[0]) { result += pair[1]; num -= pair[0]; }
    });
    return result;
  }

  function renderStationMarkup(station, index, isLast) {
    var figure = station.imageSrc
      ? '<img src="' + station.imageSrc + '" alt="' + station.title + '">'
      : station.icon;

    var eyebrow = 'Station ' + (index + 1) + (isLast ? ' · Ziel' : '');

    // Statt eines "Zur nächsten Station"-Buttons (Scrollen reicht) steht
    // hier jetzt der Google-Maps-Link als Button — nur wenn eine
    // Station ein mapsUrl-Feld hat.
    var mapsButton = station.mapsUrl
      ? '<a href="' + station.mapsUrl + '" target="_blank" rel="noopener" class="btn btn--ghost">' +
        'Auf Google Maps öffnen' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
        '</a>'
      : '';

    return (
      '<section class="station" id="station-' + station.id + '" data-station="' + (index + 1) + '">' +
        '<div class="station__marker">' + toRoman(index + 1) + '</div>' +
        '<div class="station__card">' +
          '<div class="station__figure">' + figure + '</div>' +
          '<p class="station__eyebrow">' + eyebrow + '</p>' +
          '<h2 class="station__title">' + station.title + '</h2>' +
          '<audio class="station__audio" controls preload="none" src="' + station.audioSrc + '">' +
            'Ihr Browser unterstützt die Audiowiedergabe leider nicht.' +
          '</audio>' +
          '<p class="station__text">' + station.text + '</p>' +
          mapsButton +
        '</div>' +
      '</section>'
    );
  }

  function renderRoute() {
    var container = document.getElementById('stationsContainer');
    container.innerHTML = STATIONS.map(function (station, index) {
      var isLast = index === STATIONS.length - 1;
      return renderStationMarkup(station, index, isLast);
    }).join('');

    // Abhängige UI-Elemente an die tatsächliche Stationsanzahl
    // und die erste Station anpassen — auch das ohne HTML-Änderung.
    document.getElementById('stationCount').textContent = STATIONS.length;
    document.getElementById('startBtn').setAttribute('href', '#station-' + STATIONS[0].id);
  }

  renderRoute();

  // --- 1 & 2: Fortschritt entlang der (jetzt generierten) Route ---
  var stations   = Array.prototype.slice.call(document.querySelectorAll('.station'));
  var totalCount = stations.length;
  var routeEl     = document.getElementById('route');
  var routeFillEl = document.getElementById('routeFill');
  var progressFillEl = document.getElementById('progressFill');
  var progressLabelEl = document.getElementById('progressLabel');

  var currentIndex = 0;

  // --- 1 & 2: Scroll-Fortschritt entlang der Route berechnen ---
  function updateProgress() {
    var viewportCenter = window.scrollY + window.innerHeight * 0.4;

    // Wegstrecke: Anteil der Route, der bereits "passiert" wurde
    var routeTop = routeEl.getBoundingClientRect().top + window.scrollY;
    var routeHeight = routeEl.offsetHeight;
    var ratio = (viewportCenter - routeTop) / routeHeight;
    ratio = Math.max(0, Math.min(1, ratio));
    routeFillEl.style.height = (ratio * 100) + '%';

    // Aktive Station bestimmen (die, deren Mitte am nächsten am
    // Betrachtungspunkt liegt) und Marker + Fortschrittslabel updaten
    var closestIndex = 0;
    var closestDistance = Infinity;
    stations.forEach(function (station, i) {
      var rect = station.getBoundingClientRect();
      var stationCenter = rect.top + window.scrollY + rect.height / 2;
      var distance = Math.abs(stationCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== currentIndex || document.querySelectorAll('.is-active').length === 0) {
      stations.forEach(function (s) { s.classList.remove('is-active'); });
    }
    stations[closestIndex].classList.add('is-active');
    currentIndex = closestIndex;

    var stationNumber = ratio <= 0 ? 0 : currentIndex + 1;
    progressLabelEl.textContent = 'Station ' + stationNumber + ' / ' + totalCount;
    progressFillEl.style.width = (ratio * 100) + '%';
  }

  // Performance: Scroll-Handler per requestAnimationFrame drosseln
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateProgress);
  updateProgress();

  // --- 3: Immer nur einen Audioplayer gleichzeitig abspielen ---
  var players = Array.prototype.slice.call(document.querySelectorAll('.station__audio'));
  players.forEach(function (player) {
    player.addEventListener('play', function () {
      players.forEach(function (other) {
        if (other !== player) other.pause();
      });
    });
  });
})();
