import { Text, View,Image } from 'react-native'
import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../assets/colors';

const index = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.Left}>
        <Text style={styles.Heading}>{props.podType}{"\n"}Pod</Text>
        <Text style={styles.SubText}>{props.text}</Text>
      </View>
    <View style={styles.Right}>
    <Image
        style={styles.Image}
        source={props.Image}
      />
    </View>
    </View>
  )
}

export default index

