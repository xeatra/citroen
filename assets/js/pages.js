/* =====================================================================
   PAGES — each returns { title, html, bind }. CakePHP: one template per action.
   Structure of the Sales Partner Suzuki POC, adapted to the Citroën range
   (list prices only, no national campaign) + a configurator for C3 and C5 Aircross.
   ===================================================================== */
(function () {
  const SP = window.SP, t = SP.t, L = SP.L, esc = SP.esc, I = SP.icon, opt = SP.opt;
  SP.pages = {};
  const keyFig = m => '<div class="keys">' + m.key.map(k => '<div><strong>' + k[0] + '</strong><span>' + L(k[1]) + '</span></div>').join('') + '</div>';
  const ticker = () => { const items = ['tick.1', 'tick.2', 'tick.3', 'tick.4', 'tick.5'].map(k => '<span>' + t(k) + '</span><i>●</i>').join(''); return '<div class="ticker" aria-hidden="true"><div class="ticker__in">' + items + items + '</div></div>'; };
  const mapSrc = l => 'https://maps.google.com/maps?q=' + encodeURIComponent(l.address + ', Romania') + '&z=15&output=embed';
  const pic = (b, alt) => '<picture><source media="(max-width:760px)" srcset="' + SP.cf(b.m) + '"><img src="' + SP.cf(b.d) + '" alt="' + esc(alt) + '" onerror="this.classList.add(\'is-broken\')"></picture>';
  const tlink = (href, label, attr) => (href ? '<a class="tlink2" href="' + href + '"' + (attr || '') + '>' : '<button type="button" class="tlink2"' + (attr || '') + '>') + '<span>' + label + '</span>' + I('arrow') + (href ? '</a>' : '</button>');
  const fromP = m => t('c.from') + ' ' + SP.eur(m.from);
  const netNote = m => m.pro ? '<small class="netp">' + SP.eur(Math.round(m.from / 1.21)) + ' ' + t('c.noVat') + '</small>' : '';
  const cardImg = m => m.card;

  /* ================= HOME ================= */
  SP.pages.home = () => {
    const stock = SP.STOCK.filter(v => v.featured).slice(0, 4);
    const feat = (img, eyebrow, title, txt, href, lbl) => '<article class="fcard"><a class="fcard__img" href="' + href + '">' + SP.img(img, 900, title) + '</a><p class="eyebrow">' + eyebrow + '</p><h3>' + title + '</h3><p class="muted">' + txt + '</p>' + tlink(href, lbl) + '</article>';
    const l0 = SP.LOCATIONS[0];
    return {
      title: '', html:
        '<section class="hsplit"><div class="hsplit__main hban"><a href="model.html?m=c5-aircross">' + pic(SP.BANNERS.main, 'Noul Citroën C5 Aircross') + '</a><div class="hban__cap"><p>' + t('h.mainE') + '</p><h2>' + t('h.mainH') + '</h2></div><div class="hban__bar">' + tlink('configurator.html?m=c5-aircross', t('h.cta1')) + tlink('model.html?m=c5-aircross', t('c.discover')) + '</div></div>' +
        '<div class="hsplit__side"><div class="hban hban--s"><a href="model.html?m=c3">' + pic(SP.BANNERS.c3, 'Citroën C3') + '</a><div class="hban__bar hban__bar--d">' + tlink('configurator.html?m=c3', t('h.cta2')) + '</div></div>' +
        '<div class="hban hban--s"><a href="modele.html?cat=pro">' + pic(SP.BANNERS.pro, 'Citroën utilitare') + '</a><div class="hban__bar hban__bar--d">' + tlink('modele.html?cat=pro', t('h.cta3')) + '</div></div></div></section>' +
        '<section class="sec wrap"><h2 class="h2">' + t('h.range') + '</h2><div class="tabs" role="tablist">' + SP.CATS.map((c, i) => '<button type="button" role="tab" data-cat="' + c[0] + '" class="' + (i ? '' : 'is-on') + '">' + L(c[1]) + '</button>').join('') + '</div>' +
        '<div class="hgrid" data-hgrid></div><p class="note note--sm">' + I('doc') + t('m.note') + '</p></section>' + ticker() +
        '<section class="wrap sec"><div class="qtiles">' + [['sliders', 'h.quickCfg', 'configurator.html'], ['pct', 'h.quickOffer', '#', 'data-offer-any'], ['wheel', 'h.quickTd', 'programare.html?tip=td'], ['wrench', 'h.quickSvc', 'programare.html?tip=svc']].map(q =>
          (q[3] ? '<button type="button" class="qtile" ' + q[3] + '>' : '<a class="qtile" href="' + q[2] + '">') + I(q[0]) + '<span>' + t(q[1]) + '</span>' + (q[3] ? '</button>' : '</a>')).join('') + '</div></section>' +
        '<section class="sec wrap split"><div class="split__txt"><p class="eyebrow">' + t('h.campE') + '</p><h2 class="h2">' + t('h.campH') + '</h2><p>' + t('h.campP') + '</p><ul class="clist">' + SP.MODELS.map(m => '<li><a href="model.html?m=' + m.id + '"><span>Citroën ' + m.short + '</span><b>' + fromP(m) + '</b></a></li>').join('') + '</ul>' +
        tlink(SP.PRICELISTS + '" target="_blank" rel="noopener', t('nav.brochures')) + '</div><div class="split__img">' + SP.img(SP.model('c5-aircross').gallery[1], 1200, 'Citroën C5 Aircross') + '</div></section>' +
        '<section class="sec wrap">' + SP.shead(t('h.stockH'), t('h.stockE'), [t('h.stockAll'), 'stoc.html']) + '<div class="grid4">' + stock.map(SP.stockCard).join('') + '</div></section>' +
        '<section class="sec"><div class="pro"><div class="pro__img">' + SP.img(SP.BANNERS.warranty, 1928, 'Citroën') + '</div><div class="wrap pro__txt"><p class="eyebrow">' + t('h.proE') + '</p><h2 class="h2">' + t('h.proH') + '</h2><p>' + t('h.proP') + '</p><div class="btnrow"><a class="btn btn--navy" href="configurator.html?m=c3">C3 / ë-C3</a><a class="btn btn--navy" href="configurator.html?m=c5-aircross">C5 Aircross</a></div></div></div></section>' +
        '<section class="sec wrap"><div class="grid3">' +
        feat(SP.BANNERS.finance, t('o.fin').toUpperCase(), t('h.f1H'), t('h.f1P'), 'oferte.html#fin', t('c.more')) +
        feat(SP.BANNERS.connect, t('nav.service').toUpperCase(), t('h.f2H'), t('h.f2P'), 'service.html', t('c.more')) +
        feat(SP.BANNERS.contact, t('l.eyebrow'), t('h.f3H'), SP.LOCATIONS.map(l => l.city).join(' · '), 'locatii.html', t('c.more')) + '</div></section>' +
        '<section class="sec sec--last wrap">' + SP.shead(t('h.locH'), t('h.locE'), [t('l.all'), 'locatii.html']) + '<div class="grid3">' + SP.LOCATIONS.map(SP.locCard).join('') + '</div></section>',
      bind(m) {
        const g = m.querySelector('[data-hgrid]');
        const card = x => '<article class="hcard"><a class="hcard__img" href="model.html?m=' + x.id + '">' + SP.img(cardImg(x), 520, x.name) + '</a><div class="hcard__h"><h3>' + x.short + '</h3><button type="button" class="hcard__i" data-offer="' + x.id + '" aria-label="' + t('c.reqOffer') + '">' + I('pct') + '</button><a class="hcard__go" href="model.html?m=' + x.id + '" aria-label="' + x.name + '">' + I('arrow') + '</a></div>' +
          '<p class="hcard__p"><strong>' + fromP(x) + '</strong> <small>' + t('c.vat') + '</small></p>' + netNote(x) + SP.fuelTags(x.fuels) + (x.cfg ? '<a class="hcard__cfg" href="configurator.html?m=' + x.id + '">' + I('sliders') + t('nav.config') + '</a>' : '') + '</article>';
        const draw = c => { g.innerHTML = SP.MODELS.filter(x => x.cats.includes(c)).map(card).join(''); };
        m.querySelectorAll('[data-cat]').forEach(b => b.addEventListener('click', () => { m.querySelectorAll('[data-cat]').forEach(x => x.classList.toggle('is-on', x === b)); draw(b.dataset.cat); }));
        draw('all');
      }
    };
  };

  /* ================= MODELE ================= */
  SP.pages.models = () => {
    const st = { cat: SP.CATS.some(c => c[0] === SP.param('cat')) ? SP.param('cat') : 'all' };
    return {
      title: t('m.title'), html: SP.phead(t('nav.models').toUpperCase(), t('m.title'), null, '<div class="tabs tabs--l" role="tablist">' + SP.CATS.map(c => '<button type="button" role="tab" data-mcat="' + c[0] + '">' + L(c[1]) + '</button>').join('') + '</div>') +
        '<section class="wrap sec--last"><p class="mbar__n"><strong data-mn></strong> ' + t('m.count') + '</p><div class="mgrid" data-mlist></div><p class="note">' + I('doc') + t('m.note') + '</p></section>',
      bind(m) {
        const list = m.querySelector('[data-mlist]');
        const draw = () => {
          m.querySelectorAll('[data-mcat]').forEach(b => b.classList.toggle('is-on', b.dataset.mcat === st.cat));
          const r = SP.MODELS.filter(x => x.cats.includes(st.cat));
          m.querySelector('[data-mn]').textContent = r.length; list.innerHTML = r.map(SP.modelCard).join('');
        };
        m.querySelectorAll('[data-mcat]').forEach(b => b.addEventListener('click', () => { st.cat = b.dataset.mcat; draw(); }));
        draw();
      }
    };
  };

  /* ================= MODEL ================= */
  SP.pages.model = () => {
    const m = SP.model(SP.param('m')) || SP.MODELS[0];
    const stock = SP.STOCK.filter(v => v.cond === 'new' && v.mid === m.id);
    const groups = []; m.versions.forEach(v => { const k = v.eng + '|' + v.gb + '|' + v.dr; let g = groups.find(x => x.k === k); if (!g) { g = { k, v, rows: [] }; groups.push(g); } g.rows.push(v); });
    const gTitle = g => g.v.eng + ' <span>' + g.v.hp + ' CP · ' + g.v.gb + (g.v.dr && g.v.dr !== 'FWD' ? ' · ' + g.v.dr : '') + ' · ' + L(SP.FUEL[g.v.fuel]) + '</span>';
    const vtable = groups.map(g => '<div class="vgrp"><h3 class="vgrp__h">' + gTitle(g) + '</h3><div class="vtable vtable--c" role="table">' +
      '<div class="vrow vrow--h" role="row"><span role="columnheader">' + t('m.trim') + '</span><span role="columnheader">' + t('m.rrp') + '</span><span role="columnheader">' + (m.pro ? t('c.noVat') : t('m.monthly')) + '</span><span></span></div>' +
      g.rows.map(v => '<div class="vrow" role="row"><span role="cell"><b>' + v.trim + '</b><small>' + v.eng + '</small></span><span role="cell"><strong>' + SP.eur(v.price) + '</strong></span><span role="cell">' + (m.pro ? SP.eur(v.net) : t('c.from') + ' ' + SP.eur(SP.monthly(v.price, .2, 60, .079)) + '/' + t('v.mo')) + '</span>' +
        '<span role="cell">' + (m.cfg ? '<a class="ulink ulink--sm" href="configurator.html?m=' + m.id + '&v=' + v.code + '">' + t('c.configure') + '</a>' : '<button type="button" class="ulink ulink--sm" data-offer="' + m.id + '">' + t('m.ask') + '</button>') + '</span></div>').join('') + '</div></div>').join('');
    const c0 = m.colors.length ? m.colorOf(m.defColor) : null;
    const colNote = c => (c.sur ? '+' + SP.eur(c.sur) : t('m.std'));
    const SPEC = [['m.pw', m.pw], ['m.range', L(m.specs.range)], ['m.battery', m.specs.battery], ['m.cons', m.specs.cons], ['m.co2', m.specs.co2], ['m.len', m.specs.len], ['m.wid', m.specs.wid], ['m.hei', m.specs.hei], ['m.boot', m.specs.boot]].filter(x => x[1]);
    const trimFrom = name => Math.min.apply(null, m.versions.filter(v => v.trim === name).map(v => v.price));
    const trims = SP.TRIMS[m.id] || [];
    const nav = [['ov', 'm.overview']].concat(c0 ? [['col', 'm.colors']] : [], [['ver', 'm.versions']], trims.length ? [['dot', 'm.equip']] : [], [['spec', 'm.specs'], ['gal', 'm.gallery'], ['stoc', 'm.stock']]);
    return {
      title: 'Citroën ' + m.short, html:
        '<div class="subnav"><div class="wrap subnav__in"><strong>' + m.short + '</strong><nav>' + nav.map(x => '<a href="#' + x[0] + '">' + t(x[1]) + '</a>').join('') + '</nav>' + (m.cfg ? '<a class="btn btn--navy btn--sm" href="configurator.html?m=' + m.id + '">' + t('c.configure') + '</a>' : '<button type="button" class="btn btn--navy btn--sm" data-offer="' + m.id + '">' + t('c.reqOffer') + '</button>') + '</div></div>' +
        '<section class="mhero" id="ov">' + SP.img(m.gallery[0], 1928, m.name, '', false) + '<div class="mhero__ov"><div class="wrap"><p class="mhero__k">' + L(m.sub) + '</p><h1 class="mhero__h">' + m.name + '</h1><div class="pduo pduo--w"><div><strong>' + fromP(m) + '</strong><small>' + t('m.rrp') + ' · ' + t('c.vat') + '</small></div>' + (m.pro ? '<div><strong class="pduo__l">' + SP.eur(Math.round(m.from / 1.21)) + '</strong><small>' + t('c.noVat') + '</small></div>' : '') + '</div></div></div></section>' +
        '<section class="wrap mintro"><p class="eyebrow">' + m.fuels.map(f => L(SP.FUEL[f]).toUpperCase()).join(' / ') + '</p><p class="lead">' + L(m.lead) + '</p>' +
        '<div class="btnrow btnrow--c">' + (m.cfg ? '<a class="btn btn--navy" href="configurator.html?m=' + m.id + '">' + I('sliders') + t('c.configure') + '</a>' : '') + '<button type="button" class="btn ' + (m.cfg ? 'btn--line' : 'btn--navy') + '" data-offer="' + m.id + '">' + I('pct') + t('c.reqOffer') + '</button><a class="btn btn--line" href="programare.html?tip=td&m=' + m.id + '">' + I('wheel') + t('nav.td') + '</a></div>' + keyFig(m) + '</section>' +
        (c0 ? '<section class="wrap sec cstage" id="col"><div class="cstage__img" data-cimg>' + SP.img(c0.img, 900, m.name + ' ' + c0.name, '', false) + '</div><div class="cstage__p"><p class="eyebrow">' + t('m.colors') + '</p><h2 class="h3" data-cname>' + c0.name + '</h2><p class="muted small" data-cnote>' + colNote(c0) + '</p>' +
          '<div class="swatches">' + m.colors.map(c => '<button type="button" class="sw' + (c === c0 ? ' is-on' : '') + '" data-c="' + c.code + '" aria-label="' + esc(c.name) + '" title="' + esc(c.name) + '"><span style="background:' + c.hex + '"></span></button>').join('') + '</div>' +
          '<p class="note note--sm">' + I('doc') + t('m.colNote') + '</p><a class="btn btn--navy btn--sm" href="configurator.html?m=' + m.id + '">' + t('c.configure') + '</a></div></section>' : '') +
        '<section class="wrap sec" id="ver">' + SP.shead(t('m.versions'), m.short.toUpperCase(), [t('nav.brochures') + ' (PDF)', m.pricelists[0]]) + vtable +
        '<p class="note note--sm">' + I('doc') + t('m.note') + (m.pricelists.length > 1 ? ' ' + m.pricelists.map((p, i) => '<a class="ulink ulink--sm" href="' + p + '" target="_blank" rel="noopener">PDF ' + (i + 1) + '</a>').join(' ') : '') + '</p></section>' +
        (trims.length ? '<section class="wrap sec" id="dot">' + SP.shead(t('m.trimsH'), t('m.equip').toUpperCase()) + '<div class="trims">' + trims.map(x => { const txt = L(x[1]), plus = /^(În plus|Adds): /.test(txt), fp = trimFrom(x[0]); return '<article class="trim"><h3>' + x[0] + '</h3>' + (isFinite(fp) ? '<p class="trim__p">' + t('c.from') + ' <strong>' + SP.eur(fp) + '</strong></p>' : '') + (plus ? '<p class="trim__plus">' + t('m.plusPrev') + '</p>' : '') + '<ul>' + txt.replace(/^(În plus|Adds): /, '').split(' · ').map(li => '<li>' + I('check') + li + '</li>').join('') + '</ul></article>'; }).join('') + '</div></section>' : '') +
        '<section class="wrap sec" id="spec">' + SP.shead(t('m.specs'), m.eng.toUpperCase()) + '<dl class="specs">' + SPEC.map(s => '<div><dt>' + t(s[0]) + '</dt><dd>' + s[1] + '</dd></div>').join('') + '</dl><p class="note note--sm">' + I('doc') + t('m.wltp') + '</p></section>' +
        '<section class="wrap sec" id="gal">' + SP.shead(t('m.gallery')) + '<div class="mgal">' + m.gallery.concat(c0 ? ['002', '003'].map(w => SP.v3d(m.lcdv, c0.code, w, 1280)) : []).slice(0, 5).map((g, i) => '<figure class="mgal__i mgal__i--' + i + (/V3DImage/.test(g) ? ' mgal__i--3d' : '') + '">' + SP.img(g, i ? 900 : 1400, m.name) + '</figure>').join('') + '</div></section>' +
        '<section class="wrap sec" id="stoc">' + SP.shead(t('m.inStock'), '', stock.length ? [t('h.stockAll'), 'stoc.html?model=' + encodeURIComponent(stock[0].title)] : null) + (stock.length ? '<div class="grid4">' + stock.map(SP.stockCard).join('') + '</div>' : '<p class="note">' + I('car') + t('m.noStock') + '</p>') + '</section>' +
        '<section class="wrap sec sec--last"><div class="qtiles"><a class="qtile" href="' + m.url + '" target="_blank" rel="noopener">' + I('ext') + '<span>' + t('m.official') + '</span></a>' +
        (m.cfg ? '<a class="qtile" href="configurator.html?m=' + m.id + '">' + I('sliders') + '<span>' + t('c.configure') + '</span></a>' : '<a class="qtile" href="https://www.citroen.ro/instrumente/configurator.html" target="_blank" rel="noopener">' + I('car') + '<span>' + t('m.configure') + '</span></a>') +
        '<a class="qtile" href="programare.html?tip=td&m=' + m.id + '">' + I('wheel') + '<span>' + t('fab.td') + '</span></a><a class="qtile" href="' + m.pricelists[0] + '" target="_blank" rel="noopener">' + I('doc') + '<span>' + t('nav.brochures') + '</span></a></div></section>',
      bind(el) {
        el.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => {
          const c = m.colorOf(b.dataset.c), img = el.querySelector('[data-cimg] img');
          img.classList.remove('is-broken'); img.src = c.img; img.alt = m.name + ' ' + c.name;
          el.querySelector('[data-cname]').textContent = c.name; el.querySelector('[data-cnote]').textContent = colNote(c);
          el.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('is-on', x === b));
        }));
      }
    };
  };

  /* ================= CONFIGURATOR (C3 / ë-C3 and C5 Aircross) ================= */
  SP.pages.config = () => {
    const cfgModels = SP.MODELS.filter(x => x.cfg);
    const pm = SP.model(SP.param('m'));
    const s = { m: pm && pm.cfg ? pm.id : null, fuel: null, v: null, c: null, opts: [], view: '001', down: 20, months: 60, loc: SP.LOCATIONS[0].id, step: 1 };
    if (s.m) { const m = SP.model(s.m), pv = m.versions.find(v => v.code === SP.param('v')); s.step = 2; if (pv) { s.v = pv.code; s.fuel = pv.fuel; s.step = 3; } }
    const STEPS = ['cf.s1', 'cf.s2', 'cf.s3', 'cf.s4', 'cf.s5'];
    const M = () => SP.model(s.m), Vv = () => M() && M().versions.find(v => v.code === s.v), Cc = () => M() && (M().colors.find(c => c.code === s.c) || M().colorOf(M().defColor));
    const avail = () => { const v = Vv(); return v ? (SP.OPTIONS[s.m] || []).filter(o => o.trims.includes(v.trim) && (!o.fuels || o.fuels.includes(v.fuel))) : []; };
    const optSel = () => avail().filter(o => s.opts.includes(o.id));
    const total = () => { const v = Vv(); if (!v) return 0; return v.price + (Cc() ? Cc().sur : 0) + optSel().reduce((a, o) => a + SP.optPrice(o, v), 0); };
    const img = (view, w) => SP.v3d(Vv() ? Vv().code : M().lcdv, Cc().code, view || s.view, w || 1280);
    const fuelsOf = m => [...new Set(m.versions.map(v => v.fuel))];
    const html = SP.phead(t('cf.eyebrow'), t('cf.title'), t('cf.sub')) +
      '<section class="wrap cfgp sec--last"><ol class="prog prog--5" data-prog></ol><div class="cfg"><div class="cfg__main"><div class="cfg__stage" data-stage></div><div class="cfg__body" data-body></div></div><aside class="cfg__sum" data-sum></aside></div>' +
      '<p class="note note--sm">' + I('doc') + t('cf.note') + '</p></section>';
    function stage() {
      if (!M()) return '<div class="cfg__ph">' + I('car') + '<p>' + t('cf.pick') + '</p></div>';
      return '<div class="cfg__img"><img src="' + img() + '" alt="Citroën ' + M().short + '" onerror="this.classList.add(\'is-broken\')"></div><div class="cfg__views">' + ['001', '002', '003', '004'].map(w => '<button type="button" data-view="' + w + '" class="' + (w === s.view ? 'is-on' : '') + '"><img src="' + img(w, 300) + '" alt="" loading="lazy"></button>').join('') + '</div>' +
        '<p class="cfg__name"><small>CITROËN</small>' + (Vv() ? M().short + ' · ' + Vv().trim : M().name) + '</p>';
    }
    function body() {
      const m = M();
      if (s.step === 1) return '<h2 class="h4">' + t('cf.s1') + '</h2><div class="cfg__models">' + cfgModels.map(x => '<button type="button" class="cfgm' + (x.id === s.m ? ' is-on' : '') + '" data-pm="' + x.id + '">' + SP.img(x.card, 520, x.name) + '<strong>' + x.name + '</strong><small>' + fromP(x) + ' · ' + x.fuels.map(f => L(SP.FUEL[f])).join(' / ') + '</small></button>').join('') + '</div>';
      if (s.step === 2) {
        const fs = fuelsOf(m); if (!s.fuel || !fs.includes(s.fuel)) s.fuel = fs[0];
        return '<h2 class="h4">' + t('cf.s2') + '</h2><div class="tabs">' + fs.map(f => '<button type="button" data-fuel="' + f + '" class="' + (f === s.fuel ? 'is-on' : '') + '">' + L(SP.FUEL[f]) + '</button>').join('') + '</div>' +
          '<div class="vopts">' + m.versions.filter(v => v.fuel === s.fuel).map(v => '<label class="vopt' + (v.code === s.v ? ' is-on' : '') + '"><input type="radio" name="ver" value="' + v.code + '"' + (v.code === s.v ? ' checked' : '') + '><span class="vopt__b"><strong>' + v.trim + '</strong><small>' + v.eng + ' · ' + v.hp + ' CP · ' + v.gb + '</small></span><span class="vopt__p"><strong>' + SP.eur(v.price) + '</strong><small>' + t('c.vat') + '</small></span></label>').join('') + '</div>' +
          ((SP.TRIMS[m.id] || []).length ? '<details class="cfg__eq"><summary>' + t('m.equip') + '</summary>' + SP.TRIMS[m.id].map(x => '<p><b>' + x[0] + '</b> — ' + L(x[1]) + '</p>').join('') + '</details>' : '') + '<p class="err" data-cerr role="alert"></p>';
      }
      if (s.step === 3) return '<h2 class="h4">' + t('cf.s3') + '</h2><div class="cswatch">' + m.colors.map(c => '<button type="button" class="csw' + (c.code === Cc().code ? ' is-on' : '') + '" data-col="' + c.code + '"><span class="csw__c" style="background:' + c.hex + '"></span><span><strong>' + c.name + '</strong><small>' + (c.sur ? '+ ' + SP.eur(c.sur) : t('m.std')) + '</small></span></button>').join('') + '</div>';
      if (s.step === 4) { const list = avail(); return '<h2 class="h4">' + t('cf.s4') + '</h2>' + (list.length ? '<div class="copts">' + list.map(o => '<label class="copt"><input type="checkbox" data-opt="' + o.id + '"' + (s.opts.includes(o.id) ? ' checked' : '') + '><span class="copt__b"><strong>' + L(o.name) + '</strong><small>' + o.id + (o.grp ? ' · ' + t('cf.oneOf') : '') + (o.not ? ' · ' + t('cf.notWith') + ' ' + o.not.join(', ') : '') + '</small></span><span class="copt__p">+ ' + SP.eur(SP.optPrice(o, Vv())) + '</span></label>').join('') + '</div>' : '<p class="muted">' + t('cf.noOpt') + '</p>'); }
      return '<h2 class="h4">' + t('cf.s5') + '</h2><div class="fin fin--cfg"><label class="slider"><span><b>' + t('v.down') + '</b><em data-fdv></em></span><input type="range" min="0" max="50" step="5" value="' + s.down + '" data-fd></label><label class="slider"><span><b>' + t('v.term') + '</b><em data-ftv></em></span><input type="range" min="12" max="72" step="12" value="' + s.months + '" data-ft></label>' +
        '<div class="fin__res"><p class="eyebrow">' + t('v.monthly') + '</p><strong data-fm></strong></div><p class="muted small">' + t('v.finNote') + '</p></div>' +
        '<div class="fbox">' + SP.leadForm({ type: 'configuration', ctx: s.v, loc: s.loc, message: true, submit: t('cf.send') }) + '</div>';
    }
    function sum() {
      const m = M(), v = Vv();
      if (!m) return '<h3 class="h4">' + t('cf.sum') + '</h3><p class="muted small">' + t('cf.pick') + '</p>';
      const row = (k, val, cls) => '<div class="' + (cls || '') + '"><dt>' + k + '</dt><dd>' + val + '</dd></div>';
      return '<h3 class="h4">' + t('cf.sum') + '</h3><dl class="specs specs--1">' + row(t('f.model'), 'Citroën ' + m.short) + (v ? row(t('v.trim'), v.trim + '<br><small>' + v.eng + ' · ' + v.gb + '</small>') + row(t('m.rrp'), SP.eur(v.price)) + row(t('v.color'), Cc().name + ' · ' + (Cc().sur ? SP.eur(Cc().sur) : t('m.std'))) + optSel().map(o => row(L(o.name), SP.eur(SP.optPrice(o, v)))).join('') : '') + '</dl>' +
        (v ? '<div class="cfg__tot"><span>' + t('cf.total') + '</span><strong>' + SP.eur(total()) + '</strong><small>' + t('c.vat') + ' · ' + SP.eur(Math.round(total() / 1.21)) + ' ' + t('c.noVat') + '</small><small>' + t('v.monthly') + ': ' + SP.eur(SP.monthly(total(), s.down / 100, s.months, .079)) + '</small></div>' : '') +
        '<a class="ulink ulink--sm" href="model.html?m=' + m.id + '">' + t('v.model') + '</a> <a class="ulink ulink--sm" href="' + m.pricelists[0] + '" target="_blank" rel="noopener">' + t('nav.brochures') + '</a>';
    }
    function draw(root) {
      root.querySelector('[data-prog]').innerHTML = STEPS.map((x, i) => '<li class="' + (s.step > i + 1 ? 'is-done' : s.step === i + 1 ? 'is-on' : '') + '"><button type="button" data-go="' + (i + 1) + '"><span>' + (s.step > i + 1 ? I('check') : i + 1) + '</span><em>' + t(x) + '</em></button></li>').join('');
      root.querySelector('[data-stage]').innerHTML = stage();
      const b = root.querySelector('[data-body]');
      b.innerHTML = body() + (s.step > 1 ? '<div class="bnav"><button type="button" class="btn btn--line" data-prev>' + t('b.prev') + '</button>' + (s.step < 5 ? '<button type="button" class="btn btn--navy" data-next>' + t('b.next') + '</button>' : '<span></span>') + '</div>' : '');
      root.querySelector('[data-sum]').innerHTML = sum();
      if (s.step === 5) {
        const fd = b.querySelector('[data-fd]'), ft = b.querySelector('[data-ft]');
        const calc = () => { s.down = +fd.value; s.months = +ft.value; b.querySelector('[data-fdv]').textContent = fd.value + '% · ' + SP.eur(total() * fd.value / 100); b.querySelector('[data-ftv]').textContent = ft.value + ' ' + t('v.months'); b.querySelector('[data-fm]').textContent = SP.eur(SP.monthly(total(), s.down / 100, s.months, .079)); root.querySelector('[data-sum]').innerHTML = sum(); };
        fd.addEventListener('input', calc); ft.addEventListener('input', calc); calc();
        const f = b.querySelector('form[data-lead]');
        f.removeAttribute('data-lead');
        f.addEventListener('submit', e => { e.preventDefault(); if (!SP.validate(f)) return; /* Integration point: POST /api/leads (type=configuration: version LCDV, colour, options, total, finance, location) → Sales Partner Lead Collector */ f.outerHTML = SP.done(t('f.ok'), t('f.okD'), '#' + SP.ref('CFG-2026')); });
      }
      try { history.replaceState(null, '', 'configurator.html' + (s.m ? '?m=' + s.m + (s.v ? '&v=' + s.v : '') : '') + (SP.param('lang') ? (s.m ? '&' : '?') + 'lang=' + SP.param('lang') : '')); } catch (e) { }
    }
    return {
      title: t('cf.title'), html,
      bind(root) {
        root.addEventListener('click', e => {
          const go = e.target.closest('[data-go]'); if (go) { const n = +go.dataset.go; if (n === 1 || (s.m && n === 2) || (s.v && n <= 5)) { s.step = n; draw(root); } return; }
          const pm = e.target.closest('[data-pm]'); if (pm) { if (s.m !== pm.dataset.pm) { s.m = pm.dataset.pm; s.v = null; s.c = null; s.opts = []; s.fuel = null; } s.step = 2; draw(root); return; }
          const fu = e.target.closest('[data-fuel]'); if (fu) { s.fuel = fu.dataset.fuel; draw(root); return; }
          const co = e.target.closest('[data-col]'); if (co) { s.c = co.dataset.col; draw(root); return; }
          const vw = e.target.closest('[data-view]'); if (vw) { s.view = vw.dataset.view; root.querySelector('.cfg__img img').src = img(); root.querySelectorAll('[data-view]').forEach(x => x.classList.toggle('is-on', x === vw)); return; }
          if (e.target.closest('[data-prev]')) { s.step--; draw(root); return; }
          if (e.target.closest('[data-next]')) {
            if (s.step === 2 && !s.v) { root.querySelector('[data-cerr]').textContent = t('cf.errVer'); return; }
            if (s.step === 3 && !s.c) s.c = Cc().code;
            s.step++; draw(root); root.querySelector('.cfg').scrollIntoView({ behavior: 'smooth' });
          }
        });
        root.addEventListener('change', e => {
          if (e.target.name === 'ver') { s.v = e.target.value; s.opts = s.opts.filter(id => avail().some(o => o.id === id)); draw(root); }
          const oid = e.target.dataset.opt;
          if (oid) {
            const o = avail().find(x => x.id === oid);
            if (e.target.checked) { s.opts = s.opts.filter(id => { const x = avail().find(y => y.id === id); return !(o.grp && x.grp === o.grp) && !(o.not || []).includes(id) && !(x.not || []).includes(oid); }); s.opts.push(oid); } else s.opts = s.opts.filter(id => id !== oid);
            draw(root);
          }
          if (e.target.name === 'loc') s.loc = e.target.value;
        });
        draw(root);
      }
    };
  };

  /* ================= OFERTE ================= */
  SP.pages.offers = () => {
    const deals = SP.STOCK.filter(v => v.cond === 'new' && v.disc).sort((a, b) => b.disc - a.disc), max = deals[0];
    const link = o => ({ fin: [null, t('c.reqOffer'), ' data-offer-any'], ev: ['modele.html?cat=ev', t('c.more')], pro: ['modele.html?cat=pro', t('c.more')], buyback: ['programare.html?tip=bb', t('nav.book')], body: ['programare.html?tip=dmg', t('nav.book')] }[o.id] || ['programare.html?tip=svc', t('nav.book')]);
    const svc = o => { const l = link(o); return '<article class="svcard"><div class="svcard__img">' + SP.img(o.img, 700, L(o.title)) + '<span class="obadge">' + L(o.badge) + '</span></div><div class="svcard__b"><h3>' + L(o.title) + '</h3><p class="muted small">' + L(o.lead) + '</p>' + tlink(l[0], l[1], l[2]) + '</div></article>'; };
    return {
      title: t('nav.offers'), html: '<section class="ohero"><div class="wrap ohero__in"><div><p class="eyebrow">' + t('o.eyebrow') + '</p><h1 class="ohero__h">' + t('o.title') + '</h1><p>' + t('o.sub') + '</p>' +
        '<div class="btnrow"><a class="btn btn--white" href="#oferte">' + t('o.see') + '</a><a class="btn btn--ghost" href="configurator.html">' + t('nav.config') + '</a></div></div><div class="ohero__max"><p class="eyebrow">' + t('o.max') + '</p><strong>−' + SP.eur(max.disc) + '</strong><p>' + max.title + ' · ' + max.ver.trim + ' · ' + L(SP.FUEL[max.fuel]) + '</p></div></div></section>' + ticker() +
        '<section class="wrap sec" id="oferte">' + SP.shead(t('o.cars'), '01 · ' + t('o.stockDeals').toUpperCase(), [t('h.stockAll'), 'stoc.html']) + '<div class="grid4">' + deals.map(SP.stockCard).join('') + '</div></section>' +
        '<section class="wrap sec" id="fin">' + SP.shead(t('o.fin'), '02 · ' + t('o.finE')) + '<div class="grid3">' + SP.FIN.map(svc).join('') + '</div></section>' +
        '<section class="wrap sec sec--last">' + SP.shead(t('o.svc'), '03 · ' + t('h.svcE')) + '<div class="grid3">' + SP.SERVICE_OFFERS.map(svc).join('') + '</div><p class="note">' + I('doc') + t('o.legal') + '</p></section>'
    };
  };

  /* ================= STOC ================= */
  SP.pages.stock = () => {
    const p = k => SP.param(k) || '';
    const st = { cond: p('cond') || 'all', q: '', model: p('model'), brand: '', fuel: '', gear: '', loc: '', max: 0, avail: false, sort: 'rec', page: 1 };
    const titles = [...new Set(SP.STOCK.map(v => v.title))].sort();
    const sel = (k, label, opts) => '<label class="fsel"><span>' + label + '</span><select data-s="' + k + '">' + opt('', t('c.any'), st[k]) + opts.map(o => opt(o[0], o[1], st[k])).join('') + '</select></label>';
    const rail = '<div class="rail__h"><strong>' + t('s.filters') + '</strong><button type="button" class="ulink ulink--sm" data-sreset>' + t('c.reset') + '</button></div>' +
      '<label class="fsearch">' + I('search') + '<input type="search" data-s="q" placeholder="' + t('s.search') + '" aria-label="' + t('s.search') + '"></label>' +
      sel('model', t('s.model'), titles.map(x => [x, x])) + sel('brand', t('s.brand'), [...new Set(SP.STOCK.map(v => v.brand))].map(b => [b, b])) +
      sel('fuel', t('s.fuel'), [...new Set(SP.STOCK.map(v => v.fuel))].map(f => [f, L(SP.FUEL[f])])) + sel('gear', t('s.gear'), [['auto', t('s.auto')], ['manual', t('s.manual')]]) +
      sel('loc', t('f.loc'), SP.LOCATIONS.map(l => [l.id, l.city])) + sel('max', t('s.max'), [20000, 25000, 30000, 40000, 50000].map(x => [x, SP.eur(x)])) +
      '<label class="cbx"><input type="checkbox" data-s="avail"><span>' + t('s.onlyAvail') + '</span></label><button type="button" class="btn btn--navy btn--block rail__apply" data-stoggle>' + t('s.show') + '</button>';
    return {
      title: t('nav.stock'), html: SP.phead(t('s.eyebrow'), t('s.title'), t('s.sub'), '<div class="segs" role="tablist">' + [['all', t('c.all')], ['new', t('s.new')], ['used', t('s.used')]].map(x => '<button type="button" data-cond="' + x[0] + '">' + x[1] + '</button>').join('') + '</div>') +
        '<section class="wrap slay"><button class="btn btn--line btn--sm sfbtn" type="button" data-stoggle>' + I('sliders') + t('s.filters') + '</button><aside class="rail" id="rail">' + rail + '</aside>' +
        '<div><div class="sbar"><p><strong data-scount></strong> ' + t('c.results') + '</p><label class="sel"><span class="sr">' + t('s.sort') + '</span><select data-ssort>' + opt('rec', t('s.sRec')) + opt('pa', t('s.sPa')) + opt('pd', t('s.sPd')) + opt('y', t('s.sY')) + opt('k', t('s.sK')) + '</select></label></div>' +
        '<div data-slist></div><nav class="pager" data-pager aria-label="Pagination"></nav></div></section>',
      bind(m) {
        const list = m.querySelector('[data-slist]'), rail = m.querySelector('#rail'), PER = 9;
        const draw = () => {
          m.querySelectorAll('[data-cond]').forEach(b => b.classList.toggle('is-on', b.dataset.cond === st.cond));
          const q = st.q.toLowerCase();
          let r = SP.STOCK.filter(v => (st.cond === 'all' || v.cond === st.cond) && (!st.model || v.title === st.model) && (!st.brand || v.brand === st.brand) && (!st.fuel || v.fuel === st.fuel) &&
            (!st.gear || (st.gear === 'manual') === /^M\d/.test(v.gb)) && (!st.loc || v.loc === st.loc) && (!st.max || v.price <= st.max) && (!st.avail || v.status === 'avail') && (!q || (v.title + ' ' + v.version + ' ' + v.id).toLowerCase().includes(q)));
          const srt = { pa: (a, b) => a.price - b.price, pd: (a, b) => b.price - a.price, y: (a, b) => b.year - a.year, k: (a, b) => a.km - b.km }[st.sort]; if (srt) r = r.slice().sort(srt);
          m.querySelector('[data-scount]').textContent = r.length;
          const pages = Math.max(1, Math.ceil(r.length / PER)); st.page = Math.min(st.page, pages);
          list.innerHTML = r.length ? '<div class="grid3">' + r.slice((st.page - 1) * PER, st.page * PER).map(SP.stockCard).join('') + '</div>' : '<p class="empty">' + t('s.none') + '</p>';
          m.querySelector('[data-pager]').innerHTML = pages < 2 ? '' : Array.from({ length: pages }, (_, i) => '<button type="button" data-pg="' + (i + 1) + '" class="' + (i + 1 === st.page ? 'is-on' : '') + '">' + (i + 1) + '</button>').join('');
        };
        rail.addEventListener('input', e => { const k = e.target.dataset.s; if (!k) return; st[k] = e.target.type === 'checkbox' ? e.target.checked : (k === 'max' ? +e.target.value : e.target.value); st.page = 1; draw(); });
        m.querySelector('[data-sreset]').addEventListener('click', () => { Object.assign(st, { q: '', model: '', brand: '', fuel: '', gear: '', loc: '', max: 0, avail: false, page: 1 }); rail.querySelectorAll('select').forEach(s => s.value = ''); rail.querySelector('[data-s=q]').value = ''; rail.querySelector('[data-s=avail]').checked = false; draw(); });
        m.querySelectorAll('[data-cond]').forEach(b => b.addEventListener('click', () => { st.cond = b.dataset.cond; st.page = 1; draw(); }));
        m.querySelector('[data-ssort]').addEventListener('change', e => { st.sort = e.target.value; draw(); });
        m.querySelector('[data-pager]').addEventListener('click', e => { const b = e.target.closest('[data-pg]'); if (b) { st.page = +b.dataset.pg; draw(); m.querySelector('.slay').scrollIntoView({ behavior: 'smooth' }); } });
        m.querySelectorAll('[data-stoggle]').forEach(b => b.addEventListener('click', () => rail.classList.toggle('is-open')));
        draw();
      }
    };
  };

  /* ================= VEHICUL ================= */
  SP.pages.vehicle = () => {
    const v = SP.car(SP.param('id')) || SP.STOCK[0], isNew = v.cond === 'new', loc = SP.loc(v.loc), a = SP.ADVISORS[v.adv] || SP.ADVISORS.ri, APR = .079;
    const imgs = v.img ? [['cut', v.img]].concat((v.views || []).map(x => ['cut', x]), (v.model ? v.model.gallery.slice(0, 2) : []).map(g => ['cf', g])) : v.photos.map(k => ['u', k]);
    const big = x => x[0] === 'u' ? SP.ph(x[1], 1400, 875) : SP.cf(x[1]);
    const thumb = (x, i) => '<button type="button" class="vthumb' + (x[0] === 'cut' ? ' vthumb--cut' : '') + (i ? '' : ' is-on') + '" data-i="' + i + '">' + (x[0] === 'u' ? SP.uimg(x[1], 300, 200) : SP.img(x[1], 360)) + '</button>';
    const specs = [[t('v.year'), v.year], [t('v.km'), SP.nf(v.km) + ' km'], [t('v.fuel'), L(SP.FUEL[v.fuel])], [t('v.gear'), v.gb], [t('v.power'), v.hp + ' CP'], isNew ? [t('v.engine'), v.ver.eng] : [t('v.trim'), v.version], isNew ? [t('v.trim'), v.ver.trim] : null,
      [t('v.color'), L(v.colorName)], [t('v.loc'), loc.name], [t('v.vin'), v.vin], [t('v.stockId'), v.id]].filter(Boolean);
    const sim = SP.STOCK.filter(x => x.id !== v.id && x.cond === v.cond).sort((x, y) => (y.mid === v.mid) - (x.mid === v.mid)).slice(0, 3);
    const checks = isNew ? ['v.hn', 'v.hn2'] : v.brand === 'Citroën' ? ['v.h1', 'v.h2', 'v.hn'] : ['v.h1', 'v.h2', 'v.h3'];
    const trimTxt = isNew ? L(((SP.TRIMS[v.mid] || []).find(x => x[0] === v.ver.trim) || ['', { ro: '', en: '' }])[1]).replace(/^(În plus|Adds): /, '') : '';
    const priceRows = isNew ? '<p class="pbox__r"><span>' + t('v.list') + '</span>' + (v.disc ? '<s>' + SP.eur(v.list) + '</s>' : '<span>' + SP.eur(v.list) + '</span>') + '</p>' + (v.disc ? '<p class="pbox__r"><span>' + (v.demo ? t('v.demoDisc') : t('v.stockDisc')) + '</span><span>−' + SP.eur(v.disc) + '</span></p>' : '') : '';
    return {
      title: v.title, html: '<section class="wrap vd"><a class="back" href="stoc.html">' + I('arrowL') + t('v.back') + '</a><div class="vd__top"><div><div class="vd__main' + (imgs[0][0] === 'cut' ? ' vd__main--cut' : '') + '" data-main>' + SP.condTag(v) + SP.stTag(v) + '<img src="' + big(imgs[0]) + '" alt="' + esc(v.title) + '" onerror="this.classList.add(\'is-broken\')"></div>' +
        '<div class="vd__thumbs">' + imgs.map(thumb).join('') + '</div><p class="vd__credit" data-credit>' + (imgs[0][0] === 'u' ? SP.credit(v.photos[0]) : '') + '</p><p class="note note--sm">' + I('camera') + t(v.img ? 'v.photosNew' : 'v.photosUsed') + '</p></div>' +
        '<div class="vd__side"><p class="eyebrow">' + (isNew ? (v.demo ? t('c.demo') : t('c.new')) : t('c.used')) + ' · ' + v.year + ' · ' + loc.city + '</p><h1 class="vd__h">' + esc(v.title) + '</h1><p class="muted">' + esc(v.version) + '</p>' +
        '<p class="chips">' + [SP.nf(v.km) + ' km', L(SP.FUEL[v.fuel]), v.gb, v.hp + ' CP'].map(x => '<span>' + x + '</span>').join('') + (isNew ? '<span class="chips__c"><i style="background:' + v.hex + '"></i>' + esc(L(v.colorName)) + '</span>' : '') + '</p>' +
        '<div class="pbox">' + priceRows + '<p class="pbox__r pbox__r--main"><span>' + t('v.price') + '</span><strong>' + SP.eur(v.price) + '</strong></p>' +
        '<p class="pbox__r"><span class="muted">' + t('c.vat') + (v.model && v.model.pro ? ' · ' + SP.eur(Math.round(v.price / 1.21)) + ' ' + t('c.noVat') : '') + '</span>' + (v.list && v.list > v.price ? '<em class="save">−' + SP.eur(v.list - v.price) + '</em>' : '') + '</p><p class="pbox__st pbox__st--' + v.status + '">' + SP.statusTxt(v) + '</p></div>' +
        '<a class="btn btn--navy btn--block" href="#oferta">' + t('c.reqOffer') + '</a><a class="btn btn--line btn--block" href="programare.html?tip=td' + (v.model ? '&m=' + v.model.id : '') + '">' + t('nav.td') + '</a>' +
        '<div class="advbox"><p class="eyebrow">' + t('v.advisor') + '</p><div class="advbox__r">' + SP.advisorMini(a) + '<span class="advbox__b"><a class="ibtn" href="tel:' + a.phone.replace(/\s/g, '') + '" aria-label="' + t('c.call') + '">' + I('phone') + '</a><a class="ibtn" href="mailto:' + loc.email + '?subject=' + encodeURIComponent(v.id) + '" aria-label="Email">' + I('mail') + '</a></span></div></div>' +
        (v.model ? '<a class="ulink ulink--sm" href="model.html?m=' + v.model.id + '">' + t('v.model') + ': Citroën ' + v.model.short + '</a>' : '') + '</div></div>' +
        '<div class="vd__body"><div><h2 class="h3">' + t('v.specs') + '</h2><dl class="specs">' + specs.map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl>' +
        (trimTxt ? '<h2 class="h3">' + t('m.equip') + ' · ' + v.ver.trim + '</h2><ul class="hist">' + trimTxt.split(' · ').map(x => '<li>' + I('check') + x + '</li>').join('') + '</ul>' : '') +
        '<h2 class="h3">' + t('v.hist') + '</h2><ul class="hist">' + checks.map(c => '<li>' + I('shield') + t(c) + '</li>').join('') + '</ul></div>' +
        '<aside class="fin"><h2 class="h4">' + t('v.fin') + '</h2><p class="muted small">' + t('v.apr') + '</p><label class="slider"><span><b>' + t('v.down') + '</b><em data-fdv></em></span><input type="range" min="0" max="50" step="5" value="20" data-fd aria-label="' + t('v.down') + '"></label>' +
        '<label class="slider"><span><b>' + t('v.term') + '</b><em data-ftv></em></span><input type="range" min="12" max="60" step="12" value="48" data-ft aria-label="' + t('v.term') + '"></label><div class="fin__res"><p class="eyebrow">' + t('v.monthly') + '</p><strong data-fm></strong></div><p class="muted small">' + t('v.finNote') + '</p></aside></div>' +
        '<div class="vd__forms" id="oferta"><div class="fbox"><h2 class="h4">' + t('v.reqT') + '</h2>' + SP.leadForm({ type: 'stock-offer', ctx: v.id, submit: t('c.reqOffer'), message: true }) + '</div><div class="fbox"><h2 class="h4">' + t('v.tdT') + '</h2>' + SP.leadForm({ type: 'testdrive', ctx: v.id, submit: t('nav.td') }) + '</div></div>' +
        '<div class="sec sec--last">' + SP.shead(t('v.similar')) + '<div class="grid3">' + sim.map(SP.stockCard).join('') + '</div></div></section>',
      bind(m) {
        const main = m.querySelector('[data-main]');
        m.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => { const x = imgs[+b.dataset.i]; const im = main.querySelector('img'); im.classList.remove('is-broken'); im.src = big(x); main.classList.toggle('vd__main--cut', x[0] === 'cut'); m.querySelector('[data-credit]').innerHTML = x[0] === 'u' ? SP.credit(x[1]) : ''; m.querySelectorAll('[data-i]').forEach(y => y.classList.toggle('is-on', y === b)); }));
        const fd = m.querySelector('[data-fd]'), ft = m.querySelector('[data-ft]');
        const calc = () => { m.querySelector('[data-fdv]').textContent = fd.value + '% · ' + SP.eur(v.price * fd.value / 100); m.querySelector('[data-ftv]').textContent = ft.value + ' ' + t('v.months'); m.querySelector('[data-fm]').textContent = SP.eur(SP.monthly(v.price, fd.value / 100, +ft.value, APR)); };
        fd.addEventListener('input', calc); ft.addEventListener('input', calc); calc();
      }
    };
  };

  /* ================= SERVICE ================= */
  SP.pages.service = () => ({
    title: t('nav.service'), html: SP.phead(t('sv.eyebrow'), t('sv.title'), t('sv.sub'), '<div class="btnrow"><a class="btn btn--navy" href="programare.html?tip=svc">' + t('sv.book') + '</a><a class="btn btn--line" href="programare.html?tip=dmg">' + t('b.dmg') + '</a></div>') +
      '<section class="wrap sec">' + SP.shead(t('sv.offers')) + '<div class="grid3">' + SP.SERVICE_OFFERS.map(o => '<article class="svcard"><div class="svcard__img">' + SP.img(o.img, 700, L(o.title)) + '<span class="obadge">' + L(o.badge) + '</span></div><div class="svcard__b"><h3>' + L(o.title) + '</h3><p class="muted small">' + L(o.lead) + '</p>' + tlink('programare.html?tip=' + (o.id === 'buyback' ? 'bb' : o.id === 'body' ? 'dmg' : 'svc'), t('nav.book')) + '</div></article>').join('') + '</div></section>' +
      '<section class="wrap sec split" id="recall"><div class="split__txt"><p class="eyebrow">' + t('fab.recall').toUpperCase() + '</p><h2 class="h2">' + t('sv.recallH') + '</h2><p>' + t('sv.recallP') + '</p><form class="recall" data-recall novalidate><label class="sr" for="rvin">VIN</label><input id="rvin" maxlength="17" placeholder="VR7…" aria-label="VIN"><button class="btn btn--navy" type="submit">' + t('sv.recallB') + '</button></form><p class="muted small" data-recallres role="status"></p>' +
      '<h3 class="h4">' + t('sv.assistH') + '</h3><p class="muted">' + t('sv.assistP') + ' <a href="tel:' + SP.DEALER.phone.replace(/\s/g, '') + '"><strong>' + SP.DEALER.phone + '</strong></a></p></div><div class="split__img">' + SP.img(SP.BANNERS.connect, 1100, 'Citroën') + '</div></section>' +
      '<section class="wrap sec"><div class="why"><h2 class="h2">' + t('sv.why') + '</h2><div class="qtiles">' + [['wrench', 'sv.w1'], ['box', 'sv.w2'], ['shield', 'sv.w3'], ['car', 'sv.w4']].map(x => '<div class="qtile qtile--static">' + I(x[0]) + '<span>' + t(x[1]) + '</span></div>').join('') + '</div></div></section>' +
      '<section class="wrap sec sec--last split"><div class="split__txt"><p class="eyebrow">' + t('sv.parts').toUpperCase() + '</p><h2 class="h2">' + t('sv.parts') + '</h2><p>' + t('sv.partsP') + '</p></div><div class="fbox">' +
      SP.leadForm({ type: 'parts', ctx: 'parts', message: true, loc: SP.LOCATIONS[0].id, extra: SP.field('pvin', 'vin', t('b.vin'), '<input id="pvin" name="vin" placeholder="VR7…">', true) }) + '</div></section>',
    bind(m) {
      const f = m.querySelector('[data-recall]');
      f.addEventListener('submit', e => { e.preventDefault(); const i = f.querySelector('input'); if (i.value.trim().length < 11) { i.setAttribute('aria-invalid', ''); i.focus(); return; } i.removeAttribute('aria-invalid'); /* Integration point: GET /api/recalls?vin= → Sales Partner IMS recall campaigns */ m.querySelector('[data-recallres]').textContent = t('sv.recallOk'); });
    }
  });

  /* ================= PROGRAMARE (3 steps) ================= */
  SP.pages.booking = () => {
    const tip = SP.param('tip');
    const b = { step: 1, type: ['td', 'svc', 'bb', 'dmg'].includes(tip) ? tip : 'td', model: SP.model(SP.param('m')) ? SP.param('m') : SP.MODELS[0].id, vin: '', km: '', car: '', year: '', needs: ['n1'], loc: SP.LOCATIONS[0].id, day: null, time: null, notes: '', name: '', phone: '', email: '', gdpr: false, ref: null };
    const days = []; const d0 = new Date(); d0.setHours(12, 0, 0, 0);
    for (let i = 1; days.length < 12; i++) { const d = new Date(d0); d.setDate(d0.getDate() + i); if (d.getDay() !== 0) days.push(d.toISOString().slice(0, 10)); }
    const TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    const busy = (di, ti) => (di * 5 + ti * 3) % 7 === 0;
    const STEPS = ['b.s1', 'b.s2', 'b.s3'];
    const TYPES = [['td', 'wheel'], ['svc', 'wrench'], ['bb', 'swap'], ['dmg', 'shield']];
    const pick = (k, v, title, desc, ic) => '<button type="button" class="pick' + (b[k] === v ? ' is-on' : '') + '" data-pick="' + k + '" data-v="' + v + '">' + (ic ? I(ic) : '') + '<strong>' + title + '</strong>' + (desc ? '<small>' + desc + '</small>' : '') + '</button>';
    const inp = (k, label, type, ph) => '<div class="field"><label for="b_' + k + '">' + label + '</label><input id="b_' + k + '" data-b="' + k + '" type="' + (type || 'text') + '" value="' + esc(b[k]) + '"' + (ph ? ' placeholder="' + ph + '"' : '') + '></div>';
    const vehLbl = () => b.type === 'td' ? 'Citroën ' + SP.model(b.model).short : b.type === 'bb' ? (b.car || '—') + (b.year ? ' · ' + b.year : '') : (b.vin || '—');
    const summary = () => [[t('b.type'), t('b.' + b.type)], [t('b.vehicle'), vehLbl()], [t('b.loc'), SP.loc(b.loc).name], [t('b.when'), b.day ? SP.date(b.day, { weekday: 'short', day: 'numeric', month: 'short' }) + (b.time ? ', ' + b.time : '') : '—'], [t('b.name'), b.name || '—']];
    const body = () => {
      if (b.step === 4) return '<div class="bdone"><span class="done__i">' + I('check') + '</span><h2 class="h2">' + t('b.doneT') + '</h2><p class="muted">' + t('b.doneP') + '</p><p class="bdone__ref"><small>' + t('b.ref') + '</small><strong>' + b.ref + '</strong></p><dl class="specs specs--1">' + summary().map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl>' +
        '<p class="note note--sm">' + I('box') + t('b.int') + '</p><div class="btnrow btnrow--c"><button type="button" class="btn btn--navy" data-bnew>' + t('b.new') + '</button><a class="btn btn--line" href="index.html">' + t('b.home') + '</a></div></div>';
      let h = '';
      if (b.step === 1) {
        h = '<h3 class="bq">' + t('b.what') + '</h3><div class="picks picks--4">' + TYPES.map(x => pick('type', x[0], t('b.' + x[0]), t('b.' + x[0] + 'D'), x[1])).join('') + '</div>';
        if (b.type === 'td') h += '<div class="field field--full"><label for="b_model">' + t('b.model') + ' *</label><select id="b_model" data-b="model">' + SP.MODELS.map(m => opt(m.id, 'Citroën ' + m.name, b.model)).join('') + '</select></div><div class="tdcar">' + SP.img(SP.model(b.model).card, 700, SP.model(b.model).name) + '</div>';
        else if (b.type === 'bb') h += '<div class="fgrid">' + inp('car', t('b.car') + ' *', 'text', 'ex. Volkswagen Golf') + inp('year', t('b.year'), 'number', '2020') + inp('km', t('b.km'), 'number', '85000') + '</div>';
        else h += '<div class="fgrid">' + inp('vin', t('b.vin') + ' *', 'text', 'VR7… / B 00 SPA') + inp('km', t('b.km'), 'number', '45000') + '</div>' + (b.type === 'svc' ? '<h3 class="bq">' + t('b.needs') + '</h3><div class="cbgrid">' + ['n1', 'n2', 'n3', 'n4', 'n5'].map(n => '<label class="cbx cbx--box"><input type="checkbox" data-need="' + n + '"' + (b.needs.includes(n) ? ' checked' : '') + '><span>' + t('b.' + n) + '</span></label>').join('') + '</div>' : '');
      } else if (b.step === 2) {
        h = '<h3 class="bq">' + t('b.loc') + '</h3><div class="picks picks--3">' + SP.LOCATIONS.map(l => pick('loc', l.id, l.city, l.address, 'pin')).join('') + '</div>' +
          '<h3 class="bq">' + t('b.day') + '</h3><div class="days">' + days.map(d => '<button type="button" class="day' + (b.day === d ? ' is-on' : '') + '" data-day="' + d + '"><small>' + SP.date(d, { weekday: 'short' }) + '</small><strong>' + new Date(d + 'T12:00:00').getDate() + '</strong><small>' + SP.date(d, { month: 'short' }) + '</small></button>').join('') + '</div>' +
          '<h3 class="bq">' + t('b.time') + '</h3><div class="times">' + TIMES.map((x, ti) => { const di = days.indexOf(b.day), bz = di < 0 || busy(di, ti); return '<button type="button" class="time' + (b.time === x ? ' is-on' : '') + '" data-time="' + x + '"' + (bz ? ' disabled' : '') + '>' + x + (di >= 0 && bz ? '<small>' + t('b.busy') + '</small>' : '') + '</button>'; }).join('') + '</div>' +
          '<div class="field field--full"><label for="b_notes">' + t('b.notes') + '</label><textarea id="b_notes" data-b="notes" rows="2">' + esc(b.notes) + '</textarea></div>';
      } else {
        h = '<div class="fgrid"><div class="field field--full"><label for="b_name">' + t('b.name') + ' *</label><input id="b_name" data-b="name" autocomplete="name" value="' + esc(b.name) + '" placeholder="' + t('f.namePh') + '"></div>' + inp('phone', t('b.phone') + ' *', 'tel', t('f.phonePh')) + inp('email', t('b.email') + ' *', 'email', t('f.emailPh')) + '</div>' +
          '<label class="check"><input type="checkbox" data-b="gdpr"' + (b.gdpr ? ' checked' : '') + '><span>' + t('f.gdpr') + ' <a href="legal.html?doc=confidentialitate">' + t('f.privacy') + '</a>.</span></label>';
      }
      return '<p class="bstep">' + t('b.step') + ' ' + b.step + ' ' + t('b.of') + ' 3 · <strong>' + t(STEPS[b.step - 1]) + '</strong></p>' + h + '<p class="err" data-berr role="alert"></p><div class="bnav"><button type="button" class="btn btn--line" data-bprev' + (b.step === 1 ? ' style="visibility:hidden"' : '') + '>' + t('b.prev') + '</button><button type="button" class="btn btn--navy" data-bnext>' + (b.step === 3 ? t('b.submit') : t('b.next')) + '</button></div>';
    };
    const valid = () => b.step === 1 ? (b.type === 'td' ? !!b.model : b.type === 'bb' ? b.car.trim().length >= 3 : b.vin.trim().length >= 5) : b.step === 2 ? !!(b.day && b.time) :
      b.name.trim().length >= 3 && /^[+0-9 ()-]{9,}$/.test(b.phone.trim()) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email.trim()) && b.gdpr;
    return {
      title: t('nav.book'), html: SP.phead(t('b.eyebrow'), t('b.title'), t('b.sub')) + '<section class="wrap blay sec--last"><div class="bcard"><ol class="prog" data-prog></ol><div data-bbody></div></div><aside class="bsum" data-bsum></aside></section>',
      bind(m) {
        const box = m.querySelector('[data-bbody]'), sum = m.querySelector('[data-bsum]');
        const drawSum = () => { sum.hidden = b.step === 4; const l = SP.loc(b.loc); sum.innerHTML = '<h3 class="h4">' + t('b.summary') + '</h3><dl class="specs specs--1">' + summary().map(s => '<div><dt>' + s[0] + '</dt><dd>' + esc(s[1]) + '</dd></div>').join('') + '</dl><div class="bsum__loc"><strong>' + l.name + '</strong><p class="muted small">' + l.address + '</p><a class="small" href="tel:' + l.phone.replace(/\s/g, '') + '">' + l.phone + '</a></div>'; };
        const draw = () => { m.querySelector('[data-prog]').innerHTML = STEPS.map((s, i) => '<li class="' + (b.step > i + 1 ? 'is-done' : b.step === i + 1 ? 'is-on' : '') + '"><span>' + (b.step > i + 1 ? I('check') : i + 1) + '</span><em>' + t(s) + '</em></li>').join(''); box.innerHTML = body(); drawSum(); };
        box.addEventListener('click', e => {
          const p = e.target.closest('[data-pick]'); if (p) { b[p.dataset.pick] = p.dataset.v; draw(); return; }
          const dy = e.target.closest('[data-day]'); if (dy) { b.day = dy.dataset.day; b.time = null; draw(); return; }
          const tm = e.target.closest('[data-time]'); if (tm && !tm.disabled) { b.time = tm.dataset.time; draw(); return; }
          if (e.target.closest('[data-bprev]')) { b.step--; draw(); return; }
          if (e.target.closest('[data-bnew]')) { Object.assign(b, { step: 1, day: null, time: null, ref: null }); draw(); return; }
          if (e.target.closest('[data-bnext]')) {
            if (!valid()) { box.querySelector('[data-berr]').textContent = b.step === 2 ? t('b.errDay') : t('b.err'); return; }
            /* Integration point: POST /api/bookings → Sales Partner (test drive → Lead Collector; service/claims → After-Sales appointments; buy-back → used-car valuation) */
            if (b.step === 3) b.ref = (b.type === 'td' ? 'TD' : b.type === 'bb' ? 'BB' : 'SRV') + '-2026-' + String(Math.floor(1000 + Math.random() * 8999));
            b.step++; draw(); m.querySelector('.blay').scrollIntoView({ behavior: 'smooth' });
          }
        });
        box.addEventListener('input', e => { const k = e.target.dataset.b; if (k) { b[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; if (k === 'model') draw(); else drawSum(); } const n = e.target.dataset.need; if (n) { if (e.target.checked) b.needs.push(n); else b.needs.splice(b.needs.indexOf(n), 1); } });
        draw();
      }
    };
  };

  /* ================= LOCAȚII (3) + LOCAȚIE ================= */
  const hrsTable = (l, k) => '<dl class="hrs">' + l.hours[k].map(h => '<div><dt>' + t('l.' + h[0]) + '</dt><dd>' + (h[1] || t('c.closed')) + '</dd></div>').join('') + '</dl>';
  SP.pages.locations = () => ({
    title: t('nav.locations'), html: SP.phead(t('l.eyebrow'), t('l.title'), t('l.sub')) + '<section class="wrap sec--last"><div class="map map--wide"><iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Bucuresti%20Brasov&z=7&output=embed"></iframe></div><div class="grid3 locs">' + SP.LOCATIONS.map(SP.locCard).join('') + '</div></section>'
  });
  SP.pages.location = () => {
    const l = SP.loc(SP.param('id')) || SP.LOCATIONS[0], stock = SP.STOCK.filter(v => v.loc === l.id).slice(0, 4);
    return {
      title: l.name, html: '<section class="wrap ld"><a class="back" href="locatii.html">' + I('arrowL') + t('l.all') + '</a><p class="eyebrow">' + t('l.eyebrow') + ' · ' + l.city.toUpperCase() + '</p><h1 class="h1">' + l.name + '</h1><div class="ld__grid"><div><div class="ld__img">' + SP.img(l.img, 1100, l.name) + '</div>' +
        '<div class="map map--sm"><iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + mapSrc(l) + '"></iframe></div>' +
        '<div class="ld__info"><div><h2 class="cap">' + t('l.hours') + ' · ' + t('l.sales') + '</h2>' + hrsTable(l, 'sales') + '</div><div><h2 class="cap">' + t('l.hours') + ' · ' + t('l.service') + '</h2>' + hrsTable(l, 'service') + '</div></div>' +
        '<div class="fbox"><h2 class="h4">' + t('l.msg') + '</h2>' + SP.leadForm({ type: 'contact', ctx: l.id, model: SP.MODELS[0].id, message: true }) + '</div></div>' +
        '<aside class="ld__side"><h2 class="cap">' + t('l.contact') + '</h2><p>' + l.address + '</p><p><a href="tel:' + l.phone.replace(/\s/g, '') + '"><strong>' + l.phone + '</strong></a></p><p><a href="mailto:' + l.email + '">' + l.email + '</a></p>' +
        '<div class="btnrow"><a class="btn btn--navy btn--sm" href="tel:' + l.phone.replace(/\s/g, '') + '">' + t('c.call') + '</a><a class="btn btn--line btn--sm" href="https://wa.me/' + l.wa.replace(/\D/g, '') + '" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn--line btn--sm" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(l.address) + '" target="_blank" rel="noopener">' + t('l.dir') + '</a></div><hr>' +
        '<h2 class="cap">' + t('l.services') + '</h2><ul class="svl">' + l.tags.map(x => '<li>' + I('check') + t('tag.' + x) + '</li>').join('') + '</ul><hr><h2 class="cap">' + t('l.team') + '</h2>' + l.team.map(p => SP.advisorMini({ name: p[0], role: p[1] })).join('') +
        '<a class="btn btn--navy btn--block" href="programare.html">' + t('l.book') + '</a></aside></div>' +
        (stock.length ? '<div class="sec sec--last">' + SP.shead(t('l.stock'), '', [t('h.stockAll'), 'stoc.html']) + '<div class="grid4">' + stock.map(SP.stockCard).join('') + '</div></div>' : '') + '</section>'
    };
  };

  /* ================= LEGAL / 404 ================= */
  SP.pages.legal = () => {
    const d = SP.param('doc') || 'termeni', k = { termeni: 'ft.terms', confidentialitate: 'ft.privacy', cookies: 'ft.cookies' }[d] || 'ft.terms';
    const used = [...new Set(SP.STOCK.filter(v => v.photos).flatMap(v => v.photos))];
    return { title: t(k), html: SP.phead(t('lg.title'), t(k)) + '<section class="wrap sec--last prose"><p>' + t('lg.p') + '</p><p>' + t('ft.demo') + '</p><h2 class="h3" id="foto">' + t('lg.photos') + '</h2><p>' + t('lg.photosP') + '</p><ul class="credits">' + used.map(x => '<li>' + SP.credit(x) + '</li>').join('') + '</ul></section>' };
  };
  SP.pages.notfound = () => ({ title: '404', html: SP.phead('404', t('nf.title'), t('nf.p')) + '<section class="wrap sec--last"><a class="btn btn--navy" href="index.html">' + t('b.home') + '</a></section>' });
})();
