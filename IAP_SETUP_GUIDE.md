# 🛒 In-App Purchase Setup Guide - TempoStep

Complete guide to set up Apple In-App Purchases for TempoStep using RevenueCat.

---

## 📋 Overview

TempoStep uses **RevenueCat** for managing in-app purchases. RevenueCat provides:
- ✅ Easy integration with Apple StoreKit
- ✅ Cross-platform support (iOS + Android)
- ✅ Server-side receipt validation
- ✅ Free tier: Up to $2,500/month tracked revenue
- ✅ Analytics dashboard
- ✅ Webhook support for backend notifications

---

## 🎯 Step 1: Create RevenueCat Account (5 minutes)

### 1. Sign Up (FREE)
🔗 https://app.revenuecat.com/signup

- Create account with your email
- Verify email address
- Log in to RevenueCat dashboard

### 2. Create a Project
1. Click **"Create new project"**
2. Name: `TempoStep`
3. Click **"Create"**

---

## 📱 Step 2: Add iOS App in RevenueCat (5 minutes)

### 1. Add App
1. In RevenueCat dashboard → Click **"Apps"** (left menu)
2. Click **"+ New"**
3. Select **"iOS"**

### 2. Configure App
Fill in:
- **App name:** `TempoStep`
- **Bundle ID:** `com.tempostep.app` (must match your App Store Connect Bundle ID!)
- **App Store Connect App ID:** Leave empty for now (we'll add this later)

### 3. Get API Key
1. After creating the app → Click **"API Keys"** tab (top)
2. Find **"iOS API Key"** 
3. **Copy the key** (starts with `appl_...`)
4. Keep this window open - you'll need it in Step 5!

---

## 🍎 Step 3: Create IAP Products in App Store Connect (10 minutes)

### 1. Go to App Store Connect
🔗 https://appstoreconnect.apple.com/apps

1. Select your **TempoStep** app
2. Click **"In-App Purchases"** (left menu)
3. Click **"+"** to create new product

### 2. Create Premium Unlock Product

**Product Details:**
- **Reference Name:** `Premium Unlock`
- **Product ID:** `com.tempostep.premium` ⚠️ MUST MATCH CODE!
- **Type:** **Non-Consumable** (one-time purchase)

**Price:**
- **Price Tier:** Choose your price (e.g., Tier 5 = €4.99)

**Localization (English - U.S.):**
- **Display Name:** `Premium Features`
- **Description:** `Unlock all premium features: unlimited presets, extra sounds, and ad-free experience.`

**Review Information:**
- **Screenshot:** Upload a screenshot of Premium Modal (1242x2208px or 1284x2778px)
  - Take screenshot of Premium Modal from your app
  - Or use any app screenshot showing premium features

**Click "Save"**

### 3. Optional: Create Remove Ads Product (if you want separate ad removal)

**Product Details:**
- **Reference Name:** `Remove Ads`
- **Product ID:** `com.tempostep.removeads` ⚠️ MUST MATCH CODE!
- **Type:** **Non-Consumable**

**Price:** Choose tier (e.g., Tier 3 = €2.99)

**Localization:**
- **Display Name:** `Remove Ads`
- **Description:** `Remove all ads and enjoy an uninterrupted practice experience.`

**Click "Save"**

---

## 🔗 Step 4: Link Products in RevenueCat (10 minutes)

### 1. Create Entitlements
**What are entitlements?** They represent what features users get access to after purchase.

1. In RevenueCat dashboard → Click **"Entitlements"** (left menu)
2. Click **"+ New"**
3. **Identifier:** `premium` (lowercase, no spaces!)
4. **Name:** `Premium Features`
5. Click **"Create"**

### 2. Create Offering
**What is an offering?** A collection of products you want to show to users.

1. Click **"Offerings"** (left menu)
2. Click **"+ New"**
3. **Identifier:** `default` ⚠️ Keep as "default"!
4. **Description:** `Default offering`
5. Click **"Create"**

### 3. Add Products to Offering
1. In the "default" offering → Click **"+ Add Package"**

**Package 1: Premium Unlock**
- **Identifier:** `premium_unlock`
- **Type:** **Lifetime** (one-time purchase)
- **Product:**
  - Platform: **iOS**
  - Product ID: Select `com.tempostep.premium` from dropdown
- **Attached Entitlements:** Select `premium`
- Click **"Save"**

**Optional: Package 2: Remove Ads**
If you created the Remove Ads product:
- **Identifier:** `remove_ads`
- **Type:** **Lifetime**
- **Product:** Select `com.tempostep.removeads`
- **Attached Entitlements:** Select `premium` (or create `no_ads` entitlement)
- Click **"Save"**

---

## 🔑 Step 5: Add RevenueCat API Key to Code (2 minutes)

### 1. Open IAP Service File
Open: `/src/services/iapService.ts`

### 2. Replace API Key
Find this line (around line 20):
```typescript
const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_IOS_API_KEY_HERE';
```

Replace with your **actual API key** from Step 2:
```typescript
const REVENUECAT_API_KEY = 'appl_XxXxXxXxXxXxXxXxXx'; // Your real key!
```

### 3. Save File
- Save the file
- Commit to Git:
```bash
git add src/services/iapService.ts
git commit -m "Add RevenueCat API key"
git push
```

---

## 🔨 Step 6: Build iOS App with IAP (30 minutes)

### 1. Update Capacitor Config
Make sure Bundle ID matches:

Open `/capacitor.config.ts` and verify:
```typescript
appId: 'com.tempostep.app', // Must match App Store Connect!
```

### 2. Sync Capacitor
```bash
npm run build
npx cap sync ios
```

### 3. Add RevenueCat to iOS Native Project

You have two options:

**OPTION A: Via GitHub Actions (Recommended)**

1. The GitHub Actions workflow will automatically install RevenueCat
2. Push your code to GitHub
3. The iOS build will include RevenueCat SDK

**OPTION B: Manual (if you have Xcode)**

1. Open Xcode project:
```bash
npx cap open ios
```

2. In Xcode → File → Add Packages
3. Search for: `https://github.com/RevenueCat/purchases-ios`
4. Version: Latest
5. Click "Add Package"

### 4. Build & Upload to TestFlight

Follow the main iOS build guide: `/IOS_SETUP_GUIDE.md`

---

## 🧪 Step 7: Test IAP in Sandbox (1-2 hours)

### 1. Create Sandbox Test Account

**In App Store Connect:**
1. Go to **Users and Access** → **Sandbox Testers**
2. Click **"+"**
3. Fill in:
   - **First Name:** Test
   - **Last Name:** User
   - **Email:** Use a UNIQUE email (can be fake, like `test123@example.com`)
   - **Password:** Create password (remember this!)
   - **Country:** Netherlands (or your country)
4. Click **"Invite"**

⚠️ **IMPORTANT:** 
- DO NOT use a real Apple ID!
- Use a unique email (can be fake)
- Remember the password!

### 2. Sign Out of Real Apple ID on Test Device

**On your iPhone:**
1. Settings → App Store
2. Tap your name at top
3. Tap **"Sign Out"**

⚠️ **DO NOT sign in with sandbox account yet!**

### 3. Install TestFlight Build

1. Install TestFlight from App Store (if not installed)
2. Open TestFlight
3. Install your TempoStep build (uploaded in Step 6)

### 4. Test Purchase Flow

**In TempoStep app:**
1. Open app
2. Go to Premium Modal
3. Tap **"Unlock Premium Now"**
4. You'll be prompted to sign in
5. **Now** sign in with your **Sandbox Test Account** (from Step 7.1)
6. Complete the purchase (it's FREE in sandbox!)

**Expected behavior:**
- Purchase succeeds
- All premium features unlock
- Toast shows "Premium unlocked!"

### 5. Test Restore Purchases

1. Delete the app from iPhone
2. Reinstall from TestFlight
3. Open app → Premium Modal
4. Tap **"Restore Purchases"**
5. Sign in with same sandbox account

**Expected:** All features should restore!

---

## ✅ Step 8: Verify IAP in RevenueCat Dashboard

After testing purchases:

1. Go to RevenueCat dashboard
2. Click **"Charts"** (left menu)
3. You should see:
   - Test purchases appear in charts
   - Active subscribers count
   - Revenue (will show $0 for sandbox)

---

## 🚀 Step 9: Submit to App Store

### 1. Complete App Store Connect Listing

Go back to App Store Connect → Your app:
- Make sure all screenshots uploaded
- Description filled
- Privacy policy URL set
- Support URL set (GitHub Pages site)

### 2. Select Build

1. In App Store Connect → **App Store** tab
2. Scroll to **"Build"** section
3. Click **"+ Select a build"**
4. Choose your latest TestFlight build (with IAP)

### 3. Add for Review

1. Scroll to top
2. Click **"Add for Review"**
3. Click **"Submit to App Review"**

**Review time:** 24-72 hours (usually 48h with IAP)

---

## 🐛 Troubleshooting

### "No products available"

**Solutions:**
- Wait 2-4 hours after creating products in App Store Connect (they need to sync)
- Check Bundle ID matches exactly
- Verify products are in "Ready to Submit" state
- Check RevenueCat API key is correct

### "Purchase failed"

**Solutions:**
- Make sure you're signed in with Sandbox account
- Check internet connection
- Verify product IDs match in code and App Store Connect
- Try signing out/in again with sandbox account

### "Restore found no purchases"

**Solutions:**
- Make sure you completed a test purchase first
- Use same sandbox account for restore
- Wait a few minutes after purchase
- Check RevenueCat dashboard to verify purchase was recorded

### App crashes on launch (iOS)

**Solutions:**
- Make sure RevenueCat SDK is installed (`npx cap sync ios`)
- Check Xcode build logs for errors
- Verify API key format is correct (starts with `appl_`)

---

## 📊 Analytics & Monitoring

### RevenueCat Dashboard

View real-time data:
- **Charts:** Revenue, active users, conversions
- **Customers:** Individual purchase history
- **Events:** Real-time purchase events

### Webhooks (Optional - Advanced)

If you have a backend server, you can receive webhook events:
1. RevenueCat → Settings → Webhooks
2. Add your server URL
3. Receive events for purchases, renewals, cancellations

---

## 💰 Pricing Tiers Reference

Common App Store price tiers:

| Tier | USD | EUR | GBP |
|------|-----|-----|-----|
| 1    | $0.99 | €0.99 | £0.99 |
| 3    | $2.99 | €2.99 | £2.99 |
| 5    | $4.99 | €4.99 | £4.99 |
| 10   | $9.99 | €9.99 | £9.99 |

**Recommendation for TempoStep:** 
- Premium Unlock: **Tier 5** (€4.99) - Good value for all features
- Remove Ads only: **Tier 3** (€2.99) - Lower barrier

---

## 🎯 Next Steps

After IAP is live:
1. Monitor RevenueCat dashboard for conversions
2. A/B test different price tiers
3. Add promotional offers (discounts)
4. Implement subscription options (monthly/yearly)
5. Add referral system

---

## 📞 Support

**RevenueCat:**
- Docs: https://docs.revenuecat.com
- Support: support@revenuecat.com
- Community: https://community.revenuecat.com

**Apple:**
- IAP Guide: https://developer.apple.com/in-app-purchase/
- App Store Connect: https://help.apple.com/app-store-connect/

---

## ✅ Checklist

Before launching IAP:

- [ ] RevenueCat account created
- [ ] iOS app added to RevenueCat
- [ ] API key copied and added to code
- [ ] IAP products created in App Store Connect
- [ ] Products linked in RevenueCat (Entitlements + Offering)
- [ ] Code updated with API key
- [ ] iOS build created with RevenueCat SDK
- [ ] Sandbox test account created
- [ ] Purchase tested successfully
- [ ] Restore purchases tested
- [ ] RevenueCat dashboard shows test purchase
- [ ] App submitted to App Store with build

**You're ready to launch!** 🚀
