/* =====================================================================
   CORE — helpers, header, footer, shared components (CakePHP elements).
   ===================================================================== */
(function () {
  const SP = window.SP;
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  SP.store = store;
  const qs = new URLSearchParams(location.search);
  SP.lang = (qs.get('lang') || store.get('ct.lang') || 'ro') === 'en' ? 'en' : 'ro';
  SP.setLang = l => { SP.lang = l; store.set('ct.lang', l); SP.render(); };
  SP.t = k => { const v = SP.I18N[k]; return v ? v[SP.lang === 'en' ? 1 : 0] : k; };
  SP.L = v => (v && typeof v === 'object' && !Array.isArray(v) && ('ro' in v)) ? (v[SP.lang] || v.ro) : v;
  SP.param = k => new URLSearchParams(location.search).get(k);
  SP.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  SP.nf = n => Number(n).toLocaleString(SP.lang === 'en' ? 'en-GB' : 'de-DE', { maximumFractionDigits: 0 });
  SP.eur = n => n == null ? '—' : (SP.lang === 'en' ? '€' + SP.nf(n) : SP.nf(n) + ' €');
  SP.date = (iso, o) => new Date(iso + 'T12:00:00').toLocaleDateString(SP.lang === 'en' ? 'en-GB' : 'ro-RO', o || { day: 'numeric', month: 'long', year: 'numeric' });
  SP.dshort = iso => SP.date(iso, { day: '2-digit', month: '2-digit', year: 'numeric' });
  SP.ref = p => p + '-' + String(Math.floor(1000 + Math.random() * 8999));
  SP.monthly = (price, down, n, apr) => { const P = price * (1 - down), r = apr / 12; return P * r / (1 - Math.pow(1 + r, -n)); };
  SP.loc = id => SP.LOCATIONS.find(l => l.id === id);
  SP.car = id => SP.STOCK.find(v => v.id === id);
  SP.initials = n => n.split(' ').map(x => x[0]).join('').slice(0, 2);
  const t = SP.t, L = SP.L, esc = SP.esc;

  const P = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', arrowL: '<path d="M19 12H5M11 18l-6-6 6-6"/>', ext: '<path d="M7 17 17 7M9 7h8v8"/>', down: '<path d="m6 9 6 6 6-6"/>', menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    car: '<path d="M5 17h14M3 17v-4l2.2-5.2A2 2 0 0 1 7 6.5h10a2 2 0 0 1 1.8 1.3L21 13v4"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>', wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M4.2 16.5l5.6-3.2M19.8 16.5l-5.6-3.2"/>',
    pct: '<circle cx="12" cy="12" r="9"/><path d="m8.5 15.5 7-7"/><circle cx="9" cy="9" r="1.2"/><circle cx="15" cy="15" r="1.2"/>', wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>', search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    doc: '<path d="M14 3H6v18h12V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>', calendar: '<rect x="3" y="4" width="18" height="17"/><path d="M8 2v4M16 2v4M3 10h18"/>',
    camera: '<path d="M14.5 4h-5L7 7H4v13h16V7h-3z"/><circle cx="12" cy="13" r="3"/>', bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>', box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>', swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>'
  };
  SP.icon = (n, c) => '<svg class="ic ' + (c || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
  const I = SP.icon;

  /* ---------- images ---------- */
  SP.img = (path, w, alt, cls, lazy) => '<img class="' + (cls || '') + '" src="' + SP.cf(path) + '" alt="' + esc(alt || '') + '"' + (lazy === false ? '' : ' loading="lazy"') + ' onerror="this.classList.add(\'is-broken\')">';
  SP.uimg = (k, w, h, alt, cls) => SP.PHOTOS[k] ? '<img class="' + (cls || '') + '" src="' + SP.ph(k, w, h) + '" alt="' + esc(alt || '') + '" loading="lazy" onerror="this.classList.add(\'is-broken\')">' : '';
  SP.credit = k => SP.PHOTOS[k] ? (SP.lang === 'en' ? 'Photo: ' : 'Foto: ') + '<a href="https://unsplash.com/photos/' + SP.PHOTOS[k][1] + '" target="_blank" rel="noopener">' + esc(SP.PHOTOS[k][2]) + '</a> / Unsplash' : '';
  SP.carStage = (v, view, w) => v.img ? '<div class="stage stage--cut">' + SP.img(v.img, w || 700, v.title) + '</div>' : '<div class="stage stage--photo">' + SP.uimg(v.photos[0], w || 800, Math.round((w || 800) * .66), v.title) + '</div>';

  /* ---------- wordmark (text, no official logo file) ---------- */
  SP.wordmark = () => '<span class="wm"><span class="wm__t">CITROËN</span><span class="wm__s">SALES PARTNER AUTO · ' + (SP.lang === 'en' ? 'authorised dealer' : 'dealer autorizat') + '</span></span>';

  /* ---------- header (citroen.ro layout: menu pill + Vehicule / Utilitare left, brand centred, contact links right) ---------- */
  const NAV = [['models', 'modele.html'], ['pro', 'modele.html?cat=pro'], ['config', 'configurator.html'], ['offers', 'oferte.html'], ['stock', 'stoc.html'], ['service', 'service.html'], ['locations', 'locatii.html']];
  const ACT = { home: '', models: 'models', model: 'models', config: 'config', offers: 'offers', stock: 'stock', vehicle: 'stock', service: 'service', booking: 'service', locations: 'locations', location: 'locations' };
  const langSw = () => '<span class="lang"><button type="button" data-lang="ro" class="' + (SP.lang === 'ro' ? 'is-on' : '') + '">RO</button><button type="button" data-lang="en" class="' + (SP.lang === 'en' ? 'is-on' : '') + '">EN</button></span>';
  SP.header = page => {
    const a = ACT[page] === 'models' && SP.param('cat') === 'pro' ? 'pro' : ACT[page];
    const util = '<a href="locatii.html">' + I('pin') + t('nav.dealer') + '</a><a href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '">' + I('phone') + SP.DEALER.phone + '</a>' + langSw();
    return '<div class="gbar"><div class="wrap gbar__in"><a href="' + SP.DEALER.group + '">' + I('arrowL') + t('nav.group') + '</a><span>' + t('nav.groupT') + '</span></div></div>' +
      '<header class="hdr" id="hdr"><div class="wrap hdr__in"><div class="hdr__l"><button class="burger" type="button" aria-label="' + t('nav.menu') + '" aria-expanded="false" data-burger>' + I('menu') + '<span>' + t('nav.menu').toUpperCase() + '</span></button>' +
      '<nav class="nav" aria-label="Main">' + NAV.slice(0, 2).map(n => '<a href="' + n[1] + '"' + (a === n[0] ? ' class="is-on" aria-current="page"' : '') + '>' + t('nav.' + n[0]) + '</a>').join('') + '</nav></div>' +
      '<a class="hdr__brand" href="index.html" aria-label="Citroën · Sales Partner Auto">' + SP.wordmark() + '</a>' +
      '<div class="hdr__r"><a class="hdr__c" href="configurator.html">' + I('sliders') + t('nav.config') + '</a><a class="hdr__c" href="locatii.html">' + I('pin') + t('nav.dealer') + '</a>' + langSw() + '</div></div>' +
      '<div class="mnav" id="mnav" hidden><div class="wrap">' + NAV.map(n => '<a href="' + n[1] + '"' + (a === n[0] ? ' class="is-on"' : '') + '>' + t('nav.' + n[0]) + '</a>').join('') +
      '<a href="programare.html">' + t('nav.book') + '</a><div class="mnav__u">' + util + '</div></div></div></header>';
  };
  SP.fab = () => '<nav class="fab" aria-label="Quick actions"><button type="button" data-offer-any>' + I('pct') + '<span>' + t('fab.offer') + '</span></button><a href="configurator.html">' + I('sliders') + '<span>' + t('nav.config') + '</span></a><a href="programare.html?tip=td">' + I('wheel') + '<span>' + t('fab.td') + '</span></a>' +
    '<a href="' + SP.PRICELISTS + '" target="_blank" rel="noopener">' + I('doc') + '<span>' + t('fab.prices') + '</span></a><a href="programare.html?tip=svc">' + I('wrench') + '<span>' + t('fab.svc') + '</span></a></nav>';

  /* ---------- footer ---------- */
  SP.footer = () => {
    const col = (h, l) => '<div class="fcol"><h4>' + h + '</h4><ul>' + l.map(x => '<li><a href="' + x[1] + '"' + (x[2] || '') + '>' + x[0] + '</a></li>').join('') + '</ul></div>';
    return '<footer class="ftr"><div class="wrap"><div class="ftr__grid"><div class="fcol fcol--brand">' + SP.wordmark() + '<p>' + t('ft.about') + '</p><a class="ulink ulink--sm ulink--w" href="' + SP.DEALER.group + '">' + t('nav.group') + '</a></div>' +
      col(t('ft.sales'), [[t('nav.models'), 'modele.html'], [t('nav.pro'), 'modele.html?cat=pro'], [t('nav.config'), 'configurator.html'], [t('nav.offers'), 'oferte.html'], [t('s.new'), 'stoc.html?cond=new'], [t('s.used'), 'stoc.html?cond=used'], [t('nav.td'), 'programare.html?tip=td'], [t('nav.brochures'), SP.PRICELISTS, ' target="_blank" rel="noopener"']]) +
      col(t('ft.owners'), [[t('nav.service'), 'service.html'], [t('nav.book'), 'programare.html?tip=svc'], [t('b.dmg'), 'programare.html?tip=dmg'], [t('b.bb'), 'programare.html?tip=bb'], [t('nav.locations'), 'locatii.html']]) +
      '<div class="fcol"><h4>' + t('ft.nl') + '</h4><p>' + t('ft.nlP') + '</p><form class="nl" data-nl novalidate><label class="sr" for="nl">Email</label><input id="nl" type="email" placeholder="' + t('ft.nlPh') + '"><button type="submit">' + t('f.send') + '</button></form></div></div>' +
      '<div class="ftr__loc">' + SP.LOCATIONS.map(l => '<a href="locatie.html?id=' + l.id + '"><strong>' + l.name + '</strong><span>' + l.address + '</span><span>' + l.phone + '</span></a>').join('') + '<p class="ftr__imp">' + t('ft.importer') + ' · <a href="' + SP.OFFICIAL + '" target="_blank" rel="noopener">citroen.ro</a></p></div>' +
      '<div class="ftr__bot"><p>© 2026 ' + SP.DEALER.legal.company + ' · ' + SP.DEALER.legal.reg + ' · ' + SP.DEALER.legal.cui + '</p><p class="ftr__links"><a href="legal.html?doc=termeni">' + t('ft.terms') + '</a><a href="legal.html?doc=confidentialitate">' + t('ft.privacy') + '</a><a href="legal.html?doc=cookies">' + t('ft.cookies') + '</a>' +
      '<a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener">ANPC SAL</a><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">SOL</a></p></div><p class="ftr__demo">' + t('ft.demo') + '</p></div></footer>';
  };

  /* ---------- shared components ---------- */
  SP.phead = (eyebrow, title, sub, extra) => '<section class="phead"><div class="wrap"><p class="eyebrow">' + eyebrow + '</p><h1 class="h1">' + title + '</h1>' + (sub ? '<p class="phead__sub">' + sub + '</p>' : '') + (extra || '') + '</div></section>';
  SP.shead = (title, eyebrow, link, center) => '<div class="shead' + (center ? ' shead--c' : '') + '"><div>' + (eyebrow ? '<p class="eyebrow">' + eyebrow + '</p>' : '') + '<h2 class="h2">' + title + '</h2></div>' + (link ? '<a class="ulink" href="' + link[1] + '">' + link[0] + '</a>' : '') + '</div>';
  SP.fuelTags = fs => '<span class="ftags">' + fs.map(f => '<span>' + L(SP.FUEL[f]) + '</span>').join('') + '</span>';
  SP.statusTxt = v => v.status === 'incoming' ? t('st.incoming') + ' ' + SP.date(v.eta, { day: 'numeric', month: 'short' }) : v.last ? t('st.last') : t('st.' + v.status);
  SP.condTag = v => '<span class="ctag' + (v.cond === 'new' ? ' ctag--new' : '') + '">' + (v.cond === 'new' ? (v.demo ? t('c.demo') : t('c.new')) : (v.cert ? t('c.cert') : t('c.used'))) + '</span>';
  SP.stTag = v => v.status === 'avail' && !v.last ? '' : '<span class="stag stag--' + (v.last ? 'last' : v.status) + '">' + SP.statusTxt(v) + '</span>';
  SP.modelCard = m => '<article class="mcard"><a class="mcard__img" href="model.html?m=' + m.id + '">' + (m.badges.length ? '<span class="mbadges">' + m.badges.map(b => '<span>' + L(b) + '</span>').join('') + '</span>' : '') + SP.img(m.card, 640, m.name) + '</a>' +
    '<div class="mcard__b"><h3><a href="model.html?m=' + m.id + '">' + m.name + '</a></h3><p class="mcard__sub">' + L(m.sub) + '</p>' + SP.fuelTags(m.fuels) +
    '<p class="mcard__p"><span class="camp">' + t('c.from') + ' <strong>' + SP.eur(m.from) + '</strong></span><span>' + t('m.rrp') + ' · ' + t('c.vat') + (m.pro ? ' · ' + SP.eur(Math.round(m.from / 1.21)) + ' ' + t('c.noVat') : '') + '</span></p>' +
    '<div class="mcard__cta"><a class="btn btn--navy btn--sm" href="model.html?m=' + m.id + '">' + t('c.discover') + '</a>' + (m.cfg ? '<a class="ulink ulink--sm" href="configurator.html?m=' + m.id + '">' + t('c.configure') + '</a>' : '<button type="button" class="ulink ulink--sm" data-offer="' + m.id + '">' + t('c.reqOffer') + '</button>') + '</div></div></article>';
  SP.locCard = l => '<a class="lcard" href="locatie.html?id=' + l.id + '"><span class="lcard__img">' + SP.img(l.img, 700, l.name) + '</span><span class="lcard__b"><strong>' + l.name + '</strong><span>' + I('pin') + l.address + '</span><span>' + I('phone') + l.phone + '</span><em>' + l.tags.slice(0, 4).map(x => t('tag.' + x)).join(' · ') + '</em></span></a>';
  SP.stockCard = v => '<article class="scard"><a class="scard__img" href="vehicul.html?id=' + v.id + '">' + SP.condTag(v) + SP.stTag(v) + SP.carStage(v, 'front', 640) + '</a>' +
    '<div class="scard__b"><p class="scard__k">' + v.year + ' · ' + SP.nf(v.km) + ' km · ' + SP.loc(v.loc).city + '</p><h3><a href="vehicul.html?id=' + v.id + '">' + esc(v.title) + '</a></h3><p class="muted small">' + esc(v.version) + '</p>' +
    '<div class="scard__f"><span class="price">' + (v.list && v.list > v.price ? '<s>' + SP.eur(v.list) + '</s>' : '') + '<strong>' + SP.eur(v.price) + '</strong>' + (v.list && v.list > v.price ? '<em class="save">−' + SP.eur(v.list - v.price) + '</em>' : '') + '</span><a class="ibtn" href="vehicul.html?id=' + v.id + '" aria-label="' + t('c.details') + '">' + I('arrow') + '</a></div></div></article>';
  SP.advisorMini = a => '<div class="adv"><span class="av">' + SP.initials(a.name) + '</span><span><strong>' + a.name + '</strong><small>' + t('r.' + a.role) + '</small></span></div>';

  /* ---------- lead form → Sales Partner Lead Collector ---------- */
  let seq = 0;
  SP.field = (id, name, label, input, full) => '<div class="field' + (full ? ' field--full' : '') + '"><label for="' + id + '">' + label + '</label>' + input + '<span class="err" data-err="' + name + '"></span></div>';
  const opt = (v, l, sel) => '<option value="' + esc(v) + '"' + (String(sel) === String(v) ? ' selected' : '') + '>' + l + '</option>';
  SP.opt = opt;
  SP.leadForm = o => {
    o = o || {}; const id = 'lf' + (++seq), F = SP.field;
    return '<form class="lead" data-lead novalidate data-type="' + (o.type || 'offer') + '" data-ctx="' + esc(o.ctx || '') + '"><div class="fgrid">' +
      (o.model !== undefined ? F(id + 'm', 'model', t('f.model'), '<select id="' + id + 'm" name="model">' + SP.MODELS.map(m => opt(m.id, 'Citroën ' + m.name, o.model)).join('') + '</select>', true) : '') +
      F(id + 'n', 'name', t('f.name') + ' *', '<input id="' + id + 'n" name="name" autocomplete="name" placeholder="' + t('f.namePh') + '">', true) +
      F(id + 'p', 'phone', t('f.phone') + ' *', '<input id="' + id + 'p" name="phone" type="tel" autocomplete="tel" placeholder="' + t('f.phonePh') + '">') +
      F(id + 'e', 'email', t('f.email') + ' *', '<input id="' + id + 'e" name="email" type="email" autocomplete="email" placeholder="' + t('f.emailPh') + '">') +
      (o.loc !== undefined ? F(id + 'l', 'loc', t('f.loc'), '<select id="' + id + 'l" name="loc">' + SP.LOCATIONS.map(l => opt(l.id, l.name, o.loc)).join('') + '</select>', true) : '') +
      (o.extra || '') + (o.message ? F(id + 'g', 'message', t('f.msg'), '<textarea id="' + id + 'g" name="message" rows="3"></textarea>', true) : '') +
      '</div><label class="check"><input type="checkbox" name="gdpr"><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('f.privacy') + '</a>.</span></label><span class="err" data-err="gdpr"></span>' +
      '<button class="btn btn--navy btn--block" type="submit">' + (o.submit || t('f.send')) + '</button></form>';
  };
  SP.validate = f => {
    const v = n => (f.elements[n] && f.elements[n].value || '').trim(), e = {};
    if (f.elements.name && v('name').length < 3) e.name = t('f.errName');
    if (f.elements.phone && !/^[+0-9 ()-]{9,}$/.test(v('phone'))) e.phone = t('f.errPhone');
    if (f.elements.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) e.email = t('f.errEmail');
    if (f.elements.gdpr && !f.elements.gdpr.checked) e.gdpr = t('f.errGdpr');
    f.querySelectorAll('[data-err]').forEach(x => { x.textContent = e[x.dataset.err] || ''; });
    f.querySelectorAll('input,select,textarea').forEach(x => x.toggleAttribute('aria-invalid', !!e[x.name]));
    const k = Object.keys(e)[0]; if (k && f.elements[k]) f.elements[k].focus();
    return !k;
  };
  SP.done = (title, text, ref) => '<div class="done" role="status"><span class="done__i">' + I('check') + '</span><h3>' + title + '</h3><p>' + text + ' <strong>' + ref + '</strong></p></div>';
  SP.modal = (title, body) => {
    const el = document.createElement('div'); el.className = 'modal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    el.innerHTML = '<div class="modal__p"><div class="modal__h"><h3>' + title + '</h3><button type="button" class="modal__x" aria-label="' + t('nav.close') + '">' + I('x') + '</button></div><div class="modal__b">' + body + '</div></div>';
    const close = () => { el.remove(); document.body.classList.remove('noscroll'); document.removeEventListener('keydown', key); };
    const key = e => { if (e.key === 'Escape') close(); };
    el.addEventListener('click', e => { if (e.target === el || e.target.closest('.modal__x')) close(); });
    document.addEventListener('keydown', key); document.body.appendChild(el); document.body.classList.add('noscroll'); bindForms(el); const f = el.querySelector('input,select'); if (f) f.focus();
  };
  SP.offerModal = mid => { const m = SP.model(mid); SP.modal(t('c.reqOffer') + (m ? ' · Citroën ' + m.short : ''), SP.leadForm({ type: 'offer', ctx: mid || 'site', model: mid || SP.MODELS[0].id, loc: SP.LOCATIONS[0].id, message: true, submit: t('c.reqOffer') })); };
  function bindForms(root) {
    root.querySelectorAll('form[data-lead]').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault(); if (!SP.validate(f)) return;
      /* Integration point: POST /api/leads → Sales Partner Lead Collector (source=Website, type, model, location, context) */
      f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('WEB-2026'));
    }));
  }
  SP.bindForms = bindForms;

  function chrome() {
    document.querySelectorAll('.cookie,.demo-badge').forEach(e => e.remove());
    const b = document.createElement('a'); b.className = 'demo-badge'; b.href = 'https://salespartner.ro'; b.target = '_blank'; b.rel = 'noopener'; b.textContent = 'DEMO · Sales Partner'; document.body.appendChild(b);
    if (store.get('ct.cookies')) return;
    const c = document.createElement('div'); c.className = 'cookie';
    c.innerHTML = '<p>' + t('ck.text') + ' <a href="legal.html?doc=cookies">' + t('ck.more') + '</a></p><div><button class="btn btn--line btn--sm" data-ck="n">' + t('ck.nec') + '</button><button class="btn btn--navy btn--sm" data-ck="a">' + t('ck.ok') + '</button></div>';
    c.addEventListener('click', e => { const k = e.target.closest('[data-ck]'); if (k) { store.set('ct.cookies', k.dataset.ck); c.remove(); } });
    document.body.appendChild(c);
  }
  function bind() {
    document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => SP.setLang(b.dataset.lang)));
    const bg = document.querySelector('[data-burger]'), mn = document.getElementById('mnav');
    bg.addEventListener('click', () => { mn.hidden = !mn.hidden; bg.setAttribute('aria-expanded', String(!mn.hidden)); bg.innerHTML = I(mn.hidden ? 'menu' : 'x') + '<span>' + t(mn.hidden ? 'nav.menu' : 'nav.close').toUpperCase() + '</span>'; });
    document.querySelectorAll('[data-nl]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); const i = f.querySelector('input'); if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())) { i.setAttribute('aria-invalid', ''); i.focus(); return; } f.outerHTML = '<p class="nl__ok">' + I('check') + t('ft.nlOk') + '</p>'; }));
    if (!SP._bound) { SP._bound = true; document.body.addEventListener('click', e => { const b = e.target.closest('[data-offer],[data-offer-any]'); if (b && !b.closest('.modal')) SP.offerModal(b.dataset.offer); }); }
    bindForms(document.getElementById('main'));
  }
  SP.render = function () {
    const page = document.body.dataset.page || 'home';
    document.documentElement.lang = SP.lang;
    document.getElementById('site-header').innerHTML = SP.header(page);
    document.getElementById('site-footer').innerHTML = SP.footer() + SP.fab();
    const fn = SP.pages[page] || SP.pages.notfound, out = fn();
    document.getElementById('main').innerHTML = out.html;
    document.title = (out.title ? out.title + ' · ' : '') + 'Citroën · Sales Partner Auto (demo)';
    bind();
    if (out.bind) out.bind(document.getElementById('main'));
    chrome();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) setTimeout(() => el.scrollIntoView(), 50); }
  };
  document.addEventListener('DOMContentLoaded', SP.render);
})();
