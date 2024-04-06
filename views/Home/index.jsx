import { Text, View,Image, ImageBackground, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { mainLogo ,heroImage} from '../../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {  Footer, HeaderTop } from '../../components';
const index = () => {
  return (
    <>
      <HeaderTop />

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

      
      <Footer />
            </>
  )
}

export default index

