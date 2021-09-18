import React from 'react';
import {View, Text, Button} from 'react-native';

const ControllerScreen = () => {
  const [on, setOn] = React.useState(false);
  return (
    <View>
      <Text>Controller Screen</Text>
      <Button title={on ? 'Turn Off' : 'Turn On'} onPress={() => setOn(!on)} />
    </View>
  );
};

export default ControllerScreen;
