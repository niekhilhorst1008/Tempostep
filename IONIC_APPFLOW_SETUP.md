# 🚀 Ionic Appflow Setup Guide voor TempoStep

Complete stap-voor-stap guide om TempoStep naar Ionic Appflow te uploaden en iOS builds te maken.

**Geschatte tijd:** 30-60 minuten  
**Kosten:** Gratis (14 dagen trial), daarna €29/maand

---

## 📋 Voordat je Begint

### ✅ Checklist - Dit heb je nodig:

- [ ] **Git repository** (GitHub, GitLab, of Bitbucket account)
- [ ] **Node.js** en **npm** geïnstalleerd
- [ ] **Apple Developer Account** ($99/jaar) - voor iOS builds
- [ ] **Email adres** voor Ionic account
- [ ] Je TempoStep project klaar (✅ al klaar!)

---

## 🎯 Stap 1: Maak Ionic Account aan

### 1.1 Ga naar Ionic.io

Bezoek: **https://ionic.io/appflow**

### 1.2 Start 14-dagen gratis trial

1. Klik op **"Start Free Trial"** of **"Get Started"**
2. Kies **"Appflow"** product
3. Vul je gegevens in:
   - Email
   - Wachtwoord
   - Bedrijfsnaam (of eigen naam)
4. Selecteer **"Hobby"** tier ($29/maand na trial)
5. Voer creditcard gegevens in (wordt niet afgeschreven tijdens trial!)
6. Klik **"Start Trial"**

✅ Je hebt nu een Ionic Appflow account!

---

## 🛠️ Stap 2: Installeer Ionic CLI

Open je terminal en voer deze commando's uit:

```bash
# Installeer Ionic CLI globaal
npm install -g @ionic/cli

# Verificatie - moet versie nummer tonen
ionic --version
```

**Verwachte output:** `7.2.0` (of hoger)

---

## 🔗 Stap 3: Push je Code naar Git

Ionic Appflow werkt met Git repositories. Je moet je code eerst uploaden naar GitHub, GitLab, of Bitbucket.

### Optie A: GitHub (AANBEVOLEN)

**Als je nog geen GitHub repository hebt:**

1. **Ga naar GitHub.com** en login
2. **Maak nieuwe repository:**
   - Klik **"+"** → **"New repository"**
   - Naam: `tempostep-app`
   - Visibility: **Private** (aanbevolen)
   - **NIET** initialiseren met README
   - Klik **"Create repository"**

3. **Push je code vanuit je TempoStep project folder:**

```bash
# Ga naar je project directory
cd /pad/naar/tempostep

# Initialiseer git (als nog niet gedaan)
git init

# Voeg alle bestanden toe
git add .

# Maak eerste commit
git commit -m "Initial commit - TempoStep ready for Appflow"

# Voeg GitHub remote toe (vervang YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/tempostep-app.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

**✅ Je code staat nu op GitHub!**

### Optie B: GitLab of Bitbucket

Dezelfde stappen maar dan op GitLab.com of Bitbucket.org

---

## 🔐 Stap 4: Login naar Ionic Appflow via Terminal

```bash
# Login naar Ionic
ionic login
```

**Browser opent automatisch:**
1. Login met je Ionic account
2. Klik **"Authorize"**
3. Terug naar terminal

**✅ Je bent nu ingelogd!**

---

## 📱 Stap 5: Maak App aan in Appflow

### 5.1 Via Terminal (Snelste methode)

```bash
# Ga naar je project directory
cd /pad/naar/tempostep

# Maak nieuwe app aan en link deze
ionic link --create

# Beantwoord de vragen:
# ❓ "What would you like to do?"
# → Selecteer: "Create a new app"

# ❓ "App name:"
# → Type: "TempoStep"

# ❓ "Which git host would you like to use?"
# → Selecteer: "GitHub" (of jouw keuze)

# ❓ "Does the repository exist on GitHub?"
# → Selecteer: "Yes"

# ❓ "Which GitHub repository?"
# → Selecteer je repository: "YOUR_USERNAME/tempostep-app"
```

**✅ App is aangemaakt en gelinkt!**

### 5.2 Via Dashboard (Alternatief)

1. Ga naar **https://dashboard.ionicframework.com**
2. Klik **"New App"**
3. Vul in:
   - **App name:** TempoStep
   - **Git Host:** GitHub
   - Klik **"Continue"**
4. Selecteer je repository: `tempostep-app`
5. Klik **"Create App"**

---

## 📦 Stap 6: Configureer Ionic Appflow Config

### 6.1 Maak `ionic.config.json`

Maak een nieuw bestand in je project root:

```bash
# In je project directory
touch ionic.config.json
```

### 6.2 Voeg configuratie toe

Bewerk `ionic.config.json` met deze inhoud:

```json
{
  "name": "TempoStep",
  "integrations": {
    "capacitor": {}
  },
  "type": "react",
  "id": "HIER_KOMT_JOUW_APP_ID"
}
```

**❓ Waar vind ik mijn App ID?**

```bash
# Terminal toont dit na ionic link commando
# Of check:
ionic config get id

# Of ga naar dashboard.ionicframework.com → TempoStep → Settings → App ID
```

**Voorbeeld van een volledige `ionic.config.json`:**

```json
{
  "name": "TempoStep",
  "integrations": {
    "capacitor": {}
  },
  "type": "react",
  "id": "a1b2c3d4"
}
```

### 6.3 Commit deze wijziging

```bash
git add ionic.config.json
git commit -m "Add Ionic Appflow config"
git push origin main
```

---

## 🍎 Stap 7: Setup iOS Certificaten

### Optie A: Automatisch (AANBEVOLEN - Makkelijkst)

Ionic Appflow kan automatisch je iOS certificaten genereren!

1. **Ga naar Appflow Dashboard:**
   - https://dashboard.ionicframework.com
   - Selecteer **TempoStep** app

2. **Ga naar Certificates:**
   - Left menu → **"Signing Certificates"**
   - Tab: **"iOS"**

3. **Klik "Generate Credentials":**
   - Klik **"Auto-generate Credentials"**
   - Vul in:
     - **Apple ID:** je@email.com
     - **Password:** je Apple ID wachtwoord
     - **Team ID:** vind je op https://developer.apple.com/account → Membership
   - Klik **"Generate"**

4. **Wacht ~2-5 minuten**
   - Appflow genereert alle certificates en provisioning profiles automatisch!

**✅ Certificates zijn klaar!**

### Optie B: Handmatig (Voor gevorderden)

Als je al certificates hebt of zelf wilt maken:

**7.B.1 Download je certificates van Apple Developer:**

1. Ga naar https://developer.apple.com/account
2. Ga naar **"Certificates, Identifiers & Profiles"**
3. Download:
   - **Development Certificate** (.p12 file)
   - **Distribution Certificate** (.p12 file)
   - **Provisioning Profiles** (Development + App Store)

**7.B.2 Upload naar Appflow:**

1. Dashboard → TempoStep → **"Signing Certificates"** → **"iOS"**
2. Klik **"Add Certificate"**
3. Upload je certificate files
4. Vul wachtwoorden in
5. Klik **"Save"**

---

## 🏗️ Stap 8: Maak je Eerste iOS Build!

### 8.1 Ga naar Builds

1. **Dashboard** → TempoStep → **"Builds"** (in left menu)
2. Klik **"New Build"**

### 8.2 Configureer Build

**Build Configuration:**

- **Commit:** Select latest commit (automatisch geselecteerd)
- **Target Platform:** **iOS**
- **Build Type:** **App Store** (voor productie) of **Development** (voor testing)
- **Build Stack:** **Latest** (automatisch)
- **Certificate:** Selecteer je iOS certificate (automatisch als je auto-generated hebt)

**Advanced Options** (optioneel, meestal niet nodig):

- **Live Update Channel:** None
- **Environment:** Production
- **Native Config:** Default

### 8.3 Start Build

1. Klik **"Build"** knop
2. Wacht... ⏳

**Build proces:**
- ⏱️ **Gemiddelde tijd:** 5-15 minuten
- 📊 **Progress:** Je ziet live logs
- ✅ **Success:** Groene status + download knop

### 8.4 Build Statussen

- 🔵 **Pending:** In queue
- 🟡 **Running:** Build is bezig
- 🟢 **Success:** Build succesvol! ✅
- 🔴 **Failed:** Er is iets misgegaan ❌

**Bij Failed:**
- Klik op de build
- Scroll door logs
- Zoek naar rode error messages
- Fix het probleem in je code
- Push nieuwe commit
- Probeer opnieuw

---

## 📥 Stap 9: Download je iOS Build

### 9.1 Download .ipa File

Als build succesvol is:

1. Klik op de **groene build**
2. Klik **"Download"** knop (rechts boven)
3. Save file: `TempoStep.ipa`

**✅ Je hebt nu een iOS app build!**

### 9.2 Test op iPhone (optioneel)

**Met Testflight (aanbevolen):**

Je kunt de .ipa uploaden naar App Store Connect en testen via Testflight.
Zie Stap 10 hieronder.

**Met Apple Configurator (voor gevorderden):**

Als je een Mac hebt, kun je de .ipa direct installeren op een testapparaat.

---

## 📲 Stap 10: Upload naar App Store Connect

### 10.1 Installeer Transporter App (Mac nodig)

**Optie A: Met Mac**

1. Download **Transporter** uit de Mac App Store
2. Login met je Apple ID
3. Sleep `TempoStep.ipa` naar Transporter
4. Klik **"Deliver"**

**Optie B: Ionic Appflow kan direct uploaden!**

Dit is een betaalde feature, maar werkt zonder Mac:

1. Dashboard → TempoStep → Build
2. Klik op je **succesvolle build**
3. Klik **"Deploy to App Store"**
4. Vul App Store Connect credentials in
5. Klik **"Deploy"**

**✅ App is ge-upload naar App Store Connect!**

### 10.2 Configureer App in App Store Connect

1. Ga naar https://appstoreconnect.apple.com
2. Klik **"My Apps"** → **"+"** → **"New App"**

**Vul in:**

- **Platform:** iOS
- **Name:** TempoStep
- **Primary Language:** Dutch (Nederlands) of Engels
- **Bundle ID:** `com.tempostep.app` (moet matchen met Capacitor config)
- **SKU:** `TEMPOSTEP-001` (eigen keuze)
- **User Access:** Full Access

3. Klik **"Create"**

**Vul App Informatie in:**

- **Category:** Music
- **Description:** (Je app beschrijving)
- **Keywords:** metronome, tempo, practice, music
- **Support URL:** Je website
- **Privacy Policy URL:** Je privacy policy

**Screenshots uploaden:**

- iPhone 6.7" display (verplicht)
- iPhone 5.5" display (optioneel)
- iPad Pro 12.9" (als je iPad support hebt)

Je kunt screenshots maken met Xcode Simulator of je eigen iPhone.

4. **Selecteer Build:**
   - Ga naar **"App Store"** tab
   - Sectie: **"Build"**
   - Klik **"+"** (plus icon)
   - Selecteer je ge-uploade build
   - Klik **"Done"**

5. **Submit for Review:**
   - Vul alle verplichte velden in
   - Klik **"Add for Review"**
   - Beantwoord export compliance vragen
   - Klik **"Submit"**

**⏳ Review proces:** 1-3 dagen  
**✅ Als goedgekeurd:** App is live in App Store!

---

## 🔄 Stap 11: Automatische Builds Setup (Optioneel)

### Auto-build bij elke Git push

1. **Dashboard** → TempoStep → **"Automations"**
2. Klik **"New Automation"**

**Configureer:**

- **Name:** Auto iOS Build
- **Git Branch:** `main` (of `master`)
- **Trigger:** Push to branch
- **Build Type:** iOS - App Store
- **Certificate:** (selecteer je iOS cert)

3. Klik **"Create Automation"**

**✅ Nu wordt bij elke push automatisch een iOS build gemaakt!**

---

## 🎛️ Stap 12: Build Configuratie Optimalisatie (Optioneel)

### Environment Variables

Als je API keys of secrets hebt, voeg ze toe als environment variables:

1. **Dashboard** → TempoStep → **"Environments"**
2. Klik **"New Environment"**
3. Name: `Production`
4. Voeg variables toe:

```
API_KEY=your_api_key
APP_VERSION=1.0.0
```

5. Gebruik in builds via **"Environment"** dropdown

---

## ⚙️ Build Scripts Configuratie

### Maak `ionic.config.json` build scripts

Update je `package.json` met Ionic-vriendelijke scripts:

```json
{
  "name": "@figma/my-make-file",
  "version": "1.0.0",
  "scripts": {
    "build": "vite build",
    "ionic:build": "npm run build",
    "ionic:serve": "vite"
  }
}
```

**Commit deze wijziging:**

```bash
git add package.json
git commit -m "Add Ionic build scripts"
git push origin main
```

---

## 📊 Stap 13: Monitor je Builds

### Dashboard Overzicht

**Handige features in Appflow Dashboard:**

1. **Build History:**
   - Zie al je builds
   - Download oude versies
   - Check logs

2. **Live Updates** (advanced feature):
   - Push web updates zonder app store review
   - Alleen voor web content, niet voor native code

3. **Deploy to Store:**
   - Direct uploaden naar App Store
   - Geen Mac nodig!

4. **Analytics:**
   - Zie hoeveel builds je gebruikt hebt
   - Monitor build times

---

## ❓ Troubleshooting

### Build Failed - Common Errors

#### Error: "No provisioning profile found"

**Oplossing:**
```bash
# Regenerate certificates in Appflow dashboard
Dashboard → Signing Certificates → iOS → Auto-generate Credentials
```

#### Error: "npm install failed"

**Oplossing:**
```bash
# Zorg dat package.json en package-lock.json in sync zijn
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

#### Error: "Capacitor not found"

**Oplossing:**

Install Capacitor CLI in je project:

```bash
npm install @capacitor/cli @capacitor/core @capacitor/ios
git add package.json
git commit -m "Add Capacitor dependencies"
git push
```

#### Error: "Build timed out"

**Oplossing:**

Builds hebben een time-limit (30 min op Hobby tier). Als je build te lang duurt:

1. Check of je geen grote files in je repo hebt
2. Verwijder `node_modules` uit Git (moet in `.gitignore` staan)
3. Optimize je build process

### Git Issues

#### "Repository not found"

**Oplossing:**
```bash
# Relink je app
ionic link

# Of manual:
# Dashboard → TempoStep → Settings → Repository → Reconnect
```

### Certificate Issues

#### "Certificate expired"

**Oplossing:**

Apple certificates verlopen na 1 jaar. Regenerate ze:

```bash
# In Appflow dashboard:
Signing Certificates → iOS → Delete old → Auto-generate new
```

---

## 💰 Kosten Overzicht

### Ionic Appflow Pricing

**Hobby Tier:** $29/maand
- 500 builds per maand
- 1 concurrent build
- 5GB storage
- Email support

**Launch Tier:** $69/maand
- 10,000 builds per maand
- 2 concurrent builds
- 25GB storage
- Priority support
- Deploy to store feature

**Growth Tier:** $169/maand
- Unlimited builds
- 5 concurrent builds
- 100GB storage
- Premium support

**14-dagen gratis trial - geen creditcard charge tijdens trial!**

### Extra Kosten (buiten Appflow)

- **Apple Developer Program:** $99/jaar (verplicht voor iOS)
- **Domain/hosting:** (als je die hebt)

**Totaal eerste jaar:**
- Appflow: $29/maand = €348/jaar
- Apple: €99/jaar
- **Total: ~€450/jaar**

**Of gebruik GitHub Actions (gratis) na eerste build met Appflow trial!**

---

## 🎯 Quick Reference - Commands Cheatsheet

```bash
# Login
ionic login

# Link app
ionic link

# Check config
ionic config get

# Push code (standard Git)
git add .
git commit -m "Update"
git push origin main

# Monitor builds
# Ga naar: dashboard.ionicframework.com

# Logout
ionic logout
```

---

## ✅ Checklist - Ben je Klaar voor Launch?

- [ ] Ionic Appflow account aangemaakt
- [ ] App aangemaakt en gelinkt in Appflow
- [ ] Code gepushed naar Git repository
- [ ] iOS certificates geconfigureerd (auto of manual)
- [ ] Eerste build succesvol gemaakt
- [ ] .ipa bestand gedownload
- [ ] App Store Connect account setup
- [ ] App aangemaakt in App Store Connect
- [ ] Screenshots en metadata toegevoegd
- [ ] Build ge-upload naar App Store Connect
- [ ] App submitted for review

**🎉 Als alles aangevinkt is: Je bent klaar voor launch!**

---

## 🔗 Belangrijke Links

- **Ionic Appflow Dashboard:** https://dashboard.ionicframework.com
- **Ionic Appflow Docs:** https://ionic.io/docs/appflow
- **Apple Developer:** https://developer.apple.com
- **App Store Connect:** https://appstoreconnect.apple.com
- **Ionic Support:** https://ionic.io/support

---

## 🆘 Hulp Nodig?

**Ionic Support:**
- Docs: https://ionic.io/docs
- Forum: https://forum.ionicframework.com
- Discord: https://ionic.link/discord

**Dit project:**
- Check andere guides in deze repo
- IOS_SETUP_GUIDE.md
- PUBLISHING_CHECKLIST.md

---

## 🎉 Volgende Stappen

Na je eerste succesvolle build:

1. **Test de app** via Testflight
2. **Gather feedback** van beta testers
3. **Fix bugs** als die gevonden worden
4. **Submit to App Store** voor review
5. **Launch!** 🚀

**Optioneel:**
- Setup **automations** voor auto-builds
- Enable **Live Updates** voor snelle fixes
- Configure **Native plugins** als je die nodig hebt
- Setup **Analytics** om usage te tracken

---

**Gemaakt voor TempoStep** 🎵  
**Veel succes met je iOS launch!** 🚀
