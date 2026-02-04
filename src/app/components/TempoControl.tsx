import { Slider } from "./ui/slider";
import { useRef, useCallback } from "react";

interface TempoControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function TempoControl({
  label,
  value,
  onChange,
  disabled = false,
  min = 40,
  max = 999,
}: TempoControlProps) {
  const holdIntervalRef = useRef<number | null>(null);
  const holdTimeoutRef = useRef<number | null>(null);

  const handleMouseDown = useCallback(
    (increment: number) => {
      // Clear any existing timers
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

      // Start hold after 300ms
      holdTimeoutRef.current = window.setTimeout(() => {
        holdIntervalRef.current = window.setInterval(() => {
          onChange((prev) => {
            const next = prev + increment * 10;
            return Math.max(min, Math.min(max, next));
          });
        }, 100); // Change by 10 every 100ms
      }, 300);
    },
    [onChange, min, max]
  );

  const handleMouseUp = useCallback(() => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-xs text-slate-600">{label}</label>
        <span className="text-sm text-slate-900">{value} BPM</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          onMouseDown={() => handleMouseDown(-1)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown(-1)}
          onTouchEnd={handleMouseUp}
          disabled={disabled || value <= min}
          className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors flex items-center justify-center text-slate-700 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={1}
          disabled={disabled}
          className="flex-1"
        />
        
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          onMouseDown={() => handleMouseDown(1)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={() => handleMouseDown(1)}
          onTouchEnd={handleMouseUp}
          disabled={disabled || value >= max}
          className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition-colors flex items-center justify-center text-slate-700 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}