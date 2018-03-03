<template>
    <div class="pick-up-search-dialog">
        <el-dialog title="所属门店" :visible.sync="isShow" size="small" :before-close="beforeCloseDialog">
            <el-form :rules="rules" ref="ruleForm" :model="searchEntity" label-width="80px" label-position="left" class="form">
                    <el-row :span="24" :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="门店编码">
                                <el-input v-model="searchEntity.shopMdCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="门店名称">
                                <el-input v-model="searchEntity.shopName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" @click="search(1)">搜索</el-button>
                        </el-col>
                    </el-row>
                    
                    
                </el-form>
            <el-table :data="formEntity"  v-loading="listLoading" highlight-current-row>
                <el-table-column label="选择">
                    <template scope="scope">
                            <el-radio class="radio" v-model="selectedShopId" :label="scope.row.id"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="shopMdCode" label="门店编码"></el-table-column>
                <el-table-column property="shopName" label="门店名称" width="240"></el-table-column>
                
            </el-table>
            <el-row style="margin-top:20px">
                <el-col :span="10">
                    <el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:left;" :current-page="currentPage">
                    </el-pagination>
                </el-col>
                <el-col :span="4" style="float:right">
                    <el-button @click="confirmSelectedShop" class="confirm-btn">确定</el-button>
                    <el-button @click="beforeCloseDialog">取消</el-button>
                </el-col>
            </el-row>
            
            
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="tipsDialogVisible"
            size="tiny">
            <span>请选择一个店铺！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipsDialogVisible=false" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
    // var PAGE_SIZE=20;
    export default {
        props:['isShow'],
        data(){
            return {
                listLoading:true,
                isShowDialog:this.isShow,
                tipsDialogVisible:false,
                currentPage:1,
                total:0,
                pageSize:10,
                selectedShopId:'',
                businessTypeList:[],
                searchEntity:{
                },
                formEntity:[],
                ruleForm:{

                },
                rules:{

                }
            }
        },
        methods:{
            search:function(index){
                this.listLoading=true;
                var url=this.$apiUrl.getShopSelectListUrl;
                var param=Object.assign({},{
                    currentPage:index||1,
                    pageSize:this.pageSize
                },this.searchEntity);
                this.$ajax.post(url,param).then((res)=>{
                    if(res.error==0){
                        this.listLoading=false;
                        this.formEntity=res.data.list;
                        this.total=res.data.pageInfo.totalRow;
                        this.currentPage=res.data.pageInfo.currentPage;
                    }
                    
                })
            },
            confirmSelectedShop:function(){
                if(!this.selectedShopId){
                    this.tipsDialogVisible=true;
                }else{
                    var shopId=this.selectedShopId;
                    for(var i=0;i<this.formEntity.length;i++){
                        var item=this.formEntity[i];
                        if(item.id==shopId){
                            this.beforeCloseDialog()
                            this.$emit('passSelectShop',item)
                            break;
                        }
                    }
                }
            },
            handleCurrentChange:function(index){
                this.search(index);
            },
            beforeCloseDialog:function(){
                this.$emit('watchDialog',false)
            },
            getBusinessTypes:function(){
                var url=this.$apiUrl.getBusinessStatusUrl;

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        sessionStorage.setItem('businessType',JSON.stringify(res.data));
                        this.businessTypeList=res.data;
                    }
                    
                })	
            }
        },
        mounted(){
            this.search();

            //下拉框
            if(sessionStorage.getItem('businessType')){
                this.businessTypeList=JSON.parse(sessionStorage.getItem('businessType'));
            }else{
                this.getBusinessTypes();
            }
        }
        
    }
</script>
<style scoped>
    .confirm-btn{
        background-color:#33bbab;
        color:#ffffff;
        border:none;
    }
</style>
<style>
    .pick-up-search-dialog .el-radio__label{
        display:none;
    }
</style>