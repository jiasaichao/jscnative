/**
 * Created by 卓原 on 2017/6/16.
 *功能：可以拖拽的小球，当松开那一刻判断小球是属于屏幕左边还是屏幕右边，
 * 属于左边则让小球紧靠屏幕左边，如靠屏幕右侧，则让小球紧靠屏幕右侧。
 */

import React from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';

var _previousLeft = 0;
var _previousTop = 0;

var lastLeft = 0;
var lastTop = 0;

const CIRCLE_SIZE = 80;
export default class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { backgroundColor: 'blue' }
    };
    this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
    this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
    this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderRelease = this.onPanResponderRelease.bind(this);
  }

  componentWillMount(evt, gestureState) {
    this._panResponder = PanResponder.create({
      //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，
      // 当返回true的时候则可以进行之后的事件传递。
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,

      //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,

      //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
      onPanResponderGrant: this.onPanResponderGrant,

      //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
      onPanResponderMove: this.onPanResponderMove,

      //用户放开了所有的触摸点，且此时视图已经成为了响应者。
      onPanResponderRelease: this.onPanResponderRelease,

      //另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: this.onPanResponderEnd
    });
  }

  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder(evt, gestureState) {
    return true;
  }

  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder(evt, gestureState) {
    return true;
  }

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant(evt, gestureState) {
    console.log('onPanResponderGrant...');
    this.setState({
      style: {
        backgroundColor: 'red',
        left: _previousLeft, //_previousLeft和_previousTop是两个变量，用来记录小球移动坐标
        top: _previousTop
      }
    });
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState) {
    _previousLeft = lastLeft + gestureState.dx;
    _previousTop = lastTop + gestureState.dy;

    //主要是限制小球拖拽移动的时候不许出屏幕外部
    if (_previousLeft <= 0) {
      _previousLeft = 0;
    }
    if (_previousTop <= 0) {
      _previousTop = 0;
    }

    if (_previousLeft >= Dimensions.get('window').width - CIRCLE_SIZE) {
      _previousLeft = Dimensions.get('window').width - CIRCLE_SIZE;
    }
    if (_previousTop >= Dimensions.get('window').height - CIRCLE_SIZE) {
      _previousTop = Dimensions.get('window').height - CIRCLE_SIZE;
    }

    //实时更新
    this.setState({
      style: {
        backgroundColor: 'red',
        left: _previousLeft,
        top: _previousTop
      }
    });
  }

  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderRelease(evt, gestureState) {
    lastLeft = _previousLeft;
    lastTop = _previousTop;

    this.changePosition();
  }

  /**
     根据位置做出相应处理
     **/
  changePosition() {
    if (_previousLeft + CIRCLE_SIZE / 2 <= Dimensions.get('window').width / 2) {
      _previousLeft = lastLeft = 0;

      this.setState({
        style: {
          left: _previousLeft,
          top: _previousTop
        }
      });
    } else {
      _previousLeft = lastLeft = Dimensions.get('window').width - CIRCLE_SIZE;

      this.setState({
        style: {
          left: _previousLeft,
          top: _previousTop
        }
      });
    }
  }

  render() {
    return <View {...this._panResponder.panHandlers} style={[styles.circle, this.state.style]} />;
  }
}
const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'green',
    position: 'absolute'
  }
});
