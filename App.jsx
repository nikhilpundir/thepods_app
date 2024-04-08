/**
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,Book } from './views';
import { Footer, HeaderTop } from './components';
const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
    {/* <SafeAreaView> */}
      
      {/* <ScrollView showsVerticalScrollIndicator={false}>  */}
      {/* <HeaderTop /> */}
        {/* <Home /> */}
        {/* <Footer /> */}
        
      {/* </ScrollView> */}
    {/* </SafeAreaView> */}
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Book" component={Book} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



export default App;
