<template>
     <section>
          <span class="u-remove" @click="remove">-</span>
          <span class="u-inpit">{{voteNum}}</span>
          <span class="u-add" @click="add">+</span>
     </section>
</template>
<script>
export default {
     props: ['nums'],
     data() {
          return {
               voteNum: 1
          }
     },
     created() {
          this.voteNum = this.nums
          this.voteNumChange()
     },
     methods: {
          remove() {
               if (this.voteNum <= 1) return
               this.voteNum--
               this.voteNumChange()
          },
          add() {
               if (this.voteNum >= this.nums) return
               this.voteNum++
               this.voteNumChange()
          },
          voteNumChange() {
               this.$emit('voteNumChange', this.voteNum)
          }
     }
}
</script>

<style lang="scss" scoped>
span {
     font-size: 0.16rem /* 16/100 */;
}
</style>
