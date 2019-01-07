<template>
    <section>
        <section class="u-star-tit">
            <span></span>
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
        <section class="g-star-book-conatiner">
            <section class="u-tit">
                <span>“这里是我推荐书单这里是我推荐书单”</span>
            </section>
            <section class="g-star-book-header">

            </section>
            <section class="g-book-num"></section>
            <book-list :starBookData="starBookData"></book-list>
        </section>
    </section>
</template>
<script>
export default {
    data() {
        return {
            indexNum: 1,
            starBookData: [],
            isBookList: false
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
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.starBookData = res.data.data.starList
                    this.indexNum = index
                }

            }).catch((err) => { })
        },
        videoPlay() {
            this.$emit('videoPlay', '1')
        },
        starChange(index) {
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
    margin-top: 1.1rem /* 110/100 */;
    span {
        display: block;
        margin: auto;
        width: 4.15rem;
        height: 0.7rem /* 70/100 */;
        @include background("/static/images/booklist@2x.png");
    }
}
.g-scroll-star {
    margin-top: 0.1rem /* 10/100 */;
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
        }
        .u-box-item-active {
            margin-left: 0.18rem /* 18/100 */;
            width: 1.11rem /* 111/100 */;
            height: 1.11rem /* 111/100 */;
            border-radius: 0.555rem /* 55.5/100 */;
            background: #fff;
            text-align: center;
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
    margin:.9rem /* 90/100 */ auto 0;
    width: 6.9rem /* 690/100 */;
    height: 6.32rem /* 632/100 */;
    @include background("/static/images/starbookvideo@2x.png");
    .u-tit {
        position: absolute;
        top: -.51rem /* 51/100 */;
        right: .42rem /* 42/100 */;
        width: 4.75rem /* 475/100 */;
        height: 0.44rem /* 44/100 */;
        line-height: .44rem /* 44/100 */;
        font-size: .21rem /* 21/100 */;
        font-family: FZLTHJW--GB1-0;
        font-weight: 400;
        font-style: italic;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        @include background("/static/images/booktit@2x.png");
    }
    .g-star-book-header{
        margin: .4rem /* 40/100 */ .23rem /* 23/100 */ 0;
        height: 2.42rem /* 242/100 */;
    }
    .g-book-num{
        margin:.24rem /* 24/100 */ auto 0;
        width: 4.42rem /* 442/100 */;
        height: .42rem /* 42/100 */;
    }
}
</style>
