import { Pressable, StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'

const ProfileListItem = (props,navigation) => {
  return (
    <Pressable onPress={props.itemHandler}>
    <View style={styles.container}>
      <Icon name={props.iconName} size={23} color="black" />
      <Text>{props.itemName}</Text>
    </View>
    </Pressable>
  )
}

export default ProfileListItem

const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"row",
    padding:10,
    gap:10,
    borderWidth:0.2,
    borderBottomWidth:0
  }
})