/**
 * AdMob Integration Examples for TempoStep
 * 
 * This file shows examples of where and how to show different types of ads
 * in your app. Copy these examples into your components as needed.
 */

import { admobService } from '../services/admobService';

/**
 * EXAMPLE 1: Show interstitial ad after practice session
 * 
 * Use this when user stops a practice session that lasted more than X minutes
 * This is a good time because user has finished an activity
 */
export async function showAdAfterPractice(practiceMinutes: number) {
  // Only show ad if practice was longer than 2 minutes
  if (practiceMinutes >= 2) {
    console.log('Practice session completed, showing interstitial ad...');
    const shown = await admobService.showInterstitial();
    if (shown) {
      console.log('Interstitial ad shown successfully');
    }
  }
}

/**
 * EXAMPLE 2: Show interstitial ad when switching tabs
 * 
 * Show ad occasionally when user switches between major sections
 * Don't show every time - use a counter to limit frequency
 */
let tabSwitchCount = 0;
export async function showAdOnTabSwitch() {
  tabSwitchCount++;
  
  // Show ad every 5 tab switches
  if (tabSwitchCount >= 5) {
    console.log('Showing interstitial ad after tab switches...');
    await admobService.showInterstitial();
    tabSwitchCount = 0; // Reset counter
  }
}

/**
 * EXAMPLE 3: Show rewarded ad to unlock premium feature temporarily
 * 
 * Give user option to watch ad to unlock premium sounds for 1 hour
 * This is a win-win: user gets feature, you get ad revenue
 */
export async function unlockPremiumWithAd(): Promise<boolean> {
  console.log('User choosing to watch ad for premium access...');
  
  const watched = await admobService.showRewardedVideo();
  
  if (watched) {
    console.log('User watched full ad, unlocking premium for 1 hour');
    
    // Save unlock time to localStorage
    const unlockUntil = Date.now() + 60 * 60 * 1000; // 1 hour from now
    localStorage.setItem('premiumUnlockedUntil', unlockUntil.toString());
    
    return true;
  }
  
  return false;
}

/**
 * EXAMPLE 4: Check if premium is unlocked (via ad or purchase)
 */
export function isPremiumUnlocked(purchasedPremium: boolean): boolean {
  // If user purchased premium, always unlocked
  if (purchasedPremium) {
    return true;
  }
  
  // Check if ad-based unlock is still valid
  const unlockUntil = localStorage.getItem('premiumUnlockedUntil');
  if (unlockUntil) {
    const unlockTime = parseInt(unlockUntil);
    if (Date.now() < unlockTime) {
      return true; // Still within unlocked period
    } else {
      // Expired, remove it
      localStorage.removeItem('premiumUnlockedUntil');
    }
  }
  
  return false;
}

/**
 * EXAMPLE 5: Show interstitial ad after saving preset
 * 
 * Good time because user completed an action and is transitioning
 */
export async function showAdAfterSavePreset(presetCount: number) {
  // Only show if user has saved multiple presets
  // This avoids annoying new users
  if (presetCount >= 3) {
    console.log('Preset saved, showing interstitial ad...');
    await admobService.showInterstitial();
  }
}

/**
 * EXAMPLE 6: Pre-load interstitial ads
 * 
 * Call this at strategic times to ensure ads are ready when needed
 */
export function preloadAds() {
  // Prepare interstitial in the background
  admobService.prepareInterstitial();
  
  // Also prepare rewarded video if you're using it
  admobService.prepareRewardedVideo();
  
  console.log('Ads pre-loaded and ready to show');
}

/**
 * EXAMPLE 7: Smart ad frequency limiting
 * 
 * Don't show ads too frequently - respect your users
 */
const MIN_TIME_BETWEEN_ADS = 5 * 60 * 1000; // 5 minutes
let lastAdShownTime = 0;

export async function showInterstitialWithLimit(): Promise<boolean> {
  const now = Date.now();
  
  // Check if enough time has passed since last ad
  if (now - lastAdShownTime < MIN_TIME_BETWEEN_ADS) {
    console.log('Too soon since last ad, skipping...');
    return false;
  }
  
  const shown = await admobService.showInterstitial();
  
  if (shown) {
    lastAdShownTime = now;
    return true;
  }
  
  return false;
}

/**
 * EXAMPLE 8: Hide banner temporarily
 * 
 * Hide banner during important actions (like tuning or recording)
 */
export async function temporarilyHideBanner(durationMs: number = 30000) {
  await admobService.hideBanner();
  console.log('Banner hidden temporarily');
  
  // Show again after duration
  setTimeout(async () => {
    await admobService.showBanner();
    console.log('Banner shown again');
  }, durationMs);
}

/**
 * RECOMMENDED AD STRATEGY FOR TEMPOSTEP:
 * 
 * 1. Banner Ad: Show at bottom always (except for premium users)
 * 2. Interstitial Ads: Show at these times:
 *    - After practice session ends (if > 2 minutes)
 *    - Every 5 tab switches
 *    - After saving 3+ presets
 *    - Limit to max 1 ad per 5 minutes
 * 
 * 3. Rewarded Video: Offer as option to:
 *    - Unlock premium sounds for 1 hour
 *    - Remove ads for 1 hour
 *    - Unlock extra presets temporarily
 * 
 * This strategy balances revenue with user experience!
 */
