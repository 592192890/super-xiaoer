<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="10">
				
				<el-col class="custom-col">
					<div class="label">店铺名</div>
				</el-col>
				<el-col :span="6">
					<el-input v-model="searchEntity.shopName"></el-input>
				</el-col>
				<el-col class="custom-col">
					<div class="label">审核状态</div>
				</el-col>
				<el-col :span="4">
					<el-select v-model="searchEntity.status" placeholder="审核状态">
						<el-option label="全部" value="" v-if="statusList.length"></el-option>
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="search(1)">搜索</el-button>
				</el-col>
					
				
			</el-row>
		</section>
		<section class="ui-table">
			<el-table :data="formEntity" v-loading="listLoading" highlight-current-row style="width: 100%;">
				<el-table-column prop="id" label="序号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="applyTime" label="申请入驻时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="district" label="所在地" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="statusName" label="状态" show-overflow-tooltip>
				</el-table-column>
				
				<el-table-column label="操作">
					<template scope="scope">
						<span class="check-btn" @click="handleCheck(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-view')!=-1">查看</span>
						<span class="audit-btn" v-if="scope.row.status=='04'&&buttonArr.indexOf('bt-audit')!=-1" @click="handleAudit(scope.$index, scope.row)">审核</span>
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
export default {
        components:{
            breakCrumb
        },
	data(){
		var Permission = Permission;
		return {
			titles:[{id:1,name:'店铺中心'},{id:2,name:'财务审核'}],
			buttonArr:[],
			currentPage:1,
			listLoading: true,
			pageSize:20,
			total:0,
			statusList:[],
			formEntity:[],
			searchEntity:{
				status:null
			},
			multipleSelection: []
		}
	},
	methods:{
		search:function(index){
			this.listLoading=true;
			var url=this.$apiUrl.getFinanceListUrl;
			var param=Object.assign({},{
				pageIndex:index||1,
				pageSize:this.pageSize
			},this.searchEntity);
			this.$ajax.post(url,param).then((res)=>{
				if(res.error==0){
					this.formEntity=res.data.list;
					this.total=res.data.total;
					this.currentPage=parseInt(res.data.currentPage);
				}else{
					center.$emit('globalError',res.msg);
				}
				this.listLoading=false;
			})
		},
        handleAudit:function(index,row){
			this.$router.push({name:'审核财务信息',params:{shopId:row.id,currentPage:this.currentPage}})
        },
		handleCheck:function(index,row){
			this.$router.push({name:'查看财务信息',params:{shopId:row.id,currentPage:this.currentPage}})
			
		},
		handleCurrentChange:function(index){
			this.search(index);
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

		//下拉框
		if(!sessionStorage.getItem('financeAuditStatus')){
			var url=this.$apiUrl.getFinanceStatusUrl;
			this.$ajax.get(url).then(res=>{
				if(res.error==0){
					this.statusList=res.data||[];
					sessionStorage.setItem('financeAuditStatus',JSON.stringify(res.data))
				}
				
			})
		}else{
			this.statusList=JSON.parse(sessionStorage.getItem('financeAuditStatus'));
		}
		
		
	}
}
</script>
<style scoped>
    .mod-toolbar{
        background-color:#ffffff;
		margin-right:0px!important;
		margin-left:0px!important;
    }
    .audit-btn{
        color:#33bbab;
		cursor:pointer;
		
    }
    .check-btn{
        color:#57a9e8;
		margin-right:40px;
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
