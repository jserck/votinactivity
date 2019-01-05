<template>
     <section class="u-vote-btn">
          <section v-if="RightToVote" class="g-doDoting">
               <p>选择投票的数量</p>
               <section class="g-doDoting-number">
                    <inline-x-number v-model="voteNum" @input="voteNumChange" :min="0" width="50px"></inline-x-number>
               </section>
               <section class="g-doDoting-btn">
                    <span class="g-btn" @click="dialogComponentEvent('dialogComponentEvent')">投票</span>
               </section>
          </section>
          <section v-else class="g-noRightToVote">
               <p>您还没有投票权，快去做任务获取吧</p>
               <p>更有电子书免费领取哦~</p>
               <span v-scroll="`rule`" @click="dialogComponentEvent('goRule')">去做任务</span>
          </section>
     </section>
</template>
<script>
import { InlineXNumber } from 'vux'
import Scroll from '../../assets/js/href.js'
export default {
     props: ['RightToVote'],
     components: {
          InlineXNumber
     },
     data() {
          return {
               voteNum: 1
          }
     },
     methods: {
          dialogComponentEvent(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 5,
                    eventType
               })
          },
          hideHandler() {

          },
          voteNumChange(val) {
               /**
                * @name 投票数变更
               */
               this.$emit('voteNumChange2', val)
          }
     }
}
</script>

<style scoped lang="scss">
.u-vote-btn {
     // margin: 0.373333rem /* 14/37.5 */ auto 0;
     // @include setFontSize(14px);
     // // width: 2.4rem /* 90/37.5 */;
     // // height: 0.8rem /* 30/37.5 */;
     // text-align: center;
     // font-family: PingFang SC;
     // border-radius: 0.106667rem /* 4/37.5 */;
     // line-height: 0.8rem /* 30/37.5 */;
     .g-noRightToVote {
          padding-top: 1.333333rem /* 50/37.5 */;
          p {
               color: rgba(16, 16, 16, 1);
               @include setFontSize(14px);
               text-align: center;
               font-family: PingFangSC-regular;
               line-height: 0.8rem /* 30/37.5 */;
          }
          span {
               display: inline-block;
               margin: 0.533333rem /* 20/37.5 */ auto;
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
          .g-btn {
               display: inline-block;
               margin: 0.373333rem /* 14/37.5 */ auto 0;
               @include setFontSize(14px);
               width: 2.4rem /* 90/37.5 */;
               height: 0.8rem /* 30/37.5 */;
               text-align: center;
               font-family: PingFang SC;
               border-radius: 0.106667rem /* 4/37.5 */;
               line-height: 0.8rem /* 30/37.5 */;
               background: yellow;
          }
     }
}
</style>
