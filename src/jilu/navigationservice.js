import { NavigationActions } from 'react-navigation';

let _navigator;
let _topNavigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
  console.log('_navigator', _navigator);
}
function setTopTopLevelNavigator(navigatorRef) {
  _topNavigator = navigatorRef;
  console.log('_topNavigator', _topNavigator);
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
function topNavigate(routeName, params) {
  _topNavigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  setTopTopLevelNavigator,
  topNavigate
};
