/**
 * Copyright (c) 技术部门出品 zgxt2016@163.com
 */
import axios from 'axios'
import {bus} from "../plugins/bus";
import {host} from './api'
import {errorMsg, getItem, setItem} from "../plugins/tool";

let is_token_locked = false
export const TOKEN_OBJ_ID = 'token_json_key'    // token存储名
export const TOKEN_EXPIRES_HOURS = 4            // token过期时间


// 获取token
export function fetchToken () {
    let tokenInfo = getItem(TOKEN_OBJ_ID)
    return tokenInfo ? tokenInfo.access_token : null
}

// 根据token 获取用户信息
export const getUserInfo = params => {
    return initAxios().post(`/getUserInfo`, params).then(res => res.data).then((res) => {
        if (res.status == 1) {
            setItem('userInfo', res.data)
            if (res.data.is_login_forbidden) {
                bus.$emit('logout')
            }
            if (res.data.notice_pwd_chg != null) {
                alert(res.data.notice_pwd_chg)
            }
            bus.$emit('updateUserInfo')
            bus.$emit('leaveLoginPage')
        } else {
            console.log(res.msg)
        }
    }).catch(errorHandle)
}

// 设置登录的信息
export const setLoginInfo = (data) => {
    data.expires_time = new Date().getTime() + TOKEN_EXPIRES_HOURS * 3600 * 1000
    setItem(TOKEN_OBJ_ID, data)
}

// 获得accesstoken或者openid
export const getOAuth = params => {
    return initAxios().post(`/oAuth`, params).then(res => res.data)
}

export const checkBankCard = () => {
    let bank_card = getItem('userInfo').bankCards
    let len = bank_card.length
    if (len === 0) {
        alert('请先绑定银行卡')
    }
    return len
}

// 刷新用户token信息
export const refreshToken = params => {
    return axios.create({baseURL: host, timeout: 10000}).post(`/refreshToken`, params).then(res => res.data)
}

// 初始化一个 axios instance
export default function initAxios () {
    let tokenInfo = getItem(TOKEN_OBJ_ID)
    let time = new Date().getTime()
    let token = fetchToken()

    // 如果token被锁
    if (token && is_token_locked) {
        return false
    }

    let authHeader = 'Bearer ' + token
    let init = axios.create({
        baseURL: host,
        headers: {Authorization: authHeader},
        timeout: 10000,
        validateStatus: function (status) {
            return status >= 200 && status < 300
        }
    })
    init.interceptors.request.use(function (config) {
        if (tokenInfo && tokenInfo.expires_time) {
            // 登录过期，删除token信息
            if (tokenInfo.expires_time < time) {
                setItem(TOKEN_OBJ_ID, '')
                config.headers.Authorization = '' // 清空请求的身份验证
                tokenInfo = ''
            }
        }
        return config
    })
    init.interceptors.response.use(function (response) {
        if (tokenInfo && tokenInfo.expires_time) {
            if (tokenInfo.refresh_token && (tokenInfo.expires_time - TOKEN_EXPIRES_HOURS * 0.8 * 3600 * 1000) < time) {
                is_token_locked = true // 锁定token，防止在更新token时其他请求出现验证失败错误
                refreshToken({'refresh_token': tokenInfo.refresh_token}).then((res) => {
                    if (res.status == 1) {
                        setLoginInfo(res.data)
                    } else {
                        setItem('TOKEN_OBJ_ID', '')
                    }
                }).then((res) => {
                    is_token_locked = false
                })
            }
        }
        return response
    })
    return init
}

export function initJavaAxios () {
    let tokenInfo = getItem(TOKEN_OBJ_ID)
    let time = new Date().getTime()
    let token = fetchToken()

    // 如果token被锁
    if (token && is_token_locked) {
        return false
    }

    let init = axios.create({
        headers: {token: token},
        timeout: 10000,
        validateStatus: function (status) {
            return status >= 200 && status < 300
        }
    })
    init.interceptors.request.use(function (config) {
        if (tokenInfo && tokenInfo.expires_time) {
            // 登录过期，删除token信息
            if (tokenInfo.expires_time < time) {
                setItem(TOKEN_OBJ_ID, '')
                config.headers.Authorization = '' // 清空请求的身份验证
                tokenInfo = ''
            }
        }
        return config
    })
    init.interceptors.response.use(function (response) {
        if (tokenInfo && tokenInfo.expires_time) {
            if (tokenInfo.refresh_token && (tokenInfo.expires_time - TOKEN_EXPIRES_HOURS * 0.8 * 3600 * 1000) < time) {
                is_token_locked = true // 锁定token，防止在更新token时其他请求出现验证失败错误
                refreshToken({'refresh_token': tokenInfo.refresh_token}).then((res) => {
                    if (res.status == 1) {
                        setLoginInfo(res.data)
                    } else {
                        setItem('TOKEN_OBJ_ID', '')
                    }
                }).then((res) => {
                    is_token_locked = false
                })
            }
        }
        return response
    })
    return init
}

// 需要和axios catch 配合使用
export function errorHandle (error) {
    console.log(error)
    let code = error.response.status
    let msgs = {
        400: '语义有误，当前请求无法被服务器理解,请求参数有误',
        401: '请求已经包含了 Authorization 证书，代表着服务器验证已经拒绝了那些证书',
        404: '请求失败，请求所希望得到的资源未被在服务器上发现',
        405: '请求行中指定的请求方法不能被用于请求相应的资源',
        412: '图像验证码错误,服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个',
        500: '服务器错误'
    }
    if (code in msgs) {
        if (code == 401) {
            bus.$emit('logout')
        } else if (code == 500) {
            errorMsg('网络错误,请稍后重试')
        }
    }
}
