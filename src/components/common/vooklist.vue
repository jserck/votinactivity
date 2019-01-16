<template>
    <div class="m-swiper">
        <div class="vjx swiper-container displayFlex">
            <i class="videoIcon" @click="videoPlay"></i>
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
        <section class="swiper-list displayFlex flexJustifyEnd">
            <ul class="displayFlex flexJustifybetween" id="bookList" v-lazyLoad="lazyHandler">
                <li
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
import '../../assets/js/lazyLoad.js'
export default {
    props: ['starBookData', 'myRecommend'],
    data() {
        return {
            mySwiper: null,
            isLazy: false,
        }
    },
    computed: {
        starBookDatas() {
            if (this.isLazy) {
                return this.starBookData;
            }
            return this.starBookData.slice(0, 4);
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
        census(type, starId = 0) {
            /**
            * @name 打点
            * @method post
            * @param userId 用户ID
            * @param type 类型
            * @param starId 明星id
            */
            let options = {
                urls: 'user/point/' + this.userId + '/' + type + '/' + starId,
                data: {
                    userId: this.userId,
                    type,
                    starId
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
            }).catch((err) => { })
        },
        lazyHandler() {
            this.isLazy = true;
        },
        lookBook() {
            this.census(6, this.myRecommend.did);
            this.$emit('lookBooks', this.myRecommend.did)
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
    right: 0.25rem;
    top: 0.5rem;
    z-index: 999;
    width: 3.34rem;
    height: 1.15rem;
    //  background: rgba(216, 201, 201, 0.178);
    // line-height: 0.31rem;
    @include background("~@/assets/img/footStarBookListic.png");
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
    margin: 0.92rem /* 25/100 */ auto 0;
    width: 6.84rem /* 566/100 */;
    height: 3.15rem;
    //  @include background("~@/assets/img/boolist@2x.png");
    @include background("~@/assets/img/footStarText.png");
    .videoIcon {
        content: "";
        display: inline-block;
        position: absolute;
        z-index: 999;
        top: 1.94rem;
        left: 0.87rem;
        width: 0.7rem;
        height: 0.7rem;
        @include background("~@/assets/img/play.png");
    }
    .lookBook {
        position: absolute;
        right: 0.42rem;
        top: 1.96rem;
        width: 3rem;
        height: 0.78rem;
        @include background("~@/assets/img/lookBook.png");
        @include setFont(
            0.21rem,
            "FZLTZCHJW--GB1-0",
            400,
            0.64rem,
            #8b5b35,
            center
        );
    }
    .starimg {
        overflow: hidden;
        position: absolute;
        left: 0.05rem;
        bottom: 0.07rem;
        width: 2.85rem;
        height: 4.06rem;
    }
}
.swiper-list {
    margin: 0.4rem auto;
    overflow: hidden;
    width: 6.84rem;
    height: 3.4rem;
    line-height: 4.18rem;
    @include background("~@/assets/img/footStarBookList.png");
    ul {
        margin-right: 0.05rem;
        width: 6.25rem;
        height: 100%;
        // background: rgba(223, 211, 211, 0.486);
        //   margin: 0.35rem auto 0;
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        line-height: 3.23rem;
        li {
            padding-top: 0.36rem;
            padding-right: 0.34rem /* 29/100 */;
            flex: 0 0 auto;
            width: 1.49rem /* 131/100 */;
            vertical-align: middle;
        }
    }
}
</style>
