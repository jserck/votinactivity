<template>
     <section>
          <x-dialog v-model="isShowDialog" @on-hide="hideHandler" hide-on-blur class="dialog-demo">
               <section>
                    <ul>
                         <li v-if="dialogType ===1">
                              <FirstIn
                                   @dialogComponentEvent="dialogComponentEvent"
                                   :dialogOpations="dialogOpations"
                              ></FirstIn>
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
                                   @voteNumChange2="voteNumChange2"
                                   @goRule1="goRule1"
                                   :RightToVote="dialogOpations.isCanVote"
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
          },
          voteNumChange2(val) {
               this.$emit('voteNumChange3', val)
          },
          goRule1() {
               this.$emit('goRule2')
          }
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
</style>
