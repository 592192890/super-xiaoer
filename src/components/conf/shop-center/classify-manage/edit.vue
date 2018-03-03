<template>
	<div class="classify-edit">
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-ctn">
				<el-form ref="formEntity" :rules="rules" :model="formEntity" label-position="right" label-width="120px">
                    <el-form-item label="店铺类型名称：" prop="cateName">
                        <el-col :span="6">
                            <el-input v-model="formEntity.cateName"></el-input>
                        </el-col>

                    </el-form-item>

                    <el-form-item label="上级店铺类型：">
                        <el-col :span="6" >{{ parentName }}</el-col>
                    </el-form-item>

                    <el-form-item label="排序：" prop="cateSort">
                        <el-col :span="6">
                            <el-input v-model.number="formEntity.cateSort"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label-width="110px" class="btn-top">
                        <div class="button active" @click="submitForm('formEntity')">保存</div>
                        <div class="button" @click="goBack">取消</div>
                    </el-form-item>
                </el-form>
			</el-col>
		</section>
	</div>

</template>
<script>
import breakCrumb from '@/components/common/breakCrumb';
import Util from '@/assets/js/util';
var limitNumber = Util.validateForm.limitNumber;
export default {
    components: {
        breakCrumb
    },
    data(){
        return{
            titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺分类管理'},{id:3,name:'编辑店铺分类'}],
            formEntity: {
              cateName: '',
              cateSort: ''
            },
            rules: {
                cateName: [
                    { required: true, message: '请输入店铺分类名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' }
                ],
                cateSort: [
                    { required: true, type: 'number', validator:limitNumber, trigger: 'blur'}
                ]
            },
            parentId:"",
            parentName:"",
            id:"",
            order:""
        }
    },

    methods:{
        submitForm:function(formName){
            let item = {};
            let formEntity = this.formEntity;
            let cateName = formEntity.cateName;
            let cateSort = formEntity.cateSort;
            let url= this.$apiUrl.editShopclassifyUrl;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$ajax.get(url,{name:cateName, id:this.id, parentId:this.parentId, sort:cateSort}).then(res =>{
                        if(res.error==1){
                            return
                        }
                        this.$router.push({name:'店铺分类管理', query: { id: this.id, parentId:this.parentId, mode:'display'}})
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },

        goBack(){
            this.$router.push({ name: '店铺分类管理', query: { id: this.id, parentId:this.parentId, mode:'display'}})
        }
    },

    mounted(){
        let query = this.$route.query;
        if(query){
            this.parentId = query.parentId;
            this.id = query.id;
            this.cateName = query.cateName;
            this.cateSort = query.cateSort;
            this.parentName = query.parentName;

            this.formEntity = {
                cateName : this.cateName,
                cateSort: this.cateSort
            }
        }
    }

}
</script>
<style lang="scss">

.classify-edit{
    .el-form-item{
        margin-bottom: 10px;
        &.is-required{
            content: " ";
            .el-form-item__label:before{
                content: " ";
            }
        }
    }
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
