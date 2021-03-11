/**
 * 全站http配置
 *
 * header参数说明
 * serialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import qs from 'qs'
import store from '@/store/'
import { serialize } from '@/util/util'
import { Message, MessageBox } from 'element-ui'
import errorCode from '@/const/errorCode'
import website from '@/config/website'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
    return status >= 100 && status <= 511; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    const isToken = (config.data || {}).isToken === false
    let readerToken = store.getters.readerAccessToken
    if (readerToken && !isToken) {
        config.headers['Oauth'] = 'Bearer ' + readerToken
    }
    //headers中配置serialize为true开启序列化
    if (config.methods === 'post' && config.headers.serialize) {
        config.data = serialize(config.data);
        delete config.data.serialize;
    }
    // 对get请求做参数处理
    if (config.method === 'get' && config.params) {
        if (config.url.indexOf('?') === -1) {
            config.url = config.url + '?' + qs.stringify(config.params)
        } else {
            config.url = config.url + '&' + qs.stringify(config.params)
        }
        config.params = null
    }
    return config
}, error => {
    return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const status = Number(res.status) || 200;
    const statusWhiteList = website.statusWhiteList || [];
    const message = res.data.msg  || errorCode[status] || errorCode['default'];
    //如果是401则跳转到登录页面
    if (status === 401) {
        MessageBox.confirm(
            '登陆已失效,请重新登录',
            '确定登出',
            {
                confirmButtonText: '重新登录',
                type: 'warning',
                showClose: false,
                showCancelButton: false,
                closeOnPressEscape: false
            }
        ).then(() => {
            store.dispatch('FedLogOut').then(() => {
                outer.push({ path: website.homePage})
            });
        })
        return Promise.reject(new Error(message))
    } else if(status === 511) {
        MessageBox.alert(
            '登陆已失效,请重新登录',
            '消息',
            {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false,
                showCancelButton: false,
                closeOnPressEscape: false
            }
        ).then(() => {
            store.dispatch('readerLogout')
        })
        return Promise.reject(new Error(message))
    }
    //如果请求为200则放过，否者默认统一处理,或者在website中配置statusWhiteList白名单自行处理
    if ((status !== 200 || res.data.code === 1 ) && !statusWhiteList.includes(status)) {
        Message({
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }
    // 如果是白名单类型放入catch自行处理
    if (status !== 200) {
        return Promise.reject(res);
    }
    return res;
}, error => {
    console.log(error);
    NProgress.done();
    return Promise.reject(new Error(error));
})

export default axios;