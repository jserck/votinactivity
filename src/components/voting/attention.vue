<template>
     <section>
          <section class="g-attention">
               <p>感谢您关注天猫读书小程序</p>
               <p class="u-text2">
                    送您一张投票，可以投给喜欢的明星哦
                    成功投票后可获取电子书一本！
               </p>
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
          width: 2.8rem /* 280/100 */;
     }
}
</style>
