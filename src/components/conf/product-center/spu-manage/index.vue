<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section style="margin-top:20px">
			<el-row :span="24" class="mod-toolbar" :gutter="10">
				<el-col :span="3">
					<el-select v-model="searchEntity.category" placeholder="一级分类" @change="selectFirstCategory">
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
					<el-select v-model="searchEntity.middle" placeholder="二级分类" @change="selectSecondCategory">
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
					<el-select v-model="searchEntity.subcate" placeholder="三级分类">
						<el-option label="请选择" value="" v-if="thirdCategoryArr.length"></el-option>
						<el-option
							v-for="item in thirdCategoryArr"
							:key="item.catbackId"
							:label="item.catbackName"
							:value="item.catbackId">
						</el-option>
					</el-select>
				</el-col>
				
				<el-col :span="3">
					<el-select v-model="searchEntity.type" placeholder="请选择">
						<el-option label="商品编码" value="1"></el-option>
						<el-option label="商品货号" value="2"></el-option>
						<el-option label="商品名称" value="3"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-input v-model="searchEntity.key"></el-input>
				</el-col>
				
				<el-col :span="6">
					<el-button type="primary" @click="search(1)">搜索</el-button>
					<el-button type="primary" class="add-btn" @click="add" v-if="buttonArr.indexOf('bt-add')!=-1">新增</el-button>
					<el-button type="primary" @click="deleteBatch" v-if="buttonArr.indexOf('bt-delete')!=-1">删除</el-button>
				</el-col>

			</el-row>
		</section>
		<section class="ui-table">
			<el-table :data="formEntity" highlight-current-row 
			ref="multipleTable" v-loading="listLoading" style="width: 100%;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="spuBn" label="编码" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="spuName" label="商品名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="cateStr" label="分类" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="brandName" label="品牌" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template scope="scope">
						<span class="edit-btn cursor" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</span>
						
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
import breakCrumb from '@/components/common/breakCrumb'
import Permission from '@/assets/js/permission-util.js'
export default{
	components:{
		breakCrumb
	},
	data(){
		var Permission = Permission;
		return {
			titles:[{id:1,name:'商品中心'},{id:2,name:'SPU管理'}],
			buttonArr:[],
			deleteDialogVisible:false,
			currentPage:1,
			listLoading: true,
			total:0,
			sels:[]	,
			firstCategoryArr:[],
			secondCategoryArr:[],
			thirdCategoryArr:[],
			pageSize:20,
			formEntity:[],
			searchEntity:{
				category:null,
				middle:null,
				subcate:null,
				key:'',
				type:'1'
			},
			multipleSelection: []
		}
	},
	methods:{
		
		search:function(index){
			this.listLoading=true;
			var url=this.$apiUrl.getSKUListUrl
			var param=Object.assign({},{
				pageIndex:index||1,
				pageSize:this.pageSize
			},this.searchEntity);

			setTimeout(function(){
				this.$ajax.post(url,param).then((res)=>{
					if(res.error==0){
						this.formEntity=res.data.list;
						this.total=res.data.totalRow;
						this.currentPage=res.data.currentPage;
						this.listLoading=false;
					}
					
				})
			}.bind(this),2000)
			
		},
		add:function(){
			this.$router.push({name:'SPU新增1'})
		},
		deleteBatch:function(){
			if(this.sels.length){
				this.deleteDialogVisible=true;
			}else{
				this.$message({
					message:'请选择要删除的数据！'
				})
			}
			
		},
		handleCurrentChange:function(index){
			this.search(index);
		},
		
		handleEdit:function(index,row){
			this.$router.push({name:'SPU编辑',params:{entity:row}})
			sessionStorage.setItem('spuCurrentPage',this.currentPage)
		},
		handleSelectionChange:function(val){
			this.multipleSelection = val;
			this.sels=this.multipleSelection;
			
		},

		deleteItem:function(){
			this.deleteDialogVisible=false;
			var idArr=[];
			this.sels.forEach(v=>{
				idArr.push(v.spuId)
			})
			var url=this.$apiUrl.deleteBatchSPUUrl;
			var params={
				ids:idArr.join(',')
			};
			this.$ajax.get(url,params).then(res=>{
				
				if(res.error==0){
					this.$message({
						type:'success',
						message:'删除成功！'
					})
					this.search(1);
					
					// this.search(1);
				}
			})

		},
		selectFirstCategory:function(){
            this.searchEntity.middle=null;
            this.searchEntity.subcate=null;

			this.secondCategoryArr=[];
			
            
            //查询二级分类
			if(this.searchEntity.category){
				this.getSecondCategory(this.searchEntity.category);
			}
            

            
        },
        selectSecondCategory:function(){
            this.searchEntity.subcate=null;

			this.thirdCategoryArr=[];
			
            //查询三级分类
			if(this.searchEntity.middle){
				this.getThirdCategory(this.searchEntity.middle);
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
		
		if(this.$route.params.currentPage){
			this.search(this.$route.params.currentPage);
		}else{
			this.search();
		}
		

		this.getFirstCategory();
		
	}
}
</script>
<style scoped lang="scss">
	.mod-toolbar{
		background-color:#ffffff;
		margin-left:0px!important;
	}
	.add-btn{
		background-color:#33bbab;
		border:none;
	}
	.edit-btn{
		margin-right:40px;
		color:#9d8ef1;
	}
    .edit-btn.cursor{
		cursor:pointer;
	}
	.del-btn{
		color:#f57575;
	}
	.label{
		height:36px;
		line-height:36px;
		font-size:14px;
	}
	
</style>
