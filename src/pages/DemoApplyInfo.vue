<template>
  <div>
      <button @click="enter3Dwall">点击生成签到墙</button>
<!--      <h4 style="position: center">id:{{this.$route.query.id}}</h4>-->
      <el-table
          :data="tableData"
          style="width: 100%">
        <!--      <el-table-column-->
        <!--          label="ID"-->
        <!--          prop="_id"-->
        <!--      ></el-table-column>-->
<!--        <el-table-column-->
<!--            type="index"-->
<!--            :index="indexMethod">-->
        <el-table-column
            label="学工号"
            prop="otherInfo._id"
        ></el-table-column>
        <el-table-column
            label="姓名"
            prop="otherInfo.name"
        ></el-table-column>
        <el-table-column
            label="身份"
            prop="otherInfo.role"
        ></el-table-column>
<!--        <el-table-column-->
<!--            align="right">-->
<!--          <template slot="header" slot-scope="scope">-->
<!--            <el-input-->
<!--                v-model="search"-->
<!--                size="mini"-->
<!--                placeholder="输入关键字搜索"/>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
<!--<router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: "DemoApplyInfo",
  data(){
    return{
      tableData:[],
      iframeWin: {},
      newid:''
    }
  },
  mounted() {
    console.log(this.$route.query.id)
    this.newid=this.$route.query.id
    this.getAllData();
    // this.dataEdit();
  },
  methods:{
    getAllData(){
      const db=this.$tcb.database()
      db.collection("demo-applyInfo").where({newid:this.newid}).get().then(res=>{
        console.log(res.data)
        // this.tableData=res.data
        var arr=res.data
        for(var i=0;i<arr.length;i++){
          if(arr[i].otherInfo==''){
            arr.splice(i,1);
          }
          else{
            if(arr[i].otherInfo.role=='1'){
              arr[i].otherInfo.role='本科生'
            }
            else if(arr[i].otherInfo.role=='1.5'){
              arr[i].otherInfo.role='研究生'
            }
            else if(arr[i].otherInfo.role=='2'){
              arr[i].otherInfo.role='教师'
            }
          }
        }
        console.log(arr)
        this.tableData=arr
        this.dataEdit()
      })
    },
    enter3Dwall(){
      // // ###
      // let pathInfo=this.$router.resolve({
      //   path:'/full3DWall',
      //   query:{
      //     showID:this.newid
      //   }
      // })
      // window.open(pathInfo.href,'_blank')

      // ###
      this.$router.push({
        path:'/full3DWall',
        query:{
          showID:this.newid
        }
      })

      // //第一种,一步到位
      // this.$store.dispatch('demoApplyInfo', this.$route).then(() => {
      //   let pathInfo=this.$router.resolve({
      //     path:'/full3DWall',
      //     query:{
      //       showID:this.newid
      //     }
      //   });
      //   window.open(pathInfo.href,'_blank')
      // });



    },
    dataEdit(){
      var personArray=[]
      var symbolList=[]
      for(var i=0;i<this.tableData.length;i++) {
        personArray[i] = this.tableData[i].peopleHead
        symbolList[i] = this.tableData[i].otherInfo.name
      }
    }
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