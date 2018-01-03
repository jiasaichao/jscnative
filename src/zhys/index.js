import React from 'react';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './login';
import { HomeScreen } from './home';
import { ClListScreen } from './cllist';
const Content = StackNavigator({
    // Home: {
    //     screen: HomeScreen,
    //     navigationOptions: {
    //         headerTitle: '智慧运输',
    //         headerBackTitle: null,
    //         headerStyle: { backgroundColor: '#3285ff', borderWidth: 0 },
    //         // headerTitleStyle:{color:'#fff'},
    //         // headerBackTitle:null,
    //         headerTintColor: '#fff',
    //     }
    // },
    ClList: {
        screen: ClListScreen,
        path:'/cllist',
        navigationOptions: {
            headerTitle: '车辆管理',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            // headerTitleStyle:{color:'#fff'},
            // headerBackTitle:null,
            headerTintColor: '#fff'
        }
    }
});
export const Index = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Content:{
        screen: Content,
        navigationOptions: {
            header: null
        }
    }
});