import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Button } from 'react-native';
import { db } from './services';
import { Provider, observer, inject } from 'mobx-react/native';
import { noteStore } from './store';
import { SimpleNavigation } from '../simplenavigation';
import { utils } from '../simplenavigation/utils';
import { Page } from './components/page';
import paa from 'pouchdb-adapter-asyncstorage';
import RxDB from 'rxdb';
RxDB.plugin(paa);
const dbName = 'heroesreactdatabase1';

@observer
// @inject('store')
export class HomeScreen extends React.Component {
  static navigationOptions = {
    // title: '首页',
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          utils.simpleNavigation.push('Add');
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
  async createDatabase() {
    const db = await RxDB.create({
      name: dbName,
      adapter: 'asyncstorage',
      password: 'myLongAndStupidPassword',
      multiInstance: false
    });
    const heroCollection = await db.collection({
      name: 'heroes',
      schema: {
        version: 0,
        title: 'human schema no compression',
        keyCompression: true,
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            index: true // <- an index for firstName will now be created
          },
          lastName: {
            type: 'string'
          },
          familyName: {
            type: 'string'
          }
        },
        compoundIndexes: [
          ['lastName', 'familyName'] // <- this will create a compound-index for these two fields
        ]
      }
    });
    // heroCollection.sync({
    //   remote: syncURL + dbName + '/',
    //   options: {
    //     live: true,
    //     retry: true
    //   }
    // });
    return db;
  }
}
