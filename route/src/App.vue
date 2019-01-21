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
// @font-face {
//      font-family: "FZLTHJW"; //重命名字体名
//      src: url("~@/assets/font/FZLTHJW.ttf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
// @font-face {
//      font-family: "FZLTCHJW"; //重命名字体名
//      src: url("~@/assets/font/FZLTCHJW.ttf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
// @font-face {
//      font-family: "NotoSerifCJKsc-Black"; //重命名字体名
//      src: url("~@/assets/font/NotoSerifCJKsc-Black.otf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
// @font-face {
//      font-family: "NotoSerifCJKsc-Medium"; //重命名字体名
//      src: url("~@/assets/font/NotoSerifCJKsc-Medium.otf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
// @font-face {
//      font-family: "SourceHanSansCN-Heavy"; //重命名字体名
//      src: url("~@/assets/font/SourceHanSansCN-Heavy.otf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
// @font-face {
//      font-family: "SourceHanSansCN-Regular"; //重命名字体名
//      src: url("~@/assets/font/SourceHanSansCN-Regular.otf"); //引入字体
//      font-weight: normal;
//      font-style: normal;
// }
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
