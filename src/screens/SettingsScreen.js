import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

const SettingsScreen = props => {
  const [pairedDevices, setPairedDevices] = useState([]);

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
      <Text>Paired Devices</Text>
      <FlatList
        data={pairedDevices}
        renderItem={({item}) => (
          <View style={{borderTopColor: '#000', borderTopWidth: 3}}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SettingsScreen;
