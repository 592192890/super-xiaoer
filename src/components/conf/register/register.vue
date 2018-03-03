<template>
  <div class="page-view">
	<div class="mod-hd">
		<div class="hd-mod">
			<div class="hd-l">
				<div class="l-img">
					<img src="//s1.bbgstatic.com/pc-user/images/conf/register/logo.png" alt="">
				</div>
				<div class="l-welcome">欢迎注册</div>
			</div>
			<div class="hd-r">已有账号？
				<a href="">立即登录</a>
			</div>
		</div>
	</div>
	<div class="mod-content">
		<form action="#" id="jForm">
			<div class="content content-phone">
				<input type="text" id="phoneNum" name="phoneNum" class="jTxt" data-value="1" placeholder="请输入手机号">
				<i class="icon iconfontmod">&#xe7d4;</i>
				<span class="descrp-eeror jRemind1">请输入手机号码</span>
			</div>
			<div class="content content-password">
				<input type="password" id="password" name="passWord" class="jTxt" data-value="2" placeholder="密码由6-20个数字和字母组合">
				<i class="icon iconfontmod">&#xe7d5;</i>
				<span class="descrp-eeror jRemind2">请输入密码</span>
			</div>
			<!-- <div class="content content-validate-img">
				<input type="text" id="validateImg" class="jTxt" data-value="3" placeholder="请输入图片验证码">
				<img src="//s1.bbgstatic.com/pc-user/images/conf/register/identifyImg.png" alt="" class="img-verify">
				<i class="icon iconfontmod">&#xe7d9;</i>
				<i class="icon iconfontmod refresh change-img" id="jRefresh">&#xe7d3;</i>
				<span class="descrp-eeror jRemind3">请输入图片验证码</span>
			</div> -->
			<div class="content content-validate-phone">
				<input type="text" id="validatePhone" class="register.html" data-value="4" placeholder="请输入手机验证码">
				<i class="icon iconfontmod">&#xe7d8;</i>
				<button type="button" class="btn-identify jVerification">获取验证码</button>
				<span class="descrp-eeror jRemind4">请输入手机验证码</span>
			</div>
			<div class="register-protocol">
				<a href="/pc-user/html/conf/protocol/1.0.0/protocol.html">会员注册协议</a>
			</div>			
			<button type="button" class="btn-agree">同意协议并注册</button>
		</form>
		<div class="register-success">
		    <div class="circle">
		        <i class="icon iconfont">&#xe606;</i>
		    </div>
		    <div class="inf">
		        <span class="bigger">恭喜您注册成功！</span>
		        <span class="smaller"><em>5</em>秒后自动跳转到登陆页面</span>
		    </div>
		</div>
	</div>
    <ft></ft>
</div>
</template>
<script>
import ft from '@/components/common/login/ft.vue'
// import left from './left.vue'
import Vue from 'vue'
export default {
	components:{
		ft
	}
}
</script>
<style lang="scss" scoped>
body{
	min-width: 1050px;
}
/*头部*/
.mod-hd{
	background-color: #3dc9f7;
	.hd-mod{
		width: 990px;
		height: 100px;
        margin: 0 auto;
		.hd-l{
			    float:left;
                margin-top: 27px;
                height: 46px;
			.l-img{
				display: inline-block;
				border-right: 1px solid #fff;
				padding-right: 20px;
                height: 100%;
			}
			.l-title{
				display: inline-block;
				color: #fff;
				padding: 0 20px 0 8px;
				border-right: 1px solid #fff;			
				p:nth-child(1){
					font-size: 32px;
					line-height: 32px;
				}
				p:nth-child(2){
					font-size: 12px;
					line-height: 12px;
				}
			}
			.l-welcome{
				display: inline-block;
				margin: 0 0 0 20px;
				font-size: 24px;
				color: #a2e8fb;
				position: relative;
				top: -14px;
			}
		}
	}
	
	.hd-r{
		float:right;
        margin-top: 42px;
		font-size: 14px;
		color: #a2e8fb;
		a{
			color: #fff;
		}
	}
}
.mod-content{
    margin-top: 30px;
	form{
        width:340px;
        margin:0 auto;
		.content{
			width: 100%;
			margin: 0 0 30px 0;
			position: relative;
			input{
				background-color: #f2f6ff;
				height: 50px;
				border: 1px solid #f2f6ff;
				border-radius: 5px;	
				padding-left: 50px;
				width: 288px;
				font-size: 18px;
				color: #333;
			}
			i{
				position: absolute;
				left: 14px;
				top: 18px;
				font-size: 24px;
				color: #666;
			}
			.refresh{
				position: absolute;
    			left: 215px;
    			cursor: pointer;
			}
			img{
				position: absolute;
				top: 0;
				right: 0;
			}
			.btn-identify{
				width: 130px;
				height: 46px;
				margin: 2px;
				position: absolute;
				right: 0;
				top: 1px;
				background-color: #fff;
				border: 1px solid #fff;
				font-size: 16px;
				color: #333;
            }
            .loading{
                background-image:url('http://s1.bbgstatic.com/pc-user/images/conf/register/loading.gif');
                background-repeat:no-repeat;
                background-position:center;
            }
			.descrp-eeror{
				color: #f95d5b;
				position: absolute;
				font-size: 14px;
				line-height: 30px;
				left: 52px;
				display: none;
			}
		}
		.register-protocol{
			margin-bottom: 40px;
            a{
                color: #333;
                font-size: 14px;
                text-decoration: underline;
            }
		}
		.btn-agree{
			width: 342px;
			height: 50px;
			border-radius:5px;
			background-color: #3dc9f7;
			color: #fff;
			border: 1px solid #3dc9f7;
			font-size: 18px;
		}
	}
    .register-success{
        display:none;
        position:relative;
        top:70px;
        text-align: center;
        .circle{  
            width:70px;
            height:70px;
            border-radius:50%;
            background-color:#56d993;
            color:#fff;
            position:absolute;
            left:50%;
            margin-left:-36px;
            // line-height: 72px;
            .icon{
                animation: circleShow 0.8s;
                -moz-animation: circleShow 0.8s;    /* Firefox */
                -webkit-animation: circleShow 0.8s; /* Safari 和 Chrome */
                -o-animation: circleShow 0.8s;  /* Opera */
                font-size:36px;
                color:#fff;
                position: absolute;
                top: 28px;
                left: 16px;
            }
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
    }
}

.ft{
    position:absolute;
    width:100%;
    // margin:0 auto 20px;
    text-align: center;
    bottom:20px;
    p{
        color:#666;
        font-size:14px;
        &.links{
            margin-bottom:5px;
        }
        a{
            color:#666;
        }
    }
}
/* 注册成功 */
@keyframes circleShow
{
from {
    opacity:0;
    font-size:0;
    left:14px;
    // top: -25px;
    }
to {
    opacity:1;
    font-size:36px;
    left:16px;
    // top: 28px;
    }
}

@-moz-keyframes circleShow /* Firefox */
{
from {
    opacity:0;
    font-size:0;
    left:14px;
    }
to {
    opacity:1;
    font-size:36px;
    left:16px;
    }
}

@-webkit-keyframes circleShow /* Safari 和 Chrome */
{
from {
    opacity:0;
    font-size:0;
    left:14px;
    // top: -25px;
    }
to {
    opacity:1;
    font-size:36px;
    left:16px;
    }
}

@-o-keyframes circleShow /* Opera */
{
from {
    opacity:0;
    font-size:0;
    left:14px;
    }
to {
    opacity:1;
    font-size:36px;
    left:16px;
    }
}
/* 输入框提示 */
::-webkit-input-placeholder { /* WebKit browsers */
    color: #ccc;
    font-size: 16px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #ccc;
    font-size: 16px;
    opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #ccc;
    font-size: 16px;
    opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #ccc;
    font-size: 16px;
}

@media (min-width: 1600px){
    .mod-content {
        margin: 110px auto 0;
    }
}
</style>