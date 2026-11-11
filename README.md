# Atmos Dom

**Atmos Dom** je web aplikacija (PWA) za praćenje troškova domaćinstva: računi za struju, kiriju, internet, telefone, pretplate, poreze, kao i rokovi dokumenata, garancije, članarine i važni datumi. Radi u pregledaču, može da se instalira na telefon ili računar i funkcioniše i bez interneta.

Svi podaci se čuvaju lokalno na uređaju — nema naloga, servera ni praćenja.

## Mogućnosti

- **Računi** — struja, voda i komunalije, grejanje, gas, kirija / rata, internet / TV, telefon, pretplate, porezi, osiguranje, članarine, zdravlje i ostalo
  - iznos, datum računa, rok plaćanja, status plaćeno / neplaćeno
  - ponavljajući računi (mesečno, na 2 / 3 / 6 meseci, godišnje) — nakon plaćanja se sam pravi sledeći
- **Rokovi** — isteci dokumenata, garancije (datum isteka se računa iz datuma kupovine i broja meseci), članarine, važni datumi, podsetnici
- **Članovi domaćinstva** — svaki račun i rok pripada jednom članu; filter „Svi članovi“ ili pojedinačno
- **Pregledi i izveštaji** — mesec, 3 meseca, 6 meseci i godina, sa listanjem prethodnih perioda; grafikon po mesecima, raspodela po kategorijama, poređenje sa prethodnim periodom, troškovi po članovima
- **OCR skeniranje računa** 📷 — prepoznaje iznos, datume, rok plaćanja, izdavaoca i kategoriju (ćirilica i latinica); rezultat se uvek proverava u formi pre čuvanja
- **Deljenje** — spisak neplaćenih računa, pojedinačni račun ili izveštaj preko menija za deljenje; kopija podataka kao fajl
- **Uvoz / izvoz** — JSON (rezervna kopija, uvoz sa spajanjem ili zamenom), CSV za Excel, štampa
- **Podsetnici i obaveštenja** — upozorenja pre isteka roka, broj stavki na ikonici aplikacije (gde je podržano)
- **Teme** — tamna, svetla ili automatska, izbor boje akcenta i veličine teksta
- **Interne rezervne kopije** — automatski jednom dnevno, uz mogućnost vraćanja

## Instalacija i pokretanje

Aplikacija je statična — nema build koraka ni zavisnosti.

1. Postavi fajlove u isti folder na bilo koji hosting sa **https** (npr. GitHub Pages, Netlify, Cloudflare Pages):
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
2. Otvori adresu u Chrome-u ili Edge-u.
3. Izaberi **Instaliraj aplikaciju** (računar) ili **Dodaj na početni ekran** (telefon).

### GitHub Pages

1. Okači fajlove u repozitorijum.
2. `Settings → Pages → Deploy from a branch → main / (root)`.
3. Aplikacija je dostupna na `https://<korisnik>.github.io/<repozitorijum>/`.

### Lokalno testiranje

```bash
python3 -m http.server 8080
```

Zatim otvori `http://localhost:8080`. Service worker i instalacija rade na `localhost`, ali ne preko `file://`.

## Privatnost i podaci

- Podaci se čuvaju u `localStorage` pregledača na tvom uređaju.
- Članovi domaćinstva su profili unutar aplikacije, a ne nalozi na serveru.
- Za deljenje podataka između uređaja koristi **Podeli kopiju** i **Uvezi → spoji**.
- Redovno pravi rezervnu kopiju (izvoz). Brisanje podataka pregledača briše i podatke aplikacije.
- OCR koristi [Tesseract.js](https://github.com/naptha/tesseract.js) učitan sa CDN-a; prvi put je potreban internet (jezički paket ~10 MB, zatim se pamti). Slika računa se obrađuje u pregledaču i ne šalje se nigde.

## Tehnologije

HTML, CSS i JavaScript bez okvira, Service Worker, Web App Manifest, Web Share API, Notifications API, Tesseract.js (OCR).

## Autor

**Gemb-Bit Željko Ilić**

Ako Vam se dopadaju moje aplikacije i želite da uplatite neki simboličan iznos za kafu ili ručak :D 
Možete donirati na račun: 115000000006810143 Željko Ilić, Beograd. 
Hvala!

## Licenca

Aplikaciju moižete slobodno koristiti uz uslov da ostavite credits link ka autoru - ako radite clone.

Ako Vam se dopadaju moje aplikacije i želite da platite kafu ili ručak :D Možete donirati na račun: 115000000006810143 Željko Ilić, Beograd. 
Hvala!
