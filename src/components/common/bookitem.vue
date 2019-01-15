<template>
     <section class="u-box-item">
          <section class="u-book-bg">
               <section
                    class="u-book-img"
                    :style="`background:url(${obj.bookPicUrl});
                        backgroundRepeat:no-repeat;
                        backgroundSize:cover
          `"
               ></section>
          </section>
          <p>{{obj.bookName}}</p>
          <section class="g-author-name">
               <span>{{obj.bookAuthorName}}</span>
               <!-- <span>著</span> -->
          </section>
     </section>
</template>
<script>

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
     .u-book-bg {
          padding: 0.03rem;
          height: 2.06rem /* 187/100 */;
          background-size: cover !important;
          background-repeat: no-repeat !important;
          @include background("~@/assets/img/bookborder.png");
     }
     .u-book-img {
          height: 2.06rem /* 187/100 */;
          background-size: cover !important;
          background-repeat: no-repeat !important;
          @include background("~@/assets/img/bookborder.png");
     }
     @include setFont(
          0.16rem,
          "NotoSerifCJKsc-Black",
          900,
          0.34rem,
          #fff,
          center
     );
     p {
          text-align: center;
          line-height: 0.35rem /* 35/100 */;
          @include overFlowEllipsis(1);
     }
     .g-author-name {
          span {
               line-height: 0.26rem /* 26/100 */;
               @include overFlowEllipsis(1);
          }
     }
}
</style>
