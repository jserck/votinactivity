/**
 *@type vue脚手架项目入口配置文件
 *@role vue实例化，路由，ajax以及全局插件的注册
 */
import Vue from 'vue'
import App from './App'
//路由注册
import router from './router'
//解决移动端click事件300延迟
import fastclick from 'fastclick'
//ajax封装
import Http from './assets/js/axios'
//移动端淘宝适配方案
import './assets/js/flexible'
import './assets/js/flexible_css'
//全局css规范
import './assets/css/common.css'
//通用链接
import {
     url
} from './assets/js/urlLocation'

Vue.prototype.$http = Http
Vue.prototype.$url = url
Vue.config.productionTip = false
fastclick.attach(document.body)
router.afterEach((to, from, next) => {
     window.scrollTo(0, 0)
})
let vm = new Vue({
     el: '#app',
     router,
     template: '<App/>',
     components: {
          App
     },
})
