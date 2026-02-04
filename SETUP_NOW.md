# 🚀 Let's Go! - TempoStep iOS Launch Setup

**We gaan nu samen je app naar iOS brengen!**

Volg deze stappen precies en binnen 30-60 minuten heb je je eerste iOS build! 🎉

---

## ✅ STAP 1: Voorbereiding Check (2 minuten)

### Check of je dit hebt:

- [ ] Node.js geïnstalleerd (check: `node --version`)
- [ ] Git geïnstalleerd (check: `git --version`)
- [ ] Je TempoStep project folder
- [ ] GitHub account (gratis op github.com)
- [ ] Email adres voor Ionic account
- [ ] Creditcard (voor trial, wordt NIET afgeschreven!)

### Test Commands:

Open je terminal en voer uit:

```bash
# Check Node.js
node --version
# Moet iets zoals v18.x.x of v20.x.x tonen

# Check Git
git --version
# Moet iets zoals git version 2.x.x tonen

# Check npm
npm --version
# Moet iets zoals 9.x.x of 10.x.x tonen
```

**✅ Als alle commands werken → GA VERDER!**  
**❌ Als iets niet werkt → Installeer eerst Node.js van nodejs.org**

---

## 🎯 STAP 2: Installeer Ionic CLI (2 minuten)

```bash
# Installeer Ionic CLI globaal
npm install -g @ionic/cli

# Wacht tot het klaar is...
# Dit kan 1-2 minuten duren

# Check of het werkt
ionic --version
# Moet versie nummer tonen (bijv. 7.2.0)
```

**✅ Ziet er goed uit? → GA VERDER!**

---

## 🔐 STAP 3: Maak Ionic Account (5 minuten)

### 3A: Ga naar Ionic Appflow

1. **Open in browser:** https://ionic.io/appflow
2. Klik op **"Start Free Trial"** of **"Get Started"**

### 3B: Registreer

**Vul in:**
- Email: je@email.com
- Password: (maak sterk wachtwoord)
- First Name: (jouw naam)
- Last Name: (jouw achternaam)
- Company: (of eigen naam als je geen bedrijf hebt)

### 3C: Kies Plan

- Selecteer: **"Hobby"** tier
- Prijs: $29/maand **NA 14-dagen trial**
- Klik **"Start Free Trial"**

### 3D: Betaling Info

- Voer creditcard gegevens in
- ⚠️ **LET OP:** Wordt NIET afgeschreven tijdens trial!
- ⚠️ **REMINDER:** Zet reminder in je agenda voor dag 13 om te cancellen!

### 3E: Email Verificatie

- Check je email inbox
- Klik op verificatie link
- Login op dashboard.ionicframework.com

**✅ Account klaar? → GA VERDER!**

---

## 📦 STAP 4: Push Code naar GitHub (5-10 minuten)

### Optie A: Als je AL een GitHub repo hebt

**Skip naar STAP 5!** ✅

### Optie B: Nieuwe GitHub Repository Maken

#### 4B.1: Maak Repository op GitHub

1. Ga naar **https://github.com**
2. Login (of maak account als je die nog niet hebt)
3. Klik **"+"** (rechts boven) → **"New repository"**

**Vul in:**
- Repository name: `tempostep-app`
- Description: "TempoStep - Progressive Metronome App"
- Visibility: **Private** (aanbevolen)
- **NIET** aanvinken: "Initialize with README"
- Klik **"Create repository"**

**✅ Repository aangemaakt!**

#### 4B.2: Link je Project aan GitHub

**In je terminal, GA naar je TempoStep project folder:**

```bash
# Navigeer naar je project (pas dit aan naar jouw pad!)
cd /pad/naar/je/tempostep/project

# Check of je in de juiste folder zit
ls
# Je moet zien: package.json, src/, public/, etc.

# Check of git al geïnitialiseerd is
git status

# Als je error krijgt "not a git repository":
git init

# Voeg alle files toe
git add .

# Maak eerste commit
git commit -m "Initial commit - Ready for Ionic Appflow"

# Voeg GitHub remote toe (VERVANG YOUR_USERNAME met jouw GitHub username!)
git remote add origin https://github.com/YOUR_USERNAME/tempostep-app.git

# Push naar GitHub
git branch -M main
git push -u origin main
```

**Mogelijk wordt om username + password gevraagd:**
- Username: jouw GitHub username
- Password: gebruik **Personal Access Token** (niet je gewone password!)

**Personal Access Token maken:**
1. GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Give it a name → Check "repo" scope
3. Generate → Copy token
4. Gebruik dit als password in terminal

**✅ Code op GitHub? Check: https://github.com/YOUR_USERNAME/tempostep-app**

---

## 🔗 STAP 5: Login Ionic CLI (2 minuten)

```bash
# Login naar Ionic
ionic login

# Browser opent automatisch
```

**In browser:**
1. Login met je Ionic account (email + password)
2. Klik **"Authorize"**
3. Je ziet: "You may now close this window"
4. Ga terug naar terminal

**In terminal zie je:**
```
✔ You are logged in!
```

**✅ Ingelogd? → GA VERDER!**

---

## 📱 STAP 6: Link App aan Appflow (3 minuten)

```bash
# Zorg dat je in je project folder zit
pwd
# Moet je project path tonen

# Link app
ionic link
```

**Beantwoord de vragen:**

### Vraag 1: "What would you like to do?"
```
→ Gebruik pijltjestoetsen om te selecteren
→ Kies: "Create a new app"
→ Druk ENTER
```

### Vraag 2: "Please enter a name for your app:"
```
→ Type: TempoStep
→ Druk ENTER
```

### Vraag 3: "Which git host would you like to use?"
```
→ Kies: "GitHub"
→ Druk ENTER
```

### Vraag 4: "Does the repository exist on GitHub?"
```
→ Kies: "Yes"
→ Druk ENTER
```

### Vraag 5: "Which GitHub repository?"
```
→ Je ziet lijst van je repositories
→ Selecteer: YOUR_USERNAME/tempostep-app
→ Druk ENTER
```

**Terminal toont:**
```
✔ App created
✔ App linked

Your app is now linked to Appflow!
App ID: abc123def456
```

**✅ App gelinkt! Noteer je App ID!**

---

## 📝 STAP 7: Verifieer Setup (1 minuut)

```bash
# Check je Ionic config
ionic config get

# Je moet zien:
# {
#   "name": "TempoStep",
#   "type": "react",
#   "id": "abc123def456"
# }
```

**✅ Ziet goed uit? → GA VERDER!**

---

## 🎯 STAP 8: Ga naar Appflow Dashboard (2 minuten)

1. **Open browser:** https://dashboard.ionicframework.com
2. **Login** met je Ionic account (als je dat nog niet bent)
3. Je ziet je **"TempoStep"** app!
4. **Klik** op TempoStep

**Je bent nu in het Appflow dashboard!** 🎉

**Verifieer dat je dit ziet:**
- Left sidebar met menu items
- "Builds", "Deploys", "Automations", etc.
- Overview page met je app info

**✅ Dashboard open? → GA VERDER!**

---

## 🍎 STAP 9: Setup iOS Certificaten (10-15 minuten)

**DIT IS DE BELANGRIJKSTE STAP!**

### 9A: Check Apple Developer Account

**Heb je al een Apple Developer Account ($99/jaar)?**

**❌ NEE? → Je MOET dit eerst doen:**
1. Ga naar https://developer.apple.com
2. Klik "Account"
3. Sign in met je Apple ID
4. Klik "Join the Apple Developer Program"
5. Betaal $99/jaar
6. Wacht op approval (kan 24 uur duren)

⚠️ **ZONDER Apple Developer Account kun je GEEN iOS apps maken!**

**✅ JA? → GA VERDER!**

### 9B: Vind je Team ID

1. Ga naar https://developer.apple.com/account
2. Login met je Apple ID
3. Klik op **"Membership"** (in sidebar)
4. Je ziet **"Team ID"** (bijv. ABC123XYZ)
5. **NOTEER DEZE!** Je hebt hem zo nodig

### 9C: Auto-Generate Certificaten in Appflow

**Terug naar Appflow Dashboard:**

1. **TempoStep app** → Left sidebar → **"Signing Certificates"**
2. Click tab: **"iOS"**
3. Klik button: **"Auto-generate Credentials"**

**Popup verschijnt - vul in:**

- **Apple ID:** je@appleid.com (je Apple Developer account email)
- **Password:** je Apple ID wachtwoord
- **Team ID:** ABC123XYZ (die je net noteerde)

4. Klik **"Generate"**

**Status verandert naar:**
```
🔄 Generating credentials...
```

⏳ **WACHT 2-5 MINUTEN** (Appflow praat met Apple servers)

**Als succesvol:**
```
✅ iOS Distribution Certificate
✅ iOS Development Certificate  
✅ Provisioning Profiles
```

**✅ Certificaten klaar? → GA VERDER!**

### 9D: Troubleshooting Certificaten

**Als je error krijgt:**

#### Error: "Invalid credentials"
- Check of Apple ID + password correct zijn
- Check of je Apple Developer Program actief is ($99 betaald)

#### Error: "Team not found"
- Check Team ID opnieuw op developer.apple.com/account
- Moet exact hetzelfde zijn (hoofdlettergevoelig!)

#### Error: "Two-factor authentication"
- Mogelijk moet je app-specific password gebruiken:
  1. Ga naar appleid.apple.com
  2. Security → App-Specific Passwords
  3. Generate new password
  4. Gebruik dit ipv je normale password

---

## 🏗️ STAP 10: Maak je Eerste Build! (10-15 minuten)

### 10A: Ga naar Builds

**In Appflow Dashboard:**
1. Left sidebar → **"Builds"**
2. Klik **"New Build"** (grote button rechts boven)

### 10B: Configureer Build

**Build Configuration popup:**

- **Commit:** (automatisch geselecteerd - latest commit)
- **Target Platform:** Selecteer **"iOS"**
- **Build Type:** Selecteer **"App Store"** (voor productie)
- **Certificate:** Moet automatisch geselecteerd zijn (als je er maar 1 hebt)

**Advanced opties (laat default):**
- Build Stack: Latest
- Live Update Channel: None
- Environment: Production

### 10C: Start Build

1. Klik **"Build"** button (rechts onder)
2. Popup sluit
3. Je ziet nieuwe build in lijst met status **"Pending"**

### 10D: Watch Build Progress

**Build gaat door verschillende fases:**

```
🔵 Pending (0-2 min)
    ↓
🟡 Running (5-15 min)
    ↓ Building iOS app...
    ↓ Installing dependencies...
    ↓ Compiling React...
    ↓ Syncing Capacitor...
    ↓ Building Xcode project...
    ↓ Signing app...
    ↓
🟢 Success! ✅
```

**Klik op de build om live logs te zien!**

⏳ **WACHT 5-15 MINUTEN...**

**Grab een koffie! ☕**

### 10E: Als Build Succesvol

**Je ziet:**
- ✅ Groene status
- ✅ "Success" badge
- ✅ Download button

**✅ SUCCESS! Je hebt een iOS app! 🎉**

### 10F: Als Build Failed

**Rode status ❌ - Don't panic!**

**Check de logs:**
1. Klik op de failed build
2. Scroll door de logs
3. Zoek naar rode error messages (meestal onderaan)

**Common errors:**

#### "No provisioning profile"
→ Ga terug naar Step 9C, regenerate certificaten

#### "npm install failed"
→ Mogelijk dependency issue. In terminal:
```bash
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push origin main
# Try new build
```

#### "@capacitor/cli not found"
→ Missing Capacitor. Install het:
```bash
npm install @capacitor/cli @capacitor/core @capacitor/ios
git add package.json
git commit -m "Add Capacitor"
git push origin main
# Try new build
```

**Fix error → Push → Try new build!**

---

## 📥 STAP 11: Download iOS App (2 minuten)

### 11A: Download .ipa File

**Als build succesvol (groen):**

1. Klik op **groene build** in lijst
2. Rechts boven zie je **"Download"** button
3. Klik **"Download"**
4. File wordt gedownload: `TempoStep.ipa` (of `App.ipa`)
5. Save het ergens veilig (bijv. Desktop of Documents folder)

**✅ .ipa bestand gedownload!**

### 11B: Verifieer .ipa File

**Check file size:**
- Moet ongeveer 20-50 MB zijn
- Als het 0 KB is → corrupt, download opnieuw

**✅ File looks good? → GA VERDER!**

---

## 📲 STAP 12: Upload naar App Store Connect (20-30 minuten)

**Nu moeten we de .ipa uploaden naar Apple!**

### Optie A: Met een Mac (Makkelijkst)

**Als je een Mac kunt lenen voor 10 minuten:**

1. **Download Transporter app** (gratis in Mac App Store)
2. **Open Transporter**
3. **Login** met je Apple ID
4. **Sleep** `TempoStep.ipa` naar Transporter window
5. Klik **"Deliver"**
6. Wacht ~5 minuten
7. **DONE!** ✅

### Optie B: Via Appflow (Betaald feature)

**Ionic Appflow kan direct uploaden (Launch tier of hoger):**

Dashboard → Build → **"Deploy to App Store"**

### Optie C: Via Freelancer (€10-20)

**Fiverr.com → Search: "upload ipa to app store"**

### Optie D: Via GitHub Actions (Later setup)

**We gaan dit in STAP 13 configureren!**

---

## 🍎 STAP 13: Setup App in App Store Connect (30 minuten)

### 13A: Ga naar App Store Connect

1. **Open:** https://appstoreconnect.apple.com
2. **Login** met je Apple ID
3. Klik **"My Apps"**

### 13B: Maak Nieuwe App

1. Klik **"+"** button (links boven bij "My Apps")
2. Selecteer **"New App"**

**Vul formulier in:**

- **Platform:** iOS (checkbox aanvinken)
- **Name:** TempoStep
- **Primary Language:** Nederlands (of English)
- **Bundle ID:** Selecteer `com.tempostep.app` (uit dropdown)
  - Als je hem niet ziet → Check capacitor.config.ts voor appId
- **SKU:** TEMPOSTEP001 (eigen keuze, moet uniek zijn voor jou)
- **User Access:** Full Access

3. Klik **"Create"**

**✅ App aangemaakt!**

### 13C: Vul App Information

**Je bent nu op de app pagina. Vul deze tabs in:**

#### Tab: "App Information"

- **Category:** Music
- **Subcategory (optional):** (laat leeg of kies "Utilities")

#### Tab: "Pricing and Availability"

- **Price:** Free (of kies prijs)
- **Availability:** All countries

#### Screenshot: Privacy Policy URL

Je hebt een Privacy Policy nodig!

**Optie 1: Gebruik generator:**
- https://www.privacypolicygenerator.info
- Vul formulier in
- Download/host HTML
- Vul URL in

**Optie 2: Gebruik template:**
```
https://jouwwebsite.com/privacy-policy

Als je geen website hebt: 
Host het op GitHub Pages (gratis!)
```

### 13D: Maak Eerste App Version

1. Left sidebar → **"App Store"** tab
2. Sectie: **"iOS App"**
3. Je ziet: **"1.0 Prepare for Submission"**
4. Klik erop

**Vul in:**

#### Screenshots (VERPLICHT!)

Je hebt screenshots nodig van verschillende iPhone sizes:

**Minimum required:**
- iPhone 6.7" display (iPhone 14 Pro Max, 15 Pro Max)
  - Size: 1290 x 2796 pixels
  - Minimaal 3 screenshots
  
**Hoe screenshots maken:**

**Optie A: Met echte iPhone**
- Open je PWA (add to home screen)
- Take screenshots
- Airdrop naar Mac
- Upload

**Optie B: Met iPhone Simulator (Mac)**
- Open Xcode
- Window → Devices and Simulators
- Open iPhone 15 Pro Max simulator
- Open Safari → je PWA URL
- Screenshot (Cmd + S)

**Optie C: Use mockups**
- https://mockuphone.com
- Upload screenshot van je PWA
- Download iPhone frame screenshots

**Optie D: Later toevoegen**
- Je kunt ook screenshots toevoegen nadat build is uploaded
- Maar je hebt ze nodig voor submission!

#### Promotional Text (optional)
```
Professionele metronoom app voor muzikanten
```

#### Description (VERPLICHT)
```
TempoStep is een geavanceerde metronoom app speciaal ontworpen voor muzikanten die hun timing willen verbeteren.

Features:
• Instelbaar tempo (30-300 BPM)
• Verschillende maatsoorten
• Accent patronen
• Progressieve tempo functie
• Visuele metronoom indicator
• Clean, minimalistisch design
• Offline beschikbaar

Perfect voor:
- Oefensessies
- Live performances
- Muziekonderwijs
- Professionele musici
- Beginners

TempoStep helpt je om constante ritmes te ontwikkelen en je muzikale timing te perfectioneren.
```

#### Keywords (VERPLICHT)
```
metronome,tempo,music,practice,rhythm,timing,beat,musician,instrument
```
(Max 100 characters, comma separated)

#### Support URL (VERPLICHT)
```
https://jouwwebsite.com/support
of je GitHub repo URL
```

#### Marketing URL (optional)
```
https://jouwwebsite.com
```

### 13E: Link Build

**DIT KAN JE PAS ALS JE .ipa UPLOADED HEBT!**

Als je de .ipa al uploaded hebt via Transporter:

1. Scroll naar **"Build"** sectie
2. Klik **"+"** (plus icon) naast Build
3. Je ziet je uploaded build (kan 5-10 min duren na upload)
4. Selecteer de build
5. Klik **"Done"**

**Als je build niet verschijnt:**
- Wacht 10-15 minuten na upload
- Refresh de pagina
- Check of upload succesvol was

### 13F: App Review Information

**Vul in:**

- **First Name:** (jouw naam)
- **Last Name:** (jouw achternaam)
- **Phone Number:** (jouw telefoon)
- **Email:** (jouw email)

**Notes for review (optional):**
```
TempoStep is a metronome app for musicians.
All features work offline and no login is required.
The app uses Web Audio API for precise timing.
```

### 13G: Version Release

- **Automatically release this version:** (aanvinken)
  OF
- **Manually release this version:** (als je controle wilt)

### 13H: Save!

**Scroll naar boven → Klik "Save"**

**✅ App info opgeslagen!**

---

## 📤 STAP 14: Submit for Review (5 minuten)

### 14A: Final Checks

**Verifieer dat je hebt:**
- ✅ Screenshots uploaded
- ✅ Description ingevuld
- ✅ Keywords ingevuld
- ✅ Support URL ingevuld
- ✅ Build selected
- ✅ App Review info ingevuld

### 14B: Submit

1. **Rechts boven:** Klik **"Add for Review"**
2. **Export Compliance popup verschijnt:**

**Vraag:** "Is your app designed to use cryptography or does it contain or incorporate cryptography?"

**Antwoord:** Waarschijnlijk **"No"** (tenzij je specifieke encryptie gebruikt)

Als je twijfelt: Selecteer "No" - standaard HTTPS telt niet.

3. Klik **"Submit"**

**Je ziet nu:**
```
Status: Waiting for Review
```

**🎉 SUBMITTED! Je app is nu in review! 🎉**

### 14C: Review Timeline

- **Waiting for Review:** 1-3 dagen
- **In Review:** Paar uur tot 1 dag
- **Accepted:** App goes live! 🚀
- **Rejected:** Je krijgt feedback, fix issues, resubmit

**Check status:**
- Email notificaties
- App Store Connect dashboard

---

## 🔄 STAP 15: Setup GitHub Actions (2-4 uur)

**DIT KUN JE DOEN TIJDENS DE APP REVIEW!**

Dit setup je zodat toekomstige updates GRATIS zijn!

### 15A: Volg de guide

**Open:** `IOS_BUILD_WITHOUT_MAC.md`  
**Sectie 3:** GitHub Actions

**Of volg quick version hier:**

### 15B: Maak GitHub Secrets

1. Ga naar je GitHub repo
2. Settings → Secrets and variables → Actions
3. Klik "New repository secret"

**Je hebt deze secrets nodig:**

Deze krijg je van de iOS certificaten die je eerder gemaakt hebt.
Je kunt ze export via Appflow of maken via developer.apple.com

**Check guide voor details:** `IOS_BUILD_WITHOUT_MAC.md`

### 15C: Test GitHub Actions

```bash
git add .
git commit -m "Test GitHub Actions"
git push origin main

# Check: GitHub repo → Actions tab
# Je moet zien: Workflow is running
```

**Als het werkt → Cancel Appflow trial!** ✅

---

## 🎯 STAP 16: Cancel Appflow Trial (Dag 13!)

**ZET EEN REMINDER IN JE AGENDA!**

### Op Dag 13 van je trial:

1. **Ga naar:** https://dashboard.ionicframework.com
2. **Settings** (left sidebar)
3. **Billing**
4. **Cancel Subscription**
5. Confirm

**✅ €0 betaald! GitHub Actions doet nu al je builds gratis!**

---

## 🎉 JE BENT KLAAR!

### Je hebt nu:

- ✅ Ionic Appflow account (trial)
- ✅ iOS app gebuild
- ✅ .ipa bestand gedownload
- ✅ App submitted naar App Store
- ✅ GitHub Actions setup (gratis updates)
- ✅ €0 betaald (behalve €99 Apple)

### Wacht nu op:

- 📧 Email van Apple (1-3 dagen)
- ✅ "Ready for Sale" status
- 🚀 **JE APP IS LIVE!**

---

## 📞 Hulp Nodig?

**Stuck ergens?**
- Check: `IONIC_APPFLOW_SETUP.md` (gedetailleerde guide)
- Check: `IOS_BUILD_WITHOUT_MAC.md` (troubleshooting)

**Ionic Support:**
- Forum: https://forum.ionicframework.com
- Docs: https://ionic.io/docs/appflow

---

## 🎯 Volgende Stappen (Optioneel)

**Terwijl je wacht op app review:**

1. **Setup analytics** - Track app usage
2. **Plan marketing** - Hoe ga je promoten?
3. **Prepare updates** - Welke features wil je toevoegen?
4. **Test GitHub Actions** - Zorg dat updates workflow werkt
5. **Create press kit** - Screenshots, description, etc.

---

**💪 Je doet het geweldig! Succes met de launch! 🚀**

**Questions? Let me know!** 🎵
