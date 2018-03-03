<template>
    <li class="item">
        <div class="item-ctn" :level="model.level" @click="toggle(model)" >
            <el-checkbox v-model="model.checked" @change.stop="checkbox($event, model)" class="checkbox"></el-checkbox>
            <i v-if="isFolder && !open" class="icon iconfontcom">&#xe7fe;</i>
            <i v-if="isFolder && open" class="icon iconfontcom">&#xe7ff;</i>
            <div class="item-name" v-bind:class="{ blank: !isFolder}"> {{ model.catbackName }}</div>
            <div class="item-relative" v-if="model.level==3">
                <div class="item-addsub" @click.stop="getBrand(model)" v-if="buttonArr.indexOf('bt-brand')!=-1">品牌</div>
                <div class="item-addsub" @click.stop="getSpec(model)" v-if="buttonArr.indexOf('bt-spec')!=-1">规格</div>
                <div class="item-addsub" @click.stop="getProperty(model)" v-if="buttonArr.indexOf('bt-prop')!=-1">属性</div>
            </div>
            <div class="item-operate"> 
                <div class="item-addsub" @click.stop="addSub(model)" v-if="buttonArr.indexOf('bt-addSubCategory')!=-1">新增下级分类</div>
                <div class="item-editor" @click.stop="edit(model)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</div>
            </div>
        </div>
        <ul> 
            <tree-menu v-for="item in model.children" :model="item" :key="item.id" v-if="model.children && item.show"></tree-menu>
        </ul>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="tiny">
          <span>{{ tips }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <brands v-if="brandShow" :dialogBrands="dialogBrands" :catbackId="catbackId" :pageSize="pageSize" @brands="closeBrands"></brands>
        <specs v-if="specShow" :dialogSpecs="dialogSpecs" :catbackId="catbackId" :pageSize="pageSize" @specs="closeSpecs"></specs>
        <property v-if="propertyShow" :dialogProperty="dialogProperty" :catbackId="catbackId" :pageSize="pageSize" @property="closeProperty"></property>
    </li>
    
</template>

<script>
import brands from './brands.vue';
import specs from './specs.vue';
import property from './property.vue';
import Permission from '@/assets/js/permission-util.js';
export default {
    name: 'treeMenu',
    props: ['model'],
    data() {
        return {
            dialogVisible: false,
            tips: "",
            pageSize: 7,
            catbackId:'',
            dialogBrands:false,
            dialogSpecs:false,
            dialogProperty:false,
            brandShow:false,
            specShow:false,
            propertyShow:false,
            buttonArr:[]
        }
    },
    components: {
        brands,
        specs,
        property
    },
    computed: {
        // 是否有子类
        isFolder: function() {
            return this.model.children && this.model.children.length
        },
        // 子类是否展开显示
        open: function(){
            let isopen = false;
            for (let i=0, len=this.model.children.length; i<len; i++ ){
                if(this.model.children[i].show){
                    isopen = true
                    break;
                }
            }
            return isopen;
        }
    },
    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
    },

    methods: {
        // 收缩展开
        toggle(model) {
            this.$store.commit('handleBackData', {mode:'toggle', catbackId: model.catbackId})
        },

        // 显示品牌弹框
        getBrand(model){
            this.catbackId = model.catbackId
            this.brandShow = true
            this.dialogBrands = true
        },

        // 删除品牌弹框
        closeBrands(){
            this.dialogBrands = false
            this.brandShow = false
        },

        getSpec(model){
            this.catbackId = model.catbackId
            this.specShow = true
            this.dialogSpecs = true
        },

        closeSpecs(){
            this.dialogSpecs = false
            this.specShow = false
        },

        getProperty(model){
            this.catbackId = model.catbackId
            this.propertyShow = true
            this.dialogProperty = true
        },
        closeProperty(){
            this.dialogProperty = false
            this.propertyShow = false
        },

        // 添加下一级分类
        addSub(model){
            let catbackId = model.catbackId
            let catbackName = model.catbackName
            let parentId = model.parentId;
            let level = model.level;
            if(level == 3){
                this.tips = "已经到叶子节点，不允许添加子分类！";
                this.dialogVisible = true;
                return
            }
            this.$router.push({ name: '后台分类管理-新增', query:{parentId:catbackId}});
        },

        // 编辑当前分类
        edit(model){
            let catbackId = model.catbackId
            let catbackName = model.catbackName
            let parentId = model.parentId;
            let level = model.level;
            this.$router.push({ name: '后台分类管理-编辑', query: {parentId:parentId,catbackName:catbackName,catbackId:catbackId}})
        },

        // 勾选分类
        checkbox(e, model){
            let target = e.target;
            let isSelecet = target.checked;
            let catbackId = model.catbackId;
            if(!isSelecet){
                center.$emit('checkall', isSelecet)
            }
            this.$store.commit('handleBackData', {mode:'checkbox', catbackId: catbackId, checked:isSelecet})

        }
    },
}
</script>
 
<style lang="scss" scoped>

.item{
    width: 100%;
    display: block;
    margin-bottom: 5px;
    .item-ctn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 5px;
        background-color: #fff;
        border-radius: 5px;
        padding: 0 30px;
        box-sizing: border-box;
        color: #4e4e4e;
        &:hover{
            box-shadow:0 0 10px rgba(51, 187, 171, .5);  
        }
        .icon{
            float: left;
            width: 22px;
            height: 100%;
            text-align: left;
            font-size: 16px;
            color: #5ca9e1;
        }
        .item-name{
            float: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 200px;
        }
        .checkbox{
            float: left;
            margin-right: 80px;
        }
        .item-relative{
            width: 250px;
            float: right;
            text-align: left;
            .item-addsub{
                float: left;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #30b9a5;
                cursor:pointer;
                margin-right: 20px 
            }
        }
        .item-operate{
            width: 250px;
            float: right;
            text-align: left;
            .item-addsub{
                float: left;
                height: 40px;
                line-height: 40px;
                color: #30b9a5;
                cursor:pointer;
                margin-right: 20px;
                padding:0;
            }
            .item-editor{
                float: left;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #9d8ef1;
                cursor:pointer;
            }
            .item-delete{
                float: left;
                padding: 0 10px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #57a9e8;
                cursor:pointer;
            }
        }
        
    }
}
.item .item-ctn[level="1"]{
    .item-operate{
        margin-right: 250px;
    }
    .blank{
        padding-left: 22px;
    }
}

.item .item-ctn[level="2"]{
    padding-left: 30px;
    .blank{
        padding-left: 48px;
    }
    .checkbox{
        position: relative;
        left: 0px;
    }
    i{
        margin-left: 26px
    }
    .item-operate{
        margin-right: 250px;
    }
}

.item .item-ctn[level="3"]{
    padding-left: 50px;
    .blank{
        padding-left: 54px;
    }
    .checkbox{
        position: relative;
        left: -20px;
    }
    i{
        margin-left: 40px;
        visibility: hidden;
    }
}

</style>

