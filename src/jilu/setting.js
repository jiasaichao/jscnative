import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import styled from 'styled-components/native';
import nav from './navigationservice';
import { db } from './services';
import { Provider, observer, inject } from 'mobx-react/native';
import { Button, ListRow } from 'teaset';

@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '设置'
  });
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListRow title="删除数据库" onPress={() => alert('Press!')} />
        {/* <Button title="Default" onPress={() => alert('Hello world')} /> */}
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
  componentDidMount() {}
}
