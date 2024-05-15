import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { bookingsBg } from '../assets/images';
import { BookingDetails, BookingsListItem } from '../components';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome6';
const Bookings = ({navigation}) => {
  const { getBooking, isLoading, bookings } = useContext(BookingContext);
  const { user } = useContext(AuthContext);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    // Filter bookings where isCancelled is false whenever the bookings array changes
    const filtered = bookings?.filter(booking => {
      // Filter out cancelled bookings and old bookings
      return !booking.isCancelled && new Date(booking.checkOut) > new Date();
    });
    setFilteredBookings(filtered);
  }, [bookings]);

  const onRefresh = () => {
    getBooking({ userId: user?._id });
  };
 
const handleBookingDetail=(booking)=>{
  navigation.navigate("BookingDetails",booking)
}
  useEffect(() => {
    getBooking({ userId: user?._id });
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.heroContainer}>
        <Text style={styles.heroHeading}>Bookings</Text>
        <Image source={bookingsBg} style={styles.heroBg} />
      </View>
      <View style={styles.bookingContainer}>
        <FlatList
          data={filteredBookings?.length > 0 ? filteredBookings : bookings}
          renderItem={({ item }) => (
            <View>
              <Pressable onPress={() => handleBookingDetail(item)}>
              <BookingsListItem
                key={item._id}
                // bookingId={item._id}
                numberOfClassicPods={item.numberOfClassicPods}
                numberOfWomenPods={item.numberOfWomenPods}
                numberOfPremiumPods={item.numberOfPremiumPods}
                bookingDate={item.bookingDate}
                checkIn={item.checkIn}
                checkOut={item.checkOut}
              />
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  backIcon: {
    padding: 15,
    width: 60,
},
  container:{
     backgroundColor: '#ffffff',
     flex:1
  },
  heroContainer: {
    backgroundColor: '#DFE2FA',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:"center"
  },
  heroBg: {
    height: 155,
    width: 240,
  },
  heroHeading: {
    fontSize: 50,
    color:"black",
    // marginTop: 50,
    
  },
  bookingContainer: {
    flex: 1, // Allow the container to occupy available space
    padding: 20,
  },
});
