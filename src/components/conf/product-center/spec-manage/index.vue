<template>
  <div>
    <break-crumb :titles="titles"></break-crumb>
    <section style="margin-top:20px">
      <el-row :span="24" class="mod-toolbar" :gutter="10">
        <el-col :span="6">
          <el-button type="primary" class="add-btn" @click="add">新增规格</el-button>
          <el-button type="danger" :disabled="this.sels.length===0" @click="handleDels">批量删除</el-button>
        </el-col>
        <el-col :span="18">
          <div class="g-fr">
            <el-col :span="2">
              <div class="label">查询</div>
            </el-col>
            <el-col :span="6">
              <el-input v-model="searchEntity.specName" @keyup.enter.native="search()" placeholder="请输入规格名称"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="search()">搜索</el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </section>
    <section class="ui-table">
      <el-table :data="formEntity" highlight-current-row
                v-loading="listLoading"
                ref="multipleTable" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="specName" label="规格名称"></el-table-column>
        <el-table-column prop="specTypeName" label="显示方式"></el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <span class="edit-btn" @click="handleEdit(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-edit')!=-1">编辑</span>
            <span class="del-btn" @click="handleDel(scope.$index, scope.row)" v-if="buttonArr.indexOf('bt-delete')!=-1">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="mod-toolbar">
        <el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
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
        titles: [{id: 1, name: '商品中心'}, {id: 2, name: '规格管理'}],
        deleteDialogVisible: false,
        deleteDataCallback: function () {},
        currentPage: 1,
        listLoading: true,
        total: 0,
        sels: [],
        formEntity: [],
        searchEntity: {
          specName: ''
        }
      }
    },
    methods: {
      /**
       * 列表查询接口
       * @param index 第几页，默认第1页
       */
      search: function (index = 1) {
        let url = this.$apiUrl.getSpecListUrl
        let param = {
          pageNum: index,
          pageSize: 20,
          specName: this.searchEntity.specName
        }
        this.listLoading = true
        this.$ajax.post(url, param).then((res) => {
          this.formEntity = res.data.list
          this.total = res.data.total
          this.currentPage = res.data.currentPage
          this.listLoading = false
        })
      },
      /**
       * 规格新增路由跳转
       */
      add: function () {
        this.$router.push({name: '规格新增'})
      },
      /**
       * 分页Change事件
       * @param index 第几页
       */
      handleCurrentChange: function (index) {
        this.search(index)
      },
      /**
       * 删除接口
       * @param ids 数组类型
       */
      deleteAction: function (ids = []) {
        const url = this.$apiUrl.deleteSpecUrl
        const param = {
          ids: JSON.stringify(ids)
        }
        this.$ajax.get(url, param).then((res) => {
          this.search(this.currentPage)
        })
      },
      /**
       * 行内删除
       * @param index
       * @param row
       */
      handleDel: function (index, row) {
//        deleteRow = row
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          this.deleteAction([row.specId])
        }
      },
      /**
       * 批量删除
       */
      handleDels: function () {
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          const ids = []
          Object.keys(this.sels).forEach(k => {
            ids.push(this.sels[k].specId)
          })
          this.deleteAction(ids)
        }
      },
      /**
       * 删除弹框确定
       */
      deleteConfirm: function (cb) {
        this.deleteDialogVisible = false
        cb && cb.call(this)
      },
      /**
       * 标签编辑路由跳转
       */
      handleEdit: function (index, row) {
        this.$router.push({name: '规格编辑', params: {specId: row.specId, currentPage: this.currentPage}})
      },
      /**
       * 表格内选择项发生变化事件
       * @param selection 所有选中行
       */
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
    margin-right: 40px;
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
</style>
