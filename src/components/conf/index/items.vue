<template>
	<div class="memu-item">
		 <template v-if="nonChildren">
			  <el-menu-item :index="path" :key="path" v-if="!model.url">
				  <i class="iconfontcom" v-html="model.iconCls"></i>
				  {{ model.name }}
			  </el-menu-item>
			  <li v-if="model.url" class="el-menu-item" @click="goTo(model.url)">{{ model.name }}</li>
		  </template> 
		 <template v-else>
			  <el-submenu :index="path" >
				<template>
					<span slot="title" class="title"><i class="iconfontcom icon-title"  v-html="model.iconCls"></i>{{ model.name }}</span>
				</template>
				<items v-if="model.children&&!child.hidden" v-for='child in model.children' :model='child' :key="path" :parentItem="model"></items>
			</el-submenu>
		 </template>
	 </div>
 </template>
<script type="text/javascript">
	import Vue from 'vue'
    export default {
        name: 'items',
        props: ['model', 'parentItem'],
        data() {
            return {
            }
        },
        computed: {
			nonChildren(){
				var item = this.model;
				var children=item.children;
				if(!children){
					return true
				}

				var count=0;
				if(children.length>0){
					children.forEach(function(value,index){
						if(!value.hidden||value.hidden==false){
							count++;
						}
					})
				}
				if(count>0){
					return false
				}else{
					return true;
				}
				
				// return (!item.children || item.children.length==1);	
			},
			path(){
				var item = this.model;
				var parentItem = this.parentItem;
				var lastPath = item.path+(item.children?'/'+item.children[0].path:'');
				if(parentItem){
					Vue.set(item, '_path', parentItem._path+'/'+item.path);
					lastPath = parentItem._path+'/'+lastPath;
				}else {
					Vue.set(item, '_path', item.path);
				}
				return lastPath;	
			}
        },
        methods: {
			goTo(local){
				location.href=local;	
			}
        }
    }
</script>
<style>
	.el-menu-item{
		background-color:#ffffff;
	}
	.memu-item .title{
		font-size:16px;
		color:#33445a;
	}
	.icon-title{
		font-size: 18px;
		position: relative;
		top:-1px;
		left: -5px;
		padding-left:5px;
	}
	.el-submenu__icon-arrow{
		margin-top: -5px
	}
</style>