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

@observer
// @inject('store')
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
    headerRight: (
      <TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 15 }}>添加</Text>
      </TouchableOpacity>
    ),
    headerLeft: (
      <Button
        onPress={() => {
          // NavigationService.navigate('Setting');
        }}
        title="设置"
        color="#fff"
      />
    ),
    headerTitle: '首页'
  };
  constructor(props) {
    super(props);
    // console.log('222', this.props.story);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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

const App1 = new SimpleNavigation(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#57B784'
      },
      headerTitleStyle: { color: '#fff' },
      headerLeftStyle: { paddingLeft: 0 },
      headerBackImage: <Icon name="arrowLeft" height="24" width="46" color="#fff" />
    }
  }
);
export default App1;
