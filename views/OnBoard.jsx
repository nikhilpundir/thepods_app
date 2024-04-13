import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { welcome} from '../assets/images'
import colors from '../assets/colors'

const OnBoard = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.headingBox}>
            <Text style={styles.headingText}>Welcome to ThePods</Text>
        </View>
        <View style={styles.ImageContainer}> 
         <Image
            style={styles.WelcomeImage}
            source={welcome}
            />
        </View>
         <Pressable
        onPress={() => navigation.navigate('Login')}
        style={styles.ButtonContainer}
        >
            <Text style={styles.ButtonText}>Go On</Text>
      </Pressable>
    </View>
  )
}

export default OnBoard

const styles = StyleSheet.create({
    container:{
        display:"flex",
        margin:10,
        alignItems:"center"  ,
        height:"100%",
        padding:10
    },
    headingBox:{
        height:50,
    },
    headingText:{
        fontSize:30,
        fontWeight:"bold",
        color:colors.black
    },
    ImageContainer:{
        padding:10,
        height:280,
        overflow:"hidden",
        display:'flex',
        alignItems:'center',
        marginVertical:50,

    },
    WelcomeImage:{
        flex:1,
        width:330,
    },
    ButtonContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:60,
        width:"100%",
        backgroundColor:colors.red,
        borderRadius:15
        
    },
    ButtonText:{
        color:colors.white,
        fontSize:20,
        fontWeight:"bold",
    },
    
})