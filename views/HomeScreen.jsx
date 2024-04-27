import { Text, View,Image, ImageBackground, Button, Pressable, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import { mainLogo ,heroImage,classicPod,premiumPod,womenPod,era2, herobgImg} from '../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome6';
import IconFeather from 'react-native-vector-icons/Feather';
import {  PodListItem } from '../components';
import colors from '../assets/colors'
import { AuthContext } from '../context/AuthContext';



const HomeScreen = ({navigation}) => {
  const {user}=useContext(AuthContext);
  const HandleProfileClick=()=>{
      navigation.navigate("ProfileMain")
  }
  const HandleBookNow=()=>{
    navigation.navigate("Book")
}
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
    <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.HeaderSection}>
          <Text style={styles.HeaderText}>ThePods</Text>
          <Pressable onPress={HandleProfileClick} style={styles.HeaderProfileIcon}>
              <Icon name="user-circle" size={30} color="black" />
              <Text>{user?.name || 'user'}</Text>
          </Pressable>
              
        </View>

        <ImageBackground source={herobgImg} resizeMode="cover" style={styles.HeroSection} >
          
        <Text style={styles.HeroHeading}>Luxury {'\n'} at Cheap Price</Text>
          
          <Pressable onPress={HandleBookNow}>
          <Text style={styles.heroButton}>Book Now</Text>    
          </Pressable>

        </ImageBackground>
        
        <View style={styles.AboutSection}>
        <Text style={styles.aboutText}>Most affordable stay in the world with all the facilities that a hotel can provide you at a cheaper price.</Text>
          <Image source={mainLogo}  style={styles.AboutSectionImage}>
          </Image>
        </View>
      
        {pods.map((item)=>(
          <PodListItem
          key={item.type}
          Image={item.image} 
          podType={item.type}
          text={item.text}/>
        ))}
      
      
      </ScrollView>
      </SafeAreaView>
    
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  HeaderSection:{
      height:60,
      // backgroundColor:"red"
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      // backgroundColor:"red"
      shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
      
  },
  HeaderText:{
    fontSize:25,
    marginLeft:20,
    fontWeight:"bold",
    color:"black"
  },
  HeaderProfileIcon:{
    marginRight:20,
    
  },
  HeroSection:{
    display:'flex',
    alignItems:"center",
    height:240
  },
  HeroHeading:{
      textAlign:'center',
      fontSize:40,
      color:colors.white,
      marginVertical:20,
      fontWeight:"bold"     
  },
  heroButton:{
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 50,
    color: colors.white,
    marginRight: 20,
    fontSize:15
  },
  AboutSection:{
    margin:20,
    overflow:"hidden",
    display:'flex',
    gap:-140
  },
  aboutText:{
    fontSize:30,
    color:colors.black,
    
  },
  AboutSectionImage:{
      // top:-140,
      height:200,
      width:200,
      alignSelf:'flex-end',
      zIndex:-1,
      opacity:0.18
  },
  
})