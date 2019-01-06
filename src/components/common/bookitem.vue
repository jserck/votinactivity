<template>
     <section class="u-box-item">
          <section
               class="u-book-img"
               :style="`background:url(${obj.bookPicUrl});
                        backgroundRepeat:no-repeat;
                        backgroundSize:cover
          `"
          ></section>
          <p>{{obj.bookName}}</p>
          <section class="g-author-name">
               <span>作者名称</span>
               <span>{{indexNum}}</span>
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
     width: 3.653333rem /* 137/37.5 */;
     .u-book-img {
          width: 3.653333rem /* 137/37.5 */;
          height: 3.76rem /* 141/37.5 */;
          background: #101010;
     }
     p {
          color: rgba(16, 16, 16, 1);
          @include setFontSize(14px);
          font-family: PingFangSC-regular;
     }
     .u-author-name {
          color: rgba(16, 16, 16, 1);
          @include setFontSize(12px);
          font-family: PingFangSC-regular;
     }
}
</style>
