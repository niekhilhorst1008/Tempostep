import { X, Check } from "lucide-react";
import { translate } from "../utils/translations";

export type Theme = 'light' | 'dark' | 'aqua';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'nl';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  onLeaveReview?: () => void;
}

const themes: { value: Theme; label: string; preview: string }[] = [
  { value: 'light', label: 'Light', preview: 'bg-slate-50' },
  { value: 'dark', label: 'Dark', preview: 'bg-slate-900' },
  { value: 'aqua', label: 'Aqua Blue', preview: 'bg-cyan-500' },
];

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
  { value: 'nl', label: 'Nederlands', flag: '🇳🇱' },
];

export function SettingsModal({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  onLeaveReview,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl shadow-2xl max-w-md mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {translate('settings', language)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Theme selection */}
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground block font-medium">
              {translate('theme', language)}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => onThemeChange(themeOption.value)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all
                    ${
                      theme === themeOption.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-border hover:border-muted-foreground'
                    }
                  `}
                >
                  <div
                    className={`w-full h-16 rounded-lg mb-2 ${themeOption.preview}`}
                  />
                  <div className="text-xs text-foreground font-medium">
                    {translate(
                      themeOption.value === 'aqua' ? 'aquaBlue' : themeOption.value,
                      language
                    )}
                  </div>
                  {theme === themeOption.value && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Language selection */}
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground block font-medium">
              {translate('language', language)}
            </label>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => onLanguageChange(lang.value)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all
                    ${
                      language === lang.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-border hover:border-muted-foreground'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-sm font-medium text-foreground">
                      {lang.label}
                    </span>
                  </div>
                  {language === lang.value && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Leave a Review */}
          <div className="space-y-3">
            <button
              onClick={onLeaveReview}
              className="w-full p-4 rounded-xl border-2 border-border hover:border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="text-sm font-semibold text-foreground">
                  {translate('leaveReview', language)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {translate('leaveReviewDesc', language)}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}