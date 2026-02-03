/**
 * AdMob Configuration for TempoStep
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create an AdMob account at https://admob.google.com
 * 2. Create a new app in AdMob dashboard
 * 3. Create ad units for each placement (banner, interstitial)
 * 4. Replace the placeholder IDs below with your actual AdMob ad unit IDs
 * 5. Install Capacitor AdMob plugin: npm install @capacitor-community/admob
 */

import { Capacitor } from '@capacitor/core';

export const ADMOB_CONFIG = {
  // Replace these with your actual AdMob IDs from admob.google.com
  appId: {
    android: 'ca-app-pub-3940256099942544~3347511713', // Google's test app ID - REPLACE LATER
    ios: 'ca-app-pub-3940256099942544~3347511713',     // Google's test app ID - REPLACE LATER
  },
  
  adUnitIds: {
    // Banner ads (shown at bottom of app)
    banner: {
      android: 'ca-app-pub-3940256099942544/6300978111', // TEST ID - REPLACE with your real ID later
      ios: 'ca-app-pub-3940256099942544/2934735716',     // TEST ID - REPLACE with your real ID later
    },
    
    // Interstitial ads (full-screen ads shown between activities)
    interstitial: {
      android: 'ca-app-pub-3940256099942544/1033173712', // TEST ID - REPLACE with your real ID later
      ios: 'ca-app-pub-3940256099942544/4411468910',     // TEST ID - REPLACE with your real ID later
    },
    
    // Rewarded ads (optional - users watch ad to unlock features)
    rewarded: {
      android: 'ca-app-pub-3940256099942544/5224354917', // TEST ID - REPLACE with your real ID later
      ios: 'ca-app-pub-3940256099942544/1712485313',     // TEST ID - REPLACE with your real ID later
    },
  },
};

/**
 * Helper to get the correct ad unit ID based on platform
 */
export function getAdUnitId(adType: 'banner' | 'interstitial' | 'rewarded'): string {
  const platform = getPlatform();
  return ADMOB_CONFIG.adUnitIds[adType][platform];
}

/**
 * Helper to get the app ID based on platform
 */
export function getAppId(): string {
  const platform = getPlatform();
  return ADMOB_CONFIG.appId[platform];
}

/**
 * Detect platform (defaults to android for web testing)
 */
function getPlatform(): 'android' | 'ios' {
  if (typeof window === 'undefined') return 'android';
  
  try {
    // Check if running in Capacitor
    if (Capacitor.isNativePlatform()) {
      const platform = Capacitor.getPlatform();
      return platform === 'ios' ? 'ios' : 'android';
    }
  } catch {
    // Fallback for older Capacitor versions
    if ((window as any).Capacitor) {
      const platform = (window as any).Capacitor.getPlatform?.();
      if (platform === 'ios') return 'ios';
    }
  }
  
  // Default to android for web/PWA
  return 'android';
}

/**
 * Check if running in native app (Capacitor)
 */
export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    return Capacitor.isNativePlatform();
  } catch {
    // Fallback: check if Capacitor object exists
    return !!(window as any).Capacitor;
  }
}