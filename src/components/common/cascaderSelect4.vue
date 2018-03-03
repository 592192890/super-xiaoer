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
            <li v-for="ditem in districtList" :key="ditem.id" @click.stop="selectDistrict(ditem)"  v-bind:class="{ active: ditem.isActive}" style="position:relative" >
                {{ditem.name}}
                <i class="el-icon-caret-right custom-arrow"></i>
            </li>
        </ul>
        <ul class="ui-cascader ui-cascader-street" v-if="isShowStreet&&isShowProvince">
            <li v-for="sitem in streetList" :key="sitem.id" @click.stop="selectStreet(sitem)"  v-bind:class="{ active: sitem.isActive}">
                {{sitem.name}}
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
           streetList:[],
           isShowCity:false,
           isShowDistrict:false,
           isShowProvince:false,
           isShowStreet:false
        }
    },
    methods:{
        expandSelelct:function(){
            this.isShowProvince=!this.isShowProvince;

            var formEntity;
            if(this.type=='edit'){
                this.isShowCity=true;
                this.isShowDistrict=true;
                this.isShowStreet=true;
                // this.isShowProvince=true;

                formEntity=this.circleItem;
                
            }else{
                formEntity=this.cascaderEntity;
                if(formEntity.city){
                    this.isShowCity=true;
                }else{
                    this.provinceList.forEach(v=>{
                        v.isActive=false;
                    })
                    this.isShowCity=false;
                }
                if(formEntity.district){
                    this.isShowDistrict=true;
                }else{
                    this.isShowDistrict=false;
                }
                if(formEntity.street){
                    this.isShowStreet=true;
                }else{
                    this.isShowStreet=false;
                }
            }
            if(formEntity.province){
                var provinceCode=formEntity.province.id;
                var province=formEntity.province.name;
                var cityCode=formEntity.city.id;
                var city=formEntity.city.name;
                var district=formEntity.district.name;
                var districtCode=formEntity.district.id;
                var street=formEntity.street.name;
                var streetCode=formEntity.street.id;

                this.getCities(provinceCode);
                this.getDistricts(cityCode);
                this.getStreets(districtCode);
                this.tempSelectdValue=province+"/"+city+"/"+district+"/"+street;
                this.selectedValue=this.tempSelectdValue;

                //整理省市区对象
                this.returnCascaderArr.province={id:provinceCode,name:province};
                this.returnCascaderArr.city={id:cityCode,name:city};
                this.returnCascaderArr.district={id:districtCode,name:district};
                this.returnCascaderArr.street={id:streetCode,name:street};

                var provinceCode=formEntity.province.id;
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
                this.isShowStreet=false;

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

                this.isShowStreet=false;

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

                this.isShowStreet=true;

                //查询街道
                this.getStreets(item.id);
                
            // }
            
        },
        selectStreet:function(item){

            this.setDisActive(this.streetList);
            var arr=this.tempSelectdValue.split('/');
            var newArr=[];
            arr.forEach(function(value,index){
                if(index!=3){
                    newArr[index]=value;
                }
            })
            // if(item.name!=arr[3]){
                item.isActive=true;
                newArr[3]=item.name;

                this.returnCascaderArr.street={id:item.id,name:item.name};

                this.tempSelectdValue=newArr.join('/');

                this.selectedValue=this.tempSelectdValue;
                
                this.$emit('returnCascaderArr',this.returnCascaderArr);
                this.cascaderEntity={
                    province:Object.assign({},this.returnCascaderArr.province),
                    city:Object.assign({},this.returnCascaderArr.city),
                    district:Object.assign({},this.returnCascaderArr.district),
                    street:Object.assign({},this.returnCascaderArr.street),
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
                    if(formEntity.province){
                        var provinceCode=formEntity.province.id;
                        this.provinceList.forEach(function(value){
                            if(value.id==provinceCode){
                                value.isActive=true;
                            }
                        })
                    }
                    
                
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
                    var formEntity;
                    if(this.type=='edit'){
                        formEntity=this.circleItem;
                        
                    }else{
                        formEntity=this.cascaderEntity;
                    }

                    if(formEntity.city){
                        var cityCode=formEntity.city.id;
                        this.cityList.forEach(function(value){
                            if(value.id==cityCode){
                                value.isActive=true;
                            }
                        })
                    }
                    
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
                        formEntity=this.cascaderEntity
                    }

                    if(formEntity.district){
                        var districtCode=formEntity.district.id;
                        this.districtList.forEach(function(value){
                            if(value.id==districtCode){
                                value.isActive=true;
                            }
                        })
                    }
                    
                }
                
            })	
        },
        getStreets:function(id){
            if(!id){
                return;
            }
            var url=this.$apiUrl.getAddrUrl+'?parentId='+id

            this.$ajax.get(url).then((res)=>{
                if(res.error==0){
                    this.streetList=res.data.list;
                    var formEntity;
                    if(this.type=='edit'){
                        formEntity=this.circleItem;
                        
                    }else{
                        formEntity=this.cascaderEntity;
                    }

                    if(formEntity.street){
                        var streetCode=formEntity.street.id;
                        this.streetList.forEach(function(value){
                            if(value.id==streetCode){
                                value.isActive=true;
                            }
                        })
                    }
                    
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
                var provinceCode=formEntity.province.id;
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
            if(formEntity.province.id){
                var provinceCode=formEntity.province.id;
                var province=formEntity.province.name;
                var cityCode=formEntity.city.id;
                var city=formEntity.city.name;
                var district=formEntity.district.name;
                var districtCode=formEntity.district.id;
                var street=formEntity.street.name;
                var streetCode=formEntity.street.id;

                this.getCities(provinceCode);
                this.getDistricts(cityCode);
                this.getStreets(districtCode);
                this.tempSelectdValue=province+"/"+city+"/"+district+"/"+street;
                this.selectedValue=this.tempSelectdValue;

                //整理省市区对象
                this.returnCascaderArr.province={id:provinceCode,name:province};
                this.returnCascaderArr.city={id:cityCode,name:city};
                this.returnCascaderArr.district={id:districtCode,name:district};
                this.returnCascaderArr.street={id:streetCode,name:street};

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
    .ui-cascader-street{
        left:480px;
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