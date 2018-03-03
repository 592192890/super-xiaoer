<template>
  <div class="content">
    <break-crumb :titles="titles"></break-crumb>
    <section>
      <el-col :span="24" class="mod-toolbar">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="120px" label-position="left" class="form">
          <el-form-item label="物流公司名称" prop="name" required>
            <el-col :span="6">
              <el-input v-model="formEntity.name" placeholder="请输入名称"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="物流公司代码" prop="code" required>
            <el-col :span="6">
              <el-input v-model="formEntity.code" placeholder="请输入代码"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="物流公司网址" prop="waybillQueryUrl" required>
            <el-col :span="6">
              <el-input v-model="formEntity.waybillQueryUrl" placeholder="请输入网址"></el-input>
            </el-col>
          </el-form-item>
          
          <el-form-item label-width="120px">
            <el-button type="primary" class="submit-btn" @click="add('ruleForm')">提交</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </section>

    
  </div>
</template>
<script>
  import Util from '@/assets/js/util'
  import breakCrumb from '@/components/common/breakCrumb'
  export default {
    components: {
      breakCrumb
    },
    data(){
      var codeValidate=function(rule, value, callback) {
        if(!value) callback(new Error('必填字段'))
        if(!/^[a-zA-Z]{2,50}$/.test(value)) {
          callback(new Error('仅限2-50个字符的英文'))
        }
        callback()
      }
      var nameValidate=function(rule, value, callback) {
        if(!value) callback(new Error('必填字段'))
        if(!/^[\u4e00-\u9fa5a-zA-z]{2,10}$/.test(value)) {
          callback(new Error('2-10个字符的中英文'))
        }
        callback()
      }
      var urlValidate=function(rule, value, callback) {
        if(!(/^(http:\/\/|https:\/\/)/.test(value)&&value.length<=50)) {
          callback(new Error('必须http://或https://开头的小于50个字符的网址'))
        }
        callback()
      }
      return {
        titles: [{id: 1, name: '仓库物流'}, {id: 2, name: '物流公司管理'}, {id: 3, name: '新增'}],
        formEntity: {},
        ruleForm: {
          name:'',
          code:''
          
        },
        rules: {
          name: [
            {validator: nameValidate}
          ],
          code:[
            {validator: codeValidate}
          ],
          waybillQueryUrl:[
            {validator: urlValidate}
          ]
        }
      }
    },
    methods: {
     
      add: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = this.$apiUrl.addLogisticsUrl
            let param = Object.assign({}, this.formEntity)
            this.$ajax.post(url, param).then((res) => {
              if(res.error==0) {
                this.$message({
                  type:'success',
                  message:'增加成功'
                })
                this.goBack();
              }
            })
          } else {
            return false
          }
        })
      },
      goBack: function () {
        this.$router.push({name: '物流公司管理列表'})
      },
     
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
  .line {
    text-align: center;
    margin-left: 10px;
    line-height: 36px;
    color: #ccc;
  }
</style>
