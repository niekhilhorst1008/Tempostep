# iOS Optimization Checklist ✅

Deze checklist toont alle iOS-specifieke optimalisaties die zijn toegepast aan TempoStep.

## ✅ Web App Optimalisaties (Voltooid)

### HTML & Meta Tags
- [x] `viewport-fit=cover` voor safe area support
- [x] `apple-mobile-web-app-capable` voor standalone mode
- [x] `apple-mobile-web-app-status-bar-style="black-translucent"` voor immersive experience
- [x] Multiple `apple-touch-icon` sizes (180x180, 152x152, 120x120, 76x76)
- [x] `format-detection="telephone=no"` om automatische link detectie uit te schakelen
- [x] `format-detection="address=no"` voor adressen

### CSS Optimalisaties
- [x] Safe area insets support (`env(safe-area-inset-*)`)
- [x] Overscroll/rubber-band prevention
- [x] iOS viewport height fix (100vh issue)
- [x] `-webkit-tap-highlight-color: transparent`
- [x] `-webkit-touch-callout: none` (disable callout menu)
- [x] `-webkit-overflow-scrolling: touch` (smooth scrolling)
- [x] Minimum touch target size (44x44pt)
- [x] Input zoom prevention (font-size: 16px)
- [x] Better font rendering (`-webkit-font-smoothing`)
- [x] GPU acceleration for animations
- [x] Removed iOS inner shadow on inputs

### JavaScript/TypeScript Optimalisaties
- [x] iOS detection utility (`isIOS()`)
- [x] iOS standalone mode detection (`isIOSStandalone()`)
- [x] Haptic feedback support (`triggerHaptic()`)
- [x] Persistent storage request
- [x] iOS Audio Context initialization (`initAudioContextIOS()`)
- [x] Viewport height fix function (`fixIOSViewportHeight()`)
- [x] Web Audio API support detection
- [x] iOS version detection
- [x] Notch/Dynamic Island detection

### Audio Optimalisaties
- [x] Audio Context resume bij user interaction
- [x] Silent sound voor iOS audio "unlock"
- [x] Web Audio API compatibility checks
- [x] Wake Lock API support (waar beschikbaar)

### PWA Manifest
- [x] `scope` property toegevoegd
- [x] `prefer_related_applications: false`
- [x] `shortcuts` voor quick actions
- [x] Multiple icon purposes (any, maskable)
- [x] `dir` en `lang` properties
- [x] iOS-compatible icon sizes

## ✅ Capacitor Configuratie (Voltooid)

### capacitor.config.ts
- [x] `iosScheme: 'https'` voor secure context
- [x] iOS-specific configuration object:
  - [x] `contentInset: 'automatic'`
  - [x] `scrollEnabled: true`
  - [x] `backgroundColor: '#2563eb'`
  - [x] `allowsInlineMediaPlayback: true` (kritiek voor Web Audio)
  - [x] `suppressesIncrementalRendering: false`
- [x] Keyboard plugin configuratie
- [x] SplashScreen met iOS-specific styling

## 📋 Voor Xcode Setup (Nog Te Doen)

### App Icons
- [ ] 1024x1024 App Store icon
- [ ] 180x180 iPhone @3x
- [ ] 120x120 iPhone @2x
- [ ] 167x167 iPad Pro @2x
- [ ] 152x152 iPad @2x
- [ ] 76x76 iPad
- [ ] 40x40 Spotlight
- [ ] 20x20 Notifications

### Info.plist
- [ ] NSMicrophoneUsageDescription toegevoegd (zie ios-info-plist-additions.xml)
- [ ] UIBackgroundModes met 'audio'
- [ ] UIStatusBarStyle configured
- [ ] UISupportedInterfaceOrientations ingesteld

### Certificates & Signing
- [ ] Apple Developer account aangemaakt
- [ ] Bundle ID geregistreerd (com.tempostep.app)
- [ ] Development certificate
- [ ] Distribution certificate
- [ ] Provisioning profiles

### App Store Connect
- [ ] App aangemaakt in App Store Connect
- [ ] Screenshots voor alle device maten
- [ ] Privacy Policy URL
- [ ] Support URL
- [ ] App beschrijving (NL/EN)
- [ ] Keywords
- [ ] Age rating
- [ ] Pricing & availability

## 🧪 Testing Checklist

### Functionaliteit Tests
- [ ] Metronoom start/stop werkt
- [ ] Audio speelt af op iOS
- [ ] Haptic feedback werkt (indien ondersteund)
- [ ] Tuner krijgt microfoon toegang
- [ ] Settings worden opgeslagen (localStorage)
- [ ] Presets werken correct
- [ ] Theme switching werkt
- [ ] Language switching werkt

### UI/UX Tests op iOS
- [ ] Safe areas correct (geen overlap met notch/home indicator)
- [ ] Bottom navigation bereikbaar met duim
- [ ] Buttons minimaal 44x44pt
- [ ] Geen input zoom bij focus
- [ ] Geen overscroll bounce
- [ ] Smooth scrolling werkt
- [ ] Status bar style correct
- [ ] Dark mode werkt

### Device Tests
- [ ] iPhone SE (klein scherm)
- [ ] iPhone 14/15 (standaard)
- [ ] iPhone 14/15 Pro Max (groot scherm)
- [ ] iPhone met notch (X, 11, 12, 13)
- [ ] iPhone met Dynamic Island (14 Pro, 15 Pro)
- [ ] iPad (als ondersteund)

### PWA Tests
- [ ] Add to Home Screen werkt
- [ ] Icon zichtbaar op home screen
- [ ] Launch zonder Safari UI (standalone)
- [ ] Data persistent na sluiten app

### Performance Tests
- [ ] App laadt snel (<3 seconden)
- [ ] Geen frame drops bij animaties
- [ ] Audio latency acceptabel (<50ms)
- [ ] Memory gebruik stabiel
- [ ] Batterij gebruik redelijk

## 🚀 Deployment Checklist

### Pre-Submit
- [ ] Alle tests geslaagd
- [ ] Screenshots gemaakt voor alle vereiste devices
- [ ] Privacy policy gepubliceerd
- [ ] Support URL actief
- [ ] App description geoptimaliseerd met keywords
- [ ] Version number correct (1.0.0)
- [ ] Build number correct (1)

### Submit
- [ ] Archive gemaakt in Xcode
- [ ] App validated zonder errors
- [ ] Uploaded naar App Store Connect
- [ ] Alle metadata ingevuld
- [ ] TestFlight build (optioneel)
- [ ] Submit for Review geklikt

### Post-Submit
- [ ] Review status monitoren
- [ ] Eventuele rejection feedback verwerken
- [ ] Marketing materiaal voorbereiden
- [ ] Launch communicatie plannen

## 📱 iOS-Specific Features Geïmplementeerd

### Haptic Feedback
- ✅ Medium haptic bij metronoom start
- ✅ Light haptic bij metronoom stop
- ✅ Fallback naar vibration API

### Safe Areas
- ✅ Top inset (status bar/notch)
- ✅ Bottom inset (home indicator)
- ✅ Left/Right insets (landscape op notch devices)

### Audio
- ✅ User interaction requirement
- ✅ Audio session management
- ✅ Background audio support (capacitor config)
- ✅ Inline playback enabled

### Touch Optimization
- ✅ No tap delay
- ✅ No tap highlight
- ✅ No callout menu
- ✅ Proper active states
- ✅ Momentum scrolling

### Visual Polish
- ✅ Smooth animations
- ✅ GPU acceleration
- ✅ Anti-aliased fonts
- ✅ High-quality icons
- ✅ Translucent status bar

## 📖 Documentatie

- ✅ IOS_SETUP_GUIDE.md - Complete setup instructies
- ✅ ios-info-plist-additions.xml - Info.plist template
- ✅ IOS_OPTIMIZATION_CHECKLIST.md - Deze checklist
- ✅ Code comments in ios.ts utility file

## 🔧 Utility Functions Beschikbaar

Alle iOS utilities zijn beschikbaar via `@/app/utils/ios`:

```typescript
import {
  isIOS,                    // Detecteer iOS
  isIOSStandalone,          // Detecteer standalone PWA
  triggerHaptic,            // Trigger haptic feedback
  requestPersistentStorage, // Request persistent storage
  initAudioContextIOS,      // Initialize audio voor iOS
  fixIOSViewportHeight,     // Fix 100vh issue
  optimizeIOSScroll,        // Optimize scroll element
  supportsWebAudioAPI,      // Check Web Audio support
  getIOSVersion,            // Get iOS version number
  hasNotch                  // Detecteer notch/Dynamic Island
} from '@/app/utils/ios';
```

## ⚠️ Bekende iOS Limitaties

### Audio
- Audio context moet gestart worden door user interaction ✅ Geïmplementeerd
- Sommige iOS versies hebben audio latency issues (niet op te lossen)
- Background audio werkt alleen in standalone/app mode

### PWA
- Geen push notifications in web app (alleen native app)
- Geen badge updates op icon
- Beperkte File System access
- localStorage kan gewist worden bij low storage (vandaar persistent storage request)

### Browser
- Safari heeft geen Web MIDI API support
- ServiceWorker beperkingen in Safari
- Beperkte Bluetooth Web API support

## 🎯 Volgende Stappen

1. **Test de web app op een iPhone:**
   - Open Safari op iPhone
   - Ga naar deployed URL
   - Tap Share → Add to Home Screen
   - Open de app vanuit home screen
   - Test alle functionaliteit

2. **Als je een Mac hebt:**
   - Volg IOS_SETUP_GUIDE.md
   - Run `npx cap add ios`
   - Open in Xcode
   - Build en test op echte device

3. **Als je geen Mac hebt:**
   - De web app is al iOS-optimized en werkt als PWA
   - Overweeg:
     - Mac huren/lenen voor iOS build
     - Mac cloud service gebruiken (bijv. MacStadium, MacinCloud)
     - Developer inhuren voor iOS build

---

**Status:** ✅ Web app is volledig geoptimaliseerd voor iOS  
**Next:** Native iOS app build in Xcode (vereist Mac)
