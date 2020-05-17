import React from 'react'
import {
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    TextInput,
    FlatList,
    SafeAreaView
} from 'react-native'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import Header from '../Components/Header'
import Categories from '../Components/Categories'
import Component from '../Components/Component'
import Component1 from '../Components/Component1'
import Component2 from '../Components/Component2'

import { connect } from 'react-redux';
import { 
    fetchProduct,
    discrementLike,
    incrementLike,
    discrementLikeService,
    incrementLikeService ,
    discrementLikeInteresting,
    incrementLikeInteresting,
    discrementLikeMaterial,
    incrementLikeMaterial
} from '../../../api/action/productAction'

const mapStateToProps = state =>({
    product: state.product.items,
    popular_products: state.product.popular_products,
    popular_service: state.product.popular_service,
    maybe_interesting: state.product.maybe_interesting,
    building_materials: state.product.building_materials,
  })

const Data = [
    {
        id: 1,
        title: 'Стройматериалы',
        img: require('../../../assets/images/img3.png')
    },
    {
        id: 2,
        title: 'Декор и обои',
        img: require('../../../assets/images/img2.png')
    },
    {
        id: 3,
        title: 'Краски',
        img: require('../../../assets/images/img6.png')
    },
    {
        id: 6,
        title: 'Инструменты',
        img: require('../../../assets/images/img4.png')
    },
    {
        id: 4,
        title: 'Керамические плиты',
        img: require('../../../assets/images/img8.png')
    },
    {
        id: 5,
        title: 'Сантехника',
        img: require('../../../assets/images/img7.png')
    },
    
]

class Main extends React.Component {
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
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        this.setState({
            product: p,
            total: p===null?0:p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }

    clickStar=(id,is_liked)=>{
        is_liked?
        this.props.dispatch(discrementLike(id)):
        this.props.dispatch(incrementLike(id))
    }
    clickStarService=(id,is_liked)=>{
        is_liked?
        this.props.dispatch(discrementLikeService(id)):
        this.props.dispatch(incrementLikeService(id))
    }
    clickStarInteresting=(id,is_liked)=>{
        is_liked?
        this.props.dispatch(discrementLikeMaterial(id)):
        this.props.dispatch(incrementLikeMaterial(id)) 
    }
    render(){
        const {
            product,
            popular_products,
            popular_service,
            maybe_interesting,
            building_materials

        } = this.props
        return(
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        <Header headerText={'Строй маркет'} 
                            pressMenu ={()=>this.props.navigation.openDrawer()}
                            value = {this.state.notification}
                            pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
                            
                        <View style={styles.searchView}>
                            <View style = {styles.search}>
                                <FontAwesome name="search" size={20} color="gray" />
                            </View>
                            <TextInput placeholder="Search"/>
                        </View>
                        <ScrollView>
                        <View style={{ padding:10, backgroundColor:'#EAEAEA'}}>
                            <Text style={{fontSize:16,color: '#78909c'}}>Категории</Text>
                        </View>
                        <FlatList  
                            data={Data}
                            numColumns = {3}
                            renderItem={({item})=>
                                <Categories 
                                    key={item.id} 
                                    title={item.title} 
                                    img={item.img} 
                                    clickCategories={()=>this.props.navigation.navigate('ProductList',{'category': item.id})}/>}
                            keyExtractor={(item) => item.id}/>
                        <View style={{ padding:10, backgroundColor:'#EAEAEA'}}>
                            <Text style={{fontSize:15,color:'#79809c'}}>Популярные товары</Text>
                        </View>
                        <FlatList 
                            data={popular_products}
                            horizontal
                            renderItem={({item})=>
                                <Component  
                                    key={item.id} 
                                    clickProduct={()=>this.props.navigation.navigate('Product', {
                                        'product':
                                        {
                                            title: item.title,
                                            img: item.img,
                                            price: item.price,
                                            company: item.company,
                                            description: item.description,
                                            id: item.id
                                        }})}
                                    clickStar={()=>this.clickStar(item.id,item.is_liked)} 
                                    is_liked={item.is_liked} 
                                    title={item.title} 
                                    img={item.img} 
                                    price={item.price}/>}
                            keyExtractor={(item) => item.id}/>
                        <View style={{ padding:10, backgroundColor:'#EAEAEA'}}>
                            <Text style={{fontSize:15,color:'#79809c'}}>Популярные услуги</Text>
                        </View>    
                        <FlatList 
                            data={popular_service}
                            horizontal
                            renderItem={({item})=>
                                <Component1  
                                    key={item.id} 
                                    is_liked={item.is_liked} 
                                    title={item.title} 
                                    img={item.img}
                                    clickService={()=>this.clickStarService(item.id,item.is_liked)} 
                                    price={item.price}/>}
                            keyExtractor={(item) => item.id}/>
                        <View style={{ padding:10, backgroundColor:'#EAEAEA'}}>
                            <Text style={{fontSize:15,color:'#79809c'}}>Вожможно интересно</Text>
                        </View>  
                        <FlatList 
                            data={building_materials.filter(i=>i.interesting === true)}
                            numColumns={2}
                            renderItem={({item})=>
                                <Component2 
                                    title={item.title}
                                    clickInteresting={()=>this.clickStarInteresting(item.id,item.is_liked)}
                                    key={item.id}
                                    clickProduct={()=>this.props.navigation.navigate('Product', {
                                        'product':
                                        {
                                            title: item.title,
                                            img: item.img,
                                            price: item.price,
                                            company: item.company,
                                            description: item.description,
                                            id: item.id
                                        }})}
                                    is_liked={item.is_liked} 
                                    img={item.img} 
                                    price={item.price}/>}
                            keyExtractor={(item) => item.id}/>
                            </ScrollView>
                    </ScrollView>
                </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         backgroundColor: '#EAEAEA',
         flex: 1,
     },
     searchView:{
         backgroundColor: '#ffffff',
         marginHorizontal: 20,
         margin:10,
         flexDirection:'row',
         paddingHorizontal:5,
         padding:5,
         alignItems:'center',
         borderRadius:5
     },
     search:{
         margin:5
     }
 })
export default connect(mapStateToProps)(Main);