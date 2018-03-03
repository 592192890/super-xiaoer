<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="110px" label-position="left" class="form">
                <el-form-item label="店铺名称" prop="shopName">
                    <el-col :span="6">
                        <el-input v-model="formEntity.shopName"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="店铺所属商圈" required>
                    <el-col :span="5" style="height:36px;">
                        <el-form-item>
                            <cascader-select type="edit" :circleItem="formEntity.businessDistrict" v-if="isShowCascaderSelect" v-on:returnCascaderArr="getCascaderArr">
                                
                            </cascader-select>
                        </el-form-item>
                    </el-col>
                
                    <el-col :span="6">
                        <el-form-item>
                            <el-select v-model.number="businessDistrictId" placeholder="请选择商圈" @change="changeBusinessDistrict">
                                <el-option
                                    v-for="item in businessDistrictList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <p v-if="!hasBusinessDistrict" style="font-size:12px;color:#ff4949;position:absolute;top:30px">该区域没有商圈</p>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="经营类型" required>
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
                        <el-select v-model="formEntity.businessTypeCode" placeholder="请选择状态">
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
                            <radio-tree :treeData="treeData" :selecedType="formEntity.shopCategory.cateName" v-on:returnRadioTreeObj="getShopType"></radio-tree>
                            
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
                    <el-form-item label="线下店铺编码">
                        <el-col :span="6">
                            <div>{{formEntity.shopMdCode}}</div>
                            
                        </el-col>
                        
                    </el-form-item>
                <el-form-item label="EBS编码" prop="ebsCode">
                    <el-col :span="6">
                        <el-input v-model="formEntity.ebsCode"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="归属业务线" prop="serviceLine">
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
                        <el-input v-model="formEntity.customer.mobile"></el-input>
                    </el-col>
                    
                </el-form-item>
                <el-form-item label="联系手机号" prop="phone">
                    <el-col :span="6">
                        <el-input v-model="formEntity.customer.phone"></el-input>
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
                    <el-button type="primary" @click="goSave('ruleForm')">保存</el-button>
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
    import cascaderSelect from '@/components/common/cascaderSelect'
    import radioTree from '@/components/common/radioTree'
    import breakCrumb from '@/components/common/breakCrumb'
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
                titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'},{id:3,name:'编辑店铺'}],
                businessDistrictId:'',
                hasBusinessDistrict:true,
                isShowSearchShopDialog:false,
                shopDialogVisible:false,
                isShowCascaderSelect:false,
                serviceLineList:[],
                businessTypeList:[],
                businessDistrictList:[],
                settledTypeList:[],
                shopStatusList:[],
                formEntity:{
                    businessDistrictId:'',
                    businessTypeCode:'',
                    status:'',
                    serviceLine:null,
                    customer:{},
                    referenceShop:{},
                    businessDistrict:{},
                    businessCategories:[],
                    shopCategory:{},
                    settledType:''
                },
                ruleForm: {
                    shopName:'',
                    name: '',
                    serviceLine:'',
                    businessTypeCode:'',
                    addr:'',
                    offlineShop:'',
                    status:'',
                    businessDistrictId:'',
                    mobile:'',
                    phone:'',
                    ebsCode:''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商圈名', trigger: 'change' },
                        { min: 1, max: 10, message: '不能超过10个字符', trigger: 'change' }
                    ],
                    shopName: [
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ],
                    serviceLine: [
                        { required: true, message: '请选择业务线', trigger: 'change' }
                    ],
                    businessTypeCode: [
                        { required: true, message: '请选择业态', trigger: 'change' }
                    ],
                    offlineShop:[
                        { required: true, message: '请选择关联线下店铺', trigger: 'change' }
                    ],
                    status:[
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    businessDistrictId:[
                        { type: 'number', message: '请选择商圈', trigger: 'change' }
                    ],
                    mobile:[
                        { max:15,message:'不能超过15位',trigger: 'change',filedName:"客服电话" }

                    ],
                    phone:[
                        { validator:isMobileNumber,trigger: 'change',filedName:"联系电话" }
                        
                    ],
                    ebsCode:[
                        { required: true, message: '必填', trigger: 'change' },
                        { min:1,max:20,message:'不能超过20位',trigger: 'change'}
                    ]
                }
            }
        },
        methods:{
            getShopType:function(value){
                // console.log(value);
                this.formEntity.shopCategoryId=value.id;
            },
            goSave:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交修改
                        if(this.hasBusinessDistrict){
                            var url=this.$apiUrl.editShopUrl;
                            this.formEntity.id=this.formEntity.shopId;
                            this.formEntity.mobile=this.formEntity.customer.mobile;
                            this.formEntity.phone=this.formEntity.customer.phone;
                            var params=this.formEntity;
                            this.$ajax.post(url,params).then(res=>{
                                if(res.error==0){
                                    this.$message({
                                        type:'success',
                                        message:'修改成功'
                                    })
                                    this.goBack();
                                    // this.editDialogVisible=true;
                                }
                            })
                        }
                        
                    } else {
                        if(!this.businessDistrictList.length){
                            this.hasBusinessDistrict=false;
                        }
                        return false;
                    }
                });
            },
            changeBusinessDistrict:function(){
                this.formEntity.businessDistrictId=this.businessDistrictId;
            },
            goBack:function(){
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'店铺管理',params:{currentPage:goPageIndex}})
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
                    // sessionStorage.setItem('businessType',JSON.stringify(res.data));
                    if(res.error==0){
                        this.businessTypeList=res.data;
                    }
                    
                })	
            },
            getServiceLines:function(){
                var url=this.$apiUrl.getServiceLineListUrl;

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        sessionStorage.setItem('serviceLine',JSON.stringify(res.data));
                        this.serviceLineList=res.data;
                    }
                    
                })	
            },
            getSettledTypes:function(){
			
                this.settledTypeList=[{
                    code:'3',
                    description:'自营'
                }];
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
            getShopStatus:function(){
                // var url=this.$apiUrl.getShopStatusUrl+"?type=editOnline";

                // this.$ajax.get(url).then((res)=>{
                //     if(res.error==0){
                //         // sessionStorage.setItem('shopStatus',JSON.stringify(res.data));
                //         this.shopStatusList=res.data;
                //     }
                    
                // })	
                //产品要求只显示这个
                this.shopStatusList=[
                    {code: "10", description: "正常营业"}
                ];
            },
            //得到省市区
            getCascaderArr:function(result){
                this.formEntity.addr=JSON.stringify(result);
                
                this.formEntity.businessDistrict=Object.assign(this.formEntity.businessDistrict,{
                    cityCode:result.city.id,
                    cityName:result.city.name,
                    districtCode:result.district.id,
                    districtName:result.district.name,
                    provinceCode:result.province.id,
                    provinceName:result.province.name
                })

                //省市区改变，取消选中的商圈
                this.formEntity.businessDistrictId=null;
                this.businessDistrictId=null;
                //查询商圈
                var url=this.$apiUrl.getCricleListUrl;
                var params={
                    cityCode:result.city.id,
                    districtCode:result.district.id,
                    provinceCode:result.province.id
                }
                this.$ajax.get(url,params).then((res)=>{
                    if(res.error==0){
                        this.businessDistrictList=res.data;
                        if(res.data.length){
                            this.hasBusinessDistrict=true;
                        }else{
                            this.hasBusinessDistrict=false;
                        }
                    }
                    
                })	
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
                //转化关联店铺和线下编码
                this.formEntity.shopMdCode=this.formEntity.referenceShop.shopMdCode;
                this.formEntity.offlineShop=this.formEntity.referenceShop.shopName;
                
                //根据省市区查询商圈
                if(this.formEntity.businessDistrict.provinceCode){
                    var url=this.$apiUrl.getCricleListUrl;
                    var params={
                        cityCode:this.formEntity.businessDistrict.cityCode,
                        districtCode:this.formEntity.businessDistrict.districtCode,
                        provinceCode:this.formEntity.businessDistrict.provinceCode
                    };
                    this.$ajax.get(url,params).then(res=>{
                        this.businessDistrictList=res.data;
                        this.formEntity.businessDistrictId=this.formEntity.businessDistrict.id;
                        this.businessDistrictId=this.formEntity.businessDistrict.id;
                       
                    })
                }
                 //父组件渲染完成后，子组件在渲染
                this.isShowCascaderSelect=true;
            })


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
            this.getShopStatus();
            this.getSettledTypes();
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
</style>