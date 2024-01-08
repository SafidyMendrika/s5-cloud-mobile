import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gascar.app',
  appName: 'gascar',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
