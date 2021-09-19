import React, {useState, useContext} from 'react';
import {useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import AppContext from '../AppContext';

import BluetoothNotAvailable from '../components/BluetoothNotAvailable';
import {turnOnLed, turnOffLed} from '../utils/ledActions';

const HomeScreen = ({navigation}) => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [bluetoothError, setBluetoothError] = useState(null);
  const {connectedDevice, setConnectedDevice} = useContext(AppContext);

  useEffect(() => {
    //Set event handler to check changes in bluetooth state (enabled / disabled)
    RNBluetoothClassic.onStateChanged(event => {
      setBluetoothEnabled(event.enabled);
    });

    //Error event listener
    RNBluetoothClassic.onError(event => {
      if (event.device) {
        console.log('Error in bluetooth error handler(device)');
        console.warn(event.device);
        setBluetoothError(event.device);
      } else {
        console.log('Error in bluetooth error handler');
        setBluetoothError(event);
        console.warn(event);
      }
    });
  }, []);

  return (
    <View>
      {!bluetoothEnabled && (
        <BluetoothNotAvailable isBluetoothEnabled={bluetoothEnabled} />
      )}
      <Button
        title="Settings"
        onPress={() => navigation.navigate('settings')}
      />
      {!connectedDevice ? (
        <Text>No device connected</Text>
      ) : (
        <Text>Connected to {connectedDevice.name}</Text>
      )}
      <Text>Home Screen</Text>
      <Button title="Turn On" onPress={() => turnOnLed(connectedDevice)} />
      <Button title="Turn Off" onPress={() => turnOffLed(connectedDevice)} />
    </View>
  );
};

export default HomeScreen;
