let apiHost
let loginApiHost
if (process.env.NODE_ENV === 'production') {
    // api 测试环境
    apiHost = 'http://sys.yunhou.com/api';
    loginApiHost = 'http://sys.yunhou.com/api'
} else {
    // api 开发环境
    apiHost = 'http://sys.yunhou.com/api';
    loginApiHost = 'http://sys.yunhou.com/api'
}
// 图片静态资源
const staticImg4 = 'http://img4.bbgstatic.com/'

//商品管理详情页
const productDeatilHTML = "https://wx.yunhou.com/super/item/"
export default {
    apiHost,
    loginApiHost,
    staticImg4,
    productDeatilHTML
}