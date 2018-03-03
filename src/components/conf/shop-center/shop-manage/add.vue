<template>
	<div class="add-shop">
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="110px" label-position="left" class="form">
                    <el-form-item label="店铺名称" prop="shopName">
                        <el-col :span="6">
                            <el-input v-model="formEntity.shopName" placeholder="请输入不超过15个字符的店铺名"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="店铺所属商圈" required>
                        <el-col :span="5" style="height:36px;">
                            <el-form-item>
                                <cascader-select v-on:returnCascaderArr="getCascaderArr">
                                
                                </cascader-select>
                                <p v-if="isCascaderError" style="margin-top:30px;font-size:12px;color:#ff4949">请选择省市区</p>
                            </el-form-item>
                        </el-col>
                    
                        <el-col :span="6">
                            <el-form-item>
                                <el-select v-model="formEntity.businessDistrictId" placeholder="请选择商圈" >
                                    
                                    <el-option
                                        v-for="item in cricleList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <p v-if="!hasBusinessDistrict" style="font-size:12px;color:#ff4949;position:absolute;top:30px">该区域没有商圈</p>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="经营类型" prop="settledType" required>
                        <el-col :span="6">
                            <el-select v-model="formEntity.settledType" placeholder="请选择经营类型">
                                
                                <el-option
                                    v-for="item in settledTypeList"
                                    :key="item.code"
                                    :label="item.description"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                            
                        </el-col>
                    </el-form-item>
                    <el-form-item label="业态" prop="businessTypeCode">
                        <el-col :span="6">
                            <el-select v-model="formEntity.businessTypeCode" placeholder="请选择">
                                
                                <el-option
                                    v-for="item in businessTypeList"
                                    :key="item.code"
                                    :label="item.description"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                            
                        </el-col>
                    </el-form-item>
                    <el-form-item label="店铺类型" v-if="formEntity.businessTypeCode=='001'">
                        <el-col :span="6">
                            <radio-tree :treeData="treeData" v-on:returnRadioTreeObj="getShopType"></radio-tree>
                            
                        </el-col>
                    </el-form-item>
                    <el-form-item label="关联线下店铺" prop="offlineShop" required>
                        <el-col :span="6">
                            <el-input v-model="formEntity.offlineShop" :disabled="true"></el-input>
                        </el-col>
                        
                        <el-col :span="6" style="margin-left:10px">
                            <el-button @click="searchShop">查找</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="线上店铺编码">
                        <el-col :span="6">
                            <div>{{formEntity.shopMdCode}}</div>
                            
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="EBS编码" prop="ebsCode" required>
                        <el-col :span="6">
                            <el-input v-model="formEntity.ebsCode"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="归属业务线" prop="serviceLine" required>
                        <el-col :span="6">
                            <el-select v-model="formEntity.serviceLine" placeholder="请选择状态">
                                <el-option
                                    v-for="item in serviceLineList"
                                    :key="item.code"
                                    :label="item.description"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="客服电话" prop="mobile">
                        <el-col :span="6">
                            <el-input v-model="formEntity.mobile"></el-input>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="联系手机号" prop="phone">
                        <el-col :span="6">
                            <el-input v-model="formEntity.phone"></el-input>
                        </el-col>
                        
                    </el-form-item>
                    <el-form-item label="店铺状态" required>
                    <el-col :span="6">
                        <el-select v-model="formEntity.status" placeholder="请选择状态">
                            <el-option
                                v-for="item in shopStatusList"
                                :key="item.code"
                                :label="item.description"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                    <el-form-item label-width="110px">
                        <el-button type="primary" @click="add('ruleForm')">提交</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
			</el-col>
		</section>
        <search-shop-dialog :isShow="isShowSearchShopDialog" v-on:watchDialog="closeDialog" v-on:passSelectShop="showRelatedShop"></search-shop-dialog>
    </div>
	
</template>
<script>
    import searchShopDialog from '@/components/common/packageDialog/searchShopDialog'
    import breakCrumb from '@/components/common/breakCrumb'
    import cascaderSelect from '@/components/common/cascaderSelect'
    import radioTree from '@/components/common/radioTree'
    import Util from '@/assets/js/util'
    export default {
        components:{
            searchShopDialog,
            breakCrumb,
            cascaderSelect,
            radioTree
        },
        data(){
            var isMobileNumber = Util.validateForm.isMobileNumber;
            var isPhoneNumber = Util.validateForm.isPhoneNumber;
            
            return{
                treeData:[],
                hasBusinessDistrict:true,
                isCascaderError:false,
                titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'},{id:3,name:'店铺新增'}],
                isShowSearchShopDialog:false,
                cricleList:[],
                serviceLineList:[],
                businessTypeList:[],
                settledTypeList:[],
                shopStatusList:[],
                formEntity:{
                    shopName:'',
                    businessDistrictId:'',
                    shopCode:'',
                    offlineShop:'',
                    serviceLine:null,
                    businessTypeCode:'',
                    addr:'',
                    settledType:'3',
                    status:'10'
                },
                ruleForm: {
                    shopName:'',
                    name: '',
                    region: '',
                    businessTypeCode:'',
                    address:'',
                    shopCode:'',
                    mobile:'',
                    phone:'',
                    offlineShop:'',
                    serviceLine:'',
                    settledType:'',
                    ebsCode:''
                },
                rules: {
                    mobile:[
                        { max:15,message:'不能超过15位',trigger: 'change',filedName:"客服电话" }

                    ],
                    phone:[
                        { validator:isMobileNumber,trigger: 'change',filedName:"联系电话" }
                        
                    ],
                    name: [
                        { required: true, message: '请输入店铺名', trigger: 'change' },
                        { min: 1, max: 10, message: '不能超过10个字符', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    settledType:[
                        { required: true, message: '请选择经营类型', trigger: 'change' }
                    ],
                    shopName: [
                        { required: true, message: '请输入店铺名称', trigger: 'change' },
                        { min: 1, max: 15, message: '不能超过15个字符', trigger: 'change' }
                    ],
                    businessTypeCode: [
                        { required: true, message: '请选择业态', trigger: 'change' }
                    ],
                    shopCode: [
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    offlineShop: [
                        { required: true, message: '请选择关联店铺', trigger: 'change' }
                    ],
                    serviceLine: [
                        { required: true, message: '请选择业务线', trigger: 'change' }
                    ],
                    ebsCode:[
                        { required: true, message: '请填入EBS编码', trigger: 'change' },
                        {min:1,max:20,message:'最多20个字符', trigger: 'change'}
                    ]
                },
                
            }
        },
        methods:{
            getShopType:function(value){
                // console.log(value);
                this.formEntity.shopCategoryId=value.id;
            },
            add:function(formName){
                if(!this.formEntity.addr){
                    this.isCascaderError=true;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //判断该区域是否有商圈
                        if(this.hasBusinessDistrict){
                            var url=this.$apiUrl.addShopUrl;
                            var params=this.formEntity;
                            this.$ajax.post(url,params).then(res=>{
                                if(res.error==0){
                                    this.$message({
                                        type:'success',
                                        message:"新增成功！"
                                    })
                                    this.goBack()
                                }
                            })
                        }
                        
                    } else {
                        // console.log('error submit!!');
                        if(!this.cricleList.length){
                            this.hasBusinessDistrict=false;
                        }
                        return false;
                    }
                });
            },
            goBack:function(){
                this.$router.push({name:'店铺管理'})
            },
            searchShop:function(){
                this.isShowSearchShopDialog=true;
                // this.formEntity.shopCode="123";
            },
            closeDialog:function(status){
                this.isShowSearchShopDialog=status;
            },
            showRelatedShop:function(entity){
                this.formEntity.offlineShop=entity.shopName;
                this.formEntity.referenceShopId=entity.id;
                this.formEntity.shopMdCode=entity.shopMdCode;
                this.isShowSearchShopDialog=false;
            },
            getBusinessTypes:function(){
                var url=this.$apiUrl.getBusinessStatusUrl;

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        sessionStorage.setItem('businessType',JSON.stringify(res.data));
                        this.businessTypeList=res.data;
                    }
                   
                })	
            },
            getServiceLines:function(){
                var url=this.$apiUrl.getServiceLineListUrl;

                this.$ajax.post(url).then((res)=>{
                    if(res.error==0){
                        sessionStorage.setItem('serviceLine',JSON.stringify(res.data));
                        this.serviceLineList=res.data;
                    }
                    
                })	
            },
            getShopTypes:function(){
                var url=this.$apiUrl.getShopTypeUrl;

                this.$ajax.post(url).then((res)=>{
                    if(res.error==0){
                        sessionStorage.setItem('shopType',JSON.stringify(res.data.list));
                        this.treeData=res.data.list;
                    }
                    
                  
                })	
            },
            getSettledTypes:function(){
			
                this.settledTypeList=[{
                    code:'3',
                    description:'自营'
                }];
            },
            getShopStatus:function(){
                //产品要求只显示这个
                this.shopStatusList=[
                    {code: "10", description: "正常营业"}
                ];
            },
            //得到省市区
            getCascaderArr:function(result){
                if(!result){
                    return;
                }
                this.formEntity.addr=JSON.stringify(result);
                
                this.isCascaderError=false;

                //查询商圈
                var url=this.$apiUrl.getCricleListUrl
                var params={
                    cityCode:result.city.id,
                    districtCode:result.district.id,
                    provinceCode:result.province.id
                }
                this.$ajax.get(url,params).then((res)=>{
                    if(res.error==0){
                        this.cricleList=res.data;
                        if(res.data.length>0){
                            this.formEntity.businessDistrictId=res.data[0].id;
                            this.hasBusinessDistrict=true;
                        }else{
                            this.formEntity.businessDistrictId="";
                            this.hasBusinessDistrict=false;
                        }
                    }
                    
                    
                })	
            }
        },
        mounted(){
            
            //下拉框
            if(sessionStorage.getItem('businessType')){
                this.businessTypeList=JSON.parse(sessionStorage.getItem('businessType'));
            }else{
                this.getBusinessTypes();
            }

            if(sessionStorage.getItem('serviceLine')){
                this.serviceLineList=JSON.parse(sessionStorage.getItem('serviceLine'));
            }else{
                this.getServiceLines();
            }
            if(sessionStorage.getItem('shopType')){
                this.treeData=JSON.parse(sessionStorage.getItem('shopType'));
    
            }else{
                this.getShopTypes();
            }
            this.getSettledTypes();
            
            this.getShopStatus();
            
        }
        
    }
</script>
<style scoped>
    .mod-toolbar{
        background-color:#ffffff;
        padding: 30px 30px 40px;
    }
    .form > .el-form-item {
        margin-bottom:20px;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
    .confirm-btn{
        background-color:#33bbab;
        border:none;
    }
</style>
<style>
    .add-shop .el-radio__label{
        display:none;
    }
</style>