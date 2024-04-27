import React, {useContext} from 'react'
import { View,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack'
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();
const AppNav = () => {
  const {user,isLoading}=useContext(AuthContext);
  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
    )
  }
  return (
    <>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            {user !== null ?<Stack.Screen name="App" component={AppStack} />:<Stack.Screen name="Auth" component={AuthStack} />}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
     </>
  )
}

export default AppNav