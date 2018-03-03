<template>
    <div class="classify-add">
        <break-crumb :titles="titles"></break-crumb>
        <section>
            <el-col :span="24" class="mod-ctn">
                <el-form ref="formEntity" :rules="rules" :model="formEntity" label-position="right" label-width="120px">
                    <el-form-item label="分类名称" prop="catbackName">
                        <el-col :span="6">
                            <el-input v-model="formEntity.catbackName"></el-input>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="上级分类" prop="path">
                        <el-col :span="6" >{{ formEntity.path }}</el-col>
                    </el-form-item>
                    <el-form-item label-width="110px" class="btn-top">
                        <div class="button active" @click="submitForm('formEntity')">提交</div>
                        <div class="button" @click="goBack">取消</div>
                    </el-form-item>
                </el-form>
            </el-col>
        </section>
    </div>
    
</template>
<script>
import Util from '@/assets/js/util'
import breakCrumb from '@/components/common/breakCrumb';
export default {
    components: {
        breakCrumb
    },
    data(){
        return{
            titles:[{id:1,name:'商品中心'},{id:2,name:'后台分类管理-编辑'}],
            catbackId:"",
            parentId:"",
            formEntity: {
               catbackName: '',
               path:"",
            },
            rules: {
                catbackName: [
                    { required: true, validator: Util.validateForm.inputValidateClassify }
                ],
                path: [
                    { required: true }
                ]
            },
        }
    },

    methods:{
        submitForm:function(formName){           
            let catbackId;
            let formEntity = this.formEntity;
            let url= this.$apiUrl.editBackClassifyUrl;
            this.$refs[formName].validate(valid => {
                if (valid) { 
                    this.$ajax.get(url, {catbackId:this.catbackId,catbackName:formEntity.catbackName, parentId:this.parentId}).then(res =>{
                        if(res.error) return
                        this.$router.push({name:'后台分类管理',query: { parentId:this.parentId, mode:'display'}})
                    })
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
            this.$router.push({ name: '后台分类管理', query: { parentId:this.parentId, mode:'display'}})
        }
    },

    mounted(){
        let query = this.$route.query;
        if(query){
            this.formEntity.catbackName = query.catbackName || '';
            this.parentId = query.parentId||0;
            this.catbackId = query.catbackId||0; 
        }
        this.$ajax.get(this.$apiUrl.getPathUrl,{parentId:this.parentId}).then(res =>{
            this.formEntity.path = res.data.path
        })  
    }
}
</script>
<style lang="scss" >
.classify-add{
    .el-form-item__label{
        text-align:left;
    }
    .mod-ctn{
        width: 100%;
        background-color: #fff;
        padding: 30px 30px 250px;
        box-sizing: border-box;
        border-radius: 5px
    }
    .btn-top{
        margin: 40px 0 0 10px;
        .button{
            width:70px;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #c4c4c4;
            color: #1f2d3d;
            margin: 0;
            padding: 10px 15px;
            border-radius: 4px;
            text-align:center;
            margin-right:20px;
            &.active{
                background: #33bcac;
                border: 1px solid #33bcac;
                color:#fff;
            }
        }
    }
}
</style>