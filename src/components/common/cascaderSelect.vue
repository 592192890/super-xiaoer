<template>
    <div class="ui-cascader-select">
        <div @click.stop="expandSelelct" class="content" v-bind:class="{default:selectedValue=='请选择'}">{{selectedValue}}</div>
        <i class="el-icon-caret-bottom custom-arrow big" v-if="!isShowProvince" @click.stop="expandSelelct"></i>
        <i class="el-icon-caret-top custom-arrow big" v-if="isShowProvince" @click.stop="isShowProvince=false"></i>
   
        <ul class="ui-cascader ui-cascader-province" v-if="isShowProvince">
            <li v-for="pitem in provinceList" :key="pitem.id" @click.stop="selectProvicne(pitem)" style="position:relative" v-bind:class="{ active: pitem.isActive}">
                {{pitem.name}}
                <i class="el-icon-caret-right custom-arrow"></i>
            </li>
        </ul>
        <ul class="ui-cascader ui-cascader-city" v-if="isShowCity&&isShowProvince">
            <li v-for="citem in cityList" :key="citem.id" @click.stop="selectCity(citem)" v-bind:class="{ active: citem.isActive}"  style="position:relative" >
                {{citem.name}}
                <i class="el-icon-caret-right custom-arrow"></i>
            </li>
        </ul>
        <ul class="ui-cascader ui-cascader-district" v-if="isShowDistrict&&isShowProvince">
            <li v-for="ditem in districtList" :key="ditem.id" @click.stop="selectDistrict(ditem)"  v-bind:class="{ active: ditem.isActive}">
                {{ditem.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:['type','circleItem'],
    data(){
        return {
           returnCascaderArr:{},//返回给父组件的值
           cascaderEntity:{},//为新增操作保存选中的有效级联地址
           selectedValue:'请选择',
           tempSelectdValue:'',
           provinceList:[],
           cityList:[],
           districtList:[],
           isShowCity:false,
           isShowDistrict:false,
           isShowProvince:false
        }
    },
    methods:{
        expandSelelct:function(){
            this.isShowProvince=!this.isShowProvince;

            var formEntity;

            if(this.type=='edit'){
                this.isShowCity=true;
                this.isShowDistrict=true;
                // this.isShowProvince=true;

                formEntity=this.circleItem;
                
            }else{
                formEntity=this.cascaderEntity;
                if(formEntity.cityCode){
                    this.isShowCity=true;
                }else{
                    this.provinceList.forEach(v=>{
                        v.isActive=false;
                    })
                    this.isShowCity=false;
                }
                if(formEntity.districtCode){
                    this.isShowDistrict=true;
                }else{
                    this.isShowDistrict=false;
                }
            }
            if(formEntity.provinceCode){
                var provinceCode=formEntity.provinceCode;
                var province=formEntity.provinceName;
                var cityCode=formEntity.cityCode;
                var city=formEntity.cityName;
                var district=formEntity.districtName;
                var districtCode=formEntity.districtCode;

                this.getCities(provinceCode);
                this.getDistricts(cityCode);
                this.tempSelectdValue=province+"/"+city+"/"+district;
                this.selectedValue=this.tempSelectdValue;

                //整理省市区对象
                this.returnCascaderArr.province={id:provinceCode,name:province};
                this.returnCascaderArr.city={id:cityCode,name:city};
                this.returnCascaderArr.district={id:districtCode,name:district};

                var provinceCode=formEntity.provinceCode;
                this.provinceList.forEach(function(value){
                    if(value.id==provinceCode){
                        value.isActive=true;
                    }else{
                        value.isActive=false;
                    }
                })


            }else{
                this.$emit('returnCascaderArr','');
            }
        },
        selectProvicne:function(item){
            this.setDisActive(this.provinceList);
            var arr=this.tempSelectdValue.split('/');
            // if(item.name!=arr[0]){
                item.isActive=true;
                this.tempSelectdValue=item.name;

                this.returnCascaderArr.province={id:item.id,name:item.name};

                this.isShowCity=true;
                this.isShowDistrict=false;

                //查询市
               this.getCities(item.id)

            // }
            
        },
        selectCity:function(item){
            this.setDisActive(this.cityList);
            var arr=this.tempSelectdValue.split('/');
            var  newArr=[];
            arr.forEach(function(value,index){
                if(index==0){
                    newArr[index]=value;
                }
            })
            // if(item.name!=arr[1]){
                item.isActive=true;
                newArr[1]=item.name;

                this.returnCascaderArr.city={id:item.id,name:item.name};

                this.tempSelectdValue=newArr.join('/');

                this.isShowDistrict=true;

                //查询区
                this.getDistricts(item.id);
            // }
            
        },
        selectDistrict:function(item){

            this.setDisActive(this.districtList);
            var arr=this.tempSelectdValue.split('/');
            var newArr=[];
            arr.forEach(function(value,index){
                if(index!=2){
                    newArr[index]=value;
                }
            })
            // if(item.name!=arr[2]){
                item.isActive=true;
                newArr[2]=item.name;

                this.returnCascaderArr.district={id:item.id,name:item.name};

                this.tempSelectdValue=newArr.join('/');

                this.selectedValue=this.tempSelectdValue;
                
                this.$emit('returnCascaderArr',this.returnCascaderArr);
                
                this.cascaderEntity={
                    cityCode:this.returnCascaderArr.city.id,
                    cityName:this.returnCascaderArr.city.name,
                    districtCode:this.returnCascaderArr.district.id,
                    districtName:this.returnCascaderArr.district.name,
                    provinceCode:this.returnCascaderArr.province.id,
                    provinceName:this.returnCascaderArr.province.name
                }
            // }
            
            
            setTimeout(function(){
                this.isShowProvince=false;
            }.bind(this),200)
            
        },
        setDisActive:function(data){
            data.forEach(function(value){
                value.isActive=false;
            })
        },
        getProvinces:function(){
            var url=this.$apiUrl.getAddrUrl+'?parentId=0';

            this.$ajax.get(url).then((res)=>{

                if(res.error==0){
                    this.provinceList=res.data.list;

                    var formEntity;

                    if(this.type=='edit'){
                        formEntity=this.circleItem;
                        
                    }else{
                        formEntity=this.cascaderEntity;
                    }
                    var provinceCode=formEntity.provinceCode;
                    this.provinceList.forEach(function(value){
                        if(value.id==provinceCode){
                            value.isActive=true;
                        }
                    })
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
                    var formEntity
                    if(this.type=='edit'){
                        formEntity=this.circleItem;
                        
                    }else{
                        formEntity=this.cascaderEntity;
                    }
                    var cityCode=formEntity.cityCode;
                    this.cityList.forEach(function(value){
                        if(value.id==cityCode){
                            value.isActive=true;
                        }
                    })
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

                    var formEntity;

                    if(this.type=='edit'){
                        formEntity=this.circleItem;
                        
                    }else{
                        formEntity=this.cascaderEntity;
                    }
                    var districtCode=formEntity.districtCode;
                    this.districtList.forEach(function(value){
                        if(value.id==districtCode){
                            value.isActive=true;
                        }
                    })
                }
                
            })	
        }
    },
    mounted(){
        //获取下拉框的值
		if(sessionStorage.getItem('provinces')){
			this.provinceList=JSON.parse(sessionStorage.getItem('provinces'));
            if(this.type=='edit'){
                var formEntity=this.circleItem;
                var provinceCode=formEntity.provinceCode;
                this.provinceList.forEach(function(value){
                    if(value.id==provinceCode){
                        value.isActive=true;
                    }
                })
            }
		}else{
            this.getProvinces();
		}
        if(this.type=='edit'){
            
            var formEntity=this.circleItem;
            if(formEntity.provinceCode){
                var provinceCode=formEntity.provinceCode;
                var province=formEntity.provinceName;
                var cityCode=formEntity.cityCode;
                var city=formEntity.cityName;
                var district=formEntity.districtName;
                var districtCode=formEntity.districtCode;

                this.getCities(provinceCode);
                this.getDistricts(cityCode);
                this.tempSelectdValue=province+"/"+city+"/"+district;
                this.selectedValue=this.tempSelectdValue;

                //整理省市区对象
                this.returnCascaderArr.province={id:provinceCode,name:province};
                this.returnCascaderArr.city={id:cityCode,name:city};
                this.returnCascaderArr.district={id:districtCode,name:district};

            }else{
                this.$emit('returnCascaderArr','');
            }
           
            
        }
        

        //隐藏自定义的级联菜单
        document.body.addEventListener('click',function(){
            var els=document.querySelectorAll(".ui-cascader-select ul");
            for(var i=0;i<els.length;i++){
                els[i].style.display="none";
                this.isShowProvince=false;
            }
        }.bind(this),false)
    }
}
</script>

<style scoped lang="scss">
    .ui-cascader-select{
        position:absolute;
        .content{
            border-radius: 4px;
            padding:3px 10px;
            border:1px solid #cccccc;
            height:28px;
            line-height:28px;
            width:160px;
            overflow:hidden;
            box-sizing:content-box;
        }
        .content.default{
            color:#97a8be;
        }
        .custom-arrow{
            .big{
                transform: scale(1);
                font-size: 14px;
            }
            font-size: 12px;
            transform: scale(.8);
            position: absolute;
            width: 35px;
            right: 0;
            top: 13px;
            text-align: center;
            color: #bfcbd9;
            transition: all .3s;
            cursor: pointer
        }
        
    }
    .ui-cascader{
        position:absolute;
        top:36px;
        z-index:1000;
        background-color:#ffffff;
        width:100%;
        list-style: none;
        padding: 6px 0;
        margin: 0;
        box-sizing: border-box;
        border:1px solid #cccccc;
        height:200px;
        overflow-y: auto;
        li{
            background-color:#ffffff;
        }
        li.active{
            background-color:#20a0ff;
        }
    }
    .ui-cascader-city{
        left:160px;
    },
    .ui-cascader-district{
        left:320px;
    }
    ul{
        list-style:none;
    }
    li{
        padding-left:10px;
    }
    li:hover{
        background-color:#e4e8f1;
    }
</style>