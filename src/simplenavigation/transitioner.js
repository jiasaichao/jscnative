import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button, PanResponder } from 'react-native';
import { tSwitch } from './type/enum';
import { config } from './config';
let pwidth = Dimensions.get('screen').width;
// 缺省屏幕过渡动画设置,可以被覆盖
const DefaultTransitionSpec = {
  duration: 250, // 250毫秒
  easing: Easing.inOut(Easing.ease),
  timing: Animated.timing
};
type P = {
  switch: tSwitch,
  /**排序 */
  sort: number
};
export class Transitioner extends Component<P> {
  state = { position: new Animated.Value(this.props.position) };
  constructor(props) {
    super(props);
    switch (this.props.switch) {
      case 'current':
        this.state.position = new Animated.Value(0);
        break;
      case 'backCurrent':
        this.state.position = new Animated.Value(config.backStartPosition);
        break;
      case 'pushCurrent':
        this.state.position = new Animated.Value(pwidth);
        break;
      //这两种情况应该不会有，因为正常情况不能上来就隐藏
      case 'backHide':
      case 'pushHide':
        this.state.position = new Animated.Value(0);
        break;
    }
  }
  render() {
    const { sort } = this.props;
    return (
      <Animated.View
        style={{
          backgroundColor: '#f66',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: sort,
          // backgroundColor: '#E9E9EF',
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          transform: [{ translateX: this.state.position }]
        }}
        // style={{
        //   transform: [{ translateX: this.state.value }]
        // }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
  componentDidMount() {
    switch (this.props.switch) {
      case 'current':
        break;
      case 'backCurrent':
      case 'pushCurrent':
        Animated.timing(this.state.position, {
          ...DefaultTransitionSpec,
          toValue: 0,
          useNativeDriver: true
        }).start();
        break;
      case 'backHide':
        Animated.timing(this.state.position, {
          ...DefaultTransitionSpec,
          toValue: config.backStartPosition,
          useNativeDriver: true
        }).start();
        break;
      case 'pushHide':
        Animated.timing(this.state.position, {
          ...DefaultTransitionSpec,
          toValue: pwidth,
          useNativeDriver: true
        }).start();
        break;
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }
  shouldComponentUpdate() {
    return false;
  }
}
