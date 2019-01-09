<template>
     <section>
          <section class="dialog" v-if="isShowDialog">
               <section class="dialog" @touchmove.prevent></section>
               <section class="dialog-body">
                    <section>
                         <ul>
                              <li v-if="dialogType ==1">
                                   <FirstIn
                                        @dialogComponentEvent="dialogComponentEvent"
                                        :dialogOpations="dialogOpations"
                                   ></FirstIn>
                              </li>
                              <li v-else-if="dialogType==2">
                                   <Rule></Rule>
                              </li>
                              <li v-else-if="dialogType==3">
                                   <VoteHistory></VoteHistory>
                              </li>
                              <li v-else-if="dialogType==4">
                                   <Attention @dialogComponentEvent="dialogComponentEvent"></Attention>
                              </li>
                              <li v-else-if="dialogType==5">
                                   <DoVoting
                                        @dialogComponentEvent="dialogComponentEvent"
                                        @voteNumChange2="voteNumChange2"
                                        :RightToVote="dialogOpations.isCanVote"
                                        :nums="dialogOpations.nums"
                                   ></DoVoting>
                              </li>
                              <li v-else-if="dialogType==6">
                                   <VideoPlay></VideoPlay>
                              </li>
                              <li v-else-if="dialogType==7">
                                   <SignIn @dialogComponentEvent="dialogComponentEvent"></SignIn>
                              </li>
                              <li v-else-if="dialogType==8">
                                   <noHaveBook
                                        :dialogOpations="dialogOpations"
                                        @dialogComponentEvent="dialogComponentEvent"
                                   ></noHaveBook>
                              </li>
                         </ul>
                         <section class="closeBtn" @click="hideHandler"></section>
                    </section>
               </section>
          </section>
     </section>
</template>
<script>
export default {
     props: ['dialogType', 'dialogOpations'],
     components: {
          FirstIn: () => import('../voting/firstin'),
          Rule: () => import('../voting/rule.vue'),
          VoteHistory: () => import('../voting/votelist.vue'),
          Attention: () => import('../voting/attention.vue'),
          DoVoting: () => import('../voting/dovoting.vue'),
          VideoPlay: () => import('../voting/video.vue'),
          SignIn: () => import('../voting/signin.vue'),
          noHaveBook: () => import('../voting/nohavebook.vue')
     },
     data() {
          return {
               isShowDialog: true
          }
     },
     methods: {
          hideHandler() {
               this.isShowDialog = false;
               this.$emit('isCloase')
          },
          dialogComponentEvent(obj) {
               this.$emit('dialogListenEvent', obj)
          },
          voteNumChange2(val) {
               this.$emit('voteNumChange3', val)
          },
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
.dialog {
     width: 100%;
     height: 100%;
     position: fixed;
     z-index: 2000;
     top: 0;
     right: 0;
     left: 0;
     bottom: 0;
     background: rgba(0, 0, 0, 0.6);
     .closeBtn {
          margin: 0.46rem /* 46/100 */ auto 0;
          width: 1.13rem /* 113/100 */;
          height: 1.13rem /* 113/100 */;
          @include background("/static/images/dialogbg/dialogclose.png");
     }
     .dialog-body {
          width: 80%;
          // background: #fff;
          position: fixed;
          display: table;
          z-index: 3000;
          width: 80%;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          text-align: center;
          overflow: hidden;
     }
}
</style>
