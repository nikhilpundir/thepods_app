import { Text, View,Image, ImageBackground, Button, Pressable } from 'react-native'
import React from 'react'
import styles from './styles'
import { mainLogo ,heroImage} from '../../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import { HeaderTop } from '../../components';
const index = () => {
  return (
    <>
      <HeaderTop />

      <View style={styles.container}>
        <Text style={styles.heroHeading}>Welcome To ThePods,</Text>
        <View style={styles.innerContainer}>
        <Text style={styles.innerHeading}>Luxury at Cheap Price</Text>
        <ImageBackground source={heroImage} resizeMode="contain"  style={styles.bgImage} >
          <Text style={styles.text}>Most affordable stay in the world with all the facilities that a hotel can provide you at a cheaper price.</Text>
          <Pressable>
          <Text>I'm pressable!</Text>
          </Pressable>
        </ImageBackground>

        </View>
      
      </View>
      
    </>
  )
}

export default index

