<template>
	<div class="page-view">
        <break-crumb :titles="titles"></break-crumb>
		<el-form class="form" :rules="rules" ref="ruleForm" :inline="false" :model="formInline" label-width="60px" label-position="left">
			<el-form-item label="词名" prop="value">
				<el-input class="search-input" v-model="formInline.value" placeholder="请输入词名"></el-input><span class="tips">以英文逗号分隔</span>
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
            titles:[{id:1,name:'搜索中心'},{id:2,name:'同义词库'},{id:3,name:'新增'}],
			operateTips:'新增成功',
			formInline:{
				value:"",
			},
			rules:{
				value:[
                    { required: true,message: '请输入词名', trigger: 'change' },
					{ required: true, min:0, max: 50,message: '长度为1—50个字符', trigger: 'change' }
                ],
			}
        }
	},
	mounted(){
		if(sessionStorage.getItem("editorData")){
			var editorData = JSON.parse(sessionStorage.getItem("editorData"));
			this.titles = [{id:1,name:'搜索中心'},{id:2,name:'同义词库'},{id:3,name:'编辑'}];
			this.operateTips="修改成功",
			this.id = editorData.id;
			this.wordGroup = editorData.wordGroup;
			this.formInline.value = editorData.wordGroup;
			this.url = this.$apiUrl.synonymUpdate;
		}else{
			this.url = this.$apiUrl.synonymAdd;
		};
	},
	methods: {
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
					this.$ajax.post(this.url,{wordGroup:this.formInline.value,id:this.id}).then((res) =>
					{
						if (res.error == 0) {
						this.$message({
						message: "‘"+this.formInline.value+"’"+this.operateTips+"！",
						type: 'success'
						});
						sessionStorage.removeItem("editorData");
						this.$router.push({name:'同义词库'});
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
            this.$router.push({name:'同义词库'});
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