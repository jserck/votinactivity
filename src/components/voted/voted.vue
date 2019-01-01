<template>
     <section class="m-voted">
          <!-- 投票排名 -->
          <section class="g-voted-raking">
               <h1>XXX星势力</h1>
               <p>活动规则</p>
               <section>
                    <h1>共投出XXX张选票</h1>
                    <section></section>
                    <ul>
                         <li></li>
                    </ul>
               </section>
          </section>
          <!-- 明星书单 -->
          <section class="g-star-bookList">
               <StarBook @videoPlay="videoPlay">
                    <template slot-scope="{ indexNum }">
                         <section class="g-scroll-book">
                              <scroller lock-y :scrollbar-x="false">
                                   <section class="g-scroll-book-box displayFlex">
                                        <section class="g-box-item" v-for="i in 6" :key="i">
                                             <BookItem :indexNum="indexNum"></BookItem>
                                        </section>
                                   </section>
                              </scroller>
                         </section>
                    </template>
               </StarBook>
          </section>
     </section>
</template>
<script>
import { XInput, Scroller, XButton } from 'vux'
export default {
     components: {
          XInput, Scroller, XButton,
          StarBook: () => import('../common/starbook.vue'),
          BookItem: () => import('../common/bookitem.vue'),
          //   Btn: () => import('../common/btn.vue'),
          //   FirstIn: () => import('./firstin.vue'),
          //   Attention: () => import('./attention.vue'),
          //   Video: () => import('./video.vue')
     },
     data() {
          return {
               isVideo: false
          }
     },
     methods: {
          videoPlay(src) {
               /**
                * 视频播放
               */
               this.$vux.loading.show()
               setTimeout(() => {
                    this.$vux.loading.hide()
                    this.isVideo = true
                    console.log(src);
               }, 1000)
          }
     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.m-voted {
     overflow: hidden;
     .g-star-bookList {
          .u-star-tit {
               padding-left: 0.453333rem /* 17/37.5 */;
               color: rgba(16, 16, 16, 1);
               @include setFontSize(18px);
               font-family: PingFangSC-regular;
               line-height: 0.666667rem /* 25/37.5 */;
          }
          .g-scroll-star {
               margin-top: 0.266667rem /* 10/37.5 */;
               .g-scroll-star-box {
                    padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                    width: 13.44rem /* 504/37.5 */;
                    .u-box-item {
                         margin-left: 0.48rem /* 18/37.5 */;
                         width: 1.76rem /* 66/37.5 */;
                         text-align: center;
                         .u-box-item-img {
                              display: block;
                              width: 1.76rem /* 66/37.5 */;
                              height: 1.76rem /* 66/37.5 */;
                              border-radius: 0.88rem /* 33/37.5 */;
                              background: #101010;
                         }
                         .u-box-item-name {
                              color: rgba(31, 32, 40, 1);
                              @include setFontSize(12px);
                              font-family: PingFangSC-bold;
                         }
                    }
               }
          }
          .g-scroll-book {
               .g-scroll-book-box {
                    padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                    width: 26.08rem /* 978/37.5 */;
               }
               .g-box-item {
                    margin-right: 0.693333rem /* 26/37.5 */;
               }
          }
          .g-star-video {
               position: relative;
               margin: 0.8rem /* 30/37.5 */ auto;
               width: 7.2rem /* 270/37.5 */;
               height: 3.04rem /* 114/37.5 */;
               background: #101010;
               border-radius: 0.186667rem /* 7/37.5 */;
               .u-video-icon {
                    position: absolute;
                    left: 50%;
                    margin-left: -0.373333rem /* 14/37.5 */;
                    top: 50%;
                    margin-top: -0.373333rem /* 14/37.5 */;
                    width: 0.746667rem /* 28/37.5 */;
                    height: 0.746667rem /* 28/37.5 */;
                    background: #fff;
                    border-radius: 0.373333rem /* 14/37.5 */;
               }
          }
          .g-star-recommend {
               position: relative;
               margin: 0.8rem /* 30/37.5 */ auto;
               width: 7.2rem /* 270/37.5 */;
               height: 3.04rem /* 114/37.5 */;
               background: #101010;
               border-radius: 0.186667rem /* 7/37.5 */;
          }
     }
}
</style>
