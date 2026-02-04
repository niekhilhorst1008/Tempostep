/**
 * AdMob Service for TempoStep
 * 
 * This service handles all AdMob operations.
 * When running as PWA, it shows placeholder ads.
 * When running in Capacitor (native app), it shows real AdMob ads.
 */

import { getAdUnitId, getAppId, isNativeApp } from '../config/admob';

// Type definitions for AdMob plugin (will be available after installing the plugin)
declare global {
  interface Window {
    Capacitor?: any;
    AdMob?: {
      initialize: (options: { requestTrackingAuthorization?: boolean }) => Promise<void>;
      showBanner: (options: { adId: string; position?: string }) => Promise<void>;
      hideBanner: () => Promise<void>;
      resumeBanner: () => Promise<void>;
      removeBanner: () => Promise<void>;
      prepareInterstitial: (options: { adId: string }) => Promise<void>;
      showInterstitial: () => Promise<void>;
      prepareRewardVideo: (options: { adId: string }) => Promise<void>;
      showRewardVideo: () => Promise<void>;
    };
  }
}

class AdMobService {
  private isInitialized = false;
  private interstitialReady = false;
  private rewardedReady = false;

  /**
   * Initialize AdMob
   * Call this once when the app starts
   */
  async initialize(): Promise<void> {
    if (!isNativeApp()) {
      this.isInitialized = true;
      return;
    }

    if (this.isInitialized) {
      return;
    }

    try {
      if (!window.AdMob) {
        this.isInitialized = true; // Mark as initialized to prevent repeated warnings
        return;
      }

      await window.AdMob.initialize({
        requestTrackingAuthorization: true, // For iOS 14+
      });

      this.isInitialized = true;
    } catch (error) {
      this.isInitialized = true; // Mark as initialized to prevent repeated attempts
    }
  }

  /**
   * Show banner ad at the bottom of the screen
   */
  async showBanner(): Promise<void> {
    if (!isNativeApp()) {
      return;
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (!window.AdMob) return;

      await window.AdMob.showBanner({
        adId: getAdUnitId('banner'),
        position: 'bottom',
      });
    } catch (error) {
      console.error('AdMob: Failed to show banner', error);
    }
  }

  /**
   * Hide banner ad
   */
  async hideBanner(): Promise<void> {
    if (!isNativeApp()) {
      return;
    }

    try {
      if (!window.AdMob) return;
      await window.AdMob.hideBanner();
    } catch (error) {
      console.error('AdMob: Failed to hide banner', error);
    }
  }

  /**
   * Remove banner ad completely
   */
  async removeBanner(): Promise<void> {
    if (!isNativeApp()) {
      return;
    }

    try {
      if (!window.AdMob) return;
      await window.AdMob.removeBanner();
    } catch (error) {
      console.error('AdMob: Failed to remove banner', error);
    }
  }

  /**
   * Prepare interstitial ad
   * Call this before you want to show the ad
   */
  async prepareInterstitial(): Promise<void> {
    if (!isNativeApp()) {
      this.interstitialReady = true;
      return;
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (!window.AdMob) return;

      await window.AdMob.prepareInterstitial({
        adId: getAdUnitId('interstitial'),
      });

      this.interstitialReady = true;
    } catch (error) {
      console.error('AdMob: Failed to prepare interstitial', error);
      this.interstitialReady = false;
    }
  }

  /**
   * Show interstitial ad
   * Must call prepareInterstitial() first
   */
  async showInterstitial(): Promise<boolean> {
    if (!isNativeApp()) {
      // Simulate ad display delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    if (!this.interstitialReady) {
      await this.prepareInterstitial();
      // Wait a bit for ad to load
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      if (!window.AdMob) return false;

      await window.AdMob.showInterstitial();
      this.interstitialReady = false; // Need to prepare again for next show
      
      // Prepare next ad
      this.prepareInterstitial();
      
      return true;
    } catch (error) {
      console.error('AdMob: Failed to show interstitial', error);
      this.interstitialReady = false;
      return false;
    }
  }

  /**
   * Prepare rewarded video ad
   */
  async prepareRewardedVideo(): Promise<void> {
    if (!isNativeApp()) {
      this.rewardedReady = true;
      return;
    }

    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (!window.AdMob) return;

      await window.AdMob.prepareRewardVideo({
        adId: getAdUnitId('rewarded'),
      });

      this.rewardedReady = true;
    } catch (error) {
      console.error('AdMob: Failed to prepare rewarded video', error);
      this.rewardedReady = false;
    }
  }

  /**
   * Show rewarded video ad
   * Returns true if user watched the full ad and earned reward
   */
  async showRewardedVideo(): Promise<boolean> {
    if (!isNativeApp()) {
      // Simulate watching ad
      await new Promise(resolve => setTimeout(resolve, 2000));
      return true;
    }

    if (!this.rewardedReady) {
      await this.prepareRewardedVideo();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      if (!window.AdMob) return false;

      await window.AdMob.showRewardVideo();
      this.rewardedReady = false;
      
      // Prepare next ad
      this.prepareRewardedVideo();
      
      return true;
    } catch (error) {
      console.error('AdMob: Failed to show rewarded video', error);
      this.rewardedReady = false;
      return false;
    }
  }

  /**
   * Check if interstitial is ready to show
   */
  isInterstitialReady(): boolean {
    return this.interstitialReady;
  }

  /**
   * Check if rewarded video is ready to show
   */
  isRewardedReady(): boolean {
    return this.rewardedReady;
  }
}

// Export singleton instance
export const admobService = new AdMobService();
