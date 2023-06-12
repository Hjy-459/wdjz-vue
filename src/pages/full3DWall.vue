<template>
  <div>
<!--    <a href="">收到：{{this.$route}}</a>-->
    <iframe src="/static/wall3D/签到墙2.html" ref="iframe" width="100%" height="900px" scrolling="no"></iframe>
  </div>
</template>
<script>
export default {
  name:"full3DWall",
  data: function () {
    return {
      newid:'',
      personArray:[],
      symbolList:[]
    }
  },
  mounted() {
    console.log(this.$route.query.showID);
    this.newid=this.$route.query.showID;
    // this.dataEdit();
    this.iframeWin = this.$refs.iframe.contentWindow;
    this.sendIframeWinpMessage()
  },
  methods:{
    sendIframeWinpMessage(){
      this.dataEdit()
    },
    dataEdit(){
      const db=this.$tcb.database()
      db.collection("demo-applyInfo").where({newid:this.newid}).get().then(res=>{
        console.log(res.data)
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
        var personArray=[]
        var symbolList=[]
        for(i=0;i<arr.length;i++){
          personArray[i]=arr[i].otherInfo.selfImg
          symbolList[i]=arr[i].otherInfo.name
        }
        console.log("personArray",personArray)
        console.log("symbolList",symbolList)
        this.personArray=personArray
        this.symbolList=symbolList
        this.iframeWin.postMessage({
          params: [this.personArray,this.symbolList] /*在iframe页面中接收通过key也就是param接收，因此传输的数据可以是对象，包含多个key以及对应的数据*/
        }, "*");
      })

    }
  }
}
</script>
<style lang="less" scoped>
</style>
