import { withPlugins } from 'expo/config-plugins';
import {
  withChannelIOMainApplication,
  withChannelIOBuildGradle,
  withChannelIOAppBuildGradle,
} from './channelIO.android';
import { ExpoConfig } from 'expo/config';

const withChannelIO = (config: ExpoConfig) =>
  withPlugins(config, [
    withChannelIOMainApplication,
    withChannelIOBuildGradle,
    withChannelIOAppBuildGradle,
  ]);

export default withChannelIO;
