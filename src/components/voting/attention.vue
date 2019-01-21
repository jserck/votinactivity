<template>
     <section>
          <section class="g-attention">
               <p class="u-tit">感谢您关注</p>
               <p class="u-tit">天猫读书小程序</p>
               <section class="u-text">
                    <p class="u-text2">已获得10点能量，为喜欢的领读官加能</p>
                    <p class="u-text2">有机会获得免费电子书！</p>
               </section>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">立即加能</span>
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

     },
    mounted(){
      this.$emit("btn_show",4);
    }
}
</script>

<style lang="scss" scoped>
$dialogatt: "~@/assets/img/dialogbg/dialogatt.png";
$dialogattbtn: "~@/assets/img/dialogbg/dialogattbtn.png";
.g-attention {
     margin:15vh auto 0;
     padding-top: 3.66rem /* 314/100 */;
     width: 5.33rem /* 552/100 */;
     height: 4.8rem /* 849/100 */;
     @include background($dialogatt);
     .u-tit {
          @include setFont(
               0.36rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.6rem,
               rgba(255, 218, 166, 1),
               auto
          );
     }
     .u-btn {
          margin: 0.82rem auto 0;
          width: 2.53rem /* 248/100 */;
          height: 0.6rem /* 50/100 */;
          @include setFont(
               0.3rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.5rem,
               #8b5b35,
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
