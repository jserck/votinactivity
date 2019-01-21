<template>
     <section :class="{noScroll: isShowDialog}">
          <section class="dialog" v-if="isShowDialog" @scroll.prevent>
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
                                   <VoteHistory :userId="userId"></VoteHistory>
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
     props: ['dialogType', 'dialogOpations', 'userId'],
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
               isShowDialog: true,
               pageScrollYoffset: 400
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
                    urls: 'user/point/' + this.userId + '/' + type + '/' + starId,
                    data: {
                         userId: this.userId,
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
          // font_size() {
          //     let designWidth = 750,
          //         designFontSize = 100,
          //         win_width = 0;
          //     if (window.screen.width > 750) {
          //         win_width = 750
          //     } else {
          //         win_width = window.screen.width
          //     }
          //     let scale = win_width / designWidth;
          //     let root_font_size = ((scale * 10000 * designFontSize) / 10000).toFixed(4);
          //     return root_font_size;
          // },
          getScrollTop() { // 获取滚动条位置
               var scrollTop = 0;
               document.documentElement.scrollTop = 1;
               if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
               } else if (document.body) {
                    scrollTop = document.body.scrollTop;
               }
               return scrollTop;
          },
          dialog_touch(type) {
               if (type) {
                    this.pageScrollYoffset = this.getScrollTop();
                    let cssStr = `overflow-y: hidden;position:fixed;`;
                    // document.getElementsByTagName('html')[0].style.cssText = cssStr;
                    document.body.style.cssText = cssStr;
                    document.body.style.top = -this.pageScrollYoffset + 'px';
                    // document.body.scrollTop = this.pageScrollYoffset;
                    // window.scroll(0, this.pageScrollYoffset);
               } else {
                    let cssStr = `overflow-y: auto; height: auto;position:static;`;
                    // document.getElementsByTagName('html')[0].style.cssText = cssStr;
                    document.body.style.cssText = cssStr;
                    document.body.scrollTop = this.pageScrollYoffset;
                    // window.scroll(0, this.pageScrollYoffset);
               }
          },
     },
     created() {
          // // 下面需要这两行代码，兼容不同浏览器
          this.dialog_touch(1)
     },
     beforeDestroy() {
          this.dialog_touch(0)
     },
     watch: {
          'dialogType': function (type) {
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
/* 当前蒙层显示时生效 */
.noScroll {
     overflow-y: hidden;
}
.message-title {
     width: 100%;
}
.dialog {
     max-width: 7.5rem;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex !important;
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     z-index: 2000;
     width: 100%;
     height: 100%;
     justify-content: center;
     align-items: center;
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
          text-align: center;
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          /* ios需要下面这个属性 */
          -webkit-overflow-scrolling: touch;
     }
}
</style>
