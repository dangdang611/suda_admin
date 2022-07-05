/**
 * news 模块接口与列表
 */
import base from './base'
import {get, del, put, post } from '@/utils/http'

export default {
    // 获取资讯
    getNews(page, size) {
        return get(`${base.basic}/newsInformation/listInformationNews`, {
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
    // 删除指定资讯
    delNews(newsId) {
        return del(`${base.basic}/newsInformation/delete`, {
            newsId: newsId
        }).then(value => {
            // console.log(value);
            // 需要用到value中的code和message
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 删除多个资讯
    delNewss(newsIds) {
        return del(`${base.basic}/newsInformation/delete`, {
            newsIds: newsIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新资讯信息
    updateNews(data) {
        return put(`${base.basic}/newsInformation/update`, data).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 搜索资讯
    searchNews(newsTitle) {
        return get(`${base.basic}/newsInformation/search`, {
            newsTitle: newsTitle
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取资讯总数
    getNewsCount() {
        return get(`${base.basic}/newsInformation/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 新增资讯
    addNews(data) {
        return post(`${base.basic}/newsInformation/insert`, data).then(value => {
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    }
}