<template>
     <section>
          <section class="g-attention">
               <p class="u-tit">恭喜您成功阅读{{dialogOpations.bookNum}}本书籍</p>
               <p class="u-text">送您{{dialogOpations.bookNum*10}}能量值</p>
               <p class="u-text">快去为心仪的领读官充能吧！</p>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">立即充能</span>
               </section>
          </section>
     </section>
</template>
<script>
import scroll from '../../assets/js/href.js'
export default {
     props: [
          'dialogOpations'
     ],
     methods: {
          hideHandler(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 9,
                    eventType
               })
          }
     },
     created() {

     },
    mounted(){
      this.$emit("btn_show",9);
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
               0.65rem,
               rgba(255, 218, 166, 1),
               auto
          );
     }
     .u-text {
          @include setFont(
               0.24rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.5rem,
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
}
</style>
