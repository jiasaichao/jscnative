import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button } from 'react-native';
let pwidth = Dimensions.get('screen').width;
type Nav = {
  /**屏幕组件，也就是要展示的组件 */
  screen: React.ReactElement,
  /**排序，越小越在底层，这个值影响zindex */
  sort: number
};
/**
 * 一个包含所有内容的导航
 */
let navigation: Nav = [{ screen: '', sort: '' }];

// 缺省屏幕过渡动画设置,可以被覆盖
const DefaultTransitionSpec = {
  duration: 250, // 250毫秒
  easing: Easing.inOut(Easing.ease),
  timing: Animated.timing
};
// const DefaultTransitionSpec = {
//   timing: Animated.spring,
//   stiffness: 1000,
//   damping: 500,
//   mass: 3
// };

export default class Example extends Component {
  state = {
    screen: [],
    value: new Animated.Value(pwidth),
    value2: new Animated.Value(0)
  };
  constructor(props) {
    super(props);
    // console.log('222', this.props.story);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
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
            zIndex: 3,
            // backgroundColor: '#E9E9EF',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            transform: [{ translateX: this.state.value }]
          }}
          // style={{
          //   transform: [{ translateX: this.state.value }]
          // }}
        >
          <View
            style={{
              backgroundColor: '#f66',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
          >
            <Text style={{ color: '#222' }}>home1111111111111111111111111111111111111</Text>
          </View>
        </Animated.View>
        <View style={{ marginTop: 30, position: 'absolute', zIndex: 77 }}>
          <Button title="确定" onPress={this.queding} />
        </View>
        <View style={{ marginTop: 30, left: 80, position: 'absolute', zIndex: 77 }}>
          <Button title="返回" onPress={this.fanhui} />
        </View>

        <Animated.View
          style={{
            backgroundColor: '#E9E9EF',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 2,
            transform: [{ translateX: this.state.value2 }]
          }}
          // style={{
          //   transform: [{ translateX: this.state.value }]
          // }}
        >
          <View
            style={{
              // backgroundColor: '#f66',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
          >
            <Text style={{ color: '#222' }}>home22222222222222222222222222222222222</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
  queding = () => {
    Animated.parallel([
      Animated.timing(this.state.value, {
        ...DefaultTransitionSpec,
        toValue: 0,
        useNativeDriver: true
        // duration: 2000,
        // easing: Easing.linear // 线性的渐变函数
      }),
      Animated.timing(this.state.value2, {
        ...DefaultTransitionSpec,
        toValue: -100,
        useNativeDriver: true
        // duration: 2000,
        // easing: Easing.linear // 线性的渐变函数
      })
    ]).start();
  };
  fanhui = () => {
    Animated.parallel([
      Animated.timing(this.state.value, {
        ...DefaultTransitionSpec,
        toValue: pwidth,
        useNativeDriver: true
        // duration: 2000,
        // easing: Easing.linear // 线性的渐变函数
      }),
      Animated.timing(this.state.value2, {
        ...DefaultTransitionSpec,
        toValue: 0,
        useNativeDriver: true
        // duration: 2000,
        // easing: Easing.linear // 线性的渐变函数
      })
    ]).start();
  };
  componentDidMount() {
    setTimeout(() => {}, 1000);
  }
}
