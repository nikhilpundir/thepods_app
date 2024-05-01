import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

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
        })
        setIsLoading(false);
    }


    return(
        <BookingContext.Provider value={{bookings,isLoading,getBooking}}>
            {children}
        </BookingContext.Provider>
    )
}