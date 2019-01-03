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
     top: 3.2rem !important /* 120/37.5 */;
     margin-left: -2.426667rem !important /* 91/37.5 */;
     width: 4.853333rem !important /* 182/37.5 */;
     height: 5.066667rem !important /* 190/37.5 */;
}
.weui-icon_toast.weui-loading {
     margin-top: 1.893333rem !important /* 71/37.5 */;
     width: 1.28rem !important /* 48/37.5 */;
     height: 1.28rem !important/* 48/37.5 */;
}
@media screen and (min-width: 1024px) {
     .weui-dialog {
          width: 80% !important;
     }
}
</style>
