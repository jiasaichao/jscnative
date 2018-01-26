import React from 'react';
import { Flex, Text, Image, Icon } from '../components';
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

export function BaseComp() {
    return (
        <Flex>
            <Text label='sdafsdf' color='#0000ff' />
            <Image src={require('../assets/120.png')} />
            <Icon name='arrowRight' height='100' width='100' color='#ff0000' background='#00ff00' />
        </Flex>
    );
}