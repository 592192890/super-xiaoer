<template>  
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <step-header currentStep='3' style="margin-top:20px"></step-header>
        <section>
            <div class="mod-toolbar">
                <el-row class="img">
                    <img src="../../../../assets/images/SPU-success.png"/>
                </el-row>
                <el-row class="success">
                    <div >恭喜您,SKU新增成功！</div>
                </el-row> 
                <el-row class="edit">
                    <el-button @click="goEdit">重新编辑刚新增的SKU</el-button>
                </el-row> 
                <el-row class="other">
                    <div>您还可以</div>
                </el-row> 
                <el-row class="tips">
                    <div>1.继续"<span class="weight" @click="goAdd">新增SKU</span>"</div>
                    <div>2.进入“SKU列表”管理"<span class="weight" @click="goSKU">SKU商品</span>"</div>
                </el-row> 
            </div>
            
        </section>
    </div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import stepHeader from './header'
export default {
    components:{
		stepHeader,
        breakCrumb
	},
    data(){
        return {
           titles:[{id:1,name:'商品中心'},{id:2,name:'SPU管理'},{id:3,name:'SPU新增3'}],
           spuId:''
        }
    },
    methods:{
        goEdit:function(){
            this.$router.push({name:'SPU编辑',params:{entity:{spuId:this.spuId}}})
        },
        goAdd:function(){
            this.$router.push({name:'SPU新增1'})
        },
        goSKU:function(){
            this.$router.push({name:'SPU管理'})
        }
    },
    mounted(){
        if(this.$route.params.spuId){
            sessionStorage.setItem('spuId',JSON.stringify(this.$route.params.spuId));
        }
        this.spuId=sessionStorage.getItem('spuId');
    }
    
}
</script>
<style scoped lang="scss"> 
    .mod-toolbar{
        background-color:#ffffff;
        padding:25px;
        
    }
    .img{
        text-align:center;
        margin-top:50px;
        margin-bottom:20px;
    }
    .success{
        font-size:24px;
        color:#333333;
        text-align:center;
        margin-bottom:20px;
    }
    .edit{
        font-size:16px;
        color:#333333;
        text-align:center;
        margin-bottom:70px;
    }
    .other{
        text-align:center;
        margin-bottom:10px;
        font-size:20px;
    }
    .tips{
        text-align:center;
        font-size:16px;
        color:#666666;
    }
    .weight{
        color:#57a9e8;
    }
</style>