# ✅ RevenueCat Setup - Laatste Stappen

## 🎯 Status

Je hebt al een **productie API key** (`appl_SlwbjrVEBgZmZyuVjzUxlnlTDPj`) in de code staan!

De premium functies werken **ALLEEN** op een **echte iOS device** en **ALLEEN NADAT** je de producten hebt aangemaakt in:
1. App Store Connect
2. RevenueCat Dashboard

---

## 📱 WAAROM WERKT HET NOG NIET?

Premium functies werken **NIET** in:
- ❌ Browser (web versie)
- ❌ iOS Simulator
- ❌ Android app (zonder aparte setup)

Premium functies werken **ALLEEN** in:
- ✅ Geïnstalleerde iOS app op **echt iPhone/iPad**
- ✅ **NA** het configureren van producten (zie hieronder)

---

## 🛠️ VEREISTE STAPPEN OM PREMIUM TE ACTIVEREN

### **STAP 1: Producten aanmaken in App Store Connect**

1. **Ga naar App Store Connect:**
   - https://appstoreconnect.apple.com
   - **My Apps** → **TempoStep**

2. **Klik op "In-App Purchases" (linkermenu)**

3. **Maak nieuw product aan:**
   - Klik **"+" icoon** → **"Non-Consumable"** (one-time purchase)
   
4. **Vul product info in:**
   ```
   Reference Name: Premium Unlock
   Product ID: com.tempostep.premium
   
   Price: €4.99 (of jouw gewenste prijs)
   
   Display Name (Engels):
   - Premium Features
   
   Description (Engels):
   - Unlock all premium features including unlimited presets, 
     custom sounds, and ad-free experience.
   ```

5. **Voeg vertalingen toe** (Nederlands, Duits, etc.)

6. **Klik "Save"**

7. **Klik "Submit for Review"** (als gevraagd)

8. **Wacht tot status "Ready to Submit" is**

---

### **STAP 2: Product linken in RevenueCat**

1. **Ga naar RevenueCat Dashboard:**
   - https://app.revenuecat.com

2. **Login** met je RevenueCat account

3. **Selecteer je TempoStep project**

4. **Ga naar "Products" (linkermenu)**

5. **Klik "Add Product"**

6. **Selecteer "App Store"**

7. **Vul in:**
   ```
   Product Identifier: com.tempostep.premium
   (moet EXACT overeenkomen met App Store Connect!)
   ```

8. **Klik "Save"**

---

### **STAP 3: Entitlement aanmaken in RevenueCat**

1. **Ga naar "Entitlements" (linkermenu)**

2. **Klik "New Entitlement"**

3. **Vul in:**
   ```
   Identifier: premium
   Display Name: Premium Features
   ```

4. **Klik "Save"**

5. **Koppel product:**
   - Klik op je nieuwe **"premium"** entitlement
   - Klik **"Attach Products"**
   - Selecteer **"com.tempostep.premium"**
   - Klik **"Save"**

---

### **STAP 4: Offering aanmaken in RevenueCat**

1. **Ga naar "Offerings" (linkermenu)**

2. **Klik "New Offering"**

3. **Vul in:**
   ```
   Identifier: default
   Description: Default offering
   ```

4. **Klik "Save"**

5. **Voeg package toe:**
   - Klik **"New Package"**
   - **Package Identifier:** `premium_unlock`
   - **Product:** Selecteer `com.tempostep.premium`
   - **Klik "Save"**

6. **Maak het de current offering:**
   - Toggle **"Current"** aan

---

### **STAP 5: Test op echt iOS device**

1. **Build en installeer app op iPhone:**
   ```bash
   npm run build
   npx cap sync ios
   # Open Xcode en run op echt device
   ```

2. **In de app:**
   - Ga naar **Presets** of **Settings**
   - Klik op een premium feature (bijv. "Create Preset")
   - Premium modal opent
   - Klik **"Unlock Premium"**
   - Apple payment sheet verschijnt
   - Test met **Sandbox tester account**

---

## 🧪 SANDBOX TESTING

### **Sandbox Tester Account aanmaken:**

1. **App Store Connect** → **Users and Access**
2. **Sandbox Testers** → **"+" icoon**
3. **Vul in:**
   ```
   Email: test@tempostep.com (of iets anders)
   Password: [Strong password]
   Country: Netherlands
   ```
4. **Klik "Save"**

### **Testen op device:**

1. **Uitloggen uit echte Apple ID:**
   - Settings → App Store → Sign Out

2. **NIET inloggen met sandbox account!**
   - App zal vragen bij eerste purchase

3. **In TempoStep app:**
   - Klik "Unlock Premium"
   - Apple payment sheet verschijnt
   - Login met **sandbox tester email**
   - Bevestig aankoop (sandbox = gratis!)

4. **Premium features zijn nu unlocked!** ✅

---

## 🔍 TROUBLESHOOTING

### **"No products found" error**

**Oorzaak:** Producten niet correct gelinkt

**Fix:**
- Check of Product ID **EXACT** hetzelfde is in:
  - App Store Connect: `com.tempostep.premium`
  - RevenueCat: `com.tempostep.premium`
  - Code: `PRODUCT_IDS.PREMIUM_UNLOCK`

---

### **Purchase modal toont geen prijs**

**Oorzaak:** App kan producten niet ophalen van Apple

**Fix:**
- Wacht 15-30 minuten na aanmaken product
- Sync App Store Connect met RevenueCat
- Herstart app

---

### **"Not initialized" error**

**Oorzaak:** RevenueCat niet geïnitialiseerd

**Fix:**
- Check of API key correct is: `appl_SlwbjrVEBgZmZyuVjzUxlnlTDPj`
- Herstart app

---

### **Premium blijft niet unlocked na herstart**

**Oorzaak:** Entitlement niet correct gekoppeld

**Fix:**
- Check RevenueCat dashboard → Entitlements
- Zorg dat "premium" entitlement gekoppeld is aan product
- Run "Restore Purchases" in app

---

## 📊 VERIFICATIE

### **Check of alles werkt:**

1. **RevenueCat Dashboard:**
   - Ga naar **Overview**
   - Zie je transactions na test purchase? ✅

2. **In de app:**
   - Premium modal toont prijs? ✅
   - Purchase werkt? ✅
   - Premium features unlock? ✅
   - Na herstart nog steeds unlocked? ✅

---

## 🎉 NA APPROVAL

Zodra je app **goedgekeurd** is door Apple:

1. **Remove sandbox testing**
2. **Echte gebruikers kunnen kopen**
3. **RevenueCat dashboard toont echte revenue**

---

## 💰 PRICING ADVIES

**Aanbevolen prijs voor metronome app:**
- **€3.99 - €4.99** (one-time purchase)
- Of **€1.99/maand** (subscription)
- Of **€9.99/jaar** (subscription)

**Populairste model:**
- Free app met ads
- €4.99 one-time om ads te verwijderen + premium features

---

## 📞 SUPPORT

**RevenueCat docs:** https://docs.revenuecat.com  
**Apple IAP docs:** https://developer.apple.com/in-app-purchase/

**Quick links:**
- RevenueCat Dashboard: https://app.revenuecat.com
- App Store Connect: https://appstoreconnect.apple.com
- Test sandbox purchases: https://developer.apple.com/apple-pay/sandbox-testing/

---

**🔥 TIP:** Test eerst grondig met sandbox account voordat je live gaat!
