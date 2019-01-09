<template>
     <section class="u-vote-btn">
          <section v-if="RightToVote" class="g-doDoting">
               <p>选择点赞的数量</p>
               <section class="g-doDoting-number">
                    <x-number @voteNumChange="voteNumChange" :nums="nums"></x-number>
               </section>
               <section class="g-doDoting-btn">
                    <span class="g-btn" @click="dialogComponentEvent('dialogComponentEvent')">点赞</span>
               </section>
          </section>
          <section v-else class="g-noRightToVote">
               <p>您还没有点赞权</p>
               <p>快去做任务获取吧</p>
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
     .g-noRightToVote {
          margin: auto;
          padding-top: 3.11rem /* 314/100 */;
          width: 5.24rem /* 552/100 */;
          height: 4.23rem /* 849/100 */;
          @include background("/static/images/dialogbg/dialogsignin.png");
          p {
               font-size: 0.3rem;
               font-family: SourceHanSansCN-Regular;
               font-weight: 400;
               color: rgba(255, 217, 165, 1);
               line-height: 0.55rem;
          }
          span {
               display: inline-block;
               margin: 1.22rem auto 0;
               width: 2.52rem;
               height: 0.68rem /* 50/100 */;
               line-height: 0.68rem /* 50/100 */;
               text-align: center;
               @include background("/static/images/dialogbg/dialogattbtn.png");
               font-size: 0.3rem;
               font-family: FZLTHJW--GB1-0;
               font-weight: 400;
               color: rgba(255, 255, 255, 1);
          }
     }
}
.g-doDoting {
     margin: auto;
     padding-top: 3.11rem /* 314/100 */;
     width: 5.24rem /* 552/100 */;
     height: 4.23rem /* 849/100 */;
     @include background("/static/images/dialogbg/dialogsignin.png");
     p {
          font-size: 0.36rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.68rem;
     }
     .g-doDoting-btn {
          .g-btn {
               display: inline-block;
               margin: 1.22rem auto 0;
               width: 2.52rem;
               height: 0.68rem /* 50/100 */;
               line-height: 0.68rem /* 50/100 */;
               text-align: center;
               @include background("/static/images/dialogbg/dialogattbtn.png");
               font-size: 0.3rem;
               font-family: FZLTHJW--GB1-0;
               font-weight: 400;
               color: rgba(255, 255, 255, 1);
          }
     }
     .g-doDoting-number {
          margin-top: 0.47rem /* 47/100 */;
     }
}
</style>
