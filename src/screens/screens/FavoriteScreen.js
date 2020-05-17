import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native'
import Header from '../Components/Header'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { 
    fetchProduct,
    incrementLikeMaterial,
    discrementLikeMaterial
} from '../../../api/action/productAction'
const mapStateToProps = state =>({
    favorites: state.product.favorites,
    building_materials: state.product.building_materials,
  })

const FavoriteComponent = ({title,title2,price,img,clickStar,is_liked,clickProduct}) =>{
    return(
        <View style={{borderBottomWidth:2,borderBottomColor:'#EAEAEA',paddingTop:10}}>
           
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between',
                paddingHorizontal: 10,
                alignItems:'center'
                }}>
                     <TouchableOpacity onPress={clickProduct}>
                <View style={{
                    flexDirection:'row', 
                    paddingHorizontal: 10
                    }}>
                    <Image style={{width:90,height:90,marginRight:20,resizeMode: 'center'}}
                        source={{uri: img}} />
                    <View>
                        <Text style={{textTransform:'uppercase',maxWidth:150,fontWeight:'700'}}>{title}</Text>
                        <Text style={{textTransform:'uppercase',color:'#78909c'}}>{title2}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginVertical:20}}>
                        <Text style={{fontSize: 13,color:'#252525'}}>Стоимость: </Text>
                        <Text style={{fontSize: 13,color:'#252525'}}>{price} тг</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={clickStar}>
                    <Ionicons name={is_liked===true?"md-star":"ios-star-outline" }size={25} color={is_liked?"gold":"black"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

class Favorite extends React.Component {
    state={
        product: [],
        total: 0,
        notification:0
    }
    componentDidMount=()=>{
        this.props.dispatch(fetchProduct())
        this.asyncData()
    }

    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('product')
        p = JSON.parse(prod)
        this.setState({
            product: p,
            //total: p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }
    _onClick=()=>{
        alert('onClick')
        
    }
    render(){
        const { favorites,building_materials } = this.props
        return(
                <SafeAreaView style={styles.container}>
                    
                        <Header headerText={'Избранное'} 
                            pressMenu ={()=>this.props.navigation.openDrawer()}
                            value={this.state.notification}
                            pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
                        <View>
                            <Text style={{fontSize:22,marginHorizontal:10,marginVertical: 10, color:'#78909c'}}>Отмеченные товары</Text>
                        </View>
                        <FlatList 
                            data={building_materials.filter(i=>i.is_liked===true)}
                            renderItem={({item})=>
                            <FavoriteComponent 
                                title={item.title}  
                                clickProduct={()=>this.props.navigation.navigate('Product',{'product':{
                                    title: item.title,
                                    img: item.img,
                                    price: item.price,
                                    company: item.company,
                                    description: item.description,
                                    id: item.id
                                }})}
                                title2={item.company}
                                is_liked={item.is_liked} 
                                img={item.img}
                                price={item.price}/>}
                                
                            keyExtractor={item => item.id}/>
                    
                </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         backgroundColor: '#FFFFFF',
         flex: 1,
         
         alignItems:'stretch',
         justifyContent:'center'
     },
 })
export default connect(mapStateToProps) (Favorite);