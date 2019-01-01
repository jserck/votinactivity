<template>
     <section class="u-box-item">
          <section class="u-book-img"></section>
          <p>书籍名称书籍名称书籍名称书籍名称书籍名...</p>
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
               default: 1
          }
     },
     data(){
             return{

             }
     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
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
