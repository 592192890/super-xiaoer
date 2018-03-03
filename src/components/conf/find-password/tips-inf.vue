<template>
    <div class="tips-inf">{{telNumber}}</div>
</template>
<script>
import ft from '@/components/common/login/ft.vue'
export default {
	props: ['tel'],
	computed:{
		telNumber:function(){
            var inf = "已验证手机号"+this.tel.substr(0, 4) + '****' + this.tel.substr(8);
			return inf;//做加密处理
		},
	}
}
</script>
<style lang="scss" scoped>
.tips-inf{
    height: 64px;
    font-size:16px;
}
</style>
