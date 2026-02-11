# iOS Setup Guide voor TempoStep

Deze guide helpt je om TempoStep te publiceren op de Apple App Store.

## Vereisten

### 1. Hardware & Software
- **Mac computer** (verplicht voor iOS development)
- **Xcode** (gratis via Mac App Store) - versie 14.0 of hoger aanbevolen
- **Apple Developer Account** ($99/jaar)
  - Ga naar https://developer.apple.com
  - Meld je aan voor het Apple Developer Program
  - Betaal de jaarlijkse fee van $99

### 2. Capacitor iOS Setup

```bash
# Installeer iOS platform
npx cap add ios

# Sync web assets naar iOS project
npx cap sync ios

# Open het project in Xcode
npx cap open ios
```

## Xcode Configuratie

### 1. Project Settings

Open het project in Xcode en configureer:

**General Tab:**
- **Display Name:** TempoStep
- **Bundle Identifier:** com.tempostep.app (moet uniek zijn)
- **Version:** 1.0.0
- **Build:** 1
- **Deployment Target:** iOS 14.0 of hoger

**Signing & Capabilities:**
- Selecteer je Apple Developer Team
- Enable "Automatically manage signing"
- Voeg capabilities toe:
  - ✅ Audio, AirPlay, and Picture in Picture (voor metronoom audio)
  - ✅ Background Modes → Audio (optioneel, voor achtergrond playback)

### 2. Info.plist Configuratie

Voeg de volgende keys toe aan `App/App/Info.plist`:

```xml
<!-- Microphone Permission (voor tuner) -->
<key>NSMicrophoneUsageDescription</key>
<string>TempoStep needs access to your microphone to provide accurate tuning functionality.</string>

<!-- Audio Session -->
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>

<!-- Status Bar Style -->
<key>UIStatusBarStyle</key>
<string>UIStatusBarStyleLightContent</string>
<key>UIViewControllerBasedStatusBarAppearance</key>
<false/>
```

### 3. App Icons

iOS vereist verschillende icon maten. Plaats de volgende icons in `App/App/Assets.xcassets/AppIcon.appiconset/`:

- **1024x1024** - App Store icon
- **180x180** - iPhone @3x
- **120x120** - iPhone @2x
- **167x167** - iPad Pro @2x
- **152x152** - iPad @2x
- **76x76** - iPad
- En meer...

**Tip:** Gebruik een tool zoals [App Icon Generator](https://appicon.co/) om automatisch alle maten te genereren uit één 1024x1024 icon.

### 4. Launch Screen

Bewerk `App/App/Base.lproj/LaunchScreen.storyboard` voor een custom launch screen, of gebruik de standaard Capacitor splash screen.

## Build voor App Store

### 1. Archive maken

1. In Xcode, selecteer **Product → Archive**
2. Wacht tot de build compleet is
3. Het Organizer venster opent automatisch

### 2. Validate & Upload

1. Selecteer je archive in het Organizer venster
2. Klik **Validate App**
3. Los eventuele issues op
4. Klik **Distribute App**
5. Kies **App Store Connect**
6. Upload naar App Store Connect

### 3. App Store Connect

1. Ga naar https://appstoreconnect.apple.com
2. Klik **My Apps** → **+** → **New App**
3. Vul app informatie in:
   - **Platform:** iOS
   - **Name:** TempoStep
   - **Primary Language:** Dutch (of Engels)
   - **Bundle ID:** com.tempostep.app
   - **SKU:** tempostep001

### 4. App Informatie

**App Information:**
- **Name:** TempoStep - Progressive Metronome
- **Subtitle:** Professionele Metronoom & Tuner
- **Category:** 
  - Primary: Music
  - Secondary: Education
- **Privacy Policy URL:** (vereist)
- **Support URL:** (vereist)

**Pricing:**
- Gratis of betaald
- Beschikbaarheid per land instellen

**Description (Nederlands):**
```
TempoStep is een professionele progressieve metronoom app voor muzikanten.

FEATURES:
• Progressieve tempo stijging voor effectief oefenen
• Instelbare maatsoorten en accent patronen
• Meerdere metronoom geluiden (beep, woodblock, cowbell, click, clave)
• Ingebouwde chromatische tuner (A440 Hz)
• Preset systeem voor snelle setup
• Onderverdeling opties (8e noten, triolen, 16e noten)
• Clean, minimalistische interface
• Donkere modus
• Meertalig (Nederlands, Engels, Duits, Spaans, Frans)

PERFECT VOOR:
• Muziekstudenten
• Professionele muzikanten
• Muziekleraren
• Iedereen die ritme wil verbeteren

Download TempoStep nu en verbeter je timing!
```

### 5. Screenshots

iOS vereist screenshots voor verschillende apparaten:

**iPhone Screenshots (verplicht):**
- iPhone 6.7" (1290 x 2796) - iPhone 14 Pro Max/15 Pro Max
- iPhone 6.5" (1242 x 2688) - iPhone 11 Pro Max/XS Max
- iPhone 5.5" (1242 x 2208) - iPhone 8 Plus

**iPad Screenshots (als je iPad ondersteunt):**
- iPad Pro 12.9" (2048 x 2732)
- iPad Pro 11" (1668 x 2388)

**Tips voor screenshots:**
1. Gebruik Xcode Simulator
2. Open app in verschillende simulators
3. Neem screenshots (Cmd + S in simulator)
4. Of gebruik tools zoals [Shotbot](https://app.shotbot.io/) of [Screenshot Creator](https://theapplaunchpad.com/screenshot-builder/)

### 6. Age Rating

Vul de Age Rating vragenlijst in:
- **Made for Kids:** Nee
- **Onze app:** 4+ (geen gevoelige content)

### 7. TestFlight (Optioneel)

Voor beta testing:
1. Voeg testers toe in App Store Connect
2. Testers ontvangen uitnodiging
3. Verzamel feedback voor je publieke release

### 8. Submit for Review

1. Vul alle vereiste velden in
2. Upload screenshots
3. Stel release type in:
   - **Manual:** Handmatig publiceren na goedkeuring
   - **Automatic:** Automatisch live na goedkeuring
4. Klik **Submit for Review**

**Review proces duurt meestal 1-3 dagen.**

## iOS-specifieke Optimalisaties (Reeds geïmplementeerd)

✅ **Safe Area Support** - App werkt correct met notch/dynamic island  
✅ **Haptic Feedback** - Trillingen bij start/stop metronoom  
✅ **iOS Audio API** - Optimalisatie voor Web Audio API op iOS  
✅ **Viewport Fixes** - Correcte 100vh handling  
✅ **Touch Optimalisatie** - Betere touch response  
✅ **No Zoom on Input** - Voorkomt automatische zoom bij input focus  
✅ **Overscroll Prevention** - Geen rubber-band effect  
✅ **PWA Support** - Add to Home Screen functionaliteit  
✅ **Persistent Storage** - Data blijft bewaard  

## Veelvoorkomende Problemen

### Audio werkt niet op iOS
- **Oplossing:** Audio context moet gestart worden door user interaction (reeds geïmplementeerd)
- Check of `allowsInlineMediaPlayback` enabled is in capacitor.config.ts

### Safe Area problemen
- **Oplossing:** Gebruik `env(safe-area-inset-*)` variabelen (reeds geïmplementeerd)
- Check viewport meta tag: `viewport-fit=cover`

### App crasht op iOS
- Open Xcode console
- Check crash logs in Xcode → Window → Devices and Simulators
- Enable debugging in capacitor.config.ts

### Icons niet zichtbaar
- Controleer dat alle icon maten aanwezig zijn
- Rebuild het project: `npx cap sync ios`

## Build Checklist

Voordat je submit:

- [ ] Bundle ID is uniek en geregistreerd
- [ ] Alle icon maten zijn aanwezig (1024x1024 vooral belangrijk)
- [ ] Screenshots voor alle vereiste apparaten
- [ ] Privacy Policy URL toegevoegd
- [ ] Support URL toegevoegd
- [ ] App description en keywords ingevuld
- [ ] Age rating ingevuld
- [ ] Pricing & availability ingesteld
- [ ] Code signing certificates correct
- [ ] App getest op echte iOS device
- [ ] Audio functionaliteit getest
- [ ] Microphone permission werkt
- [ ] In-app aankopen getest (indien van toepassing)
- [ ] App voldoet aan Apple Review Guidelines

## Nuttige Links

- [Apple Developer Portal](https://developer.apple.com)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

## Support

Voor vragen over iOS development met Capacitor:
- [Capacitor Discord](https://discord.gg/UPYYRhtyzp)
- [Capacitor GitHub](https://github.com/ionic-team/capacitor)

---

**Let op:** iOS builds kunnen ALLEEN worden gemaakt op een Mac computer met Xcode geïnstalleerd. Er is geen workaround voor deze vereiste.
