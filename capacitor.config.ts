import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aurorafx.app',
  appName: 'AURORA.FX',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  // Set app icon to f8731a577595955caed5a7df3fce23dc~3.jpg
  // Note: For a real build, this file must be processed through @capacitor/assets
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#020617",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#0EA5E9"
    }
  }
};

export default config;