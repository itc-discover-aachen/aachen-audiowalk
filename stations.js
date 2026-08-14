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
    mapsUrl: 'https://www.google.com/maps/place/Super+C/@50.7778945,6.0786742,18.38z/data=!4m6!3m5!1s0x47c099797da11f27:0x5c6e1f3d34e9438a!8m2!3d50.7780586!4d6.0787768!16s%2Fg%2F11c2kw44xj?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
   },
   {
    id: 'hauptgebäude',
    title: 'Hauptgebäude — RWTH Aachen',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M20 84 V40 L50 26 L80 40 V84 Z"/>' +
          '<path d="M20 40 L80 40 M50 26 V84"/>' +
          '<path d="M30 84 V56 H44 V84 M56 84 V56 H70 V84"/></svg>',
    audioSrc: 'audio/05-superc.mp3',
    text: 'Das markante Gebäude der RWTH markiert den Übergang von der Kaiserstadt ' +
          'zur Wissenschaftsstadt — und damit einen passenden Schlusspunkt für alle, ' +
          'die gleich wieder in den Hörsaal zurückkehren.',
    mapsUrl: 'https://www.google.com/maps/place/Templergraben+55,+52062+Aachen/@50.7767054,6.076662,17.21z/data=!3m1!5s0x47c099796c485341:0x4b64613219ad90d5!4m6!3m5!1s0x47c099796c4dcfa1:0xe15a5b1ac40fdcb9!8m2!3d50.7777258!4d6.0777748!16s%2Fg%2F11xf3bpzxg?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
   },
   {
    id: 'karmantor',
    title: 'Karmantor — RWTH Aachen',
    imageSrc: null,
    icon: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M20 84 V40 L50 26 L80 40 V84 Z"/>' +
          '<path d="M20 40 L80 40 M50 26 V84"/>' +
          '<path d="M30 84 V56 H44 V84 M56 84 V56 H70 V84"/></svg>',
    audioSrc: 'audio/05-superc.mp3',
    text: 'Das markante Gebäude der RWTH markiert den Übergang von der Kaiserstadt ' +
          'zur Wissenschaftsstadt — und damit einen passenden Schlusspunkt für alle, ' +
          'die gleich wieder in den Hörsaal zurückkehren.',
    mapsUrl: 'https://www.google.com/maps/place/Klosterrather+Hof+-+Torbau/@50.7773042,6.0786787,18.96z/data=!4m6!3m5!1s0x47c099185145fd15:0x140a7c8d36b27ee!8m2!3d50.7771366!4d6.0797923!16s%2Fg%2F11ppp5mrzw?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
   },
   {
    id: 'augustinerplatzbrunnen',
    title: 'Agustinerplatzbrunnen',
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
    mapsUrl: 'https://www.google.com/maps/place/Augustinerplatzbrunnen/@50.7763844,6.0801439,17.79z/data=!4m6!3m5!1s0x47c099000313fd03:0x92eb7a483227b59b!8m2!3d50.7761376!4d6.0811338!16s%2Fg%2F1229kqxz?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
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
    mapsUrl: 'https://www.google.com/maps/place/Rathaus+Aachen/@50.775718,6.0825204,18.38z/data=!4m6!3m5!1s0x47c0997b5dd487b9:0xc4588ba5612a8cfe!8m2!3d50.7761517!4d6.0838046!16s%2Fm%2F0x1bh33?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: 'katschhof',
    title: 'Katschhof',
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
    mapsUrl: 'https://www.google.com/maps/place/Katschhof/@50.7749377,6.0836096,18.71z/data=!4m6!3m5!1s0x47c0997ca44773c9:0xb977c1665d4c8e0f!8m2!3d50.7753768!4d6.0838146!16s%2Fg%2F1222yz09?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
  },
    {
    id: 'puppenbrunnen',
    title: 'Puppenbrunnen',
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
    mapsUrl: 'https://www.google.com/maps/place/Puppenbrunnen,+Aachen+-+Bonifatius+Stirnberg+(1975)/@50.774973,6.0844304,18.71z/data=!4m6!3m5!1s0x47c0997caffa0eb5:0xaf9a25b878fec5d5!8m2!3d50.7750852!4d6.0844493!16s%2Fg%2F122y4ww9?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
  },
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
    mapsUrl: 'https://www.google.com/maps/place/Aachener+Dom/@50.7744579,6.0835469,18.42z/data=!4m6!3m5!1s0x47c0997c84f087fb:0x38730b23e56788c3!8m2!3d50.7747198!4d6.0839201!16zL20vMDFmZHFw?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3Dm'
  },
   {
    id: 'elisengarten',
    title: 'Elisengarten',
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
    mapsUrl: 'https://www.google.com/maps/place/Elisengarten/@50.774408,6.0856716,19z/data=!4m6!3m5!1s0x47c099ab67e5d17f:0x8acb3855af9e2353!8m2!3d50.7742989!4d6.0861875!16s%2Fg%2F121g6t1c?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
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
    mapsUrl: 'https://www.google.com/maps/place/Elisenbrunnen/@50.7741148,6.0866496,19.83z/data=!4m6!3m5!1s0x47c0996312556c85:0x8eb3785ac7865d2e!8m2!3d50.7740678!4d6.0869838!16s%2Fg%2F121k2brc?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
  },
   {
    id: 'restaurant',
    title: 'Restaurant Elisenbrunnen',
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
    mapsUrl: 'https://www.google.com/maps/place/Restaurant+Elisenbrunnen/@50.7744397,6.0867559,19.83z/data=!4m6!3m5!1s0x47c099630b75213f:0x510a227acb81da3e!8m2!3d50.7744328!4d6.0868055!16s%2Fg%2F1ptw08m95?entry=ttu&g_ep=EgoyMDI2MDgxMS4wIKXMDSoASAFQAw%3D%3D'
  }, 
];
