<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section >
			<ul class="review" >
				<li>
					<div :class="{active: first, label: true}" @click="changeState2">保证金/分佣比例审核记录</div>
				</li>
				<li style="margin-left: 18px">
					<div :class="{active: second, label: true}" @click="changeState1">技术服务年费审核记录</div>
				</li>
			</ul>
		</section>
		<tabtwo v-show="first" :pageSize="pageSize"></tabtwo>
		<tabone v-show="second" :pageSize="pageSize"></tabone>
	</div>
	
</template>
<script scoped>
import breakCrumb from '@/components/common/breakCrumb';
import Util from '@/assets/js/util';
import tabone from './tabone.vue';
import tabtwo from './tabtwo.vue';
export default{
	components: {
        breakCrumb,
        tabtwo,
        tabone
    },
	data(){
		return {
			titles:[{id:1,name:'店铺中心'},{id:2,name:'资费审核记录'}],
			pageSize: 20,
			first: true,
			second:false
		}
	},

	methods:{
		changeState2(){
			this.first = true
			this.second = false
		},
		changeState1(){
			this.first = false
			this.second = true
		}	
		
	},
	mounted(){

	}
}
</script>
<style scoped lang="scss">
.review{
	width: 100%;
	overflow: hidden;
	li{
		float: left;
		width: 236px;
		list-style-type: none
	}
}
.mod-toolbar{
	background-color:#ffffff;
}

.label{
	width: 100%;
	font-size:16px;
	height:40px;
	line-height:40px;
	text-align: center;
	border-radius: 5px 5px 0 0;
	box-sizing: border-box;
	background-color: #e2e5e8;
	color: #666;
	cursor: pointer;
}

.mod-review{
	margin: 10px 0;
	.label{
		width: 100%;
		font-size:16px;
		height:40px;
		line-height:40px;
		text-align: center;
		background-color: #fff;
	}
}


.active{
	background-color: #fff;
	border-bottom: 3px solid #33bbab;
	color: #33bbab;
}


</style>

