/**
 * iOS-specific utilities and optimizations
 */

/**
 * Detect if the app is running on iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
};

/**
 * Detect if the app is running as a standalone PWA on iOS
 */
export const isIOSStandalone = (): boolean => {
  return isIOS() && (window.navigator as any).standalone === true;
};

/**
 * Trigger haptic feedback on iOS (if available)
 * @param style - The haptic feedback style
 */
export const triggerHaptic = (
  style: 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error' = 'light'
): void => {
  if (!isIOS()) return;

  try {
    // For iOS Capacitor apps
    if ((window as any).Capacitor) {
      // Haptics plugin would be used here if installed
      // For now, we'll use the vibration API as fallback
    }

    // Standard Vibration API (limited support on iOS)
    if ('vibrate' in navigator) {
      switch (style) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(20);
          break;
        case 'heavy':
          navigator.vibrate(30);
          break;
        case 'selection':
          navigator.vibrate(5);
          break;
        case 'success':
          navigator.vibrate([10, 50, 10]);
          break;
        case 'warning':
          navigator.vibrate([20, 50, 20]);
          break;
        case 'error':
          navigator.vibrate([30, 50, 30, 50, 30]);
          break;
      }
    }
  } catch (error) {
    // Silently fail if haptics not available
    console.debug('Haptic feedback not available:', error);
  }
};

/**
 * Request persistent storage on iOS to prevent data eviction
 */
export const requestPersistentStorage = async (): Promise<boolean> => {
  if (!isIOS()) return false;

  try {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      return isPersisted;
    }
  } catch (error) {
    console.error('Error requesting persistent storage:', error);
  }
  return false;
};

/**
 * Initialize Audio Context with iOS compatibility
 * iOS requires user interaction before AudioContext can be started
 */
export const initAudioContextIOS = async (audioContext: AudioContext): Promise<void> => {
  if (!isIOS()) return;

  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Play a silent sound to "unlock" audio on iOS
    const silentBuffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = silentBuffer;
    source.connect(audioContext.destination);
    source.start(0);
    
    // Also play a very short audible beep to REALLY unlock iOS audio
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 1000;
    gainNode.gain.value = 0.1; // Quiet but audible
    
    const now = audioContext.currentTime;
    oscillator.start(now);
    oscillator.stop(now + 0.05); // Very short 50ms beep
  } catch (error) {
    console.error('❌ Error initializing iOS Audio Context:', error);
  }
};

/**
 * Prevent iOS Safari bounce/rubber-band scrolling
 */
export const preventIOSBounce = (): void => {
  if (!isIOS()) return;

  let lastY = 0;

  const preventBounce = (e: TouchEvent) => {
    const target = e.target as HTMLElement;
    
    // Allow scrolling within scrollable elements
    if (target.classList.contains('overflow-y-auto') || 
        target.closest('.overflow-y-auto')) {
      return;
    }

    const currentY = e.touches[0].clientY;
    if (currentY > lastY) {
      // Scrolling down
      e.preventDefault();
    } else if (currentY < lastY) {
      // Scrolling up
      e.preventDefault();
    }
    lastY = currentY;
  };

  document.body.addEventListener('touchmove', preventBounce, { passive: false });
};

/**
 * Fix iOS viewport height issue (100vh includes browser chrome)
 */
export const fixIOSViewportHeight = (): void => {
  if (!isIOS()) return;

  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
};

/**
 * Optimize scroll performance on iOS
 */
export const optimizeIOSScroll = (element: HTMLElement): void => {
  if (!isIOS()) return;

  element.style.webkitOverflowScrolling = 'touch';
  element.style.overflowScrolling = 'touch';
};

/**
 * Check if iOS supports Web Audio API
 */
export const supportsWebAudioAPI = (): boolean => {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
};

/**
 * Get iOS version
 */
export const getIOSVersion = (): number | null => {
  if (!isIOS()) return null;

  const match = navigator.userAgent.match(/OS (\d+)_/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Check if device has notch/dynamic island
 */
export const hasNotch = (): boolean => {
  if (!isIOS()) return false;

  // Check for safe area insets
  const safeAreaTop = getComputedStyle(document.documentElement)
    .getPropertyValue('--safe-area-inset-top');
  
  return safeAreaTop !== '0px' && safeAreaTop !== '';
};
