<template>
  <el-container
      style="height: 1000px; border: 1px solid #eee;">
    <el-aside
        v-show="(!(path === '/') && !(path === '/Login'))"
        width="250px" style="background-color: rgb(238, 241, 246)">
      <el-menu background-color="#545c64" default-active="1" text-color="#fff" active-text-color="#ffd04b">

        <router-link style="text-decoration:none;" to="/home" >
          <el-menu-item index="1" >
            <i class="el-icon-s-home"></i>
            <span slot="title">主页</span>
          </el-menu-item>
        </router-link>

        <router-link style="text-decoration:none;" to="/updateCalendar" >
          <el-menu-item index="2" >
            <i class="el-icon-menu"></i>
            <span slot="title">校历上传</span>
          </el-menu-item>
        </router-link>

        <router-link style="text-decoration:none;" to="/Wall3DShowList">
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">讲座/活动</span>
          </el-menu-item>
        </router-link>

        <router-link   style="text-decoration:none;" to="/NewsManagement">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>

        </router-link>
      </el-menu>
    </el-aside>

        <router-view></router-view>
  </el-container>
</template>

<script>
import DemoApply from './pages/DemoApply'
import UpdateCalendar from './pages/UpdateCalendar'
import Home from './pages/House'
import Header from './pages/Header'
import ActualTimeOfApplyInfoDB from './pages/ActualTimeOfApplyInfoDB'
import Wall3DShowList from './pages/Wall3DShowList'
import Full3DWall from './pages/full3DWall(1)'
export default {
  name: "App",
  components: {DemoApply,UpdateCalendar,Home,Header,ActualTimeOfApplyInfoDB,Wall3DShowList,Full3DWall},
  data(){
    return{
      path:'',
      activeIndex: '1',
    }
  },
  mounted() {
    this.path = this.$route.path
    // this.$router.push({
    //   path: '/home'
    // })
  },
  watch:{
    $route(to,from){
      this.path = to.path;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    personAlert(){
      alert("test")
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
</style>