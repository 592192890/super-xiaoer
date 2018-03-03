<template>
  <div class="channel-list">
    <break-crumb :titles="titles"></break-crumb>
    <section style="margin-top:20px">
      <el-row :span="24" class="mod-toolbar" :gutter="10">
        <el-col :span="3">
          <el-button type="primary" class="add-btn" @click="handleAdd" v-if="buttonArr.indexOf('bt-add')!=-1">新增账号</el-button>
        </el-col>
        <el-col :span="2">
					<div class="label">供应商名字</div>
				</el-col>
				<el-col :span="4">
					<el-input v-model="searchEntity.supplier_name" placeholder="供应商名字"></el-input>
				</el-col>
        <el-col :span="2">
					<div class="label">供应商编码</div>
				</el-col>
				<el-col :span="4">
					<el-input v-model="searchEntity.login_code" placeholder="编码或者登陆账号"></el-input>
				</el-col>
        <el-col :span="3">
          <el-button type="primary" @click="search(1)">搜索</el-button>
        </el-col>

      </el-row>
    </section>
    <section class="ui-table brand">
      <el-table :data="formEntity" highlight-current-row
                v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="id" label="ID" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="supplier_name" label="供应商名字" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="login_code" label="供应商编码" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="auth_brand_num" label="品牌数" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="auth_sku_num" label="SKU数" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="modelAuthNames" label="功能模块" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="outdateTime" label="到期日期" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="statusName" label="状态" show-overflow-tooltip>
				</el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <span class="edit-btn" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</span>
            <span class="edit-delete" @click="handleDelete(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-delete')!=-1">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="mod-toolbar" v-loading="listLoading" >
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                       :total="total" style="float:right;" :current-page="currentPage">
        </el-pagination>
      </el-col>
    </section>

    <add-or-edit :type="type" v-if="isShowDialog" :entityId="entityId" :isShow="isShowDialog" v-on:watchDialog="closeDialog"></add-or-edit>
  </div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import Permission from '@/assets/js/permission-util.js'
import addOrEdit from './addOrEdit.vue'
import Util from '@/assets/js/util.js'
export default {
  components: {
    breakCrumb,
    addOrEdit
  },
  data(){
    return {
      titles: [{id: 1, name: '口袋参谋管理'}, {id: 2, name: '口袋参谋管理列表'}],
      searchEntity:{},
      formEntity:[],
      total:0,
      pageSize:20,
      currentPage:1,
      listLoading:true,
      buttonArr:[],
      type:'新增',
      isShowDialog:false,
      entityId:''//编辑时传递给对话框的id
    }
  },
  methods:{
    handleCurrentChange(){

    },
    handleEdit(index,row){
      this.type='编辑'
      this.isShowDialog=true;
      this.entityId=row.id;
    },
    handleDelete(index,row){
      this.$confirm('确认删除吗?', '提示',
			{
				//type: 'warning'
			}).then(()=>{
        var url=this.$apiUrl.deleteChannelUserUrl;
        var params={
          id:row.id
        }
        this.$ajax.post(url,params).then(res=>{
          if(res.error==0){
            this.$message({
              type:'success',
              message:"删除成功"
            })
            this.search();
          }
        })
      }).catch(()=>{

      })
      
    },
    handleAdd(){
      this.type='新增'
      this.isShowDialog=true;
    },
    search(index){
      var url=this.$apiUrl.getChannelOperationListUrl;
      var params=Object.assign({},{
        currentPage:index||1,
        pageSize:this.pageSize
      },this.searchEntity)

      this.$ajax.get(url,params).then(res=>{
        if(res.error==0){
          //整理数据
          res.data.list.forEach(v=>{
            v.statusName=v.status=='Y'?'有效':'禁用';
            v.modelAuthNames=[];//功能名数组
            v.model_auth_ids=[];//功能id数组
            v.auths.modelAuth.forEach(vv=>{
              v.modelAuthNames.push(vv.name);
              v.model_auth_ids.push(vv.id);
            })
            v.modelAuthNames=v.modelAuthNames.join(',')
            //处理日期
            v.outdateTime=v.outdate_time?Util.getLocalTime(v.outdate_time):''
          })
          this.formEntity=Object.assign(res.data.list);

          this.total=res.data.pageInfo.totalRow;
          this.currentPage=parseInt(res.data.pageInfo.currentPage);
          this.listLoading=false;
        }
      })

    },
    closeDialog(status){
      this.isShowDialog=status;
      this.search(1);
    }
  },
  mounted(){
    //获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);

    this.search(1)
  }
}
</script>
<style scoped lang="scss">
  .mod-toolbar {
    background-color: #ffffff;
    margin-right:0px!important;
    margin-left:0px!important;
  }
  .edit-btn{
    color:#30b9a5;
    cursor:pointer;
    margin-right:30px;
  }
  .edit-delete{
    color:#f57575;
    cursor:pointer;
  }
  .channel-list{
    .label{
      height:40px;
      line-height:40px;
    }
    .add-btn{
      background-color:#33bbab
    }
  }
</style>
