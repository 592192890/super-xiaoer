<template>  
    <div class="container">   
        <el-col :span="24" class="mod-breadcrumb">
            <div class="title">你的位置：</div>
            <el-breadcrumb separator=">" class="inner">
                <el-breadcrumb-item v-for="item in titles" :key="item.id" >
                <a @click="goto(item.name)">{{ item.name }}</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
    </div>
    
</template>
<script>
    export default {
        props:['titles'],
        data(){
            return {

            }
        },
        methods:{
            goto(name){
                var routers=this.$router.options.routes;
                var isExist=false;
                var togglePath="";

                for(var i=0;i<routers.length;i++){
                    var item=routers[i];
                    if(item.name==name){
                        isExist=true;
                        togglePath=item.children[0].name;
                        break;
                    }
                }
                if(isExist){
                    this.$router.push({name:togglePath})
                }else{
                    this.$router.push({ name: name })
                }
                
            }
        }
    }
</script>
<style scoped>
    .container{
        height:20px;
        color:#33445a;
    }
</style>