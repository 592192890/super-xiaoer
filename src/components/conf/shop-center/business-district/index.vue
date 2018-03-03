<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="10">
				<el-col :span="3">
					<el-select v-model="provinceCode" placeholder="请选择省" @change="changeProvince">
						<el-option label="全部" value="" v-if="provinceList.length"></el-option>
						<el-option
							v-for="item in provinceList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.cityCode" placeholder="请选择市" @change="changeCity">
						<el-option
							v-for="item in cityList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.districtCode" placeholder="请选择区">
						<el-option
							v-for="item in districtList"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col class="custom-col">
					<div class="label">商圈名称</div>
				</el-col>
				<el-col :span="4">
					<el-input v-model="searchEntity.cricleName"></el-input>
				</el-col>
				<el-col class="custom-col">
					<div class="label">状态</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.visible" placeholder="请选择状态">
						<el-option label="全部" value="" v-if="statusList.length"></el-option>
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.visible"
							:value="item.id">
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
			<el-table v-loading="listLoading" :data="formEntity" highlight-current-row 
			 style="width: 100%;">
				<el-table-column prop="id" label="序号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="provinceName" label="省" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="cityName" label="市" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="districtName" label="区" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="name" label="商圈名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="latlng" label="GPS经纬度" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="village" label="关联小区" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="visible" label="状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<span class="edit-btn" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</span>
						<span class="del-btn" @click="handleDel(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-delete')!=-1">删除</span>
					</template>
				</el-table-column>
			</el-table>
			<!--工具条-->
			<el-col :span="24" class="mod-toolbar">
				
				<el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
				</el-pagination>
			</el-col>
		</section>

		<el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            size="tiny">
            <span>确定删除该信息？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteItem" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>

	</div>
	
</template>
<script>
let deleteIndex=null;
let deleteRow=null;
// let PAGE_SIZE=20;
import breakCrumb from '@/components/common/breakCrumb'
import constant from '@/assets/js/constant'
import Permission from '@/assets/js/permission-util.js'
export default{
	components:{
		breakCrumb
	},
	data(){
		var Permission = Permission;
		return {
			titles:[{id:1,name:'店铺中心'},{id:2,name:'商圈管理'}],
			buttonArr:[],
			provinceCode:null,
			deleteDialogVisible:false,
			currentPage:1,
			pageSize:20,
			listLoading: true,
			total:0,
			formEntity:[],
			searchEntity:{
				provinceCode:null,
				cityCode:null,
				districtCode:null,
				visible:null
			},
			provinceList:[],
			cityList:[],
			districtList:[],
			statusList:constant.getBusinessCircleStatus(),
			multipleSelection: []
		}
	},
	methods:{
		changeProvince:function(id){
			this.searchEntity.provinceCode=this.provinceCode;
			this.districtList=[];
			if(!this.searchEntity.provinceCode){
				this.cityList=[];
			}else{
				//加载市
				this.getCities(id);
			}
			this.searchEntity.cityCode='';
			this.searchEntity.districtCode='';
			
		},
		changeCity:function(id){
			//加载区
			this.getDistricts(id);
			this.searchEntity.districtCode='';
		},
		search:function(index){
			this.listLoading=true;
			var url=this.$apiUrl.queryTradeAreaListUrl
			var param=Object.assign({},{
				pageIndex:index||1,
				pageSize:this.pageSize
			},this.searchEntity);

			this.$ajax.post(url,param).then((res)=>{
				if(res.error==0){
					this.formEntity=res.data.list;
					this.formEntity.forEach(function(value){
						value.latlng=value.lng+"/"+value.lat

					})
					
					this.listLoading=false;
					this.total=res.data.total;
					this.currentPage=res.data.currentPage;
				}
				
				
				
			})
		},
		getProvinces:function(){
			var url=this.$apiUrl.getAddrUrl+'?parentId=0';

			this.$ajax.get(url).then((res)=>{

				if(res.error==0){
					this.provinceList=res.data.list;

					sessionStorage.setItem('provinces',JSON.stringify(this.provinceList))

				}
				
			})
		},
		getCities:function(id){
			if(!id){
				return;
			}
			var url=this.$apiUrl.getAddrUrl+'?parentId='+id;

			this.$ajax.get(url).then((res)=>{
				if(res.error==0){
					this.cityList=res.data.list;
				}
				
			})	
		},
		getDistricts:function(id){
			if(!id){
				return;
			}
			var url=this.$apiUrl.getAddrUrl+'?parentId='+id

			this.$ajax.get(url).then((res)=>{
				if(res.error==0){
					this.districtList=res.data.list;
				}
				
			})	
		},
		add:function(){
			this.$router.push({name:'商圈新增'})
		},
		handleCurrentChange:function(index){
			this.search(index);
		},
		handleDel:function(index,row){
			deleteIndex=index;
			deleteRow=row;
			this.deleteDialogVisible=true;
		},
		deleteItem:function(){
			// console.log('deleting:'+deleteIndex+"=="+deleteRow)
			var url=this.$apiUrl.deleteTradeUrl;

			var param={
				cricleId:JSON.stringify([deleteRow.id])
			};

			this.$ajax.post(url,param).then((res)=>{
				if(res.error==0){
					this.listLoading=true;
					this.search();
				}
				
				
			})

			this.deleteDialogVisible=false;
		},
		handleEdit:function(index,row){
			this.$router.push({name:'商圈编辑',params:{entity:row,currentPage:this.currentPage}})
		
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
		if(sessionStorage.getItem('provinces')){
			this.provinceList=JSON.parse(sessionStorage.getItem('provinces'));
		}else{
			this.getProvinces();
		}
		
	
		
		
		
	}
}
</script>
<style scoped lang="scss">
	.mod-toolbar{
		background-color:#ffffff;
		margin-right:0px!important;
		margin-left:0px!important;
	}
	.add-btn{
		background-color:#33bbab;
		border:none;
		margin-left:20px;
	}
	.edit-btn{
		margin-right:40px;
		color:#9d8ef1;
		cursor:pointer;
	}
	.del-btn{
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
