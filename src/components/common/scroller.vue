<template>
    <section class="g-scroll-container" :style="`height:${height}`">
        <slot></slot>
    </section>
</template>
<script>

export default {
    props: ['height'],
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.g-scroll-container {
    width: 100%;
    // overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
