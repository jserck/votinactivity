<template>
     <section class="g-number">
          <span class="u-remove" @click="remove">-</span>
          <span class="u-input">{{voteNum}}</span>
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
               if (this.voteNum <= 10) return
               this.voteNum -= 10
               this.voteNumChange()
          },
          add() {
               if (this.voteNum >= this.nums) return
               this.voteNum += 10
               this.voteNumChange()
          },
          voteNumChange() {
               this.$emit('voteNumChange', this.voteNum)
          }
     }
}
</script>

<style lang="scss" scoped>
.g-number {
     line-height: 0.56rem;
     font-size: 0.36rem;
     font-family: SourceHanSansCN-Regular;
     font-weight: 400;
     color: rgba(255, 217, 165, 1);
}
span {
     display: inline-block;
}
.u-remove {
     padding: 0 0.2rem;
}
.u-add {
     padding: 0 0.2rem;
}
.u-input {
     text-align: left;
     padding-left: 0.29rem;
     width: 2.14rem;
     height: 0.56rem;
     border: 1px solid #ffd9a5;
}
</style>
