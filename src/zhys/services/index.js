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