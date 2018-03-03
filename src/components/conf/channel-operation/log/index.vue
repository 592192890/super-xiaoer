<template>
  <div class="channel-log">
    <break-crumb :titles="titles"></break-crumb>
    <section style="margin-top:20px">
      <el-row :span="24" class="mod-toolbar" :gutter="10">

        <el-col :span="2">
					<div class="label">开始时间</div>
				</el-col>
				<el-col :span="4">
					<el-date-picker
						style="width:100%" v-model="searchEntity.begainTime"
                type="date"
                placeholder="选择日期"
                :picker-options="startTimeOptions">
            </el-date-picker>
				</el-col>
        <el-col :span="2">
					<div class="label">结束时间</div>
				</el-col>
				<el-col :span="4">
					<el-date-picker style="width:100%"
              v-model="searchEntity.endTime"
              type="date"
              placeholder="选择日期" :picker-options="endTimeOptions">
          </el-date-picker>
				</el-col>

        <el-col :span="4">
          <el-button type="primary" @click="search(1)">搜索</el-button>
          <el-button type="primary" class="export-btn" @click="exportCSV">导出csv</el-button>
        </el-col>
      </el-row>
    </section>
    <section class="ui-table brand">
      <el-table :data="formEntity" highlight-current-row
                v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="id" label="事件时间" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="id" label="模块名称" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="id" label="供应商名称" show-overflow-tooltip>
				</el-table-column>
        <el-table-column prop="id" label="供应商账户" show-overflow-tooltip>
				</el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="mod-toolbar" v-loading="listLoading" >
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                       :total="total" style="float:right;" :current-page="currentPage">
        </el-pagination>
      </el-col>
    </section>
  </div>
</template>
<script>
import breakCrumb from '@/components/common/breakCrumb'
import Permission from '@/assets/js/permission-util.js'
export default {
  components: {
    breakCrumb
  },
  data(){
    let self = this;
    return {
      titles: [{id: 1, name: '口袋参谋管理'}, {id: 2, name: '口袋参谋管理日志'}],
      searchEntity:{
        begainTime:'',
        endTime:''
      },
      formEntity:[],
      total:0,
      pageSize:20,
      currentPage:1,
      listLoading:true,
      startTimeOptions:{
				disabledDate(time) {
					if(self.searchEntity.endTime){
						return (time.getTime() > self.searchEntity.endTime);
					}else{
						return false;
					}

				}
			},
			endTimeOptions:{
				disabledDate(time) {
					if(self.searchEntity.begainTime){
						return (time.getTime() < self.searchEntity.begainTime);
					}else{
						return false;
					}

				}

			},
      buttonArr:[]
    }
  },
  methods:{
    handleCurrentChange(){

    },
    exportCSV(){

    },
    search(){
      this.listLoading=false;
    }
  },
  mounted(){
    //获取哪一些按钮可以展示
		this.buttonArr=Permission.button(this.$route.path,this.$router.options.routes);

    this.search(1)
  }
}
</script>
<style scoped lang="scss">
  .mod-toolbar {
    background-color: #ffffff;
    margin-right:0px!important;
    margin-left:0px!important;
  }
  .channel-log{
    .label{
      height:40px;
      line-height:40px;
    }
    .export-btn{
      background-color:#33bbab
    }
  }
</style>
