import 'ts-node/register'; // Add this to import TypeScript files
import { ExpoConfig, ConfigContext } from 'expo/config';
import { withPlugins } from 'expo/config-plugins';
import withChannelIO from './plugins/channelIO';

const expoConfig = ({ config }: ConfigContext): ExpoConfig => {
  const newConfig: ExpoConfig = {
    ...config,
    name: 'Upgrade_ChannelIO_test',
    slug: 'upgrade-channelio-test',
    version: '1.0.0',
    platforms: ['android'],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    android: {
      versionCode: 10000,
      package: 'com.teamupgrade.channeliotest',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: false,
    },
  };

  return withPlugins(newConfig, [withChannelIO]);
};

export default expoConfig;
