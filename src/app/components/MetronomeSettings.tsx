import { X } from "lucide-react";
import { AccentPattern } from "./AccentPattern";
import { SubdivisionSelector } from "./SubdivisionSelector";
import { SoundSelector } from "./SoundSelector";
import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";
import { SoundType } from "../types/sound";

interface MetronomeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  beatsPerBar: number;
  accents: boolean[];
  onAccentToggle: (index: number) => void;
  subdivision: number;
  onSubdivisionChange: (value: number) => void;
  disabled: boolean;
  currentBeat?: number;
  language: Language;
  soundType: SoundType;
  onSoundTypeChange: (sound: SoundType) => void;
  isPremiumSounds: boolean;
  onUpgradeSounds: () => void;
}

export function MetronomeSettings({
  isOpen,
  onClose,
  beatsPerBar,
  accents,
  onAccentToggle,
  subdivision,
  onSubdivisionChange,
  disabled,
  currentBeat,
  language,
  soundType,
  onSoundTypeChange,
  isPremiumSounds,
  onUpgradeSounds,
}: MetronomeSettingsProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-w-md mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {translate("settings", language)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Accent pattern */}
          <div className="space-y-3">
            <label className="text-sm text-slate-600 block">
              {translate("accents", language)}
            </label>
            <AccentPattern
              beatsPerBar={beatsPerBar}
              accents={accents}
              onAccentToggle={onAccentToggle}
              disabled={disabled}
              currentBeat={currentBeat}
            />
          </div>

          {/* Subdivision selector */}
          <div className="space-y-3">
            <label className="text-sm text-slate-600 block">
              {translate("subdivisions", language)}
            </label>
            <SubdivisionSelector
              value={subdivision}
              onChange={onSubdivisionChange}
              disabled={disabled}
              language={language}
            />
          </div>
          
          {/* Sound selector */}
          <div className="space-y-3">
            <label className="text-sm text-slate-600 block">
              {translate("sounds", language)}
            </label>
            <SoundSelector
              soundType={soundType}
              onSoundTypeChange={onSoundTypeChange}
              isPremiumSounds={isPremiumSounds}
              onUpgradeSounds={onUpgradeSounds}
              language={language}
            />
          </div>
        </div>
      </div>
    </>
  );
}