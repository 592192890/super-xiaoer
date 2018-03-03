<template>
    <div class="carous">
        <span class="container btn" @click="goLeft" :class="{disable:currentIndex==0}">
            <span><</span>
        </span>
        <span class="container">
            <img :src="imageItem">
        </span>
        <span class="container btn" @click="goRight" :class="{disable:currentIndex==imageList.length-1}">
             <span>></span>
        </span>
        
        
    </div>
</template>
<script>
    export default {
        props:['imageList'],
        data(){
            return {
                imageItem:'',
                currentIndex:0
            }
        },
        methods:{
           goLeft:function(){
               if(this.currentIndex>0){
                   this.currentIndex--;
                   this.imageItem=this.imageList[this.currentIndex]
               }else{
                   return;
               }
           },
           goRight:function(){
               
               if(this.currentIndex==this.imageList.length-1){
                   return;
               }else{
                   this.currentIndex++;
                   this.imageItem=this.imageList[this.currentIndex];
               }
               
           }
        },
        mounted(){
            this.imageItem=this.imageList[0]
        }
    }
</script>
<style scoped lang="scss">
.carous{
    display:table-cell;
    height:140px;
    // min-width:138px;
    .container{
        display:inline-block;
        width:100px;
        height:100px;
        padding-top:20px;
        overflow:hidden;
        img,span{
            display:inline-block;
            width:100%;
            height:100%;
        }
        &.btn{
            width:15px;
            line-height:60px;
            text-align:center;
            background-color:#f3f5f7;
            box-sizing:border-box;
            color:#97a8be;
            &:hover{
                background-color:#e1f5f3;
                color:#33bbab;
            }
            &.disable{
                background-color:#fff;
                color:#e7e7e7;
            }
        }
    }
    
}
</style>