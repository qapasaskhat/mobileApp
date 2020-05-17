import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'

import Header from '../Components/Header'

import data from './data.json'

const account = data.account

const LoginInput =()=>{
    return(
        <View style={styles.view}>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.viewStyle}>
                <TextInput placeholder={account.email}/>
            </View>
        </View>
    )
}
const PasswordInput =()=>{
    return(
        <View style={styles.view}>
            <Text style={styles.textStyle}>Пароль</Text>
            <View style={styles.viewStyle}>
                <TextInput secureTextEntry={true} placeholder={'* * * * * * * *'}/>
            </View>
        </View>
    )
}

class Auth extends React.Component {
    state={
        notification: 0
    }
    componentDidMount=async()=>{
        this.asyncData()
    }
    asyncData=async()=>{
        let p = []
        let prod =await AsyncStorage.getItem('productlist')
        p = JSON.parse(prod)
        console.log(p)
        console.log("/-/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-/-/-")

        this.setState({
            notification: p===null?0:p.length
        })
    }
    render(){
        return(
            <SafeAreaView style={{backgroundColor: '#EAEAEA',flex:1}}>
            <Header headerText={'Авторизация'} 
                pressMenu ={()=>this.props.navigation.openDrawer()}
                value={this.state.notification}
                            pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
            <View style={styles.container}>
                <LoginInput />
                <PasswordInput />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                    <Text style={{fontSize:16, color:'#2196f3',marginLeft: 10, marginBottom: 12}}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={{fontSize:14, color: '#ffffff', textTransform: 'uppercase'}}>Вход</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
        // flex:1,
         
         paddingTop:20
     },
     view:{
         paddingHorizontal:10,
         paddingBottom: 15,
     },
     textStyle:{
         fontSize:12,
         marginBottom: 10,
         color: '#263238'
     },
     viewStyle:{
         backgroundColor:'#FFFFFF',
         paddingHorizontal:10,
         height:40,
         justifyContent:'center'
     },
     btnStyle:{
         backgroundColor: '#90D3DB',
         justifyContent: 'center',
         alignItems: 'center',
         height: 40,
         width: 100,
         alignSelf:'center',
         borderRadius: 20
     }
 })
export default Auth;