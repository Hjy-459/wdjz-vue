<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="讲座/活动主题"
          prop="title"
          width="300%"
      ></el-table-column>
      <el-table-column
          label="地点"
          prop="place"
          width="300%"
      ></el-table-column>
      <el-table-column
          label="开始时间"
          prop="beginTime"
          width="200%"
      ></el-table-column>
      <el-table-column
          label="报名人数"
          prop="people"
          width="100%"
      ></el-table-column>
      <el-table-column width="180%"
          align="right">
        <template slot="header" slot-scope="scope" >
          <el-input
              v-model="search"
              size="max"
              :style="{ width: '160px' }"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope" style="justify-content: center">
<!--          <el-button-->
<!--              size="mini"-->
<!--              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
            <el-button
                size="max"
                @click="enterDetailApplyInfo(scope.$index, scope.row)">详情</el-button>
<!--          <a>-->
<!--            <el-button-->
<!--                size="mini"-->
<!--                type="danger"-->
<!--                @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--          </a>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Wall3DShowList",
  data(){
    return{
      tableData:[],
      tempID:'',
      search: '',
      index:''
    }
  },
  methods:{
    //获取所有数据
    getAllData(){
      const db=this.$tcb.database()
      db.collection("demo-apply").orderBy('beginTime','desc').get().then(res=>{
        console.log(res.data)
        this.tableData=res.data
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    enterDetailApplyInfo(index,row){
      console.log(index, row);
      // this.tempID=this.tableData[index]._id
      console.log(this.tableData[index]._id)
      var tempID=this.tableData[index]._id
      console.log(tempID)
      this.tempID=tempID
      this.$router.push({
        path:'/demoApplyInfo',
        query:{
          id:tempID
        }
      })
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

