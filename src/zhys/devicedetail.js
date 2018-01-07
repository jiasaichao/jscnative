import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions, FlatList, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
import { login, getcheliang, getrealTimeTrack } from './services';
/**
 * 设备详情
 */
export class DeviceDetailScreen extends React.Component {
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
    render() {
        const { navigate, state } = this.props.navigation;
        return (
            <ScrollView style={{ height: Dimensions.get('screen').height, backgroundColor: '#fff' }}>
                <StatusBar barStyle='light-content' translucent={true} />
                <TouchableOpacity
                    onPress={() => { getrealTimeTrack(state.params.title, (data)=>{
                        navigate('PositionService', data)
                    })  }}
                    style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#d1d1d1', paddingTop:10, paddingBottom:10, flexDirection:'row' }}>
                    <Flex HW style={{ width: 36, height: 36, marginRight: 10 }}>
                        <Image width={36} height={36} src={require(`./img/address.png`)} />
                    </Flex>
                    <Flex column horizontal>
                        <Text color='#212121' label='位置服务' fontSize={16} style={{ marginBottom: 8 }} />
                        <Text color='#212121' label={state.params.adr} fontSize={14} />
                    </Flex>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#d1d1d1', paddingTop:10, paddingBottom:10, flexDirection:'row' }}>
                    <Flex HW style={{ width: 36, height: 36, marginRight: 10 }}>
                        <Image width={36} height={36} src={require(`./img/trackReplay.png`)} />
                    </Flex>
                    <Flex column horizontal>
                        <Text color='#212121' label='轨迹回放' fontSize={16} style={{ marginBottom: 8 }} />
                        <Text color='#212121' label='按时间段回放行车轨迹' fontSize={14} />
                    </Flex>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#d1d1d1', paddingTop:10, paddingBottom:10, flexDirection:'row' }}>
                    <Flex HW style={{ width: 36, height: 36, marginRight: 10 }}>
                        <Image width={36} height={36} src={require(`./img/policeList.png`)} />
                    </Flex>
                    <Flex column horizontal>
                        <Text color='#212121' label='报警历史' fontSize={16} style={{ marginBottom: 8 }} />
                        <Text color='#212121' label='该车辆报警的OBD信息' fontSize={14} />
                    </Flex>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    componentDidMount() {
    }
    handleLogin = () => {

    }
}