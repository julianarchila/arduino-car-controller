import React from 'react';
import {View, Text} from 'react-native';

const BluetoothNotAvailable = () => {
  return (
    <View>
      <Text>
        Bluetooth is not available on this device. Please enable Bluetooth to
        use this app.
      </Text>
    </View>
  );
};

export default BluetoothNotAvailable;
