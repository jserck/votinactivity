<template>
    <div class="vjx swiper-container">
        <ul class="displayFlex flexJustifybetween">
            <li v-for="(item,index) in starBookDatas" :key="index">
                <book-item :indexNum="index" :obj="item"></book-item>
            </li>
        </ul>
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
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    margin:.25rem /* 25/100 */ auto 0;
    width: 5.66rem /* 566/100 */;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    ul {
        li {
            padding-right: 0.29rem /* 29/100 */;
            flex: 0 0 auto;
            width: 1.31rem /* 131/100 */;
        }
    }
}
</style>
