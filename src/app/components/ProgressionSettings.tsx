import { TempoControl } from "./TempoControl";
import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";

interface ProgressionSettingsProps {
  enabled: boolean;
  startTempo: number;
  targetTempo: number;
  tempoStep: number;
  timePerStep: number;
  onEnabledChange: (value: boolean) => void;
  onStartTempoChange: (value: number) => void;
  onTargetTempoChange: (value: number) => void;
  onTempoStepChange: (value: number) => void;
  onTimePerStepChange: (value: number) => void;
  disabled?: boolean;
  language: Language;
}

const TIME_OPTIONS = [
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 120, label: "2m" },
  { value: 180, label: "3m" },
];

export function ProgressionSettings({
  enabled,
  startTempo,
  targetTempo,
  tempoStep,
  timePerStep,
  onEnabledChange,
  onStartTempoChange,
  onTargetTempoChange,
  onTempoStepChange,
  onTimePerStepChange,
  disabled = false,
  language,
}: ProgressionSettingsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-6 shadow-sm border border-slate-200">
      <h3 className="text-slate-900">{translate('progression', language)}</h3>
      
      <div className="space-y-2">
        <label className="text-sm text-slate-600">{translate('progressionEnabled', language)}</label>
        <div className="flex gap-2">
          <button
            onClick={() => onEnabledChange(true)}
            disabled={disabled}
            className={`
              flex-1 py-2 px-3 rounded-lg transition-all text-sm
              ${
                enabled
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            On
          </button>
          <button
            onClick={() => onEnabledChange(false)}
            disabled={disabled}
            className={`
              flex-1 py-2 px-3 rounded-lg transition-all text-sm
              ${
                !enabled
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Off
          </button>
        </div>
      </div>
      
      <div className={enabled ? "" : "opacity-40 pointer-events-none"}>
        <TempoControl
          label={translate('startTempo', language)}
          value={startTempo}
          onChange={onStartTempoChange}
          disabled={disabled || !enabled}
        />
      </div>
      
      <div className={enabled ? "" : "opacity-40 pointer-events-none"}>
        <TempoControl
          label={translate('targetTempo', language)}
          value={targetTempo}
          onChange={onTargetTempoChange}
          disabled={disabled || !enabled}
        />
      </div>
      
      <div className={`space-y-2 ${enabled ? "" : "opacity-40 pointer-events-none"}`}>
        <div className="flex justify-between items-baseline">
          <label className="text-sm text-slate-600">{translate('increment', language)}</label>
          <span className="text-lg text-slate-900">+{tempoStep} {translate('bpm', language)}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 5, 10].map((step) => (
            <button
              key={step}
              onClick={() => onTempoStepChange(step)}
              disabled={disabled || !enabled}
              className={`
                flex-1 py-2 px-3 rounded-lg transition-all text-sm
                ${
                  tempoStep === step
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
                ${disabled || !enabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              +{step}
            </button>
          ))}
        </div>
      </div>
      
      <div className={`space-y-2 ${enabled ? "" : "opacity-40 pointer-events-none"}`}>
        <label className="text-sm text-slate-600">{translate('interval', language)}</label>
        <div className="flex gap-2">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimePerStepChange(option.value)}
              disabled={disabled || !enabled}
              className={`
                flex-1 py-2 px-3 rounded-lg transition-all text-sm
                ${
                  timePerStep === option.value
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
                ${disabled || !enabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}