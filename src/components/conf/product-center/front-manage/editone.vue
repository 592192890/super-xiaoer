<template>
	<div class="classify-add">
        <break-crumb :titles="titles"></break-crumb>
		<section class="right-ctn">
            <div class="mod-steps">
                <div class="step-one">1，填写基本信息</div>
                <div class="dotted"></div>
                <div class="step-two">2，设置筛选条件</div>
                <div class="dotted"></div>
                <div class="step-three">3，编辑成功</div>
            </div>
			<el-col :span="24" class="mod-toolbar">
                <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="110px" label-position="left" class="form">
                    <el-form-item label="分类名称" prop="catName">
                        <el-col :span="6">
                            <el-input v-model="formEntity.catName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="所属业务线" prop="targetName">
                        <el-col :span="6">
                            <div>{{ formEntity.targetName }}</div>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="上级分类" prop="parentName">
                        <el-col :span="6">
                            <div>{{ formEntity.parentName }}</div>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="分类图片" prop="imageUrl">
                        <el-col :span="3">
                            <el-upload
                              v-loading="loading"
                              class="avatar-uploader"
                              :action="uploadUrl"
                              :data="fileParams"
                              :with-credentials="true"
                              :before-upload="beforeAvatarUpload"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :on-error="handleAvatarError">
                              <img v-if="formEntity.imageUrl" :src="formEntity.imageUrl" class="avatar">
                              <img v-else class="el-icon-plus" src="../../../../assets/images/upload-default.jpg"></img>
                            </el-upload>
                        </el-col>
                        <el-col :span="15">
                            <span class="text-pic">以各客户端的图片尺寸要求为准,（手机端使用220*220），如果不填写则用各客户端默认的图片</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="链接" prop="linkUrl">
                        <el-col :span="6">
                            <el-input v-model="formEntity.linkUrl"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <span class="text-link">如果填写链接，关联到专题页面，规则失效</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="80px" class="ml">
                        <el-button type="primary" @click="goSave('ruleForm')">下一步</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
		</section>
	</div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import Util from '@/assets/js/util'
export default {
    components: {
        breakCrumb
    },
    data(){
        return{
            titles:[{id:1,name:'店铺中心'},{id:2,name:'前台展示管理-编辑'}],
            options1:[],
            options2:[],
            options3:[],
            parentId:0,
            catId:0,
            loading:false,
            uploadUrl:'',
            fileParams:{
                security:true
            },
            formEntity:{
                catName:'',
                imageKey:'',
                imageUrl:'',
                parentName:'',
                targetName:'',
                linkUrl:'',
                value1: '',
                value2: '',
                value3: ''
            },
            rules: {
                catName: [
                    {required:true, validator: Util.validateForm.inputValidateCommonText}
                ],
                targetName: [
                    { required: true, message: '请选择业务线', trigger: 'blur' }
                ],
                parentName: [
                    { required: true, message: '请选择上级分类', trigger: 'blur' }
                ],
                imageUrl: [
                    { required: true, message: '请选择分类图片', trigger: 'blur' }
                ]
            }
        }
    },

    methods:{
        handleAvatarSuccess(res, file) {
            this.loading = false
            if(res.error) return
            this.formEntity.imageKey = res.data.imageKey;
            this.formEntity.imageUrl = res.data.imageUrl;
        },
        handleAvatarError(){
            this.$message.error('图片上传失败!');
        },
        beforeAvatarUpload(file) {
            this.loading = true
            let isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
              this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt1M;
        },

        goSave:function(formName){           
            let item = {};
            let formEntity = this.formEntity;
            let cateName = formEntity.cateName;
            let cateSort = formEntity.cateSort;
            let id;
            let url= this.$apiUrl.addShopclassifyUrl;
            this.$refs[formName].validate(valid => {
                if (valid) { 
                    this.$router.push({ name: '前台展示管理-编辑2', query: { parentId:this.parentId, targetName:this.formEntity.targetName, addLevelOne: this.addLevelOne,catName:this.formEntity.catName,imageKey:this.formEntity.imageKey,targetType:this.targetType,linkUrl:this.formEntity.linkUrl,catId:this.catId,imageUrl:this.formEntity.imageUrl}})
                } else {
                    this.$message({
                        showClose: true,
                        message: '信息有误，请重新提交!',
                        type: 'error'
                    });
                    return false;
                }
            });   
        },
        goBack(){
            this.$router.push({ name: '前台展示管理', query: { catId: this.catId, parentId:this.parentId, mode:'display'}})
        }
    },

    mounted(){
        this.uploadUrl = this.$apiUrl.uploadImageUrl;
        let query = this.$route.query;
        if(query){
            this.parentId = query.parentId;
            this.catId = query.catId;
            this.targetType = query.targetType;
            this.formEntity.targetName = query.targetName;
            this.formEntity.catName = query.catName
            this.formEntity.imageKey = query.imageKey
            this.formEntity.linkUrl = query.linkUrl
            this.formEntity.imageUrl = query.imageUrl || ''
        }
        let url= this.$apiUrl.getFrontClassifyPath;
        this.$ajax.get(url,{parentId:this.parentId}).then(res =>{
            if(res.error) return
            this.formEntity.parentName = res.data.pathName
        })
    }
}
</script>
<style lang="scss" scoped>
.right-ctn{
    margin-top: 20px;
    width: 100%;
    padding: 28px 30px;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    .mod-steps{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content:space-between;
        .step-one{      
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #33bbab;
            background-color: #e1f5f3;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
        }
        .dotted{
            width: 270px;
            height: 20px;
            border-bottom: 1px dashed #e5e5e5;
        }
        .step-two{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            border: 1px solid #e5e5e5;
            background-color: #fff;
            border-radius: 30px;
            text-align: center;
            /* &:before{
                float: left;
                width: 168px;
                height: 40px;
                background-color: #f00; 
            } */
        }
        .step-three{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            border: 1px solid #e5e5e5;
            border-radius: 30px;
            text-align: center;
        }
    }
    .mod-toolbar{
        padding: 40px 0;
        background-color: #fff;
    }
    .distance{
        margin: 0 15px;
    }
}
.avatar-uploader{
    margin: 10px 0;
}
.avatar-uploader .el-upload {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar-uploader{
    width: 100px;
    height: 100px;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
.text-pic{
    font-size: 12px;
    color: #999;
}
.text-link{
    font-size: 12px;
    color: #999;
    padding-left: 20px;
}
.ml{
    margin: 50px 0 0 30px;
}
.el-form-item__error{
    position: relative;
    top: 8px;
    left: 10px;
}

</style>