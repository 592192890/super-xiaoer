import Mock from 'mockjs';
var baseUrl = 'http://t.com';
Mock.mock(baseUrl + '/trade', function(opt) {
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
                    number: 1,
                    province: '湖南',
                    city: '长沙',
                    district:'岳麓区',
                    tradeName:'麓谷',
                    gps:'111/222',
                    residence:'中房F联邦',
                    status:'可见'
                },{
                    id:2,
                    number: 2,
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
Mock.mock(baseUrl + '/province', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            
            list:[
                {
                    id:1,
                    name: '湖南',
                    
                },{
                    id:2,
                    name: '湖北',
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/city', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            
            list:[
                {
                    id:1,
                    name: '长沙',
                    
                },{
                    id:2,
                    name: '益阳',
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/district', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            
            list:[
                {
                    id:1,
                    name: '岳麓区',
                    
                },{
                    id:2,
                    name: '雨花区',
                }
            ]
            
        }
    }
});
Mock.mock(baseUrl + '/status', function(opt) {
    var param = sessionStorage.getItem(opt.url);
    sessionStorage.removeItem(opt.url);
    return {
        error: '0',
        msg: '',
        data: {
            
            list:[
                {
                    id:'1',
                    name: '可见',
                    
                },{
                    id:2,
                    name: '不可见',
                }
            ]
            
        }
    }
});