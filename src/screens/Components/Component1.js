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

const Component1 = ({title,img,price,clickProduct,is_liked,clickService})=>{
    return(
        <View style={styles.container}>
            <View style={styles.categoriesView}>
                    <TouchableOpacity style={{width: window.width/3,alignItems:'center'}} >
                        <View style={{flex:1,borderBottomWidth:1,borderBottomColor: '#EAEAEA',flexDirection:'row'}}>
                            <Image style={{width:100,height:100,resizeMode: 'center'}} 
                            source={{uri: img}}/>
                            <TouchableOpacity onPress={clickService}>
                                <Ionicons name={is_liked===true?"md-star":"ios-star-outline"} size={20} color={is_liked?"gold":"black"} />
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent:'space-around',alignItems:'center',flex:1}}>
                            <Text style={{maxWidth:100,textAlign:'center',marginBottom:5,color:'#79809c',fontSize:13}}>{title}</Text>
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
        width: 170,
        height: 200

    },
})
export default Component1;