
import React,{useContext} from 'react'
import Home from './Home'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OtpVerfication, ProfileMain } from '../views';
import { AuthContext } from '../context/AuthContext';
import { PodPage } from '../components';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  const {user} = useContext(AuthContext)
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        {user?.verified? <Stack.Screen name="HomeMain" component={Home} />:<Stack.Screen name="OtpVerification" component={OtpVerfication} /> }
        <Stack.Screen name="ProfileMain" component={ProfileMain} />
        <Stack.Screen name="PodPage" component={PodPage} />
      
      </Stack.Navigator>
  )
}

export default AppStack