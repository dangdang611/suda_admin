/**
 * user 模块接口与列表
 */
import base from './base'
import {get, del, put, post } from '@/utils/http'

export default {
    // 获取用户  
    getUser(page, size) {
        return get(`${base.basic}/user/listUsers`, {
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
    // 删除指定用户 
    delUser(userId) {
        return del(`${base.basic}/user/delete`, {
            userId: userId
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
    delUsers(userIds) {
        return del(`${base.basic}/user/delete`, {
            userIds: userIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新用户信息
    updateUser(data) {
        return put(`${base.basic}/user/update`, data).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 搜索用户
    searchUser(account) {
        return get(`${base.basic}/user/search`, {
            account: account
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取用户总数
    getUserCount() {
        return get(`${base.basic}/user/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 新增用户
    addUser(data) {
        return post(`${base.basic}/user/insert`, data).then(value => {
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    }
}