<template>
    <div class="m-swiper">
        <div class="vjx swiper-container displayFlex">
            <span class="lookBook" @click="lookBook">点击查看{{myRecommend.name}}私房书单</span>
            <section class="myRecommend">
                <section class="u-myRecommend displayFlex">
                    <span>{{myRecommend.text}}</span>
                </section>
            </section>
            <section class="starimg" @click="videoPlay">
                <img :src="myRecommend.src" alt>
            </section>
        </div>
        <section class="swiper-list">
            <ul class="displayFlex flexJustifybetween">
                <li
                    :style="(index ==starBookDatas.length-1)?'padding-right:0':''"
                    v-for="(item,index) in starBookDatas"
                    :key="index"
                    @click="nativeto(item,index)"
                >
                    <book-item :indexNum="index" :obj="item"></book-item>
                </li>
            </ul>
        </section>
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
        videoPlay() {
            this.$emit('videoPlay', this.myRecommend.video)
        }
    }
}
</script>

<style lang="scss" scoped>
.m-swiper {
    //  margin-top: 0.7rem;
    position: relative;
}
.myRecommend {
    padding: 0 0.1rem;
    position: absolute;
    right: 0.66rem;
    top: 1.21rem;
    z-index: 999;
    width: 3.34rem;
    height: 1.15rem;
    //  background: rgba(216, 201, 201, 0.178);
    // line-height: 0.31rem;
    //  @include background("~@/assets/img/myRecommend2.png");
    .u-myRecommend {
        width: 100%;
        height: 0.89rem;
        span {
            display: inline-block;
            margin: auto;
            @include setFont(
                0.18rem,
                "FZLTZCHJW--GB1-0",
                400,
                auto,
                #fff,
                left
            );
            font-style: italic;
        }
    }
}
.swiper-container {
    position: relative;
    margin: 0.25rem /* 25/100 */ auto 0;
    width: 7.5rem /* 566/100 */;
    height: 4.39rem;
    //  @include background("~@/assets/img/boolist@2x.png");
    @include background("~@/assets/img/footStarText.png");
    .lookBook {
        position: absolute;
        right: 0.71rem;
        top: 2.72rem;
        width: 3rem;
        height: 0.78rem;
        background: #fff;
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
        bottom: 0.54rem;
        width: 2.85rem;
        height: 4.06rem;
    }
}
.swiper-list {
    margin-top: -0.44rem;
    overflow: hidden;
    width: 100%;
    height: 4.18rem;
    line-height: 4.18rem;
    @include background("~@/assets/img/footStarBookList.png");
    ul {
        width: 5.9rem;
        height: 3.23rem;
        // background: rgba(223, 211, 211, 0.486);
        margin: 0.35rem auto 0;
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        line-height: 3.23rem;
        li {
            padding-top: 0.34rem;
            padding-right: 0.22rem /* 29/100 */;
            flex: 0 0 auto;
            width: 1.49rem /* 131/100 */;
            vertical-align: middle;
        }
    }
}
</style>
