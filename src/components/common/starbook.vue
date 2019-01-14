<template>
     <section>
          <section class="u-star-tit">
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
                                        v-for="(item,i) in changeList"
                                        :key="i"
                                        @click="starChange(i,item.bid)"
                                   >
                                        <section class="g-u-box-item-img">
                                             <img :src="item.src" alt>
                                        </section>
                                   </section>
                              </section>
                         </section>
                    </section>
               </section>
               <!-- v-if="isClick && this.starBookData[0]!=null" -->
               <book-list
                    :starBookData="starBookData"
                    :myRecommend="changeList[indexNum-10000]"
                    @lookBooks="lookBooks"
                    @videoPlay="videoPlay"
               ></book-list>
          </section>
     </section>
</template>
<script>
export default {
     data() {
          return {
               indexNum: 10000,
               starBookData: [],
               isBookList: false,
               isClick: false,
               changeList: [
                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“青春进行时，阅读正当时。青春、梦想、勇气，不止于现在”',
                         bid: '10002',
                         src: require('@/assets/img/star/wl.png'),
                         name: '吴磊'
                    },
                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“行万里路回到内心深处，读万卷书看清皓月繁星”',
                         bid: '10000',
                         src: require('@/assets/img/star/gxs.png'),
                         name: '高晓松'
                    },
                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“享受生命中的小美好，等着风来，也等着你”',
                         bid: '10005',
                         src: require('@/assets/img/star/sy.png'),
                         name: '沈月'
                    },
                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“与孩子一起在书中的世界，感受天马行空的幻想”',
                         bid: '10003',
                         src: require('@/assets/img/star/wff.png'),
                         name: '王霏霏'
                    },

                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“没有谁是一座孤岛，每本书都是一个世界”',
                         bid: '10004',
                         src: require('@/assets/img/star/yyw.png'),
                         name: '袁娅维'
                    },
                    {
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“曾经以为，拥有是不容易的；后来才知道，舍弃更难。”',
                         bid: '10001',
                         src: require('@/assets/img/star/zxx.png'),
                         name: '张小娴'
                    }
               ]
          }
     },
     components: {
          BookList: () => import('./vooklist.vue'),
     },
     methods: {
          getStarBook(index) {
               /**
                * @name 获取明星书单
                * @method post
                * @param starId
               */
               let options = {
                    urls: `/starBookInfo/${index}`,
                    data: {},
                    methods: 'post',
                    types: 1,
                    des: false
               }
               this.isClick = false;
               this.$http(options).then((res) => {
                    if (res.data.code === 200) {
                         this.starBookData = res.data.data.starList
                         this.isClick = true;
                    }
               }).catch((err) => { })
          },
          lookBooks(val) {
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
          videoPlay(val) {
               this.$emit('videoPlay', val)
          },
          starChange(index, bid) {
               if (!this.isClick || this.indexNum == (10000 + index)) return
               this.indexNum = 10000 + index;
               this.getStarBook(`${bid}`)
          }
     },
     created() {
          this.getStarBook('10000');
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
               line-height: 0.96rem;
               @include background("~@/assets/img/l_starimg@2x.png");
               .g-u-box-item-img {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                    overflow: hidden;
                    margin: auto;
                    width: 82px;
                    height: 82px;
                    border-radius: 50%;
                    img {
                         position: absolute;
                         top: 0.27rem;
                         left: 50%;
                         margin-left: -50%;
                         -webkit-transform: scale(1.4);
                         transform: scale(1.4);
                    }
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
          .u-tit {
               margin: auto;
               width: 4.75rem /* 475/100 */;
               height: 0.44rem /* 44/100 */;
               line-height: 0.44rem /* 44/100 */;
               font-size: 0.21rem /* 21/100 */;
               font-family: FZLTHJW--GB1-0;
               font-weight: 400;
               font-style: italic;
               color: rgba(255, 255, 255, 1);
               text-align: center;
               @include background("~@/assets/img/booktit@2x.png");
          }
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
</style>
