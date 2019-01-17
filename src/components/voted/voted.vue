<template>
     <section class="m-voted">
          <Dialog
               v-if="isShowDialog"
               :dialogType="dialogType"
               :dialogOpations="dialogOpations"
               @isCloase="dialogClose"
               @dialogListenEvent="dialogListenEvent"
          ></Dialog>
          <section class="g-history">
               <section class="g-titBook"></section>
               <section class="g-tit"></section>
               <section class="g-number displayFlex flexJustifybetween flexAlignItemsCenter">
                    <section class="g-peopleNum">
                         <p class="u-p1">加能量总人数</p>
                         <p class="u-p2">{{votedData.personCount}}</p>
                    </section>
                    <section class="g-bookNum">
                         <p class="u-b1">领取书籍总数</p>
                         <p class="u-b2">{{votedData.bookCount}}</p>
                    </section>
               </section>
               <section class="g-history-list">
                    <ul>
                         <li v-for="(item,index) in starList" :key="index">
                              <section :class="changeClass(item.starId)">
                                   <p class="u-name">领读官 {{item.starName}}</p>
                                   <section class="u-num">
                                        <span>已为他加</span>
                                        <span class="u-height">{{item.ticketCount}}</span>
                                        <span>能量</span>
                                   </section>
                              </section>
                         </li>
                    </ul>
               </section>
          </section>
          <section class="g-foot" @click="myVoteCon"></section>
          <!-- 明星书单 -->
          <section class="g-star-bookList" id="star">
               <StarBook ref="star_book" :isShowTit="`voted`" @videoPlay="videoPlay"></StarBook>
          </section>
          <footer>
               <section class="g-footer"></section>
          </footer>
     </section>
</template>
<script>
export default {
     components: {
          StarBook: () => import('../common/starbook.vue'),
          Dialog: () => import('../common/dialog.vue'),
     },
     data() {
          return {
               isShowDialog: false,
               dialogOpations: {},
               dialogType: 0,
               votedData: {},
               starList: []
          }
     },
     created() {
          this.getStarSolt()
     },
     methods: {
          changeClass(id) {
               if (id == 10001) {
                    return 'g-text4'
               }
               if (id == 10002) {
                    return 'g-text'
               }
               if (id == 10003) {
                    return 'g-text2'
               }
               if (id == 10004) {
                    return 'g-text5'
               }
               if (id == 10005) {
                    return 'g-text1'
               }
               if (id == 10000) {
                    return 'g-text3'
               }
          },
          myVoteCon() {
               /**
               * 查看投票纪录
               */
               this.dialogShow(3, true);
          },
          dialogClose(val) {
               /**
                * @name 弹窗关闭
               */
               this.isShowDialog = false;
          },
          getStarSolt(type) {
               /**
                * @name 获取明星排名列表接口
                * @method post
                * @param null
                */
               let options = {
                    urls: '/starRankingInfo/' + this.userId + '/' + type,
                    data: {},
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         // starList
                         this.votedData = res.data.data
                         this.starList = this.votedData.starList
                         console.log(this.votedData);

                    }
               }).catch((err) => { })
          },
          dialogShow(type, isShow, obj = {}) {
               /**
                * 呼起弹窗并传递数据给dialog
                */
               this.dialogOpations = obj;
               this.isShowDialog = isShow;
               this.dialogType = type;
          },
          videoPlay(src) {
               /**
                * 视频播放
               */
               this.dialogShow(6, true, { src });
          },
          dialogListenEvent(obj) {
               /**
                * dialog关闭事件处理
                */
               switch (obj.type) {
                    case 2:

                         break;

                    case 3:

                         break;

                    case 4:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;
                    case 6:

                         break;
                    case 7:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;
                    case 8:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;

                    default:
                         break;
               }
          },
     }
}
</script>
<style lang="scss" scoped>
.m-voted {
     position: relative;
     overflow: hidden;
     height: 28.95rem;
     margin: auto;
     @include background("~@/assets/img/voted/bg2.jpg");
     .g-history {
          padding: 0.1rem;
          padding-bottom: 0.23rem;
          position: relative;
          margin: 1.33rem auto 0;
          width: 6.36rem;
          // height: 14.28rem;
          @include background("~@/assets/img/voted/titBg.png");
          .g-titBook {
               position: absolute;
               top: -1.26rem;
               left: -0.1rem;
               width: 4.32rem;
               height: 2.42rem;
               @include background("~@/assets/img/voted/titbook.png");
          }
          .g-tit {
               margin: 0.65rem auto 0;
               width: 4.64rem;
               height: 1.82rem;
               @include background("~@/assets/img/voted/titimg.png");
          }
          .g-number {
               margin-top: 0.19rem;
               padding: 0 0.22rem;
               .g-peopleNum,
               .g-bookNum {
                    padding-top: 0.87rem;
                    width: 2.75rem;
                    height: 1.3rem;
               }
               .g-peopleNum {
                    @include background("~@/assets/img/voted/sumborder.png");
               }
               .g-bookNum {
                    @include background("~@/assets/img/voted/booksum.png");
               }
               .u-p1,
               .u-b1 {
                    @include setFont(
                         0.2rem,
                         "SourceHanSansCN-Regular",
                         400,
                         0.33rem,
                         #7f3808,
                         center
                    );
               }
               .u-p2,
               .u-b2 {
                    font-style: italic;
                    @include setFont(
                         0.5rem,
                         "SourceHanSansCN-Regular",
                         800,
                         0.47rem,
                         #7f3808,
                         center
                    );
               }
          }
          .g-history-list {
               overflow: hidden;
               margin: 0.38rem auto 0;
               width: 5.95rem;
               height: 10.68rem;
               @include background("~@/assets/img/voted/list.png");
               ul {
                    margin: 0.44rem auto 0;
                    width: 4.59rem;
                    li {
                         // overflow: hidden;
                         // padding: 0.01rem;
                         .g-text,
                         .g-text1,
                         .g-text2,
                         .g-text3,
                         .g-text4,
                         .g-text5 {
                              margin-bottom: 0.08rem;
                              .u-name {
                                   @include setFont(
                                        0.21rem,
                                        "NotoSerifCJKsc-Black",
                                        900,
                                        0.47rem,
                                        #935022,
                                        left
                                   );
                              }
                              .u-num {
                                   @include setFont(
                                        0.18rem,
                                        "SourceHanSansCN-Medium",
                                        500,
                                        0.47rem,
                                        #935022,
                                        left
                                   );
                                   .u-height {
                                        font-style: italic;
                                        @include setFont(
                                             0.37rem,
                                             "SourceHanSansCN-Bold",
                                             bold,
                                             0.47rem,
                                             #935022,
                                             left
                                        );
                                   }
                              }
                         }
                         .g-text {
                              padding-left: 1.7rem;
                              padding-top: 0.5rem;
                              height: 1.08rem;
                              @include background("~@/assets/img/voted/6.png");
                         }
                         .g-text1 {
                              padding-left: 1.71rem;
                              padding-top: 0.42rem;
                              height: 1.07rem;
                              @include background("~@/assets/img/voted/5.png");
                         }
                         .g-text2 {
                              padding-left: 1.72rem;
                              padding-top: 0.57rem;
                              height: 1.08rem;
                              @include background("~@/assets/img/voted/1.png");
                         }
                         .g-text3 {
                              padding-left: 1.7rem;
                              padding-top: 0.52rem;
                              height: 1.08rem;
                              @include background("~@/assets/img/voted/2.png");
                         }
                         .g-text4 {
                              padding-left: 1.74rem;
                              padding-top: 0.42rem;
                              height: 1.08rem;
                              @include background("~@/assets/img/voted/3.png");
                         }
                         .g-text5 {
                              padding-left: 1.73rem;
                              padding-top: 0.32rem;
                              height: 1.08rem;
                              @include background("~@/assets/img/voted/4.png");
                         }
                    }
               }
          }
     }
     .g-foot {
          margin: 0.25rem auto 0;
          width: 1.52rem;
          height: 0.26rem;
          @include background("~@/assets/img/voted/text.png");
     }
     .g-footer {
          margin: auto;
          width: 3.77rem;
          height: 0.51rem;
          @include background("~@/assets/img/logo.png");
     }
}
</style>
