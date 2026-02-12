# ✅ IAP SUBMISSION CHECKLIST - Complete Guide

**Doel:** Je app + IAP samen submitten aan Apple voor review

**Tijd nodig:** ~30-45 minuten

---

## 📸 DEEL 1: SCREENSHOT MAKEN (10 minuten)

### **Stap 1.1: Enable Screenshot Mode**

1. **Open:** `/src/app/App.tsx`

2. **Zoek regel ~67** (staat er nu al een comment bij):

```typescript
// 📸 SCREENSHOT MODE: Set to TRUE to auto-open Premium Modal
const [premiumModalOpen, setPremiumModalOpen] = useState(false); // Change to TRUE for screenshot
```

3. **Verander naar:**

```typescript
const [premiumModalOpen, setPremiumModalOpen] = useState(true); // ⚠️ SCREENSHOT MODE ON
```

---

### **Stap 1.2: Build en run in Simulator**

```bash
# Terminal commands:
npm run build
npx cap sync ios
npx cap open ios
```

4. **In Xcode:**
   - Select **iPhone 15 Pro** simulator (of iPhone 14 Pro)
   - Click **▶ Run** button
   - Wacht tot app opstart

5. **Premium Modal opent AUTOMATISCH!** 🎉

---

### **Stap 1.3: Screenshot maken**

1. **In de simulator:**
   - Premium Modal is nu zichtbaar
   - Zorg dat de modal volledig geladen is

2. **Screenshot maken:**
   - Druk **Cmd + S** (of File → New Screen Shot)
   - Screenshot wordt opgeslagen op je **Desktop**
   - Bestandsnaam: `Simulator Screen Shot - iPhone 15 Pro - 2025-02-09 at XX.XX.XX.png`

3. **Screenshot hernoemen:**
   - Hernoem naar: `TempoStep-Premium-IAP.png`

4. **✅ Screenshot klaar!**

---

### **Stap 1.4: Disable Screenshot Mode** ⚠️

**BELANGRIJK: Dit NIET vergeten!**

1. **Ga terug naar:** `/src/app/App.tsx`

2. **Verander TERUG:**

```typescript
const [premiumModalOpen, setPremiumModalOpen] = useState(false); // Screenshot mode OFF
```

3. **Save het bestand!**

---

## 🏪 DEEL 2: IAP PRODUCT AANMAKEN IN APP STORE CONNECT (15 minuten)

### **Stap 2.1: Naar App Store Connect**

1. **Open browser:**
   - Ga naar: https://appstoreconnect.apple.com
   - Login met je Apple Developer account

2. **Navigeer:**
   - **My Apps** → **TempoStep**

---

### **Stap 2.2: In-App Purchase aanmaken**

1. **Linkermenu:**
   - Klik **"Monetization"** (uitklappen als nodig)
   - Klik **"In-App Purchases"**

2. **Product aanmaken:**
   - Klik de **"+"** button (rechtsboven of midden)
   - Als je geen IAP hebt, klik **"Create In-App Purchase"**

3. **Type selecteren:**
   - Kies **"Non-Consumable"**
   - (= one-time purchase, geen subscription)
   - Klik **"Create"**

---

### **Stap 2.3: Product Information invullen**

Vul EXACT deze gegevens in:

```
┌─────────────────────────────────────────────┐
│ SECTION: Product Information                │
└─────────────────────────────────────────────┘

Reference Name:
Premium Unlock

Product ID:
com.tempostep.premium

⚠️ CRITICAL: Product ID moet EXACT zijn!
   Dit staat ook in je code (iapService.ts)
```

**Klik "Save"** (rechtsboven)

---

### **Stap 2.4: Pricing invullen**

1. **Scroll naar "Subscription Pricing" of "Price Schedule"**
   - (Ja, ook voor Non-Consumables heet dit soms zo)

2. **Klik "Add Pricing"** of **"Set Up Pricing"**

3. **Kies je prijs tier:**

```
AANBEVOLEN PRICING:

🥇 Beste optie: Tier 5 = €4.99
   → Standaard voor metronome premium features
   → Goede waarde voor gebruikers
   → Redelijke inkomsten voor jou

Andere opties:
🥈 Tier 4 = €3.99 (budget-friendly)
🥉 Tier 3 = €2.99 (laagste voor premium)
💎 Tier 6 = €5.99 (hogere waarde)
```

4. **Selecteer "Tier 5"** (of jouw keuze)

5. **Availability:**
   - "Available in all territories" ✅

6. **Klik "Next"** → **"Save"**

---

### **Stap 2.5: App Store Localization (Verplicht!)**

Scroll naar **"App Store Localization"**

#### **📍 English (U.S.)** (verplicht)

Klik **"+ Add Localization"** → Kies **"English (U.S.)"**

```
Display Name:
Premium Features

Description:
Unlock all premium features including unlimited custom practice presets, 5 professional metronome sounds (woodblock, cowbell, click, clave), and a complete ad-free experience. One-time purchase, yours forever.
```

**Klik "Save"**

---

#### **📍 Dutch (Netherlands)** (aanbevolen - jouw markt!)

Klik **"+ Add Localization"** → Kies **"Dutch (Netherlands)"**

```
Display Name:
Premium Functies

Description:
Ontgrendel alle premium functies inclusief onbeperkt aangepaste oefen-presets, 5 professionele metronoom geluiden (woodblock, cowbell, click, clave) en een volledig advertentievrije ervaring. Eenmalige aankoop, voor altijd van jou.
```

**Klik "Save"**

---

#### **📍 German (Germany)** (optioneel maar aanbevolen)

```
Display Name:
Premium-Funktionen

Description:
Schalten Sie alle Premium-Funktionen frei, einschließlich unbegrenzter benutzerdefinierter Übungs-Presets, 5 professioneller Metronom-Sounds (Woodblock, Cowbell, Click, Clave) und einem komplett werbefreien Erlebnis. Einmaliger Kauf, für immer Ihnen gehörend.
```

---

#### **📍 Spanish (Spain)** (optioneel)

```
Display Name:
Funciones Premium

Description:
Desbloquea todas las funciones premium, incluidos presets de práctica personalizados ilimitados, 5 sonidos profesionales de metrónomo (woodblock, cowbell, click, clave) y una experiencia completamente sin anuncios. Compra única, tuya para siempre.
```

---

#### **📍 French (France)** (optioneel)

```
Display Name:
Fonctionnalités Premium

Description:
Débloquez toutes les fonctionnalités premium, y compris des presets d'entraînement personnalisés illimités, 5 sons de métronome professionnels (woodblock, cowbell, click, clave) et une expérience entièrement sans publicité. Achat unique, à vous pour toujours.
```

---

### **Stap 2.6: Review Information (Verplicht!)**

Scroll verder naar beneden naar **"Review Information"**

#### **A) Screenshot uploaden:**

1. **Klik "Choose File"** onder "In-App Purchase Review Screenshot"

2. **Upload de screenshot** die je in Deel 1 maakte:
   - Bestand: `TempoStep-Premium-IAP.png`

3. **Als screenshot te groot/klein is:**
   - Resize naar: **1242 x 2208 pixels** (iPhone 6.7" display)
   - Of: **1170 x 2532 pixels** (iPhone 6.1" display)
   - Tool: Preview app → Tools → Adjust Size

---

#### **B) Review Notes:**

Copy-paste deze tekst in het "Review Notes" veld:

```
TO TEST THE IN-APP PURCHASE:

1. Launch the TempoStep app
2. Tap the "Presets" tab (bookmark icon) in the bottom navigation bar
3. Tap the "Create Preset" button (+ icon in top right)
4. The Premium modal will appear showing the purchase option

WHAT PREMIUM UNLOCKS:
• Unlimited custom practice presets - Save favorite tempo/time signature combinations
• 5 professional metronome sounds: Beep (default), Woodblock, Cowbell, Click, and Clave
• Complete ad-free experience - No banner or interstitial ads

TECHNICAL DETAILS:
• Integration: RevenueCat SDK (industry standard for IAP)
• RevenueCat API Key: appl_SlwbjrVEBgZmZyuVjzUxlnlTDPj
• Product ID: com.tempostep.premium
• Entitlement ID: premium
• Type: Non-Consumable (one-time purchase)
• Sandbox testing: Fully configured and ready

The purchase flow is fully implemented and tested. All features unlock immediately after successful purchase. Restore purchases is available in the Premium modal for users who reinstall.

Thank you for reviewing TempoStep!
```

---

### **Stap 2.7: Save IAP Product**

1. **Scroll naar boven**

2. **Klik "Save"** (rechtsboven)

3. **Status check:**
   - Status moet zijn: **"Ready to Submit"** ✅
   - Als status iets anders is (bijv. "Missing Metadata"), check welke velden leeg zijn

---

## 🔗 DEEL 3: IAP KOPPELEN AAN APP SUBMISSION (5 minuten)

### **Stap 3.1: Naar App Version**

1. **Linksboven:** Klik **"< TempoStep"** (terug naar app overview)

2. **Klik op je app versie:**
   - Waarschijnlijk: **"1.0 Prepare for Submission"**
   - Of: **"1.0.1"** (als je versie hebt verhoogd)

---

### **Stap 3.2: IAP Toevoegen aan Submission**

1. **Scroll naar sectie:**
   - **"In-App Purchases and Subscriptions"**

2. **Status check:**
   - Staat er **"None"** of **"0 In-App Purchase"**?
   - ✅ Dat moet je aanpassen!

3. **Klik de "+" button** (naast "In-App Purchases")

4. **Popup verschijnt:**
   - Je ziet een lijst van beschikbare IAP producten
   - ✅ **"Premium Unlock"** (`com.tempostep.premium`) moet zichtbaar zijn

5. **Selecteer "Premium Unlock"**
   - Klik checkbox aan
   - Klik **"Done"** of **"Add"**

6. **Verificatie:**
   - Sectie toont nu: **"1 In-App Purchase"**
   - Je ziet: **"Premium Unlock - com.tempostep.premium"**
   - ✅ Perfect!

---

## 🚀 DEEL 4: APP RESUBMIT (5 minuten)

### **Stap 4.1: Check App Metadata**

Scroll door je app submission en check of alles compleet is:

✅ **App Information**
✅ **Pricing and Availability**
✅ **App Privacy** (privacy policy URL?)
✅ **App Review Information** (contact info, demo account?)
✅ **Version Information** (screenshots, description, keywords, etc.)
✅ **Build** (je hebt een build geüpload?)
✅ **In-App Purchases** (1 product gekoppeld) ← NU NIEUW!

---

### **Stap 4.2: Submit for Review**

1. **Rechtsboven:** Klik **"Save"** (als je wijzigingen hebt gemaakt)

2. **Rechtsboven:** Klik **"Submit for Review"** button

3. **Export Compliance popup verschijnt:**

```
Is your app designed to use cryptography or does it contain or incorporate cryptography?

Kies: YES

Does your app qualify for any of the exemptions provided in Category 5, Part 2?

Kies: YES (for standard HTTPS encryption)
```

4. **Klik "Submit"**

---

### **Stap 4.3: Bevestiging**

Je ziet nu:

```
✅ Status: "Waiting for Review"

Your app has been submitted for review.
```

**Email bevestiging:**
- Je krijgt een email van Apple: "Your submission was received"

---

## 🎯 KLAAR! WAT NU?

### **Timeline:**

```
Nu:            Waiting for Review
Over 1-3 uur:  In Review
Over 1-2 dagen: Review compleet → Approved of Rejected
```

### **Als APPROVED:**

1. **Je IAP product status → "Ready for Sale"**
2. **Je app status → "Ready for Sale"**
3. **Gebruikers kunnen Premium kopen!** 💰

---

### **Als REJECTED:**

- Check rejection reason in App Store Connect
- Fix het probleem
- Resubmit

**Common rejection reasons:**
- Screenshot niet duidelijk genoeg
- Privacy policy ontbreekt
- Export compliance verkeerd ingevuld

---

## 📊 NA APPROVAL: REVENUECAT CONFIGUREREN

**Je hebt RevenueCat API key al,** maar je moet nog:

### **Stap 5.1: Product in RevenueCat Dashboard**

1. **https://app.revenuecat.com**

2. **Products** → **New Product**

3. **Vul in:**
   ```
   Product ID: com.tempostep.premium
   Store: App Store
   Type: Non-Consumable
   ```

### **Stap 5.2: Entitlement**

1. **Entitlements** → **New Entitlement**

2. **Vul in:**
   ```
   Identifier: premium
   Display Name: Premium Features
   ```

3. **Attach product:**
   - Koppel `com.tempostep.premium` aan `premium` entitlement

### **Stap 5.3: Offering**

1. **Offerings** → **New Offering**

2. **Vul in:**
   ```
   Identifier: default
   Description: Default offering
   ```

3. **Add Package:**
   - Product: `com.tempostep.premium`
   - Package ID: `premium_unlock`

4. **Set as Current Offering** ✅

---

## 🧪 TESTING NA APPROVAL

### **Sandbox Testing:**

1. **Settings → App Store → Sign Out**

2. **Run app op device**

3. **Klik "Unlock Premium"**

4. **Login met Sandbox Tester:**
   - (Maak aan in App Store Connect → Users & Access → Sandbox Testers)

5. **Test purchase flow**

6. **Verify premium features unlock**

---

## ✅ FINAL CHECKLIST

Voordat je submit, check deze punten:

- [ ] Screenshot gemaakt van Premium Modal
- [ ] IAP product aangemaakt: `com.tempostep.premium`
- [ ] Pricing ingesteld: €4.99 (Tier 5)
- [ ] Localization ingevuld (minimaal Engels + Nederlands)
- [ ] Screenshot geüpload in Review Information
- [ ] Review Notes ingevuld
- [ ] IAP gekoppeld aan app submission (1 In-App Purchase zichtbaar)
- [ ] Screenshot mode DISABLED in code (`premiumModalOpen = false`)
- [ ] App gesubmit for review
- [ ] Email bevestiging ontvangen van Apple

---

## 🆘 HULP NODIG?

**Screenshot te groot/klein:**
- Resize naar 1242x2208 pixels
- Of gebruik Xcode Image Asset tool

**IAP niet zichtbaar in app submission:**
- Check of IAP status = "Ready to Submit"
- Save IAP product eerst
- Refresh app submission page

**Review Notes te lang:**
- Max 4000 characters
- Shorten als nodig

**Stuck ergens:**
- Zeg waar je vastzit
- Ik help je verder!

---

**🚀 SUCCES MET JE SUBMISSION!**
