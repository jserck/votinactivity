<template>
    <section class="m-first">
        <section class="g-firstIn">
            <p
                class="helpvote"
                v-if="dialogOpations.type==2&&dialogOpations.nums&&dialogOpations.userTicketCount<=0"
            >成功为{{dialogOpations.starName}}加{{dialogOpations.nums}}个能量</p>
            <p
                class="helpvote"
                v-if="dialogOpations.type==2&&dialogOpations.nums&&dialogOpations.userTicketCount>0"
            >已成功为{{dialogOpations.starName}}加能量</p>
            <section class="isSignInText" v-if="dialogOpations.type==1&&dialogOpations.isSignIn==1">
                <p>今日签到成功!</p>
                <p>恭喜获得10个能量</p>
                <p>和1本免费电子书!</p>
            </section>
            <section
                class="u-first-getbook u-first-getbook1"
                v-if="dialogOpations.type==1&&dialogOpations.isSignIn!=1"
            >
                <p>恭喜免费获得</p>
                <p>1本电子书</p>
            </section>
            <section class="u-first-getbook getbook2" v-if="dialogOpations.type==2">
                <p>恭喜您获得免费 1 本电子书！</p>
            </section>
            <p
                class="nocanvote"
                v-if="dialogOpations.type==2&&dialogOpations.userTicketCount<=0"
            >(您已用完能量值，继续集能量获取更多能量哦！)</p>
            <section class="u-img">
                <section
                    class="u-imgs"
                    :style="`background:url(${dialogOpations.bookPicUrl});
                              backgroundRepeat:no-repeat;
                              backgroundSize:cover
                         `"
                ></section>
            </section>
        </section>
        <section class="u-btn displayFlex flexAlignJustifyCenter">
            <span
                v-if="dialogOpations.type!=2"
                v-scroll="'scroll'"
                @click="dialogComponentEvent('dialogComponentEvent')"
            >我要加能量</span>
            <span
                v-if="dialogOpations.type==2&&dialogOpations.userTicketCount>0"
                v-scroll="'scroll'"
                @click="dialogComponentEvent('dialogComponentEvent',11)"
            >继续加能量</span>
            <span
                v-if="dialogOpations.type==2&&dialogOpations.userTicketCount<=0"
                @click="dialogComponentEvent('dialogComponentEvent',9)"
                v-scroll="'rule'"
            >去做任务</span>
            <span @click="dialogComponentEvent('fllowReadBtn')">关注阅读</span>
        </section>
        <!-- <section class="u-btn2" v-else>
            <span @click="dialogComponentEvent('dialogComponentEvent')" v-scroll="'rule'">去做任务</span>
        </section>-->
    </section>
</template>
<script>
import scroll from '../../assets/js/href.js'
export default {
    props: ['dialogOpations'],
    data() {
        return {

        }
    },
    methods: {
        dialogComponentEvent(eventType, centype) {
            let bid = this.dialogOpations.bookId;
            this.$emit('dialogComponentEvent', {
                type: 1,
                centype,
                eventType,
                bid
            })
        }
    },

    created() {

    }
}
</script>

<style lang="scss" scoped>
.m-first {
    overflow: hidden;
    margin: auto;
    width: 5.24rem /* 552/100 */;
    // height: 5.29rem /* 849/100 */;
    @include background("~@/assets/img/dialogbg/dialogatt.png");
}
.g-firstIn {
    .helpvote {
        margin-top: 3.03rem /* 285/100 */;
        @include setFont(
            0.36rem,
            "SourceHanSansCN-Regular",
            400,
            0.68rem,
            rgba(255, 217, 165, 1),
            auto
        );
    }
    .u-img {
        position: relative;
        padding: 0.03rem;
        margin: 0.41rem /* 50/100 */ auto 0;
        width: 1.93rem /* 90/100 */;
        height: 2.79rem /* 120/100 */;
        @include background("~@/assets/img/bookborder.png");
    }
    .u-imgs {
        width: 1.93rem /* 90/100 */;
        height: 2.79rem /* 120/100 */;
    }
    .u-first-getbook {
        @include setFont(
            0.36rem,
            "SourceHanSansCN-Regular",
            400,
            0.48rem,
            rgba(255, 217, 165, 1),
            auto
        );
    }
    .u-first-getbook1 {
        margin-top: 3.11rem;
    }
    .getbook2 p {
        font-size: 0.3rem /* 36/100 */;
    }
    .nocanvote {
        @include setFont(
            0.24rem,
            "SourceHanSansCN-Regular",
            400,
            0.48rem,
            #ffd9a5,
            auto
        );
    }
    .isSignInText {
        margin-top: 3.03rem /* 285/100 */;
        @include setFont(
            0.36rem,
            "SourceHanSansCN-Regular",
            400,
            0.48rem,
            rgba(255, 217, 165, 1),
            auto
        );
    }
}
.u-btn {
    margin-top: 0.38rem;
    margin-bottom: 0.55rem;
    span {
        display: inline-block;
        width: 2.05rem;
        height: 0.6rem /* 44/100 */;
        @include background("~@/assets/img/dialogbg/dialogattbtn.png");
        @include setFont(
            0.24rem,
            "FZLTHJW--GB1-0",
            400,
            0.5rem,
            #8b5b35,
            center
        );
    }
    & span:nth-child(2) {
        margin-left: 0.14rem;
    }
}
.u-btn2 {
    margin-top: 0.38rem;
    margin-bottom: 0.55rem;
    display: inline-block;
    width: 2rem;
    height: 0.6rem /* 44/100 */;
    @include background("~@/assets/img/dialogbg/dialogattbtn.png");
    @include setFont(0.24rem, "FZLTHJW--GB1-0", 400, 0.5rem, #8b5b35, center);
}
</style>
