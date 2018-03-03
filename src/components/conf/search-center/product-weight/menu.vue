<template>
    <li class="item-menu" v-if="model.productList && model.productList.length">
        <div class="item-ctn" @click.stop="toggle(model)" >
            <i v-if="isFolder && !open" class="icon iconfontcom">&#xe7fe;</i>
            <i v-if="isFolder && open" class="icon iconfontcom">&#xe7ff;</i>
            <div class="item-name item m"> 
                <el-popover
                    placement="top-start"
                    trigger="hover"
                    :content="model.goodsName">
                    <div class="reference" slot="reference">{{ model.goodsName }}</div>
                </el-popover>
            </div>
            <div class="code item">{{ model.bn }}</div>
        </div>
        <ul>
            <tree-menu v-for="item in model.productList" :model="item" :list="list" :key="item.bn" v-if="model.productList && item.show"></tree-menu>
        </ul>
    </li>
    <li class="item-menu" v-else>
        <div class="item-ctn">
            <el-checkbox v-model="model.checked" @change.stop="checkbox($event, model)" class="checkbox"></el-checkbox>
            <div class="item-name item mr" @click.stop='convert(model)'> 
                <el-popover
                    placement="top-start"
                    trigger="hover"
                    :content="model.specName || model.goodsName">
                    <div class="reference" slot="reference">{{ model.specName || model.goodsName }}</div>
                </el-popover>
            </div>
            <div class="code item">{{ model.bn }}</div>
            <div class="unit item">{{ model.availableNum }}</div>
            <div class="stock item">{{ model.salePrice }}</div>
            <div class="price item" v-if="model.marketable">已上架</div>
            <div class="price item" v-else>已下架</div>
            <div class="location item">{{ model.productOrder }}</div>

        </div>
    </li>  
</template>

<script>
import config from '@/config'
import Permission from '@/assets/js/permission-util.js';
export default {
    name: 'treeMenu',
    props: ['model', 'list', 'currentPage'],
    data() {
        return {
            dialogVisible: false,
            dialogDelVisible:false,
            tips: "",
            dTips:"",
            btips:"",
            current:{},
            parent:[],
            idArr:[],
            goodsId:0,
            deleteId:0,
            market:[],
            buttonArr:[]
        }
    },
    computed: {
        // 是否有子类
        isFolder: function() {
            return this.model.productList && this.model.productList.length
        },
        // 子类是否展开显示
        open: function(){
            let isopen = false;
            for (let i=0, len=this.model.productList.length; i<len; i++ ){
                if(this.model.productList[i].show){
                    isopen = true
                    break;
                }
            }
            return isopen;
        }
    },
    mounted(){

    },

    methods: {
        convert(row){
            window.location.href=config.productDeatilHTML+row.id+".html";
        },
       
        _traversalArr(id, arr, mode) {
            for(let i in arr){       
                if(arr[i].id == id){
                    if(mode=="delete"){
                        arr.splice(i,1);    //  删除店铺分类
                        this.current = null;
                        break;          
                    }else{
                        this.current = arr[i];
                        this.parent = arr;
                    }
                    break;
                }else{
                    this._traversalArr(id, arr[i].productList, mode);
                }    
            }
        },

        // 收缩展开
        toggle(model) {
            let id = model.id
            this._traversalArr(id, this.list);
            if(this.current && this.current.productList){
                this.current.productList.forEach((item, index)=>{
                    item.show = !item.show
                })
            }      
        },

        // 勾选分类
        checkbox(e, model){
            let checked = model.checked
            let id = model.id
            if(!checked){
                center.$emit('onCheck', checked)
            }
            this._traversalArr(id, this.list);
            if(this.current){
                this.current.checked = checked;
                if(checked){
                    this.addId(this.current)
                }else{
                    this.removeId(this.current)
                }
            }
        },

        removeId(obj){
            center.$emit('idArr', {mode:'remove', item:obj})
        },

        addId(obj){
            center.$emit('idArr', {mode:'add', item:obj})
        }
    },
}
</script>
 
<style lang="scss" scoped>

.item-menu{
    width: 100%;
    display: block;
    margin-bottom: 5px;
    .reference{
        width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-ctn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        margin-bottom: 5px;
        background-color: #fff;
        border-radius: 5px;
        padding: 0 25px 0 30px;
        box-sizing: border-box;
        color: #4e4e4e;
        .hide{
            visibility: hidden;
        }
        &:hover{
            box-shadow:0 0 10px rgba(51, 187, 171, .5);  
        }
        .icon{
            float: left;
            width: 30px;
            height: 18px;
            text-align: left;
            font-size: 18px;
            color: #5ca9e1;
            margin-left: 78px;
        }
        .item-name{
            float: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .checkbox{
            float: left;
            margin-right: 60px;
        }
        .item{
            width: 15%;
            float: left;
            text-align: left;
            color: #333;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
            &.m{
                width:132px;
            }
            // &.code{
            //     width: 118px;
            //     height: 40px;
            //     margin-left:20px;
            // }
            // &.unit{
            //     width: 90px;
            // }
            // &.stock{
            //     width: 96px;
            // }
            // &.price{
            //     width: 70px;
            // }
            // &.location{
            //     width: 90px;
            // }
            // &.statue{
            //     width: 86px;
            // }
        }
        .item-relative{
            width: 250px;
            float: left;
            text-align: left;
            .item-addsub{
                float: left;
                text-align: left;
                color: #3dc8f6;
                cursor:pointer;
                margin-right: 10px;
                font-size: 14px;
                &.hide{
                    visibility: hidden;
                }
            }
        }
    }
    ul{
        li{
            .item-ctn{
                background:#f4fcff;
                .mr{
                    margin-left: 0px;
                    width: 132px;
                }
                .checkbox{
                    margin-right: 90px
                }
            }
        }
    }
}

</style>

