<template>
     <section class="m-voting-template">
          <FirstIn v-if="isFirst" :isShow="type"></FirstIn>
          <Attention @dialogClose="isAttention=false" v-if="isAttention"></Attention>
          <Video v-if="isVideo" @dialogClose="isVideo=false"></Video>
          <Dialog
               v-if="dialogOpations['isShowDialog']"
               :dialogType="dialogOpations['dialogType']"
               @isCloase="dialogOpations['isShowDialog']=false"
          ></Dialog>
          <header>
               <section class="g-video-container">
                    <Rule></Rule>
                    <h3>活动标题</h3>
                    <span>2019.01.18—2019.02.10</span>
                    <section class="g-video-banner" @click="videoPlay">
                         <span class="u-video-icon"></span>
                    </section>
               </section>
          </header>
          <!-- 投票记录 -->
          <section class="g-myVoteCon">
               <ViteList></ViteList>
               <section class="g-vote-list">
                    <ul class="displayFlex flexWrap flexJustifybetween">
                         <li v-for="(item,index) in voteList" :key="index">
                              <span class="u-img"></span>
                              <span class="u-vote-num">{{item.count}}票</span>
                              <DoVoting :RightToVote="false"></DoVoting>
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
                    <p class="u-vote-count">当前拥有很多张选票</p>
                    <span class="u-vote-btn">立即投票</span>
                    <section class="g-vote-list">
                         <ul>
                              <li
                                   v-for="(item,index) in myvotelist"
                                   :key="index"
                                   class="displayFlex flexJustifybetween flexAlignItemsCenter"
                                   @click="voteClick(index+1)"
                              >
                                   <span>{{item.name}}</span>
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
                    <template slot-scope="{ indexNum }">
                         <section class="g-scroll-book">
                              <scroller lock-y :scrollbar-x="false">
                                   <section class="g-scroll-book-box displayFlex">
                                        <section class="g-box-item" v-for="i in 6" :key="i">
                                             <BookItem :indexNum="indexNum"></BookItem>
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

export default {
     components: {
          XInput, Scroller, XButton,
          ViteList: () => import('./votelist.vue'),
          Rule: () => import('./rule.vue'),
          DoVoting: () => import('./dovoting.vue'),
          StarBook: () => import('../common/starbook.vue'),
          BookItem: () => import('../common/bookitem.vue'),
          Btn: () => import('../common/btn.vue'),
          FirstIn: () => import('./firstin.vue'),
          Attention: () => import('./attention.vue'),
          Video: () => import('./video.vue'),
          Dialog: () => import('../common/dialog.vue'),
     },
     data() {
          return {
               dialogOpations: {
                    isShowDialog: false,
                    dialogType: 0
               },
               isViteList: false,
               type: 0,
               isFirst: false,
               isAttention: false,
               isVideo: false,
               voteList: [
                    {
                         count: 10
                    },
                    {
                         count: 20
                    },
                    {
                         count: 30
                    },
                    {
                         count: 40
                    },
                    {
                         count: 50
                    },
                    {
                         count: 60
                    },
               ],
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
     methods: {
          voteClick(type) {
               if (type === 1) {
                    //关注
                    my.postMessage({

                    })
                    // this.$vux.loading.show()
                    // setTimeout(() => {
                    //      this.$vux.loading.hide()
                    //      this.isAttention = true;
                    // }, 1000)
               } else if (type === 2) {
                    // 签到
               } else if (type === 3) {
                    // 分享
                    my.postMessage({

                    })
               } else {
                    // 阅读
                    my.navigateTo({
                         url: '',
                         //跳转成功
                         success() { },
                         //跳转失败
                         fail() { },
                         //调用完成（无论成功失败）
                         complete() { }
                    })
               }
          },
          videoPlay(src) {
               /**
                * 视频播放
               */
               this.$vux.loading.show()
               setTimeout(() => {
                    this.$vux.loading.hide()
                    this.isVideo = true
                    console.log(src);
               }, 1000)
          },
          dialogShow(type, isShow) {
               this['dialogOpations']['dialogType'] = type;
               this['dialogOpations']['isShowDialog'] = isShow;
          }
     },
     created() {
          this.$vux.loading.show()
          setTimeout(() => {
               this.$vux.loading.hide()
               this.type = 1
               // this.isFirst = true;
               this.dialogShow(1, true);
          }, 1000)
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
</style>
