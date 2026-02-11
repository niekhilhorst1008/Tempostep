# 📝 App Store ID Setup - BELANGRIJK!

## ⚠️ Wat Je Moet Doen Na App Store Approval

Wanneer je app **goedgekeurd** is door Apple, krijg je een **App Store ID**.

---

## 🎯 Stap 1: Vind Je App Store ID

### Na Goedkeuring:
1. Ga naar **App Store Connect**: https://appstoreconnect.apple.com
2. Klik op je app: **TempoStep**
3. Klik op **"App Information"** (linkermenu)
4. Scroll naar beneden naar **"General Information"**
5. Vind: **Apple ID** (dit is een nummer, bijv: `1234567890`)

**Of:**

Wanneer je app live is in de App Store:
1. Open App Store op iPhone
2. Zoek "TempoStep"
3. Kopieer de URL - deze bevat het ID
4. Voorbeeld URL: `https://apps.apple.com/app/tempostep/id1234567890`

---

## 🔧 Stap 2: Update Code Met App Store ID

### File: `/src/app/App.tsx`

**Zoek deze regel (rond regel 570):**

```typescript
window.open('https://apps.apple.com/app/id[YOUR_APP_ID]', '_blank');
```

**Vervang met je echte ID:**

```typescript
window.open('https://apps.apple.com/app/id1234567890', '_blank');
// ☝️ Vervang 1234567890 met je ECHTE App Store ID
```

---

## ✅ Voorbeeld

**Voor:** ❌
```typescript
window.open('https://apps.apple.com/app/id[YOUR_APP_ID]', '_blank');
```

**Na:** ✅
```typescript
window.open('https://apps.apple.com/app/id6738291045', '_blank');
```

---

## 🚀 Volledige Review URLs

Zodra je het ID hebt, kun je deze URLs gebruiken:

### iOS (App Store):
```
https://apps.apple.com/app/id[YOUR_APP_ID]
```

### Android (Google Play):
```
https://play.google.com/store/apps/details?id=com.tempostep.app
```

---

## 📱 Hoe Het Werkt In De App

**Wanneer gebruiker klikt op "Leave a Review":**

### Op iOS (iPhone/iPad):
→ Opent iOS App Store met TempoStep pagina  
→ Gebruiker kan direct 5 sterren geven! ⭐⭐⭐⭐⭐

### Op Android (Android phone):
→ Opent Google Play Store met TempoStep pagina  
→ Gebruiker kan review schrijven

### In Browser (PWA):
→ Opent Google Play Store (fallback)

---

## 🔔 Reminder

**Dit moet je pas doen NADAT:**
1. ✅ App is goedgekeurd door Apple
2. ✅ App is live in App Store
3. ✅ Je hebt het App Store ID gekregen

**Timing:** 
- App submission → 48-72 uur review
- Approved → ID is beschikbaar
- Update code met ID
- Push nieuwe versie (of update huidige)

---

## 📝 Checklist

Na App Store Approval:
- [ ] App Store ID gevonden in App Store Connect
- [ ] Code updated in `/src/app/App.tsx`
- [ ] Getest dat link werkt op iPhone
- [ ] Getest dat link werkt op Android
- [ ] Git commit + push
- [ ] Nieuwe build gemaakt (optioneel)

---

**Voor nu:** Code werkt al! De `[YOUR_APP_ID]` placeholder zal gewoon een lege pagina openen tot je het echte ID invult. Geen crash! ✅

---

## 💡 Pro Tip

Om **meer reviews** te krijgen, kun je later ook:
- SKStoreReviewController gebruiken (native iOS review prompt)
- In-app prompt na 3-5 sessies
- Vragen om review na gebruiker premium unlock

Maar dat is voor **versie 2.0**! Voor nu is de button genoeg. 🚀
