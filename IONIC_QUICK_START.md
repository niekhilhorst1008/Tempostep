# ⚡ Ionic Appflow - Quick Start (15 minuten)

**Snelle stappen om TempoStep naar Ionic Appflow te uploaden en je eerste iOS build te maken.**

Voor gedetailleerde uitleg, zie: `IONIC_APPFLOW_SETUP.md`

---

## 🚀 Stappen

### 1️⃣ Installeer Ionic CLI (2 min)

```bash
npm install -g @ionic/cli
ionic --version
```

---

### 2️⃣ Maak Ionic Account (3 min)

1. Ga naar: **https://ionic.io/appflow**
2. Klik **"Start Free Trial"** (14 dagen gratis)
3. Vul email + wachtwoord in
4. Kies **Hobby tier** ($29/maand na trial)
5. Voer creditcard in (geen charge tijdens trial!)

---

### 3️⃣ Push Code naar GitHub (5 min)

**Als je nog geen GitHub repo hebt:**

```bash
# 1. Maak repo op GitHub.com
# Naam: tempostep-app (private)

# 2. In je terminal:
git init
git add .
git commit -m "Initial commit for Appflow"
git remote add origin https://github.com/YOUR_USERNAME/tempostep-app.git
git branch -M main
git push -u origin main
```

**✅ Code staat op GitHub!**

---

### 4️⃣ Login & Link App (3 min)

```bash
# Login
ionic login
# (browser opent automatisch)

# Link app
ionic link --create

# Beantwoord vragen:
# - App name: TempoStep
# - Git host: GitHub
# - Repository: YOUR_USERNAME/tempostep-app
```

**✅ App is gelinkt!**

---

### 5️⃣ Setup iOS Certificaten (2 min)

1. Ga naar **https://dashboard.ionicframework.com**
2. Selecteer **TempoStep**
3. Left menu → **"Signing Certificates"** → **"iOS"**
4. Klik **"Auto-generate Credentials"**
5. Vul in:
   - Apple ID email
   - Apple ID password  
   - Team ID (vind op developer.apple.com/account → Membership)
6. Klik **"Generate"**

⏳ Wacht 2-5 minuten...

**✅ Certificates klaar!**

---

### 6️⃣ Build iOS App! (10 min)

1. Dashboard → **TempoStep** → **"Builds"**
2. Klik **"New Build"**
3. Configureer:
   - **Platform:** iOS
   - **Build Type:** App Store
   - **Certificate:** (auto-select)
4. Klik **"Build"**

⏳ Wacht 5-15 minuten voor build...

**✅ Build succesvol!**

---

### 7️⃣ Download .ipa

1. Klik op **groene build**
2. Klik **"Download"** knop
3. Save: `TempoStep.ipa`

**🎉 Je hebt een iOS app!**

---

## 📲 Upload naar App Store (optioneel)

**Met Mac:**
- Download **Transporter** app
- Sleep .ipa bestand
- Klik **"Deliver"**

**Zonder Mac:**
- Gebruik Appflow's "Deploy to Store" feature (Launch tier)

---

## 🔄 Auto-Builds Setup (optioneel)

Dashboard → **Automations** → **New Automation**

- Branch: `main`
- Trigger: Push to branch
- Type: iOS - App Store

**✅ Elke push = automatische build!**

---

## ✅ Klaar!

Je hebt nu:
- ✅ Ionic Appflow account
- ✅ TempoStep app gelinkt
- ✅ iOS certificaten geconfigureerd
- ✅ Eerste iOS build gemaakt
- ✅ .ipa bestand gedownload

---

## 📞 Hulp Nodig?

**Volledige guide:** `IONIC_APPFLOW_SETUP.md`

**Errors?** Check troubleshooting sectie in volledige guide.

**Support:**
- Docs: https://ionic.io/docs/appflow
- Forum: https://forum.ionicframework.com

---

## 🎯 Volgende Stappen

1. Test app via Testflight
2. Submit naar App Store
3. Launch! 🚀

**Of probeer gratis alternatief:** GitHub Actions (zie `IOS_BUILD_WITHOUT_MAC.md`)
