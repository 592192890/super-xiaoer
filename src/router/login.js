import register from '@/components/conf/register/register.vue'
export default {

    path: '/register',
    component: register,
    name: '登陆',
    hidden: true,
    // children: [{
    //     path: 'protocol',
    //     component: resolve => require(['@/components/conf/protocol/protocol.vue'], resolve),
    //     name: '注册服务协议',
    //     hidden: true
    // }]
}