import React from 'react';
import { BaseProps, StyleProps, StyleText } from '../flow/baseprops';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text as txt,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

type IconProps = BaseProps & {
  color: string,
  width: number,
  height: number,
  background: string,
  name: 'arrowUp' | 'arrowRight' | 'arrowDown' | 'arrowLeft' | 'arrowBack' | 'arrowForward'
};
export class Icon extends React.Component {
  props: IconProps;
  render() {
    let content = null;
    switch (this.props.name) {
      case 'arrowUp':
        content = <Polygon fill={this.props.color} points="396.6,352 416,331.3 256,160 96,331.3 115.3,352 256,201.5 " />;
        break;
      case 'arrowRight':
        content = <Polygon fill={this.props.color} points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />;
        break;
      case 'arrowDown':
        content = <Polygon fill={this.props.color} points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />;
        break;
      case 'arrowLeft':
        content = <Polygon fill={this.props.color} points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " />;
        break;
      case 'arrowBack':
        content = <Polygon fill={this.props.color} points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " />;
        break;
      case 'arrowForward':
        content = <Polygon fill={this.props.color} points="160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 " />;
        break;
      default:
        break;
    }
    let style = {};
    if (this.props.background) {
      style.backgroundColor = this.props.background;
    }
    return (
      <Svg viewBox="0 0 512 512" width={this.props.width} height={this.props.height} style={style}>
        {content}
      </Svg>
    );
  }
}
