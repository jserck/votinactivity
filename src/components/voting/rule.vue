<template>
     <section class="g-rule">
          <p class="u-tit">活动规则</p>
          <Scroller>
               <p class="u-header">一. 活动说明：</p>
               <p class="u-text">用户通过完成关注天猫小程序、签到、分享、阅读已购电子书等任务，赢取为喜欢的领读官点赞的权利，同时获得免费电子书奖励，与爱豆一起读书</p>
               <p class="u-header">二. 如何获得点赞权利：</p>
               <p class="u-text">-每日登陆活动页面自动获得1次点赞权利
                    <br>-关注天猫读书小程序即可获得1次点赞权利
                    <br>-用户每分享一次活动页面即可获得1次点赞权利，通过完成分享每天最多可累计获得10次点赞权利；
                    <br>-每天阅读活动页面、天猫读书节会场、天猫读书APP中任意已购书籍，即可获得1次点赞机会
                    <br>
               </p>
               <p class="u-header">三. 怎样获得电子书：</p>
               <p class="u-text">-每日登陆活动页面即可随机获得一本电子书，用户可在“天猫读书小程序-书架”查看和阅读已领取的电子书
                    <br>-点击领读官下方“点赞”按钮，有机会获得领读官送出的免费电子书，同时帮助该领读官积攒10点阅读能量
                    <br>
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
$dialoghistory: "~@/assets/img/dialogbg/dialoghistory.png"; //规则弹窗背景
.g-rule {
     margin: auto;
     padding-top: 3.1rem /* 314/100 */;
     padding-left: 0.33rem;
     padding-right: 0.33rem;
     width: 4.58rem /* 552/100 */;
     height: 7.5rem /* 849/100 */;
     @include background($dialoghistory);
     .u-tit {
          margin-bottom: 0.3rem;
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
               0.35rem,
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
