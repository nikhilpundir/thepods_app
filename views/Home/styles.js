import { StyleSheet } from "react-native";
import colors from '../../assets/colors.js'

export default styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
    },
    heroHeading:{
        marginHorizontal:20,
        fontSize:25,
        color:colors.black
    },
    innerContainer:{
       margin:20,
       backgroundColor:"white",
       borderRadius:30,
       
    //    shadowColor:"#000",
    //    shadowOffset: { width: 20, height: 20 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 1,
    },
    bgImage:{
        height:250,
        marginHorizontal:20,
    },
    
    innerHeading:{
        color:colors.yellow,
        fontSize:50,
        padding:20
    },
    text:{
        color:colors.white,
        fontSize:20,
        padding:10,
        textAlign:"center"
    },
    heroButton:{
        width:50,
        
    },
    icon:{
        alignSelf:"center",
        
    },
    
})