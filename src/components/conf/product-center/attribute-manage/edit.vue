<template>
  <div class="content">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="100px" label-position="left"
                 class="form">
          <el-form-item label="属性名称" prop="typeName"
                        class="validate-table-error"
                        :rules="rules.commonText">
            <el-col :span="6">
                <el-input v-model="formEntity.typeName" placeholder="请输入属性名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="扩展属性" prop="attrDetailParams">
            <el-col>
              <el-button type="primary" class="submit-btn" @click="addExtendAttr()">添加扩展属性</el-button>
            </el-col>
            <el-col :span="20">
              <el-table
                :data="formEntity.phpPropsVoList"
                style="width: 100%">
                <el-table-column label="属性名称" width="300">
                  <template scope="scope">
                    <el-form-item class="validate-table-error"
                                  :prop="'phpPropsVoList.' + scope.$index + '.propsName'"
                                  :rules="rules.commonText"
                    >
                      <el-input v-model="scope.row.propsName" placeholder="请输入扩展属性名称"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column inline-template label="前台表现形式" prop="displayOptionValue" width="220">
                  <el-select v-model="row.expressionType" placeholder="请选择" @change="expressionTypeChange(row)">
                    <el-option
                      v-for="item in displayOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-table-column>
                <el-table-column inline-template label="选项值" prop="propsValueList">
                  <template v-if="row.expressionType != 4">
                    <el-tag
                      v-for="tag in row.propsValueList"
                      :key="tag.propsValueSort"
                      :closable="true"
                      @close="handleTagClose(row, tag)"
                    >
                      {{tag.propsValueName}}
                    </el-tag>
                    <!--<el-input
                      class="input-new-tag"
                      v-if="row._propsTagInputVisible"
                      v-model="row._propsTagInputValue"
                      size="small"
                      ref="propsTagInputValue"
                      @keyup.enter.native="handleTagInputConfirm(row)"
                      @blur="handleTagInputBlur(row)"
                      style="width:100px"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="addNewTagValue(row)">+ 添加新标签</el-button>-->
                    <el-popover placement="bottom" width="215">
                      <el-input v-model="row._propsTagInputValue" placeholder="请输入属性选项值" style="width: 150px"></el-input>
                      <el-button slot="reference" type="text" class="btn-green">添加</el-button>
                      <el-button @click="handleTagInputConfirm(row)">确定</el-button>
                    </el-popover>
                    <!--<el-input placeholder="请输入选项值" style="width: 130px"></el-input>
                    <el-button type="primary">添加</el-button>-->
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template scope="scope">
                    <span class="del-btn cursor" @click="delExtendAttr(scope.row)">删除</span>
                    <span class="sort-btn cursor" :class="scope.$index == 0?'disable':''" @click="extendSortUp(scope.row)">上移</span>
                    <span class="sort-btn cursor" :class="scope.$index == formEntity.phpPropsVoList.length-1?'disable':''" @click="extendSortDown(scope.row)">下移</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
          <el-form-item label="详细参数" prop="propsGroupList" class="validate-table-error">
            <el-col>
              <el-button type="primary" class="submit-btn" @click="addDetailParamsGroup()">添加详细参数</el-button>
            </el-col>
            <el-col :span="20">
              <el-table
                :data="formEntity.propsGroupList"
                style="width: 100%">
                <el-table-column label="参数组名称" width="260">
                  <template scope="scope">
                    <el-form-item class="validate-table-error"
                                  :prop="'propsGroupList.' + scope.$index + '.propsGroupName'"
                                  :rules="rules.commonText"
                    >
                      <el-input v-model="scope.row.propsGroupName" placeholder="请输入参数组名称" style="width: 220px"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column>
                  <template scope="scope">
                    <el-table
                      :data="scope.row.propsList"
                      style="width: 100%">
                      <el-table-column label="参数名称">
                        <template scope="scope2">
                          <el-form-item class="validate-table-error"
                                        :prop="'propsGroupList.' + scope.$index + '.propsList.'+ scope2.$index +'.propsName'"
                                        :rules="rules.commonText"
                          >
                            <el-input v-model="scope2.row.propsName" placeholder="请输入参数名称"></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="150">
                        <template scope="scope2">
                          <span class="del-btn cursor" @click="delPropsList(scope.$index, scope2.row)">删除</span>
                          <span class="sort-btn cursor" :class="scope2.$index == 0?'disable':''" @click="propsListSortUp(scope.$index, scope2.row)">上移</span>
                          <span class="sort-btn cursor" :class="scope2.$index == scope.row.propsList.length-1?'disable':''" @click="propsListSortDown(scope.$index, scope2.row)">下移</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <span class="cursor" @click="addDetailParams(scope.row)">添加参数</span>
                    <span class="del-btn cursor" @click="delPropsGroup(scope.row)">删除</span>
                    <span class="sort-btn cursor" :class="scope.$index == 0?'disable':''" @click="propsGroupSortUp(scope.row)">上移</span>
                    <span class="sort-btn cursor" :class="scope.$index == formEntity.propsGroupList.length-1?'disable':''" @click="propsGroupSortDown(scope.row)">下移</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
          <el-form-item label="自定义TAB" prop="tabLabelList" class="validate-table-error">
            <el-col>
              <el-button type="primary" class="submit-btn" @click="addTab">添加TAB</el-button>
            </el-col>
            <el-col :span="20">
              <el-table
                :data="formEntity.tabLabelList"
                style="width: 100%">
                <el-table-column label="TAB名" prop="tabLabelName">
                  <template scope="scope">
                    <el-form-item class="validate-table-error"
                                  :prop="'tabLabelList.' + scope.$index +'.tabLabelName'"
                                  :rules="rules.commonText"
                    >
                      <el-input v-model="scope.row.tabLabelName" placeholder="请输入TAB名称" style="width: 300px"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template scope="scope">
                    <span class="del-btn cursor" @click="delTab(scope.row)">删除</span>
                    <span class="sort-btn cursor" :class="scope.$index == 0?'disable':''" @click="tabSortUp(scope.row)">上移</span>
                    <span class="sort-btn cursor" :class="scope.$index == formEntity.tabLabelList.length-1?'disable':''" @click="tabSortDown(scope.row)">下移</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
          <el-form-item label-width="100px">
            <el-button type="primary" class="submit-btn" @click="update('ruleForm')">提交</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </section>
    <el-dialog
      title="提示"
      :visible.sync="successDialogVisible"
      size="tiny">
      <span>修改成功!</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goBack" class="confirm-btn">确 定</el-button>
      </span>
    </el-dialog>
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
  import _ from 'lodash'
  import Util from '@/assets/js/util'
  import breakCrumb from '@/components/common/breakCrumb'
  export default {
    components: {
      breakCrumb
    },
    data(){
      return {
        deleteDialogVisible: false,
        deleteDataCallback: function () {},
        successDialogVisible: false,
        titles: [{id: 1, name: '商品中心'}, {id: 2, name: '属性管理'}, {id: 3, name: '属性编辑'}],
        formEntity: {
          typeId: '',
          typeName: '',
          // add添加,edit编辑
          type: 'edit',
          // 扩展属性
          phpPropsVoList: [],
          // 参数组
          propsGroupList: [],
          // 自定义Tab
          tabLabelList: []
        },
        ruleForm: {
          typeName: ''
        },
        rules: {
          commonText: [
            {validator: Util.validateForm.inputValidateCommonText}
          ]
        },
        displayOption: [{
          value: 1,
          label: '渐进式筛选'
        }, {
          value: 2,
          label: '下拉筛选'
        }, {
          value: 3,
          label: '不可筛选'
        }, {
          value: 4,
          label: '输入项-不可搜索'
        }, {
          value: 5,
          label: '多选'
        }]
      }
    },
    methods: {
      /**
       * 获取属性信息
       * @param id 属性Id
       */
      getAttributeDetail: function (id) {
        let url = this.$apiUrl.getAttributeDetailUrl
        let param = {
          id: id
        }
        if(id) {
          this.$ajax.post(url, param).then((res) => {
            let data = res.data.phpPropsVoList
            let phpPropsVoList = _.map(data, 'propsSort')
            let phpPropsVoListUniq = _.uniq(phpPropsVoList)
            // 排序标识
            let uniqBool = false
            if(phpPropsVoListUniq.length < phpPropsVoList.length) {
              // 属性值Sort字段重复，重新排序sort值
              uniqBool = true
            }
            // 给扩展属性添加自定义字段，作为选项值输入的私有变量
            Object.keys(data).forEach((k, i) => {
//              data[k]._propsTagInputVisible = false       // 扩展属性选项值输入框隐藏,true为显示
              data[k]._propsTagInputValue = ''             // 扩展属性选项输入值
              data[k].propsSort =  uniqBool ? (i + 1) : data[k].propsSort
            })
            this.formEntity.typeId = res.data.typeId
            this.formEntity.typeName = res.data.typeName
            // 根据指定字段对进行排序
            this.formEntity.phpPropsVoList = _.sortBy(data, 'propsSort')
            this.formEntity.propsGroupList = res.data.propsGroupList
            this.formEntity.tabLabelList = res.data.tabLabelList
          })
        }
      },
      /**
       * 属性修改
       * @param formName 规格表单名
       */
      update: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.$apiUrl.addAttributeUrl
            let param = Object.assign({}, this.formEntity)
            // 删除_开头的自定义字段
            Object.keys(param.phpPropsVoList).forEach(k => {
              delete param.phpPropsVoList[k]._propsTagInputValue
//              delete param.phpPropsVoList[k]._propsTagInputVisible
            })
            param.phpPropsVoList = JSON.stringify(param.phpPropsVoList)
            param.propsGroupList = JSON.stringify(param.propsGroupList)
            param.tabLabelList = JSON.stringify(param.tabLabelList)
            this.$ajax.post(url, param).then((res) => {
              if(!res.error) {
                this.successDialogVisible = true
              }
            })
          } else {
            return false
          }
        })
      },
      /**
       * 添加扩展属性
       * 添加新扩展属性后propsSort索引默认为1，对已存在数据的propsSort索引进行+1操作
       */
      addExtendAttr: function () {
        // 对已有数据的propsSort字段索引加1
        let phpPropsVoList = this.formEntity.phpPropsVoList
        Object.keys(phpPropsVoList).forEach(k => {
          phpPropsVoList[k].propsSort = phpPropsVoList[k].propsSort + 1
        })
        phpPropsVoList.push({
//          _propsTagInputVisible: false,   // 扩展属性选项值输入框隐藏,true为显示
          _propsTagInputValue: '',         // 扩展属性选项输入值
          propsName: '',
          expressionType: 1,
          propsSort: 1,
          propsValueList: []
        })
        // 根据指定字段对进行排序
        this.formEntity.phpPropsVoList = _.sortBy(phpPropsVoList, 'propsSort')
      },
      /**
       * 添加详细参数
       * 添加新详细参数后sort索引默认为1，对已存在数据的sort索引进行+1操作
       */
      addDetailParamsGroup: function () {
        // 对已有数据的sort字段索引加1
        let propsGroupList = this.formEntity.propsGroupList
        Object.keys(propsGroupList).forEach(k => {
          propsGroupList[k].sort = propsGroupList[k].sort + 1
        })
        propsGroupList.push({
          propsGroupId: '',
          propsGroupName: '',
          propsList: [],
          sort: 1
        })
        // 根据指定字段对进行排序
        this.formEntity.propsGroupList = _.sortBy(propsGroupList, 'sort')
      },
      /**
       * 添加详细参数
       * 添加新详细参数后sort索引默认为1，对已存在数据的sort索引进行+1操作
       */
      addDetailParams: function (row) {
        Object.keys(row.propsList).forEach(k => {
          row.propsList[k].propsSort = row.propsList[k].propsSort + 1
        })
        row.propsList.push({
          propsId: '',
          propsName: '',
          propsSort: 1,
        })
        // 根据指定字段对进行排序
        row.propsList = _.sortBy(row.propsList, 'propsSort')
      },
      /**
       * 添加自定义Tab
       * 添加新Tab后sort索引默认为1，对已存在数据的sort索引进行+1操作
       */
      addTab: function () {
        Object.keys(this.formEntity.tabLabelList).forEach(k => {
          this.formEntity.tabLabelList[k].sort = this.formEntity.tabLabelList[k].sort + 1
        })
        this.formEntity.tabLabelList.push({
          tabLabelId: '',
          tabLabelName: '',
          sort: 1,
        })
        // 根据指定字段对进行排序
        this.formEntity.tabLabelList = _.sortBy(this.formEntity.tabLabelList, 'sort')
      },
      /**
       * 删除确认
       * @param cb 删除回调
       */
      deleteConfirm: function (cb) {
        this.deleteDialogVisible = false
        cb && cb.call(this)
      },
      /**
       * 删除扩展属性
       * @param row
       */
      delExtendAttr: function (row) {
        // 如果id存在，则调用远程删除接口
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          if(row.propsId) {
            let url = this.$apiUrl.delAttrExtendAndDetailOptionUrl
            let param = {
              id: row.propsId
            }
            this.$ajax.get(url, param).then((res) => {
              if(!res.error) {
                this.formEntity.phpPropsVoList.splice(this.formEntity.phpPropsVoList.indexOf(row), 1)
                this.$message.info('删除成功!')
              }
            })
            return
          }
          this.formEntity.phpPropsVoList.splice(this.formEntity.phpPropsVoList.indexOf(row), 1)
        }
      },
      /**
       * 删除详细参数组
       * @param row
       */
      delPropsGroup: function (row) {
        // 如果id存在，则调用远程删除接口
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          if (row.propsGroupId) {
            let url = this.$apiUrl.delDetailGroupUrl
            let param = {
              id: row.propsGroupId
            }
            this.$ajax.get(url, param).then((res) => {
              if (!res.error) {
                this.formEntity.propsGroupList.splice(this.formEntity.propsGroupList.indexOf(row), 1)
                this.$message.info('删除成功!')
              }
            })
            return
          }
          this.formEntity.propsGroupList.splice(this.formEntity.propsGroupList.indexOf(row), 1)
        }
      },
      /**
       * 删除详细参数列表
       * @param i 父级行索引下标
       * @param row 删除行数据
       */
      delPropsList: function (i, row) {
        // 如果id存在，则调用远程删除接口
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          if (row.propsId) {
            let url = this.$apiUrl.delAttrExtendAndDetailOptionUrl
            let param = {
              id: row.propsId
            }
            this.$ajax.get(url, param).then((res) => {
              if (!res.error) {
                this.formEntity.propsGroupList[i].propsList.splice(this.formEntity.propsGroupList[i].propsList.indexOf(row), 1)
                this.$message.info('删除成功!')
              }
            })
            return
          }
          this.formEntity.propsGroupList[i].propsList.splice(this.formEntity.propsGroupList[i].propsList.indexOf(row), 1)
        }
      },
      /**
       * 删除自定义Tab
       * @param row 删除行数据
       */
      delTab: function (row) {
        // 如果id存在，则调用远程删除接口
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          if (row.tabLabelId) {
            let url = this.$apiUrl.delAttributeTabUrl
            let param = {
              id: row.tabLabelId
            }
            this.$ajax.get(url, param).then((res) => {
              if (!res.error) {
                this.formEntity.tabLabelList.splice(this.formEntity.tabLabelList.indexOf(row), 1)
                this.$message.info('删除成功!')
              }
            })
            return
          }
          this.formEntity.tabLabelList.splice(this.formEntity.tabLabelList.indexOf(row), 1)
        }
      },
      /**
       * Tag删除
       * @param row
       * @param tag
       */
      handleTagClose(row, tag) {
        // 如果id存在，则调用远程删除接口
        this.deleteDialogVisible = true
        this.deleteDataCallback = function () {
          if (tag.propsValueId) {
            let url = this.$apiUrl.delAttrExtendOptionUrl
            let param = {
              id: tag.propsValueId
            }
            this.$ajax.get(url, param).then((res) => {
              if (!res.error) {
                row.propsValueList.splice(row.propsValueList.indexOf(tag), 1)
                this.$message.info('删除成功!')
              }
            })
            return
          }
          row.propsValueList.splice(row.propsValueList.indexOf(tag), 1)
        }
      },
      /**
       * 扩展属性选项值Input显示并获得焦点
       * @param row
       */
//      addNewTagValue(row) {
//        row._propsTagInputVisible = true
//        this.$nextTick(_ => {
//          this.$refs['propsTagInputValue'].$refs.input.focus()
//        })
//      },
      /**
       * 扩展属性选项值添加
       * @param row
       */
      handleTagInputConfirm(row) {
        let propsTagInputValue = row._propsTagInputValue
        if(propsTagInputValue.length < 2) {
            this.$message.warning('字符长度小于2位')
            return
        }
        // 已有数据索引加1
        Object.keys(row.propsValueList).forEach(k => {
          row.propsValueList[k].propsValueSort = row.propsValueList[k].propsValueSort + 1
        })
        row.propsValueList.push({
          propsValueId: '',
          propsValueName: propsTagInputValue,
          propsValueSort: 1,
        })
        row._propsTagInputValue = ''
//        row._propsTagInputVisible = false
      },
      /**
       * 扩展属性选项值Input失去焦点
       * @param row
       */
//      handleTagInputBlur(row) {
//        row._propsTagInputValue = ''
//        row._propsTagInputVisible = false
//      },
      /**
       * 下拉选项值为4(输入项)时，清空propsValueList列表
       * @param row
       */
      expressionTypeChange(row) {
        if(row.expressionType == 4) {
          row.propsValueList = []
        }
      },
      /**
       * 路由返回
       */
      goBack: function () {
        this.successDialogVisible = false
        this.$router.push({name: '属性管理', params: {currentPage: this.$route.params.currentPage}})
      },
      /**
       * 扩展属性上移
       */
      extendSortUp: function (row) {
        let sort = this.sortUp(this.formEntity.phpPropsVoList, row, 'propsSort')
        if (sort) {
          this.formEntity.phpPropsVoList = sort
        }
      },
      /**
       * 扩展属性下移
       */
      extendSortDown: function (row) {
        let sort = this.sortDown(this.formEntity.phpPropsVoList, row, 'propsSort')
        if (sort) {
          this.formEntity.phpPropsVoList = sort
        }
      },
      /**
       * 详细参数组上移
       */
      propsGroupSortUp: function (row) {
        let sort = this.sortUp(this.formEntity.propsGroupList, row, 'sort')
        if (sort) {
          this.formEntity.propsGroupList = sort
        }
      },
      /**
       * 详细参数组下移
       */
      propsGroupSortDown: function (row) {
        let sort = this.sortDown(this.formEntity.propsGroupList, row, 'sort')
        if (sort) {
          this.formEntity.propsGroupList = sort
        }
      },
      /**
       * 详细参数列表上移
       */
      propsListSortUp: function (i, row) {
        let sort = this.sortUp(this.formEntity.propsGroupList[i].propsList, row, 'propsSort')
        if (sort) {
          this.formEntity.propsGroupList[i].propsList = sort
        }
      },
      /**
       * 详细参数列表下移
       */
      propsListSortDown: function (i, row) {
        let sort = this.sortDown(this.formEntity.propsGroupList[i].propsList, row, 'propsSort')
        if (sort) {
          this.formEntity.propsGroupList[i].propsList = sort
        }
      },
      /**
       * 自定义Tab上移
       */
      tabSortUp: function (row) {
        let sort = this.sortUp(this.formEntity.tabLabelList, row, 'sort')
        if (sort) {
          this.formEntity.tabLabelList = sort
        }
      },
      /**
       * 自定义Tab下移
       */
      tabSortDown: function (row) {
        let sort = this.sortDown(this.formEntity.tabLabelList, row, 'sort')
        if (sort) {
          this.formEntity.tabLabelList = sort
        }
      },
      /**
       *上移
       * @param src
       * @param row
       * @param key
       */
      sortUp(src, row, key) {
        // 获取key字段值在src数组中的下标
        let curIndex = _.findIndex(src, {[key]: row[key]})
        if (!curIndex) return;   // 已排序到最前面，直接返回
        let curValueSort = src[curIndex][key]
        src[curIndex][key] = src[curIndex - 1][key]
        src[curIndex - 1][key] = curValueSort
        //  重新排序
        return _.sortBy(src, key)
      },
      /**
       * 下移
       * @param src
       * @param row
       * @param key
       */
      sortDown(src, row, key) {
        // 获取key字段值在src数组中的下标
        // let curIndex = row[key] - 1;
        let curIndex = _.findIndex(src, {[key]: row[key]})
        if (curIndex >= src.length - 1) return;   // 已排序到最后面，直接返回
        let curValueSort = src[curIndex][key]
        src[curIndex][key] = src[curIndex + 1][key]
        src[curIndex + 1][key] = curValueSort
        //  重新排序
        return _.sortBy(src, key)
      }
    },
    mounted(){
      // 获取属性详情
      this.getAttributeDetail(this.$route.params.typeId)
    }
  }
</script>
<style lang="scss" scoped>
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
  .line {
    text-align: center;
    margin-left: 10px;
    line-height: 36px;
    color: #ccc;
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
  .el-tag {
    margin-right: 5px;
  }
  .btn-green {
    color: #33bbab;
  }
</style>
