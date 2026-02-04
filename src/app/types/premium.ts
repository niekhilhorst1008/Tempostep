export interface PremiumFeatures {
  presets: boolean;
  sounds: boolean;
  adFree: boolean;
}

export const defaultPremiumFeatures: PremiumFeatures = {
  presets: false,
  sounds: false,
  adFree: false,
};

export function savePremiumFeatures(features: PremiumFeatures) {
  localStorage.setItem('premiumFeatures', JSON.stringify(features));
}

export function loadPremiumFeatures(): PremiumFeatures {
  const saved = localStorage.getItem('premiumFeatures');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultPremiumFeatures;
    }
  }
  return defaultPremiumFeatures;
}

export function hasAnyPremium(features: PremiumFeatures): boolean {
  return features.presets || features.sounds || features.adFree;
}
