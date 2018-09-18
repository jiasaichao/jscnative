import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button, PanResponder } from 'react-native';
import { utils } from './utils';
import { tSwitch } from './type/enum';
import { Transitioner } from './transitioner';
let pwidth = Dimensions.get('screen').width;
/**
 *
 */
type Nav = {
  /**id第一个为1 */
  id: number,
  /**屏幕组件，也就是要展示的组件 */
  screen: React.ReactElement,
  element: Transitioner,
  /**
   * 状态1当前显示，2已经显示过（打开过的，返回一级一级返回这些页面），3缓存
   */
  state: 1 | 2 | 3 | 4,
  /** */
  routerName: string,
  /**
   * none:不做任何变动（不需要执行动画，一般动画执行完成所有的都会变成none，以便下次不会执行动画）
   * current:瞬间到当前，pushCurrent:进入方式到当前<--，backCurrent:退出方式到当前-->，
   * pushHide:-->,backHide<--:
   *
   */
  switch: tSwitch
};
type tPage = { screen: React.Component };
type tPages = { [string]: tPage };
export class SimpleNavigation {
  constructor(pages: tPages, options) {
    this.pages = pages;
    let InitialRoute = this.pages[options.initialRouteName];
    this.stackRouter.push({ screen: InitialRoute.screen, state: 1, switch: 'current', id: 1, routerName: options.initialRouteName });
    this.maxId = 1;
    this.screenView1 = (
      <ScreenView
        ref={r => {
          if (r) {
            this.screenView = r;
          }
        }}
        pages={this.pages}
        stackRouter={this.stackRouter}
      />
    );
    utils.simpleNavigation = this;
  }
  screenView: React.ReactElement;
  /**所有配置的页面 */
  pages: tPages = {};
  /**堆栈路由，所有已经打开的页面都会保存到这里 */
  stackRouter: Array<Nav> = [];
  /**最大id号 */
  maxId: 0;
  /**是否动画过度中 */
  isTransitionRunning: false;
  /**跳转到新页面 */
  push = (routerName, params) => {
    if (this.isTransitionRunning) {
      return;
    }
    this.stackRouter.forEach(item => {
      item.switch = 'none';
      //原来的当前页面
      if (item.state === 1) {
        item.state == 2;
        item.switch = 'backHide';
      }
    });
    let router: Nav = {
      screen: this.pages[routerName].screen,
      routerName: routerName,
      state: 1,
      switch: 'pushCurrent',
      id: this.maxId + 1
    };
    this.stackRouter.push(router);
    this.maxId = router.id;
    // console.log(this.screenView1);
    this.screenView.refresh();
  };
  /**返回上一个页面 */
  back = () => {
    this.stackRouter.forEach((item, index) => {
      item.switch = 'none';
      if (item.state == 1) {
        item.switch = 'pushHide';
        item.state = 2;
      }
      if (this.stackRouter.length - 2 == index) {
        item.switch = 'backCurrent';
        item.state = 1;
      }
    });

    this.screenView.refresh(() => {
      this.stackRouter.pop();
    });
  };
  /**替换当前页并加载新页面 */
  replace = () => {};
  /**跳转到最顶层页面 */
  backToTop = () => {};
  setTransitionRunning = value => {
    this.isTransitionRunning = value;
  };
}

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
type P = {
  stackRouter: Array<Nav>
};
/**
 * 1.滑动的距离超过一定距离才成立 ✅
 * 2.起始位置必须在范围内才成立 ✅
 * 3.松手后复位，上一页，下一页 ✅
 * 4.如果下拉一定距离则不会触发页面切换
 */
class ScreenView extends Component<P> {
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
  /**开始位置，作用记录开始位置，可以做，开始滑动的方向是水平还是垂直 */
  gestureStartValue = 0;
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      //用户开始触摸屏幕的时候，是否愿意成为响应者；默认返回false，无法响应，
      // 当返回true的时候则可以进行之后的事件传递。
      // onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      // onMoveShouldSetPanResponder: (evt, gestureState) => {
      //   return true;
      // },
      //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,

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
        {this.props.stackRouter.map((item, index) => {
          let Aaaa = item.screen;
          return (
            <Transitioner key={item.id} id={item.id} sort={index} switch={item.switch}>
              <Aaaa />
            </Transitioner>
          );
        })}
        <View style={{ marginTop: 30, position: 'absolute', zIndex: 77 }}>
          <Button title="确定" onPress={this.queding} />
        </View>
        <View style={{ marginTop: 30, left: 80, position: 'absolute', zIndex: 77 }}>
          <Button title="返回" onPress={this.fanhui} />
        </View>
      </View>
    );
  }
  setValue = v => {
    // console.log('v' + v);
    this.state.value.setValue(v);
  };
  queding = () => {
    // console.log(App);
    App.push('A2');
  };
  refresh = callBack => {
    this.forceUpdate(callBack);
  };
  fanhui = () => {
    App.back();
  };
  componentDidMount() {}
  /**另一个组件已经成为了新的响应者，当前手势被取消时的处理逻辑 */
  onPanResponderTerminate = () => {
    // 相应手势标记设置为 false， 表示不在响应手势过程中了
    // 立即返回到手势开始时那个场景屏幕
  };
  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  // onStartShouldSetPanResponder = (evt, gestureState) => {
  //   return true;
  // };

  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder = (evt, gestureState) => {
    //没有上一页
    if (this.props.stackRouter.findIndex(item => item.state == 2) == -1) {
      return false;
    }
    //#region 【2】判断开始位置
    /**当前拖拽位置 */
    const currentDragPosition = evt.nativeEvent['pageX'];
    /**当前拖拽距离 */
    const currentDragDistance = gestureState.dx;
    // 测量手势开始时的触碰位置距离屏幕边缘的距离
    const screenEdgeDistance = currentDragPosition - currentDragDistance;
    // console.log('开始位置：' + screenEdgeDistance);
    /**起始点不够不移动【2】 */
    if (screenEdgeDistance > GESTURE_RESPONSE_DISTANCE_HORIZONTAL) {
      return false;
    }
    //#endregion
    //#region 【1】拖拽距离足够大了吗
    // 拖拽距离足够大了吗 ？【1】
    const hasDraggedEnough = gestureState.dx > RESPOND_THRESHOLD;
    // 是否要执行响应逻辑 ?
    const shouldSetResponder = hasDraggedEnough; //&& axisHasBeenMeasured && !isOnFirstCard;
    return shouldSetResponder;
    //#endregion
  };

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant = (evt, gestureState) => {
    //1.停止动画
    //2.记录手势事件处理开始时的起始信息
    console.log('开始：' + gestureState.x0);
  };

  // 手势响应过程中当前卡片跟随触摸移动， 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove = (evt, gestureState) => {
    this.setValue(gestureState.dx);
  };

  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderRelease = (evt, gestureState) => {
    if (gestureState.dx > pwidth / 2 || gestureState.vx > 0.5) {
      this.fanhui();
    } else {
      this.queding();
    }
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
function A1() {
  return (
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
  );
}
function A2() {
  return (
    <View
      style={{
        backgroundColor: '#66f',
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
  );
}
const App = new SimpleNavigation(
  {
    A1: { screen: A1 },
    A2: { screen: A2 }
  },
  { initialRouteName: 'A1' }
);
export default class App1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return App.screenView1;
  }
}
