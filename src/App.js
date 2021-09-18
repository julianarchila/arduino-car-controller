import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingsScreen from './screens/SettingsScreen';
import ControllerScreen from './screens/ControllerScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="settings" component={SettingsScreen} />
        <Stack.Screen name="controller" component={ControllerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
