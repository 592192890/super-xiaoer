<template>
	<div  class="finance-audit">
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
                            <img class="right" v-bind:style="{ opacity: formEntity.businessImg.businessUrl?1:0 }" :src="formEntity.businessImg.businessUrl"></img>
                        </el-col>
                        <el-col :span="4">
                            <div class="label">特许经营资质扫描件</div>
                        </el-col>
                    <el-col :span="6">
                        <img class="right"  v-bind:style="{ opacity: formEntity.businessImg.franchisingUrl?1:0 }" :src="formEntity.businessImg.franchisingUrl"></img>
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
                        <img class="right" :src="formEntity.businessImg.bankPermitsUrl"></img>
                    </el-col>
                    <el-col :span="4">
                        <div class="label">税务登记证扫描件</div>
                    </el-col>
                <el-col :span="6">
                        <img class="right" :src="formEntity.businessImg.registrationUrl"></img>
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
                <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="80px">
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
                        <el-col :span="10">
                            <div class="right">{{item.percentage}}%</div>
                        </el-col>
                    </el-row>
                 
                    <el-row>
                        <el-col :span="4">
                            <div class="label">店铺类型</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.settledTypeName}}</div>
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
                            <div class="label">店铺有效截止日期</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.validDate}}</div>
                        </el-col>
                        
                        <el-col :span="10">
                            <el-form-item label="店铺编码" class="custom-width" v-bind:class="{'validate-error':isError.shopMdCode}">
                                <el-input v-model="formEntity.shopMdCode"  @change="validateShopMdCode"></el-input>
                                <p v-if="isError.shopMdCode" style="color:#ff4949;font-size:12px;position:absolute;right:-26px;top:0px">必填</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="label">技术服务费</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">
                                <div class="right">{{formEntity.businessInfo.techFee}}元/年</div>
                            </div>
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
                            <div style="height:40px;line-height:40px">
                                
                                <label class="el-checkbox">
                                    <span class="el-checkbox__input">
                                        <input type="checkbox" v-model="formEntity.businessInfo.businessFinaceSystem" @change="validateCustomizaitionForm('businessFinaceSystem')">
                                    </span>
                                    <span class="el-checkbox__label">EBS<!----></span>
                                    <span v-if="isError.businessFinaceSystem" style="font-size:12px;color:#ff4949">必选</span>
                                </label>
                            </div>
                            
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="财务账套代码" class="custom-width" v-bind:class="{'validate-error':isError.hlbCwzt}">
                                <el-input v-model="formEntity.businessInfo.hlbCwzt"  @change="validateCustomizaitionForm('hlbCwzt')"></el-input>
                                <p v-if="isError.hlbCwzt" style="color:#ff4949;font-size:12px;position:absolute;right:-26px;top:0px">必填</p>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="label">海波龙系统业务线</div>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="formEntity.businessInfo.hlbBusinessType" placeholder="请选择" @change="validateCustomizaitionForm('hlbBusinessType')" v-bind:class="{'validate-error':isError.hlbBusinessType}">
                                <el-option label="请选择" value="" v-if="formEntity.options.hlbBusinessTypes.length"></el-option>
                                <el-option
                                    v-for="item in formEntity.options.hlbBusinessTypes"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span v-if="isError.hlbBusinessType" style="font-size:12px;color:#ff4949">必选</span>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="核算业务代码" class="custom-width" v-bind:class="{'validate-error':isError.businessHSYT}">
                                <el-input v-model="formEntity.businessInfo.businessHSYT" @change="validateCustomizaitionForm('businessHSYT')"></el-input>
                                <p v-if="isError.businessHSYT" style="color:#ff4949;font-size:12px;position:absolute;right:-26px;top:0px">必填</p>
                            </el-form-item>
                            
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="label">付款凭证说明</div>
                        </el-col>
                        <el-col :span="16">
                            <div style="font-size:14px">{{formEntity.businessInfo.payProoRemark}}</div>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="label">付款凭证扫描件</div>
                        </el-col>
                        <el-col :span="6">
                            
                                <img v-bind:style="{ opacity: formEntity.businessImg.payProofUrl?1:0 }" :src="formEntity.businessImg.payProofUrl" alt="">
                            
                        </el-col>
                        
                    </el-row>
                    <el-row class="last-row">
                        <el-col :span="4">
                            <div class="label">审核意见</div>
                        </el-col>
                        <el-col :span="16">
                            <el-input type="textarea" v-model="formEntity.businessInfo.finaceFailReason" @change="validateSuggestion" v-bind:class="{'validate-error':isError.suggestion}"></el-input>
                            <p v-if="isError.suggestion" style="font-size:12px;color:#ff4949">请输入审核意见</p>
                        </el-col>
                        
                    </el-row>
                </el-form>
            </div>   
			<el-button @click="beforeApprove('ruleForm')" class="approve-btn">通过</el-button>	
            <el-button @click="beforeReject('ruleForm')" class="reject-btn">拒绝</el-button>	
            <el-button @click="goBack">返回</el-button>	

		</section>
        <el-dialog
            title="提示"
            :visible.sync="addInfoDialogVisible"
            size="tiny">
            <span>请填写审核意见！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addInfoDialogVisible = false" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="approveDialogVisible"
            size="tiny">
            <span>是否确定同意该商家？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="approveDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="approve" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="rejectDialogVisible"
            size="tiny">
            <span>是否需要拒绝该商家？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="reject" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="auditSuccessDialogVisible"
            size="tiny">
            <span>{{auditSuccessTips}}</span>
            <span slot="footer" class="dialog-footer">
                
                <el-button type="primary" @click="goBack" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
	</div>
	
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import Util from '@/assets/js/util'
    export default {
        components:{
            breakCrumb
        },
        data(){
            var rateNumber = Util.validateForm.rateNumber;
            return{
                titles:[{id:1,name:'店铺中心'},{id:2,name:'财务审核'},{id:3,name:'审核财务信息'}],
                auditSuccessDialogVisible:false,
                auditSuccessTips:'',
                isError:{
                    suggestion:false,
                    hlbCwzt:false,
                    businessFinaceSystem:false,
                    hlbBusinessType:false,
                    businessHSYT:false,
                    shopMdCode:false
                },
                statusList:[],
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
                },
                approveDialogVisible:false,
                rejectDialogVisible:false,
                addInfoDialogVisible:false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                ruleForm: {
                    shopMdCode:''
                },
                rules: {
                    shopMdCode:[
                        { required: true, message: '请输入店铺编码', trigger: 'blur' },
                        { min: 1, max: 15, message: '不能超过15个字符', trigger: 'blur' }
                    ]
                    
                }
            }
        },
        methods:{
            validateShopMdCode:function(){
                if(!this.formEntity.shopMdCode||this.formEntity.shopMdCode.toString().trim()==''){
                    this.isError.shopMdCode=true;
                }else{
                    this.isError.shopMdCode=false;
                }
              
            },
            validateCustomizaitionForm:function(filedName){
                if(this.formEntity.businessInfo[filedName]){
                    this.isError[filedName]=false;
                }
            },
            validateSuggestion:function(){
                if(!this.formEntity.businessInfo.finaceFailReason||this.formEntity.businessInfo.finaceFailReason.trim()==''){
                    this.isError.suggestion=true;
                }else{
                    this.isError.suggestion=false;
                }
            },
            beforeApprove:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //判断非elementUI表单验证是否正确
                        if(!this.judgeIsValidForm()){
                            return;
                        }
                        this.approveDialogVisible=true;
                        
                    } else {
                        return false;
                    }
                });
                
            },
            beforeReject:function(formName){
                //因为审核通过需要验证所有填写字段，一旦验证失败会有错误提示；
                //单拒绝审核，只需验证审核意见，所以，电影拒绝按钮，应该让其他失败信息消失
                var isErrorArr=Object.keys(this.isError);
                for(var i=0;i<isErrorArr.length;i++){
                    this.isError[isErrorArr[i]]=false;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //判断审核意见是否填写
                        if(!this.formEntity.businessInfo.finaceFailReason||this.formEntity.businessInfo.finaceFailReason.trim()==""){
                            this.isError.suggestion=true;
                        }else{
                            //判断经营分类的比例是否正确
                            if(this.judgeIsValidForm('reject')){
                                this.rejectDialogVisible=true;
                            }
                            
                        }
                        
                    } else {
                        
                        return false;
                    }
                });
                
            },
            approve:function(){
                this.approveDialogVisible=false;
                this.audit('1');
                
            },
            reject:function(){
                this.rejectDialogVisible=false;
                this.audit('2');
            },
            judgeIsValidForm:function(type){
                
                var isValid=true;
                if(type!='reject'){
                    if(!this.formEntity.businessInfo.finaceFailReason){
                        this.isError.suggestion=true;
                        isValid=false;
                    }
                    if(!this.formEntity.businessInfo.businessHSYT||this.formEntity.businessInfo.businessHSYT.trim()==''){
                        this.isError.businessHSYT=true;
                        isValid=false;
                    }
                    if(!this.formEntity.businessInfo.hlbCwzt||this.formEntity.businessInfo.hlbCwzt.trim()==''){
                        this.isError.hlbCwzt=true;
                        isValid=false;
                    }
                    if(!this.formEntity.businessInfo.hlbBusinessType){
                        this.isError.hlbBusinessType=true;
                        isValid=false;
                    }
                    if(!this.formEntity.businessInfo.businessFinaceSystem){
                        this.isError.businessFinaceSystem=true;
                        isValid=false;
                    }
                    if(!this.formEntity.shopMdCode||this.formEntity.shopMdCode.toString().trim()==''){
                        this.isError.shopMdCode=true;
                        isValid=false;
                    }
                
                }
                return isValid;
                
            },
            audit:function(auditType){
                //如果不选择EBS，值设为null而不是false
                var newEbs='';
                if(!this.formEntity.businessInfo.businessFinaceSystem){
                    newEbs=null;
                }else{
                    newEbs='EBS';
                }
                var url=this.$apiUrl.auditFinanceUrl;
                var requestParams={
                    failReason:this.formEntity.businessInfo.finaceFailReason,
                    finaceSystem:newEbs,
                    hlbType:this.formEntity.businessInfo.hlbBusinessType,
                    hlbzt:this.formEntity.businessInfo.hlbCwzt,
                    hsyt:this.formEntity.businessInfo.businessHSYT,
                    pass:auditType,
                    shopId:this.formEntity.shopId,
                    shopMdCode:this.formEntity.shopMdCode

                }
                this.$ajax.post(url,requestParams).then((res)=>{
                    if(res.error==0){
                        this.auditSuccessDialogVisible=true;
                        this.auditSuccessTips=res.msg;
                    }
                    
                })	
            },
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
            var url=this.$apiUrl.getInvestDetailUrl+'?shopId='+shopId;
            var self=this;
            this.$ajax.get(url).then((res)=>{
                if(res.error!=0){
                    return;
                }
                this.formEntity=Object.assign({},this.formEntity,res.data);
                //一些数据没有值java没有返回改字段，前端需要补充相关字段
                if(this.formEntity.businessInfo.businessFinaceSystem=='EBS'){
                    this.formEntity.businessInfo.businessFinaceSystem=true;
                }else{
                    this.formEntity.businessInfo.businessFinaceSystem=false;
                }
                this.formEntity.securityFee=this.formEntity.businessInfo.securityFee;//保证金
               
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
                            this.formEntity.settledTypeName=item.name;
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
    .custom-width{
       
        .el-form-item__label{
            width:40%!important;
            text-align:left;
        }
        .el-input{
            width:60%!important;
        }
    }
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
    .approve-btn{
        background-color:#33bbab;
        border:none;
        color:#ffffff;
    }
    .reject-btn{
        background-color:#f57575;
        border:none;
        color:#ffffff;
    },
    .confirm-btn{
        background-color:#34bbac;
        border:none
    }
    
</style>
<style lang="scss">
    .validate-error .el-input__inner{
        border-color:#ff4949;
    }
    .validate-error .el-textarea__inner{
        border-color:#ff4949;
    }
    .validate-error .el-checkbox__inner{
        border-color:#ff4949;
    }
    .finance-audit {
        .el-form-item__error{
            top: 50%;
            right: -40px!important;
            left:100%!important;
            transform: translateY(-50%);
            -webkit-transform:translateY(-50%);
            width:100px;
        }
        .el-form-item__content{
            margin-left:0px!important;
            
        }
    }
    .custom-width{
        position:relative;
        .el-form-item__label{
            width:40%!important;
            text-align:left;
        }
        .el-input{
            width:60%!important;
        }
    }
</style>