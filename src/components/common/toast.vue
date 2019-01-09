<template>
     <section class="g-toast" v-if="show">
          <span>{{text}}</span>
     </section>
</template>
<style lang="scss" scoped>
.g-toast {
     padding: 0.2rem 0.3rem;
     position: fixed;
     left: 50%;
     top: 50%;
     margin-left: -1.8rem;
     margin-top: -0.27rem;
     z-index: 9999;
     border-radius: 0.1rem;
     width: 3rem;
     height: 0.5rem;
     text-align: center;
     line-height: 0.5rem;
     font-size: 0.22rem;
     color: #fff;
     background: rgba(0, 0, 0, 0.5);
     transition: all 2s;
     -webkit-transition: all 2s;
}
</style>
