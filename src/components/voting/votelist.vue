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
            userId: this.$route.query.userId || 1,
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
                urls: '/user/myVoteInfo/' + this.userId,
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
    padding: 0.3rem /* 30/100 */ 0.27rem /* 27/100 */;
    .g-ViteList-tit {
        text-align: center;
        color: rgba(16, 16, 16, 1);
        font-size: 0.14rem /* 14/100 */;
        font-family: PingFangSC-regular;
    }
    ul {
        padding-bottom: 0.25rem /* 25/100 */;
        padding-top: 0.25rem /* 25/100 */;
        li {
            margin-top: 0.15rem /* 15/100 */;
            .u-img {
                display: inline-block;
                width: 0.66rem /* 66/100 */;
                height: 0.66rem /* 66/100 */;
                border-radius: 0.33rem /* 33/100 */;
                background: #101010;
            }
            .u-name,
            .u-count {
                color: rgba(31, 32, 40, 1);
                font-size: 0.12rem /* 12/100 */;
                font-family: PingFangSC-bold;
            }
        }
    }
}
</style>
