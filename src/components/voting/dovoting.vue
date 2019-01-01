<template>
     <section class="u-vote-btn">
          <Btn btnText="投票" eventName="btnClickHandler" @btnClickHandler="doVotingHandler"></Btn>
          <x-dialog v-model="isDoVoting" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section v-if="RightToVote" class="g-doDoting">
                    <p>选择投票的数量</p>
                    <section class="g-doDoting-number">
                         <inline-x-number :min="0" width="50px"></inline-x-number>
                    </section>
                    <section class="g-doDoting-btn">
                         <Btn btnText="投票" eventName="votingHandler" @votingHandler="votingHandler"></Btn>
                    </section>
               </section>
               <section v-else class="g-noRightToVote">
                    <p>您还没有投票权，快去做任务获取吧</p>
                    <p>更有电子书免费领取哦~</p>
                    <span>去做任务</span>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { InlineXNumber, XDialog, XButton } from 'vux'
export default {
     props: ['RightToVote'],
     components: {
          InlineXNumber, XDialog, XButton,
          Btn: () => import('../common/btn.vue')
     },
     data() {
          return {
               isDoVoting: false
          }
     },
     methods: {
          doVotingHandler() {
               this.isDoVoting = true
          },
          votingHandler() {
               console.log('别恩了');
          },
          hideHandler() {

          }
     }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin.scss";
.u-vote-btn {
     margin: 0.373333rem /* 14/37.5 */ auto 0;
     @include setFontSize(14px);
     width: 2.4rem /* 90/37.5 */;
     height: 0.8rem /* 30/37.5 */;
     text-align: center;
     font-family: PingFang SC;
     border-radius: 0.106667rem /* 4/37.5 */;
     line-height: 0.8rem /* 30/37.5 */;
     .g-noRightToVote {
             padding-top: 1.333333rem /* 50/37.5 */;
          p {
               color: rgba(16, 16, 16, 1);
               @include setFontSize(14px);
               text-align: center;
               font-family: PingFangSC-regular;
               line-height: .8rem /* 30/37.5 */;
          }
          span {
               display: inline-block;
               margin: .533333rem /* 20/37.5 */ auto;
               height: 0.533333rem /* 20/37.5 */;
          }
     }
}
.g-doDoting {
     p {
          margin-top: 1.6rem /* 60/37.5 */;
          color: rgba(16, 16, 16, 1);
          @include setFontSize(14px);
          text-align: center;
          font-family: PingFangSC-regular;
     }
     .g-doDoting-number {
          margin-top: 1.253333rem /* 47/37.5 */;
     }
     .g-doDoting-btn {
          width: 2.4rem /* 90/37.5 */;
          height: 0.8rem /* 30/37.5 */;
          margin: 1.066667rem /* 40/37.5 */ auto;
     }
}
</style>
<style lang="scss">
@import "../../assets/css/mixin.scss";
.vux-number-input {
     @include setFontSize(14px);
     line-height: 0.533333rem /* 20/37.5 */;
}
</style>
