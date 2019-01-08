<template>
     <section class="g-rule">
          <Scroller height="5rem">
               <ul>
                    <li
                         v-for="i in 150"
                         :key="i"
                         class="displayFlex flexAlignItemsCenter flexJustifybetween"
                    >
                         <span>潘晨凯潘晨凯你最帅</span>
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
     .g-scroll-container {
          ul {
               li {
                    span {
                         font-size: 0.293333rem /* 22/75 */;
                    }
               }
          }
     }
}
</style>
