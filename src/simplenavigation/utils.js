import { SimpleNavigation } from './';
import { config } from './config';
import { NavigationBar } from './navigationbar';
import { NavigationBarProps } from './type/nav';
type tUtils = {
  simpleNavigation: ?SimpleNavigation,
  navigationBar: ?NavigationBar,
  dxToValue: ({ targetWidth: number, dx: number }) => number,
  getNavigationOptionsById: (id: number) => NavigationBarProps
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
    let currentNavigation = utils.simpleNavigation.stackRouter.find(item => item.id == id).screen.navigationOptions;
    let navigationOptions = config.navigationBarExtend(typeof currentNavigation == 'function' ? currentNavigation() : currentNavigation);
    return navigationOptions;
  }
};
