import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { bookingsBg } from '../assets/images';
import { BookingsListItem } from '../components';
import { BookingContext } from '../context/BookingContext';
import { AuthContext } from '../context/AuthContext';

const Bookings = () => {
  const { getBooking, isLoading, bookings } = useContext(BookingContext);
  const { user } = useContext(AuthContext);

  const onRefresh = () => {
    getBooking({ userId: user?._id });
  };

  useEffect(() => {
    getBooking({ userId: user?._id });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.heroContainer}>
        <Text style={styles.heroHeading}>Bookings</Text>
        <Image source={bookingsBg} style={styles.heroBg} />
      </View>
      <View style={styles.bookingContainer}>
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <View>
              <BookingsListItem
                key={item._id}
                bookingId={item._id}
                numberOfClassicPods={item.numberOfClassicPods}
                numberOfWomenPods={item.numberOfWomenPods}
                numberOfPremiumPods={item.numberOfPremiumPods}
                bookingDate={item.bookingDate}
                checkIn={item.checkIn}
                checkOut={item.checkOut}
              />
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
  heroContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heroBg: {
    height: 155,
    width: 240,
  },
  heroHeading: {
    fontSize: 30,
    marginTop: 50,
  },
  bookingContainer: {
    flex: 1, // Allow the container to occupy available space
    padding: 20,
  },
});
