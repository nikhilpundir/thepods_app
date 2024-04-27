// Import necessary components and libraries
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TextInput, Pressable, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome6';
// Define the Book component
const Book = ({navigation}) => {
  // Define state variables
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const formSubmitHandler = (values) => {
    console.log(values)
    console.log(checkInDate,checkOutDate)
    navigation.navigate('Book')
  }

  // Handle day press on the calendar
  const handleDayPress = (day) => {
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(day.dateString);
      setCheckOutDate('');
    } else if (checkInDate && !checkOutDate) {
      // Compare dates to ensure check-in date is smaller than check-out date
      if (new Date(day.dateString) < new Date(checkInDate)) {
        setCheckOutDate(checkInDate);
        setCheckInDate(day.dateString);
      } else {
        setCheckOutDate(day.dateString);
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
                [checkInDate]: { startingDay: true, color: '#FFE2E3', textColor: 'red' },
                [checkOutDate]: { endingDay: true, color: '#FFE2E3', textColor: 'red', },
                ...getMiddleDates(checkInDate, checkOutDate)
              }}
            />
          </View>

          <Formik
            initialValues={{ classicPods: '0', premiumPods: '0', womenPods: '0' }}
            validationSchema={Yup.object({
              classicPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
              premiumPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
              womenPods: Yup.number().min(0, 'Cannot be less than 0').max(10, 'Cannot be more than 10').required('Required'),
            })}
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
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('classicPods')((Math.min(10, parseInt(values.classicPods ? values.classicPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
                  <TextInput
                    onChangeText={handleChange('classicPods')}
                    onBlur={handleBlur('classicPods')}
                    value={values.classicPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />

                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('classicPods')(Math.max(0, parseInt(values.classicPods ? values.classicPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>

                </View>

                {errors.classicPods && touched.classicPods && <Text style={styles.errorMsg}>{errors.classicPods}</Text>}
                <View style={styles.inputLabel}>
                  <Text style={styles.inputLabelText}>
                  <Icon name="circle-chevron-right" size={20} color="black" /> Premium Pods
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('premiumPods')((Math.min(10, parseInt(values.premiumPods ? values.premiumPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
                  <TextInput
                    onChangeText={handleChange('premiumPods')}
                    onBlur={handleBlur('premiumPods')}
                    value={values.premiumPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('premiumPods')(Math.max(0, parseInt(values.premiumPods ? values.premiumPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>
                </View>

                {errors.premiumPods && touched.premiumPods && <Text style={styles.errorMsg}>{errors.premiumPods}</Text>}
                <View style={styles.inputLabel}>
                  <Text style={styles.inputLabelText}>
                  <Icon name="circle-chevron-right" size={20} color="black" /> Women Pods
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('womenPods')((Math.min(10, parseInt(values.womenPods ? values.womenPods : '0') + 1)).toString())}>
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
                  <TextInput
                    onChangeText={handleChange('womenPods')}
                    onBlur={handleBlur('womenPods')}
                    value={values.womenPods}
                    style={styles.inputBox}
                    // placeholder='0'
                    maxLength={2}
                    keyboardType="numeric"
                    max={10}
                  />
                  <Pressable style={styles.buttonContainer} onPress={() => handleChange('womenPods')(Math.max(0, parseInt(values.womenPods ? values.womenPods : '0') - 1).toString())}>
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>
                </View>
                {errors.womenPods && touched.womenPods && <Text style={styles.errorMsg}>{errors.womenPods}</Text>}

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
  inputLabel:{
    marginVertical:10,
    
  }, inputLabelText:{
    fontSize:17
  },

});

export default Book; // Export the Book component
