import { Language } from "./SettingsModal";
import { translate } from "../utils/translations";

interface SubdivisionSelectorProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  language: Language;
}

// SVG Music Note Icons
const QuarterNoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="18" rx="3.5" ry="2.5" />
    <rect x="11" y="6" width="2" height="12" />
  </svg>
);

const EighthNoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="18" rx="3.5" ry="2.5" />
    <rect x="11" y="6" width="2" height="12" />
    <path d="M13 6 L18 4 L18 8 L13 10 Z" />
  </svg>
);

const TripletIcon = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <g>
      <ellipse cx="5" cy="18" rx="2.5" ry="2" />
      <rect x="7" y="8" width="1.5" height="10" />
      <path d="M8.5 8 L11 7 L11 10 L8.5 11 Z" />
    </g>
    <g>
      <ellipse cx="14" cy="18" rx="2.5" ry="2" />
      <rect x="16" y="8" width="1.5" height="10" />
      <path d="M17.5 8 L20 7 L20 10 L17.5 11 Z" />
    </g>
    <g>
      <ellipse cx="23" cy="18" rx="2.5" ry="2" />
      <rect x="25" y="8" width="1.5" height="10" />
      <path d="M26.5 8 L29 7 L29 10 L26.5 11 Z" />
    </g>
    <path d="M11 7 L29 7" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

const SixteenthNoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="18" rx="3.5" ry="2.5" />
    <rect x="11" y="6" width="2" height="12" />
    <path d="M13 6 L18 4 L18 8 L13 10 Z" />
    <path d="M13 10 L18 8 L18 12 L13 14 Z" />
  </svg>
);

export function SubdivisionSelector({ value, onChange, disabled, language }: SubdivisionSelectorProps) {
  const subdivisions = [
    { value: 1, labelKey: "quarterNotes" as const, icon: <QuarterNoteIcon /> },
    { value: 2, labelKey: "eighthNotes" as const, icon: <EighthNoteIcon /> },
    { value: 3, labelKey: "eighthTriplets" as const, icon: <TripletIcon /> },
    { value: 4, labelKey: "sixteenthNotes" as const, icon: <SixteenthNoteIcon /> },
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
          <div className="flex items-center justify-center h-6">{subdivision.icon}</div>
          <div className="text-xs whitespace-nowrap">{translate(subdivision.labelKey, language)}</div>
        </button>
      ))}
    </div>
  );
}
