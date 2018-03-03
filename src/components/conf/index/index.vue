<template>
    <el-row class="mod-index">
		<hd></hd>
        <el-col :span="24" class="index-bd">
			<left></left>
            <section class="bd-right">
				
				<el-col :span="24">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
            </section>
        </el-col>
    </el-row>
</template>
<script>
import hd from './hd.vue'
import left from './left.vue'
import Vue from 'vue'
export default {
	data(){
		return {
			
		}
	},
	components:{
		hd,left
	}
}
</script>
<style>
	.bd-right{
		background-color:#f2f3f7;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .15s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
