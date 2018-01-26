import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from "antd-mobile";

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button>default</Button>
                <Text>Hello, Chat App!</Text>
                {/* <Button
                    onPress={() => navigate('Chat', { user: 'Lucy' })}
                    title="Chat with Lucy"
                /> */}
            </View>
        );
    }
}

export const SimpleApp = StackNavigator({
    Home: {
        screen: HomeScreen,
    }
});
