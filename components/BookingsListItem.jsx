import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookingsListItem = (props) => {
  
  const formatDate = (date) => new Date(date).toLocaleDateString();
  return (
    <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
    <Text style={styles.containerText}>Booking Id : {props.bookingId}</Text>
      <Text style={styles.containerText}>Booking Date : {formatDate(props.bookingDate)}</Text>
      <Text style={styles.containerText}>Check In : {formatDate(props.checkIn)}</Text>
      <Text style={styles.containerText}>Check Out : {formatDate(props.checkOut)}</Text>
      
      <Text style={styles.containerText}>Classic Pods : {props.numberOfClassicPods}</Text>
      <Text style={styles.containerText}>Womens Pods : {props.numberOfWomenPods}</Text>
      <Text style={styles.containerText}>Premium Pods : {props.numberOfPremiumPods}</Text>

      <Pressable style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>
          cancel
        </Text>
      </Pressable>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default BookingsListItem

const styles = StyleSheet.create({
  container:{
    padding:10,
    // borderWidth:1,
    marginVertical:10,
    display:"flex",
    backgroundColor:"white",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation:0.8,
    borderRadius:5
  },
  containerText:{
    color:"black",
    fontSize:20
  },
  cancelButton:{
    backgroundColor:"red",
    padding:10,
    width:150,
    alignSelf:"flex-end",
    borderRadius:5
    
  },
  cancelButtonText:{
    textAlign:"center",
    color:"white"
  }
})