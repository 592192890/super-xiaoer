<template>
	<div class="page-view">
        <break-crumb :titles="titles"></break-crumb>
		<el-form class="form" :inline="true" :model="formInline">
			<el-button class="add-btn" @click="add" v-if="buttonArr.indexOf('bt-add')!=-1">新增权重</el-button>
			<el-button @click="del" v-if="buttonArr.indexOf('bt-delete')!=-1">删除权重</el-button>
			<el-form-item label="查询" class="search-form">
				<el-input class="search-input" v-model="formInline.value" placeholder="请输入关键字"></el-input>
				<el-button type="primary" class="search-btn" @click="onSearch">搜索</el-button></el-button>
				<!-- <el-button class="search-btn" @click="onReset">重置</el-button></el-button> -->
			</el-form-item>
		</el-form>
		<!-- 列表 -->
		<div class="ui-table">
			<el-table :data="tableData" style="width: 100%" v-loading="listLoading" @selection-change="selectionChange">
				<el-table-column type="selection" width="60px"></el-table-column>
				<el-table-column label="关键字" prop="keyword"></el-table-column>
				<el-table-column label="分类权重" prop="cateWeight"></el-table-column>
				<el-table-column label="操作" width="200px">
					<template scope="scope">
						<el-button type="text" @click.native="editor(scope.$index)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-col :span="24" class="mod-toolbar">
				<el-pagination
				style="float:right;"
				v-loading="listLoading"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="pageSize"
				layout="total, prev, pager, next"
				:total="total">
				</el-pagination>
			</el-col>
		</div>
	</div>
</template>

<script>
import breakCrumb from '@/components/common/breakCrumb'
import Permission from '@/assets/js/permission-util.js'
export default {
    components:{
		breakCrumb,
	},
	
    data(){
		var param = {
			currentPage:1,
			pageSize:20,
			word:""
		};
        return{
			param,
            titles:[{id:1,name:'搜索中心'},{id:2,name:'分类权重'}],
			formInline:{
				value:"",
				fileName:''
			},
			dialogfileImportVisible:false,
			uploadData:{},
			listLoading:false,
			currentPage: 1,
			pageSize:20,
			buttonArr:[],
			tableData: [],
			total: 0,
			rules:{
				fileName:[
                    { required: true, message: '请上传文件', trigger: 'change' }
                ],
			},
			selectionId:[],
        }
	},
	mounted()
	{
		//获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
		
		this.getData();
	},
	methods: {
        onSearch() {
			var self = this;
			this.param.word = this.formInline.value;
			self.getData();
		},
		onReset(){
			this.param.word = "";
			this.param.currentPage = 1;
			this.param.pageSize=this.pageSize;
			this.getData();
		},
		handleSizeChange(val){
			this.pageSize = val;
			this.param.pageSize=this.pageSize;
			this.getData();
		},
		// 列表
		handleCurrentChange(val)
		{
			this.param.currentPage = val;
			this.getData();
		},
		//请求mock数据
		getData()
		{
			let self = this;
			self.listLoading = true;
			self.$ajax.get(self.$apiUrl.cateWeightList,self.param).then((res) =>
			{
				self.total = res.data.pageInfo.totalRow;
				self.tableData = res.data.list;
				self.listLoading = false;
			});
		},
		selectionChange(selection){
			this.selectionId = [];
			for (var index = 0; index < selection.length; index++) {
				this.selectionId.push(selection[index].id);
			}
		},
		//编辑
		editor(index)
		{
			var id = this.tableData[index].id,
				keyword = this.tableData[index].keyword,
				cateWeight = this.tableData[index].cateWeight,
				editorData = {
					id:id,
					keyword:keyword,
					cateWeight:cateWeight
				};
			sessionStorage.setItem("editorData",JSON.stringify(editorData));
			this.$router.push({name:'编辑权重'});
		},
		add(){
			sessionStorage.removeItem("editorData");
			this.$router.push({name:'新增权重'});
		},
		del(){
			if (this.selectionId.length) {
				this.$confirm('您确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
					var selectionId = JSON.stringify(this.selectionId);
					this.$ajax.post(this.$apiUrl.cateWeightDel,{ids:selectionId}).then((res) =>
					{
						this.$message({
						message: "删除成功！",
						type: 'success'
						});
						this.getData();
					});
				});
			}else{
				this.$message({
					message: "请选择一个删除项",
					type: 'warning'
				});
			}
		},
    }
}
</script>
<style lang="scss">
.mod-pop{
	.el-dialog{
		min-width: 456px!important;
	}
}
</style>

<style lang="scss" scoped>
.page-view{
	position: relative;
	margin-top: 30px;
}
.form{
	padding: 20px 20px;
	background-color: #fff;
	margin:20px 0;
}
.search-form{
	float: right;
}
.search-input{
	display: inline-block;
	width: 200px
}
.search-btn{
	margin-left: 10px;
}
.mod-pop{
	
	.input-area{
		display: inline-block;
		width: 344px;
	}
	.el-button{
		margin-left: 10px;
		position: absolute;
		top:0;
		right:0;
	}
	a{
		color:#20a0ff;
	}
}
.add-btn{
	background-color: #33bbab;
	color:#fff;
	border-color:#33bbab
}
</style>