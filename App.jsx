/**
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Home } from './views';
function App() {
  return (
    <SafeAreaView>
        <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
