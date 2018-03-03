<template>
	<div class="page-view">
        <break-crumb :titles="titles"></break-crumb>
		<el-form class="form" :inline="true" :model="formInline">
			<el-button class="add-btn" @click="add" v-if="buttonArr.indexOf('bt-add')!=-1">新增词名</el-button>
			<el-button @click="del" v-if="buttonArr.indexOf('bt-delete')!=-1">删除词名</el-button>
			<el-button @click="fileImport" v-if="buttonArr.indexOf('bt-import')!=-1">导入</el-button></el-button>
			<el-form-item label="查询" class="search-form">
				<el-input class="search-input" v-model="formInline.value" placeholder="请输入补全词"></el-input>
				<el-button type="primary" class="search-btn" @click="onSearch">搜索</el-button></el-button>
				<!-- <el-button class="search-btn" @click="onReset">重置</el-button></el-button> -->
			</el-form-item>
		</el-form>
		<!-- 列表 -->
		<div class="ui-table">
			<el-table :data="tableData" style="width: 100%" v-loading="listLoading" @selection-change="selectionChange">
				<el-table-column type="selection" width="60px"></el-table-column>
				<el-table-column label="词名" prop="keyword"></el-table-column>
				<!-- <el-table-column label="操作" width="200px">
					<template scope="scope">
						<el-button type="text" @click.native="editor(scope.$index)">编辑</el-button>
					</template>
				</el-table-column> -->
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
		
		<el-dialog
        title="导入词库"
        class="mod-pop"
		size="0"
        :visible.sync="dialogfileImportVisible"
        :before-close="handleClose">
			<el-form :rules="rules" ref="ruleForm" :model="formInline">
				<el-form-item prop="fileName"
					v-loading="uploadLoading"
					element-loading-text="上传解析中">
					<el-upload
					v-if="!uploadOk"
					class="upload-demo"
					ref="upload"
					:action="$apiUrl.complementedImport"
					:with-credentials="true"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
					:on-change="uploadChange"
					:show-file-list="false"
					:auto-upload="false"
					>
					<el-input slot="trigger" class="input-area" v-model="formInline.fileName"  placeholder="点击选择文件" icon="search"></el-input>
					<div slot="tip" class="el-upload__tip">注意：excel文件词放在第一列，不超过5000条，单个词长度超过10会自动忽略</div>
					</el-upload>
					<el-button v-if="!uploadOk" type="primary" @click="upload('ruleForm')">上传</el-button>
					<div class="upload" v-if="uploadOk">
					<i class="el-icon-check"></i>
					<span>上传成功！</span>
					<a herf="javascript:;" @click="uploadOk = false">继续上传</a>
					</div>
					<a v-if="!uploadOk" :href="$apiUrl.templete" class="download-mod">下载模板</a>
				</el-form-item>
			</el-form>

		</el-dialog>
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
			currentPage:1,	//第几页	number	
			pageSize:20,	//页大小	number	
			word:''	//关键词	string	
		};
        return{
			param,
            titles:[{id:1,name:'搜索中心'},{id:2,name:'补全词库'}],
			formInline:{
				value:"",
				fileName:''
			},
			
			buttonArr:[],
			dialogfileImportVisible:false,
			uploadOk:false,
			listLoading:false,
			currentPage: 1,
			pageSize:20,
			tableData: [],
			total: 0,
			rules:{
				fileName:[
                    { required: true, message: '请上传文件', trigger: 'change' }
                ],
			},
			selectionId:[],
			uploadLoading:false,
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
		getData()
		{
			let self = this;
			self.listLoading = true;
			self.$ajax.get(self.$apiUrl.complementedList,self.param).then((res) =>
			{
				self.total = res.data.pageInfo.totalRow;
				self.tableData = res.data.list;
				self.listLoading = false;
			});
		},
		selectionChange(selection){
			this.selectionId = [];
			for (var index = 0; index < selection.length; index++) {
				this.selectionId.push(selection[index].acId);
			}
			// console.log(this.selectionId)
		},
		//编辑
		// editor(index)
		// {
		// 	var id = this.tableData[index].acId
		// 	var complete = {
		// 		acId:id,
				
		// 	};
		// 	sessionStorage.setItem("acId",id);
		// 	this.$router.push({name:'编辑词名'});
		// },
		add(){
			this.$router.push({name:'新增词名'});
		},
		del(){
			if (this.selectionId.length) {
				this.$confirm('您确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var selectionId = JSON.stringify(this.selectionId);
					this.$ajax.post(this.$apiUrl.complementedDel,{ids:selectionId}).then((res) =>
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
		fileImport(){
			this.dialogfileImportVisible = true;
		},
		//导入弹窗关闭
		handleClose(done) {
			this.$refs['ruleForm'].resetFields();
			this.uploadLoading = false;
			done();
			this.getData();
        },
		//上传成功回调
        handleAvatarSuccess(res, file) {
			this.uploadLoading = false;
            if (res.error !== 0) {
                this.$message({
                message: res.msg,
                type: 'error'
                });
                return false;
            }else{
				this.uploadOk = true;
				this.formInline.fileName = "";
            }
        },
        //上传失败回调
        handleAvatarError(err, file){
			this.uploadLoading = false;
			this.formInline.fileName = "";
            this.$message({
                message: "上传失败，请重试！",
                type: 'error'
            });
        },
        //文件上传限制
        beforeAvatarUpload(file) {
			console.log(file);
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const isXls = file.type === 'application/vnd.ms-excel';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isXlsx && !isXls) {
            this.$message.error('上传文件只能是 xls/xlsx格式！');
            }
            if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 2MB!');
            }
			return (isXlsx || isXls) && isLt2M;
		},
		uploadChange(file){
			this.formInline.fileName = file.name;
		},
		upload(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
					this.uploadLoading = true;
					this.$refs.upload.submit();
                } else {
                    return false;
                }
            });
		}
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
.upload{
	text-align: center;
	font-size:16px;
	color:#48576a;
	i{
		display: inline-block;
		width:22px;
		height: 22px;
		line-height: 24px;
		font-size:10px;
		border-radius:50%;
		background-color: #20a0ff;
		color:#fff;
	}
	span{
		// color:#20a0ff;
	}
	a:hover{
		text-decoration: underline;
		cursor: pointer;
	}
	.el-button{
		position: relative;
	}
}
</style>