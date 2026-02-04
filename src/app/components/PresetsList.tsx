import { Music, Plus, Trash2, Lock, Crown } from "lucide-react";
import { Preset, formatPresetSummary } from "../types/preset";
import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";

interface PresetsListProps {
  presets: Preset[];
  isPremium: boolean;
  language: Language;
  onCreatePreset: () => void;
  onLoadPreset: (preset: Preset) => void;
  onDeletePreset: (id: string) => void;
  onUnlockPremium: () => void;
}

export function PresetsList({
  presets,
  isPremium,
  language,
  onCreatePreset,
  onLoadPreset,
  onDeletePreset,
  onUnlockPremium,
}: PresetsListProps) {
  // If not premium, show premium gate
  if (!isPremium) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background pt-[calc(1rem+env(safe-area-inset-top))]">
        <div className="w-full max-w-md">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4">
              <Crown className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-900">
                {translate('premium', language)}
              </span>
            </div>
            <h1 className="text-foreground mb-2">{translate('presets', language)}</h1>
            <p className="text-sm text-muted-foreground">
              {translate('yourPracticeRoutines', language)}
            </p>
          </header>

          {/* Premium gate */}
          <div className="bg-card border-2 border-border rounded-3xl p-8 text-center space-y-6 shadow-lg">
            {/* Blurred preview */}
            <div className="relative">
              <div className="space-y-3 blur-sm select-none pointer-events-none opacity-60">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-accent rounded-xl p-4 border border-border"
                  >
                    <div className="h-5 bg-muted-foreground/20 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-muted-foreground/10 rounded w-2/3" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>

            {/* Premium message */}
            <div className="space-y-4">
              <h3 className="text-foreground">{translate('presetsArePremium', language)}</h3>
              
              {/* Benefits */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{translate('premiumBenefit1', language)}</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{translate('premiumBenefit2', language)}</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{translate('premiumBenefit3', language)}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onUnlockPremium}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" />
                {translate('unlockPremium', language)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Premium user - show presets
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
        {/* Header */}
        <header className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 rounded-full mb-3">
            <Crown className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-900">
              {translate('premium', language)}
            </span>
          </div>
          <h1 className="text-foreground mb-1">{translate('presets', language)}</h1>
          <p className="text-sm text-muted-foreground">
            {translate('yourPracticeRoutines', language)}
          </p>
        </header>

        {/* Presets list or empty state */}
        {presets.length === 0 ? (
          // Empty state
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center space-y-4 px-8">
              <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                <Music className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-foreground">{translate('noPresetsYet', language)}</h3>
                <p className="text-sm text-muted-foreground">
                  {translate('createYourOwnRoutines', language)}
                </p>
              </div>
              <button
                onClick={onCreatePreset}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium shadow-md transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {translate('createPreset', language)}
              </button>
            </div>
          </div>
        ) : (
          // Presets list
          <div className="space-y-3">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3 p-4">
                  <button
                    onClick={() => onLoadPreset(preset)}
                    className="flex items-start gap-3 flex-1 text-left"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                      <Music className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {preset.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatPresetSummary(preset)}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => onDeletePreset(preset.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                    aria-label={translate('deletePreset', language)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed create button */}
      {presets.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-md mx-auto">
          <button
            onClick={onCreatePreset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {translate('createNewPreset', language)}
          </button>
        </div>
      )}
    </div>
  );
}