import React from 'react';
import { 
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet
  } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerItems
} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack'
import MainScreen from './src/screens/screens/MainScreen'
import CategoriesScreen from './src/screens/screens/CategoriesScreen'
import AuthScreen from './src/screens/screens/AuthScreen'
import BasketScreen from './src/screens/screens/BasketScreen'
import RegisterScreen from './src/screens/screens/RegisterScreen'
import FivoriteScreen from './src/screens/screens/FavoriteScreen'
import ProductListScreen from './src/screens/screens/ProductListScreen'
import ProductScreen from './src/screens/screens/ProductScreen'
import { Provider } from 'react-redux'
import store from './api/store/index'

import {NavigationActions} from 'react-navigation';

class drawerContentComponents extends React.Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Auth') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Auth') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Auth')}>Вход/Регистрация</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Main') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Main') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Main')}>Главная</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Fivorite') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Fivorite') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Fivorite')}>Избранное</Text>
                </View>
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Categories') ? styles.activeBackgroundColor : null]}>
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Categories') ? styles.selectedTextStyle : null]} onPress={this.navigateToScreen('Categories')}>Категории</Text>
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 60,
        width: '100%',
    },
    screenStyle: {
        height: 50,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomColor:'#ffffff',
        borderBottomWidth:1
    },
    screenTextStyle:{
        fontSize: 16,
        marginLeft: 20, 
        textAlign: 'center',
        color:'#ffffff'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#434343'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});

const StackCategories = createStackNavigator ({
  Categories: {
    screen: CategoriesScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Basket: {
    screen: BasketScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  ProductList:{
    screen: ProductListScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Product:{
    screen: ProductScreen,
    navigationOptions:{
      headerShown: false
    }
  },

},
{
  initialRouteName: 'Categories'
})

const StackNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    navigationOptions:{
      headerShown: false
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions:{
      headerShown: false
    }
  },
 
},)

const DrawerNavigator = createDrawerNavigator({
  Auth: {
    screen: StackNavigator,
    navigationOptions:{
      title:'Вход/Регистрация'
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions:{
      title:'Главная'
    }
  },
  Fivorite: {
    screen: FivoriteScreen,
    navigationOptions:{
      title:'Избранное'
    }
  },
  Categories: {
    screen: StackCategories,
    navigationOptions:{
      title:'Категории'
    }
  },
},{
  contentComponent: drawerContentComponents,
  drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    useNativeAnimations: true,
  initialRouteName: 'Main',
  drawerBackgroundColor: '#2d2d2d',
  drawerType: 'front',
  overlayColor:'rgba(67,67,67,0.8)',
  contentOptions:{
    activeBackgroundColor:'white',
    activeTintColor:'#263238',
    inactiveTintColor:'#ffffff',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    },
    labelStyle:{
      fontSize:14
    },
  },
  navigationOptions:{
    
  }
})

const AppContainer = createAppContainer(DrawerNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
    
  );
}

