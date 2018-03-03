<template>
    <el-col :span="24" class="mod-header">
        <el-col :span="4" class="logo-width"></el-col>
        <el-col :span="2" class="userinfo">
			<div class="userinfo-inner">
				<img src="../../../assets/images/conf/login/1.0.0/user-img.png" @click="logout"/> 
				<span class="userinfo-opr">{{sysUserName}}</span>
			</div>
        </el-col>
		<el-col :span="2" class="userinfo">
			<span style="color:#33bbab;font-size:18px;padding-right:0px">{{phone}}</span>
		</el-col>
    </el-col>
</template>
<script>
export default {
	data(){
		return {
			collapsed:false,
			sysName:'小二后台',
			sysUserAvatar:'',
			sysUserName:'',
			phone:''
		}
	},
	methods: {
		collapse(){
			this.collapsed = !this.collapsed;
			// this.bus.$emit('hd/collapsed', this.collapsed);
		},
		logout: function()
		{
			var _this = this;
			this.$confirm('确认退出吗?', '提示',
			{
				//type: 'warning'
			}).then(() =>
			{
				
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
				
				//退出
				var url=this.$apiUrl.logoutUrl;
				this.$ajax.get(url).then(res=>{
					if(res.error==0){
						this.$router.push('/login');
					}else{
						this.$message({
							type:'error',
							message:res.msg
						})
					}
				})
				
			}).catch(() =>
			{

			});
		},
		handleSelect(key, keyPath) {
			// console.log(key, keyPath);
		}
	},
	// props: ['bus'],
	mounted()
	{
		this.phone=localStorage.getItem('user-phone')||''
	} 
}
</script>
<style scoped lang="scss">
    @import '~scss_vars';
    .mod-header {
        width:100%;
        height: 60px;
        line-height: 60px;
        background: #fff;
        color: #fff;
        overflow:hidden;
        position:absolute;
        z-index:9;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #33bbab;
				line-height:normal;
				.userinfo-opr {
					display:block;	
					// padding-top:17px;
					line-height:60px;
					height:60px;
					color:#33bbab;
				}
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    margin: 10px 0px 10px 10px;
                    float: right;
                    overflow:hidden;
                }
            }
        }
        .logo-width {
            height: 60px;
            float:left;
			font-size:20px;
            width: 200px;
			background:#33bbab url('./../../../assets/images/logo.png') center center no-repeat;
        }
    }
</style>
