/**
 * order 模块接口与列表
 */
import base from './base'
import {get, del, put } from '@/utils/http'

export default {
    // 获取订单
    getOrder(orderStatus, page, size) {
        return get(`${base.basic}/order/listUserOrders`, {
            orderStatus: orderStatus,
            page: page,
            size: size
        }).then(value => {
            // console.log(value.data);
            //返回所有用户数据，数据存储在value.data中
            return value.data;
        }, err => {
            // console.log(err);
            return err;

        });
    },
    // 删除指定订单
    delOrder(orderId) {
        return del(`${base.basic}/order/delete`, {
            orderId: orderId
        }).then(value => {
            // console.log(value);
            // 需要用到value中的code和message
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 删除多个订单
    delOrders(orderIds) {
        return del(`${base.basic}/order/delete`, {
            orderIds: orderIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新订单信息
    updateOrder(data) {
        return put(`${base.basic}/order/update`, data).then(value => {
            console.log(value);
            return value;
        }, err => {
            console.log(err);
            return err;
        })
    },
    // 搜索订单
    searchOrder(account, orderStatus) {
        return get(`${base.basic}/order/search`, {
            account: account,
            orderStatus: orderStatus,
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取订单总数
    getOrderCount() {
        return get(`${base.basic}/order/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
}