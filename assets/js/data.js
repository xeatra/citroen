/* =====================================================================
   DATA — demo content. In production:
     DEALER / LOCATIONS / TEAM → Sales Partner DMS (organisation, users)
     MODELS (versions, list prices, colours, options, equipment) → importer price lists / IMS
        (Citroën România price lists, citroen.ro, 05–11/2026)
     SERVICE OFFERS / FINANCE → dealer CMS
     STOCK → DMS stock feed (new + used, status, photos)
   Dealer data is FICTIONAL. Images are hot-linked from citroen.ro (media library)
   and from the Citroën 3D visual server (configurator renders, any colour).
   All prices include 21% VAT. Vans are listed by the importer excl. VAT (net shown too).
   ===================================================================== */
window.SP = window.SP || {};
(function (SP) {
  const R = (ro, en) => ({ ro, en: en || ro });
  const CD = 'https://www.citroen.ro/content/dam/citroen/';
  SP.cf = p => !p ? '' : /^(https?:|data:)/.test(p) ? p : encodeURI(CD + p);
  /* Citroën 3D visual server (same renders as the citroen.ro configurator): version LCDV × colour × view */
  SP.v3d = (lcdv, color, view, w) => 'https://visuel3d-secure.citroen.com/V3DImage.ashx?client=CFGAP3D&mkt=RO&env=PROD&version=' + lcdv + '&ratio=1&format=png&quality=90&width=' + (w || 1280) + '&view=' + (view || '001') + '&color=' + color + '&back=0';
  SP.PRICELISTS = 'https://www.citroen.ro/instrumente/descarca-lista-preturi.html';
  SP.PL = f => CD + 'romania/liste-de-preturi-2023/' + f;
  SP.OFFICIAL = 'https://www.citroen.ro';

  SP.DEALER = {
    name: 'Sales Partner Auto · Citroën', short: 'Sales Partner', phone: '+40 21 555 04 00', email: 'citroen@sp-auto.demo',
    legal: { company: 'Demo Auto Group S.R.L.', reg: 'J40/0000/2026', cui: 'RO00000000' },
    importer: 'Citroën România (importator)', group: '../peugeot_dealership/index.html'
  };

  const HRS = { sales: [['mon', '08:30 – 18:00'], ['sat', '10:00 – 14:00'], ['sun', null]], service: [['mon', '08:00 – 17:00'], ['sat', null], ['sun', null]] };
  SP.LOCATIONS = [
    { id: 'pantelimon', city: 'București', name: 'Sales Partner Citroën Pantelimon', address: 'Șos. Pantelimon 400, Sector 2, București', phone: '+40 21 555 04 00', wa: '+40 722 000 400', email: 'pantelimon@sp-auto.demo',
      img: 'master/b2c/models/new-c5-aircross-2025/opening-of-order/immersive-key-features_lifestyle_01_2880x1300.webp', tags: ['sales', 'used', 'service', 'parts', 'body', 'itp', 'ev'], hours: HRS,
      team: [['Andrei Dumitrescu', 'gm'], ['Radu Ionescu', 'sales'], ['Corina Stan', 'sales'], ['Mihai Pop', 'used'], ['Tudor Manea', 'service'], ['Ana Marin', 'workshop']] },
    { id: 'otopeni', city: 'Otopeni', name: 'Sales Partner Citroën Otopeni', address: 'Calea Bucureștilor 300, Otopeni, Ilfov', phone: '+40 21 555 04 30', wa: '+40 722 000 430', email: 'otopeni@sp-auto.demo',
      img: 'master/b2b/models/new-ë-jumpy-jumpy/l-m/Jumpy-herobanner-2880x1152.jpg', tags: ['sales', 'pro', 'service', 'parts', 'body', 'itp', 'buyback'], hours: HRS,
      team: [['Ioana Albu', 'pro'], ['Sorin Vlad', 'pro'], ['George Pavel', 'sales'], ['Dan Neagu', 'service']] },
    { id: 'brasov', city: 'Brașov', name: 'Sales Partner Citroën Brașov', address: 'Str. Zizinului 200, Brașov', phone: '+40 268 555 040', wa: '+40 722 000 440', email: 'brasov@sp-auto.demo',
      img: 'master/b2c/models/new-c3-2023/ice/l-m/HERO_BANNER_C3ICE_2880x1152.jpg', tags: ['sales', 'used', 'service', 'parts', 'body', 'buyback'], hours: HRS,
      team: [['Adrian Barbu', 'sales'], ['Elena Popescu', 'used'], ['Vlad Toma', 'service']] }
  ];
  SP.ADVISORS = { ri: { name: 'Radu Ionescu', role: 'sales', phone: '+40 722 000 401' }, cs: { name: 'Corina Stan', role: 'sales', phone: '+40 722 000 402' }, mp: { name: 'Mihai Pop', role: 'used', phone: '+40 722 000 403' },
    ia: { name: 'Ioana Albu', role: 'pro', phone: '+40 722 000 430' }, ab: { name: 'Adrian Barbu', role: 'sales', phone: '+40 722 000 440' } };

  SP.FUEL = { petrol: R('Benzină', 'Petrol'), hybrid: R('Hybrid', 'Hybrid'), phev: R('Plug-in Hybrid', 'Plug-in Hybrid'), ev: R('Electric', 'Electric'), diesel: R('Diesel', 'Diesel') };
  /* filter tabs as on citroen.ro "Descoperă gama" categories */
  SP.CATS = [['all', R('Toate', 'All')], ['ev', R('Electric & Hybrid', 'Electric & Hybrid')], ['suv', R('SUV', 'SUV')], ['family', R('Mașini de familie', 'Family cars')], ['city', R('Mașini de oraș', 'City cars')], ['pro', R('Utilitare', 'Vans')]];

  /* versions: code, trim, engine, hp, fuel, gearbox, drive/body, list price (VAT incl.) */
  const V = (code, trim, eng, hp, fuel, gb, dr, price) => ({ code, trim, eng, hp, fuel, gb, dr, price, promo: price });
  const net = n => Math.round(n * 1.21);
  /* colours: code (3D colour code), name, hex, surcharge, only = trims */
  const C = (code, name, hex, sur, only) => ({ code, name, hex, sur, only });
  const NAV = 'master/b2c/models/';

  SP.MODELS = [
    { id: 'c3', name: 'C3 / ë-C3', short: 'C3', sub: R('Compacta urbană', 'Urban compact'), fuels: ['petrol', 'hybrid', 'ev'], cats: ['all', 'ev', 'city', 'suv'], badges: [R('Configurator', 'Configurator')], cfg: true,
      lcdv: '1CSCA5NJGWC0A040', card: NAV + 'new-c3-2023/bbc/new-C3-ICE-carpicker.png', cardE: NAV + 'new-c3-2023/bbc/new-eC3-576x324.png',
      eng: 'Turbo 100 · Hybrid 110 · ë 113 CP', pw: '74 – 83 kW / 100 – 113 CP',
      key: [['de la 17.180 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['320 km', R('autonomie ë-C3 (WLTP)', 'ë-C3 range (WLTP)')], ['310 L', R('portbagaj', 'boot')], ['Advanced Comfort', R('suspensie cu amortizoare progresive', 'progressive hydraulic dampers')]],
      lead: R('Noul C3, cu postură de SUV compact, suspensie Advanced Comfort și trei motorizări: Turbo 100 manual, Hybrid 110 automat și ë-C3 100% electric de 113 CP, cu baterie de 44 kWh și până la 320 km autonomie.', 'The new C3, with a compact-SUV stance, Advanced Comfort suspension and three powertrains: Turbo 100 manual, Hybrid 110 automatic and the fully electric 113 hp ë-C3 with a 44 kWh battery and up to 320 km of range.'),
      versions: [V('1CSCA5EJLKC0A040', 'YOU', 'Turbo 100', 100, 'petrol', 'M6', 'FWD', 17180), V('1CSCA5HJLKC0A040', 'PLUS', 'Turbo 100', 100, 'petrol', 'M6', 'FWD', 19169), V('1CSCA5NJLKC0A040', 'MAX', 'Turbo 100', 100, 'petrol', 'M6', 'FWD', 21217),
        V('1CSCA5HJGWC0A040', 'PLUS', 'Hybrid 110', 110, 'hybrid', 'e-DCS6', 'FWD', 23070), V('1CSCA5NJGWC0A040', 'MAX', 'Hybrid 110', 110, 'hybrid', 'e-DCS6', 'FWD', 25116),
        V('1CSCA5EZFFC0A040', 'YOU', 'ë-C3 Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 23110), V('1CSCA5HZFFC0A040', 'PLUS', 'ë-C3 Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 25260), V('1CSCA5NZFFC0A040', 'MAX', 'ë-C3 Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 27063)],
      specs: { len: '4.015 mm', wid: '1.813 mm', hei: '1.567 mm', boot: '310 L', range: R('până la 320 km (ë-C3, WLTP)', 'up to 320 km (ë-C3, WLTP)'), battery: '44 kWh (ë-C3) · 48V 0,9 kWh (Hybrid)', cons: '5,6 l/100 km (Turbo 100)', co2: '127 g/km (Turbo 100) · 117 g/km (Hybrid)' },
      defColor: '0MM00NRD',
      colors: [C('0MP00N7A', 'Bleu Monte Carlo', '#7d9db1', 0), C('0MP00NWP', 'Blanc Banquise', '#ecedea', 236), C('0MM00NRD', 'Bright Blue', '#1a4fa3', 393), C('0MM00NSX', 'Gris Mercury', '#6f7377', 393), C('0MM00N9V', 'Noir Perla Nera', '#17181b', 393), C('0MM00NVH', 'Rouge Elixir', '#a5141d', 629)],
      gallery: ['master/b2c/models/new-c3-2023/ice/l-m/HERO_BANNER_C3ICE_2880x1152.jpg', 'master/b2c/models/new-c3-2023/ice/s/FEATURES_SPACEx017_750x642.jpg', 'master/b2c/models/new-c3-2023/ice/s/FEATURES_CZEN_016_750x642.jpg', 'master/b2c/models/new-c3-2023/s/color_clip_750x642.jpg', 'master/b2c/models/new-c3-2023/ice/s/FEATURES_SAFETY_09_750x642.jpg'],
      pl: ['Citroen_C3_Lista_de_preturi_11_2026.pdf', 'Citroen_e-C3_Lista_de_preturi_11_2026.pdf'], url: 'https://www.citroen.ro/modele/c3-old.html' },

    { id: 'c3-aircross', name: 'C3 Aircross / ë-C3 Aircross', short: 'C3 Aircross', sub: R('SUV compact, până la 7 locuri', 'Compact SUV, up to 7 seats'), fuels: ['petrol', 'hybrid', 'ev'], cats: ['all', 'ev', 'suv', 'family'], badges: [R('7 locuri', '7 seats')],
      card: NAV + 'new-c3-aircross/bbc/Car_Picker_1CSJ_ICE.png', cardE: NAV + 'new-c3-aircross/bbc/Car_Picker_1CSJ_BEV.png', eng: 'Turbo 100 · Hybrid 145 · ë 113 CP', pw: '74 – 107 kW / 100 – 145 CP',
      key: [['de la 19.160 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['7 locuri', R('opțional, 787 €', 'optional, €787')], ['460 L', R('portbagaj', 'boot')], ['400 km', R('autonomie ë-C3 Aircross 54 kWh', 'ë-C3 Aircross 54 kWh range')]],
      lead: R('SUV-ul compact Citroën cu 5 sau 7 locuri, suspensie Advanced Comfort și portbagaj de 460 L: Turbo 100, Hybrid 145 sau ë-C3 Aircross electric cu baterie de 44 sau 54 kWh.', 'Citroën\'s compact SUV with 5 or 7 seats, Advanced Comfort suspension and a 460 L boot: Turbo 100, Hybrid 145 or the electric ë-C3 Aircross with a 44 or 54 kWh battery.'),
      versions: [V('C3A-Y-T100', 'YOU', 'Turbo 100', 100, 'petrol', 'M6', 'FWD', 19160), V('C3A-P-T100', 'PLUS', 'Turbo 100', 100, 'petrol', 'M6', 'FWD', 21030),
        V('C3A-Y-H145', 'YOU', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 24330), V('C3A-P-H145', 'PLUS', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 26030), V('C3A-M-H145', 'MAX', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 28144),
        V('EC3A-Y-44', 'YOU', 'ë Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 26100), V('EC3A-P-44', 'PLUS', 'ë Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 27740), V('EC3A-M-44', 'MAX', 'ë Electric 113 · 44 kWh', 113, 'ev', 'AT', 'FWD', 29740),
        V('EC3A-Y-54', 'YOU', 'ë Electric 113 · 54 kWh', 113, 'ev', 'AT', 'FWD', 28200), V('EC3A-P-54', 'PLUS', 'ë Electric 113 · 54 kWh', 113, 'ev', 'AT', 'FWD', 29840), V('EC3A-M-54', 'MAX', 'ë Electric 113 · 54 kWh', 113, 'ev', 'AT', 'FWD', 31838)],
      specs: { len: '4.395 mm', wid: '1.850 mm', boot: '460 L', range: R('300 km (44 kWh) · 400 km (54 kWh), WLTP', '300 km (44 kWh) · 400 km (54 kWh), WLTP') },
      gallery: ['romania/models/modele/termic_desktop2880x1152.jpg', 'master/b2c/models/new-c3-aircross/l-m/drivesafely.jpg', 'master/b2c/models/new-c3-aircross/l-m/czen.jpg', 'master/b2c/models/new-c3-aircross/l-m/citroenadvancedcomfort.jpg', 'master/b2c/models/new-c3-aircross/l-m/alwaysconnected.jpg'],
      pl: ['Citroen_C3_Aircross_Lista_de_preturi_11_2026.pdf', 'Citroen_e-C3_Aircross_Lista_de_preturi_11_2026.pdf'], url: 'https://www.citroen.ro/modele/old-c3-aircross.html' },

    { id: 'c4', name: 'C4 / ë-C4', short: 'C4', sub: R('Hatchback cu stil de crossover', 'Crossover-styled hatchback'), fuels: ['hybrid', 'ev'], cats: ['all', 'ev', 'family'], badges: [],
      card: NAV + 'new-c4-e/bbc/C4-ICE-576x324.png', cardE: NAV + 'new-c4-e/bbc/eC4-576x324.png', eng: 'Hybrid 110/145 · ë 156 CP', pw: '81 – 115 kW / 110 – 156 CP',
      key: [['de la 24.170 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['416 km', R('autonomie ë-C4 (WLTP)', 'ë-C4 range (WLTP)')], ['380 L', R('portbagaj', 'boot')], ['Hybrid', R('cutie automată e-DCS6', 'e-DCS6 automatic')]],
      lead: R('C4 combină silueta de crossover cu confortul Citroën: Hybrid 110 sau 145 cu cutie automată și ë-C4 100% electric de 156 CP, cu până la 416 km autonomie.', 'C4 pairs a crossover silhouette with Citroën comfort: Hybrid 110 or 145 with an automatic gearbox and the fully electric 156 hp ë-C4 with up to 416 km of range.'),
      versions: [V('C4-Y-H110', 'YOU', 'Hybrid 110', 110, 'hybrid', 'e-DCS6', 'FWD', 24170), V('C4-Y-H145', 'YOU', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 25620), V('C4-P-H145', 'PLUS', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 27030),
        V('C4-C-H145', 'COLLECTION', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 28180), V('C4-M-H145', 'MAX', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 29480),
        V('EC4-P', 'PLUS', 'ë-C4 Electric 156 · 54 kWh', 156, 'ev', 'AT', 'FWD', 37280), V('EC4-C', 'COLLECTION', 'ë-C4 Electric 156 · 54 kWh', 156, 'ev', 'AT', 'FWD', 38230), V('EC4-M', 'MAX', 'ë-C4 Electric 156 · 54 kWh', 156, 'ev', 'AT', 'FWD', 38930)],
      specs: { len: '4.350 mm', boot: '380 – 1.250 L', range: R('până la 416 km (ë-C4, WLTP)', 'up to 416 km (ë-C4, WLTP)') },
      gallery: ['romania/models/modele/KeyVisualC4.jpg', 'romania/models/modele/Caroussel1.jpg', 'romania/models/modele/Caroussel2.jpg', 'romania/models/modele/Caroussel3.jpg', 'romania/models/modele/KeyvisualelecC4.jpg'],
      pl: ['Citroen_C4_Lista_de_preturi_07_2026.pdf', 'Citroen_e-C4_Lista_de_preturi_07_2026.pdf'], url: 'https://www.citroen.ro/modele/c4.html' },

    { id: 'c4x', name: 'C4 X / ë-C4 X', short: 'C4 X', sub: R('Fastback cu portbagaj de 510 L', 'Fastback with a 510 L boot'), fuels: ['hybrid', 'ev'], cats: ['all', 'ev', 'family'], badges: [],
      card: NAV + 'c4-x/bbc/C4X-ICE-576x324.png', cardE: NAV + 'c4-x/bbc/eC4X-576x324.png', eng: 'Hybrid 145 · ë 156 CP', pw: '107 – 115 kW / 145 – 156 CP',
      key: [['de la 26.430 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['510 L', R('portbagaj', 'boot')], ['427 km', R('autonomie ë-C4 X (WLTP)', 'ë-C4 X range (WLTP)')], ['4.580 mm', R('lungime', 'length')]],
      lead: R('C4 X este fastback-ul Citroën: siluetă alungită, portbagaj de 510 L și confort Advanced Comfort, cu Hybrid 145 sau ë-C4 X electric de 156 CP.', 'C4 X is Citroën\'s fastback: a long silhouette, a 510 L boot and Advanced Comfort, with Hybrid 145 or the 156 hp electric ë-C4 X.'),
      versions: [V('C4X-Y', 'YOU', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 26430), V('C4X-P', 'PLUS', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 27880), V('C4X-M', 'MAX', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 30080),
        V('EC4X-P', 'PLUS', 'ë-C4 X Electric 156 · 54 kWh', 156, 'ev', 'AT', 'FWD', 38280), V('EC4X-M', 'MAX', 'ë-C4 X Electric 156 · 54 kWh', 156, 'ev', 'AT', 'FWD', 39930)],
      specs: { len: '4.580 mm', boot: '510 L', range: R('până la 427 km (ë-C4 X, WLTP)', 'up to 427 km (ë-C4 X, WLTP)') },
      gallery: ['master/b2c/models/new-c4-x-2024/ice/C4X_Showroom_2880x1152.jpg', 'master/b2c/models/new-c4-x-2024/exclusive-features/eC4_C4_eC4X_C4X_features_03_750.jpg'],
      pl: ['Citroen_C4X_Lista_de_preturi_07_2026.pdf', 'Citroen_e-C4X_Lista_de_preturi_07_2026.pdf'], url: 'https://www.citroen.ro/modele/c4x.html' },

    { id: 'c5-aircross', name: 'Noul C5 Aircross', short: 'C5 Aircross', sub: R('SUV de familie', 'Family SUV'), fuels: ['hybrid', 'phev', 'ev'], cats: ['all', 'ev', 'suv', 'family'], badges: [R('Nou', 'New'), R('Configurator', 'Configurator')], cfg: true,
      lcdv: '1CRESYRJH7C0A020', card: NAV + 'new-c5-aircross-2025/opening-of-order/car-picker/new-c5-Aircross-BEV-carpicker.png', eng: 'Hybrid 145 · Plug-in Hybrid 225 · ë 210 CP', pw: '107 – 157 kW / 145 – 225 CP',
      key: [['de la 32.550 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['520 km', R('autonomie ë-C5 Aircross (WLTP)', 'ë-C5 Aircross range (WLTP)')], ['565 – 651 L', R('portbagaj', 'boot')], ['13"', R('ecran tactil', 'touchscreen')]],
      lead: R('Noul C5 Aircross: SUV de familie de 4,65 m, cu ecran de 13", climatizare automată bizonă și trei motorizări — Hybrid 145, Plug-in Hybrid 225 (până la 87 km electric) și ë-C5 Aircross de 210 CP cu până la 520 km autonomie.', 'The new C5 Aircross: a 4.65 m family SUV with a 13" screen, dual-zone climate and three powertrains — Hybrid 145, Plug-in Hybrid 225 (up to 87 km electric) and the 210 hp ë-C5 Aircross with up to 520 km of range.'),
      versions: [V('1CRESYHJH7C0A020', 'YOU', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 32550), V('1CRESYNJH7C0A020', 'PLUS', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 35100), V('1CRESYRJH7C0A020', 'MAX', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 38350),
        V('1CRESYNQ97C0A020', 'PLUS', 'Plug-in Hybrid 225 · 17,8 kWh', 225, 'phev', 'e-DCS7', 'FWD', 44650), V('1CRESYRQ97C0A020', 'MAX', 'Plug-in Hybrid 225 · 17,8 kWh', 225, 'phev', 'e-DCS7', 'FWD', 48050),
        V('1CRESYHFAFC0A020', 'YOU', 'ë-C5 Aircross Electric 210 · 73 kWh', 210, 'ev', 'AT', 'FWD', 45150), V('1CRESYNFAFC0A020', 'PLUS', 'ë-C5 Aircross Electric 210 · 73 kWh', 210, 'ev', 'AT', 'FWD', 47300), V('1CRESYRFAFC0A020', 'MAX', 'ë-C5 Aircross Electric 210 · 73 kWh', 210, 'ev', 'AT', 'FWD', 50650)],
      specs: { len: '4.652 mm', wid: '1.936 mm', hei: '1.688 mm', boot: '565 – 651 L', range: R('până la 520 km (ë-C5 Aircross) · 87 km electric (Plug-in Hybrid), WLTP', 'up to 520 km (ë-C5 Aircross) · 87 km electric (Plug-in Hybrid), WLTP'), battery: '73 kWh (ë) · 17,8 kWh (PHEV)', cons: '5,4 – 5,6 l/100 km (Hybrid)', co2: '121 – 126 g/km (Hybrid)' },
      defColor: '0MM00NX4',
      colors: [C('0MM00NPY', 'Rouge Rubi', '#8f1a1f', 0), C('0MM00NSU', 'Blanc Okenite', '#e9e8e3', 519), C('0MM00NVL', 'Gris Platinium', '#8a8d90', 519), C('0MM00N6L', 'Bleu Eclipse', '#203450', 519), C('0MM00NDP', 'Emerald Blue', '#1f5160', 519), C('0MM00NX4', 'Vert Astoria', '#3c4a44', 519), C('0MM00N9V', 'Noir Perla Nera', '#17181b', 519)],
      gallery: ['romania/models/modele/new-c5-aircross_main-banner_2880x1300.jpg', 'master/b2c/models/new-c5-aircross-2025/opening-of-order/immersive-key-features_lifestyle_01_2880x1300.webp', 'master/b2c/models/new-c5-aircross-2025/opening-of-order/block-key-pilars_lifestyle_01_2000x3000.webp', 'master/b2c/models/new-c5-aircross-2025/opening-of-order/immersive-key-features_lifestyle_002_2880x1300.webp', 'master/b2c/models/new-c5-aircross-2025/opening-of-order/block-key-pilar_design_3_2000x3000.webp'],
      pl: ['Noul_Citroen_C5_Aircross_Lista_de_preturi_11_2026.pdf', 'Noul_Citroen_C5_Aircross_Plug-In_Hybrid_Lista_de_preturi_11_2026.pdf', 'Citroen_e-C5_Aircross_Lista_de_preturi_11_2026.pdf'], url: 'https://www.citroen.ro/modele/c5-aircross-plug-in-hybrid.html' },

    { id: 'c5x', name: 'C5 X', short: 'C5 X', sub: R('Berlina de familie', 'Family saloon'), fuels: ['hybrid'], cats: ['all', 'ev', 'family'], badges: [],
      card: 'romania/noutati/C5X-ICE-576x324.jpg', eng: 'Hybrid 145', pw: '107 kW / 145 CP',
      key: [['de la 41.450 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['545 L', R('portbagaj', 'boot')], ['4.805 mm', R('lungime', 'length')], ['Hybrid', R('automată 6 trepte', '6-speed automatic')]],
      lead: R('C5 X este vârful gamei Citroën: berlină cu siluetă de break și SUV, confort Advanced Comfort și motor Hybrid 145 cu cutie automată.', 'C5 X is the top of the Citroën range: a saloon with estate and SUV cues, Advanced Comfort and a Hybrid 145 with an automatic gearbox.'),
      versions: [V('C5X-P', 'PLUS', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 41450), V('C5X-M', 'MAX', 'Hybrid 145', 145, 'hybrid', 'e-DCS6', 'FWD', 44500)],
      specs: { len: '4.805 mm', boot: '545 L' },
      gallery: ['master/b2c/models/c5-x/l-m/Citroen_C5X_Herobanner_2880_1200.jpg', 'master/b2c/models/c5-x/l-m/Citroen_C5X_Serenite_2880_1531.jpg', 'master/b2c/models/c5-x/l-m/Citroen_C5X_Style_2880_1531.jpg'],
      pl: ['Citroen-C5-X_Lista_de_preturi_05_2026.pdf'], url: 'https://www.citroen.ro/modele/c5x.html' },

    { id: 'berlingo', name: 'Berlingo / ë-Berlingo', short: 'Berlingo', sub: R('Monovolum de familie', 'Family MPV'), fuels: ['diesel', 'ev'], cats: ['all', 'ev', 'family'], badges: [],
      card: NAV + 'new-ë-berlingo---berlingo/bbc-thumbnails/new-Berlingo-ICE-B2C-576x324.png', cardE: NAV + 'new-ë-berlingo---berlingo/bbc-thumbnails/new-eBerlingo-B2C-576x324.png', eng: 'BlueHDi 100/130 · ë 136 CP', pw: '74 – 100 kW / 100 – 136 CP',
      key: [['de la 29.185 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['320 km', R('autonomie ë-Berlingo', 'ë-Berlingo range')], ['5 locuri', R('uși glisante', 'sliding doors')], ['4.410 mm', R('lungime', 'length')]],
      lead: R('Berlingo este monovolumul practic pentru familie: uși laterale glisante, spațiu modular, diesel BlueHDi sau ë-Berlingo 100% electric.', 'Berlingo is the practical family MPV: sliding side doors, modular space, BlueHDi diesel or the fully electric ë-Berlingo.'),
      versions: [V('BVP-P-100', 'PLUS', 'BlueHDi 100', 100, 'diesel', 'M6', 'L1', 29185), V('BVP-M-130', 'MAX', 'BlueHDi 130', 130, 'diesel', 'EAT8', 'L1', 34630), V('EBVP-P', 'PLUS', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'L1', 43560)],
      specs: { len: '4.410 mm', range: R('până la 320 km (ë-Berlingo)', 'up to 320 km (ë-Berlingo)') },
      gallery: ['master/b2c/models/new-ë-berlingo---berlingo/l-m/ËBerlingo-HeroBanner-2880x1152.jpg'],
      pl: ['Citroen_Berlingo-VP_Lista_de_preturi_10_2026.pdf', 'Citroen_e-Berlingo-VP_Lista_de_preturi_10_2026.pdf'], url: 'https://www.citroen.ro/modele/Noul%20Citro%C3%ABn%20Berlingo%20.html' },

    { id: 'spacetourer', name: 'SpaceTourer / ë-SpaceTourer', short: 'SpaceTourer', sub: R('Transport persoane, 7+1 locuri', 'People carrier, 7+1 seats'), fuels: ['diesel', 'ev'], cats: ['all', 'ev', 'family', 'pro'], badges: [],
      card: NAV + 'new-ë-spacetourer---spacetourer/bbc-thumbnails/new-SpaceTourer-ICE-756x324.png', cardE: NAV + 'new-ë-spacetourer---spacetourer/bbc-thumbnails/new-eSpaceTourer-756x324.png', eng: 'BlueHDi 150/180 · ë 136 CP', pw: '100 – 130 kW / 136 – 180 CP',
      key: [['de la 40.100 €', R('preț recomandat cu TVA', 'list price incl. VAT')], ['7+1', R('locuri', 'seats')], ['339 km', R('autonomie ë 75 kWh', 'ë 75 kWh range')], ['5.333 mm', R('lungime XL', 'XL length')]],
      lead: R('SpaceTourer transportă până la 8 persoane în confort: diesel BlueHDi 150 sau 180 CP, sau ë-SpaceTourer electric cu baterie de 50 sau 75 kWh.', 'SpaceTourer carries up to 8 people in comfort: BlueHDi 150 or 180 hp diesel, or the electric ë-SpaceTourer with a 50 or 75 kWh battery.'),
      versions: [V('ST-P-150', 'PLUS', 'BlueHDi 150', 150, 'diesel', 'M6', 'XL', 40100), V('ST-P-180', 'PLUS', 'BlueHDi 180', 180, 'diesel', 'EAT8', 'XL', 43281), V('ST-M-180', 'MAX', 'BlueHDi 180', 180, 'diesel', 'EAT8', 'XL', 49700),
        V('EST-P-50', 'PLUS', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'XL', 54320), V('EST-P-75', 'PLUS', 'ë Electric 136 · 75 kWh', 136, 'ev', 'AT', 'XL', 60850), V('EST-M-50', 'MAX', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'XL', 60850), V('EST-M-75', 'MAX', 'ë Electric 136 · 75 kWh', 136, 'ev', 'AT', 'XL', 67380)],
      specs: { len: '5.333 mm (XL)', range: R('215 km (50 kWh) · 339 km (75 kWh), WLTP', '215 km (50 kWh) · 339 km (75 kWh), WLTP') },
      gallery: ['master/b2c/models/new-ë-spacetourer---spacetourer/l-m/Ëspacetourer-herobanner-2880x1152.jpg'],
      pl: ['Citroen_SPACETOURER_Lista_de_preturi_11_2026.pdf', 'Citroen_%C3%AB-SPACETOURER_Lista_de_preturi_11_2026.pdf'], url: 'https://www.citroen.ro/modele/noul-spacetourer.html' },

    { id: 'berlingo-van', name: 'Berlingo Van / ë-Berlingo Van', short: 'Berlingo Van', sub: R('Utilitar compact', 'Compact van'), fuels: ['petrol', 'diesel', 'ev'], cats: ['all', 'ev', 'pro'], badges: [], pro: true,
      card: 'romania/models/utilitare/berlingo-van_carpicker_2025.png', cardE: 'romania/models/utilitare/e-berlingo-van_carpicker_2025.png', eng: 'PureTech 110 · BlueHDi 100/130 · ë 136 CP', pw: '74 – 100 kW / 100 – 136 CP',
      key: [['de la 21.150 €', R('fără TVA', 'excl. VAT')], ['L1 / L2', R('lungimi', 'lengths')], ['1.000 kg', R('sarcină utilă', 'payload')], ['ë 50 kWh', R('electric', 'electric')]],
      lead: R('Berlingo Van, utilitarul compact pentru oraș și afaceri: lungime L1 sau L2, sarcină utilă de 650 sau 1.000 kg, benzină, diesel sau electric.', 'Berlingo Van, the compact van for city and business: L1 or L2 length, 650 or 1,000 kg payload, petrol, diesel or electric.'),
      versions: [V('BV-L1-P110', 'Club', 'PureTech 110 · L1 650 kg', 110, 'petrol', 'M6', 'L1', net(21150)), V('BV-L1-D100', 'Club', 'BlueHDi 100 · L1 650 kg', 100, 'diesel', 'M6', 'L1', net(21350)), V('BV-L1-D130', 'Club', 'BlueHDi 130 · L1 650 kg', 130, 'diesel', 'M6', 'L1', net(22350)),
        V('BV-L1-D130A', 'Club', 'BlueHDi 130 · L1 1.000 kg', 130, 'diesel', 'EAT8', 'L1', net(24250)), V('BV-L2-D100', 'Club', 'BlueHDi 100 · L2 1.000 kg', 100, 'diesel', 'M6', 'L2', net(22650)), V('BV-L2-D130', 'Club', 'BlueHDi 130 · L2 1.000 kg', 130, 'diesel', 'M6', 'L2', net(23650)),
        V('EBV-L1', 'Club', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'L1', net(31300)), V('EBV-L2', 'Club', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'L2', net(32100))],
      specs: { len: '4.401 mm (L1) · 4.751 mm (L2)' },
      gallery: ['master/b2c/models/new-ë-berlingo---berlingo/l-m/ËBerlingo-HeroBanner-2880x1152.jpg'],
      pl: ['Noul_Berlingo_Van_Lista_de_preturi_10_2026.pdf', 'Noul_e-Berlingo_Van_Lista_de_preturi_10_2026.pdf'], url: 'https://www.citroen.ro/modele/noul-e-berlingo-van.html' },

    { id: 'jumpy', name: 'Jumpy / ë-Jumpy', short: 'Jumpy', sub: R('Furgon mediu', 'Mid-size van'), fuels: ['diesel', 'ev'], cats: ['all', 'ev', 'pro'], badges: [], pro: true,
      card: 'romania/models/utilitare/jumpy_carpicker_2025.png', cardE: 'romania/models/utilitare/e-jumpy_carpicker_2025.png', eng: 'BlueHDi 120/150/180 · ë 136 CP', pw: '88 – 132 kW / 120 – 180 CP',
      key: [['de la 26.650 €', R('fără TVA', 'excl. VAT')], ['L2 / L3', R('lungimi', 'lengths')], ['ë 75 kWh', R('baterie extinsă', 'extended battery')], ['EAT8', R('automată disponibilă', 'automatic available')]],
      lead: R('Jumpy, furgonul mediu Citroën: lungimi L2 și L3, BlueHDi de 120–180 CP cu cutie manuală sau automată și ë-Jumpy electric cu baterie de 50 sau 75 kWh.', 'Jumpy, Citroën\'s mid-size van: L2 and L3 lengths, 120–180 hp BlueHDi with manual or automatic gearbox and the electric ë-Jumpy with a 50 or 75 kWh battery.'),
      versions: [V('JP-L2-120', 'Furgon', 'BlueHDi 120', 120, 'diesel', 'M6', 'L2', net(26650)), V('JP-L2-150', 'Furgon', 'BlueHDi 150', 150, 'diesel', 'M6', 'L2', net(27850)), V('JP-L2-150A', 'Furgon', 'BlueHDi 150', 150, 'diesel', 'EAT8', 'L2', net(29150)), V('JP-L2-180A', 'Furgon', 'BlueHDi 180', 180, 'diesel', 'EAT8', 'L2', net(30850)),
        V('JP-L3-120', 'Furgon', 'BlueHDi 120', 120, 'diesel', 'M6', 'L3', net(27850)), V('JP-L3-180A', 'Furgon', 'BlueHDi 180', 180, 'diesel', 'EAT8', 'L3', net(32050)),
        V('EJP-L2-50', 'Furgon', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'L2', net(35500)), V('EJP-L2-75', 'Furgon', 'ë Electric 136 · 75 kWh', 136, 'ev', 'AT', 'L2', net(41800)), V('EJP-L3-50', 'Furgon', 'ë Electric 136 · 50 kWh', 136, 'ev', 'AT', 'L3', net(36700)), V('EJP-L3-75', 'Furgon', 'ë Electric 136 · 75 kWh', 136, 'ev', 'AT', 'L3', net(43000))],
      specs: {},
      gallery: ['master/b2b/models/new-ë-jumpy-jumpy/l-m/Jumpy-herobanner-2880x1152.jpg', 'master/b2b/models/new-ë-jumpy-jumpy/bbc/jumpy-panel-van.jpg'],
      pl: ['Jumpy_Furgon_Lista_de_preturi_11_2026.pdf', 'e-Jumpy_Furgon_Lista_de_preturi_11_2026.pdf'], url: 'https://www.citroen.ro/modele/noul-citroen-jumpy.html' },

    { id: 'jumper', name: 'Jumper / ë-Jumper', short: 'Jumper', sub: R('Furgon mare, până la 4 t', 'Large van, up to 4 t'), fuels: ['diesel', 'ev'], cats: ['all', 'ev', 'pro'], badges: [], pro: true,
      card: 'romania/models/utilitare/jumper_carpicker_2025.png', cardE: 'romania/models/utilitare/e-jumper_carpicker_2025.png', eng: 'BlueHDi 120/140/180 · ë 270 CP', pw: '88 – 199 kW / 120 – 270 CP',
      key: [['de la 27.050 €', R('fără TVA', 'excl. VAT')], ['L2 – L4', R('lungimi', 'lengths')], ['H1 – H3', R('înălțimi', 'heights')], ['ë 270 CP', R('electric', 'electric')]],
      lead: R('Jumper, furgonul mare Citroën: lungimi L2–L4, înălțimi H1–H3, BlueHDi de 120–180 CP și ë-Jumper electric de 270 CP.', 'Jumper, Citroën\'s large van: L2–L4 lengths, H1–H3 heights, 120–180 hp BlueHDi and the 270 hp electric ë-Jumper.'),
      versions: [V('JM-L2H1-120', 'Furgon 3,0 t', 'BlueHDi 120', 120, 'diesel', 'M6', 'L2H1', net(27050)), V('JM-L2H1-140A', 'Furgon 3,5 t', 'BlueHDi 140', 140, 'diesel', 'AT8', 'L2H1', net(32700)), V('JM-L2H2-140', 'Furgon 3,5 t', 'BlueHDi 140', 140, 'diesel', 'M6', 'L2H2', net(30650)),
        V('JM-L3H2-180A', 'Furgon 3,5 t', 'BlueHDi 180', 180, 'diesel', 'AT8', 'L3H2', net(36100)), V('JM-L4H2-140', 'Furgon 3,5 t Heavy', 'BlueHDi 140', 140, 'diesel', 'M6', 'L4H2', net(33050)), V('JM-L4H3-180A', 'Furgon 3,5 t Heavy', 'BlueHDi 180', 180, 'diesel', 'AT8', 'L4H3', net(38400)),
        V('EJM-L3H2', 'Furgon 3,5 t', 'ë Electric 270 · 110 kWh', 270, 'ev', 'AT', 'L3H2', net(49650)), V('EJM-L4H2', 'Furgon 4,0 t', 'ë Electric 270 · 95 kWh', 270, 'ev', 'AT', 'L4H2', net(51750))],
      specs: {},
      gallery: ['master/b2b/models/new-ë-jumper-jumper/l-m/Jumper-herobanner-2880x1152.jpg', 'master/b2b/models/new-ë-jumper-jumper/bcc/jumper-panel-van.jpg', 'master/b2b/models/converted-cars/l-m/Citroen_Vehicules_Transformes_Herobanner_2880_1620.jpg'],
      pl: ['Jumper_Furgon_Lista_de_preturi_08_2026.pdf', 'e-Jumper_Furgon_Lista_de_preturi_05_2026.pdf'], url: 'https://www.citroen.ro/modele/noul-citroen-jumper.html' }
  ];

  /* equipment per trim (Citroën România price lists) */
  SP.TRIMS = {
    c3: [['YOU', R('Aer condiționat manual · cruise control și limitator · jante oțel 16" · faruri halogen · 6 airbaguri · ABS, asistență la frânare de urgență și pornire în rampă', 'Manual A/C · cruise control and limiter · 16" steel wheels · halogen headlights · 6 airbags · ABS, emergency brake assist and hill assist')],
      ['PLUS', R('În plus: ecran tactil 10,25" cu CarPlay / Android Auto wireless și DAB · suspensie Advanced Comfort · jante 17" · scaune Advanced Comfort · faruri ECO LED · oglinzi încălzite, rabatabile electric', 'Adds: 10.25" touchscreen with wireless CarPlay / Android Auto and DAB · Advanced Comfort suspension · 17" wheels · Advanced Comfort seats · ECO LED headlights · heated, power-folding mirrors')],
      ['MAX', R('În plus: climatizare automată · senzori parcare spate și cameră · navigație 10,25" · încărcare wireless · jante aliaj 17" diamantate · geamuri electrice spate', 'Adds: automatic climate · rear sensors and camera · 10.25" navigation · wireless charging · 17" diamond-cut alloys · rear power windows')]],
    'c3-aircross': [['YOU', R('Aer condiționat manual · ABS, ESP, Hill Assist · 6 airbaguri · suspensie Advanced Comfort', 'Manual A/C · ABS, ESP, Hill Assist · 6 airbags · Advanced Comfort suspension')],
      ['PLUS', R('În plus: climatizare automată · ecran tactil 10,25" cu CarPlay / Android Auto · senzori față-spate cu cameră · jante 17"', 'Adds: automatic climate · 10.25" touchscreen with CarPlay / Android Auto · front & rear sensors with camera · 17" wheels')],
      ['MAX', R('În plus: navigație 3D · acces fără cheie · jante aliaj 17"', 'Adds: 3D navigation · keyless entry · 17" alloys')]],
    c4: [['YOU', R('Climatizare automată · frânare de urgență avansată și asistent de bandă · ecran 10" cu DAB · faruri LED', 'Automatic climate · advanced emergency braking and lane assist · 10" screen with DAB · LED headlights')],
      ['PLUS', R('În plus: scaune față încălzite · cameră marșarier · jante 18" · oglinzi încălzite rabatabile electric', 'Adds: heated front seats · reversing camera · 18" wheels · heated power-folding mirrors')],
      ['COLLECTION', R('În plus: navigație 3D · instrumentar digital 7" · acces și pornire fără cheie · jante aliaj 18" Full Black', 'Adds: 3D navigation · 7" digital cluster · keyless entry and start · 18" Full Black alloys')],
      ['MAX', R('În plus: Drive Assist cu cruise adaptiv Stop & Go · cameră Visio Park și senzori 360° · oglindă electrocromă · jante diamantate 18"', 'Adds: Drive Assist with Stop & Go adaptive cruise · Visio Park camera and 360° sensors · auto-dimming mirror · 18" diamond-cut wheels')]],
    'c5-aircross': [['YOU', R('Climatizare automată bizonă · Safety Plus (cruise adaptiv, menținere bandă, frânare de urgență) · ecran tactil 13" cu DAB · jante aliaj 18" · faruri ECO LED · senzori parcare spate', 'Dual-zone automatic climate · Safety Plus (adaptive cruise, lane keeping, emergency braking) · 13" touchscreen with DAB · 18" alloys · ECO LED headlights · rear parking sensors')],
      ['PLUS', R('În plus: navigație 3D pe ecran de 13" · City Camera Pack (senzori față-spate, cameră 180°) · jante 19" · acces și pornire fără cheie · oglindă electrocromă', 'Adds: 3D navigation on the 13" screen · City Camera Pack (front & rear sensors, 180° camera) · 19" wheels · keyless entry and start · auto-dimming mirror')],
      ['MAX', R('În plus: scaune față încălzite · Drive Assist 2.0 · hayon electric hands-free · cameră 360° · head-up display · faruri Matrix LED · încărcare wireless · volan încălzit', 'Adds: heated front seats · Drive Assist 2.0 · hands-free power tailgate · 360° camera · head-up display · Matrix LED headlights · wireless charging · heated steering wheel')]]
  };

  /* configurator options (Citroën România price lists 11/2026). trims = available trims; fuels = only for these fuels; grp = mutually exclusive group; not = incompatible ids */
  const O = (id, name, price, trims, extra) => Object.assign({ id, name, price, trims }, extra || {});
  SP.OPTIONS = {
    c3: [O('LV02', R('Kit reparație temporară pneuri', 'Temporary tyre repair kit'), 16, ['YOU', 'PLUS', 'MAX']),
      O('RE24', R('Pachet Techno: climatizare automată', 'Techno pack: automatic climate'), 566, ['PLUS'], { not: ['NHFX'] }),
      O('ZJA7', R('Pack 8: navigație', 'Pack 8: navigation'), 708, ['PLUS']),
      O('NHFX', R('Tapițerie textilă Advanced Comfort (MAX)', 'Advanced Comfort fabric upholstery (MAX)'), 1211, ['PLUS'], { not: ['RE24'] }),
      O('JD05', R('Pavilion Opal White', 'Opal White roof'), 157, ['PLUS'], { grp: 'roof' }),
      O('JD20', R('Pavilion Perla Nera Black', 'Perla Nera Black roof'), 157, ['PLUS'], { grp: 'roof' }),
      O('WF25', R('Pachet Iarnă: parbriz, scaune față și volan încălzite, proiectoare ceață', 'Winter pack: heated windscreen, front seats and wheel, fog lights'), 771, ['MAX']),
      O('LZ04', R('Încărcător de bord trifazat 11 kW', '11 kW three-phase on-board charger'), 440, ['YOU', 'PLUS', 'MAX'], { fuels: ['ev'] })],
    'c5-aircross': [O('LV03', R('Kit reparație temporară pneuri', 'Temporary tyre repair kit'), 24, ['YOU', 'PLUS', 'MAX']),
      O('NM01', R('Plasă de reținere bagaje', 'Luggage net'), 110, ['YOU', 'PLUS', 'MAX']),
      O('1G32', R('Senzori parcare față-spate + cameră 180°', 'Front & rear sensors + 180° camera'), 220, ['YOU']),
      O('I301', R('Volan încălzit', 'Heated steering wheel'), 157, ['YOU', 'PLUS']),
      O('LW02', R('Parbriz încălzit', 'Heated windscreen'), 236, ['PLUS', 'MAX'], { priceBy: { YOU: 315 }, trims: ['YOU', 'PLUS', 'MAX'] }),
      O('E301', R('Încărcare wireless smartphone', 'Wireless phone charger'), 157, ['PLUS']),
      O('ZBA1', R('Grip Control + anvelope all season', 'Grip Control + all-season tyres'), 236, ['PLUS', 'MAX']),
      O('WD59', R('Hayon electric hands-free', 'Hands-free power tailgate'), 393, ['PLUS']),
      O('JD20', R('Plafon negru Perla Nera (bi-ton)', 'Perla Nera black roof (two-tone)'), 393, ['PLUS', 'MAX']),
      O('J64A', R('Techno Pack 1', 'Techno Pack 1'), 1148, ['PLUS']),
      O('J64D', R('Plafon panoramic + oglindă electrocromă', 'Panoramic roof + auto-dimming mirror'), 1337, ['PLUS', 'MAX']),
      O('J6KK', R('Winter Pack 12', 'Winter Pack 12'), 220, ['MAX'], { grp: 'winter' }),
      O('J63W', R('Winter Pack 7', 'Winter Pack 7'), 472, ['MAX'], { grp: 'winter', priceBy: { ev: 425 } }),
      O('2501', R('Pompă de căldură', 'Heat pump'), 944, ['YOU', 'PLUS', 'MAX'], { fuels: ['ev'] }),
      O('LZ08', R('Încărcător de bord 22 kW', '22 kW on-board charger'), 865, ['YOU', 'PLUS', 'MAX'], { fuels: ['ev'] }),
      O('AQ05', R('Cârlig de remorcare detașabil', 'Detachable towbar'), 865, ['YOU', 'PLUS', 'MAX'], { fuels: ['ev'] })]
  };
  SP.optPrice = (o, v) => (o.priceBy && (o.priceBy[v.trim] || o.priceBy[v.fuel])) || o.price;

  SP.MODELS.forEach(m => {
    m.from = Math.min.apply(null, m.versions.map(v => v.price));
    m.promoFrom = m.from; m.maxSave = 0;
    m.colors = m.colors || [];
    m.colorOf = code => m.colors.find(c => c.code === code) || m.colors[0];
    m.colorsFor = trim => m.colors.filter(c => !c.only || c.only.includes(trim));
    m.surFor = c => c ? c.sur : 0;
    /* colour images: 3D render of the model's reference version in each colour */
    m.colors.forEach(c => { c.img = SP.v3d(m.lcdv, c.code, '001', 1280); });
    m.versions.forEach(v => { v.save = 0; v.net = Math.round(v.price / 1.21); });
    m.pricelists = (m.pl || []).map(SP.PL);
    m.banner = m.gallery[0];
  });
  SP.model = id => SP.MODELS.find(m => m.id === id);

  /* home banners (citroen.ro creatives) */
  SP.BANNERS = {
    main: { d: 'romania/models/modele/new-c5-aircross_main-banner_2880x1300.jpg', m: 'romania/models/modele/new-c5-aircross_main-banner_2880x1300.jpg' },
    c3: { d: 'master/b2c/models/new-c3-2023/ice/l-m/HERO_BANNER_C3ICE_2880x1152.jpg', m: 'master/b2c/models/new-c3-2023/ice/s/HERO_BANNER_ICE_750x936.jpg' },
    pro: { d: 'master/b2b/models/new-vu-range/l-m/New-LCV-range-noAMI-2880x1152.jpg', m: 'master/b2b/models/new-vu-range/l-m/New-LCV-range-noAMI-750x936.jpg' },
    warranty: 'master/b2c/models/new-c5-aircross-2025/opening-of-order/immersive-key-features_lifestyle_002_2880x1300.webp',
    finance: 'master/b2c/models/c5-x/l-m/Citroen_C5X_Serenite_2880_1531.jpg',
    contact: 'master/b2c/models/new-c3-aircross/l-m/citroenadvancedcomfort.jpg',
    connect: 'master/b2c/models/new-c3-aircross/l-m/alwaysconnected.jpg'
  };

  /* ---------- Unsplash photos (trade-ins of other brands) ---------- */
  SP.PHOTOS = {
    golf1: ['1572811298797-9eecadf6cb24', 'SuD4h8Gpgok', 'Martin Katler'], golf2: ['1767949374162-5cbb31071b8f', 'jLba2Etjp8A', 'Autotrader UK'],
    oct1: ['1673822317390-d1a8c15ad656', 'gJb_AJhONsE', 'Simon Rathgeb'], oct2: ['1727790621990-3a7a2623d564', 'Px_kPSV8rdY', 'Olivie Zemanova'],
    rav1: ['1617469767053-d3b523a0b982', 'PmSwFm4Lw1c', 'Krish Parmar'], rav2: ['1785900103411-b846f4a7d65e', 'dQiQlArXn-o', 'Zion C'],
    x1a: ['1680298255666-6071fc905870', 'SaY7EkQMuBo', 'serjan midili'], x1b: ['1677517859847-0e750bfd13a9', 'lQPo7cXxQF0', 'Amine Ben Mohamed']
  };
  SP.ph = (k, w, h) => SP.PHOTOS[k] ? 'https://images.unsplash.com/photo-' + SP.PHOTOS[k][0] + '?auto=format&fit=crop&q=72&w=' + w + (h ? '&h=' + h : '') : '';

  /* ---------- stock (new: model + version code + colour; used: photos or the Citroën image of the same model) ---------- */
  const N = (id, mid, code, color, loc, adv, extra) => Object.assign({ id, cond: 'new', mid, code, color, loc, adv, year: 2026, km: 0, status: 'avail' }, extra || {});
  const U = (id, brand, title, version, year, km, fuel, gb, hp, price, photos, color, loc, extra) => Object.assign({ id, cond: 'used', brand, title, version, year, km, fuel, gb, hp, price, photos, color, loc, adv: 'mp', status: 'avail' }, extra || {});
  SP.STOCK = [
    N('CT-26101', 'c3', '1CSCA5HJLKC0A040', '0MP00N7A', 'pantelimon', 'ri', { featured: 1, disc: 500 }),
    N('CT-26102', 'c3', '1CSCA5NJGWC0A040', '0MM00NVH', 'brasov', 'ab', { featured: 1 }),
    N('CT-26103', 'c3', '1CSCA5HZFFC0A040', '0MM00NRD', 'pantelimon', 'cs', { demo: 1, km: 2100, disc: 1500 }),
    N('CT-26104', 'c3', '1CSCA5EJLKC0A040', '0MP00NWP', 'otopeni', 'ri', { status: 'incoming', eta: '2026-11-20' }),
    N('CT-26105', 'c5-aircross', '1CRESYNJH7C0A020', '0MM00NX4', 'pantelimon', 'cs', { featured: 1, disc: 800 }),
    N('CT-26106', 'c5-aircross', '1CRESYRQ97C0A020', '0MM00N6L', 'brasov', 'ab'),
    N('CT-26107', 'c5-aircross', '1CRESYNFAFC0A020', '0MM00NSU', 'pantelimon', 'cs', { status: 'reserved' }),
    N('CT-26108', 'c5-aircross', '1CRESYHJH7C0A020', '0MM00NPY', 'otopeni', 'ri', { demo: 1, km: 3400, disc: 2000 }),
    N('CT-26109', 'c3-aircross', 'C3A-P-H145', null, 'brasov', 'ab', { featured: 1 }),
    N('CT-26110', 'c4', 'C4-P-H145', null, 'pantelimon', 'ri'),
    N('CT-26111', 'c4x', 'EC4X-P', null, 'pantelimon', 'cs', { disc: 1000 }),
    N('CT-26112', 'berlingo', 'BVP-P-100', null, 'otopeni', 'ia'),
    N('CT-26113', 'berlingo-van', 'BV-L1-D130', null, 'otopeni', 'ia', { featured: 1 }),
    N('CT-26114', 'jumpy', 'EJP-L2-50', null, 'otopeni', 'ia'),
    N('CT-26115', 'jumper', 'JM-L3H2-180A', null, 'otopeni', 'ia', { status: 'incoming', eta: '2026-11-28' }),
    U('CH-24301', 'Citroën', 'Citroën C5 Aircross', 'Shine 1.5 BlueHDi 130 EAT8', 2022, 48200, 'diesel', 'EAT8', 130, 22900, null, { ro: 'Gri', en: 'Grey' }, 'pantelimon', { cutM: 'c5-aircross', featured: 1, cert: 1 }),
    U('CH-24302', 'Citroën', 'Citroën ë-C4', 'Shine 136 CP 50 kWh', 2022, 31800, 'ev', 'AT', 136, 19900, null, { ro: 'Albastru', en: 'Blue' }, 'brasov', { cutM: 'c4', cutE: 1, cert: 1 }),
    U('SH-24304', 'Volkswagen', 'Volkswagen Golf', 'Life 1.5 eTSI', 2021, 64300, 'hybrid', 'DSG7', 150, 18400, ['golf1', 'golf2'], { ro: 'Alb', en: 'White' }, 'pantelimon', { trade: 1 }),
    U('SH-24305', 'Toyota', 'Toyota RAV4', 'Style 2.5 Hybrid AWD-i', 2021, 73900, 'hybrid', 'e-CVT', 222, 27800, ['rav1', 'rav2'], { ro: 'Argintiu', en: 'Silver' }, 'otopeni', { trade: 1, status: 'reserved' }),
    U('SH-24306', 'Skoda', 'Škoda Octavia Combi', 'Style 2.0 TDI', 2020, 118000, 'diesel', 'DSG7', 150, 15900, ['oct1', 'oct2'], { ro: 'Argintiu', en: 'Silver' }, 'brasov', { trade: 1 }),
    U('SH-24307', 'BMW', 'BMW X1', 'sDrive18i xLine', 2020, 69500, 'petrol', 'DCT7', 136, 21900, ['x1a', 'x1b'], { ro: 'Argintiu', en: 'Silver' }, 'pantelimon', { trade: 1 })
  ];
  SP.STOCK.forEach((v, i) => {
    v.vin = (v.cond === 'new' || v.brand === 'Citroën' ? 'VR7' : 'WVW') + ['AA', 'JY', 'EZ', 'YB', 'MX'][i % 5] + String(1000000 + i * 7919).slice(1) + String(100000 + i * 3571).slice(-6);
    if (v.cond === 'new') {
      const m = SP.model(v.mid), ver = m.versions.find(x => x.code === v.code), c = v.color ? m.colorOf(v.color) : null, sur = c ? c.sur : 0;
      v.model = m; v.ver = ver; v.title = 'Citroën ' + m.short + (ver.fuel === 'ev' && !/^ë/.test(m.short) ? ' (ë)' : ''); v.version = ver.trim + ' · ' + ver.eng + ' · ' + ver.gb;
      v.fuel = ver.fuel; v.gb = ver.gb; v.hp = ver.hp; v.list = ver.price + sur; v.price = v.list - (v.disc || 0); v.brand = 'Citroën';
      v.colorName = c ? c.name : R('Culoare standard', 'Standard colour'); v.hex = c ? c.hex : '#ccc';
      v.img = c ? SP.v3d(ver.code.length > 10 ? ver.code : m.lcdv, c.code, '001', 1280) : (ver.fuel === 'ev' && m.cardE ? m.cardE : m.card);
      v.views = c ? ['002', '003'].map(w => SP.v3d(ver.code.length > 10 ? ver.code : m.lcdv, c.code, w, 1280)) : [];
    } else { v.colorName = v.color; if (v.cutM) { v.model = SP.model(v.cutM); v.img = v.cutE && v.model.cardE ? v.model.cardE : v.model.card; v.views = []; } }
  });

  /* ---------- service, owner and finance offers ---------- */
  SP.SERVICE_OFFERS = [
    { id: 'rev', badge: R('Revizie', 'Service'), title: R('Revizie periodică la preț fix', 'Fixed-price periodic service'), lead: R('Piese originale Citroën și verificare completă, cu prețul comunicat înainte de programare.', 'Genuine Citroën parts and a full check, with the price confirmed before you book.'), img: 'master/b2c/models/new-c3-2023/ice/s/FEATURES_SAFETY_09_750x642.jpg' },
    { id: 'warranty', badge: R('Garanție', 'Warranty'), title: R('Garanție extinsă', 'Extended warranty'), lead: R('Extinde garanția producătorului și păstrează valoarea mașinii, cu service în rețeaua autorizată Citroën.', 'Extend the manufacturer warranty and keep your car\'s value, with service in the authorised Citroën network.'), img: 'master/b2c/models/new-c3-aircross/l-m/drivesafely.jpg' },
    { id: 'recall', badge: R('Rechemare', 'Recall'), title: R('Verificare campanii de rechemare', 'Recall campaign check'), lead: R('Introdu VIN-ul la programare și verificăm dacă mașina ta are o campanie activă — intervenția este gratuită.', 'Enter your VIN when booking and we check for any open campaign — the work is free of charge.'), img: 'master/b2c/models/new-c3-aircross/l-m/alwaysconnected.jpg' },
    { id: 'tyres', badge: R('Iarnă', 'Winter'), title: R('Pachet anvelope de iarnă', 'Winter tyre package'), lead: R('Anvelope și jante aprobate, cu montaj, echilibrare și hotel de anvelope.', 'Approved tyres and wheels, with fitting, balancing and tyre storage.'), img: 'master/b2c/models/new-c3-aircross/l-m/czen.jpg' },
    { id: 'body', badge: R('Daune', 'Claims'), title: R('Centru de daune', 'Body & claims centre'), lead: R('Constatare, reparație în vopsitoria proprie și relația cu asigurătorul, într-un singur loc.', 'Inspection, repair in our own body shop and insurer liaison in one place.'), img: 'master/b2c/models/c5-x/l-m/Citroen_C5X_Style_2880_1531.jpg' },
    { id: 'buyback', badge: R('Buy-back', 'Buy-back'), title: R('Evaluare gratuită pentru buy-back', 'Free buy-back valuation'), lead: R('Aduci mașina actuală, de orice marcă — o evaluăm pe loc și o scădem din prețul Citroën-ului nou.', 'Bring your current car, any brand — we value it on the spot and deduct it from your new Citroën.'), img: 'master/b2c/models/new-c3-2023/s/color_clip_750x642.jpg' }
  ];
  SP.FIN = [
    { id: 'fin', badge: R('Finanțare', 'Finance'), title: R('Leasing și credit auto', 'Leasing and car finance'), lead: R('Credit auto și leasing pentru persoane fizice și juridice, prin partenerii dealerului, cu ofertă în 24 de ore.', 'Car loans and leasing for private and business customers, through the dealer\'s partners, with an offer within 24 hours.'), img: 'master/b2c/models/c5-x/l-m/Citroen_C5X_Serenite_2880_1531.jpg' },
    { id: 'ev', badge: R('Electric', 'Electric'), title: R('Trecerea la electric', 'Going electric'), lead: R('ë-C3, ë-C3 Aircross, ë-C4, ë-C5 Aircross și utilitarele ë: consultanță pentru încărcare acasă și la firmă.', 'ë-C3, ë-C3 Aircross, ë-C4, ë-C5 Aircross and the ë vans: advice on charging at home and at work.'), img: 'master/b2c/models/new-c5-aircross-2025/opening-of-order/block-key-pilars_lifestyle_02_2000x3000.webp' },
    { id: 'pro', badge: R('Companii', 'Business'), title: R('Flote și utilitare', 'Fleets and vans'), lead: R('Berlingo Van, Jumpy și Jumper cu prețuri fără TVA, leasing operațional și service cu linie rapidă la Otopeni.', 'Berlingo Van, Jumpy and Jumper with net prices, operating lease and a fast-lane service in Otopeni.'), img: 'master/b2b/models/new-ë-jumper-jumper/l-m/Jumper-herobanner-2880x1152.jpg' }
  ];
})(window.SP);
