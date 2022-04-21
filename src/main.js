import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission'; // 权限
import './error'; // 日志
import store from './store';
import importDirective from '@/directive'
import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env';
import * as filters from './filters' // 全局filter
import './assets/styles/common.scss';

import basicContainer from './components/basic-container/main'
// 粘贴复制
// import VueClipboard from 'vue-clipboard2'
// 插件 json 展示
// import vueJsonTreeView from 'vue-json-tree-view'

// 屏幕滚动
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

//瀑布流
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)

Vue.use(ElementUI)

Vue.use(router)

// Vue.use(VueClipboard)

// Vue.use(vueJsonTreeView)

Vue.use(VueAxios, axios)

/**
 * 注册指令
 */
importDirective(Vue)

//注册全局容器
Vue.component('basicContainer', basicContainer)
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
})

// 加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 动态加载阿里云字体库
// iconfontVersion.forEach(ele => {
//   loadStyle(iconfontUrl.replace('$key', ele));
// })
// 阿里图标库
import "@/assets/font/iconfont/iconfont.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')