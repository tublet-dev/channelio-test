import { ConfigPlugin, withDangerousMod } from 'expo/config-plugins';
import * as path from 'path';
import { readFileAsync, saveFileAsync } from './utils';

export const withChannelIOBuildGradle: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, './build.gradle');
      const contents = await readFileAsync(file);
      await saveFileAsync(file, changeBuildGradle(contents));

      return config;
    },
  ]);
};

export const withChannelIOAppBuildGradle: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, './app/build.gradle');
      const contents = await readFileAsync(file);
      await saveFileAsync(file, changeAppBuildGradle(contents));

      return config;
    },
  ]);
};

export const withChannelIOMainApplication: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const file = path.join(
        config.modRequest.platformProjectRoot,
        './app/src/main/java/com/teamupgrade/channeliotest/MainApplication.kt'
      );
      const contents = await readFileAsync(file);
      await saveFileAsync(file, changeMainApplication(contents));

      return config;
    },
  ]);
};

const changeMainApplication = (contents: string) => {
  const contentArray = contents.split('\n');

  const importLine = 'import com.zoyi.channel.plugin.android.ChannelIO;';
  if (!contents.includes(importLine)) {
    const index = contentArray.findIndex((line) =>
      line.includes('import expo.modules.ReactNativeHostWrapper')
    );
    contentArray.splice(index + 1, 0, `${importLine}\n`);
  }

  const initializeLine = 'ChannelIO.initialize(this);';
  if (!contents.includes(initializeLine)) {
    const initializeIndex = contentArray.findIndex((line) =>
      line.includes('ApplicationLifecycleDispatcher.onApplicationCreate(this)')
    );
    contentArray.splice(initializeIndex + 1, 0, `${initializeLine}\n`);
  }

  return contentArray.join('\n');
};

const changeBuildGradle = (contents: string) => {
  const contentArray = contents.split('\n');

  const importLine = `maven {  
            url 'https://maven.channel.io/maven2'  
            name 'ChannelTalk'  
        }`;
  if (!contents.includes(importLine)) {
    const index = contentArray.findIndex((line) => line.includes('mavenCentral()'));
    contentArray.splice(index + 1, 0, `${importLine}\n`);
  }

  return contentArray.join('\n');
};

const changeAppBuildGradle = (contents: string) => {
  const contentArray = contents.split('\n');

  const importLine = `multiDexEnabled true`;
  if (!contents.includes(importLine)) {
    const index = contentArray.findIndex((line) => line.includes('defaultConfig'));
    contentArray.splice(index + 1, 0, `${importLine}\n`);
  }

  return contentArray.join('\n');
};
