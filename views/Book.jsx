// Import necessary components and libraries
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Text, Button, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RazorpayCheckout from 'react-native-razorpay';
import { PaymentContext } from '../context/PaymentContext';
import { mainLogojpg } from '../assets/images';
import { AuthContext } from '../context/AuthContext';
import { BookingContext } from '../context/BookingContext';
import Toast from "react-native-toast-message";
// Define the Book component
const Book = ({ navigation }) => {
  const {user}= useContext(AuthContext);
  // Define state variables
  const [calCheckInDate, setCalCheckInDate] = useState('');
  const [calCheckOutDate, setCalCheckOutDate] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const { getPaymentKey, checkout ,paymentVerification,isLoading} = useContext(PaymentContext);
  const {bookingConfirm} = useContext(BookingContext);


  useEffect(() => {
    setCheckInDate(new Date(calCheckInDate));
    setCheckOutDate(new Date(calCheckOutDate));
  }, [calCheckInDate, calCheckOutDate])

  const formSubmitHandler = async (values) => {
    const classicPodsPrice = parseInt(values.numberOfClassicPods) * 200;
    const premiumPodsPrice = parseInt(values.numberOfPremiumPods) * 200;
    const womenPodsPrice = parseInt(values.numberOfWomenPods) * 400;
    const calctotalAmount = (classicPodsPrice + premiumPodsPrice + womenPodsPrice) * getNumberOfDays();
    setTotalAmount(isNaN(calctotalAmount) ? 0 : calctotalAmount);
    // console.log({ ...values, checkIn: checkInDate, checkOut: checkOutDate, amount: totalAmount });
    
    try {
      const keyResponse= await getPaymentKey();
      const key= keyResponse.key;
      const orderResponse = await checkout({ ...values, checkIn: checkInDate, checkOut: checkOutDate, amount: totalAmount });
      const order = orderResponse.order;
      var options = {
        description: 'Booking',
        image: mainLogojpg,
        currency: 'INR',
        key,
        amount: order.amount,
        name: 'ThePods',
        order_id: order.id,//Replace this with an order_id created using Orders API.
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {color: '#53a20e'}
      }
  
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        paymentVerification({razorpay_payment_id:data.razorpay_payment_id,razorpay_order_id:data.razorpay_order_id,razorpay_signature:data.razorpay_signature})
        bookingConfirm({
          userId: user._id,
          paymentId: data.razorpay_payment_id,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          numberOfClassicPods: values.numberOfClassicPods,
          numberOfWomenPods: values.numberOfWomenPods,
          numberOfPremiumPods: values.numberOfPremiumPods,
        })
        
        // alert(`Success: ${data.razorpay_payment_id}`);
        
        navigation.navigate('Bookings')
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        text2: 'Please try again!'
    });
    }
   
    
    // var options = {
    //   description: 'Booking',
    //   image: mainLogojpg,
    //   currency: 'INR',
    //   key,
    //   amount: order.amount,
    //   name: 'ThePods',
    //   order_id: order.id,//Replace this with an order_id created using Orders API.
    //   prefill: {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   theme: {color: '#53a20e'}
    // }

    // RazorpayCheckout.open(options).then((data) => {
    //   // handle success
    //   paymentVerification({razorpay_payment_id:data.razorpay_payment_id,razorpay_order_id:data.razorpay_order_id,razorpay_signature:data.razorpay_signature})
    //   bookingConfirm({
    //     userId: user._id,
    //     paymentId: data.razorpay_payment_id,
    //     checkIn: checkInDate,
    //     checkOut: checkOutDate,
    //     numberOfClassicPods: values.numberOfClassicPods,
    //     numberOfWomenPods: values.numberOfWomenPods,
    //     numberOfPremiumPods: values.numberOfPremiumPods,
    //   })
      
    //   // alert(`Success: ${data.razorpay_payment_id}`);
      
    //   navigation.navigate('Bookings')
    // }).catch((error) => {
    //   // handle failure
    //   alert(`Error: ${error.code} | ${error.description}`);
    // });

  }

  // Handle day press on the calendar
  const handleDayPress = (day) => {
    if (!calCheckInDate || (calCheckInDate && calCheckOutDate)) {
      setCalCheckInDate(day.dateString);
      setCalCheckOutDate('');
    } else if (calCheckInDate && !calCheckOutDate) {
      if (new Date(day.dateString) < new Date(calCheckInDate)) {
        setCalCheckOutDate(calCheckInDate);
        setCalCheckInDate(day.dateString);
      } else {
        setCalCheckOutDate(day.dateString);
      }
    }
  };

  const getMiddleDates = (startDate, endDate) => {
    const middleDates = {};

    let currentDate = new Date(startDate);
    while (currentDate < new Date(endDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString !== startDate && dateString !== endDate) { // Exclude start and end dates
        middleDates[dateString] = { color: '#FFE2E3', textColor: 'red' };
      }
    }
    return middleDates;
  };
  const getNumberOfDays = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((checkInDate - checkOutDate) / oneDay) + 1);
    return diffDays;
  };

  if(isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
    )
  }
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputLabel}>
            <Text style={styles.inputLabelText}>
              <Icon name="calendar-plus" size={20} color="black" /> Select Check in and Check out Date
            </Text>
          </View>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markingType={'period'}
              minDate={new Date().toISOString()}
              collapsed={true}
              markedDates={{
                [calCheckInDate]: { startingDay: true, color: '#FFE2E3', textColor: 'red' },
                [calCheckOutDate]: { endingDay: true, color: '#FFE2E3', textColor: 'red', },
                ...getMiddleDates(calCheckInDate, calCheckOutDate)
              }}
            />
            <Text style={styles.dates}>CheckIn Date : {calCheckInDate}</Text>
            <Text style={styles.dates}>CheckOut Date : {calCheckOutDate}</Text>

          </View>

          <Formik
            initialValues={{ numberOfClassicPods: '0', numberOfPremiumPods: '0', numberOfWomenPods: '0' }}
            validationSchema={Yup.object({
              numberOfClassicPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
              numberOfPremiumPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
              numberOfWomenPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
            })}
            validateOnChange={false} // Disable auto-validation on change to improve performance
            validateOnBlur={true} // Validate on blur of input fields
            validateOnMount={true}
            onSubmit={formSubmitHandler}

          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>

                <View style={styles.inputLabel}>
                  <Text style={styles.inputLabelText}>
                    <Icon name="circle-chevron-right" size={20} color="black" /> Classic Pods
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfClassicPods')(Math.max(0, parseInt(values.numberOfClassicPods ? values.numberOfClassicPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>

                  <TextInput
                    onChangeText={handleChange('numberOfClassicPods')}
                    onBlur={handleBlur('numberOfClassicPods')}
                    value={values.numberOfClassicPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfClassicPods')((Math.min(10, parseInt(values.numberOfClassicPods ? values.numberOfClassicPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>


                </View>
                {errors.numberOfClassicPods && touched.numberOfClassicPods && <Text style={styles.errorMsg}>{errors.numberOfClassicPods}</Text>}

                <View style={styles.inputLabel}>
                  <Text style={styles.inputLabelText}>
                    <Icon name="circle-chevron-right" size={20} color="black" /> Premium Pods
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfPremiumPods')(Math.max(0, parseInt(values.numberOfPremiumPods ? values.numberOfPremiumPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>
                  <TextInput
                    onChangeText={handleChange('numberOfPremiumPods')}
                    onBlur={handleBlur('numberOfPremiumPods')}
                    value={values.numberOfPremiumPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfPremiumPods')((Math.min(10, parseInt(values.numberOfPremiumPods ? values.numberOfPremiumPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>

                </View>
                {errors.numberOfPremiumPods && touched.numberOfPremiumPods && <Text style={styles.errorMsg}>{errors.numberOfPremiumPods}</Text>}

                <View style={styles.inputLabel}>
                  <Text style={styles.inputLabelText}>
                    <Icon name="circle-chevron-right" size={20} color="black" /> Women Pods
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfWomenPods')(Math.max(0, parseInt(values.numberOfWomenPods ? values.numberOfWomenPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>
                  <TextInput
                    onChangeText={handleChange('numberOfWomenPods')}
                    onBlur={handleBlur('numberOfWomenPods')}
                    value={values.numberOfWomenPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('numberOfWomenPods')((Math.min(10, parseInt(values.numberOfWomenPods ? values.numberOfWomenPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>

                </View>
                {errors.numberOfWomenPods && touched.numberOfWomenPods && <Text style={styles.errorMsg}>{errors.numberOfWomenPods}</Text>}

                

                <Pressable onPress={handleSubmit} style={styles.submitButton} >
                  <Text style={styles.submitButtonText}>Pay</Text>
                </Pressable>

              </View>
            )}
          </Formik>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  }, formContainer: {
    alignSelf: "flex-start",
    width: "100%",
  }, inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderColor: '#ccc',
    borderBottomWidth: 1
  },
  inputBox: {
    width: "50%",
    textAlign: "center",
    fontSize: 20,
  },
  buttonContainer: {

  },
  buttonText: {
    fontSize: 30,
    paddingHorizontal: 30,
    color: colors.black,
  },
  errorMsg: {
    color: "red",
    marginTop: -5,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: colors.black,
    color: colors.white,
    padding: 15,
    borderRadius: 5
  },
  submitButtonText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 15
  },
  inputLabel: {
    marginVertical: 10,

  }, inputLabelText: {
    fontSize: 17
  },
  dates: {
    paddingVertical: 5,
    fontSize: 18,
    color: "black"
  }

});

export default Book; // Export the Book component
