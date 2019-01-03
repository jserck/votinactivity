<template>
     <section class="m-voting-template">
          <Dialog
               v-if="isShowDialog"
               :dialogType="dialogType"
               :dialogOpations="dialogOpations"
               @isCloase="isShowDialog=false"
               @dialogListenEvent="dialogListenEvent"
          ></Dialog>
          <header>
               <section class="g-video-container">
                    <i class="u-rule" @click="ruleHandler">规则</i>
                    <h3>活动标题</h3>
                    <span>2019.01.18—2019.02.10</span>
                    <section class="g-video-banner" @click="videoPlay">
                         <span class="u-video-icon"></span>
                    </section>
               </section>
          </header>
          <!-- 投票记录 -->
          <section class="g-myVoteCon" id="scroll">
               <section class="u-myVoteCon-link clearfix" @click="myVoteCon">
                    <span class="u-myVoteCon-text">我的投票记录 ></span>
               </section>
               <section class="g-vote-list">
                    <ul class="displayFlex flexWrap flexJustifybetween">
                         <li v-for="(item,index) in starSoltData" :key="index">
                              <span
                                   class="u-img"
                                   :style="`background:url(${item.starPicUrl});
                                            backgroundRepeat:no-repeat;
                                            backgroundSize:cover`"
                              ></span>
                              <span class="u-vote-num">{{item.ticketCount}}票</span>
                              <section class="g-btn">
                                   <Btn
                                        btnText="投票"
                                        eventName="btnClickHandler"
                                        @btnClickHandler="doVotingHandler"
                                   ></Btn>
                              </section>
                         </li>
                    </ul>
               </section>
          </section>
          <!-- 我的选票 -->
          <section class="g-myVote">
               <section class="u-myVote-tit">
                    <span>我的选票</span>
               </section>
               <section class="g-vote-context">
                    <p class="u-vote-count">当前拥有{{userTicketCount}}张选票</p>
                    <span class="u-vote-btn" v-scroll="'scroll'">立即投票</span>
                    <section class="g-vote-list">
                         <ul>
                              <li
                                   v-for="(item,index) in myvotelist"
                                   :key="index"
                                   class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   @click="voteClick(index+1)"
                              >
                                   <span>{{index !==2?item.name:`分享获得选票 今日还有${shareCount}次机会`}}</span>
                                   <section class="u-myVote-btn">
                                        <x-button mini>{{item.btn}}</x-button>
                                   </section>
                              </li>
                         </ul>
                    </section>
               </section>
          </section>
          <!-- 明星书单 -->
          <section class="g-star-bookList">
               <StarBook @videoPlay="videoPlay">
                    <template slot-scope="{ indexNum,starBookData }">
                         <section class="g-scroll-book">
                              <scroller lock-y :scrollbar-x="false">
                                   <section class="g-scroll-book-box displayFlex">
                                        <section
                                             class="g-box-item"
                                             v-for="(item,index) in starBookData"
                                             :key="index"
                                        >
                                             <BookItem :indexNum="indexNum" :obj="item"></BookItem>
                                        </section>
                                   </section>
                              </scroller>
                         </section>
                    </template>
               </StarBook>
          </section>
          <footer>
               <section class="u-look-book">查看详细的书单</section>
          </footer>
     </section>
</template>
<script>
import { XInput, Scroller, XButton } from 'vux'
import StarBook from '../common/starbook.vue'
import scroll from '../../assets/js/href.js'

export default {
     components: {
          XInput, Scroller, XButton,
          StarBook: () => import('../common/starbook.vue'),
          BookItem: () => import('../common/bookitem.vue'),
          Btn: () => import('../common/btn.vue'),
          Dialog: () => import('../common/dialog.vue'),
     },
     data() {
          return {
               dialogOpations: {

               },
               myVoteData: {
                    userTicketCount: null
               },
               starSoltData: [],
               dialogType: 0,
               isShowDialog: false,
               isFollow: false,
               myvotelist: [
                    {
                         name: '关注小程序可得 1 张选票',
                         btn: '去关注'
                    },
                    {
                         name: '每日签到获得 1 张选票',
                         btn: '去签到'
                    }, {
                         name: '分享获得选票 今日还有10 次机会',
                         btn: '去分享'
                    }, {
                         name: '阅读已购电子书得 1 张选票',
                         btn: '去阅读'
                    }
               ]
          }
     },
     computed: {
          userTicketCount() {
               return this.myVoteData['userTicketCount']
          },
          shareCount() {
               return this.myVoteData['shareCount']
          }
     },
     methods: {
          getStarSolt() {
               /**
                * @name 获取明星排名列表接口
                * @method post
                * @param null
                */
               let options = {
                    urls: '/starRankingInfo',
                    data: {},
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         this.starSoltData = res.data.data.starList
                    }
               }).catch((err) => { })

          },
          getMyVote() {
               /**
                * @name 获取我的选票接口
                * @method post
                * @param userId 用户ID
                * @param isFollow 当前用户是否关注
                */
               let options = {
                    urls: '/user/myInfo/1/1',
                    data: {},
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         this.myVoteData = res.data.data
                         if (res.data.data.bookId) {
                              this.dialogShow(1, true, {
                                   bookId: res.data.data.bookId,
                                   bookPicUrl: res.data.data.bookPicUrl,
                                   bookName: res.data.data.bookName,
                                   bookWebUrl: res.data.data.bookWebUrl
                              });
                         }
                    }
               }).catch((err) => { })

          },
          attentionHandler() {
               /**
                * @name 关注
               */
               this.dialogShow(4, true)
               // my.postMessage({

               // })
          },
          obshareHandler() {
               /**
                * @name 分享
               */
               my.postMessage({

               })
          },
          sugnInHandler() {
               /**
                * @name 签到
               */
          },
          readHandler() {
               /**
                * @name 阅读
               */
               my.navigateTo({
                    url: '',
                    //跳转成功
                    success() { },
                    //跳转失败
                    fail() { },
                    //调用完成（无论成功失败）
                    complete() { }
               })
          },
          voteClick(type) {
               if (type === 1) {
                    this.attentionHandler()
               } else if (type === 2) {
                    // 签到
                    this.sugnInHandler()
               } else if (type === 3) {
                    // 分享
                    this.obshareHandler()
               } else {
                    // 阅读
                    this.readHandler()
               }
          },
          dialogListenEvent(val) {
               /**
                * dialog关闭事件处理
                */
               if (val === 4) {
                    this.dialogShow(val, false);
               } else if (val === 5) {
                    console.log("投票了");
               }

          },
          doVotingHandler() {
               /**
               * 投票
               */
               this.dialogShow(5, true);
          },

          ruleHandler() {
               /**
                * 查看规则
                */
               this.dialogShow(2, true);
          },
          myVoteCon() {
               /**
               * 查看投票纪录
               */
               this.dialogShow(3, true);
          },
          videoPlay(src) {
               /**
                * 视频播放
               */
               this.$vux.loading.show()
               setTimeout(() => {
                    this.$vux.loading.hide()
                    this.dialogShow(6, true);
               }, 1000)
          },
          dialogShow(type, isShow, obj = {}) {
               /**
                * 呼起弹窗并传递数据给dialog
                */
               this.dialogOpations = obj;
               this.isShowDialog = isShow;
               this.dialogType = type;
          }
     },
     created() {
          this.sugnInHandler()
          this.getStarSolt()
          this.getMyVote()
     }
}
</script>
<style scoped lang="scss">
@import "../../assets/css/mixin.scss";
.m-voting-template {
     header {
          .g-video-container {
               overflow: hidden;
               position: relative;
               text-align: center;
               h3 {
                    margin-top: 0.533333rem; /* 20/37.5 */
                    @include setFontSize(16px);
                    display: block;
                    font-weight: normal;
                    font-family: "PingFangSC-regular";
                    color: #101010;
               }
               span {
                    display: inline-block;
                    margin-top: 0.266667rem; /* 10/37.5 */
                    @include setFontSize(14px);
                    font-weight: normal;
                    font-family: "PingFangSC-regular";
                    color: #101010;
               }
               .u-rule {
                    position: absolute;
                    padding: 0.08rem 0.48rem /* 18/37.5 */;
                    display: inline-block;
                    top: 1.52rem /* 57/37.5 */;
                    right: 0;
                    background: #f6f6f6;
                    color: #1f2028;
                    @include setFontSize(14px);
                    text-align: center;
               }
               .g-video-banner {
                    position: relative;
                    margin: 0.8rem /* 30/37.5 */ auto;
                    width: 8.48rem; /* 318/75 */
                    height: 4.533333rem /* 170/37.5 */;
                    background: #101010;
                    border-radius: 0.186667rem /* 7/37.5 */;
                    .u-video-icon {
                         position: absolute;
                         left: 50%;
                         margin-left: -0.373333rem /* 14/37.5 */;
                         top: 50%;
                         margin-top: -0.373333rem /* 14/37.5 */;
                         width: 0.746667rem /* 28/37.5 */;
                         height: 0.746667rem /* 28/37.5 */;
                         background: #fff;
                         border-radius: 0.373333rem /* 14/37.5 */;
                    }
               }
          }
     }
     .g-myVoteCon {
          .u-myVoteCon-link {
               position: relative;
               .u-myVoteCon-text {
                    margin-right: 0.346667rem /* 13/37.5 */;
                    display: inline-block;
                    float: right;
                    @include setFontSize(14px);
                    font-family: "PingFangSC-regular";
                    color: #101010;
               }
          }
          .g-vote-list {
               ul {
                    padding: 0 0.213333rem /* 8/37.5 */;
                    li {
                         margin-top: 0.8rem /* 30/37.5 */;
                         span {
                              display: block;
                         }
                         .u-img {
                              width: 2.8rem /* 105/37.5 */;
                              height: 2.96rem /* 111/37.5 */;
                              background: #101010;
                              border-radius: 0.213333rem /* 8/37.5 */;
                         }
                         .u-vote-num {
                              margin-top: 0.266667rem /* 10/37.5 */;
                              @include setFontSize(14px);
                              text-align: center;
                         }
                    }
               }
               .g-btn {
                    margin: 0.373333rem /* 14/37.5 */ auto 0;
                    @include setFontSize(14px);
                    width: 2.4rem /* 90/37.5 */;
                    height: 0.8rem /* 30/37.5 */;
                    text-align: center;
                    font-family: PingFang SC;
                    border-radius: 0.106667rem /* 4/37.5 */;
                    line-height: 0.8rem /* 30/37.5 */;
               }
          }
     }
     .g-myVote {
          margin: 0.586667rem /* 22/37.5 */ auto;
          .u-myVote-tit {
               padding-left: 0.453333rem /* 17/37.5 */;
               color: rgba(16, 16, 16, 1);
               @include setFontSize(18px);
               font-family: PingFangSC-regular;
               line-height: 0.666667rem /* 25/37.5 */;
          }
          .g-vote-context {
               margin: 0.213333rem /* 8/37.5 */ auto 0;
               overflow: hidden;
               width: 9.333333rem /* 350/37.5 */;
               background: #f7f7f7;
               border-radius: 0.266667rem /* 10/37.5 */;
               .u-vote-count {
                    margin-top: 0.986667rem /* 37/37.5 */;
                    text-align: center;
                    color: rgba(16, 16, 16, 1);
                    @include setFontSize(14px);
                    font-family: PingFangSC-regular;
               }
               .u-vote-btn {
                    display: block;
                    margin: 0.72rem /* 27/37.5 */ auto;
                    width: 5.52rem /* 207/37.5 */;
                    height: 0.8rem /* 30/37.5 */;
                    border-radius: 0.106667rem /* 4/37.5 */;
                    color: rgba(16, 16, 16, 1);
                    @include setFontSize(12px);
                    text-align: center;
                    font-family: PingFang SC;
                    border: 1px solid rgba(187, 187, 187, 1);
                    line-height: 0.8rem /* 30/37.5 */;
               }
               .g-vote-list {
                    ul {
                         li {
                              padding: 0.293333rem /* 11/37.5 */ 0.346667rem
                                   /* 13/37.5 */;
                         }
                    }
                    .g-star-video {
                         width: 7.2rem /* 270/37.5 */;
                         height: 3.04rem /* 114/37.5 */;
                    }
               }
          }
     }
     .g-star-bookList {
          .u-star-tit {
               padding-left: 0.453333rem /* 17/37.5 */;
               color: rgba(16, 16, 16, 1);
               @include setFontSize(18px);
               font-family: PingFangSC-regular;
               line-height: 0.666667rem /* 25/37.5 */;
          }
          .g-scroll-star {
               margin-top: 0.266667rem /* 10/37.5 */;
               .g-scroll-star-box {
                    padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                    width: 13.44rem /* 504/37.5 */;
                    .u-box-item {
                         margin-left: 0.48rem /* 18/37.5 */;
                         width: 1.76rem /* 66/37.5 */;
                         text-align: center;
                         .u-box-item-img {
                              display: block;
                              width: 1.76rem /* 66/37.5 */;
                              height: 1.76rem /* 66/37.5 */;
                              border-radius: 0.88rem /* 33/37.5 */;
                              background: #101010;
                         }
                         .u-box-item-name {
                              color: rgba(31, 32, 40, 1);
                              @include setFontSize(12px);
                              font-family: PingFangSC-bold;
                         }
                    }
               }
          }
          .g-scroll-book {
               .g-scroll-book-box {
                    padding: 0.133333rem /* 5/37.5 */ 0.32rem /* 12/37.5 */;
                    width: 26.08rem /* 978/37.5 */;
               }
               .g-box-item {
                    margin-right: 0.693333rem /* 26/37.5 */;
               }
          }
          .g-star-video {
               position: relative;
               margin: 0.8rem /* 30/37.5 */ auto;
               width: 7.2rem /* 270/37.5 */;
               height: 3.04rem /* 114/37.5 */;
               background: #101010;
               border-radius: 0.186667rem /* 7/37.5 */;
               .u-video-icon {
                    position: absolute;
                    left: 50%;
                    margin-left: -0.373333rem /* 14/37.5 */;
                    top: 50%;
                    margin-top: -0.373333rem /* 14/37.5 */;
                    width: 0.746667rem /* 28/37.5 */;
                    height: 0.746667rem /* 28/37.5 */;
                    background: #fff;
                    border-radius: 0.373333rem /* 14/37.5 */;
               }
          }
          .g-star-recommend {
               position: relative;
               margin: 0.8rem /* 30/37.5 */ auto;
               width: 7.2rem /* 270/37.5 */;
               height: 3.04rem /* 114/37.5 */;
               background: #101010;
               border-radius: 0.186667rem /* 7/37.5 */;
          }
     }
     footer {
          margin: 1.333333rem /* 50/37.5 */ 0 0.693333rem /* 26/37.5 */ 0;
          .u-look-book {
               margin: auto;
               width: 5.973333rem /* 224/37.5 */;
               height: 0.8rem /* 30/37.5 */;
               border-radius: 0.106667rem /* 4/37.5 */;
               color: rgba(16, 16, 16, 1);
               @include setFontSize(14px);
               text-align: center;
               font-family: PingFang SC;
               border: 1px solid rgba(187, 187, 187, 1);
               line-height: 0.8rem /* 30/37.5 */;
          }
     }
}
</style>

<style lang="scss">
@import "../../assets/css/mixin.scss";
.u-myVote-btn {
     .weui-btn {
          @include setFontSize(13px);
     }
}
.g-btn {
     .vux-number-input {
          @include setFontSize(14px);
          line-height: 0.533333rem /* 20/37.5 */;
     }
     .weui-btn {
          @include setFontSize(15px);
     }
}
</style>
