import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Preset } from "../types/preset";
import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";
import { TempoControl } from "./TempoControl";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import { AccentPattern } from "./AccentPattern";
import { SubdivisionSelector } from "./SubdivisionSelector";

interface PresetEditorProps {
  preset?: Preset;
  currentSettings: {
    startTempo: number;
    targetTempo: number;
    tempoStep: number;
    timePerStep: number;
    progressionEnabled: boolean;
    numerator: number;
    denominator: number;
    accents: boolean[];
    subdivision: number;
  };
  language: Language;
  onSave: (name: string, settings: typeof currentSettings) => void;
  onCancel: () => void;
}

const TIME_OPTIONS = [
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 120, label: "2m" },
  { value: 180, label: "3m" },
];

export function PresetEditor({
  preset,
  currentSettings,
  language,
  onSave,
  onCancel,
}: PresetEditorProps) {
  const [name, setName] = useState(preset?.name || "");
  const [settings, setSettings] = useState(currentSettings);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), settings);
    }
  };

  const updateSetting = <K extends keyof typeof settings>(
    key: K,
    value: typeof settings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAccent = (index: number) => {
    const newAccents = [...settings.accents];
    newAccents[index] = !newAccents[index];
    updateSetting("accents", newAccents);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between z-10">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="font-semibold text-foreground">
            {preset ? translate('editPreset', language) : translate('newPreset', language)}
          </h2>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              name.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {translate('savePreset', language)}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Preset name */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground block font-medium">
              {translate('presetName', language)}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={translate('presetNamePlaceholder', language)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground focus:border-blue-500 focus:outline-none transition-colors"
              autoFocus
            />
          </div>

          {/* Settings card */}
          <div className="bg-card rounded-2xl p-6 space-y-6 shadow-sm border border-border">
            {/* Progression toggle */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground block font-medium">
                {translate('progressionEnabled', language)}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSetting("progressionEnabled", true)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium
                    ${
                      settings.progressionEnabled
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-accent text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  On
                </button>
                <button
                  onClick={() => updateSetting("progressionEnabled", false)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium
                    ${
                      !settings.progressionEnabled
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-accent text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  Off
                </button>
              </div>
            </div>

            {/* Start tempo */}
            <TempoControl
              label={translate('startTempo', language)}
              value={settings.startTempo}
              onChange={(value) => updateSetting("startTempo", value)}
            />

            {/* Target tempo (only if progression enabled) */}
            {settings.progressionEnabled && (
              <>
                <TempoControl
                  label={translate('targetTempo', language)}
                  value={settings.targetTempo}
                  onChange={(value) => updateSetting("targetTempo", value)}
                />

                {/* Tempo step */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-sm text-muted-foreground font-medium">
                      {translate('increment', language)}
                    </label>
                    <span className="text-lg text-foreground">
                      +{settings.tempoStep} {translate('bpm', language)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 5, 10].map((step) => (
                      <button
                        key={step}
                        onClick={() => updateSetting("tempoStep", step)}
                        className={`
                          flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium
                          ${
                            settings.tempoStep === step
                              ? "bg-blue-500 text-white shadow-sm"
                              : "bg-accent text-muted-foreground hover:bg-muted"
                          }
                        `}
                      >
                        +{step}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time per step */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground block font-medium">
                    {translate('interval', language)}
                  </label>
                  <div className="flex gap-2">
                    {TIME_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting("timePerStep", option.value)}
                        className={`
                          flex-1 py-2 px-3 rounded-lg transition-all text-sm font-medium
                          ${
                            settings.timePerStep === option.value
                              ? "bg-blue-500 text-white shadow-sm"
                              : "bg-accent text-muted-foreground hover:bg-muted"
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Time signature */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground block font-medium">
                {translate('timeSignature', language)}
              </label>
              <TimeSignatureSelector
                numerator={settings.numerator}
                denominator={settings.denominator}
                onNumeratorChange={(value) => updateSetting("numerator", value)}
                onDenominatorChange={(value) => updateSetting("denominator", value)}
              />
            </div>

            {/* Accent pattern */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground block font-medium">
                {translate('accents', language)}
              </label>
              <AccentPattern
                beatsPerBar={settings.numerator}
                accents={settings.accents}
                onAccentToggle={toggleAccent}
              />
            </div>

            {/* Subdivisions */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground block font-medium">
                {translate('subdivisions', language)}
              </label>
              <SubdivisionSelector
                value={settings.subdivision}
                onChange={(value) => updateSetting("subdivision", value)}
                language={language}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
