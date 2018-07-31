import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import NavigationService from './navigationservice';
import Add from './add';
import Setting from './setting';
import { db } from './services';
import navigationservice from './navigationservice';
import { Provider, observer, inject } from 'mobx-react/native';
import { noteStore } from './store';

@observer
// @inject('store')
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
    headerRight: (
      <Button
        onPress={() => {
          NavigationService.navigate('Add');
        }}
        title="添加"
        color="#fff"
      />
    ),
    headerLeft: (
      <Button
        onPress={() => {
          NavigationService.navigate('Setting');
        }}
        title="设置"
        color="#fff"
      />
    )
  };
  constructor(props) {
    super(props);
    // console.log('222', this.props.story);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ paddingLeft: 15 }}>
          {noteStore.list.map(item => (
            <TouchableOpacity key={item.$loki} style={{ alignItems: 'center', flexDirection: 'row', height: 48 }}>
              <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 1, borderColor: '#333' }} />
              <Text style={{ marginLeft: 15 }}>{item.name} </Text>
            </TouchableOpacity>
          ))}
          {/* {this.state.notes.map(item => (
            <TouchableOpacity key={item.$loki} style={{ alignItems: 'center', flexDirection: 'row', height: 48 }}>
              <TouchableOpacity style={{ height: 20, width: 20, borderWidth: 1, borderColor: '#333' }} />
              <Text style={{ marginLeft: 15 }}>{item.name} </Text>
            </TouchableOpacity>
          ))} */}
        </View>
        <Text>Home Screen</Text>
      </View>
    );
  }
  componentDidMount() {
    db.init().then(() => {
      noteStore.getData();
    });
    // db.init(() => {
    //   noteStore.getData();
    //   // console.log(this.props.store);
    //   // let notes = db.notes.getData();
    //   // this.setState({ notes });
    // });
  }
}
const TopLevelNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Add: {
      screen: Add
    },
    Setting: {
      screen: Setting
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#57B784'
      },
      headerTintColor: '#fff'
    }
  }
);
export default class App extends React.Component {
  // ...

  render() {
    return (
      <Provider store={noteStore}>
        <TopLevelNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
