# 🔗 Store Links - Quick Reference

## App URLs (Te gebruiken in marketing, website, emails)

### 🍎 iOS App Store
**Status:** ⏳ Wachtend op goedkeuring

**Link format:**
```
https://apps.apple.com/app/id[YOUR_APP_ID]
```

**Zodra live, update naar:**
```
https://apps.apple.com/app/tempostep/id[YOUR_APP_ID]
```

**Huidige status:**
- Bundle ID: `com.tempostep.app`
- App Name: `Metronome & Tuner - TempoStep`
- In review: ⏳ TBD

---

### 🤖 Android Google Play
**Status:** ✅ Klaar voor upload

**Link:**
```
https://play.google.com/store/apps/details?id=com.tempostep.app
```

---

## QR Codes (Voor Marketing)

### iOS QR Code:
Genereer op: https://www.qr-code-generator.com/
- Input: iOS App Store URL
- Use for: Posters, business cards, flyers

### Android QR Code:
- Input: Google Play URL
- Use for: Same as above

### Universal QR (Both):
Gebruik je website URL die redirect naar juiste store:
```
https://niekhilhorst1008.github.io/Tempostep
```

---

## In-App Review Buttons

### Current Implementation:
- ✅ Auto-detects iOS vs Android
- ✅ Opens correct store
- ✅ Fallback to Google Play in browser

### Code Location:
`/src/app/App.tsx` - `handleLeaveReview()` functie

---

## Social Media Links

### Twitter/X:
```
📱 Download TempoStep - Progressive Metronome

iOS: [Your iOS Link]
Android: https://play.google.com/store/apps/details?id=com.tempostep.app

#metronome #music #practice
```

### Instagram Bio:
```
🎵 Progressive Metronome App
⬇️ Download:
🍎 iOS: [link in bio]
🤖 Android: [link in bio]
```

### Email Signature:
```
Download TempoStep:
iOS | Android
```

---

## Website Integration

### On GitHub Pages Site:
Update `/docs/index.html` (or wherever download links are):

```html
<!-- iOS -->
<a href="https://apps.apple.com/app/id[YOUR_APP_ID]" 
   class="app-store-button">
  Download on App Store
</a>

<!-- Android -->
<a href="https://play.google.com/store/apps/details?id=com.tempostep.app"
   class="play-store-button">
  Get it on Google Play
</a>
```

---

## Analytics Tracking

### To track downloads, add UTM parameters:

#### iOS:
```
https://apps.apple.com/app/id[YOUR_APP_ID]?utm_source=website&utm_medium=button&utm_campaign=launch
```

#### Android:
```
https://play.google.com/store/apps/details?id=com.tempostep.app&referrer=utm_source%3Dwebsite%26utm_medium%3Dbutton%26utm_campaign%3Dlaunch
```

---

## App Store Badges (Official Graphics)

### iOS Badge:
Download from: https://developer.apple.com/app-store/marketing/guidelines/
- Black or White
- Multiple languages
- Use official badge (required by Apple)

### Android Badge:
Download from: https://play.google.com/intl/en_us/badges/
- Choose language
- Download PNG or SVG
- Use official badge (required by Google)

---

## When App Goes Live

### Update These Files:
1. ✅ `/src/app/App.tsx` - Add App Store ID
2. ✅ Website - Add download buttons
3. ✅ README.md - Add badges
4. ✅ Social media - Update links

### Marketing Checklist:
- [ ] Post on Twitter/X
- [ ] Post on Instagram
- [ ] Post on LinkedIn
- [ ] Post on Facebook
- [ ] Email newsletter (if you have one)
- [ ] Product Hunt launch
- [ ] Reddit (r/metronome, r/musicproduction, etc)
- [ ] Update portfolio/website

---

## Support URLs

**Currently set in App Store Connect:**
- Support URL: `https://niekhilhorst1008.github.io/Tempostep`
- Privacy Policy: Same as above (GitHub Pages)

---

**Last Updated:** February 2, 2026  
**Next Update:** After App Store approval ✅
