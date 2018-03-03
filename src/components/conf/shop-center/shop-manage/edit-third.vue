<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section style="margin-top:20px" class="shop-edit">
            <el-form :rules="rules" ref="ruleForm" :model="formEntity.businessInfo" label-width="80px">
                <div class="company mod-toolbar">
                    <el-row>
                    <h1 class="header">公司及联系人信息</h1>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">公司完整名称</div>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item prop="companyName">
                                <el-input class="right" v-model="formEntity.businessInfo.companyName"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="公司详细地址" required class="address">
                            <el-col :span="6"  style="height:36px;margin-left:80px">
                                <el-form-item>
                                    <cascader-select type="edit" :circleItem="formEntity.businessInfo.companyAddressObj" v-if="isShowCascaderSelect" v-on:returnCascaderArr="getCascaderCompanyArr">
                                    
                                    </cascader-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="address">
                                    <el-input v-model="formEntity.businessInfo.address" class="business-custom-gap" placeholder="请输入不超过20个字符的地址"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">联系人姓名</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="name">
                                <el-input class="right" v-model="formEntity.businessInfo.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">联系电话</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="phone">
                                <el-input class="right" v-model="formEntity.businessInfo.phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">营业执照注册号</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="bussinessLicense">
                                <el-input class="right" v-model="formEntity.businessInfo.bussinessLicense"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">营业执照有效期</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-date-picker v-model="formEntity.businessInfo.endDate" type="date" placeholder="选择日期" @change="validateEndDate">
                                </el-date-picker>
                                <span v-if="isError.endDate" style="font-size:12px;color:#ff4949">必选</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">统一社会信用代码</div>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item>
                                <el-input class="right" v-model="formEntity.businessInfo.unifiedSocialCreditCode"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">特许经营资质代码</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input class="right" v-model="formEntity.businessInfo.franchisingCode"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <div class="label">特许经营资质有效期</div>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker v-model="formEntity.businessInfo.franchisingEndDate" type="date" placeholder="选择日期">
                            </el-date-picker>
                            
                        </el-col>
                    </el-row>
                    <el-row class="last-row" :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">营业执照扫描件</div>
                        </el-col>
                        <el-col :span="6" style="position:relative"  v-loading="businessListLoading">
                            <img v-if="!formEntity.businessImg.businessUrl" src="../../../../assets/images/default-file.png"></img>
                            <img v-if="formEntity.businessImg.businessUrl" :src="formEntity.businessImg.businessUrl"></img>
                            <div style="display:inline-block;width:30px;height:30px;position:absolute;top:8px">
                                <i class="iconfontcom icon-view" @click="viewPic(1)">&#xe802;</i>  
                            </div>
                            
                            <el-upload
                                class="custom-upload"
                                :action="fileUploadUrl"
                                :data="fileParams"
                                :with-credentials="true"
                                :before-upload="beforeAvatarUpload"
                                :on-progress="progressBusinessUrl"
                                list-type="picture-card" :on-success="uploadBusinessFileSuccess">
                                <i class="iconfontcom">&#xe803;</i>
                            </el-upload>
                            <el-progress :percentage="businessUrlProgress" v-if="businessUrlProgress!=0"></el-progress>
                            
                        </el-col>
                        <el-col :span="4">
                            <div class="label">特许经营资质扫描件</div>
                        </el-col>
                        <el-col :span="6">
                            <img v-if="!formEntity.businessImg.franchisingUrl" src="../../../../assets/images/default-file.png"></img>
                            <img v-if="formEntity.businessImg.franchisingUrl" :src="formEntity.businessImg.franchisingUrl"></img>
                            <div style="display:inline-block;width:30px;height:30px;position:absolute;top:8px">
                                <i class="iconfontcom icon-view" @click="viewPic(2)">&#xe802;</i>  
                            </div>
                            <el-upload
                                class="custom-upload"
                                :action="fileUploadUrl"
                                :data="fileParams"
                                :with-credentials="true"
                                :before-upload="beforeAvatarUpload"
                                :on-progress="progressFranchisingUrl"
                                list-type="picture-card"  :on-success="uploadFranchisingFileSuccess">
                                <i class="iconfontcom ">&#xe803;</i>
                            </el-upload>
                            <el-progress :percentage="franchisingUrlProgress" v-if="franchisingUrlProgress!=0"></el-progress>
                        </el-col>
                    </el-row>
                </div>
                <div class="finance mod-toolbar">
                    <el-row>
                        <h1 class="header">财务信息</h1>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">银行开户名</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="bankAccountName">
                                <el-input class="right" v-model="formEntity.businessInfo.bankAccountName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">公司银行账号</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="bankAccount">
                                <el-input class="right" v-model="formEntity.businessInfo.bankAccount"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">开户行支行名称</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="branchName">
                                <el-input class="right" v-model="formEntity.businessInfo.branchName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">开户行支行联行号</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="branchNo">
                                <el-input class="right" v-model="formEntity.businessInfo.branchNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">开户行所在地</div>
                        </el-col>
                        <el-col :span="6" style="height:36px;">
                            <el-form-item>
                                <cascader-select type="edit" :circleItem="formEntity.businessInfo.bankAddressObj" v-if="isShowBankCascaderSelect" v-on:returnCascaderArr="getOtherCascaderArr">
                                
                                </cascader-select>
                                 <p v-if="!hasBankAddress" style="color:#ff4949;font-size:12px;position:absolute;right:50px;top:14px">必选</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">纳税人识别号</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="taxpayerNumber">
                                <el-input class="right" v-model="formEntity.businessInfo.taxpayerNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row :gutter="35" class="last-row" style="position:relative">
                        <el-col :span="4">
                            <div class="label require-label">银行开户许可证扫描件</div>
                        </el-col>
                        <el-col :span="6">
                            <img v-if="!formEntity.businessImg.bankPermitsUrl" src="../../../../assets/images/default-file.png"></img>
                            <img v-if="formEntity.businessImg.bankPermitsUrl" :src="formEntity.businessImg.bankPermitsUrl"></img>
                            
                            <div style="display:inline-block;width:30px;height:30px;position:absolute;top:8px">
                                <i class="iconfontcom icon-view" @click="viewPic(3)">&#xe802;</i>  
                            </div>
                            <el-upload
                                class="custom-upload"
                                :action="fileUploadUrl"
                                :with-credentials="true"
                                :data="fileParams"
                                :before-upload="beforeAvatarUpload"
                                :on-progress="progressBankPermitsUrl"
                                list-type="picture-card" :on-success="uploadBankPermitsFileSuccess">
                                <i class="iconfontcom ">&#xe803;</i>
                            </el-upload>
                            <el-progress :percentage="bankPermitsUrlProgress" v-if="bankPermitsUrlProgress!=0"></el-progress>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">税务登记证扫码件</div>
                        </el-col>
                        <el-col :span="6">
                            <img v-if="!formEntity.businessImg.registrationUrl" src="../../../../assets/images/default-file.png"></img>
                            <img v-if="formEntity.businessImg.registrationUrl" :src="formEntity.businessImg.registrationUrl"></img>
                            
                            <div style="display:inline-block;width:30px;height:30px;position:absolute;top:8px">
                                <i class="iconfontcom icon-view" @click="viewPic(4)">&#xe802;</i>  
                            </div>
                            <el-upload
                                class="custom-upload"
                                :action="fileUploadUrl"
                                :data="fileParams"
                                :with-credentials="true"
                                :before-upload="beforeAvatarUpload"
                                :on-progress="progressRegistrationUrl"
                                list-type="picture-card" :on-success="uploadRegistrationFileSuccess">
                                <i class="iconfontcom ">&#xe803;</i>
                            </el-upload>  
                            <el-progress :percentage="registrationUrlProgress" v-if="registrationUrlProgress!=0"></el-progress>
                        </el-col>
                    </el-row>
                
                </div>
                <div class="operation mod-toolbar">
                    <el-row>
                        <h1 class="header">经营信息</h1>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">店铺名称</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="shopName">
                                <el-input class="right" v-model="formEntity.businessInfo.shopName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="店铺所属商圈" required class="business-circle">
                                <el-col :span="5" style="height:36px;">
                                    <el-form-item>
                                        <cascader-select type="edit" :circleItem="formEntity.businessDistrict" v-if="isShowCircleCascaderSelect" v-on:returnCascaderArr="getCascaderArr">
                                            
                                        </cascader-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item>
                                        <el-select v-model="formEntity.businessDistrictId" placeholder="请选择商圈" >
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
                        </el-col>
                        
                    </el-row>
                    <el-row v-for="(item,index) in formEntity.businessCategories"  :key="item.id" v-bind:class="{'last-row':index==formEntity.businessCategories.length}">
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
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">抽佣方式</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.businessInfo.commissionType}}</div>
                        </el-col>
                        
                    </el-row>
                    <el-row v-for="(item,index) in formEntity.businessCategories" :key="item.id" style="position:relative">
                        <el-col :span="4">
                            <div class="label">经营分类{{index+1}}</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{item.firstCategory}}-{{item.secondCategory}}-{{item.thirdCategory}}</div>
                        </el-col>
                        
                        <el-col :span="10">
                            <el-form-item label="设置抽佣比例" class="custom-width" required>
                                <el-input v-model="item.percentage" placeholder="请输入0到100的数值" @change="validateRate(item)">
                                    <template slot="append">%</template>
                                </el-input>
                                <p v-if="item.isErrorRate" style="color:#ff4949;font-size:12px;position:absolute;right:-104px;top:0px">请输入0-100的数字</p>
                            </el-form-item>
                            
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
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
                            <div class="right">{{formEntity.businessTypeName}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">店铺渠道</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.onlineOfflineName}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="label">归属业务线</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.serviceLineName}}</div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">店铺编码</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item v-bind:class="{'validate-error':isError.shopMdCode}">
                                <el-input v-model="formEntity.shopMdCode"  @change="validateShopMdCode" ></el-input>
                                <p v-if="isError.shopMdCode" style="color:#ff4949;font-size:12px;position:absolute;right:-26px;top:0px">必填</p>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="4">
                            <div class="label">店铺有效截止日期</div>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker v-model="formEntity.validDate" type="date" placeholder="选择日期">
                            </el-date-picker>
                            
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">保证金</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="securityFee">
                                <el-input v-model="formEntity.businessInfo.securityFee">
                                    <template slot="append">元</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">技术服务费</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="right">
                                <el-row :span="24">
                                    <el-col :span="3">
                                        <el-form-item>
                                            <el-select v-model="techFeeType">
                                                <el-option
                                                    v-for="item in formEntity.options.techfeeTypes"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>  
                                    <el-col :span="2" v-if="techFeeType==2">
                                        <el-form-item prop="techFeeMoth">
                                            <el-input v-model="formEntity.businessInfo.techFeeMoth">
                                                <template slot="append">月</template>
                                            </el-input>
                                            
                                        </el-form-item>
                                    </el-col>  
                                    <el-col :span="3" style="margin-left:60px">
                                        <el-form-item prop="techFee">
                                            <el-input v-model="formEntity.businessInfo.techFee">
                                                <template slot="append">元</template>
                                            </el-input>
                                            
                                        </el-form-item>
                                    </el-col> 
                                </el-row>
                            </div>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">应缴金额</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="right">{{formEntity.businessInfo.yjFee}}元</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">结算周期</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="settleDays">
                                <el-select v-model="formEntity.businessInfo.settleDays" placeholder="请选择">
                                    <el-option
                                        v-for="item in formEntity.options.settleDays_types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">对接的财务系统</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-checkbox style="height:40px;line-height:40px" v-model="formEntity.businessInfo.businessFinaceSystem" @change="changeEBS">EBS</el-checkbox> 
                                <div v-if="ebsError" style="color: #ff4949;font-size: 12px;top:5px;right:0px;position:absolute">必填</div>
                            </el-form-item>
                            
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">财务账套代码</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="hlbCwzt">
                                <el-input v-model="formEntity.businessInfo.hlbCwzt"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">海波龙系统业务线</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="hlbBusinessType">
                                <el-select v-model.number="formEntity.businessInfo.hlbBusinessType" placeholder="请选择">
                                    <el-option label="全部" value="" v-if="formEntity.options.hlbBusinessTypes.length"></el-option>
                                    <el-option
                                        v-for="item in formEntity.options.hlbBusinessTypes"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <div class="label require-label">核算业务代码</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="businessHSYT">
                                <el-input v-model="formEntity.businessInfo.businessHSYT"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">付款凭证说明</div>
                        </el-col>
                        <el-col :span="18">
                            <el-form-item prop="payProoRemark">
                                <el-input v-model="formEntity.businessInfo.payProoRemark"></el-input>
                            </el-form-item>
                        </el-col>
                    
                    </el-row>
                    <el-row class="last-row" :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">付款凭证扫描件</div>
                        </el-col>
                        <el-col :span="6" style="position:relative">
                            <div>
                                <img v-if="!formEntity.businessImg.payProofUrl" src="../../../../assets/images/default-file.png"></img>
                                <img v-if="formEntity.businessImg.payProofUrl" :src="formEntity.businessImg.payProofUrl"></img>
                            
                                <div style="display:inline-block;width:30px;height:30px;position:absolute;top:8px">
                                    <i class="iconfontcom icon-view" @click="viewPic(5)">&#xe802;</i>  
                                </div>
                                <el-upload
                                    class="custom-upload"
                                    :action="fileUploadUrl"
                                    :data="fileParams"
                                    :with-credentials="true"
                                    :before-upload="beforeAvatarUpload"
                                    :on-progress="progressPayProofUrl"
                                    list-type="picture-card" :on-success="uploadPayProofFileSuccess">
                                    <i class="iconfontcom ">&#xe803;</i>
                                </el-upload>  
                                <el-progress :percentage="payProofUrlProgress" v-if="payProofUrlProgress!=0"></el-progress>
                            </div>
                        </el-col>
                        
                    </el-row>
                
                </div>   
                <el-button @click="goSave('ruleForm')">保存</el-button>	
                <el-button @click="goBack">返回</el-button>	
            </el-form>
		</section>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>保存成功</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeDialog" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-model="viewPicDialogVisible" size="tiny">
            <img width="100%" :src="viewPicImageUrl" alt="">
        </el-dialog>
	</div>
	
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import Util from '@/assets/js/util'
    import cascaderSelect from '@/components/common/cascaderSelect'
    export default {
        components:{
            breakCrumb,
            cascaderSelect
        },
        data(){
            var isMobileNumber = Util.validateForm.isMobileNumber;
            var isMoney= Util.validateForm.isMoney;
            return{
                isShowCascaderSelect:false,
                businessUrlProgress:0,
                franchisingUrlProgress:0,
                bankPermitsUrlProgress:0,
                registrationUrlProgress:0,
                payProofUrlProgress:0,
                formatData:Util.formatDate,
                businessDistrictList:[],
                hasBankAddress:true,
                hasBusinessDistrict:true,
                isShowBankCascaderSelect:false,
                isShowCircleCascaderSelect:false,
                titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'},{id:3,name:'编辑第三方店铺'}],
                fileParams:{
                    security:true
                },
                isError:{
                    shopMdCode:false,
                    validDate:false,
                    endDate:false,

                },
                fileUploadUrl:'',
                businessListLoading:false,
                ebsError:false,
                dialogVisible:false,
                viewPicDialogVisible:false,
                viewPicImageUrl:'',
                formEntity:{
                    techFeeType:'',//技术服务费的年月日
                    techFee:'',//技术服务费
                    techFeeMoth:'',

                    businessInfo:{
                        companyAddressObj:{},
                        bankAddressObj:{},
                        settleDays:'',
                        hlbBusinessType:''
                    },
                    businessImg:{},
                    options:{
                        hlbBusinessTypes:[]
                    },
                    businessDistrict:{},
                    businessCategories:[]
                },
                techFeeType:1,
                ruleForm: {
                    companyName:'',
                    name:'',
                    phone:'',
                    bussinessLicense:'',


                    bankAccountName:'',
                    bankAccount:'',
                    branchName:'',
                    branchNo:'',
                    bankAddress:'',
                    taxpayerNumber:'',
                    
                    shopName:'',
                    circleName:'',

                    securityFee:'',

                    hlbCwzt:'',
                    businessHSYT:'',
                    payProoRemark:'',
                    techFeeMoth:'',
                    techFee:'',
                    hlbBusinessType:'',
                    settleDays:'',

                    address:''
                },
                rules: {
                    companyName:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    name:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    phone:[
                        { required: true, message: '必填', trigger: 'change' },
                        { validator: isMobileNumber, message: '错误的手机号', trigger: 'change' },
                    ],
                    bussinessLicense:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    hlbBusinessType:[
                        { type: 'number', message: '必选', trigger: 'change' },
                    ],
                    settleDays:[
                        { type: 'number', message: '必选', trigger: 'change' },
                    ],
                    bankAccountName:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    bankAccount:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    branchName:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    branchNo:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    bankAddress:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    taxpayerNumber:[
                         { required: true, message: '必填', trigger: 'change' },
                    ],
                    shopName:[
                         { required: true, message: '必填', trigger: 'change' },
                    ],
                    circleName:[
                         { required: true, message: '必填', trigger: 'change' },
                    ],
                    securityFee:[
                        { validator: isMoney, message: '必填数字', trigger: 'change' },
                    ],
                    hlbCwzt:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    businessHSYT:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    payProoRemark:[
                        { required: true, message: '必填', trigger: 'change' },
                    ],
                    techFeeMoth:[
                        { validator: isMoney, trigger: 'change' },
                    ],
                    techFee:[
                        { validator: isMoney, trigger: 'change' },
                    ],
                    address:[
                        { required: true,max:20, message: '请输入长度不超过20个字符的地址', trigger: 'change' },
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
            progressBusinessUrl:function(){
                this.businessUrlProgress++;
            },
            progressFranchisingUrl:function(){
                this.franchisingUrlProgress++;
            },
            progressBankPermitsUrl:function(){
                this.bankPermitsUrlProgress++;
            },
            progressRegistrationUrl:function(){
                this.registrationUrlProgress++;
            },
            progressPayProofUrl:function(){
                this.payProofUrlProgress++;
            },
   
            validateEndDate:function(){
                if(this.formEntity.businessInfo.endDate&&this.formEntity.businessInfo.endDate.toString().trim()!=''){
                    this.isError.endDate=false;
                    
                }else{
                    this.isError.endDate=true;
                } 
            },
            uploadBusinessFileSuccess:function(response, file, fileList){
                if(response.error==0){
                    this.formEntity.businessImg.businessUrl=response.data.imageUrl;
                    this.businessUrlProgress=100;
                    setTimeout(function(){
                        this.businessUrlProgress=0;
                    }.bind(this),200)
                }else{
                    this.businessUrlProgress=0;
                }
                
            },
            uploadFranchisingFileSuccess:function(response, file, fileList){
                if(response.error==0){
                    this.formEntity.businessImg.franchisingUrl=response.data.imageUrl;
                    this.franchisingUrlProgress=100;
                    setTimeout(function(){
                        this.franchisingUrlProgress=0;
                    }.bind(this),200)
                }else{
                    this.franchisingUrlProgress=0;
                }
                
            },
            uploadBankPermitsFileSuccess:function(response, file, fileList){
                if(response.error==0){
                    this.formEntity.businessImg.bankPermitsUrl=response.data.imageUrl;
                    this.bankPermitsUrlProgress=100;
                    setTimeout(function(){
                        this.bankPermitsUrlProgress=0;
                    }.bind(this),200)
                }else{
                    this.bankPermitsUrlProgress=0;
                }
                
            },
            uploadRegistrationFileSuccess:function(response, file, fileList){
                if(response.error==0){
                    this.formEntity.businessImg.registrationUrl=response.data.imageUrl;
                    this.registrationUrlProgress=100;
                    setTimeout(function(){
                        this.registrationUrlProgress=0;
                    }.bind(this),200)
                }else{
                    this.registrationUrlProgress=0;
                }
                
            },
            uploadPayProofFileSuccess:function(response, file, fileList){
                if(response.error==0){
                    this.formEntity.businessImg.payProofUrl=response.data.imageUrl;
                    this.payProofUrlProgress=100;
                    setTimeout(function(){
                        this.payProofUrlProgress=0;
                    }.bind(this),200)
                }else{
                    this.payProofUrlProgress=0;
                }
                
            },
            viewPic:function(order){
                if(order==1){
                    this.viewPicImageUrl=this.formEntity.businessImg.businessUrl;
                }else if(order==2){
                    this.viewPicImageUrl=this.formEntity.businessImg.franchisingUrl;
                }else if(order==3){
                    this.viewPicImageUrl=this.formEntity.businessImg.bankPermitsUrl;
                }else if(order==4){
                    this.viewPicImageUrl=this.formEntity.businessImg.registrationUrl;
                }else{
                    this.viewPicImageUrl=this.formEntity.businessImg.payProofUrl;
                }
                
                this.viewPicDialogVisible=true;
                
            },
            validateRate:function(item){
                if(item.percentage>=0&&item.percentage<=100&&item.percentage.toString().trim()!=''){
                    item.isErrorRate=false;
                }else{
                    item.isErrorRate=true;
                }
               
            },
            changeEBS:function(){

                if(!this.formEntity.businessInfo.businessFinaceSystem){
                    this.ebsError=true;
                }else{
                    this.ebsError=false;
                }
            },
            goBack:function(){
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'店铺管理',params:{currentPage:goPageIndex}})
            },
            beforeAvatarUpload:function(file){
                const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png')||(file.type === 'image/gif');
                
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG,PNG,GIF 格式!');
                }
               
                return isJPG;
            },
            judgeIsValidForm:function(){
                //判断经营分类比例是否正确
                var catetories=this.formEntity.businessCategories;
                for(var i=0;i<catetories.length;i++){
                    var item=catetories[i];
                    if(!item.percentage||item.percentage.toString().trim()==''||item.isErrorRate){
                        item.isErrorRate=true;
                        return false;
                    }
                }

                var isValid=true;
                if(!this.hasBusinessDistrict){
                    isValid=false;
                }
                
                if(this.isError.endDate){
                    isValid=false;
                    
                }
                if(!this.formEntity.shopMdCode||this.formEntity.shopMdCode.toString().trim()==''){
                    this.isError.shopMdCode=true;
                    isValid=false;
                }
                return isValid;
            },
            goSave:function(formName){

                this.$refs[formName].validate((valid) => {
                    
                    if (valid) {
                        //提交修改
                        if(this.judgeIsValidForm()){
                            if(!this.formEntity.businessInfo.businessFinaceSystem){
                                this.ebsError=true;
                                return;
                            }
                            //提交数据保存
                            var url=this.$apiUrl.editThirdShopUrl;
                            //整理数据
                            this.formEntity.id=this.formEntity.shopId;
                            
                            var params=Object.assign({},this.formEntity);

                            

                            //如果不选择EBS，值设为null而不是false
                            if(!params.businessInfo.businessFinaceSystem){
                                params.businessInfo.businessFinaceSystem=null;
                                
                            }else{
                                params.businessInfo.businessFinaceSystem='EBS';
                            }
                            //如果选择的是月
                            if(this.techFeeType==2){
                                params.businessInfo.techFee=params.businessInfo.techFeeMoth*params.businessInfo.techFee;
                            }else{
                                params.businessInfo.techFee=params.businessInfo.techFee;
                            }

                            //格式化日期
                            if(params.validDate){
                                params.validDate=this.formatData.format(new Date(params.validDate));
                            }
                            if(params.businessInfo.endDate){
                                params.businessInfo.endDate=this.formatData.format(new Date(params.businessInfo.endDate));
                            }
                            if(params.businessInfo.franchisingEndDate){
                                params.businessInfo.franchisingEndDate=this.formatData.format(new Date(params.businessInfo.franchisingEndDate));
                            }

                            params.businessImg=JSON.stringify(params.businessImg);
                            params.businessCategories=JSON.stringify(params.businessCategories);
                            params.businessInfo=JSON.stringify(params.businessInfo);
                            params.businessDistrict=JSON.stringify(params.businessDistrict);
                            this.$ajax.post(url,params).then(res=>{
                                if(res.error==0){
                                    this.dialogVisible=true;
                                }
                            })
                        }
                        
                    } else {
                        if(!this.formEntity.businessInfo.businessFinaceSystem){
                            this.ebsError=true;
                           
                        }
                        if(!this.businessDistrictList.length){
                            this.hasBusinessDistrict=false;
                        }
                        return false;
                    }
                });
                
                
            },
            closeDialog:function(){
                this.dialogVisible=false;
                this.goBack();
            },
            //得到省市区
            getCascaderArr:function(result){
                this.formEntity.addr=JSON.stringify(result);  
                // 转为对应的返回值格式
                this.formEntity.businessDistrict=Object.assign({},this.formEntity.businessDistrict,{
                    provinceCode:result.province.id,
                    provinceName:result.province.name,
                    cityCode:result.city.id,
                    cityName:result.city.name,
                    districtCode:result.district.id,
                    districtName:result.district.name
                });

                //省市区改变，取消选中的商圈
                this.formEntity.businessDistrictId=null;

                //查询商圈
                var url=this.$apiUrl.getCricleListUrl;
                var params={
                    cityCode:result.city.id,
                    districtCode:result.district.id,
                    provinceCode:result.province.id
                }
                this.$ajax.get(url,params).then(res=>{
                   
                    
                    this.businessDistrictList=res.data;
                    if(res.data.length>0){
                        this.formEntity.businessDistrictId=res.data[0].id;
                        
                        this.hasBusinessDistrict=true;
                    }else{
                        this.hasBusinessDistrict=false;
                    }

                    
                })	
            },
            getOtherCascaderArr:function(result){
                // this.formEntity.addrOther=JSON.stringify(result);

                //转成对应的返回值格式
                this.formEntity.businessInfo.bankAddressObj={
                    provinceCode:result.province.id,
                    provinceName:result.province.name,
                    cityCode:result.city.id,
                    cityName:result.city.name,
                    districtCode:result.district.id,
                    districtName:result.district.name
                }  
                this.formEntity.businessInfo.bankAddressCode=result.province.id+"_"+result.city.id+"_"+result.district.id;

            },
            getCascaderCompanyArr:function(result){
                var provinceCode=result.province.id;
                var cityCode=result.city.id;
                var districtCode=result.district.id;
                this.formEntity.businessInfo.companyAddressCode=provinceCode+"_"+cityCode+"_"+districtCode;
                this.formEntity.businessInfo.companyAddressObj={
                    cityCode:result.city.id,
                    cityName:result.city.name,
                    districtCode:result.district.id,
                    districtName:result.district.name,
                    provinceCode:result.province.id,
                    provinceName:result.province.name
                }
            }
        },
        mounted(){
            if(this.$route.params.shopId){
                sessionStorage.setItem('shopId',this.$route.params.shopId);

                sessionStorage.setItem('currentPage',this.$route.params.currentPage);
            }
            var shopId=sessionStorage.getItem('shopId');
            
            var url=this.$apiUrl.getInvestDetailUrl+'?shopId='+shopId;

            //文件上传url
            this.fileUploadUrl=this.$apiUrl.uploadImageUrl;

            this.$ajax.get(url).then((res)=>{
                if(res.error!=0){
                    return
                }
                this.formEntity=Object.assign({},this.formEntity,res.data);
                //一些数据没有值java没有返回改字段，前端需要补充相关字段
                if(!this.formEntity.businessCategories){
                    this.formEntity.businessCategories=[];
                }
                if(!this.formEntity.businessImg){
                    this.formEntity.businessImg={};
                }
                if(!this.formEntity.customer){
                    this.formEntity.customer={}
                }
                if(!this.formEntity.referenceShop){
                    this.formEntity.referenceShop={}
                }
                if(!this.formEntity.shopCategory){
                    this.formEntity.shopCategory={}
                }
                
                if(this.formEntity.businessInfo.businessFinaceSystem=='true'||this.formEntity.businessInfo.businessFinaceSystem=='EBS'){
                    this.formEntity.businessInfo.businessFinaceSystem=true;
                }else{
                    this.formEntity.businessInfo.businessFinaceSystem=false;
                }
                this.formEntity.securityFee=this.formEntity.businessInfo.securityFee;//保证金
                
                
                if(this.formEntity.businessInfo.endDate){
                    this.isError.endDate=false;
                }else{
                    this.isError.endDate=true;
                }
                
                if(this.formEntity.validDate){
                    this.isError.validDate=false;
                }else{
                    this.isError.validDate=true;
                }
                

                //为了表单验证，将shopName,商圈名赋值给formEntity.businessInfo
                this.formEntity.businessInfo.shopName=this.formEntity.shopName;
                this.formEntity.businessInfo.circaleName=this.formEntity.businessDistrict.name;

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


                //将业务线id转为name
                var serviceLineArr=this.formEntity.options.service_lines;
                if(this.formEntity.serviceLine){
                    for(var i=0;i<serviceLineArr.length;i++){
                        var item=serviceLineArr[i];
                        if(item.id==this.formEntity.serviceLine){
                            // this.formEntity.serviceLine=item.name;
                            this.formEntity.serviceLineName=item.name;
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
                            // this.formEntity.settledType=item.name;
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
                            // this.formEntity.businessTypeCode=item.name;
                            this.formEntity.businessTypeName=item.name;
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
                            this.formEntity.onlineOfflineName=item.name;
                            break;
                        }
                    }
                }

                //父组件渲染完成后，子组件在渲染
                this.isShowCircleCascaderSelect=true;
                this.isShowBankCascaderSelect=true;
                this.isShowCascaderSelect=true;
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
        overflow:hidden;
        text-overflow:ellipsis;
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
        height:100px;
    }
    .el-dialog__body img{
        width:100%;
        height:300px;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
    .custom-width{
       
        .el-form-item__label{
            width:40%!important;
            text-align:left;
        }
        .el-input{
            width:60%!important;
        }
    }
    .icon-view{
        font-size:28px;
        position:absolute;
        color:#57a9e8;
        cursor:pointer;
    }

    .require-label:before{
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }
</style>
<style lang="scss">
    .shop-edit .el-form-item__content{
        margin-left:0px!important;
    }
    .right .el-select .el-input {
        width: 90px;
    }

    .shop-edit .custom-upload{
        margin-left:30px;
        display:inline-block;
        position:absolute;
    }
    .shop-edit .el-upload--picture-card{
        display:inline-block;
        border:none;
        
        height:30px;
        width:30px;
        line-height:30px;
        .iconfontcom {
            color: #33bbab;
        }
    }
    .shop-edit .el-form-item__content .el-form-item__error{
        position:absolute;
        top:10px;
        right:-20px;
        width:80px;
        left:100%;
    }
    .shop-edit .address .el-form-item__error{
        width:190px;
    }
    .shop-edit .el-upload-list__item{
       display:none;
    }
    .shop-edit .business-circle .el-form-item__label{
        width:120px!important;
    }
    .shop-edit .custom-width{
        position:relative;
        padding-left:15px;
        .el-form-item__label{
            width:40%!important;
            text-align:left;
        }
        .el-input{
            width:60%!important;
        }
    }
    .shop-edit .address .el-form-item__label{
        width:106px!important;
    }
    .shop-edit .validate-error .el-input__inner{
        border-color:#ff4949;
    }
    .shop-edit .validate-error .el-textarea__inner{
        border-color:#ff4949;
    }
    .shop-edit .validate-error .el-checkbox__inner{
        border-color:#ff4949;
    }
</style>