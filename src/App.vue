<template>
    <!-- <section class="touchFixed" id="touchFixed"> -->
        <div id="app">
            <router-view/>
        </div>
    <!-- </section> -->
 </template>

<script>
export default {
    name: 'App'
}
</script>
<style scoped lang="scss">
// .touchFixed {
//     width: 100%;
//     height: 100%;
//     overflow-y: scroll;
//     -webkit-overflow-scrolling: touch;
//     position: fixed;
//     top: 0;
// }
#app {
    margin: auto;
    width: 100%;
}
</style>
