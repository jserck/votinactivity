<template>
     <section>
          <section>
               <section class="g-firstIn">
                    <p
                         v-if="dialogOpations.type==2&&dialogOpations.nums"
                    >成功助力{{dialogOpations.nums}}票</p>
                    <section v-if="dialogOpations.isSignIn">
                         <p>今日已成功签到</p>
                         <p>获得一次点赞权和电子书一本！</p>
                    </section>
                    <p v-else>恭喜免费获得电子书一本！！</p>
                    <section
                         class="u-img"
                         :style="`background:url(${dialogOpations.bookPicUrl});
                              backgroundRepeat:no-repeat;
                              backgroundSize:cover
                         `"
                    >{{dialogOpations.bookName}}</section>
                    <p
                         v-if="dialogOpations.type==2&&dialogOpations.userTicketCount<=0"
                    >您已用完投票权，做任务即可获取更多投票权</p>
               </section>
               <section
                    class="u-btn displayFlex"
                    v-if="dialogOpations.userTicketCount>0"
               >
                    <span style="border-right:none" @click="nextRead">继续阅读</span>
                    <span
                         v-scroll="'scroll'"
                         @click="dialogComponentEvent('dialogComponentEvent')"
                    >我要投票</span>
               </section>
               <section class="u-btn2" v-else>
                    <span
                         @click="dialogComponentEvent('dialogComponentEvent')"
                         v-scroll="'rule'"
                    >去做任务</span>
               </section>
          </section>
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
          nextRead() {
               window.location.href = this.dialogOpations.bookWebUrl
          },
          dialogComponentEvent(eventType) {
               this.$emit('dialogComponentEvent', {
                    type: 1,
                    eventType
               })
          }
     },

     created() {

     }
}
</script>

<style lang="scss" scoped>
.g-firstIn {
     p {
          margin-top: 1.6rem /* 60/37.5 */;
          text-align: center !important;
          color: rgba(16, 16, 16, 1);
          @include setFontSize(14px);
          text-align: left;
          font-family: PingFangSC-regular;
     }
     .u-img {
          margin: 1.333333rem /* 50/37.5 */ auto;
          width: 2.4rem /* 90/37.5 */;
          height: 3.2rem /* 120/37.5 */;
          text-align: center;
          line-height: 3.2rem /* 120/37.5 */;
     }
}
.u-btn {
     span {
          display: inline-block;
          width: 100%;
          height: 1.173333rem /* 44/37.5 */;
          text-align: center;
          line-height: 1.173333rem /* 44/37.5 */;
          border: 1px solid rgba(187, 187, 187, 1);
     }
}
.u-btn2 {
     width: 100%;
     height: 1.333333rem /* 50/37.5 */;
     line-height: 1.333333rem /* 50/37.5 */;
     text-align: center;
     border-top: 1px solid rgba(187, 187, 187, 1);
}
</style>
