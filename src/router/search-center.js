import index from '@/components/conf/index/index.vue'
import empty from '@/components/common/empty.vue'
export default {
    path: '/search-center',
    component: index,
    name: '搜索中心',
    iconCls: '&#xe811;',
    children: [{
        path: 'complete-thesaurus',
        component: empty,
        name: '补全词库',
        redirect: 'complete-thesaurus/index',
        children: [{
            path: 'index',
            component: resolve => require(['@/components/conf/search-center/complete-thesaurus/index.vue'], resolve),
            name: '词库列表',
            hidden: true
        }, {
            path: 'add',
            component: resolve => require(['@/components/conf/search-center/complete-thesaurus/add.vue'], resolve),
            name: '新增词名',
            hidden: true
        }, {
            path: 'edit',
            component: resolve => require(['@/components/conf/search-center/complete-thesaurus/add.vue'], resolve),
            name: '编辑词名',
            hidden: true
        }]
    }, {
        path: 'participle-thesaurus',
        component: empty,
        name: '分词词库',
        redirect: 'participle-thesaurus/index',
        children: [{
            path: 'index',
            component: resolve => require(['@/components/conf/search-center/participle-thesaurus/index.vue'], resolve),
            name: '分词列表',
            hidden: true
        }, {
            path: 'add',
            component: resolve => require(['@/components/conf/search-center/participle-thesaurus/add.vue'], resolve),
            name: '新增分词',
            hidden: true
        }, {
            path: 'edit',
            component: resolve => require(['@/components/conf/search-center/participle-thesaurus/add.vue'], resolve),
            name: '编辑分词',
            hidden: true
        }]
    }, {
        path: 'synonymous-thesaurus',
        component: empty,
        name: '同义词库',
        redirect: 'synonymous-thesaurus/index',
        children: [{
            path: 'index',
            component: resolve => require(['@/components/conf/search-center/synonymous-thesaurus/index.vue'], resolve),
            name: '同义词列表',
            hidden: true
        }, {
            path: 'add',
            component: resolve => require(['@/components/conf/search-center/synonymous-thesaurus/add.vue'], resolve),
            name: '新增同义词',
            hidden: true
        }, {
            path: 'edit',
            component: resolve => require(['@/components/conf/search-center/synonymous-thesaurus/add.vue'], resolve),
            name: '编辑同义词',
            hidden: true
        }]
    }, {
        path: 'classification-weight',
        component: empty,
        name: '分类权重',
        redirect: 'classification-weight/index',
        children: [{
            path: 'index',
            component: resolve => require(['@/components/conf/search-center/classification-weight/index.vue'], resolve),
            name: '分类权重列表',
            hidden: true
        }, {
            path: 'add',
            component: resolve => require(['@/components/conf/search-center/classification-weight/add.vue'], resolve),
            name: '新增权重',
            hidden: true
        }, {
            path: 'edit',
            component: resolve => require(['@/components/conf/search-center/classification-weight/add.vue'], resolve),
            name: '编辑权重',
            hidden: true
        }]
    },{
        path: 'product-weight',
        component: empty,
        name: '商品权重',
        redirect: 'product-weight/index',
        children: [{
            path: 'index',
            component: resolve => require(['@/components/conf/search-center/product-weight/list.vue'], resolve),
            name: '商品权重列表',
            hidden: true
        }]
    }]
}