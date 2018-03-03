<template>
    <div class="active-order">
		<break-crumb :titles="titles"></break-crumb>
		<section class="header" style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="5">
				<el-col :span="1">
					<div class="label">查询</div>
				</el-col>
				<el-col :span="6">
					<el-input v-model="searchEntity.shopName" placeholder="显示查询店铺" :disabled="true">
						<el-button slot="append" @click="isShowSearchShopDialog=true">选择店铺</el-button>
					</el-input>
				</el-col>
				<el-col :span="2" :offset="2">
					<div class="label">订单状态</div>
				</el-col>
				<el-col :span="3">
                    <el-select v-model="searchEntity.orderStatus">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in orderStatusList" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2" :offset="2">
					<div class="label">付款方式</div>
				</el-col>
				<el-col :span="3">
                    <el-select v-model="searchEntity.paymentType">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in paymentTypeList" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
			</el-row>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
				<el-col :span="2">
					<div class="label">订单来源</div>
				</el-col>
				<el-col :span="5">
					<el-select v-model="searchEntity.platformSource">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in platformSourceList" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
				</el-col>
				<el-col :span="2" :offset="2">
					<div class="label">下单时间</div>
				</el-col>
				<el-col :span="3">
					<el-date-picker style="width:100%"
                        v-model="searchEntity.orderStartDate"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="startTimeOptions">
                    </el-date-picker>
				</el-col>
                <div style="float:left; height:36px;line-height:36px; padding:0 20px">——</div>
                <el-col :span="3">
					<el-date-picker style="width:100%"
                        v-model="searchEntity.orderEndDate"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="endTimeOptions">
                    </el-date-picker>
				</el-col>

			</el-row>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-col :span="3">
					<el-select v-model="searchEntity.exParamName">
                        <el-option v-for="item in exParamList" :key="item.id" :label="item.value" :value="item.id">
                        </el-option>
                    </el-select>
				</el-col>
				<el-col :span="4">
					<el-input v-model="searchEntity.exParamValue" placeholder="请输入订单号/收货人手机/会员用户名/收货人"></el-input>
				</el-col>
                <el-col :span="6" :offset="2">
					<el-button type="primary" @click="search(1)">搜索</el-button>
                    <el-button type="primary" class="export-btn" @click="exportOrders" v-if="buttonArr.indexOf('bt-export')!=-1">导出</el-button>
					<el-button type="primary" class="clear-btn" @click="clearSearch">清空</el-button>

				</el-col>
            </el-row>
		</section>
        <section class="result" v-loading="listLoading">
            <div class="result-header">结果列表</div>
            <div class="result-content">
                <span>订单总笔数：{{statistics.totalCount}}</span>
                <span>订单总金额：{{statistics.totalAmount}}元</span>
                <span>已付款笔数：{{statistics.paidCount}}</span>
                <span>已付款金额：{{statistics.paidAmount}}元</span>
            </div>
        </section>
		<section class="ui-table">
			<el-table :data="formEntity" highlight-current-row style="width: 100%;" v-loading="listLoading">
				<el-table-column prop="orderId" label="订单号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="shopInfo.shopName" label="店铺" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="memberName" label="买家" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="orderCreateTime" label="下单时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="totalPay" label="订单总额" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="payment" label="付款方式" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="orderStatus" label="订单状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template scope="scope">
						<span class="view-btn" @click="handleView(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-view')!=-1">查看</span>
						<span class="cancel-btn" @click="handleCancel(scope.$index, scope.row)" v-if="(scope.row.orderStatus=='待付款'||scope.row.orderStatus=='已付款'||scope.row.orderStatus=='待自提')&&buttonArr.indexOf('bt-cancel')!=-1">取消</span>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="mod-toolbar">

				<el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
				</el-pagination>
			</el-col>
		</section>
		<search-shop-dialog :isShow="isShowSearchShopDialog" v-on:watchDialog="closeDialog" v-on:passSelectShop="showRelatedShop"></search-shop-dialog>
        <el-dialog
            title="取消订单"
            :visible.sync="cancelDialogVisible"
            size="small" class="cancel-dialog">
			<div>请填写取消订单原因：</div>
            <el-radio-group v-model="checkedCancelReasonId">
                <el-radio :label="item.id" v-for="item in cancelReasonList" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
            <el-input type="textarea" v-model="typedCancelReason" v-if="checkedCancelReasonId=='11'" placeholder="请输入1-250个字符"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancelItem" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import searchShopDialog from '../searchShopDialog'
    import Permission from '@/assets/js/permission-util.js'
    import querystring from 'querystring'
    import Util from '@/assets/js/util.js'
    var cancelOrderId;
    var firstExParamName;
    export default {
        components:{
            breakCrumb,
            searchShopDialog
        },
        data(){
            let self = this;
            return {
                titles:[{id:1,name:'交易'},{id:2,name:'订单管理'}],
                buttonArr:[],
                isShowSearchShopDialog:false,
                cancelDialogVisible:false,
                currentPage:1,
                listLoading: true,
                total:0,
                pageSize:20,

                checkedCancelReasonId:'11',
                typedCancelReason:'',
                cancelReasonList:[
                    {id:'1',name:'价格太高了'},
                    {id:'2',name:'拍错了，重新再拍'},
                    {id:'3',name:'服务不好'},
                    {id:'4',name:'不想买了'},
                    {id:'5',name:'收货人信息有误'},
                    {id:'6',name:'送货时间太长'},
                    {id:'7',name:'商品缺货'},
                    {id:'8',name:'添加或删除商品'},
                    {id:'9',name:'发票信息有误/发票未开'},
                    {id:'10',name:'没有优惠券'},
                    {id:'11',name:'其他原因'}
                ],
                orderStatusList:[],
                paymentTypeList:[],
                platformSourceList:[],
                exParamList:[],

                statistics:{
                    totalCount:'',
                    totalAmount:'',
                    paidCount:'',
                    paidAmount:''

                },
                formEntity:[],
                searchEntity:{
                    shopId:'',
                    shopName:'',
                    orderEndDate:'',
                    orderStartDate:'',
                    orderStatus:null,
                    exParamName:'',
                    exParamValue:'',
                    paymentType:null,
                    platformSource:null
                },
                startTimeOptions:{
                    disabledDate(time) {
                        if(self.searchEntity.orderEndDate){
                            return (time.getTime() > self.searchEntity.orderEndDate);
                        }else{
                            return false;
                        }

					}
                },
                endTimeOptions:{
                    disabledDate(time) {
                        if(self.searchEntity.orderStartDate){
                            return (time.getTime() < self.searchEntity.orderStartDate);
                        }else{
                            return false;
                        }

					}

                }
            }
        },
        methods:{
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
                    orderEndDate:'',
                    orderStartDate:'',
                    orderStatus:null,
                    exParamName:firstExParamName,
                    exParamValue:'',
                    paymentType:null,
                    platformSource:null
                }

            },
            exportOrders:function(){
                var url=this.$apiUrl.exportsOrdersUrl;

                var tempObj=Object.assign({},this.searchEntity);
                if(tempObj.orderStartDate){
                    tempObj.orderStartDate=Date.parse(tempObj.orderStartDate);
                }
                if(tempObj.orderEndDate){
                    tempObj.orderEndDate=Date.parse(tempObj.orderEndDate)
                }

                var params=querystring.stringify(tempObj);

                window.open(url+'?'+params)
            },
            search:function(index){
                this.listLoading=true;

                var url=this.$apiUrl.getOrderListUrl;

                var tempObj=Object.assign({},this.searchEntity);
                if(tempObj.orderStartDate){
                    tempObj.orderStartDate=Date.parse(tempObj.orderStartDate);
                }
                if(tempObj.orderEndDate){
                    tempObj.orderEndDate=Date.parse(tempObj.orderEndDate)
                }

                var param=Object.assign({},{
                    currentPage:index||1,
                    pageSize:this.pageSize,
                },tempObj);

                setTimeout(function(){
                    this.$ajax.get(url,param).then((res)=>{
                        if(res.error==0){
                            res.data.list.forEach(v=>{
                                v.orderCreateTime=Util.getLocalTime(v.orderCreateTime)

                            })
                            this.formEntity=res.data.list;

                            this.statistics=Object.assign({},res.data.statistics);

                            this.total=res.data.totalRow;
                            this.currentPage=res.data.currentPage;
                            this.listLoading=false;

                        }

                    })
                }.bind(this),2000)


            },
            handleCurrentChange:function(index){
                this.search(index);
            },

            handleView:function(index,row){
                this.$router.push({name:'订单管理查看',params:{entity:row}})

            },
            handleCancel:function(index,row){
                this.cancelDialogVisible=true;

                cancelOrderId=row.orderId;

                this.typedCancelReason="";
            },
            cancelItem:function(){

                var url=this.$apiUrl.cancelOrderUrl;

                var reasons="";
                if(this.checkedCancelReasonId!=11){
                    this.cancelReasonList.forEach(v=>{
                        if(v.id==this.checkedCancelReasonId){
                            reasons=v.name
                        }
                    })
                }else{
                    if(!/^.{1,250}$/m.test(this.typedCancelReason)){
                        this.$message({
                            type:'warning',
                            message:'请输入1-250个字符'
                        })
                        return;
                    }
                    reasons=this.typedCancelReason;
                }
                var orderIds=[];
                orderIds.push(cancelOrderId)
                var params={
                    orderIds:JSON.stringify(orderIds),
                    reason:reasons
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.$message({
                            type:"success",
                            message:'取消成功'
                        })
                        this.search(this.currentPage)
                    }
                })
                this.cancelDialogVisible=false;
            },
            getSelectAll:function(type){
                var url=this.$apiUrl.getEnumSelectUrl;
                var params={
                    type:type
                }
                return this.$ajax.get(url,params)
            }




        },
        mounted(){
            //获取哪一些按钮可以展示
		    this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);

            this.search();
            this.getSelectAll('orderStatusCommon').then(res=>{
                if(res.error==0){
                    this.orderStatusList=res.data;
                }
            })
            this.getSelectAll('paymentWay').then(res=>{
                if(res.error==0){
                    this.paymentTypeList=res.data;
                }
            })
            this.getSelectAll('platformSource').then(res=>{
                if(res.error==0){
                    this.platformSourceList=res.data;
                }
            })
            this.getSelectAll('exParamNameCommon').then(res=>{
                if(res.error==0){
                    this.exParamList=res.data;

                    firstExParamName=this.exParamList[0].id;
                    this.searchEntity.exParamName=this.exParamList[0].id;
                }
            })

        }
    }
</script>
<style scoped lang="scss">
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
    .cancel-btn{
        cursor:pointer;
        color:#f57575;
        // padding-right:5px;
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
	.cancel-dialog{
        .el-radio{
            width:25%;
            margin:5px 15px;

        }
    }
    .result{
        background-color:#fff;
        margin-bottom:10px;
        .result-header{
            border-bottom:1px solid #efefef;
            height:40px;
            line-height:40px;
            padding-left:18px;
            font-size:14px
        }
        .result-content{
            height:40px;
            line-height:40px;
            padding-left:18px;
            font-size:14px;
            span{
                margin-right:20px;
            }

        }
    }
</style>
