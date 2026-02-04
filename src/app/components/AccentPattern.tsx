import { motion } from "motion/react";

interface AccentPatternProps {
  beatsPerBar: number;
  accents: boolean[];
  onAccentToggle: (index: number) => void;
  disabled?: boolean;
  currentBeat?: number;
}

export function AccentPattern({
  beatsPerBar,
  accents,
  onAccentToggle,
  disabled = false,
  currentBeat,
}: AccentPatternProps) {
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {Array.from({ length: beatsPerBar }).map((_, index) => {
        const isAccented = accents[index];
        const isCurrentBeat = currentBeat === index;
        
        return (
          <button
            key={index}
            onClick={() => !disabled && onAccentToggle(index)}
            disabled={disabled}
            className="relative"
          >
            <motion.div
              className={`
                w-12 h-12 rounded-full border-2 transition-all
                ${
                  isAccented
                    ? "bg-blue-500 border-blue-600"
                    : "bg-white border-slate-300"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
              `}
              animate={
                isCurrentBeat
                  ? {
                      scale: [1, 1.15, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.15 }}
            >
              {/* Beat number */}
              <span
                className={`
                  absolute inset-0 flex items-center justify-center text-sm
                  ${isAccented ? "text-white" : "text-slate-600"}
                `}
              >
                {index + 1}
              </span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}