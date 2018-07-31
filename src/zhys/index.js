import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


import { LoadPageScreen } from './loadpage';
import { LoginScreen } from './login';
import { HomeScreen } from './home';
import { DeviceListScreen } from './devicelist';
import { Text, Icon, Image } from '../components';
import { Global } from './global';
import { DeviceDetailScreen } from './devicedetail';
import { PositionServiceScreen } from './positionservice';
import { PoliceNewScreen } from './policenew';
import { PoliceHistoryScreen } from './policehistory';
import { FenceListScreen } from './fencelist';
import { FenceAvailableListScreen } from './fenceavailablelist';
import { FenceAddScreen } from './fenceadd';
import { FenceDetailScreen } from './fencedetail';
import { TrackplaybackScreen } from './trackplayback';
import { AllListScreen } from './alllist';
import { UserScreen } from './user';
import { AboutScreen } from './about';
import { FeedbackScreen } from './feedback';

const Content = StackNavigator({
    /**
     * 车辆管理页面，该页面已经用不到
     */
    DeviceList: {
        screen: DeviceListScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '车辆管理',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 设备详情页面
     */
    DeviceDetail: {
        screen: DeviceDetailScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '设备号:' + navigation.state.params.title,
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 报警历史页面
     */
    PoliceHistory: {
        screen: PoliceHistoryScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '设备号:' + navigation.state.params.title,
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 设备预警页面
     */
    PoliceNew: {
        screen: PoliceNewScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '设备预警',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTitleStyle: { alignSelf: 'center' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
            headerRight: <Button style={{ width: 44, height: 44 }} title="Press Me" />
        })
    },
    /**
     * 最新定位页面
     */
    PositionService: {
        screen: PositionServiceScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '最新定位',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTitleStyle: { alignSelf: 'center' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
            headerRight: <TouchableOpacity style={{ width: 44, height: 44 }}></TouchableOpacity>
        })
    },
    /**
     * 围栏列表页面
     */
    FenceList: {
        screen: FenceListScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '围栏管理',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => { navigation.navigate('FenceAdd') }} style={{ marginRight: 10 }}><Image src={require('./img/addfence.png')} width={44} height={44} /></TouchableOpacity>
        })
    },
    /**
     * 可选择围栏页面
     */
    FenceAvailableList: {
        screen: FenceAvailableListScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '可选围栏列表',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 围栏添加列表
     */
    FenceAdd: {
        screen: FenceAddScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '添加围栏',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 围栏详情列表
     */
    FenceDetail: {
        screen: FenceDetailScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: navigation.state.params.title,
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 轨迹回放页面
     */
    Trackplayback: {
        screen: TrackplaybackScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '轨迹回放',
            headerBackTitle: '返回',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },

    /**
     * 关于我们页面
     */
    About: {
        screen: AboutScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '关于我们',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
    /**
     * 问题建议页面
     */
    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
            headerTitle: '意见反馈',
            headerStyle: { backgroundColor: '#3285ff' },
            headerTintColor: '#fff',
            headerLeft: <TouchableOpacity onPress={() => { navigation.goBack(null) }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity>,
        })
    },
});
export const Index = StackNavigator({
    /**
     * 加载渲染页
     */
    LoadPage: {
        screen: LoadPageScreen,
        navigationOptions: ({ navigation, screenProps, navigationOptions }) => {
            return {
                header: null
            }
        }
    },
    /**
     * 登录页
     */
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 主页
     */
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 用户中心页面
     */
    User: {
        screen: UserScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 全国统计页面
     */
    AllList: {
        screen: AllListScreen,
        navigationOptions: {
            header: null
        }
    },
    DeviceList: {
        screen: DeviceListScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 设备详情页面
     */
    DeviceDetail: {
        screen: DeviceDetailScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 报警历史页面
     */
    PoliceHistory: {
        screen: PoliceHistoryScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 设备预警页面
     */
    PoliceNew: {
        screen: PoliceNewScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 最新定位页面
     */
    PositionService: {
        screen: PositionServiceScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 围栏列表页面
     */
    FenceList: {
        screen: FenceListScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 可选择围栏页面
     */
    FenceAvailableList: {
        screen: FenceAvailableListScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 围栏添加列表
     */
    FenceAdd: {
        screen: FenceAddScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 围栏详情列表
     */
    FenceDetail: {
        screen: FenceDetailScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 轨迹回放页面
     */
    Trackplayback: {
        screen: TrackplaybackScreen,
        navigationOptions: {
            header: null
        }
    },

    /**
     * 关于我们页面
     */
    About: {
        screen: AboutScreen,
        navigationOptions: {
            header: null
        }
    },
    /**
     * 问题建议页面
     */
    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: {
            header: null
        }
    },

},
    {
        // mode:'modal',安卓实现左右跳转动画
        headerMode: 'screen',
        transitionConfig: () => ({
            // 只要修改最后的forVertical就可以实现不同的动画了。
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
        })


    });