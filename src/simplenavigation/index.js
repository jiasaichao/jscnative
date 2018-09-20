import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, Button, PanResponder } from 'react-native';
import { utils } from './utils';
import { tSwitch } from './type/enum';
import { Transitioner } from './transitioner';
import { config } from './config';
import { Nav } from './type/nav';
import { ScreenContainer } from './screencontainer';
let pwidth = Dimensions.get('screen').width;
config.screenWidth = pwidth;

type tPage = { screen: React.Component };
type tPages = { [string]: tPage };
export class SimpleNavigation {
  constructor(pages: tPages, options) {
    this.pages = pages;
    let InitialRoute = this.pages[options.initialRouteName];
    this.stackRouter.push({ screen: InitialRoute.screen, state: 1, switch: 'current', id: 1, routerName: options.initialRouteName });
    this.maxId = 1;
    this.screenView1 = (
      <ScreenContainer
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
  /**获取当前显示屏幕 */
  getCurrentScreen = () => {
    return this.stackRouter.find(item => item.state === 1);
  };
  getPrevScreen = () => {
    let list = this.stackRouter.filter(item => item.state === 2);
    return list[list.length - 1];
  };
  /**最大id号 */
  maxId = 0;
  /**是否动画过度中 */
  isTransitionRunning = false;
  /**是否在触摸中 */
  isResponding = false;
  /**跳转到新页面 */
  push = (routerName, params) => {
    if (this.isTransitionRunning) {
      return;
    }
    this.stackRouter.forEach(item => {
      item.switch = 'none';
      //原来的当前页面
      if (item.state === 1) {
        item.state = 2;
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
    if (this.isTransitionRunning || this.stackRouter.findIndex(item => item.state === 2) == -1) {
      return;
    }
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
      this.stackRouter.pop(); //完成后删除最后一个
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
