<template>
     <section>
          <i class="u-rule" @click="ruleHandler">规则</i>
          <x-dialog v-model="isViteList" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section class="g-ViteList">
                    <scroller lock-x height="200px" @on-scroll="onScroll" ref="scrollerEvent">
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
          </x-dialog>
     </section>
</template>
<script>
import { XDialog, Scroller } from 'vux'
export default {
     components: {
          XDialog, Scroller
     },
     data() {
          return {
               isViteList: false,
               scrollTop: 0,
          }
     },
     created() {

     },
     methods: {
          ruleHandler() {
               this.isViteList = true
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
@import "../../assets/css/mixin.scss";
.u-rule {
     position: absolute;
     padding: 0.08rem 0.48rem /* 18/37.5 */;
     display: inline-block;
     top: 1.52rem /* 57/37.5 */;
     right: 0;
     background: #f6f6f6;
     color: #1f2028;
     @include setFontSize(14px);
     text-align: center;
}
</style>
