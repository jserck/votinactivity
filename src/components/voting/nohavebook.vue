<template>
     <section>
          <section class="g-attention">
               <p>成功助力{{dialogOpations.nums}}赞！</p>
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
.g-attention {
     padding-top: .2rem /* 20/100 */;
     p {
          font-size: .14rem /* 14/100 */;
          left: 1.06rem /* 106/100 */;
          color: rgba(16, 16, 16, 1);
          text-align: center;
          font-family: PingFangSC-regular;
     }
     .u-btn {
          width: 100%;
          height: .5rem /* 50/100 */;
          line-height: .5rem /* 50/100 */;
          text-align: center;
          border-top: 1px solid rgba(187, 187, 187, 1);
     }
     .u-text2 {
          margin: .5rem /* 50/100 */ auto;
          width: 2.38rem /* 238/100 */;
     }
}
</style>
