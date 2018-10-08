import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { db } from './services';
import { Provider, observer, inject } from 'mobx-react/native';

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
  static navigationOptions = () => ({
    headerTitle: '待办事项',
    headerRight: (
      <Button
        onPress={() => {
          // navigation.getParam('add')();
          // navigation.goBack();
        }}
        title="完成"
        color="#fff"
      />
    )
  });
  input = {
    text: ''
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#666' }}>
        <StatusBar barStyle="light-content" />
        <InputContent
          onChangeText={text => {
            // console.log(text);
            this.input.text = text;
          }}
        />
      </View>
    );
  }
  componentDidMount() {
    // this.props.navigation.setParams({ add: this.add });
  }
  add = () => {
    // this.props.store.add({ name: this.input.text, content: this.input.text });
    // this.setState({ notes: db.notes.getData() });
    // db.notes.add({ name: this.input.text, content: this.input.text });
    // nav.goBack();
    // navigationservice.navigate.
  };
}
