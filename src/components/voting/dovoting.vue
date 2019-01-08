<template>
     <section class="u-vote-btn">
          <section v-if="RightToVote" class="g-doDoting">
               <p>选择投票的数量</p>
               <section class="g-doDoting-number">
                    <x-number @voteNumChange="voteNumChange" :nums="nums"></x-number>
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
import Scroll from '../../assets/js/href.js'
export default {
     props: ['RightToVote', 'nums'],
     components: {
          XNumber: () => import('../common/number.vue')
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
     // margin: .14rem /* 14/100 */ auto 0;
     // font-size: .14rem /* 14/100 */;
     // // width: .9rem /* 90/100 */;
     // // height: .3rem /* 30/100 */;
     // text-align: center;
     // font-family: PingFang SC;
     // border-radius: .04rem /* 4/100 */;
     // line-height: .3rem /* 30/100 */;
     height: 3rem;
     .g-noRightToVote {
          padding-top: 0.5rem /* 50/100 */;
          p {
               color: rgba(16, 16, 16, 1);
               font-size: 0.14rem /* 14/100 */;
               text-align: center;
               font-family: PingFangSC-regular;
               line-height: 0.3rem /* 30/100 */;
          }
          span {
               display: inline-block;
               margin: 0.2rem /* 20/100 */ auto;
               height: 0.2rem /* 20/100 */;
          }
     }
}
.g-doDoting {
     p {
          margin-top: 0.6rem /* 60/100 */;
          color: rgba(16, 16, 16, 1);
          font-size: 0.14rem /* 14/100 */;
          text-align: center;
          font-family: PingFangSC-regular;
     }
     .g-doDoting-number {
          margin-top: 0.47rem /* 47/100 */;
     }
     .g-doDoting-btn {
          width: 0.9rem /* 90/100 */;
          height: 0.3rem /* 30/100 */;
          margin: 0.1rem /* 40/100 */ auto;
          .g-btn {
               display: inline-block;
               // margin: 0.14rem /* 14/100 */ auto 0;
               font-size: 0.14rem /* 14/100 */;
               width: 0.9rem /* 90/100 */;
               height: 0.3rem /* 30/100 */;
               text-align: center;
               font-family: PingFang SC;
               border-radius: 0.04rem /* 4/100 */;
               line-height: 0.3rem /* 30/100 */;
               background: yellow;
          }
     }
}
</style>
