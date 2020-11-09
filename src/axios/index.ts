// import { App } from  'vue'
// import axios from 'axios'
// import $util from '@/util/index'
// import { AxiosRequestInterface } from '@/inter/axiosInterface'
//
// // 定义加载提示消息
// const glo_load_key: string = 'glo_loading';
// // 是否为预发环境，预发展示接口错误提示
// const node_env_dev: boolean = process.env.NODE_ENV === 'development';
// // 请求地址
// const basicUrl: string = '/pvs';
//
// /**
//  * 定义 axios 请求基本参数
//  */
// const service = axios.create({
//     baseURL: basicUrl,
//     timeout: 9000 // 请求超时时间
// });
//
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