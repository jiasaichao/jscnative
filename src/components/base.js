import React from 'react';
import { StyleSheet, Image as Img, Text as Txt, View, Button } from 'react-native';
import { BaseProps, StyleProps, StyleText } from '../flow/baseprops';
type ImageProps = BaseProps & {
    /**路径*/
    src: string,
    uri: string,
    /**高度 */
    height: Number,
    /**宽度 */
    width: Number,
}
export class Image extends React.Component {
    props: ImageProps;
    render() {
        let { height, other, src, style, width, uri } = this.props;
        let styles = {};
        let source;
        if (height) {
            styles.height = height
        }
        if (width) {
            styles.width = width
        }
        if (uri) {
            source = { uri: uri }
        } else {
            source = src
        }
        return (
            <Img style={styles} source={source} {...other} />
        );
    }
}

type TextProps = BaseProps & StyleText & {
    label: string,
    color: string,
    fontSize: number,
    // lineHeight: number,
    bold: boolean,
    style: StyleText

}
export class Text extends React.Component {
    props: TextProps;
    render() {
        let { fontSize, other, lineHeight, style, bold, color, label } = this.props;
        let styles: StyleText = {
            ...style
        };
        // !(fontSize && !lineHeight) || (styles.lineHeight = fontSize)
        !bold || (styles.fontWeight = 'bold');
        !color || (styles.color = color)
        !fontSize || (styles.fontSize = fontSize)
        return (
            <Txt style={styles} selectable={false} {...other}>{label}</Txt>
        );
    }
}

