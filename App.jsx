/**
 * @format
 */
import React from 'react';
import { AuthProvider } from './context/AuthContext';

import AppNav from './navigation/AppNav';
import { BookingContextProvider } from './context/BookingContext';
import { PaymentContextProvider } from './context/PaymentContext';
import { ReportContextProvider } from './context/ReportContext';
// const Stack = createNativeStackNavigator();
function App() {
  return (
    <AuthProvider>
      <BookingContextProvider>
        <PaymentContextProvider>
          <ReportContextProvider>
          <AppNav />
          </ReportContextProvider>
        </PaymentContextProvider>
      </BookingContextProvider>
    </AuthProvider>
  );
}



export default App;
