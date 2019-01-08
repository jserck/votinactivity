<template>
     <section class="m-voting-template">
          <Dialog
               v-if="isShowDialog"
               :dialogType="dialogType"
               :dialogOpations="dialogOpations"
               @isCloase="dialogClose"
               @dialogListenEvent="dialogListenEvent"
               @voteNumChange3="voteNumChange3"
          ></Dialog>
          <header>
               <section class="g-video-container">
                    <section class="u-vote-count">
                         <p>当前</p>
                         <p>能量值</p>
                         <p>{{userTicketCount}}</p>
                    </section>
                    <section class="u-rule" @click="ruleHandler"></section>
                    <section class="u-myVoteCon-link" @click="myVoteCon"></section>
                    <section class="g-video-banner" @click="videoPlay">
                         <!-- <span class="u-video-icon"></span> -->
                    </section>
               </section>
          </header>
          <!-- 投票记录 -->
          <section class="g-myVoteCon" id="scroll">
               <section class="g-vote-msg">
                    <span>
                         已有
                         <i style="font-size:0.3rem">{{personCount}}</i>人次一起读书，领读官已送出
                         <i style="font-size:0.3rem">{{bookCount}}</i>本书
                    </span>
               </section>

               <section class="g-vote-list">
                    <ul class="displayFlex flexWrap flexJustifybetween">
                         <li v-for="(item,index) in starSoltData2" :key="index">
                              <section class="g-vote-li">
                                   <span
                                        class="u-img"
                                        :style="`background:url(${item.starPicUrl});
                                            backgroundRepeat:no-repeat;
                                            backgroundSize:cover`"
                                   ></span>
                                   <span class="u-vote-num">领读官 张歆艺</span>
                              </section>
                              <section class="g-btn" @click="doVotingHandler(item['starId'])">
                                   <span class="u-nums">{{item.ticketCount}}点赞能量</span>
                              </section>
                         </li>
                    </ul>
               </section>
          </section>
          <!-- 我的选票 -->
          <section class="g-myVote" id="rule">
               <section class="u-myVote-tit diaplayFlex">
                    <span></span>
               </section>
               <section class="g-vote-context">
                    <section class="g-vote-list">
                         <ul class="displayFlex flexJustifybetween flexAlignItemsCenter flexWrap">
                              <li class="displayFlex flexAlignJustifyCenter flexAlignItemsCenter">
                                   <span v-if="isFollow" class="u-moman"></span>
                                   <span
                                        @click="voteClick(1)"
                                        class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                   >
                                        <span class="u-icon1"></span>
                                        <span class="u-text">关注小程序能量+10</span>
                                   </span>
                              </li>
                              <!-- v-if="isAutoSignIn==1" -->
                              <li class="displayFlex flexAlignJustifyCenter flexAlignItemsCenter">
                                   <span v-if="isSignIn" class="u-moman"></span>
                                   <span
                                        @click="voteClick(2)"
                                        class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                   >
                                        <span class="u-icon2"></span>
                                        <span class="u-text">每日签到能量+10</span>
                                   </span>
                              </li>
                              <li class="displayFlex flexAlignJustifyCenter flexAlignItemsCenter">
                                   <span
                                        class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                        @click="voteClick(4)"
                                   >
                                        <span class="u-icon4"></span>
                                        <span class="u-text">阅读1本书能量+10</span>
                                   </span>
                              </li>
                              <li class="displayFlex flexAlignJustifyCenter flexAlignItemsCenter">
                                   <span
                                        class="u-ticketbtn displayFlex flexAlignJustifyCenter flexAlignItemsCenter"
                                        @click="voteClick(3)"
                                   >
                                        <span class="u-icon3"></span>
                                        <span class="u-text">分享活动能量+10</span>
                                        <!-- {{shareCount}}分享次数剩余 -->
                                   </span>
                              </li>
                         </ul>
                    </section>
               </section>
          </section>
          <!-- 明星书单 -->
          <section class="g-star-bookList">
               <StarBook @videoPlay="videoPlay" @starBookClick="starBookClick"></StarBook>
          </section>
     </section>
</template>
<script>
import StarBook from '../common/starbook.vue'
import scroll from '../../assets/js/href.js'
import { setTimeout } from 'timers'

export default {
     components: {
          StarBook: () => import('../common/starbook.vue'),
          Dialog: () => import('../common/dialog.vue'),
     },
     data() {
          return {
               myVoteData: {
                    userTicketCount: null
               },//我的投票纪录
               userId: this.$route.query.userId || 1,
               starSoltData: [],//明星排序数据
               dialogOpations: {},//传递给dialog的数据
               dialogType: 0,//dialog内容类型
               isShowDialog: false,//dialog显示隐藏
               isFollow: this.$route.query.isFollow || false,//是否关注
               isclosefollow: false,
               isSignIn: this.$route.query.isSignIn || false,//是否签到
               isCanVote: false,//是否可以投票
               isAutoSignIn: false,//是否自动签到
               starId: 0,//记录当前投票明星ID
               nums: 1,//监听投票数
               isFirst: false,//当天是否首次进入
               personCount: 0,
               bookCount: 0,
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
     created() {
          this.voteInit()
     },
     computed: {
          userTicketCount() {
               return this.myVoteData['userTicketCount'] || 0
          },
          shareCount() {
               return this.myVoteData['shareCount'] || 0
          },
          starSoltData2() {
               return this.starSoltData
          }
     },
     methods: {
          voteInit() {
               this.getStarSolt()//明星排序
               this.getMyVote()//我的选票
          },
          dialogClose() {
               this.nums = 0;
               this.isShowDialog = false
          },
          voteNumChange3(val) {
               /**
                * @name 监听投票数
               */
               this.nums = val
          },

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
                         this.personCount = res.data.data.personCount
                         this.bookCount = res.data.data.bookCount
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
                    urls: '/user/myInfo/' + this.userId + '/1',
                    data: {
                         userId: this.userId,
                         isFollow: this.isFollow,
                         isSignIn: this.isSignIn
                    },
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         this.myVoteData = res.data.data
                         this.isCanVote = res.data.data.userTicketCount > 0
                         this.isFirst = res.data.data.isFirst
                         this.isFollow = (res.data.data.isFollow == 1)
                         this.isSignIn = (res.data.data.isSignIn == 1)
                         this.isAutoSignIn = (res.data.data.isAutoSignIn == 1)
                         if (this.isFirst) {
                              this.saveBooks(1)
                         }
                    }
               }).catch((err) => { })

          },
          saveBooks(type) {
               /**
                * @name 发书
                * @method post
                * @param userId 用户ID
                * @param type 操作类型(1:第一次登陆，2，投票)
               */
               let options = {
                    urls: '/user/getBook/' + this.userId + '/' + type,
                    data: {
                         userId: this.userId,
                         type
                    },
                    methods: 'post',
                    types: 1,
                    des: false,
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         if (type === 1) {
                              this.dialogShow(1, true, {
                                   type,
                                   bookId: res.data.data.id,
                                   bookPicUrl: res.data.data.img,
                                   bookName: res.data.data.name,
                                   bookWebUrl: res.data.data.bookWebUrl,
                                   isSignIn: this.isAutoSignIn
                              });
                         } else {
                              this.dialogShow(1, true, {
                                   type,
                                   bookId: res.data.data.id,
                                   bookPicUrl: res.data.data.img,
                                   bookName: res.data.data.name,
                                   bookWebUrl: res.data.data.bookWebUrl,
                                   nums: this.nums,
                                   userTicketCount: this.userTicketCount
                              });
                         }
                    }
               }).catch((err) => { })
          },
          getTicket(type) {
               /**
                * @name 签到/分享/关注
                * @method post
                * @param userId 用户ID
                * @param type 操作类型(1:关注；2：签到；3：分享)
                */
               let options = {
                    urls: '/user/getTicket/' + this.userId + '/' + type,
                    data: {
                         userId: this.userId,
                         type
                    },
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.msg != 17 || res.data.msg != 18 || res.data.code == 200) {
                         this.userTicketCountChange(1)
                         if (type === 1) {
                              this.isFollow = true
                              this.dialogShow(4, true)
                         }
                         if (type === 2) {
                              this.isSignIn = true
                         }
                    }
               }).catch((err) => { })

          },
          setVote() {
               /**
                * @name 投票
                * @method post
                * @param userId 用户ID
                * @param starId 明星ID
                * @param nums   投票数量
                */
               let options = {
                    urls: '/user/vote',
                    data: {
                         userId: this.userId,
                         starId: this.starId,
                         nums: this.nums
                    },
                    methods: 'post',
                    types: 1,
                    des: false,
                    responseType: 1
               }

               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         if (res.data.data.id) {
                              this.isShowDialog = false
                              this.saveBooks()
                         } else {
                              this.dialogShow(8, true, { nums: this.nums })
                         }
                         this.getStarSolt()
                    }
               }).catch((err) => { })
          },
          userTicketCountChange(type) {
               /**
                * @name 当前用户拥有选票的数量变更
                * @param type(1：票数自增，0：票数自减)
               */
               if (type) {
                    this.myVoteData['userTicketCount'] += 10
               } else {
                    this.myVoteData['userTicketCount'] -= this.nums
               }
          },
          attentionHandler() {
               /**
                * @name 关注
               */
               this.getTicket(1)

               // isf = this.attentionHandler ? 'unfollow' : 'follow'
               // my.postMessage({
               //      action: 'follow',
               //      data: {}
               // })
          },
          obshareHandler() {
               /**
                * @name 分享
               */
               // my.postMessage({
               //      action: 'share',
               //      data: {
               //           title: '示例',
               //           desc: '官方示例Demo',
               //           content: '官方示例Demo，展示已支持的接口能力及组件。',
               //           path: '/voting',
               //           query: {
               //                a: 1
               //           },
               //           imageUrl: 'https://img.dz19.net/forum/201901/04/132545icn959e8xnqxebjn.jpg'
               //      }
               // })
               this.getTicket(3)
          },
          sugnInHandler() {
               /**
                * @name 签到
               */
               this.getTicket(2)
          },
          readHandler() {
               /**
                * @name 阅读
               */
               window.location.href = 'https://lanhuapp.com/web/#/item/board/detail?pid=b91a1034-6b12-4148-bb7f-4cb55a726715&project_id=b91a1034-6b12-4148-bb7f-4cb55a726715&image_id=6722a10d-4b94-4487-aed7-85a94999aad2'
               // my.navigateTo({
               //      url: '',
               //      //跳转成功
               //      success() { },
               //      //跳转失败
               //      fail() { },
               //      //调用完成（无论成功失败）
               //      complete() { }
               // })
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
          dialogListenEvent(obj) {
               /**
                * dialog关闭事件处理
                */
               switch (obj.type) {
                    case 1:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;

                    case 2:

                         break;

                    case 3:

                         break;

                    case 4:
                         if (obj.eventType == 'dialogComponentEvent') {
                              this.isShowDialog = false
                         }
                         break;
                    case 5:
                         if (obj.eventType == 'dialogComponentEvent') {
                              //投票
                              this.setVote()
                         }
                         if (obj.eventType == 'goRule') {
                              //做任务
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
          doVotingHandler(starId) {
               /**
               * 投票
               */
               this.starId = starId;
               this.dialogShow(5, true, {
                    isCanVote: this.isCanVote,
                    nums: this.userTicketCount
               });
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
               this.dialogShow(6, true);
          },
          dialogShow(type, isShow, obj = {}) {
               /**
                * 呼起弹窗并传递数据给dialog
                */
               this.dialogOpations = obj;
               this.isShowDialog = isShow;
               this.dialogType = type;
          }
     }
}
</script>
<style scoped lang="scss">
.m-voting-template {
     // padding-bottom: 1.62rem /* 162/100 */;
     width: 7.5rem;
     height: 32.68rem;
     margin: auto;
     @include background("/static/images/bg.jpg");
     header {
          .g-video-container {
               overflow: hidden;
               position: relative;
               text-align: center;
               .u-rule {
                    position: absolute;
                    width: 0.76rem /* 76/100 */;
                    height: 0.75rem /* 75/100 */;
                    display: inline-block;
                    top: 2.43rem;
                    left: 0rem;
                    z-index: 999;
                    @include background("/static/images/rule@2x.png");
               }
               .u-myVoteCon-link {
                    position: absolute;
                    width: 0.76rem /* 76/100 */;
                    height: 0.75rem /* 75/100 */;
                    display: inline-block;
                    top: 3.38rem;
                    left: 0rem;
                    z-index: 999;
                    @include background("/static/images/history@2x.png");
               }
               .u-vote-count {
                    padding-top: 0.25rem;
                    position: absolute;
                    right: 0.24rem;
                    top: 2.97rem;
                    width: 1.37rem;
                    height: 1.35rem;
                    @include background("/static/images/havevote@2x.png");
                    p {
                         text-align: center;
                         color: #fff;
                         font-size: 0.23rem;
                         font-family: FZLTZCHJW--GB1-0;
                         line-height: 0.25rem;
                    }
               }
               .g-video-banner {
                    position: relative;
                    margin: 4.62rem auto 0;
                    width: 3.18rem;
                    height: 1.7rem;
                    // background: #101010;
                    border-radius: 0.07rem;
                    .u-video-icon {
                         position: absolute;
                         left: 50%;
                         margin-left: -0.14rem;
                         top: 50%;
                         margin-top: -0.14rem;
                         width: 0.28rem;
                         height: 0.28rem;
                         background: #fff;
                         border-radius: 0.14rem;
                    }
               }
          }
     }
     .g-myVoteCon {
          .g-vote-msg {
               width: 6.6rem;
               height: 0.76rem;
               line-height: 0.76rem;
               margin: 0.29rem auto 0.43rem;
               text-align: center;
               color: #ffd8a1;
               font-size: 0.22rem;
               font-family: FZLTHK--GBK1-0;
               @include background("/static/images/tit@2x.png");
          }
          .g-vote-list {
               ul {
                    padding: 0 0.47rem 0 0.69rem;
                    li {
                         .g-vote-li {
                              overflow: hidden;
                              width: 1.86rem;
                              height: 2.58rem;
                              // background:#FFE5D4;
                              @include background(
                                   "/static/images/starvote@2x.png"
                              );
                         }
                         span {
                              display: block;
                         }
                         .u-img {
                              margin: 0.2rem auto 0;
                              width: 1.65rem /* 165/100 */;
                              height: 1.91rem /* 191/100 */;
                              border-radius: 0.08rem;
                         }
                         .u-vote-num {
                              display: block;
                              margin-top: 0.04rem /* 4/100 */;
                              text-align: center;
                              font-size: 0.18rem /* 18/100 */;
                              font-family: FZLTCHJW--GB1-0;
                              font-weight: 400;
                              font-style: italic;
                              color: rgba(194, 65, 67, 1);
                         }
                    }
               }
               .g-btn {
                    margin: 0.17rem auto 0.21rem;
                    font-size: 0.14rem;
                    width: 1.7rem;
                    height: 0.69rem;
                    text-align: center;
                    font-family: PingFang SC;
                    border-radius: 0.04rem;
                    line-height: 0.3rem;
                    @include background("/static/images/addvote@2x.png");
                    .u-nums {
                         padding-left: 0.25rem;
                         color: #ffe2c3;
                         font-size: 0.17rem;
                         font-family: FZLTCHJW--GB1-0;
                         font-style: italic;
                         line-height: 0.23rem;
                    }
               }
          }
     }
     .g-myVote {
          position: relative;
          margin: 0.86rem auto 0;
          .u-myVote-tit {
               //   margin-top: 1.13rem;
               span {
                    margin: auto;
                    display: block;
                    width: 4.15rem;
                    height: 0.7rem;
                    @include background("/static/images/myvotenum@2x.png");
               }
          }
          .g-vote-context {
               margin: 0.38rem auto 0;
               overflow: hidden;
               border-radius: 0.1rem;
               .g-vote-list {
                    padding: 0 0.37rem /* 37/100 */;
                    ul {
                         height: 1.51rem /* 151/100 */;
                         li {
                              position: relative;
                              width: 3.22rem;
                              height: 0.62rem /* 62/100 */;
                              @include background(
                                   "/static/images/nengliangbtn.png"
                              );
                              .u-moman {
                                   position: absolute;
                                   top: 0;
                                   display: block;
                                   width: 100%;
                                   height: 100%;
                                   border-radius: 0.62rem;
                                   background: rgba(0, 0, 0, 0.4);
                              }
                              // flex: 0 0 auto;
                              .u-text {
                                   // margin-right: 0.36rem;
                                   color: #ffffff;
                                   font-family: FZLTTHJW--GB1-0;
                                   font-size: 0.21rem;
                              }
                              .u-ticketbtn {
                                   margin: auto;
                              }
                              .u-icon1 {
                                   margin-right: 0.12rem;
                                   display: inline-block;
                                   width: 0.38rem;
                                   height: 0.39rem;
                                   @include background(
                                        "/static/images/people@2x.png"
                                   );
                              }
                              .u-icon2 {
                                   margin-right: 0.12rem;
                                   display: inline-block;
                                   width: 0.38rem;
                                   height: 0.39rem;
                                   @include background(
                                        "/static/images/duigou@2x.png"
                                   );
                              }
                              .u-icon3 {
                                   margin-right: 0.12rem;
                                   display: inline-block;
                                   width: 0.38rem;
                                   height: 0.39rem;
                                   @include background(
                                        "/static/images/book@2x.png"
                                   );
                              }
                              .u-icon4 {
                                   margin-right: 0.12rem;
                                   display: inline-block;
                                   width: 0.38rem;
                                   height: 0.39rem;
                                   @include background(
                                        "/static/images/fanhui@2x.png"
                                   );
                              }
                         }
                    }
               }
          }
     }
     .g-star-bookList {
          margin-top: 1.15rem;
     }
}
</style>
