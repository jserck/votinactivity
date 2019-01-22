<template>
     <section>
          <section class="g-attention">
               <p class="u-tit">今日签到成功</p>
               <p class="u-tit">获得10个能量</p>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">立即加能量</span>
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
                    type: 7,
                    eventType
               })
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
.g-attention {
     margin: auto;
     padding-top: 3.34rem /* 314/100 */;
     width: 5.33rem /* 552/100 */;
     height: 4.55rem /* 849/100 */;
     @include background("~@/assets/img/dialogbg/dialogsignin.png");
     .u-tit {
          font-size: 0.36rem /* 36/100 */;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.68rem /* 68/100 */;
     }
     .u-btn {
          margin: 0.84rem auto 0;
          width: 2.53rem;
          height: 0.6rem /* 50/100 */;
          line-height: 0.5rem /* 50/100 */;
          text-align: center;
          @include background("~@/assets/img/dialogbg/dialogattbtn.png");
          font-size: 0.3rem;
          font-family: FZLTHJW--GB1-0;
          font-weight: 400;
          color: #8B5B35;
     }
}
</style>
