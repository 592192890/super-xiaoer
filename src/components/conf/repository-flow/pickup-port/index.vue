<template>
    <div class="pickup-port">
    <break-crumb :titles="titles"></break-crumb>
    <section style="margin-top:20px" class="mod-toolbar">
      <el-row :span="24" :gutter="10">
        <el-col :span="6">
          <el-button type="primary" class="add-btn" @click="goAdd">新增自提点</el-button>
          <el-button type="danger" :disabled="this.sels.length===0" @click="handleDels">删除自提点</el-button>
        </el-col>
        <el-col :span="2">
          <div class="label">自提地址</div>
        </el-col>
        <el-col :span="16" style="height:36px;" >
            <el-col :span="4">
              <el-select v-model="searchEntity.provinceCode" placeholder="请选择省" @change="changeAddress('province',searchEntity.provinceCode)">
                <el-option label="请选择" value="" v-if="provinceList.length"></el-option>
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="searchEntity.cityCode" placeholder="请选择市" @change="changeAddress('city',searchEntity.cityCode)">
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="searchEntity.districtCode" placeholder="请选择区" @change="changeAddress('district',searchEntity.districtCode)">
                <el-option
                  v-for="item in districtList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <!--<el-col :span="4">
              <el-select v-model="searchEntity.streetCode" placeholder="请选择街道">
                <el-option
                  v-for="item in streetList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>-->
        </el-col>
       
      </el-row>
      <el-row :gutter="10" style="margin-top:20px">
         <el-col :span="3">
					<el-select v-model="searchEntity.type" placeholder="请选择">
						<el-option label="自提点名称" value="1"></el-option>
						<el-option label="门店编码" value="2"></el-option>
					</el-select>
				</el-col>
				<el-col :span="3">
					<el-input v-model="searchEntity.keyword"></el-input>
				</el-col>

        <el-col :span="2">
            <el-button type="primary" @click="search(1)">搜索</el-button>
        </el-col>
      </el-row>
    </section>
    <section class="ui-table brand">
      <el-table :data="formEntity" highlight-current-row
                v-loading="listLoading"
                ref="multipleTable" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="自提点名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="shopMdCode" label="门店编码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="areaName" label="自提点地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="自提点详细地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <span class="edit-btn" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="mod-toolbar">
        <el-pagination v-loading="listLoading" layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                       :total="total" style="float:right;" :current-page="currentPage">
        </el-pagination>
      </el-col>
    </section>

  </div>
</template>
<script>
    import breakCrumb from '@/components/common/breakCrumb'
    import Permission from '@/assets/js/permission-util.js'
    export default {
        components: {
            breakCrumb
        },
        data(){
            return {
                titles: [{id: 1, name: '仓库物流'}, {id: 2, name: '自提点管理'}],
                listLoading: true,
                currentPage: 1,
                pageSize:20,
                total: 0,
                sels:[],
                buttonArr:[],
                formEntity: [],
                
                provinceList:[],
                cityList:[],
                districtList:[],
                streetList:[],
                
                searchEntity: {
                  provinceCode:null,
                  cityCode:null,
                  districtCode:null,
                  streetCode:null,
                  areaCodeLike:'',
                  keyword:'',
                  type:'1'
                
                }
            }
        },
        methods:{
            changeAddress(type,code){
              if(type=='province'){
                if(code){
                  this.getCities(code)
                }
                this.cityList=[];
                this.searchEntity.cityCode=null;
                this.districtList=[];
                this.searchEntity.districtCode=null;
                this.streetList=[];
                this.searchEntity.streetCode=null;
                
              }else if(type=="city"){
                this.getDistricts(code)
                this.districtList=[];
                this.searchEntity.districtCode=null;
                this.streetList=[];
                this.searchEntity.streetCode=null;
              }else if(type=="district"){
                // this.getStreets(code)
                // this.streetList=[];
              }
            },
            search(index){
              this.listLoading=true;
              var url=this.$apiUrl.getPickupListUrl;

              //拼接地区code
              var areaCodeLike={
                province:{},
                city:{},
                district:{},
                street:{}
              };
              if(this.searchEntity.provinceCode){
                areaCodeLike.province.id=this.searchEntity.provinceCode
              }
              if(this.searchEntity.cityCode){
                areaCodeLike.city.id=this.searchEntity.cityCode
              }
              if(this.searchEntity.districtCode){
                areaCodeLike.district.id=this.searchEntity.districtCode
              }
              if(this.searchEntity.streetCode){
                areaCodeLike.street.id=this.searchEntity.streetCode
              }
              
              var params=Object.assign({},{  
                currentPage:index||1,
                pageSize:this.pageSize,
                areaCodeLike:areaCodeLike,
                keyword:this.searchEntity.keyword,
                type:this.searchEntity.type
              })
              this.$ajax.get(url,params).then(res=>{
                this.listLoading=false;
                if(res.error==0){
                  
                  this.formEntity=res.data.list;
                  this.currentPage=res.data.pageInfo.currentPage;
                  this.total=res.data.pageInfo.totalRow;
                }
              })
            },
            handleCurrentChange(index){
              this.search(index)
            },
            
            handleSelectionChange(selection){
              this.sels = selection
            },
            handleEdit(index,row){
              this.$router.push({name:'自提点管理编辑',params:{id:row.id}})
            },
            handleDels(){
              this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                var ids=[];
                this.sels.forEach(v=>{
                  ids.push(v.id)
                })
                var url=this.$apiUrl.deletePickUpUrl;
                var params={
                  idsArr:JSON.stringify(ids)
                }
                this.$ajax.post(url,params).then(res=>{
                  if(res.error==0){
                    this.search(1);
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                })
                
              }).catch(() => {
                        
              });
            },
            goAdd(){
                this.$router.push({name:'自提点管理新增'})
            },
            getProvinces(){
              var url=this.$apiUrl.getAddrUrl
              this.$ajax.get(url).then(res=>{
                if(res.error==0){
                  this.provinceList=res.data.list
                }
              })
            },
            getCities(provinceId){
              var url=this.$apiUrl.getAddrUrl+"?parentId="+provinceId
              this.$ajax.get(url).then(res=>{
                if(res.error==0){
                  this.cityList=res.data.list
                }
              })
            },
            getDistricts(cityId){
              var url=this.$apiUrl.getAddrUrl+"?parentId="+cityId
              this.$ajax.get(url).then(res=>{
                if(res.error==0){
                  this.districtList=res.data.list
                }
              })
            },
            getStreets(districtId){
              var url=this.$apiUrl.getAddrUrl+"?parentId="+districtId
              this.$ajax.get(url).then(res=>{
                if(res.error==0){
                  this.streetList=res.data.list
                }
              })
            }
        },
        mounted(){
            this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
            this.search(1);

            this.getProvinces();
        }
    }
</script>
<style scoped lang="scss">
  .mod-toolbar {
    background-color: #ffffff;
    margin-right:0px!important;
	margin-left:0px!important;
  }
  .add-btn {
    background-color: #33bbab;
    border: none;
  }
  .edit-btn {
    margin-right: 30px;
    color: #9d8ef1;
    cursor:pointer;
  }
  .del-btn {
    color: #f57575;
    cursor:pointer;
  }
  .label {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }
  .logoimg {
    width: 42px;
    vertical-align: middle;
  }
  .ui-cascader-select {
    font-size: 14px;
    height: 28px;
    line-height: 28px;
  }
</style>
<style lang="scss">
.pickup-port .append-class .el-input-group__prepend input{
    width:110px;
}
.ui-table{
	&.brand{
		.el-table{
			.el-table__header-wrapper{
				th{
					.cell{
					    padding-left: 30px
					}
				}
			}
			.el-table__body-wrapper{
				tr{
					.cell{
					    padding:0 30px
					}
				}
			}
		} 
	}
}
</style>