import { Dimensions, Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PodPage = ({ route, navigation }) => {
    const { type, image, text, amount } = route.params;
    const HandleBack = () => {
        navigation.goBack()
    }
    const HandleBook = () => {
        navigation.navigate("Book")
      }
      const HandleCall=()=>{
        Linking.openURL('tel:+1234567890');
      }
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <Pressable onPress={HandleBack} style={styles.backIcon}>
                <Icon name="chevron-back-outline" size={23} color="black" />
            </Pressable>
            <Image source={image} style={styles.HeroImage} />
            <View style={styles.mainSection}>
                <Text style={styles.heading}>
                    {type} Pod
                </Text>
                <Text style={styles.mainText}>
                    {text}
                </Text>
                <Text style={styles.pricing}>
                    Price : {amount} ₹ per night.
                </Text>
                <View style={styles.bottomSection}>
                    <Pressable style={styles.contact} onPress={HandleCall}>
                        <Text style={styles.contactText}><Icon name="call-outline" size={20} color="black" /> Contact</Text>
                    </Pressable>
                    <Pressable style={styles.Book} onPress={HandleBook}>
                        <Text style={styles.BookText}>Book Now!</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default PodPage

const styles = StyleSheet.create({
    main:{
        backgroundColor:"white",
        flex:1
    },
    container: {
        marginHorizontal: 10,
        // backgroundColor:"white"
    },
    backIcon: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        width: 60,
    },
    HeroImage: {
        width: "100%",
        height: 300,

    },
    heading: {
        color: "black",
        fontSize: 50
    },
    mainText: {
        color: "black",
        fontSize: 25
    },
    pricing: {
        fontSize: 25,
        color: "black",
        marginVertical: 20
    },
    bottomSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    contact:{
        padding:20,
        backgroundColor:"lightblue",
        width:"50%",
        display:"flex",
        
    },
    Book:{
        padding:20,
        backgroundColor:"green",
        width:"50%",
    },
    contactText:{
        fontSize:20,
        textAlign:"center",
        color:"black"
    },
    BookText:{
        fontSize:20,
        color:"white",
        textAlign:"center"
    }
})