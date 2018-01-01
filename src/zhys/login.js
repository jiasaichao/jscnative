import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
/**
 * 登录
 */
class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    input = {}
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Flex column style={{ padding: 15 }}>
                    <Flex HW style={{ marginTop: 110, marginBottom: 65 }}>
                        <Text label='智慧运输' color='#2299ee' fontSize={36} bold />
                    </Flex>
                    <Flex column style={{ width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#d1d1d1', borderRadius: 5 }}>
                        <Flex vertical style={{ borderBottomWidth: 1 / PixelRatio.get(), borderColor: '#d1d1d1', height: 41 }}>
                            <Text label='账号' color='#666' fontSize={15} style={{ marginLeft: 10, marginRight: 10 }} />
                            <TextInput onChange={(e) => { this.input.name = e.target.value }} style={{ borderWidth: 0, height: 35, flex: 1 }} />
                        </Flex>
                        <Flex vertical style={{ height: 41 }}>
                            <Text label='账号' color='#666' fontSize={15} style={{ marginLeft: 10, marginRight: 10 }} />
                            <TextInput onChange={(e) => { this.input.name = e.target.value }} style={{ borderWidth: 0, height: 35, flex: 1 }} />
                        </Flex>
                    </Flex>
                    <TouchableOpacity onPress={this.handleLogin} style={{ marginTop: 18, marginBottom: 14, justifyContent: 'center', alignItems: 'center', height: 38, backgroundColor: '#21b3ff', borderRadius: 5 }}>
                        <View>
                            <Text style={{ fontSize: 17 }} color='#fff' label='登录' />
                        </View>
                    </TouchableOpacity>
                </Flex>
            </View>
        );
    }
    handleLogin = () => {

    }
}

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat with Lucy',
    };
    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>
                {/* <Text>参数：{JSON.stringify(params)}</Text> */}
            </View>
        );
    }
}
export const Login = StackNavigator({
    Home: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    }
});
export const SimpleApp = StackNavigator({
    Home: {
        screen: Login,
    },
    Chat: { screen: ChatScreen },
});
export default class App extends React.Component {
    render() {
        return <Login />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
