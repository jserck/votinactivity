// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/common.css'
import './assets/js/flexible'
import './assets/js/flexible_css'
import FastClick from 'fastclick'
import Axios from './assets/js/axios'
import { LoadingPlugin } from 'vux'

Vue.use(LoadingPlugin)

Vue.prototype.$Http = Axios

Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
})
