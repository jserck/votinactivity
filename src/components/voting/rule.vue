<template>
     <section class="g-rule">
          <p class="u-tit">活动规则</p>
          <Scroller height="5.83rem">
               <ul>
                    <li v-for="i in 150" :key="i">
                         <p class="u-header">一. 活动说明：</p>
                         <p class="u-text">用户通过完成关注天猫小程序、签到、分享、阅读已购电子书等任务，赢取为喜欢的领读官点赞的权利，同时获得免费电子</p>
                    </li>
               </ul>
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
.g-rule {
     margin: auto;
     padding-top: 3.1rem /* 314/100 */;
     width: 5.24rem /* 552/100 */;
     height: 7.5rem /* 849/100 */;
     @include background("/static/images/dialogbg/dialoghistory.png");
     .u-tit {
          margin-bottom: 0.3rem;
          text-align: center;
          font-size: 0.36rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.68rem;
     }
     .g-scroll-container {
          ul {
               width: 4.57rem;
               margin: auto;
               li {
                    margin-bottom: 0.3rem;
                    .u-header {
                         text-align: left;
                         font-size: 0.18rem;
                         font-family: SourceHanSansCN-Bold;
                         font-weight: bold;
                         color: rgba(255, 217, 165, 1);
                         line-height: 0.5rem;
                    }
                    .u-text {
                         text-align: justify;
                         font-size: 0.18rem;
                         font-family: SourceHanSansCN-Bold;
                         font-weight: bold;
                         color: rgba(255, 217, 165, 1);
                         line-height: 0.5rem;
                    }
               }
          }
     }
}
</style>
