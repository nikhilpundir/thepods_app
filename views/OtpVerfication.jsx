import { Image, SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React from 'react'
import {otpImage} from "../assets/images"
import { Formik} from 'formik';
import * as Yup from 'yup';
import colors from '../assets/colors';
const OtpVerfication = ({navigation}) => {
    const formSubmit=(values)=>{
        console.log(values)
        navigation.navigate('App')
      }
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image source={otpImage} style={styles.Image}></Image>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Enter OTP</Text>
      </View>
      <Formik
       initialValues={{ otp1: '',otp2: '',otp3: '',otp4: '' }}
       validationSchema={Yup.object({
        otp1: Yup.string().length(1, 'Must be 1 character').required('Required'),
        otp2: Yup.string().length(1, 'Must be 1 character').required('Required'),
        otp3: Yup.string().length(1, 'Must be 1 character').required('Required'),
        otp4: Yup.string().length(1, 'Must be 1 character').required('Required'),
      })}
       onSubmit={formSubmit}
      
     >
     {({ handleChange, handleBlur, handleSubmit, values, errors,touched }) => (
       <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
            <TextInput
            onChangeText={handleChange('otp1')}
            onBlur={handleBlur('otp1')}
            value={values.otp1}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            />
            <TextInput
            onChangeText={handleChange('otp2')}
            onBlur={handleBlur('otp2')}
            value={values.otp2}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            />
            <TextInput
            onChangeText={handleChange('otp3')}
            onBlur={handleBlur('otp3')}
            value={values.otp3}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            />
            <TextInput
            onChangeText={handleChange('otp4')}
            onBlur={handleBlur('otp4')}
            value={values.otp4}
            style={styles.inputBox}
            keyboardType="numeric"
            maxLength={1}
            />
         </View>
          {errors.otp1 && touched.otp1 && <Text style={styles.errorMsg}>{errors.otp1}</Text>}
         <Pressable onPress={handleSubmit} style={styles.submitButton} >
         <Text style={styles.submitButtonText}>Submit</Text>
         </Pressable>
       </View>
     )}
   </Formik>
    </View>
    </SafeAreaView>
  )
}

export default OtpVerfication

const styles = StyleSheet.create({
    container:{
      display:'flex',
      alignItems:"center",
      justifyContent:"center"
    },
    ImageContainer:{
      padding:10,
      marginTop:20
    },
    Image:{
      height:200,
      width:250
    },headingContainer:{
        padding:10,
        alignSelf:'flex-start'
    },headingText:{
        fontSize:27,
        fontWeight:'bold',
        paddingHorizontal:10
    },formContainer:{
      alignSelf:"flex-start",
      width:"100%",
      paddingHorizontal:20
    },inputContainer:{
        display:'flex',
        flexDirection:"row",
        alignSelf:"center",
        
    },
    inputBox:{ 
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 15,
      marginBottom:10,
      marginHorizontal:5,
      fontSize:25,
      textAlign:"center",
      overflow:"hidden",
      maxWidth:45
      
  
    },errorMsg:{
      color:"red",
      marginTop:-5,
      marginBottom:10
    },
    submitButton:{
      backgroundColor:colors.black,
      color:colors.white,
      padding:15,
      borderRadius:5
    },
    submitButtonText:{
      textAlign:"center",
      color:colors.white,
      fontSize:15
    }
    
  })