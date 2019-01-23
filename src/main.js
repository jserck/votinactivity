import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import setFontsize from './assets/js/setFontsize';
import Axios from './assets/js/axios'
import './assets/css/common.css'
import toastRegistry from './assets/js/toastcreate'
//新加
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);
//import 'videojs-contrib-hls/dist/videojs-contrib-hls';

Vue.prototype.$http = Axios
Vue.config.productionTip = false
// FastClick.attach(document.body)
setFontsize()
router.afterEach((to, from, next) => {
    window.scrollTo(1, 1);
});
// let isVoted = IsDateBetween('2019/01/6 00:00', '2019/02/06 00:00');
// router.beforeEach((to, from, next) => {
//     if (!isVoted && (to.name != 'voted')) {// 判断是否结束
//         next({
//             path: '/voted',
//             query: to.query
//         })
//     } else {
//         next()
//     }
// })
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
