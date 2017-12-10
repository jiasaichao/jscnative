import React from 'react';
import { StyleSheet, Image as Img, Text, View, Button, StyleProp, ViewStyle } from 'react-native';
type Props = {
    /**样式*/
    style?: StyleProp<ViewStyle>,
    other: Object,
    children: React.ReactElement,
    /**是否为垂直排列，加上这个属性为垂直排列*/
    column: boolean,
    /**水平居中对齐*/
    horizontal: boolean,
    /**垂直居中对齐*/
    vertical: boolean,
    /**水平和垂直都居中对齐*/
    HW: boolean,
    /**flex1为1，就是放大倍数为1*/
    flex1: boolean,
    /**ref*/
    dom: () => {},
}

// export function Flex(
//     { children, style, dom, column, horizontal, vertical, HW, flex1, other }:Props) {
//     if (!style) {
//         style = {};
//     }
//     if (!column) style.flexDirection = 'row';
//     if (horizontal || HW) style.justifyContent = 'center';
//     if (vertical || HW) style.alignItems = 'center';
//     if (flex1) style.flex = 1;
//     return (
//         <View ref={dom} style={style} {...other}>
//             {children}
//         </View>
//     );
// }
/**
 * Flex组件
 */
export class Flex extends React.Component {
    props: Props;
    render() {
        let { style, column, dom, flex1, horizontal, HW, other, vertical, children } = this.props;
        if (!style) {
            style = {};
        }
        if (!column) style.flexDirection = 'row';
        if (horizontal || HW) style.justifyContent = 'center';
        if (vertical || HW) style.alignItems = 'center';
        if (flex1) style.flex = 1;
        return (
            <View ref={dom} style={style} {...other}>
                {children}
            </View>
        );
    }
}
type ImageProps = {
    /**样式*/
    style?: StyleProp<ViewStyle>,
    other: Object,
    src: string,
    height: Number,
    width: Number,
}
export class Image extends React.Component {
    props: ImageProps;
    render() {
        let { height, other, src, style, width } = this.props;
        let styles = {};
        if (height) {
            styles.height = height
        }
        if (width) {
            styles.width = width
        }
        return (
            <Img style={styles} source={{uri:src}} />
        );
    }

}
export function Image1({ className = '', style, src, other, height, width }) {
    let styles = {};
    if (height) {
        styles.height = height
    }
    if (width) {
        styles.width = width
    }
    return (
        <img className={className} style={{ ...styles, ...style }} src={src} {...other} />
    );
}

export function Placeholder() {
    return (
        <div className='flex1'>
        </div>
    );
}