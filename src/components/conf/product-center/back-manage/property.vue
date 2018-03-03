<template>
    <el-dialog title="关联属性" :visible.sync="dialogProperty" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="属性名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" class="searchCtn"></el-input>
                <el-button type="primary" @click.stop="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="properties"
            style="width: 100%"
            @select="handleSelectionChange">
            <el-table-column type="selection" label="选择" width="70"></el-table-column>
            <el-table-column prop="typeName" label="属性名称" width="428"></el-table-column>
        </el-table>
        <el-col :span="8" class="pagination-block">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:left;" :current-page="currentPage">
            </el-pagination>
        </el-col>
        <el-col :span="8" class="associated">
            <div class="tit">已关联属性</div>
            <div class="details">
                <span class="option" @click.stop="removeProperty(item)" v-if="show">
                    <b>{{ item.name}}</b>
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
    props: ['pageSize','dialogProperty','catbackId'],
    data() {
        return { 
            formLabelWidth: '70px',
            total:0,
            currentPage: 1,
            show:false,
            item:{},
            typeId:'',
            properties:[],
            propIds:[],
            form: {
                name: ''
            },
            flag:false,
            relativePropertyList:[]
        }
    },

    mounted(){
        this.onSearch()
    },

    methods: {
        removeProperty(model){
            this.properties.forEach(row => {
                if(row.typeId == model.id){
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
            });
            this.typeId = ''
            this.item = {}
            this.show = false  
        },

        handleSelectionChange(selection, row) {
            let isAdd = false // 判断是否勾选
            selection.forEach(select=>{
                if(select.typeId==row.typeId){
                    isAdd = true
                }
            })
            if(isAdd){
                if(!this.typeId){
                    this.item.id = row.typeId
                    this.item.name = row.typeName
                    this.show = true
                    this.typeId = this.item.id
                }else{
                    this.$message({
                        showClose: true,
                        message: '一个分类只能绑定一个属性!',
                        type: 'error',
                        duration:4000
                    });
                    this.$refs.multipleTable.toggleRowSelection(row,false);
                }
            }else{
                this.typeId = ''
                this.item = {}
                this.show = false
            }
        },

        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            this.onSearch()
            this.flag = true
        },

        onSearch(){
            let self = this
            let url= this.$apiUrl.getAttributeListUrl;
            this.$ajax.get(url,{currentPage:this.currentPage,pageSize:this.pageSize,typeName:this.form.name}).then(res =>{
                if(res.error) return
                this.properties = res.data.list
                this.specialHandle();
                this.total = res.data.totalRow;
                if(this.flag){
                    this.properties.forEach(row => {
                        if(row.typeId==this.typeId){
                            setTimeout(function(){
                                self.$refs.multipleTable.toggleRowSelection(row);
                            },100) 
                        }
                    });
                }else{
                    this.getRelatives()
                }
                
            })
        },

        getRelatives(){
            let self = this
            this.$ajax.get(this.$apiUrl.getPropertyUrl,{backCateId: this.catbackId}).then(res =>{
                if(res.error) return
                this.item = res.data
                if(this.item.id){
                    this.show = true
                    this.typeId = this.item.id
                    this.properties.forEach(row => {
                        if(row.typeId==this.typeId){
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                } 

            })
        },

        handleClose(){
            this.form.name = ''
            this.$emit('property')
        },

        confirm(){
            this.$ajax.get(this.$apiUrl.addPropertyUrl,{backCateId:this.catbackId,typeId:this.typeId}).then(res =>{
                if(res.error) return
                this.form.name = ''
                this.$emit('property')
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



</style>

