<template>
    <el-dialog title="关联品牌" :visible.sync="dialogBrands" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="品牌名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" class="searchCtn"></el-input>
                <el-button type="primary" @click.stop="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="brands"
            @select="handleSelectionChange">
            <el-table-column type="selection" width="70"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" width="428"></el-table-column>
        </el-table>
        <el-col :span="8" class="pagination-block">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:left;" :current-page="currentPage">
            </el-pagination>
        </el-col>
        <el-col :span="8" class="associated">
            <div class="tit">已关联品牌</div>
            <div class="details">
                <span class="option" @click.stop="removeBrand(brand)" v-if="relativeBrandList.length" v-for="brand in relativeBrandList">
                    <b>{{ brand.brandName}}</b>
                    <span class="closeBtn">
                        <i class="icon iconfontcom">&#xe6a6;</i>
                    </span>
                </span>
            </div>
        </el-col>
        <div class="footer-block">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="confirm">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ['pageSize','dialogBrands','catbackId'],
    data() {
        return { 
            formLabelWidth: '70px',
            total:0,
            currentPage: 1,
            brands:[],   //所有品牌信息的集合
            relativeBrandList:[], // 已关联品牌的集合
            brandIds:[],  // 所有关联品牌的id的集合
            form: {
                name: ''
            },
            flag:false
        }
    },

    mounted(){
        this.onSearch()
    },

    methods: {
        // 删除已关联品牌
        removeBrand(brand){
            if(!this.relativeBrandList||this.relativeBrandList.length<1) return
            let len = this.relativeBrandList.length;
            for(let i=0; i<len; i++){
                if(this.relativeBrandList[i].brandId==brand.brandId){
                    this.brands.forEach(row => {
                        if(row.brandId==this.relativeBrandList[i].brandId){
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                    this.relativeBrandList.splice(i,1)
                    this.brandIds.splice(i,1)
                    break;
                }
            }
            
        },

        // 是否勾选添加
        handleSelectionChange(selection, row) {
            let isAdd = false  
            selection.forEach(select=>{
                if(select.brandId==row.brandId){
                    isAdd = true
                }
            })
            for(let i=0; i<this.brandIds.length; i++){
                if(isAdd){
                    if(this.brandIds[i]!=row.brandId){
                        this.brandIds.push(row.brandId)
                        this.relativeBrandList.push(row)
                        break;
                    }
                }else{
                    if(this.brandIds[i]==row.brandId){
                        this.brandIds.splice(i,1)
                        this.relativeBrandList.splice(i,1)
                        break;
                    }
                }
            }

            if(this.brandIds.length<1 && isAdd){
                this.brandIds.push(row.brandId)
                this.relativeBrandList.push(row)
            }       
        },

        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            this.onSearch()
            this.flag = true
        },

        onSearch(){
            let self = this
            let url= this.$apiUrl.getBrandsListUrl;
            this.$ajax.get(url,{pageNum:this.currentPage,pageSize:this.pageSize,brandName:this.form.name}).then(res =>{
                if(res.error) return
                this.brands = res.data.list
                this.specialHandle();
                this.total = res.data.pageInfo && res.data.pageInfo.totalRow;
                if(this.flag){
                    this.relativeBrandList.forEach(item=>{
                        let id = item.brandId
                        this.brands.forEach(row => {
                            if(row.brandId==id){
                                setTimeout(function(){
                                    self.$refs.multipleTable.toggleRowSelection(row);
                                },100) 
                            }
                        });
                    })
                }else{
                    this.getRelatives()
                }
                
            })
        },

        getRelatives(){
            let self = this
            this.$ajax.get(this.$apiUrl.getBrandUrl,{backCateId: this.catbackId}).then(res =>{
                if(res.error) return
                if(!res.data.list|| res.data.list.length<1) return
                this.relativeBrandList = res.data.list
                this.relativeBrandList.forEach(item=>{
                    let id = item.brandId
                    self.brandIds.push(id)
                    this.brands.forEach(row => {
                        if(row.brandId==id){
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                })
            })
        },

        handleClose(){
            this.form.name = ''
            this.$emit('brands')
        },

        confirm(){
            this.$ajax.get(this.$apiUrl.addBrandUrl,{backCateId:this.catbackId,brandIds:JSON.stringify(this.brandIds)}).then(res =>{
                if(res.error) return
                this.form.name = ''
                this.$emit('brands')
            })
        },

        // 特殊处理
        specialHandle(){
            document.querySelector('.el-table-column--selection.is-leaf .cell').innerHTML= '选择'
        }
    },
}
</script>
 
<style lang="scss">
.associated{
    width: 100%;
    padding: 20px 0;
    .tit{
        width: 100%;
        font-size: 16px;
        color: #333;
        padding-bottom:15px;
    }
    .details{
        width: 100%;
        overflow: hidden;
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
    }
}


.pagination-block{
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
}
.footer-block{
    width: 100%;
    overflow: hidden;
    text-align: right;
}

.el-dialog{
    border-radius: 5px;
    overflow: hidden;
    &.el-dialog--small{
        width: 540px;
    }
    .el-dialog__body{
        padding-bottom: 20px;
    }
    .el-dialog__header{
        width: 100%;
        padding: 20px;
        background-color: #f3f5f7;
        box-sizing: border-box;
    }
    .el-input{
        width: 350px;
        margin-right: 10px; 
    }
    .mod-pagination{

    }
    .el-dialog__footer{
        padding-top: 0
    }
}

.el-table-column--selection{
    &.is-leaf{
        .el-checkbox{
            display: none;
        }
    } 
}
/* .el-button--primary,.el-button--primary:focus, .el-button--primary:hover{
    background: #33bcac;
    border-color: #33bcac;
} */
</style>

