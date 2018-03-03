<template>
    <div class="classify-add">
        <break-crumb :titles="titles"></break-crumb>
        <section class="right-ctn">
            <div class="mod-steps">
                <div class="step-one">1，填写基本信息</div>
                <div class="dotted select"></div>
                <div class="step-two">2，设置筛选条件</div>
                <div class="dotted select"></div>
                <div class="step-three">3，添加成功</div>
            </div>
            <el-col :span="24" class="mod-toolbar">
                <div class="success-tip" >
                    <i class="el-icon-circle-check"></i>
                    <div class="tips">恭喜您！前台展示信息新增成功！</div>
                    <div class="display-info" @click="goToEdit" >重新编辑刚新增的前台展示信息</div>
                </div>
                
                <div class="also-todo" >
                    <div class="may">您还可以</div>
                    <div class="num1" @click="addClassify">1，继续 “<span>新增前台展示信息</span>” </div>
                    <div class="num2" @click="goBack">2，进入 “前台展示列表” 管理 “<span>前台展示信息</span>” </div>
                </div>
            </el-col>
        </section>
    </div>
    
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'

export default {
    components: {
        breakCrumb
    },
    data(){
        return {
            titles:[{id:1,name:'店铺中心'},{id:2,name:'前台展示管理-新增'}],
            parentId:0,
            targetName:'',
            targetType:''
        }
    },

    methods:{
        goToEdit(){
            this.$router.push({ name: '前台展示管理-编辑1', query: { catId: this.catId, parentId:this.parentId,catName:this.catName, imageKey:this.imageKey,linkUrl:this.linkUrl, targetName:this.targetName, targetType:this.targetType,imageUrl:this.imageUrl}})
        },
        addClassify(){
            this.$router.push({ name: '前台展示管理-新增1', query:{targetType:this.targetType, targetName: this.targetName, parentId:this.parentId}});
        },
        goBack(){
            this.$router.push({ name: '前台展示管理', query: { catId: this.catId, parentId:this.parentId, mode:'display'}})
        }
    },

    mounted(){
        let query = this.$route.query;
        if(query){
            this.catId = query.catId;
            this.catName = query.catName;
            this.imageKey = query.imageKey;
            this.imageUrl = query.imageUrl;
            this.linkUrl = query.linkUrl
            this.parentId = query.parentId;
            this.targetName = query.targetName;
            this.targetType = query.targetType;
        }
    }
}
</script>
<style lang="scss" scoped>
.right-ctn{
    margin-top: 20px;
    width: 100%;
    padding: 28px 30px;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    .mod-steps{
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content:space-between;
        .step-one{      
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #33bbab;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
            background-color: #fff;
        }
        .dotted{
            width: 270px;
            height: 20px;
            border-bottom: 1px dashed #e5e5e5;
            &.select{
                border-bottom: 1px dashed #33bbab;
            }
        }
        .step-two{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #33bbab;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
            background-color: #fff;
        }
        .step-three{
            width: 168px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #999;
            background-color: #e1f5f3;
            border: 1px solid #33bbab;
            border-radius: 30px;
            text-align: center;
        }
    }
    .mod-toolbar{
        padding: 80px 0;
        background-color: #fff;
    }
    .success-tip{
        width: 360px;
        margin: 0 auto;
        text-align: center;
        .el-icon-circle-check{
            font-size: 70px;
            color:#33bbab;
        }
        .tips{
            font-size: 24px;
            color: 333;
            padding:28px 0 20px;
        }
        .display-info{
            font-size: 16px;
            color: 333;
            width: 260px;
            height: 35px;
            line-height: 35px;
            border:1px solid #ccc;
            margin:0 auto;
            cursor: pointer
        }
    }
    .also-todo{
        width: 360px;
        margin: 0 auto;
        text-align: center;
        .may{
            font-size: 20px;
            color: 333;
            padding:70px 0 15px;
        }
        .num1{
            font-size: 16px;
            color: 666;
            text-align: center;
            padding: 0 0 10px 0;
            span{
                color: #57a9e8
            }
        }
        .num2{
            font-size: 16px;
            color: 666;
            text-align: center;
            span{
                color: #57a9e8
            }
        }
    }
}
.avatar-uploader{
    margin: 10px 0;
}
.avatar-uploader .el-upload {
    width: 100px;
    height: 100px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
.text-pic{
    font-size: 12px;
    color: #999;
}
.text-link{
    font-size: 12px;
    color: #999;
    padding-left: 20px;
}
.ml{
    margin: 50px 0 0 30px;
}


</style>