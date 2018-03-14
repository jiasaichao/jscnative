import React from 'react';
import { Flex, Icon, Image, Placeholder, Text } from './index';
import { BaseProps, StyleProps, StyleText } from '../flow/baseprops';
type ItemProps = BaseProps & {
    /**文字*/
    label: string,
    /**右边内容 */
    extra: string | React.ReactElement,
    /**缩略图缩略图(当为 string 类型时作为 img src) */
    thumb: string | React.ReactElement,
    // uri: string,
    // /**高度 */
    // height: Number,
    // /**宽度 */
    // width: Number,
}
class Item extends React.Component {
    props: ItemProps;
    render() {
        let { style, children, label, extra, thumb, other } = this.props;
        return (
            <Flex>
                <Text label={label} />
            </Flex>
        );
    }
}
type ListProps = BaseProps & {
    /**路径*/
    // src: string,
    // uri: string,
    // /**高度 */
    // height: Number,
    // /**宽度 */
    // width: Number,
}
export class List extends React.Component {
    props: ListProps;
    static Item = Item;
    render() {
        let { style, children } = this.props;
        return (
            <Flex>
                {children}
            </Flex>
        );
    }
}


