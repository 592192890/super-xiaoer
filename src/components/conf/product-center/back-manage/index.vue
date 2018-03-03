<template>
<div class="back-manage">
    <break-crumb :titles="titles"></break-crumb>
    <section>
        <el-row :span="24" class="back">
        	<el-col :span="16" >
        		<div class="addLevelOne button" @click="addLevelOne" v-if="buttonArr.indexOf('bt-addRootCategory')!=-1">新增一级分类</div>
        		<div class="delete button" @click="onDelete" v-if="buttonArr.indexOf('bt-delete')!=-1">删除分类</div>
        	</el-col>
        </el-row>
        <el-row :span="24">
            <el-col class="mod-header backSelect">
                <div class="choose">
                    <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
                </div> 
                <div class="className">分类名称</div>
                <div class="relative">关联</div>
                <div class="operate">操作</div> 
            </el-col>
        </el-row>
        <el-row :span="24">
        	<el-col  class="tree-menu" v-loading="listLoading">
    	        <ul v-for="menuItem in theModel" >
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
import Permission from '@/assets/js/permission-util.js';
export default {
    components: {
        myTree,
        breakCrumb
    },
    data() {
        return {
            titles:[{id:1,name:'商品中心'},{id:2,name:'后台分类管理'}],
            catbackId:"",
            parentId:"",
            mode:"",
            checked:false,
            options:[],
            listLoading:false,
            dialogVisible:false,
            tips:"",
            buttonArr:[]
        }
    },
    computed:{
        theModel: function(){
            return this.$store.getters.getBackInfo
        },

        // 选择的所有分类id的集合
        ids: function(){
            return this.$store.getters.getDeteleId
        }
    },
    methods:{
        // 添加一级分类
    	addLevelOne(){
            this.$router.push({ name: '后台分类管理-新增', query:{addLevelOne:true}});
    	},

        
    	onDelete(){
            this.tips = "还未勾选任何分类"
            if(this.ids && this.ids.length>0){
                this.tips = "您确认删除吗?"
            }
            this.dialogVisible = true
    	},

        // 获取树形结构数据
        getData(){
            let self = this
            this.listLoading = true
            this.$ajax.get(this.$apiUrl.getBackClassifyListUrl).then(res =>{
                this.listLoading = false
                if(res.error) return
                self.$store.commit('fetchBackData', {
                    list: res.data.list,
                    mode: self.mode,
                    parentId: self.parentId
                })
            })
        },

        // 勾选或取消勾选所有分类
        selectAll(){
            this.$store.commit('handleBackData', {mode:"selectAll", val: this.checked})
        },

        // 删除分类
        deleteClassify(){
            this.dialogVisible = false
            if(!this.ids || this.ids.length<1) return
            this.$ajax.post(this.$apiUrl.deleteBackClassifyUrl,{ids:JSON.stringify(this.ids)}).then(res =>{
                if(res.error) return
                this.$store.commit('handleBackData', {mode:"delete"})
            })
        }
    },

    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        self = this;
        let query = this.$route.query;
        if(query){
            this.mode = query.mode || '';
            this.parentId = query.parentId||'';
        }
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
.back-manage{
    .page-container {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
    .back{
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

    .backSelect{
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
            width: 450px;
            float: left;
            text-align: left;

        }
        .choose{
            width: 100px;
            float: left;
            text-align: left;
        }
        .relative{
            width: 250px;
            float: right;
            text-align: left;
        }
        .operate{
            width: 250px;
            float: right;
            text-align: left;
        }
        
        .el-checkbox__label{
            color: #999;
        }
    }
}


</style>
