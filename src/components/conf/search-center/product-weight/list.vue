<template>
<div class="commodity-list">
    <break-crumb :titles="titles"></break-crumb>
    <section>
        <el-row :span="24" class="hearder">
            <el-col :span="2" style="margin-right:2%">
                <el-button class="add-btn" @click="setProductOrder" v-if="buttonArr.indexOf('bt-set')!=-1">设置权重</el-button>
            </el-col>
            <el-col :span="1">
                <div class="label" >查询：</div>            
            </el-col>
            <el-col :span="1" >
                <div class="label">权重 </div>             
            </el-col>
            <el-col :span="2" class="mr">
                <el-select v-model="productOrderOper" placeholder="请选择">
                    <el-option label="小于" value="-1"></el-option>
                    <el-option label="大于" value="1"></el-option>
                    <el-option label="等于" value="0"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2" class="mr">
                <el-input v-model="productOrder" placeholder="权重值"></el-input>
            </el-col>
            <el-col :span="3" class="mr">
                <el-select v-model="type" placeholder="请选择">
                    <el-option label="商品编码" value="1"></el-option>
                    <el-option label="货品编码" value="2"></el-option>
                    <el-option label="商品名称" value="3"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4"  class="mr">
                <el-input v-model="keyword" placeholder="请输入商品名称或编码"></el-input>
            </el-col>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-col>
        </el-row>

        <el-row :span="24">
            <el-col class="mod-header frontSelect">
                <div class="choose">
                    <el-checkbox v-model="checked" @change="checkAll">全选</el-checkbox>
                </div>
                <div class="sub-title">商品名称/规格</div>
                <div class="sub-title">SPU/SKU编码</div>
                <div class="sub-title">可销售库存</div>
                <div class="sub-title">销售价</div>
                <div class="sub-title">上架状态</div>
                <div class="sub-title">权重</div>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col  class="tree-menu" v-loading="listLoading">
                <ul v-for="menuItem in theModel">
                    <my-tree :model="menuItem" :list="theModel" :currentPage="currentPage"></my-tree>
                </ul>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col  class="no-data" v-if="!findOutData">暂无数据</el-col>
        </el-row>
        <el-row :span="24">
            <el-col :span="24" class="mod-toolbar ui-table">
                <el-pagination
                style="float:right;"
                v-loading="listLoading"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
                </el-pagination>
            </el-col>
        </el-row>
    </section>
    <el-dialog
      title="设置权重"
      :visible.sync="dialogSetProductOrderVisible" >
        <el-form :rules="rules" ref="setFormData" :model="setFormData" label-position="left"
               class="form">
            <el-table :data="setFormData.list">
                <el-table-column label="SKU商品规格" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.goodsName}}
                    </template>
                </el-table-column>
                <el-table-column label="SPU/SKU编码" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.bn }}
                    </template>
                </el-table-column>
                <el-table-column  label="权重" show-overflow-tooltip>
                    <template scope="scope">
                        <el-form-item class="validate-table-error"
                                :prop="'list.' + scope.$index +'.productOrder'"
                                :rules="rules.numberValidate">
                            <el-input v-model="scope.row.productOrder" placeholder="权重值"></el-input>
                        </el-form-item>
                     </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelProductOrder">取 消</el-button>
            <el-button type="primary" @click="confirmProductOrder()">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script type="text/javascript">
import breakCrumb from '@/components/common/breakCrumb'
import myTree from './menu.vue';
import Permission from '@/assets/js/permission-util.js';
export default {
    components: {
        myTree,
        breakCrumb
    },
    data() {    
        return {
            titles:[{id:1,name:'搜索中心'},{id:2,name:'商品权重'}],
            idArr:[],
            type:'1',
            keyword:'',
            productOrder:'',
            productOrderOper:'',
            pageSize:20,
            dialogSetProductOrderVisible: false,
            currentPage:1,
            total:0,
            checked:false,
            listLoading:false,
            tips:"",
            theModel:[],
            setFormData: {
              list:[]
            },
            rules: {
              numberValidate: [
                  { validator: this.validateFormData }
              ]
            },
            findOutData:true,
            buttonArr:[]
        }
    },
    methods:{
        validateFormData(rule, value, callback){
            if (value =='' || value == undefined || value == null) {
                return callback(new Error('不能为空'));
            }
            if (!/^[0-9]{1}$/.test(value)) {
                return callback(new Error('请输入正确的权重(0~9)'));
            }
            return callback();
        },

        handleSizeChange(val){
            this.pageSize = val;
            this.search();
        },

        handleCurrentChange(currentPage){
            this.search(currentPage);
        },
        // 获取树形结构数据
        search(index){
            let page = index || this.currentPage
            this.checked = false
            let url = this.$apiUrl.productWeightList
            let param = {
                currentPage : page,
                keyword: this.keyword,
                pageSize : this.pageSize,
                type: this.type,
                productOrderOper:this.productOrderOper,
                productOrder: this.productOrder
            }
            this.findOutData = true
            this.listLoading = true
            this.$ajax.get(url, param).then(res =>{
                this.listLoading = false
                if(res.error==0){
                    this.initData(res.data.list)
                    this.theModel = res.data.list
                    
                    if(res.data.pageInfo){
                        this.total = res.data.pageInfo.totalRow
                        this.currentPage = res.data.pageInfo.currentPage
                    }
                    
                    this.idArr = []
                    this.setFormData.list=[]
                    if(!this.total){
                        this.findOutData = false
                    } 
                }else{
                    this.$message.error(res.msg);
                }
                
            })
        },

        // 初始化数据
        initData(arr){
            if(arr && arr.length>=1){
                arr.forEach(item=>{
                    item.show = false;
                    item.checked = false;
                    if(item.productList && item.productList.length>=1){
                        this.initData(item.productList);
                    }
                })
            }
        },

        // 全部勾选或全部取消
        checkAll(){
            this.getChecked(this.theModel, this.checked)
        },

        getChecked(arr, val){
            if(arr && arr.length>=1){
                arr.forEach(item=>{
                    if(item.productList && item.productList.length>=1){
                        this.getChecked(item.productList, val);
                    }else{
                        item.checked = val;
                        if(val){
                            this.add(item)
                        }else{
                            this.remove(item)
                        }
                    }
                })
            }
        },

        remove(item){
            for(let i=0; i<this.idArr.length; i++){
                if(this.idArr[i] == item.id ){
                    this.idArr.splice(i,1)
                    this.setFormData.list.splice(i,1)
                }
            }
        },

        add(item){
            let repeat = false
            let id = item.id
            for(let i=0; i<this.idArr.length; i++){
                if(this.idArr[i] && this.idArr[i] == id ){
                    repeat = true
                    break;
                }
            }
            if(!repeat){
                this.idArr.push(id)
                this.setFormData.list.push(item)
            }
        },

        // 调整库存
        setProductOrder(){
            this.dialogSetProductOrderVisible = true
            this.productVos=[]
            this.setFormData.list.forEach(item =>{
                this.productVos.push({
                    productId: parseFloat(item.id),
                    wholeBoost: parseFloat(item.productOrder)
                })
            })
            this.$ajax.post(this.$apiUrl.addProductOrderUrl, {productVos:JSON.stringify(this.productVos)}).then(res=>{
            });
        },

        cancelProductOrder(){
            this.dialogSetProductOrderVisible = false
        },

        confirmProductOrder(){
            let self = this
            this.dialogSetProductOrderVisible = false
            this.list=[]
            this.setFormData.list.forEach(item =>{
                this.list.push({
                    key: parseFloat(item.id),
                    value: parseFloat(item.productOrder)
                })
            })
            if(this.setFormData.list.length<1) return
            this.listLoading = true
            this.$ajax.post(this.$apiUrl.updateProductOrderUrl, {list:JSON.stringify(this.list)}).then(res=>{
                this.listLoading = false
                if(res.error==0){
                    setTimeout(function(){
                        self.search()
                        self.setFormData.list = []
                    },3000)
                }else{
                    this.$message.error('权重设置失败！');
                }
            });
        }
    },
    mounted(){
        //获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        let self = this
        let params = this.$route.params || ''
        let query = this.$route.query || ''
        center.$on('onCheck', function(val){
            if(!val){s
                self.checked = val
            }
        });
        center.$on('idArr', function(obj){
            let mode = obj.mode
            if(mode=='remove'){
                self.remove(obj.item)
            }else{
                self.add(obj.item)
            }
        });
        setTimeout(function(){
            self.search()
        },1000)
    }
}
</script>
<style lang="scss" scoped>
.commodity-list{
    .hearder{
        margin: 20px 0 10px;
        padding: 15px 30px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        .mr{
            margin-right:15px;
        }
        .hide{
            visibility: hidden;
        }
    }

    .frontSelect{
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        padding: 0 30px;
        box-sizing: border-box;
        font-size: 14px;
        color: #999;
        margin: 5px 0;
        background-color: #fff;
        border-radius:5px;
        .sub-title{
            width: 15%;
            float: left;
            text-align: left;
            font-size: 14px;
            &.wth{
                width:160px
            }
        }
        .choose{
            width: 80px;
            float: left;
            text-align: left;
        }
    }
    .no-data{
        width:100%;
        padding:20px 0;
        background:#fff;
        text-align:center;
        border-radius:5px;
    }
    .el-form-item{
        margin:0px;
    }
}
.add-btn{
    background-color: #33bbab;
    color:#fff;
    border-color:#33bbab;
}
.label{
    height:36px;
    line-height:36px;
    font-size:14px;
}
</style>
<style lang="scss">
.commodity-list{
    .el-checkbox__input.is-checked{
        .el-checkbox__inner{
            background-color:#33bbab;
            border-color:#33bbab;
        }
    } 
}

</style>
