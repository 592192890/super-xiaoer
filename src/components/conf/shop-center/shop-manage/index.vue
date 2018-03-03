<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section class="header" style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="20">
				<el-col class="custom-col">
					<div class="label">业态</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.businessTypeCode" placeholder="请选择">
						<el-option label="全部" value="" v-if="businessTypeList.length"></el-option>
						<el-option
							v-for="item in businessTypeList"
							:key="item.code"
							:label="item.description"
							:value="item.code">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.shopKey" placeholder="请选择">
						<el-option label="店铺名" value="shopName"></el-option>
						<el-option label="店铺编码" value="shopMdCode"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-input v-model="searchEntity.shopValue"></el-input>
				</el-col>
				<el-col class="custom-col">
					<div class="label">状态</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.shopStatus" placeholder="请选择状态">
						<el-option label="全部" value="" v-if="shopStatusList.length"></el-option>
						<el-option
							v-for="item in shopStatusList"
							:key="item.code"
							:label="item.description"
							:value="item.code">
						</el-option>
					</el-select>
				</el-col>
				<el-col class="custom-col">
					<div class="label">渠道</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.onlineOffline" placeholder="请选择">
						<el-option label="全部" value="" v-if="channelList.length"></el-option>
						<el-option
							v-for="item in channelList"
							:key="item.code"
							:label="item.description"
							:value="item.code">
						</el-option>
					</el-select>
				</el-col>
			
			</el-row>
			<el-row :span="24" class="mod-toolbar" :gutter="20">
				<el-col class="custom-col">
					<div class="label">经营类型</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.settledType" placeholder="请选择">
						<el-option label="全部" value="" v-if="settledTypeList.length"></el-option>
						<el-option
							v-for="item in settledTypeList"
							:key="item.code"
							:label="item.description"
							:value="item.code">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="search(1)">搜索</el-button>
					<el-button type="primary" class="add-btn" @click="add" v-if="buttonArr.indexOf('bt-add')!=-1">新增</el-button>
				</el-col>
			</el-row>
		</section>
		<section class="ui-table">
			<el-table :data="formEntity" v-loading="listLoading" highlight-current-row ref="multipleTable" style="width: 100%;" @selection-change="handleSelectionChange">
				
				<el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="shopMdCode" label="店铺编码" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="businessTypeName" label="业态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="settledTypeName" label="经营类型" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="onlineOfflineName" label="渠道" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="validDate" label="店铺有效期" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="statusName" label="状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="250">
					<template scope="scope">
						<span @click="handleCheck(scope.$index, scope.row)" class="check-btn" v-if="buttonArr.indexOf('bt-view')!=-1">查看</span>
						<span @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.onlineOffline!='offline'&&buttonArr.indexOf('bt-edit')!=-1" class="edit-btn">编辑</span>
						<span @click="handleModify(scope.$index, scope.row)" v-if="scope.row.onlineOffline!='offline'&&scope.row.settledType==1&&buttonArr.indexOf('bt-modify')!=-1" class="modify-btn">修改配置</span>
						<span @click="handleSync(scope.$index, scope.row)" v-if="scope.row.onlineOffline!='offline'&&scope.row.settledType!=1&&buttonArr.indexOf('bt-sync')!=-1" class="sync-btn">商品同步</span>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="mod-toolbar">
				<el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
				</el-pagination>
			</el-col>
		</section>
	</div>
	
</template>
<script scoped>
import breakCrumb from '@/components/common/breakCrumb'
import Permission from '@/assets/js/permission-util.js'
// var PAGE_SIZE=20;
export default{
	components:{
		breakCrumb
	},
	data(){
		var Permission = Permission;
		return {
			titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'}],
			buttonArr:[],
			currentPage:1,
			listLoading: true,
			pageSize:20,
			total:0,
			sels:[]	,
			businessTypeList:[],
			shopStatusList:[],
			settledTypeList:[],
			channelList:[],
			formEntity:[],
			searchEntity:{
				shopKey:'shopName',
				businessTypeCode:null,
				shopStatus:null,
				settledType:null,
				onlineOffline:null
			},
			multipleSelection: []
		}
	},
	methods:{
		search:function(index){
			this.listLoading=true;
			var url=this.$apiUrl.queryShopListUrl;
			var param=Object.assign({},{
				pageIndex:index||1,
				pageSize:this.pageSize,
			},this.searchEntity);
			this.$ajax.post(url,param).then((res)=>{
				if(res.error==0){
					this.listLoading=false;
					this.formEntity=res.data.list;
					//如果店铺有效期为空，转为长期
					this.formEntity.forEach(function(value,index){
						if(!value.validDate){
							value.validDate="长期";
						}
					})
					this.total=res.data.totalRow;
					this.currentPage=res.data.currentPage;
				}
				
			})
		},
		add:function(){
			this.$router.push({name:'店铺新增'})
		},
		handleCheck:function(index,row){
			//判断是否是编辑第三方店铺
			if(row.settledType==1){
				this.$router.push({name:'查看第三方店铺',params:{shopId:row.id,currentPage:this.currentPage}})
			}else{
				this.$router.push({name:'查看店铺',params:{shopId:row.id,type:row.onlineOffline,currentPage:this.currentPage}})
			}
			
		},
		handleCurrentChange:function(index){
			this.search(index);
		},
		handleModify:function(index,row){
			//判断是线上自营还是第三方
			// console.log(row,4444)
			if(row.settledType==1){
				this.$router.push({name:'修改第三方店铺配置',query:{shopId:row.id},params:{currentPage:this.currentPage}})
			}else{
				this.$router.push({name:'修改线上自营店铺配置',query:{shopId:row.id},params:{currentPage:this.currentPage}})
			}
			
		},
		handleSync:function(index,row){
			var url=this.$apiUrl.syncProductUrl;
			var params={
				shopId:row.id
			}
			this.$ajax.post(url,params).then(res=>{
				if(res.error==0){
					this.$message({
						type:'success',
						message:'商品同步成功！'
					})
					this.search(this.currentPage)
				}
			})
		},
		handleEdit:function(index,row){
			//判断是否是编辑第三方店铺
			if(row.settledType==1){
				this.$router.push({name:'店铺第三方编辑',params:{shopId:row.id,currentPage:this.currentPage}})
			}else{
				this.$router.push({name:'店铺编辑',params:{shopId:row.id,type:row.onlineOffline,currentPage:this.currentPage}})
			}
			
		
		},
		handleSelectionChange:function(val){
			this.multipleSelection = val;
			this.sels=this.multipleSelection;
		},
		getBusinessTypes:function(){
			var url=this.$apiUrl.getBusinessStatusUrl;

			this.$ajax.get(url).then((res)=>{
				// res.data.unshift()
				if(res.error==0){
					sessionStorage.setItem('businessType',JSON.stringify(res.data));
					this.businessTypeList=res.data;
				}
				
			})	
		},
		getShopStatus:function(){
			// var url=this.$apiUrl.getShopStatusUrl+"?type=shopList";

			// this.$ajax.get(url).then((res)=>{
			// 	if(res.error==0){
			// 		this.shopStatusList=res.data;
			// 	}
				
			// })	
			//产品要求只显示这两个
			this.shopStatusList=[
				{code: "10", description: "正常营业"},
				{code: "09", description: "已到期"}
			];
		},
		getSettledTypes:function(){
			
			this.settledTypeList=[{
				code:'3',
				description:'自营'
			},{
				code:'1',
				description:'第三方商家'
			}];
		},
		getChannels:function(){
			this.channelList=[{
				code:'offline',
				description:'线下'
			},{
				code:'online',
				description:'线上'
			}];
		}
		
		
	},
	mounted(){
		//获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);

		if(this.$route.params.currentPage){
			this.search(this.$route.params.currentPage);
		}else{
			this.search();
		}
		
		
		//获取下拉框的值
		this.getBusinessTypes();

		this.getShopStatus();

		this.getSettledTypes();

		this.getChannels();
	}
}
</script>
<style scoped>
	.header{
		background-color:#ffffff;
	}
	.mod-toolbar{
		background-color:#ffffff;
		margin-right:0px!important;
		margin-left:0px!important;
	}
	.check-btn{
		color:#57a9e8;
		margin-right:40px;
		cursor:pointer;
	}
	.add-btn{
		background-color:#33bbab;
		border:none;
		margin-left:10px;
		cursor:pointer;
	}
	.edit-btn{
		color:#9d8ef1;
		margin-right:40px;
		cursor:pointer;
	}
	.modify-btn{
		color:#33bbab;
		cursor:pointer;
	}
	.sync-btn{
		color:#f57575;
		cursor:pointer;
	}
	.custom-col{
		display:inline;
		float:left;
		width:auto;
		min-width:auto;
	}
	.label{
		display:inline;
		text-align:right;
		height:36px;
		line-height:36px;
		font-size:14px;
	}
</style>