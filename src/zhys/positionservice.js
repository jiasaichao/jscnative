import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions, FlatList, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
import { login, getcheliang } from './services';
import { MapView, Circle } from 'react-native-amap3d'
/**
 * 设备详情
 */
export class PositionServiceScreen extends React.Component {
    static navigationOptions = {

    };
    constructor(props) {
        super(props);
        this.state = {
            data1: []
            // data1: [
            //     { id: 1, title: '230198590432715', num: 'SUV0932475098', adr: '北京市通州区梨园镇', name: '奥运村02号围栏' },
            //     { id: 2, title: '32624365437654', num: 'SDFDG4536789765', adr: '北京市通州区梨园镇', name: '奥运村03号围栏' },
            //     { id: 3, title: '5472414356587453', num: 'SDFG23456', adr: '北京市通州区梨园镇', name: '奥运村04号围栏' },
            //     { id: 4, title: '435687987654', num: 'DSFG8765432', adr: '北京市通州区梨园镇', name: '奥运村05号围栏' },
            // ]
        }
    }
    coordinate = {
        latitude: 39.906901,
        longitude: 116.397972,
    }
    render() {
        const { navigate, state } = this.props.navigation;
        return (
            <View style={{ height: Dimensions.get('screen').height, backgroundColor: '#fff' }}>
                <MapView style={StyleSheet.absoluteFill}>
                    <Circle
                        strokeWidth={5}
                        strokeColor='rgba(0, 0, 255, 0.5)'
                        fillColor='rgba(255, 0, 0, 0.5)'
                        radius={10000}
                        coordinate={this.coordinate} />
                </MapView>
            </View>
        );
    }
    componentDidMount() {
    }
    handleLogin = () => {

    }
}