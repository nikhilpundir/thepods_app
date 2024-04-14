import { View, Text } from 'react-native'
import React from 'react'
import Home from './Home'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeMain" component={Home} />
      </Stack.Navigator>
  )
}

export default AppStack