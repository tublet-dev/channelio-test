import { TouchableOpacity, ScrollView, View, StyleSheet, Text } from 'react-native';
import { ChannelIO } from 'react-native-channel-plugin';
import { useEffect } from 'react';
import useChannelTalk from '~/hooks/useChannelTalk';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logWrapper: {
    padding: 20,
  },
  logItem: {
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  buttonWrapper: {
    padding: 20,
    gap: 12,
  },
});

export default function StartingPage() {
  const { log } = useChannelTalk();
  // useEffect(() => {
  //   SplashScreen.hideAsync();
  // }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.logWrapper}>
          {log.map((item, idx) => (
            <View key={idx} style={styles.logItem}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity onPress={() => ChannelIO.showChannelButton()}>
            <Text>SHOW BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChannelIO.hideChannelButton()}>
            <Text>HIDE BUTTON</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChannelIO.showMessenger()}>
            <Text>SHOW MESSENGER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ChannelIO.hideMessenger()}>
            <Text>HIDE MESSENGER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
