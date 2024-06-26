import { View, Text } from 'react-native'
import React from 'react'
import {OnBoard,Login, Signup, OtpVerfication, Home} from '../views'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}> 
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>

  )
}

export default AuthStack