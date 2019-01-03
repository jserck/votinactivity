// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import Axios from './assets/js/axios'
import './assets/css/common.css'
import './assets/js/flexible'
import './assets/js/flexible_css'
import {
  LoadingPlugin
} from 'vux'
import {
  ConfigPlugin
} from 'vux'

// Vue.use(ConfigPlugin, {
//   $layout: 'VIEW_BOX'
// })
Vue.use(LoadingPlugin)

Vue.prototype.$http = Axios
Vue.config.productionTip = false
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
