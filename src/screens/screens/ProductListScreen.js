import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Dimensions,
    FlatList,
    PickerIOS,
    AsyncStorage,
    SafeAreaView
} from 'react-native'
import Header from '../Components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { 
    fetchProduct,
    incrementLikeMaterial,
    discrementLikeMaterial
} from '../../../api/action/productAction'

const mapStateToProps = state =>({
    building_materials: state.product.building_materials,
  })

const window = Dimensions.get('screen')
const listIcon = require('../../../assets/images/shape.png')
const listIcon1 = require('../../../assets/images/shape1.png')
const gridIcon = require('../../../assets/grid.png')
const gridIcon1 = require('../../../assets/grid1.png')

const categories = [
    {
        id: 0,
        name: 'Все товары'
    },
    {
        id: 1,
        name: 'Стройматериалы'
    },
    {
        id: 2,
        name: 'Декор и обои'
    },
    {
        id: 3,
        name: 'Краски'
    },
    {
        id: 6,
        name: 'Инструменты'
    },
    {
        id: 4,
        name: 'Керамические плиты'
    },
    {
        id: 5,
        name: 'Сантехника'
    },
    {
        id: 7,
        name: 'Услуги'
    },
]

const ProductComponentList =({text,price,img,clickProduct,is_liked,clickStar})=>{
    
    return(
        <View style={{
                        borderColor:'#eaeaea',
                        borderBottomWidth:0,
                        borderTopWidth:1,}} >
            <View style={styles.viewProduct}>
                <Image source={{uri: img}} style={styles.imgStyle}/>
                <View style={styles.viewDescription}>
                    <TouchableOpacity onPress={clickProduct}>
                        <Text style={{
                            maxWidth: 1.5*window.width/3,
                            textTransform: 'uppercase',
                            fontSize: 14,
                            color: '#263238'
                            }}>{text}</Text>
                        <Text style={{
                            fontSize:10,
                            color: '#727272'
                        }}>(12 отзывов)</Text>
                        <Text style={{
                            fontSize: 15,
                            color: '#000000',
                            marginTop: 8
                        }}>{price} тг</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clickStar}style={{marginRight:14,marginTop:11}}>
                            <Ionicons 
                                name={is_liked===true?"md-star":"ios-star-outline"} size={25} 
                                color={is_liked?"gold":"black"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const ProductComponentGrid = ({title,img,price,is_liked,clickInteresting,clickProduct})=>{
    return(
        <View >
            <View style={styles.categoriesView}>
                    <View style={{width: window.width/3,alignItems:'center'}} >
                        <View style={{borderBottomWidth:1,borderBottomColor: '#EAEAEA',flexDirection:'row'}}>
                            <Image style={{width:110,height:120,resizeMode: 'center',marginTop:8}} 
                            source={{uri: img}}/>
                            <TouchableOpacity onPress={clickInteresting} style={{position:'relative',top:'5%'}}>
                                <Ionicons name={is_liked?"md-star":"ios-star-outline"} size={20} color={is_liked?"gold":"black"} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={clickProduct}>
                            <Text numberOfLines={2} ellipsizeMode={'tail'} style={{maxWidth:window.width/2.6,textAlign:'center',marginBottom:5,color:'#263238',fontSize:13,textTransform:'uppercase',marginTop:5}}>{title}</Text>
                            <Text style={{color:'#c2c2c2',fontSize:11}}>(12 отзывов) </Text>
                            <Text style={{marginBottom:8}}>{price} тг</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

class ProductList extends React.Component{
    state = {
        filter: true,
        categoryId: this.props.navigation.getParam('category'),
        filterText: 'По возрастанию',
        filterText2: 'По убыванию',
        product: [],
        total: 0,
        notification:0,
        icon: true
    }
    componentDidMount=()=>{
        this.props.dispatch(fetchProduct())
        this.asyncData()
    }

    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        this.setState({
            product: p,
            //total: p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }
    clickStar=(id,is_liked)=>{
        is_liked?
        this.props.dispatch(discrementLikeMaterial(id)):
        this.props.dispatch(incrementLikeMaterial(id))
    }
    _emptyComponent=()=>{
        return(
            <View style={{height:window.height,top:'30%'}}>
                <TouchableOpacity>
                <Text style={{color:'#263238',textAlign:'center'}}>Категория товаров пусто.</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        const { filter,categoryId,filterText,filterText2 } = this.state
        const { building_materials } = this.props
        return(
            <SafeAreaView style={styles.container}>
                <Header headerText={'Товары'} 
                        value={this.state.notification}
                        pressMenu ={()=>this.props.navigation.openDrawer()}
                        pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
                <View style={styles.searchView}>
                    <View style = {styles.search}>
                        <FontAwesome name="search" size={20} color="gray" />
                    </View>
                    <TextInput placeholder="Search"/>
                </View>
                <View style={styles.viewFilter}>
                    <View style={styles.viewSort}>
                        <TouchableOpacity onPress={()=>this.setState({icon: true})}>
                            <Image source={this.state.icon?listIcon:listIcon1} style={{width:20,height:20,resizeMode:'contain'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({icon: false})}>
                            <Image source={this.state.icon?gridIcon:gridIcon1} style={{width:20,height:20,resizeMode:'contain'}}/>
                        </TouchableOpacity>   
                    </View>
                    <View style={styles.view}>
                        <TouchableOpacity onPress={()=>this.setState({filter: !filter})}>
                            <Text style={styles.textStyle}>{filter?filterText:filterText2}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Фильтры</Text>
                    </View>
                </View>
                <View style={styles.viewTxt}>
                    <Text style={styles.txtStyle}>
                        Найдено {this.props.navigation.getParam('category')>0?
                        building_materials.filter(i=>i.category === this.props.navigation.getParam('category')).length:
                        building_materials.length} товаров
                    </Text>
                </View>
                <FlatList 
                    data={filter?this.props.navigation.getParam('category')>0?
                        building_materials.filter(i=>i.category === this.props.navigation.getParam('category')).sort(function(a,b){
                            if( a.price>b.price){return 1}
                            if ( a.price<b.price){return -1}
                            return 0
                        })
                        :building_materials.sort(function(a,b){
                            if( a.price>b.price){return -1}
                            if ( a.price<b.price){return 1}
                            return 0
                    })
                        :this.props.navigation.getParam('category')>0?building_materials.filter(i=>i.category === this.props.navigation.getParam('category')).sort(function(a,b){
                            if( a.price>b.price){return -1}
                            if ( a.price<b.price){return 1}
                            return 0
                    }):building_materials.sort(function(a,b){
                        if( a.price>b.price){return 1}
                        if ( a.price<b.price){return -1}
                        return 0
                })
                } 
                    numColumns={this.state.icon?1: 2}
                    renderItem={({item})=>
                        this.state.icon?
                        <ProductComponentList 
                            img={item.img}
                            ListEmptyComponent={this._emptyComponent}
                            is_liked={item.is_liked} 
                            text={item.title} 
                            price={item.price}
                            clickStar={()=>this.clickStar(item.id,item.is_liked)} 
                            clickProduct={
                                ()=>this.props.navigation.navigate('Product',
                                {'product':
                                    {
                                        title: item.title,
                                        img: item.img,
                                        price: item.price,
                                        company: item.company,
                                        description: item.description,
                                        id: item.id
                                    }})}/>:
                                <ProductComponentGrid
                                    title={item.title}
                                    ListEmptyComponent={this._emptyComponent}
                                    clickInteresting={()=>this.clickStar(item.id,item.is_liked)}
                                    img={item.img}
                                    is_liked={item.is_liked}
                                    price={item.price}
                                    clickProduct={
                                        ()=>this.props.navigation.navigate('Product',
                                        {'product':
                                            {
                                                title: item.title,
                                                img: item.img,
                                                price: item.price,
                                                company: item.company,
                                                description: item.description,
                                                id: item.id
                                            }})}
                                    />}
                    keyExtractor={(item)=>item.id} key={this.state.icon?1:0}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ffffff',
        flex: 1
    },
    viewFilter:{
        flexDirection: 'row',
        height:48,
        paddingHorizontal:5,
        marginHorizontal:20,
        borderColor: '#eaeaea',
        borderBottomWidth: 1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    viewSort:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:70
    },
    view:{
        borderColor: '#eaeaea',
        borderLeftWidth:1,
        borderRightWidth: 1,
        height:48,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        
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
        borderColor: '#eaeaea'
    },
    search:{
        margin:5
    },
    textStyle:{
        color: '#78909c',
        textTransform: 'uppercase',
        fontSize: 14
    },
    txtStyle:{
        color: '#263238',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8
    },
    viewTxt:{
        marginHorizontal:20,
        paddingHorizontal:5,
        marginVertical:10,
        
    },
    viewProduct:{
        flexDirection:'row',
        height: 108,
        paddingHorizontal: 20,
        paddingTop:8,
        justifyContent:'space-between',
        width:window.width/3
    },
    viewDescription:{
        flexDirection:'row',
        justifyContent:'space-between',
        width: 2*window.width/3,
        paddingLeft: 10
    },
    imgStyle:{
        width:100,
        height:90,
        resizeMode: 'center'
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
        height: window.height/3.2
    },
})

export default connect(mapStateToProps)(ProductList);