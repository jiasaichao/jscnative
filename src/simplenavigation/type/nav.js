import React, { Component } from 'react';
import { tSwitch } from './enum';
import { Transitioner } from '../transitioner';
/**
 *
 */
export type Nav = {
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
