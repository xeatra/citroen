# citroen_dealership — Sales Partner Dealer WebKit (Citroën)

Demo website for an authorised Citroën dealer (**Sales Partner Auto**, fictional), part of the same dealer group as `peugeot_dealership`. It uses the **Suzuki POC structure** with the **Citroën C&I** (citroen.ro). Desktop and mobile, RO / EN.

## Scope

| Item | Status |
|---|---|
| Range | All 11 models: C3 / ë-C3, C3 Aircross, C4 / ë-C4, C4 X, C5 Aircross, C5 X, Berlingo, SpaceTourer, Berlingo Van, Jumpy, Jumper |
| Configurator | 5 steps for **C3 / ë-C3** and **new C5 Aircross** (model → powertrain & version → colour → options → summary, finance, quote) |
| Locations | 3: Pantelimon (București), Otopeni, Brașov |
| Languages | RO (default) / EN |
| Group | Group bar links back to `../peugeot_dealership/index.html`; the Peugeot group site links here |

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero banners, range tabs (all / electric / SUV / family / city / vans), stock, configurator band, locations |
| `modele.html` (`?cat=`) | Range with category filter |
| `model.html?m=` | Model page: versions & prices, colours, trims, specs, 3D gallery, stock |
| `configurator.html` (`?m=&v=`) | Configurator (C3, C5 Aircross) with deep link to a version |
| `oferte.html` | Stock deals, financing, service offers |
| `stoc.html`, `vehicul.html?id=` | Stock (15 new, 6 used), filter by location; vehicle page |
| `service.html`, `programare.html` | Service and 4-step booking with location choice |
| `locatii.html`, `locatie.html?id=` | Locations list and detail |
| `legal.html`, `404.html` | Shared pages |

## Structure (from the Suzuki POC)

```
assets/css   site.css (WebKit, Citroën tokens) · citroen.css (C&I overrides + configurator)
assets/js    data.js · i18n.js · core.js · pages.js
assets/fonts manrope-latin(-ext)-wght-normal.woff2 + OFL-Manrope.txt
```

Each page is `<body data-page="…">`; `core.js` renders header/footer, `pages.js` returns `{title, html, bind}` per page.

## C&I

- Colours: red `#DA291C` (CTA pills), text `#3B3938`, blue-grey `#57718A` (links), background `#F9F9F9`.
- Font: **Manrope** (OFL) as a stand-in for the proprietary Citroën Type. Sentence case, bold headlines, pill buttons (radius 70px).
- Wordmark: text "CITROËN" + "Sales Partner Auto · dealer autorizat" (no logo file).

## Images

- Car cut-outs and hero banners are hot-linked from the citroen.ro DAM (`/content/dam/citroen/…`).
- Version × colour renders come from the Citroën Visuel3D server (`visuel3d-secure.citroen.com/V3DImage.ashx`, views 001–004) using each version's LCDV code — see `SP.v3d()` in `data.js`.
- Any broken image falls back to a neutral placeholder.
- For production, replace hot-links with the importer's licensed asset feed.

## Prices

- List prices incl. 21% VAT from the Citroën Romania price lists (05–11/2026). Vans are listed by the importer excl. VAT; the site shows both.
- No promo prices are invented: offers show list price; stock discounts are demo values.
- Configurator option prices follow the price-list option tables (C3, C5 Aircross).

## Integration points

| Area | Demo | Production |
|---|---|---|
| Catalogue | `SP.MODELS`, `SP.OPTIONS` in `data.js` | `GET /api/catalog/{model}` (importer feed) |
| Stock | `SP.STOCK` | DMS stock API |
| Leads (quote, test drive, configurator) | stored locally, toast | CRM lead API |
| Service booking | local | DMS workshop calendar |
| Finance | indicative calculator | captive finance API |

## Notes

- The group links use relative paths (`../peugeot_dealership/`, `../citroen_dealership/`). If the sites are deployed separately, replace them with the deployed URLs in `SP.DEALER.group` (Citroën) and the Citroën entry in `SP.BRANDS` (Peugeot).
- Demo only: `noindex`, fictional dealer data.
