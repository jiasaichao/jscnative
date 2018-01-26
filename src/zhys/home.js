import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
import { login } from './services';
/**
 * 登录
 */
export class HomeScreen extends React.Component {
    static navigationOptions = {
        // title: 'Welcome',
    };
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ height: Dimensions.get('screen').height }}>
                <StatusBar barStyle='light-content' translucent={true} />
                <Flex HW style={{ height: 44, backgroundColor: '#3285ff', paddingTop: (Platform.OS === 'ios') ? 20 : 10 }}>
                    <Text fontSize={18} color='#fff' label='智慧运输' />
                </Flex>
                <Flex height='5rem' width='100%'>
                    <Image height={214} width='100%' src={require('./img/banner.png')} />
                </Flex>
                <Flex flex1 column style={{ paddingLeft: 38, paddingRight: 38, backgroundColor: '#fff' }}>
                    <TouchableOpacity
                        style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#d8d8d8', paddingTop: 15, paddingBottom: 15 }}>
                        <Flex>
                            <Flex HW style={{ width: 70, height: 70, marginRight: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d1d1' }}>
                                <Image width={45} height={45} src={require('./img/DefaultAvatar.png')} />
                            </Flex>
                            <Flex column horizontal>
                                <Text label='全国统计' fontSize={16} color='#6089f4' style={{ marginBottom: 15 }} />
                                <Text label='即时为您更新、展示最新数据' fontSize={14} color='#a1a1a1' />
                            </Flex>
                        </Flex>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('Content', {}, NavigationActions.navigate({ routeName: 'ClList' }))
                    }}
                        style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#d8d8d8', paddingTop: 15, paddingBottom: 15 }}>
                        <Flex>
                            <Flex HW style={{ width: 70, height: 70, marginRight: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d1d1' }}>
                                <Image width={45} height={45} src={require('./img/DefaultAvatar.png')} />
                            </Flex>
                            <Flex column horizontal>
                                <Text label='车辆管理' fontSize={16} color='#6089f4' style={{ marginBottom: 15 }} />
                                <Text label='即时为您更新、展示最新数据' fontSize={14} color='#a1a1a1' />
                            </Flex>
                        </Flex>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ height: 100, borderBottomWidth: 1, borderBottomColor: '#d8d8d8', paddingTop: 15, paddingBottom: 15 }}>
                        <Flex>
                            <Flex HW style={{ width: 70, height: 70, marginRight: 15, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d1d1' }}>
                                <Image width={45} height={45} src={require('./img/DefaultAvatar.png')} />
                            </Flex>
                            <Flex column horizontal>
                                <Text label='围栏管理' fontSize={16} color='#6089f4' style={{ marginBottom: 15 }} />
                                <Text label='即时为您更新、展示最新数据' fontSize={14} color='#a1a1a1' />
                            </Flex>
                        </Flex>
                    </TouchableOpacity>
                </Flex>
            </View>
        );
    }
    handleLogin = () => {

    }
}