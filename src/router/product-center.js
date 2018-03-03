import index from '@/components/conf/index/index.vue'
export default {
  path: '/product',
  component: index,
  name: '商品中心',
  iconCls: '&#xe7fd;',
  children: [{
    path: 'brand',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    redirect:'brand/index',
    name: '品牌管理',
    children:[
      {
        path:'index',
        component: resolve => require(['@/components/conf/product-center/brand-manage/index.vue'], resolve),
        name:'品牌列表',
        hidden: true
      },{
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/brand-manage/add.vue'], resolve),
        name: '品牌新增',
        hidden: true
      },{
        path: 'edit',
        component: resolve => require(['@/components/conf/product-center/brand-manage/edit.vue'], resolve),
        name: '品牌编辑',
        hidden: true
      }

    ]
  },{
    path: 'spec',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '规格管理',
    redirect:'spec/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/spec-manage/index.vue'], resolve),
        name: '规格列表',
        hidden: true
      },{
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/spec-manage/add.vue'], resolve),
        name: '规格新增',
        hidden: true
      },{
        path: 'edit/:specId',
        component: resolve => require(['@/components/conf/product-center/spec-manage/edit.vue'], resolve),
        name: '规格编辑',
        hidden: true
      }
    ]
  },{
    path: 'country',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    redirect:'country/index',
    name: '国家管理',
    children:[
      {
        path:'index',
        component: resolve => require(['@/components/conf/product-center/country-manage/index.vue'], resolve),
        name: '国家列表',
        hidden: true
      }, {
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/country-manage/add.vue'], resolve),
        name: '国家新增',
        hidden: true
      }, {
        path: 'edit/:countryId',
        component: resolve => require(['@/components/conf/product-center/country-manage/edit.vue'], resolve),
        name: '国家编辑',
        hidden: true
      }
    ]
  },{
    path: 'attribute',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '属性管理',
    redirect:'attribute/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/attribute-manage/index.vue'], resolve),
        name: '属性列表',
        hidden: true
      },{
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/attribute-manage/add.vue'], resolve),
        name: '属性新增',
        hidden: true
      },{
        path: 'edit/:typeId',
        component: resolve => require(['@/components/conf/product-center/attribute-manage/edit.vue'], resolve),
        name: '属性编辑',
        hidden: true
      }
    ]
  },{
    path: 'tags',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '标签管理',
    redirect:'tags/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/tag-manage/index.vue'], resolve),
        name: '标签列表',
        hidden: true
      }, {
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/tag-manage/add.vue'], resolve),
        name: '标签新增',
        hidden: true
      },{
        path: 'edit/:labelId',
        component: resolve => require(['@/components/conf/product-center/tag-manage/edit.vue'], resolve),
        name: '标签编辑',
        hidden: true
      }
    ]
  },{
    path: 'SPU',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: 'SPU管理',
    redirect:'SPU/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/spu-manage/index.vue'], resolve),
        name: 'SPU列表',
        hidden:true
      }, {
        path: 'add-step1',
        component: resolve => require(['@/components/conf/product-center/spu-manage/add-step1.vue'], resolve),
        name: 'SPU新增1',
        hidden: true
      }, {
        path: 'add-step2',
        component: resolve => require(['@/components/conf/product-center/spu-manage/add-step2.vue'], resolve),
        name: 'SPU新增2',
        hidden: true
      }, {
        path: 'add-step3',
        component: resolve => require(['@/components/conf/product-center/spu-manage/add-step3.vue'], resolve),
        name: 'SPU新增3',
        hidden: true
      }, {
        path: 'edit',
        component: resolve => require(['@/components/conf/product-center/spu-manage/edit.vue'], resolve),
        name: 'SPU编辑',
        hidden: true
      }
    ]
    
  }, {
    path: 'product',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '商品管理',
    redirect:'product/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/product-manage/index.vue'], resolve),
        name: '商品列表',
        hidden: true
      }
    ]
    
  },{
    path: 'front',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '前台展示管理',
    redirect:'front/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/front-manage/index.vue'], resolve),
        name: '前台展示列表',
        hidden: true
      },{
        path: 'addone',
        component: resolve => require(['@/components/conf/product-center/front-manage/addone.vue'], resolve),
        name: '前台展示管理-新增1',
        hidden: true
      },{
        path: 'addtwo',
        component: resolve => require(['@/components/conf/product-center/front-manage/addtwo.vue'], resolve),
        name: '前台展示管理-新增2',
        hidden: true
      },{
        path: 'eddone',
        component: resolve => require(['@/components/conf/product-center/front-manage/editone.vue'], resolve),
        name: '前台展示管理-编辑1',
        hidden: true
      },{
        path: 'eddtwo',
        component: resolve => require(['@/components/conf/product-center/front-manage/edittwo.vue'], resolve),
        name: '前台展示管理-编辑2',
        hidden: true
      },{
        path: 'finish',
        component: resolve => require(['@/components/conf/product-center/front-manage/addfinish.vue'], resolve),
        name: '前台展示管理-新增完成',
        hidden: true
      },{
        path: 'edit-finish',
        component: resolve => require(['@/components/conf/product-center/front-manage/editfinish.vue'], resolve),
        name: '前台展示管理-编辑完成',
        hidden: true
      }
    ]
  },{
    path: 'back',
    component: resolve => require(['@/components/common/empty.vue'], resolve),
    name: '后台分类管理',
    redirect:'back/index',
    children:[
      {
        path: 'index',
        component: resolve => require(['@/components/conf/product-center/back-manage/index.vue'], resolve),
        name: '后台分类列表',
        hidden: true
      },{
        path: 'add',
        component: resolve => require(['@/components/conf/product-center/back-manage/add.vue'], resolve),
        name: '后台分类管理-新增',
        hidden: true
      },{
        path: 'edit',
        component: resolve => require(['@/components/conf/product-center/back-manage/edit.vue'], resolve),
        name: '后台分类管理-编辑',
        hidden: true
      }
    ]
  }]
}
