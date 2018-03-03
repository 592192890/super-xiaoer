<template>
	<div>
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form ref="ruleForm" :rules="rules" :model="formEntity" label-width="80px" label-position="left" class="form">
                   <el-form-item label="商圈名字" prop="name">
                        <el-col :span="6">
                            <el-input v-model="formEntity.name" placeholder="请输入不超过10个字符的商圈名"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="地址" required>
                        <el-col :span="5"  style="height:36px;">
                            <el-form-item>
                                <cascader-select type="edit" :circleItem="formEntity.businessDistrict" v-if="isShowCascaderSelect" v-on:returnCascaderArr="getCascaderArr">

                                </cascader-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="address">
                                <el-input v-model="formEntity.address" class="business-custom-gap" placeholder="请输入不超过20个字符的地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="经纬度" required>
                        <el-col :span="4">
                            <el-form-item class="latlang" prop="lng">
                                <el-input  v-model="formEntity.lng">
                                    <template slot="prepend">经度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item class="latlang" prop="lat">
                                <el-input v-model="formEntity.lat" class="business-custom-gap">
                                    <template slot="prepend">纬度</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" style="margin-left:40px">
                            <el-button @click="drawMap">绘制关联小区范围</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="状态" required prop="visibleId">
                        <el-col :span="6">
                            <el-select v-model.number="formEntity.visibleId" placeholder="请选择状态">

                                <el-option
                                    v-for="item in statusList"
                                    :key="item.id"
                                    :label="item.visible"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>

                    </el-form-item>
                    <el-form-item label="关联小区">
                        <el-col :span="6">
                            <div id="map-container" style="width:600px;height:300px;background-color:rgb(229, 227, 223)"></div>
                        </el-col>
                    </el-form-item>


                    <el-form-item label-width="80px">
                        <el-button type="primary" class="submit-btn" @click="update('ruleForm')">更新</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
			</el-col>
		</section>
        
	</div>

</template>
<script>
    import DrawMap from '@/assets/js/qq-map/draw'
    import Util from '@/assets/js/util'
    import breakCrumb from '@/components/common/breakCrumb'
    import cascaderSelect from '@/components/common/cascaderSelect'
    import constant from '@/assets/js/constant'
    export default {
        components:{
            breakCrumb,
            cascaderSelect
        },
        data(){
            var isNumber = Util.validateForm.isNumber;
            var isLng= Util.validateForm.isLng;
            var isLat= Util.validateForm.isLat;
            return{
                isShowCascaderSelect:false,
                errorDialogVisible:false,
                errorTips:'',
                titles:[{id:1,name:'店铺中心'},{id:2,name:'商圈管理'},{id:3,name:'商圈编辑'}],
                statusList:constant.getBusinessCircleStatus(),
                formEntity:{
                    addr:''
                },
                ruleForm: {
                    name: '',
                    address: '',
                    lat: '',
                    lng: '',
                    visibleId: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入商圈名', trigger: 'change' },
                        { min: 1, max: 10, message: '不能超过10个字符', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    lat: [
                        { validator:isLat,trigger: 'change',filedName:"经度" }
                    ],
                    lng: [
                        { validator:isLng,trigger: 'change',filedName:"纬度" }
                    ],
                    address: [
                        { required: true, message: '请选择地址', trigger: 'change' },
                        { min: 1, max: 20, message: '不能超过20个字符', trigger: 'change' }
                    ],
                    visibleId: [
                        { type:'number', required: true,message: '请选择状态', trigger: 'change' },

                    ]
                }
            }
        },
        methods:{
            update:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var url=this.$apiUrl.editTradeUrl;
                        var params=Object.assign({},this.formEntity);
                        debugger;
                        params.lnglatInfo=params.lnglatInfo;
                        params.cricleName=params.name;
                        params.cricleId=params.id;
                        this.$ajax.post(url,params).then((res)=>{
                            if(res.error==0){
                                this.$message({
                                    type:'success',
                                    message:'更新成功！'
                                })
                                this.goBack();
                            }


                        })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            goBack:function(){
                
                var goPageIndex=sessionStorage.getItem('currentPage');
                this.$router.push({name:'商圈管理',params:{currentPage:goPageIndex}})
            },
            drawMap:function(){

                var lat=this.formEntity.lat;
                var lng=this.formEntity.lng;
                var dm = new DrawMap('#map-container',{
                    "areaRange": this.formEntity.newLngLats,
                    "centerCoord": [lng,lat]
                })
            },
            getProvinces:function(){
                var url=this.$apiUrl.getAddrUrl+'?parentId=0';

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        this.provinceList=res.data.list;
                    }
                    
                })
            },
            getCities:function(id){
                if(!id){
                    return;
                }
                var url=this.$apiUrl.getAddrUrl+'?parentId='+id;

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        this.cityList=res.data.list;
                    }   
                    
                })
            },
            getDistricts:function(id){
                if(!id){
                    return;
                }
                var url=this.$apiUrl.getAddrUrl+'?parentId='+id

                this.$ajax.get(url).then((res)=>{
                    if(res.error==0){
                        this.districtList=res.data.list;
                    }
                    
                })
            },
            //得到省市区
            getCascaderArr:function(result){
                this.formEntity.addr=JSON.stringify(result);

                this.formEntity.businessDistrict=Object.assign(this.formEntity.businessDistrict,{
                    cityCode:result.city.id,
                    cityName:result.city.name,
                    districtCode:result.district.id,
                    districtName:result.district.name,
                    provinceCode:result.province.id,
                    provinceName:result.province.name
                })
            }
        },
        mounted(){
            if(this.$route.params.entity){
                sessionStorage.setItem('businessItem',JSON.stringify(this.$route.params.entity));
                sessionStorage.setItem('currentPage',this.$route.params.currentPage);
            }
            this.formEntity=JSON.parse(sessionStorage.getItem('businessItem'));
            this.formEntity.businessDistrict={
                cityCode:this.formEntity.cityCode,
                cityName:this.formEntity.cityName,
                districtCode:this.formEntity.districtCode,
                districtName:this.formEntity.districtName,
                id:this.formEntity.id,
                name:this.formEntity.name,
                provinceCode:this.formEntity.provinceCode,
                provinceName:this.formEntity.provinceName,
            }
            var newLngLats=[];

            this.formEntity.lngLats.forEach(function(value){
                var point=value.lng.toString()+','+value.lat.toString();
                newLngLats.push(point)
            })
            this.formEntity.newLngLats=newLngLats;

            //如果经纬度和关联小区对应的数组经纬度存在，画图
            this.drawMap()
            //获得画图的区域
            center.$on('qqMapRange',function(points){
                this.formEntity.lnglatInfo=[];

                points.forEach(function(value){
                    var itemArr=value.split(',');
                    this.formEntity.lnglatInfo.push({
                        lng:itemArr[0],
                        lat:itemArr[1]
                    })

                }.bind(this))
                this.formEntity.lnglatInfo=JSON.stringify(this.formEntity.lnglatInfo)

            }.bind(this));


            //父组件渲染完成后，子组件在渲染
            this.isShowCascaderSelect=true;


        }

    }
</script>
<style scoped>
    .mod-toolbar{
        background-color:#ffffff;
        padding: 30px 30px 40px;
    }
    .form > .el-form-item {
        margin-bottom:20px;
    }
    .submit-btn{
        background-color:#33bbab;
        border:none;
    }
    .latlang .el-form-item__label{
        text-align:left
    }
</style>
<style>
    .business-custom-select,.business-custom-select+div{
        padding-left:10px
    }
    .business-custom-gap{
        margin-left:20px;

    }
    .business-custom-gap + div{
        margin-left:20px;
    }
</style>
