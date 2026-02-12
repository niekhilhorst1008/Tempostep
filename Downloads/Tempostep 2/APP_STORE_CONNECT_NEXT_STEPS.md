# 📱 App Store Connect - Volgende Stappen

**Huidige Status:** ✅ Age Ratings & Server Notifications pagina's gezien  
**Wat je NU moet doen:** App Information afmaken + Bundle ID registreren

---

## 🎯 STAP 1: App Store Connect Afmaken (10 min)

### A. Server Notifications Pagina (waar je nu bent)

**Wat invullen:**
- **Production Server URL:** Laat LEEG (niet nodig voor RevenueCat)
- **Sandbox Server URL:** Laat LEEG
- **Server Notification Version:** Laat op v2

**Klik "Save"**

---

### B. Age Ratings (al ingevuld, maar check dit):

Je had ingevuld:
- Parental Controls: **NO** ✅
- Age Assurance: **NO** ✅
- User-Generated Content: **NO** ✅
- Messaging: **NO** ✅

**Verander dit:**
- Unrestricted Web Access: **YES → NO** ⚠️
- Advertising: **YES → NO** (tenzij je ads hebt) ⚠️

**Waarom?** Dit geeft je een lagere age rating (4+ ipv 12+)

---

### C. App Encryption

**Laat leeg voor nu** - we vullen dit in na de build upload.

---

### D. App Icon Upload

**Waar staat dit?**
1. Ga naar **linker menu** → "1.0 Prepare for Submission"
2. Scroll naar **BOVEN**
3. Je ziet sectie: **"App Store Icon"** of **"App Information"**

**Wat uploaden?**
- **Grootte:** 1024x1024px PNG
- **Geen transparantie!**
- **Geen afgeronde hoeken** (Apple doet dit zelf)

**Heb je nog geen icon?** 
Check je project: `/public/icon.svg` of `/public/icon-512.svg`
→ Converteer naar 1024x1024 PNG met online tool

---

## 🎯 STAP 2: Bundle ID Registreren (5 min)

**Nu de app in App Store Connect staat, moet je de Bundle ID registreren!**

### Ga naar Apple Developer Portal:
🔗 https://developer.apple.com/account/resources/identifiers/list

### Registreer Bundle ID:
1. Klik **"+"** (rechtsboven)
2. Selecteer **"App IDs"** → Continue
3. Selecteer **"App"** → Continue

**Vul in:**
- **Description:** `TempoStep Metronome`
- **Bundle ID (Explicit):** `com.tempostep.app` ⚠️ EXACT!
- **Capabilities:** 
  - Selecteer **"In-App Purchase"** ✅
  - (Andere kunnen standaard blijven)

4. **Klik "Register"**

✅ **Done!** Je Bundle ID is nu geregistreerd.

---

## 🎯 STAP 3: API Keys Voor GitHub Actions (15 min)

**Dit heb je nodig om automatische iOS builds te maken!**

### Ga naar API Keys:
🔗 https://appstoreconnect.apple.com/access/api

### Maak API Key:

1. Klik **"+"** (bij Keys)
2. **Name:** `TempoStep GitHub Actions`
3. **Access:** Select **"App Manager"**
4. **Klik "Generate"**

### Download & Bewaar:

De pagina toont:
- ✅ **Issuer ID** (UUID format) → Kopieer!
- ✅ **Key ID** (10 karakters) → Kopieer!
- ✅ **Download API Key** (.p8 file) → Download!

⚠️ **BELANGRIJK:**
- Je kunt de .p8 file maar **1x downloaden!**
- Bewaar hem veilig!
- We gebruiken hem straks in GitHub Secrets

---

## 🎯 STAP 4: Terug Naar App Store Connect (5 min)

### App Icon Check

**Ga terug naar je app:**
1. App Store Connect → Apps → TempoStep
2. Klik **"1.0 Prepare for Submission"**
3. **Scroll naar BOVEN**

**Check deze secties:**
- [ ] **App Store Icon** - Geupload? (1024x1024 PNG)
- [ ] **Screenshots** - 3 screenshots geüpload voor iPhone 6.5"? ✅
- [ ] **Description** - Ingevuld zonder invalide karakters? ✅
- [ ] **Keywords** - Ingevuld? ✅
- [ ] **Support URL** - https://niekhilhorst1008.github.io/Tempostep ✅
- [ ] **Subtitle** - Kies: `Progressive Tempo Training` ✅

---

## 🎯 STAP 5: RevenueCat Setup (30 min)

**NU is het tijd voor IAP setup!**

Volg deze gids: **`/IAP_QUICK_START.md`**

**In het kort:**
1. RevenueCat account maken
2. iOS app toevoegen
3. API key kopiëren en in code plakken
4. IAP product maken in App Store Connect
5. Product linken in RevenueCat

**Volledige details:** Zie `/IAP_SETUP_GUIDE.md`

---

## 📋 Checklist Voor Vandaag

### App Store Connect:
- [ ] Server Notifications: Leeg gelaten + Saved
- [ ] Age Ratings: Unrestricted Web Access → NO
- [ ] Age Ratings: Advertising → NO (als geen ads)
- [ ] App Icon: 1024x1024 PNG uploaded
- [ ] Subtitle: "Progressive Tempo Training" ingevuld
- [ ] Alle info saved

### Apple Developer Portal:
- [ ] Bundle ID geregistreerd: `com.tempostep.app`
- [ ] In-App Purchase capability enabled

### API Keys:
- [ ] App Store Connect API key aangemaakt
- [ ] Issuer ID gekopieerd + veilig bewaard
- [ ] Key ID gekopieerd + veilig bewaard
- [ ] .p8 file gedownload + veilig bewaard

### RevenueCat:
- [ ] Account aangemaakt
- [ ] Project "TempoStep" created
- [ ] iOS app toegevoegd
- [ ] API key gekopieerd

---

## 🎯 Morgen: IAP + Build Setup

**Morgen kunnen we:**
1. ✅ IAP configureren in RevenueCat
2. ✅ Product aanmaken in App Store Connect
3. ✅ GitHub Actions workflow activeren
4. ✅ Eerste iOS build maken
5. ✅ Uploaden naar TestFlight

**Geschatte tijd:** 2-3 uur

---

## 🚨 BELANGRIJKE INFO DIE JE MOET BEWAREN

**Bundle ID:** `com.tempostep.app`

**App Name:** `Metronome & Tuner - TempoStep`

**Subtitle:** `Progressive Tempo Training`

**Support URL:** `https://niekhilhorst1008.github.io/Tempostep`

**API Keys (bewaar veilig!):**
- Issuer ID: [Je kopieert dit straks]
- Key ID: [Je kopieert dit straks]
- .p8 file: [Je downloadt dit straks]

**RevenueCat API Key:**
- iOS API Key: [Je kopieert dit straks, begint met `appl_`]

---

## ❓ Waar Ben Je NU?

**Vertel me:**
1. Heb je de App Icon al geüpload? (1024x1024 PNG)
2. Heb je de Subtitle ingevuld?
3. Ben je klaar met de Age Ratings pagina?

**Dan kunnen we door naar:**
→ Bundle ID registratie  
→ API keys setup  
→ RevenueCat configuratie  

**Laat me weten waar je bent!** 🚀
