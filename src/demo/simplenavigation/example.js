import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import nav, { push, goBack } from './index';
import { Icon } from '../../components/icon';
class LoginScreen extends React.Component {
    // static navigationOptions = {
    //   title: 'Welcome',
    // };
    render() {
        const { navigate } = this.props.navigation;
        console.log('参数', this.props.navigation.state.params);
        return (
            <View>
                <Text>登录页面</Text>
                <Button
                    onPress={() => {
                        push('App2');
                        // navigate('Content', {}, NavigationActions.navigate({ routeName: 'App2' }))
                    }}
                    title="跳转到App2"
                />
            </View>
        );
    }
}
class App1Screen extends React.Component {
    // static navigationOptions = {
    //   title: 'Welcome',
    // };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => push('App2', { user: 'Lucy' })}
                    title="跳转到App2"
                />
            </View>
        );
    }
}
class App2Screen extends React.Component {
    // static navigationOptions = {
    //   title: 'Welcome',
    // };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => { push('App3') }}
                    title="跳转到第三页"
                />
                <Button
                    onPress={goBack}
                    title="返回"
                />
            </View>
        );
    }
}
class App3Screen extends React.Component {
    // static navigationOptions = {
    //   title: 'Welcome',
    // };
    render() {
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={goBack}
                    title="返回"
                />
            </View>
        );
    }
}
const SimpleApp = nav([
    { name: 'Login', Component: LoginScreen, options: { header: null } },
    { name: 'App1', Component: App1Screen, options: { headerTitle: '首页', headerLeft: <TouchableOpacity onPress={goBack} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#fff' height={24} width={24} /></TouchableOpacity> } },
    { name: 'App2', Component: App2Screen, options: { headerTitle: '第二页', headerLeft: <TouchableOpacity onPress={()=>{goBack()}} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#222' height={24} width={24} /></TouchableOpacity>  } },
    { name: 'App3', Component: App3Screen, options: { headerTitle: '第三页', headerLeft: <TouchableOpacity onPress={()=>{goBack()}} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} ><Icon name='arrowLeft' color='#222' height={24} width={24} /></TouchableOpacity> } }
])
const defaultStateAction = SimpleApp.router.getStateForAction;
SimpleApp.router.getStateForAction = (action, state) => {
    console.log('ffff', action, state);
    return defaultStateAction(action, state);
}
export default class App extends React.Component {
    render() {
        return <SimpleApp />;
    }
}
