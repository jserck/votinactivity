<template>
     <section class="g-rule">
          <p class="u-tit">活动规则</p>
          <Scroller height="5.83rem">
               <p class="u-header">一. 活动说明：</p>
               <p class="u-text">用户通过完成关注天猫小程序、签到、分享、阅读已购电子书等任务，赢取为喜欢的领读官点赞的权利，同时获得免费电子</p>
               <p class="u-header">一. 活动说明：</p>
               <p class="u-header">一. 活动说明：</p>
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
     width: 5.24rem /* 552/100 */;
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
     .g-scroll-container {
          ul {
               width: 4.57rem;
               margin: auto;
               li {
                    margin-bottom: 0.3rem;
                    .u-header {
                         @include setFont(
                              0.18rem,
                              "SourceHanSansCN-Bold",
                              bold,
                              0.5rem,
                              rgba(255, 217, 165, 1),
                              left
                         );
                    }
                    .u-text {
                         @include setFont(
                              0.18rem,
                              "SourceHanSansCN-Bold",
                              bold,
                              0.5rem,
                              rgba(255, 217, 165, 1),
                              justify
                         );
                    }
               }
          }
     }
}
</style>
