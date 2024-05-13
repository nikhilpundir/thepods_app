import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Text, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from "react-native-toast-message";
import colors from '../assets/colors';
import { mainLogojpg } from '../assets/images';
import { AuthContext } from '../context/AuthContext';
import { BookingContext } from '../context/BookingContext';
import { PaymentContext } from '../context/PaymentContext';

const Book = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { getPaymentKey, checkout, paymentVerification, isLoading } = useContext(PaymentContext);
  const { bookingConfirm } = useContext(BookingContext);

  const [calCheckInDate, setCalCheckInDate] = useState('');
  const [calCheckOutDate, setCalCheckOutDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfClassicPods, setNumberOfClassicPods] = useState(0);
  const [numberOfPremiumPods, setNumberOfPremiumPods] = useState(0);
  const [numberOfWomenPods, setNumberOfWomenPods] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    setCalCheckInDate('');
    setCalCheckOutDate('');
    setTotalAmount(0);
    setSubmitDisabled(true);
  }, []);

  useEffect(() => {
    if ((calCheckInDate && calCheckOutDate) && (numberOfClassicPods !== 0 || numberOfPremiumPods !== 0 || numberOfWomenPods !== 0)) {
      calculateAmount();
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
      setTotalAmount(0);
    }
  }, [calCheckInDate, calCheckOutDate, numberOfClassicPods, numberOfPremiumPods, numberOfWomenPods]);

  const handleDayPress = useCallback((day) => {
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
  }, [calCheckInDate, calCheckOutDate]);

  const formSubmitHandler = useCallback(async () => {
    try {
      const keyResponse = await getPaymentKey();
      const key = keyResponse.key;
      const orderResponse = await checkout({ checkIn: new Date(calCheckInDate), checkOut: new Date(calCheckOutDate), amount: totalAmount });
      const order = orderResponse.order;
      var options = {
        description: 'Booking',
        image: mainLogojpg,
        currency: 'INR',
        key,
        amount: order.amount,
        name: 'ThePods',
        order_id: order.id,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: '#53a20e' }
      };

      RazorpayCheckout.open(options).then((data) => {
        paymentVerification({ razorpay_payment_id: data.razorpay_payment_id, razorpay_order_id: data.razorpay_order_id, razorpay_signature: data.razorpay_signature });
        bookingConfirm({
          userId: user._id,
          paymentId: data.razorpay_payment_id,
          checkIn: new Date(calCheckInDate),
          checkOut: new Date(calCheckOutDate),
          numberOfClassicPods,
          numberOfWomenPods,
          numberOfPremiumPods,
        });
        navigation.navigate('Bookings');
      }).catch((error) => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error,
        text2: error
      });
    }
  }, [getPaymentKey, checkout, paymentVerification, bookingConfirm, navigation, user, calCheckInDate, calCheckOutDate, totalAmount, numberOfClassicPods, numberOfPremiumPods, numberOfWomenPods]);

  const calculateAmount = () => {
    const classicPodsPrice = numberOfClassicPods * 200;
    const premiumPodsPrice = numberOfPremiumPods * 400;
    const womenPodsPrice = numberOfWomenPods * 200;
    const calculatedAmount = (classicPodsPrice + premiumPodsPrice + womenPodsPrice) * getNumberOfDays();
    setTotalAmount(isNaN(calculatedAmount) ? 0 : calculatedAmount);
  };

  const getMiddleDates = useCallback((startDate, endDate) => {
    const middleDates = {};
    let currentDate = new Date(startDate);
    while (currentDate < new Date(endDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString !== startDate && dateString !== endDate) {
        middleDates[dateString] = { color: '#FFE2E3', textColor: 'red' };
      }
    }
    return middleDates;
  }, []);

  const getNumberOfDays = useCallback(() => {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((new Date(calCheckInDate) - new Date(calCheckOutDate)) / oneDay) + 1);
    return diffDays;
  }, [calCheckInDate, calCheckOutDate]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
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

          <View style={styles.formContainer}>
            <InputSection
              label="Classic Pods"
              value={numberOfClassicPods.toString()}
              onIncrement={() => setNumberOfClassicPods((prev) => Math.min(10, prev + 1))}
              onDecrement={() => setNumberOfClassicPods((prev) => Math.max(0, prev - 1))}
            />
            <InputSection
              label="Premium Pods"
              value={numberOfPremiumPods.toString()}
              onIncrement={() => setNumberOfPremiumPods((prev) => Math.min(10, prev + 1))}
              onDecrement={() => setNumberOfPremiumPods((prev) => Math.max(0, prev - 1))}
            />
            <InputSection
              label="Women Pods"
              value={numberOfWomenPods.toString()}
              onIncrement={() => setNumberOfWomenPods((prev) => Math.min(10, prev + 1))}
              onDecrement={() => setNumberOfWomenPods((prev) => Math.max(0, prev - 1))}
            />
            <Pressable onPress={formSubmitHandler} style={[styles.submitButton, submitDisabled && { opacity: 0.5, backgroundColor: '#000' }]} disabled={submitDisabled}>
              <Text style={styles.submitButtonText}>Pay {totalAmount}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InputSection = ({ label, value, onIncrement, onDecrement }) => (
  <View>
    <View style={styles.inputLabel}>
      <Text style={styles.inputLabelText}>
        <Icon name="circle-chevron-right" size={20} color="black" /> {label}
      </Text>
    </View>
    <View style={styles.inputContainer}>
      <Pressable style={styles.buttonContainer} onPress={onDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <TextInput
        value={value}
        style={styles.inputBox}
        keyboardType="numeric"
        editable={false}
      />
      <Pressable style={styles.buttonContainer} onPress={onIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  formContainer: {
    alignSelf: "flex-start",
    width: "100%",
  },
  inputContainer: {
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
    color:"black"
  },
  buttonContainer: {

  },
  buttonText: {
    fontSize: 30,
    paddingHorizontal: 30,
    color: colors.black,
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

  },
  inputLabelText: {
    fontSize: 17
  },
  dates: {
    paddingVertical: 5,
    fontSize: 18,
    color: "black"
  }

});

export default Book;
