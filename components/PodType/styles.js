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
        // alignItems:"center",
        overflow:"hidden",
        borderRadius:30
    },
    Left:{
        width:"51%",
        color:colors.black
        
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
        width:140,
        height:140,
        borderRadius:30
        
    }
    
})