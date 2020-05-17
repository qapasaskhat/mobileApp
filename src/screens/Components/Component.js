import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const window = Dimensions.get('screen')

const Component = ({title,img,price,is_liked,clickProduct,clickStar})=>{
    return(
        <View style={styles.container}>
            <View style={styles.categoriesView}>
                <TouchableOpacity style={{width: window.width/3,alignItems:'center'}} onPress={clickProduct}>
                    <View style={{borderBottomWidth:1,borderBottomColor: '#EAEAEA',flexDirection:'row'}}>
                        <Image style={{width:100,height:100,resizeMode: 'center'}} 
                            source={{uri:img}}/>
                        <TouchableOpacity onPress={clickStar}>
                            <Ionicons name={is_liked?"md-star":"ios-star-outline"}  size={20} color={is_liked?"gold":"black"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{maxWidth:window.width/2.5,textAlign:'center',marginBottom:5,color:'#79809c'}}>{title}</Text>
                    <View >
                        <Text style={{color:'#c2c2c2',textDecorationLine:'line-through',textDecorationColor:'#c2c2c2'}}>2700 тг</Text>
                        <Text style={{marginBottom:5,color:'#343434'}}>{price} тг</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
    },
    categoriesView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 10,
        borderRightColor: '#EAEAEA',
        borderRightWidth:5,
        borderLeftColor:'#EAEAEA',
        borderLeftWidth:5,
        width:170,
        height:200
    },
})
export default Component;