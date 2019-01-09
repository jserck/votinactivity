<template>
     <section>
          <section class="g-attention">
               <p class="successVote">成功助力{{dialogOpations.nums}}赞！</p>
               <p class="u-text2">继续点赞有机会免费领取电子书哦~</p>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">继续点赞</span>
               </section>
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
          hideHandler(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 8,
                    eventType
               })
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
$dialogsignin: "~@/assets/img/dialogbg/dialogsignin.png";
$dialogattbtn: "~@/assets/img/dialogbg/dialogattbtn.png";
.g-attention {
     margin: auto;
     padding-top: 3.11rem /* 314/100 */;
     width: 5.24rem /* 552/100 */;
     height: 4.23rem /* 849/100 */;
     @include background($dialogsignin);
     p {
          @include setFont(
               0.36rem,
               "SourceHanSansCN-Regula",
               400,
               0.68rem,
               rgba(255, 217, 165, 1),
               auto
          );
     }

     .u-btn {
          margin: 1.08rem auto 0;
          width: 2.48rem /* 248/100 */;
          height: 0.67rem /* 50/100 */;
          @include setFont(
               0.32rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.67rem,
               rgba(255, 255, 255, 1),
               center
          );
          @include background($dialogattbtn);
     }
     .u-text2 {
          font-size: 0.3rem;
     }
}
</style>
