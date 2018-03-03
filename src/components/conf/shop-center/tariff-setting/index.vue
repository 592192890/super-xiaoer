<template>
    <div>
        <break-crumb :titles="titles"></break-crumb>
        <section v-loading="loading">
            <el-row :span="24" class="mod-header">
                <el-col :span="3"><div class="header-service"> 技术服务年费</div></el-col>
                <el-col :span="5"><el-input class="header-tariff" v-model="techFee" placeholder=""></el-input>元</el-col>
                <el-col :span="2"><el-button class="header-review" @click="submit" v-if="buttonArr.indexOf('bt-audit')!=-1">提交审核</el-button></el-col>
            </el-row>
            <div class="mod-ctn">
                <div class="item classify-name">分类名称</div>
                <div class="item security-deposit">保证金</div>
                <div class="item sub-commissions">分佣比例</div>
                <div class="item operate">操作</div>
            </div>
            
            <div class="classify" v-for="list in lists">
                <div class="first">{{list.cateName}}</div>
                <div class="second" v-for="item in list.children" @click="review($event,item)"> 
                    <div class="name">{{item.cateName}}</div>
                    <div class="input">
                        <input class="input-tariff" @input="inputFunc"  v-model="item.securityFee" placeholder=""></input>
                        <div class="label">元</div>
                        <div class="error error1"></div>
                    </div>
                    <div class="input">
                        <input  class="input-percentage" @input="inputFunc" v-model="item.percentage" placeholder=""></input>
                        <div class="label">%</div>
                        <div class="error error2"></div>
                    </div>
                    <div class="review" :id="item.id" v-if="buttonArr.indexOf('bt-audit')!=-1">提交审核</div>
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
import Permission from '@/assets/js/permission-util.js';
export default{
    components:{
        breakCrumb
    },
    data(){
        return {
            titles:[{id:1,name:'店铺中心'},{id:2,name:'资费设置'}],
            input:"",
            lists:[],
            value:"",
            loading:true,
            tips:"",
            dialogVisible:false,
            businessTypeCode:"",
            techFee:"",
            buttonArr:[]
        }
    },
    computed:{
    },
    methods:{
        getData(){
            let self = this
            let url= this.$apiUrl.getFeelistUrl;
            // let loadingInstance = Loading.service({target:document.querySelector('#loading')});
            this.loading=true;
            this.$ajax.get(url,{}).then(res =>{
                // loadingInstance.close()
                this.loading=false;
                if(res.data && res.data.msg=="查询成功"){
                    let list = res.data.list[0];
                    this.techFee = list.techFee;
                    this.businessTypeCode = list.businessTypeCode;
                    this.lists = list.children;
                }  
            })   
        },
        review(e,item){
            if(e.target.className != "review") return
            let dom = e.currentTarget;
            let valTariff = dom.querySelector(".input-tariff").value || "";
            let valPercentage = dom.querySelector(".input-percentage").value||"";
            let error1 = dom.querySelector(".error1");
            let error2 = dom.querySelector(".error2");
            let url= this.$apiUrl.cateFeeUrl;
            let backCateId = item.backCateId;
            let businessTypeCode = item.businessTypeCode;
            let percentage = item.percentage;
            let securityFee = item.securityFee;
            error1.innerHTML = ""
            error2.innerHTML = ""
            this.value = this.isNumber(valTariff);
            if(this.value){
                error1.innerHTML = this.value;
                return
            }
            this.value = this.isNumber(valPercentage);
            if(this.value){
                error2.innerHTML = this.value;
                return
            }
            this.$ajax.post(url,{backCateId:backCateId, businessTypeCode:businessTypeCode, percentage:percentage,securityFee:securityFee}).then(res =>{
                if(res.error) return;
                this.dialogVisible = true;
                this.tips = "提交成功，请等待财务人员审核"
            }) 

        },
        submit(){
            let url= this.$apiUrl.techFeeUrl;
            this.$ajax.post(url,{businessTypeCode:this.businessTypeCode, techFee:this.techFee}).then(res =>{
                if(res.error) return
                this.dialogVisible = true;
                this.tips = "提交成功，请等待财务人员审核"
            }) 
        },
        inputFunc(){
            
        },
        isNumber:(value) => {
            if (!value) {
                return '不能为空';
            }
            if(!/^\d+(\.\d+)?$/.test(value)) {
                return '请输入正数';   
            }
        },
    },
    mounted(){
        this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);
        console.log(this.buttonArr)
        this.getData();
        //获取哪一些按钮可以展示
		// console.log(this.$getPermission.button(this.$route.path,this.$router.options.routes),333);
	
    }
}
</script>
<style lang="scss" scoped>
.mod-header{
    line-height: 40px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    padding: 15px 0;
    border-radius: 5px;
    font-size: 16px;
    color: #33445a;
    .header-service{
        width: 100%;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .header-tariff{
        width: 200px;
        text-align: center;
        padding-right: 10px;
    }
    .header-review{
        background-color:#33bcac;
        border:1px solid #33bcac;
        color:#fff;
        width: 120px;
        text-align: center;
        margin: 0 0 0 10px
    }
}

.mod-ctn{
    height: 40px;
    line-height: 40px;
    width: 100%;
    background: #fff;
    margin:5px 0;
    padding: 0 30px;
    box-sizing: border-box;
    color: #999;
    font-size: 14px;
    border-radius: 5px;
    overflow: hidden;
    .item{
        float: left;
        box-sizing:border-box;
        &.classify-name{
            width: 20%;
        }
        &.security-deposit{
            width: 30%;
        }
        &.sub-commissions{
            width: 30%;
        }
        &.operate{
            float: right;
            width: 20%;
            position: relative;
        }
    }
}

.classify{
    width: 100%;
    padding: 10px 30px;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 5px;
    border-radius: 5px;
    .first{
        font-size: 16px;
        padding: 20px 0;
        color: #33bcac;
    }
    .second{
        width: 100%;
        overflow: hidden;
        margin-bottom: 18px;
        .name{
            float: left;
            width: 20%;
            line-height: 40px;
            text-align: left;
            font-size: 14px;
        }

        .input{
            float: left;
            width: 30%;
            .input-tariff{
                float: left;
                width: 200px;
                margin-top: 4px;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #bfcbd9;
                box-sizing: border-box;
                color: #1f2d3d;
                font-size: inherit;
                height: 36px;
                line-height: 1;
                outline: 0;
                padding: 3px 10px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1)
            }
            .input-percentage{
                float: left;
                width: 200px;
                margin-top: 4px;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-color: #fff;
                background-image: none;
                border-radius: 4px;
                border: 1px solid #bfcbd9;
                box-sizing: border-box;
                color: #1f2d3d;
                font-size: inherit;
                height: 36px;
                line-height: 1;
                outline: 0;
                padding: 3px 10px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1)
            }
            .label{
                float: left;
                line-height: 40px;
                padding-left: 10px;
            }
            .error{
                float: left;
                font-size: 14px;
                padding-left: 10px; 
                color: #f00;
                line-height: 40px;
            }
        }  
        .review{
            float: right;
            width: 20%;
            text-align: left;
            line-height: 40px;
            box-sizing: border-box;
            color: #20a0ff;
            cursor: pointer;
        }
    }
}
</style>
