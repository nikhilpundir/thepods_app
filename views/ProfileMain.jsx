import { ImageBackground, Image, StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, Linking } from 'react-native'
import React, { useContext } from 'react'
import { ProfileListItem } from '../components';
import { profileBg, NikhilCTO2, userImg } from '../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { AuthContext } from '../context/AuthContext';


const ProfileMain = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const handleLogout = () => {
    logout();

  }
  const HandleBack = () => {
    navigation.goBack()
  }
  const handleCall=()=>{
    Linking.openURL('tel:+1234567890');
  }
  const handleMail=()=>{
    Linking.openURL('mailto:support@thepods.in');
  }
  const handleHelp=()=>{
    Linking.openURL('https://thepods.vercel.app/contact');
  }
  const handlePrivacyPolicy=()=>{
    navigation.navigate('PrivacyPolicy')
  }
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <Pressable onPress={HandleBack} style={styles.backIcon}>
              <Icon name="angle-left" size={23} color="black" />
            </Pressable>
          <ImageBackground source={profileBg} resizeMode="cover" style={styles.headerBgContainer} >
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
            <ProfileListItem itemName="Settings" iconName="setting" />
            <ProfileListItem itemName="Call Us" iconName="phone" itemHandler={handleCall}/>
            <ProfileListItem itemName="Email Us" iconName="mail" itemHandler={handleMail}/>
            <ProfileListItem itemName="Help" iconName="questioncircleo" itemHandler={handleHelp}/>
            <ProfileListItem itemName="Privacy Policy" iconName="infocirlceo" itemHandler={handlePrivacyPolicy} />
            <ProfileListItem itemName="logout" iconName="logout" itemHandler={handleLogout} />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>


  )
}

export default ProfileMain

const styles = StyleSheet.create({
  backIcon: {
    padding: 15,
    width: 60,
  },
  headerBgContainer:{
    backgroundColor:"#FFE0E0",
    height:300,
    flex:1,
    justifyContent:"center"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 27,

  },
  headerLeft: {
    width: "60%",
    height: 100,
    padding: 15

  },
  headerLeftTextName: {
    fontSize: 25,
    color:"black"
  },
  headerLeftTextEmail: {
    color:"black"
  },
  headerRight: {
    width: "40%",
    display: "flex",
    alignItems: "center"
  },
  ProfileImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "black"
  },
  main: {

  }

})