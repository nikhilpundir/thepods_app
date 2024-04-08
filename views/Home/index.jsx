import { Text, View,Image, ImageBackground, Button, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import { mainLogo ,heroImage,classicPod,premiumPod,womenPod} from '../../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {  Footer, HeaderTop, PodType } from '../../components';
const Index = () => {
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

export default Index

