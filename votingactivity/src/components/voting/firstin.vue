<template>
     <section>
          <x-dialog
               v-model="isfirstIn"
               :dialog-style="dialogStyle"
               @on-hide="hideHandler"
               hide-on-blur
               class="dialog-demo"
          >
               <section>
                    <section class="g-firstIn">
                         <p>恭喜免费获得电子书一本！！</p>
                         <section class="u-img">PIC</section>
                    </section>
                    <section class="u-btn displayFlex">
                         <span style="border-right:none">继续阅读</span>
                         <span>我要投票</span>
                    </section>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog } from 'vux'
export default {
     props: ['isShow'],
     components: {
          XDialog
     },
     data() {
          return {
               isfirstIn: false,
               dialogStyle: {
                    width: '6.933333rem'
               }
          }
     },
     methods: {
          hideHandler() {

          }
     },
     created() {
          if (this.isShow) {
               this.isfirstIn = true
          }
     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.g-firstIn {
     p {
          margin-top: 1.6rem /* 60/37.5 */;
          text-align: center !important;
          color: rgba(16, 16, 16, 1);
          @include setFontSize(14px);
          text-align: left;
          font-family: PingFangSC-regular;
     }
     .u-img {
          margin: 1.333333rem /* 50/37.5 */ auto;
          width: 2.4rem /* 90/37.5 */;
          height: 3.2rem /* 120/37.5 */;
          text-align: center;
          line-height: 3.2rem /* 120/37.5 */;
     }
}
.u-btn {
     span {
          display: inline-block;
          width: 100%;
          height: 1.173333rem /* 44/37.5 */;
          text-align: center;
          line-height: 1.173333rem /* 44/37.5 */;
          border: 1px solid rgba(187, 187, 187, 1);
     }
}
</style>
