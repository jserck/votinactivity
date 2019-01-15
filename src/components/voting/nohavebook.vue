<template>
     <section>
          <section class="g-attention">
               <p class="successVote">成功集{{dialogOpations.nums}}个能量</p>
               <p class="u-text2">继续集能量有机会免费领取电子书哦!~</p>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">继续集能量</span>
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
     padding-top: 3.6rem /* 314/100 */;
     width: 5.33rem /* 552/100 */;
     height: 4.29rem /* 849/100 */;
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
          width: 2.53rem /* 248/100 */;
          height: 0.6rem /* 50/100 */;
          @include setFont(
               0.29rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.5rem,
               #8B5B35,
               center
          );
          @include background($dialogattbtn);
     }
     .u-text2 {
         margin-top: 0.1rem;
          font-size: 0.24rem;
     }
}
</style>
