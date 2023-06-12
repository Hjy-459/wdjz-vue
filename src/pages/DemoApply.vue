<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="ID"
          prop="_id"
      ></el-table-column>
      <el-table-column
          label="讲座/活动主题"
          prop="title"
      ></el-table-column>
      <el-table-column
          label="地点"
          prop="place"
      ></el-table-column>
      <el-table-column
          label="开始时间"
          prop="beginTime"
      ></el-table-column>
      <el-table-column
          label="报名人数"
          prop="people/maxPeople"
      ></el-table-column>
      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DemoApply",
  data(){
    return{
      tableData:[],

      search: '',
    }
  },
  methods:{
    //获取所有数据
    getAllData(){
      const db=this.$tcb.database()
      db.collection("demo-apply").get().then(res=>{
        console.log(res.data)
        this.tableData=res.data
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
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

