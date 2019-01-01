<template>
     <section>
          <section class="u-star-tit">
               <span>明星书单</span>
          </section>
          <section class="g-scroll-star">
               <scroller lock-y :scrollbar-x="false">
                    <section class="g-scroll-star-box displayFlex">
                         <section
                              :class="indexNum == i ? 'u-box-item-active':'u-box-item-link'"
                              v-for="i in 6"
                              :key="i"
                              @click="starChange(i)"
                         >
                              <span class="u-box-item-img"></span>
                              <span class="u-box-item-name">名字</span>
                         </section>
                    </section>
               </scroller>
          </section>
          <section class="g-star-video" @click="videoPlay">
               <span class="u-video-icon"></span>
          </section>
          <section class="g-star-recommend"></section>
          <slot :indexNum="indexNum"></slot>
     </section>
</template>
<script>
import { Scroller } from 'vux'
export default {
     components: {
          Scroller
     },
     data() {
          return {
               indexNum: 1,
          }
     },

     methods: {
          videoPlay() {
               this.$emit('videoPlay', '1')
          },
          starChange(index) {
               this.$vux.loading.show()
               setTimeout(() => {
                    this.$vux.loading.hide()
                    this.indexNum = index
               }, 1000)
          }
     },
     created() {

     }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin.scss";
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
          .u-box-item-link {
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
          .u-box-item-active {
               margin-left: 0.48rem /* 18/37.5 */;
               width: 1.76rem /* 66/37.5 */;
               text-align: center;
               .u-box-item-img {
                    display: block;
                    width: 1.76rem /* 66/37.5 */;
                    height: 1.76rem /* 66/37.5 */;
                    border-radius: 0.88rem /* 33/37.5 */;
                    background: #d31313;
               }
               .u-box-item-name {
                    color: #d31313;
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
          .u-box-item-link {
               margin-right: 0.693333rem /* 26/37.5 */;
               width: 3.653333rem /* 137/37.5 */;
               .u-book-img {
                    width: 3.653333rem /* 137/37.5 */;
                    height: 3.76rem /* 141/37.5 */;
                    background: #101010;
               }
               p {
                    color: rgba(16, 16, 16, 1);
                    @include setFontSize(14px);
                    font-family: PingFangSC-regular;
               }
               .u-author-name {
                    color: rgba(16, 16, 16, 1);
                    @include setFontSize(12px);
                    font-family: PingFangSC-regular;
               }
          }
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
</style>
