<template>  
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section style="margin-top:20px;background-color:#fff">
            <step-header currentStep='1'></step-header>

            <el-col :span="24" class="select-type">
                <div class="item title">您当前选择的是：</div>
                <div class="item">{{selectedFirstCategory.catbackName}}</div>
                <div class="item arrow" v-if="selectedFirstCategory">></div>
                <div class="item">{{selectedSecondCategory.catbackName}}</div>
                <div class="item arrow" v-if="selectedSecondCategory">></div>
                <div class="item">{{selectedThirdCategory.catbackName}}</div>
                
            </el-col>
            <el-row class="content">
                <el-col :span="6" class="item">
                    <div class="header">
                        <span>一级分类</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in firstCategoryArr" v-bind:class="{active:item.active}" @click="selectFirstCategory(index,item)" :key="item.catbackId">
                            <span>{{item.catbackName}}</span>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="1" class="arrow">></el-col>
                <el-col :span="6" class="item">
                    <div class="header">
                        <span>二级分类</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in secondCategoryArr" v-bind:class="{active:item.active}" @click="selectSecondCategory(index,item)" :key="item.catbackId">
                            <span >{{item.catbackName}}</span>
                        </li>
                    </ul>
                </el-col>
                <el-col :span="1" class="arrow">></el-col>
                <el-col :span="6" class="item">
                    <div class="header">
                        <span>三级分类</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in thirdCategoryArr" v-bind:class="{active:item.active}" @click="selectThirdCategory(index,item)" :key="item.catbackId">
                            <span>{{item.catbackName}}</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row class="btn-group">
                <el-button class="next-btn btn" @click="goNext()">下一步</el-button>
                <el-button class="btn" @click="goBack">返回</el-button>
            </el-row>
            
        </section>
        
    </div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import stepHeader from './header'
export default {
    components:{
		stepHeader,
        breakCrumb
	},
    data(){
        return {
           titles:[{id:1,name:'商品中心'},{id:2,name:'SPU管理'},{id:3,name:'SPU新增1'}],
           selectedFirstCategory:'',
           selectedSecondCategory:'',
           selectedThirdCategory:'',
           firstCategoryArr:[],
           secondCategoryArr:[],
           thirdCategoryArr:[],
           isBack:false//判断是否是从第二步返回到第一步
        }
    },
    methods:{
        goNext:function(){
            if(!this.selectedThirdCategory){
                center.$emit('globalError','请选择分类信息')
            }else{

                sessionStorage.setItem('selectedFirstCategory',JSON.stringify(this.selectedFirstCategory));
                sessionStorage.setItem('selectedSecondCategory',JSON.stringify(this.selectedSecondCategory));
                sessionStorage.setItem('selectedThirdCategory',JSON.stringify(this.selectedThirdCategory));

                this.$router.push({name:'SPU新增2'});
               
            }
            
        },
        goBack:function(){
            this.$router.push({name:'SPU管理'})
        },
        selectFirstCategory:function(selectedIndex,item){
            this.selectedFirstCategory=item;
            this.firstCategoryArr.forEach(function(value,index){
                if(selectedIndex==index){
                    value.active=true;
                }else{
                    value.active=false;
                }
                
            })
            //查询二级分类
            this.getSecondCategory(item.catbackId);

            this.selectedSecondCategory='';
            this.selectedThirdCategory=''
            this.thirdCategoryArr=[];
        },
        selectSecondCategory:function(selectedIndex,item){
            this.selectedSecondCategory=item;
            this.secondCategoryArr.forEach(function(value,index){
                if(selectedIndex==index){
                    value.active=true;
                }else{
                    value.active=false;
                }
                
            })
            //查询三级分类
            this.getThirdCategory(item.catbackId);

            this.selectedThirdCategory='';
        },
        selectThirdCategory:function(selectedIndex,item){
            this.selectedThirdCategory=item;
            this.thirdCategoryArr.forEach(function(value,index){
                if(selectedIndex==index){
                    value.active=true;
                }else{
                    value.active=false;
                }
                
            })
        },
        getFirstCategory:function(isBack){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId=0";
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.firstCategoryArr=res.data.list

                    if(isBack){
                        for(var i=0;i<this.firstCategoryArr.length;i++){
                            var item=this.firstCategoryArr[i];
                            if(item.catbackId==this.selectedFirstCategory.catbackId){
                                item.active=true;
                                break;
                            }
                        }
                    }
                    
                }
                
            })

            if(isBack){
                this.getSecondCategory(this.selectedFirstCategory.catbackId,isBack)
            }
        },
        getSecondCategory:function(firstCategoryId,isBack){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId="+firstCategoryId;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.secondCategoryArr=res.data.list;

                    if(isBack){
                        for(var i=0;i<this.secondCategoryArr.length;i++){
                            var item=this.secondCategoryArr[i];
                            if(item.catbackId==this.selectedSecondCategory.catbackId){
                                item.active=true;
                                break;
                            }
                        }
                    }
                    
                }
                
            })

            if(isBack){
                this.getThirdCategory(this.selectedSecondCategory.catbackId,isBack)
            }
        },
        getThirdCategory:function(secondCategoryId,isBack){
            var url=this.$apiUrl.getSKUCategoryUrl+"?parentId="+secondCategoryId;
            this.$ajax.get(url).then(res=>{
                if(res.error==0){
                    this.thirdCategoryArr=res.data.list;

                    if(isBack){
                        for(var i=0;i<this.thirdCategoryArr.length;i++){
                            var item=this.thirdCategoryArr[i];
                            if(item.catbackId==this.selectedThirdCategory.catbackId){
                                item.active=true;
                                break;
                            }
                        }
                    }
                    
                }
                
            })
        }
    },
    mounted(){
        this.isBack=false;
        if(this.$route.params.isBack){
            this.isBack=true;
            this.selectedFirstCategory=JSON.parse(sessionStorage.getItem('selectedFirstCategory'));
            this.selectedSecondCategory=JSON.parse(sessionStorage.getItem('selectedSecondCategory'));
            this.selectedThirdCategory=JSON.parse(sessionStorage.getItem('selectedThirdCategory'));
        }
        this.getFirstCategory(this.isBack);


    }
}
</script>
<style scoped lang="scss"> 

    .select-type{
        padding-left:40px;
        padding-bottom:20px;
        background-color:#ffffff;
        .item{
            color:#666666;
            font-size:14px;
            &.title{
                width:120px;
                color:#333333;
            }
        }
        .arrow{
            padding-left:5px;
            padding-right:5px;
        }
        div{
            float:left
        }
    }
    .content{
        ul{
            overflow-y:auto;
            overflow-x:hidden;
            width:100%;
            list-style:none;
            height:350px;
            border:1px solid #efefef;
            box-sizing:border-box;
            li{
                &:hover{
                    background-color:#e4e8f1;
                }
                &.active{
                    background-color:#20a0ff;
                }
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                width:240px;
                height:40px;
                line-height:40px;
                color:#333333;
                span{
                    padding-left:20px;
                    
                }
                
                border-bottom:1px solid #efefef;

                
            }
        }
        
        .item{
            &:first-child{
                margin-left:40px;
                width:240px;
            }
            width:240px;
            .header{
                span{
                    padding-left:20px;
                }
                width:240px;
                height:40px;
                line-height:40px;
                color:#999999;
                background-color:#f3f5f7;

            }
            
        }
        .arrow{
            height:40px;
            line-height:40px;
            text-align:center;
        }
    }
    .btn-group{
        .btn{
            width:80px;
        }
        padding:40px;
        .next-btn{
            color:#ffffff;
            background-color:#33bbab;
            border:none;
        }
    }
</style>