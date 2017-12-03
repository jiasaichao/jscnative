import React from 'react';
import { StyleSheet, Text, View, Button, StyleProp, ViewStyle } from 'react-native';
export function Flex(
    { children, style, dom, column, horizontal, vertical, HW, flex1, other }:
        {
        /***/style?: StyleProp<ViewStyle>,
        /**是否为垂直排列，加上这个属性为垂直排列*/column: boolean,
        /**水平居中对齐*/horizontal: boolean,
        /**垂直居中对齐*/vertical: boolean,
        /**水平和垂直都居中对齐*/HW: boolean,
        /**flex1为1，就是放大倍数为1*/flex1: boolean,
        /**ref*/dom: () => {},
            other: Object
        }) {
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