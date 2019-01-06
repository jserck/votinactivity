<template>
     <section class="g-rule">
          <section class="g-ViteList">
               <scroller lock-x height="5.333333rem" @on-scroll="onScroll" ref="scrollerEvent">
                    <div class="box2">
                         <ul>
                              <li
                                   v-for="i in 15"
                                   :key="i"
                                   class="displayFlex flexAlignItemsCenter flexJustifybetween"
                              >
                                   <span>潘晨凯潘晨凯你最帅</span>
                              </li>
                         </ul>
                    </div>
               </scroller>
          </section>
     </section>
</template>
<script>
import { Scroller } from 'vux'
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
          hideHandler() {

          },
          onScroll(pos) {
               this.scrollTop = pos.top
          },
     }
}
</script>