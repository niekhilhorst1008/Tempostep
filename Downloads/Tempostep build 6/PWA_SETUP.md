# TempoStep PWA Setup Guide

## ✅ What's Been Configured

Your TempoStep app is now configured as a **Progressive Web App (PWA)**! Here's what's included:

### Files Created:
- `/public/manifest.json` - PWA configuration
- `/public/sw.js` - Service worker for offline support
- `/public/icon.svg` - App icon (SVG format)
- `/public/icon-192.svg` - Small icon (192x192)
- `/public/icon-512.svg` - Large icon (512x512)
- `/index.html` - HTML entry point with PWA meta tags
- `/src/main.tsx` - React entry point with service worker registration

## 📱 How to Install on Android

### Method 1: Chrome Install Prompt (Recommended)
1. Open your app URL in **Chrome on Android**
2. Chrome will automatically show an "Install app" banner at the bottom
3. Tap **"Install"**
4. The app icon will appear on your home screen
5. Launch it like any native app!

### Method 2: Manual Install
1. Open the app in Chrome
2. Tap the **3-dot menu** (⋮) in the top-right corner
3. Select **"Add to Home screen"** or **"Install app"**
4. Confirm the installation
5. Done! The app is now on your home screen

## 🎯 PWA Features

✅ **Standalone Mode** - Opens fullscreen without browser UI  
✅ **Custom App Icon** - Blue metronome icon on home screen  
✅ **Offline Support** - Basic caching for offline use  
✅ **Theme Color** - Blue theme color matches app branding  
✅ **Portrait Lock** - Optimized for vertical phone use  
✅ **Fast Loading** - Resources cached for quick startup

## 🖼️ Icons

The app uses SVG icons which will work in most browsers. For best results on all devices:

**To convert SVG to PNG (optional):**
1. Use an online converter like [CloudConvert](https://cloudconvert.com/svg-to-png)
2. Upload `/public/icon-192.svg` → Export as `icon-192.png`
3. Upload `/public/icon-512.svg` → Export as `icon-512.png`
4. Replace the `.svg` files with `.png` files in `/public/`

Or keep the SVG files - they work great for most use cases!

## 🧪 Testing the PWA

### On Desktop (Chrome/Edge):
1. Open the app
2. Click the **install icon** (⊕) in the address bar
3. Click "Install"

### On Android Chrome:
1. Open the app
2. Wait for the install banner
3. Tap "Install"

### On iOS Safari:
1. Open the app
2. Tap the **Share** button
3. Scroll down and tap **"Add to Home Screen"**
4. Tap "Add"

*Note: iOS doesn't support all PWA features (no service worker), but it will still add a home screen icon*

## 🚀 What Happens When Users Install?

- **Home Screen Icon**: Beautiful blue metronome icon
- **App Name**: "TempoStep"
- **Splash Screen**: Automatic loading screen with your icon and colors
- **No Browser UI**: Fullscreen app experience
- **Background Audio**: Works with Wake Lock API (already implemented)
- **Faster Loading**: Cached resources load instantly

## 🔧 Customization

### Change App Colors:
Edit `/public/manifest.json`:
```json
"theme_color": "#2563eb",  // Browser UI color
"background_color": "#ffffff"  // Splash screen background
```

### Change App Name:
Edit `/public/manifest.json`:
```json
"name": "Your App Name",
"short_name": "Short Name"
```

### Update Icons:
Replace the files in `/public/`:
- `icon-192.svg` (or .png)
- `icon-512.svg` (or .png)

## 📊 Next Steps

### For Production:
1. **Generate PNG icons** from the SVGs (recommended for broader compatibility)
2. **Test on real devices** (Android, iOS)
3. **Add screenshots** to manifest for Google Play Store listing
4. **Consider Capacitor** for native app stores (Google Play, App Store)

### For Testing Right Now:
1. Open your Figma Make URL on your Android phone
2. Install the PWA using Chrome
3. Test all features (metronome, tuner, microphone permissions)
4. Check if it works offline (turn off internet after first load)

## 🎵 Your App is Ready!

The PWA setup is complete. Just open the URL on your phone and install it!

**Current URL**: `https://[your-makeproxy-url].figma.site`

Questions? The app is production-ready for PWA use!
