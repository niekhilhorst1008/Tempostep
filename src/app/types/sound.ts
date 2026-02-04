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
  isAccent: boolean
) {
  // CRITICAL: Don't try to use a closed AudioContext
  if (audioContext.state === 'closed') {
    console.error('❌ playSound: AudioContext is closed, cannot play sound');
    return;
  }
  
  switch (soundType) {
    case 'beep':
      playBeepSound(audioContext, time, isAccent);
      break;
    case 'woodblock':
      playWoodblockSound(audioContext, time, isAccent);
      break;
    case 'cowbell':
      playCowbellSound(audioContext, time, isAccent);
      break;
    case 'click':
      playClickSound(audioContext, time, isAccent);
      break;
    case 'clave':
      playClaveSound(audioContext, time, isAccent);
      break;
  }
}

// Digital beep (original sound)
function playBeepSound(audioContext: AudioContext, time: number, isAccent: boolean) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Softer, warmer beep with sine wave and musical intervals
    oscillator.type = 'sine';
    oscillator.frequency.value = isAccent ? 880 : 660; // A5 : E5 - pleasant musical intervals
    
    // Clear, audible volume
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(isAccent ? 0.4 : 0.25, time + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    oscillator.start(time);
    oscillator.stop(time + 0.08);
  } catch (err) {
    console.error('❌ playBeepSound error:', err);
  }
}

// Wood block sound (short percussive with resonance)
function playWoodblockSound(audioContext: AudioContext, time: number, isAccent: boolean) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Wood block characteristics
    oscillator.type = 'triangle';
    oscillator.frequency.value = isAccent ? 1200 : 1000;
    
    filter.type = 'bandpass';
    filter.frequency.value = 1000;
    filter.Q.value = 10;
    
    // Sharp attack, quick decay
    gainNode.gain.setValueAtTime(isAccent ? 0.4 : 0.25, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
    
    oscillator.start(time);
    oscillator.stop(time + 0.08);
  } catch (err) {
    console.error('❌ playWoodblockSound error:', err);
  }
}

// Cowbell sound (metallic, two frequencies)
function playCowbellSound(audioContext: AudioContext, time: number, isAccent: boolean) {
  try {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Cowbell has two primary frequencies
    osc1.type = 'square';
    osc2.type = 'square';
    osc1.frequency.value = isAccent ? 800 : 700;
    osc2.frequency.value = isAccent ? 540 : 480;
    
    // Sharp attack, medium decay
    gainNode.gain.setValueAtTime(isAccent ? 0.35 : 0.2, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
    
    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.12);
    osc2.stop(time + 0.12);
  } catch (err) {
    console.error('❌ playCowbellSound error:', err);
  }
}

// Click sound (very short, sharp)
function playClickSound(audioContext: AudioContext, time: number, isAccent: boolean) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.value = isAccent ? 2000 : 1500;
    
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    // Very sharp attack, very quick decay
    gainNode.gain.setValueAtTime(isAccent ? 0.5 : 0.3, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.02);
    
    oscillator.start(time);
    oscillator.stop(time + 0.02);
  } catch (err) {
    console.error('❌ playClickSound error:', err);
  }
}

// Clave sound (short, bright, percussive)
function playClaveSound(audioContext: AudioContext, time: number, isAccent: boolean) {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = isAccent ? 2500 : 2200;
    
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.Q.value = 5;
    
    // Sharp attack, quick decay
    gainNode.gain.setValueAtTime(isAccent ? 0.4 : 0.25, time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.06);
    
    oscillator.start(time);
    oscillator.stop(time + 0.06);
  } catch (err) {
    console.error('❌ playClaveSound error:', err);
  }
}