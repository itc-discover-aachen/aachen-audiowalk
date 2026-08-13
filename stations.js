/* ==============================================================
   STATIONSDATEN
   Einzige Quelle der Wahrheit für die gesamte Route. Um eine
   Station hinzuzufügen, zu entfernen oder umzuordnen, wird
   ausschließlich diese Datei bearbeitet — HTML und script.js
   bleiben unangetastet.

   Felder je Station:
     id        – eindeutiger Slug, ergibt den Anker "#station-<id>"
     title     – Stationstitel
     icon      – SVG-Illustration (genutzt, solange kein imageSrc gesetzt ist)
     imageSrc  – optional: Pfad zu einem echten Foto; überschreibt icon
     audioSrc  – Pfad zur Audiodatei
     text      – kurzer Beschreibungstext
     mapsUrl   – optional: Link zum Standort auf Google Maps
   ============================================================== */
var STATIONS = [
   {
    id: 'ponttor',
    title: 'Ponttor',
    imageSrc: 'images/ponttor.jpg',
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M50 8 L82 26 L82 68 L50 92 L18 68 L18 26 Z"/>' +
          '<path d="M50 8 L50 36 M18 26 L50 46 L82 26 M18 68 L50 46 L82 68"/>' +
          '<circle cx="50" cy="46" r="9"/></svg>',
    audioSrc: 'audio/01-dom.mp3',
    text: 'Um 800 ließ Karl der Große hier seine Pfalzkapelle errichten — den Kern ' +
          'des heutigen Doms. Das oktogonale Zentrum zählt zu den ältesten erhaltenen ' +
          'Bauwerken nördlich der Alpen und war 1978 die erste deutsche Stätte auf ' +
          'der UNESCO-Welterbeliste.',
    mapsUrl: 'https://www.google.com/maps/place/Ponttor/@50.7810127,6.0754486,16.71z/data=!4m10!1m2!2m1!1sPonttor!3m6!1s0x47c09977675fb641:0x5701a4017f4764c5!8m2!3d50.7816158!4d6.0781955!15sCgdQb250dG9ykgETaGlzdG9yaWNhbF9sYW5kbWFya-ABAA!16s%2Fm%2F0x24gd5?entry=ttu&g_ep=EgoyMDI2MDgxMC4wIKXMDSoASAFQAw%3D%3D'
   },
   {
    id: 'superc',
    title: 'SuperC — RWTH Aachen',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M20 84 V40 L50 26 L80 40 V84 Z"/>' +
          '<path d="M20 40 L80 40 M50 26 V84"/>' +
          '<path d="M30 84 V56 H44 V84 M56 84 V56 H70 V84"/></svg>',
    audioSrc: 'audio/05-superc.mp3',
    text: 'Das markante Gebäude der RWTH markiert den Übergang von der Kaiserstadt ' +
          'zur Wissenschaftsstadt — und damit einen passenden Schlusspunkt für alle, ' +
          'die gleich wieder in den Hörsaal zurückkehren.',
    mapsUrl: 'https://maps.google.com/?q=SuperC+RWTH+Aachen'
   }  
   {
    id: 'dom',
    title: 'Aachener Dom',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M50 8 L82 26 L82 68 L50 92 L18 68 L18 26 Z"/>' +
          '<path d="M50 8 L50 36 M18 26 L50 46 L82 26 M18 68 L50 46 L82 68"/>' +
          '<circle cx="50" cy="46" r="9"/></svg>',
    audioSrc: 'audio/01-dom.mp3',
    text: 'Um 800 ließ Karl der Große hier seine Pfalzkapelle errichten — den Kern ' +
          'des heutigen Doms. Das oktogonale Zentrum zählt zu den ältesten erhaltenen ' +
          'Bauwerken nördlich der Alpen und war 1978 die erste deutsche Stätte auf ' +
          'der UNESCO-Welterbeliste.',
    mapsUrl: 'https://maps.google.com/?q=Aachener+Dom'
  },
  {
    id: 'rathaus',
    title: 'Rathaus',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="20" y="42" width="60" height="42" rx="1"/>' +
          '<path d="M28 42 L28 22 L36 14 L36 42 M64 42 L64 22 L72 14 L72 42"/>' +
          '<path d="M40 84 V64 H60 V84"/>' +
          '<path d="M30 54 h8 M62 54 h8"/></svg>',
    audioSrc: 'audio/02-rathaus.mp3',
    text: 'Errichtet auf den Fundamenten der karolingischen Königshalle, war das ' +
          'Rathaus Schauplatz von dreißig Königskrönungen. Im Krönungssaal im ersten ' +
          'Obergeschoss hängen bis heute die Kaiserbilder von Karl dem Großen bis ' +
          'Franz II.',
    mapsUrl: 'https://maps.google.com/?q=Rathaus+Aachen'
  },
  {
    id: 'elisenbrunnen',
    title: 'Elisenbrunnen',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M14 34 L50 18 L86 34"/>' +
          '<rect x="14" y="34" width="72" height="6"/>' +
          '<path d="M24 40 v34 M40 40 v34 M60 40 v34 M76 40 v34"/>' +
          '<path d="M14 78 h72"/></svg>',
    audioSrc: 'audio/03-elisenbrunnen.mp3',
    text: 'Der klassizistische Pavillon von 1827 führt die schwefelhaltigen ' +
          'Thermalquellen, die schon die Römer schätzten. Die offene Wandelhalle ' +
          'war über Generationen Treffpunkt der Kurgäste — heute ein beliebter ' +
          'Ausgangspunkt für Stadtspaziergänge.',
    mapsUrl: 'https://maps.google.com/?q=Elisenbrunnen+Aachen'
  },
  {
    id: 'fischmarkt',
    title: 'Fischmarkt &amp; Hühnerdieb',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="50" cy="46" r="16"/>' +
          '<circle cx="50" cy="46" r="4" fill="currentColor" stroke="none"/>' +
          '<path d="M50 30 v-8 M20 84 h60 M14 78 h4 M22 78 h4 M30 78 h4 M38 78 h4 M46 78 h4 M54 78 h4 M62 78 h4 M70 78 h4 M78 78 h4"/></svg>',
    audioSrc: 'audio/04-fischmarkt.mp3',
    text: 'Der kopfsteingepflasterte Platz war einst Umschlagplatz für Fisch, ' +
          'heute Bühne für Cafés und Gespräche. Der bronzene „Hühnerdieb" auf dem ' +
          'Brunnen erinnert an eine der bekanntesten Aachener Sagen.',
    mapsUrl: 'https://maps.google.com/?q=Fischmarkt+Aachen'
  },
  
];
