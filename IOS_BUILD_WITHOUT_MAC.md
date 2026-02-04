# iOS Build Zonder Mac - Opties voor TempoStep

Je hebt meerdere opties om een iOS app te bouwen en uploaden naar de App Store zonder een eigen Mac te bezitten.

## 🎯 Aanbevolen Opties (van makkelijk naar complex)

---

## 1. ⭐ Ionic Appflow (AANBEVOLEN voor Capacitor)

**Beste optie voor Capacitor apps zoals TempoStep!**

### Voordelen:
- ✅ Speciaal gemaakt voor Capacitor apps
- ✅ Cloud-based builds (geen Mac nodig)
- ✅ Automatische code signing
- ✅ Direct upload naar App Store Connect
- ✅ Build Android én iOS tegelijk
- ✅ Live updates mogelijk
- ✅ CI/CD geïntegreerd

### Kosten:
- **Hobby tier:** $29/maand (500 builds/maand)
- **Launch tier:** $69/maand (10,000 builds/maand)
- **Growth tier:** $169/maand (onbeperkt)
- **14 dagen gratis trial**

### Setup:

```bash
# 1. Installeer Ionic CLI
npm install -g @ionic/cli

# 2. Login naar Appflow
ionic login

# 3. Link je app
ionic link

# 4. Configureer iOS build
ionic config set -g appflow.id YOUR_APP_ID

# 5. Push naar Appflow
git add .
git commit -m "Initial Appflow setup"
git push ionic master

# 6. Trigger iOS build via dashboard
# Ga naar dashboard.ionicframework.com
```

### Stappen in Appflow Dashboard:

1. **App aanmaken:**
   - Ga naar https://dashboard.ionicframework.com
   - Klik "New App"
   - Connect je Git repository (GitHub/GitLab/Bitbucket)

2. **iOS Certificates instellen:**
   - Ga naar Settings → Certificates
   - Upload je Apple Developer certificates
   - Appflow kan deze ook automatisch genereren!

3. **Build configureren:**
   - Ga naar Builds
   - Klik "New Build"
   - Kies "iOS - App Store"
   - Selecteer je certificaten
   - Start build

4. **Download of direct upload:**
   - Download .ipa bestand
   - Of laat Appflow direct uploaden naar App Store Connect

### Automatische Code Signing:

Appflow kan automatisch je certificates en provisioning profiles beheren:

```bash
# In Appflow dashboard:
Settings → iOS Signing → Auto-manage Certificates
```

**Website:** https://ionic.io/appflow  
**Documentatie:** https://ionic.io/docs/appflow

---

## 2. 🖥️ Cloud Mac Services

Huur een Mac in de cloud per uur/dag/maand.

### MacStadium

**Kosten:** Vanaf $79/maand  
**Website:** https://www.macstadium.com

**Voordelen:**
- Volledige macOS ervaring
- Xcode pre-installed
- Dedicated Mac hardware

**Nadelen:**
- Duurder dan andere opties
- Je moet Xcode zelf leren gebruiken

### MacinCloud

**Kosten:** Vanaf $30/maand (pay-as-you-go vanaf $1/uur)  
**Website:** https://www.macincloud.com

**Voordelen:**
- Goedkoper dan MacStadium
- Pay-as-you-go optie
- Meerdere macOS versies beschikbaar

**Setup:**
1. Account aanmaken op MacinCloud
2. Mac instance starten
3. Remote desktop connectie (VNC/RDP)
4. Xcode installeren
5. Je project openen
6. Build en upload naar App Store

---

## 3. 🤖 GitHub Actions (GRATIS!)

**Gebruik GitHub's gratis macOS runners voor CI/CD.**

### Voordelen:
- ✅ Volledig GRATIS (2000 minuten/maand op gratis plan)
- ✅ Geautomatiseerd
- ✅ Geïntegreerd met je Git workflow

### Nadelen:
- ❌ Complexere setup
- ❌ Je moet certificaten en secrets configureren

### Setup:

**1. Maak `.github/workflows/ios-build.yml`:**

```yaml
name: iOS Build

on:
  push:
    branches: [main]
  workflow_dispatch: # Manual trigger

jobs:
  build-ios:
    runs-on: macos-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build web assets
        run: npm run build
      
      - name: Sync Capacitor
        run: |
          npx cap sync ios
      
      - name: Install Apple Certificate
        uses: apple-actions/import-codesign-certs@v2
        with:
          p12-file-base64: ${{ secrets.IOS_CERTIFICATE_BASE64 }}
          p12-password: ${{ secrets.IOS_CERTIFICATE_PASSWORD }}
      
      - name: Install Provisioning Profile
        uses: apple-actions/download-provisioning-profiles@v1
        with:
          bundle-id: com.tempostep.app
          profile-type: 'IOS_APP_STORE'
          issuer-id: ${{ secrets.APPSTORE_ISSUER_ID }}
          api-key-id: ${{ secrets.APPSTORE_KEY_ID }}
          api-private-key: ${{ secrets.APPSTORE_PRIVATE_KEY }}
      
      - name: Build iOS
        run: |
          cd ios/App
          xcodebuild -workspace App.xcworkspace \
            -scheme App \
            -sdk iphoneos \
            -configuration Release \
            -archivePath $PWD/build/App.xcarchive \
            archive
      
      - name: Export IPA
        run: |
          cd ios/App
          xcodebuild -exportArchive \
            -archivePath $PWD/build/App.xcarchive \
            -exportOptionsPlist exportOptions.plist \
            -exportPath $PWD/build
      
      - name: Upload to App Store
        uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: ios/App/build/App.ipa
          issuer-id: ${{ secrets.APPSTORE_ISSUER_ID }}
          api-key-id: ${{ secrets.APPSTORE_KEY_ID }}
          api-private-key: ${{ secrets.APPSTORE_PRIVATE_KEY }}
```

**2. Secrets configureren in GitHub:**

Ga naar je repository → Settings → Secrets → Actions:

- `IOS_CERTIFICATE_BASE64` - Je .p12 certificate (base64 encoded)
- `IOS_CERTIFICATE_PASSWORD` - Wachtwoord van certificate
- `APPSTORE_ISSUER_ID` - App Store Connect Issuer ID
- `APPSTORE_KEY_ID` - API Key ID
- `APPSTORE_PRIVATE_KEY` - API Private Key

**3. Trigger build:**

```bash
git push origin main
# Of manual via GitHub Actions tab
```

**Meer info:** https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners

---

## 4. 💻 Codemagic

Cloud-based CI/CD speciaal voor mobile apps.

### Kosten:
- **Free tier:** 500 build minuten/maand
- **Pro:** $99/maand (onbeperkt)

### Voordelen:
- ✅ Geen Mac nodig
- ✅ Automatische code signing
- ✅ React, Flutter, React Native, Capacitor support
- ✅ Direct upload naar App Store

### Setup:

1. **Account aanmaken:** https://codemagic.io
2. **App toevoegen:** Connect GitHub/GitLab/Bitbucket
3. **Configureren:** `codemagic.yaml`:

```yaml
workflows:
  ios-workflow:
    name: iOS Build
    environment:
      node: 18
      xcode: latest
    scripts:
      - npm install
      - npm run build
      - npx cap sync ios
      - xcodebuild -workspace ios/App/App.xcworkspace -scheme App archive
    artifacts:
      - ios/App/build/*.ipa
    publishing:
      app_store_connect:
        api_key: $APP_STORE_CONNECT_KEY_ID
        key_id: $APP_STORE_CONNECT_KEY_IDENTIFIER
        issuer_id: $APP_STORE_CONNECT_ISSUER_ID
```

**Website:** https://codemagic.io

---

## 5. 👥 Freelancer Inhuren

Huur een iOS developer in om éénmalig je app te builden en uploaden.

### Platforms:
- **Fiverr:** €25-€100 voor app build + upload
- **Upwork:** €30-€150 per uur
- **Freelancer.nl:** Nederlandse developers

### Wat ze nodig hebben:
- Toegang tot je GitHub repository
- Je Apple Developer account credentials
- App icons en screenshots
- App Store listing teksten

### Voordelen:
- ✅ Goedkoper dan maandelijkse services
- ✅ Expert doet het voor je
- ✅ Eenmalige kosten

### Nadelen:
- ❌ Voor elke update moet je opnieuw betalen
- ❌ Je moet iemand vertrouwen met je credentials

---

## 6. 🏢 Bitrise

Enterprise-grade mobile CI/CD platform.

### Kosten:
- **Hobby:** GRATIS (200 builds/maand, 45 min/build)
- **Developer:** $36/maand
- **Teams:** $90/maand

### Voordelen:
- ✅ Gratis tier beschikbaar
- ✅ Geoptimaliseerd voor mobile
- ✅ Veel integraties

**Website:** https://www.bitrise.io

---

## 📋 Vergelijkingstabel

| Optie | Kosten | Moeilijkheid | Tijd | Aanbeveling |
|-------|--------|--------------|------|-------------|
| **Ionic Appflow** | $29-169/m | ⭐⭐ Makkelijk | ⏱️ 30 min | ⭐⭐⭐⭐⭐ BESTE |
| **GitHub Actions** | GRATIS | ⭐⭐⭐⭐ Moeilijk | ⏱️⏱️ 2-4 uur | ⭐⭐⭐⭐ Goed voor devs |
| **MacinCloud** | $30+/m | ⭐⭐⭐ Gemiddeld | ⏱️⏱️ 1-2 uur | ⭐⭐⭐ OK |
| **Codemagic** | Gratis-99/m | ⭐⭐⭐ Gemiddeld | ⏱️ 1 uur | ⭐⭐⭐⭐ Goed |
| **Freelancer** | €25-150 | ⭐ Makkelijk | ⏱️⏱️⏱️ Wachten | ⭐⭐⭐ OK voor 1x |
| **MacStadium** | $79+/m | ⭐⭐⭐ Gemiddeld | ⏱️⏱️ 1-2 uur | ⭐⭐ Duur |
| **Bitrise** | Gratis-90/m | ⭐⭐⭐ Gemiddeld | ⏱️⏱️ 1-2 uur | ⭐⭐⭐⭐ Goed |

---

## 🎯 Mijn Aanbeveling voor TempoStep

### Voor Launch (Eerste Keer):
**Optie 1: Ionic Appflow (14 dagen gratis trial)**
- Makkelijkste setup
- Speciaal voor Capacitor
- Try gratis, cancel als je wilt

**Optie 2: Freelancer**
- Eenmalig €50-100
- Snel klaar
- Expert doet het voor je

### Voor Lange Termijn:
**GitHub Actions (GRATIS)**
- Volledig geautomatiseerd
- Geen maandelijkse kosten
- Leercurve maar daarna perfect

---

## 🚀 Snelste Route: Ionic Appflow in 30 minuten

```bash
# 1. Installeer Ionic CLI
npm install -g @ionic/cli

# 2. Start 14-dagen trial
# Ga naar https://ionic.io/appflow → Start Trial

# 3. Login
ionic login

# 4. Link app
ionic link --create

# 5. Push code
git add .
git commit -m "Setup Appflow"
git push ionic master

# 6. Ga naar dashboard.ionicframework.com
# 7. Configure iOS certificates (Appflow kan deze auto-genereren!)
# 8. Start build
# 9. Download .ipa of upload direct naar App Store
```

**Total tijd: ~30 minuten tot eerste build!**

---

## ⚠️ Wat je WEL nodig hebt (voor alle opties):

1. **Apple Developer Account** ($99/jaar)
   - Aanmelden op https://developer.apple.com
   - Betaal de $99 jaarlijkse fee

2. **App Store Connect Account**
   - Automatisch met Apple Developer account
   - Maak app aan in App Store Connect

3. **Certificaten** (kan via Appflow automatisch):
   - Development Certificate
   - Distribution Certificate
   - Provisioning Profile

4. **App Metadata:**
   - App screenshots
   - App description
   - Icons (1024x1024)
   - Privacy Policy URL

---

## 💡 Bonus: PWA als Alternatief

**Je hebt al een volledig werkende iOS-optimized PWA!**

Gebruikers kunnen TempoStep installeren via Safari → Share → "Add to Home Screen"

### Voordelen PWA:
- ✅ GRATIS (geen $99/jaar Apple Developer)
- ✅ Geen App Store review proces
- ✅ Direct updates zonder approval
- ✅ Cross-platform (werkt ook op Android, desktop)
- ✅ Alle features werken (behalve push notifications)

### Nadelen PWA:
- ❌ Niet in App Store (minder vindbaarheid)
- ❌ Geen push notifications
- ❌ Beperkte haptic feedback
- ❌ Minder "official" gevoel

---

## 🎯 Conclusie

**Mijn advies:**

1. **Start met PWA** - Het werkt al perfect! Promoot via je website/social media
2. **Als je wilt lanceren op App Store** → Gebruik **Ionic Appflow 14-dagen trial**
3. **Lange termijn** → Schakel over naar **GitHub Actions** (gratis) of blijf bij Appflow als je het fijn vindt

**Wil je direct starten met Ionic Appflow?** Ik kan je helpen met de setup! 🚀

---

## 📞 Hulp Nodig?

- **Ionic Appflow Docs:** https://ionic.io/docs/appflow
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Capacitor iOS Docs:** https://capacitorjs.com/docs/ios

**Succes met je iOS launch!** 🎉
