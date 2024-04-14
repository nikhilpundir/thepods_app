import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, List, Checkbox, RadioButton } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

const Book = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState('');
  const [roomType, setRoomType] = useState('');
  const [amenities, setAmenities] = useState([]);

  const handleCheckboxToggle = (amenity) => {
    const index = amenities.indexOf(amenity);
    if (index === -1) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter((item) => item !== amenity));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            // Toggle between check-in and check-out dates
            if (!checkInDate) {
              setCheckInDate(day.dateString);
            } else if (!checkOutDate) {
              setCheckOutDate(day.dateString);
            } else {
              setCheckInDate(day.dateString);
              setCheckOutDate('');
            }
          }}
          markedDates={{
            [checkInDate]: { startingDay: true, color: '#50cebb' },
            [checkOutDate]: { endingDay: true, color: '#50cebb' },
          }}
        />
      </View>
      <TextInput
        label="Number of Guests"
        value={numOfGuests}
        onChangeText={(text) => setNumOfGuests(text)}
        keyboardType="numeric"
      />
      <RadioButton.Group onValueChange={value => setRoomType(value)} value={roomType}>
        <List.Item title="Standard Room" onPress={() => setRoomType('standard')} />
        <List.Item title="Deluxe Room" onPress={() => setRoomType('deluxe')} />
        <List.Item title="Suite" onPress={() => setRoomType('suite')} />
      </RadioButton.Group>
      <View>
        <List.Subheader>Amenities</List.Subheader>
        <Checkbox.Item
          label="Free Wi-Fi"
          status={amenities.includes('Free Wi-Fi') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxToggle('Free Wi-Fi')}
        />
        <Checkbox.Item
          label="Breakfast Included"
          status={amenities.includes('Breakfast Included') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxToggle('Breakfast Included')}
        />
        <Checkbox.Item
          label="Gym Access"
          status={amenities.includes('Gym Access') ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxToggle('Gym Access')}
        />
      </View>
      <Button mode="contained" onPress={() => console.log('Booking submitted')}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
});

export default Book