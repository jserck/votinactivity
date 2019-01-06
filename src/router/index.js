
const Voting = () => import('@/components/voting/voting')
const Voted = () => import('@/components/voted/voted')
const Lx = () => import('@/components/lx')

export default new VueRouter({
    routes: [{
            path: '/voting',
            name: 'voting',
            component: Voting
        },
        {
            path: '/voted',
            name: 'voted',
            component: Voted
        },
        {
            path: '/lx',
            name: 'lx',
            component: Lx
        }
    ]
})