<template>
     <section>
          <section class="g-ViteList">
               <p class="g-ViteList-tit">我的点赞记录</p>
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
               }).catch((err) => { this.$toast('网络异常') })
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
     margin: auto;
     padding-top: 3.1rem /* 314/100 */;
     width: 5.24rem /* 552/100 */;
     height: 7.5rem /* 849/100 */;
     @include background("~@/assets/img/dialogbg/dialoghistory.png");
     .g-ViteList-tit {
          text-align: center;
          font-size: 0.36rem;
          font-family: SourceHanSansCN-Regular;
          font-weight: 400;
          color: rgba(255, 217, 165, 1);
          line-height: 0.68rem;
     }
     ul {
          padding-bottom: 0.25rem /* 25/100 */;
          padding-top: 0.125rem /* 25/100 */;
          li {
               padding-left: 0.16rem;
               padding-right: 0.28rem;
               margin: 0.15rem auto;
               width: 3.78rem;
               height: 0.95rem;
               background: #ffdaa2;
               border-radius: 0.2rem;
               .u-img {
                    display: inline-block;
                    width: 0.66rem /* 66/100 */;
                    height: 0.66rem /* 66/100 */;
                    border-radius: 0.33rem /* 33/100 */;
               }
               .u-name,
               .u-count {
                    font-size: 0.24rem;
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(138, 0, 87, 1);
                    line-height: 0.95rem;
               }
          }
     }
}
</style>
