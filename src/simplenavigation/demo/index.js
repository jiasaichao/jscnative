import React, { Component } from 'react';
import { NavigationBar } from '../navigationbar';

export class NavigationBarDemo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationBar
        data={{
          left: '返回',
          title: '标题',
          right: '设置'
        }}
      />
    );
  }
}
