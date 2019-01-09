<template>
     <section>
          <section class="g-attention">
               <p class="u-tit">感谢您关注</p>
               <p class="u-tit">天猫读书小程序</p>
               <section class="u-text">
                    <p class="u-text2">已获得10点能量，为喜欢的领读官充能</p>
                    <p class="u-text2">有机会获得免费电子书</p>
               </section>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">立即充能</span>
               </section>
          </section>
     </section>
</template>
<script>
import scroll from '../../assets/js/href.js'
export default {
     data() {
          return {

          }
     },
     methods: {
          hideHandler(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 4,
                    eventType
               })
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
$dialogatt: "~@/assets/img/dialogbg/dialogatt.png";
$dialogattbtn: "~@/assets/img/dialogbg/dialogattbtn.png";
.g-attention {
     margin: auto;
     padding-top: 3.14rem /* 314/100 */;
     width: 5.52rem /* 552/100 */;
     height: 5.35rem /* 849/100 */;
     @include background($dialogatt);
     .u-tit {
          @include setFont(
               0.48rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.68rem,
               rgba(255, 218, 166, 1),
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
     .u-text {
          margin-top: 0.62rem;
     }
     .u-text2 {
          @include setFont(
               0.24rem,
               "SourceHanSansCN-Regular",
               400,
               0.38rem,
               rgba(255, 218, 166, 1),
               auto
          );
     }
}
</style>
