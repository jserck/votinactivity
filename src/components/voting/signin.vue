<template>
     <section>
          <section class="g-attention">
               <p>今日签到成功</p>
               <p class="u-text2">恭喜您获得一次点赞权！</p>
               <section class="u-btn">
                    <span @click="hideHandler('dialogComponentEvent')" v-scroll="'scroll'">立即投票</span>
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
     padding-top: 0.533333rem /* 20/37.5 */;
     p {
          @include setFontSize(14px);
          left: 106px;
          color: rgba(16, 16, 16, 1);
          text-align: center;
          font-family: PingFangSC-regular;
     }
     .u-btn {
          width: 100%;
          height: 1.333333rem /* 50/37.5 */;
          line-height: 1.333333rem /* 50/37.5 */;
          text-align: center;
          border-top: 1px solid rgba(187, 187, 187, 1);
     }
     .u-text2 {
          margin: 1.333333rem /* 50/37.5 */ auto;
          width: 6.346667rem /* 238/37.5 */;
     }
}
</style>
