import { axios } from '../axios/index'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: '/sys/login',
    method: 'post',
    data: parameter
  })
}



export function logout(logoutToken) {
  return axios({
    url: '/sys/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Access-Token': logoutToken
    }
  })
}

const queryPermissionsByUser = (params) => getAction('/sys/permission/getUserPermissionByToken', params)

export {
  queryPermissionsByUser
}