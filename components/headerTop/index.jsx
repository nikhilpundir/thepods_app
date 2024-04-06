import { Text, View,Image } from 'react-native'
import React from 'react'
import styles from './styles'
import { mainLogo } from '../../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

const index = () => {
  return (
    <View style={styles.container}>
        <Image
        style={styles.mainLogo}
        source={mainLogo}
      />
    {/* <Text>ThePods</Text> */}
      {/* <Icon2 name="login" size={35} color="black" style={styles.icon}/> */}
      <Icon name="user" size={35} color="black" style={styles.icon}/>
      
    </View>
  )
}

export default index

