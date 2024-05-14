import { Pressable, StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'

const ProfileListItem = (props,navigation) => {
  return (
    <Pressable onPress={props.itemHandler}>
    <View style={styles.container}>
      <Icon name={props.iconName} size={23} color="black" />
      <Text style={styles.buttonText}>{props.itemName}</Text>
    </View>
    </Pressable>
  )
}

export default ProfileListItem

const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    padding:20,
    margin:2,
    gap:10,
    elevation: 1,
    shadowColor: '#171717',
    
    
  },
  buttonText:{
    color:"black",
    fontSize:20,
    
  }
})