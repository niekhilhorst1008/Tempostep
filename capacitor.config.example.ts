import { CapacitorConfig } from '@capacitor/cli';

/**
 * Capacitor Configuration for TempoStep
 * 
 * After exporting from Figma Make and setting up Capacitor,
 * rename this file to capacitor.config.ts
 */

const config: CapacitorConfig = {
  appId: 'com.tempostep.app', // Change this to your unique package ID
  appName: 'TempoStep',
  webDir: 'dist', // Or 'build' depending on your build output
  server: {
    androidScheme: 'https'
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
    // AdMob configuration is handled in admobService.ts
    // No additional config needed here
  },
  android: {
    buildOptions: {
      keystorePath: undefined, // Set this when building release
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
