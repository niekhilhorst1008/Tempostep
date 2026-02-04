import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Settings } from "lucide-react";

interface TunerProps {
  referencePitch: number;
  onReferencePitchChange: (value: number) => void;
}

export function Tuner({ referencePitch, onReferencePitchChange }: TunerProps) {
  const [isListening, setIsListening] = useState(false);
  const [detectedNote, setDetectedNote] = useState<string>("-");
  const [detectedFrequency, setDetectedFrequency] = useState<number>(0);
  const [centsOff, setCentsOff] = useState<number>(0);
  const [showSettings, setShowSettings] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const frequencyBufferRef = useRef<number[]>([]);

  // Note names
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  // Calculate frequency of a note
  const getNoteFrequency = (note: number, octave: number): number => {
    // A4 = 440 Hz (or custom reference pitch)
    // Formula: f = 440 * 2^((n-49)/12) where n is the MIDI note number
    const a4Index = 9; // A is the 9th note in our array (0-indexed)
    const a4MidiNote = 69; // A4 is MIDI note 69
    
    const currentMidiNote = (octave + 1) * 12 + note;
    const semitonesFromA4 = currentMidiNote - a4MidiNote;
    
    return referencePitch * Math.pow(2, semitonesFromA4 / 12);
  };

  // Get note name and cents offset from frequency
  const getNote = (frequency: number): { note: string; cents: number } => {
    if (frequency === 0) return { note: "-", cents: 0 };
    
    // Calculate which note this frequency is closest to
    const semitonesFromA4 = 12 * Math.log2(frequency / referencePitch);
    const nearestSemitone = Math.round(semitonesFromA4);
    const cents = Math.round((semitonesFromA4 - nearestSemitone) * 100);
    
    // A4 is at index 9 in our note array
    const noteIndex = (9 + nearestSemitone) % 12;
    const octave = 4 + Math.floor((9 + nearestSemitone) / 12);
    
    const normalizedIndex = ((noteIndex % 12) + 12) % 12;
    
    return {
      note: `${noteNames[normalizedIndex]}${octave}`,
      cents: cents
    };
  };

  // Autocorrelation pitch detection
  const autoCorrelate = (buffer: Float32Array, sampleRate: number): number => {
    // Minimum correlation value to accept
    const MIN_CORRELATION = 0.9;
    let size = buffer.length;
    let maxSamples = Math.floor(size / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let foundGoodCorrelation = false;

    // Check for sufficient signal
    let rms = 0;
    for (let i = 0; i < size; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / size);
    if (rms < 0.01) return -1; // Signal too weak

    // Find the best correlation offset
    let lastCorrelation = 1;
    for (let offset = 1; offset < maxSamples; offset++) {
      let correlation = 0;

      for (let i = 0; i < maxSamples; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }

      correlation = 1 - correlation / maxSamples;
      
      if (correlation > MIN_CORRELATION && correlation > lastCorrelation) {
        foundGoodCorrelation = true;
        if (correlation > best_correlation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      }
      
      lastCorrelation = correlation;
    }

    if (foundGoodCorrelation && best_offset > 0) {
      // Refine the offset with parabolic interpolation
      const shift = (buffer[best_offset + 1] - buffer[best_offset - 1]) / 
                    (2 * (2 * buffer[best_offset] - buffer[best_offset - 1] - buffer[best_offset + 1]));
      return sampleRate / (best_offset + shift);
    }

    return -1;
  };

  // Update pitch detection
  const updatePitch = () => {
    if (!analyserRef.current || !audioContextRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    
    analyser.getFloatTimeDomainData(buffer);
    
    const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);
    
    if (frequency > 0 && frequency < 4000) { // Reasonable musical range
      // Add to frequency buffer for smoothing
      frequencyBufferRef.current.push(frequency);
      
      // Keep only last 8 readings (about 0.13 seconds at 60fps)
      if (frequencyBufferRef.current.length > 8) {
        frequencyBufferRef.current.shift();
      }
      
      // Calculate median frequency (more stable than average)
      const sortedFreqs = [...frequencyBufferRef.current].sort((a, b) => a - b);
      const medianFreq = sortedFreqs[Math.floor(sortedFreqs.length / 2)];
      
      const noteInfo = getNote(medianFreq);
      setDetectedNote(noteInfo.note);
      setDetectedFrequency(medianFreq);
      setCentsOff(noteInfo.cents);
    } else {
      // Clear buffer when no signal
      frequencyBufferRef.current = [];
      setDetectedNote("-");
      setDetectedFrequency(0);
      setCentsOff(0);
    }
    
    animationFrameRef.current = requestAnimationFrame(updatePitch);
  };

  // Start listening
  const startListening = async () => {
    try {
      setPermissionError(false); // Reset error state
      
      // For Capacitor apps, check permission status first
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (permissionStatus.state === 'denied') {
            setPermissionError(true);
            return;
          }
        } catch (e) {
          // Permission API might not be available, continue anyway
        }
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        } 
      });
      micStreamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 4096;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      updatePitch();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setPermissionError(true);
    }
  };

  // Stop listening
  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    frequencyBufferRef.current = []; // Clear frequency buffer
    setIsListening(false);
    setDetectedNote("-");
    setDetectedFrequency(0);
    setCentsOff(0);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // Calculate needle rotation (-45 to +45 degrees)
  const needleRotation = Math.max(-45, Math.min(45, centsOff * 0.9));
  
  // Determine if in tune (within ±5 cents)
  const inTune = Math.abs(centsOff) <= 5;

  return (
    <div className="min-h-screen bg-background p-4 pb-20 pt-[calc(1rem+env(safe-area-inset-top))]">
      <div className="max-w-md mx-auto space-y-6">
        {/* Settings button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-sm text-muted-foreground">Reference Pitch</label>
              <span className="text-sm text-card-foreground">A={referencePitch} Hz</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => onReferencePitchChange(Math.max(410, referencePitch - 1))}
                className="w-10 h-10 rounded-lg bg-accent hover:bg-muted active:bg-secondary transition-colors flex items-center justify-center text-accent-foreground text-lg"
              >
                −
              </button>
              
              <input
                type="range"
                min="410"
                max="450"
                value={referencePitch}
                onChange={(e) => onReferencePitchChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-blue-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-md
                  [&::-moz-range-thumb]:w-5
                  [&::-moz-range-thumb]:h-5
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-blue-500
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:shadow-md"
              />
              
              <button
                onClick={() => onReferencePitchChange(Math.min(450, referencePitch + 1))}
                className="w-10 h-10 rounded-lg bg-accent hover:bg-muted active:bg-secondary transition-colors flex items-center justify-center text-accent-foreground text-lg"
              >
                +
              </button>
            </div>

            {/* Preset buttons */}
            <div className="flex gap-2">
              {[432, 440, 442].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onReferencePitchChange(preset)}
                  className={`
                    flex-1 py-2 px-3 rounded-lg transition-all text-sm
                    ${
                      referencePitch === preset
                        ? "bg-blue-500 text-white shadow-sm"
                        : "bg-accent text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detected note display */}
        <div className="text-center">
          <div className="text-xs text-blue-500 font-bold mb-2">TUNER v2.0 ULTRA DETAILED</div>
          <div className={`text-7xl tabular-nums transition-colors ${
            inTune && detectedNote !== "-" ? "text-green-600" : "text-foreground"
          }`}>
            {detectedNote}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {detectedFrequency > 0 ? `${detectedFrequency.toFixed(1)} Hz` : "Play a note"}
          </div>
        </div>

        {/* Tuning meter */}
        <div className={`bg-card rounded-2xl p-8 shadow-sm border-2 transition-all ${
          inTune ? "border-green-500 shadow-green-200" : "border-border"
        }`}>
          {/* Scale marks */}
          <div className="relative h-64 mb-6">
            {/* Background arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 160" style={{
              // CSS variables for SVG to access theme colors
              '--tuner-foreground': 'var(--color-foreground)',
              '--tuner-muted': 'var(--color-muted-foreground)',
            } as React.CSSProperties}>
              {/* Center indicator triangle at top */}
              <polygon
                points="140,15 135,22 145,22"
                fill="currentColor"
                className="text-foreground"
              />
              
              {/* Ultra-detailed professional tuner meter - showing ±50 cents */}
              {/* Tick marks EVERY SINGLE CENT */}
              {Array.from({ length: 101 }, (_, i) => i - 50).map((cents) => {
                // Map ±50 cents to ±55 degrees
                const angle = (cents / 50) * 55;
                const radian = (angle * Math.PI) / 180;
                
                // Different lengths for different tick types
                let tickLength;
                let strokeWidth;
                let strokeColor;
                
                if (cents === 0) {
                  // Center mark - longest and thickest
                  tickLength = 28;
                  strokeWidth = 3;
                  strokeColor = "#16a34a";
                } else if (cents % 10 === 0) {
                  // Every 10 cents - very long
                  tickLength = 24;
                  strokeWidth = 2.5;
                  strokeColor = "#334155";
                } else if (cents % 5 === 0) {
                  // Every 5 cents - medium-long
                  tickLength = 18;
                  strokeWidth = 2;
                  strokeColor = "#475569";
                } else if (cents % 2 === 0) {
                  // Every 2 cents - medium
                  tickLength = 12;
                  strokeWidth = 1.5;
                  strokeColor = "#64748b";
                } else {
                  // Every single cent - short
                  tickLength = 8;
                  strokeWidth = 1.2;
                  strokeColor = "#94a3b8";
                }
                
                const radius = 115;
                const x1 = 140 + Math.sin(radian) * (radius - tickLength);
                const y1 = 140 - Math.cos(radian) * (radius - tickLength);
                const x2 = 140 + Math.sin(radian) * radius;
                const y2 = 140 - Math.cos(radian) * radius;
                
                return (
                  <line
                    key={cents}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                  />
                );
              })}
              
              {/* Number labels following the arc - positioned carefully to avoid overlap */}
              {[
                { cents: -50, radius: 68 },
                { cents: -40, radius: 70 },
                { cents: -30, radius: 72 },
                { cents: -20, radius: 74 },
                { cents: -10, radius: 76 },
                { cents: 0, radius: 78 },
                { cents: 10, radius: 76 },
                { cents: 20, radius: 74 },
                { cents: 30, radius: 72 },
                { cents: 40, radius: 70 },
                { cents: 50, radius: 68 },
              ].map(({ cents, radius }) => {
                const angle = (cents / 50) * 55;
                const radian = (angle * Math.PI) / 180;
                const x = 140 + Math.sin(radian) * radius;
                const y = 140 - Math.cos(radian) * radius;
                
                // Calculate rotation for text to follow arc
                const textRotation = angle;
                
                return (
                  <text
                    key={`label-${cents}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fontSize="11"
                    fill={cents === 0 ? "#16a34a" : "#475569"}
                    fontWeight={cents === 0 ? "700" : "600"}
                    fontFamily="system-ui, -apple-system, sans-serif"
                    transform={`rotate(${textRotation}, ${x}, ${y})`}
                  >
                    {cents === 0 ? "0" : Math.abs(cents)}
                  </text>
                );
              })}
              
              {/* In-tune zone - MUCH more visible when in tune */}
              <defs>
                <radialGradient id="tuneZoneGradient">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: inTune ? 0.4 : 0.15 }} />
                  <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: inTune ? 0.2 : 0.08 }} />
                </radialGradient>
              </defs>
              
              {/* Green zone for ±5 cents - glows when in tune */}
              <path
                d={`
                  M ${140 + Math.sin((-5 / 50 * 55 * Math.PI) / 180) * 30} ${140 - Math.cos((-5 / 50 * 55 * Math.PI) / 180) * 30}
                  A 30 30 0 0 1 ${140 + Math.sin((5 / 50 * 55 * Math.PI) / 180) * 30} ${140 - Math.cos((5 / 50 * 55 * Math.PI) / 180) * 30}
                  L ${140 + Math.sin((5 / 50 * 55 * Math.PI) / 180) * 115} ${140 - Math.cos((5 / 50 * 55 * Math.PI) / 180) * 115}
                  A 115 115 0 0 0 ${140 + Math.sin((-5 / 50 * 55 * Math.PI) / 180) * 115} ${140 - Math.cos((-5 / 50 * 55 * Math.PI) / 180) * 115}
                  Z
                `}
                fill="url(#tuneZoneGradient)"
                className={inTune ? "opacity-100" : "opacity-50"}
                style={{ transition: "opacity 0.2s ease-out" }}
              />
              
              {/* Center pivot - more detailed */}
              <circle cx="140" cy="140" r="8" fill="#1e293b" />
              <circle cx="140" cy="140" r="5" fill="#334155" />
              <circle cx="140" cy="140" r="2.5" fill="#f1f5f9" />
              
              {/* Needle - tapered like the reference image */}
              {(() => {
                const clampedCents = Math.max(-50, Math.min(50, centsOff));
                const angle = (clampedCents / 50) * 55;
                const needleRadian = (angle * Math.PI) / 180;
                const needleLength = 100;
                
                // Calculate needle path - thick at base, thin at tip
                const baseWidth = 8;
                const tipWidth = 0;
                
                const baseLeft = {
                  x: 140 - Math.cos(needleRadian) * (baseWidth / 2),
                  y: 140 - Math.sin(needleRadian) * (baseWidth / 2)
                };
                const baseRight = {
                  x: 140 + Math.cos(needleRadian) * (baseWidth / 2),
                  y: 140 + Math.sin(needleRadian) * (baseWidth / 2)
                };
                const tip = {
                  x: 140 + Math.sin(needleRadian) * needleLength,
                  y: 140 - Math.cos(needleRadian) * needleLength
                };
                
                const needleColor = inTune ? "#10b981" : centsOff > 0 ? "#ef4444" : "#3b82f6";
                
                return (
                  <>
                    {/* Needle shadow */}
                    <polygon
                      points={`${baseLeft.x + 2},${baseLeft.y + 2} ${baseRight.x + 2},${baseRight.y + 2} ${tip.x + 2},${tip.y + 2}`}
                      fill="#00000015"
                      style={{
                        transition: "all 0.15s ease-out"
                      }}
                    />
                    
                    {/* Main needle */}
                    <polygon
                      points={`${baseLeft.x},${baseLeft.y} ${baseRight.x},${baseRight.y} ${tip.x},${tip.y}`}
                      fill={needleColor}
                      style={{
                        transition: "all 0.15s ease-out"
                      }}
                    />
                    
                    {/* Needle tip circle */}
                    <circle
                      cx={tip.x}
                      cy={tip.y}
                      r="5"
                      fill={needleColor}
                      style={{
                        transition: "all 0.15s ease-out"
                      }}
                    />
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Cents display with IN TUNE indicator */}
          <div className="text-center">
            {inTune && detectedNote !== "-" ? (
              <div className="space-y-2">
                <div className="text-6xl font-bold text-green-600 animate-pulse">
                  ✓
                </div>
                <div className="text-2xl font-bold text-green-600 tracking-tight">
                  IN TUNE
                </div>
              </div>
            ) : (
              <>
                <div className={`text-5xl tabular-nums transition-colors font-semibold tracking-tight ${
                  centsOff > 0 ? "text-red-500" : "text-blue-500"
                }`}>
                  {centsOff > 0 ? "+" : ""}{centsOff}
                </div>
                <div className="text-xs text-slate-500 mt-2 font-medium tracking-wide uppercase">
                  cents
                </div>
              </>
            )}
          </div>

          {/* Sharp/Flat indicators */}
          <div className="flex justify-between mt-6 px-2">
            <div className={`text-xs font-semibold tracking-wide transition-all ${
              !inTune && centsOff < 0 ? "text-blue-600 scale-110" : "text-slate-400"
            }`}>
              ♭ FLAT
            </div>
            <div className={`text-xs font-semibold tracking-wide transition-all ${
              !inTune && centsOff > 0 ? "text-red-600 scale-110" : "text-slate-400"
            }`}>
              SHARP ♯
            </div>
          </div>
        </div>

        {/* Microphone button */}
        <button
          onClick={toggleListening}
          className={`
            w-full py-4 px-6 rounded-2xl transition-all shadow-lg
            flex items-center justify-center gap-3
            ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              <span>Stop Listening</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span>Start Tuning</span>
            </>
          )}
        </button>

        {!isListening && !permissionError && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-slate-600">
            <p>
              Tap "Start Tuning" and play a note on your instrument. The tuner will detect the pitch and show if you're sharp or flat.
            </p>
          </div>
        )}

        {/* Permission error message */}
        {permissionError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            <p className="font-semibold mb-2">🎤 Microphone Access Denied</p>
            <p className="mb-3">
              The tuner needs microphone access to detect pitch. Please grant permission in your browser settings:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3 text-xs">
              <li>Click the lock icon in your browser's address bar</li>
              <li>Allow microphone access for this site</li>
              <li>Reload the page if needed</li>
            </ul>
            <button
              onClick={startListening}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}