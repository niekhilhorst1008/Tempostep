# 🎯 ADMOB SETUP GUIDE - Complete Implementation

## 📋 OVERVIEW

**What we're implementing:**
- ✅ Google AdMob banner ads for free users
- ✅ Ad-free experience for premium users (IAP unlock)
- ✅ App Tracking Transparency (ATT) - Required for iOS 14.5+
- ✅ GDPR/Privacy compliance

**Revenue model:**
- 🆓 Free users see banner ads at bottom of metronome screen
- 💎 Premium users ($4.99) = No ads forever

---

## 🚀 PART 1: GOOGLE ADMOB ACCOUNT SETUP (15 minutes)

### **Step 1.1: Create AdMob Account**

1. **Go to:** https://admob.google.com/

2. **Sign in** with your Google account

3. **Click "Get Started"** (if first time)

4. **Select account type:**
   - Choose: **"I haven't used AdMob before"**
   - Country: Netherlands
   - Timezone: (GMT+01:00) Amsterdam
   - Currency: EUR (€)

5. **Accept Terms & Conditions**

---

### **Step 1.2: Add Your App**

1. **Apps** → **Add App**

2. **Is your app listed on a supported app store?**
   - Select: **"NO"** (because not published yet)

3. **App name:**
   ```
   TempoStep
   ```

4. **Platform:**
   - Select: **iOS**

5. **Enable user metrics:**
   - Toggle: **ON** (helps with optimization)

6. **Click "Add App"**

---

### **Step 1.3: Copy iOS App ID**

You'll see a screen showing:

```
✅ App successfully created!

iOS App ID: ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
```

**⚠️ IMPORTANT: SAVE THIS ID!**

Example:
```
ca-app-pub-3940256099942544~1458002511
```

You'll need this for:
- iOS `Info.plist` file
- `adMobService.ts` configuration

---

### **Step 1.4: Create Banner Ad Unit**

1. **Click "Ad units"** (in left menu)

2. **Select ad format:**
   - Choose: **"Banner"**

3. **Ad unit name:**
   ```
   Metronome Banner
   ```

4. **Click "Create ad unit"**

5. **Copy the Ad Unit ID:**

```
iOS Banner Ad Unit ID: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

**⚠️ IMPORTANT: SAVE THIS ID TOO!**

Example:
```
ca-app-pub-3940256099942544/2934735716
```

---

## 🔧 PART 2: CODE CONFIGURATION (10 minutes)

### **Step 2.1: Update AdMob Service with YOUR IDs**

1. **Open:** `/src/services/adMobService.ts`

2. **Find line ~15:**

```typescript
const ADMOB_CONFIG = {
  // iOS App ID (from AdMob console)
  iosAppId: 'ca-app-pub-3940256099942544~1458002511', // TEST ID - Replace with your real ID
  
  // iOS Banner Ad Unit ID
  iosBannerAdUnitId: 'ca-app-pub-3940256099942544/2934735716', // TEST ID - Replace with your real ID
```

3. **REPLACE with YOUR IDs from Step 1.3 and 1.4:**

```typescript
const ADMOB_CONFIG = {
  // ⚠️ REPLACE THESE WITH YOUR REAL IDs FROM ADMOB CONSOLE
  iosAppId: 'ca-app-pub-YOUR_PUBLISHER_ID~YOUR_APP_ID',
  iosBannerAdUnitId: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_AD_UNIT_ID',
  
  // Android IDs (for future - leave as test IDs for now)
  androidAppId: 'ca-app-pub-3940256099942544~3347511713',
  androidBannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111',
};
```

4. **Save the file**

---

## 📱 PART 3: iOS CONFIGURATION (15 minutes)

### **Step 3.1: Add AdMob App ID to Info.plist**

⚠️ **CRITICAL: Without this, your app will CRASH on iOS!**

1. **Build your iOS project first:**

```bash
npm run build
npx cap sync ios
npx cap open ios
```

2. **In Xcode, open:** `App/App/Info.plist`

3. **Add AdMob App ID:**

**Right-click in the plist editor** → **Add Row**

```xml
Key: GADApplicationIdentifier
Type: String
Value: ca-app-pub-YOUR_PUBLISHER_ID~YOUR_APP_ID
```

**OR edit as source code (Right-click → Open As → Source Code):**

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-YOUR_PUBLISHER_ID~YOUR_APP_ID</string>
```

**Example with real ID:**
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-3940256099942544~1458002511</string>
```

---

### **Step 3.2: Add App Tracking Transparency (ATT) Permission**

⚠️ **REQUIRED for iOS 14.5+ or App Store REJECTION!**

**Still in Info.plist, add:**

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We use your data to show you personalized ads and improve your experience. You can manage your preferences anytime in Settings.</string>
```

**OR for Dutch users:**

```xml
<key>NSUserTrackingUsageDescription</key>
<string>We gebruiken je gegevens om gepersonaliseerde advertenties te tonen en je ervaring te verbeteren. Je kunt je voorkeuren altijd beheren in Instellingen.</string>
```

**📝 What this does:**
- Shows a popup: "Allow TempoStep to track your activity across other companies' apps and websites?"
- User can tap "Allow" or "Ask App Not to Track"
- Required by Apple since iOS 14.5

---

### **Step 3.3: Add SKAdNetwork Identifiers (for iOS 14+)**

⚠️ **Required for iOS 14+ ad attribution**

Google AdMob requires specific SKAdNetwork identifiers for iOS 14+.

**Still in Info.plist, add this entire block:**

```xml
<key>SKAdNetworkItems</key>
<array>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cstr6suwn9.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4fzdc2evr5.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4pfyvq9l8r.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>2fnua5tdw4.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ydx93a7ass.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>5a6flpkh64.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>p78axxw29g.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v72qych5uu.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ludvb6z3bs.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cp8zw746q7.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3sh42y64q3.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>c6k4g5qg8m.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>s39g8k73mm.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3qy4746246.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>f38h382jlk.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>hs6bdukanm.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v4nxqhlyqp.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>wzmmz9fp6w.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>yclnxrl5pm.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>t38b2kh725.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>7ug5zh24hu.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>gta9lk7p23.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>vutu7akeur.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>y5ghdn5j9k.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>n6fk4nfna4.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v9wttpbfk9.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>n38lu8286q.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>47vhws6wlr.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>kbd757ywx3.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>9t245vhmpl.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>eh6m2bh4zr.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>a2p9lx4jpn.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>22mmun2rn5.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4468km3ulz.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>2u9pt9hc89.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>8s468mfl3y.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>klf5c3l5u5.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ppxm28t8ap.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ecpz2srf59.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>uw77j35x4d.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>pwa73g5rt2.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>mlmmfzh3r3.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>578prtvx9j.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4dzt52r2t5.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>e5fvkxwrpn.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>8c4e2ghe7u.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>zq492l623r.skadnetwork</string>
  </dict>
  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3qcr597p9d.skadnetwork</string>
  </dict>
</array>
```

**📝 What this does:**
- Allows AdMob to properly track ad conversions on iOS 14+
- Required for ad revenue optimization
- Apple requires this for ads to work properly

---

### **Step 3.4: Sync Capacitor**

After modifying Info.plist:

```bash
npx cap sync ios
```

---

## 🏪 PART 4: APP STORE CONNECT CONFIGURATION

### **Step 4.1: Update App Privacy Information**

1. **App Store Connect** → **My Apps** → **TempoStep**

2. **App Privacy** (left menu)

3. **Get Started** (or Edit if already filled)

4. **Data Types:**

Click **"Advertising Data"** → **Yes, we collect advertising data**

```
Data Type: Advertising Data
Collection: YES
Usage: App Functionality, Analytics, Product Personalization, Advertising

Linked to User: NO
Tracking: YES (for personalized ads)
```

Click **"Device ID"** → **Yes, we collect device ID**

```
Data Type: Device ID
Collection: YES
Usage: Advertising, Analytics

Linked to User: NO
Tracking: YES
```

5. **Save**

---

### **Step 4.2: Set Advertising Identifier (IDFA) Usage**

1. **Still in App Privacy**

2. **Scroll to "Do you or your third-party partners use this data for tracking purposes?"**

3. **Select: YES**

4. **Explanation:**
```
We use the Advertising Identifier (IDFA) through Google AdMob to show relevant ads to free users. Premium users experience an ad-free app. Users can opt out via the App Tracking Transparency prompt.
```

---

## 🧪 PART 5: TESTING (20 minutes)

### **Step 5.1: Test in Simulator (Test Ads)**

The code already uses **TEST Ad IDs** by default during development.

1. **Build and run:**

```bash
npm run build
npx cap sync ios
npx cap open ios
```

2. **Run in Simulator**

3. **Open app → Metronome tab**

4. **You should see:**
   - ✅ ATT popup appears first time: "Allow TempoStep to track..."
   - ✅ Test banner ad at bottom (Google test ad)

**Test banner looks like:**
```
┌───────────────────────────────┐
│  [Google Test Ad]             │
│  This is a test advertisement │
└───────────────────────────────┘
```

---

### **Step 5.2: Test Premium Flow**

1. **Tap "Presets" tab**

2. **Tap "Create Preset"**

3. **Premium modal appears**

4. **Complete purchase flow** (sandbox testing)

5. **After purchase:**
   - ✅ Banner ad disappears immediately
   - ✅ Ad-free experience forever

---

### **Step 5.3: Test on Real Device**

⚠️ **For real testing, you MUST use a real device!**

1. **Connect iPhone via USB**

2. **Select your iPhone as target** in Xcode

3. **Build & Run**

4. **First launch:**
   - ATT popup appears
   - Tap "Allow" or "Ask App Not to Track"

5. **Check banner ad:**
   - If "Allow": Personalized ads
   - If "Ask App Not to Track": Non-personalized ads (lower revenue)

---

## 📊 PART 6: PRODUCTION SETUP

### **Step 6.1: Switch to Production Ad IDs**

Before App Store submission:

1. **Open:** `/src/services/adMobService.ts`

2. **Find line ~19:**

```typescript
isTesting: false, // Set to true during development
```

**Verify it's set to `false` for production!**

---

### **Step 6.2: Verify Info.plist**

Double-check these are in `ios/App/App/Info.plist`:

✅ **GADApplicationIdentifier** = Your real AdMob App ID  
✅ **NSUserTrackingUsageDescription** = ATT message  
✅ **SKAdNetworkItems** = Full list of identifiers

---

### **Step 6.3: Final Build**

```bash
# Clean build
npm run build
npx cap sync ios
npx cap open ios

# In Xcode:
# 1. Product → Clean Build Folder (Cmd+Shift+K)
# 2. Increment Build Number (e.g., 1.0.0 → 1.0.1)
# 3. Product → Archive
```

---

## 🚀 PART 7: APP STORE SUBMISSION

### **Step 7.1: App Store Connect Checklist**

Before submitting, verify:

- [ ] AdMob App ID in Info.plist
- [ ] NSUserTrackingUsageDescription in Info.plist
- [ ] SKAdNetworkItems in Info.plist
- [ ] App Privacy filled out (Advertising Data + Device ID)
- [ ] Production Ad IDs in adMobService.ts
- [ ] isTesting = false in adMobService.ts
- [ ] IAP product submitted (from previous guide)

---

### **Step 7.2: Submit Together with IAP**

**IMPORTANT:** Submit your app with **BOTH** features enabled:

1. ✅ In-App Purchase (Premium unlock)
2. ✅ AdMob (Ads for free users)

This way Apple reviews the complete experience:
- Free users → See ads
- Premium users → Ad-free

---

## 💰 EXPECTED REVENUE

**Banner Ad Revenue (estimates):**

```
Scenario 1: 1,000 free users/month
- Impressions: ~30,000/month (assuming 30 sessions each)
- CPM: ~€0.50 - €2.00 (Europe)
- Revenue: €15 - €60/month

Scenario 2: 10,000 free users/month
- Impressions: ~300,000/month
- CPM: ~€0.50 - €2.00
- Revenue: €150 - €600/month

Premium Sales: €4.99 each
- 2% conversion rate from 10,000 users = 200 sales
- Revenue: €998/month
```

**Total potential:** €1,148 - €1,598/month with 10,000 users

---

## 🆘 TROUBLESHOOTING

### **Problem: App crashes on launch**

**Cause:** Missing GADApplicationIdentifier in Info.plist

**Fix:**
1. Open `ios/App/App/Info.plist`
2. Add GADApplicationIdentifier key (see Step 3.1)
3. Clean build and run again

---

### **Problem: No ads showing**

**Causes:**
1. AdMob account not approved yet (takes 24-48 hours)
2. Ad Unit not linked to app
3. Test mode enabled but no test device ID

**Fix:**
1. Check AdMob dashboard for approval status
2. Verify Ad Unit ID in adMobService.ts
3. For testing, use Google's test IDs (already in code)

---

### **Problem: ATT popup not appearing**

**Cause:** NSUserTrackingUsageDescription missing

**Fix:**
1. Add to Info.plist (see Step 3.2)
2. Delete app from device/simulator
3. Clean build and reinstall

---

### **Problem: "Revenue not showing in AdMob"**

**Cause:** Takes 24-48 hours to show in dashboard

**Fix:**
- Be patient, check after 2 days
- Verify impressions are being tracked

---

## ✅ FINAL CHECKLIST

Before submitting to App Store:

### **Code:**
- [ ] AdMob package installed: `@capacitor-community/admob`
- [ ] adMobService.ts configured with YOUR Ad IDs
- [ ] App.tsx shows/hides ads based on premium status
- [ ] isTesting = false in production

### **iOS Configuration:**
- [ ] GADApplicationIdentifier in Info.plist
- [ ] NSUserTrackingUsageDescription in Info.plist
- [ ] SKAdNetworkItems array in Info.plist
- [ ] Capacitor synced: `npx cap sync ios`

### **AdMob Console:**
- [ ] Account created and approved
- [ ] App registered
- [ ] Banner Ad Unit created
- [ ] App ID and Ad Unit ID copied

### **App Store Connect:**
- [ ] App Privacy configured (Advertising Data + Device ID)
- [ ] Tracking usage declared
- [ ] IAP product submitted (Premium unlock)

### **Testing:**
- [ ] ATT popup appears on first launch
- [ ] Test ads showing for free users
- [ ] Ads disappear after premium purchase
- [ ] Tested on real device (not just simulator)

---

**🎉 READY TO SUBMIT!**

Once all checkboxes are ✅, you're ready to:
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review with both IAP + Ads

**Good luck!** 🚀
