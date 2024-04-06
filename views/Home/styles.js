import { StyleSheet } from "react-native";
import colors from '../../assets/colors.js'

export default styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
    },
    heroHeading:{
        marginHorizontal:20,
        fontSize:20,
        color:colors.black
    },
    innerContainer:{
       margin:20,
       backgroundColor:"white",
       borderRadius:30,
       paddingBottom:50,
       shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1.5,  
    elevation: 2,
       
    },
    bgImage:{
        height:210,
        marginHorizontal:20,
        display:"flex",
        gap:10
    },
    
    innerHeading:{
        color:colors.black,
        fontSize:30,
        padding:20
    },
    luxury:{
        color:colors.yellow,
    },
    text:{
        color:colors.white,
        fontSize:20,
        // padding:10,
        // width:"80%",
        paddingHorizontal:20,
        paddingTop:30
    },
    heroButton:{
        backgroundColor:colors.red,
        padding:15,
        borderRadius:50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        color:colors.white,
        alignSelf:"flex-end",
        marginRight:20,
        
    },
    icon:{
        alignSelf:"center",
        
    },
    
})