<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item index="1">数据库</el-menu-item>
    <el-menu-item index="2">云函数</el-menu-item>
    <el-menu-item index="3">云存储</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>

</style>