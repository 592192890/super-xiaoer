import index from '@/components/conf/index/index.vue'
export default {
    path: '/waiter',
    component: index,
    name: '店铺中心',
    iconCls: '&#xe7f5;',
    children: [{
        path: 'trade',
        component: resolve => require(['@/components/common/empty.vue'], resolve),
        name: '商圈管理',
        redirect:'trade/index',
        children:[
            {
                path: 'index',
                component: resolve => require(['@/components/conf/shop-center/business-district/index.vue'], resolve),
                name: '商圈列表',
                hidden:true
            },{
                path: 'add',
                component: resolve => require(['@/components/conf/shop-center/business-district/add.vue'], resolve),
                name: '商圈新增',
                hidden:true
            },{
                path: 'edit',
                component: resolve => require(['@/components/conf/shop-center/business-district/edit.vue'], resolve),
                name: '商圈编辑',
                hidden:true
            }
        ]
        
    },{
        path: 'shop',
        component: resolve => require(['@/components/common/empty.vue'], resolve),
        name: '店铺管理',
        redirect:'shop/index',
        children:[
            {
                path: 'index',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/index.vue'], resolve),
                name: '店铺列表',
                hidden:true
            },{
                path: 'add',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/add.vue'], resolve),
                name: '店铺新增',
                hidden:true
            },{
                path: 'edit',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/edit.vue'], resolve),
                name: '店铺编辑',
                hidden:true
            },{
                path: 'edit-third',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/edit-third.vue'], resolve),
                name: '店铺第三方编辑',
                hidden:true
            },{
                path: 'view',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/view.vue'], resolve),
                name: '查看店铺',
                hidden:true
            },{
                path: 'view-third',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/view-third.vue'], resolve),
                name: '查看第三方店铺',
                hidden:true
            },{
                path: 'modify-config',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/modify-config.vue'], resolve),
                name: '修改线上自营店铺配置',
                hidden:true
            },{
                path: 'modify-config-third',
                component: resolve => require(['@/components/conf/shop-center/shop-manage/modify-config-third.vue'], resolve),
                name: '修改第三方店铺配置',
                hidden:true
            }
        ]
        
    },{
        path: 'classify',
        component: resolve => require(['@/components/common/empty.vue'], resolve),
        name: '店铺分类管理',
        redirect:'classify/index',
        children:[
            {
                path: 'index',
                component: resolve => require(['@/components/conf/shop-center/classify-manage/index.vue'], resolve),
                name: '店铺分类列表',
                hidden:true
            },{
                path: 'add',
                component: resolve => require(['@/components/conf/shop-center/classify-manage/add.vue'], resolve),
                name: '添加店铺分类',
                hidden:true
            },{
                path: 'edit',
                component: resolve => require(['@/components/conf/shop-center/classify-manage/edit.vue'], resolve),
                name: '编辑店铺分类',
                hidden:true
            }
        ]
        
    },{
        path: 'tariff-setting',
        component: resolve => require(['@/components/conf/shop-center/tariff-setting/index.vue'], resolve),
        name: '资费设置'
        
    },{
        path: 'invest',
        component: resolve => require(['@/components/common/empty.vue'], resolve),
        name: '招商审核',
        redirect:'invest/index',
        children:[
            {
                path: 'index',
                component: resolve => require(['@/components/conf/shop-center/invest/index.vue'], resolve),
                name: '招商审核列表',
                hidden:true
            },{
                path: 'audit',
                component: resolve => require(['@/components/conf/shop-center/invest/audit.vue'], resolve),
                name: '审核招商信息',
                hidden:true
            },{
                path: 'view',
                component: resolve => require(['@/components/conf/shop-center/invest/view.vue'], resolve),
                name: '查看招商信息',
                hidden:true
            }
        ]
    },{
        path: 'finance',
        component: resolve => require(['@/components/common/empty.vue'], resolve),
        name: '财务审核',
        redirect:'finance/index',
        children:[
            {
                path: 'index',
                component: resolve => require(['@/components/conf/shop-center/finance/index.vue'], resolve),
                name: '财务审核列表',
                hidden:true
            },{
                path: 'audit',
                component: resolve => require(['@/components/conf/shop-center/finance/audit.vue'], resolve),
                name: '审核财务信息',
                hidden:true
            },{
                path: 'view',
                component: resolve => require(['@/components/conf/shop-center/finance/view.vue'], resolve),
                name: '查看财务信息',
                hidden:true
            }
        ]
    },{
        path: 'review-record',
        component: resolve => require(['@/components/conf/shop-center/review-record/index.vue'], resolve),
        name: '资费审核记录'
    },{
        path: 'tariff-review',
        component: resolve => require(['@/components/conf/shop-center/tariff-review/index.vue'], resolve),
        name: '资费审核'
    },{
        path: 'payment-record',
        component: resolve => require(['@/components/conf/shop-center/payment-record/index.vue'], resolve),
        name: '交费记录'
    }]

    
}