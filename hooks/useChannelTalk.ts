import { BootConfig, ChannelIO } from 'react-native-channel-plugin';
import { usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import useAsyncEffect from '~/hooks/useAsyncEffect';

const CHANNELTALK_PLUGIN_KEY = '763a0376-21df-4571-b19d-b95ac8d0b879';

const useChannelTalk = () => {
  const pathname = usePathname();
  const [isBooted, setIsBooted] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // Boot ChannelIO
  useAsyncEffect(async () => {
    const settings: BootConfig = {
      pluginKey: CHANNELTALK_PLUGIN_KEY,
      channelButtonOption: {
        xMargin: 20,
        yMargin: 72,
        position: 'right', // "left", "right"
      },
    };

    try {
      // Boot ChannelIO
      setLog((prev) => [...prev, 'Booting ChannelIO']);

      const result = await ChannelIO.boot(settings);
      setLog((prev) => [...prev, 'Boot result: ' + JSON.stringify(result)]);

      if (result.status !== 'SUCCESS') {
        throw new Error(`ChannelIO boot failed. status: ${result.status}`);
      }

      setLog((prev) => [...prev, 'Boot completed']);

      setIsBooted(true);

      // Register push token
      //   const token = await Notifications.getDevicePushTokenAsync();
      //   setLog((prev) => [...prev, 'get push token: ' + token.data]);
      //   ChannelIO.initPushToken(token.data);
      //   setLog((prev) => [...prev, 'init push token completed']);
      //   console.log(`ChannelIO push token registered successfully. token: ${token.data}`);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    return () => {
      setLog((prev) => [...prev, 'ChannelIO shutdown']);
      ChannelIO.shutdown();
    };
  }, []);

  useEffect(() => {
    setLog((prev) => [...prev, 'pathname changed: ' + pathname]);
    if (!isBooted) return;

    if (pathname === '/') {
      setLog((prev) => [...prev, 'showChannelButton']);
      ChannelIO.showChannelButton();
    } else {
      setLog((prev) => [...prev, 'hideChannelButton']);
      ChannelIO.hideChannelButton();
    }
  }, [isBooted, pathname]);

  return { log };
};

export default useChannelTalk;
