import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
// import { createStackNavigator } from 'react-navigation';
// import NavigationService from './navigationservice';
import Add from './add';
import Setting from './setting';
import { db } from './services';
import navigationservice from './navigationservice';
import { Provider, observer, inject } from 'mobx-react/native';
import { noteStore } from './store';
import { SimpleNavigation } from '../simplenavigation';
import { Icon } from '../components/icon';
import { HomeScreen } from './home';

const App1 = new SimpleNavigation(
  {
    Home: { screen: HomeScreen },
    Add: { screen: Add }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerBackground: '#57B784',
      headerTitleStyle: { color: '#fff' },
      headerLeftStyle: { paddingLeft: 0 },
      headerBackImage: <Icon name="arrowLeft" height="24" width="46" color="#fff" />
    }
  }
);
export default App1;
