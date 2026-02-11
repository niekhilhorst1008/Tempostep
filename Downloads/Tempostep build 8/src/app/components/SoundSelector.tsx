import { Volume2, Lock } from "lucide-react";
import { SoundType, soundTypes } from "../types/sound";
import { Language } from "./SettingsModal";

interface SoundSelectorProps {
  soundType: SoundType;
  onSoundTypeChange: (sound: SoundType) => void;
  isPremiumSounds: boolean;
  onUpgradeSounds: () => void;
  language: Language;
}

export function SoundSelector({
  soundType,
  onSoundTypeChange,
  isPremiumSounds,
  onUpgradeSounds,
  language,
}: SoundSelectorProps) {
  const handleSoundClick = (sound: SoundType, soundIsPremium: boolean) => {
    if (soundIsPremium && !isPremiumSounds) {
      onUpgradeSounds();
    } else {
      onSoundTypeChange(sound);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {soundTypes.map((sound) => {
        const isSelected = soundType === sound.value;
        const isLocked = sound.isPremium && !isPremiumSounds;

        return (
          <button
            key={sound.value}
            onClick={() => handleSoundClick(sound.value, sound.isPremium)}
            className={`
              relative px-3 py-2.5 rounded-lg border-2 transition-all text-xs font-medium
              ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-border bg-card text-foreground hover:border-muted-foreground'
              }
              cursor-pointer
              ${isLocked ? 'opacity-75' : ''}
            `}
          >
            <div className="flex flex-col items-center gap-1">
              {isLocked ? (
                <Lock className="w-4 h-4 text-yellow-600" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              <span className="leading-tight">{sound.label}</span>
            </div>
            {isLocked && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <Lock className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}