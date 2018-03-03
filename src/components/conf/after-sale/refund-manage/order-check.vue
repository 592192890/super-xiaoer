<template>
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section class="header" style="margin-top:20px">
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-button class="primary" @click="goBack(1)">关闭</el-button>
            </el-row>

             <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="订单详情" name="first">
                    <section>
                        <div class="title">
                            <el-row>
                                <el-col :span="4">
                                    <h1 class="header">订单号：{{formEntity.orderId}}</h1>
                                </el-col>
                                <el-col :span="4" :offset="1">
                                    <h1 class="header">状态：{{formEntity.orderStatus}}</h1>
                                </el-col>
                            </el-row>
                        </div>
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">配送信息</h1>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">配送方式：</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="label item">{{formEntity.shippingInfo.shippingType}}</div>

                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">快递公司：</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.shippingInfo.expressCompany}}</div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">运单号码：</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.shippingInfo.waybillNos?formEntity.shippingInfo.waybillNos.join(','):''}}</div>
                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">买家信息</h1>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">买家用户名：</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="label item">{{formEntity.member.memberName}}</div>

                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">手机：</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.member.mobile}}</div>
                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                    <section v-if="formEntity.logisticsInfo&&formEntity.logisticsInfo.length">
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">订单追踪</h1>
                            </el-row>
                            <el-row :gutter="40" v-for="(item,index) in formEntity.logisticsInfo" :key="index">
                                <el-col :span="4">
                                    <div class="label">{{item.time}}</div>
                                </el-col>
                                <el-col :span="20">
                                    <div class="label item">{{item.message}}</div>

                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">订单信息</h1>
                            </el-row>
                            <section>
                                <el-row>
                                    <h2 class="sub-header">店铺信息</h2>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">店铺名称：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.shop.shopName}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发货地址：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.shop.senderAddress}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发货人：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.shop.senderName}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发货电话：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.shop.senderTel}}</div>
                                    </el-col>
                                </el-row>
                            </section>
                            <section>
                                <el-row>
                                    <h2 class="sub-header">收货人信息</h2>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">收货人：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.customerReceivingInfo.consigneeName}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">地址：</div>
                                    </el-col>
                                    <el-col :span="20">
                                        <div class="label item">{{formEntity.customerReceivingInfo.shippingAddress}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">手机号：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.customerReceivingInfo.contactNumber}}</div>
                                    </el-col>
                                </el-row>
                            </section>
                            <section>
                                <el-row>
                                    <h2 class="sub-header">支付方式</h2>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">支付方式：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.paymentType}}</div>
                                    </el-col>
                                </el-row>
                            </section>
                            <section>
                                <el-row :gutter="40">
                                    <h2 class="sub-header">发票信息</h2>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发票类型：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.tax.taxType}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发票抬头：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.tax.taxTitle}}</div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-col :span="4">
                                        <div class="label">发票内容：</div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="label item">{{formEntity.tax.taxContent}}</div>
                                    </el-col>
                                </el-row>
                            </section>
                            <section>
                                <el-row>
                                    <h2 class="sub-header">商品清单</h2>
                                </el-row>
                                <el-row :gutter="40">
                                    <el-table :data="formEntity.orderItemsList" highlight-current-row style="width: 100%;">
                            
                                        <el-table-column prop="name" label="商品名称" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="bn" label="商品货号" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="salePrice" label="销售单价" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="weight" label="商品重量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="finalPrice" label="实付价格" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="buyNum" label="数量" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="discountsPrice" label="优惠金额" show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column prop="subtotal" label="小计" show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                                <el-row :gutter="40">
                                    <div class="label item" style="float:right">订单总重量：{{formEntity.payList.weightCount}}</div>
                                </el-row>
                            </section>
                            <section>
                                <div class="label-footer item">商品金额：<span>+¥{{formEntity.payList.goodsAmount}}</span></div>
                                <div class="label-footer item">运费：<span>+¥{{formEntity.payList.freightAmount}}</span></div>
                                <div class="label-footer item">关税：<span>+¥{{formEntity.payList.taxationAmount}}</span></div>
                                <div class="label-footer item">订单优惠：<span>-¥{{formEntity.payList.orderDiscountAmount}}</span></div>
                                <div class="label-footer item">支付优惠：<span>-¥{{formEntity.payList.paymentDiscountAmount}}</span></div>
                                <div class="label-footer item">总金额：<span>¥{{formEntity.payList.orderAmount}}</span></div>
                                <div class="label-footer item">已付金额：<span>¥{{formEntity.payList.paidAmount}}</span></div>
                            </section>
                        </div>   
                    </section>
                </el-tab-pane>
                <el-tab-pane label="订单备注" name="second">
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="comment">
                                </el-input>
                            </el-row>
                            <el-row :gutter="40" style="padding:10px 0">
                                <el-button type="primary" @click="submitComment">提交</el-button>
                            </el-row>
                            
                        </div>   
                    </section>
                    <section class="pCtn">
                        <el-table :data="commentList" highlight-current-row style="width: 100%;">
                            <el-table-column prop="operationName" label="操作人" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="createTime" label="备注时间" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="comment" label="备注内容" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </section>
                </el-tab-pane>
            </el-tabs>

            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-button class="primary" @click="goBack(2)">返回订单列表</el-button>
            </el-row>
        </section>
        
    </div>
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import Util from '@/assets/js/util.js'
    export default {
        components:{
            breakCrumb
        },
        data(){
            return {
                currentPage:1,
                orderId:1,
                shopId:1,
                titles:[],
                activeName:'first',
                comment:'',
                commentList:[],
                formEntity:{
                    member:{},
                    shippingInfo:{},
                    logisticsInfo:[],
                    shop:{},
                    customerReceivingInfo:{},
                    tax:{},
                    orderItemsList:[],
                    payList:{}
                }
            }
        },
        methods:{
            submitComment:function(){
                var url=this.$apiUrl.setOrderMarkUrl;
                var params={
                    comment:this.comment,
                    orderId:this.orderId
                }
                this.$ajax.post(url,params).then(res=>{
                    if(res.error==0){
                        this.$message({
                            type:'success',
                            message:'提交成功'
                        })
                        //重新获取备注列表
                        this.getCommentList()
                    }
                })
            },
            goBack:function(type){
                if(type==1){
                    this.$router.push({name:'退款单管理列表', query:{currentPage:this.currentPage} })
                }else{
                    this.$router.push({name:'订单管理列表'})
                }
            },
            getDetail:function(orderId){
                var url=this.$apiUrl.getOrderDetailUrl;
                var params={
                    orderId:orderId
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.formEntity=Object.assign({},res.data);
                    }
                })
            },
            getCommentList:function(orderId,shopId){
                var url=this.$apiUrl.getOrderMarkListUrl;
                var params={
                    orderId:orderId,
                    shopId:shopId
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        res.data.forEach(v=>{
                            v.createTime=Util.getLocalTime(v.createTime);
                        })
                        this.commentList=res.data;
                    }
                })
            }
            
        },
        mounted(){
            if(this.$route.query){
                var entity=JSON.parse(this.$route.query.entity);
                this.orderId=entity.orderId;
                this.shopId=entity.shopId;
                this.currentPage = this.$route.query.currentPage
            }
            this.titles=[{id:1,name:'售后'},{id:2,name:'退款单管理'},{id:3,name:'订单查看'}];
            this.getDetail(this.orderId);
            //获取备注列表
            this.getCommentList(this.orderId,this.shopId);
        }
    }
</script>
<style scoped lang="scss">
.title{
    padding-left:25px;
    border:1px solid #cccccc;
    .header{
        color:#666666;
    }
    
}
.mod-toolbar{
    
}
.pCtn{
    padding:0 25px;
    box-sizing:border-box;
}
.header{
    font-size:16px;
    color:#33bbab;
    background-color:#ffffff;
}
.sub-header{
    height:40px;
    line-height:40px;
    font-size:14px;
    color:#33bbab;
    background-color:#ffffff;
    padding-left:20px;
}

.label{
    font-size:14px;
    color:#666666;
    // height:40px;
    line-height:40px;
}
.label-footer{
    font-size:14px;
    color:#666666;
    height:30px;
    line-height:30px;
    text-align:right;
    span{
        color:#f57575;
    }
}
.mod-toolbar{
    background-color:#ffffff;
    padding:10px 25px 0px 25px;
    background-color:#ffffff;
    margin-left:0px!important;
    .el-row{
        border-bottom:1px solid #f3f5f7;
        margin-left:0px!important;
        margin-right:0px!important;
        .el-col{
            padding-left:0px;
            padding-right:0px;
        }
    }
}
</style>