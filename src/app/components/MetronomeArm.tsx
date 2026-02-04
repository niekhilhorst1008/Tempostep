import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MetronomeArmProps {
  isPlaying: boolean;
  bpm: number;
  isAccent: boolean;
}

export function MetronomeArm({ isPlaying, bpm, isAccent }: MetronomeArmProps) {
  const [beat, setBeat] = useState(0);
  
  // Calculate animation duration based on BPM
  const duration = 60 / bpm;
  
  useEffect(() => {
    if (isPlaying) {
      setBeat(prev => prev + 1);
    }
  }, [isPlaying, bpm]);

  return (
    <div className="relative w-full h-32 mx-auto mt-8">
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 z-10"></div>
      
      {/* Metronome arm */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-bottom"
        style={{
          width: "4px",
          height: "110px",
          marginLeft: "-2px",
          marginTop: "-110px",
        }}
        animate={
          isPlaying
            ? {
                rotate: [-35, 35, -35],
              }
            : { rotate: 0 }
        }
        transition={
          isPlaying
            ? {
                duration: duration * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.3 }
        }
      >
        <div className="w-full h-full bg-slate-400 rounded-full"></div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-400"></div>
      </motion.div>
      
      {/* Beat pulse indicator */}
      <motion.div
        key={beat}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8"
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, 2.5],
          opacity: [0, isAccent ? 0.4 : 0.2, 0],
        }}
        transition={{ duration: duration * 0.5 }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            border: `2px solid ${isAccent ? "#3b82f6" : "#94a3b8"}`,
          }}
        />
      </motion.div>
    </div>
  );
}