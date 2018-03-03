<template>
	<section class="ui-table tabone">
		<div class="mod-review mod-toolbar">
			<div class="start-time">
				<div class="label">审核起始时间</div>
			</div>
			<div class="select-time">
				<el-date-picker
					v-model="value1"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div class="line">——</div>
			<div class="select-time">
				<el-date-picker
					v-model="value2"
					align="right"
					type="date"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div class="search-btn">
				<el-button class="search" type="primary" @click="search">搜索</el-button>
			</div>
		</div>
		<el-table :data="model" v-loading="listLoading" highlight-current-row style="width: 100%;">
			<el-table-column prop="afterTechFee" label="最后一次保证金修改事件" show-overflow-tooltip>
			</el-table-column>

			<el-table-column prop="applyTime" label="修改时间" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="auditStatus" label="审核结果" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="auditTime" label="审核时间" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<!-- 工具条 -->
		<el-col :span="24" class="mod-toolbar">
			<el-pagination v-loading="listLoading" layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" :current-page="currentPage" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>
<script scoped>
import Util from '@/assets/js/util';
export default{
	props:['pageSize'],
	data(){
		return {
	        value1: '',
	        value2: '',
	        currentPage:1,
	        model: [],
	        total: 0,
	        listLoading: false
		}
	},
	methods:{
		search(){
			let opts = {};
			opts.beginDate = Date.parse(this.value1)
			opts.endDate = Date.parse(this.value2)+24*3600*1000
			this.getData(opts)
		},

		getData(opts){
			let url= this.$apiUrl.getFeeAuditLogUrl;
			var param={
				type : 1,
				pageNum : this.currentPage,
				pageSize : this.pageSize,
				beginDate : opts.beginDate || Date.parse(this.value1) || '',
				endDate : opts.endDate || Date.parse(this.value2)||''
			}
			this.listLoading = true
			this.$ajax.get(url, param).then(res=>{
				this.listLoading = false
				if(res.error) return;
				if(res.data.list && res.data.list.length){
					res.data.list.forEach(val=>{
						val.afterTechFee = val.applyId+"从"+val.beforeTechFee+"元修改为"+val.afterTechFee+"元";
						val.applyTime = Util.getLocalTime(val.applyTime)
						val.auditTime = Util.getLocalTime(val.auditTime)
						val.auditStatus = val.applyId+val.auditStatus;
					})
				}
				this.model=res.data.list;
				this.total =res.data.pageInfo && res.data.pageInfo.totalRow;
			})
		},

		handleCurrentChange(res){
			this.currentPage = res
			this.getData({})
		}	
		
	},
	mounted(){
		this.getData({});
	}
}
</script>

<style scoped lang="scss">
.mod-toolbar{
	background-color:#ffffff;
}

.label{
	width: 100%;
	font-size:16px;
	height:40px;
	line-height:40px;
	text-align: center;
	border-radius: 5px 5px 0 0;
	box-sizing: border-box;
	background-color: #e2e5e8;
	color: #666;
	cursor: pointer;
}


.mod-review{
	width: 100%;
	margin: 10px 0;
	overflow: hidden;
	box-sizing: border-box;
	.start-time{
		float: left;
		width: 136px;
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
	background-color: #fff;
	border-bottom: 3px solid #33bbab;
	color: #33bbab;
}


.search{
	display: block;
	margin: 0 auto;
}
</style>

<style lang="scss">
.ui-table{
	&.tabone{
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