<template>
    <div class="down">
        <div class="apply">
            <div class="apply-lf">
                <div class="unit">
                    <span class="label">申请单号：</span>
                    <span class="ctn">
                        <router-link :to="{ name: '售后订单查看', query: { reverseId: refund.reverseId, orderId:refund.orderId, currentPage:currentPage }}">{{refund.reverseId}}</router-link>
                    </span>
                </div>
                <div class="unit">
                    <span class="label">买家：</span>
                    <span class="ctn">{{ refund.memberName }}</span>
                </div>
                <div class="unit">
                    <span class="label">原因：</span>
                    <span class="ctn">{{ refund.refundReason}}</span>
                </div>
                <div class="unit">
                    <span class="label">凭证：</span>
                    <span class="ctn" v-for="img in reverseApply.imgPath" :key="img"><img :src="img"></span>
                </div>
            </div>
            <div class="apply-rg">
                <div class="unit">
                    <span class="label">商家：</span>
                    <span class="ctn" >{{reverseApply.shopName}}</span>
                </div>
                <div class="unit">
                    <span class="label">商家调整类型：</span>
                    <span class="ctn">扣款</span>
                </div>
            </div>
        </div>
        <dl>
            <dt>退款单处理记录</dt>
            <dd>
                <el-table :data="refundLogList">
                  <el-table-column prop="operator" label="操作人">
                  </el-table-column>
                  <el-table-column prop="createTime" label="操作时间">
                  </el-table-column>
                  <el-table-column prop="context" label="操作">
                  </el-table-column>
                </el-table>
            </dd>
        </dl>
        <dl>
            <dt>退款明细记录</dt>
            <dd>
                <el-table :data="refundRecord">
                  <el-table-column prop="activityName" label="活动名称">
                  </el-table-column>
                  <el-table-column prop="totalPayAmount" label="报名费">
                  </el-table-column>
                  <el-table-column prop="totalRealPayAmount" label="实付金额">
                  </el-table-column>
                </el-table>
            </dd>
        </dl>
    </div>
</template>
<script>

    export default {
        props:['id','currentPage'],
        data(){
            return {
                refund:{},
                reverseApply:{},
                refundLogList:[],
                refundRecord:[],
            }
        },
        methods:{
            confirmRefund(){

            },
                 
        },
        mounted(){
            let url= this.$apiUrl.getRefundDetailUrl;
            var param=Object.assign({},{
                refundId:this.id
            });
            this.$ajax.get(url,param).then(res=>{
                if(res.error==0){

                    this.refund = res.data.refund
                    this.reverseApply = Object.assign({},res.data.reverseApply)
                    this.refundLogList =[].concat(res.data.refundLogList) 
                    this.refundRecord = [].concat(res.data.refundRecord)
                    console.log(this.refund,222)
                }
            })
        }
    }
</script>
<style scoped lang="scss">
.down{
    border-top:1px solid #dfe6ec;
    width:100%;
    padding:20px 30px;
    box-sizing:border-box;
    .apply{
        font-size:14px;
        overflow:hidden;
        .apply-lf{
            float:left;
            width:50%;
            padding-left:40px;
            box-sizing:border-box;
            .unit{
                margin-left:10px;
                overflow:hidden;
                .label{
                    float:left;
                    width:70px;
                    height:36px;
                    line-height:36px;
                    text-align:right
                }
                .ctn{
                    float:left;
                    height:36px;
                    line-height:36px;
                    padding-left:10px;
                    img{
                        width:100px;
                        height:36px;
                        display:inline-block;
                        border:none
                    }
                }
            }
        }
        .apply-rg{
            float:left;
            width:50%;
            .unit{
                margin-left:10px;
                overflow:hidden;
                .label{
                    float:left;
                    width:100px;
                    height:36px;
                    line-height:36px;
                    text-align:right
                }
                .ctn{
                    float:left;
                    height:36px;
                    line-height:36px;
                    padding-left:10px;
                }
            }
        }
    }
    dl{
        width:100%;
        margin:0 0 10px;
        dt{
            height:40px;
            line-height:40px;
            font-size:16px;
            font-weight:bold
        }
        dd{
            width:100%;
            margin:0;
        }
    }
}
</style>