import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export const AuthContext = createContext();
const BASE_URL = 'https://thepods-server.vercel.app';
const USERS_URL = `${BASE_URL}/api/users`;

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    const login = (body) => {
        setIsLoading(true);
        axios.post(`${USERS_URL}/auth`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                try {
                    AsyncStorage.setItem('user', JSON.stringify(response.data));
                    setUser(response.data);
                    
                } catch (error) {
                    console.log(`setItem error ${error}`)
                }

            })
            .catch(error => {
                console.log(error);
                let errorMessage = 'An error occurred during login. Please try again later.';

                if (error.response) {
                    // Server responded with a non-2xx status code
                    if (error.response.data && error.response.data.message) {
                        errorMessage = error.response.data.message; // Use server-provided error message if available
                    } else {
                        errorMessage = 'Failed to login. Please check your credentials and try again.'; // Default message for server errors
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    errorMessage = 'No response from the server. Please check your internet connection and try again later.';
                } else {
                    // Something happened in setting up the request that triggered an Error
                    errorMessage = 'Unexpected error occurred. Please try again later.';
                }
                Toast.show({
                    type: 'error',
                    text1: errorMessage,
                    text2: 'Please try again!'
                });
            }).finally(() => {
                setIsLoading(false);
            });
    }
    const logout = () => {
        setIsLoading(true)
        setUser(null);
        AsyncStorage.removeItem('user')
        setIsLoading(false);
    }
   const verify=()=>{
    setUser({...user,verified:true})
   }

    const signup = (body) => {
        setIsLoading(true);
        axios.post(`${USERS_URL}`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            try {
                AsyncStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            } catch (error) {
                console.log(`setItem error ${error}`);
            }
        }).catch(error => {
            console.log(error);
            let errorMessage = 'An error occurred during signup. Please try again later.';
    
            if (error.response) {
                // Server responded with a non-2xx status code
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message; // Use server-provided error message if available
                } else {
                    errorMessage = 'Failed to signup. Please check your information and try again.'; // Default message for server errors
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response from the server. Please check your internet connection and try again later.';
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage = 'Unexpected error occurred. Please try again later.';
            }
            Toast.show({
                type: 'error',
                text1: errorMessage,
                text2: 'Please try again!'
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const otpVerify = (body) => {
        setIsLoading(true);
        axios.post(`${USERS_URL}/otpverification`, {userId:user?._id,...body}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            try {
                AsyncStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
            } catch (error) {
                console.log(`setItem error ${error}`);
            }
        })
        .catch(error => {
            console.log(error);
            let errorMessage = 'An error occurred during OTP verification. Please try again later.';
    
            if (error.response) {
                // Server responded with a non-2xx status code
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message; // Use server-provided error message if available
                } else {
                    errorMessage = 'Failed to verify OTP. Please check your OTP and try again.'; // Default message for server errors
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response from the server. Please check your internet connection and try again later.';
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage = 'Unexpected error occurred during OTP verification. Please try again later.';
            }
            Toast.show({
                type: 'error',
                text1: errorMessage,
                text2: 'Please try again!'
            });
        
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const resetLocalUser=()=>{
        setIsLoading(true)
        setUser(null);
        AsyncStorage.removeItem('user')
        setIsLoading(false);
    }

    const resendOtp=(body)=>{
        setIsLoading(true);
        axios.post(`${USERS_URL}/resendotpverificationcode`, {userId:user?._id,email:user?.email}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
        .catch(error => {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: error,
                text2: 'Please try again!'
            });
        })
        .finally(() => {
            setIsLoading(false);
        });
    };


    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let user = await AsyncStorage.getItem('user');
            setUser(JSON.parse(user));
            setIsLoading(false)
        } catch (error) {
            console.log(`isLoggedIn error ${error}`)
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, user,signup,otpVerify,verify,resendOtp,resetLocalUser }}>
            {children}
        </AuthContext.Provider>
    )
}