/**
 * 全站权限配置
 * 
 */
import website from '@/config/website'
import router from './router/router'
import store from './store'
import { validatenull } from '@/util/validate'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false });
const homePage = store.getters.website.homePage //博客首页
router.beforeEach((to, from, next) => {
    
    if(validatenull(store.getters.blogLinks)) {
        store.dispatch("fetchBlogLinks")
    }
    if(validatenull(store.getters.blogger)) {
        store.dispatch("fetchBlogger")
    }
    if (to.path) {
        _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }

    //缓冲设置
    if (to.meta.keepAlive === true) {
        to.meta.$keepAlive = true;
    } else {
        NProgress.start()
        if (to.meta.keepAlive === true && validatenull(to.meta.$keepAlive)) {
            to.meta.$keepAlive = true;
        } else {
            to.meta.$keepAlive = false;
        }
    }
    const meta = to.meta || {};
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false || to.path === homePage) {
        next()
    } else {
        next(website.homePage)
    }
})

router.afterEach((to) => {
    NProgress.done();
});