# ⚡ ADMOB QUICK START - 30 Minutes Setup

## 🎯 GOAL
Get Google AdMob ads working in TempoStep before App Store submission.

---

## ✅ 3-STEP PROCESS

### **STEP 1: GET ADMOB IDs (10 min)**

1. **https://admob.google.com/** → Sign in
2. **Apps** → **Add App** → **TempoStep** → **iOS**
3. **Copy iOS App ID:**
   ```
   ca-app-pub-XXXXXXXX~YYYYYY
   ```
4. **Ad Units** → **Banner** → **"Metronome Banner"**
5. **Copy Banner Ad Unit ID:**
   ```
   ca-app-pub-XXXXXXXX/YYYYYY
   ```

---

### **STEP 2: UPDATE CODE (5 min)**

**File:** `/src/services/adMobService.ts`

**Find line ~15, replace:**

```typescript
iosAppId: 'ca-app-pub-YOUR_ID_HERE~APP_ID',
iosBannerAdUnitId: 'ca-app-pub-YOUR_ID_HERE/BANNER_ID',
```

---

### **STEP 3: CONFIGURE IOS (15 min)**

**Build first:**
```bash
npm run build
npx cap sync ios
npx cap open ios
```

**In Xcode, open:** `App/App/Info.plist`

**Add 3 things:**

#### **A) AdMob App ID**
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-YOUR_ID_HERE~APP_ID</string>
```

#### **B) App Tracking Transparency**
```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use your data to show you personalized ads and improve your experience.</string>
```

#### **C) SKAdNetwork** (copy entire block from ADMOB_SETUP_GUIDE.md Step 3.3)

---

## 🧪 TEST

Run in Xcode:
1. ✅ ATT popup appears
2. ✅ Test banner ad shows at bottom
3. ✅ Buy premium → ads disappear

---

## 📋 PRE-SUBMISSION CHECKLIST

- [ ] AdMob IDs in adMobService.ts
- [ ] GADApplicationIdentifier in Info.plist
- [ ] NSUserTrackingUsageDescription in Info.plist
- [ ] SKAdNetworkItems in Info.plist
- [ ] App Privacy configured in App Store Connect
- [ ] Tested on real device

---

## 🆘 HELP

**App crashes?** → Missing GADApplicationIdentifier in Info.plist  
**No ads?** → Wrong Ad Unit ID or AdMob not approved yet  
**No ATT popup?** → Missing NSUserTrackingUsageDescription

**Full details:** See `/ADMOB_SETUP_GUIDE.md`

---

## 🚀 REVENUE MODEL

**Free users:** See banner ads  
**Premium ($4.99):** Ad-free forever

**Expected revenue:**
- 1,000 users: €15-60/month (ads) + €100-200 (IAP)
- 10,000 users: €150-600/month (ads) + €1,000+ (IAP)

---

**Time to complete:** ~30 minutes  
**Difficulty:** Easy  
**Impact:** 💰 Monetization ready!
