<template>
     <section class="m-first">
          <section class="g-firstIn">
               <p
                    class="helpvote"
                    v-if="dialogOpations.type==2&&dialogOpations.nums"
               >成功助力{{dialogOpations.nums}}票</p>
               <section
                    class="isSignInText"
                    v-if="dialogOpations.type==1&&dialogOpations.isSignIn==1"
               >
                    <p>今日签到成功</p>
                    <p>获得一次点赞权和电子书一本</p>
               </section>
               <section
                    class="u-first-getbook u-first-getbook1"
                    v-if="dialogOpations.type==1&&dialogOpations.isSignIn!=1"
               >
                    <p>恭喜免费获得</p>
                    <p>电子书一本</p>
               </section>
               <section class="u-first-getbook getbook2" v-if="dialogOpations.type==2">
                    <p>恭喜免费获得电子书一本</p>
               </section>
               <p
                    class="nocanvote"
                    v-if="dialogOpations.type==2&&dialogOpations.userTicketCount<=0"
               >（您已用完点赞权，做任务即可获取更多点赞权）</p>
               <section
                    class="u-img"
                    :style="`background:url(${dialogOpations.bookPicUrl});
                              backgroundRepeat:no-repeat;
                              backgroundSize:cover
                         `"
               ></section>
          </section>
          <section
               class="u-btn displayFlex flexAlignJustifyCenter"
               v-if="dialogOpations.type==1||dialogOpations.userTicketCount>0"
          >
               <span @click="nextRead">继续阅读</span>
               <span v-scroll="'scroll'" @click="dialogComponentEvent('dialogComponentEvent')">我要充能</span>
          </section>
          <section class="u-btn2" v-else>
               <span @click="dialogComponentEvent('dialogComponentEvent')" v-scroll="'rule'">去做任务</span>
          </section>
     </section>
</template>
<script>
import scroll from '../../assets/js/href.js'
export default {
     props: ['dialogOpations'],
     data() {
          return {

          }
     },
     methods: {
          nextRead() {
               try {
                   my.postmessage({
                       event:'',
                       data:{

                       }
                   })
               } catch (error) {
                   this.$toast('跳转书籍页失败')
               }
          },
          dialogComponentEvent(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 1,
                    eventType
               })
          }
     },

     created() {

     }
}
</script>

<style lang="scss" scoped>
.m-first {
     overflow: hidden;
     margin: auto;
     width: 5.24rem /* 552/100 */;
     // height: 5.29rem /* 849/100 */;
     @include background("~@/assets/img/dialogbg/dialogatt.png");
}
.g-firstIn {
     .helpvote {
          margin-top: 2.85rem /* 285/100 */;
          @include setFont(
               0.36rem,
               "SourceHanSansCN-Regular",
               400,
               0.68rem,
               rgba(255, 217, 165, 1),
               auto
          );
     }
     .u-img {
          margin: 0.41rem /* 50/100 */ auto 0;
          width: 1.99rem /* 90/100 */;
          height: 2.85rem /* 120/100 */;
          background: #fff;
     }
     .u-first-getbook {
          @include setFont(
               0.36rem,
               "SourceHanSansCN-Regular",
               400,
               0.48rem,
               rgba(255, 217, 165, 1),
               auto
          );
     }
     .u-first-getbook1 {
          margin-top: 2.85rem;
     }
     .getbook2 p {
          font-size: 0.3rem /* 36/100 */;
     }
     .nocanvote {
          @include setFont(
               0.22rem,
               "SourceHanSansCN-Regular",
               400,
               0.48rem,
               #fff,
               auto
          );
     }
     .isSignInText {
          margin-top: 2.85rem /* 285/100 */;
          & p:nth-child(2) {
               font-size: 0.3rem /* 36/100 */;
          }
          @include setFont(
               0.36rem,
               "SourceHanSansCN-Regular",
               400,
               0.48rem,
               rgba(255, 217, 165, 1),
               auto
          );
     }
}
.u-btn {
     margin-top: 0.38rem;
     margin-bottom: 0.55rem;
     span {
          display: inline-block;
          width: 2rem;
          height: 0.59rem /* 44/100 */;
          @include background("~@/assets/img/dialogbg/dialogattbtn.png");
          @include setFont(
               0.24rem,
               "FZLTHJW--GB1-0",
               400,
               0.59rem,
               rgba(255, 255, 255, 1),
               center
          );
     }
     & span:nth-child(2) {
          margin-left: 0.14rem;
     }
}
.u-btn2 {
     margin-top: 0.38rem;
     margin-bottom: 0.55rem;
     display: inline-block;
     width: 2rem;
     height: 0.59rem /* 44/100 */;
     @include background("~@/assets/img/dialogbg/dialogattbtn.png");
     @include setFont(
          0.24rem,
          "FZLTHJW--GB1-0",
          400,
          0.59rem,
          rgba(255, 255, 255, 1),
          center
     );
}
</style>
