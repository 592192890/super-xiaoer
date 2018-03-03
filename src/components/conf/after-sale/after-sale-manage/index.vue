<template>
	<div class="after-sale-manage">
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
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
				<el-col :span="3" :offset="1">
					<el-select v-model="searchEntity.type">
                        <el-option v-for="item in exParamList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
				</el-col>
				<el-col :span="4">
					<el-input v-model="searchEntity.keyword" placeholder="请输入订单号/申请单号/会员用户名"></el-input>
				</el-col>
                
			</el-row>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-col :span="2">
					<div class="label">申请时间</div>
				</el-col>
				<el-col :span="4">
					<el-date-picker
						style="width:100%"
                        v-model="searchEntity.begainTime"
                        type="date"
                        placeholder="选择日期"
						:picker-options="startTimeOptions">
                    </el-date-picker>
				</el-col>
                <div style="float:left; height:36px;line-height:36px; padding:0 20px">——</div>
                <el-col :span="4">
					<el-date-picker
						style="width:100%"
                        v-model="searchEntity.endTime"
                        type="date"
                        placeholder="选择日期"
						:picker-options="endTimeOptions">
                    </el-date-picker>
				</el-col>
                <el-col :span="6" :offset="1">
					<el-button type="primary" @click="search(1)">搜索</el-button>
                    <el-button type="primary" class="export-btn" @click="exportOrders" v-if="buttonArr.indexOf('bt-export')!=-1">导出</el-button>
					<el-button type="primary" class="clear-btn" @click="clearSearch">清空</el-button>
				</el-col>
            </el-row>
		</section>
		<section class="custom-table ui-table">
			<div class="tr header">
				<div class="td" style="width:20%;">商品</div>
				<div class="td" style="width:15%">申请单类型</div>
				<div class="td" style="width:15%">退款金额</div>
				<div class="td" style="width:23%">买家</div>
				<div class="td" style="width:12%">申请单状态</div>
				<div class="td" style="width:15%">操作</div>
			</div>
			<section v-for="item in formEntity" v-loading="listLoading" class="content" :key="item.reverseApplyId">
				<div class="tr sub-header">
					<div class="td" style="width:20%">订单号：{{item.orderId}}</div>
					<div class="td" style="width:20%">申请单号：{{item.reverseApplyId}}</div>
					<div class="td" style="width:30%">申请时间：{{item.createTime}}</div>
					<div class="td" style="width:25%" :title="item.shopName">店铺：{{item.shopName}}</div>
				</div>
				<div class="tr sub-content">
					<div class="td" style="width:20%">
						<carousel :imageList="item.imgPathList" style="width:100%"></carousel>
					</div>
					<div class="td" style="width:15%">
						<div class="item">{{item.reverseTypeName}}</div>
					</div>
					<div class="td" style="width:15%">
						<div class="item">{{item.refundAmount}}</div>
					</div>
					<div class="td" style="width:23%">
						<div class="item">{{item.memberName}}</div>
					</div>
					<div class="td" style="width:12%">
						<div class="item">{{item.statusName}}</div>
					</div>
					<div class="td" style="width:15%">
						<span class="check-btn" @click="handleView(item)" v-if="buttonArr.indexOf('bt-view')!=-1">查看</span>
						<span class="cancel-btn" @click="handleCancel(item)" v-if="item.statusName=='等待审核'&&buttonArr.indexOf('bt-cancel')!=-1">取消</span>
						<span class="type-btn" @click="handleTypeFlow(item)" v-if="item.statusName=='等待审核'&&buttonArr.indexOf('bt-typeflow')!=-1">填写物流</span>
					</div>
				</div>
			</section>
			
			
			<!--工具条-->
			<el-col :span="24" class="mod-toolbar">
				
				<el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
				</el-pagination>
			</el-col>
		</section>

		<el-dialog
            title="取消原因"
            :visible.sync="cancelDialogVisible"
            size="tiny">
			<el-input type="textarea" :rows="4" placeholder="请填写取消售后单原因，4-500字符" :class="{error:!isCancel}" v-model="cancelReason" @change="validateField"></el-input>
            <div v-if="!isCancel" style="color:#ff4949">4-500个字符</div>
			<span slot="footer" class="dialog-footer">
                <el-button @click="cancelDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="cancelItem" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
		<search-shop-dialog :isShow="isShowSearchShopDialog" v-on:watchDialog="closeDialog" v-on:passSelectShop="showRelatedShop"></search-shop-dialog>
		
	</div>
	
</template>
<script>

import breakCrumb from '@/components/common/breakCrumb'
import searchShopDialog from '../searchShopDialog'
import carousel from '@/components/common/carousel'
import Permission from '@/assets/js/permission-util.js'
import querystring from 'querystring'
import Util from '@/assets/js/util.js'
var reverseApplyId;
export default{
	components:{
		breakCrumb,
		carousel,
		searchShopDialog
	},
	data(){
		let self = this;
		return {
			titles:[{id:1,name:'售后'},{id:2,name:'售后申请单管理'}],
			buttonArr:[],
			cancelDialogVisible:false,
			isShowSearchShopDialog:false,
			currentPage:1,
			listLoading: true,
			total:0,

			isCancel:true,
			cancelReason:'',

			pageSize:20,
			statusList:[
				{id:'-100',name:'取消'},
				{id:'0',name:'等待审核'},
				{id:'50',name:'待处理'},
				{id:'100',name:'同意'},
				{id:'200',name:'完成'},
				{id:'300',name:'失败'}
			],
			exParamList:[
				{id:1,name:'订单号'},
				{id:2,name:'申请单号'},
				{id:3,name:'会员用户名'}
			],

			formEntity:[],
			searchEntity:{
				status:null,
				begainTime:'',
				endTime:'',
				keyword:'',
				shopId:'',
				type:1
			},
			multipleSelection: [],
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
					if(self.searchEntity.begainTime){
						return (time.getTime() < self.searchEntity.begainTime);
					}else{
						return false;
					}
					
				}

			}
		}
	},
	methods:{
		validateField:function(){
			if(/^.{4,500}$/m.test(this.cancelReason)){
				this.isCancel=true;
			}else{
				this.isCancel=false;
			}
		},
		closeDialog:function(status){
			this.isShowSearchShopDialog=status;
		},
		showRelatedShop:function(entity){
			this.searchEntity.shopName=entity.shopName;
			this.searchEntity.shopId=entity.id;

			this.isShowSearchShopDialog=false;
		},
		search:function(index){
			this.listLoading=true;
			var url=this.$apiUrl.getApplyOrderListUrl

			var tempObj=Object.assign({},this.searchEntity);
			if(tempObj.begainTime){
				tempObj.begainTime=Date.parse(tempObj.begainTime);
			}
			if(tempObj.endTime){
				tempObj.endTime=Date.parse(tempObj.endTime)+24*3600*1000-1
			}

			var param=Object.assign({},{
				currentPage:index||1,
				pageSize:this.pageSize
			},tempObj);

			
			this.$ajax.post(url,param).then((res)=>{
				if(res.error==0){
					this.formEntity=res.data.list;
					this.total=res.data.pageInfo.totalRow;
					this.currentPage=res.data.pageInfo.currentPage;
					this.listLoading=false;
				}
				
			})

			
		},
		handleCurrentChange:function(index){
			this.search(index);
		},
		exportOrders:function(){

			var tempObj=Object.assign({},this.searchEntity);
			if(tempObj.begainTime){
				tempObj.begainTime=Date.parse(tempObj.begainTime);
			}
			if(tempObj.endTime){
				tempObj.endTime=Date.parse(tempObj.endTime)
			}

			var url=this.$apiUrl.exportApplyOrderUrl;
			var params=querystring.stringify(tempObj);
			window.open(url+"?"+params);
		},
		clearSearch:function(){
			this.searchEntity={
				status:null,
				begainTime:'',
				endTime:'',
				keyword:'',
				shopId:'',
				type:1
			}
		},
		handleView:function(item){
			this.$router.push({name:'售后单查看',params:{row:item}})
		},
		handleCancel:function(item){
			this.cancelDialogVisible=true;

			this.isCancel=true;
			this.cancelReason="";


			reverseApplyId=item.reverseApplyId;
		},
		cancelItem:function(){
			if(!this.isCancel||!this.cancelReason){
				this.isCancel=false;
				return;
			}
			var url=this.$apiUrl.cancelApplyOrderUrl;
			var params={
				cancelReason:this.cancelReason,
				reverseApplyId:reverseApplyId
			}
			this.cancelDialogVisible=false;
			this.$ajax.post(url,params).then(res=>{
				if(res.error==0){
					this.$message({
						type:'success',
						message:'取消成功'
					})
					this.search();
				}
			})
			
		},
		handleTypeFlow:function(item){
			this.$router.push({name:'填写物流',params:{row:item,currentPage:this.currentPage}})
		},
		
		
	},
	mounted(){
		//获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
		
		
		this.search(this.$route.params.currentPage);
		
		
		
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
	.custom-table{
		
		.tr{
			width:100%;
			box-sizing:border-box;
			font-size:14px;
			background-color:#fff;
			.td{
				display:inline-block;
				height:40px;
				line-height:40px;
				box-sizing:border-box;
				// line-height:40px;
				padding:0px 18px;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
			}
			&.header{
				color:#999;
				.td{
					float:left;
					background-color:#fff;
					margin-bottom:5px
				}
			}
			&.sub-header{
				border-bottom:1px solid #f3f5f7;
				height:40px;
				line-height:40px;
			}
			&.sub-content{
				height:140px;
				.td{
					float:left;
					height:140px;
					line-height:140px;
					vertical-align:middle;
					display:table-cell;
					.item{
						width:calc(100% - 36px);
						white-space:nowrap;
						overflow:hidden;
						text-overflow:ellipsis;
					}
				}
			}
			.check-btn{
				cursor:pointer;
				color:#57a9e8;
				padding-right:5px;
			}
			.cancel-btn{
				cursor:pointer;
				color:#f57575;
				padding-right:5px;
			}
			.type-btn{
				cursor:pointer;
				color:#30b9a5;
			}
		}
		.content{
			margin:5px 0px;
			clear:both;
		}
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
	.label{
		height:36px;
		line-height:36px;
		font-size:14px;
	}
	
</style>
<style>
.after-sale-manage .el-textarea.error textarea{
	border:1px solid #ff4949
}
</style>
