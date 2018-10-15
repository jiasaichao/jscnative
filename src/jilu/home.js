import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
import { db } from './services';
import { Category } from './entity';
import { Provider, observer, inject } from 'mobx-react/native';
import { noteStore } from './store';
import { SimpleNavigation, Action } from '../simplenavigation';
import { utils } from '../simplenavigation/utils';
import { Page } from './components/page';
// import SQLiteStorage from 'react-native-sqlite-storage';
// SQLiteStorage.DEBUG(true);

@observer
// @inject('store')
export class HomeScreen extends React.Component {
  static navigationOptions = {
    // title: '首页',
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          Action.push('Add');
        }}
      >
        <Text style={{ color: '#fff', fontSize: 15 }}>添加</Text>
      </TouchableOpacity>
    ),
    // headerBackground: '#f66',
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
      <Page>
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
      </Page>
    );
  }
  async componentDidMount() {
    // debugger;
    await db.init();
    await noteStore.getData();
  }
}
