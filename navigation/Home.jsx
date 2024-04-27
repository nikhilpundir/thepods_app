import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Book, HomeScreen,Bookings } from '../views';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../assets/colors';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Book') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: 'gray',
        headerShown:false,
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Book" component={Book} />
        <Tab.Screen name="Bookings" component={Bookings} />
        
      </Tab.Navigator>
      
  )
}

export default Home

const styles = StyleSheet.create({})