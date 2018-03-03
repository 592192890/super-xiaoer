<template>  
    <div>
        <router-view v-if="isShowRouterView"></router-view>
    </div>
    
</template>
<script>
    import CustomRoutes from './assets/js/custom-routers.js'
    import Permission from './assets/js/permission-util.js'
    export default {
        data(){
            return {
               isShowRouterView:false
            }
        },
        methods:{
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
        },
        mounted(){
            //动态增加router
            // if(this.$route.path!="/"){
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
                            return;
                        }
                        //动态生成路由
                        this.generateNewRouter(res);

                    
                    }

                    this.isShowRouterView=true;
                })

            // }

            center.$on('globalError',function(result){
                
                this.$message({
                    showClose: true,
                    message: result,
                    type: 'error',
                    duration:4000
                });
            }.bind(this));
        }
    }
</script>
<style scoped lang="scss">
    .error-tips-dialog{
        z-index:10001!important;
    }
</style>