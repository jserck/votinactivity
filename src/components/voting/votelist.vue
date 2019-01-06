<template>
    <section>
        <section class="g-ViteList">
            <p class="g-ViteList-tit">我的投票记录</p>
            <scroller height="400px">
                    <ul>
                        <li
                            v-for="(item,index) in starList"
                            :key="index"
                            class="displayFlex flexAlignItemsCenter flexJustifybetween"
                        >
                            <span
                                class="u-img"
                                :style="`background:url(${item.starPicUrl});
                                        backgroundRepeat:no-repeat;
                                        backgroundSize:cover`"
                            ></span>
                            <span class="u-name">{{item.starName}}</span>
                            <span class="u-count">{{item.ticketCount}}</span>
                        </li>
                    </ul>
            </scroller>
        </section>
    </section>
</template>
<script>
import Scroller from '../common/scroller'
export default {
    components: {
        Scroller
    },
    data() {
        return {
            scrollTop: 0,
            starList: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            /**
             * @name 获取投票记录列表接口
             * @method post
             * @param userId
             */
            let options = {
                urls: '/user/myVoteInfo/1',
                data: {
                    userId: this.userId,
                },
                methods: 'post',
                types: 1,
                des: false
            }
            this.$http(options).then((res) => {
                if (res.data.code === 200) {
                    this.starList = res.data.data.starList
                }
            }).catch((err) => { })
        },
        hideHandler() {

        },
        onScroll(pos) {
            this.scrollTop = pos.top
        },
    }
}
</script>
<style lang="scss" scoped>
.g-ViteList {
    padding: 0.8rem /* 30/37.5 */ 0.72rem /* 27/37.5 */;
    .g-ViteList-tit {
        text-align: center;
        color: rgba(16, 16, 16, 1);
        @include setFontSize(14px);
        font-family: PingFangSC-regular;
    }
    ul {
        padding-bottom: 0.666667rem /* 25/37.5 */;
        padding-top: 0.666667rem /* 25/37.5 */;
        li {
            margin-top: 0.4rem /* 15/37.5 */;
            .u-img {
                display: inline-block;
                width: 1.76rem /* 66/37.5 */;
                height: 1.76rem /* 66/37.5 */;
                border-radius: 0.88rem /* 33/37.5 */;
                background: #101010;
            }
            .u-name,
            .u-count {
                color: rgba(31, 32, 40, 1);
                @include setFontSize(12px);
                font-family: PingFangSC-bold;
            }
        }
    }
}
</style>
