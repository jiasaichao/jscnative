import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from '../../components';


class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'Welcome',
  // };
  render() {
    const { navigate } = this.props.navigation;
    global.cccc1=navigate;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="跳转到第一页"
        />
        <Button
          onPress={() => {
            navigate('Chat', { user: 'Lucy' }, NavigationActions.navigate({
              routeName: 'Chat2Screen', params
                :
                { user: "Lucy" }
            }))
          }
            // navigate('Chat2Screen', {user: 'Lucy' })
          }
          title="跳转到第二页"
        />
      </View>
    );
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    // const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Button
          onPress={() => global.cccc1('Chat2Screen', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
        <Text>参数：{JSON.stringify(params)}</Text>
      </View>
    );
  }
}
class Chat2Screen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy222',
  };
  render() {
    // const { navigate } = this.props.navigation;
    // console.log('是否相等'+(global.cccc1==navigate));
    const { params } = this.props.navigation.state;
    console.log('参数', this.props.navigation.state);
    return (
      <View>
      <Button
        
        onPress={() => {
          global.cccc1('Chat', { user: 'Lucy' }, NavigationActions.navigate({
            routeName: 'Chat2Screen', params
              :
              { user: "Lucy" }
          }))
        }}
        title="2222222"
      />
        <Text>参数：{JSON.stringify(params)}</Text>
      </View>
    );
  }
}
export const SimpleApp0 = StackNavigator({
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
      headerTitle: '第一页',
      headerBackTitle: '返回',
      headerStyle: { backgroundColor: '#3285ff' },
      // headerTitleStyle:{color:'#fff'},
      // headerBackTitle:null,
      headerTintColor: '#fff',
      headerLeft: <TouchableOpacity style={{ paddingLeft: 4, paddingRight: 5 }} onPress={() => { navigation.goBack(null) }}><Icon name='arrowLeft' color='#fff' height={25} width={25} /></TouchableOpacity>
    })
  },
  Chat2Screen: {
    screen: Chat2Screen,
    navigationOptions: ({ navigation, screenProps, navigationOptions }) => ({
      headerTitle: '第二页',
      headerBackTitle: '返回',
      headerStyle: { backgroundColor: '#3285ff' },
      // headerTitleStyle:{color:'#fff'},
      // headerBackTitle:null,
      headerTintColor: '#fff',
      headerLeft: <TouchableOpacity style={{ paddingLeft: 4, paddingRight: 5 }} onPress={() => { navigation.goBack(null) }}><Icon name='arrowLeft' color='#fff' height={25} width={25} /></TouchableOpacity>
    })
  }
});
export const SimpleApp = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Chat: {
    screen: SimpleApp0,
    navigationOptions: {
      header: null
    }
  },
});
const defaultStateAction = SimpleApp.router.getStateForAction;
SimpleApp.router.getStateForAction = (action, state) => {
  // console.log('ffff', action, state);
  return defaultStateAction(action, state);
}
export default class App extends React.Component {
  render() {
    return <SimpleApp />;
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
