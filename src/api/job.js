/**
 * job模块接口与列表
 */
import base from './base'
import {get, del, put, post } from '@/utils/http'

export default {
    // 获取资讯
    getJob(page, size) {
        return get(`${base.basic}/jobInformation/listInformationJobs`, {
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
    delJob(jobId) {
        return del(`${base.basic}/jobInformation/delete`, {
            jobId: jobId
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
    delJobs(jobIds) {
        return del(`${base.basic}/jobInformation/delete`, {
            jobIds: jobIds
        }).then(value => {
            // console.log(value);
            return value;
        }, err => {
            // console.log(err);
            return err;
        });
    },
    // 更新资讯信息
    updateJob(data) {
        return put(`${base.basic}/jobInformation/update`, data).then(value => {
            console.log(value);
            return value;
        }, err => {
            console.log(err);
            return err;
        })
    },
    // 搜索资讯
    searchJob(jobName) {
        return get(`${base.basic}/jobInformation/search`, {
            jobName: jobName
        }).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 获取资讯总数
    getJobCount() {
        return get(`${base.basic}/jobInformation/count`).then(value => {
            // console.log(value.data);
            return value.data;
        }, err => {
            // console.log(err);
            return err;
        })
    },
    // 新增资讯
    addJob(data) {
        return post(`${base.basic}/jobInformation/insert`, data).then(value => {
            return value;
        }, err => {
            // console.log(err);
            return err;
        })
    }
}