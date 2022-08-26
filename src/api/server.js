import base from './base'
import {
    post
} from '@/utils/http'


export default {
    // 管理员登录
    login() {
        return post(`${base.basic}/login?root=CWCRootCWC&password=CWCRootCWC`).then(value => {
            //返回所有用户数据，数据存储在value.data中
            return value.data;
        }, err => {
            console.log(err);
            return err;

        });
    },
    // 管理员注销
    logout() {
        return post(`${base.basic}/logout`).then(value => {
            // console.log(value.data);
            //返回所有用户数据，数据存储在value.data中
            return value.data;
        }, err => {
            return err;

        });
    }
}
