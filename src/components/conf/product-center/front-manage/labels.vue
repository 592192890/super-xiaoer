<template>
    <el-dialog title="标签搜索" :visible.sync="dialogLabels" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="标签名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" auto-complete="off" class="searchCtn"></el-input>
                <el-button type="primary" @click.stop="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
            ref="multipleTable"
            :data="countries"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="labelName" label="标签名称" width="448"></el-table-column>
        </el-table>
        <el-col :span="8" class="mod-pagination">
            <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:left;" :current-page="currentPage">
            </el-pagination>
        </el-col>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ['pageSize','dialogLabels'],
    data() {
        return {
            multipleSelection: [],
            formLabelWidth: '70px',
            total:0,
            currentPage: 1,
            countries:[],
            form: {
                name: ''
            },
        }
    },

    mounted(){
        this.onSearch()
    },

    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(currentPage){
            this.currentPage = currentPage
            this.onSearch()
        },
        onSearch(){
            let url= this.$apiUrl.getLabelListUrl;
            this.$ajax.get(url,{pageNum:this.currentPage,pageSize:this.pageSize,labelName:this.form.name}).then(res =>{
                if(res.error) return
                this.countries = res.data.list.filter(item=>{
                    return item.isShow == 1
                })
                this.total=res.data.pageInfo && res.data.pageInfo.totalRow;
            })
        },
        handleClose(){
            this.form.name = ''
            this.$emit('labels')
        },
        confirm(){
            let timestamp = Date.parse(new Date());
            let isValid = false
            if(this.multipleSelection && this.multipleSelection.length>0){
                isValid = this.multipleSelection.every(item=>{
                    return item.endDate>=timestamp
                })
            }
            if(!isValid){
                this.$message.error('您所选择的标签中有到期的标签，请重新选择');
                return
            }
            this.form.name = ''
            this.onSearch()
            this.$emit('labels', this.multipleSelection)
        }
    },
}
</script>
 
<style lang="scss">
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
        position: relative;
        margin-top:20px;
        width: 200px;
    }
    .el-dialog__footer{
        padding-top: 0
    }
}


</style>

