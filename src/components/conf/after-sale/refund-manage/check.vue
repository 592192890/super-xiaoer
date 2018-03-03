<template>
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section class="header" style="margin-top:20px">
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-button class="primary" @click="goBack">关闭</el-button>
            </el-row>

             <el-tabs type="border-card" v-model="activeName" @tab-click="toggleTab">
                <el-tab-pane label="申请单详情" name="first">
                    <section class="title">
                        <div class="line">
                            <span class="name">申请单号 : </span><span class="ctn">{{reverseApply.reverseApplyId}}</span>
                        </div>
                        <div class="line">
                            <span class="name">订单号 : </span><span class="ctn">{{reverseApply.orderId}}</span>
                        </div>
                        <div class="line">
                            <span class="name">申请单类型 : </span><span class="ctn">{{reverseApply.reverseTypeName}}</span>
                        </div>
                        <div class="line">
                            <span class="name">申请单状态 : </span><span class="ctn">{{reverseApply.statusName}}</span>
                        </div>
                        <div class="line">
                            <span class="name">申请时间 : </span><span class="ctn">{{reverseApply.createTime}}</span>
                        </div>
                    </section>
                    <section class="mod-toolbar">
                        <el-row>
                            <h1 class="header">申请单处理记录</h1>
                        </el-row>
                        <el-row :gutter="40" v-for="item, key, index in logList" :key="item.logId">
                            <el-col :span="4">
                                <div class="label">{{item.createTime}}</div>
                            </el-col>
                            <el-col :span="2">
                                <div class="label">{{item.operatorRole}}</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="label item">{{item.context}}</div>
                            </el-col>
                        </el-row>
                    </section>
                    <section class="mod-toolbar">
                        <el-row>
                            <h1 class="header">退货商品申请</h1>
                        </el-row>
                        <el-row>
                            <el-table :data="reverseApply.applyItems" highlight-current-row style="width: 100%;">
                                <el-table-column prop="productName" label="商品名称" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="bn" label="货号" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="reverseQuantity" label="申请数量" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="salePrice" label="销售价格" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="buyPrice" label="实付单格" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <div class="label-footer item">退货理由：<span>{{reverseApply.reverseReason}}</span></div>
                        <div class="label-footer item">详细描述：<span>{{reverseApply.reverseDisc}}</span></div>
                        <div class="label-footer item">凭证：<span>{{reverseApply.imgPath}}</span></div>
                        <el-row>
                            <h2 class="sub-header">物流信息</h2>
                        </el-row>
                        <el-row :gutter="40">
                            <el-col :span="3">
                                <div class="label">物流公司：</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="label item">{{reverseApply.expressCompanyName}}</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40">
                            <el-col :span="3">
                                <div class="label">物流单号：</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="label item">{{reverseApply.expressNo}}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <h2 class="sub-header">卖家调整退款/商城调整退款</h2>
                        </el-row>
                        <el-row :gutter="40">
                            <el-col :span="3">
                                <div class="label">调整类型：</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="label item">扣款</div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="40">
                            <el-col :span="3">
                                <div class="label">调整金额：</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="label item">{{reverseApply.claimAmount}}</div>
                            </el-col>
                        </el-row>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="申请单备注" name="second">
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
                            <el-table-column prop="recordCreateTime" label="备注时间" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="comment" label="备注内容" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </section>
                </el-tab-pane>
            </el-tabs>
        </section>
        
    </div>
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    export default {
        components:{
            breakCrumb
        },
        data(){
            return {
                currentPage:1,
                reverseId:1,
                orderId:1,
                titles:[{id:1,name:'售后'},{id:2,name:'退款单管理'},{id:3,name:'售后单查看'}],
                activeName:'first',
                reverseApply:{},
                logList:[],
                commentList:[],
                comment:'',
                textarea:''
            }
        },
        mounted(){
            if(this.$route.query.reverseId){
                this.reverseId=this.$route.query.reverseId;
                this.orderId=this.$route.query.orderId;
                this.currentPage=this.$route.query.currentPage;
                this.getDetail();
                this.getRemarks()
            }

        },
        methods:{
            submitComment(){
                var url=this.$apiUrl.submitOrderMarkUrl;
                var params={
                    comment:this.comment,
                    orderId:this.orderId,
                    reverseApplyId:this.reverseId
                }
                this.$ajax.post(url,params).then(res=>{
                    if(res.error==0){
                        this.$message({
                            type:'success',
                            message:'提交成功'
                        })
                        //重新获取备注列表
                        this.getRemarks()
                    }
                })
            },
            toggleTab(){
                
            },

            getRemarks(reverseId){
                let url=this.$apiUrl.getAfterSaleRemarksUrl;
                let params={
                    reverseApplyId:this.reverseId
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.commentList= res.data.list;
                        this.comment = ''
                    }
                })
            },

            getDetail(){
                let url=this.$apiUrl.getAfterSaleDetailUrl;
                let params={
                    reverseId:this.reverseId
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.reverseApply=Object.assign({},res.data.reverseApply);
                        this.logList = Object.assign({},res.data.logList);
                    }
                })
            },
            goBack(){
                this.$router.push({name:'退款单管理列表', query:{currentPage:this.currentPage}})
            }
        }
    }
</script>
<style scoped lang="scss">
.title{
    padding:0 25px;
    .line{
        width:100%;
        color:#333;
        padding:10px 0;
        font-size:14px;
        border-bottom:1px solid #f3f5f7;
        .name{
            width:100px;
            display:inline-block;
        }
    }
}
.mod-toolbar{
    
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
    height:40px;
    line-height:40px;
}
.label-footer{
    font-size:14px;
    color:#666666;
    height:40px;
    line-height:40px;
    text-align:left;
    padding:0 20px;
    box-sizing:border-box;
    border-bottom:1px solid #f3f5f7;
    span{
        // color:#f57575;
    }
}
.pCtn{
    padding:0 25px;
    box-sizing:border-box;
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