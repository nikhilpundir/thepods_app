import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BookingContext } from '../context/BookingContext';
import Toast from "react-native-toast-message";
const BookingDetails = ({ route, navigation }) => {
    const { _id, numberOfClassicPods, numberOfPremiumPods, numberOfWomenPods, bookingDate, checkIn, checkOut } = route.params;
    
    const {bookingCancellation,isLoading}=useContext(BookingContext);

    const formatDate = (date) => new Date(date).toLocaleDateString();

    const [isConfirmingCancellation, setIsConfirmingCancellation] = useState(false);

    const handleCancelBooking = () => {
        setIsConfirmingCancellation(true);
    };

    const handleCancelConfirmation = async () => {
        // Implement cancellation logic here
        const response= await bookingCancellation({bookingId:_id})
        // Display refund message
        setTimeout(() => {
        // Set loading to false after some time (simulating data loading)
        navigation.goBack()
          }, 2000);
          
        
        
    };

    const handleCancelConfirmationCancel = () => {
        setIsConfirmingCancellation(false);
    };
    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        );
      }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backIcon}>
                        <Icon name="angle-left" size={23} color="black" />
                    </Pressable>
                    <View style={styles.qrContainer}>
                        {/* Generate QR code based on booking ID */}
                        <QRCode value={_id} size={300} />
                    </View>
                    <View style={styles.detailsContainer}>
                        {/* Display booking details */}
                        <Text style={styles.heading}>Booking Details</Text>
                        <Text style={styles.detail}>Booking ID: {_id}</Text>
                        <Text style={styles.detail}>Classic Pods: {numberOfClassicPods}</Text>
                        <Text style={styles.detail}>Women Pods: {numberOfWomenPods}</Text>
                        <Text style={styles.detail}>Premium Pods: {numberOfPremiumPods}</Text>
                        <Text style={styles.detail}>Booking Date: {bookingDate}</Text>
                        <Text style={styles.detail}>Check-in: {formatDate(checkIn)}</Text>
                        <Text style={styles.detail}>Check-out: {formatDate(checkOut)}</Text>
                    </View>
                    <Pressable onPress={handleCancelBooking} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                    </Pressable>
                </View>
                {isConfirmingCancellation && (
                    <View style={styles.confirmationPopup}>
                        <Text style={styles.confirmationText}>Are you sure you want to cancel this booking?</Text>
                        <View style={styles.confirmationButtons}>
                            <Pressable onPress={handleCancelConfirmation} style={[styles.confirmationButton, styles.confirmationButtonConfirm]}>
                                <Text style={styles.confirmationButtonText}>Yes</Text>
                            </Pressable>
                            <Pressable onPress={handleCancelConfirmationCancel} style={[styles.confirmationButton, styles.confirmationButtonCancel]}>
                                <Text style={styles.confirmationButtonText}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backIcon: {
        padding: 15,
        width: 60,
    },
    qrContainer: {
        marginBottom: 20,
        alignSelf: "center"
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "black"
    },
    detail: {
        fontSize: 20,
        marginBottom: 5,
        color: "black"
    },
    cancelButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    confirmationPopup: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
    confirmationText: {
        fontSize: 16,
        marginBottom: 10,
    },
    confirmationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmationButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '40%',
        alignItems: 'center',
    },
    confirmationButtonConfirm: {
        backgroundColor: 'green',
    },
    confirmationButtonCancel: {
        backgroundColor: 'red',
    },
    confirmationButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default BookingDetails;
