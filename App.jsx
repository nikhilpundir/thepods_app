/**
 * @format
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}



export default App;
