import { ImageBackground, Image, StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView } from 'react-native'
import React,{useContext} from 'react'
import { ProfileListItem } from '../components';
import {profileBg,NikhilCTO2, userImg} from '../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AuthContext } from '../context/AuthContext';


const ProfileMain = ({navigation}) => {
  const {logout,user}= useContext(AuthContext);
  const handleLogout=()=>{
    logout();
    
  }
  const HandleBack=()=>{
    navigation.goBack()
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      
      <ImageBackground source={profileBg} resizeMode="cover" style={styles.headerBgContainer} >
        <Pressable onPress={HandleBack} style={styles.backIcon}>
      <Icon name="angle-left" size={23} color="black" />
      </Pressable>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
            <Text style={styles.headerLeftTextName}>{user.name}</Text>
            <Text style={styles.headerLeftTextEmail}>{user.email}</Text>
        </View>
      <View style={styles.headerRight}>
          <Image source={userImg} style={styles.ProfileImage} />
        </View>
      
      </View>
  
        </ImageBackground>
      
      <View style={styles.main}>
      <ProfileListItem itemName="Settings" iconName="setting"/>
        <ProfileListItem itemName="Call Us" iconName="phone" />
        <ProfileListItem itemName="Email Us" iconName="mail" />
        <ProfileListItem itemName="Help" iconName="questioncircleo" />
        <ProfileListItem itemName ="Privacy Policy" iconName="infocirlceo" />
        <ProfileListItem itemName ="logout" iconName="logout" itemHandler={handleLogout}/>
        
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>

    
  )
}

export default ProfileMain

const styles = StyleSheet.create({
  backIcon:{
    paddingHorizontal:15,
    paddingTop:10,
    width:60,
  },
  headerContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginVertical:27,
    
  },
  headerLeft:{
   width:"60%",
   height:100,
   padding:15
   
  },
  headerLeftTextName:{
    fontSize:25
   },
   headerLeftTextEmail:{
    
   },
  headerRight:{
    width:"40%",
    display:"flex",
    alignItems:"center"
  },
  ProfileImage:{
    borderRadius:50,
    width:100,
    height:100,
    borderWidth:1,
    borderColor:"black"
  },
  main:{
    
  }

})