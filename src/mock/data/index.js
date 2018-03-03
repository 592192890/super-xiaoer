import Mock from 'mockjs';
var baseUrl = 'http://t.com';

//login -------------------------
Mock.mock(baseUrl + '/login', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            id: 1,
            username: 'admin',
            password: '123456',
            avatar: 'http://img1.bbgstatic.com/15d62d45666_bc_500e322ae799c0a882e91edf786aaf7d_1024x681.jpeg',
            name: 'lct'
        }
    }
});



Mock.mock(baseUrl + '/classify', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    cateName: "loading",
                    cateSort: 1,
                    id: 38,
                    level:1,
                    parentId: 0,
                    parentName:null,
                    show: true,
                    checked:false,
                    children: [
                    {   
                        cateName: "subitem",
                        cateSort: 1,
                        id: 39,
                        level:2,
                        parentId: 38,
                        parentName:"loading",
                        show: false,
                        checked:false,
                        children:[{
                            cateName: "sub",
                            cateSort: 1,
                            id: 40,
                            level:3,
                            parentId: 39,
                            parentName:"subitem",
                            show: false,
                            checked:false,
                        }]
                    },
                    {
                        cateName: "aaaaa",
                        cateSort: 2,
                        id: 60,
                        level:2,
                        parentId: 38,
                        parentName:"loading",
                        show: false,
                        checked:false,
                        children: [
                        {
                            cateName: "bbbbb",
                            cateSort: 1,
                            id: 61,
                            level:3,
                            parentId: 60,
                            parentName:"aaaaa",
                            show: false,
                            checked:false,
                        },
                        {
                            cateName: "ccccc",
                            cateSort: 2,
                            id: 62,
                            level:3,
                            parentId: 60,
                            parentName:"aaaaa",
                            show: false,
                            checked:false,
                        }]
                    },
                    {
                        cateName: "vvvvvv",
                        cateSort: 3,
                        id: 22,
                        level:2,
                        parentId: 38,
                        parentName:"loading",
                        show: false,
                        checked:false,
                    }]
                },
                {
                    cateName: "andy",
                    cateSort: 2,
                    id: 12,
                    level:1,
                    parentId: 0,
                    parentName:null,
                    show: true,
                    checked:true
                }
            ]           
        }
    }
});



Mock.mock(baseUrl + '/tariff', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    parentId: 0,
                    id: 1,
                    name: '一级分类-基础管理',
                    order: 1,
                    children: [
                    {   
                        parentId: 1,
                        id: 3,
                        name: '二级分类-用户管理',
                        order: 1
                    },
                    {
                        parentId: 1,
                        id: 4,
                        name: '二级分类-角色管理',
                        order: 2
                    }
                    ]
                },
                {
                    parentId: 0,
                    id: 2,
                    name: '一级分类-商品管理',
                    order: 3,
                    children:[{
                        parentId: 2,
                        name: '二级分类-权限管理',
                        id: 5,
                        order: 3
                    },{
                        parentId: 2,
                        name: '二级分类-权限管理',
                        id: 6,
                        order: 3
                    }]
                }
            ]
            
        }
    }
});


Mock.mock(baseUrl + '/review', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    id: 1,
                    name: '一级分类-基础管理',
                    order: 1,
                    children: [
                    {   
                        parentId: 1,
                        id: 3,
                        name: '二级分类-用户管理',
                        deposit:2000,
                        afterDeposit:3000,
                        commission:2.0,
                        afterCommission:3.0
                    },
                    {
                        parentId: 1,
                        id: 4,
                        name: '二级分类-角色管理',
                        deposit:2000,
                        afterDeposit:3000,
                        commission:2.0,
                        afterCommission:3.0
                    }
                    ]
                },
                {
                    parentId: 0,
                    id: 2,
                    name: '一级分类-商品管理',
                    order: 3,
                    children:[{
                        parentId: 2,
                        name: '二级分类-权限管理',
                        id: 5,
                        deposit:2000,
                        afterDeposit:4000,
                        commission:2.0,
                        afterCommission:3.0
                    },{
                        parentId: 2,
                        name: '二级分类-权限管理',
                        id: 6,
                        deposit:2000,
                        afterDeposit:4000,
                        commission:2.0,
                        afterCommission:3.0
                    }]
                }
            ]
            
        }
    }
});