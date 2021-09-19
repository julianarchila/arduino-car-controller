import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, Button} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

import BluetoothNotAvailable from '../components/BluetoothNotAvailable';

const HomeScreen = ({navigation}) => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [bluetoothError, setBluetoothError] = useState(null);
  useEffect(() => {
    //Set event handler to check changes in bluetooth state (enabled / disabled)
    RNBluetoothClassic.onStateChanged(event => {
      setBluetoothEnabled(event.enabled);
    });

    //Check changes in connection sockets
    RNBluetoothClassic.onDeviceConnected(event => {
      setConnectedDevice(event.device);
    });

    //Error event listener
    RNBluetoothClassic.onError(event => {
      if (event.device) {
        console.log('Error in bluetooth error handler(device)');
        console.warn(event.device);
      } else {
        console.log('Error in bluetooth error handler');
        console.warn(event);
      }
    });
  }, []);

  return (
    <View>
      {!bluetoothEnabled && (
        <BluetoothNotAvailable isBluetoothEnabled={bluetoothEnabled} />
      )}
      {!connectedDevice && (
        <Button
          title="Go to Setting and connect to a device"
          onPress={() => navigation.navigate('settings')}
        />
      )}
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
