import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { Entypo,AntDesign } from '@expo/vector-icons';
const window = Dimensions.get('screen')

const Header = ({headerText,pressMenu,pressBasket,value})=>{
    return(
        <View style={styles.container}>
            <View style = {styles.textView}>
                <TouchableOpacity onPress={pressMenu}>
                    <Entypo name="menu" size={30} color="#79809c" />
                </TouchableOpacity>
                <Text style={{fontSize:16,fontWeight:'500',color: '#263238' }}>{headerText}</Text>
                <TouchableOpacity onPress={pressBasket}>
                    <View style={styles.notificationStyle}>
                        <Text style={{color:'#ffffff',fontSize:12}}>{value}</Text>
                    </View>
                    <AntDesign name="shoppingcart" size={25} color="#79809c" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        //marginTop:10,
        height: 70,
        backgroundColor: 'white',
        paddingTop: 25,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.23,
        shadowRadius: 2.26,
        //elevation:4,
    },
    textView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal: 8,
        
    },
    notificationStyle:{
        width:15,
        height:15,
        backgroundColor:'red',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        zIndex:999,
        alignSelf:'flex-end'
    }
})
export default Header;