import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//配置路由路径
export default new Router({
     //历史模式，可以划掉路径里边得‘/#/’字符
     // mode: 'history',
     routes: [
          //无效路由地址跳转指定页面
          // {
          //      path: '*',
          //      component:
          // },
          {
               path: "/home",
               name: "home",
               component: () => ({
                    component: import('@/components/home/home')
               })
          }
     ]
});
