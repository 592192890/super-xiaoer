<template>
 <el-menu @select="handleSelect" :default-active="acitiveMenu" class="mod-left" :collapse="collapsed" unique-opened router>
	 <items  :model='item' v-if="!item.hidden" v-for='item in $router.options.routes' :key="item.path"></items>
</el-menu>
</template>
<script>
import items from './items.vue';
export default {
	data(){
		return {
			collapsed:false,
            acitiveMenu:'/waiter'
		}
	},
	// props:['bus'],
	components:{items},

	mounted(){
        this.acitiveMenu=this.$route.path;
	},
	updated(){
		//judge which router to active related menu
		var currentPath=this.$route.path;
        var pathArr=currentPath.split('/');
        if(pathArr.length>3){
            this.acitiveMenu="/"+pathArr[1]+"/"+pathArr[2]+"/index";
        }
	},
	methods: {
        handleSelect(index){
            this.acitiveMenu = index
        },
        handlePath(){
            var currentPath=this.$route.path;
            var pathArr=currentPath.split('/');
            if(pathArr.length>3){
                return "/"+pathArr[1]+"/"+pathArr[2]+"/index";
            }else{
                return currentPath;
            }
        }
	},
    watch:{
        $route(){
            var self = this
            this.handleSelect(self.handlePath())
        }
    }
}
</script>
<style scoped lang="scss">
    .mod-left{
        flex: 0 0 200px;
        width: 200px;
        background-color:#ffffff;
        overflow-y:auto;
        overflow-x:hidden;
		.iconfontcom {
			font-size:16px;
			margin-right:15px;
		}
        .el-menu {
            height: 100%;
        }
        .collapsed {
            width: 60px;
            .item {
                position: relative;
            }
            .submenu {
                position: absolute;
                top: 0px;
                left: 60px;
                z-index: 99999;
                height: auto;
                display: none;
            }
        }
    }
    .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
    }
    .menu-expanded {
        flex: 0 0 180px;
        width: 180px;
    }
</style>
<style>
    .mod-left .el-menu-item{
        color:#333333!important;
    }
    .mod-left .el-menu-item.is-active{
        color: #33bbab!important;
    }
</style>
