import index from '@/components/conf/index/index.vue'
import empty from '@/components/common/empty.vue'
export default {
    path: '/after-sale',
    component: index,
    name: '售后',
    iconCls: '&#xe815;',
    children: [
        {
            path: 'after-sale-manage',
            component: empty,
            name: '售后申请单管理',
            redirect: 'after-sale-manage/index',
            children: [{
                path: 'index',
                component: resolve => require(['@/components/conf/after-sale/after-sale-manage/index.vue'], resolve),
                name: '售后申请单管理列表',
                hidden: true
            }, {
                path: 'view',
                component: resolve => require(['@/components/conf/after-sale/after-sale-manage/view.vue'], resolve),
                name: '售后单查看',
                hidden: true
            }, {
                path: 'typeflow',
                component: resolve => require(['@/components/conf/after-sale/after-sale-manage/flow.vue'], resolve),
                name: '填写物流',
                hidden: true
            }]
        },
        {
            path: 'refund-manage',
            component: empty,
            name: '退款单管理',
            redirect: 'refund-manage/index',
            children: [{
                path: 'index',
                component: resolve => require(['@/components/conf/after-sale/refund-manage/index.vue'], resolve),
                name: '退款单管理列表',
                hidden: true
            }, {
                path: 'order',
                component: resolve => require(['@/components/conf/after-sale/refund-manage/order-check.vue'], resolve),
                name: '交易订单查看',
                hidden: true
            }, {
                path: 'check',
                component: resolve => require(['@/components/conf/after-sale/refund-manage/check.vue'], resolve),
                name: '售后订单查看',
                hidden: true
            }]
        }
    ]
}