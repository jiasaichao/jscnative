import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

export let push = null;
export let goBack = null;
export let reset = null;
/**
 * 全部路由界面
 */
let allScreens = [];
/**
 * 当前已经打开的所有界面
 */
let currentAllScreens = [];
/**
 * 当前页面,其实就是打开的所有界面currentAllScreens的最后一个
 */
// export let currentScreens = {
//   key: null,
//   name: null
// }
/**
 * 是否存在头部
 */
function isHeader(name, screens) {
  if (screens.find((item) => item.name === name).options.header === null) {
    return false;
  } else {
    return true;
  }
}
/**
 * 获取当前展示界面
 */
function getCurrentScreens() {
  return currentAllScreens[currentAllScreens.length - 1];
}
/**
 * 
 */
export default function Index(Screens: Array<{ name: String, Component: React.Component, options: {} }>) {
  //带有头部导航的
  // let contentStackNavigator = null;

  let stackNavigatorConfig = {};
  let ContentStackNavigatorConfig = {};
  allScreens = Screens;
  Screens.forEach((item) => {
    if (currentAllScreens.length === 0) {
      currentAllScreens.push({ name: item.name, key: null });
    }
    let snc = {};
    if (item.options && item.options.header === null) {
      snc = stackNavigatorConfig;
    } else {
      snc = ContentStackNavigatorConfig;
    }
    let customNavigationOptions = null;
    snc[item.name] = {};
    snc[item.name]['screen'] = item.Component;
    if (item.options) {
      customNavigationOptions = item.options;
      snc[item.name]['navigationOptions'] = ({ navigation, screenProps, navigationOptions }) => {
        if (push === null) {
          push = (name, params) => {
            // console.log('------', getCurrentScreens().name)
            if (!isHeader(getCurrentScreens().name, Screens) && isHeader(name, Screens)) {
              navigation.navigate('Content', {}, NavigationActions.navigate({
                routeName: name, params
              }));
            } else {
              // console.log('正常跳转', currentAllScreens)
              navigation.navigate(name, params);
            }
            currentAllScreens.push({ name: name, key: null });
          }
          goBack = () => {
            currentAllScreens.pop();
            navigation.goBack(null)
            // currentAllScreens.push({ name: name, key: null });
          }
          reset = (routeName, params) => {
            const resetAction = NavigationActions.navigate(
              {
                routeName, 
                params
              }
            )
            resetAction.aaa='2222';
            console.log('resetAction', resetAction);
            navigation.dispatch(resetAction);
          }
        }
        else {
        }
        console.log(989898, { ...customNavigationOptions });
        return { ...customNavigationOptions };
      }
    }
  });
  // const Content = StackNavigator({
  //   Home: {
  //     screen: HomeScreen,
  //     navigationOptions: {
  //       header: null
  //     }
  //   },
  //   Chat: {
  //     screen: SimpleApp0,
  //     navigationOptions: {
  //       header: null
  //     }
  //   },
  // });
  //带头部导航的
  if (Object.keys(ContentStackNavigatorConfig).length > 0) {
    const contentStackNavigator = StackNavigator(ContentStackNavigatorConfig);
    stackNavigatorConfig.Content = {};
    stackNavigatorConfig.Content.screen = contentStackNavigator;
    stackNavigatorConfig.Content.navigationOptions = { header: null };
  }

  console.log('ooooo', stackNavigatorConfig)
  return StackNavigator(stackNavigatorConfig);
}
