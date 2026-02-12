# 🚀 IAP QUICK REFERENCE - Copy/Paste Ready

## 📋 PRODUCT DETAILS

```
Product Type: Non-Consumable
Reference Name: Premium Unlock
Product ID: com.tempostep.premium
Price Tier: 5 (€4.99)
```

---

## 🌍 LOCALIZATIONS - COPY/PASTE

### English (U.S.)
```
Display Name:
Premium Features

Description:
Unlock all premium features including unlimited custom practice presets, 5 professional metronome sounds (woodblock, cowbell, click, clave), and a complete ad-free experience. One-time purchase, yours forever.
```

### Dutch (Netherlands)
```
Display Name:
Premium Functies

Description:
Ontgrendel alle premium functies inclusief onbeperkt aangepaste oefen-presets, 5 professionele metronoom geluiden (woodblock, cowbell, click, clave) en een volledig advertentievrije ervaring. Eenmalige aankoop, voor altijd van jou.
```

### German (Germany)
```
Display Name:
Premium-Funktionen

Description:
Schalten Sie alle Premium-Funktionen frei, einschließlich unbegrenzter benutzerdefinierter Übungs-Presets, 5 professioneller Metronom-Sounds (Woodblock, Cowbell, Click, Clave) und einem komplett werbefreien Erlebnis. Einmaliger Kauf, für immer Ihnen gehörend.
```

### Spanish (Spain)
```
Display Name:
Funciones Premium

Description:
Desbloquea todas las funciones premium, incluidos presets de práctica personalizados ilimitados, 5 sonidos profesionales de metrónomo (woodblock, cowbell, click, clave) y una experiencia completamente sin anuncios. Compra única, tuya para siempre.
```

### French (France)
```
Display Name:
Fonctionnalités Premium

Description:
Débloquez toutes les fonctionnalités premium, y compris des presets d'entraînement personnalisés illimités, 5 sons de métronome professionnels (woodblock, cowbell, click, clave) et une expérience entièrement sans publicité. Achat unique, à vous pour toujours.
```

---

## 📝 REVIEW NOTES - COPY/PASTE

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

## 🔧 REVENUECAT CONFIGURATION

### Product Setup
```
Product ID: com.tempostep.premium
Store: App Store
Type: Non-Consumable
```

### Entitlement Setup
```
Identifier: premium
Display Name: Premium Features
Attached Product: com.tempostep.premium
```

### Offering Setup
```
Offering ID: default
Package ID: premium_unlock
Product: com.tempostep.premium
Current: YES
```

---

## 📸 SCREENSHOT INSTRUCTIONS

1. Open: `/src/app/App.tsx`
2. Find line ~67
3. Change: `setState(false)` → `setState(true)`
4. Run: `npm run build && npx cap sync ios && npx cap open ios`
5. Cmd + S in Simulator
6. Change back: `setState(true)` → `setState(false)`

---

## ✅ SUBMISSION CHECKLIST

- [ ] IAP product created: `com.tempostep.premium`
- [ ] Price: €4.99 (Tier 5)
- [ ] Localizations: EN + NL (minimum)
- [ ] Screenshot uploaded
- [ ] Review notes added
- [ ] IAP linked to app version
- [ ] Screenshot mode disabled in code
- [ ] Submitted for review

---

## 🆘 QUICK FIXES

**Screenshot too large?**
→ Resize to 1242x2208 pixels

**IAP not visible in list?**
→ Save IAP product first, status must be "Ready to Submit"

**Can't find "In-App Purchases" in app submission?**
→ Scroll to "Monetization" section → "In-App Purchases and Subscriptions"

---

## 📞 LINKS

- App Store Connect: https://appstoreconnect.apple.com
- RevenueCat Dashboard: https://app.revenuecat.com
- Apple IAP Docs: https://developer.apple.com/in-app-purchase/
