<template>
    <div class="header">
		<div class="worp">
			<img src="../../../assets/images/conf/login/1.0.0/logo-head.png" alt="" />
			<span>{{headTitle}}</span>
		</div>	
	</div>
</template>
<script>
export default {
	props: ['titleName'],
	computed:{
		headTitle:function(){
			return this.titleName;
		}
	}
}
</script>
<style lang="scss" scoped>
.header{
	position:relative;
	width:100%;
	height:100px;
	background-color:#33bcab;
	min-width:830px;
	.worp{
		position:absolute;
		left:20%;
		height:100px;
		line-height:100px;
		img{
		position:relative;
		top:18px;
		border-right:1px solid #fff;
		padding-right:20px;
		}
		span{
			margin-left:20px;
			font-size:24px;
			color:#c6ffe9;
		}
	}
	
}
</style>
