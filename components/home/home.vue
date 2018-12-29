<template>
     <section>
          <x-dialog v-model="video_dialog"></x-dialog>
          <tab :scroll-threshold="8" :line-width="1" active-color="#fc378c" v-model="index">
               <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
               <tab-item @on-item-click="onItemClick">未发货</tab-item>
               <tab-item @on-item-click="onItemClick">全部订单</tab-item>
               <tab-item selected @on-item-click="onItemClick">已发货</tab-item>
               <tab-item @on-item-click="onItemClick">未发货</tab-item>
               <tab-item @on-item-click="onItemClick">全部订单</tab-item>
          </tab>
          <swiper v-model="index" height="100px" :show-dots="false">
               <swiper-item v-for="(item, index) in 6" :key="index">
                    <div class="tab-swiper vux-center" v-if="index!=3">{{index}}</div>
                    <div style="height:500px" v-else></div>
               </swiper-item>
          </swiper>
          <div class="video-container">
               <video-player
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    customEventName="customstatechangedeventname"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied"
               ></video-player>
          </div>
     </section>
</template>
<script>
import { XDialog, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
     components: {
          XDialog,
          Tab,
          TabItem,
          Swiper,
          SwiperItem,
          videoPlayer,
     },
     data() {
          return {
               video_dialog: false,
               index: 0,
               playerOptions: {
                    // videojs options
                    muted: false,
                    // fluid: true,//流体模式
                    aspectRatio: '3:4',//宽高比
                    height: 500,
                    preload: 'auto',
                    language: 'zh-CN',
                    width: 375,
                    responsive: true,
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    poster: "/static/images/author.jpg",
                    autoplay: false, // 自动播放
                    controls: true, // 是否显示控制栏
                    techOrder: ['html5'], // 兼容顺序
                    sourceOrder: true, //
                    flash: { hls: { withCredentials: false } },
                    html5: { hls: { withCredentials: false } },
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    sources: [{
                         type: "video/mp4",
                         src: "http://124.193.228.158/om.tc.qq.com/AcQbCn8imK35KPvrUuQPZ_sj7YfI_D2oBOjdVqoeuaBo/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/p08203zzxi8.mp4?sdtfrom=v1105&guid=1d054540b0a93cf9d70e4cb82282e5b4&vkey=D3CA91AB060BC92649DDB48557DCB8AE63DF1B34296EF8DA29C61E012CA6B1A209E3FAA730F1655D19FB2ADDC29013B4B101587DCBEF73CFE12F4A8333C7CA27C20E22C8BF781ABCB13E296EC9D43AB83BE91CF92FA600C21879252ED589828C9F778C0CAC87EDDF949E83F05619847D1F688D006458D91F"
                    }],
                    controlBar: { // 配置控制栏
                         timeDivider: true, // 时间分割线
                         durationDisplay: true, // 总时间
                         progressControl: true, // 进度条
                         customControlSpacer: true, // 未知
                         fullscreenToggle: true // 全屏
                    },
               },

          }
     },
     created() {

     },
     computed: {
          player() {
               return this.$refs.videoPlayer.player
          }
     },
     mounted() {
          console.log('this is current player instance object', this.player)
     },
     methods: {
          onItemClick() { },
          // listen event
          onPlayerPlay(player) {
               console.log('player play!', player)
          },
          onPlayerPause(player) {
               console.log('player pause!', player)
          },
          // ...player event

          // or listen state event
          playerStateChanged(playerCurrentState) {
               console.log('player current update state', playerCurrentState)
          },

          // player is ready
          playerReadied(player) {
               console.log('the player is readied', player)
               // you can use it to do something...
               // player.[methods]
          },
          onPlayerEnded() { },
          onPlayerWaiting() { },
          onPlayerPlaying() { },
          onPlayerLoadeddata() { },
          onPlayerTimeupdate() { },
          onPlayerCanplay() { },
          onPlayerCanplaythrough() { },
          playerStateChanged() { },
     }
}
</script>
<style scoped>
.video-container {
     width: 50%;
     max-width: 750px;
}
</style>
<style>
.video-js .vjs-big-play-button {
     /*
      播放按钮换成圆形
     */
     position: absolute;
     top: 50%;
     margin-top: -1em;
     left: 50%;
     margin-left: -1em;
     height: 2em;
     width: 2em;
     line-height: 2em;
     border-radius: 1em;
     margin: auto;
}
</style>

