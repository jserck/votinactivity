<template>
     <section style="width:100%;height:100%">
          <x-button
               @click.native="clickHandler"
               style="width:100%;height:100%;line-height:100%"
          >{{btnText}}</x-button>
     </section>
</template>
<script>
import { XButton } from 'vux'
export default {
     props: {
          btnText: {
               type: String,
               default: ''
          },
          eventName: {
               type: String,
               default: ''
          }
     },
     components: {
          XButton
     },
     data() {
          return {
               clickHandler() {
                    console.log(this.eventName);
                    this.$emit(this.eventName)
               }
          }
     }

}
</script>