
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { bookingsBg } from '../assets/images';
import { BookingDetails, BookingsListItem } from '../components';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Bookings = ({ navigation }) => {
  const { getBooking, isLoading, bookings } = useContext(BookingContext);
  const { user } = useContext(AuthContext);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [showCurrentBookings, setShowCurrentBookings] = useState(true);

  useEffect(()=>{
    getBooking({ userId: user?._id });
  },[])
  useEffect(() => {
    
    const currentDate = new Date();
    const previous = [];
    const current = [];
    bookings?.forEach(booking => {
      if(!booking.isCancelled){
        if (new Date(booking.checkOut) < currentDate) {
          previous.push(booking);
        } else {
          current.push(booking);
        }
      }
     
    });
    setPreviousBookings(previous);
    setCurrentBookings(current);
  }, [bookings]);

  const onRefresh = () => {
    getBooking({ userId: user?._id });
  };

  const handleBookingDetail = (booking) => {
    navigation.navigate("BookingDetails", booking);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroContainer}>
        <Text style={styles.heroHeading}>Bookings</Text>
        <Image source={bookingsBg} style={styles.heroBg} />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={[styles.button, showCurrentBookings ? styles.activeButton : null]} onPress={() => setShowCurrentBookings(true)}>
          <Text style={styles.buttonText}>Current Bookings</Text>
        </Pressable>
        <Pressable style={[styles.button, !showCurrentBookings ? styles.activeButton : null]} onPress={() => setShowCurrentBookings(false)}>
          <Text style={styles.buttonText}>Previous Bookings</Text>
        </Pressable>
      </View>
      <View style={styles.bookingContainer}>
        <Text style={{alignSelf:"center"}}>Swipe to refresh</Text>
        {showCurrentBookings ? (
          <FlatList
            data={currentBookings}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleBookingDetail(item)}>
                <BookingsListItem
                  numberOfClassicPods={item.numberOfClassicPods}
                  numberOfWomenPods={item.numberOfWomenPods}
                  numberOfPremiumPods={item.numberOfPremiumPods}
                  bookingDate={item.bookingDate}
                  checkIn={item.checkIn}
                  checkOut={item.checkOut}
                />
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
          />
        ) : (
          <FlatList
            data={previousBookings}
            renderItem={({ item }) => (
              
                <BookingsListItem
                  numberOfClassicPods={item.numberOfClassicPods}
                  numberOfWomenPods={item.numberOfWomenPods}
                  numberOfPremiumPods={item.numberOfPremiumPods}
                  bookingDate={item.bookingDate}
                  checkIn={item.checkIn}
                  checkOut={item.checkOut}
                />
              
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={['#9Bd35A', '#689F38']} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  heroContainer: {
    backgroundColor: '#DFE2FA',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heroBg: {
    height: 120,
    width: 180,
  },
  heroHeading: {
    fontSize: 40,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButton: {
    backgroundColor: '#DFE2FA',
  },
  bookingContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Bookings;
