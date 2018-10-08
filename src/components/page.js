import React from 'react';
import { StyleSheet, Image as Img, Text as Txt, View, Button, TouchableOpacity, TouchableHighlight, Dimensions, Platform } from 'react-native';
import { Flex, Text, Icon } from './index';
import { BaseProps } from '../flow/baseprops';
import { withNavigation } from 'react-navigation';

const X_WIDTH = 375;  
const X_HEIGHT = 812;  
  
// screen  
const SCREEN_WIDTH = Dimensions.get('window').width;  
const SCREEN_HEIGHT = Dimensions.get('window').height;  
  
export function isIphoneX() {  
    return (  
        Platform.OS === 'ios' &&   
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||   
        (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))  
    )  
}
function Header1({ title, headColor, headBg, navigation }) {
    return <View style={{ height: 45, backgroundColor: headBg, width:'100%', alignItems:'center' }}>
        <View style={{ position: 'absolute', left: 0, top: 0, zIndex: 10 }}>
            <TouchableOpacity onPress={() => {
                const { navigate, goBack } = navigation;
                goBack();
            }} style={{ paddingLeft: 15, paddingRight: 15, height: 44, justifyContent: 'center' }} >
                <View>
                    <Icon name='arrowLeft' color='#fff' height={24} width={24} />
                </View>
            </TouchableOpacity>
            {/* <Text label={backName} /> */}
        </View>
        <Flex style={{ height: '100%', width:'75%' }} HW>
            <Txt style={{fontSize:18, color:'#fff'}} numberOfLines={1} >{title}</Txt>
        </Flex>
    </View>
}
let Header = withNavigation(Header1);
type FlexProps = BaseProps & {
    children: React.ReactElement,
    /**是否为垂直排列，加上这个属性为垂直排列*/
    title: string,
    /**水平居中对齐*/
    backName: string,
    /**垂直居中对齐*/
    headBg: string,
    /**水平和垂直都居中对齐*/
    headColor: string,
    /**flex1为1，就是放大倍数为1*/
    bg: string,
    /**ref*/
    dom: () => {},
}
/**
 * Page组件
 * 
 */
export class Page extends React.Component {
    props: FlexProps;
    render() {
        let { style, title, dom, backName, bg, children, headBg = '#3285ff', headColor = '#fff', other } = this.props;
        // let styles = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, overflow: 'hidden', ...style }
        let styles = {
            height: '100%',
            width: '100%'
        }
        if (bg) {
            styles.backgroundColor = bg;
        }
        let 头部 = null;
        // if (title) {
            头部 = <Header title={title} headColor={headColor} headBg={headBg} />
        // }
        return (
            <View ref={dom} style={[styles,  {paddingBottom:(isIphoneX())?34:0}]} {...other}>
                <View style={{ height:(isIphoneX())?44: 20, backgroundColor: headBg }}></View>
                {头部}
                <View style={{ flex: 1 }}>
                    {children}
                </View>
            </View>
        );
    }
}

