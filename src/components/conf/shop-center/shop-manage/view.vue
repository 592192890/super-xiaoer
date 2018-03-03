<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form ref="form" :model="formEntity" label-width="120px" label-position="left">
                    <el-form-item label="店铺名称：" >
                        <el-col :span="6">
                            <span>{{formEntity.shopName}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="店铺所属商圈：" >
                        <el-col :span="6">
                            <span v-if="onlineOffline=='online'">{{formEntity.businessDistrictShowName}}</span>
                            <span v-if="onlineOffline=='offline'">{{formEntity.businessDistrictShowName?formEntity.businessDistrictShowName:'--'}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="经营类型">
                        <el-col :span="6">
                             <span>{{formEntity.settledTypeName}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="业态：" >
                        <el-col :span="6">
                            <span>{{formEntity.businessTypeName}}</span>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item label="店铺分类：" v-if="formEntity.businessTypeCode=='001'&&onlineOffline=='online'">
                        <el-col :span="6">
                            <span>{{formEntity.shopCategory.cateName}}</span>
                        </el-col>
                    </el-form-item>
                     <el-form-item label="店铺分类：" v-if="formEntity.businessTypeCode=='001'&&onlineOffline=='offline'">
                        <el-col :span="6">
                            <span>{{formEntity.shopCategory.cateName?formEntity.shopCategory.cateName:'--'}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="关联线下店铺：" v-if="onlineOffline=='online'">
                        <span>{{formEntity.referenceShop.shopName}}</span>
                    </el-form-item>
                    <el-form-item label="关联线下店铺：" v-if="onlineOffline=='offline'">
                        <span>{{formEntity.referenceShop.shopName?formEntity.referenceShop.shopName:'--'}}</span>
                    </el-form-item>
                    <el-form-item label="线下店铺编码：" >
                        <el-col :span="6">
                            <span v-if="onlineOffline=='online'">{{formEntity.referenceShop.shopMdCode}}</span>
                            <span v-if="onlineOffline=='offline'">{{formEntity.shopMdCode}}</span>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="EBS编码">
                        <el-col :span="6">
                            <span>{{formEntity.ebsCode}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="归属业务线：" >
                        <el-col :span="6">
                            <span>{{formEntity.serviceLineName}}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="客服电话：" >
                        <el-col :span="6">
                            <span v-if="onlineOffline=='online'">{{formEntity.customer.mobile}}</span>
                            <span v-if="onlineOffline=='offline'">{{formEntity.customer.mobile?formEntity.customer.mobile:'--'}}</span>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="联系手机号：" >
                        <el-col :span="6">
                            <span v-if="onlineOffline=='online'">{{formEntity.customer.phone}}</span>
                            <span v-if="onlineOffline=='offline'">{{formEntity.customer.phone?formEntity.customer.phone:'--'}}</span>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="店铺状态">
                    <el-col :span="6">
                        <span>{{formEntity.statusName}}</span>
                    </el-col>
                </el-form-item>
                    
                    
                    <el-form-item label-width="110px">
                        
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
			</el-col>
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
            return{
                titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'},{id:3,name:'查看店铺'}],
                formEntity:{
                    customer:{},
                    referenceShop:{},
                    shopCategory:{}
                },
                onlineOffline:''//判断是线上还是线下
            }
        },
        methods:{
            goBack:function(){
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'店铺管理',params:{currentPage:goPageIndex}})
            }
        },
        mounted(){
            if(this.$route.params.shopId){
                sessionStorage.setItem('shopId',this.$route.params.shopId);
                sessionStorage.setItem('onlineOffline',this.$route.params.type);

                sessionStorage.setItem('currentPage',this.$route.params.currentPage);
            }
            var shopId=sessionStorage.getItem('shopId');
            var type=sessionStorage.getItem('onlineOffline');
            var url=this.$apiUrl.getSimpleSopDetailUrl+'?shopId='+shopId+"&type="+type;
            this.onlineOffline=type;
            this.$ajax.get(url).then((res)=>{
                if(res.error!=0){
                    return
                }
                this.formEntity=Object.assign({},this.formEntity,res.data);
                

                if(!this.formEntity.shopCategory){
                    this.formEntity.shopCategory={}
                }
                if(!this.formEntity.referenceShop){
                    this.formEntity.referenceShop={}
                }
                if(!this.formEntity.customer){
                    this.formEntity.customer={}
                }
            })
            
           
        }
        
    }
</script>
<style scoped>
    .mod-toolbar{
        background-color:#ffffff;
        padding: 30px 30px 40px;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
</style>