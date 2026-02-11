# Publishing Checklist for TempoStep

Use this checklist to track your progress from development to Google Play Store.

---

## ✅ Phase 1: AdMob Setup

- [ ] Create AdMob account
- [ ] Create app in AdMob dashboard
- [ ] Copy App ID from AdMob
- [ ] Create Banner ad unit and copy ID
- [ ] Create Interstitial ad unit and copy ID
- [ ] Create Rewarded ad unit and copy ID (optional)
- [ ] Update `/src/config/admob.ts` with your IDs
- [ ] Test with Google's test ad IDs first

---

## ✅ Phase 2: Local Development

- [ ] Node.js installed (v16+)
- [ ] Export code from Figma Make
- [ ] Run `npm install`
- [ ] Install Capacitor: `npm install @capacitor/core @capacitor/cli`
- [ ] Install Capacitor Android: `npm install @capacitor/android`
- [ ] Run `npx cap init`
  - App name: TempoStep
  - Package ID: com.tempostep.app
- [ ] Install AdMob plugin: `npm install @capacitor-community/admob`
- [ ] Run `npm run build`
- [ ] Run `npx cap add android`
- [ ] Update `AndroidManifest.xml` with App ID
- [ ] Run `npx cap sync`

---

## ✅ Phase 3: Testing

- [ ] Test in browser (PWA mode with placeholder ads)
- [ ] Open in Android Studio: `npx cap open android`
- [ ] Test on Android emulator with test ad IDs
- [ ] Test on physical Android device
- [ ] Verify banner ads show at bottom
- [ ] Test premium features work
- [ ] Test that ads disappear when premium is purchased
- [ ] Test all translations (6 languages)
- [ ] Test all themes (light, dark, aqua)
- [ ] Test metronome functionality
- [ ] Test tuner functionality
- [ ] Test preset save/load
- [ ] Test offline functionality (PWA)
- [ ] Test background audio with Wake Lock

---

## ✅ Phase 4: Build Release APK

- [ ] Replace test ad IDs with real ad IDs in `/src/config/admob.ts`
- [ ] Update app version in `android/app/build.gradle`
- [ ] Open Android Studio
- [ ] Build → Generate Signed Bundle / APK
- [ ] Create keystore (save passwords securely!)
- [ ] Select "release" build variant
- [ ] Build APK
- [ ] Test release APK on device
- [ ] Verify app name shows as "TempoStep"
- [ ] Verify app icon displays correctly
- [ ] Save keystore file in safe location (you'll need it for updates!)

---

## ✅ Phase 5: Play Store Assets

### Required Assets:

- [ ] **App Icon** (512x512 PNG, no transparency)
- [ ] **Feature Graphic** (1024x500 PNG)
- [ ] **Screenshots** (minimum 2, recommended 4-8)
  - Phone screenshots: 1080x1920 or similar
  - Tablet screenshots (optional but recommended)
- [ ] **Privacy Policy URL** (required!)
  - Can use [App Privacy Policy Generator](https://app-privacy-policy-generator.nisrulz.com/)
- [ ] **Short Description** (max 80 characters)
  - Example: "Professional metronome with tempo progression and tuner for musicians"
- [ ] **Full Description** (max 4000 characters)
  - See example below
- [ ] **App Category**: Music & Audio
- [ ] **Contact Email**
- [ ] **Website URL** (optional)

### Screenshot Ideas:

1. Main metronome screen with tempo display
2. Time signature selector
3. Tempo progression settings
4. Tuner interface
5. Settings showing themes
6. Presets list

---

## ✅ Phase 6: Google Play Console Setup

- [ ] Create Google Play Developer account ($25 one-time)
- [ ] Create new app in Play Console
- [ ] Complete app details:
  - App name: TempoStep
  - Default language: English
  - App or game: App
  - Free or paid: Free
- [ ] Upload app icon
- [ ] Upload feature graphic
- [ ] Upload screenshots
- [ ] Write short description
- [ ] Write full description
- [ ] Set app category
- [ ] Complete content rating questionnaire
  - Answer questions about app content
- [ ] Declare ads: **Yes, app contains ads**
- [ ] Set target audience (All ages appropriate for metronome)
- [ ] Create privacy policy and add URL
- [ ] Select content rating board (IARC)
- [ ] Add contact details

---

## ✅ Phase 7: Upload & Publish

- [ ] Go to Production → Create new release
- [ ] Upload `app-release.apk` or AAB bundle
- [ ] Add release notes (what's new in this version)
- [ ] Review release details
- [ ] Click "Review release"
- [ ] Fix any issues flagged by Play Console
- [ ] Submit for review
- [ ] Wait for Google approval (1-3 days typically)
- [ ] Check email for approval notification
- [ ] App goes live automatically after approval!

---

## ✅ Phase 8: Post-Launch

- [ ] Verify app is live on Play Store
- [ ] Test downloading from Play Store
- [ ] Share app link with friends for feedback
- [ ] Monitor AdMob dashboard for impressions/revenue
- [ ] Check Play Console for user reviews
- [ ] Respond to user reviews
- [ ] Monitor crash reports in Play Console
- [ ] Plan first update based on feedback

---

## 📝 Example App Description

### Short Description (80 chars):
```
Professional metronome with tempo progression and tuner for musicians
```

### Full Description:
```
TempoStep - The Smart Practice Metronome for Musicians

Perfect your timing and build your speed with TempoStep, the professional metronome app designed for serious musicians.

🎵 KEY FEATURES:

✓ Progressive Tempo Training
  - Automatically increases tempo over time
  - Customizable progression steps
  - Perfect for building speed gradually

✓ Advanced Time Signatures
  - Support for 1-18 beats per bar
  - All standard note values (whole, half, quarter, eighth, sixteenth, thirty-second)
  - Custom accent patterns

✓ Professional Tuner
  - Real-time pitch detection
  - Adjustable reference pitch (A440)
  - Clear visual feedback

✓ Beat Subdivisions
  - Quarter notes, eighth notes
  - Eighth triplets, sixteenth notes
  - Practice complex rhythms accurately

✓ Practice Presets
  - Save unlimited practice configurations
  - Quick-load your favorite settings
  - Perfect for different pieces or exercises

✓ Beautiful Design
  - Clean, musician-focused interface
  - Three color themes (Light, Dark, Aqua)
  - Animated visual metronome

✓ Premium Sound Options
  - Multiple metronome sounds (beep, woodblock, cowbell, click, clave)
  - High-quality audio synthesis

✓ Multilingual Support
  - English, Spanish, French, German, Italian, Portuguese

✓ Background Playback
  - Keep practicing with screen off
  - Wake Lock support for uninterrupted sessions

🎯 PERFECT FOR:
• Music students building technique
• Professional musicians practicing challenging passages
• Teachers demonstrating tempo progression
• Ensemble players maintaining steady tempo

📱 WORKS OFFLINE:
TempoStep works completely offline - practice anywhere, anytime!

💰 FREE WITH OPTIONAL PREMIUM:
• Remove ads
• Unlock premium sounds
• Unlimited presets

Download TempoStep today and take your practice to the next level!
```

---

## 🚨 Common Issues & Solutions

### App rejected for "Inappropriate Content"
→ Make sure content rating questionnaire is filled correctly

### App rejected for "Privacy Policy"
→ Add a valid privacy policy URL before submitting

### Ads not showing after publish
→ AdMob needs 24-48 hours to start serving real ads to new apps

### APK upload fails
→ Make sure version code increments with each upload
→ Check that package name matches exactly

### App crashes on launch
→ Test the release APK before submitting
→ Check Android logs in Android Studio

---

## 🎯 Revenue Optimization Tips

1. **Give value before asking** - Let users try the app before showing interstitial ads
2. **Ad-free option** - Offer premium IAP to remove ads (you already have this!)
3. **Strategic placement** - Show ads at natural break points, not during active use
4. **Rewarded videos** - Best CPM, but users must opt-in
5. **Monitor metrics** - Track retention vs. ad frequency, adjust accordingly

---

## 📞 Important Links

- **Play Console:** https://play.google.com/console/
- **AdMob Dashboard:** https://admob.google.com/
- **Capacitor Docs:** https://capacitorjs.com/docs/
- **AdMob Plugin:** https://github.com/capacitor-community/admob

---

**Good luck with your launch! 🚀**

Print this checklist and mark off items as you complete them!
