import { StyleSheet } from "react-native";
import colors from '../../assets/colors.js'

export default styles = StyleSheet.create({
    container:{
        height:65,
        backgroundColor:"white",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
    iconCenter:{
        backgroundColor:colors.red,
        height:80,
        width:80,
        borderRadius:50,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        top:-35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    iconCenterText:{
        color:colors.white
    },  
    iconLeft:{
        paddingTop:8
    },
    iconRight:{
        paddingTop:8
    }
   
})