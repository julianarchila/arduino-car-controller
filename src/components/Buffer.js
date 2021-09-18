import React, {useEffect} from 'react';

import {View, Text, Button} from 'react-native';

// React native hello world app
import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

const App = () => {
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [pairedDevices, setPairedDevices] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [connectedDevice, setConnectedDevice] = React.useState(null);

  useEffect(() => {
    RNBluetoothClassic.isBluetoothEnabled().then(isEnabled => {
      setIsAvailable(isEnabled);
    });
    RNBluetoothClassic.getBondedDevices().then(devices => {
      setPairedDevices(devices);
    });
  }, []);

  if (!connected && !connectedDevice) {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Text>{isAvailable ? 'Available' : 'Not Available'}</Text>
        {pairedDevices.map(device => (
          //Display as pressable text
          <Button
            key={device.id}
            title={device.name}
            onPress={() => {
              // const d = new BluetoothDevice(device);
              device
                .connect()
                .then(res => {
                  setConnectedDevice(device);
                  setConnected(true);
                  console.log('Connected');
                  console.log(res);
                })
                .catch(err => {
                  console.log('Error righ here');
                  console.log(err);
                });
            }}
          />
        ))}
        <Button
          title="Open bluetooth settings"
          onPress={() => RNBluetoothClassic.openBluetoothSettings()}
        />
      </View>
    );
  } else {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <Text>Conntected to {connectedDevice.name}</Text>
        <Button
          title="Disconnect"
          onPress={() => {
            connectedDevice
              .disconnect()
              .then(res => {
                setConnected(false);
                setConnectedDevice(null);
                console.log('Disconnected');
                console.log(res);
              })
              .catch(err => {
                console.log('Error disconnecting');
                console.log(err);
              });
          }}
        />
        <Button
          title="Turn On"
          onPress={() => {
            connectedDevice
              .write('11')
              .then(res => {
                console.log('Turned on');
                console.log(res);
              })
              .catch(err => {
                console.log('Error turning on');
                console.log(err);
              });
          }}
        />
        <Button
          title="Turn Off"
          onPress={() => {
            connectedDevice
              .write('22')
              .then(res => {
                console.log('Turned off');
                console.log(res);
              })
              .catch(err => {
                console.log('Error turning off');
                console.log(err);
              });
          }}
        />
      </View>
    );
  }
};

export default App;
