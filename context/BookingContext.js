import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
export const BookingContext=createContext();

const BASE_URL = 'https://thepods-server.vercel.app';
const BOOKING_URL = `${BASE_URL}/api/book`;

export const BookingContextProvider=({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState(null);
    

    const getBooking= (body)=>{
        setIsLoading(true);
        axios.get(`${BOOKING_URL}/bookings/${body.userId}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            // console.log(response.data);
            // AsyncStorage.setItem('bookings', JSON.stringify(response.data));
            setBookings(response.data);
        })
        .catch(error=>{
            console.log(error);
            Toast.show({
                type: 'error',
                text1:'Some Error Occured',
                text2: 'Please try again in Some time!'
            });
        }).finally(()=>{
            setIsLoading(false);
        })
        
    }
    const bookingConfirm=(body)=>{
        setIsLoading(true);
        axios.post(`${BOOKING_URL}/bookingconfirmation`,body ,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
            Toast.show({
                type: 'error',
                text1:'Some Error Occured',
                text2: 'Please try again in Some time!'
            });
        }).finally(()=>{
            setIsLoading(false);
        })
        
    }
    const bookingCancellation=(body)=>{
        setIsLoading(true);
        axios.delete(`${BOOKING_URL}/bookings/${body.bookingId}`,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response=>{
            console.log(response.data);
            // return response.data;
            Toast.show({
                type: 'success',
                text2: response.data.message
            });
        })
        .catch(error=>{
            console.log(error);
            Toast.show({
                type: 'error',
                text2: 'Server Error Please try again in Some time!'
            });
        }).finally(()=>{
            setIsLoading(false);
        })
        
    }

    return(
        <BookingContext.Provider value={{bookings,isLoading,getBooking,bookingConfirm,bookingCancellation}}>
            {children}
        </BookingContext.Provider>
    )
}