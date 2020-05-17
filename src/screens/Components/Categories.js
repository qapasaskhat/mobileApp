import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'

const window = Dimensions.get('screen')

const Categories = ({title,img,clickCategories})=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchStyle} onPress={clickCategories}>
                <Image style={{width:100,height:100,resizeMode: 'center'}} source={img}/>
                <Text style={{maxWidth:120, textAlign:'center',color:'#79809c',fontSize:14}}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white'
    },
    touchStyle:{
        paddingBottom: 5,
        width: window.width/2.9,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#EAEAEA',
        justifyContent:'center',
        alignItems:'center',
        height: window.width/2.8
    }
})
export default Categories;