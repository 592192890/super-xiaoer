import index from '@/components/conf/index/index.vue'
export default {
    path: '/flow',
    component: index,
    name: '仓库物流',
    iconCls: '&#xe813;',
    children: [
        {
            path: 'company-manage',
            component: resolve => require(['@/components/common/empty.vue'], resolve),
            name: '物流公司管理',
            redirect:'company-manage/index',
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/components/conf/repository-flow/flow-manage/index.vue'], resolve),
                    name: '物流公司管理列表',
                    hidden:true
                },{
                    path: 'add',
                    component: resolve => require(['@/components/conf/repository-flow/flow-manage/add.vue'], resolve),
                    name: '物流公司管理新增',
                    hidden:true
                },{
                    path: 'edit',
                    component: resolve => require(['@/components/conf/repository-flow/flow-manage/edit.vue'], resolve),
                    name: '物流公司管理编辑',
                    hidden:true
                }
            ]
        },{
            path: 'pickup-port',
            component: resolve => require(['@/components/common/empty.vue'], resolve),
            name: '自提点管理',
            redirect:'pickup-port/index',
            children:[
                {
                    path: 'index',
                    component: resolve => require(['@/components/conf/repository-flow/pickup-port/index.vue'], resolve),
                    name: '自提点管理列表',
                    hidden:true
                },{
                    path: 'add',
                    component: resolve => require(['@/components/conf/repository-flow/pickup-port/add.vue'], resolve),
                    name: '自提点管理新增',
                    hidden:true
                },{
                    path: 'edit',
                    component: resolve => require(['@/components/conf/repository-flow/pickup-port/edit.vue'], resolve),
                    name: '自提点管理编辑',
                    hidden:true
                }
            ]
        }
    ]
}