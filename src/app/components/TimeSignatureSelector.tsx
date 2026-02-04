interface TimeSignatureSelectorProps {
  numerator: number;
  denominator: number;
  onNumeratorChange: (value: number) => void;
  onDenominatorChange: (value: number) => void;
  disabled?: boolean;
}

export function TimeSignatureSelector({
  numerator,
  denominator,
  onNumeratorChange,
  onDenominatorChange,
  disabled = false,
}: TimeSignatureSelectorProps) {
  const numeratorOptions = Array.from({ length: 18 }, (_, i) => i + 1);
  const denominatorOptions = [1, 2, 4, 8, 16, 32];

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <label className="text-xs text-slate-500 uppercase tracking-wide">
          Beats
        </label>
        <select
          value={numerator}
          onChange={(e) => onNumeratorChange(Number(e.target.value))}
          disabled={disabled}
          className={`
            w-20 h-14 text-center text-2xl bg-white border-2 border-slate-200 
            rounded-xl text-slate-900 appearance-none cursor-pointer
            focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "hover:border-slate-300"}
          `}
        >
          {numeratorOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="text-3xl text-slate-400 pb-4">/</div>

      <div className="flex flex-col items-center gap-2">
        <label className="text-xs text-slate-500 uppercase tracking-wide">
          Note
        </label>
        <select
          value={denominator}
          onChange={(e) => onDenominatorChange(Number(e.target.value))}
          disabled={disabled}
          className={`
            w-20 h-14 text-center text-2xl bg-white border-2 border-slate-200 
            rounded-xl text-slate-900 appearance-none cursor-pointer
            focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "hover:border-slate-300"}
          `}
        >
          {denominatorOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}