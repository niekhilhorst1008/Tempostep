import { useState, useEffect, useRef, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { MetronomeArm } from "./components/MetronomeArm";
import { TimeSignatureSelector } from "./components/TimeSignatureSelector";
import { AccentPattern } from "./components/AccentPattern";
import { ProgressionSettings } from "./components/ProgressionSettings";
import { TempoControl } from "./components/TempoControl";
import { SubdivisionSelector } from "./components/SubdivisionSelector";
import { MetronomeSettings } from "./components/MetronomeSettings";
import { SettingsModal, Theme, Language } from "./components/SettingsModal";
import { Tuner } from "./components/Tuner";
import { PresetsList } from "./components/PresetsList";
import { PresetEditor } from "./components/PresetEditor";
import { PremiumModal } from "./components/PremiumModal";
import { AdBanner } from "./components/AdBanner";
import { SoundSelector } from "./components/SoundSelector";
import { Play, Square, Music, Radio, Settings, Bookmark } from "lucide-react";
import { getTempoMarking } from "./utils/tempoMarkings";
import { translate } from "./utils/translations";
import { Preset, createPreset } from "./types/preset";
import { SoundType, playSound } from "./types/sound";
import { PremiumFeatures, loadPremiumFeatures, savePremiumFeatures } from "./types/premium";
import { admobService } from "../services/admobService";
import { iapService } from "../services/iapService";
import { 
  isIOS, 
  triggerHaptic, 
  requestPersistentStorage, 
  initAudioContextIOS,
  fixIOSViewportHeight 
} from "./utils/ios";

export default function App() {
  const [activeTab, setActiveTab] = useState<'metronome' | 'tuner' | 'presets'>('metronome');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTempo, setCurrentTempo] = useState(60);
  const [numerator, setNumerator] = useState(4);
  const [denominator, setDenominator] = useState(4);
  const [accents, setAccents] = useState([true, false, false, false]);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [subdivision, setSubdivision] = useState(1); // 1=quarter, 2=8th, 3=triplet, 4=16th
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [appSettingsOpen, setAppSettingsOpen] = useState(false);
  
  // App settings
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  
  // Tuner settings
  const [referencePitch, setReferencePitch] = useState(440);
  
  // Progression settings
  const [progressionEnabled, setProgressionEnabled] = useState(false);
  const [startTempo, setStartTempo] = useState(60);
  const [targetTempo, setTargetTempo] = useState(120);
  const [tempoStep, setTempoStep] = useState(5);
  const [timePerStep, setTimePerStep] = useState(60); // in seconds
  
  // Presets
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [presetEditorOpen, setPresetEditorOpen] = useState(false);
  const [editingPreset, setEditingPreset] = useState<Preset | undefined>();
  
  // Premium features
  const [premiumFeatures, setPremiumFeatures] = useState<PremiumFeatures>(loadPremiumFeatures());
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  
  // Sound settings
  const [soundType, setSoundType] = useState<SoundType>('beep');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const schedulerTimerRef = useRef<number | null>(null);
  const progressionTimerRef = useRef<number | null>(null);
  const wakeLockRef = useRef<any>(null);
  
  // Get beats per bar from numerator
  const beatsPerBar = numerator;
  
  // Calculate actual tempo based on denominator
  // Quarter note (4) is the reference, so we adjust based on the ratio
  const getActualTempo = (baseTempo: number, denom: number) => {
    return baseTempo * (denom / 4);
  };
  
  const actualTempo = getActualTempo(currentTempo, denominator);
  
  // Get current tempo marking
  const tempoMarking = getTempoMarking(currentTempo);
  
  // Update accents when numerator changes
  useEffect(() => {
    const newAccents = Array(numerator).fill(false);
    newAccents[0] = true; // First beat always accented
    setAccents(newAccents);
  }, [numerator]);
  
  // Toggle accent for a beat
  const toggleAccent = (index: number) => {
    const newAccents = [...accents];
    newAccents[index] = !newAccents[index];
    setAccents(newAccents);
  };
  
  // Test audio function
  const testAudio = async () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioContext();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume();
      } catch (err) {
        audioContextRef.current = new AudioContext();
      }
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = 1000;
    gainNode.gain.value = 0.5; // LOUD!
    
    const now = audioContextRef.current.currentTime;
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  };
  
  // Schedule a note to be played
  const scheduleNote = useCallback((
    time: number,
    beatNumber: number,
    subdivisionIndex: number,
    audioContext: AudioContext,
    currentAccents: boolean[],
    currentBeatsPerBar: number,
    currentSoundType: SoundType
  ) => {
    // Safety check - don't try to play on a closed context
    if (audioContext.state === 'closed') {
      console.error('❌ Tried to schedule note on closed AudioContext!');
      return;
    }
    
    const isMainBeat = subdivisionIndex === 0;
    
    if (isMainBeat) {
      const isAccent = currentAccents[beatNumber % currentBeatsPerBar];
      
      // Play the selected sound type for main beats
      playSound(audioContext, time, currentSoundType, isAccent);
    } else {
      // Subdivision tick - use the same sound type but softer and higher pitched
      playSubdivisionSound(audioContext, time, currentSoundType);
    }
  }, []);
  
  // Subdivision sound function
  const playSubdivisionSound = (audioContext: AudioContext, time: number, soundType: SoundType) => {
    // Safety check
    if (audioContext.state === 'closed') {
      console.error('❌ playSubdivisionSound: AudioContext is closed');
      return;
    }
    
    try {
      switch (soundType) {
      case 'beep':
        {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Softer subdivision beep with sine wave
          oscillator.type = 'sine';
          oscillator.frequency.value = 1100; // Higher but not harsh
          
          // Gentle envelope for subdivision
          gainNode.gain.setValueAtTime(0, time);
          gainNode.gain.linearRampToValueAtTime(0.05, time + 0.003);
          gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
          
          oscillator.start(time);
          oscillator.stop(time + 0.04);
        }
        break;
      case 'woodblock':
        {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'triangle';
          oscillator.frequency.value = 1400;
          
          filter.type = 'bandpass';
          filter.frequency.value = 1200;
          filter.Q.value = 10;
          
          gainNode.gain.setValueAtTime(0.12, time);
          gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
          
          oscillator.start(time);
          oscillator.stop(time + 0.05);
        }
        break;
      case 'cowbell':
        {
          const osc1 = audioContext.createOscillator();
          const osc2 = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          osc1.type = 'square';
          osc2.type = 'square';
          osc1.frequency.value = 900;
          osc2.frequency.value = 600;
          
          gainNode.gain.setValueAtTime(0.1, time);
          gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
          
          osc1.start(time);
          osc2.start(time);
          osc1.stop(time + 0.08);
          osc2.stop(time + 0.08);
        }
        break;
      case 'click':
        {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'square';
          oscillator.frequency.value = 2400;
          
          filter.type = 'highpass';
          filter.frequency.value = 1500;
          
          gainNode.gain.setValueAtTime(0.15, time);
          gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.015);
          
          oscillator.start(time);
          oscillator.stop(time + 0.015);
        }
        break;
      case 'clave':
        {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.value = 2800;
          
          filter.type = 'bandpass';
          filter.frequency.value = 2400;
          filter.Q.value = 5;
          
          gainNode.gain.setValueAtTime(0.12, time);
          gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
          
          oscillator.start(time);
          oscillator.stop(time + 0.04);
        }
        break;
      }
    } catch (err) {
      console.error('❌ playSubdivisionSound error:', err);
    }
  };
  
  // Metronome scheduler
  const scheduler = useCallback(() => {
    // ALWAYS check and recreate if needed
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new AudioContext();
    }
    
    const audioContext = audioContextRef.current;
    
    // Handle suspended state
    if (audioContext.state === 'suspended') {
      // Don't await - just trigger resume and continue
      audioContext.resume().catch(err => {
        console.error('❌ Resume failed:', err);
        // Create a new context if resume fails
        audioContextRef.current = new AudioContext();
      });
      // Don't return - let it continue scheduling
    }
    
    // Double check - should never be closed at this point
    if (audioContext.state === 'closed') {
      console.error('❌ AudioContext is closed, cannot schedule');
      return;
    }
    
    // Schedule more ahead for background compatibility (0.5 seconds)
    const scheduleAheadTime = 0.5;
    const secondsPerBeat = 60.0 / actualTempo;
    const secondsPerSubdivision = secondsPerBeat / subdivision;
    
    while (
      nextNoteTimeRef.current <
      audioContext.currentTime + scheduleAheadTime
    ) {
      // Calculate which beat and which subdivision within that beat
      const totalSubdivisions = currentBeatRef.current;
      const beatNumber = Math.floor(totalSubdivisions / subdivision);
      const subdivisionIndex = totalSubdivisions % subdivision;
      
      // Schedule the note
      scheduleNote(nextNoteTimeRef.current, beatNumber, subdivisionIndex, audioContext, accents, beatsPerBar, soundType);
      
      // Update UI for main beats
      if (subdivisionIndex === 0) {
        const uiBeat = beatNumber % beatsPerBar;
        // Use setTimeout to update UI at the exact time the beat plays
        const delay = (nextNoteTimeRef.current - audioContext.currentTime) * 1000;
        setTimeout(() => {
          setCurrentBeat(uiBeat);
        }, Math.max(0, delay));
      }
      
      // Move to next subdivision
      nextNoteTimeRef.current += secondsPerSubdivision;
      currentBeatRef.current++;
    }
    
    // Use shorter interval for more responsive scheduling
    schedulerTimerRef.current = window.setTimeout(scheduler, 25);
  }, [actualTempo, subdivision, beatsPerBar, soundType, scheduleNote, accents]);
  
  // Start/stop metronome
  const togglePlay = async () => {
    if (!isPlaying) {
      // Trigger haptic feedback on play (iOS)
      triggerHaptic('medium');
      
      // Initialize audio context
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContext();
      }
      
      // Resume audio context if suspended (required by some browsers)
      if (audioContextRef.current.state === 'suspended') {
        try {
          await audioContextRef.current.resume();
        } catch (err) {
          audioContextRef.current = new AudioContext();
        }
      }
      
      // iOS-specific audio initialization
      if (isIOS()) {
        await initAudioContextIOS(audioContextRef.current);
      }
      
      // Request wake lock to keep app active in background
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          // Wake lock not available
        }
      }
      
      // Reset tempo based on progression settings
      if (progressionEnabled) {
        setCurrentTempo(startTempo);
      }
      currentBeatRef.current = 0;
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.1; // Small delay to ensure everything is ready
      
      setIsPlaying(true);
      
      // Start scheduler immediately
      scheduler();
      
      // Start progression timer
      if (progressionEnabled && startTempo < targetTempo) {
        progressionTimerRef.current = window.setInterval(() => {
          setCurrentTempo((prev) => {
            const next = prev + tempoStep;
            if (next >= targetTempo) {
              if (progressionTimerRef.current) {
                clearInterval(progressionTimerRef.current);
              }
              return targetTempo;
            }
            return next;
          });
        }, timePerStep * 1000);
      }
    } else {
      // Trigger haptic feedback on stop (iOS)
      triggerHaptic('light');
      
      // Stop scheduler
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
      
      // Stop progression
      if (progressionTimerRef.current) {
        clearInterval(progressionTimerRef.current);
      }
      
      // Release wake lock
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      
      setIsPlaying(false);
      setCurrentBeat(0);
    }
  };
  
  // Restart scheduler when sound type changes while playing
  useEffect(() => {
    if (isPlaying) {
      // Stop current scheduler
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
      // Restart with new sound type
      scheduler();
    }
  }, [soundType, isPlaying, scheduler]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
      if (progressionTimerRef.current) {
        clearInterval(progressionTimerRef.current);
      }
      // Don't close AudioContext - keep it alive for reuse across tab switches
      // Closing it causes "Cannot resume a closed AudioContext" errors
    };
  }, []);
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
  
  // Initialize AdMob and IAP on app start
  useEffect(() => {
    // Initialize AdMob and prepare first interstitial ad
    admobService.initialize()
      .then(() => {
        // Pre-load interstitial ad for later use
        admobService.prepareInterstitial();
      })
      .catch(() => {
        // AdMob initialization skipped
      });
    
    // Initialize In-App Purchases (RevenueCat)
    iapService.initialize()
      .then(async () => {
        // Check if user has purchased premium and restore state
        const hasPremium = await iapService.hasPremium();
        if (hasPremium) {
          const newFeatures = {
            presets: true,
            sounds: true,
            adFree: true,
          };
          setPremiumFeatures(newFeatures);
          savePremiumFeatures(newFeatures);
        }
      })
      .catch(() => {
        // IAP initialization skipped
      });
  }, []);
  
  // iOS-specific initialization
  useEffect(() => {
    if (isIOS()) {
      // Fix viewport height for iOS
      fixIOSViewportHeight();
      
      // Request persistent storage
      requestPersistentStorage();
    }
  }, []);
  
  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const savedIsPremium = localStorage.getItem('isPremium') === 'true';
    const savedPresets = localStorage.getItem('presets');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    setIsPremium(savedIsPremium);
    if (savedPresets) {
      try {
        setPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error('Error loading presets:', e);
      }
    }
  }, []);
  
  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
  }, [theme, language]);
  
  // Save presets to localStorage
  useEffect(() => {
    localStorage.setItem('presets', JSON.stringify(presets));
  }, [presets]);
  
  // Preset handlers
  const handleCreatePreset = () => {
    setEditingPreset(undefined);
    setPresetEditorOpen(true);
  };
  
  const handleLoadPreset = (preset: Preset) => {
    setNumerator(preset.numerator);
    setDenominator(preset.denominator);
    setAccents(preset.accents);
    setSubdivision(preset.subdivision);
    setProgressionEnabled(preset.progressionEnabled);
    setStartTempo(preset.startTempo);
    setTargetTempo(preset.targetTempo);
    setTempoStep(preset.tempoStep);
    setTimePerStep(preset.timePerStep);
    setCurrentTempo(preset.startTempo);
    setActiveTab('metronome');
  };
  
  const handleDeletePreset = (id: string) => {
    setPresets((prev) => prev.filter((p) => p.id !== id));
  };
  
  const handleSavePreset = (name: string, settings: any) => {
    const newPreset = createPreset(name, settings);
    if (editingPreset) {
      // Update existing preset
      setPresets((prev) =>
        prev.map((p) => (p.id === editingPreset.id ? { ...newPreset, id: editingPreset.id } : p))
      );
    } else {
      // Create new preset
      setPresets((prev) => [...prev, newPreset]);
    }
    setPresetEditorOpen(false);
    setEditingPreset(undefined);
  };
  
  const handleUnlockPremium = () => {
    // For demo purposes, just enable premium
    setIsPremium(true);
    localStorage.setItem('isPremium', 'true');
  };
  
  const handleLeaveReview = () => {
    // Detect platform and open appropriate store
    try {
      const platform = Capacitor.getPlatform();
      
      if (platform === 'ios') {
        // Open iOS App Store
        // ⚠️ IMPORTANT: Replace [YOUR_APP_ID] with actual App Store ID after approval
        // You'll get this ID from App Store Connect after first submission
        // Example: https://apps.apple.com/app/id1234567890
        window.open('https://apps.apple.com/app/id[YOUR_APP_ID]', '_blank');
      } else if (platform === 'android') {
        // Open Google Play Store
        window.open('https://play.google.com/store/apps/details?id=com.tempostep.app', '_blank');
      } else {
        // For web/PWA, default to Google Play (most common)
        window.open('https://play.google.com/store/apps/details?id=com.tempostep.app', '_blank');
      }
    } catch (error) {
      // Fallback for older browsers or errors
      window.open('https://play.google.com/store/apps/details?id=com.tempostep.app', '_blank');
    }
  };
  
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Content area - scrollable with padding for bottom nav */}
      <div className="flex-1 overflow-y-auto ios-scroll pb-24">
        {activeTab === 'metronome' ? (
          <div className="flex items-center justify-center min-h-full p-4 pb-20 ios-notch-safe">
            <div className="w-full max-w-md">
              {/* Header - with safe area padding for notch/Dynamic Island */}
              <header className="text-center mb-3 pt-[calc(0.75rem+env(safe-area-inset-top))]">
                <h1 className="text-foreground">{translate('appName', language)}</h1>
                <p className="text-sm text-muted-foreground mt-0.5">{translate('appSubtitle', language)}</p>
              </header>
              
              <div className="space-y-3">
                {/* Main tempo display */}
                <div className="text-center space-y-1">
                  <div className="text-6xl tabular-nums text-foreground">
                    {currentTempo}
                  </div>
                  <div className="text-lg text-muted-foreground">{translate('bpm', language)}</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                    <span className="text-sm font-medium text-blue-900 italic">
                      {tempoMarking.name}
                    </span>
                    <span className="text-xs text-blue-600">
                      ({tempoMarking.range} BPM)
                    </span>
                  </div>
                </div>
                
                {/* Visual metronome indicator */}
                <div className="py-1">
                  <MetronomeArm
                    isPlaying={isPlaying}
                    bpm={actualTempo}
                    isAccent={accents[currentBeat]}
                  />
                </div>
                
                {/* Time signature selector */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-slate-600">{translate('timeSignature', language)}</label>
                    <button
                      onClick={() => setSettingsOpen(true)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>{translate('settings', language)}</span>
                    </button>
                  </div>
                  <TimeSignatureSelector
                    numerator={numerator}
                    denominator={denominator}
                    onNumeratorChange={setNumerator}
                    onDenominatorChange={setDenominator}
                    disabled={isPlaying}
                  />
                </div>
                
                {/* Manual tempo control (only shown when progression is disabled) */}
                {!progressionEnabled && (
                  <TempoControl
                    label={translate('tempo', language)}
                    value={currentTempo}
                    onChange={setCurrentTempo}
                    disabled={isPlaying}
                  />
                )}
                
                {/* Primary action button */}
                <button
                  onClick={togglePlay}
                  className={`
                    w-full py-3.5 px-6 rounded-2xl transition-all shadow-lg ios-active-feedback
                    flex items-center justify-center gap-3
                    ${
                      isPlaying
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }
                  `}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-5 h-5" />
                      <span>{translate('stop', language)}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>{translate('startPracticing', language)}</span>
                    </>
                  )}
                </button>
                
                {/* Tempo progression settings */}
                <ProgressionSettings
                  enabled={progressionEnabled}
                  startTempo={startTempo}
                  targetTempo={targetTempo}
                  tempoStep={tempoStep}
                  timePerStep={timePerStep}
                  onEnabledChange={setProgressionEnabled}
                  onStartTempoChange={setStartTempo}
                  onTargetTempoChange={setTargetTempo}
                  onTempoStepChange={setTempoStep}
                  onTimePerStepChange={setTimePerStep}
                  disabled={isPlaying}
                  language={language}
                />
              </div>
            </div>
          </div>
        ) : activeTab === 'tuner' ? (
          <Tuner
            referencePitch={referencePitch}
            onReferencePitchChange={setReferencePitch}
          />
        ) : presetEditorOpen ? (
          <PresetEditor
            preset={editingPreset}
            currentSettings={{
              startTempo,
              targetTempo,
              tempoStep,
              timePerStep,
              progressionEnabled,
              numerator,
              denominator,
              accents,
              subdivision,
            }}
            language={language}
            onSave={handleSavePreset}
            onCancel={() => {
              setPresetEditorOpen(false);
              setEditingPreset(undefined);
            }}
          />
        ) : (
          <PresetsList
            presets={presets}
            isPremium={isPremium}
            language={language}
            onCreatePreset={handleCreatePreset}
            onLoadPreset={handleLoadPreset}
            onDeletePreset={handleDeletePreset}
            onUnlockPremium={handleUnlockPremium}
            onLeaveReview={handleLeaveReview}
          />
        )}
      </div>

      {/* Bottom Navigation - Compact version */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border ios-bottom-nav z-50">
        <div className="max-w-md mx-auto px-2 py-2 flex">
          <button
            onClick={() => setActiveTab('metronome')}
            className={`
              flex-1 py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5 ios-active-feedback
              ${
                activeTab === 'metronome'
                  ? 'text-blue-600'
                  : 'text-muted-foreground'
              }
            `}
          >
            <Music className="w-5 h-5" />
            <span className="text-[10px] font-medium">{translate('metronome', language)}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tuner')}
            className={`
              flex-1 py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5 ios-active-feedback
              ${
                activeTab === 'tuner'
                  ? 'text-blue-600'
                  : 'text-muted-foreground'
              }
            `}
          >
            <Radio className="w-5 h-5" />
            <span className="text-[10px] font-medium">{translate('tuner', language)}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('presets')}
            className={`
              flex-1 py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5 ios-active-feedback
              ${
                activeTab === 'presets'
                  ? 'text-blue-600'
                  : 'text-muted-foreground'
              }
            `}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] font-medium">{translate('presets', language)}</span>
          </button>
          
          <button
            onClick={() => setAppSettingsOpen(true)}
            className="flex-1 py-2 px-2 rounded-lg transition-all flex flex-col items-center gap-0.5 text-muted-foreground ios-active-feedback"
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-medium">{translate('settings', language)}</span>
          </button>
        </div>
      </nav>

      {/* Metronome Settings Modal */}
      <MetronomeSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        beatsPerBar={beatsPerBar}
        accents={accents}
        onAccentToggle={toggleAccent}
        subdivision={subdivision}
        onSubdivisionChange={setSubdivision}
        disabled={isPlaying}
        currentBeat={isPlaying ? currentBeat : undefined}
        language={language}
        soundType={soundType}
        onSoundTypeChange={setSoundType}
        isPremiumSounds={premiumFeatures.sounds}
        onUpgradeSounds={() => setPremiumModalOpen(true)}
      />
      
      {/* App Settings Modal */}
      <SettingsModal
        isOpen={appSettingsOpen}
        onClose={() => setAppSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        onLeaveReview={handleLeaveReview}
      />
      
      {/* Premium Modal */}
      <PremiumModal
        isOpen={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        premiumFeatures={premiumFeatures}
        onPurchaseSuccess={async () => {
          // Unlock all premium features after successful purchase
          const newFeatures = {
            presets: true,
            sounds: true,
            adFree: true,
          };
          setPremiumFeatures(newFeatures);
          savePremiumFeatures(newFeatures);
        }}
        language={language}
      />
      
      {/* Ad Banner */}
      {!premiumFeatures.adFree && (
        <AdBanner
          language={language}
          onUpgrade={() => setPremiumModalOpen(true)}
        />
      )}
    </div>
  );
}