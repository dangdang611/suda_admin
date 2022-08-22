/**
 * address 模块接口与列表
 */
import base from './base'
import {get } from '@/utils/http'

export default {
    // 获取智能地址解析的结果   
    getSmartAddress(message) {
        return get(`${base.map}/ws/geocoder/v1/?smart_address=${message}&key=UQDBZ-HCN64-6V7UN-DNUZY-DQ6O6-7ABGA`).then(value => {
            return value.result;
        }, err => {
            console.log(err);
            return err;
        });
    },
    // 获取地址的经纬度
    getAddressLocation(message) {
        return get(`${base.map}/ws/geocoder/v1/?address=${message}&key=UQDBZ-HCN64-6V7UN-DNUZY-DQ6O6-7ABGA`).then(value => {
            return value.result;
        }, err => {
            console.log(err);
            return err;
        });
    },
}