/**
 * product 模块接口与列表
 */
import base from './base'
import {get, del, put, post } from '@/utils/http'

export default {
    // 获取产品
    getProduct(page, size) {
        return get(`${base.basic}/express/listExpress`, {
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
    // 删除指定产品
    delProduct(expressId) {
        return del(`${base.basic}/express/delete`, {
            expressId: expressId
        }).then(value => {
            // console.log(value);
            // 需要用到value中的code和message
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 删除多个用户 
    delProducts(expressIds) {
        return del(`${base.basic}/express/delete`, {
            expressIds: expressIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新产品信息
    updateProduct(data) {
        return put(`${base.basic}/express/update`, data).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 搜索产品
    searchProduct(product) {
        return get(`${base.basic}/express/search`, {
            product: product
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取产品总数
    getProductCount() {
        return get(`${base.basic}/express/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 新增产品
    addProduct(data) {
        return post(`${base.basic}/express/insert`, data).then(value => {
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    }
}