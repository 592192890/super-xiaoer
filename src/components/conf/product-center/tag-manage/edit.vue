<template>
  <div class="content">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="120px" label-position="left"
                 class="form">
          <el-form-item label="标签名称" prop="labelName">
            <el-col :span="6">
              <el-input v-model="formEntity.labelName" placeholder="请输入标签名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="是否显示前台" required>
            <el-col :span="6">
              <el-radio-group v-model="formEntity.isShow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item label="生效时间" prop="endDate" required
                        :rules="rules.tagDate">
            <el-col :span="4">
              <el-date-picker
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                v-model="formEntity.startDate"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-date-picker
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions"
                v-model="formEntity.endDate"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="标签图片" prop="imageKey" required
                        :rules="rules.imageKey">
            <div class="custom-uploader">
              <div class="el-upload" @click="openUploadDialog()">
                <img v-if="formEntity.imageUrl" :src="formEntity.imageUrl" class="uploader-img">
                <i v-else class="el-icon-plus custom-uploader-icon"></i>
              </div>
            </div>
            <p class="custom-uploader-tips">建议使用大小为30x30像素的图片。图片过大可能因系统自动压缩图片而导致变形</p>
          </el-form-item>
          <el-form-item label="图片透明度" required>
            <el-col :span="6">
              {{formEntity.transparency}}%
              <el-slider v-model="formEntity.transparency"></el-slider>
            </el-col>
          </el-form-item>
          <el-form-item label="图片位置">
            <el-col :span="6">
              <el-select v-model="formEntity.location" placeholder="请选择">
                <el-option
                  v-for="item in tagLocationOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label-width="120px">
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
    <upload-file-dialog @watchDialog="closeUploadDialog" @passSelectedPicUrl="getSelectedPicuUrl"
                        :isShow="isShowUploadDialog"></upload-file-dialog>
  </div>
</template>
<script>
  import Util from '@/assets/js/util'
  import breakCrumb from '@/components/common/breakCrumb'
  import uploadFileDialog from '@/components/common/packageDialog/uploadPicDialog'
  export default {
    components: {
      breakCrumb,
      uploadFileDialog
    },
    data(){
      let newDate = new Date()
      let sDate = (newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' + newDate.getDate() + ' 00:00:00')
      let eDate = (newDate.getFullYear() + '-' + (newDate.getMonth()+1) + '-' + newDate.getDate() + ' 23:59:59')
      let validateTagDate = (rule, value, callback) => {
        let endDate = new Date(this.formEntity.endDate)
        let startDate = new Date(this.formEntity.startDate)
        if(endDate.getTime() <= startDate.getTime()) {
          callback(new Error('结束时间须大于开始时间'))
        }else {
          callback()
        }
      }
      return {
        // imageUrl: '',
        isShowUploadDialog: false,
        successDialogVisible: false,
        titles: [{id: 1, name: '商品中心'}, {id: 2, name: '标签管理'}, {id: 3, name: '标签编辑'}],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        formEntity: {
          labelId: '',
          labelName: '',
          isShow: 1,            // 1显示 2不显示
          imageKey: '',
          imageUrl: '',
          location: 1,          // 图片位置 1左上 2左下 3右上 4右下
          transparency: 0,      // 透明度
          startDate: sDate,
          endDate: eDate
        },
        ruleForm: {
          labelName: ''
        },
        rules: {
          labelName: [
            {validator: Util.validateForm.inputValidateCommonText}
          ],
          tagDate: [
            { validator: validateTagDate, trigger: 'blur' }
          ],
          imageKey: [
            {required: true, message: '请上传标签图片'}
          ]
        },
        tagLocationOption: [{
          value: 1,
          label: '左上'
        }, {
          value: 2,
          label: '左下'
        }, {
          value: 3,
          label: '右上'
        }, {
          value: 4,
          label: '右下'
        }]
      }
    },
    methods: {
      /**
       * 获取标签信息
       * @param id 标签Id
       */
      getTagDetail: function (id) {
        let url = this.$apiUrl.getTagDetailUrl
        let param = {
          id: id
        };
        if (id) {
          this.$ajax.get(url, param).then((res) => {
            // 后台返回值替换表单默认值，如果后台返回null，则使用默认值
            Object.keys(this.formEntity).forEach(k => {
              this.formEntity[k] = res.data[k] ? res.data[k] : this.formEntity[k]
            })
          })
        }
      },
      /**
       * 标签新增
       * @param formName 标签表单名
       */
      update: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.$apiUrl.editTagUrl
            let param = Object.assign({}, this.formEntity)
            param.startDate = new Date(param.startDate).getTime()
            param.endDate = new Date(param.endDate).getTime()
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
       * 路由返回
       */
      goBack: function () {
        this.successDialogVisible = false
        this.$router.push({name: '标签管理', params: {currentPage: this.$route.params.currentPage}})
      },
      /**
       * 打开上传相册
       */
      openUploadDialog() {
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
        this.formEntity.imageKey = result[0].imageKey
        this.formEntity.imageUrl = result[0].imageUrl
      }
    },
    mounted(){
      // 获取标签详情
      this.getTagDetail(this.$route.params.labelId)
    }
  }
</script>
<style scoped>
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
  .line {
    text-align: center;
    margin-left: 10px;
    line-height: 36px;
    color: #ccc;
  }
</style>
<style>
  .custom-uploader .el-upload {
    border: 1px dashed #8c939d;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .custom-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .custom-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .custom-uploader-tips {
    color: #999;
  }
  .uploader-img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
