<template>
  <div class="login-container">
    <el-form
        class="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-position="top"
    >
      <el-form-item  prop="phone">
        <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item  prop="verify">
        <el-input v-model="loginForm.verify" placeholder="请输入验证码">
          <template slot="append">
            <el-button v-if="loginForm.showloginCode" type="primary" @click="getloginPhoneCode">获取验证码</el-button>
            <div v-else>{{ loginForm.count }}</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    // 验证手机号是否合法
    var checkMobile = (rules, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value) == true) {
        return callback();
      } else {
        callback(new Error("请输入合法的手机号"));
      }
    };
    // 验证输入的手机号验证码是否和存储的验证码相同
    var checkPhoneCode = (rules, value, callback) => {
      if (value == this.loginForm.contenttext) {
        return callback();
      } else {
        callback(new Error("验证码错误"));
      }
    };
    return {
      // 表单
      loginForm: {
        phone: "",
        timer: null,
        verify: '',
        showloginCode: true, //判断展示‘获取验证码’或‘倒计时’
        count: "", //倒计时时间
      },
      // 验证规则
      loginFormRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
        verificationCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { validator: checkPhoneCode, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取手机验证码
    getloginPhoneCode() {

      // 如果未输入手机号，结束执行
      if (this.loginForm.phone == "") {
        return;
      }
      console.log(this.loginForm.phone)
      this.$tcb.callFunction({
        name:'sendsms',
        data:{
          phone: this.loginForm.phone,
          templateId: 1296077
        },
      }).then(res =>{
        console.log(res);
        if(res.result.code==0){
          this.$message({
            type: 'info',
            message: '发送成功'
          })
          const TIME_COUNT = 60;
          if (!this.loginForm.timer) {
            this.loginForm.showloginCode = false;
            this.loginForm.count = TIME_COUNT;
            this.loginForm.timer = setInterval(() => {
              if (
                  this.loginForm.count > 0 &&
                  this.loginForm.count <= TIME_COUNT
              ) {
                this.loginForm.count -= 1;
              } else {
                this.loginForm.showloginCode = true;
                clearInterval(this.loginForm.timer);
                this.loginForm.timer = null;
              }
            }, 1000);
          }
        }
         else{
              return this.$message.error(res.result.msg);
        }
      })
    },
    // 开始登录
    login() {
      this.$tcb.callFunction({
        name:'checksms',
        data:{
          phone:this.loginForm.phone,
          verify:this.loginForm.verify,
        }
      }).then(res=>{
        console.log(res)
        if(res.result.code==0){
          const db = this.$tcb.database()
          db.collection('StudentContact2021').where({
            phone:this.loginForm.phone
          }).get().then(res=>{
            if(!res.data[0]){
              this.$message({
                type: 'info',
                message: '手机号未绑定用户'
              })
            }
            console.log(res)
            var auth=res.data[0].auth
            console.log(auth)
            if (auth=='3'){
              this.$router.push({
                path:'/home',
              })
            }
            else{
              this.$message({
                type: 'info',
                message: '权限不足'
              })
            }
          })
        }
        else{
          this.$message({
            type: 'info',
            message: '验证失败'
          });
        }
      })
    },
  },
};
</script>
<style scoped>
.loginForm {
  width: 300px;
  margin: 0 auto;
}
.btns {
  text-align: right;
}
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
