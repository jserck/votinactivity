<template>
     <section>
          <section class="u-star-tit" v-if="isShowTit != 'voted'">
               <span></span>
          </section>
          <section class="g-star-book-conatiner">
               <section style="width:100%;position:relative">
                    <!-- <section
                         class="g-star-book-header"
                         :style="`background:url(${changeList[indexNum-10000].src});
                         background-repeat:no-repeat;
                         background-size:cover`"
                    >
                         <span class="u-l" @click="leftHandler"></span>
                         <span class="u-play" @click="videoPlay"></span>
                         <span class="u-r" @click="rightHandler"></span>
                    </section>-->
                    <section class="g-star-book-lists">
                         <!-- <section class="u-tit">
                              <span>{{changeList[indexNum-10000].text}}</span>
                         </section>-->
                         <section class="g-scroll-star">
                              <section
                                   class="g-scroll-star-box displayFlex flexJustifybetween flexAlignItemsCenter"
                              >
                                   <section
                                        :class="indexNum == `1000${i}` ? 'u-box-item-active':'u-box-item-link'"
                                        class="displayFlex"
                                        v-for="(item,i) in changeList"
                                        :key="i"
                                        @click="starChange(i,item.bid)"
                                   >
                                        <section class="g-u-box-item-img">
                                             <img :src="item.atherImg" alt>
                                        </section>
                                   </section>
                              </section>
                         </section>
                    </section>
               </section>
               <!-- <section class="footStarText">

               </section>
               <section class="footStarBookList"></section>-->
               <!-- v-if="isClick && this.starBookData[0]!=null" -->
               <book-list
                    :starBookData="starBookData"
                    :myRecommend="changeList[indexNum-10000]"
                    :userId="userId"
                    @lookBooks="lookBooks"
                    @videoPlay="videoPlay"
               ></book-list>
          </section>
     </section>
</template>
<script>
export default {
     props: ['isShowTit', 'userId'],
     data() {
          return {
               indexNum: 10003,
               starBookData: [],
               isBookList: false,
               isClick: false,
               timer: null,
               islookBooks: true,
               changeList: [
                    {
                         video: 'http://activity.cun-tu.cn/v_wff.mov',
                         text: '"与孩子一起在书中的世界，感受天马行空的幻想"',
                         bid: '10003',
                         src: require('@/assets/img/star/b_wff.png'),
                         atherImg: require('@/assets/img/ather/wff_x.png'),
                         name: '王霏霏',
                         did: 503
                    },

                    {
                         video: 'http://activity.cun-tu.cn/y_yyw.mov',
                         text: '"没有谁是一座孤岛，每本书都是一个世界"',
                         bid: '10004',
                         src: require('@/assets/img/star/b_yyw.png'),
                         atherImg: require('@/assets/img/ather/yyw_x.png'),
                         name: '袁娅维',
                         did: 491
                    },
                    {
                         video: 'http://activity.cun-tu.cn/v_zzx.mov',
                         text: '"曾经以为，拥有是不容易的；后来才知道，舍弃更难。"',
                         bid: '10001',
                         src: require('@/assets/img/star/b_zxx.png'),
                         atherImg: require('@/assets/img/ather/zxx_x.png'),
                         name: '张小娴',
                         did: 485
                    },
                    {
                         video: 'http://activity.cun-tu.cn/v_wl.mov',
                         text: '"青春进行时，阅读正当时。青春、梦想、勇气，不止于现在"',
                         bid: '10002',
                         src: require('@/assets/img/star/b_wl.png'),
                         atherImg: require('@/assets/img/ather/wl_x.png'),
                         name: '吴磊',
                         did: 487
                    },
                    {
                         video: 'http://activity.cun-tu.cn/v_sy.mov',
                         text: '"享受生命中的小美好，等着风来，也等着你"',
                         bid: '10005',
                         src: require('@/assets/img/star/b_sy.png'),
                         atherImg: require('@/assets/img/ather/sy_x.png'),
                         name: '沈月',
                         did: 489
                    },
                    {
                         video: 'http://activity.cun-tu.cn/v_wcz.mov',
                         text: '"徜徉在历史的浩瀚长河中，将古往今来的睿智思考收入囊中"',
                         bid: '10000',
                         src: require('@/assets/img/star/b_hcz.png'),
                         atherImg: require('@/assets/img/ather/hcz_x.png'),
                         name: '何常在',
                         did: 483
                    }
               ]
          }
     },
     components: {
          BookList: () => import('./vooklist.vue'),
     },
     mounted() {
          this.preLoad();
     },
     methods: {
          preLoad() {
               let count = 0;
               let len = this.changeList.length;

               for (let i = 0; i < len; i++) {
                    let img = document.createElement('img');
                    img.onload = function () {
                         if (count == len - 1) {
                              console.log('明星加载完成');
                              return;
                         };
                         count++;
                    }
                    img.src = this.changeList[i].src;
               }
          },
          getStarBook(index) {
               /**
                * @name 获取明星书单
                * @method post
                * @param starId
               */
               let options = {
                    urls: `/starBookInfo/${index}/${this.userId || null}`,
                    data: {},
                    methods: 'post',
                    types: 1,
                    des: false
               }
               if (this.isClick) {
                    this.isClick = false;
               }
               this.$http(options).then((res) => {
                    if (res && res.message == '网络错误') {
                         this.$toast('网络已断开');
                         return;
                    }
                    if (res.data.code === 200) {
                         this.starBookData = res.data.data.starList
                         this.isClick = true;
                    }
               }).catch((err) => {
                    // this.$toast('网络已断开');
                    // this.isClick = true
               })
          },
          lookBooksHandler(val) {
               // changeList
               try {
                    //书单详情
                    const did = val;
                    console.log(`did=${did}`);
                    console.log(`path:/booklistdetail/${did}`);
                    my.postMessage({
                         event: 'navigatorTo',
                         data: { path: `/booklistdetail/${did}`, query: {} }
                    });
               } catch (error) {
                    // this.$toast('跳转失败!')
               }
          },
          lookBooks(val) {
               //书单详情
               if (this.islookBooks) {
                    this.islookBooks = false;
                    this.lookBooksHandler(val);
                    let timer = setTimeout(() => {
                         this.islookBooks = true;
                         clearTimeout(timer);
                    }, 3000)
               } else {
                    return;
               }

          },
          videoPlay(val) {
               this.$emit('videoPlay', val)
          },
          starChange(index, bid) {
               if (this.indexNum == (10000 + index)) return;
               this.indexNum = 10000 + index;
               this.getStarBook(`${bid}`)
               this.$emit('votingStarChange', index)
          }
     },
     created() {
          this.getStarBook('10002');
     }
}
</script>

<style scoped lang="scss">
.u-star-tit {
     span {
          display: block;
          margin: auto;
          width: 4.15rem;
          height: 0.7rem /* 70/100 */;
          @include background("~@/assets/img/booklist@2x.png");
     }
}
.g-scroll-star {
     margin-bottom: 0.1rem /* 10/100 */;
     .g-scroll-star-box {
          margin: auto;
          width: 6.48rem /* 635/100 */;
          height: 1.49rem /* 149/100 */;
          // @include background("~@/assets/img/starlist2x.png");
          .u-box-item-link,
          .u-box-item-active {
               width: 0.96rem /* 96/100 */;
               height: 0.96rem /* 96/100 */;
               background: #fff;
               border-radius: 0.48rem /* 39/100 */;
               text-align: center;
               box-sizing: border-box;
               line-height: 0.92rem;
               @include background("~@/assets/img/l_starimg@2x.png");
               .g-u-box-item-img {
                    position: relative;
                    padding-top: 0;
                    display: inline-block;
                    overflow: hidden;
                    margin: auto;
                    width: 0.82rem;
                    height: 0.79rem;
                    border-radius: 50%;
               }
          }
          .u-box-item-active {
               @include background("~@/assets/img/a_starimg@2x.png");
          }
     }
}

.g-star-book-conatiner {
     position: relative;
     overflow: hidden;
     margin: 0.1rem /* 90/100 */ auto 0;
     // width: 6.9rem /* 690/100 */;
     // height: 6.32rem /* 632/100 */;
     .g-star-book-header {
          position: relative;
          margin: 0 /* 40/100 */ auto 0;
          width: 4.5rem /* 450/100 */;
          height: 6.68rem /* 668/100 */;
          background-repeat: no-repeat;
          background-size: cover;
          .u-play {
               position: absolute;
               top: 50%;
               right: 0;
               margin-top: -0.495rem /* -49.5/100 */;
               left: 50%;
               right: 0;
               margin-left: -0.495rem /* -49.5/100 */;
               display: inline-block;
               width: 0.99rem /* 99/100 */;
               height: 0.99rem /* 99/100 */;
               border-radius: 49.495rem /* 49.5/100 */;
               @include background("~@/assets/img/play@2x.png");
          }
          .u-r {
               position: absolute;
               top: 50%;
               right: -0.85rem;
               margin-top: -0.39rem;
               display: inline-block;
               width: 0.52rem /* 52/100 */;
               height: 0.78rem /* 78/100 */;
               @include background("~@/assets/img/r@2x.png");
          }
          .u-l {
               position: absolute;
               top: 50%;
               left: -0.85rem;
               margin-top: -0.39rem;
               display: inline-block;
               width: 0.52rem /* 52/100 */;
               height: 0.78rem /* 78/100 */;
               @include background("~@/assets/img/l@2x.png");
          }
     }
     .g-star-book-lists {
          position: relative;
          width: 100%;
          // .u-tit {
          //      span {
          //           font-size: 0.21rem /* 21/100 */;
          //           font-family: FZLTHJW;
          //           font-weight: 400;
          //           font-style: italic;
          //           color: rgba(255, 255, 255, 1);
          //           text-align: center;
          //      }
          //      margin: auto;
          //      width: 4.75rem /* 475/100 */;
          //      height: 0.44rem /* 44/100 */;
          //      line-height: 0.44rem /* 44/100 */;
          //      @include background("~@/assets/img/booktit@2x.png");
          // }
          .u-foot {
               margin: auto;
               width: 4.29rem /* 429/100 */;
               height: 0.43rem /* 43/100 */;
               font-size: 0.24rem /* 24/100 */;
               font-family: FZLTHJW--GB1-0;
               font-weight: 400;
               font-style: italic;
               color: rgba(255, 216, 161, 1);
               text-align: center;
               line-height: 0.43rem;
               @include background("~@/assets/img/bookcount@2x.png");
          }
     }
     .g-book-num {
          margin: 0.24rem /* 24/100 */ auto 0;
          width: 4.42rem /* 442/100 */;
          height: 0.42rem /* 42/100 */;
     }
}
.footStarText {
     width: 100%;
     height: 4.39rem;
     @include background("~@/assets/img/footStarText.png");
}
.footStarBookList {
     width: 100%;
     height: 4.18rem;
     @include background("~@/assets/img/footStarBookList.png");
}
</style>
