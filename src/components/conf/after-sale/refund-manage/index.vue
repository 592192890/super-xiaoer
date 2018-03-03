<template>
    <div class="active-order">
        <break-crumb :titles="titles"></break-crumb>
        <section class="header" style="margin-top:20px">
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-col :span="2">
                    <div class="label">查询</div>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="searchEntity.shopName" placeholder="显示查询店铺" :disabled="true">
                        <el-button slot="append" @click="isShowSearchShopDialog=true">选择店铺</el-button>
                    </el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                    <div class="label">状态</div>
                </el-col>
                <el-col :span="3">
                    <el-select v-model="searchEntity.status">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-select v-model="searchEntity.type">
                        <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="searchEntity.keyword" placeholder="请输入订单号/退款单号/会员用户名/"></el-input>
                </el-col>
            </el-row>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-col :span="2">
                    <div class="label">申请时间</div>
                </el-col>
                <el-col :span="4">
                    <el-date-picker style="width:100%"
                        v-model="searchEntity.beginTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="startTimeOptions">
                    </el-date-picker>
                </el-col>
                <div style="float:left; height:36px;line-height:36px; padding:0 20px">——</div>
                <el-col :span="4">
                    <el-date-picker style="width:100%"
                        v-model="searchEntity.endTime"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="endTimeOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-button type="primary" @click="search()">搜索</el-button>
                    <el-button type="primary" class="export-btn" @click="exportOrders" v-if="buttonArr.indexOf('bt-export')!=-1">导出</el-button>
                    <el-button type="primary" class="clear-btn" @click="clearSearch">清空</el-button>
                </el-col>
            </el-row>
        </section>
        <section >
            <div class="list-table">
                <div class="table-header">
                    <div class="header-ceil">退款单号</div>
                    <div class="header-ceil">订单编号</div>
                    <div class="header-ceil">退款申请金额</div>
                    <div class="header-ceil w1">商家调整</div>
                    <div class="header-ceil">退款额</div>
                    <div class="header-ceil w1">退款类型</div>
                    <div class="header-ceil w1">支付方式</div>
                    <div class="header-ceil w1">状态</div>
                    <div class="header-ceil w2">申请时间</div>
                    <div class="header-ceil w2">操作</div>
                </div>
                <ul class="table-content" v-loading="listLoading">
                    <li v-for="item in list" v-if="list.length&&list.length>0" :key="item.refundId">
                        <div class="up">
                            <div class="ceils">{{item.refundId}}</div>
                            <div class="ceils">{{item.orderId}}</div>
                            <div class="ceils">{{(parseFloat(item.realRefundAmount) + parseFloat(item.claimAmount)-parseFloat(item.expressAmount)).toFixed(2)}}</div>
                            <div class="ceils w1">{{item.claimAmount}}</div>
                            <div class="ceils">
                                <div style="line-height:30px;">{{item.realRefundAmount}}</div>
                                <div style="line-height:20px; margin-top:-10px">(含运费{{item.expressAmount}}元)</div></div>
                            <div class="ceils w1">{{item.sourceTypeName}}</div>
                            <div class="ceils w1">{{item.paymentName || ""}}</div>
                            <div class="ceils w1">{{item.statusName}}</div>
                            <div class="ceils w2">{{item.createTime}}</div>
                            <div class="ceils w2">
                                <span class="checkOrder" v-on:click="checkOrder(item)" v-if="buttonArr.indexOf('bt-view')!=-1">查看订单</span>
                                <span class="refundDetails" v-on:click="refundDetailToggle(item)" :refundId="item.refundId" v-if="buttonArr.indexOf('bt-detail')!=-1">退款详情</span>
                                <span class="goRefund" v-on:click="goRefund(item)" v-if="buttonArr.indexOf('bt-refund')!=-1&& item.status==0">退款</span>
                            </div>
                        </div>
                        <detail :id="item.refundId" :currentPage="currentPage" v-if="item.show"></detail>
                    </li>
                    <li  class="no-data" v-if="!list.length">暂无数据</li>
                </ul>
            </div>
            <!--工具条-->
            <section class="ui-table">
                <el-col :span="24" class="mod-toolbar">
                    <el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
                    </el-pagination>
                </el-col>
            </section>
        </section>
        <el-dialog
            title="退款"
            :visible.sync="cancelDialogVisible"
            size="tiny">
            <el-form ref="ruleForm" label-width="80px" label-position="left" class="form">
                <div class="refund-tip" >确定要退款吗？</div>
                <el-form-item label="退款意见" class="refund-comment">
                    <el-input type="textarea" v-model="remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectRefund">拒绝退款</el-button>
                <el-button type="primary" @click="confirmRefund" class="confirm-btn">确认退款</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="确定"
            :visible.sync="cancelDialog"
            size="tiny">
            <el-form ref="ruleForm" label-width="80px" label-position="left" class="form">
                <div class="refund-tip" >{{ refundInfo }}</div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="onConfirm">确定</el-button>
                <el-button type="primary" @click="onReject" class="confirm-btn">取消</el-button>
            </span>
        </el-dialog>
        <search-shop-dialog :isShow="isShowSearchShopDialog" v-on:watchDialog="closeDialog" v-on:passSelectShop="showRelatedShop"></search-shop-dialog>
    </div>
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import searchShopDialog from '../searchShopDialog'
    import detail from './detail'
    import Permission from '@/assets/js/permission-util.js'
    import querystring from 'querystring'
    export default {
        components:{
            breakCrumb,
            searchShopDialog,
            detail
        },
        data(){
            let self = this;
            return {
                listLoading:true,
                findOutData:true,
                refundInfo:'',
                currentRow:-1,
                cancelDialogVisible:false,
                cancelDialog:false,
                titles:[{id:1,name:'售后'},{id:2,name:'退款单管理'}],
                isShowSearchShopDialog:false,
                currentPage:1,
                total:2,
                pageSize:20,
                buttonArr:[],
                rules:[],
                isAgree:false,
                statusList:[
                    {
                        label:'等待退款',
                        value: 0
                    },{
                        label:'退款中',
                        value: 100
                    },{
                        label:'退款成功',
                        value: 200
                    },{
                        label:'退款失败',
                        value: 300
                    }
                ],
                typeList:[
                    {
                        label:'订单号',
                        value: 1
                    },{
                        label:'退款单号',
                        value: 2
                    },{
                        label:'会员用户名',
                        value: 3
                    }
                ],
                searchEntity:{
                    shopId:'',
                    shopName:'',
                    endTime:'',
                    beginTime:'',
                    status:null,
                    type:1,
                    keyword:''
                },
                list:[],
                remark:'',
                refundId:1,
                startTimeOptions:{
                    disabledDate(time) {
                        if(self.searchEntity.endTime){
                            return (time.getTime() > self.searchEntity.endTime);
                        }else{
                            return false;
                        }
                        
                    }
                },
                endTimeOptions:{
                    disabledDate(time) {
                        if(self.searchEntity.beginTime){
                            return (time.getTime() < self.searchEntity.beginTime);
                        }else{
                            return false;
                        }
                        
                    }

                }
            }
        },
        methods:{
            checkOrder(item){
                this.$router.push({name:'交易订单查看',query:{entity:JSON.stringify(item), currentPage:this.currentPage}})
            },
            refundDetailToggle(item){
                item.show = !item.show
            },
            goRefund(item){
                this.cancelDialogVisible = true
                this.refundId = item.refundId
            },
            confirmRefund(){
                this.cancelDialog = true
                this.refundInfo = '确定要同意退款吗？'
                this.isAgree = true
            },
            rejectRefund(){
                this.cancelDialog = true
                this.refundInfo = '确定要拒绝退款吗？'
                this.isAgree = false
            },
            onConfirm(){
                let url= this.$apiUrl.agreeRefundUrl;
                let param=Object.assign({},{
                    isAgree:this.isAgree,
                    refundId:this.refundId,
                    remark:this.remark
                });
                this.$ajax.get(url,param).then(res=>{
                    if(res.error==0){
                        this.$message({
                            message: res.msg || '提交成功',
                            type: 'success'
                        });
                        this.remark = ''
                    }
                    this.cancelDialog = false
                    this.cancelDialogVisible = false
                })
            },
            onReject(){
                this.cancelDialog = false
                this.isAgree = false
            },
            closeDialog:function(status){
                this.isShowSearchShopDialog=status;
            },
            showRelatedShop:function(entity){
                this.searchEntity.shopName=entity.shopName;
                this.searchEntity.shopId=entity.id;
                this.isShowSearchShopDialog=false;
            },

            clearSearch:function(){
                this.searchEntity={
                    shopId:'',
                    shopName:'',
                    endTime:'',
                    beginTime:'',
                    status:null,
                    type:1,
                    keyword:''
                }
            },

            exportOrders:function(){
                let url= this.$apiUrl.exportRefundUrl;
                let param=Object.assign({},this.searchEntity);
                var params=querystring.stringify(param);
                window.open(url+"?"+params);
            },

            initData(list){
                list.forEach(item=>{
                    item.show = false
                })
                return list
            },
            search:function(index){
                this.listLoading=true;
                let url= this.$apiUrl.getRefundListUrl;

                let tempObj=Object.assign({},this.searchEntity);
                if(tempObj.beginTime){
                    tempObj.beginTime=Date.parse(tempObj.beginTime);
                }
                if(tempObj.endTime){
                    tempObj.endTime=Date.parse(tempObj.endTime)+24*3600*1000-1
                }
                let param=Object.assign({},{
                    currentPage:index||1,
                    pageSize:this.pageSize,
                },tempObj);
                this.$ajax.get(url,param).then(res=>{
                    if(res.error==0){
                        this.list=this.initData(res.data.list);
                        this.total=res.data.pageInfo.totalRow;
                        this.currentPage=res.data.pageInfo.currentPage;
                        this.listLoading=false;
                    }
                    
                })
            },
            handleCurrentChange:function(index){
                this.search(index);
            },

            handleCancel:function(index,row){

            }   
        },
        mounted(){
            let index = ''
            //获取哪一些按钮可以展示
		    this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
		    if(this.$route.query){
                index = this.$route.query.currentPage
            }
            this.search(index)
        }
    }
</script>
<style scoped lang="scss">
    .form{
        width:100%;
        .refund-tip{
            width:100%;
            text-align:center;
            padding:0 0 20px;
            font-size:14px;
            color:#333;
        }
        .refund-comment{
            width:80%;
            margin:0 auto
        }
    }
    
    .list-table{
        width:100%;
        .table-header{
            width:100%;
            overflow:hidden;
            background-color:#fff;
            padding:0 10px;
            box-sizing:border-box;
            .header-ceil{
                float:left;
                width:10%;
                height:40px;
                line-height:40px;
                color:#999;
                text-align:center;
                word-wrap: normal;
                text-overflow: ellipsis;
                box-sizing: border-box;
                font-weight: bold;
                font-size:14px;
                &.w1{
                    width:7%
                }
                &.w2{
                    width:16%
                }
            }
        }
        .table-content{
            width:100%;
            li{
                width:100%;
                padding:0 10px;
                box-sizing:border-box;
                background-color:#fff;
                list-style-type:none;
                margin:5px 0;
                .up{
                    width:100%;
                    overflow:hidden;
                    .ceils{
                        float:left;
                        width:10%;
                        text-align:center;
                        line-height:40px;
                        text-overflow: ellipsis;
                        white-space:nowrap;
                        //overflow:hidden;
                        span{
                            padding:0 10px;
                            cursor:pointer;
                            &.checkOrder{
                                color:#30b9a5
                            }
                            &.refundDetails{
                                color:#9d8ef1
                            }
                            &.goRefund{
                                color:#f57575
                            }
                        }
                        &.w1{
                            width:7%
                        }
                        &.w2{
                            width:16%
                        }
                    }
                }
            }
            .no-data{
                width:100%;
                padding:20px 0;
                background:#fff;
                text-align:center;
                border-radius:5px;
            }
        }
    }
    .header{
        background-color:#ffffff;
    }
    .mod-toolbar{
        background-color:#ffffff;
        margin-left:0px!important;
    }
    .export-btn{
        background-color:#33bbab;
    }
    .clear-btn{
        background-color:#ffffff;
        border:none;
        color:#333333;
    }
    .view-btn{
        color:#33bbab;
        margin-right:10px;
        cursor:pointer;
    }
    .shelve-btn{
        color:#f57575;
        cursor:pointer;
    }
    .label{
        height:36px;
        line-height:36px;
        font-size:14px;
    }
</style>