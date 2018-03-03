<template>
    <div class="classify-add">
        <break-crumb :titles="titles"></break-crumb>
        <section class="right-ctn">
            <div class="mod-steps">
                <div class="step-one">1，填写基本信息</div>
                <div class="dotted select"></div>
                <div class="step-two">2，设置筛选条件</div>
                <div class="dotted"></div>
                <div class="step-three">3，编辑成功</div>
            </div>
            <el-col :span="24" class="mod-toolbar">
                <el-form ref="ruleForm" :model="formEntity" v-loading="loading" label-width="150px" label-position="left" class="form">
                    <el-form-item label="按价格区间筛选">
                        <el-col :span="20" style="position: relative;">
                            <el-input class="price-select" @change="changePrice1" v-model="formEntity.price1" v-bind:class="{error:errorMsg1}"></el-input>
                            <span class="line">一</span>
                            <el-input class="price-select" @change="changePrice2" v-model="formEntity.price2" v-bind:class="{error:errorMsg2}"></el-input>
                            <span class="error-msg1" v-bind:class="{show:errorMsg1}">{{ errorMsg1 }}</span>
                            <span class="error-msg2" v-bind:class="{show:errorMsg2}">{{ errorMsg2 }}</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="按商品关键词筛选">
                        <el-col :span="8">
                            <el-input v-model="formEntity.keywords"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <span class="text-link">商品搜索关键词【商品名称】【商品编码】，多个词以【,】分隔开</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="排除商品关键词筛选">
                        <el-col :span="8">
                            <el-input v-model="formEntity.excludekeywords"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <span class="text-link">排除商品搜索关键词【商品名称】或【商品编码】，多个词以【,】分隔开</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="按后台分类筛选">
                        <el-col :span="7">
                            <div class="tree" v-loading="backclassifyLoading">
                                <el-tree
                                  :data="backclassify"
                                  show-checkbox
                                  node-key="catbackId"
                                  ref="tree"
                                  @check-change="checkChange"
                                  highlight-current
                                  :props="defaultProps">
                                </el-tree>
                            </div>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item label="按品牌筛选">
                        <el-col :span="2" class="b_w">
                            <el-button @click="addBrands">添加品牌</el-button>
                        </el-col>
                        <el-col :span="18">
                            <span class="option" @click.stop="removeBrand(brand)" v-if="brandList.length" v-for="brand in brandList" >
                                <b>{{brand.brandName}}</b>
                                <span class="closeBtn">
                                    <i class="icon iconfontcom">&#xe6a6;</i>
                                </span>
                            </span>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="按属性筛选">
                        <el-col :span="4">
                            <el-select v-model="formEntity.attribute"  placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.typeId"
                                  :label="item.typeName"
                                  :value="item.typeId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="按标签筛选">
                        <el-col :span="2" class="b_w">
                            <el-button @click="addLabels">添加标签</el-button>
                        </el-col>
                        <el-col :span="18">
                            <span class="option" @click.stop="removeLabel(label)" v-if="labelList.length" v-for="label in labelList" >
                                <b>{{label.labelName}}</b>
                                <span class="closeBtn">
                                    <i class="icon iconfontcom">&#xe6a6;</i>
                                </span>
                            </span>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="按国家筛选" >
                        <el-col :span="2" class="b_w">
                            <el-button @click="addCountries">添加国家</el-button>
                        </el-col>
                        <el-col :span="18">
                            <span class="option" @click.stop="removeCountry(country)" v-if="countryList.length" v-for="country in countryList" >
                                <b>{{country.countryName}}</b>
                                <span class="closeBtn">
                                    <i class="icon iconfontcom">&#xe6a6;</i>
                                </span>
                            </span>
                        </el-col>
                    </el-form-item>

                    <el-form-item label-width="150px">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </section>
        <countries :dialogCountries="dialogCountries" :pageSize="pageSize" @countries="closeCountries"></countries>
        <labels :dialogLabels="dialogLabels" :pageSize="pageSize" @labels="closeLabels"></labels>
        <brands :dialogBrands="dialogBrands" :pageSize="pageSize" @brands="closeBrands"></brands>
    </div>
    
    
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import countries from './countries.vue';
import labels from './labels.vue';
import brands from './brands.vue';
export default {
    components: {
        breakCrumb,
        countries,
        labels,
        brands
    },
    data(){
        return{
            options:[],
            pageSize: 7,
            titles:[{id:1,name:'店铺中心'},{id:2,name:'前台展示管理-编辑'}],
            countries: [],
            formEntity:{
                price1:'',
                price2:'',
                attribute:'',
                keywords:'',
                excludekeywords:''
            },
            errorMsg1:'',
            errorMsg2:'',
            backclassify: [],
            backclassifyLoading:true,
            defaultProps: {
              children: 'children',
              label: 'catbackName'
            },
            dialogCountries:false,
            dialogLabels:false,
            dialogBrands:false,
            parentId:0,
            targetName:'',
            catName:'',
            brandList:[],
            brandIds:[],
            labelList:[],
            labelIds:[],
            countryList:[],
            countryIds:[],
            backList:[],
            targetType:'',
            imageUrl:'',
            loading:false
        }
    },

    methods:{
        changePrice1(val){
            if (!/^\+?[1-9][0-9]*$/.test(val)) {
                this.errorMsg1 = '请输入整数'
                if(!val){
                    this.errorMsg1 = ''
                }
            }else{
                this.errorMsg1 = ''
            }

        },
        changePrice2(val){
            if (!/^\+?[1-9][0-9]*$/.test(val)) {
                this.errorMsg2 = '请输入整数'
                if(!val){
                    this.errorMsg2 = ''
                }
            }else{
                this.errorMsg2 = ''
            }
        },
        addCountries(){
            this.dialogCountries = true
        },
        closeCountries(opts){
            this.dialogCountries = false
            if(opts && opts.length){
                this.countryList = opts
                this.countryList.forEach(brand=>{
                    this.countryIds.push(brand.countryId)
                })
            }
        },
        addLabels(){
            this.dialogLabels = true
        },
        closeLabels(opts){
            this.dialogLabels = false
            if(opts && opts.length){
                this.labelList = opts
                this.labelList.forEach(brand=>{
                    this.labelIds.push(brand.labelId)
                })
            }
        },
        addBrands(){
            this.dialogBrands = true
        },
        closeBrands(opts){
            this.dialogBrands = false
            if(opts && opts.length){
                this.brandList = opts
                this.brandList.forEach(brand=>{
                    this.brandIds.push(brand.brandId)
                })
            }
        },
        
        removeBrand(data){
            let id = data.brandId
            let len = this.brandList.length;
            while(len--){
                if(this.brandList[len].brandId==id){
                    this.brandList.splice(len,1)
                    this.brandIds.splice(len,1)
                }
            }
        },
        removeLabel(data){
            let id = data.labelId
            let len = this.labelList.length;
            while(len--){
                if(this.labelList[len].labelId==id){
                    this.labelList.splice(len,1)
                    this.labelIds.splice(len,1)
                }
            }
        },
        removeCountry(data){
            let id = data.countryId
            let len = this.countryList.length;
            while(len--){
                if(this.countryList[len].countryId == id){
                    this.countryList.splice(len,1)
                    this.countryIds.splice(len,1)
                }
            }
        },

        removeId(obj){
            for(let i=0; i<this.backList.length; i++){
                if(this.backList[i] == obj.catbackId ){
                    this.backList.splice(i,1)
                    continue;
                }
            }
        },

        addId(obj){
            let repeat = false
            let catbackId = obj.catbackId
            for(let i=0; i<this.backList.length; i++){
                if(this.backList[i] && this.backList[i].catbackId == catbackId ){
                    repeat = true
                    break;
                }
            }
            if(!repeat){
                this.backList.push(catbackId)
            }
        },

        checkChange(obj, isCheck){
            if(isCheck){
                this.addId(obj)
            }else{
                this.removeId(obj)
            }
        },

        submitForm:function(){         
            let param = {};
            let categorySearchList = [];
            let url = this.$apiUrl.getUpdateUrl;
            let formEntity = this.formEntity;
            let price1 = formEntity.price1 || '';
            let price2 = formEntity.price2||'';
            let keywords = formEntity.keywords;
            let excludekeywords = formEntity.excludekeywords
            let backList = this.backList;
            let brandIds = this.brandIds;
            let attribute = formEntity.attribute;
            let labelIds = this.labelIds;
            let countryIds = this.countryIds;
            if(this.errorMsg2 || this.errorMsg1){
                this.$message({
                    showClose: true,
                    message: '价格必须为整数',
                    type: 'error'
                });
                return
            }
   
            let param_price = {}
            param_price.sType = 1
            param_price.filterText = []
            if(price1&&price2){
                param_price.filterText.push(parseInt(price1))
                param_price.filterText.push(parseInt(price2))
            }
            if((!price1&&price2) || (price1&&!price2)){
                this.$message({
                    showClose: true,
                    message: '请把价格区间填写完整',
                    type: 'error'
                });
                return
            }
            categorySearchList.push(param_price)

            let param_keywords = {}   
            if(keywords){
                if(keywords.length>50||keywords.length<2){
                    this.$message({
                        showClose: true,
                        message: '商品关键字不能低于2个字符且不能超过50个字符',
                        type: 'error'
                    });
                    return
                }
                keywords = keywords.replace(/[，]/g, ",");
            }
            if(excludekeywords){
                excludekeywords = excludekeywords.replace(/[，]/g, ",");
            }
            param_keywords.sType = 2
            param_keywords.filterText = keywords || ''
            param_keywords.unfilterText = excludekeywords || ''
            categorySearchList.push(param_keywords)

            if(backList || backList.length>0){
                let param_back = {}
                param_back.sType = 3
                param_back.filterText = backList
                categorySearchList.push(param_back)
            }
            if(brandIds || brandIds.length>0){
                let param_brand = {}
                param_brand.sType = 4
                param_brand.filterText = brandIds
                categorySearchList.push(param_brand)
            }

            let param_attribute = {}
            param_attribute.sType = 5
            param_attribute.filterText = []
            if(attribute){
                param_attribute.filterText.push(attribute)
            }
            categorySearchList.push(param_attribute)

            if(labelIds || labelIds.length>0){
                let param_labelId = {}
                param_labelId.sType = 7
                param_labelId.filterText = labelIds
                categorySearchList.push(param_labelId)
            }
            if(countryIds || countryIds.length>0){
                let param_countryId = {}
                param_countryId.sType = 9
                param_countryId.filterText = countryIds
                categorySearchList.push(param_countryId)
            }
            param.catId = this.catId
            param.catName = this.catName
            param.categorySearchList = JSON.stringify(categorySearchList)
            param.imageKey = this.imageKey
            param.linkUrl = this.linkUrl
            param.parentId = this.parentId
            param.targetType = this.targetType
            this.loading = true
            this.$ajax.post(url, param).then(res =>{
                this.loading = false
                if(res.error) return
                this.$router.push({ name: '前台展示管理-编辑完成', query: { catId: this.catId, parentId:this.parentId,catName:this.catName, imageKey:this.imageKey,linkUrl:this.linkUrl, targetName:this.targetName, targetType:this.targetType,imageUrl:this.imageUrl}})
                }) 
        },

        goBack(){
            this.$router.push({ name: '前台展示管理-编辑1', query:{targetName: this.targetName, parentId:this.parentId, addLevelOne:this.addLevelOne, catName:this.catName,imageKey:this.imageKey,linkUrl:this.linkUrl,targetType:this.targetType,catId:this.catId,imageUrl:this.imageUrl}});
        },

        handleData(data){
            switch(data.sType){
                case 1:
                    let price = JSON.parse(data.filterText)
                    this.formEntity.price1 = price[0]
                    this.formEntity.price2 = price[1]
                    break;
                case 2:
                    let keywords = data.filterText
                    let unfilterText = data.unfilterText
                    this.formEntity.keywords = keywords
                    this.formEntity.excludekeywords = unfilterText
                    break;
                case 3:
                    this.backList = this.backList.concat(JSON.parse(data.filterText))
                    this.setCheckedKeys(this.backList)
                    break;
                case 4:
                    this.brandIds = JSON.parse(data.filterText)
                    this.$ajax.get(this.$apiUrl.getBrandsListUrl,{}).then(res =>{
                        if(res.error) return
                        let list = res.data.list
                        if(!list || list.length<1) return
                        this.brandIds.forEach(id=>{
                            for(let i=0; i<list.length; i++){
                                if(list[i].brandId == id){
                                    this.brandList.push(list[i])
                                }
                            }
                        })
                    })
                    break;
                case 5:
                    let attribute = JSON.parse(data.filterText)
                    this.formEntity.attribute = attribute[0]
                    break;
                case 7:
                    this.labelIds = JSON.parse(data.filterText)
                    this.$ajax.get(this.$apiUrl.getLabelListUrl,{}).then(res =>{
                        if(res.error) return
                        let list = res.data.list
                        if(!list || list.length<1) return
                        this.labelIds.forEach(id=>{
                            for(let i=0; i<list.length; i++){
                                if(list[i].labelId == id){
                                    this.labelList.push(list[i])
                                }
                            }
                        })
                    })
                    break;
                case 9:
                    this.countryIds = JSON.parse(data.filterText)
                    this.$ajax.get(this.$apiUrl.getCountriesListUrl,{}).then(res =>{
                        if(res.error) return
                        let list = res.data.list
                        if(!list || list.length<1) return
                        this.countryIds.forEach(id=>{
                            for(let i=0; i<list.length; i++){
                                if(list[i].countryId == id){
                                    this.countryList.push(list[i])
                                }
                            }
                        })
                    })
                    break;
            }
        },

        setCheckedKeys(arr) {
            this.$refs.tree.setCheckedKeys(arr);
        },
    },

    mounted(){
        let url= this.$apiUrl.getbackclassifyListUrl;
        let query = this.$route.query;
        if(query){
            this.parentId = query.parentId;
            this.addLevelOne = query.addLevelOne || this.addLevelOne;
            this.targetName = query.targetName;
            this.catName = query.catName;
            this.imageKey = query.imageKey
            this.linkUrl = query.linkUrl || ''
            this.targetType = query.targetType
            this.catId = query.catId
            this.imageUrl=query.imageUrl
        }
        this.$ajax.get(url,{}).then(res =>{
            if(res.error) return
            this.backclassify = res.data.list

            this.backclassifyLoading=false;
        })

        this.$ajax.get(this.$apiUrl.getAttributeListUrl,{}).then(res =>{
            if(res.error) return
            this.options = res.data.list
        })

        this.$ajax.get(this.$apiUrl.addGetSearchUrl,{catId:this.catId}).then(res =>{
            if(res.error) return
            if(!res.data || res.data.length<1) return
            let rs = res.data;
            for(let i=0; i<rs.length; i++){
                this.handleData(rs[i])
            } 
        })
    }
}
</script>
<style lang="scss">
.right-ctn{
    margin-top: 20px;
    width: 100%;
    padding: 28px 30px;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    .mod-steps{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content:space-between;
        .step-one{      
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #33bbab;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
        }
        .dotted{
            width: 270px;
            height: 20px;
            border-bottom: 1px dashed #e5e5e5;
            &.select{
                border-bottom: 1px dashed #33bbab;
            }
        }
        .step-two{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            background-color: #e1f5f3;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
            /* &:before{
                float: left;
                width: 168px;
                height: 40px;
                background-color: #f00; 
            } */
        }
        .step-three{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            border: 1px solid #e5e5e5;
            border-radius: 30px;
            text-align: center;
        }
    }
    .mod-toolbar{
        padding: 20px 0 40px;
        background-color: #fff;
    }
    .text-link{
        font-size: 12px;
        color: #999;
        padding: 0 20px;
    }
    .line{
        width: 20px;
        color: #999
    }
    .b_w{
        width: 100px
    }
}
.tree{
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #bfcbd9;
    border-radius: 5px;
}
.el-tree{
    border: none;
}
.text-pic{
    font-size: 12px;
    color: #999;
}
.option{
    float: left;
    font-size: 14px;
    color: #33bbab;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    background-color: #e1f5f3;
    border:1px solid #e1f5f3;
    margin:0 10px 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    b{
        font-weight: normal;
        display: inline-block;
        padding: 0 5px 0 10px;
    }
    .closeBtn{
        display: inline-block;
        box-sizing: border-box;
        width: 35px;
        height: 35px;
        i{
            font-size: 16px;
            margin: 0 0 0 10px;
            position: relative;
            top: -1px
        }
    }
    
    &:hover{
        border:1px solid #33bbab;
        .closeBtn{
            height: 35px;
            box-sizing: border-box;
            background-color: #33bbab;
            i{
                color: #fff;
            }
        }
    }
}

.price-select{
    width: 100px;
    &.error{
        .el-input__inner{
            border-color:#ff4949;
        }
    }
}
.el-form-item{
    margin:30px 0;
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #33bcac;
    border-color: #33bcac;
}
.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #33bcac;
    border-color: #33bcac;
}

.error-msg1{
    position: absolute;
    color:#ff4949;
    margin-left: 20px;
    line-height: 35px;
    height: 35px;
    left: -10px;
    top: 30px;
    display: none;
    &.show{
        display: block;
    }
}

.error-msg2{
    position: absolute;
    color:#ff4949;
    margin-left: 20px;
    line-height: 35px;
    height: 35px;
    left: 113px;
    top: 30px;
    display: none;
    &.show{
        display: block;
    }
}

</style>