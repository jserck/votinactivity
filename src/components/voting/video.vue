<template>
     <section class="g-video">
          <section class="g-video-container">
               <section class="u-video-book"></section>
               <section class="u-video-text"></section>
               <section class="video-play" v-show="isInter">
                    <video-player
                         class="video-player vjs-custom-skin"
                         ref="videoPlayer"
                         :playsinline="true"
                         :options="playerOptions"
                         webkit-playsinline="true"
                         x5-video-player-fullscreen="true"
                         @play="onPlayerPlay($event)"
                         @ended="onPlayerEnded($event)"
                         @error="errorHandler"
                         @waiting="onPlayerWaiting($event)"
                         @statechanged="playerStateChanged"
                         @canplay="onPlayerCanplaythrough($event)"
                    ></video-player>
               </section>
               <section
                    class="g-inter displayFlex flexColumn flexAlignJustifyCenter"
                    v-if="!isInter"
               >
                    <section v-if="!isInter">
                         <p>最糟糕的是没网了!</p>
                         <span class="refale" @click="refale">刷新</span>
                    </section>
                    <!-- <p v-if="isWait">正在努力加载视频</p> -->
               </section>
               <!-- <section
                    class="g-inter displayFlex flexColumn flexAlignJustifyCenter"
                    v-if="isWait&&isInter"
               >
                    <p>视频正在努力加载中!</p>
               </section>-->
          </section>
     </section>
</template>
<script>
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'

export default {
     props: ['dialogOpations'],
     components: {
          videoPlayer
     },
     data() {
          return {
               isVideo: true,
               inter: 1,
               isWait: false,
               isInter: true,
               playerOptions: {
                    // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                         type: "",
                         src: this.dialogOpations.src
                    }],
                    // poster: "", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                         timeDivider: true,//时间分割线
                         durationDisplay: true,//总时长
                         //  remainingTimeDisplay: true,
                         fullscreenToggle: true, //全屏按钮
                         chaptersButton: false,
                         playbackRateMenuButton: false,//快速
                         subtitlesButton: false,
                         remainingTimeDisplay: true,//倒计时
                         // progressControl: true,//进度条
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

          },
          onPlayerEnded() {
               //   this.$refs.videoPlayer.player.play();
               //   this.$refs.videoPlayer.player.load();
               //    this.$refs.videoPlayer.player.src(this.dialogOpations.src);
          },
          errorHandler() {
               // this.$toast('网络不调顺畅，请重新播放');
               this.isInter = false;

          },
          onPlayerWaiting() {
               // if (navigator && navigator.onLine == false) {
               // this.isWait = true;
               //     return;
               // }
               // this.isWait = true;
          },
          onPlayerCanplaythrough() {
               // this.isWait = false;
               // this.isWait = false;
               //    if (navigator && navigator.onLine == false) {
               //         this.isInter = false;
               //    }
          },
          playerStateChanged(e) {
               // if (navigator && navigator.onLine == false) {
               //      this.isInter = false;
               // }
          },
          //   onloadstart(e) {
          // if (navigator && navigator.onLine == false) {
          //      this.isInter = false;
          // }
          //   },
          refale() {
               if (!this.isInter) {
                    this.isInter = true;
               }
               setTimeout(() => {
                    this.$nextTick(() => {
                         this.onPlayerEnded()
                    })
               }, 0)
          }
     },
     computed: {
          player() {
               return this.$refs.videoPlayer.player
          }
     },
     beforeDestroy() {
          window.removeEventListener("offline", function (e) {
               this.isInter = false;
               this.$refs.videoPlayer.player.pause();
          }.bind(this))
          window.removeEventListener("online", function (e) {
               this.isInter = true;
               // this.$refs.videoPlayer.player.play();
          }.bind(this))
     },
     mounted() {
          this.$emit("btn_show", 6);
          //   if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          window.addEventListener("offline", function (e) {
               this.isInter = false;
               this.$refs.videoPlayer.player.pause();
          }.bind(this))
          window.addEventListener("online", function (e) {
               this.isInter = true;
               // this.$refs.videoPlayer.player.play();
          }.bind(this))
          //   }
     }
}
</script>

<style lang="scss" scoped>
.g-video {
     // overflow: hidden;
     position: relative;
     margin: 30vh auto 0;
     box-sizing: border-box;
     background: #000;
     .g-video-container {
          .g-inter {
               width: 100%;
               line-height: 0.4rem;
               color: #fff;
               font-size: 0.2rem;
          }
          // position: relative;
          margin: auto;
          width: 7.03rem;
          height: 4.21rem /* 490/100 */;
          @include background("~@/assets/img/videoborder.png");
          display: flex;
          transform: none;
          .video-play {
               overflow: hidden;
               margin: auto;
               width: 6.5rem;
          }
          .u-video-book {
               position: absolute;
               z-index: 9999999;
               left: 0.55rem;
               top: -1.29rem;
               width: 2.33rem;
               height: 1.42rem;
               @include background("~@/assets/img/videobook.png");
          }
          .u-video-text {
               position: absolute;
               right: 0.68rem;
               top: -1.46rem;
               width: 3.98rem;
               height: 1.56rem;
               @include background("~@/assets/img/videotit.png");
          }
     }
}
/* 全景（横屏）模式 */
@media screen and (orientation: landscape) {
     .g-video {
          // overflow: hidden;
          width: 40%;
          position: relative;
          margin: auto;
          box-sizing: border-box;
          background: #000;
          .g-video-container {
               // position: relative;
               margin: auto;
               width: 100%;
               @include background("");
               .video-play {
                    overflow: hidden;
                    margin: auto;
                    width: 6.5rem;
               }
               .u-video-book {
                    display: none;
               }
               .u-video-text {
                    display: none;
               }
          }
     }
}
</style>
<style lang="scss">
.video-js {
     font-size: 0.1rem /* 10/100 */ !important;
}
.video-js .vjs-control-bar {
     font-size: 0.14rem /* 14/100 */ !important /* 14/37.5 */;
}
.video-js .vjs-big-play-button {
     width: 0.5rem /* 50/100 */ !important;
     height: 0.5rem /* 50/100 */ !important;
     border-radius: 0.25rem /* 25/100 */ !important ;
     top: 50% !important;
     left: 50% !important;
     margin-top: -0.25rem /* -25/100 */ !important ;
     margin-left: -0.25rem /* -25/100 */ !important;
}
button {
     outline: none !important;
}
</style>
