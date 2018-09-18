import { SimpleNavigation } from './index';
import { config } from './config';
export let utils: { simpleNavigation: ?SimpleNavigation, dxToValue: ({ targetWidth: number, dx: number }) => number } = {
  simpleNavigation: null,
  /**
   * dx根据对应目标值转换为对应值
   */
  dxToValue: (targetWidth, dx) => {
    return (dx / config.screenWidth) * targetWidth;
  }
};
