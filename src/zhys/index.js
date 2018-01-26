import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './login';
import { HomeScreen } from './home';
import { ClListScreen } from './cllist';
import { Text, Icon } from '../components';
import { Global } from './global';
import { DeviceDetailScreen } from './devicedetail';
import { PositionServiceScreen } from './positionservice';
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
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '车辆管理',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            // headerTitleStyle:{color:'#fff'},
            // headerBackTitle:null,
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }}><Icon name='arrowLeft' color='#fff' height={25} width={25} /></TouchableOpacity>
        })
    },
    DeviceDetail: {
        screen: DeviceDetailScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '设备号'+navigation.state.params.title,
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            // headerTitleStyle:{color:'#fff'},
            // headerBackTitle:null,
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }}><Icon name='arrowLeft' color='#fff' height={25} width={25} /></TouchableOpacity>
        })
    },
    PositionService:{
        screen: PositionServiceScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '实时跟踪',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            // headerTitleStyle:{color:'#fff'},
            // headerBackTitle:null,
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }}><Icon name='arrowLeft' color='#fff' height={25} width={25} /></TouchableOpacity>
        })
    }
});
export const Index = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => {
            Global.navigation = navigation;
            return {
                header: null
            }
        }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Content: {
        screen: Content,
        navigationOptions: {
            header: null
        }
    }
});