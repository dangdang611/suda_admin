/**
 * package 模块接口与列表
 */
import base from './base'
import {get, del, put, post } from '@/utils/http'

export default {
    // 获取包装服务
    getPackage(page, size) {
        return get(`${base.basic}/package/listPackages`, {
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
    // 删除指定包装服务
    delPackage(packageId) {
        return del(`${base.basic}/package/delete`, {
            packageId: packageId
        }).then(value => {
            // console.log(value);
            // 需要用到value中的code和message
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 删除多个包装服务
    delPackages(packageIds) {
        return del(`${base.basic}/package/delete`, {
            packageIds: packageIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新包装服务信息
    updatePackage(data) {
        return put(`${base.basic}/package/update`, data).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 搜索包装服务信息
    searchPackage(packageName) {
        return get(`${base.basic}/package/search`, {
            packageName: packageName
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取包装服务总数
    getPackageCount() {
        return get(`${base.basic}/package/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 新增产品
    addPackage(data) {
        return post(`${base.basic}/package/insert`, data).then(value => {
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    }
}