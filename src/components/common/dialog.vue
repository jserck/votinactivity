<template>
     <section>
          <section class="dialog" v-if="isShowDialog" @touchmove.prevent>
               <!-- <section class="dialog" @touchmove.prevent></section> -->
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
                                   <VideoPlay :dialogOpations="dialogOpations"></VideoPlay>
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
                              <li v-else-if="dialogType==9">
                                   <ReadBook
                                        :dialogOpations="dialogOpations"
                                        @dialogComponentEvent="dialogComponentEvent"
                                   ></ReadBook>
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
          noHaveBook: () => import('../voting/nohavebook.vue'),
          ReadBook: () => import('../voting/readBook.vue')
     },
     data() {
          return {
               isShowDialog: true
          }
     },
     methods: {
          census(type, starId = 0) {
               /**
               * @name 打点
               * @method post
               * @param userId 用户ID
               * @param type 类型
               * @param starId 明星id
               */
               let options = {
                    urls: 'user/point/' + this.$route.query.userId + '/' + type + '/' + starId,
                    data: {
                         userId: this.$route.query.userId,
                         type,
                         starId
                    },
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
               }).catch((err) => { })
          },
          isCensus(type) {
               if (type == 5) {
                    if (!this.dialogOpations.isCanVote) {
                         //无能量打点
                         this.census(7, this.dialogOpations.starId)
                    }
               }
          },
          hideHandler() {
               this.isShowDialog = false;
               this.$emit('isCloase', this.dialogType)
          },
          dialogComponentEvent(obj) {
               if (this.dialogType == 1) {
                    if (obj.centype == 9) {
                         this.census(9)
                    } else if (obj.centype == 11) {
                         this.census(11)
                    }
               }
               this.$emit('dialogListenEvent', obj)
          },
          voteNumChange2(val) {
               this.$emit('voteNumChange3', val)
          },
     },
     watch: {
          'dialogType': function (type) {
               console.log(type);
               if (type == 1) {
                    if (this.dialogOpations.type == 2 && this.dialogOpations.userTicketCount > 0) {
                         this.census(8)
                    } else {
                         this.census(14)
                    }
               }
          }
     }
}
</script>

<style lang="scss" scoped>
.dialog {
     width: 100%;
     max-width: 7.5rem;
     height: 100vh;
     position: fixed;
     z-index: 2000;
     top: 0;
     right: 0;
     left: 0;
     bottom: 0;
     background: rgba(0, 0, 0, 0.6);
     .closeBtn {
          margin: 0.25rem /* 46/100 */ auto 0;
          width: 1.01rem /* 113/100 */;
          height: 1.01rem /* 113/100 */;
          @include background("~@/assets/img/dialogbg/dialogclose.png");
          /* 全景（横屏）模式 */
     }
     @media screen and (orientation: landscape) {
          .closeBtn {
               margin: 0.1rem /* 46/100 */ auto 0;
               width: 0.3rem /* 113/100 */;
               height: 0.3rem /* 113/100 */;
               @include background("~@/assets/img/dialogbg/dialogclose.png");
               /* 全景（横屏）模式 */
          }
     }
     .dialog-body {
          width: 100% !important;
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
     }
}
</style>
