export type SoundType = 'beep' | 'woodblock' | 'cowbell' | 'click' | 'clave';

export const soundTypes: { value: SoundType; label: string; isPremium: boolean }[] = [
  { value: 'beep', label: 'Digital Beep', isPremium: false },
  { value: 'woodblock', label: 'Wood Block', isPremium: true },
  { value: 'cowbell', label: 'Cowbell', isPremium: true },
  { value: 'click', label: 'Click', isPremium: true },
  { value: 'clave', label: 'Clave', isPremium: true },
];

// Generate different sound types using Web Audio API
export function playSound(
  audioContext: AudioContext,
  time: number,
  soundType: SoundType,
  isAccent: boolean,
  isDownbeat: boolean = false
) {
  // CRITICAL: Don't try to use a closed AudioContext
  if (audioContext.state === 'closed') {
    console.error('❌ playSound: AudioContext is closed, cannot play sound');
    return;
  }
  
  switch (soundType) {
    case 'beep':
      playBeepSound(audioContext, time, isAccent, isDownbeat);
      break;
    case 'woodblock':
      playWoodblockSound(audioContext, time, isAccent, isDownbeat);
      break;
    case 'cowbell':
      playCowbellSound(audioContext, time, isAccent, isDownbeat);
      break;
    case 'click':
      playClickSound(audioContext, time, isAccent, isDownbeat);
      break;
    case 'clave':
      playClaveSound(audioContext, time, isAccent, isDownbeat);
      break;
  }
}

// Digital beep (original sound)
function playBeepSound(audioContext: AudioContext, time: number, isAccent: boolean, isDownbeat: boolean = false) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Softer, warmer beep with sine wave and musical intervals
    oscillator.type = 'sine';
    // Downbeat: lower, louder (A4), Accent: A5, Regular: E5
    oscillator.frequency.value = isDownbeat ? 440 : (isAccent ? 880 : 660);
    
    // Clear, audible volume - downbeat is loudest
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(isDownbeat ? 0.5 : (isAccent ? 0.4 : 0.25), time + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isDownbeat ? 0.12 : 0.08));
    
    oscillator.start(time);
    oscillator.stop(time + (isDownbeat ? 0.12 : 0.08));
  } catch (err) {
    console.error('❌ playBeepSound error:', err);
  }
}

// Wood block sound (short percussive with resonance)
function playWoodblockSound(audioContext: AudioContext, time: number, isAccent: boolean, isDownbeat: boolean = false) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Wood block characteristics - downbeat is deeper
    oscillator.type = 'triangle';
    oscillator.frequency.value = isDownbeat ? 800 : (isAccent ? 1200 : 1000);
    
    filter.type = 'bandpass';
    filter.frequency.value = isDownbeat ? 800 : 1000;
    filter.Q.value = 10;
    
    // Sharp attack, quick decay - downbeat is louder and longer
    gainNode.gain.setValueAtTime(isDownbeat ? 0.5 : (isAccent ? 0.4 : 0.25), time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isDownbeat ? 0.12 : 0.08));
    
    oscillator.start(time);
    oscillator.stop(time + (isDownbeat ? 0.12 : 0.08));
  } catch (err) {
    console.error('❌ playWoodblockSound error:', err);
  }
}

// Cowbell sound (metallic, two frequencies)
function playCowbellSound(audioContext: AudioContext, time: number, isAccent: boolean, isDownbeat: boolean = false) {
  try {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Cowbell has two primary frequencies - downbeat is deeper
    osc1.type = 'square';
    osc2.type = 'square';
    osc1.frequency.value = isDownbeat ? 600 : (isAccent ? 800 : 700);
    osc2.frequency.value = isDownbeat ? 400 : (isAccent ? 540 : 480);
    
    // Sharp attack, medium decay - downbeat is louder and longer
    gainNode.gain.setValueAtTime(isDownbeat ? 0.45 : (isAccent ? 0.35 : 0.2), time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isDownbeat ? 0.18 : 0.12));
    
    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + (isDownbeat ? 0.18 : 0.12));
    osc2.stop(time + (isDownbeat ? 0.18 : 0.12));
  } catch (err) {
    console.error('❌ playCowbellSound error:', err);
  }
}

// Click sound (very short, sharp)
function playClickSound(audioContext: AudioContext, time: number, isAccent: boolean, isDownbeat: boolean = false) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.value = isDownbeat ? 1200 : (isAccent ? 2000 : 1500);
    
    filter.type = 'highpass';
    filter.frequency.value = isDownbeat ? 800 : 1000;
    
    // Very sharp attack, very quick decay - downbeat slightly longer
    gainNode.gain.setValueAtTime(isDownbeat ? 0.6 : (isAccent ? 0.5 : 0.3), time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isDownbeat ? 0.04 : 0.02));
    
    oscillator.start(time);
    oscillator.stop(time + (isDownbeat ? 0.04 : 0.02));
  } catch (err) {
    console.error('❌ playClickSound error:', err);
  }
}

// Clave sound (short, bright, percussive)
function playClaveSound(audioContext: AudioContext, time: number, isAccent: boolean, isDownbeat: boolean = false) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = isDownbeat ? 1800 : (isAccent ? 2500 : 2200);
    
    filter.type = 'bandpass';
    filter.frequency.value = isDownbeat ? 1600 : 2000;
    filter.Q.value = 5;
    
    // Sharp attack, quick decay - downbeat is louder and longer
    gainNode.gain.setValueAtTime(isDownbeat ? 0.5 : (isAccent ? 0.4 : 0.25), time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + (isDownbeat ? 0.10 : 0.06));
    
    oscillator.start(time);
    oscillator.stop(time + (isDownbeat ? 0.10 : 0.06));
  } catch (err) {
    console.error('❌ playClaveSound error:', err);
  }
}