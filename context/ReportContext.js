import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const ReportContext = createContext();

const BASE_URL = 'https://thepods-server.vercel.app';
const REPORT_URL = `${BASE_URL}/api/report`;

export const ReportContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allUsers, setAllUsers] = useState(null);
    const [allBookings, setAllBookings] = useState(null);
    useEffect(() => {
        // Load data from AsyncStorage when the component mounts
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('allUsers');
            if (storedData) {
                // If data is found in AsyncStorage, parse and set it
                setAllUsers(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error loading data from AsyncStorage:', error);
        }
    };

    const getAllUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${REPORT_URL}/allUsers`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const userData = response.data;
            
            // Store the retrieved data in AsyncStorage
            await AsyncStorage.setItem('allUsers', JSON.stringify(userData));
            
            setAllUsers(userData); // Update state with the retrieved data
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text2: 'Server Error Please try again in Some time!'
            });
        } finally {
            setIsLoading(false);
        }
    };
    const getAllBookings = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${REPORT_URL}/allBookings`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            const bookingsData = response.data;
            
            // Store the retrieved data in AsyncStorage
            await AsyncStorage.setItem('allBookings', JSON.stringify(bookingsData));
            
            setAllBookings(bookingsData); // Update state with the retrieved data
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text2: 'Server Error Please try again in Some time!'
            });
        } finally {
            setIsLoading(false);
        }
    };
    const clearData = async () => {
        try {
            await AsyncStorage.removeItem('allUsers');
            setAllUsers(null); // Clear the data from state
            setAllBookings(null);
            console.log('Data cleared from AsyncStorage');
        } catch (error) {
            console.error('Error clearing data from AsyncStorage:', error);
        }
    };

    return (
        <ReportContext.Provider value={{ isLoading, getAllUsers, allUsers,clearData,getAllBookings,allBookings }}>
            {children}
        </ReportContext.Provider>
    );
};
