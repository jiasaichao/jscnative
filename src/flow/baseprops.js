import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type StyleProps = StyleProp<ViewStyle>;
export type StyleText = StyleProp<TextStyle>;
export type BaseProps = {
    /**样式*/
    style?: StyleProp<ViewStyle>,
    /**其他属性 */
    other: Object,
} 