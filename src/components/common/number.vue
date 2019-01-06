<template>
    <section>
        <span class="u-remove" @click="remove">-</span>
        <span class="u-inpit">{{voteNum}}</span>
        <span class="u-add" @click="add">+</span>
    </section>
</template>
<script>
export default {
    data() {
        return {
            voteNum: 0
        }
    },
    methods: {
        remove() {
            if (this.voteNum <= 0) return
            this.voteNum--
            this.voteNumChange()
        },
        add() {
            this.voteNum++
            this.voteNumChange()
        },
        voteNumChange() {
            this.$emit('voteNumChange', this.voteNum)
        }
    }
}
</script>

