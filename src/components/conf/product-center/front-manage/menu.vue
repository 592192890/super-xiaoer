<template>
    <li class="item">
        <div class="item-ctn" :level="model.level" @click="toggle(model)" >
            <el-checkbox v-model="model.checked" @change.stop="checkbox($event, model)" class="checkbox"></el-checkbox>
            <i v-if="isFolder && !open" class="icon iconfontcom">&#xe7fe;</i>
            <i v-show="isFolder && open" class="icon iconfontcom">&#xe7ff;</i>
            <div class="item-name" v-bind:class="{ blank: !isFolder}"> {{ model.catName }}</div>
            <div class="item-operate"> 
                <div class="item-addsub" @click.stop="addSub(model)" v-if="buttonArr.indexOf('bt-addSubCategory')!=-1">新增下级分类</div>
                <div class="item-editor" @click.stop="edit(model)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</div>
                <div class="item-delete" @click.stop="moveUp(model)" v-if="buttonArr.indexOf('bt-up')!=-1">上移</div>
                <div class="item-delete" @click.stop="moveDown(model)" v-if="buttonArr.indexOf('bt-down')!=-1">下移</div>
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
    </li>
</template>

<script>
import Permission from '@/assets/js/permission-util.js'
export default {
    name: 'treeMenu',
    props: ['model'],
    data() {
        return {
            dialogVisible: false,
            tips: "",
            buttonArr:[]
        }
    },

    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length
        },
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
        this.moveUpDown = this.$apiUrl.moveFrontClassifyUrl
    },

    methods: {
        toggle(model) {
            this.$store.commit('handleFrontData', {mode:'toggle', catId: model.catId})
        },
        addSub(data){
            let catId = data.catId;
            let parentId = data.parentId;
            let cateName = data.cateName;
            let targetName = data.targetName;  //业务线
            let level = data.level;
            let targetType = data.targetType;
            let url= this.$apiUrl.addclassifyUrl;
            if(level == 3){
                this.tips = "已经到叶子节点，不允许添加子分类！";
                this.dialogVisible = true;
                return
            }
            this.$router.push({ name: '前台展示管理-新增1', query:{targetType:targetType, targetName: targetName, parentId:catId}});
        },
        edit(data){
            let catId = data.catId;
            let parentId = data.parentId;
            let catName = data.catName;
            let linkUrl = data.linkUrl;
            let targetName = data.targetName;  //业务线
            let targetType = data.targetType;
            let imageUrl = data.imageUrl;
            let imageKey = data.imageKey;
            this.$router.push({ name: '前台展示管理-编辑1', query: { catId: catId, parentId:parentId,catName:catName,linkUrl:linkUrl, targetName:targetName, targetType:targetType,imageUrl:imageUrl,imageKey:imageKey}})
        },

        moveUp(model){
            let params = {
                catId : model.catId,
                catSort : model.catSort,
                move : 1,
                parentId : model.parentId,
                targetType : model.targetType,
            }
            this.$ajax.post(this.moveUpDown, params).then(res =>{
                if(res.error) return
                console.log(res,'up')
                this.$store.commit('handleFrontData', {mode:'moveUp', catId: model.catId})
            })
        },

        moveDown(model){
            let params = {
                catId : model.catId,
                catSort : model.catSort,
                move : 2,
                parentId : model.parentId,
                targetType : model.targetType,
            }
            this.$ajax.post(this.moveUpDown, params).then(res =>{
                if(res.error) return
                console.log(res,'down')
                this.$store.commit('handleFrontData', {mode:'moveDown', catId: model.catId})
            })
        },

        checkbox(e, model){
            let target = e.target;
            let isSelecet = target.checked;
            let catId = model.catId;
            if(!isSelecet){
                center.$emit('checkall', isSelecet)
            }
            this.$store.commit('handleFrontData', {mode:'checkbox', catId: catId, checked:isSelecet})

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
        .item-operate{
            float: right;
            width:225px;
            .item-addsub{
                float: left;
                height: 40px;
                padding: 0 10px;
                text-align: center;
                line-height: 40px;
                color: #30b9a5;
                cursor:pointer;
            }
            .item-editor{
                float: left;
                padding: 0 10px;
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
    .blank{
        padding-left: 22px;
    }
}
.item .item-ctn[level="2"]{
    padding-left: 30px;
    .blank{
        padding-left: 46px;
    }
    .checkbox{
        position: relative;
        left: 0px;
    }
    i{
        margin-left: 26px
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

