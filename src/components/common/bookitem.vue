<template>
    <section class="u-box-item">
        <section
            class="u-book-img"
            :style="`background:url(${obj.bookPicUrl});
                        backgroundRepeat:no-repeat;
                        backgroundSize:cover
          `"
        ></section>
        <p>{{obj.bookName}}</p>
        <section class="g-author-name">
            <span>{{indexNum}}</span>
            <span>著</span>
        </section>
    </section>
</template>
<script>
export default {
    props: {
        indexNum: {
            default: 0
        },
        obj: {
            default: {}
        }
    },
    data() {
        return {

        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.u-box-item {
    width: 100%;
    .u-book-img {
        width: 100%;
        height: 1.87rem /* 187/100 */;
        background: #101010;
        border-radius: .25rem /* 25/100 */;
    }
    font-size: .19rem /* 19/100 */;
    font-family: FZLTHJW--GB1-0;
    font-weight: 400;
    color: rgba(177, 34, 41, 1);
    text-align: center;
    p {
        text-align: center;
        line-height: .35rem /* 35/100 */;
    }
    .g-author-name {
        span {
            line-height: .26rem /* 26/100 */;
        }
    }
}
</style>
