import React from 'react';
import { StyleSheet, View, Button, TextInput, PixelRatio, TouchableOpacity, Platform, StatusBar, Dimensions, FlatList, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Flex, Icon, Image, Placeholder, Text } from '../components';
import { login, getrealTimeTrack } from './services';
import { MapView, Circle, Marker, Polyline } from 'react-native-amap3d';
// import TileLnglatTransform from 'tile-lnglat-transform';

/**
 * 设备详情
 */
export class PositionServiceScreen extends React.Component {
    static navigationOptions = {

    };
    constructor(props) {
        super(props);
        const { navigate, state } = this.props.navigation;
        this.setTimeoutId = true;
        let zhuan = bd09togcj02(+state.params.longitude, +state.params.latitude);
        this.coordinate = {
            latitude: zhuan[1],
            longitude: zhuan[0]
        }
        this.state = {
            data1: [],
            coordinate: {
                latitude: zhuan[1],
                longitude: zhuan[0]
            },
            coordinateList: [{
                latitude: zhuan[1],
                longitude: zhuan[0]
            }],
            course: +state.params.course
            // iconDirection: 0
            // data1: [
            //     { id: 1, title: '230198590432715', num: 'SUV0932475098', adr: '北京市通州区梨园镇', name: '奥运村02号围栏' },
            //     { id: 2, title: '32624365437654', num: 'SDFDG4536789765', adr: '北京市通州区梨园镇', name: '奥运村03号围栏' },
            //     { id: 3, title: '5472414356587453', num: 'SDFG23456', adr: '北京市通州区梨园镇', name: '奥运村04号围栏' },
            //     { id: 4, title: '435687987654', num: 'DSFG8765432', adr: '北京市通州区梨园镇', name: '奥运村05号围栏' },
            // ]
        }
    }
    // coordinate = {
    //     latitude: 39.906901,
    //     longitude: 116.397972,
    // }
    render() {
        const { navigate, state } = this.props.navigation;
        return (
            <View style={{ height: Dimensions.get('screen').height, backgroundColor: '#fff' }}>
                <MapView coordinate={this.coordinate} showsZoomControls style={StyleSheet.absoluteFill} zoomLevel={14}>
                    <Polyline
                        width={5}
                        color='rgba(255, 0, 0, 0.5)'
                        coordinates={[...this.state.coordinateList]} />
                    <Marker coordinate={this.state.coordinate} icon={() => (<Icon width={40} height={40} name='navigation' color='red' style={{ transform: [{ rotate: (- 45 + this.state.course-90) + 'deg' }] }} />)} />
                    {/* <Circle
                        strokeWidth={5}
                        strokeColor='rgba(0, 0, 255, 0.5)'
                        fillColor='rgba(255, 0, 0, 0.5)'
                        radius={10000}
                        coordinate={this.coordinate} /> */}
                </MapView>
            </View>
        );
    }
    componentDidMount() {
        this.handleTrack()
    }
    componentWillUnmount() {
        this.setTimeoutId = false;
    }
    handleTrack = () => {
        const { navigate, state } = this.props.navigation;
        const prevCoordinate = this.state.coordinate;
        // console.log(state.params.devNo);
        setTimeout(() => {
            getrealTimeTrack(state.params.devNo, (data) => {
                let zhuan = bd09togcj02(+data.longitude, +data.latitude);
                if (this.state.coordinate.latitude == data.latitude && this.state.coordinate.longitude == data.longitude) {
                    if (this.setTimeoutId) {
                        this.handleTrack();

                    }
                    return;
                }
                this.state.coordinateList.push({
                    latitude: zhuan[1],
                    longitude: zhuan[0]
                });
                this.setState({
                    coordinateList: this.state.coordinateList,
                    coordinate: {
                        latitude: zhuan[1],
                        longitude: zhuan[0]
                    },
                    course: data.course
                    // iconDirection: getAngle(prevCoordinate.longitude, prevCoordinate.latitude, data.longitude, data.latitude)
                });
                if (this.setTimeoutId) {
                    this.handleTrack();
                }
                // console.log(data)
            });
        }, 1000);

    }
}
function getAngle(px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
    let x = Math.abs(px - mx);
    let y = Math.abs(py - my);
    let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    let cos = y / z;
    let radina = Math.acos(cos);//用反三角函数求弧度
    let angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

    if (mx > px && my > py) {//鼠标在第四象限
        angle = 180 - angle;
    }

    if (mx == px && my > py) {//鼠标在y轴负方向上
        angle = 180;
    }

    if (mx > px && my == py) {//鼠标在x轴正方向上
        angle = 90;
    }

    if (mx < px && my > py) {//鼠标在第三象限
        angle = 180 + angle;
    }

    if (mx < px && my == py) {//鼠标在x轴负方向
        angle = 270;
    }

    if (mx < px && my < py) {//鼠标在第二象限
        angle = 360 - angle;
    }



    return angle;
}
/*
export class PositionServiceScreen extends React.Component {
    static navigationOptions = {
        title: '动画移动',
    }

    _animatedToZGC = () => {
        this.mapView.animateTo({
            tilt: 45,
            rotation: 90,
            zoomLevel: 18,
            coordinate: {
                latitude: 39.97837,
                longitude: 116.31363,
            }
        })
    }

    _animatedToTAM = () => {
        this.mapView.animateTo({
            tilt: 0,
            rotation: 0,
            zoomLevel: 16,
            coordinate: {
                latitude: 39.90864,
                longitude: 116.39745,
            }
        })
    }

    render() {
        return (
            <View style={styles.body}>
                <MapView ref={ref => this.mapView = ref} style={styles.body} />
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this._animatedToZGC}>
                            <Text label='中关村' fontSize={16}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this._animatedToTAM}>
                            <Text label='天安门' fontSize={16}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    buttons: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
        fontSize: 16,
    },
})
*/


/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    //定义一些常量
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;
    var x = +bd_lon - 0.0065;
    var y = +bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
}