///配置全局url
import Vue from 'vue'
import config from '@/config'
let host = config.apiHost
let loginHost = config.loginApiHost

Vue.prototype.$apiUrl = {
    //登陆
    loginUrl: loginHost + '/member/login',
    getPermissionRouter: loginHost + '/member/getResources',
    reSessionUrl: loginHost + "/member/refSession",
    // 退出登录
    logoutUrl: loginHost + '/member/safeLogout',
    //商圈
    queryTradeAreaListUrl: host + '/Cricle/list',
    getProvicesUrl: host + '/province',
    getCitiesUrl: host + '/city',
    getDistrictsUrl: host + '/district',
    deleteTradeUrl: host + '/Cricle/delete',
    editTradeUrl: host + '/Cricle/update',
    addTradeUrl: host + '/Cricle/add',
    getAddrUrl: host + '/cricle/get_addr',
    // 财务审核
    getFinanceListUrl: host + '/finance/shoplist',
    getFinanceDetailUrl: host + '/Merchant/get_detail',
    auditFinanceUrl: host + '/finance/auditshop',
    getFinanceStatusUrl: host + '/merchant/get_audit_status',
    // 招商审核
    getInvestListUrl: host + '/Merchant/get_list',
    getInvestDetailUrl: host + '/Merchant/get_detail',
    auditInvestUrl: host + '/Merchant/audit',
    getInvestStatusUrl: host + '/merchant/get_audit_status',
    //店铺管理
    queryShopListUrl: host + '/Xeshop/index',
    getShopDetailUrl: host + '/Merchant/get_detail',
    getSimpleSopDetailUrl: host + '/Xeshop/getShopInfo',
    getBusinessStatusUrl: host + '/Businesstype/allType',
    getCricleListUrl: host + '/Cricle/searchByAddrCode',
    getShopStatusUrl: host + '/Xeshop/allShopStatus',
    getServiceLineListUrl: host + '/Businesstype/allServiceLine',
    getShopInfoUrl: host + '/Xeshop/getShopInfo',
    getAllShopStatusUrl: host + '/Xeshop/allShopStatus',
    getCatesByPidUrl: host + '/Category/getCatesByPid',
    delCategoryUrl: host + '/Xeshop/delCategory',
    editShopUrl: host + '/Xeshop/editOnline',
    editThirdShopUrl: host + '/Xeshop/editOther',
    addCategoryUrl: host + '/Xeshop/addCategory',
    configOnlineUrl: host + '/Xeshop/configOnline',
    configOtherUrl: host + '/Xeshop/configOther',
    addShopUrl: host + '/Xeshop/addOnline',
    getShopTypeUrl: host + '/Shopclassify/getAll', //店铺类型
    getSettledaysTypesUrl: host + '/Merchant/get_settledays_types',
    syncProductUrl:host+'/Xeshop/syncShopPro',

    //店铺分类管理
    queryShopclassifyUrl: host + '/shopclassify/getall',
    editShopclassifyUrl: host + '/ShopClassify/save',
    addShopclassifyUrl: host + '/shopclassify/add',
    addclassifyUrl: host + '/shopclassify/addChild',
    deleteclassifyUrl: host + '/ShopClassify/delete',

    //交费记录
    getPaymentRecordUrl: host + '/finance/getPayLog',

    //资费审核记录
    getFeeAuditLogUrl: host + '/finance/getFeeAuditLog',

    //资费审核
    getAuditlistUrl: host + '/fee/auditlist',
    cateFeeAuditUrl: host + '/fee/cateFeeAudit',
    techFeeAuditUrl: host + '/fee/techFeeAudit',

    //资费设置
    getFeelistUrl: host + '/fee/feelist',
    cateFeeUrl: host + '/fee/cateFee',
    techFeeUrl: host + '/fee/techFee',

    //上传图片
    uploadImageUrl: host + '/Image/upload',

    // 商品中心-品牌管理
    getBrandListUrl: host + '/brand/list',
    getBrandDetailUrl: host + '/brand/queryById',
    addBrandValueUrl: host + '/brand/add',
    editBrandUrl: host + '/brand/edit',
    deleteBrandUrl: host + '/brand/del',

    // 商品中心-国家管理
    getCountryListUrl: host + '/country/list',
    getCountryDetailUrl: host + '/country/getCountryById',
    addCountryUrl: host + '/country/add',
    editCountryUrl: host + '/country/edit',
    deleteCountryUrl: host + '/country/del',

    //商品中心-标签管理
    getTagListUrl: host + '/label/list',
    getTagDetailUrl: host + '/label/get',
    addTagUrl: host + '/label/add',
    editTagUrl: host + '/label/edit',
    deleteTagUrl: host + '/label/delete',

    //商品中心-规格管理
    getSpecListUrl: host + '/spec/list',
    getSpecDetailUrl: host + '/spec/info',
    getSpecValueDetailUrl: host + '/spec/value_list',
    addSpecValueUrl: host + '/spec/add',
    editSpecUrl: host + '/spec/update',
    deleteSpecUrl: host + '/spec/delete',
    deleteSpecValueUrl: host + '/spec/delete_values',

    //商品中心-属性管理
    getAttributeListUrl: host + '/attribute/index',
    addAttributeUrl: host + '/attribute/saveAttr',
    getAttributeDetailUrl: host + '/attribute/getAttr',
    delAttributeUrl: host + '/attribute/delAttr',
    delAttrExtendAndDetailOptionUrl: host + '/attribute/delExtAttr', // 删除扩展属性行数据或者详细参数组下面的选项数据
    delAttrExtendOptionUrl: host + '/attribute/delExtAttrOption', // 删除扩展属性选项值
    delDetailGroupUrl: host + '/attribute/delDetailGroup', // 删除详细参数组
    delAttributeTabUrl: host + '/attribute/delTab',

    //商品中心-前台展示管理
    getFrontclassifyListUrl: host + '/Frontclassify/list',
    getbackclassifyListUrl: host + '/backclassify/tree',
    getCountriesListUrl: host + '/country/list',
    getLabelListUrl: host + '/label/list',
    getBrandsListUrl: host + '/brand/list',
    getFrontClassifyPath: host + '/frontClassify/path',
    getType_enum: host + '/frontClassify/type_enum',
    deleteFrontClassifyUrl: host + '/Frontclassify/delete',
    moveFrontClassifyUrl: host + '/frontClassify/move',
    addFrontClassifyUrl: host + '/frontClassify/add',
    addGetSearchUrl: host + '/frontClassify/get_search',
    getUpdateUrl: host + '/frontClassify/update',

    //商品中心-后台分类管理
    getBackClassifyListUrl: host + '/backclassify/tree',
    deleteBackClassifyUrl: host + '/backclassify/del',
    getBrandUrl: host + '/backclassify/getBrand',
    delBrandUrl: host + '/backclassify/delBrand',
    addBrandUrl: host + '/backclassify/addBrand',
    getSpecUrl: host + '/backclassify/getSpec',
    addSpecUrl: host + '/backclassify/addSpec',
    getPropertyUrl: host + '/backclassify/getProperty',
    addPropertyUrl: host + '/backclassify/addProperty',
    getPathUrl: host + '/backclassify/getPath',
    addBackClassifyUrl: host + '/backclassify/add',
    editBackClassifyUrl: host + '/backclassify/edit',

    //sPu管理
    getSKUListUrl: host + '/spu/get_list',
    getSKUDetailUrl: host + '/spu/get_complex_detail',
    getSKUCategoryUrl: host + '/backclassify/getChildren',
    getOptionsUrl: host + '/spu/get_options',
    updateOrAddSKUUrl: host + '/spu/upinsert',
    deleteBatchSPUUrl: host + '/spu/delete',
    validateFiledUrl: host + '/spu/search_sku_by_skubn_or_barcode',
    validateProductCodeUrl: host + "/goods/get_goods_byparam",
    //商品管理
    getProductListUrl: host + "/goods/list",
    unShelveUrl: host + '/goods/takeoff',

    //相册管理
    getAlnumNoPageUrl: host + '/album/get_nopage_list',
    getAlbumImagesUrl: host + '/album/get_album_images',
    addAlbumUrl: host + "/album/add_album",
    addAlbumImageUrl: host + "/album/add_album_image",
    deleteAlbumImageUrl: host + "/album/delete_album_images",
    deleteAlbumUrl: host + "/album/delete_album",

    //交易
    getOrderListUrl: host + "/transaction/common_list",
    exportsOrdersUrl: host + "/transaction/common_export",
    getOrderDetailUrl: host + "/transaction/common_info",

    getActiveOrderListUrl: host + "/transaction/activity_list",
    exportsActiveOrdersUrl: host + "/transaction/activity_export",
    getActiveOrderDetailUrl: host + "/transaction/activity_info",

    getOrderMarkListUrl: host + "/transaction/get_mark",
    setOrderMarkUrl: host + "/transaction/set_mark",


    //售后
    getRefundListUrl: host + "/aftersale/refund_list", // 退款单管理列表
    getRefundDetailUrl: host + "/aftersale/refund_detail", // 退款单详情
    getAfterSaleDetailUrl: host + "/aftersale/after_sale_detail", //售后申请单详情
    getAfterSaleRemarksUrl: host + "/aftersale/comment_list", //售后申请单备注列表
    submitOrderMarkUrl: host + "/aftersale/comment_add", //售后提交申请单备注
    agreeRefundUrl:host+"/aftersale/refund", //售后是否同意退款
    exportRefundUrl:host+"/aftersale/refund_export",
    getEnumSelectUrl: host + "/transaction/enum",
    cancelOrderUrl: host + "/transaction/cancel",

    getApplyOrderListUrl: host + '/aftersale/after_sale_list',
    exportApplyOrderUrl: host + '/aftersale/after_sale_export',
    getApplyOrderDetailUrl: host + '/aftersale/after_sale_detail',
    typeFlowUrl: host + '/aftersale/after_sale_logistics',
    addApplyOrderCommentUrl: host + '/aftersale/comment_add',
    getApplyOrderCommentListUrl: host + '/aftersale/comment_list',
    cancelApplyOrderUrl:host+'/aftersale/after_sale_cancel',

    //物流管理
    getLogisticsListUrl: host + '/words/logistics_list',
    getLogisticsDetailUrl: host + '/words/logistics_getall',
    addLogisticsUrl: host + '/words/logistics_add',
    updateLogisticsUrl: host + '/words/logistics_update',
    deteletLogisticsUrl: host + '/words/logistics_del',
    getAllLogisticCompaniesUrl: host + '/words/logistics_getall',

    //自提点
    getPickupListUrl:host+"/words/pickup_list",
    getShopSelectListUrl:host+"/words/get_shop",
    addPickUpUrl:host+"/words/pickup_add",
    updatePickUpUrl:host+"/words/pickup_update",
    deletePickUpUrl:host+"/words/pickup_del",
    getPickUpDetailUrl:host+"/words/pickup_detail",
    //搜索中心
    //补全词词库
    complementedList: host + '/words/complemented_list',
    complementedDel: host + '/words/complemented_del',
    complementedAdd: host + '/words/complemented_add',
    complementedImport: host + '/words/complemented_import',
    //同义词词库
    synonymList: host + '/words/synonym_list',
    synonymUpdate: host + '/words/synonym_update',
    synonymAdd: host + '/words/synonym_add',
    synonymDel: host + '/words/synonym_del',
    //分词词库
    participleList: host + '/words/participle_list',
    participleDel: host + '/words/participle_del',
    participleImport: host + '/words/participle_import',
    participleAdd: host + '/words/participle_add',
    templete: host + '/words/templete',
    //分类权重
    cateWeightList: host + '/words/cateWeight_list',
    cateWeightDel: host + '/words/cateWeight_del',
    cateWeightAdd: host + '/words/cateWeight_add',
    cateWeightUpdate: host + '/words/cateWeight_update',
    //商品权重
    productWeightList: host + '/words/productWeight_list',
    addProductOrderUrl: host + '/words/productWeight_add',
    updateProductOrderUrl: host + '/words/productWeight_update',

    //渠道应用管理
    getChannelOperationListUrl:host+"/supplieruser/list",
    getChannelOperationDetailUrl:host+"/supplieruser/detail",
    importRelatedProductUrl:host+"/supplieruser/parse_excel_pro",
    exportRelatedProductUrl:host+"/supplieruser/export_user_pros",
    donwloadExcelTemplateUrl:host+'/supplieruser/user_pro_excel_tmplate',
    addOrUpdateChannelUrl:host+"/supplierUser/save_user",
    getChannelFucntionListUrl:host+"/supplierfuncs/list",
    deleteChannelUserUrl:host+"/supplieruser/del_user"

}
