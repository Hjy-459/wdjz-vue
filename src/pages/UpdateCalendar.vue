<template>
  <div style="display: flex;justify-content: center;background-color: white;height: 900px;left:20px">
        <div class="demo-image__preview" style="margin-right: 200px;width: 200px;height: 400px">
          <h3 style="display:flex;justify-content: center">当前校历图片</h3>
          <el-image
              :src="url"
              :fit="fit"
              style="display:flex;justify-content: center; width: 200px;height: 300px;background-color: #f6f9fc"
              :preview-src-list="srcList">
          </el-image>
        </div>
        <div style="width: 500px" >
          <h3 style="display:flex;justify-content: center;margin-left: -130px">请选择要更新的校历</h3>
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
<!--          <el-upload-->
<!--              action="#"-->
<!--              list-type="picture-card"-->
<!--              :auto-upload="false">-->
<!--            <i slot="default" class="el-icon-plus"></i>-->
<!--            <div slot="file" slot-scope="{file}">-->
<!--              <img-->
<!--                  class="el-upload-list__item-thumbnail"-->
<!--                  :src="file.url" alt=""-->
<!--              >-->
<!--              <span class="el-upload-list__item-actions">-->
<!--        <span-->
<!--            class="el-upload-list__item-preview"-->
<!--            @click="handlePictureCardPreview(file)"-->
<!--        >-->
<!--          <i class="el-icon-zoom-in"></i>-->
<!--        </span>-->
<!--        <span-->
<!--            v-if="!disabled"-->
<!--            class="el-upload-list__item-delete"-->
<!--            @click="handleRemoveImg(file)"-->
<!--        >-->
<!--          <i class="el-icon-delete"></i>-->
<!--        </span>-->
<!--      </span>-->
<!--            </div>-->
<!--          </el-upload>-->
<!--          <el-dialog :visible.sync="dialogVisible">-->
<!--            <img width="100%" :src="dialogImageUrl" alt="">-->
<!--          </el-dialog>-->

          <el-button style="margin-left: 10px;margin-top: 10px" size="middle" type="success" @click="submitUpload">确认上传</el-button>
        </div>
  </div>
</template>

<script>
export default {
  name: "UpdateCalendar",
  data(){
    return{
      calendar:[],
      url:'',
      srcList:[],
      fit:'contain',
      //new
      // dialogImageUrl: '',
      // dialogVisible: false,
      // disabled: false
    }
  },
  methods:{
    //获取当前校历图片
    getData(){
      const db=this.$tcb.database()
      db.collection("calendar").get().then(res=>{
        console.log(res.data)
        this.calendar=res.data
        this.$tcb.getTempFileURL({
          fileList: [res.data[0].url]
        })
        .then((res) => {
          res.fileList.forEach((el) => {
            if (el.code === "SUCCESS") {
              console.log("yyy",el.tempFileURL);
              this.url=el.tempFileURL
              this.srcList.push(this.url)

              // this.srcList[0]=this.url
              // this.srcList.push(this.url)
              console.log("picture:",this.srcList)
            } else {
              //获取下载链接失败
            }
          });
        });
      })
    },
    //删除上传的文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$tcb.deleteFile({
        fileList: ["cloud://cloud2-4gsel94f65018501.636c-cloud2-4gsel94f65018501-1308677406/demo-material/"+file.name]
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
      console.log('file',file)
      this.$tcb.downloadFile({
        fileID: "cloud://cloud2-4gsel94f65018501.636c-cloud2-4gsel94f65018501-1308677406/demo-material/"+file.name
      })
      .then((res) => {
        console.log(res)
      });
    },
    //处理文件上传
    uploadSectionFile(params){
      var file=params.file
      this.$tcb.uploadFile({
        cloudPath:file.name,
        filePath:file,
        onUploadProgress:progressEvent=>{
          const percentCompleted=Math.floor(
              (progressEvent.loaded*100)/progressEvent.total
          );
         params.onProgress({percent:percentCompleted})
        }
      }).then(res=>{
        console.log("res",res)
        var fileID=res.fileID
        const db=this.$tcb.database()
        var id=this.calendar[0]._id
        db.collection('calendar').doc(id)
          .update({
            url: fileID
          }).then(res=>{
            console.log('reer',res)
            this.$router.go(0)// 页面刷新
            this.srcList.push(fileID)
        })
      })

    },
    //
    onPreview() {
      this.$refs.preview.clickHandler()
    },

    submitUpload(){
      this.$refs.upload.submit()
    },
    //new
    // handleRemoveImg(file) {
    //   console.log(file);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
  },
  mounted(){
    this.getData()
  }
}
</script>

<style scoped>
.demo{
  display: flex;
  justify-content: center;
}
</style>