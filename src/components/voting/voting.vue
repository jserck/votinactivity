<template>
     <section class="m-voting-template">
          <Dialog
               v-if="isShowDialog"
               :dialogType="dialogType"
               :dialogOpations="dialogOpations"
               @isCloase="isShowDialog=false"
               @dialogListenEvent="dialogListenEvent"
               @voteNumChange3="voteNumChange3"
          ></Dialog>
          <header>
               <section class="g-video-container">
                    <section class="u-rule" @click="ruleHandler">
                         <section class="u-text">活动规则</section>
                         <img src="/static/images/right@2x.png" alt>
                    </section>
                    <section class="g-video-banner" @click="videoPlay">
                         <!-- <span class="u-video-icon"></span> -->
                    </section>
               </section>
          </header>
          <!-- 投票记录 -->
          <section class="g-myVoteCon" id="scroll">
               <section class="g-vote-msg">
                    <span>已有13465人次一起读书，领读官已送出2689本书</span>
               </section>
               <section class="u-myVoteCon-link clearfix" @click="myVoteCon">
                    <span class="u-myVoteCon-text"></span>
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
                                   <span class="u-vote-num">{{item.name}}</span>
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
                    <section class="u-vote-count">
                         <p>当前</p>
                         <p>能量值</p>
                         <p>{{userTicketCount}}</p>
                    </section>
                    <!-- <span class="u-vote-btn" v-scroll="'scroll'">立即投票</span> -->
                    <section class="g-vote-list">
                         <ul>
                              <li
                                   v-if="!isFollow"
                                   class="displayFlex flexJustifybetween flexAlignItemsCenter"
                              >
                                   <span
                                        class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   >
                                        <span class="u-icon1"></span>
                                        <span class="u-text">关注小程序获得1能量</span>
                                   </span>
                                   <i class="u-line-link"></i>
                                   <!-- <span class="u-myVote-btn"> -->
                                   <span v-if="!isFollow" class="g-btn" @click="voteClick(1)">去关注</span>
                                   <span
                                        v-else
                                        class="g-btn"
                                        style="background:#C85657;color:#fff"
                                   >已关注</span>
                                   <!-- </span> -->
                              </li>
                              <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                                   <span
                                        class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   >
                                        <span class="u-icon2"></span>
                                        <span class="u-text">每日签到获得1能量</span>
                                   </span>
                                   <i class="u-line-link"></i>
                                   <!-- <span> -->
                                   <span v-if="!isSignIn" class="g-btn" @click="voteClick(2)">去签到</span>
                                   <span
                                        v-else
                                        class="g-btn"
                                        style="background:#C85657;color:#fff"
                                   >已签到</span>
                                   <!-- </span> -->
                              </li>
                              <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                                   <span
                                        class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   >
                                        <span class="u-icon4"></span>
                                        <span class="u-text">每阅读1本书获得1能量</span>
                                   </span>
                                   <i class="u-line-link"></i>
                                   <!-- <span class="u-myVote-btn"> -->
                                   <span class="g-btn" @click="voteClick(4)">去阅读</span>
                                   <!-- </span> -->
                              </li>
                              <li class="displayFlex flexJustifybetween flexAlignItemsCenter">
                                   <span
                                        class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   >
                                        <span class="u-icon3"></span>
                                        <span class="u-text">分享获得能量 今日还有{{shareCount}}次机会</span>
                                   </span>
                                   <i class="u-line-link"></i>
                                   <!-- <span class="u-myVote-btn"> -->
                                   <span class="g-btn" @click="voteClick(3)">去分享</span>
                                   <!-- </span> -->
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
               starId: 0,//记录当前投票明星ID
               nums: 0,//监听投票数
               isFirst: false,//当天是否首次进入
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
                    data: {
                         userId: this.userId,
                         isFollow: this.isFollow
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
                    urls: '/user/getBook/1/1',
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
                                   bookId: res.data.data.bookId,
                                   bookPicUrl: res.data.data.img,
                                   bookName: res.data.data.name,
                                   bookWebUrl: res.data.data.bookWebUrl,
                                   isSignIn: this.isSignIn
                              });
                         } else {
                              this.dialogShow(1, true, {
                                   type,
                                   bookId: res.data.data.bookId,
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
                    urls: '/user/getTicket/1/1',
                    data: {
                         userId: this.userId,
                         type
                    },
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         this.userTicketCountChange(1)
                         if (type === 1) {
                              this.isFollow = true
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
                    this.userTicketCountChange(0)
                    if (res.data.code === 200) {
                         this.isShowDialog = false
                         this.saveBooks()
                    } else {
                         this.dialogShow(8, true, { nums: this.nums })
                    }
               }).catch((err) => { })

          },
          // this.myVoteData['userTicketCount']
          userTicketCountChange(type) {
               /**
                * @name 当前用户拥有选票的数量变更
                * @param type(1：票数自增，0：票数自减)
               */
               let num = this.myVoteData['userTicketCount'];
               if (type) {
                    num += this.nums
               } else {
                    num -= this.nums
               }
          },
          attentionHandler() {
               /**
                * @name 关注
               */
               // this.getTicket(1)
               // this.dialogShow(4, true)
               // isf = this.attentionHandler ? 'unfollow' : 'follow'
               my.postMessage({
                    action: 'follow',
                    data: {}
               })
          },
          obshareHandler() {
               /**
                * @name 分享
               */
               my.postMessage({
                    action: 'share',
                    data: {
                         title: '示例',
                         desc: '官方示例Demo',
                         content: '官方示例Demo，展示已支持的接口能力及组件。',
                         path: '/voting',
                         query: {
                              a: 1
                         },
                         imageUrl: 'https://img.dz19.net/forum/201901/04/132545icn959e8xnqxebjn.jpg'
                    }
               })
               // this.getTicket(3)
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
                    isCanVote: this.isCanVote
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
               setTimeout(() => {
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
     }
}
</script>
<style scoped lang="scss">
.m-voting-template {
     width: 7.5rem;
     height: 32.51rem;
     margin: auto;
     @include background("/static/images/bg.jpg");
     header {
          .g-video-container {
               overflow: hidden;
               position: relative;
               text-align: center;
               .u-rule {
                    position: absolute;
                    padding: 0.16rem 0.17rem;
                    display: inline-block;
                    top: 0.2rem;
                    right: 0.15rem;
                    background: #8200a1;
                    color: #1f2028;
                    font-size: 0.22rem;
                    text-align: center;
                    z-index: 999;
                    font-family: FZLTHK--GBK1-0;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    border-radius: 0.1rem;
                    .u-text {
                         line-height: 0.288rem;
                         display: inline-block;
                         vertical-align: middle;
                    }
                    img {
                         text-align: center;
                         margin-left: 0.07rem;
                         display: inline-block;
                         vertical-align: middle;
                         width: 0.11rem;
                    }
               }
               .g-video-banner {
                    position: relative;
                    margin: 4.02rem auto 0;
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
               padding: 0.24rem 0;
               width: 6.6rem;
               height: 0.76rem;
               line-height: 0.76rem;
               margin: 0.25rem auto 0;
               text-align: center;
               color: #ffd8a1;
               font-size: 0.22rem;
               font-family: FZLTHK--GBK1-0;
               @include background("/static/images/tit@2x.png");
          }
          .u-myVoteCon-link {
               position: relative;
               margin: 0 auto 0.11rem;
               .u-myVoteCon-text {
                    width: 1.96rem;
                    height: 0.36rem;
                    margin-right: 0.13rem;
                    display: inline-block;
                    float: right;
                    @include background("/static/images/myvotehistory@2x.png");
               }
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
                              margin: 0.3rem auto 0;
                              width: 1.05rem;
                              height: 1.11rem;
                              background: #101010;
                              border-radius: 0.08rem;
                         }
                         .u-vote-num {
                              margin-top: 0.1rem;
                              font-size: 0.14rem;
                              text-align: center;
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
          margin: 0.22rem auto;
          .u-myVote-tit {
               margin-top: 1.13rem;
               span {
                    margin: auto;
                    display: block;
                    width: 4.15rem;
                    height: 0.7rem;
                    @include background("/static/images/myvotenum@2x.png");
               }
          }
          .g-vote-context {
               margin: 0.08rem auto 0;
               overflow: hidden;
               width: 6.37rem;
               background: #f7f7f7;
               border-radius: 0.1rem;
               @include background("/static/images/votecontext@2x.png");
               .u-vote-count {
                    padding-top: 0.2rem;
                    position: absolute;
                    right: 0.31rem;
                    top: -1.12rem;
                    width: 1.09rem;
                    height: 1.08rem;
                    @include background("/static/images/havevote@2x.png");
                    p {
                         text-align: center;
                         color: #fff;
                         font-size: 0.19rem;
                         font-family: FZLTZCHJW--GB1-0;
                         line-height: 0.21rem;
                    }
               }
               .u-vote-btn {
                    display: block;
                    margin: 0.27rem auto;
                    width: 2.07rem;
                    height: 0.3rem;
                    border-radius: 0.04rem;
                    color: rgba(16, 16, 16, 1);
                    font-size: 0.2rem;
                    text-align: center;
                    font-family: PingFang SC;
                    border: 1px solid rgba(187, 187, 187, 1);
                    line-height: 0.3rem;
               }
               .g-vote-list {
                    padding: 0.46rem 0.46rem 0.66rem 0.46rem;
                    ul {
                         li {
                              padding-top: 0.26rem;
                              .u-text {
                                   margin-right: 0.36rem;
                                   color: #ffffff;
                                   font-family: FZLTTHJW--GB1-0;
                                   font-size: 0.21rem;
                              }
                              .u-line-link {
                                   max-width: 1rem;
                                   padding: 0 0.1rem;
                                   flex: 1;
                                   height: 0;
                                   border-top: 0.01rem dashed #fff;
                              }
                              .u-line-active {
                                   width: 1rem;
                                   height: 0;
                                   border-top: 0.01rem dashed #fff;
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
                              .g-btn {
                                   margin-left: 0.36rem;
                                   display: inline-block;
                                   font-size: 0.21rem;
                                   width: 1.06rem;
                                   height: 0.43rem;
                                   border-radius: 0.43rem;
                                   text-align: center;
                                   font-family: "FZLTZCHJW--GB1-0";
                                   font-style: italic;
                                   line-height: 0.43rem;
                                   background: #ffe5d4;
                                   color: #ad1226;
                                   font-weight: 400;
                              }
                         }
                    }
                    .g-star-video {
                         width: 2.7rem;
                         height: 1.14rem;
                    }
               }
          }
     }
}
</style>
