/**
 * @format
 */
import React from 'react';
import { AuthProvider } from './context/AuthContext';

import AppNav from './navigation/AppNav';
import { BookingContextProvider } from './context/BookingContext';
// const Stack = createNativeStackNavigator();
function App() {
  return (
    <AuthProvider>  
      <BookingContextProvider>
      <AppNav />
      </BookingContextProvider>
    </AuthProvider>
  );
}



export default App;
