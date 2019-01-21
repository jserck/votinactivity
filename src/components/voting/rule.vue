<template>
    <section class="g-rule">
        <p class="u-tit">活动规则</p>
        <Scroller>
            <p class="u-header">一.活动时间：</p>
            <p class="u-header">2019年1月20日——2019年2月10日</p>
            <p class="u-header">二. 活动说明：</p>
            <p
                class="u-text"
            >用户通过完成关注天猫读书小程序、签到、分享、阅读书架上的电子书等任务，赢取阅读能量，可以为喜欢的领读官加能量，同时获得免费电子书奖励，与爱豆一起读书；</p>
            <p class="u-header">三. 用户如何获得阅读能量：</p>
            <p class="u-text">-每日登陆活动页面签到自动获得10个阅读能量
                <br>-首次关注天猫读书小程序可获得10个阅读能量
                <br>-用户每分享 1 次活动页面即可获得10个能量，每天最多可累计获得100点阅读能量；
                <br>-阅读1本书架上的书即可获得10个能量，每天最多可累计获得100个阅读能量
            </p>
            <p class="u-header">四. 怎样获得电子书：</p>
            <p class="u-text">-每日登陆活动页面即可随机获得 1 本电子书，用户可在“天猫读书小程序-书架”查看和阅读已领取的电子书
                <br>-每次点击领读官下方“加能量领好书”按钮，有机会获得领读官送出的免费电子书，每人每天最多可获得10本
            </p>
            <p class="u-text">
                <i>五.</i>
                为爱豆加能量可获得明星独家福利，1月26日起关注书旗小说官方微博，了解更多活动详情。
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
    margin:15vh auto 0;
    overflow: hidden;
    padding-left: 0.43rem;
    padding-right: 0.33rem;
    padding-bottom: 1.2rem;
    width: 4.52rem /* 552/100 */;
    // height: 10.78rem /* 849/100 */;
    @include background($dialoghistory);
    .u-tit {
        margin-top: 3rem /* 314/100 */;
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
        i {
            @include setFont(
                0.18rem,
                "SourceHanSansCN-Bold",
                900,
                0.5rem,
                rgba(255, 217, 165, 1),
                left
            );
        }
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
