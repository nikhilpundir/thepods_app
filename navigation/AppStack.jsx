import { View, Text } from 'react-native'
import React from 'react'
import { Home} from '../views'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>

  )
}

export default AppStack