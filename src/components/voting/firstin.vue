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
               window.location.href = this.dialogOpations.bookWebUrl
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
     @include background("/static/images/dialogbg/dialogatt.png");
}
.g-firstIn {
     .helpvote {
          margin-top: 2.85rem /* 285/100 */;
          font-size: 0.36rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.68rem;
     }
     .u-img {
          margin: 0.41rem /* 50/100 */ auto 0;
          width: 1.99rem /* 90/100 */;
          height: 2.85rem /* 120/100 */;
          background: #fff;
     }
     .u-first-getbook {
          font-size: 0.36rem /* 36/100 */;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.48rem /* 48/100 */;
     }
     .u-first-getbook1 {
          margin-top: 2.85rem;
     }
     .getbook2 p {
          font-size: 0.3rem /* 36/100 */;
     }
     .nocanvote {
          font-size: 0.22rem /* 36/100 */;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: #fff;
          line-height: 0.48rem /* 48/100 */;
     }
     .isSignInText {
          margin-top: 2.85rem /* 285/100 */;
          font-size: 0.36rem /* 36/100 */;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.48rem /* 48/100 */;
          & p:nth-child(2) {
               font-size: 0.3rem /* 36/100 */;
          }
     }
}
.u-btn {
     margin-top: 0.38rem;
     margin-bottom: 0.55rem;
     span {
          display: inline-block;
          width: 2rem;
          height: 0.59rem /* 44/100 */;
          text-align: center;
          line-height: 0.59rem /* 44/100 */;
          font-size: 0.24rem;
          font-family: FZLTHJW--GB1-0;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          @include background("/static/images/dialogbg/dialogattbtn.png");
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
     text-align: center;
     line-height: 0.59rem /* 44/100 */;
     font-size: 0.24rem;
     font-family: FZLTHJW--GB1-0;
     font-weight: 400;
     color: rgba(255, 255, 255, 1);
     @include background("/static/images/dialogbg/dialogattbtn.png");
}
</style>
