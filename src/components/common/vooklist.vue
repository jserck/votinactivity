<template>
     <div class="vjx swiper-container">
          <ul class="displayFlex flexJustifybetween">
               <li v-for="(item,index) in starBookDatas" :key="index">
                    <book-item :indexNum="index" :obj="item"></book-item>
               </li>
          </ul>
     </div>
</template>
<script>

export default {
     props: ['starBookData'],
     data() {
          return {
               mySwiper: null
          }
     },
     computed: {
          starBookDatas() {
               return this.starBookData
          }
     },
     components: {
          BookItem: () => import('../common/bookitem.vue'),
     }
}
</script>

<style lang="scss" scoped>
.swiper-container {
     width: 100%;
     ul {
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          li {
               padding: 0 10px;
               flex: 0 0 auto;
               width: 2.293333rem /* 86/37.5 */;
          }
     }
}
</style>
