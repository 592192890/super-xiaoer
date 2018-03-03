import index from '@/components/conf/index/index.vue'
export default {
    path: '/channel-operation',
    component: index,
    name: '口袋参谋管理',
    iconCls: '&#xe791;',
    children: [{
        path: 'list',
        component: resolve => require(['@/components/conf/channel-operation/list/index.vue'], resolve),
        name: '口袋参谋管理列表'

    },{
        path: 'log',
        component: resolve => require(['@/components/conf/channel-operation/log/index.vue'], resolve),
        name: '口袋参谋管理日志'

    }]


}
