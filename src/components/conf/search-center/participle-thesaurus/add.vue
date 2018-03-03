<template>
	<div class="page-view">
        <break-crumb :titles="titles"></break-crumb>
		<el-form class="form" :rules="rules" ref="ruleForm" :inline="false" :model="formInline" label-width="60px" label-position="left">
			<el-form-item label="词名" prop="value">
				<el-input class="search-input" v-model="formInline.value" placeholder="请输入词名"></el-input><span class="tips">长度为1—10个字符</span>
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
            titles:[{id:1,name:'搜索中心'},{id:2,name:'分词词库'},{id:3,name:'新增'}],
			formInline:{
				value:"",
			},
			rules:{
				value:[
					{ required: true,message: '请输入词名', trigger: 'change' },
                    { required: true, min:0, max: 10,message: '长度为1—10个字符', trigger: 'change' }
					// { pattern:/^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message:'不能输入特殊符号'}
                ],
			}
        }
	},
	mounted(){
		
	},
	methods: {
		submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
					this.$ajax.post(this.$apiUrl.participleAdd,{word:this.formInline.value}).then((res) =>
					{
						this.$message({
						message: "‘"+this.formInline.value+"’"+"词名新增成功！",
						type: 'success'
						});
						this.$router.push({name:'分词词库'});
					});
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$router.push({name:'分词词库'});
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