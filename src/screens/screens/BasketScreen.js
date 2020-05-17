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
    Dimensions,
    AsyncStorage
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { StackActions } from 'react-navigation';

import Header from '../Components/Header'
const window = Dimensions.get('screen')

const BasketComponent = ({img,title,title2,price,onClickDown,onClickUp,value}) =>{
    return(
        <View style={{borderBottomWidth:2,borderBottomColor:'#EAEAEA'}}>
            <View style={{
                flexDirection:'row', 
                justifyContent:'space-between',
                paddingHorizontal: 10,
                paddingTop: 8
                }}>
                <View style={{
                    flexDirection:'row', 
                    paddingHorizontal: 10,
                    
                    }}>
                    <Image style={{width:90,height:90,marginRight:20,resizeMode:'center'}}
                        source={{ uri: img}} />
                    <View>
                        <Text style={{
                                color:'#263238',
                                fontSize:14,
                                fontWeight:'700', 
                                textTransform:'uppercase',
                                maxWidth: window.width/2
                                }}>{title}</Text>
                        <Text style={{fontSize:14, color:'#79809c', textTransform:'uppercase'}}>{title2}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>alert('delete')}>
                    <AntDesign name="delete" size={17} color="#79809c" />
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                //marginHorizontal:15,
                marginVertical:10
                }}>
                <View  style={{flexDirection:'row',alignItems:'center',marginHorizontal:100}}>
                <TouchableOpacity 
                    onPress={onClickDown}
                    style={{width:40,height:40,backgroundColor:'#EAEAEA',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:30,color:'#79809c'}}>-</Text>
                </TouchableOpacity>
                <Text style={{fontSize:20,marginHorizontal:10}}>{value}</Text>
                <TouchableOpacity 
                    onPress={onClickUp}
                    style={{width:40,height:40,backgroundColor:'#EAEAEA',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:30,color:'#79809c'}}>+</Text>
                </TouchableOpacity>
                </View>
                <View style={{marginRight:24}}>
                    <Text style={{fontSize:14, color:'#263238'}}>{price} тг</Text>
                </View>
                
            </View>
        </View>
    )
}

class Basket extends React.Component {
    state={
        value: 1,
        product: [],
        total: 0,
        notification: 0
    }
    componentDidMount=async()=>{
        this.asyncData()
    }

    clearBasket=async()=>{
        await AsyncStorage.removeItem('productlist')
        this.asyncData()
        this.props.navigation.dispatch(StackActions.popToTop());
    }

    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        console.log(p)
        console.log("/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-/-/-")

        this.setState({
            product: p,
            total: p===null?0:p.length===1?0:p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }
    _emptyComponent=()=>{
        return(
            <View style={{height:window.height,top:'30%'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Categories')}>
                <Text style={{color:'#263238',textAlign:'center'}}>Ваша корзина пуста. Переходите в 
                        <Text style={{color:'#2196f3'}}> Категирий товаров </Text>
                     и выбрав товар добавьте в корзину.</Text>
                     </TouchableOpacity>
            </View>
        )
    }

    _onClickDown=()=>{
        this.state.value!==1?
        this.setState({value: this.state.value-1}):null
    }
    _onClickup=()=>{this.setState({value: this.state.value+1})}
    render(){
        const {product,notification} = this.state
        return(
                <SafeAreaView style={styles.container}>
                        <Header headerText={'Корзина'} 
                            value={notification}
                            pressMenu ={()=>this.props.navigation.openDrawer()}
                            pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{
                                    fontSize:22,
                                    marginHorizontal:10,
                                    marginVertical: 10, 
                                    color:'#79809c'
                                    }}>Ваши покупки</Text>
                            <TouchableOpacity onPress={()=>this.clearBasket()}>
                                <Text style={{
                                    fontSize:12,
                                    marginHorizontal:10,
                                    marginVertical: 10, 
                                    }}>Очистить корзину</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList 
                            data={product}
                            keyExtractor={(item)=>item.id}
                            ListEmptyComponent={this._emptyComponent}
                            renderItem={({item})=>
                            <BasketComponent 
                            key={item.id}
                                title={item.title}  
                                title2={item.company} 
                                img={item.img} 
                                price={item.price}
                                value={this.state.value}
                                onClickDown={()=>this._onClickDown()}
                                onClickUp={()=>this._onClickup()}
                                />}
                            keyExtractor={item => item.id}/>
                    <View >
                    <View style={{backgroundColor:'#f7f9f9', marginHorizontal:16}}>
                        <View style={{marginVertical:5, marginLeft:8,flexDirection:'row',justifyContent:'space-between',paddingRight:8}}>
                            <Text  
                            style={{color:'rgba(38,50,56,0.5)'}}>Доставка по городу</Text>
                            <Text style={{color:'rgba(38,50,56,0.5)'}}>5 000 тг</Text>
                        </View>
                        <View style={{marginVertical:5, marginLeft:8,flexDirection:'row',justifyContent:'space-between',paddingRight:8}}>
                            <Text style={{color:'rgba(38,50,56,0.5)'}}>Доставка за городом</Text>
                            <Text style={{color:'rgba(38,50,56,0.5)'}}>10 000 тг</Text>
                        </View>
                        <View 
                            style={{
                                marginVertical:5, 
                                paddingLeft:8,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingRight:8,
                                borderTopColor:'#79809c',
                                borderTopWidth:1}}>
                            <Text>Итоги</Text>
                            <Text>{this.state.total} тг</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop:30,justifyContent:'space-around', alignItems:'center',marginBottom: 20}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Main')}>
                            <Text style={{color:'#2196f3',textTransform:'uppercase',fontSize:14}}>Назад</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btnStyle}>
                            <Text style={{color:'white',textTransform:'uppercase'}}>Продолжить</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         backgroundColor: '#FFFFFF',
         flex: 1,
     },
     btnStyle:{
        backgroundColor:'rgba(0,188,212,1)',
        height:40,
        borderRadius:30,
        width:window.width/2,
        marginBottom:10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.2,
        borderColor:'#979797'
     }
 })
export default Basket;