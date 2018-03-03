<template>
	<div class="product-manage">
		<break-crumb :titles="titles"></break-crumb>
		<section class="header" style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="5">
				<el-col :span="1">
					<div class="label">查询</div>
				</el-col>
				<el-col :span="5">
					<el-input v-model="searchEntity.shopName" placeholder="显示查询店铺" :disabled="true">
						<el-button slot="append" @click="isShowSearchShopDialog=true">选择店铺</el-button>
					</el-input>
				</el-col>
				<el-col :span="2" :offset="2">
					<div class="label">分类</div>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.firstCategory" filterable placeholder="一级分类" @change="selectFirstCategory">
						<el-option label="请选择" value=""></el-option>
						<el-option
							v-for="item in firstCategoryArr"
							:key="item.catbackId"
							:label="item.catbackName"
							:value="item.catbackId">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.secondCategory" placeholder="二级分类" @change="selectSecondCategory">
						<el-option label="请选择" value="" v-if="secondCategoryArr.length"></el-option>
						<el-option
							v-for="item in secondCategoryArr"
							:key="item.catbackId"
							:label="item.catbackName"
							:value="item.catbackId">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-select v-model="searchEntity.thirdCategory" placeholder="三级分类">
						<el-option label="请选择" value="" v-if="thirdCategoryArr.length"></el-option>
						<el-option
							v-for="item in thirdCategoryArr"
							:key="item.catbackId"
							:label="item.catbackName"
							:value="item.catbackId">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
				<el-col :span="1">
					<div class="label">品牌</div>
				</el-col>
				<el-col :span="5">
					<el-input v-model="searchEntity.brandName" placeholder="显示查询品牌" :disabled="true">
						<el-button slot="append" @click="isShowSearchBrandDialog=true">选择品牌</el-button>
					</el-input>
				</el-col>
				<el-col :span="2" :offset="2">
					<div class="label">是否上架</div>
				</el-col>
				<el-col :span="4">
					<el-select v-model="searchEntity.marketable" placeholder="请选择">
						<el-option label="请选择" value=""></el-option>
						<el-option label="上架" value="1"></el-option>
						<el-option label="下架" value="2"></el-option>
					</el-select>
				</el-col>

				<el-col :span="5" class="append-class">
					<el-input v-model="searchEntity.keywords">
						<el-select v-model="searchEntity.type" slot="prepend" placeholder="请选择">
							<el-option label="商品编码" value="1"></el-option>
							<el-option label="商品货号" value="2"></el-option>
							<el-option label="商品名称" value="3"></el-option>
						</el-select>
					</el-input>
				</el-col>
				
				
				<el-col :span="4">
					<el-button type="primary" @click="search(1)">搜索</el-button>
					<el-button type="primary" class="clear-btn" @click="clearSearch">清空</el-button>
				</el-col>
			</el-row>
		</section>
		<section class="ui-table">
			<el-table :data="formEntity" highlight-current-row 
			ref="multipleTable" style="width: 100%;" v-loading="listLoading">
	
				<el-table-column prop="bn" label="编码" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="goodsNumber" label="货号" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="shopName" label="所属店铺" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="goodsName" label="商品名称" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="brandName" label="品牌" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="backCatPath" label="分类" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="salePrice" label="销售价" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="storeCount" label="库存" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="marketable" label="是否上架" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="status" label="商品状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="140">
					<template scope="scope">
						<span class="view-btn" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-view')!=-1">查看</span>
						<span v-if="scope.row.marketable=='上架'&&buttonArr.indexOf('bt-takeoff')!=-1" class="shelve-btn" @click="handleUnShelve(scope.$index, scope.row)">违规下架</span>
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
		<search-brand-dialog :isShow="isShowSearchBrandDialog" v-on:watchDialog="closeBrandDialog" v-on:passSelectShop="showRelatedBrand"></search-brand-dialog>

		<el-dialog
		title="违规下架"
		v-if="unShelveDialogVisible"
		:visible.sync="unShelveDialogVisible"
		width="30%">
		<el-form ref="unShelveForm" :model="unShelveForm" :rules="unShelveFormRules" label-width="110px">
			<el-form-item label="违规下架理由" prop="unShelveReason" required>
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入10-255个字符的内容"
					v-model="unShelveForm.unShelveReason">
				</el-input>
			</el-form-item>
			<el-button @click="unShelveDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="unShelve('unShelveForm')">确 定</el-button>
		</el-form>
		
		
		</el-dialog>
	
	</div>
	
</template>
<script>
import config from '@/config'
import breakCrumb from '@/components/common/breakCrumb'
import searchShopDialog from './searchShopDialog'
import searchBrandDialog from './searchBrandDialog'
import Permission from '@/assets/js/permission-util.js'
export default{
	components:{
		breakCrumb,
		searchShopDialog,
		searchBrandDialog
	},
	data(){
		var Permission = Permission;
		return {
			titles:[{id:1,name:'商品中心'},{id:2,name:'商品管理'}],
			buttonArr:[],
			isShowunShelveReason:false,
			isShowSearchBrandDialog:false,
			isShowSearchShopDialog:false,
			unShelveDialogVisible:false,
			currentPage:1,
			listLoading: true,
			total:0,
			pageSize:20,
			unShelveForm:{
				unShelveReason:''
			},
			unShelveFormRules:{
				unShelveReason: [
					{ required: true, message: '请输入下架理由', trigger: 'change' },
					{ min: 10, max: 255, message: '长度在 10 到 255 个字符', trigger: 'change' }
				],
			},
			unShelveProductId:'',
			firstCategoryArr:[],
			secondCategoryArr:[],
			thirdCategoryArr:[],
			formEntity:[],
			searchEntity:{
				marketable:'',
				firstCategory:'',
				secondCategory:null,
				thirdCategory:null,
				type:'1'
			}
		}
	},
	methods:{
		handleUnShelve(index,row){
			this.unShelveProductId=row.goodsId;
			this.unShelveForm.unShelveReason='';
			this.unShelveDialogVisible=true;
		},
		unShelve(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var url=this.$apiUrl.unShelveUrl;
					var params={
						ids:JSON.stringify([this.unShelveProductId]),
						reason:this.unShelveForm.unShelveReason
					}
					this.$ajax.post(url,params).then(res=>{
						if(res.error==0){
							this.$message({
								type:'success',
								message:'商品违规下架成功!'
							})
							this.unShelveDialogVisible=false;
							this.search(this.currentPage)
						}
					})
				} else {
					
					return false;
				}
			});
			
		},
		closeDialog:function(status){
			this.isShowSearchShopDialog=status;
		},
		closeBrandDialog:function(status){
			this.isShowSearchBrandDialog=status;
		},
		showRelatedShop:function(entity){
			this.searchEntity.shopName=entity.shopName;
			this.searchEntity.shopId=entity.id;

			this.isShowSearchShopDialog=false;
		},
		showRelatedBrand:function(entity){
			this.searchEntity.brandName=entity.brandName;
			this.searchEntity.brandId=entity.brandId;

			this.isShowSearchBrandDialog=false;
		},
		clearSearch:function(){
			this.searchEntity={
				marketable:'',
				firstCategory:'',
				secondCategory:null,
				thirdCategory:null,
				shopKey:'1',
				brandName:'',
				brandId:'',
				shopName:'',
				shopId:'',
				type:'1'
			}

			this.secondCategoryArr=[];
			this.thirdCategoryArr=[];
		},
		search:function(index){
			this.listLoading=true;
			
			if(this.searchEntity.thirdCategory){
				this.searchEntity.backcatId=this.searchEntity.thirdCategory;
			}else if(this.searchEntity.secondCategory){
				this.searchEntity.backcatId=this.searchEntity.secondCategory;
			}else{
				this.searchEntity.backcatId=this.searchEntity.firstCategory;
			}

			var url=this.$apiUrl.getProductListUrl
			var param=Object.assign({},{
				currentPage:index||1,
				pageSize:this.pageSize,
			},this.searchEntity);
			setTimeout(function(){
				this.$ajax.get(url,param).then((res)=>{
					if(res.error==0){
						this.formEntity=res.data.list;

						//整理数据
						this.formEntity.forEach(v=>{
							var productArr=v.productNewVos[0];
							v.salePrice=productArr.salePrice;
							v.goodsNumber=productArr.bn;
							v.storeCount=productArr.storeCount;
							v.marketable=productArr.marketable;
							v.status=productArr.status;
						})

						this.listLoading=false;
						this.total=res.data.pageInfo.totalRow;
						this.currentPage=res.data.pageInfo.currentPage;
					}	
					
				})
			}.bind(this),2000)
			
		},
		handleCurrentChange:function(index){
			this.search(index);
		},
		
		handleEdit:function(index,row){
			// this.$router.push({name:'SKU编辑',params:{entity:row}})
			window.location.href=config.productDeatilHTML+row.productNewVos[0].productId+".html";
		},
		selectFirstCategory:function(){
            this.searchEntity.secondCategory=null;
            this.searchEntity.thirdCategory=null;
            this.thirdCategoryArr=[];
            //查询二级分类
			if(this.searchEntity.firstCategory){
				this.getSecondCategory(this.searchEntity.firstCategory);
			}
            

            
        },
        selectSecondCategory:function(){
            this.searchEntity.thirdCategory=null;
            //查询三级分类
			if(this.searchEntity.secondCategory){
				this.getThirdCategory(this.searchEntity.secondCategory);
			}
            

            
        },

		getFirstCategory:function(){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId=0";
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.firstCategoryArr=res.data.list
                }
                
            })
        },
		getSecondCategory:function(firstCategoryId){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId="+firstCategoryId;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.secondCategoryArr=res.data.list
                }
                
            })
        },
        getThirdCategory:function(secondCategoryId){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId="+secondCategoryId;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.thirdCategoryArr=res.data.list
                }
                
            })
        }
		
	},
	mounted(){
		//获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
		
		this.search();
		this.getFirstCategory();
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
<style>
	.product-manage .append-class .el-input-group__prepend input{
		width:110px;
	}

</style>
