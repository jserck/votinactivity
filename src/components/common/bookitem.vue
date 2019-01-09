<template>
     <section class="u-box-item">
          <section
               class="u-book-img"
               v-preload="obj.bookPicUrl"
               :style="`background:url(${obj.bookPicUrl});
                        backgroundRepeat:no-repeat;
                        backgroundSize:cover
          `"
          ></section>
          <p>{{obj.bookName}}</p>
          <section class="g-author-name">
               <span>{{indexNum}}</span>
               <span>著</span>
          </section>
     </section>
</template>
<script>
import '../../assets/js/ImgPrvLoad.js'
export default {
     props: {
          indexNum: {
               default: 0
          },
          obj: {
               default: {}
          }
     },
     data() {
          return {

          }
     },
     created() {
     }
}
</script>

<style lang="scss" scoped>
.u-box-item {
     width: 100%;
     .u-book-img {
          width: 100%;
          height: 2.2rem /* 187/100 */;
          border-radius: 0.25rem /* 25/100 */;
          background-size: cover !important;
          background-repeat: no-repeat !important;
     }
     font-size: 0.19rem /* 19/100 */;
     font-family: FZLTHJW--GB1-0;
     font-weight: 400;
     color: rgba(177, 34, 41, 1);
     text-align: center;
     p {
          text-align: center;
          line-height: 0.35rem /* 35/100 */;
     }
     .g-author-name {
          span {
               line-height: 0.26rem /* 26/100 */;
          }
     }
}
</style>
