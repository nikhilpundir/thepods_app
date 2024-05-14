import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
const BookingsListItem = (props) => {

  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.container}>
          {/* <Text style={styles.containerText}><Icon name="checkmark-circle-sharp" size={20} color="black" /> Booking Id : {props.bookingId}</Text> */}
          <Text style={styles.containerText}><Icon name="calendar-clear" size={20} color="black" /> Booking Date : {formatDate(props.bookingDate)}</Text>
          <Text style={styles.containerText}><Icon name="calendar" size={20} color="black" /> Check In : {formatDate(props.checkIn)}</Text>
          <Text style={styles.containerText}><Icon name="calendar" size={20} color="black" /> Check Out : {formatDate(props.checkOut)}</Text>

          <Text style={styles.containerText}><Icon name="caret-forward-outline" size={20} color="black" /> Classic Pods : {props.numberOfClassicPods}</Text>
          <Text style={styles.containerText}><Icon name="caret-forward-outline" size={20} color="black" /> Womens Pods : {props.numberOfWomenPods}</Text>
          <Text style={styles.containerText}><Icon name="caret-forward-outline" size={20} color="black" /> Premium Pods : {props.numberOfPremiumPods}</Text>

          

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookingsListItem

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // borderWidth:1,
    marginVertical: 10,
    display: "flex",
    backgroundColor: "#FEFDE7",
    shadowColor: '#171717',
    elevation: 1,
    borderRadius: 20
  },
  containerText: {
    color: "black",
    fontSize: 20
  },
  
})