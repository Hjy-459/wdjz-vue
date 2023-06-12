<template>
  <div style="display: flex;justify-content: center;background-color: white;height: 900px;left:20px">
    <div class="demo-image__preview" style="margin-right: 200px;width: 200px;height: 400px">
    </div>
    <div style="width: 500px" >
      <h3 class="centerDemo">新增新闻</h3>
      <div class="input-container">
        <el-input class="centerDemo" v-model="title" placeholder="请输入标题"></el-input>
        <el-input type="textarea" class="centerDemo" v-model="content" placeholder="请输入内容"></el-input>
      </div>
      <el-upload
          class="upload-demo"
          ref="upload"
          :drag="true"
          action="#"
          :auto-upload="false"
          :http-request="uploadSectionFile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          style="width: 130%"
      >
        <i class="el-icon-upload" ></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button style="margin-left: 150px;margin-top: 10px" size="middle" type="success" @click="submitUpload">确认上传</el-button>
    </div>
  </div>
</template>

<script>

import app from "@/App";

export default {
  name: "UpdateCalendar",
  data(){
    return{
      title:'',
      content:'',
      newsList:[],
    }
  },
  methods:{
    //删除上传的文件
    handleRemove(file, fileList) {
      console.log("remove",file, "remove2",fileList);
      this.$tcb.deleteFile({
        fileList: ["cloud://cloud2-4gsel94f65018501.636c-cloud2-4gsel94f65018501-1308677406/newsImage/"+file.name]
      }).then((res) => {
        res.fileList.forEach((el) => {
          if (el.code === "SUCCESS") {
            //删除成功
            console.log("yes")
          }
          else {
            console.log('failed')
          }
        });
      });
    },
    //预览上传文件
    handlePreview(file) {
      console.log("file",file)
      this.$tcb.downloadFile({
        fileID: "cloud://cloud2-4gsel94f65018501.636c-cloud2-4gsel94f65018501-1308677406/newsImage/"+file.name
      })
          .then((res) => {
            console.log(res)
          });
    },


    //处理文件上传
    uploadSectionFile(params){

      var file = params.file
      this.$tcb.uploadFile({
        cloudPath:"newsImage/"+file.name,
        filePath:file,
        onUploadProgress:progressEvent=>{
          const percentCompleted=Math.floor(
              (progressEvent.loaded*100)/progressEvent.total
          );
          params.onProgress({percent:percentCompleted})
        }
      }).then(res=>{
        console.log(res.fileID);
        this.newsList.push(res.fileID)
      })
    },
    //
    onPreview() {
      this.$refs.preview.clickHandler()
    },
    submitUpload(){
      this.$refs.upload.submit()
      // 上传云存储后
        const db=this.$tcb.database()
        var date = new Date()
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");
        var content = this.content;
        var title = this.title;
        var newsList = this.newsList;
        if(title&&content&&newsList){
          setTimeout(() => {
            db.collection('news')
                .add({
                  currentTime:year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+seconds,
                  content: content,
                  title: title,
                  likes: 0,
                  viewNum: 0,
                  publisher:"webadminer",
                  publisherHead:'https://thirdwx.qlogo.cn/mmopen/vi_32/viaCaONBNY6c2sMwGtsHhnTNd5Pfk1Strlp4PdO2kr9u04QmTNP1fStY4k0PnzHnBLlXdkLe9ib3ssFcrWxZLicCA/132',
                  imgUrl:newsList,
                }).then((res) => {
              console.log(res);
              this.$message({
                type: 'info',
                message: '上传成功'
              });
              location.reload()
            })
          }, 1000);
        }
        else{
          this.$message({
            type: 'info',
            message: '请完善新闻信息'
          });
        }
    }
  },
  mounted(){
    this.getData()
  }
}
</script>

<style scoped>
.centerDemo{
  margin-bottom: 20px; /* 调整输入框之间的垂直间距 */
  display:flex;
  justify-content: center;
  margin-left: -50px
}


</style>