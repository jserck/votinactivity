<template>
     <div id="app">
          <router-view/>
     </div>
</template>

<script>
export default {
     name: 'App'
}
</script>
<style scoped lang="scss">
#app {
     margin: auto;
     width: 100%;
}
</style>
<style lang="scss">
.weui-dialog {
     max-width: none !important;
}
.weui-toast {
     top: 3.2rem /* 120/37.5 */;
     margin-left: -2.426667rem /* 91/37.5 */;
     width: 4.853333rem /* 182/37.5 */;
     height: 5.066667rem /* 190/37.5 */;
}
.weui-icon_toast.weui-loading {
     margin-top: 1.893333rem /* 71/37.5 */;
     width: 1.28rem /* 48/37.5 */;
     height: 1.28rem /* 48/37.5 */;
}
@media screen and (min-width: 1024px) {
     .weui-dialog {
          width: 80% !important;
     }
}
</style>
