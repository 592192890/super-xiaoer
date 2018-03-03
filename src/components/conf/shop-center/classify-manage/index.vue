<template>
<div>
    <break-crumb :titles="titles"></break-crumb>
    <section>
    	<el-col :span="24" class="classify">
    		<div class="addLevelOne button" @click="addLevelOne" v-if="buttonArr.indexOf('bt-addRootCategory')!=-1">添加一级分类</div>
    		<div class="unfolded button" @click="unfolded">展开所有</div>
    		<div class="foled button" @click="foled">收起所有</div>
    	</el-col>
        <el-col :span="24" class="mod-header">
            <div class="className">分类名称</div>
            <div class="operate">操作</div>
            <div class="sort">排序</div> 
        </el-col>
    	<el-col :span="24" class="tree-menu">
	        <ul v-for="menuItem in theModel">
	          <my-tree :model="menuItem"></my-tree>
	        </ul>
        </el-col>
    </section>
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
            titles:[{id:1,name:'店铺中心'},{id:2,name:'店铺分类管理'}],
            unfold:false,   //  是否展开
            id:"",
            parentId:"",
            mode:"",
            buttonArr:[]
        }
    },
    computed:{
        theModel: function(){
            return this.$store.getters.getInfo
        },
        isFolder: function() {
            return this.theModel && this.theModel.length
        } 
    },
    methods:{
    	addLevelOne(){
            this.$router.push({ name: '添加店铺分类'});
    	},
    	unfolded(){
            this.$store.commit('handleData', {mode:"isFolder", val: true})
    	},
    	foled(){
            this.$store.commit('handleData', {mode:"isFolder", val: false})
    	},
        getData(){
            let self = this
            let url=this.$apiUrl.queryShopclassifyUrl
            this.$ajax.get(url,{}).then(res =>{
                self.$store.commit('fetchData', {
                    list: res.data.list,
                    mode: self.mode,
                    parentId: self.parentId,
                    id: self.id
                })
            })
  
        }
    },
    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        let query = this.$route.query;
        if(query){
            this.mode = query.mode || '';
            this.id = query.id || '';
            this.parentId = query.parentId||'';
        }
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
.page-container {
    font-size: 20px;
    text-align: center;
    color: rgb(192, 204, 218);
}
.classify{
    width: 100%;
    padding: 15px 30px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 5px;
    .button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c4c4c4;
        color: #1f2d3d;
        margin: 0 10px 0 0;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
    .addLevelOne{
        background-color:#33bcac;
        border:1px solid #33bcac;
        color:#fff;
    }
    .unfolded{
        &:hover{
            border:1px solid #33bcac;
            color:#33bcac;
        }
    }
    .foled{
        &:hover{
            border:1px solid #33bcac;
            color:#33bcac;
        }
    }
}


.mod-header{
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
        width: 600px;
        float: left;
        text-align: left;

    }
    .sort{
        width: 100px;
        float: right;
        margin-right:160px;
        text-align: center;
    }
    .operate{
        width: 160px;
        float: right;
        text-align: center;
    }
}

</style>
