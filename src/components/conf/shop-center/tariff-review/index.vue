<template>
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section id="loading">
            <el-row :span="24" class="mod-header">
                <el-col :span="6"><div class="header-service"> 当前技术服务年费：{{ beforeTechFee }} 元</div></el-col>
                <el-col :span="6" v-if="need_audit"><div class="header-service"> 修改后技术服务年费：{{ afterTechFee }} 元</div></el-col>
                <el-col :span="2" v-if="need_audit"><el-button class="header-review" @click="passAudit" v-if="buttonArr.indexOf('bt-techAuditPass')!=-1">通过</el-button></el-col>
                <el-col :span="2" style="margin-left: 20px" v-if="need_audit"><el-button @click="rejectAudit" v-if="buttonArr.indexOf('bt-techAuditReject')!=-1" class="header-review rj" type="primary">拒绝</el-button></el-col>
            </el-row>
            <el-row :span="24" class="mod-ctn">
                <el-col :span="4"><div class="item lf">分类名称</div></el-col>
                <el-col :span="4"><div class="item">原保证金</div></el-col>
                <el-col :span="4"><div class="item">修改后保证金</div></el-col>
                <el-col :span="4"><div class="item">原分佣比例</div></el-col>
                <el-col :span="4"><div class="item">修改后分佣比例</div></el-col>
                <el-col :span="4"><div class="item">操作</div></el-col>
            </el-row>

            <div class="classify" v-for="list in lists">
                <div class="first">{{list.cateName}}</div>
                <div class="second" v-for="item in list.children">
                    <el-col :span="4" class="name lf">{{item.cateName}}</el-col>
                  <el-col :span="4" class="name">{{item.beforeSecurityFee }} 元 </el-col>
                  <el-col :span="4" class="name">{{item.afterSecurityFee }} 元</el-col>
                  <el-col :span="4" class="name">{{item.beforePercentage }} %</el-col>
                  <el-col :span="4" class="name">{{item.afterPercentage }} %</el-col>
                    <el-col :span="4" class="name" v-if="item.need_audit">
                        <span @click="reject(item)" v-if="buttonArr.indexOf('bt-cateAuditPass')!=-1" class="reject">拒绝</span>
                        <span @click="pass(item)" class="pass" v-if="buttonArr.indexOf('bt-cateAuditReject')!=-1">通过</span>
                    </el-col>
                </div>
            </div>
        </section>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="tiny">
          <span>{{ tips }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script type="text/javascript">
import breakCrumb from '@/components/common/breakCrumb';
import { Loading } from 'element-ui';
import Permission from '@/assets/js/permission-util.js'
export default {
    components: {
        breakCrumb
    },
    data() {
        return {
            titles:[{id:1,name:'店铺中心'},{id:2,name:'资费审核'}],
            input:"",
            lists:[],
            afterTechFee:"",
            beforeTechFee:"",
            businessTypeCode:"",
            tips:"",
            dialogVisible:false,
            isHide: false,
            need_audit:""
        }
    },
    computed:{

    },
    methods:{
        getData(){
            let url= this.$apiUrl.getAuditlistUrl;
            let loadingInstance = Loading.service({target:document.querySelector('#loading')});
            this.$ajax.get(url,{}).then(res =>{
                loadingInstance.close()
                if(res.data && res.data.msg=="查询成功"){
                    let list = res.data.list[0];
                    this.beforeTechFee = list.beforeTechFee;
                    this.afterTechFee = list.afterTechFee;
                    this.businessTypeCode = list.businessTypeCode;
                    this.need_audit = list.need_audit;
                    this.lists = list.children;
                }
            })
        },

        pass(item){
            let url= this.$apiUrl.cateFeeAuditUrl;
            let params = {
                auditStatus:1,
                backCateId:item.backCateId,
                businessTypeCode:item.businessTypeCode
            }
            this.$ajax.post(url,params).then(res =>{
                if(res.error){
                    /*this.dialogVisible = true;
                    this.tips = "分类资费比例审核通过失败"*/
                    return
                }
                this.getData();
            })
        },

        reject(item){
            let url= this.$apiUrl.cateFeeAuditUrl;
            let params = {
                auditStatus:-1,
                backCateId:item.backCateId,
                businessTypeCode:item.businessTypeCode
            }
            this.$ajax.post(url,params).then(res =>{
                if(res.error){
                    /*this.dialogVisible = true;
                    this.tips = "分类资费比例审核拒绝失败"*/
                    return
                }
                this.getData();
            })
        },

        passAudit(){
            let url= this.$apiUrl.techFeeAuditUrl;
            let params = {
                auditStatus : 1,
                businessTypeCode: this.businessTypeCode
            }
            this.$ajax.post(url,params).then(res =>{
                if(res.error){
                    /*this.dialogVisible = true;
                    this.tips = "技术服务年费审核通过失败"*/
                    return
                }
                this.getData();
            })
        },

        rejectAudit(){
            let url= this.$apiUrl.techFeeAuditUrl;
            let params = {
                auditStatus:-1,
                businessTypeCode:this.businessTypeCode
            }
            this.$ajax.post(url,params).then(res =>{
                if(res.error){
                    /*this.dialogVisible = true;
                    this.tips = "技术服务年费审核拒绝失败"*/
                    return
                }
                this.getData();
            })
        }
    },
    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
.mod-header{
    line-height: 40px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 20px 30px;
    box-sizing: border-box;
    width: 100%;
    .hide{
        display: none;
    }
    .header-service{
        width: 100%;
        text-align: left;
        font-size:16px;
        color:#33445a;
    }
    .header-tariff{
        width: 100px;
        text-align: center;
    }
    .header-review{
        width: 100%;
        text-align: center;
        margin: 4px 20px;
        background-color:#33bcac;
        border:1px solid #33bcac;
        color:#fff;
        &.rj{
            background-color:#f57575;
            border:1px solid #f57575
        }
    }

}



.mod-ctn{
    height: 40px;
    line-height: 40px;
    width: 100%;
    background: #fff;
    margin:5px 0;
    border-radius: 5px;
    padding: 0 30px;
    box-sizing: border-box;
    .item{
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 14px;
        &.lf{
            text-align: left;
        }
    }
}

.classify{
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    margin-bottom: 5px;
    .first{
        font-size: 16px;
        padding: 20px 0;
        color: #33bbab;
    }
    .second{
        width: 100%;
        overflow: hidden;
        .name{
            float: left;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            &.lf{
                text-align: left;
            }
            span{
                float: right;
                width: 70px
            }
            .pass{
                color:#33bbab;
                cursor: pointer;
            }
            .reject{
                color:#f57575;
                cursor: pointer;
            }
        }
    }
}
</style>
