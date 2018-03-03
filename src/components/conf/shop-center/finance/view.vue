<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section style="margin-top:20px">
	
            <div class="company mod-toolbar">
                <el-row>
                <h1 class="header">公司及联系人信息</h1>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">公司完整名称</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">{{formEntity.businessInfo.companyName}}</div>
              
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">公司详细地址</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right">{{formEntity.businessInfo.companyAddress}} {{formEntity.businessInfo.address}}</div>
              
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">联系人姓名</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.name}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">联系电话</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.phone}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">营业执照注册号</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.bussinessLicense}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">营业执照有效期</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.endDate}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">统一社会信用代码</div>
                    </el-col>
                    <el-col :span="18">
                        <div class="right">{{formEntity.businessInfo.unifiedSocialCreditCode}}</div>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">特许经营资质代码</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.franchisingCode}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">特许经营资质有效期</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.franchisingEndDate}}</div>
                    </el-col>
                </el-row>
                <el-row class="last-row">
                    <el-col :span="4">
                        <div class="label">营业执照扫描件</div>
                    </el-col>
                    <el-col :span="6">
                            <div v-show="!formEntity.businessImg.businessUrl" style="height:40px"></div>
                            <img v-show="formEntity.businessImg.businessUrl" class="right" :src="formEntity.businessImg.businessUrl"></img>
                        </el-col>
                        <el-col :span="4">
                            <div class="label">特许经营资质扫描件</div>
                        </el-col>
                    <el-col :span="6">
                        
                        <img v-show="formEntity.businessImg.franchisingUrl" class="right" :src="formEntity.businessImg.franchisingUrl"></img>
                    </el-col>
                </el-row>
            </div>
            <div class="finance mod-toolbar">
                <el-row>
                    <h1 class="header">财务信息</h1>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">银行开户名</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.bankAccountName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">公司银行账号</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.bankAccount}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">开户行支行名称</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.branchName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">开户行支行联行号</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.branchNo}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">开户行所在地</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.bankAddress}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">纳税人识别号</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.taxpayerNumber}}</div>
                    </el-col>
                </el-row>
                
                <el-row class="last-row">
                    <el-col :span="4">
                        <div class="label">银行开户许可证扫描件</div>
                    </el-col>
                    <el-col :span="6">
                        <img v-bind:style="{ opacity: formEntity.businessImg.bankPermitsUrl?1:0 }" class="right" :src="formEntity.businessImg.bankPermitsUrl"></img>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">税务登记证扫描件</div>
                    </el-col>
                    <el-col :span="6">
                        <img class="right" v-bind:style="{ opacity: formEntity.businessImg.registrationUrl?1:0 }" :src="formEntity.businessImg.registrationUrl"></img>
                    </el-col>
                </el-row>
            </div>
            <div class="operation mod-toolbar">
                <el-row>
                    <h1 class="header">经营信息</h1>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">店铺名称</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.shopName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">店铺所属商圈</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessDistrict.name}}</div>
                    </el-col>
                </el-row>
                <el-row v-for="(item,index) in formEntity.businessCategories" :key="item.id" v-bind:class="{'last-row':index==formEntity.businessCategories.length}">
                    <el-col :span="4">
                        <div class="label">经营分类{{index+1}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{item.firstCategory}}-{{item.secondCategory}}-{{item.thirdCategory}}</div>
                    </el-col>
                    
                </el-row>
               
            </div>
            <div class="payment mod-toolbar">
                <el-row>
                    <h1 class="header">缴费信息</h1>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">抽佣方式</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.commissionType}}</div>
                    </el-col>
                    
                </el-row>
                <el-row v-for="(item,index) in formEntity.businessCategories" :key="item.id"> 
                    <el-col :span="4">
                        <div class="label">经营分类{{index+1}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{item.firstCategory}}-{{item.secondCategory}}-{{item.thirdCategory}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">设置抽佣比例</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{item.percentage}}%</div>
                    </el-col>
                </el-row>
     
         
                <el-row>
                    <el-col :span="4">
                        <div class="label">店铺类型</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.settledType}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">业态</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessTypeCode}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">店铺渠道</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.onlineOffline}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">归属业务线</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.serviceLine}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">店铺编码</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.shopMdCode}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">店铺有效截止日期</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.validDate}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">技术服务费</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.techFee}}元/年</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">保证金</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.securityFee}}元</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">应缴金额</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.yjFee}}元</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">结算周期</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.settleDays}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">对接的财务系统</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.businessFinaceSystem}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">财务账套代码</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.hlbCwzt}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">海波龙系统业务线</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.hlbBusinessType}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">核算业务代码</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.businessHSYT}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">付款凭证说明</div>
                    </el-col>
                    <el-col :span="18">
                        <div style="font-size:14px">{{formEntity.businessInfo.payProoRemark}}</div>
                    </el-col>
                   
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <div class="label">付款凭证扫描件</div>
                    </el-col>
                    <el-col :span="6">
                        <img v-bind:style="{ opacity: formEntity.businessImg.payProofUrl?1:0 }" :src="formEntity.businessImg.payProofUrl"></img>
                    </el-col>
                    
                </el-row>
                <el-row class="last-row">
                    <el-col :span="4">
                        <div class="label">审核意见</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="right">{{formEntity.businessInfo.finaceFailReason}}</div>
                    </el-col>
                    
                </el-row>
            </div> 
			<el-button @click="goBack">返回</el-button>	
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
                titles:[{id:1,name:'店铺中心'},{id:2,name:'财务审核'},{id:3,name:'查看财务信息'}],
                formEntity:{
                    businessInfo:{
                        companyAddressObj:{},
                        bankAddressObj:{},
                        settleDays:'',
                        hlbBusinessType:''
                    },
                    businessImg:{},
                    options:{
                        hlbBusinessTypes:[],
                        settleDays_types:[]
                    },
                    businessDistrict:{},
                    businessCategories:[]
                }
            }
        },
        methods:{
            goBack:function(){
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'财务审核',params:{currentPage:goPageIndex}})
            }
        },
        mounted(){
            if(this.$route.params.shopId){
                sessionStorage.setItem('financeShopId',this.$route.params.shopId);
                sessionStorage.setItem('currentPage',this.$route.params.currentPage);
            }
            var shopId=sessionStorage.getItem('financeShopId');
            var url=this.$apiUrl.getFinanceDetailUrl+'?shopId='+shopId;
    
            this.$ajax.get(url).then((res)=>{
                if(res.error!=0){
                    return;
                }
                this.formEntity=Object.assign({},this.formEntity,res.data);
                
               
                //将业务线id转为name
                var serviceLineArr=this.formEntity.options.service_lines;
                if(this.formEntity.serviceLine){
                    for(var i=0;i<serviceLineArr.length;i++){
                        var item=serviceLineArr[i];
                        if(item.id==this.formEntity.serviceLine){
                            this.formEntity.serviceLine=item.name;
                            break;
                        }
                    }
                }

                //将店铺类型id转为name
                var settledTypeArr=this.formEntity.options.settled_types;
                if(this.formEntity.settledType){
                    for(var i=0;i<settledTypeArr.length;i++){
                        var item=settledTypeArr[i];
                        if(item.id==this.formEntity.settledType){
                            this.formEntity.settledType=item.name;
                            break;
                        }
                    }
                }

                //将业态name转为name
                var businessTypeArr=this.formEntity.options.business_types;
                if(this.formEntity.businessTypeCode){
                    for(var i=0;i<businessTypeArr.length;i++){
                        var item=businessTypeArr[i];
                        if(item.id==this.formEntity.businessTypeCode){
                            this.formEntity.businessTypeCode=item.name;
                            break;
                        }
                    }
                }
                //将结算周期id转为name
                var settleDaysArr=this.formEntity.options.settleDays_types;
                if(this.formEntity.businessInfo.settleDays){
                    for(var i=0;i<settleDaysArr.length;i++){
                        var item=settleDaysArr[i];
                        if(item.id==this.formEntity.businessInfo.settleDays){
                            this.formEntity.businessInfo.settleDays=item.name;
                            break;
                        }
                    }
                }
                //将海波龙业务线id转为name
                var hlbBusinessTypeArr=this.formEntity.options.hlbBusinessTypes;
                if(this.formEntity.businessInfo.hlbBusinessType){
                    for(var i=0;i<hlbBusinessTypeArr.length;i++){
                        var item=hlbBusinessTypeArr[i];
                        if(item.id==this.formEntity.businessInfo.hlbBusinessType){
                            this.formEntity.businessInfo.hlbBusinessType=item.name;
                            break;
                        }
                    }
                }
                //将抽佣比例id转为name
                var commissionTypeArr=this.formEntity.options.commission_types;
                if(this.formEntity.businessInfo.commissionType){
                    for(var i=0;i<commissionTypeArr.length;i++){
                        var item=commissionTypeArr[i];
                        if(item.id==this.formEntity.businessInfo.commissionType){
                            this.formEntity.businessInfo.commissionType=item.name;
                            break;
                        }
                    }
                }
                //将店铺渠道id转为name
                var shopChannel=this.formEntity.options.shop_channels;
                if(this.formEntity.onlineOffline){
                    for(var i=0;i<shopChannel.length;i++){
                        var item=shopChannel[i];
                        if(item.id==this.formEntity.onlineOffline){
                            this.formEntity.onlineOffline=item.name;
                            break;
                        }
                    }
                }
               
            })	
            
           
        }
        
    }
</script>
<style scoped lang="scss">
    .header{
        font-size:16px;
        color:#33bbab;
    }
    
    .label{
        font-size:14px;
        color:#666666;
        height:40px;
        line-height:40px;
    }
    .right{
        height:40px;
        line-height:40px;
        color:#333333;
        font-size:14px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .mod-toolbar{
        background-color:#ffffff;
        padding:25px;
        .el-row{
            border-bottom:1px solid #f3f5f7;
        }
        .last-row{
            border:none;
        }
    }
    img{
        width:100px;
        height:100px!important;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
</style>