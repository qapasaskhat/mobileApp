import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    SafeAreaView,
    AsyncStorage
} from 'react-native'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import Header from '../Components/Header'

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

const Categorie = ({title, click})=>{
    return(
        <TouchableOpacity style={styles.categoriesView} onPress={click}>
            <Text style={styles.textStyle}>{title}</Text>
            <AntDesign name="right" size={20} color="gray" />
        </TouchableOpacity>
    )
}

class Categories extends React.Component {
    static navigationOptions = {
        
      };
    state={
        product: [],
        total: 0,
        notification:0
    }
    componentDidMount=()=>{
        const parent = this.props.navigation.dangerouslyGetParent();
        this.asyncData()
        console.log()
    }
    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        console.log(p)
        this.setState({
            product: p,
            total: p===null?0:p.reduce(function(a,b){return a.price+b.price}),
            notification: p===null?0:p.length
        })
    }
    _navigate=(id)=>{
        this.props.navigation.navigate('ProductList',{'category': id})
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Header headerText={'Категории'} 
                        pressMenu ={()=>this.props.navigation.openDrawer()}
                        value={this.state.notification}
                        pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
                <View style={styles.searchView}>
                    <View style = {styles.search}>
                        <FontAwesome name="search" size={20} color="gray" />
                    </View>
                    <TextInput placeholder="Search"/>
                </View>
                <FlatList 
                    data={categories} 
                    renderItem={({item})=>
                        <Categorie 
                            title={item.name}  
                            click={()=>this._navigate(item.id)}/>
                            }/>
            </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         flex:1,
         backgroundColor: '#EAEAEA'
     },
     searchView:{
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        margin:10,
        flexDirection:'row',
        paddingHorizontal:5,
        padding:5,
        alignItems:'center'
    },
    search:{
        margin:5
    },
    categoriesView:{
        backgroundColor: '#ffffff',
        paddingHorizontal:20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1
    },
    textStyle:{
        fontSize: 15,
        paddingVertical:15
    }
 })
export default Categories;