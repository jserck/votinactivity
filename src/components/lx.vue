<template>
     <div class="a">
          <div class="swiper-container" id="investproSwiper">
               <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="i in 6" :key="i">
                         <div class="investpro newhand_slide">{{i}}</div>
                    </div>
               </div>
               <div class="swiper-pagination"></div>
          </div>
     </div>
</template>
<script>
export default {
     data() {
          return {

          }
     },
     mounted() {
          this.$nextTick(() => {
               var mySwiper = new Swiper('.swiper-container', {
                    slidesPerView: 3,   //设置slider容器能够同时显示的slides数量
                    centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
                    loop: true,
                    speed: 500,
                    spaceBetween: 8,
                    noSwiping: false,        //设置为true时禁止切换
                    paginationClickable: false,
                    // autoplay: {
                    //      delay: 3000
                    // },
               })
          })
     }
}
</script>

<style lang="scss" scoped>
.a {
     width: 100%;
     .swiper-container {
          height: 4.2rem;
     }
     #investproSwiper {
          margin-top: 0.52rem;
     }
     #investproSwiper .swiper-slide {
          display: flex;
          position: relative;
     }
     #investproSwiper .swiper-slide .investpro {
          width: 2.61rem;
          height: 3rem;
          margin: auto;
          background: #f00;
          -webkit-transform: translate3d(-1px, -1px, -1px);
     }
     #investproSwiper .swiper-slide-active .investpro {
          background: #000;
          position: relative;
          margin: auto;
          transform: none;
          -webkit-transform: scale(2, 1.5);
          z-index: 99999;
          transition: 1s all;
     }
}
</style>
<style lang="scss">
.swiper-container-android .swiper-slide,
.swiper-wrapper {
     -webkit-transform: none;
}
</style>
