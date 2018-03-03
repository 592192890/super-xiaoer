<template>
    <div class="search-dialog">
        <el-dialog title="选择品牌" :visible.sync="isShow" size="small" :before-close="beforeCloseDialog">
            <el-form :rules="rules" ref="ruleForm" :model="searchEntity" label-width="80px" label-position="left" class="form">
                    <el-row :span="24" :gutter="10">
                        <el-col :span="6">
                            <el-form-item label="品牌名称">
                                <el-input v-model="searchEntity.brandName"></el-input>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="3">
                            <el-button type="primary" @click="search(1)">搜索</el-button>
                        </el-col>
                    </el-row>
                    
                    
                </el-form>
            <el-table :data="formEntity" v-loading="listLoading" highlight-current-row>
                <el-table-column label="选择">
                    <template scope="scope">
                            <el-radio class="radio" v-model="selectedBrandId" :label="scope.row.brandId"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="brandName" label="品牌名称"></el-table-column>
                <el-table-column property="imageUrl" label="品牌LOGO" width="240">
                    <template scope="scope">
                        <img :src="scope.row.imageUrl" v-if="scope.row.imageUrl" style="width:40px;height:40px"/>
                    </template>
                </el-table-column>
                
            </el-table>
            <el-row style="margin-top:20px">
                <el-col :span="10">
                    <el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:left;" :current-page="currentPage">
                    </el-pagination>
                </el-col>
                <el-col :span="4" style="float:right">
                    <el-button @click="confirmSelectedBrand" class="confirm-btn">确定</el-button>
                    <el-button @click="beforeCloseDialog">取消</el-button>
                </el-col>
            </el-row>
            
            
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="tipsDialogVisible"
            size="tiny">
            <span>请选择一个品牌！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipsDialogVisible=false" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    
</template>
<script>
    import config from '@/config'
    export default {
        props:['isShow'],
        data(){
            return {
                listLoading:true,
                isShowDialog:this.isShow,
                tipsDialogVisible:false,
                currentPage:1,
                total:0,
                pageSize:20,
                selectedBrandId:'',
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
            renderBrandIconUrl: function (obj) {
                var url='';
                if(obj){
                    url = config.staticImg4 + obj;
                }
                
                return url;
            },
            search:function(index){
                this.listLoading=true;
                var url=this.$apiUrl.getBrandListUrl;
                var param={
                    pageNum: index||1,
                    brandName: this.searchEntity.brandName,
                    pageSize:this.pageSize
                }
                this.$ajax.post(url,param).then((res)=>{
                    if(res.error==0){
                        this.listLoading=false;
                        this.formEntity=res.data.list;
                        this.total=res.data.pageInfo.totalRow;
                        this.currentPage=res.data.pageInfo.pageNum;
                    }   
                    
                })
            },
            confirmSelectedBrand:function(){
                if(!this.selectedBrandId){
                    this.tipsDialogVisible=true;
                }else{
                    var brandId=this.selectedBrandId;
                    for(var i=0;i<this.formEntity.length;i++){
                        var item=this.formEntity[i];
                        if(item.brandId==brandId){
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
            
        },
        mounted(){
            this.search();

            
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
    .search-dialog .el-radio__label{
        display:none;
    }
</style>