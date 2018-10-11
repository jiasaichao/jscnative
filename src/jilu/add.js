import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { db } from './services';
import { Provider, observer, inject } from 'mobx-react/native';
import { Page } from './components/page';
import { SimpleNavigation, Action } from '../simplenavigation';
import { noteStore } from './store';
import { utils } from '../simplenavigation/utils';
// import RxDB from 'rxdb';
const InputContent = styled.TextInput.attrs({
  multiline: true,
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: true,
  onChangeText: props => props.onChangeText
})`
  flex: 1;
`;
// @inject('store')
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ id }) => {
    return {
      headerTitle: '待办事项',
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            utils.getNavigationThisById(id).add();
            // _this.add();
            Action.back();
            // navigation.getParam('add')();
            // navigation.goBack();
          }}
        >
          <Text style={{ color: '#fff', fontSize: 15 }}>完成</Text>
        </TouchableOpacity>
      )
    };
  };
  input = {
    text: ''
  };
  render() {
    return (
      <Page>
        <StatusBar barStyle="light-content" />
        <InputContent
          onChangeText={text => {
            // console.log(text);
            this.input.text = text;
          }}
        />
      </Page>
    );
  }
  componentDidMount() {
    // this.props.navigation.setParams({ add: this.add });
  }
  add = () => {
    noteStore.add({ name: this.input.text, content: this.input.text });
    // this.props.store.add({ name: this.input.text, content: this.input.text });
    // this.setState({ notes: db.notes.getData() });
    // db.notes.add({ name: this.input.text, content: this.input.text });
    // nav.goBack();
    // navigationservice.navigate.
  };
}
