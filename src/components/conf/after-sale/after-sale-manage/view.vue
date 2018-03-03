<template>
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section class="header" style="margin-top:20px">
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-button class="primary" @click="goBack">返回申请单列表</el-button>
            </el-row>

             <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="申请单详情" name="first">
                    <section>
                        <div class="title">
                            <el-row>
                                <el-col :span="3">
                                    <div class="label">申请单号：</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="label">{{formEntity.reverseApply.reverseApplyId}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <div class="label">订单号：</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="label">{{formEntity.reverseApply.orderId}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <div class="label">申请单类型：</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="label">{{formEntity.reverseApply.reverseTypeName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <div class="label">申请单状态：</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="label">{{formEntity.reverseApply.statusName}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <div class="label">申请时间：</div>
                                </el-col>
                                <el-col :span="4">
                                    <div class="label">{{formEntity.reverseApply.createTime}}</div>
                                </el-col>
                            </el-row>
                        </div>
                        
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">申请单处理记录</h1>
                            </el-row>
                            <el-row :gutter="40" v-for="item in formEntity.logList" :key="item.logId">
                                <el-col :span="4">
                                    <div class="label">{{item.createTime}}</div>
                                </el-col>
                                <el-col :span="2">
                                    <div class="label item">{{item.operatorRole}}</div>
                                </el-col>
                                <el-col :span="18">
                                    <div class="label item">{{item.context}}</div>
                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">退货申请商品</h1>
                            </el-row>
                            <el-row :gutter="40">
                                <el-table :data="formEntity.reverseApply.applyItems" highlight-current-row style="width: 100%;margin-left:20px">
                        
                                    <el-table-column prop="productName" label="商品名称" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="bn" label="货号" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="reverseQuantity" label="申请数量" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="salePrice" label="销售单价" show-overflow-tooltip>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                            <el-row :gutter="4">
                                <el-col :span="3">
                                    <div class="label-footer">退货理由：</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="label-footer">{{formEntity.reverseApply.reverseReason}}</div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="4">
                                <el-col :span="3">
                                    <div class="label-footer">详细描述：</div>
                                </el-col>
                                <el-col :span="14">
                                    <div class="label-footer">{{formEntity.reverseApply.reverseDisc}}</div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="4">
                                <el-col :span="3">
                                    <div class="label-footer img">凭证：</div>
                                </el-col>
                                <el-col :span="21">
                                    <div class="label-footer img">
                                        <img style="width:100px;height:100px" :src="item" v-for="item in formEntity.reverseApply.imgPath" :key="item">
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">物流信息</h1>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">物流公司</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.reverseApply.expressCompanyName}}</div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">物流单号</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.reverseApply.expressNo}}</div>
                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <h1 class="header">买家调整退款/商城调整退款</h1>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">调整类型</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">扣款</div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="40">
                                <el-col :span="4">
                                    <div class="label">调整金额</div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="label item">{{formEntity.reverseApply.claimAmount}}</div>
                                </el-col>
                            </el-row>
                        </div>   
                    </section>
                </el-tab-pane>
                <el-tab-pane label="申请单备注" name="second">
                    <section>
                        <div class="mod-toolbar">
                            <el-row>
                                <el-input type="textarea" :rows="2" v-model="comment" placeholder="请输入1-250个字符">
                                </el-input>
                            </el-row>
                            <el-row :gutter="40">
                                <el-button type="primary" @click="submitComment">提交</el-button>
                            </el-row>
                            
                        </div>   
                    </section>
                    <section>
                        <el-table :data="commentList" highlight-current-row style="width: 100%;margin-left:20px">
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
                <el-button class="primary" @click="goBack">返回申请单列表</el-button>
            </el-row>
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
                titles:[{id:1,name:'售后'},{id:2,name:'售后申请单管理'},{id:3,name:'售后单查看'}],
                activeName:'first',
                comment:'',
                commentList:[],
                formEntity:{
                    logList:[],
                    refundLogList:[],
                    refund:{},
                    reverseApply:{}
                },
            }
        },
        methods:{
            submitComment:function(){
                if(!/^.{1,250}$/m.test(this.comment)){
                    this.$message({
                        type:'warning',
                        message:'请输入1-250个字符的备注信息'
                    })
                    return;
                }
                var url=this.$apiUrl.addApplyOrderCommentUrl;
                var params={
                    comment:this.comment,
                    orderId:this.formEntity.reverseApply.orderId,
                    reverseApplyId:this.formEntity.reverseApply.reverseApplyId
                }
                this.$ajax.post(url,params).then(res=>{
                    if(res.error==0){
                        this.$message({
                            type:"success",
                            message:'提交成功'
                        })

                        this.getCommentList(this.formEntity.reverseApply.reverseApplyId)
                    }
                })
            },
            goBack:function(){
                
                this.$router.push({name:'售后申请单管理列表'})
                
            },
            getDetail:function(id){
                var url=this.$apiUrl.getApplyOrderDetailUrl;
                var params={
                    reverseId:id
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.formEntity=res.data;
                    }
                })
            },
            getCommentList:function(id){
                var url=this.$apiUrl.getApplyOrderCommentListUrl;
                var params={
                    reverseApplyId:id
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.commentList=res.data.list;
                    }
                })
            }
        },
        mounted(){
            if(this.$route.params.row){
                sessionStorage.setItem('applyItemId',this.$route.params.row.reverseApplyId)
            }
            var applyItemId=sessionStorage.getItem('applyItemId')
            this.getDetail(applyItemId)
            this.getCommentList(applyItemId)
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
    text-align:left;
    padding-left:20px;
    &.img{
        height:auto;
        img{
            display:inline-block;
            margin-right:10px;
        }
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