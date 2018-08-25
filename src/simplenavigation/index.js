import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button, PanResponder } from 'react-native';
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
/**拖拽释放后动画执行的最大时间ms，实际应小于此值因为剩余距离总是小于全部距离 */
const ANIMATION_DURATION = 500;

/**触发后退行为的阀值1/2则意味着移动了超过1/2则触发后退 */
const POSITION_THRESHOLD = 1 / 2;

/**
 * 拖拽距离超过此值，手势成立，才进行相应的处理
 */
const RESPOND_THRESHOLD = 20;
/**缺省情况下，水平方向上，拖拽起始点<25，拖拽手势被认可 */
const GESTURE_RESPONSE_DISTANCE_HORIZONTAL = 25;
/**缺省情况下，竖直方向上，拖拽起始点坐标<135，拖拽手势被认可 */
const GESTURE_RESPONSE_DISTANCE_VERTICAL = 135;
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
  position = {
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0
  };
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，
      // 当返回true的时候则可以进行之后的事件传递。
      // onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },
      //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
      // onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,

      //开始手势操作，也可以说按下去。给用户一些视觉反馈，让他们知道发生了什么事情！（如：可以修改颜色）
      onPanResponderGrant: this.onPanResponderGrant,

      //最近一次的移动距离.如:(获取x轴y轴方向的移动距离 gestureState.dx,gestureState.dy)
      onPanResponderMove: this.onPanResponderMove,

      //用户放开了所有的触摸点，且此时视图已经成为了响应者。
      onPanResponderRelease: this.onPanResponderRelease,

      //另一个组件已经成为了新的响应者，所以当前手势将被取消。
      onPanResponderTerminate: this.onPanResponderTerminate
    });
    // console.log('222', this.props.story);
  }
  render() {
    return (
      <View style={{ flex: 1 }} {...this._panResponder.panHandlers}>
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
  setValue = v => {
    console.log('v' + v);
    this.state.value.setValue(v);
  };
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
  /**另一个组件已经成为了新的响应者，当前手势被取消时的处理逻辑 */
  onPanResponderTerminate = () => {
    // 相应手势标记设置为 false， 表示不在响应手势过程中了
    // 立即返回到手势开始时那个场景屏幕
  };
  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder = (evt, gestureState) => {
    return true;
  };

  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder = (evt, gestureState) => {
    console.log(11111);
    //可以判断拖拽距离，拖拽位置等，是否取消这次拖拽
    // 拖拽距离足够大了吗 ？
    const hasDraggedEnough = gestureState.dx > RESPOND_THRESHOLD;
    console.log(hasDraggedEnough);
    // 是否要执行响应逻辑 ?
    const shouldSetResponder = hasDraggedEnough; //&& axisHasBeenMeasured && !isOnFirstCard;
    return shouldSetResponder;
  };

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant = (evt, gestureState) => {
    //1.停止动画
    //2.记录手势事件处理开始时的起始信息
    console.log('开始：' + gestureState.x0);
    console.log('onPanResponderGrant...');
    // this.setState({
    //   style: {
    //     backgroundColor: 'red',
    //     left: _previousLeft, //_previousLeft和_previousTop是两个变量，用来记录小球移动坐标
    //     top: _previousTop
    //   }
    // });
  };

  // 手势响应过程中当前卡片跟随触摸移动， 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove = (evt, gestureState) => {
    this.setValue(gestureState.dx);
    // console.log(gestureState.dx);
    // this.state.value.stopAnimation()
    // this.state.value.setValue()

    // _previousLeft = lastLeft + gestureState.dx;
    // _previousTop = lastTop + gestureState.dy;
    // //主要是限制小球拖拽移动的时候不许出屏幕外部
    // if (_previousLeft <= 0) {
    //   _previousLeft = 0;
    // }
    // if (_previousTop <= 0) {
    //   _previousTop = 0;
    // }
    // if (_previousLeft >= Dimensions.get('window').width - CIRCLE_SIZE) {
    //   _previousLeft = Dimensions.get('window').width - CIRCLE_SIZE;
    // }
    // if (_previousTop >= Dimensions.get('window').height - CIRCLE_SIZE) {
    //   _previousTop = Dimensions.get('window').height - CIRCLE_SIZE;
    // }
    // //实时更新
    // this.setState({
    //   style: {
    //     backgroundColor: 'red',
    //     left: _previousLeft,
    //     top: _previousTop
    //   }
    // });
  };

  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderRelease = (evt, gestureState) => {
    // lastLeft = _previousLeft;
    // lastTop = _previousTop;
    // this.changePosition();
  };

  /**
     根据位置做出相应处理
     **/
  changePosition = () => {
    // if (_previousLeft + CIRCLE_SIZE / 2 <= Dimensions.get('window').width / 2) {
    //   _previousLeft = lastLeft = 0;
    //   this.setState({
    //     style: {
    //       left: _previousLeft,
    //       top: _previousTop
    //     }
    //   });
    // } else {
    //   _previousLeft = lastLeft = Dimensions.get('window').width - CIRCLE_SIZE;
    //   this.setState({
    //     style: {
    //       left: _previousLeft,
    //       top: _previousTop
    //     }
    //   });
    // }
  };
}
