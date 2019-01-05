import './assets/js/flexible'
import './assets/js/flexible_css'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import Axios from './assets/js/axios'
import './assets/css/common.css'

import {
    LoadingPlugin
} from 'vux'

// import {
//     ConfigPlugin
// } from 'vux'
// Vue.use(ConfigPlugin, {
//   $layout: 'VIEW_BOX'
// })
Vue.use(LoadingPlugin)
Vue.prototype.$http = Axios
Vue.config.productionTip = false
FastClick.attach(document.body)
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})