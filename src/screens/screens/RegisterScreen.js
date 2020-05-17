import React from 'react'
import {
    View,Text,SafeAreaView,StyleSheet,TextInput,TouchableOpacity
} from 'react-native'
import Header from '../Components/Header'

const LoginInput =()=>{
    return(
        <View style={styles.view}>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.viewStyle}>
                <TextInput placeholder={'youremail@gmail.com'}/>
            </View>
        </View>
    )
}
const NameInput =()=>{
    return(
        <View style={styles.view}>
            <Text style={styles.textStyle}>Имя</Text>
            <View style={styles.viewStyle}>
                <TextInput placeholder={'your name'}/>
            </View>
        </View>
    )
}
const PasswordInput =({title})=>{
    return(
        <View style={styles.view}>
            <Text style={styles.textStyle}>{title}</Text>
            <View style={styles.viewStyle}>
                <TextInput secureTextEntry={true} placeholder={'* * * * * * * *'}/>
            </View>
        </View>
    )
}

class Register extends React.Component {
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor: '#EAEAEA',}}>
            <Header headerText={'Регистрация'} pressMenu ={()=>this.props.navigation.openDrawer()}
                            pressBasket = {()=>this.props.navigation.navigate('Basket')}/>
            <View style={styles.container}>
                <LoginInput />
                <NameInput />
                <PasswordInput title={'Пароль'}/>
                <PasswordInput title={'Повторите пароль'}/>
                <TouchableOpacity style={styles.btnStyle}>
                    <Text style={{textTransform:'uppercase',color:'#ffffff'}}>Регистрация</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container:{
         flex:1,
         
         paddingTop:20,
     },
     view:{
         paddingHorizontal:10,
         paddingBottom: 15
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
         backgroundColor:'#90D3DB',
         justifyContent:'center',
         alignItems:'center',
         height:40,
         width: 150,
         borderRadius: 20,
         alignSelf:'center'
     }
 })
export default Register;