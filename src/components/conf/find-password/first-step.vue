<template>
<div class="first-step">
    <div class="center">
        <i class="icon iconfontmod">&#xe7b7;</i><input type="text" placeholder="请填写身份证号码" autofocus v-model="id" @blur="idVerification" @input="clearTipsOne"/>
    </div>
    <span class="tips one">{{tipsOne}}</span>
    <div class="center">
        <i class="icon iconfontmod">&#xe60c;</i><input id="jNewPassword" type="password" placeholder="密码由6-20个数字和字母组合" v-model="password" @blur="isPassword" @input="passwordRegex"/>
        <div class="level" v-if="leveShow">
            <div class="text">安全程度</div>
            <span class="graph good" v-if="isEnough">弱</span>
            <span class="graph better" v-if="isMedium">中</span>
            <span class="graph best" v-if="isStrong">强</span>
        </div>
    </div>
    <span class="tips three">{{tipsThree}}</span>
    <transition name="slide-fade">
        <tips-inf 
            v-if="ok"
            :tel="tel">
        </tips-inf>
    </transition>
    <div class="center bottom">
        <i class="icon iconfontmod">&#xe60c;</i><input id="captcha" type="text" placeholder="请输入手机验证码" v-model="CodeNum" @input="btnCanClick"/>
        <button  id="jGetCode" @click="getCode" :class="[canClick ? get : sec]" :disabled="!canClick">{{getOrCountText}}</button>
    </div>
    <span class="tips two">{{tipsTwo}}</span>
    <button id="jLoginBtn" class="center button" :disabled="!canSubmit" :class="[canSubmit ? '' : disable]" @click="login">提交</button>
    <a href="javascript:;" class="link" @click="retureLogin">账号密码登陆</a>
</div>
</template>
<script>
import tipsInf from '@/components/conf/find-password/tips-inf.vue'
export default {
    data(){
        return{
            ok:false,//短信是否发送成功，成功展示
            tel:"15576974746",
            tipsOne:"",
            tipsThree:"",
            tipsTwo:"",
            id:"",//身份证号
            password:"",
            leveShow:false,//显示密码等级
            isEnough:false,//弱
            isMedium:false,//中等
            isStrong:false,//强
            canClick:true,
            smsTime:"60",
            getOrCountText:"获取验证码",
            loading:false,
            wholeLoading:true,
            CodeNum:"",
            get:"get",
            sec:"sec",
            canSubmit:false,
            disable:"disable",
        }
    },
    components:{
        tipsInf
	},
    methods:{
        //验证身份证信息，提示用户首先完成身份证信息填写,发送身份验证请求
        idVerification:function(){
            var idType = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
            if(!idType.test(this.id) && this.id){  
                this.tipsOne = "身份证格式有误";  
                return false;  
            } else if(!this.id){
                this.tipsOne = "请先填写该栏，以便完成身份证核验";
                return false;  
            }else if(idType.test(this.id)){
                this.tipsOne = "";
                this.ok=true;
                return true;  
                // this.sendId();
                
            }
            setTimeout(this.btnCanClick(),1000);
            // this.btnCanClick();
        },
        //身份验证请求
        // sendId:function(){
        //     var self = this;
        //     self.$ajax.post(self.loginUrl,data).then(res=>{
        //         if(res.data.xx){
        //             self.ok=true;
        //         }
        //     }).catch(res=>{
        //         self.tipsOne = res.msg;  
        //     })
        // },
        //判断用户是否有重新输入动作，消灭提醒,输入过程中格式正确，消灭提醒
        clearTipsOne:function(){
            var idType = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
            var idCorrect = (idType.test(this.id) && this.id);
            if(!this.id || idCorrect){
            this.tipsOne = "";
            this.btnCanClick();
            // var idType = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
            // if(idType.test(this.id) && this.id){
            //     this.tipsOne = "";
            }  
        },
        //判断新密码格式
        isPassword:function(){
            var passwordRegex = new RegExp("^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,19}.*$", "g");
            if(passwordRegex.test(this.password)){
                this.tipsThree="";
                return true;
            }else if(!passwordRegex.test(this.password) && this.password){
                this.tipsThree="密码由6-20个数字和字母组合";
                
                return false;
            }
            setTimeout(this.btnCanClick(),1000);
            // this.btnCanClick();
        },
        //判断用户是否有重新输入动作，消灭提醒,输入过程中格式正确，消灭提醒
        clearTipsThree:function(){
            var passwordRegex = new RegExp("^(?=.*[0-9].*)(?=.*[a-zA-Z].*).{6,19}.*$", "g");
             if(passwordRegex.test(this.password)){
                this.tipsThree = "";
            }  
        },
        //验证密码强度
        passwordRegex:function(){
            var self = this;
            self.clearTipsThree();
            self.btnCanClick();
            //密码为12位及以上并且字母数字大写字母三项都包括
            var strongRegex = new RegExp("^(?=.{12,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$", "g");
           
            //密码为八位及以上并且字母、数字、大写字母三项中有两项
            var mediumRegex = new RegExp("^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
            //密码为6位以上数字字母组合
            var enoughRegex = new RegExp("(?=.{6,}).*", "g");
            if(!self.password){
                self.leveShow=false;
                self.tipsThree="";
            } else if (strongRegex.test(self.password)) {
                self.leveShow=true;
                self.isEnough=false;
                self.isMedium=false;
                self.isStrong=true;
            } else if (mediumRegex.test(self.password)) {
                self.leveShow=true;
                self.isEnough=false;
                self.isMedium=true;
                self.isStrong=false;
            } else if(enoughRegex.test(self.password)){
                self.leveShow=true;
                self.isEnough=true;
                self.isMedium=false;
                self.isStrong=false;
            };
            
        },
        //发送验证码请求
        getCode: function(){
            var self = this;
            var json = {
                "mobile" : self.tel,
            }
            self.loading=true;
            if(self.ok && self.tel){
                self.canClick=false;
                self.$message('验证码发送成功!');//test
                self.countDown();//test
                // io.post(smsUrl, json, function(rst){
                //     self.loading=false;
                //     self.$message('验证码发送成功!');
                //     if(rst.data&&rst.data.leftSecond){
                //         self.smsTime = parseInt(rst.data.leftSecond);
                //         self.countDown();
                //     }else{
                //         self.countDown();//默认60s
                //     }
                // }, function(e){
                //     self.loading=false;
                //     e.msg && self.$message({
                //         message: e.msg,
                //         type: 'warning'
                //     });
                //     self.CodeNum="";
                //     self.canClick=false;
                //     self.getOrCountText="重新获取";
                // });
            }else{
                self.tipsOne = "请先填写该栏，以便完成身份证核验";
            }
        },
        //获取验证码倒计时
        countDown: function(){
            var self = this;
            self.canClick=false;
            var timeId = setInterval(function(){
                self.smsTime--;
                self.getOrCountText= self.smsTime + 's';
                if(self.smsTime===0){
                    self.smsTime="60";
                    timeId && clearInterval(timeId);
                    self.canClick=true;
                    self.getOrCountText="重新获取";
                }  
            },1000)
        },
        btnCanClick:function(){
            var self = this;
            if(self.id && self.password && self.CodeNum.length==5 && !self.tipsOne && !self.tipsThree && self.ok){
                self.canSubmit = true;
            }else{
                self.canSubmit = false;
            }
        },
        //提交按钮逻辑
        login: function(){
            var self = this,
                param;
            if(self.isPassword() && self.idVerification()){
                param = {
                    "mobile" : self.telNum,
                    "captcha" : self.verfCode,
                };  
                self.wholeLoading=true;
                // io.post(authCode, param, function(res){
                    self.wholeLoading=false;
                    //进入步骤二组件
                    self.$emit('firstStepDone');
                    //判断步骤二组件采用的状态
                    // if(){
                        self.$emit('secondStatusOk');
                    // }else{
                        // self.$emit('secondStatusErr');
                    // }
                // }, function(e){
                //     self.wholeLoading=false;
                //     self.tipsTwo = e.msg;
                //     self.CodeNum="";
                //     self.canSubmit = false;
                // });
            }          
        },
        retureLogin:function(){
            this.$router.push({path:'/login'});
        }

    }
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.first-step{
    position:absolute;
    top:50%;
    width:100%;
    // top:50%;
    margin-top:-185px;
    text-align: center;
    // display:none;
}
.center{
    position:relative;
    display:block;
    left:50%;
    margin-left:-170px;
    width:340px;
    height:50px;
    margin-bottom:30px;
    background-color:#f1f8fe;
    border-radius:3px;
    font-size:18px;
    line-height: 50px;
    .icon{
        font-size:28px;
        color:#666;
    }
    input{
        position:relative;
        float:right;
        margin-right:4px;
        width:290px;
        height:50px;
        background-color:#f2f6ff;
        border:none;
        color:#333;
        font-size:16px;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */ 
        color: #bcbcbc; 
    } 
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
        color: #bcbcbc; 
    } 
    ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
        color: #bcbcbc; 
    } 
    :-ms-input-placeholder { /* Internet Explorer 10+ */ 
        color: #bcbcbc; 
    } 
    .get,.sec{
        position:absolute;
        right:5px;
        width:132px;
        height:40px;
        top:5px;
        border:none;
        background-color: #FFF;
        color:#333;
        line-height: 40px;
        font-size:16px;
    }
    .sec{
        // display:none;
        color:#33bcab;
    }
    .hide{
        display:none!important;
    }
    .show{
        display:inline-block!important;
    }
    .level{
        display:inline-block;
        width:160px;
        height:50px;
        position:absolute;
        right:-182px;
        span{
            float:left;
        }
        .text{
            // display:none;
            height:25px;
            line-height:25px;
            text-align: left;
            margin-bottom:10px;
            color:#333;
        }
        .graph{
            // display:none;
            // display:inline-block;
            // width:50px;
            height:14px;
            border-radius:2px;
            color:#fff;
            font-size:12px;
            line-height:14px;
            text-align: center;
        }
        .good{
            width:50px;
            background-color: #e65656;
        }
        .better{
            width:100px;
            background-color: #fbbd46;
        }
        .best{
            width:150px;
            background-color: #72c1fb;
        }
    }

}
.bottom{
			margin-bottom:40px;
		}
.inf{
    width:750px;
    position:absolute;
    top:102px;
    left:50%;
    margin-left:-375px;
    span{
        display:block;
    }
    .bigger{
        font-size:24px;
        margin-bottom:16px;
        color:#333;
    }
    .smaller{
        font-size:14px;
        color:#999;
        em{
            font-style:normal;
        }
    }
}
.button{
    background-color:#33bcab;
    border:none;
    color:#fff;
    font-size:18px;
}
.disable{
    // background-color:#ccc;
    opacity:0.3;
}
.tips{
    position:relative;
    left:50%;
    margin-left:-170px;
    display:block;
    width:293px;
    height:30px;
    line-height: 30px;
    // vertical-align: middle;
    margin-top:-30px;
    color:#f15a58;
    text-align: left;
    padding-left: 47px;
    font-size:14px;
}
.two{
    height:40px;
}
.three{
    height: 45px;
}
.link{
    font-size: 15px;
    color:#333;
    text-decoration:underline;
    margin-left: 250px;
}
</style>
