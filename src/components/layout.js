import React from 'react';
import { StyleSheet, Image as Img, Text as Txt, View, Button } from 'react-native';
import { BaseProps } from '../flow/baseprops'

type FlexProps = BaseProps & {
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
/**
 * Flex组件
 */
export class Flex extends React.Component {
    props: FlexProps;
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


export function Placeholder() {
    return (
        <View style={{ flexBasis: 1 }}></View>
    );
}