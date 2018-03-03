<template>  
    <div class="sku">
       <break-crumb :titles="titles"></break-crumb>
       <step-header currentStep='2' style="margin-top:20px"></step-header>
       <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="80px">
            <section style="margin-top:20px">
                <div class="basic-info mod-toolbar">  
                    <el-row>
                        <h1 class="header">基本信息</h1>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">商品分类</div>
                        </el-col>
                        <el-col :span="20" class="select-type">
                            <div class="item">{{selectedFirstCategory.catbackName}}</div>
                            <div class="item arrow">></div>
                            <div class="item">{{selectedSecondCategory.catbackName}}</div>
                            <div class="item arrow">></div>
                            <div class="item">{{selectedThirdCategory.catbackName}}</div>
                            
                        </el-col>
                    </el-row>
                
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">商品名称</div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="spuName">
                                <el-input v-model="formEntity.spuName" placeholder="长度至少为2个字符，最长50个字符"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">广告词</div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="spuAd">
                                <el-input v-model="formEntity.spuAd" placeholder="长度至少为2个字符，最长50个字符"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">商品编码</div>
                        </el-col>
                        <el-col :span="10" class="custom-error">
                            <el-form-item prop="spuBn">
                                <el-input v-model="formEntity.spuBn" @change="changeSpuBn" placeholder="2-50个字符，仅支持数字，字母" v-bind:class="{error:customErrorSpuBn}"></el-input>
                                <div v-if="customErrorSpuBn" class="el-form-item__error">商品编码已经存在，请换一个！</div>
                            </el-form-item>
                           
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">商品关键词</div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="keywords">
                                <el-input v-model="formEntity.keywords" placeholder="多个关键字，使用半角竖线‘|’分开"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">品牌</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-select v-model="formEntity.brandId" filterable placeholder="请选择">
                                    
                                    <el-option v-for="item in brandList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">是否称重商品</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="catchWeightInd">
                                <el-select v-model="formEntity.catchWeightInd" placeholder="请选择" @change="changeIsWeight">
                                    <el-option label="称重商品" value="Y"></el-option>
                                    <el-option label="非称重商品" value="N"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">国家</div>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-select v-model="formEntity.countryId" filterable placeholder="请选择">
                                    <el-option label="请选择" value=""></el-option>
                                    <el-option v-for="item in countryList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label require-label">计量单位</div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="unit">
                                <el-input v-model="formEntity.unit"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="40">
                        <el-col :span="4">
                            <div class="label">商品简介</div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="brief">
                                <el-input type="textarea" v-model="formEntity.brief"></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </div>   
            </section>

            <section>
                <div class="spec-info mod-toolbar">
                    <el-row>
                        <h1 class="header">规格信息</h1>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <div class="label require-label">无规格</div>
                        </el-col>
                        <el-col :span="20" style="height:40px;line-height:40px">
                            <el-checkbox label="无规格" v-model="selectNoSpecRadio" @change="changeNoSpecRadio" :disabled="isHasSpec&&formEntity.catchWeightInd=='Y'"></el-checkbox>  
                        </el-col>
                    </el-row>

                    <el-row v-for="item in specArr" :key="item.id">
                        <el-col :span="4">
                            <div class="label require-label">{{item.name}}</div>
                        </el-col>
                        <el-col :span="20" class="checkbox-group" style="height:40px;line-height:40px">
                            <el-checkbox-group v-model="item.checked">
                                <el-checkbox v-for="it in item.values" :label="it.name" :key="it.id"></el-checkbox>  
                            </el-checkbox-group>
                        </el-col>

                        <div v-bind:class="{cover:selectNoSpecRadio}"></div>
                    </el-row>
                    
                    
                    <el-row v-if="!selectNoSpecRadio&&isHasSpec">
                        <el-col :span="6" :offset="4">
                            <el-button class="spec-btn" @click="generateSpec">生成规格</el-button>
                        </el-col>
                        
                    </el-row>
                    <el-row v-if="specEntity.length">
                        <el-col :span="24">
                            <table class="custom-table">
                                <tr>
                                    <th>
                                        <el-col class="cell" :span="2">规格名称</el-col>
                                    </th>
                                    <th>
                                        <el-col class="cell" :span="2">货品名称</el-col>
                                    </th>
                                    <th>
                                        <el-tooltip class="item" effect="dark" content="商品的唯一编号，必须按照商品实际信息准确填写；若商品由系统导入，则系统自动读取条码，无需填写。" placement="top">
                                            <el-col class="cell" :span="2">货号</el-col>
                                        </el-tooltip>
                                    </th>
                                    <th>
                                        <el-col class="cell" :span="2">重量(克)</el-col>
                                    </th>
                                    <th>
                                        <el-col class="cell" :span="2">{{formEntity.catchWeightInd=='N'?'市场价':'市场单价'}}</el-col>
                                    </th>
                                    <th>
                                        <el-tooltip class="item" effect="dark" content="商品的唯一编号，必须按照商品实际信息准确填写；若商品由系统导入，则系统自动读取条码，无需填写。" placement="top">
                                            <el-col class="cell" :span="2">条形码</el-col>
                                        </el-tooltip>
                                    </th>
                                </tr>
                                <tr v-for="item in specEntity" :key="item.specName">
                                    <td>
                                        <div class="cell" :span="2">
                                            <span style="margin-top:8px;display:inline-block">{{item.specName}}</span>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div class="cell" :span="2">
                                            <el-input v-model="item.skuName" v-bind:class="{error:item.isError_skuName}" @change="validateSpec(item,'skuName')"></el-input>
                                        </div>
                                        <div :span="3" v-if="item.isError_skuName" class="validate-error">
                                            <span>2-50个字符</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cell" :span="2">
                                            <el-input v-model="item.skuBn" v-bind:class="{error:item.isError_skuBn||item.isExist_skuBn||item.isDulplicate_skuBn}" @change="validateSpec(item,'skuBn',true)"></el-input>
                                        </div>
                                        <div :span="3" v-if="item.isError_skuBn" class="validate-error">
                                            <span>2-50个数字和字母</span>
                                        </div>
                                        <div :span="2" v-if="item.isExist_skuBn" class="validate-error">
                                            <span>该货号存在于数据库</span>
                                        </div>
                                        <div :span="3" v-show="item.isDulplicate_skuBn&&!item.isExist_skuBn" class="validate-error">
                                            <span>和已填货号重复</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cell" :span="2">
                                            <el-input v-model="item.weight" v-bind:class="{error:item.isError_weight}" @change="validateSpec(item,'weight')"></el-input>
                                        </div>
                                        <div :span="3" v-if="item.isError_weight" class="validate-error">
                                            <span>必填1-10个字符的正整数</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cell" :span="2">
                                            <el-input v-model="item.mktPrice" v-bind:class="{error:item.isError_mktPrice}" @change="validateSpec(item,'mktPrice')"></el-input>
                                        </div>
                                        <div :span="3" v-if="item.isError_mktPrice" class="validate-error">
                                            <span>两位小数,整数位最多7个字符的非负数</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="cell" :span="2">
                                            <el-input v-model="item.barCode" v-bind:class="{error:item.isError_barCode||item.isExist_barCode||item.isDulplicate_barCode}" @change="validateSpec(item,'barCode',true)"></el-input>
                                        </div>
                                        
                                        <div :span="3" v-show="item.isError_barCode" class="validate-error">
                                            <span>6-50个数字字母</span>
                                        </div>
                                        <div :span="3" v-show="item.isExist_barCode" class="validate-error">
                                            <span>该条形码存在于数据库</span>
                                        </div>
                                        <div :span="3" v-show="item.isDulplicate_barCode&&!item.isExist_barCode" class="validate-error">
                                            <span>和已填条形码重复</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </el-col>
                    </el-row>
                </div>
            </section>
            <section>
                <div class="pic-info mod-toolbar">
                    <el-row>
                        <h1 class="header">图片信息</h1>
                    </el-row>
                    <el-row v-if="isClickGenerateNoSpecButton">
                        <el-col :span="4">
                            <div class="label require-label">商品图片</div>
                        </el-col>
                        <el-col :span="3" v-for="item in productPicArr" :key="item.imageId" class="img-item">
                            <img :src="item.imageUrl"></img>
                            <div class="delete-btn">
                                <div class="wrap" @click="deleteProductPic(item)">
                                    <i class="el-icon-delete"></i>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="3" class="img-upload" v-if="productPicArr.length<6">
                            <img @click="showProductPicDialog" src="../../../../assets/images/upload-default.jpg"></img>
                        </el-col>
                        
                    </el-row>
                    <el-row v-if="!isClickGenerateNoSpecButton" v-for="(item,index) in specPicArr" :key="item.specName">
                        <el-col :span="4">
                            <div class="label require-label">{{item.specName}}</div>
                        </el-col>
                        <el-col :span="3" v-for="it in specPicArr[index].imageIds" :key="it.imageId" class="img-item">
                            <img :src="it.imageUrl"></img>
                            <div class="delete-btn">
                                <div class="wrap" @click="deleteSpecPic(it,index)">
                                    <i class="el-icon-delete"></i>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="3" class="img-upload" v-if="specPicArr[index].imageIds.length<6">
                            <img @click="showSpecPicDialog(index)" src="../../../../assets/images/upload-default.jpg"></img>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20" :offset="4">
                            <p class="label">上传商品默认主图，如多规格值时将默认使用该图或分规格上传各规格主图；</p>
                            <p class="label">支持jpg、gif、png格式上传或从图片空间中选择</p>
                            <p class="label">建议使用尺寸800x800像素以上、大小不超过1M的正方形图片，上传后的图片将会自动保存在图片空间的默认分类中。</p>
                        </el-col>
                    </el-row>
                </div>
            </section>
            <section v-if="customAttributes.length||unCustomAttributes.length">
                <div class="expand-info mod-toolbar">
                    <el-row>
                        <h1 class="header">扩展属性</h1>
                    </el-row>
                    <el-row v-for="item in customAttributes" :key="item.id">
                        <el-col :span="4">
                            <div class="label">{{item.name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <el-input v-model="item.value" @change="changeCustomeSelect(item)"></el-input>
                        </el-col>
                    </el-row>
                    <el-row v-for="item in unCustomAttributes" :key="item.id">
                        <el-col :span="4">
                            <div class="label">{{item.name}}</div>
                        </el-col>
                        <el-col :span="6">
                            <el-select v-model="item.selected" placeholder="请选择" @change="changeUnCustomeSelect(item,item.selected)">
                                <el-option label="请选择" value="" v-if="item.values&&item.values.length"></el-option>
                                <el-option v-for="it in item.values" :label="it.name" :value="it.id" :key="it.id"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </section>
            <section v-if="detailparams.length">
                <div class="detail-info mod-toolbar">
                    <el-row>
                        <h1 class="header">详细参数</h1>
                    </el-row>
                    <div v-for="(item,index) in detailparams" :key="index">
                        
                        <div style="display:table-cell;vertical-align:middle">
                            <el-col :span="4">{{item.name}}</el-col>
                        </div>
                        
                        <div style="display:table-cell;">
                            <el-row style="height:40px">
                                <el-col :span="3">
                                    <div class="label header">参数名称</div>
                                </el-col> 
                                <el-col :span="10">
                                    <div class="label header">值</div>
                                </el-col> 
                            </el-row>
                            <el-row style="height:40px" v-for="it in item.list" :key="it.id">
                                <el-col :span="3">
                                    <div class="label"  style="text-align:center;border-left:1px solid #f3f5f7">{{it.name}}</div>
                                </el-col>   
                                <el-col :span="10">
                                    <el-input v-model="it.value"></el-input>
                                </el-col>
                                
                            </el-row>
                            
                        </div>
                    </div>
                    
                </div>
            </section>
            <section>
                <div class="spec-info mod-toolbar">
                    <el-row>
                        <h1 class="header">商品详细信息</h1>
                    </el-row>
                    <el-row>
                        <el-col :span="20" :offset="4">
                            
                            <custom-quill-editor v-if="isShowRichTextEditor" :defaultContent="formEntity.pcInfo" id="pcGoodsInfoId" v-on:passTextContent="getRichTextGoodsInfo">
                            </custom-quill-editor>
                        </el-col>
                    </el-row>
                    
            
                </div>
            </section>
            <section v-if="tablabels.length">
                <div class="spec-info mod-toolbar" v-for="(item,index) in tablabels" :key="item.id">
                    <el-row>
                        <h1 class="header">{{item.name}}</h1>
                    </el-row>
                    <el-row>
                        <el-col :span="20" :offset="4">
                            
                            <custom-quill-editor v-if="isShowRichTextEditor" :defaultContent="item.tabContent" :id="'tab'+item.id" v-on:passTextContent="getRichTextTabContent">
                            </custom-quill-editor>
                        </el-col>
                    </el-row>
                </div>
            </section>
            <el-row>
                <el-col :span="10">
                    <el-button class="btn-submit" @click="goSave('ruleForm')">提交</el-button>
                    <el-button @click="goBack">返回</el-button>
                </el-col>
            </el-row>
        </el-form>
        <upload-file-dialog v-on:watchDialog="closeUploadDialog" v-on:passSelectedPicUrl="getSelectedPicuUrl" :isShow="isShowUploadDialog"></upload-file-dialog>
    </div>
</template>
<script>
import Util from '@/assets/js/util'
import breakCrumb from '@/components/common/breakCrumb'
import stepHeader from './header'
import uploadFileDialog from '@/components/common/packageDialog/uploadPicDialog'
import customQuillEditor from '@/components/common/Quilleditor'
var timer;
var barCodeTimer;
var bnTimer;
export default {
    components:{
		stepHeader,
        uploadFileDialog,
        breakCrumb,
        customQuillEditor
	},
    data(){
        var isNumber = Util.validateForm.isNumber;
        var isWeight=Util.validateForm.isWeight;
        var isBarCode = Util.validateForm.isBarCode;
        var isProductCode=Util.validateForm.isProductCode;
        var isWordAndNumber=Util.validateForm.isWordAndNumber;
        var inputValidateCommonText=Util.validateForm.inputValidateCommonText;
        return {
            selectNoSpecRadio:false,
            isClickGenerateNoSpecButton:false,//判断是否点击生成无规格
            isShowRichTextEditor:false,
            customErrorSpuBn:false,//自定义商品编码错误
            judgePicType:'',//判断是商品图片还是规格图片；'product'是商品
            titles:[{id:1,name:'商品中心'},{id:2,name:'SPU管理'},{id:3,name:'SPU新增2'}],
            isHasSpec:false,
            selectedFirstCategory:{},
            selectedSecondCategory:{},
            selectedThirdCategory:{},
            specEntity:[],
            customErrorField:{
                isError_weight:false,
                isError_barCode:false,
                isExist_barCode:false,
                isDulplicate_barCode:false,
                isError_mktPrice:false,
                isError_skuBn:false,
                isExist_skuBn:false,
                isDulplicate_skuBn:false,
                isError_skuName:false
            },
            uploadFileUrl:this.$apiUrl.uploadImageUrl,

            isShowUploadDialog:false,
            productPicArr:[],
            productDetailContent:'',
            tagContent:'',
            isShowGenerateSpec:false,
            editorOption: {
				// some quill options
			},
            brandList:[],
            countryList:[],
            specArr:[],
            specPicArr:[],//和规格上传图片有关[{specName:'',imageIds:[]},{}]
            attributes:[],
            customAttributes:[],//自定义的扩展
            unCustomAttributes:[],//非自定义的扩展
            detailparams:[],
            tablabels:[],
            formEntity:{
                countryId:'',
                brandId:'0',
                propsAttributes:[],
                propsText:[],
                catchWeightInd:''
                
            },
            ruleForm:{
                spuBn:'',
                spuName:'',
                unit:'',
                barCode:'',
                mktPrice:'',
                weight:'',
                skuName:'',
                keywords:'',
                catchWeightInd:''

            },
            rules:{
                spuName:[
                    { validator: inputValidateCommonText,trigger: 'change' }
                ],
                spuAd:[
                    { message: '长度为2到50个字符', min:2,max:50,trigger: 'change' }
                ],
                keywords:[
                    { message: '长度为2到50个字符', min:2,max:50,trigger: 'change' }
                ],
                skuName:[
                    { required: true,message: '必填',trigger: 'change' },
                    { message: '长度为2到50个字符', min:2,max:50,trigger: 'change' }
                    
                ],
                spuBn:[
                    {required: true, message:'必填',trigger: 'change'},
                    { validator:isProductCode,trigger: 'change' }
                ],
                brandId:[
                    {type:'number',required: true, message: '必选', trigger: 'change' }
                ],
                brief:[
                    
                    { max:70, message:"最大长度为70个字符", trigger: 'change' }
                ],
                unit:[
                    { required: true, message: '必填', trigger: 'change' }
                ],
                barCode:[
                    {required: true, message:'必填',trigger: 'change'},
                    {validator:isBarCode, trigger: 'change' }
                ],
                mktPrice:[
                    {validator:isNumber, filedName:'价格',trigger: 'change' }
                ],
                weight:[
                    { validator:isWeight,filedName:'重量',trigger: 'change' }
                ],
                catchWeightInd:[
                    { required: true, message: '必选', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        changeIsWeight:function(){
            //1.有规格：{
            //     称重：无规格
            //     非称重：有规格和无规格都可以
            // }
            // 2.无规格：{
            //     称重：无规格
            //     非称重：无规格
            // }
            if(!this.isHasSpec||(this.isHasSpec&&this.formEntity.catchWeightInd=='Y')){
                this.selectNoSpecRadio=true;
                //设置默认的无规格表单
                if(this.isClickGenerateNoSpecButton){
                    return;
                }
                this.specPicArr=[];
                this.specEntity=[Object.assign({},{
                    specName:'无规格',
                    specAttributes:[],//后端根据这个字段判断是否有无规格
                    specText:'',
                    skuName:'',
                    skuBn:'',
                    weight:'',
                    mktPrice:'',
                    barCode:''

                },this.customErrorField)]
                //清空已经选择的有规格
                this.specArr.forEach(v=>{
                    v.checked=[];
                })
                this.isClickGenerateNoSpecButton=true;//点击生成无规格
            }
        },
        getRichTextGoodsInfo:function(result){
            var content=result.content;
            this.formEntity.pcInfo=content;
        },
        getRichTextTabContent:function(result){
            var content=result.content;
            var id=result.id;

            this.tablabels.forEach(v=>{
                if(id.indexOf(v.id)!=-1){
                    v.tabContent=content;
                }
            })
        },
        changeSpuBn:function(){
        
            clearTimeout(timer);
            timer=setTimeout(()=>{
                this.isExistProductCode();
            },300)
        },
        isExistProductCode:function(){
            var url=this.$apiUrl.validateProductCodeUrl;
            var params={
                bn:this.formEntity.spuBn
            }
            this.$ajax.post(url,params).then(res=>{
                if(res.error==0){
                    if(res.data.length>0){
                        //存在于数据库
                        this.customErrorSpuBn=true;
                    }else{
                        //不存在于数据库
                        this.customErrorSpuBn=false;
                    }
                }else{
                    this.$message({
                        type:'error',
                        message:res.msg
                    })
                }
            })
        },
        isExistDataBase:function(filedName,value,item){
            var url=this.$apiUrl.validateFiledUrl;
            var params={};
            if(filedName=="skuBn"){
                params.skuBn=value
            }
            if(filedName=="barCode"){
                params.barcode=value
            }
            
            this.$ajax.get(url,params).then(res=>{
                if(res.error==0){
                    if(res.data.length>0){
                        //存在于数据库
                        item['isExist_'+filedName]=true;
                    }else{
                        //不存在于数据库
                        item['isExist_'+filedName]=false;
                        
                        
                    }
                }else{
                    this.$message({
                        type:'error',
                        message:res.msg
                    })
                }
            })
        },
        //判断条形码和货号是否有重复值
        isDulplicate:function(filedName){
            var tempArr=[];
            this.specEntity.forEach(v=>{
                if(!v[filedName]){
                    v['isDulplicate_'+filedName]=false;
                }else{
                    if(tempArr.indexOf(v[filedName])==-1){
                        tempArr.push(v[filedName]);
                        v['isDulplicate_'+filedName]=false;
                    }else{
                        v['isDulplicate_'+filedName]=true;
                    }
                }
                
            })
        },
        validateSpec:function(item,type,isQuery){

            if(!item[type]||item[type].toString().trim()==""){
                item['isError_'+type]=true;
            }else{
                if(type=='weight'){
                    if(/^\d{1,10}$/.test(item[type])&&item[type]>0){
                        item['isError_'+type]=false;
                    }else{
                        item['isError_'+type]=true;
                    }
                }else if(type=="barCode"){
                    if(/^[\d\w]{6,50}$/.test(item[type])){
                        item['isError_'+type]=false;
                        //验证字段是否存在于数据库
                        if(isQuery){
                            clearTimeout(barCodeTimer)
                            barCodeTimer=setTimeout(()=>{
                                this.isExistDataBase('barCode',item[type],item)
                            },300)
                        }
                        
                    }else{
                        item['isError_'+type]=true;
                        item['isExist_'+type]=false;
                    }
                    if(isQuery){
                        //让该字段所有的重复提示取消
                        this.specEntity.forEach(v=>{
                            v['isDulplicate_'+type]=false;
                        })
                    }
                }else if(type=="mktPrice"){
                    if(/^\d{1,7}(\.\d{1,2})?$/.test(item[type])){
                        item['isError_'+type]=false;
                    }else{
                        item['isError_'+type]=true;
                    }
                }else if(type=="skuName"){
                    if(item[type]&&item[type].length<=50&&item[type].length>=2){
                        item['isError_'+type]=false;
                    }else{
                        item['isError_'+type]=true;
                    }
                }else if(type=="skuBn"){
                    if(/^[\d\w]{2,50}$/.test(item[type])){
                        item['isError_'+type]=false;
                        //验证字段是否存在于数据库
                        if(isQuery){
                            clearTimeout(bnTimer);
                            bnTimer=setTimeout(()=>{
                                this.isExistDataBase('skuBn',item[type],item)
                            },300)
                        }
                        
                    }else{
                        item['isError_'+type]=true;
                        item['isExist_'+type]=false;
                    }
                    if(isQuery){
                        //让该字段所有的重复提示取消
                        this.specEntity.forEach(v=>{
                            v['isDulplicate_'+type]=false;
                        })
                    }
                }
                else{
                    item['isError_'+type]=false;
                }
                
            }
        },
        deleteProductPic:function(item){
            var imageId=item.imageId;
            var tempPicArr=[];
            this.productPicArr.forEach(v=>{
                if(v.imageId!=imageId){
                    tempPicArr.push(v)
                }
            })
            this.productPicArr=tempPicArr;
        },
        deleteSpecPic:function(item,index){
            var imageId=item.imageId;
            var tempPicIdArr=[];
            this.specPicArr[index].imageIds.forEach(v=>{
                if(v.imageId!=imageId){
                    tempPicIdArr.push(v)
                }
            })
            this.specPicArr[index].imageIds=tempPicIdArr;
        },
        showProductPicDialog:function(){
            this.isShowUploadDialog=true;

            this.judgePicType="product";
        },
        showSpecPicDialog:function(index){
            this.isShowUploadDialog=true;
            
            this.judgePicType=index;

            this.specEntity[index].imageIds=[];
           
        },

        closeUploadDialog:function(){
            this.isShowUploadDialog=false;
        },
        getSelectedPicuUrl:function(result){
            this.isShowUploadDialog=false;
            //判断图片是商品图片还是规格图片
            if(this.judgePicType=="product"){
               

                if(result.length+this.productPicArr.length>6){
                    this.$message({
                        type:'warning',
                        message:'最多选择6张图片'
                    })
                }else{
                    result.forEach(value=>{
                        if(this.productPicArr.length){
                            for(var i=0;i<this.productPicArr.length;i++){
                                var item=this.productPicArr[i];
                                if(value.imageId==item.imageId){
                                    break;
                                }
                                if(i==this.productPicArr.length-1){
                                    this.productPicArr.push(value);
                                }
                            }
                        }else{
                            this.productPicArr.push(value);
                        }
                        
                    })
                }
            }else{
                var index=this.judgePicType;
                if(result.length+this.specPicArr[index].imageIds.length>6){
                    this.$message({
                        type:'warning',
                        message:'最多选择6张图片'
                    })
                }else{
                    result.forEach(value=>{
                        if(this.specPicArr[index].imageIds.length){
                            for(var i=0;i<this.specPicArr[index].imageIds.length;i++){
                                var item=this.specPicArr[index].imageIds[i];
                                if(value.imageId==item.imageId){
                                    break;
                                }
                                if(i==this.specPicArr[index].imageIds.length-1){
                                    this.specPicArr[index].imageIds.push(value);
                                }
                            }
                        }else{
                            this.specPicArr[index].imageIds.push(value);
                        }
                    })
                }
            }
            
            

        },
        changeNoSpecRadio:function(){
            
            if(this.selectNoSpecRadio){
                //如果之前就是选中的无规格radio,不需要变化
                if(this.isClickGenerateNoSpecButton){
                    return;
                }
                this.specPicArr=[];
                this.specEntity=[Object.assign({},{
                    specName:'无规格',
                    specAttributes:[],//后端根据这个字段判断是否有无规格
                    specText:'',
                    skuName:'',
                    skuBn:'',
                    weight:'',
                    mktPrice:'',
                    barCode:''

                },this.customErrorField)]
                //清空已经选择的有规格
                this.specArr.forEach(v=>{
                    v.checked=[];
                })
                this.isClickGenerateNoSpecButton=true;//点击生成无规格
                
            }
        },
        generateSpec:function(){
            //options里面是否有规格数组信息
            if(this.specArr&&this.specArr.length){
                for(var i=0;i<this.specArr.length;i++){
                    var v=this.specArr[i];
                    if(!v.checked||!v.checked.length){
                        this.$message({
                            type:'warning',
                            message:'请选择规格'
                        })
                        return false;
                    }
                }
            }else{
                this.$message({
                    type:'warning',
                    message:"请选择规格"
                })
                return;
            }
            
            this.isClickGenerateNoSpecButton=false;//点击生成有规格
            //根据选择的规格生成需要显示多少规格图片
            // this.specPicArr=[];
            var tempSpecPicArr=[];//临时规格图片，为了保存之前的规格图片信息

            this.specArr[0].checked.forEach(v=>{
                // this.specPicArr.push({specName:v,imageIds:[]})
                tempSpecPicArr.push({specName:v,imageIds:[]})
            })
            //判断规格图片
            var newSpecPicArr=[];
            if(this.specPicArr.length){
                tempSpecPicArr.forEach(v=>{
                    for(var i=0;i<this.specPicArr.length;i++){
                        var picItem=this.specPicArr[i];
                        if(v.specName==picItem.specName){
                            newSpecPicArr.push(picItem);
                            break;
                        }
                        if(i==this.specPicArr.length-1){
                            newSpecPicArr.push(v)
                        }
                    }
                })
                this.specPicArr=newSpecPicArr;
            }else{
                this.specPicArr=tempSpecPicArr;
            }
            
            this.isShowGenerateSpec=true;

            var tempSpecEntity=[];//为了判断生成规格时，之前的规格不清空
            // this.specEntity=[];

            var specIdArr=[];
            var specNameArr=[];

            this.specArr.forEach((value,index)=>{
                //根据name查找id
                var tempIdArr=[];
                value.checked.forEach((v,i)=>{

                    value.values.forEach(vv=>{
                        if(v==vv.name){
                            tempIdArr.push(vv.id);
                        }
                    })
                })
                
                specIdArr.push(tempIdArr);
                specNameArr.push(value.checked);
            })
            
            //整理后的规格信息name
            var newSpecNameArr=this.doExchange(specNameArr);
            
            //整理后的规格信息id
            var newSpecIdArr=this.doExchange(specIdArr);

            //设置specAttributes

            newSpecNameArr.forEach((value,index)=>{
                
                tempSpecEntity.push(Object.assign({},{
                    specName:value,
                    specAttributes:new Array(this.specArr.length),
                    skuName:'',
                    skuBn:'',
                    weight:'',
                    mktPrice:'',
                    barCode:''

                },this.customErrorField))
            })

            //根据id查询parentId
            tempSpecEntity.forEach(v=>{
                this.specArr.forEach((vv,i)=>{
                    v.specAttributes[i]={};
                    v.specAttributes[i].id=vv.id
                })
            })

            newSpecIdArr.forEach((value,index)=>{

                var arr=value.toString().split(',')
            
                arr.forEach((v,i)=>{
                    // tempSpecEntity[index].specAttributes[i]={};
                    tempSpecEntity[index].specAttributes[i].value=v;
                })
                
            })

             //判断哪一些值之前存在
            var newSpecEntity=[];
            if(this.specEntity.length){
                tempSpecEntity.forEach(v=>{
                    for(var i=0;i<this.specEntity.length;i++){
                        var item=this.specEntity[i];
                        if(v.specName==item.specName){
                            newSpecEntity.push(item);
                            break;
                        }
                        if(i==this.specEntity.length-1){
                            newSpecEntity.push(v);
                        }
                    }
                    
                })
                this.specEntity=newSpecEntity;
            }else{
                this.specEntity=tempSpecEntity;
            }

           
        },
        //组合数组
        doExchange: function (doubleArrays) {
            var len = doubleArrays.length;
            if (len >= 2) {
                var arr1 = doubleArrays[0];
                var arr2 = doubleArrays[1];
                var len1 = doubleArrays[0].length;
                var len2 = doubleArrays[1].length;
                var newlen = len1 * len2;
                var temp = new Array(newlen);
                var index = 0;
                for (var i = 0; i < len1; i++) {
                    for (var j = 0; j < len2; j++) {
                        temp[index] = arr1[i] + "," + arr2[j];
                        index++;
                    }
                }
                var newArray = new Array(len - 1);
                newArray[0] = temp;
                if (len > 2) {
                    var _count = 1;
                    for (var i = 2; i < len; i++) {
                        newArray[_count] = doubleArrays[i];
                        _count++;
                    }
                }
                return this.doExchange(newArray);
            }
            else {
                return doubleArrays[0];
            }
        },
        changeCustomeSelect:function(item){
            var rootId=item.id;
            var value=item.value;
            
            var arr=this.formEntity.propsAttributes;
            //判断是更新还是插入
            if(arr.length>0){
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id==rootId){
                        arr[i].value=value;
                        break;
                    }
                    if(i==arr.length-1){
                        this.formEntity.propsAttributes.push({id:rootId,value:value})
                    }
                }
            }else{
                this.formEntity.propsAttributes.push({id:rootId,value:value})
            }   
            
            
        },
        changeUnCustomeSelect:function(item,selectedId){
            var rootId=item.id;
            var value='';
            var arr=this.formEntity.propsText;
            //判断是更新还是插入
            if(arr.length>0){
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id==rootId){
                        arr[i].value=selectedId;
                        break;
                    }
                    if(i==arr.length-1){
                        this.formEntity.propsText.push({id:rootId,value:selectedId})
                    }
                }
            }else{
                this.formEntity.propsText.push({id:rootId,value:selectedId})
            }
            
        },
        //验证是否可以save
        beforeSave:function(){
            //选择无规格
            if(this.isClickGenerateNoSpecButton){
                if(!this.productPicArr.length){
                    this.$message({
                        type:'warning',
                        message:'请上传商品信息图片'
                    })
                    return false;
                }
                if(!this.selectNoSpecRadio){
                    this.$message({
                        type:'warning',
                        message:'请选择规格'
                    })
                    return false;
                }
            }
            if(!this.specEntity.length){
                this.$message({
                    type:'warning',
                    message:'请填写规格信息'
                })
                return false;
            }
            //判断商品编码是否重复
            if(this.customErrorSpuBn){
                this.$message({
                    type:'warning',
                    message:'商品编码重复'
                })
                return false;
            }
            //判断是否有重复的条形码和货号
            this.isDulplicate('skuBn');
            this.isDulplicate('barCode');    
            //规格表单是否填写
            for(var i=0;i<this.specEntity.length;i++){
                var v=this.specEntity[i];

                this.validateSpec(v,'weight');
                this.validateSpec(v,'barCode');
                this.validateSpec(v,'mktPrice');
                this.validateSpec(v,'skuName');
                this.validateSpec(v,'skuBn');
                
                
            }
            for(var i=0;i<this.specEntity.length;i++){
                var v=this.specEntity[i];
                
                var isError=false;
                for(var key in this.customErrorField){
                    if(v[key]){
                        isError=true;
                        break;
                    }
                }
                if(isError){
                    this.$message({
                        type:'warning',
                        message:'相关字段填写有误，请检查相关字段后在提交！'
                    })
                    return false;
                }
                
            }
            //判断选择的是无规格radio还是有规格radio
            if(!this.isClickGenerateNoSpecButton){

                //如果有规格
                if(this.isHasSpec==1){
                    for(var i=0;i<this.specArr.length;i++){
                        var v=this.specArr[i];
                        if(!v.checked||!v.checked.length){
                            this.$message({
                                type:'warning',
                                message:'请选择规格'
                            })
                            return false;
                        }
                    }

                    if(!this.specPicArr.length){
                        this.$message({
                            type:'warning',
                            message:'请上传规格信息图片'
                        })
                        return false;
                    }else{
                        for(var i=0;i<this.specPicArr.length;i++){
                            var v=this.specPicArr[i];
                            if(!v.imageIds.length){
                                this.$message({
                                    type:'warning',
                                    message:'请上传规格信息图片'
                                })
                                return false;
                            }  
                        }
                    }
                    
                }else{
                    this.$message({type:'error',message:'请选择无规格'})
                }
                
            }

            return true;
        },
        goSave:function(formName){
            
            this.$refs[formName].validate((valid) => {     
                if (valid) {
                    if(!this.beforeSave()){
                        return;
                    }
                    this.formEntity.skuVoList=this.specEntity;
                    //设置ids
                    //如果选择的无规格raido,不需要ids
                    if(!this.isClickGenerateNoSpecButton){
                        this.formEntity.skuVoList.forEach(v=>{
                            this.specPicArr.forEach(vv=>{
                                if(v.specName.indexOf(vv.specName)!=-1){
                                    var tempImageIdsArr=[];
                                    vv.imageIds.forEach(vvv=>{
                                        tempImageIdsArr.push(vvv.imageId)
                                    })
                                    v.imageIds=tempImageIdsArr;
                                }
                            })
                        })
                    }else{
                        //无规格
                        var tempIds=[];
                        this.productPicArr.forEach(v=>{
                            tempIds.push(v.imageId)
                        })
                        this.formEntity.skuVoList[0].imageIds=tempIds
                    }
                    
                    //设置tab
                    this.formEntity.tabLabelRelList=[];
                    this.tablabels.forEach(v=>{
                        var obj={
                            tabLabelId:v.id,
                            tabContent:v.tabContent||""
                        }
                       
                        this.formEntity.tabLabelRelList.push(obj)
                    })
                    
                    //设置详细参数，只有自定义的
                    this.formEntity.infoAttributes=[];
                    this.detailparams.forEach(v=>{
                        var tempListArr=[];
                        v.list.forEach(vv=>{
                            tempListArr.push({id:vv.id,value:vv.value})
                        })
                        this.formEntity.infoAttributes=this.formEntity.infoAttributes.concat(tempListArr)
                    })
                    //设置商品图片
                    this.formEntity.images=[];
                    this.productPicArr.forEach(v=>{
                        this.formEntity.images.push(v.imageId)
                    })
                    

                    var url=this.$apiUrl.updateOrAddSKUUrl;

                    var tempParams=this.formEntity;

                    var params={
                        data:JSON.stringify(tempParams)
                    }
                    this.$ajax.post(url,params).then(res=>{
                        if(res.error==0){
                            this.$router.push({name:'SPU新增3',params:{spuId:res.data}})
                        }else{
                            if(res.msg=="spu编号重复"){
                                this.customErrorSpuBn=true;
                            }
                        }
                    })
                    


                } else {
                    this.$message({
                        type:'warning',
                        message:'相关字段填写有误，请检查相关字段后在提交！'
                    })
                    return false;
                }
            });
        },
        goBack:function(){
            this.$router.push({name:'SPU新增1',params:{isBack:true}})
        },
        getAllSelect(catbackId){
            var url=this.$apiUrl.getOptionsUrl+"?backCateId="+catbackId;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){

                    //存储下拉框的值
                    this.brandList.push({id:0,name:'无品牌'})
                    this.brandList=this.brandList.concat(res.data.brands);
                    if(res.data.brands.length){
                        this.formEntity.brandId=this.brandList[0].id;
                    }else{
                        this.$message({
                            type:'warning',
                            message:'选择的三级分类未关联品牌，请先去后台分类管理关联品牌!'
                        })
                    }
                    

                    this.countryList=res.data.countries;

                    res.data.attributes.forEach(value=>{
                        value.selected=null;
                    })
                    this.attributes=res.data.attributes;
                    //将自定义的和非自定义的区分
                    this.attributes.forEach(value=>{
                        //type==4的为自定义的
                        if(value.expressionType==4){
                            this.customAttributes.push(value)
                        }else{
                            this.unCustomAttributes.push(value)
                        }
                    })
            
                    this.detailparams=res.data.detailparams;

                    res.data.specs.forEach(value=>{
                        value.checked=[];
                    })
                    this.specArr=res.data.specs;
                    
                    
                    this.tablabels=res.data.tablabels;

                    //判断是否有规格
                    if(res.data.specs.length>0){
                        this.isHasSpec=true;
                        
                    }else{
                        this.isHasSpec=false;
                        
                    }
                }else{
                    this.$message({
                        type:'error',
                        message:res.msg
                    })
                }

                //页面加载完后，在显示富文本
                this.isShowRichTextEditor=true;
            })
        }
    },
    computed: {
        //   editor() {
        //     return this.$refs.myQuillEditor.quill
        //   }
        
    },
    mounted(){
    
        //得到分类信息
        this.selectedFirstCategory=JSON.parse(sessionStorage.getItem('selectedFirstCategory'));
        this.selectedSecondCategory=JSON.parse(sessionStorage.getItem('selectedSecondCategory'));
        this.selectedThirdCategory=JSON.parse(sessionStorage.getItem('selectedThirdCategory'));
        this.formEntity.catbackId=this.selectedThirdCategory.catbackId;

        this.getAllSelect(this.formEntity.catbackId)
        
    }
}
</script>
<style scoped lang="scss">
    .custom-error{
        position:relative;
    }
    .img-upload{
        text-align:center;
        width:100px;
    }
    .img-item{
         width:100px;
         position:relative;
         text-align:center;
         height:100px;
    }
    .delete-btn{
        position: absolute;
        bottom:0px;
        width:100%;
        height:26px;
        line-height:26px;
        .wrap{
            background-color:#000000;
            opacity:0;
            margin:0px auto;
            width:100px;
            color:#ffffff;
            &:hover{
                opacity:0.3;
            }
        }
    }
    .custom-table{
        margin-top:10px;
        width: 100%;
        th{
            white-space: nowrap;
            overflow: hidden;
            background-color: #eef1f6;
            text-align: center;
            height:40px;
            vertical-align: middle;
            padding-left:18px;
            padding-right:18px;
        }
        tr{
            vertical-align:top;
        }
        td{
            height: 40px;
            text-align:center;
            text-overflow: ellipsis;
            // vertical-align: middle;
            border-bottom: 1px solid #dfe6ec;
            padding-left:18px;
            padding-right:18px;
            
            .cell{
                margin-top:8px;
                margin-bottom:8px;
            }
            .validate-error{
                height:20px;
                line-height:10px;
                color:#ff4949;
                text-align:left;
            }
        }
    }
    .header{
        font-size:16px;
        color:#33bbab;
    }
    .select-type{
        padding-left:40px;
        padding-bottom:20px;
        height:40px;
        line-height:40px;
        background-color:#ffffff;
        .item{
            color:#666666;
            font-size:14px;
            &.title{
                width:120px;
                color:#333333;
            }
        }
        .arrow{
            padding-left:5px;
            padding-right:5px;
        }
        div{
            float:left
        }
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
        height:100px;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
    
    .require-label:before{
        content: '*';
        color: #ff4949;
        margin-right: 4px;
    }
    .detail-info .label.header{
        background-color:#f3f5f7;
        text-align:center;
    }
    .btn-submit{
        background-color:#33bbab;
        color:#ffffff;
        border:none;
    }
    .radio-group{
        height:40px;
        line-height:40px;
    }
    .cover{
        position:absolute;
        width:100%;
        height:100%;
        opacity:0.3;
        background-color:#666666;
        z-index:100
    }
</style>
<style>
    .sku .ql-container.ql-snow{
        height:375px;
    }
    .sku .el-form-item__error{
        width:310px;
        left:100%;
        top:10px;
    }
    .sku .el-form-item__content{
        margin-left:0px!important;
    }
    .sku .el-upload--picture-card{
        width:100px;
        height:100px;
    }
    .sku .el-upload-list__item {
        width:100px;
        height:100px;
    }
    .sku .cell .error .el-input__inner{ 
        border:1px solid #ff4949;
    }
    .sku .error input{
        border:1px solid #ff4949;
    }
</style>