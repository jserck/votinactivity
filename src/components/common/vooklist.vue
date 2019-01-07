<template>
     <div class="vjx swiper-container" id="investproSwiper">
          <div class="vjx swiper-wrapper">
               <div class="vjx swiper-slide" v-for="(item,index) in starBookData" :key="index">
                    <div class="vjx investpro newhand_slide">
                         <!-- BookItem -->
                         <book-item :indexNum="index" :obj="item"></book-item>
                    </div>
               </div>
          </div>
          <!-- <div class="vjx swiper-pagination"></div> -->
     </div>
</template>
<script>

export default {
     props: ['starBookData'],
     data() {
          return {
               mySwiper: null
          }
     },
     components: {
          BookItem: () => import('../common/bookitem.vue'),
     },
     methods: {
          mySwiperInit() {
               this.mySwiper = new Swiper('.swiper-container', {
                    init: false,
                    slidesPerView: 3.5,   //设置slider容器能够同时显示的slides数量
                    centeredSlides: true,    //设定为true时，活动块会居中，而不是默认状态下的居左。
                    loop: true,
                    speed: 1500,
                    updateOnImagesReady: true,
                    noSwiping: false,        //设置为true时禁止切换
                    paginationClickable: false,
                    pagination: '.swiper-pagination',
                    prevButton: '#investpro-prev',
                    nextButton: '#investpro-next',
                    navigation: {
                         nextEl: '.swiper-button-next',
                         prevEl: '.swiper-button-prev',
                    },
               })
          }
     },
     mounted() {
          this.mySwiperInit()
          setTimeout(() => {
               this.mySwiper.init()
          }, 500)
     }
}
</script>

<style lang="scss" scoped>
.swiper-container {
     height: 8.2rem;
}
#investproSwiper {
     margin-top: 0.52rem;
}
#investproSwiper .swiper-slide {
     display: flex;
}
#investproSwiper .swiper-slide .investpro {
     width: 2.61rem;
     height: 4.37rem;
     margin: auto;
}
#investproSwiper .swiper-slide-active .investpro {
     width: 2.61rem;
     height: 5.37rem;
     margin: auto;
     -webkit-transition: all 1s;
}
</style>
