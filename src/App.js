import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import AppContext from './AppContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const myContext = {
    forChilds: "I'm your fater",
    connectedDevice: connectedDevice,
    setConnectedDevice: setConnectedDevice,
  };
  return (
    <AppContext.Provider value={myContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
