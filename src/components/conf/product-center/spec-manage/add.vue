<template>
  <div class="content">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="120px" label-position="left"
                 class="form">
          <el-form-item label="规格名称" prop="specName"
                        :rules="rules.commonText" required>
            <el-col :span="6">
              <el-input v-model="formEntity.specName" placeholder="请输入规格名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="显示类型" required>
            <el-col :span="6">
              <el-radio-group v-model="formEntity.specType">
                <el-radio :label="1">文字</el-radio>
                <el-radio :label="2">图片</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="规格值" required
                        prop="specValueList"
                        :rules="rules.specValueList">
            <p>
              <el-button type="primary" class="submit-btn" @click="addSpecValue">添加规格值</el-button>
            </p>
            <el-col :span="20">
              <el-table
                :data="formEntity.specValueList"
                style="width: 100%">
                <el-table-column label="规格值" width="260">
                  <template scope="scope">
                    <el-form-item class="validate-table-error"
                      :prop="'specValueList.' + scope.$index + '.specValueName'"
                      :rules="rules.commonText"
                    >
                      <el-input v-model="scope.row.specValueName" placeholder="请输入规格值"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="规格图片">
                  <template scope="scope">
                    <div class="el-upload-fixmin inline-block" v-if="scope.row.imageKey">
                      <div class="el-upload el-upload--text">
                        <img :src="scope.row.imageUrl" class="uploader-img">
                      </div>
                    </div>
                    <el-button size="small" type="primary" @click="openUploadDialog(scope.$index)">上传图片</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="220">
                  <template scope="scope">
                    <span class="del-btn cursor" @click="specValueDel(scope.row)">删除</span>
                    <span class="sort-btn cursor" :class="scope.$index == 0?'disable':''" @click="sortUp(scope.row)">上移</span>
                    <span class="sort-btn cursor" :class="scope.$index == formEntity.specValueList.length-1?'disable':''" @click="sortDown(scope.row)">下移</span>
                  </template>
                </el-table-column>
              </el-table>
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
      title="提示"
      :visible.sync="successDialogVisible"
      size="tiny">
      <span>增加成功!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack" class="confirm-btn">确 定</el-button>
      </span>
    </el-dialog>
    <upload-file-dialog @watchDialog="closeUploadDialog" @passSelectedPicUrl="getSelectedPicuUrl"
                        :isShow="isShowUploadDialog"></upload-file-dialog>
  </div>
</template>
<script>
  import _ from 'lodash'
  import Util from '@/assets/js/util'
  import breakCrumb from '@/components/common/breakCrumb'
  import uploadFileDialog from '@/components/common/packageDialog/uploadPicDialog'
   let rowIndex = 0            // 表格行索引
  export default {
    components: {
      breakCrumb,
      uploadFileDialog
    },
    data(){
      return {
        isShowUploadDialog: false,
        successDialogVisible: false,
        titles: [{id: 1, name: '商品中心'}, {id: 2, name: '规格管理'}, {id: 3, name: '规格新增'}],
        formEntity: {
          specName: '',
          specType: 1,
          specValueList: []
        },
        ruleForm: {
          specName: '',
          specValueName: '',
        },
        rules: {
          commonText: [
            {validator: Util.validateForm.inputValidateCommonText}
          ],
          specValueList: [
            {required: true, message: '必须存在一条规格值'}
          ]
        }
      }
    },
    methods: {
      /**
       * 规格新增
       * @param formName 规格表单名
       */
      add: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.$apiUrl.addSpecValueUrl
            let param = Object.assign({}, this.formEntity)
            let nameEmpty = false;
            let specValueList = this.formEntity.specValueList
            let specValueNames = _.map(specValueList, 'specValueName')
            Object.keys(specValueNames).forEach(k => {
              if (!specValueNames[k]) {
                this.$message.error('请输入规格值')
                nameEmpty = true
              }
            })
            // 规格值名称有空值
            if (nameEmpty) return
            let specValueNamesUniq = _.uniq(specValueNames)
            // 规格值名称重复
            if (specValueNamesUniq.length < specValueNames.length) {
              this.$message.error('规格值不能重复')
              return
            }
            delete param.specValueList
            param.values = JSON.stringify(specValueList)
            console.log(url)
            this.$ajax.post(url, param).then((res) => {
              if (!res.error) {
                this.successDialogVisible = true
              }
            })
          } else {
            return false
          }
        })
      },
      /**
       * 规格属性添加新的规格值
       */
      addSpecValue: function () {
        let specValueList = this.formEntity.specValueList
        // if (specValueList.length && !specValueList[0].specValueName) {
        //   this.$message.error('请输入规格值')
        //   return
        // }
        // 已存在的列表，所有的"specValueSort"字段值加1
        Object.keys(specValueList).forEach(k => {
          specValueList[k].specValueSort += 1;
        })
        specValueList.push({
          specValueName: '',
          specValueSort: 1,
          imageId: '',
          imageKey: '',
        });
        // 根据 specValueSort 值大小对进行排序
        this.formEntity.specValueList = _.sortBy(specValueList, 'specValueSort')
      },
      /**
       * 路由返回
       */
      goBack: function () {
        this.successDialogVisible = false
        this.$router.push({name: '规格管理'})
      },
      /**
       * 打开图片上传对话框
       * @param i 行索引
       */
      openUploadDialog: function (i) {
        rowIndex = i
        this.isShowUploadDialog = true
      },
      /**
       * 关闭图片上传对话框
       */
      closeUploadDialog: function () {
        this.isShowUploadDialog = false
      },
      /**
       * 获取相册分类中选中的图片
       */
      getSelectedPicuUrl: function (result) {
        this.isShowUploadDialog = false
        this.formEntity.specValueList[rowIndex].imageId = result[0].imageId
        this.formEntity.specValueList[rowIndex].imageKey = result[0].imageKey
        this.formEntity.specValueList[rowIndex].imageUrl = result[0].imageUrl
      },
      /**
       * 规格属性上移
       * @param row
       */
      sortUp(row) {
        // let curIndex = row.specValueSort - 1;
        let specValueList = this.formEntity.specValueList
        let curIndex = _.findIndex(specValueList, {specValueSort: row.specValueSort})
        if (!curIndex) return;   // 已排序到最前面，直接返回
        let curSpecValueSort = specValueList[curIndex].specValueSort
        specValueList[curIndex].specValueSort = specValueList[curIndex - 1].specValueSort
        specValueList[curIndex - 1].specValueSort = curSpecValueSort
        //  重新排序
        this.formEntity.specValueList = _.sortBy(specValueList, 'specValueSort')
      },
      /**
       * 规格属性下移
       * @param row
       */
      sortDown(row) {
        // let curIndex = row.specValueSort - 1;
        let specValueList = this.formEntity.specValueList
        let curIndex = _.findIndex(specValueList, {specValueSort: row.specValueSort})
        if (curIndex >= specValueList.length - 1) return;   // 已排序到最后面，直接返回
        let curSpecValueSort = specValueList[curIndex].specValueSort
        specValueList[curIndex].specValueSort = specValueList[curIndex + 1].specValueSort
        specValueList[curIndex + 1].specValueSort = curSpecValueSort
        //  重新排序
        this.formEntity.specValueList = _.sortBy(specValueList, 'specValueSort')
      },
      /**
       * 规格属性删除
       * @param row
       */
      specValueDel(row) {
        // 至少保留一条规格值
        if(this.formEntity.specValueList.length <= 1) {
          this.$message.warning('至少保留一条规格值')
          return
        }
        // 获取数据在数组中的位置
        let arrIndex = _.findIndex(this.formEntity.specValueList, {specValueSort: row.specValueSort})
        this.formEntity.specValueList.splice(arrIndex, 1)
      }
    }
  }
</script>
<style scoped lang="scss">
  .mod-toolbar {
    background-color: #ffffff;
  }
  .form > .el-form-item {
    margin-bottom: 20px;
  }
  .submit-btn {
    background-color: #33bbab;
    border: none;
  }
  .cursor {
    color: #33bbab;
    cursor: pointer;
  }
  .del-btn {
    color: #f57575;
  }
  .sort-btn {
    color: #57a9e8;
    &.disable {
      color: #ccc;
    }
  }
</style>
