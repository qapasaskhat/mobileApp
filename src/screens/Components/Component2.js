import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    FlatList
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const window = Dimensions.get('screen')

const Component2 = ({title,img,price,is_liked,clickInteresting,clickProduct})=>{
    return(
        <View style={styles.container}>
            <View style={styles.categoriesView}>
                    <TouchableOpacity style={{width: window.width/3,alignItems:'center'}} onPress={clickProduct}>
                        <View style={{borderBottomWidth:1,borderBottomColor: '#EAEAEA',flexDirection:'row'}}>
                            <Image style={{width:100,height:100,resizeMode: 'center',marginTop:8}} 
                            source={{uri: img}}/>
                            <TouchableOpacity onPress={clickInteresting} style={{position:'absolute',left:'87%',top:'5%'}}>
                                <Ionicons name={is_liked?"md-star":"ios-star-outline"} size={20} color={is_liked?"gold":"black"} />
                            </TouchableOpacity>
                        </View>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={{textAlign:'center',marginBottom:5,color:'#79809c',fontSize:13}}>{title}</Text>
                        <Text style={{color:'#c2c2c2',textDecorationLine:'line-through',textDecorationColor:'#c2c2c2'}}>2700 тг</Text>
                        <Text style={{marginBottom:8}}>{price} тг</Text>
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
        justifyContent:'center',
        paddingHorizontal: 10,
        borderRightColor: '#EAEAEA',
        borderRightWidth:2,
        borderBottomColor:'#EAEAEA',
        borderBottomWidth:2,
        width: window.width/2,
        height: window.height/3.3
    },
})
export default Component2;