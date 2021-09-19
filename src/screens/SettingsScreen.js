import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable, Button} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';
import AppContext from '../AppContext';

const SettingsScreen = props => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const {connectedDevice, setConnectedDevice} = useContext(AppContext);

  useEffect(() => {
    RNBluetoothClassic.getBondedDevices()
      .then(devices => {
        setPairedDevices(devices);
      })
      .catch(err => {
        console.log('Error in settings page getting pair devices', err);
      });
  }, []);
  return (
    <View>
      <Text>Mange connection settings</Text>

      {!connectedDevice ? (
        <Text>No device connected</Text>
      ) : (
        <Text>Connected to {connectedDevice.name}</Text>
      )}
      {!connectedDevice && (
        <View>
          <Text>Paired Devices</Text>
          <FlatList
            data={pairedDevices}
            renderItem={({item}) => (
              <View style={{borderTopColor: '#000', borderTopWidth: 3}}>
                <Pressable
                  onPress={() => {
                    item
                      .connect()
                      .then(res => {
                        console.log('Connected', res);
                        setConnectedDevice(item);
                      })
                      .catch(err => {
                        console.log('Error connecting', err);
                      });
                  }}>
                  <Text>{item.id}</Text>
                  <Text>{item.name}</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      )}
      <Button
        title="disconnect"
        onPress={() => {
          connectedDevice
            .disconnect()
            .then(res => {
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
    </View>
  );
};

export default SettingsScreen;
