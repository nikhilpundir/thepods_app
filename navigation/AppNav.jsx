import React, {useContext, useEffect, useState} from 'react'
import { View,ActivityIndicator, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack'
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import { loadingGif } from '../assets/images';
import { AdminReportScreen } from '../views';


const Stack = createNativeStackNavigator();
const AppNav = () => {
  const {user,isLoading}=useContext(AuthContext);
  const [isContentLoading, setIsContentLoading] = useState(true);
  useEffect(() => {
    // Simulating data fetching or initialization
    setTimeout(() => {
      setIsContentLoading(false); // Set loading to false after some time (simulating data loading)
    }, 3000); // Simulate 3 seconds of loading
  }, []);

  const LoadingScreen = () => (
    <View style={styles.container}>
      <Image source={loadingGif} style={styles.loadingImage} />
    </View>
  );

  if (isContentLoading) {
    // Render a loading indicator while loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingScreen />
      </View>
    );
  }
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user !== null ? (
          // Check if the user has an admin role
          user.role === 'admin' ? (
            // Render admin screens for admin users
            <Stack.Screen name="AdminApp" component={AdminReportScreen} />
          ) : (
            // Render app screens for non-admin users
            <Stack.Screen name="App" component={AppStack} />
          )
        ) : (
          // Render authentication screens for unauthenticated users
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
  </>
  )
}

export default AppNav

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width:"100%"
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});