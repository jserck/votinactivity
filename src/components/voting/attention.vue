<template>
     <section>
          <x-dialog
               v-model="isAttention"
               :dialog-style="dialogStyle"
               @on-hide="hideHandler"
               hide-on-blur
               class="dialog-demo"
          >
               <section class="g-attention">
                    <p>感谢您关注天猫读书小程序</p>
                    <p class="u-text2">
                         送您一张投票，可以投给喜欢的明星哦
                         成功投票后可获取电子书一本！
                    </p>
                    <section class="u-btn">
                         <span>立即投票</span>
                    </section>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog } from 'vux'
export default {
     components: {
          XDialog
     },
     data() {
          return {
               isAttention: true,
               dialogStyle: {
                    width: '6.933333rem'
               }
          }
     },
     methods: {
          hideHandler() {
               this.$emit('dialogClose')
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
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
