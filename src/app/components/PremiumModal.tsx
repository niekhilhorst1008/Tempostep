import { X, Check, Music, Volume2, Ban, Crown, Loader2, RefreshCw } from "lucide-react";
import { translate } from "../utils/translations";
import { Language } from "./SettingsModal";
import { PremiumFeatures } from "../types/premium";
import { useState } from "react";
import { iapService, PRODUCT_IDS } from "../../services/iapService";
import { toast } from "sonner";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  premiumFeatures: PremiumFeatures;
  onPurchaseSuccess: () => void;
  language: Language;
}

const features = [
  {
    key: 'presets' as const,
    icon: Music,
    titleKey: 'premiumPresetsTitle',
    descKey: 'premiumPresetsDesc',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'sounds' as const,
    icon: Volume2,
    titleKey: 'premiumSoundsTitle',
    descKey: 'premiumSoundsDesc',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    key: 'adFree' as const,
    icon: Ban,
    titleKey: 'premiumAdFreeTitle',
    descKey: 'premiumAdFreeDesc',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

export function PremiumModal({
  isOpen,
  onClose,
  premiumFeatures,
  onPurchaseSuccess,
  language,
}: PremiumModalProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  if (!isOpen) return null;

  // Check if all features are unlocked
  const allUnlocked = Object.values(premiumFeatures).every(v => v);

  const handlePurchase = async () => {
    setIsPurchasing(true);

    try {
      const success = await iapService.purchaseProduct(PRODUCT_IDS.PREMIUM_UNLOCK);

      if (success) {
        toast.success(translate('purchaseSuccess', language));
        onPurchaseSuccess();
        onClose();
      } else {
        toast.error(translate('purchaseCancelled', language));
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(translate('purchaseError', language));
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleRestore = async () => {
    setIsRestoring(true);

    try {
      const success = await iapService.restorePurchases();

      if (success) {
        toast.success(translate('restoreSuccess', language));
        onPurchaseSuccess();
        onClose();
      } else {
        toast.info(translate('restoreNoPurchases', language));
      }
    } catch (error) {
      console.error('Restore error:', error);
      toast.error(translate('restoreError', language));
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 z-50 bg-card rounded-3xl shadow-2xl max-w-md mx-auto my-auto max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-600" />
            <h2 className="text-lg font-semibold text-foreground">
              {translate('unlockPremium', language)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-sm text-muted-foreground text-center mb-6">
            {translate('premiumDescription', language)}
          </p>

          {/* Features List */}
          {features.map((feature) => {
            const Icon = feature.icon;
            const isUnlocked = premiumFeatures[feature.key];

            return (
              <div
                key={feature.key}
                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${
                    isUnlocked
                      ? 'border-green-500 bg-green-50'
                      : 'border-border'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {translate(feature.titleKey, language)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {translate(feature.descKey, language)}
                    </p>
                    
                    {isUnlocked && (
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {translate('unlocked', language)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Purchase Button */}
          {!allUnlocked && (
            <div className="pt-4">
              <button
                onClick={handlePurchase}
                disabled={isPurchasing || isRestoring}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPurchasing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {translate('processing', language)}
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    {translate('unlockPremiumNow', language)}
                  </>
                )}
              </button>

              {/* Restore Purchases Button */}
              <button
                onClick={handleRestore}
                disabled={isPurchasing || isRestoring}
                className="w-full mt-3 px-4 py-3 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isRestoring ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {translate('restoring', language)}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    {translate('restorePurchases', language)}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-slate-50">
          <p className="text-xs text-center text-muted-foreground">
            {translate('premiumFooter', language)}
          </p>
        </div>
      </div>
    </>
  );
}
