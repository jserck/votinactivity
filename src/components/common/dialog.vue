<template>
     <section>
          <x-dialog v-model="isShowDialog" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section>
                    <ul>
                         <li v-if="dialogType ===1">
                              <FirstIn :dialogOpations="dialogOpations"></FirstIn>
                         </li>
                         <li v-else-if="dialogType===2">
                              <Rule></Rule>
                         </li>
                         <li v-else-if="dialogType===3">
                              <VoteHistory></VoteHistory>
                         </li>
                         <li v-else-if="dialogType===4">
                              <Attention @dialogComponentEvent="dialogComponentEvent"></Attention>
                         </li>
                         <li v-else-if="dialogType===5">
                              <DoVoting
                                   @dialogComponentEvent="dialogComponentEvent"
                                   :RightToVote="true"
                              ></DoVoting>
                         </li>
                         <li v-else>
                              <VideoPlay></VideoPlay>
                         </li>
                    </ul>
               </section>
          </x-dialog>
     </section>
</template>
<script>
import { XDialog } from 'vux'
export default {
     props: ['dialogType', 'dialogOpations'],
     components: {
          XDialog,
          FirstIn: () => import('../voting/firstin'),
          Rule: () => import('../voting/rule.vue'),
          VoteHistory: () => import('../voting/votelist.vue'),
          Attention: () => import('../voting/attention.vue'),
          DoVoting: () => import('../voting/dovoting.vue'),
          VideoPlay: () => import('../voting/video.vue')
     },
     data() {
          return {
               isShowDialog: true
          }
     },
     methods: {
          hideHandler() {
               this.$emit('isCloase')
          },
          dialogComponentEvent(val) {
               this.$emit('dialogListenEvent', val)
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
</style>
