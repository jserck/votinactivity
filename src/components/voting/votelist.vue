<template>
     <section>
          <section class="u-myVoteCon-link clearfix" @click="myVoteCon">
               <span class="u-myVoteCon-text">我的投票记录 ></span>
          </section>
          <x-dialog v-model="isViteList" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section class="g-ViteList">
                    <p class="g-ViteList-tit">我的投票记录</p>
                    <scroller lock-x height="100%" @on-scroll="onScroll" ref="scrollerEvent">
                         <div class="box2">
                              <ul>
                                   <li
                                        v-for="i in 15"
                                        :key="i"
                                        class="displayFlex flexAlignItemsCenter flexJustifybetween"
                                   >
                                        <span class="u-img"></span>
                                        <span class="u-name">潘晨凯</span>
                                        <span class="u-count">一亿票</span>
                                   </li>
                              </ul>
                         </div>
                    </scroller>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog, Scroller } from 'vux'
export default {
     components: {
          XDialog, Scroller
     },
     data() {
          return {
               isViteList: false,
               scrollTop: 0,
          }
     },
     created() {

     },
     methods: {
          myVoteCon() {
               this.isViteList = true
          },
          hideHandler() {

          },
          onScroll(pos) {
               this.scrollTop = pos.top
          },
     }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.u-myVoteCon-link {
     position: relative;
     .u-myVoteCon-text {
          margin-right: 0.346667rem /* 13/37.5 */;
          display: inline-block;
          float: right;
          @include setFontSize(14px);
          font-family: "PingFangSC-regular";
          color: #101010;
     }
}
.g-ViteList {
     // width: 6.933333rem /* 260/37.5 */;
     height: 11.253333rem /* 422/37.5 */;
     padding: 0.8rem /* 30/37.5 */ 0.72rem /* 27/37.5 */;
     .g-ViteList-tit {
          text-align: center;
          color: rgba(16, 16, 16, 1);
          @include setFontSize(14px);
          font-family: PingFangSC-regular;
     }
     ul {
          padding-bottom: 0.666667rem /* 25/37.5 */;
          padding-top: 0.666667rem /* 25/37.5 */;
          li {
               margin-top: 0.4rem /* 15/37.5 */;
               .u-img {
                    display: inline-block;
                    width: 1.76rem /* 66/37.5 */;
                    height: 1.76rem /* 66/37.5 */;
                    border-radius: 0.88rem /* 33/37.5 */;
                    background: #101010;
               }
               .u-name,
               .u-count {
                    color: rgba(31, 32, 40, 1);
                    @include setFontSize(12px);
                    font-family: PingFangSC-bold;
               }
          }
     }
}
</style>
