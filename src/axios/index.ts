// import { App } from  'vue'
import axios from 'axios'
// const qs = require('qs')
// import $util from '@/util/index'
// import { AxiosRequestInterface } from '@/inter/axiosInterface'
//
// 定义加载提示消息
const glo_load_key: string = 'glo_loading';
// 是否为预发环境，预发展示接口错误提示
const node_env_dev: boolean = process.env.NODE_ENV === 'development';
// 请求地址
const basicUrl: string = '/pvs';

/**
 * 定义 axios 请求基本参数
 */
const service = axios.create({
    baseURL: basicUrl,
    timeout: 9000 // 请求超时时间
});

// // 添加 axios 请求拦截器
// service.interceptors.request.use(config => {
//     // 请求发送之前操作
//     // const token = $util.storage(ACCESS_TOKEN)
//     // token && (config.headers[ 'X-Access-Token' ] = token)
//     // try {
//     //     config.options.isLoading && $util.$message.loading({ content: config.options.loadMsg || '加载中...', key: config.options.key || glo_load_key, duration: 0.5 })
//     // } catch (e) {
//     //     console.log(e)
//     // }
//     // if (config.options && config.options.create) {
//     //     config = { ...config, ...config.options.create }
//     // }
//     return config
// }, error => {
//     // 请求失败的操作
//     // $util.log(error, { type: 'axios', title: 'request:error' })
//     // if (node_env_dev) $util.$message.error(error || '请求异常，请查看接口信息')
//     return Promise.reject(error)
// })
//
// // 添加请求拦截器
// service.interceptors.request.use();
//
// // 添加响应拦截器
// service.interceptors.response.use();
//
//
// // declare module '@vue/runtime-core' {
// //     interface ComponentCustomProperties {
// //         $axios: axios
// //     }
// // }
// export function get(data: AxiosRequestInterface) {
//     return axios(data.url, {}).then(res => {
//       console.log(res)
//     }).catch(err => {
//         console.log(err)
//     })
// }
// export default {
//     install(app: App) {
//         app.config.globalProperties.$axios = {
//             get
//         }
//     }
// }

/**
 * 定义 axios 调用失败函数
 * @param error
 */
function errorState(error) {
    // if (!error.response) {
    //     return error
    // }
    // let msg = null
    // const data = error.response.data
    // const token = Vue.ls.get(ACCESS_TOKEN)
    // const status = String(error.response.status)
    // switch (status) {
    //     case '400':
    //         msg = '请求语法错误，联系管理员'
    //         break
    //     case '401':
    //         msg = '未授权，请重新登录'
    //         if (token) {
    //             $store.dispatch('Logout').then(() => {
    //                 setTimeout(() => {
    //                     window.location.reload()
    //                 }, 1500)
    //             })
    //         }
    //         break
    //     case '403':
    //         msg = '拒绝访问'
    //         break
    //     case '404':
    //         msg = '很抱歉，资源未找到!'
    //         break
    //     case '500':
    //         msg = '服务器内部错误，联系管理员'
    //         if (token && data.message && (data.message === 'Token失效，请重新登录' || data.message.indexOf('Token失效，请重新登录') != -1)) {
    //             msg = '很抱歉，登录已过期，请重新登录'
    //             $util.$modal.error({
    //                 title: '登录已过期',
    //                 content: msg,
    //                 okText: '重新登录',
    //                 mask: false,
    //                 key: glo_load_key,
    //                 onOk: () => {
    //                     $store.dispatch('Logout').then(() => {
    //                         Vue.ls.remove(ACCESS_TOKEN)
    //                         window.location.reload()
    //                     })
    //                 }
    //             })
    //         }
    //         break
    //     case '504':
    //         msg = '网络超时'
    //         break
    //     case '999':
    //         window.local.href = ''
    //         break
    //     default:
    //         msg = error.message
    // }
    // msg && $util.$notification.error({ message: '系统提示', description: msg, key: glo_load_key, duration: 4 })
    return error
}

/**
 * 定义 axios 调用成功函数
 * @param res
 */
function successState(res) {
    return res
}

/**
 * 封装 axios
 * @param method
 * @param url
 * @param data
 * @param headers
 * @param success
 * @param error
 * @param options
 */
function callAxios(method, url, data, headers, success, error, options) {
    const httpDefault = {
        method,
        url,
        headers: headers || {},
        params: method === 'GET' || method === 'DELETE' ? data : null,
        data,
        options
    }
    return new Promise((resolve, reject) => {
        service(httpDefault).then((res) => {
            if (success)success(successState(res))
            resolve(successState(res))
        }).catch((response) => {
            if (error)error(errorState(response))
            reject(errorState(response))
        })
    })
}

/**
 * 数据解析
 * @param url
 * @param data
 * @param header
 * @param success
 * @param error
 * @param options
 */
function dataParsing(url, data, header, success, error, options = {}) {
    if (typeof success == 'object') {
        options = success
        header = Object.assign(header, success.headers)
        success = null; error = null
    } else if (typeof error == 'object') {
        options = error
        header = Object.assign(header, error.headers)
        error = null
    }
    return { url, data, header, success, error, options }
}

const request = {
    get: (_url, _data, _success, _error, _options = {}) => {
        const _header = { 'Content-Type': 'application/json' }
        const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
        let data_temp = {}
        if (url.indexOf('sys/dict/getDictItems') < 0) {
            data_temp = {
                _t: Date.parse(String(new Date())) / 1000,
                ...data
            }
        }
        return callAxios('GET', url, data_temp, header, success, error, options)
    },

    post: (_url, _data, _success, _error, _options = {}) => {
        // data 编译为 query string parameters ,: a=1&b=2&c=3
        // 后台使用 HttpServletRequest request 接收， request.getParameter("a")获取
        const _header = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
        // const data_temp = qs.stringify(data)
        const data_temp = (data)
        return callAxios('POST', url, data_temp, header, success, error, options)
    },

    postBody(_url, _data, _success, _error, _options = {}) {
        // @requestBody Param param 使用， param.getOrderNo() 获取
        // data 键值对、 不编译为 query string parameters
        const _header = { 'Content-Type': 'application/json;charset=utf-8' }
        const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
        return callAxios('POST', url, data, header, success, error, options)
    },

    upLoad(_url, _data, _success, _error, _options = {}) {
        // this.$axios.upload('/sys/common/upload',formData).then(res=>console.log(res))
        const _header = { 'Content-Type': 'multipart/form-data; boundary=something' }
        const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
        const formData = new FormData()
        formData.append('file', data.file)
        if (data.biz)formData.append('biz', data.biz)
        return callAxios('POST', url, formData, header, success, error, options)
    },

    localFile(url) {
        // this,$axios.localFile(url);
        if (url.indexOf('http') < 0) {
            url = '/static/' + url
        }
        return callAxios('get', url, {}, {}, '', '', { create: { baseURL: '/' }})
    }

}
export const get = request.get
export const post = request.post
export const postBody = request.postBody
export default request