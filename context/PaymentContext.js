import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const PaymentContext=createContext();

const BASE_URL = 'https://thepods-server.vercel.app';
const BOOKING_URL = `${BASE_URL}/api/book`;

export const PaymentContextProvider=({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    
    const checkout= async (body)=>{
        try {
            const response = await axios.post(`${BOOKING_URL}/checkout`, body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
             // Rethrow the error to handle it outside
        }
    }
    const getPaymentKey= async ()=>{
        try {
            const response = await axios.get(`${BASE_URL}/api/getkey`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            
        }
    }

    const paymentVerification=async (body)=>{
        try {
            const response = await axios.get(`${BOOKING_URL}/paymentverification`,body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    


    return(
        <PaymentContext.Provider value={{isLoading,getPaymentKey,checkout,paymentVerification}}>
            {children}
        </PaymentContext.Provider>
    )
}