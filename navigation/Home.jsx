import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Book, HomeScreen } from '../views';
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Book" component={Book} />
      </Tab.Navigator>
      
  )
}

export default Home

const styles = StyleSheet.create({})