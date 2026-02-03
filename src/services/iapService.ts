/**
 * In-App Purchase Service for TempoStep
 * 
 * This service uses RevenueCat to handle all IAP operations.
 * RevenueCat is the industry standard for managing subscriptions and one-time purchases.
 * 
 * FREE TIER: Up to $2,500 monthly tracked revenue (perfect for starting!)
 * 
 * Setup Required:
 * 1. Create free RevenueCat account: https://app.revenuecat.com/signup
 * 2. Add iOS app in RevenueCat dashboard
 * 3. Copy API key and add to REVENUECAT_API_KEY below
 * 4. Create products in App Store Connect
 * 5. Link products in RevenueCat dashboard
 */

import { Capacitor } from '@capacitor/core';

// ✅ RevenueCat Production API Key (Apple App Store)
// Get it from: https://app.revenuecat.com/settings/api-keys
const REVENUECAT_API_KEY = 'appl_SlwbjrVEBgZmZyuVjzUxlnlTDPj';

// Product IDs that match your App Store Connect products
// These will be created in App Store Connect
export const PRODUCT_IDS = {
  PREMIUM_UNLOCK: 'com.tempostep.premium', // One-time purchase for all premium features
  REMOVE_ADS: 'com.tempostep.removeads', // One-time purchase to remove ads only
} as const;

export interface IAPProduct {
  identifier: string;
  title: string;
  description: string;
  price: string;
  priceString: string;
}

// Type definitions for RevenueCat (only available in native app)
type PurchasesOffering = any;
type Purchases = any;

class IAPService {
  private isInitialized = false;
  private isNativeApp = false;
  private currentOffering: PurchasesOffering | null = null;
  private PurchasesModule: any = null;

  constructor() {
    this.isNativeApp = Capacitor.isNativePlatform();
  }

  /**
   * Dynamically import RevenueCat only in native environment
   */
  private async loadPurchasesModule() {
    if (!this.isNativeApp || this.PurchasesModule) {
      return;
    }

    try {
      const module = await import('@revenuecat/purchases-capacitor');
      this.PurchasesModule = module.Purchases;
      return module;
    } catch (error) {
      console.warn('RevenueCat module not available in this environment');
      return null;
    }
  }

  /**
   * Initialize RevenueCat
   * Call this once when the app starts
   */
  async initialize(userId?: string): Promise<void> {
    if (!this.isNativeApp) {
      console.log('IAP: Running in PWA mode, purchases disabled');
      this.isInitialized = true;
      return;
    }

    if (this.isInitialized) {
      console.log('IAP: Already initialized');
      return;
    }

    if (REVENUECAT_API_KEY === 'YOUR_REVENUECAT_IOS_API_KEY_HERE') {
      console.warn('⚠️ IAP: RevenueCat API key not configured! Purchases will not work.');
      console.warn('Get your API key from: https://app.revenuecat.com/settings/api-keys');
      return;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return;

      const { Purchases, LOG_LEVEL } = module;

      // Configure RevenueCat
      await Purchases.configure({
        apiKey: REVENUECAT_API_KEY,
        appUserID: userId, // Optional: Set user ID for tracking
      });

      // Enable debug logs in development
      if (import.meta.env.DEV) {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      }

      this.isInitialized = true;
      console.log('IAP: RevenueCat initialized successfully');

      // Load available products
      await this.loadProducts();
    } catch (error) {
      console.error('IAP: Initialization failed', error);
    }
  }

  /**
   * Load available products from RevenueCat
   */
  async loadProducts(): Promise<IAPProduct[]> {
    if (!this.isNativeApp || !this.isInitialized) {
      return [];
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return [];

      const { Purchases } = module;
      const offerings = await Purchases.getOfferings();
      
      if (offerings.current) {
        this.currentOffering = offerings.current;
        
        const products: IAPProduct[] = offerings.current.availablePackages.map((pkg: any) => ({
          identifier: pkg.product.identifier,
          title: pkg.product.title,
          description: pkg.product.description,
          price: pkg.product.price,
          priceString: pkg.product.priceString,
        }));

        console.log('IAP: Products loaded:', products);
        return products;
      }

      console.log('IAP: No offerings available');
      return [];
    } catch (error) {
      console.error('IAP: Failed to load products', error);
      return [];
    }
  }

  /**
   * Purchase a product
   * @param productId - The product identifier (e.g., PRODUCT_IDS.PREMIUM_UNLOCK)
   * @returns true if purchase was successful
   */
  async purchaseProduct(productId: string): Promise<boolean> {
    if (!this.isNativeApp) {
      console.log('IAP: Purchase simulated in PWA mode');
      // Simulate purchase delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }

    if (!this.isInitialized) {
      console.error('IAP: Not initialized. Call initialize() first.');
      return false;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return false;

      const { Purchases } = module;

      // Find the package that contains this product
      if (!this.currentOffering) {
        await this.loadProducts();
      }

      const pkg = this.currentOffering?.availablePackages.find(
        (p: any) => p.product.identifier === productId
      );

      if (!pkg) {
        console.error('IAP: Product not found:', productId);
        return false;
      }

      // Make the purchase
      const purchaseResult = await Purchases.purchasePackage({ aPackage: pkg });

      // Check if user now has entitlements
      const hasEntitlement = Object.keys(purchaseResult.customerInfo.entitlements.active).length > 0;

      if (hasEntitlement) {
        console.log('IAP: Purchase successful!', purchaseResult);
        return true;
      }

      console.log('IAP: Purchase completed but no entitlements granted');
      return false;
    } catch (error: any) {
      // User cancelled the purchase
      if (error.code === '1') {
        console.log('IAP: User cancelled purchase');
        return false;
      }

      console.error('IAP: Purchase failed', error);
      return false;
    }
  }

  /**
   * Restore previous purchases
   * Important for users who reinstall the app or switch devices
   */
  async restorePurchases(): Promise<boolean> {
    if (!this.isNativeApp) {
      console.log('IAP: Restore simulated in PWA mode');
      return true;
    }

    if (!this.isInitialized) {
      console.error('IAP: Not initialized. Call initialize() first.');
      return false;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return false;

      const { Purchases } = module;
      const customerInfo = await Purchases.restorePurchases();
      
      const hasActiveEntitlements = Object.keys(customerInfo.customerInfo.entitlements.active).length > 0;
      
      if (hasActiveEntitlements) {
        console.log('IAP: Purchases restored successfully');
        return true;
      }

      console.log('IAP: No purchases to restore');
      return false;
    } catch (error) {
      console.error('IAP: Restore failed', error);
      return false;
    }
  }

  /**
   * Check if user has purchased Premium features
   */
  async hasPremium(): Promise<boolean> {
    if (!this.isNativeApp || !this.isInitialized) {
      return false;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return false;

      const { Purchases } = module;
      const customerInfo = await Purchases.getCustomerInfo();
      
      // Check if user has any active entitlements
      // You'll configure entitlements in RevenueCat dashboard
      const hasPremium = customerInfo.customerInfo.entitlements.active['premium'] !== undefined;
      
      return hasPremium;
    } catch (error) {
      console.error('IAP: Failed to check premium status', error);
      return false;
    }
  }

  /**
   * Check if user has removed ads
   */
  async hasRemovedAds(): Promise<boolean> {
    if (!this.isNativeApp || !this.isInitialized) {
      return false;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return false;

      const { Purchases } = module;
      const customerInfo = await Purchases.getCustomerInfo();
      
      // Check for either premium or ad-removal entitlement
      const hasAdRemoval = 
        customerInfo.customerInfo.entitlements.active['premium'] !== undefined ||
        customerInfo.customerInfo.entitlements.active['no_ads'] !== undefined;
      
      return hasAdRemoval;
    } catch (error) {
      console.error('IAP: Failed to check ad removal status', error);
      return false;
    }
  }

  /**
   * Get customer info (all entitlements, purchase history, etc.)
   */
  async getCustomerInfo() {
    if (!this.isNativeApp || !this.isInitialized) {
      return null;
    }

    try {
      const module = await this.loadPurchasesModule();
      if (!module) return null;

      const { Purchases } = module;
      const customerInfo = await Purchases.getCustomerInfo();
      return customerInfo.customerInfo;
    } catch (error) {
      console.error('IAP: Failed to get customer info', error);
      return null;
    }
  }

  /**
   * Check if running in native app
   */
  isNative(): boolean {
    return this.isNativeApp;
  }
}

// Export singleton instance
export const iapService = new IAPService();
