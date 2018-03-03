<template>
  <div class="content">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="100px" label-position="left"
                 class="form">
          <el-form-item label="国家编码" prop="countryCode" class="validate-table-error" required>
            <el-col :span="6">
              <el-input v-model="formEntity.countryCode" placeholder="请输入国家编码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="国家中文名" prop="countryName" required>
            <el-col :span="6">
              <el-input v-model="formEntity.countryName" placeholder="请输入国家中文名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="国家英文名" prop="countryEnName" required>
            <el-col :span="6">
              <el-input v-model="formEntity.countryEnName" placeholder="请输入国家英文名"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="国家LOGO" prop="imageUrl" required
                        :rules="rules.imageUrl">
            <div class="custom-uploader">
            <div class="el-upload" @click="openUploadDialog()">
              <img v-if="formEntity.imageUrl" :src="formEntity.imageUrl" class="uploader-img">
              <i v-else class="el-icon-plus custom-uploader-icon"></i>
            </div>
          </div>
            <p class="custom-uploader-tips">品牌LOGO尺寸要求宽度为120像素，高度为120像素、比例为3:1的图片；支持格式gif,jpg,png</p>
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
      let validateCountryName = (rule, value, callback) => {
        if(!value) callback(new Error('必填字段'))
        if(!/^[\u4e00-\u9fa5]{2,50}$/.test(value)) {
          callback(new Error('国家名必须为2-50位的汉字'))
        }else {
          callback()
        }
      }
      let validateCountryEnName = (rule, value, callback) => {
        if(!value) callback(new Error('必填字段'))
        if(!/^[a-zA-Z]{2,50}$/.test(value)) {
          callback(new Error('字段必须为2-50位的字母'))
        }else {
          callback()
        }
      }
      return {
        // imageUrl: '',
        isShowUploadDialog: false,
        successDialogVisible: false,
        errorTips: '',
        provinceList: [],
        titles: [{id: 1, name: '商品中心'}, {id: 2, name: '国家管理'}, {id: 3, name: '国家编辑'}],
        formEntity: {
          countryId: '',
          countryCode: '',
          countryName: '',
          countryEnName: '',
          countryFlagIco: '',
          imageUrl: ''
        },
        ruleForm: {
          countryCode: '',
          countryName: '',
          countryEnName: ''
        },
        rules: {
          countryCode: [
            {required: true, validator: validateCountryEnName, trigger: 'blur'}
          ],
          countryName: [
            {required: true, validator: validateCountryName, trigger: 'blur'}
          ],
          countryEnName: [
            {required: true, validator: validateCountryEnName, trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传国家LOGO'}
          ]
        }
      }
    },
    methods: {
      /**
       * 获取国家信息
       * @param id 国家Id
       */
      getCountryDetail : function (id) {
        let url = this.$apiUrl.getCountryDetailUrl
        let param = {
          countryId: id
        };
        if(id) {
          this.$ajax.post(url, param).then((res) => {
            Object.keys(this.formEntity).forEach(k => {
              this.formEntity[k] = res.data[k]
            })
          })
        }
      },
      /**
       * 国家修改
       * @param formName
       */
      update: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.$apiUrl.editCountryUrl
            let param = Object.assign({}, this.formEntity)
            this.$ajax.post(url, param).then((res) => {
              if(!res.error) {
                this.successDialogVisible = true;
              }
            })
          } else {
            return false
          }
        });
      },
      /**
       * 路由返回
       */
      goBack: function () {
        this.successDialogVisible = false
        this.$router.push({name: '国家管理', params: {currentPage: this.$route.params.currentPage}})
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
        this.formEntity.countryFlagIco = result[0].imageKey
        this.formEntity.imageUrl = result[0].imageUrl
      }
    },
    mounted(){
      // 获取品牌详情
      this.getCountryDetail(this.$route.params.countryId)
    }
  }
</script>
<style scoped>
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
