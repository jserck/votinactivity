<template>
    <div class="m-swiper">
        <div class="vjx swiper-container displayFlex">
            <ul class="displayFlex flexJustifybetween">
                <li
                    :style="(index ==0)?'padding-left:0.34rem':''"
                    v-for="(item,index) in starBookDatas"
                    :key="index"
                    @click="nativeto(item,index)"
                >
                    <book-item :indexNum="index" :obj="item"></book-item>
                </li>
            </ul>
        </div>
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
            // const bid = 10110 + index + 1;
            // try {
            my.postMessage({
                event: 'navigatorTo',
                data: { path: `/cover/${bid}`, query: {} }
            });
            // } catch (error) {
            //     this.$toast('跳转失败!')
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
.m-swiper {
    position: relative;
}
.swiper-container {
    margin: 0.25rem /* 25/100 */ auto 0;
    width: 6.52rem /* 566/100 */;
    height: 3.52rem;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    @include background("~@/assets/img/boolist@2x.png");
    ul {
        margin: auto;
        li {
            padding-top: 0.2rem;
            padding-right: 0.34rem /* 29/100 */;
            flex: 0 0 auto;
            width: 1.54rem /* 131/100 */;
        }
    }
}
</style>
