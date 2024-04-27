/**
 * @format
 */
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './navigation/AuthStack'
// import AppStack from './navigation/AppStack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';
// const Stack = createNativeStackNavigator();
function App() {
  return (
    <AuthProvider>  
      {/* <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <AppNav />
    </AuthProvider>
  );
}



export default App;
