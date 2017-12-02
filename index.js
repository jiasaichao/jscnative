import { AppRegistry } from 'react-native';
import App from './App';
import Nav from './src/demo/reactnavigation/stacknavigator';
import { MainScreenNavigator } from './src/demo/reactnavigation/tabnavigator';
AppRegistry.registerComponent('jscnative', () => MainScreenNavigator);
