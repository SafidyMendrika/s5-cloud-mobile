import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gascar.app',
  appName: 'gascar',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      // smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
      // sound: "beep.wav
    },
    PushNitifications: {
      presentationOptions : ["badge","sound","alert"]
    }
  },
};

export default config;
