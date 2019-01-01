<template>
     <section>
          <x-dialog
               v-model="isVideo"
               :dialog-style="dialogStyle"
               @on-hide="hideHandler"
               hide-on-blur
               class="dialog-demo"
          >
               <section class="g-video">
                    <video-player
                         class="video-player vjs-custom-skin"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
                         @play="onPlayerPlay($event)"
                         @pause="onPlayerPause($event)"
                    ></video-player>
                    <!-- <p class="u-noWifi" v-if="inter === 0">播放视频会消耗手机流量</p>
                    <section class="g-noInter" v-else>
                         <p>最尴尬的事情是断网了</p>
                         <span>刷新</span>
                    </section>
                    <section class="u-icon" v-if="false"></section>-->
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog } from 'vux'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
export default {
     props: {

     },
     components: {
          XDialog,
          videoPlayer
     },
     data() {
          return {
               isVideo: true,
               inter: 1,
               dialogStyle: {
                //     width: '8.293333rem',
                    //     height: '13.066667rem'
               },

               playerOptions: {
                    width: "100%",
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '300:490', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                         type: "",
                         src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'//url地址
                    }],
                    poster: "", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                         timeDivider: true,//时间分割线
                         durationDisplay: true,//总时长
                         //  remainingTimeDisplay: true,
                         fullscreenToggle: true, //全屏按钮
                         //  chaptersButton: true,
                         playbackRateMenuButton: false,//快速
                         //  subtitlesButton: true,
                         remainingTimeDisplay: false,//倒计时
                         progressControl: true,
                         volumeMenuButton: {
                              inline: false,
                              vertical: true
                         },//竖着的音量条
                    }
               }
          }
     },
     methods: {
          hideHandler() {
               this.$emit('dialogClose', false);
          },
          onPlayerPlay() {

          },
          onPlayerPause() {

          }
     },
     computed: {
          //      this.$refs.videoPlayer.player.src('要切换的rtmp地址');
          player() {
               return this.$refs.videoPlayer.player
          }
     },
     created() {
          //   console.log(videoPlayer);
     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";

.g-video {
     overflow: hidden;
     position: relative;
     width: 100%;
     height: 100%;
     box-sizing: border-box;
     .u-icon {
          position: absolute;
          top: 50%;
          margin-top: -0.4rem /* 15/37.5 */;
          left: 50%;
          margin-left: -0.4rem /* 15/37.5 */;
          width: 0.8rem /* 30/37.5 */;
          height: 0.8rem /* 30/37.5 */;
          background: #000;
          border-radius: 0.4rem /* 15/37.5 */;
     }
     .u-noWifi {
          margin-top: 5.066667rem /* 190/37.5 */;
     }
     .g-noInter {
          margin-top: 5.386667rem /* 202/37.5 */;
          span {
               display: block;
               margin: 0.986667rem /* 37/37.5 */ auto 0;
          }
     }
}
</style>
<style lang="scss">
// .weui-dialog {
//      max-width: 750px;
// }
// .vjs-custom-skin > .video-js .vjs-control{
//         width:1.2rem /* 45/37.5 */;
// }
</style>