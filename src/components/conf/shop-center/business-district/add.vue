<template>
	<div class="content">
        <break-crumb :titles="titles"></break-crumb>
		<section>
			<el-col :span="24" class="mod-toolbar">
				<el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="80px" label-position="left" class="form">
                    <el-form-item label="商圈名字" prop="cricleName">
                        <el-col :span="6">
                            <el-input v-model="formEntity.cricleName" placeholder="请输入不超过10个字符的商圈名"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="地址" required>
                        <el-col :span="5" style="height:36px;">
                            <el-form-item>
                                <cascader-select v-on:returnCascaderArr="getCascaderArr">

                                </cascader-select>
                                <p v-if="isCascaderError" style="margin-top:30px;font-size:12;color:#ff4949">请选择省市区</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
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
                    <el-form-item label="状态" prop="visibleId">
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
                        <el-button type="primary" class="submit-btn" @click="add('ruleForm')">提交</el-button>
                        <el-button @click="goBack">返回</el-button>
                    </el-form-item>
                </el-form>
			</el-col>
		</section>
        <el-dialog
            title="提示"
            :visible.sync="successDialogVisible"
            size="tiny">
            <span>增加成功!</span>
            <span slot="footer" class="dialog-footer">

                <el-button type="primary" @click="goBack" class="confirm-btn">确 定</el-button>
            </span>
        </el-dialog>
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
                isCascaderError:false,
                successDialogVisible:false,
                errorTips:'',
                provinceList: [],

                titles:[{id:1,name:'店铺中心'},{id:2,name:'商圈管理'},{id:3,name:'商圈新增'}],
                statusList:constant.getBusinessCircleStatus(),
                formEntity:{
                    visibleId:'',
                    address:'',
                    lat:'',
                    lng:'',
                    lnglatInfo:[],
                    addr:''
                },
                ruleForm: {
                    cricleName: '',
                    lat: '',
                    lng: '',
                    address: '',
                    visibleId: ''
                },
                rules: {
                    cricleName: [
                        { required: true, message: '请输入商圈名', trigger: 'change' },
                        { min: 1, max: 10, message: '不能超过10个字符', trigger: 'change' },
                    ],
                    lat: [
                        { validator:isLat,trigger: 'change',filedName:"纬度" }
                    ],
                    lng: [
                        { validator:isLng,trigger: 'change',filedName:"经度" }
                    ],
                    address: [
                        { required: true, message: '请选择地址', trigger: 'change' },
                        { min: 1, max: 20, message: '不能超过20个字符', trigger: 'change' }
                    ],
                    visibleId: [
                        { type:'number',required: true, message: '请选择状态', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            add:function(formName){
                if(!this.formEntity.addr){
                    this.isCascaderError=true;
                    return;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var url=this.$apiUrl.addTradeUrl;
                        var param=Object.assign({},this.formEntity);
                        param.lnglatInfo=JSON.stringify(param.lnglatInfo);
                        this.$ajax.post(url,param).then((res)=>{
                            if(res.error==0){
                                this.successDialogVisible=true;
                            }

                        })
                    } else {

                        return false;
                    }
                });
            },
            goBack:function(){
                this.successDialogVisible=false;
                this.$router.push({name:'商圈管理'})
            },
            drawMap:function(){
                var lat=this.formEntity.lat;
                var lng=this.formEntity.lng;

                var dm = new DrawMap('#map-container',{
                    "areaRange": [
                    ],
                    "centerCoord": [lng,lat]
                })



            },
             //得到省市区
            getCascaderArr:function(result){
                this.formEntity.addr=JSON.stringify(result);

                this.isCascaderError=false;
            }
        },
        mounted(){
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


            }.bind(this));



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
    .business-custom-gap{
        margin-left:20px;

    }
    .business-custom-gap + div{
        margin-left:20px;
    }
</style>
