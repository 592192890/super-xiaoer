<template>
  <div class="addOrEditChannel">
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :before-close="beforeCloseDialog"
        size="small">
        <el-form :rules="rules" ref="ruleForm" :model="formEntity" label-width="120px" label-position="left" class="form">

          <el-row :gutter="5">
            <el-col :span="7">
                <el-form-item label="供应商名称" required prop="supplier_name">
                    <el-input v-model="formEntity.supplier_name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="供应链系统编码（登录账号）" required prop="login_code">
                  <el-input v-model="formEntity.login_code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="5">
            <el-col :span="7" v-if="type!='编辑'">
              <el-form-item label="密码" required prop="password">
                  <el-input type="password" v-model="formEntity.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" v-if="type=='编辑'">
              <el-form-item label="密码" prop="password1">
                  <el-input type="password" v-model="formEntity.password1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="到期日期" required prop="outdateTime">
                  <el-date-picker
                      v-model="formEntity.outdateTime"
                      type="date"
                      placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="7">
              <el-form-item label="email" required prop="email">
                  <el-input type="email" v-model="formEntity.email"></el-input>
              </el-form-item>
            </el-col>
            
          </el-row>
          <el-row :gutter="5">
            <el-col :span="10">
              <el-form-item label="关联商品" required>
                  <el-radio>商品编码Product_ID</el-radio>

              </el-form-item>

            </el-col>
          </el-row>
          <el-row>
            <el-col style="margin-left:120px;margin-bottom:10px" :span="3">
              <el-upload
                class="upload-demo"
                :action="importUrl"
                :show-file-list="false"
                name="product_file"
                :on-success="uploadFileSuccess">
                <el-button class="import-btn" type="primary">导入excel</el-button>
                <div slot="tip" class="el-upload__tip" v-if="isUploadSuccess==1">excel导入成功</div>
                <div slot="tip" class="el-upload__tip" v-if="isUploadSuccess==0">excel导入失败</div>
              </el-upload>
            </el-col>
            <el-col :span="3" v-if="type=='编辑'">
              <el-button type="primary" @click="exportExcel">导出excel</el-button>
            </el-col>
            <el-col :span="3">
              <el-button @click="downloadExcel">下载excel模版</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="10">
              <el-form-item label="内容备注" prop="desc">
                  <el-input type="textarea" v-model="formEntity.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>



          <el-row :gutter="5" v-if="type=='编辑'">
            <el-col :span="7">
              <el-form-item label="创建时间">
                <div>{{formEntity.create_time | filterTimeStamp}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="最后登录时间">
                <div>{{formEntity.update_time | filterTimeStamp}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
                <el-form-item label="状态" required>
                  <el-radio-group v-model="formEntity.status">
                    <el-radio label="Y">有效</el-radio>
                    <el-radio label="N">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
                <el-form-item label="功能模块" required prop="model_auth_ids">
                    <el-checkbox-group v-model="formEntity.model_auth_ids">
                      <el-checkbox :class="{'first':index==0}" :label="item.id" v-for="(item,index) in functionList" :key="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-button type="primary" @click="submitFrom('ruleForm')" class="confirm-btn">确 定</el-button>
            <el-button @click="beforeCloseDialog" class="cancel-btn">取 消</el-button>

          </el-row>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Util from '@/assets/js/util.js'
export default{
  props:['type','isShow','entityId'],
  data(){
    return {
      dialogVisible:false,
      title:this.type,
      dialogVisible:this.isShow,
      isUploadSuccess:2,
      functionList:[],
      formEntity:{
        model_auth_ids:[],
        status:'Y',
        outdateTime:'',
        product_ids:[]
      },
      importUrl:this.$apiUrl.importRelatedProductUrl,
      ruleForm:{
        supplier_name:'',
        login_code:'',
        password:'',
        outdateTime:'',
        email:'',
        desc:'',
        modelAuthIds:[]
      },
      rules:{
        supplier_name:[
          {required:true,message:'必填',trigger:'change'},
          {max:30,message:'不能超过30个字符',trigger:'change'}
        ],
        login_code:[
          {required:true,message:'必填',trigger:'change'},
          {max:30,message:'不能超过30个字符',tigger:'change'}
        ],
        email:[
          {required:true,message:'必填',trigger:'change'},
          {validator:Util.validateForm.isEmail,tigger:'change'}
        ],
        password:[
          {required:true,max:6,min:6,message:'必填6个字符',trigger:'change'}
        ],
        password1:[
          {max:6,min:6,message:'请输入6个字符',trigger:'change'}
        ],
        desc:[
          {max:250,message:'不能超过250个字符',trigger:'change'}
        ],
        outdateTime:[
          {type:'date',required:true,message:'必填日期',trigger:'change'}
        ],
        model_auth_ids:[
          {type: 'array', required: true,message:'至少选择一个功能',tigger:'change'}
        ]
      }
    }
  },
  methods:{
    uploadFileSuccess(res, file){
      if(res.error==0){
        this.formEntity.product_ids=res.data;

        this.isUploadSuccess=1;
      }else{
        this.formEntity.product_ids=[];
        this.isUploadSuccess=0;
      }

    },
    downloadExcel(){
      var url=this.$apiUrl.donwloadExcelTemplateUrl;
      window.open(url)
    },
    exportExcel(){
      var url=this.$apiUrl.exportRelatedProductUrl+"?userId="+this.formEntity.id;

      window.open(url);
    },
    beforeCloseDialog:function(){
      this.$emit('watchDialog',false)
    },
    submitFrom(formName){
       this.$refs[formName].validate(valid => {
            if (valid) {
                var url=this.$apiUrl.addOrUpdateChannelUrl;
                var params=Object.assign({},this.formEntity);
                params.outdate_time=params.outdateTime.getTime();
                params.model_auth_ids=JSON.stringify(params.model_auth_ids)
                params.product_ids=JSON.stringify(params.product_ids)
                //简化参数，去除一些后端不需要的参数
                params.auths=null;
                params.modelAuthNames=null;
                params.statusName=null;
                //判断是否上传了文件
                if(params.product_ids.length==0){
                  this.$message({
                    type:'warning',
                    message:'请上传excel!'
                  })
                  return;
                }
                //如果是编辑状态密码是可以为空的，如果填写了密码就是覆盖密码；
                //为了方便表单验证，所以新建了一个password1字段,更新的时候再讲password1赋值给password
                if(this.type=='编辑'){
                  params.password=params.password1;
                }
                this.$ajax.post(url,params).then(res =>{
                    if(res.error==0){
                      this.$message({
                        type:'success',
                        message:'操作成功！'
                      })
                      this.$emit('watchDialog',false)
                    }

                })
            } else {

                return false
            }
        });

    },
    getFunctionList(){
      var url=this.$apiUrl.getChannelFucntionListUrl;
      this.$ajax.get(url).then(res=>{
        if(res.error==0){
          this.functionList=res.data.list;

        }
      })
    },
    getDetail(id){
      var url=this.$apiUrl.getChannelOperationDetailUrl;
      var params={
        userId:id
      }
      this.$ajax.get(url,params).then(res=>{
        if(res.error==0){
          var resultObj=res.data;
          resultObj.outdateTime=new Date(parseInt(resultObj.outdate_time));

          this.formEntity=Object.assign({},this.formEntity,resultObj);


        }
      })
    }
  },
  mounted(){
    if(this.type=='编辑'){

      this.getDetail(this.entityId);
    }
    this.getFunctionList();
  }
}
</script>
<style scoped lang="scss">
.import-btn{
  background-color:#33bbab;
  color:#ffffff;
  border:none;
}
.el-upload__tip{
  color:#67c23a
}
.el-checkbox{
  overflow: hidden;
  text-overflow: ellipsis;
  width:100%;
  white-space: nowrap;
  display:block;
}
.first{
  margin-left:15px;
}
</style>

