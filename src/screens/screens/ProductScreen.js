import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    AsyncStorage,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native'
import Header from '../Components/Header'
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const window = Dimensions.get('screen')

ReviewComponent = ()=>{
    return(
        <View style={{flexDirection:'row',}}>
        <View style={{borderRightColor:'#DADCDD',borderRightWidth:1,padding:8}}>
            <Text style={{color:'#494949',fontSize:13}}>
                Санжар
            </Text>
            <Text style={{color:'#7b7b7b',fontSize:10}}>
                02.02.2020
            </Text>
        </View>
        <View style={{padding:8}}>
            <Text style={{fontSize:13}}>
                Полностью соответствует заявленным характеристикам.
            </Text>
        </View>
    </View>
    )
}

class Product extends React.Component{

    state={
        product: this.props.navigation.getParam('product'),
        value: 1,
        descriptionView: false,
        shippingView: false,
        reviewsView: false,
        productlist: [],
        total: 0,
        notification:0
    }
    
    componentDidMount=()=>{
        this.asyncData()
    }
    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        this.setState({
            productlist: p,
            total: p===null?0:p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }
    saveBasket= async(value)=>{
       // await AsyncStorage.removeItem('product')
        let array = []
        let prod = await AsyncStorage.getItem('productlist')
        array = JSON.parse(prod)
        if (!array){
            array=[]
        }
        console.log(array)
        array.push(value)
        await AsyncStorage.setItem('productlist',JSON.stringify(array))
        this.asyncData()
    }

    _onClickDown=()=>{
        this.state.value!==1?
        this.setState({value: this.state.value-1}):null
    }
    _onClickup=()=>{this.setState({value: this.state.value+1})}

    render(){
        const {product,value} = this.state
        return(
            <>
            <SafeAreaView style={{borderLeftColor:'#FFFFFF',flex:1,}}>
                <KeyboardAvoidingView style={{flex:1}} behavior={'height'}>
                    <ScrollView>
            <Header headerText={'Товар'} 
                    value={this.state.notification}
                    pressMenu ={()=>this.props.navigation.openDrawer()}
                    pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
            <ScrollView style={{borderLeftColor:'#FFFFFF'}}> 
                <View style={styles.viewImg}>
                    <Image style={styles.imgStyle} source={{uri: product.img}}/>
                </View>
                <View style={{backgroundColor:'#ffffff'}}>
                <Text style={{
                        fontSize:24, 
                        textTransform:'uppercase',
                        textAlign:'center',
                        color:'#263238',
                        fontWeight:'700'}}>
                    {product.title}
                </Text>
                <Text style={{
                            fontSize:10,
                            color: '#727272',
                            textAlign:'center'
                            }}>(12 отзывов)</Text>
                <Text style={{
                        fontSize:20, 
                        textTransform:'uppercase',
                        textAlign:'center',
                        color:'#263238',
                        fontWeight:'700',
                        margin:16}}>
                    {product.price} тг
                </Text>
                </View>
                <View style={styles.viewCount}>
                    <TouchableOpacity onPress={()=>this._onClickDown()}
                        style={{
                            width:40,
                            height:40,
                            backgroundColor:'#EAEAEA',
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{
                            fontSize:30,
                            color:'#79809c'}}>-</Text>
                    </TouchableOpacity>
                        <Text style={{fontSize:20,marginHorizontal:10}}>{value}</Text>
                    <TouchableOpacity onPress={()=>this._onClickup()}
                        style={{
                            width:40,
                            height:40,
                            backgroundColor:'#EAEAEA',
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <Text style={{fontSize:30,color:'#79809c'}}>+</Text>
                    </TouchableOpacity>           
                </View>
                <View style={{paddingVertical:16,backgroundColor:'#ffffff'}}>
                <TouchableOpacity style={styles.btnStyle} onPress={()=>this.saveBasket(product)}>
                    <Text style={{
                        fontSize:14, 
                        textTransform:'uppercase',
                        color:'#ffffff'}}>Добавить в корзину</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>this.setState({descriptionView: !this.state.descriptionView})}>
                    <View style={styles.view}>
                        <Text style={{fontSize:13,color: '#5a5a5a'}}>Описание товара</Text>
                        <AntDesign name={this.state.descriptionView?"up":"down"} size={20} color="gray" />
                    </View>
                </TouchableOpacity>
                {this.state.descriptionView?<View style={styles.viewDescription}>
                    <Text style={styles.txtStyle}>Размер: {product.description.size}</Text>
                    <Text style={styles.txtStyle}>Метров в коробке: {product.description.count}</Text>
                    <Text style={styles.txtStyle}>Количество в упаковке: 8</Text>
                    <Text style={styles.txtStyle}>Тип товара: {product.description.type}</Text>
                </View>:null}
                <TouchableOpacity onPress={()=>this.setState({shippingView: !this.state.shippingView})}>
                    <View style={styles.view}>
                        <Text style={{fontSize:13,color: '#5a5a5a'}}>Доставка</Text>
                        <AntDesign name={this.state.shippingView?"up":"down"} size={20} color="gray" />
                    </View>
                </TouchableOpacity>
                { this.state.shippingView?
                    <View style={styles.viewDescription}>
                    <Text style={styles.txtStyle}>По городу: 5 000 тг</Text>
                    <Text style={styles.txtStyle}>За городом: 10 000 тг</Text>
                </View>:null}
                <TouchableOpacity  onPress={()=>this.setState({reviewsView: !this.state.reviewsView})}>
                    <View style={styles.view}>
                        <Text style={{fontSize:13,color: '#5a5a5a'}}>Отзывы</Text>
                        <AntDesign name={this.state.reviewsView?"up":"down"} size={20} color="gray" />
                    </View>
                </TouchableOpacity>
                {this.state.reviewsView?
                <View >
                    <View style={{backgroundColor:'#fff',paddingVertical:12}}>
                        <Text style={{fontSize:12,color:'#263238',marginHorizontal:20}}>Ваш отзыв </Text>
                        <View style={styles.searchView}>
                            <TextInput placeholder={'отзыв'} />
                        </View>
                        <TouchableOpacity style={styles.btnStyle1} >
                            <Text style={{
                                fontSize:14, 
                                textTransform:'uppercase',
                                color:'#ffffff'}}>Отправить</Text>
                        </TouchableOpacity>
                        <View style={styles.viewDescription}>
                            <ReviewComponent />
                            <ReviewComponent />
                            <ReviewComponent />
                            <ReviewComponent />
                        </View>
                    </View>
                </View>:null}
            </ScrollView>
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{},
    viewImg:{
        height: 324,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff',
        marginTop:1.5
    },
    imgStyle:{
        height:320,
        width: window.width-10,
        resizeMode:'center'
    },
    viewCount:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:12,
        borderTopWidth:1,
        borderColor:'#eaeaea',
        borderBottomWidth:1,
        paddingVertical:10,
        backgroundColor:'#ffffff'
    },
    btnStyle:{
        backgroundColor:'#00bcd4',
        height:40,
        width:200,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        alignSelf:'center',
    }, 
    btnStyle1:{
        backgroundColor:'#00bcd4',
        height:40,
        width:150,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        alignSelf:'center',
        marginBottom:10
    },
    view:{
        height:50,
        width:window.width,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:16,
        borderColor:'#eaeaea',
        borderTopWidth:1,
        borderBottomWidth:1,
        paddingVertical:8,
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
    viewDescription:{
        backgroundColor:'#F3F3F3',
        paddingHorizontal:20,
        paddingVertical:12
    },
    txtStyle:{
        fontSize: 13,
        color:'#494949',
        marginVertical:3
    },
    searchView:{
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginTop:10,
        flexDirection:'row',
        paddingHorizontal:5,
        padding:5,
        alignItems:'center',
        borderWidth:1,
        borderColor: '#eaeaea',
        marginBottom: 12,
        height:40
    },
})

export default Product;