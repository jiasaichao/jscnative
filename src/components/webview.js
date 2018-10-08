import React from 'react';
import { StyleSheet, Platform, Image as Img, Text as Txt, View, Button, WebView as Wv } from 'react-native';
/**
 * WebView组件有问题
 */
export class WebView extends React.Component {
    // props: FlexProps;
    render() {
        let { style, src, dom, onMessage, onLoad, other } = this.props;
        let url;
        if(Platform.OS=="android"){
            url={uri:'file:///android_asset/'+src.substr(2)};
        }else{
            url=require('./html/pages/global-monitor.html');
        }
        return (
            <WebView ref={dom} onMessage={onMessage} onLoad={onLoad} style={style} {...other} />
        );
    }
}