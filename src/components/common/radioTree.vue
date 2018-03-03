<template>
    <div class="ui-radio-tree">
        <div @click.stop="expandTree" class="content" v-bind:class="{default:selectedValue=='请选择'}">{{selectedValue}}</div>
        <i class="el-icon-caret-bottom custom-arrow big" v-if="!isShowTree" @click.stop="isShowTree=true"></i>
        <i class="el-icon-caret-top custom-arrow big" v-if="isShowTree" @click.stop="isShowTree=false"></i>
   
        <el-tree :default-expanded-keys="[selectedNodeId]" :data="treeData" v-if="isShowTree" class="tree" @node-click="handleNodeClick"></el-tree>
    </div>
</template>
<script>
export default {
    props:['treeData','selecedType'],
    data(){
        return {
           returnCascaderArr:{},//返回给父组件的值
           selectedValue:'请选择',
           selectedNodeId:null,
           nodeObj:{},
           isShowTree:false
        }
    },
    methods:{
        expandTree:function(){
            this.isShowTree=!this.isShowTree;
            
        },
        handleNodeClick:function(data){
            if(data.leaf){
                this.selectedValue=data.label;
                this.selectedNodeId=data.id;
                this.isShowTree=false;
                this.$emit('returnRadioTreeObj',data);
            }
        }

    },
    mounted(){
        this.selectedValue=this.selecedType;
        //隐藏自定义的级联菜单
        document.body.addEventListener('click',function(){
            var els=document.querySelectorAll(".ui-radio-tree .tree");
            if(els&&els.length>0){
                els[0].style.display="none";
                this.isShowTree=false;

            }
            
            
        }.bind(this),false)
    }
}
</script>

<style scoped lang="scss">
    .ui-radio-tree{
        .tree{
            z-index:1001;
            position: absolute;
            width: 100%;
        }
        position:absolute;
        .content{
            border-radius: 4px;
            padding:3px 10px;
            border:1px solid #cccccc;
            height:28px;
            line-height:28px;
            width:160px;
            overflow:hidden;
            box-sizing:content-box;
        }
        .content.default{
            color:#97a8be;
        }
        .custom-arrow{
            .big{
                transform: scale(1);
                font-size: 14px;
            }
            font-size: 12px;
            transform: scale(.8);
            position: absolute;
            width: 35px;
            right: 0;
            top: 13px;
            text-align: center;
            color: #bfcbd9;
            transition: all .3s;
            cursor: pointer
        }
        
    }
    
</style>