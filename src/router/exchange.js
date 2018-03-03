import index from '@/components/conf/index/index.vue'
export default {
    path: '/exchange',
    component: index,
    name: '交易',
    iconCls: '&#xe812;',
    children: [
        {
            path: 'order-manage',
            component: resolve => require(['@/components/common/empty.vue'], resolve),
            name: '订单管理',
            redirect:'order-manage/index',
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/components/conf/exchange/order-manage/index.vue'], resolve),
                    name: '订单管理列表',
                    hidden:true
                },{
                    path: 'view',
                    component: resolve => require(['@/components/conf/exchange/view.vue'], resolve),
                    name: '订单管理查看',
                    hidden:true
                }
            ]
        },{
            path: 'active-order',
            component: resolve => require(['@/components/common/empty.vue'], resolve),
            name: '活动订单管理',
            redirect:'active-order/index',
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/components/conf/exchange/active-order/index.vue'], resolve),
                    name: '活动订单管理列表',
                    hidden:true
                },{
                    path: 'view',
                    component: resolve => require(['@/components/conf/exchange/view.vue'], resolve),
                    name: '活动订单管理查看',
                    hidden:true
                }
            ]
        }
    ]
}