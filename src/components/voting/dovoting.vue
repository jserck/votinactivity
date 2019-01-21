<template>
    <section class="u-vote-btn">
        <section v-if="RightToVote" class="g-doDoting">
            <p>选择要加的能量数</p>
            <section class="g-doDoting-number">
                <x-number @voteNumChange="voteNumChange" :nums="nums"></x-number>
            </section>
            <section class="g-doDoting-btn">
                <span class="g-btn" @click="dialogComponentEvent('dialogComponentEvent')">加能量</span>
            </section>
        </section>
        <section v-else class="g-noRightToVote">
            <p class="u-tit">您还没有能量值</p>
            <p class="u-tit">快去加能量领取吧~</p>
            <p class="u-text">为爱豆加能量有机会获得免费电子书哦！</p>
            <span v-scroll="`rule`" @click="dialogComponentEvent('goRule')">去加能量</span>
        </section>
    </section>
</template>
<script>
import Scroll from '../../assets/js/href.js'
export default {
    props: ['RightToVote', 'nums'],
    components: {
        XNumber: () => import('../common/number.vue')
    },
    data() {
        return {
            voteNum: 1
        }
    },

    methods: {
        dialogComponentEvent(eventType) {
            this.$emit('dialogComponentEvent', {
                type: 5,
                eventType
            })
        },
        hideHandler() {

        },
        voteNumChange(val) {
            /**
             * @name 投票数变更
            */
            this.$emit('voteNumChange2', val)
        }
    },
    mounted(){
      this.$emit("btn_show",5);
    }
}
</script>

<style scoped lang="scss">
.u-vote-btn {
    .g-noRightToVote {
        margin:15vh auto 0;
        padding-top: 3.44rem /* 314/100 */;
        width: 5.33rem /* 552/100 */;
        height: 4.45rem /* 849/100 */;
        @include background("~@/assets/img/dialogbg/dialogsignin.png");
        .u-tit {
            @include setFont(
                0.36rem,
                "SourceHanSansCN-Regular",
                400,
                0.6rem,
                rgba(255, 217, 165, 1),
                auto
            );
        }
        .u-text {
            @include setFont(
                0.24rem,
                "SourceHanSansCN-Regular",
                400,
                0.65rem,
                rgba(255, 217, 165, 1),
                auto
            );
        }
        span {
            display: inline-block;
            margin: 0.85rem auto 0;
            width: 2.53rem;
            height: 0.6rem /* 50/100 */;
            @include background("~@/assets/img/dialogbg/dialogattbtn.png");
            @include setFont(
                0.3rem,
                "FZLTHJW--GB1-0",
                400,
                0.5rem,
                #8B5B35,
                center
            );
        }
    }
}
.g-doDoting {
    margin:15vh auto 0;
    padding-top: 3.8rem /* 314/100 */;
    width: 5.33rem /* 552/100 */;
    height: 4.09rem /* 849/100 */;
    @include background("~@/assets/img/dialogbg/dialogsignin.png");
    p {
        @include setFont(
            0.36rem,
            "SourceHanSansCN-Regular",
            400,
            0.68rem,
            rgba(255, 217, 165, 1),
            auto
        );
    }
    .g-doDoting-btn {
        .g-btn {
            display: inline-block;
            margin: 0.67rem auto 0;
            width: 2.53rem;
            height: 0.6rem /* 50/100 */;
            @include background("~@/assets/img/dialogbg/dialogattbtn.png");
            @include setFont(
                0.3rem,
                "FZLTHJW--GB1-0",
                400,
                0.5rem,
                #8B5B35,
                center
            );
        }
    }
    .g-doDoting-number {
        margin-top: 0.47rem /* 47/100 */;
    }
}
</style>
