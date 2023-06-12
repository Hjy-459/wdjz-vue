<template>
  <h1>welcome</h1>
<!--  <div class="login-container">-->
<!--    <el-form ref="loginForm" :model="form" class="login-form">-->

<!--      <el-form-item prop="username">-->
<!--        <el-input v-model="form.PhoneNumber"-->
<!--                  placeholder="PhoneNumber"-->
<!--        ></el-input>-->

<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary"-->
<!--                   @click="login">Login-->
<!--        </el-button>-->
<!--      </el-form-item>-->

<!--    </el-form>-->
<!--  </div>-->
</template>

<script>
export default {
  data() {
    return {
      form: {
        PhoneNumber: '',
      },
    };
  },
  methods: {
    login() {
      // 在这里编写登录逻辑
      console.log('Login clicked');
      console.log('PhoneNumber:', this.form.PhoneNumber);
      let PhoneNumber=this.form.PhoneNumber;
      if(PhoneNumber=='17742050933'){
        this.$router.push({
          path:'/NewsManagement'
        })
      }
      else {
        this.$message({
          type: 'info',
          message: '您无权限'
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
