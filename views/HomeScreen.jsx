import { Text, View, Image, ImageBackground, Button, Pressable, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { mainLogo, classicPod, premiumPod, womenPod, herobgImg, womensOnly, luxury, affordable, receptionist, booknow } from '../assets/images'
import Icon from 'react-native-vector-icons/FontAwesome6';
import { PodListItem } from '../components';
import colors from '../assets/colors'
import { AuthContext } from '../context/AuthContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const HandleProfileClick = () => {
    navigation.navigate("ProfileMain")
  }
  const HandleBookNow = () => {
    navigation.navigate("Book")
  }
  const HandleClassicPodPage = () => {
    navigation.navigate("PodPage", {
      type: "Classic",
      image: classicPod,
      text: `Introducing Classic Pods by ThePods – your ultimate solution for affordable and comfortable lodging. Designed with your relaxation in mind, Classic Pods offer a budget-friendly option for quality sleep and rejuvenation. Experience a cozy retreat where every detail is tailored to ensure a restful stay without compromising on comfort. With Classic Pods, enjoy the perfect blend of affordability and tranquility, making every night's sleep a dream come true.`,
      amount:200
    })
  }
  const HandlePremiumPodPage = () => {
    navigation.navigate("PodPage", {
      type: "Premium",
      image: premiumPod,
      text: `Discover the epitome of luxury with Premium Pods by ThePods – an exclusive offering designed for discerning travelers seeking unparalleled comfort and sophistication. Elevate your travel experience to new heights with our Premium Pods, where every detail is meticulously curated to provide a deluxe retreat for sleeping and resting. From plush bedding to deluxe amenities, immerse yourself in a world of opulence and indulgence. With Premium Pods, redefine the art of relaxation and embark on a journey of unmatched comfort and refinement.`,
      amount:400
    })
  }
  const HandleWomensPodPage = () => {
    navigation.navigate("PodPage", {
      type: "Womens",
      image: womenPod,
      text: `Introducing Women's Pods by ThePods – a sanctuary designed exclusively for women seeking privacy, safety, and tranquility during their travels. Our Women's Pods provide a secure and comfortable environment for rest and rejuvenation, tailored to meet the unique needs of female travelers. From cozy bedding to thoughtfully curated amenities, every aspect is crafted to ensure a peaceful and empowering experience. With Women's Pods, embark on your journey with confidence, knowing that your comfort and security are our top priorities.`,
      amount:200
    })
  }
 
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.HeaderSection}>
          <Text style={styles.HeaderText}>ThePods</Text>
          <Pressable onPress={HandleProfileClick} style={styles.HeaderProfileIcon}>
            <Icon name="user-circle" size={35} color="black" />
          </Pressable>

        </View>

        <ImageBackground source={herobgImg} resizeMode="cover" style={styles.HeroSection} >

          <Image source={mainLogo} style={styles.AboutSectionImage} />

          <Text style={styles.aboutText}>Discover a World of Luxury Without the High Price Tag! Indulge in Opulent Pods Facilities at Prices That Won't Break the Bank. Experience the Ultimate Staycation Experience – Where Luxury Meets Affordability.</Text>
          <Pressable onPress={HandleBookNow}>
            <Text style={styles.heroButton}>Book Now</Text>
          </Pressable>

        </ImageBackground>


        {/* {pods.map((item)=>(
          <PodListItem
          key={item.type}
          Image={item.image} 
          podType={item.type}
          text={item.text}/>
        ))} */}


        <View style={styles.BentoContainer}>


          <View style={styles.BentoInnerContainer}>
            <View style={styles.column}>

              <View style={[styles.item, { height: screenHeight * 0.3 + 10, width: screenWidth * 0.7 }, styles.aa]} >
                <Pressable onPress={HandleClassicPodPage}>
                  <Image source={classicPod} style={styles.BentoImage}></Image>
                </Pressable>
              </View>

              <View style={[styles.item, {  width: screenWidth * 0.7 }, styles.ab]} >

                <Text style={styles.abText}>Our classic pods are the most economical and value for money stay.</Text>

              </View>
            </View>
            <View style={styles.column}>
              <View style={[styles.item, { height: screenHeight * 0.15, width: screenWidth * 0.2 }, styles.ba]} >
                <Pressable onPress={HandleBookNow}>
                  <Image source={booknow} style={styles.BentoImage}></Image>
                </Pressable>
              </View>
              <View style={[styles.item, { height: screenHeight * 0.15, width: screenWidth * 0.2 }, styles.bb]} >
                <Image source={receptionist} style={styles.BentoImage}></Image>
              </View>

              <View style={[styles.item, { height: screenHeight * 0.1, width: screenWidth * 0.2 }, styles.bc]} >
              <Pressable onPress={HandleClassicPodPage}>
                <Image source={affordable} style={styles.BentoImage}></Image>
              </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.BentoInnerContainer}>
            <View style={styles.column}>
              <View style={[styles.item, { height: screenHeight * 0.15, width: screenWidth * 0.6 }, styles.c]} >
              <Pressable onPress={HandleWomensPodPage}>
                <Image source={womenPod} style={styles.BentoImage}></Image>
                </Pressable>
              </View>
            </View>
            <View style={styles.column}>
              <View style={[styles.item, { height: screenHeight * 0.15, width: screenWidth * 0.3 }, styles.c]} >
              <Pressable onPress={HandleWomensPodPage}>
                <Image source={womensOnly} style={styles.BentoImage}></Image>
                </Pressable>
              </View>
            </View>

          </View>

          <View style={styles.BentoInnerContainer}>
            <View style={styles.column}>
              <View style={[styles.item, { height: screenHeight * 0.3 + 10, width: screenWidth * 0.2 }, styles.da]} >
              <Pressable onPress={HandlePremiumPodPage}>
                <Image source={luxury} style={styles.BentoImage}></Image>
                </Pressable>
              </View>
            </View>
            <View style={styles.column}>
              <View style={[styles.item, {  width: screenWidth * 0.7 }, styles.ea]} >
              
                <Text style={styles.eaText}>Feel the premiumness and enjoy the ambiance inside our premium pods.</Text>
              
              </View>
              <View style={[styles.item, { height: screenHeight * 0.2, width: screenWidth * 0.7 }, styles.eb]} >
              <Pressable onPress={HandlePremiumPodPage}>
                <Image source={premiumPod} style={styles.BentoImage}></Image>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white"
  },
  HeaderSection: {
    height: 60,
    // backgroundColor:"red"
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    // backgroundColor:"red"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5

  },
  HeaderText: {
    fontSize: 25,
    marginLeft: 20,
    fontWeight: "bold",
    color: colors.red
  },
  HeaderProfileIcon: {
    marginRight: 20,

  },
  HeroSection: {
    display: 'flex',
    alignItems: "center",
  },

  heroButton: {
    backgroundColor: colors.red,
    padding: 20,
    color: colors.white,
    fontSize: 20,
    width: screenWidth,
    textAlign: "center"
  },

  aboutText: {
    fontSize: 20,
    marginTop: 20,
    color: "white",
    marginVertical: 30
  },

  AboutSectionImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 35,
    marginTop: 50
  },

  BentoContainer: {
    margin: 20
  },
  BentoInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  item: {
    backgroundColor: 'lightblue',
    margin: 5,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#171717',
    overflow: "hidden"

  },

  BentoImage: {
    width: "100%",
    height: "100%",
  },
  ab: {
    backgroundColor: "#FFEAEA",
    padding: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  abText: {
    color: "#F90B0D",
    fontSize: 18
  },
  ea: {
    backgroundColor: "black",
    padding: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  eaText: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic"
  },
  ba: {
    backgroundColor: "white"
  }

})