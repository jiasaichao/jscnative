import { SimpleNavigation } from './';
import { config } from './config';
import { NavigationBar } from './navigationbar';
import { NavigationBarProps } from './type/nav';
/*global JSX */
type tUtils = {
  simpleNavigation: ?SimpleNavigation,
  navigationBar: ?NavigationBar,
  dxToValue: ({ targetWidth: number, dx: number }) => number,
  getNavigationOptionsById: (id: number) => NavigationBarProps,
  getNavigationThisById: (id: number) => JSX.Element
};
export let utils: tUtils = {
  simpleNavigation: null,
  navigationBar: null,
  /**
   * dx根据对应目标值转换为对应值
   */
  dxToValue: (targetWidth, dx) => {
    return (dx / config.screenWidth) * targetWidth;
  },
  /**
   * 根据id获取navigationOptions，已经包含了默认值
   */
  getNavigationOptionsById(id) {
    let currentNavigation = utils.simpleNavigation.stackRouter.find(item => item.id == id);
    let currentNavigationOptions = currentNavigation.screen.navigationOptions;
    let navigationOptions = config.navigationBarExtend(
      typeof currentNavigationOptions == 'function' ? currentNavigationOptions({ id }) : currentNavigationOptions
    );
    return navigationOptions;
  },
  /**
   * 根据id获取对应展示组件的this
   */
  getNavigationThisById(id) {
    return utils.simpleNavigation.stackRouter.find(item => item.id == id)._this;
  }
};
