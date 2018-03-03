import Mock from 'mockjs';
var baseUrl = 'http://t.com';

Mock.mock(baseUrl + '/shop', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            total:100,
            currentPage:1,
            list:[
                {
                    id:1,
                    shopName: '店铺1店铺1店铺1店铺1店铺1',
                     shopCode:'2222',
                    province: '湖南',
                    commercial:'第三方商家',
                    city: '长沙',
                    district:'岳麓区',
                    tradeName:'麓谷',
                    gps:'111/222',
                    residence:'中房F联邦',
                    status:'可见'
                },{
                    id:2,
                    shopName: '店铺2',
                    shopCode:'11111',
                    commercial:'超市',
                    province: '湖南',
                    city: '长沙',
                    district:'岳麓区',
                    tradeName:'麓谷',
                    gps:'111/222',
                    residence:'中房F联邦',
                    status:'可见'
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/business-type', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    id:1,
                    name:'百货'
                },{
                    id:2,
                    name:'超市'
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/shop-status', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    id:1,
                    name:'正常营业'
                },{
                    id:2,
                    name:'查封'
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/business-line', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            list:[
                {
                    id:1,
                    name:'超市标品'
                },{
                    id:2,
                    name:'超市外卖'
                }
            ]
            
        }
    }
});