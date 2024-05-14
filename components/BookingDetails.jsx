import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome6';

const BookingDetails = ({ route, navigation }) => {

    const { _id, numberOfClassicPods, numberOfPremiumPods, numberOfWomenPods, bookingDate, checkIn, checkOut } = route.params;
    const HandleBack = () => {
        navigation.goBack()
    }
    const formatDate = (date) => new Date(date).toLocaleDateString();
    return (
        
        <View style={styles.container}>
            <Pressable onPress={HandleBack} style={styles.backIcon}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        padding: 15,
        width: 60,
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    qrContainer: {
        marginBottom: 20,
        alignSelf:"center"
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"black"
    },
    detail: {
        fontSize: 20,
        marginBottom: 5,
        color:"black"
    },
});


export default BookingDetails;
