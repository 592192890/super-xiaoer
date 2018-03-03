<template>
	<div class="page-view">
        <break-crumb :titles="titles"></break-crumb>
		<el-form class="form" :rules="rules" ref="ruleForm" :inline="false" :model="formInline" label-width="80px" label-position="left">
			<el-form-item label="词名" prop="value">
				<el-input class="search-input" v-model="formInline.value" placeholder="请输入词名"></el-input>
			</el-form-item>
			<el-form-item label="分类权重" prop="weight">
				<el-input class="search-input" v-model="formInline.weight" placeholder="请输入权重"></el-input>
				<!-- <span class="tips">例如100:9</span> -->
			</el-form-item>
            <el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">取消</el-button>
			</el-form-item>
		</el-form>
        
	</div>
</template>

<script>
import breakCrumb from '@/components/common/breakCrumb'

export default {
    components:{
		breakCrumb,
	},
	
    data(){
        return{
			id:"",
			wordGroup:"",
			url:"",
			operateTips:'新增成功',
            titles:[{id:1,name:'搜索中心'},{id:2,name:'分类权重'},{id:3,name:'新增'}],
			formInline:{
				value:"",
				weight:"",
			},
			rules:{
				value:[
					{ required: true,message: '请输入词名', trigger: 'change' },
                    { required: true, min:0, max: 50,message: '长度为1—50个字符', trigger: 'change' }
					// { pattern:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message:'不能输入特殊符号'}
				],
				weight:[
                    { required: true,message: '请输入词名权重', trigger: 'change' },
					{ required: true, min:0, max: 1000,message: '长度为1—1000个字符', trigger: 'change' }
                ],
			}
        }
	},
	mounted(){
		if(sessionStorage.getItem("editorData")){
			var editorData = JSON.parse(sessionStorage.getItem("editorData"));
			this.titles = [{id:1,name:'搜索中心'},{id:2,name:'分类权重'},{id:3,name:'编辑'}];
			this.operateTips="修改成功";

			this.id = editorData.id;
			this.keyword = editorData.keyword;
			this.formInline.value = editorData.keyword;
			this.formInline.weight = editorData.cateWeight;
			this.url = this.$apiUrl.cateWeightUpdate;
		}else{
			this.url = this.$apiUrl.cateWeightAdd;
		};
	},
	methods: {
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
					this.$ajax.post(this.url,{
							keyword:this.formInline.value,
							cateWeight:this.formInline.weight,
							id:this.id
						}).then((res) =>
					{
						if (res.error == 0) {
						this.$message({
						message: "‘"+this.formInline.value+"’"+this.operateTips+"!",
						type: 'success'
						});
						sessionStorage.removeItem("editorData");
						this.$router.push({name:'分类权重'});
						}
						
					});
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
			this.$refs[formName].resetFields();
			sessionStorage.removeItem("editorData");
            this.$router.push({name:'分类权重'});
        },
    }
}
</script>
<style lang="scss" scoped>
.page-view{
	position: relative;
	margin-top: 30px;
}
.form{
	padding: 20px 20px;
	background-color: #fff;
	margin:20px 0;
    .tips{
        margin-left:5px;
        color:#97a8be;
        font-size:12px;
    }
}
.el-input{
	width: 200px
}
.submit-btn{
	margin-left: 60px;
}
.cancel-btn{
    margin-left:20px;
}
</style>