import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { translate } from "../utils/translations";
import { Language } from "./SettingsModal";
import { admobService } from "../../services/admobService";
import { isNativeApp } from "../../config/admob";

interface AdBannerProps {
  language: Language;
  onUpgrade: () => void;
}

export function AdBanner({ language, onUpgrade }: AdBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Initialize and show AdMob banner when component mounts
    if (isNativeApp()) {
      admobService.showBanner().catch(() => {
        // Banner display skipped
      });
    }

    // Cleanup: remove banner when component unmounts
    return () => {
      if (isNativeApp()) {
        admobService.removeBanner().catch(() => {
          // Banner removal skipped
        });
      }
    };
  }, []);

  if (isDismissed) return null;

  // In native app, AdMob shows real banner at bottom
  // In PWA, show placeholder banner
  if (isNativeApp()) {
    // Return a spacer to account for native AdMob banner height
    return <div className="h-[50px]" />;
  }

  // PWA placeholder ad
  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 border-t border-slate-300 py-3 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="text-xs text-slate-700 mb-1">
            {translate('adBannerText', language)}
          </p>
          <button
            onClick={onUpgrade}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
          >
            {translate('removeAds', language)}
          </button>
        </div>
        
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-slate-300 rounded transition-colors"
          aria-label="Close ad"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
}