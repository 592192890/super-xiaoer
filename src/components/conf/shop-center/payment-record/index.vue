<template>
	<div>
		<break-crumb :titles="titles"></break-crumb>
		<section >
			<div class="mod-toolbar mod-header">
				<div class="start-time">
					<div class="label">操作时间</div>
				</div>
				<div class="select-time">
					<el-date-picker
				      v-model="value1"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions0">
				    </el-date-picker>
				</div>
				<div class="line">——</div>
				<div class="select-time">
					<el-date-picker
				      v-model="value2"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions1">
				    </el-date-picker>
				</div>
				<div class="search-btn">
					<el-button class="search" type="primary" @click="search">搜索</el-button>
				</div>
			</div>
		</section>
		<section class="ui-table payment">
			<el-table :data="formEntity" v-loading="listLoading" highlight-current-row ref="multipleTable" style="width: 100%;" @selection-change="handleSelectionChange">
				<el-table-column prop="shopName" label="店铺名称" show-overflow-tooltip> 
				</el-table-column>
				<el-table-column prop="techFee" label="技术服务年费" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="securityFee" label="保证金" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="total" label="总金额" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="type" label="类型" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="recordCreateTime" label="操作时间" >
				</el-table-column>
			</el-table>
			<!-- 工具条 -->
			<el-col :span="24" class="mod-toolbar">
				<el-pagination v-loading="listLoading" layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;" :current-page="currentPage">
				</el-pagination>
			</el-col>
		</section>
	</div>
	
</template>
<script scoped>
import breakCrumb from '@/components/common/breakCrumb';
import Util from '@/assets/js/util'
export default{
	components: {
        breakCrumb
    },
	data(){
		return {
			titles:[{id:1,name:'店铺中心'},{id:2,name:'交费记录'}],
			total:0,
			sels:[]	,
			formEntity:[],
			searchEntity:{},
			multipleSelection: [],
			pickerOptions0: {
	          /*disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }*/
	        },
	        pickerOptions1: {
	          /*disabledDate(time) {
	            return time.getTime() < Date.now() - 8.64e7;
	          }*/
	        },
	        value1: '',
	        value2: '',
	        currentPage: 1,
	        pageSize: 20,
	        listLoading: false
		}
	},

	methods:{
		search(options){
			let url= this.$apiUrl.getPaymentRecordUrl;
			var param={
				pageNum : options.currentPage || this.currentPage,
				pageSize : options.pageSize || this.pageSize,
				beginDate : Date.parse(this.value1)||"",
				endDate :  Date.parse(this.value2)+24*3600*1000 || ""
			}
			this.listLoading = true;
			this.$ajax.get(url, param).then(res=>{
				this.listLoading = false;
				if(res.error) return;
				if(res.data.list && res.data.list.length){
					res.data.list.forEach(val=>{
						val.recordCreateTime = Util.getLocalTime(val.recordCreateTime)
					})
				}
				this.formEntity=res.data.list;
				this.total=res.data.pageInfo && res.data.pageInfo.totalRow;
			})
		},

		handleSelectionChange(res){
			console.log(res,111)
		},

		handleCurrentChange(currentPage){
			this.currentPage = currentPage
			this.search({currentPage: currentPage})
		}
		
	},
	mounted(){
		this.search({});
	}
}
</script>
<style scoped lang="scss">
.mod-toolbar{
	background-color:#ffffff;
}
.mod-header{
	width: 100%;
	margin: 10px 0;
	border-radius: 5px;
	padding: 15px 0;
	overflow: hidden;
	.start-time{
		float: left;
		width: 120px;
	}
	.select-time{
		float: left;
		width: 180px;
	}
	.label{
		width: 100%;
		font-size:16px;
		height:40px;
		line-height:40px;
		text-align: center;
		background-color: #fff;
	}
	.line{
		float: left;
		text-align: center;
		width:70px;
		line-height:40px;
		color: #bfcbd9;
		font-weight: bold;
	}
	.el-date-editor.el-input{
		width: 100%
	}
	.search-btn{
		float: left;
		width:100px;
	}
}

.active{
	border-bottom: 3px solid #20a0ff;
}
.search{
	display: block;
	margin: 0 auto;
}
</style>

<style lang="scss">
.ui-table{
	&.payment{
		.el-table{
			.el-table__header-wrapper{
				th{
					.cell{
					    padding-left: 30px
					}
				}
			}
			.el-table__body-wrapper{
				tr{
					.cell{
					    padding-left: 30px
					}
				}
			}
		} 
	}
}
</style>