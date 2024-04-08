import { StyleSheet } from "react-native";
import colors from '../../assets/colors.js'

export default styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        margin:20,
        padding:10,
        
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        overflow:"hidden",
        borderRadius:30
    },
    Left:{
        width:"48%"
    },
    Heading:{
        fontSize:25
    },
    SubText:{
        
    },
    Right:{
        // width:"60%",
    },
    Image:{
        width:150,
        height:150,
        borderRadius:30
        
    }
    
})