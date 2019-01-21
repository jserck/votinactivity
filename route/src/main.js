import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import setFontsize from './assets/js/setFontsize';
import Axios from './assets/js/axios'
import './assets/css/common.css'
import toastRegistry from './assets/js/toastcreate'
import IsDateBetween from './assets/js/date.js'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
FastClick.attach(document.body)
setFontsize()
router.afterEach((to, from, next) => {
    window.scrollTo(1, 1);
});
let isVoted = IsDateBetween('2019/01/02 10:50', '2019/02/06 24:00');
router.beforeEach((to, from, next) => {
    if (!isVoted && (to.name != 'voted')) {// 判断是否结束
        next({
            path: '/voted',
            query: to.query
        })
    } else {
        next()
    }
})
Vue.use(toastRegistry)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})