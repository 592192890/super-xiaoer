<template>
<div class="front-manage">
    <break-crumb :titles="titles"></break-crumb>
    <section>
        <el-row :span="24" class="front">
        	<el-col :span="16" >
        		<div class="addLevelOne button" @click="addLevelOne" v-if="buttonArr.indexOf('bt-addRootCategory')!=-1">新增一级分类</div>
        		<div class="delete button" @click="onDelete" v-if="buttonArr.indexOf('bt-delete')!=-1">删除分类</div>
        	</el-col>
            <el-col :span="1">
                <div class="label">查询</div>
            </el-col>
            <el-col :span="4">
                <el-select v-model="formEntity.targetType" placeholder="云猴精选
">
                    <el-option
                      v-for="item in options"
                      :key="item.code"
                      :label="item.description"
                      :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2" class="search">
                <el-button type="primary" @click="search()">搜索</el-button>
            </el-col>
        </el-row>
        <el-row :span="24">
            <el-col class="mod-header frontSelect">
                <div class="choose">
                    <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
                </div> 
                <div class="className">分类名称</div>
                <div class="operate">操作</div> 
            </el-col>
        </el-row>
        <el-row :span="24">
        	<el-col  class="tree-menu" v-loading="listLoading">
    	        <ul v-for="menuItem in theModel">
    	          <my-tree :model="menuItem"></my-tree>
    	        </ul>
            </el-col>
        </el-row>
    </section>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny">
        <span>{{ tips }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteClassify">确 定</el-button>
      </span>
    </el-dialog>
</div>   
</template>
<script type="text/javascript">

import myTree from './menu.vue';
import breakCrumb from '@/components/common/breakCrumb';
import Permission from '@/assets/js/permission-util.js'
export default {
    components: {
        myTree,
        breakCrumb
    },
    data() {
        return {
            titles:[{id:1,name:'商品中心'},{id:2,name:'前台分类管理'}],
            parentId:"",
            mode:"",
            checked:false,
            formEntity:{
                targetType:''
            },
            options:[],
            targetType:13,
            listLoading:false,
            tips:"",
            dialogVisible:false,
            buttonArr:[]
        }
    },
    computed:{
        theModel: function(){
            return this.$store.getters.getFrontInfo
        },
        idsArr: function(){
            return this.$store.getters.getDeteleArrId
        }
    },
    methods:{
    	addLevelOne(){
            this.$router.push({ name: '前台展示管理-新增1', query:{addLevelOne:true}});
    	},
    	onDelete(){
            this.tips = "还未勾选任何分类"
            if(this.idsArr && this.idsArr.length>0){
                this.tips = "您确认删除吗?"
            }
            this.dialogVisible = true
    	},
        search(){
            this.targetType = this.formEntity.targetType
            this.getData()
        },
        getData(){
            let self = this
            this.listLoading = true;
            this.$ajax.post(this.$apiUrl.getFrontclassifyListUrl,{targetType:this.targetType}).then(res =>{
                this.listLoading = false;
                self.$store.commit('fetchFrontData', {
                    list: res.data.list,
                    mode: self.mode,
                    parentId: self.parentId
                })
            })
        },

        deleteClassify(){
            this.dialogVisible = false
            if(!this.idsArr || this.idsArr.length<1) return
            this.$ajax.post(this.$apiUrl.deleteFrontClassifyUrl,{ids:JSON.stringify(this.idsArr)}).then(res =>{
                if(res.error) return
                this.$store.commit('handleFrontData', {mode:"delete"})
            })
        },

        selectAll(){
            this.$store.commit('handleFrontData', {mode:"selectAll", val: this.checked})
        }
    },
    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        let typeUrl= this.$apiUrl.getType_enum;
        let query = this.$route.query;
        let self = this;
        if(query){
            this.mode = query.mode || '';
            this.parentId = query.parentId||'';
        }
        this.$ajax.post(typeUrl,{}).then(res =>{
            if(res.error) return
            this.options = res.data
        }) 
        center.$on('checkall', function(val){
            if(!val){
                self.checked = val
            } 
        });
        this.getData();    
    }
}
</script>
<style lang="scss">


.front-manage{
    .page-container{
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
    .front{
        margin: 20px 0 10px;
        padding: 15px 30px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        .label {
            height: 36px;
            line-height: 36px;
            font-size: 14px;
        }
        .search{
            margin-left: 10px;
        }
        .button{
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #c4c4c4;
            color: #1f2d3d;
            margin: 0 10px 0 0;
            padding: 0 15px;
            border-radius: 5px;
            line-height: 35px;
        }
        .addLevelOne{
            width: 100px;
            font-size: 16px;
            background-color:#33bcac;
            border:1px solid #33bcac;
            color:#fff;
            text-align: center;
        }
        .delete{
            width: 70px;
            font-size: 16px;
            border:1px solid #ccc;
            color:#333;
            text-align: center;
        }
        .foled{
            &:hover{
                border:1px solid #33bcac;
                color:#33bcac;
            }
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
        .className{
            width: 550px;
            float: left;
            text-align: left;

        }
        .choose{
            width: 100px;
            float: left;
            text-align: left;
        }
        .operate{
            width: 214px;
            float: right;
            text-align: left;
        }
        .el-checkbox__label{
            color: #999;
        }
    }
}

.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color:#33bcac;
    border-color:#33bcac;
}
</style>
