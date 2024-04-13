import { Text, View,Image, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../assets/colors';

const PodListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.Left}>
        <Text style={styles.Heading}>{props.podType} Pod</Text>
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

export default PodListItem

const styles = StyleSheet.create({
  container:{
      backgroundColor:"white",
      margin:20,
      padding:10,
      
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      // alignItems:"center",
      overflow:"hidden",
      borderRadius:30,
      
  },
  Left:{
      width:"51%",
      color:colors.black
      
  },
  Heading:{
      fontSize:25,
      color:"black"
  },
  SubText:{
    color:"black",
    paddingHorizontal:5
  },
  Right:{
      // width:"60%",
  },
  Image:{
      width:140,
      height:140,
      borderRadius:30
      
  }
  
})