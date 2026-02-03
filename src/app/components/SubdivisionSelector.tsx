import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";

interface SubdivisionSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  language: Language;
}

export function SubdivisionSelector({ value, onChange, disabled, language }: SubdivisionSelectorProps) {
  const subdivisions = [
    { value: 1, labelKey: "quarterNotes" as const, icon: "𝅘𝅥" },
    { value: 2, labelKey: "eighthNotes" as const, icon: "𝅘𝅥𝅮" },
    { value: 3, labelKey: "eighthTriplets" as const, icon: "𝅘𝅥𝅮𝅘𝅥𝅮" },
    { value: 4, labelKey: "sixteenthNotes" as const, icon: "𝅘𝅥𝅯" },
  ];

  return (
    <div className="flex gap-2 justify-center">
      {subdivisions.map((subdivision) => (
        <button
          key={subdivision.value}
          onClick={() => onChange(subdivision.value)}
          disabled={disabled}
          className={`
            flex-1 py-3 px-2 rounded-lg transition-all
            flex flex-col items-center gap-1
            ${
              value === subdivision.value
                ? "bg-blue-500 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <div className="text-2xl leading-none">{subdivision.icon}</div>
          <div className="text-xs whitespace-nowrap">{translate(subdivision.labelKey, language)}</div>
        </button>
      ))}
    </div>
  );
}