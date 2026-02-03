# AdMob Setup Guide for TempoStep

This guide will walk you through integrating AdMob ads and publishing your app to the Google Play Store.

---

## 📋 Prerequisites

Before you start, make sure you have:

- [ ] **Node.js** installed (v16 or later) - [Download here](https://nodejs.org/)
- [ ] **Android Studio** installed - [Download here](https://developer.android.com/studio)
- [ ] **Google Play Developer account** ($25 one-time fee) - [Sign up here](https://play.google.com/console/signup)
- [ ] **AdMob account** (free) - [Sign up here](https://admob.google.com/)
- [ ] Basic command line knowledge

---

## 🚀 Step 1: Export Your Code from Figma Make

1. In Figma Make, click the **Export** or **Download** button
2. Download all files as a ZIP
3. Extract the ZIP to a folder on your computer (e.g., `tempostep-app`)

---

## 📱 Step 2: Set Up Capacitor (Native App Wrapper)

Open your terminal/command prompt and navigate to your project folder:

```bash
cd tempostep-app
```

### Install Dependencies

```bash
npm install
```

### Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Initialize Capacitor

```bash
npx cap init
```

When prompted:
- **App name:** `TempoStep`
- **Package ID:** `com.tempostep.app` (or your own unique ID)
- **Web directory:** `dist` (or `build` depending on your setup)

### Add Android Platform

```bash
npm run build  # Build your app first
npx cap add android
```

---

## 💰 Step 3: Create AdMob Account & Ad Units

### Create AdMob Account

1. Go to [https://admob.google.com/](https://admob.google.com/)
2. Click **Get Started** and sign in with Google
3. Complete the account setup

### Create Your App in AdMob

1. In AdMob dashboard, click **Apps** → **Add App**
2. Select **Android**
3. **Is your app listed on a supported app store?** → Select **No**
4. Enter **App name:** `TempoStep`
5. Click **Add App**
6. **Copy your App ID** (looks like `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`)

### Create Ad Units

You need to create 3 ad units:

#### 1. Banner Ad

1. Click **Ad Units** → **Add Ad Unit**
2. Select **Banner**
3. **Ad unit name:** `TempoStep Banner`
4. Click **Create Ad Unit**
5. **Copy the Ad Unit ID** (looks like `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`)

#### 2. Interstitial Ad

1. Click **Add Ad Unit** again
2. Select **Interstitial**
3. **Ad unit name:** `TempoStep Interstitial`
4. Click **Create Ad Unit**
5. **Copy the Ad Unit ID**

#### 3. Rewarded Ad (Optional)

1. Click **Add Ad Unit** again
2. Select **Rewarded**
3. **Ad unit name:** `TempoStep Rewarded`
4. Click **Create Ad Unit**
5. **Copy the Ad Unit ID**

---

## 🔧 Step 4: Configure AdMob in Your App

### Install AdMob Plugin

```bash
npm install @capacitor-community/admob
npx cap sync
```

### Update AdMob Configuration

Open `/src/config/admob.ts` and replace the placeholder IDs with your actual AdMob IDs:

```typescript
export const ADMOB_CONFIG = {
  appId: {
    android: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX', // Your App ID from Step 3
    ios: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  },
  
  adUnitIds: {
    banner: {
      android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your Banner Ad Unit ID
      ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    },
    
    interstitial: {
      android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your Interstitial Ad Unit ID
      ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    },
    
    rewarded: {
      android: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Your Rewarded Ad Unit ID
      ios: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    },
  },
};
```

### Update AndroidManifest.xml

Open `android/app/src/main/AndroidManifest.xml` and add this inside the `<application>` tag:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"/> <!-- Your App ID -->
```

---

## 🧪 Step 5: Test With Test Ads

For testing, use Google's test ad unit IDs. Update `/src/config/admob.ts`:

```typescript
// FOR TESTING ONLY - Uncomment these lines
adUnitIds: {
  banner: {
    android: 'ca-app-pub-3940256099942544/6300978111', // TEST ID
  },
  interstitial: {
    android: 'ca-app-pub-3940256099942544/1033173712', // TEST ID
  },
}
```

**⚠️ IMPORTANT:** Always use test IDs during development. Using real ad IDs for testing can get your AdMob account banned!

### Build and Test

```bash
npm run build
npx cap sync
npx cap open android
```

This opens Android Studio. Click the **Run** button (green play icon) to test on an emulator or connected device.

---

## 📦 Step 6: Build Release APK

### Configure App Signing

1. Open Android Studio
2. Go to **Build** → **Generate Signed Bundle / APK**
3. Select **APK**
4. Click **Create new** to create a keystore
5. Fill in the details and remember your passwords!
6. Click **Next** → Select **release** → Click **Finish**

Your APK will be in: `android/app/release/app-release.apk`

---

## 🎮 Step 7: Publish to Google Play Store

### Create Play Console App

1. Go to [Google Play Console](https://play.google.com/console/)
2. Click **Create app**
3. Fill in app details:
   - **App name:** TempoStep
   - **Default language:** English
   - **App or game:** App
   - **Free or paid:** Free

### Complete the Setup Checklist

1. **App content**
   - Privacy policy URL (required)
   - Ads declaration: **Yes, my app contains ads**
   - Target audience: Select appropriate age ranges
   - Content rating questionnaire

2. **Store listing**
   - Short description
   - Full description
   - App icon (512x512 PNG)
   - Screenshots (at least 2)
   - Feature graphic (1024x500 PNG)

3. **Upload APK**
   - Go to **Production** → **Create new release**
   - Upload your `app-release.apk`
   - Add release notes
   - Click **Save** → **Review release** → **Start rollout to Production**

### Wait for Review

Google typically reviews apps within 1-3 days.

---

## 💡 Tips & Best Practices

### Ad Placement Strategy

Your app currently shows:
- **Banner ad** at the bottom (when not premium)
- **Interstitial ad** - You can trigger this after certain actions

Good times to show interstitial ads:
- After completing a practice session
- When switching between major tabs
- After saving a preset

### Revenue Optimization

1. **Don't show ads too frequently** - Users will uninstall
2. **Give users a way to remove ads** - Premium feature (already implemented!)
3. **Test ad placements** - See what works best

### AdMob Best Practices

- ✅ Use test IDs during development
- ✅ Don't click your own ads
- ✅ Respect user experience - don't spam ads
- ❌ Never encourage users to click ads
- ❌ Never place ads near clickable buttons

---

## 🐛 Troubleshooting

### Ads Not Showing?

1. **Check if you're using test IDs** - Real ads may take 24-48 hours to appear for new apps
2. **Verify AdMob account is approved** - Check AdMob dashboard
3. **Check console logs** - Look for AdMob errors in Chrome DevTools
4. **Verify internet connection** - Ads require network access
5. **Check if premium is enabled** - Ads won't show if `premiumFeatures.adFree` is true

### Build Errors?

1. **Clean and rebuild:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx cap sync
   ```

2. **Update Capacitor:**
   ```bash
   npm install @capacitor/core@latest @capacitor/cli@latest
   npx cap sync
   ```

### Still Having Issues?

- Check [Capacitor docs](https://capacitorjs.com/docs)
- Check [AdMob plugin docs](https://github.com/capacitor-community/admob)
- Search Stack Overflow
- Check AdMob support forums

---

## 📊 Monitoring Revenue

After publishing:

1. Visit [AdMob Dashboard](https://admob.google.com/)
2. View **Reports** to see:
   - Impressions
   - Clicks
   - Estimated earnings
   - eCPM (earnings per 1000 impressions)

---

## 🎯 Next Steps

After your app is live:

1. **Monitor AdMob earnings** daily
2. **Track user reviews** in Play Console
3. **Update app regularly** with new features
4. **A/B test ad placements** to optimize revenue
5. **Promote your app** to get more downloads

---

## 📞 Support

- **AdMob Support:** [https://support.google.com/admob](https://support.google.com/admob)
- **Play Console Help:** [https://support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)
- **Capacitor Community:** [https://forum.capacitor.com/](https://forum.capacitor.com/)

---

**Good luck with your app launch! 🚀**
