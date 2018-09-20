import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationBarProps } from './type/nav';
const defaultBackImage = require('./assets/back-icon.png');
export class NavigationBar extends Component<{ data: NavigationBarProps }> {
  constructor(props) {
    super(props);
  }
  render() {
    //#region 样式
    let styleRoot = {
      // backgroundColor: '#fff',
      position: 'absolute',
      left: 0,
      right: 0,
      height: 64,
      paddingTop: 20,
      paddingLeft: 15,
      paddingRight: 15,
      // borderBottomWidth: Theme.navSeparatorLineWidth,
      // borderBottomColor: Theme.navSeparatorColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    };
    let titleStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    };
    let leftStyle = {
      position: 'absolute',
      left: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 15
    };
    let rightStyle = {
      position: 'absolute',
      right: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 15
    };
    //#endregion
    let { title } = this.props.data;
    return (
      <View style={styleRoot}>
        <View style={titleStyle}>{this.renderElement(title)}</View>
        <View style={leftStyle}>
          <TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={defaultBackImage}
                style={{
                  height: 21,
                  width: 13,
                  //   marginLeft: 9,
                  marginRight: 8,
                  marginVertical: 12,
                  resizeMode: 'contain'
                }}
              />
              <Text style={{ fontSize: 15 }}>返回</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={rightStyle}>
          <Text style={{ fontSize: 15 }}>设置</Text>
        </View>
        {/* 
        <View style={titleStyle}>
          <Text style={{ fontSize: 18 }}>标题</Text>
        </View><View style={leftStyle}>
          <Image
            source={defaultBackImage}
            style={{
              height: 21,
              width: 13,
              marginLeft: 9,
              marginRight: 22,
              marginVertical: 12,
              resizeMode: 'contain'
            }}
          />
          <Text style={{ fontSize: 15 }}>返回</Text>
        </View>
        <View style={rightStyle}>
          <Text style={{ fontSize: 15 }}>设置</Text>
        </View> */}
      </View>
    );
  }
  renderElement(title) {
    if (React.isValidElement(title)) {
      return title;
    } else {
      return <Text style={{ fontSize: 18 }}>{title}</Text>;
    }
  }
}
