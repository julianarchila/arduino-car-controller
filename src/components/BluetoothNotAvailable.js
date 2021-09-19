import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert} from 'react-native';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

const BluetoothNotAvailable = ({bluetoothEnabled}) => {
  const [error, setError] = useState(null);
  const requestBluetooth = () => {
    RNBluetoothClassic.requestBluetoothEnabled()
      .then(res => {
        console.log('Bluetooth enable request response', res);
      })
      .catch(err => {
        console.log('Bluetooth enable request error', err.message);
        setError(err);
      });
  };
  useEffect(() => {
    if (!bluetoothEnabled) {
      requestBluetooth();
    }
  }, []);
  if (error) {
    Alert.alert('Enable bluetooth', 'Bluetooth is required to use this app', [
      {
        text: 'Turn on',
        onPress: requestBluetooth,
      },
    ]);
  }
  return <View></View>;
};

export default BluetoothNotAvailable;
