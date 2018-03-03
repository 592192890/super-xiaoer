<<template>
	<div class="page-view find-password">
        <head-top title-name="安全中心-找回密码"></head-top>
        <div class="main-body">
            <transition-group tag="div" name="fade" mode="out-in">
                <first-step 
                    key="firstStep"
                    v-show="firstStepShow"
                    @firstStepDone="showSecondStep"
                    @secondStatusOk="secondStatusOk"
                    @secondStatusErr="secondStatusErr"
                ></first-step>
                <second-step
                    key="secondStep"
                    v-show="secondStepShow"
                    :bgc="bgc"
                    :statusText="statusText"
                    :icon="icon">
                </second-step>
            </transition-group>
        </div>
        <ft></ft>
    </div>
</template>
<script>
import ft from '@/components/common/login/ft.vue'
import headTop from '@/components/common/login/head.vue'
import firstStep from '@/components/conf/find-password/first-step.vue'
import secondStep from '@/components/conf/find-password/second-step.vue'
import Vue from 'vue'
export default {
	components:{
        ft,headTop,firstStep,secondStep
	},
	data(){
        return{
            statusText:"",//修改密码状态提示文字
            icon:"",//成功或失败的状态图标
            bgc:"",//成功或失败的图标背景颜色，1绿色，0红色
            firstStepShow:true,//当前是第一步状态
            secondStepShow:false//当前是第二步状态
        }
    },
    methods:{
        showSecondStep:function(){
            this.firstStepShow = !this.firstStepShow;
            this.secondStepShow = !this.secondStepShow;
        },
        secondStatusOk:function(){
            this.statusText="恭喜您提交成功！",
            this.icon=""
            this.bgc=true
        },
        secondStatusErr:function(){
            this.statusText="提交失败",
            this.icon=""
            this.bgc=false
        },
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.main-body{
	// position:$rela;
	width:100%;
	margin:0 auto;
	text-align: center;
	
}
</style>
