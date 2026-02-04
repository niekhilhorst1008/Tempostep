export interface Preset {
  id: string;
  name: string;
  startTempo: number;
  targetTempo: number;
  tempoStep: number;
  timePerStep: number;
  progressionEnabled: boolean;
  numerator: number;
  denominator: number;
  accents: boolean[];
  subdivision: number;
  createdAt: number;
}

export function createPreset(
  name: string,
  currentSettings: Omit<Preset, 'id' | 'name' | 'createdAt'>
): Preset {
  return {
    id: Date.now().toString(),
    name,
    ...currentSettings,
    createdAt: Date.now(),
  };
}

export function formatPresetSummary(preset: Preset): string {
  const progressionText = preset.progressionEnabled
    ? `${preset.startTempo} → ${preset.targetTempo} BPM • +${preset.tempoStep} • ${formatTime(preset.timePerStep)}`
    : `${preset.startTempo} BPM`;
  
  const timeSignature = `${preset.numerator}/${preset.denominator}`;
  
  return `${progressionText} • ${timeSignature}`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}
