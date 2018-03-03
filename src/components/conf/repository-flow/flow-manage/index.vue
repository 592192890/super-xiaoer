<template>
  <div>
    <break-crumb :titles="titles"></break-crumb>
    <section style="margin-top:20px">
      <el-row :span="24" class="mod-toolbar" :gutter="10">
        <el-col :span="6">
          <el-button type="primary" class="add-btn" @click="add" v-if="buttonArr.indexOf('bt-add')!=-1">新增物流公司</el-button>
          <el-button type="danger" :disabled="this.sels.length===0" @click="handleDels" v-if="buttonArr.indexOf('bt-delete')!=-1">删除物流公司</el-button>
        </el-col>
        <el-col :span="18">
          <div class="g-fr">
            <el-col :span="2">
              <div class="label">查询</div>
            </el-col>
            <el-col :span="6">
              <el-input v-model="searchEntity.companyName" @keyup.enter.native="search(1)" placeholder="请输入物流公司"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="search(1)">搜索</el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </section>
    <section class="ui-table brand">
      <el-table :data="formEntity" highlight-current-row
                v-loading="listLoading"
                ref="multipleTable" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="物流公司" show-overflow-tooltip></el-table-column>
        <el-table-column prop="code" label="代码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="waybillQueryUrl" label="网址" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column prop="useLocation" label="使用位置" show-overflow-tooltip> -->
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

    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      size="tiny">
      <span>确定删除该信息？</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteConfirm(deleteDataCallback)" class="confirm-btn">确 定</el-button>
            </span>
    </el-dialog>
  </div>

</template>
<script>
  import breakCrumb from '@/components/common/breakCrumb'
  import Permission from '@/assets/js/permission-util.js'
//  let deleteRow = null;
  export default{
    components: {
      breakCrumb
    },
    data(){
      return {
        titles: [{id: 1, name: '仓库物流'}, {id: 2, name: '物流公司管理'}],
        deleteDialogVisible: false,
        deleteDataCallback: function () {},
        listLoading: true,
        currentPage: 1,
        pageSize:20,
        total: 0,
        sels: [],
        buttonArr:[],
        formEntity: [],
        searchEntity: {
          companyName: '',
          companyCode:''
        }
      }
    },
    methods: {
      search: function (index = 1) {
          this.listLoading = true

          const url = this.$apiUrl.getLogisticsListUrl
          const params = Object.assign({},{
            currentPage: index,
            pageSize:this.pageSize
          },this.searchEntity);

        
          this.$ajax.get(url, params).then((res) => {
            this.formEntity = res.data.list
            this.total = res.data.pageInfo.totalRow
            this.currentPage = res.data.pageInfo.currentPage
            this.listLoading = false
          })

      },

      add: function () {
        this.$router.push({name: '物流公司管理新增'})
      },
  
      handleCurrentChange: function (index) {
        this.search(index)
      },

      deleteAction: function (codes = []) {
        const url = this.$apiUrl.deteletLogisticsUrl
        const param = {
          codes: JSON.stringify(codes)
        }
        this.$ajax.get(url, param).then((res) => {
          this.search(this.currentPage)
        })
      },
 
      handleDels: function () {
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          const codes = []
          Object.keys(this.sels).forEach(k => {
            codes.push(this.sels[k].code.toString())
          })
          this.deleteAction(codes)
        }
      },
    
      deleteConfirm: function (cb) {
        this.deleteDialogVisible = false
        cb && cb.call(this)
      },
   
      handleEdit: function (index, row) {
        this.$router.push({name: '物流公司管理编辑', params: {row: row, currentPage: this.currentPage}})
      },
  
      handleSelectionChange: function (selection) {
        this.sels = selection
      }
    },
    mounted(){
      //获取哪一些按钮可以展示
      this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
      
      this.search(this.$route.params.currentPage)
     
     
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
</style>
<style lang="scss">
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