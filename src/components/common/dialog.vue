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
                                   :RightToVote="dialogOpations.isCanVote"
                              ></DoVoting>
                         </li>
                         <li v-else-if="dialogType===6">
                              <VideoPlay></VideoPlay>
                         </li>
                         <li v-else-if="dialogType===7">
                              <SignIn @dialogComponentEvent="dialogComponentEvent"></SignIn>
                         </li>
                         <li v-else-if="dialogType===8">
                              <noHaveBook
                                   :dialogOpations="dialogOpations"
                                   @dialogComponentEvent="dialogComponentEvent"
                              ></noHaveBook>
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
          VideoPlay: () => import('../voting/video.vue'),
          SignIn: () => import('../voting/signin.vue'),
          noHaveBook: () => import('../voting/nohavebook.vue')
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
          dialogComponentEvent(obj) {
               this.$emit('dialogListenEvent', obj)
          },
          voteNumChange2(val) {
               this.$emit('voteNumChange3', val)
          },
     },
     created() {

     }
}
</script>

<style lang="scss" scoped>
</style>
