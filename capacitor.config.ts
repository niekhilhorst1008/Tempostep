import { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor Configuration for TempoStep
 */

const config: CapacitorConfig = {
  appId: 'com.tempostep.app',
  appName: 'TempoStep',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#2563eb',
    // Allow inline media playback (important for Web Audio API)
    allowsInlineMediaPlayback: true,
    // Suppress incremental rendering for better performance
    suppressesIncrementalRendering: false,
    // Enable hardware acceleration
    limitsNavigationsToAppBoundDomains: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#2563eb',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
    },
    Keyboard: {
      resize: 'native',
      style: 'dark',
      resizeOnFullScreen: true
    },
  },
};

export default config;