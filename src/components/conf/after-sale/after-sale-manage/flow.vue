<template>  
    <div class="type-flow">
        <break-crumb :titles="titles"></break-crumb>
        <section class="header" style="margin-top:20px">
            <div class="mod-toolbar">
                <el-row :gutter="40">
                    <el-table :data="formEntity.applyItems" highlight-current-row style="width: 100%;">
                        <el-table-column prop="productName" label="商品名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="bn" label="货号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="reverseQuantity" label="申请数量" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="salePrice" label="销售单价" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </el-row>
                
            </div>
            <section>
                <div class="mod-toolbar">
                    <el-row>
                        <h1 class="header">申请单明细</h1>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">退货地址：</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="label item">{{formEntity.receiveAddr}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">联系电话：</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="label item">{{formEntity.receiveTel}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">收货人：</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="label item">{{formEntity.receiveName}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">邮编：</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="label item">{{formEntity.receiveZip}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">物流信息：</div>
                        </el-col>
                        <el-col :span="4">
                            <el-select placehoder="请选择" v-model="formEntity.expressCompanyId" @change="changeExpress">
                                <el-option :label="item.name" :value="item.code" v-for="item in expressList" :key="item.code"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <div class="label">请填写物流单号：</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-bind:class="{error:isError}" v-model="formEntity.expressNo" placehoder="请输入50位以下的数字和字母" @change="validateFiled"></el-input>
                        </el-col>
                        <el-col :span="6" v-if="isError">
                            <div class="label item" style="color:#ff4949">1-50位的数字和字母</div>
                        </el-col>
                    </el-row>
                </div>   
            </section>
            <el-row :span="24" class="mod-toolbar" :gutter="5">
                <el-button class="primary submit-btn" @click="goSubmit">提交</el-button>
                <el-button class="primary" @click="goBack">取消</el-button>
            </el-row>
        </section>
        
    </div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
export default {
    components:{
        breakCrumb
	},
    data(){
        return {
           titles:[{id:1,name:'售后'},{id:2,name:'售后申请单管理'},{id:3,name:'填写物流'}],
           formEntity:{
               applyItems:[],
               expressCompanyId:'',
               expressNo:''
           },
           isError:false,
           expressCompanyId:'',
           expressCompanyName:'',
           expressNo:'',  
           expressList:[],
     
        }
    },
    methods:{
        validateFiled:function(){
            if(!/^[\d\w]{1,50}$/.test(this.formEntity.expressNo)){
                this.isError=true;
            }else{
                this.isError=false;
            }
        },
        goBack:function(){
            this.$router.push({name:'售后申请单管理列表',params:{currentPage:sessionStorage.getItem('currentPage')}})
        },
        goSubmit:function(){
            if(this.isError||!this.formEntity.expressNo){
                this.isError=true;
                return;
            }
            var url=this.$apiUrl.typeFlowUrl;
            var params={
                expressCompanyId:this.formEntity.expressCompanyId,
                expressCompanyName:this.formEntity.expressCompanyName,
                expressNo:this.formEntity.expressNo,
                reverseApplyId:sessionStorage.getItem('applyItemId')
            }
            this.$ajax.post(url,params).then(res=>{
                if(res.error==0){
                    this.$message({
                        type:'success',
                        message:'提交成功'
                    })
                    this.goBack();
                }
            })
        },
        changeExpress:function(){
            var list=this.expressList;
            for(var i=0;i<list.length;i++){
                if(list[i].code==this.formEntity.expressCompanyId){
                    this.formEntity.expressCompanyName=list[i].name;
                    break;
                }
            }
        },
        getAllExpressList:function(){
            var url=this.$apiUrl.getAllLogisticCompaniesUrl;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.expressList=res.data;

                    // this.expressCompanyId=res.data[0].code;
                }
            })
            //获得申请单明细
            this.getDetail(sessionStorage.getItem('applyItemId'))
        },
        getDetail:function(id){
                var url=this.$apiUrl.getApplyOrderDetailUrl;
                var params={
                    reverseId:id
                }
                this.$ajax.get(url,params).then(res=>{
                    if(res.error==0){
                        this.formEntity=Object.assign({},res.data.reverseApply);

                        // 如果没有选择快递公司，默认选择第一个
                        if(!this.formEntity.expressCompanyId){
                            this.expressCompanyId=this.expressList[0].code;
                        }
                    }
                })
            },
    },
    mounted(){
        if(this.$route.params.row){
            sessionStorage.setItem('applyItemId',this.$route.params.row.reverseApplyId)
            sessionStorage.setItem('currentPage',this.$route.params.currentPage)
        }
        var applyItemId=sessionStorage.getItem('applyItemId')
        //获得所有的快递公司
        this.getAllExpressList();

        
    }
}
</script>
<style scoped lang="scss"> 
.submit-btn{
    border:none;
    background-color:#33bbab;
    color:#fff;
}
.header{
    font-size:16px;
    color:#33bbab;
    background-color:#ffffff;
}
.mod-toolbar{
    background-color:#ffffff;
    margin-left:0px!important;
    .el-row{
        border-bottom:1px solid #f3f5f7;
        margin-left:0px!important;
        margin-right:0px!important;
        .el-col{
            padding-left:0px;
            padding-right:0px;
        }
    }
}
.label{
    font-size:14px;
    color:#666666;
    height:40px;
    line-height:40px;
}
</style>
<style>
.type-flow .el-input.error .el-input__inner{
    border:1px solid #ff4949;
}
</style>