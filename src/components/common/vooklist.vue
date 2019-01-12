<template>
     <div class="m-swiper">
          <section class="myRecommend">
               <span>{{myRecommend.text}}</span>
          </section>
          <div class="vjx swiper-container displayFlex">
               <span class="lookBook" @click="lookBook">点击查看{{myRecommend.name}}私房书单</span>
               <section class="starimg" @click="videoPlay">
                    <img :src="myRecommend.src" alt>
               </section>
               <section class="swiper-list">
                    <ul class="displayFlex flexJustifybetween">
                         <li
                              :style="(index ==0)?'padding-left:0':''"
                              v-for="(item,index) in starBookDatas"
                              :key="index"
                              @click="nativeto(item,index)"
                         >
                              <book-item :indexNum="index" :obj="item"></book-item>
                         </li>
                    </ul>
               </section>
          </div>
     </div>
</template>
<script>

export default {
     props: ['starBookData', 'myRecommend'],
     data() {
          return {
               mySwiper: null
          }
     },
     computed: {
          starBookDatas() {
               return this.starBookData
          }
     },
     components: {
          BookItem: () => import('../common/bookitem.vue'),
     },
     methods: {
          nativeto(item, index) {
               // 跳转至封面页
               let bid = item.bookId;
               try {
                    console.log(`did=${bid}`);
                    console.log(`path:/cover/${bid}`);
                    my.postMessage({
                         event: 'navigatorTo',
                         data: { path: `/cover/${bid}`, query: {} }
                    });
               } catch (error) {
                    // this.$toast('跳转失败!')
               }
          },
          lookBook() {
               this.$emit('lookBooks', this.myRecommend.bid)
          },
          videoPlay(){
               this.$emit('videoPlay', this.myRecommend.video)
          }
     }
}
</script>

<style lang="scss" scoped>
.m-swiper {
     margin-top: 0.58rem;
     position: relative;
}
.myRecommend {
     position: absolute;
     right: 1.31rem;
     top: -0.44rem;
     z-index: 999;
     width: 3.41rem;
     height: 0.73rem;
     line-height: 0.47rem;
     @include background("~@/assets/img/myRecommend.png");
     @include setFont(0.18rem, "FZLTZCHJW--GB1-0", 400, auto, #fff, center);
     font-style: italic;
}
.swiper-container {
     position: relative;
     margin: 0.25rem /* 25/100 */ auto 0;
     width: 7.5rem /* 566/100 */;
     height: 4.39rem;
     @include background("~@/assets/img/boolist@2x.png");
     .lookBook {
          position: absolute;
          right: 1.31rem;
          top: 0.37rem;
          @include setFont(
               0.18rem,
               "FZLTZCHJW--GB1-0",
               400,
               0.34rem,
               #ffb569,
               center
          );
     }

     .starimg {
          overflow: hidden;
          position: absolute;
          left: 0.48rem;
          bottom: 0.59rem;
          width: 2.85rem;
          height: 4.06rem;
     }
     .swiper-list {
          position: absolute;
          top: 1.09rem;
          right: 0.61rem;
          overflow: hidden;
          overflow-x: scroll;
          -webkit-overflow-scrolling: touch;
          width: 3.37rem;
     }
     ul {
          margin: auto;
          li {
               // padding-top: 0.2rem;
               padding-right: 0.12rem /* 29/100 */;
               flex: 0 0 auto;
               width: 1.21rem /* 131/100 */;
          }
     }
}
</style>
