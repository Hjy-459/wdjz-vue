<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">

      <el-table-column
          label="新闻"
          prop="title"
          width="150%"
      ></el-table-column>

      <el-table-column
          label="发布时间"
          prop="currentTime"
          width="160%"
      ></el-table-column>

      <el-table-column
          label="新闻详情"
          prop="content"
          width="300%">
        <template #default="{ row }">
          <div class="content-cell" v-tooltip.hover :content="row.content">
            {{ row.content.substring(0, 100) }}{{ row.content.length > 100 ? '...' : '' }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
          label="浏览人数"
          prop="viewNum"
          width="100%"
      ></el-table-column>

      <el-table-column width="180%"
                       align="right">
        <template slot="header" slot-scope="scope" >
          <el-button
              size="max"
              @click="handleEdit(scope.$index)">新增新闻</el-button>
        </template>
        <template slot-scope="scope" style="justify-content: center">
<!--          <el-button-->
<!--              size="max"-->
<!--              @click="enterDetailApplyInfo(scope.$index, scope.row)">编辑</el-button>-->
          <el-button
              size="max"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
export default {
  name: "NewsManagement",
  data(){
    return{
      tableData:[],
      tempID:'',
      search: '',
      index:'',
    }
  },
  methods:{
    expandContent(row) {
      this.expandedContent = row.content;
      // row.isExpanded = true;
    },
    handleDelete(index, row) {
      this.$confirm('删除后无法恢复，是否确定删除？', '提醒', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '放弃删除'
      })
          .then(() => {
            var tempID=this.tableData[index]._id
            console.log(tempID)
            const db=this.$tcb.database()
            db.collection('news').doc(tempID)
                .remove().then((res)=>{
              console.log(res)
            })
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            location.reload()
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                  ? '放弃删除'
                  : '删除失败'
            })
          });
    },
    //获取所有数据
    getAllData(){
      const db=this.$tcb.database()
      db.collection("news").orderBy('currentTime','desc').get().then(res=>{
        console.log(res.data)
        this.tableData=res.data
      })
    },
    handleEdit(index, row) {
      this.dialogFormVisible =true;
      console.log(index, row);
      this.$router.push({
        path:'/addNews',
      })
    },
  },
  mounted(){
    this.getAllData();
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

