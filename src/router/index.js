import Vue from 'vue'
import Router from 'vue-router'

// import repositoryFlow from './repository-flow.js'
// import exchange from './exchange.js'
// import searchCenter from './search-center.js'

import login from './login.js'
// import afterSale from './after-sale.js'

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
            path: '/404',
            component: resolve => require(['@/components/common/404/404.vue'], resolve),
            hidden: true
        }, {
            path: '/',
            // redirect: '/waiter/trade',
            redirect: '/login',
            hidden: true
        },
        {
            path: '/login',
            component: resolve => require(['@/components/conf/login/login.vue'], resolve),
            name: "登录",
            hidden: true
        },
        {
            path: '/no-right',
            component: resolve => require(['@/components/conf/no-right/no-right.vue'], resolve),
            name: "无权限",
            hidden: true
        },
        // {
        //     path: '/protocol',
        //     component: resolve => require(['@/components/conf/protocol/protocol.vue'], resolve),
        //     hidden: true
        // },
        {
            path: '/find-password',
            component: resolve => require(['@/components/conf/find-password/find-password.vue'], resolve),
            hidden: true
        },
        login

    ]
})

export default router