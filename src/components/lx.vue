<template>
    <div class="a">
        <div class="swiper-container" id="investproSwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="investpro newhand_slide">1
                        <!-- <a href="##">立即投资</a> -->
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="investpro sxm_slide">2
                        <!-- <a href="##">立即投资</a> -->
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="investpro hrplan_slide">3
                        <!-- <a href="##">立即投资</a> -->
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
            <!-- <div class="investproTab investpro-prev" id="investpro-prev"></div>
            <div class="investproTab investpro-next" id="investpro-next"></div>-->
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
                noSwiping: false,        //设置为true时禁止切换
                paginationClickable: false,
                pagination: '.swiper-pagination',
                prevButton: '#investpro-prev',
                nextButton: '#investpro-next'
            })
        })
    }
}
</script>

<style lang="scss" scoped>
.a {
    width: 100%;
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
        height: 6.37rem;
        margin: auto;
    }
    #investproSwiper .swiper-slide-active .investpro {
        width: 3.16rem;
        height: 7.25rem;
        margin: auto;
    }
    #investproSwiper .swiper-slide .hrplan_slide {
        color: #fff;
        background: #000;
    }
    #investproSwiper .swiper-slide-active .hrplan_slide {
        color: #fff;
        background: #000;
    }
    #investproSwiper .swiper-slide .newhand_slide {
        color: #fff;
        background: #000;
    }
    #investproSwiper .swiper-slide-active .newhand_slide {
        color: #fff;
        background: #000;
    }
    #investproSwiper .swiper-slide .sxm_slide {
        color: #fff;
        background: #000;
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
}
</style>
