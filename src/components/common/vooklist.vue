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
        <div class="vjx swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <!--左箭头-->
        <div class="swiper-button-next"></div>
        <!--右箭头-->
    </div>
</template>
<script>

export default {
    props: ['starBookData'],
    data() {
        return {

        }
    },
    components: {
        BookItem: () => import('../common/bookitem.vue'),
    },
    mounted() {
        setTimeout(() => {
            var mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 3,   //设置slider容器能够同时显示的slides数量
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
        }, 0)
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
    height: 5.85rem;
    margin: auto;
    -webkit-transition: all 1s;
}
#investproSwiper .swiper-slide .hrplan_slide {
    color: #fff;
}
#investproSwiper .swiper-slide-active .hrplan_slide {
    color: #fff;
}
#investproSwiper .swiper-slide .newhand_slide {
    color: #fff;
}
#investproSwiper .swiper-slide-active .newhand_slide {
    color: #fff;
}
#investproSwiper .swiper-slide .sxm_slide {
    color: #fff;
}
#investproSwiper .swiper-slide-active .sxm_slide {
    color: #fff;
    background: #000;
}
// .swiper-slide a {
//     width: 3.8rem;
//     height: 0.7rem;
//     background: #eb4e39;
//     display: block;
//     font-size: 0.36rem;
//     color: #fff;
//     text-align: center;
//     line-height: 0.7rem;
//     border-radius: 0.08rem;
//     position: absolute;
//     left: 0;
//     right: 0;
//     margin: auto;
//     bottom: 0.85rem;
//     z-index: 2;
// }
// .swiper-slide-active .investpro a {
//     width: 4.33rem;
//     height: 0.8rem;
//     line-height: 0.8rem;
//     bottom: 0.4rem;
// }
.swiper-container-horizontal > .swiper-pagination {
    height: 0.5rem;
    text-align: center;
    bottom: 0;
}
.swiper-pagination-bullet {
    background: #fff;
    border-radius: 50%;
    width: 0.12rem;
    height: 0.12rem;
    margin-left: 0.18rem;
    opacity: 1;
}
.swiper-pagination-bullet-active {
    background: #e04531;
}
.investproTab {
    width: 4.6rem;
    height: 6.37rem;
    position: absolute;
    top: 0.58rem;
    z-index: 2;
    opacity: 0;
}
.investpro-prev {
    left: -3.6rem;
}
.investpro-next {
    right: -3.6rem;
}
</style>
