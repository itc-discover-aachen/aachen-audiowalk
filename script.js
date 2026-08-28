/* ==============================================================
   MINIMALES JAVASCRIPT (kein Framework)
   Verwendet die in stations.js definierte STATIONS-Datenstruktur.
   0) Generiert die komplette Route aus STATIONS
   1) Laedt Stationstexte nach (aus .txt-Dateien im Ordner texts/)
   2) Aktualisiert die Fortschrittsleiste + Streckenfuellung beim Scrollen
   3) Markiert die aktuell sichtbare Station am Wegrand
   4) Pausiert andere Audioplayer, sobald einer startet

   HINWEIS ZUM TESTEN: Das Nachladen der Textdateien nutzt fetch().
   Browser blockieren fetch() bei geoeffneten file://-Dateien. Die Seite
   muss also ueber einen (lokalen) Webserver ausgeliefert werden, z. B.:
       python3 -m http.server 8000
   und dann http://localhost:8000 im Browser oeffnen. Auf GitHub Pages
   funktioniert es ohne Zusatzschritte.
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

  // --- Textquellen ---------------------------------------------
  // Das Feld textSrc einer Station darf zweierlei sein:
  //   a) ein Pfad auf eine Textdatei, z. B. 'texts/ponttor.txt'
  //      -> wird zur Laufzeit nachgeladen
  //   b) ein direkt hingeschriebener Text (wie bisher)
  //      -> wird unveraendert angezeigt
  // Unterschieden wird schlicht an der Endung '.txt'.
  function isTextFileRef(value) {
    return typeof value === 'string' && /\.txt$/i.test(value.trim());
  }

  // Sonderzeichen entschaerfen, damit ein '<' oder '&' in der
  // Textdatei das Layout nicht zerschiesst. Folge davon: In den
  // .txt-Dateien ist kein HTML moeglich, nur reiner Text.
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Reinen Text in Absaetze umwandeln: jede nicht-leere Zeile wird
  // ein eigener <p>-Absatz. Leerzeilen werden ignoriert, Zeilenenden
  // im Windows-Format (\r\n) ebenso sauber behandelt wie \n.
  function textToParagraphs(rawText) {
    var lines = String(rawText).split(/\r?\n/);
    var paragraphs = [];
    lines.forEach(function (line) {
      var trimmed = line.trim();
      if (trimmed) {
        paragraphs.push('<p class="station__text">' + escapeHtml(trimmed) + '</p>');
      }
    });
    return paragraphs.join('');
  }

  // Laedt eine einzelne Textdatei und schreibt sie in ihren Container.
  function loadTextInto(container, url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.text();
      })
      .then(function (rawText) {
        container.innerHTML = textToParagraphs(rawText);
        // Der nachgeladene Text veraendert die Seitenhoehe. Die
        // Fortschrittsberechnung haengt an genau dieser Hoehe und
        // muss deshalb neu laufen.
        window.dispatchEvent(new Event('resize'));
      })
      .catch(function (error) {
        // Bewusst sichtbar: Ein stiller Fehlschlag waere beim
        // Bearbeiten der Texte nur verwirrend.
        container.innerHTML =
          '<p class="station__text">[Text konnte nicht geladen werden: ' +
          escapeHtml(url) + ' — ' + escapeHtml(error.message) + ']</p>';
        console.error('Textdatei nicht ladbar:', url, error);
      });
  }

  function renderStationMarkup(station, index, isLast) {
    var figure = station.imageSrc
      ? '<img src="' + station.imageSrc + '" alt="' + station.title + '">'
      : station.icon;

    var eyebrow = 'Station ' + (index + 1) + (isLast ? ' · Ziel' : '');

    // Textbereich: Bei einer .txt-Quelle bleibt er zunaechst leer und
    // wird nach dem Rendern per fetch() befuellt. Bei direkt
    // hingeschriebenem Text steht der Inhalt sofort drin.
    var textBody = isTextFileRef(station.textSrc)
      ? ''
      : textToParagraphs(station.textSrc || '');

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
          '<button type="button" class="station__toggle" aria-expanded="false" aria-controls="text-' + station.id + '">' +
            '<span class="station__toggle-label">Text lesen</span>' +
            // Chevron (">"), per CSS um 90° gedreht: nach unten im
            // eingeklappten, nach oben im ausgeklappten Zustand.
            '<svg class="station__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>' +
          '</button>' +
          '<div class="station__collapse" id="text-' + station.id + '" hidden>' +
            '<div class="station__body" data-text-for="' + station.id + '">' + textBody + '</div>' +
          '</div>' +
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

    // Alle Stationen mit Datei-Quelle nachladen.
    STATIONS.forEach(function (station) {
      if (!isTextFileRef(station.textSrc)) return;
      var target = container.querySelector('[data-text-for="' + station.id + '"]');
      if (target) loadTextInto(target, station.textSrc.trim());
    });

    wireToggles(container);
  }

  // --- Auf-/Zuklappen der Stationstexte ------------------------
  // Grundzustand ist eingeklappt (hidden im Markup, aria-expanded
  // false). Der Chevron dreht sich per CSS-Klasse mit.
  function wireToggles(container) {
    var toggles = Array.prototype.slice.call(
      container.querySelectorAll('.station__toggle')
    );

    toggles.forEach(function (toggle) {
      var region = document.getElementById(
        toggle.getAttribute('aria-controls')
      );
      if (!region) return;

      var label = toggle.querySelector('.station__toggle-label');

      toggle.addEventListener('click', function () {
        var isOpen = toggle.getAttribute('aria-expanded') === 'true';
        var willOpen = !isOpen;

        toggle.setAttribute('aria-expanded', String(willOpen));
        toggle.classList.toggle('is-open', willOpen);
        region.hidden = !willOpen;
        if (label) label.textContent = willOpen ? 'Text ausblenden' : 'Text lesen';

        // Die Seitenhoehe aendert sich beim Auf-/Zuklappen, also
        // muss die Fortschrittsanzeige neu gerechnet werden.
        window.dispatchEvent(new Event('resize'));
      });
    });
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
