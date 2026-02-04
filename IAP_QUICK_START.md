# 🚀 IAP Quick Start - Get Premium Unlocked in 30 Minutes

**Voor wie dit is:** Je wilt snel IAP werkend krijgen voor testing in TestFlight.

**Tijdsinvestering:** ~30 minuten

---

## ⚡ Step-by-Step (Minimale Setup)

### 1. RevenueCat Account (5 min)

1. **Sign up:** https://app.revenuecat.com/signup
2. **Create project:** Name it "TempoStep"
3. **Add iOS app:**
   - Bundle ID: `com.tempostep.app`
   - Copy **iOS API Key** (starts with `appl_...`)

---

### 2. App Store Connect - Create Product (5 min)

1. **Go to:** https://appstoreconnect.apple.com
2. **Select your app** → In-App Purchases → **"+"**
3. **Create product:**
   - Type: **Non-Consumable**
   - Product ID: `com.tempostep.premium` ⚠️ EXACT MATCH!
   - Reference Name: `Premium Unlock`
   - Price: Pick a tier (e.g., €4.99)
   - Display Name: `Premium Features`
   - Description: `Unlock all premium features`
   - Screenshot: Any app screenshot (1242x2208px)
4. **Save**

---

### 3. RevenueCat - Link Product (10 min)

1. **Create Entitlement:**
   - RevenueCat → Entitlements → **"+ New"**
   - Identifier: `premium`
   - Name: `Premium Features`
   - Save

2. **Create Offering:**
   - Offerings → **"+ New"**
   - Identifier: `default` (exactly this!)
   - Save

3. **Add Package:**
   - In "default" offering → **"+ Add Package"**
   - Identifier: `premium_unlock`
   - Type: **Lifetime**
   - Product: Select `com.tempostep.premium`
   - Entitlements: Check `premium`
   - Save

---

### 4. Add API Key to Code (2 min)

1. **Open:** `/src/services/iapService.ts`
2. **Find line ~20:**
   ```typescript
   const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_IOS_API_KEY_HERE';
   ```
3. **Replace with your key:**
   ```typescript
   const REVENUECAT_API_KEY = 'appl_XxXxXxXxXxXx'; // Your real key!
   ```
4. **Save & commit:**
   ```bash
   git add .
   git commit -m "Add RevenueCat IAP integration"
   git push
   ```

---

### 5. Build iOS App (5 min)

**Option A: GitHub Actions (No Mac needed)**
1. GitHub Actions will automatically build with IAP
2. Wait for build to complete (~20 min)
3. Download .ipa and upload to App Store Connect

**Option B: With Xcode**
1. `npm run build`
2. `npx cap sync ios`
3. `npx cap open ios`
4. In Xcode → Build & Archive
5. Upload to TestFlight

---

### 6. Test in Sandbox (5 min)

1. **Create Sandbox Account:**
   - App Store Connect → Users & Access → Sandbox Testers
   - Email: `test@example.com` (can be fake!)
   - Password: Make one up
   - Country: Netherlands

2. **On iPhone:**
   - Settings → App Store → Sign Out (your real account)
   - DON'T sign in yet!
   - Install TestFlight build
   - Open TempoStep → Try to buy Premium
   - Sign in with sandbox account when prompted
   - Complete purchase (FREE in sandbox)

3. **Should see:** "Premium unlocked!" toast 🎉

---

## ✅ Done!

Your IAP is now working!

**Next:** See full guide `/IAP_SETUP_GUIDE.md` for:
- Troubleshooting
- Production setup
- Analytics
- Advanced features

---

## 🐛 Common Issues

### "No products available"
- Wait 2-4 hours after creating product
- Check Bundle ID matches
- Verify product is "Ready to Submit"

### "Purchase failed"
- Use sandbox account, not real Apple ID
- Check internet connection
- Wait a few minutes and try again

### App crashes on launch
- Run `npx cap sync ios` again
- Check API key is correct format

---

## 💡 Tips

- **Sandbox purchases are FREE** - test as much as you want!
- **Use different email** for each sandbox tester
- **Wait 2-4 hours** after creating products before testing
- **RevenueCat dashboard** shows purchases in real-time

---

**Need help?** See `/IAP_SETUP_GUIDE.md` for detailed troubleshooting! 🚀
