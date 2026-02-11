# ✅ COMPLETE APP STORE SUBMISSION CHECKLIST

## 🎯 ALLES WAT JE MOET DOEN VOOR APPROVAL

---

## PART 1: IN-APP PURCHASE (IAP) ✅

### **1.1 AdMob Account**
- [ ] Google AdMob account aangemaakt
- [ ] TempoStep app geregistreerd in AdMob
- [ ] iOS App ID gekopieerd: `ca-app-pub-XXXX~YYYY`
- [ ] Banner Ad Unit ID gekopieerd: `ca-app-pub-XXXX/YYYY`

### **1.2 App Store Connect - IAP Product**
- [ ] Product aangemaakt: `com.tempostep.premium`
- [ ] Type: Non-Consumable
- [ ] Prijs ingesteld: €4.99 (Tier 5)
- [ ] Localization ingevuld (minimaal EN + NL)
- [ ] Screenshot van Premium Modal geüpload
- [ ] Review Notes ingevuld
- [ ] Status: "Ready to Submit"

### **1.3 IAP Koppeling**
- [ ] IAP gekoppeld aan app versie submission
- [ ] App Store Connect toont: "1 In-App Purchase"

---

## PART 2: ADMOB CONFIGURATIE ✅

### **2.1 Code Updates**
- [ ] Package geïnstalleerd: `@capacitor-community/admob`
- [ ] `/src/services/adMobService.ts` aangemaakt
- [ ] AdMob IDs ingevuld in adMobService.ts:
  - [ ] `iosAppId`: YOUR_REAL_ID
  - [ ] `iosBannerAdUnitId`: YOUR_REAL_ID
- [ ] `/src/app/App.tsx` geüpdatet met AdMob import
- [ ] Ad show/hide logic werkend (premium vs free)

### **2.2 iOS Configuration (Info.plist)**
- [ ] `GADApplicationIdentifier` toegevoegd
- [ ] `NSUserTrackingUsageDescription` toegevoegd (ATT)
- [ ] `SKAdNetworkItems` array toegevoegd (47+ items)
- [ ] Capacitor gesync'd: `npx cap sync ios`

### **2.3 App Store Connect - Privacy**
- [ ] App Privacy ingevuld
- [ ] "Advertising Data" = YES
- [ ] "Device ID" = YES  
- [ ] Tracking purpose: YES
- [ ] Explanation tekst toegevoegd

---

## PART 3: APP BUILD & TEST ✅

### **3.1 Build Preparation**
```bash
# Clean build
npm run build
npx cap sync ios
npx cap open ios
```

### **3.2 Xcode Configuration**
- [ ] Build number verhoogd (bijv. 1 → 2)
- [ ] Version correct (bijv. 1.0.1)
- [ ] Signing & Capabilities: Team geselecteerd
- [ ] Bundle Identifier klopt: `com.tempostep.app`

### **3.3 Testing Checklist**
- [ ] Test in Simulator:
  - [ ] ATT popup verschijnt bij eerste launch
  - [ ] Test banner ad zichtbaar onderaan
  - [ ] Metronome werkt normaal
  - [ ] Presets tab toont premium gate
- [ ] Test op Real Device:
  - [ ] Alle bovenstaande werkt
  - [ ] IAP purchase flow werkt (sandbox)
  - [ ] Na purchase: ads verdwijnen
  - [ ] Premium features unlocken

### **3.4 Screenshot Mode (voor IAP review)**
- [ ] Screenshot gemaakt van Premium Modal
- [ ] Screenshot mode DISABLED vóór productie build
  - Check: `/src/app/App.tsx` regel ~67
  - Moet zijn: `premiumModalOpen = false`

---

## PART 4: APP STORE CONNECT SUBMISSION ✅

### **4.1 App Information**
- [ ] App naam: TempoStep
- [ ] Subtitle ingevuld
- [ ] Primary category: Music
- [ ] Secondary category: Productivity (optioneel)

### **4.2 Pricing & Availability**
- [ ] Price: Free (met IAP)
- [ ] Availability: All territories (of selectief)

### **4.3 App Privacy**
- [ ] Privacy Policy URL toegevoegd
- [ ] Data collection correct ingevuld:
  - [ ] Advertising Data: YES
  - [ ] Device ID: YES
  - [ ] Usage Data: (optioneel)
- [ ] Tracking: YES (met explanation)

### **4.4 Version Information**

#### **Screenshots**
- [ ] 6.7" iPhone screenshots (1290 x 2796)
- [ ] 6.5" iPhone screenshots (1242 x 2688) [optioneel]
- [ ] Minimaal 3 screenshots geüpload

#### **App Description**
```
TempoStep - Professional Metronome

Perfect your practice with TempoStep, the metronome built for serious musicians.

KEY FEATURES:
✓ Tempo progression - Gradually increase speed
✓ Custom time signatures (up to 32 beats)
✓ Advanced accent patterns
✓ Built-in chromatic tuner
✓ Visual metronome arm animation

PREMIUM FEATURES:
• Unlimited custom practice presets
• 5 professional metronome sounds
• Complete ad-free experience

Whether you're practicing scales, learning difficult passages, or teaching students, TempoStep helps you build speed and precision systematically.

Download free and upgrade to Premium to unlock all features!
```

#### **Keywords**
```
metronome,tempo,practice,music,musician,tuner,rhythm,timing,bpm
```

#### **Support URL**
```
https://niekhilhorst1008.github.io/Tempostep/
```

#### **Marketing URL** (optioneel)
```
https://niekhilhorst1008.github.io/Tempostep/
```

### **4.5 App Review Information**

#### **Contact Information**
- [ ] First name ingevuld
- [ ] Last name ingevuld
- [ ] Phone number ingevuld
- [ ] Email ingevuld

#### **Sign-in Information**
- [ ] Demo account NIET nodig (app werkt zonder login)
- [ ] Check "Sign-in not required"

#### **Notes for Review**
```
TESTING THE APP:

METRONOME:
1. The app opens on the Metronome tab
2. Tap the Play button to start the metronome
3. Adjust tempo with slider or +/- buttons
4. Try different time signatures (tap "4/4" button)

TUNER:
1. Tap the "Tuner" tab at the bottom
2. Grant microphone permission when prompted
3. Play an instrument or hum a note to see tuning

PREMIUM IN-APP PURCHASE:
1. Tap the "Presets" tab (bookmark icon)
2. Tap "Create Preset" button (+ icon)
3. Premium modal appears with purchase option

PREMIUM FEATURES:
• Unlimited custom practice presets
• 5 professional metronome sounds
• Ad-free experience

TECHNICAL DETAILS:
• RevenueCat SDK for IAP (API Key: appl_SlwbjrVEBgZmZyuVjzUxlnlTDPj)
• Google AdMob for banner ads (free users only)
• Microphone permission for tuner feature only

The app is fully functional and ready for testing. Thank you!
```

### **4.6 Build Upload**
- [ ] Archive created in Xcode
- [ ] Build uploaded to App Store Connect
- [ ] Build selected in "Build" section
- [ ] Processing complete (geen errors)

### **4.7 Age Rating**
- [ ] Completed age rating questionnaire
- [ ] Expected rating: 4+ (no objectionable content)

### **4.8 Export Compliance**
- [ ] Export compliance answered:
  - "Uses encryption": YES
  - "Qualifies for exemption": YES (standard HTTPS)

---

## PART 5: FINAL CHECKS ✅

### **5.1 Code Review**
- [ ] Geen console.log() in productie code (optioneel)
- [ ] Geen hardcoded test data
- [ ] Screenshot mode disabled
- [ ] AdMob test mode disabled (`isTesting: false`)

### **5.2 Info.plist Verification**
Open `ios/App/App/Info.plist` en check:
- [ ] `GADApplicationIdentifier` = JOUW AdMob App ID
- [ ] `NSUserTrackingUsageDescription` aanwezig
- [ ] `SKAdNetworkItems` array compleet (47 items)
- [ ] `NSMicrophoneUsageDescription` aanwezig (voor tuner)

### **5.3 App Store Connect Final Review**
- [ ] In-App Purchases sectie: 1 product zichtbaar
- [ ] Screenshots geüpload en zien er goed uit
- [ ] Description geen typefouten
- [ ] Contact info correct
- [ ] Build geselecteerd

---

## PART 6: SUBMISSION 🚀

### **6.1 Submit Button**
- [ ] Alle secties zijn groen ✅
- [ ] Geen rode waarschuwingen
- [ ] "Submit for Review" button klikbaar

### **6.2 Final Popup**
- [ ] Export Compliance beantwoord
- [ ] Submit bevestigd

### **6.3 Confirmation**
- [ ] Status = "Waiting for Review"
- [ ] Email ontvangen van Apple
- [ ] Submission zichtbaar in App Store Connect

---

## TIMELINE ⏱️

```
Nu:              Waiting for Review
Over 1-3 uur:    In Review
Over 24-48 uur:  Decision (Approved/Rejected)
```

---

## ALS APPROVED ✅

1. **Status verandert naar "Ready for Sale"**
2. **App verschijnt in App Store binnen 24 uur**
3. **IAP product wordt actief**
4. **AdMob ads beginnen te serveren**

**Volgende stappen:**
- [ ] Test download van App Store
- [ ] Verifieer IAP werkt in productie
- [ ] Check AdMob dashboard voor impressies
- [ ] Share app link op social media!

---

## ALS REJECTED ❌

**Common rejection reasons:**

1. **IAP Screenshot Onduidelijk**
   - Fix: Maak duidelijkere screenshot
   - Resubmit IAP + app

2. **Privacy Policy Missing**
   - Fix: Voeg privacy policy URL toe
   - Update in App Information

3. **ATT Permission Missing**
   - Fix: Voeg NSUserTrackingUsageDescription toe
   - Upload nieuwe build

4. **App Crashes**
   - Fix: Check crash logs in Xcode Organizer
   - Test opnieuw op device
   - Upload fixed build

**Hoe resubmit:**
- Fix het probleem
- Upload nieuwe build (verhoog build number!)
- Klik "Submit for Review" opnieuw

---

## 🆘 HULP NODIG?

**Stuck bij IAP?** → Zie `/IAP_SUBMISSION_CHECKLIST.md`  
**Stuck bij AdMob?** → Zie `/ADMOB_SETUP_GUIDE.md`  
**Quick reference?** → Zie `/ADMOB_QUICK_START.md`  
**Info.plist template?** → Zie `/INFO_PLIST_ADDITIONS.xml`

---

## 📊 VERWACHTE RESULTATEN

**Na approval:**
- 🆓 Free users: Zien banner ads, kunnen app gratis gebruiken
- 💎 Premium users: Betalen €4.99, krijgen ad-free + extra features
- 💰 Jij: Verdient via ads (€15-600/maand) + IAP sales

**Growth strategy:**
1. Launch in App Store
2. Verzamel eerste reviews (vraag vrienden/familie)
3. Monitor AdMob revenue
4. Optimize IAP conversion rate
5. Add Android version later

---

## ✅ FINALE ACTIEPUNTEN

**NU DOEN:**

1. **AdMob Account Setup** (10 min)
   - Maak account op admob.google.com
   - Haal App ID + Ad Unit ID op

2. **Code Updates** (5 min)
   - Update adMobService.ts met jouw IDs
   - Verifieer App.tsx

3. **Xcode Info.plist** (10 min)
   - Copy/paste uit INFO_PLIST_ADDITIONS.xml
   - Vervang YOUR_ADMOB_APP_ID

4. **Build & Test** (15 min)
   - Clean build in Xcode
   - Test op simulator + device
   - Maak screenshot van Premium Modal

5. **App Store Connect** (20 min)
   - Volg IAP_SUBMISSION_CHECKLIST.md
   - Upload build via Xcode Archive

6. **Submit!** (2 min)
   - Check alle checkboxes
   - Klik "Submit for Review"

**TOTALE TIJD: ~60 minuten** ⏱️

---

**🚀 SUCCES MET JE SUBMISSION!**

Je hebt alles nodig om succesvol te zijn:
✅ Complete IAP implementatie  
✅ AdMob ads voor free users  
✅ Premium unlock voor betaalde users  
✅ App Tracking Transparency compliance  
✅ Complete documentatie

**Go get 'em!** 💪
