import { Text, View,Image, ImageBackground, Button, Pressable, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { mainLogo ,heroImage,classicPod,premiumPod,womenPod} from '../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {  Footer, HeaderTop, PodType } from '../components';
import colors from '../assets/colors'

const Home = () => {
  const pods=[
    {
      type:"Classic",
      image:classicPod,
      text:"Our classic pods are the most economical and value for money stay."
    },
    {
      type:"Premium",
      image:premiumPod,
      text:"Feel the premiumness and enjoy the ambiance inside our premium pods."
    },
    {
      type:"Womens",
      image:womenPod,
      text:"The first-ever ladies-only pod for the safety and security of women."
    }
  ]
  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heroHeading}>Welcome To ThePods,</Text>
        <View style={styles.innerContainer}>
        <Text style={styles.innerHeading}><Text style={styles.luxury}>Luxury</Text> at Cheap Price</Text>
        
        <ImageBackground source={heroImage} resizeMode="cover"  style={styles.bgImage} >
          <Text style={styles.text}>Most affordable stay in the world with all the facilities that a hotel can provide you at a cheaper price.</Text>
          <Pressable>
          <TouchableOpacity>
          <Text style={styles.heroButton}>Book Now</Text>
          </TouchableOpacity>
          </Pressable>
        </ImageBackground>
        </View>
      </View>
      
      <View style={styles.container}>
        {pods.map((item)=>(
          <PodType 
          key={item.type}
          Image={item.image} 
          podType={item.type}
          text={item.text}/>
        ))}
      
      </View>
      
      </ScrollView>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container:{
      backgroundColor:colors.white,
  },
  heroHeading:{
      marginHorizontal:20,
      fontSize:20,
      color:colors.black
  },
  innerContainer:{
     margin:20,
     backgroundColor:"white",
     borderRadius:30,
     paddingBottom:50,
     shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 1.5,  
  elevation: 2,
     
  },
  bgImage:{
      height:210,
      marginHorizontal:20,
      display:"flex",
      gap:10
  },
  
  innerHeading:{
      color:colors.black,
      fontSize:30,
      padding:20
  },
  luxury:{
      color:colors.yellow,
  },
  text:{
      color:colors.white,
      fontSize:20,
      // padding:10,
      // width:"80%",
      paddingHorizontal:20,
      paddingTop:30
  },
  heroButton:{
      backgroundColor:colors.red,
      padding:15,
      borderRadius:50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 5,
      color:colors.white,
      alignSelf:"flex-end",
      marginRight:20,
      
  },
  icon:{
      alignSelf:"center",
      
  },
  
})