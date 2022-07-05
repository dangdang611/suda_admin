/**
 * post 模块接口与列表
 */
import base from './base'
import {get } from '@/utils/http'

export default {
    // 模拟Post机发送请求
    postSend(ordeId) {
        return get(`${base.basic}/POStest`, {
            ordeId: ordeId
        }).then(value => {
            return value.data;
        }, err => {
            console.log(err);
            return err.data;
        });
    }
}