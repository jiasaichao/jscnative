import { Alert } from 'react-native'
import axios from 'axios';
import {Toast} from 'antd-mobile'

const BASEURL = 'http://gis.cloud.rtzltech.cn:8010/monitoringserver/';
function getData(url, params, callback) {
    // fetch('http://gis.cloud.rtzltech.cn:8010/monitoringserver/' + url, {
    //     method: 'POST',
    //     headers: {
    //         // 'Accept': 'application/json',
    //         'X-Requested-With': 'XMLHttpRequest',
    //         'Accept': '*/*',
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body:"loginname=changjiu&pwd=123334"
    //     // body: JSON.stringify({
    //     //     firstParam: 'yourValue',
    //     //     secondParam: 'yourOtherValue',
    //     // })
    // }).then((data) => {
    //     console.log('数据', data);
    //     if (data && '99' == data.retcode) {
    //         Alert(data.retmsg);
    //         // window.mui.alert(data.retmsg);
    //         // window.plus.runtime.restart();
    //         return;
    //     }
    //     callback(data);
    // }).catch((error) => {
    //     console.log(error)
    //     alert('错误')
    // });
    let instance = axios.create({
        timeout: 30000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    instance.post(BASEURL + url, params).then(({data}) => {
        console.log('数据', data);
        if (data && '99' == data.retcode) {
            // Alert(data.retmsg);
            Toast.info(data.retmsg);
            return;
        }
        if (data && '-1' == data.retcode) {
            // Alert(data.retmsg);
            Toast.info(data.retmsg);
            return;
        }
        callback(data);
    }).catch((error) => {
        // console.log(error)
        Toast.info(error);
        // alert('错误')
    });
}
export function login(params, callback) {
    getData('login', params, callback);
}
export function getcheliang(params, callback) {
    getData('track/devListPage.action', params, callback);
}
//region 返回数据
/**
acc:"run"
addr:"浙江省杭州市萧山区姑萧线"
alarmTime:"2017-09-17 20:24:10"
alarmType:4
battery:""
bindPhone:"898602B5011600533762"
carBattery:""
carSpeed:""
city:"杭州市"
coolantTemperature:""
course:"280"
custName:"长久集团"
custNo:"10000044"
delFlag:0
devNo:"693502000045697"
devState:3
devStateDesc:"异常"
district:"萧山区"
elevation:""
engineLoad:""
fenceName:""
fenceNo:"10000044_34823"
fenceState:12
fenceTime:"2017-08-29 19:35:34"
gpsSign:""
gpsSignDesc:"<span style='color:#F00;'>无</span>"
gpsSpeed:"25.928"
gpsTime:"2065-09-15 05:59:51"
gsmSign:""
gsmSignDesc:"<span style='color:#F00;'>差</span>"
iccid:"898602B5011600533762"
iconIndex:4
id:""
insertTime:"2016-10-10 10:34:24"
insertUser:"rtzl"
latitude:"30.176164"
leftOil:""
longitude:"120.349278"
obdTime:"2065-09-15 05:59:51"
odo:0
onlineState:9
onlineStateDesc:"离线"
onlineTime:"2017-09-17 21:01:09"
province:"浙江省"
remark:""
rotateSpeed:""
saleState:1
shake:""
sortNum:0
strAlarmType:"拔掉OBD"
strDevState:""
strFenceState:"围栏外"
strOdo:"0.0"
strStatus:"<span style='color:#F00;'>离线(拔出)</span>"
strVoltage:""
timestamp:3020191191000
updateTime:"2017-09-17 21:01:09"
updateUser:""
vehicleNo:""
version:"VKEL_T6-RTZL_20170105_5113"
vin:"LBETLBFC9HY239512"
voltage:""
 */
//endregion
/**
 * 
 * @param {String} devNo 设备号
 * @param {Function} callback 回调函数
 */
export function getrealTimeTrack(devNo, callback){
    getData('track/realTimeTrack.action', 'devNo='+devNo, callback);
}
