<template>
	<div>
        <el-row class="header">
            <el-col :span="4" class="step">
                <span v-bind:class="{active:currentStep=='1',visited:currentStep!='1'}">1、填写分类</span>    
            </el-col>
            <el-col :span="6" class="step-img">
                <img src="../../../../assets/images/elipsis.png" v-if="currentStep=='1'"/>
                <img src="../../../../assets/images/ellipsis-active.png" v-if="currentStep!='1'"/>
            </el-col>
            <el-col :span="4" class="step">
                <span v-bind:class="{active:currentStep=='2',visited:currentStep=='3'}">2、填写SPU详情</span>
            </el-col>
            <el-col :span="6" class="step-img">
                <img src="../../../../assets/images/elipsis.png" v-if="currentStep!='3'"/>
                <img src="../../../../assets/images/ellipsis-active.png" v-if="currentStep=='3'"/>
            </el-col>
            <el-col :span="4" class="step">
                <span v-bind:class="{active:currentStep=='3'}">3、SPU发布成功</span>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    export default {
        props:['currentStep'],
        data(){
            return {

            }
        }
    }
</script>
<style scoped lang="scss">
    .header{
        padding:30px 40px;
        
        background-color:#ffffff;
        .step-img{
            height:40px;
            line-height:40px;
            img{
                width:100%;
            }
        }
        .step{
            text-align:center;
            &:first-child{
                text-align:left;
            }
            &:last-child{
                text-align:right;
            }
            span{
                &.active{
                    background-color:#e1f5f3;
                    color:#33bbab;
                    border:1px solid #33bbab;
                    
                }
                &.visited{
                    color:#33bbab;
                    border:1px solid #33bbab;
                }
                text-align:center;
                color:#999999;
                border:1px solid #e5e5e5;
                border-radius:26px;
                display:inline-block;
                line-height:40px;
                font-size:16px;
                width:170px;
                height:40px;
            }
            display:inline-block;
        }
    }
</style>  