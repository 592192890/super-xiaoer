// *
//  * @file login.js
//  * @synopsis  商户前台登陆
//  * @author liuhui, 1026527082@qq.com
//  * @version 1.0.0
//  * @date 2017-05-09
//  * modify by  lvyonghua, lvyonghua416000@163.com

<template>
<div class="page-view fresh" :style="{ height: screenHeight +'px' }">
		<div class="mod-login" v-loading.body="loading" element-loading-text="登陆中">
			<div class="login-l "></div>
			<div class="login-r">
				<div class="r-hd">
					<div class="hd-img">
						<img src="../../../assets/images/conf/login/1.0.0/logo-blue.jpg" alt="">
					</div>
					<div class="hd-descrp">
						综合应用管理平台
					</div>
					
				</div>
				<div class="tips">{{tipsInf}}</div>
				<form action="">
					<div class="r-text">
						<i class="icon iconfontmod r-descpt">&#xe7b7;</i>
						<input type="text" data-value=1 placeholder="请输入手机号" name="phoneNumb" v-model="tel" @input="allowLogin" @keyup="keypress($event)">
					</div>
					<div class="r-text">
						<i class="icon iconfontmod r-descpt">&#xe60c;</i>
						<input type="password" data-value=2 placeholder="请输入密码" name="password" v-model="password" @input="allowLogin" @keyup="keypress($event)">
					</div>
					
					<div class="r-chooece">
						<input v-model="checked" type="checkbox" name="loginSelf" id="loginSelf">
						<label for="loginSelf">2周内自动登录</label>
						<!-- <a href="javascript:;" class="forget-pass" @click="linkToFindPassword">忘记密码</a> -->
					</div>
					<button type="button" class="btn-login" :disabled.prop="disabled" :class="{ disable: isOpcity }" @click="login">登录</button>
				</form>
			</div>
		</div>
        <ft></ft>
	</div>
</template>
<script>
import CustomRoutes from '@/assets/js/custom-routers.js'
import Permission from '@/assets/js/permission-util.js'
import ft from '@/components/common/login/ft.vue'
import Vue from 'vue'
import Router from 'vue-router'
export default {
	components:{
		ft
	},
	data(){
		return {
			screenHeight:"",
			tel:"",//账号
			password:"",//密码
			tipsInf:"",//提示信息
			loginUrl:"",//登陆接口
			checked:false,//自动登录选框选中状态
			disabled:true,//登陆按钮不可点击状态
			isOpcity:true,//登陆按钮样式禁点
			loading:false//加载动画
		}
	},
	mounted(){
		this.loading=true;
		//设置页面高度
		this.screenHeight = document.documentElement.clientHeight;
		
		this.$ajax.get(this.$apiUrl.reSessionUrl).then(res=>{
			if(res.error==0){
				//判断是否已经登录过
				if(res.data.login){
					//如果有login这个参数并且大于0就是已经登录
					var firstRouter=localStorage.getItem('firstRouter')

					this.$router.push({name:firstRouter});
				}else{
					//清空新增的router
					this.clearAddedRouters();
				}
				
			}
			this.loading=false;
		})
		
		
	},
	methods:{
		
		//键盘点击登陆
        keypress:function(e){
			//回车键的键值为13 
			if(e.keyCode == 13&&!this.disable){  
				this.login();
			}  
        },
		allowLogin:function(){
			var self = this;
			if(self.tel && self.password){
				self.disabled=false;
				self.isOpcity=false;
				return true;
            }else{
				self.disabled=true;
				self.isOpcity=true;
				return false;
			};
		},
		clearAddedRouters:function(){
			var routers=this.$router.options.routes;
			var routerLength=routers.length;
			var mark=0;
			for(var i=0;i<routers.length;i++){
				if(routers[i].path=="*"){
					mark=i;
					break;
				}
			}
			//删除新增的路由
			this.$router.options.routes.splice(mark,routerLength-mark);
			
		},
        //登陆
        login:function(){
			var self = this;
			var data = {
				"userName":self.tel,
				"password":self.password,
				"systemCode":"IMP"
			}
			if(self.allowLogin()){
				self.loading=true;
				// self.isAutoLogin();
				self.$ajax.post(self.$apiUrl.loginUrl,data).then(res=>{
						self.loading=false;
						if (res.error !== 0) {
							self.tipsInf=res.msg;
							self.tel="";
							self.password="";
							self.disabled=true;
							self.isOpcity=true;
							return false;
						}
						//存储电话号码
						var userPhone='';
						if(res.data.sysUser.phone){
							var arr=res.data.sysUser.phone.split('')
							arr.splice(3,4,'*','*','*','*');
							var userPhone=arr.join('')
						}
						localStorage.setItem('user-phone',userPhone);
								
						//获得授权的路由
						var params={
							loop:1,
                    		systemCode:'IMP'
						}
						this.$ajax.get(this.$apiUrl.getPermissionRouter,params).then(res=>{
							if(res.error==0){
								if(res.data.resources.length==0){
									this.$message({
										type:'warning',
										message:'你没有任何权限！'
									})
									//调用退出登录接口
									var url=this.$apiUrl.logoutUrl;
									this.$ajax.get(url).then(res=>{
										if(res.error==0){
											//在调用refsession接口
											this.$ajax.get(this.$apiUrl.reSessionUrl).then(res=>{
												if(res.error==0){
												}
											})
										}
									})
									return;
								}
								//动态生成路由
								this.generateNewRouter(res);
								
								//进入第一个路由
								var firstRouter=res.data.resources[0];
								var redirectRootPath=firstRouter.path;
								var redirectName="";
								
								this.$router.options.routes.forEach(v=>{
									if(v.path==redirectRootPath){
										redirectName=v.children[0].name;
									}
								})
								//存储第一个路由,为了之后的跳转
								localStorage.setItem('firstRouter',redirectName)

								this.$router.push({name:redirectName});
							}
							

						})
						
				    })
			}
        },
		generateNewRouter:function(res){
			//动态增加router
			var addRouter=CustomRoutes;
			

			//根据动态生成的router匹配后端返回的路由
			addRouter=Permission.router(addRouter,res.data.resources);
			addRouter.unshift({
				path: '*',
				redirect: '/404',
				hidden: true
			})
			
			this.$router.options.routes=this.$router.options.routes.concat(addRouter)
			this.$router.addRoutes(addRouter)
		},


		linkToFindPassword:function(){
			this.$router.push({path:'/find-password'});
		},
		reSession:function(){
			this.$ajax.get(this.$apiUrl.reSessionUrl).then(res=>{
				// if(res.error!=0){
				// 	this.$message({
				// 		type:'error',
				// 		message:res.msg
				// 	})
				// }
			})
        },
	},
}


</script>
<style lang="scss">
	.fresh{
	position:relative;
	min-width: 1050px;
	height: 100%;
	min-height:650px;
	background: #33384b url('./../../../assets/images/conf/login/1.0.0/body-bg.png') no-repeat fixed top;
}

</style>

<style scoped lang="scss">
.page-view{
	// position:relative;
	// height:100%;
	// min-height:600px;
	.mod-login{
		position:absolute;
		top:50%;
		left:50%;
		margin-left:-550px;
		margin-top:-260px;
		// margin:0 auto;
		height: 530px;
		background-color:#fff;
		border-radius: 10px;
		width:1100px;
		// width:100%;
		.login-l{
			float:left;
			background:#33384b url('./../../../assets/images/conf/login/1.0.0/login-bg.png') no-repeat;
			height:530px;
			max-width:680px;
			width:680px;
		}
		.login-r{
			display: inline-block;
			// background-color:#fff;
			float:right;
			.r-hd{
				width: 418px;
				height: 60px;
				padding: 46px 0 0 0;
				&:after{
					height: 4px;
					background: linear-gradient(top,#c9f4ff,#fff);
					background: -webkit-linear-gradient(top,#c9f4ff,#fff);
					background: -moz-linear-gradient( top,#c9f4ff,#fff);
					background: -o-linear-gradient(top,#c9f4ff,#fff);
					display: block;
					content: " ";
					position: relative;
    				top: -3px;
				}

				.hd-img{
					display: inline-block;
					margin: 0 0 30px 50px;
					img{
						position: relative;
    					top: 3px;
					}
				}
				.hd-descrp{
					display: inline-block;
					font-size: 18px;
					color: #333;
					// margin: 0 0 0 10px;
				}
				.hd-register{
					font-size: 18px;
					color: #ccc;
					position:absolute;
					right: 50px;
					line-height: 50px;
					cursor:pointer;
				}
				a:hover{
					color: #999;
				}
			}
			.tips{
				height:40px;
				line-height:40px;
				padding-left: 50px;
				color:#f35a5a;
				font-size:14px;
			}
			form{
				padding: 0 50px 0 50px;
				.r-text{
					margin: 0 0 20px 0;
					position: relative;
					background-color:#f2f6ff;
					border-radius: 5px;	
					border: 1px solid #f2f6ff;
					input{
						float:right;
						width: 268px;
						height: 50px;
						background-color:#f2f6ff;
						border: none;
						// border-radius: 5px;	
						padding-left: 10px;
						font-size: 18px;
						color: #333;
						line-height: 50px;
						// cursor:pointer;
					}
					::-webkit-input-placeholder { /* WebKit browsers */ 
						color: #ccc; 
					} 
					:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
						color: #ccc; 
					} 
					::-moz-placeholder { /* Mozilla Firefox 19+ */ 
						color: #ccc; 
					} 
					:-ms-input-placeholder { /* Internet Explorer 10+ */ 
						color: #ccc; 
					} 
					input[placeholder]{
						font-size:16px;
						// color:#999;
					}
					.r-descpt{
						position: relative;
						display:inline-block;
						height:50px;
						line-height:50px;
						padding: 0 0 0 10px;
						font-size: 28px;
						color: #999;
					}
					.refresh{
						position: absolute;
						right: 96px;
						top: 20px;
						font-size: 28px;
						color: #999;
						cursor:pointer;
					}
					img{
						position: absolute;
						right: 0;
						top: 1px;
						cursor:pointer;
					}
				}
				.r-chooece{
					position: relative;
					input{
						background-color: #fff;
						color:#999;
						width: 16px;
						height: 16px;
						position: relative;
						top:2px;
						cursor:pointer;
					}
					label{
						color: #333;
						padding: 0 0 0 10px;
						font-size: 14px;
						cursor:pointer;
					}
					.forget-pass{
						position: absolute;
						right: 0px;
						color: #333;
						font-size: 14px;
					}
				}
				.btn-login{
					width: 320px;
					height: 50px;
					border-radius:5px;
					background-color: #33bcab;
					color: #fff;
					border: 1px solid #33bcab;
					margin-top: 50px;
					font-size: 18px;
				}
				.disable{
					opacity:0.3;
				}
			}
		}
	}
}
</style>
