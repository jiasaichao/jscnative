import React from 'react';
import { View } from 'react-native';
/**
 * Page组件
 *
 */
export class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={{ flex: 1, backgroundColor: '#FFF' }}>{this.props.children}</View>;
  }
}
