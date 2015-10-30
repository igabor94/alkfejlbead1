# Alkalmazások fejlesztése 1. beadandó

Téma: Családi TODO

# Követelmény-analízis

## Funkcionális elvárások
- Látogatóként regisztráció az oldalra
- Látogatóként bejelentkezés az oldalra
- Felhasználóként a feladatok megtekintése
- Felhasználóként feladat kiírása
- Felhasználóként feladat szerkesztése
- Szülőként feladat törlése
- Főoldalon az alkalmazás ismertetése

## Nem-funkcionális elvárások
- Felhasználóbarát kinézet
- Hatákonyság
- Biztonságos működés: jogosultságok megfelelő ellenőrzése, jelszavak titkosított tárolása

# Használati esetek

![Használati esetek](docs/images/haszneset.png)

# Folyamatok

![Hibabejelentés folyamata](docs/images/folyamatok.png)

# Tervezés

## Oldaltérkép

**Publikus:**

- Főoldal
- Bejelentkezés
- Regisztráció

**Bejelentkezve:**

- Főoldal
- Kijelentkezés
- Feladatok listája
    + új feladat
    + feladat szerkesztése
    + feladat törlése (adminként)

## Végpontok

- GET /: főoldal
- GET /login: bejelentkezés
- POST /login: bejelentkezési adatok feldolgozása
- GET /logout: kijelentkezés
- GET /signup: regisztráció
- POST /signup: regisztrációs adatok feldolgozása
- GET /todos/list: feladatok listázása
- GET /todos/new: új feladat bejegyzése
- POST /todos/new: újonnan bejegyzett adat feldolgozása
- GET /todos/edit/:id: feladat szerkesztése
- POST /todos/edit/:id: szerkesztett adat feldolgozása
- GET /todos/delete/:id: feladat törlése

## Oldalvázlat

![Oldalvázlat](docs/images/mockup.png)

## Adatmodell

![Adatmodell](docs/images/database.png)

## Adatbázisterv

![Adatmodell](docs/images/database.png)

## Állapotdiagram

![Állapotdiagram](http://webprogramozas.inf.elte.hu/alkfejl/state.png)

# Implementáció

## Fejlesztői környezet

- Cloud9, felhőalapú IDE
- Heroku, felhőalapú applikációs platform
- GitHub, online verziókövető rendszer

## Könyvtárstruktúra

- models: adatmodellek
- views: nézetek
- node_modules: szükséges modulok

# Tesztelés

# Felhasználói dokumentáció

## Futtatáshoz ajánlott hardver-, szoftverkonfiguráció

A heroku platform használata javasolt, Cloud9-al és GitHub-al együtt.
Helyileg is futtatható, ehhez további előkészületek szükségesek:

- nodejs (+ npm) telepítése
- ha herokut használunk, a heroku-toolbelt és a git telepítése

A hardverkövetelmények minimálisak.

## Telepítés lépései

Helyi gépen (vagy Cloud9-on):

- git clone https://github.com/horo42/alkfejl-bead.git
- npm install

## Program használata

Az alábbi parancsok egyikével futtatható:
- node index.js
- nodemon index.js (ajánlott)

Illetve Cloud9-on a Run gombbal:
![Futtatás Run gombbal](http://i.imgur.com/bznEhsr.png)