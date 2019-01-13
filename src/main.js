// import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import setFontsize from './assets/js/setFontsize';
import Axios from './assets/js/axios'
import './assets/css/common.css'
import toastRegistry from './assets/js/toastcreate'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
FastClick.attach(document.body)
setFontsize()
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
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