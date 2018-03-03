<template>
    <li class="item">
        <div class="item-ctn" :level="model.level" @click="toggle(model)" >
            <i v-if="isFolder && !open" class="icon iconfontcom">&#xe7fe;</i>
            <i v-if="isFolder && open" class="icon iconfontcom">&#xe7ff;</i>
            <div class="item-name" v-bind:class="{ blank: !isFolder}"> {{ model.cateName | filterSpecialCharacter}}</div>
            <div class="item-operate"> 
                <div class="item-addsub" @click.stop="addSub(model)" v-if="buttonArr.indexOf('bt-addSubCategory')!=-1">添加子类</div>
                <div class="item-editor" @click.stop="edit(model)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</div>
                <div class="item-delete" @click.stop="onDel(model)" v-if="buttonArr.indexOf('bt-delete')!=-1">删除</div>
            </div>
            <div class="item-sort"> {{ model.cateSort }} </div>
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
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
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
            item:"",
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
    },

    methods: {
        toggle(model) {
            this.$store.commit('handleData', {mode:'toggle', id: model.id})
        },

        addSub(data){
            let id = data.id;
            let parentId = data.parentId;
            let cateName = data.cateName;
            let level = data.level;
            let url= this.$apiUrl.addclassifyUrl;
            if(level == 3){
                this.tips = "已经到叶子节点，不允许添加子分类！";
                this.dialogVisible = true;
                return
            }
            this.$router.push({ name: '添加店铺分类', query: { id:id, cateName:cateName,parentId:parentId }});
        },

        edit(data){
            let id = data.id;
            let parentId = data.parentId;
            let cateName = data.cateName;
            let cateSort = data.cateSort;
            let parentName = data.parentName;
            this.$router.push({ name: '编辑店铺分类', query: { id: id, parentId:parentId,cateName:cateName, cateSort:cateSort, parentName:parentName}})
        },

        onDel(model) {
            this.tips = "您确定要删除此分类吗？";
            this.item = model
            this.dialogVisible = true
        },

        confirm(){
            this.dialogVisible = false
            let id = this.item.id;
            let url= this.$apiUrl.deleteclassifyUrl;
            this.$ajax.get(url,{id:id}).then(res =>{
                if(res.error==1){
                    return
                }
                this.$store.commit('handleData', {mode:'delete', id: id})
            })  
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
        .icon{
            float: left;
            width: 22px;
            height: 100%;
            text-align: left;
            font-size: 16px;
            color: #5ca9e1;
            cursor: pointer;
        }
        .item-name{
            float: left;
        }
        .item-sort{
            width: 100px;
            float: right;
            text-align: center;
            margin-right: 164px;
        }
        .item-operate{
            float: right;
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
                color: #f57575;
                cursor:pointer;
            }
        }
    }
}
.item .item-ctn[level="1"]{
    .blank{
        padding-left: 20px;
    }
}
.item .item-ctn[level="2"]{
    padding-left: 60px;
    .blank{
        padding-left: 20px;
    }
}

.item .item-ctn[level="3"]{
    padding-left: 110px;
    i{
        display: none;
    }
}

</style>

