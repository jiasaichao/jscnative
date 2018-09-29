import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button, PanResponder } from 'react-native';
import { utils } from './utils';
import { tSwitch } from './type/enum';
import { Transitioner } from './transitioner';
import { config } from './config';
import { Nav } from './type/nav';
import { ScreenContainer } from './screencontainer';
import { SimpleNavigation } from './simplenavigation';
let pwidth = Dimensions.get('screen').width;
config.screenWidth = pwidth;

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Home'
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#f66',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Text style={{ color: '#222' }}>home1111111111111111111111111111111111111</Text>
      </View>
    );
  }
}
class UserScreen extends React.Component {
  static navigationOptions = {
    headerTitle: '我的'
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#66f',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <Text style={{ color: '#222' }}>home22222222222222222222222222222222222</Text>
      </View>
    );
  }
}

const App = new SimpleNavigation(
  {
    A1: { screen: HomeScreen },
    A2: { screen: UserScreen }
  },
  { initialRouteName: 'A1' }
);
export default class App1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return App.screenView1;
  }
}
