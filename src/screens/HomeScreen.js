import React from 'react';
import {useEffect} from 'react';
import {View, Text} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

const HomeScreen = ({navigation}) => {
  const [bluetoothAvailable, setBluetoothAvailable] = React.useState(false);

  useEffect(() => {
    RNBluetoothClassic.isBluetoothEnabled()
      .then(enabled => {
        if (!enabled) {
          navigation.navigate('settings');
        } else {
          navigation.navigate('controller');
        }
        setBluetoothAvailable(enabled);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
