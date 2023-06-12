<template>
  <div>
    <h1>当前报名人数有：{{lenInfo}}</h1>
  </div>
</template>

<script>
// import cloudbase from "@cloudbase/js-sdk";
//
// const app = cloudbase.init({
//   env: "cloud1-5gjfc8jsdd6ea165"
// });
import dayjs from 'dayjs'
export default {
  name: "ActualTimeOfApplyInfoDB",
  data(){
    return{
      lenInfo:0
    }
  },
  methods:{
    getDataLen(){
      const db=this.$tcb.database()
      // const db = app.database();
      // const _ = db.command;
      // const collection = db.collection("calendar"); // collName 需填当前env下集合名称
      // // const auth = app.auth({
      // //   persistence: "local" //用户显式退出或更改密码之前的30天一直有效
      // // });
      // let ref = collection.watch({
      //   onChange: (snapshot) => {
      //     console.log("收到snapshot**********", snapshot);
      //   },
      //   onError: (error) => {
      //     console.log("收到error**********", error);
      //   }
      // });
      db.collection('calendar')
          .watch({
            onChange: snapshot => {
              console.log('docs\'s changed events', snapshot.docChanges)
            },
            onError: err => {
              console.error('the watch closed because of error', err)
            }
          })
    }
  },
  mounted() {
    this.getDataLen()
  }
}
</script>

<style scoped>

</style>