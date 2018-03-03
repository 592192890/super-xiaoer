<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form ref="form" :model="formEntity" label-width="100px" label-position="left">
                    <el-form-item label="店铺名称" >
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-input v-model="formEntity.shopName"></el-input>
                            </el-col>
                        </el-row>   
                    </el-form-item>
                    <el-form-item label="经营类目" >
                        <el-row :gutter="20">
                            <el-col :span="20" class="tips">
                                删除店铺的经营类目会造成相应商品下架，请谨慎操作。所有修改即时生效
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="20">
                                <el-table :data="formEntity.productType" ref="multipleTable" highlight-current-row style="margin-left:10px">
    				
                                    <el-table-column prop="firstCategory" label="一级类目">
                                    </el-table-column>
                                    <el-table-column prop="secondCategory" label="二级类目">
                                    </el-table-column>
                                    <el-table-column prop="thirdCategory" label="三级类目">
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template scope="scope">
                                            <span @click="handleDel(scope.$index, scope.row)" class="del-btn">删除</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-col>   
                        
                        </el-row>
                    </el-form-item>
                    <el-form-item label="添加经营类目" >
                        <el-row :gutter="20">
                             <el-col :span="4">
                                <el-select v-model="formEntity.value1" @change='changeOne' placeholder="请选择">
                                    <el-option
                                      v-for="item in options1"
                                      :key="item.catbackId"
                                      :label="item.catbackName"
                                      :value="item.catbackId">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="formEntity.value2" @change='changeTwo' placeholder="请选择">
                                    <el-option
                                      v-for="item in options2"
                                      :key="item.catbackId"
                                      :label="item.catbackName"
                                      :value="item.catbackId">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="formEntity.value3" @change='changeThr' placeholder="请选择">
                                    <el-option
                                      v-for="item in options3"
                                      :key="item.catbackId"
                                      :label="item.catbackName"
                                      :value="item.catbackId">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="confirm">确定</el-button>
                            </el-col>
                        </el-row> 
                    </el-form-item>
                    <el-form-item label="店铺状态" >
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-radio-group v-model="formEntity.status">
                                    <el-radio :label="item.code" v-for="item in statusList" :key="item.code" >{{item.description}}</el-radio>
                                </el-radio-group>                        
                            </el-col>
                        </el-row>
                    </el-form-item>  
                    <el-form-item label-width="110px">
                        <el-button type="primary" class="save-btn" @click="goSave">保存</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
			</el-col>
		</section>
        <el-dialog
            title="提示"
            :visible.sync="saveDialogVisible"
            size="tiny">
            <span>保存成功</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeSaveDialog" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="DialogVisible"
            size="tiny">
            <span>必须添加到二级类目以上！(包括二级类目)</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogVisible=false" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="deleteDialogVisible"
            size="tiny">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirmDelete" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
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
                titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺管理'},{id:3,name:'修改配置'}],
                saveDialogVisible:false,
                deleteDialogVisible:false,
                DialogVisible:false,
                row:{},
                statusList:[],
                getCatesByPidUrl:'',
                businessTypeCode:'',
                options1:[],
                options2:[],
                options3:[],
                formEntity:{
                    productType:[],
                    shopName:'',
                    status:'',
                    value1: '',
                    value2: '',
                    value3: ''
                },
                firstCategory:'',
                firstCategoryCode:'',
                secondCategory:'',
                secondCategoryCode:'',
                thirdCategory:'',
                thirdCategoryCode:'',
                shopId:'',
            }
        },
        methods:{
            confirm(){
                let addCategoryUrl = this.$apiUrl.addCategoryUrl
                let params = {
                    firstCategory: this.firstCategory,
                    firstCategoryCode: this.firstCategoryCode,
                    secondCategory: this.secondCategory,
                    secondCategoryCode: this.secondCategoryCode,
                    shopId: this.shopId,
                    thirdCategory: this.thirdCategory,
                    thirdCategoryCode: this.thirdCategoryCode
                }

                let param2 = {
                    shopId: this.shopId,
                    type:"online"
                }

                if(!this.firstCategory||!this.secondCategory){
                    this.DialogVisible = true;
                    return
                }

                this.$ajax.post(addCategoryUrl, params).then(res =>{
                    this.formEntity.value1 = ''
                    this.formEntity.value2 = ''
                    this.formEntity.value3 = ''
                    this.firstCategory = ''
                    this.firstCategoryCode = ''
                    this.secondCategory = ''
                    this.thirdCategory = ''
                    this.secondCategoryCode = ''
                    this.thirdCategoryCode = ''
                    this.options2 = []
                    this.options3 = []
                    if(res.error) return
                    this.$ajax.post(this.$apiUrl.getShopInfoUrl, param2).then(res =>{
                        if(res.error) return
                        this.formEntity.productType = res.data.businessCategories;
                        
                    })
                })
            },

            changeOne(id){
                this.formEntity.value2 = ''
                this.formEntity.value3 = ''
                this.secondCategory = ''
                this.thirdCategory = ''
                this.secondCategoryCode = ''
                this.thirdCategoryCode = ''
                this.options2 = []
                this.options3 = []
                if(!id) return
                let len1 = this.options1.length;
                if(len1>0){
                    for(let i=0; i<len1; i++){
                        if(this.options1[i].firstCategoryCode==id){
                            this.firstCategory = this.options1[i].firstCategory;
                            this.firstCategoryCode = this.options1[i].firstCategoryCode;
                            break;
                        }
                    }
                }
                this.$ajax.get(this.getCatesByPidUrl, {businessTypeCode:this.businessTypeCode, parentId:id,cateLevel:"second"}).then(res =>{
                    this.options2 = res.data;
                })
            },

            changeTwo(id){
                if(!id) return
                let len2 = this.options2.length;
                if(len2>0){
                    for(let i=0; i<len2; i++){
                        if(this.options2[i].secondCategoryCode==id){
                            this.secondCategory = this.options2[i].secondCategory;
                            this.secondCategoryCode = this.options2[i].secondCategoryCode;
                            break;
                        }
                    }
                }
                this.$ajax.get(this.getCatesByPidUrl, {businessTypeCode:this.businessTypeCode, parentId:id,cateLevel:"third"}).then(res =>{
                    this.options3 = res.data
                })
            },

            changeThr(id){
                if(!id) return
                let len3 = this.options3.length;
                if(len3>0){
                    for(let i=0; i<len3; i++){
                        if(this.options3[i].thirdCategoryCode==id){
                            this.thirdCategory = this.options3[i].thirdCategory;
                            this.thirdCategoryCode = this.options3[i].thirdCategoryCode;
                            break;
                        }
                    }
                }
            },

            goSave(){
                this.formEntity.status = this.formEntity.status.toString()
                if(this.formEntity.status.length == 1){
                    this.formEntity.status = ["0", this.formEntity.status].join("");
                }
                let params = {
                    shopId: this.shopId,
                    shopName:this.formEntity.shopName,
                    status:this.formEntity.status
                }
                let url=this.$apiUrl.configOnlineUrl;
                this.$ajax.post(url, params).then(res =>{
                    if(res.error) return
                    this.saveDialogVisible=true;
                })      
            },

            goBack(){
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'店铺管理',params:{currentPage:goPageIndex}})
            },

            handleDel(index,row){
                this.deleteDialogVisible = true
                this.row = row;
            },

            comfirmDelete(){
                this.deleteDialogVisible=false;
                let id = this.row.id;
                this.$ajax.get(this.$apiUrl.delCategoryUrl, {id:id}).then(res =>{
                    if(res.msg == '删除成功'){
                        let productType = this.formEntity.productType;
                        for(var i=0; i<productType.length; i++){
                            if(productType[i].id == id){
                                this.formEntity.productType.splice(i,1);
                                break;
                            }
                        }
                    }
                })
            },

            closeSaveDialog(){
                this.saveDialogVisible=false;
                this.goBack();
            }
        },
        mounted(){
            if(this.$route.params.currentPage){
                sessionStorage.setItem('currentPage',this.$route.params.currentPage);
            }
            let query = this.$route.query;
            if(query){
                this.shopId = query.shopId;
            } 
            let param1 = {
                type:"editOnline"
            }
            let param2 = {
                shopId: this.shopId,
                type:"online"
            }
            let url1=this.$apiUrl.getAllShopStatusUrl;
            let url2=this.$apiUrl.getShopInfoUrl;
            this.getCatesByPidUrl=this.$apiUrl.getCatesByPidUrl;

            this.$ajax.get(url1, param1).then(res =>{
                if(res.error) return
                this.statusList = res.data;
                this.statusList.forEach(val =>{
                    val.code = parseInt(val.code,10)
                })
                this.$ajax.post(url2, param2).then(res =>{
                    if(res.error) return
                    this.formEntity.productType = res.data.businessCategories;
                    this.formEntity.shopName = res.data.shopName;
                    this.formEntity.status = parseInt(res.data.status);
                    this.businessTypeCode = res.data.businessTypeCode;
                    this.$ajax.get(this.getCatesByPidUrl, {businessTypeCode:this.businessTypeCode, parentId:0, cateLevel:"first"}).then(res =>{
                        if(res.error) return
                        this.options1 = res.data;
                    })
                })
            })
                
        }   
    }
</script>
<style scoped lang="scss">
    .mod-toolbar{
        padding: 10px 30px;
        box-sizing: border-box;
        background-color:#ffffff;
        .el-form-item{
            margin-bottom:20px
        }
    }
    .latlang .el-form-item__label{
        text-align:left
    }
    .save-btn{
        background-color:#33bbab;
        border:none;
    }
    .del-btn{
        color:#f57575;
        cursor: pointer;
    }
    .tips{
        color:#999
    }
</style>