import Vue from 'vue'
import Router from 'vue-router'
const Voting = () => import('@/components/voting/voting')
const Voted = () => import('@/components/voted/voted')
Vue.use(Router)

export default new Router({
        routes: [
                {
                        path: '/voting',
                        name: 'voting',
                        component: Voting
                },
                {
                        path: '/voted',
                        name: 'voted',
                        component: Voted
                }
        ]
})
