<template>
    <section class="g-rule">
        <p class="u-tit">活动规则</p>
        <Scroller>
            <p class="u-text">一.活动时间：2019年1月20日——2019年2月10日 二. 活动说明： 用户通过完成关注天猫读书小程序、签到、分享、阅读</p>
            <p class="u-header">二. 活动说明：</p>
            <p
                class="u-text"
            >用户通过完成关注天猫读书小程序、签到、分享、阅读已购电子书等任务，赢取阅读能量，可以为喜欢的领读官加能量，同时获得免费电子书奖励，与爱豆一起读书；</p>
            <p class="u-header">三. 用户如何获得阅读能量：</p>
            <p class="u-text">-每日登陆活动页面签到自动获得10个阅读能量
                <br>-首次关注天猫读书小程序可获得10个阅读能量
                <br>-用户每分享 1 次活动页面即可获得10个能量，每天最多可累计获得100个阅读能量；
                <br>-阅读任意已购书籍，即可获得阅读能量，每阅读 1 本获得10个能量
            </p>
            <p class="u-header">四. 怎样获得电子书：</p>
            <p class="u-text">-每日登陆活动页面即可随机获得 1 本电子书，用户可在“天猫读书小程序-书架”查看和阅读已领取的电子书
                <br>-每次点击领读官下方“加能量”按钮，有机会获得领读官送出的免费电子书，每人每天最多可获得10本
            </p>
            <p class="u-text">
                <i>五.</i>
                为明星加能量到书旗小说官方微博领取超级福利，详
                情到@书旗小说官方微博查看
            </p>
        </Scroller>
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
            scrollTop: 0
        }
    },
    created() {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
$dialoghistory: "~@/assets/img/dialogbg/dialogrule.png"; //规则弹窗背景
.g-rule {
    margin: auto;
    padding-top: 2.58rem /* 314/100 */;
    padding-left: 0.43rem;
    padding-right: 0.33rem;
    width: 4.57rem /* 552/100 */;
    height: 8.2rem /* 849/100 */;
    @include background($dialoghistory);
    .u-tit {
        margin-bottom: 0.03rem;
        @include setFont(
            0.36rem,
            "SourceHanSansCN-Regular",
            400,
            0.68rem,
            rgba(255, 217, 165, 1),
            center
        );
    }
    .u-header {
        @include setFont(
            0.18rem,
            "SourceHanSansCN-Bold",
            900,
            0.5rem,
            rgba(255, 217, 165, 1),
            left
        );
    }
    .u-text {
        @include setFont(
            0.18rem,
            "SourceHanSansCN-Bold",
            500,
            0.31rem,
            rgba(255, 217, 165, 1),
            justify
        );
    }
    .g-scroll-container {
        ul {
            width: 4.57rem;
            margin: auto;
            li {
                margin-bottom: 0.3rem;
            }
        }
    }
}
</style>
