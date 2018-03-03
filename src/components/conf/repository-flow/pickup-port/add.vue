<template>
  <div class="pickup">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="120px" label-position="left" class="form">
          <el-form-item label="自提点名称" prop="name" required>
            <el-col :span="6">
              <el-input v-model="formEntity.name" placeholder="请输入自提点名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所属门店" prop="shopId" required>
            <el-col :span="6">
              <el-input v-model="formEntity.shopName" placeholder="显示所选择的门店" :disabled="true">
                <el-button slot="append" @click="isShowSearchShopDialog=true">选择门店</el-button>
              </el-input>
              
            </el-col>
          </el-form-item>
          <el-form-item label="门店编码" prop="shopMdCode" required>
            <el-col :span="6">
              <div>{{formEntity.shopMdCode}}</div> 
            </el-col>
          </el-form-item>
          <el-form-item label="自提点地址" required>
            <el-col :span="6">
              <cascader-select v-on:returnCascaderArr="getCascaderArr"></cascader-select>
              <p v-if="isCascaderError" class="custom-error">请选择自提点地址</p>
            </el-col>
          </el-form-item>
          <el-form-item label="自提点详细地址">
            <el-col :span="6">
              <el-input v-model="formEntity.address" placeholder="请输入自提点详细地址"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="经纬度">
            <el-col :span="4">
                  <el-form-item class="latlang">
                      <el-input  v-model="formEntity.lng">
                          <template slot="prepend">经度</template>
                      </el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="4" style="margin-left:10px">
                  <el-form-item class="latlang">
                      <el-input v-model="formEntity.lat" class="business-custom-gap">
                          <template slot="prepend">纬度</template>
                      </el-input>
                  </el-form-item>
              </el-col>
            <el-col :span="4" style="margin-left:10px">
              <el-button @click="selectLatLng" :disabled="formEntity.area==''">拾取经纬度</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-col :span="6">
              <el-input v-model="formEntity.phone" placeholder="请输入电话号码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-col :span="6">
              <el-input v-model="formEntity.mobile" placeholder="请输入手机号码"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label-width="120px">
            <el-button type="primary" class="submit-btn" @click="add('ruleForm')">提交</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </section>

    <el-dialog
        title="拾取经纬度"
        :visible.sync="mapsDialogVisible"
        :before-close="cancelLngLat"
        size="small">
        <div id="map-container" style="width:100%;height:400px"></div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="comfirmLngLat" class="confirm-btn">确 定</el-button>
            <el-button type="primary" @click="cancelLngLat" class="cancel-btn">取 消</el-button>
        </span>
    </el-dialog>
    
    <search-shop-dialog :isShow="isShowSearchShopDialog" v-on:watchDialog="closeDialog" v-on:passSelectShop="showRelatedShop"></search-shop-dialog>
  </div>
</template>
<script>
  import Util from '@/assets/js/util'
  import breakCrumb from '@/components/common/breakCrumb'
  import searchShopDialog from './relatedShopDialog'
  import cascaderSelect from '@/components/common/cascaderSelect'
  var geocoder,marker=null;
  var defaultLng,defaultLat;
  var backLng,backLat;
  var isClickMap=false;

  export default {
    components: {
      breakCrumb,
      cascaderSelect,
      searchShopDialog
    },
    data(){
      var isPhoneNumber=(rule, value, callback) => {
        if (!value || value.trim() == '') {
          return callback();
        }
        if (!/^(\d{3,4}-)?\d{7,8}$/.test(value)) {

          return callback(new Error('请输入正确的电话号码'));

        }
        return callback();
      }
      return {
        titles: [{id: 1, name: '仓库物流'}, {id: 2, name: '自提点管理'}, {id: 3, name: '新增'}],
        pickupAddressList:[],
        isShowSearchShopDialog:false,
        mapsDialogVisible:false,
        isCascaderError:false,
        shopList:[],
        formEntity: {
          lng:'',
          lat:'',
          name:'',
          area:'',
          shopName:'',
          shopId:'',
          areaName:''
        },
        props: {
          value: 'label',
          children: 'cities'
        },
        ruleForm: {
          name:'',
          code:''
          
        },
        rules: {
          name: [
            {validator: Util.validateForm.inputValidateCommon}
          ],
          mobile:[
            {validator:Util.validateForm.isMobileNumber}
          ],
          phone:[
            {validator:isPhoneNumber}
          ],
          // lng:[
          //   {validator: Util.validateForm.isLng,filedName:"经度"}
          // ],
          // lat:[
          //   {validator: Util.validateForm.isLat,filedName:"纬度"}
          // ]
        }
      }
    },
    methods: {
      closeDialog(status){
        this.isShowSearchShopDialog=status;
      },
      showRelatedShop(entity){
        this.formEntity.shopName=entity.shopName;
        this.formEntity.shopId=entity.id;
        this.formEntity.shopMdCode=entity.shopMdCode;
      
      },
      comfirmLngLat(){
        if(!isClickMap){
          this.formEntity.lng=defaultLng;
          this.formEntity.lat=defaultLat
        }
        isClickMap=false;
        this.mapsDialogVisible=false;
      },
      cancelLngLat(){
        this.formEntity.lng=backLng;
        this.formEntity.lat=backLat;

        isClickMap=false;
        this.mapsDialogVisible=false;
      },
      selectLatLng(){
        backLng=this.formEntity.lng;
        backLat=this.formEntity.lat;
        this.mapsDialogVisible=true;
        setTimeout(()=>{
          //画地图
          var map = new qq.maps.Map(document.getElementById('map-container'),{
              zoom: 15
          });
          //调用地址解析类
          geocoder = new qq.maps.Geocoder({
              complete : function(result){
                  defaultLng=result.detail.location.lng;
                  defaultLat=result.detail.location.lat;
                  map.setCenter(result.detail.location);
                   
                  marker = new qq.maps.Marker({
                      map:map,
                      position: result.detail.location
                  });
              }
          });
          geocoder.getLocation(this.formEntity.areaName+this.formEntity.address);
          
          //绑定单击事件添加参数
          qq.maps.event.addListener(map, 'click', function(event) {              
              var latLng=new qq.maps.LatLng(event.latLng.getLat(),event.latLng.getLng());
              marker.setPosition(latLng);

              this.formEntity.lat=event.latLng.getLat();
              this.formEntity.lng=event.latLng.getLng();

              isClickMap=true;
          }.bind(this));
        },300)
        

      },
      getShopList(){
        var url=this.$apiUrl.getShopSelectListUrl;
        this.$ajax.get(url).then(res=>{
          if(res.error==0){
            this.shopList=res.data.list;
          }
        })
      },
      //得到省市区
      getCascaderArr:function(result){
          if(!result){
            return;
          }
          this.formEntity.areaName=result.province.name+result.city.name+result.district.name;
          // this.formEntity.area={
          //     province:Object.assign({},result.province),
          //     city:Object.assign({},result.city),
          //     district:Object.assign({},result.district)
          // }
          this.formEntity.area={
              provinceCode:result.province.id,
              provinceName:result.province.name,
              cityCode:result.city.id,
              cityName:result.city.name,
              districtCode:result.district.id,
              districtName:result.district.name,
          }
                

          this.isCascaderError=false;
      },
      add: function (formName) {
        if(!this.formEntity.area){
            this.isCascaderError=true;
            return;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = this.$apiUrl.addPickUpUrl
            var param=Object.assign({}, this.formEntity);
            //转化area格式
            param.area={
                province:{id:param.area.provinceCode,name:param.area.provinceName},
                city:{id:param.area.cityCode,name:param.area.cityName},
                district:{id:param.area.districtCode,name:param.area.districtName}
            }
            param.area=JSON.stringify(param.area);
            
            this.$ajax.post(url, param).then((res) => {
              if(res.error==0) {
                this.$message({
                  type:'success',
                  message:'增加成功'
                })
                this.goBack();
              }
            })
          } else {
            return false
          }
        })
      },
      goBack: function () {
        this.$router.push({name: '自提点管理列表'})
      },
     
    },
    mounted(){
      
    }
  }
</script>
<style scoped lang="scss">
  .pickup{
    .custom-error{
      font-size:10px;
      height:10px;
      // line-height:12px;
      margin-top:30px;
      color:#ff4949
    }
  }
  .mod-toolbar {
    background-color: #ffffff;
    padding: 30px 30px 40px;
  }
  .form > .el-form-item {
    margin-bottom: 20px;
  }
  .submit-btn {
    background-color: #33bbab;
    border: none;
  }
  .cancel-btn{
      cursor:pointer;
      border:1px solid #e5e5e5;
      background-color:#fff;
      color:#333;
    }
  .line {
    text-align: center;
    margin-left: 10px;
    line-height: 36px;
    color: #ccc;
  }
</style>
