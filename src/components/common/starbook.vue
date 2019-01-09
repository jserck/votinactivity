<template>
    <section>
        <section class="u-star-tit">
            <span></span>
        </section>
        <section class="g-star-book-conatiner">
            <section style="width:100%;position:relative">
                <section
                    class="g-star-book-header"
                    :style="`background:url('/static/images/meinv@2x.png');
                         background-repeat:no-repeat;
                         background-size:cover`"
                >
                    <span class="u-l" @click="leftHandler"></span>
                    <span class="u-play" @click="videoPlay"></span>
                    <span class="u-r" @click="rightHandler"></span>
                </section>
                <section class="g-star-book-lists">
                    <section class="u-tit">
                        <span>“这里是我推荐书单这里是我推荐书单”</span>
                    </section>
                    <section class="g-scroll-star">
                        <section class="g-scroll-star-box displayFlex flexAlignItemsCenter">
                            <section
                                :class="indexNum == `1000${i-1}` ? 'u-box-item-active':'u-box-item-link'"
                                v-for="i in 6"
                                :key="i"
                                @click="starChange(i-1)"
                            ></section>
                        </section>
                    </section>
                    <section class="u-foot">
                        <span>书籍总数9999</span>
                        <span>查看详细书单</span>
                    </section>
                </section>
            </section>
            <!-- <section class="g-book-num"></section> -->
            <book-list v-if="isClick" :starBookData="starBookData"></book-list>
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
            isClick: false
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
        videoPlay() {
            this.$emit('videoPlay', '1')
        },
        starChange(index) {
            if (!this.isClick) return
            this.indexNum = 10000 + index;
            this.getStarBook(`1000${index}`)
        },
        leftHandler() {
            if (this.indexNum == 10000 || !this.isClick) return
            this.indexNum--;
            this.getStarBook(this.indexNum)
        },
        rightHandler() {
            if (this.indexNum == 10005 || !this.isClick) return
            this.indexNum++;
            this.getStarBook(this.indexNum)
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
        @include background("/static/images/booklist@2x.png");
    }
}
.g-scroll-star {
    margin-bottom: 0.1rem /* 10/100 */;
    .g-scroll-star-box {
        margin: auto;
        width: 6.35rem /* 635/100 */;
        height: 1.49rem /* 149/100 */;
        @include background("/static/images/starlist2x.png");
        .u-box-item-link {
            margin-left: 0.18rem /* 18/100 */;
            width: 0.78rem /* 78/100 */;
            height: 0.78rem /* 78/100 */;
            background: #fff;
            border-radius: 0.39rem /* 39/100 */;
            text-align: center;
            border: 0.05rem /* 2/100 */ solid #ffd8a1;
            box-sizing: border-box;
        }
        .u-box-item-active {
            margin-left: 0.18rem /* 18/100 */;
            width: 1.11rem /* 111/100 */;
            height: 1.11rem /* 111/100 */;
            border-radius: 0.555rem /* 55.5/100 */;
            background: #fff;
            text-align: center;
            border: 0.05rem /* 2/100 */ solid #ffd8a1;
            box-sizing: border-box;
        }
    }
}
.g-scroll-book {
    .g-scroll-book-box {
        padding: 0.05rem /* 5/100 */ 0.12rem /* 12/100 */;
        width: 9.78rem /* 978/100 */;
        .u-box-item-link {
            // margin-right: 0.693333rem /* 26/37.5 */;
            width: 1.37rem /* 137/100 */;
            .u-book-img {
                width: 1.37rem /* 137/100 */;
                height: 3.76rem /* 141/37.5 */;
                background: #101010;
            }
            p {
                color: rgba(16, 16, 16, 1);
                font-size: 0.14rem /* 14/100 */;
                font-family: PingFangSC-regular;
            }
            .u-author-name {
                color: rgba(16, 16, 16, 1);
                font-size: 0.12rem /* 12/100 */;
                font-family: PingFangSC-regular;
            }
        }
    }
}
.g-star-book-conatiner {
    position: relative;
    overflow: hidden;
    margin: 0.1rem /* 90/100 */ auto 0;
    width: 6.9rem /* 690/100 */;
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
            @include background("/static/images/play@2x.png");
        }
        .u-r {
            position: absolute;
            top: 50%;
            right: -0.85rem;
            margin-top: -0.39rem;
            display: inline-block;
            width: 0.52rem /* 52/100 */;
            height: 0.78rem /* 78/100 */;
            @include background("/static/images/r@2x.png");
        }
        .u-l {
            position: absolute;
            top: 50%;
            left: -0.85rem;
            margin-top: -0.39rem;
            display: inline-block;
            width: 0.52rem /* 52/100 */;
            height: 0.78rem /* 78/100 */;
            @include background("/static/images/l@2x.png");
        }
    }
    .g-star-book-lists {
        position: absolute;
        width: 100%;
        bottom: 0;
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
            @include background("/static/images/booktit@2x.png");
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
            @include background("/static/images/bookcount@2x.png");
        }
    }
    .g-book-num {
        margin: 0.24rem /* 24/100 */ auto 0;
        width: 4.42rem /* 442/100 */;
        height: 0.42rem /* 42/100 */;
    }
}
</style>
