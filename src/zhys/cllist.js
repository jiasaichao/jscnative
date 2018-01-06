import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions, FlatList } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
import { login, getcheliang } from './services';
/**
 * 车辆管理
 */
export class ClListScreen extends React.Component {
    static navigationOptions = {

    };
    page = 1
    constructor(props) {
        super(props);
        this.state = {
            data1: [],
            refreshing: true,
            loadMore: false
            // data1: [
            //     { id: 1, title: '230198590432715', num: 'SUV0932475098', adr: '北京市通州区梨园镇', name: '奥运村02号围栏' },
            //     { id: 2, title: '32624365437654', num: 'SDFDG4536789765', adr: '北京市通州区梨园镇', name: '奥运村03号围栏' },
            //     { id: 3, title: '5472414356587453', num: 'SDFG23456', adr: '北京市通州区梨园镇', name: '奥运村04号围栏' },
            //     { id: 4, title: '435687987654', num: 'DSFG8765432', adr: '北京市通州区梨园镇', name: '奥运村05号围栏' },
            // ]
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ height: '100%', backgroundColor: '#fff' }}>
                <StatusBar barStyle='light-content' translucent={true} />
                <Flex column style={{ paddingLeft: 15 }}>
                    <Flex HW style={{ marginTop: 12, marginRight: 15 }}>
                        <TextInput placeholder='输入设备号/车架号/车牌号快速查找'
                            style={{ width: '100%', borderWidth: 1, borderColor: '#d1d1d1', height: 32, borderRadius: 5, paddingRight: 35, paddingLeft: 15, fontSize: 11 }} />
                        <TouchableOpacity style={{ position: 'absolute', top: 1, right: 0, width: 35, height: 32, justifyContent: 'center', alignItems: 'center' }}>
                            <Image src={require('./img/magnifier.png')} width={15} height={18}
                                style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </Flex>
                </Flex>
                <Flex flex1 style={{ paddingLeft: 15 }} column>
                    <FlatList
                        data={this.state.data1}
                        renderItem={this._renderItem}
                        // keyExtractor={this._keyExtractor}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handLoadData}
                        onEndReached={() => { this.getData(this.page + 1) }}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={this._renderFooter}
                    />
                    {/* {this.state.data1.map((item, index) => (
                        <TouchableOpacity
                            key={item.id} style={{ paddingTop: 15, paddingRight: 5, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#d1d1d1', flexDirection: 'row', alignItems: 'center' }}>
                            <Flex column>
                                <Flex style={{ marginBottom: 8 }}>
                                    <Text label='设备号：' color='#000' fontSize={14} />
                                    <Text label={item.title} />
                                </Flex>
                                <Flex style={{ marginBottom: 8 }}>
                                    <Text label='车架号：' color='#000' fontSize={14} />
                                    <Text label={item.num} />
                                </Flex>
                                <Flex style={{ marginBottom: 8 }}>
                                    <Text label='地 址：' color='#000' fontSize={14} />
                                    <Text label={item.adr} />
                                </Flex>
                                <Flex style={{ marginBottom: 8 }}>
                                    <Text label='围栏名：' color='#000' fontSize={14} />
                                    <Text label={item.name} />
                                </Flex>
                            </Flex>
                            <Placeholder />
                            <Icon name='arrowRight' color='#808080' width={30} height={30} color='#b1b1b1' />
                        </TouchableOpacity>
                    ))} */}
                </Flex>
            </View>
        );
    }
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                const { navigate } = this.props.navigation;
                navigate('DeviceDetail', item)
            }}
            key={item.id} style={{ paddingTop: 15, paddingRight: 5, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#d1d1d1', flexDirection: 'row', alignItems: 'center' }}>
            <Flex column>
                <Flex style={{ marginBottom: 8 }}>
                    <Text label='设备号：' color='#000' fontSize={14} />
                    <Text label={item.title} />
                </Flex>
                <Flex style={{ marginBottom: 8 }}>
                    <Text label='车架号：' color='#000' fontSize={14} />
                    <Text label={item.num} />
                </Flex>
                <Flex style={{ marginBottom: 8 }}>
                    <Text label='地 址：' color='#000' fontSize={14} />
                    <Text label={item.adr} />
                </Flex>
                <Flex style={{ marginBottom: 8 }}>
                    <Text label='围栏名：' color='#000' fontSize={14} />
                    <Text label={item.name} />
                </Flex>
            </Flex>
            <Placeholder />
            <Icon name='arrowRight' color='#808080' width={30} height={30} color='#b1b1b1' />
        </TouchableOpacity>
    );
    _renderFooter=()=>{
        if(this.state.loadMore){
            return (<Flex HW><Text label='加载中...' /></Flex>)
        }else{
            return null;
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData(page = 1) {
        let state={}
        if(page==1){
            state.refreshing=true;
        }else{
            state.loadMore=true;
        }
        this.setState(state);
        getcheliang(`page=${page}&rows=20`, (data) => {
            this.page = page;
            let rdata = [];
            if (page > 1) {
                rdata = this.state.data1;
            }
            // console.table(data)
            data.forEach((item) => {
                let rdataitem = {
                    id: item.devNo,
                    title: item.devNo,
                    num: item.vin,
                    adr: item.addr,
                    name: item.fenceName
                }
                rdata.push(rdataitem);
            });
            this.setState({ refreshing: false, data1: rdata, loadMore:false });
        })
    }
    handLoadData = () => {
        this.getData();
    }
    handleLogin = () => {

    }
}