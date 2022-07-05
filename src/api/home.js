/**
 * home模块接口与列表
 */
import base from './base'
import {get } from '@/utils/http'

export default {
    // 获取资讯
    getData() {
        return get(`${base.basic}/index/getData`).then(value => {
            console.log(value.data);
            //返回所有用户数据，数据存储在value.data中
            return value.data;
        }, err => {
            return err;
        });
    },
}