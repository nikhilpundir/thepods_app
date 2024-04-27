import { Image, SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native'
import React,{useContext} from 'react'
import {signupImg} from "../assets/images"
import { Formik} from 'formik';
import * as Yup from 'yup';
import colors from '../assets/colors';
import { AuthContext } from '../context/AuthContext';
const Signup = ({ navigation }) => {
  const {signup}=useContext(AuthContext);

  const formSubmit=(values)=>{
    signup(values);
    // navigation.navigate('OtpVerification')
  }
  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image source={signupImg} style={styles.Image}></Image>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Sign up</Text>
      </View>

      <Formik
       initialValues={{ name:'',email: '', password: '' }}
       validationSchema={Yup.object({
        name: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
         email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
         password: Yup
            .string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
       })}
       onSubmit={formSubmit}
       
     >
     {({ handleChange, handleBlur, handleSubmit, values, errors,touched }) => (
       <View style={styles.formContainer}>
        <TextInput
           onChangeText={handleChange('name')}
           onBlur={handleBlur('name')}
           value={values.name}
           style={styles.inputBox}
           placeholder='Your name'
         />
         {errors.name && touched.name && <Text style={styles.errorMsg}>{errors.name}</Text>}
         <TextInput
           onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
           style={styles.inputBox}
           placeholder='Your Email'
         />
          {errors.email && touched.email && <Text style={styles.errorMsg}>{errors.email}</Text>}
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry={true}
            style={styles.inputBox}
            placeholder='Password'
          />
          {errors.password && touched.password && <Text style={styles.errorMsg}>{errors.password}</Text>}
          

         <Pressable onPress={handleSubmit} style={styles.submitButton} >
         <Text style={styles.submitButtonText}>Submit</Text>
         </Pressable>
       </View>
     )}
   </Formik>
    </View>
    <View style={styles.signupTextBox}>
      <Pressable onPress={() => navigation.navigate('Login')}>
      <Text style={styles.signupText}>Already have an account ? <Text style={styles.signupTextblue}>Login</Text></Text>
      </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup

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
    height:160,
    width:220
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
  },
  inputBox:{
    
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom:10

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
  },
  signupTextBox:{
    paddingHorizontal:20,
    paddingTop:20
  },
  signupText:{
    fontSize:15
    
  },
  signupTextblue:{
    color:"#4D59FF",
    textDecorationLine:"underline"
  }
})