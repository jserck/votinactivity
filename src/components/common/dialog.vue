<template>
     <section>
          <!-- :dialog-style="dialogStyle" -->
          <x-dialog v-model="isShowDialog" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section>
                    <ul>
                         <li v-if="dialogType ===1">

                         </li>
                         <li v-else-if="dialogType===2">2</li>
                         <li v-else>3</li>
                    </ul>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog } from 'vux'
export default {
     props: ['dialogType'],
     components: {
          XDialog
     },
     data() {
          return {
               isShowDialog: true
               // dialogStyle: {
               //      width: '6.933333rem'
               // }
          }
     },
     methods: {
          hideHandler() {
               this.$emit('isCloase')
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
</style>
