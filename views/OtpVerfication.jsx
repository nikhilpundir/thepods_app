import { Image, SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useRef,useContext } from 'react'
import { otpImage } from "../assets/images"
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../assets/colors';
import { AuthContext } from '../context/AuthContext';

const OtpVerification = ({ navigation }) => {
    const {otpVerify,verify,resendOtp} = useContext(AuthContext)
    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    const formSubmit = (values) => {
        console.log(values);
        let otp='';
        Object.keys(values).forEach(key => {
            otp += values[key];
        });
        console.log(otp);
        otpVerify(otp)
        // verify()
        navigation.navigate('App');
    }
    const resendHandler=()=>{
        resendOtp();
    }

    const focusNextInput = (nextInputRef) => {
        if (nextInputRef && nextInputRef.current) {
            nextInputRef.current.focus();
        }
    };

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
                    initialValues={{ otp1: '', otp2: '', otp3: '', otp4: '' }}
                    validationSchema={Yup.object({
                        otp1: Yup.string().length(1, 'Must be 1 character').required('Required'),
                        otp2: Yup.string().length(1, 'Must be 1 character').required('Required'),
                        otp3: Yup.string().length(1, 'Must be 1 character').required('Required'),
                        otp4: Yup.string().length(1, 'Must be 1 character').required('Required'),
                    })}
                    onSubmit={formSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    ref={otp1Ref}
                                    onChangeText={(text) => {
                                        handleChange('otp1')(text);
                                        if (text.length === 1) focusNextInput(otp2Ref);
                                    }}
                                    onBlur={handleBlur('otp1')}
                                    value={values.otp1}
                                    style={styles.inputBox}
                                    keyboardType="numeric"
                                    maxLength={1}
                                />
                                <TextInput
                                    ref={otp2Ref}
                                    onChangeText={(text) => {
                                        handleChange('otp2')(text);
                                        if (text.length === 1) focusNextInput(otp3Ref);
                                        else if (text.length === 0) focusNextInput(otp1Ref);
                                    }}
                                    onBlur={handleBlur('otp2')}
                                    value={values.otp2}
                                    style={styles.inputBox}
                                    keyboardType="numeric"
                                    maxLength={1}
                                />
                                <TextInput
                                    ref={otp3Ref}
                                    onChangeText={(text) => {
                                        handleChange('otp3')(text);
                                        if (text.length === 1) focusNextInput(otp4Ref);
                                        else if (text.length === 0) focusNextInput(otp2Ref);
                                    }}
                                    onBlur={handleBlur('otp3')}
                                    value={values.otp3}
                                    style={styles.inputBox}
                                    keyboardType="numeric"
                                    maxLength={1}
                                />
                                <TextInput
                                    ref={otp4Ref}
                                    onChangeText={(text) => {
                                        handleChange('otp4')(text);
                                        if (text.length === 0) focusNextInput(otp3Ref);
                                    }}
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
                <Pressable onPress={resendHandler}>
                    <Text style={{padding:20,fontSize:20}}>resend</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification;

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
      width:290
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
        marginVertical:20
        
    },
    inputBox:{ 
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 15,
      marginBottom:10,
      marginHorizontal:10,
      fontSize:25,
      textAlign:"center",
      overflow:"hidden",
      maxWidth:45
      
  
    },errorMsg:{
      color:"red",
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