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
                                        :class="indexNum == `1000${i-1}` ? 'u-box-item-active':'u-box-item-link'"
                                        v-for="i in 6"
                                        :key="i"
                                        @click="starChange(i-1)"
                                   ></section>
                              </section>
                         </section>
                    </section>
               </section>
               <book-list
                    v-if="isClick && this.starBookData[0]!=null"
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
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         count: 9999,
                         bid: '10001',
                         src: '/static/images/gxs.png',
                         name: '高晓松'
                    },
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         count: 8888,
                         bid: '10002',
                         src: '/static/images/sy.png',
                         name: '沈月'

                    },
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         count: 7777,
                         bid: '10003',
                         src: '/static/images/wff.png',
                         name: '王霏霏'
                    },
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         count: 6666,
                         bid: '10004',
                         src: '/static/images/wl.png',
                         name: '吴磊'
                    },
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         count: 5555,
                         bid: '10005',
                         src: '/static/images/yyw.png',
                         name: '袁娅维'
                    },
                    {                         src: '/static/images/meinv@2x.png',
                         video: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                         text: '“这里是我推荐书单这里是我推荐书单”',
                         myRecommend: 4444,
                         bid: '10006',
                         src: '/static/images/zxx.png',
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
          starChange(index) {
               if (!this.isClick) return
               this.indexNum = 10000 + index;
               this.getStarBook(`1000${index}`)
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
               @include background("~@/assets/img/l_starimg@2x.png");
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
