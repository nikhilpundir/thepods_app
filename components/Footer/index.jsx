import { Text, View } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import colors from '../../assets/colors.js'

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconLeft}>
         <Icon name="home" size={35} color={colors.black} />
         <Text>Home</Text>
      </View>
      
      <View style={styles.iconCenter}>
         <Icon name="calendar" size={35} color={colors.white} />
         <Text style={styles.iconCenterText}>Book</Text>
      </View>
      <View style={styles.iconRight}>
         <Icon1 name="chat" size={35} color={colors.black} />
         <Text>Help ?</Text>
      </View>
    </View>
  )
}

export default index