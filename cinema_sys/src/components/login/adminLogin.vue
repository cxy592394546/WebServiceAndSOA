<template>
  <body id="poster">
    <el-container>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login-container"
        label-position="left"
        label-width="0px"
      >
        <h3 class="login_title">登录</h3>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="账号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 100%;background: #505458;border: none"
            v-on:click="login"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </body>
</template>

<script>
export default {
  data() {
    return {
      //登录表单数据绑定
      loginForm: {
        username: "",
        password: "",
        imgUrl: "",
      },
      show: true,
      //表单的验证规则
      loginFormRules: {
        //    验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "用户名必须在3-20个字符之间",
            trigger: "blur",
          },
        ],
        //    验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 50,
            message: "密码必须在6-50个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //回车登录操作
  created() {
    //创建后挂载
    let _this = this;

    document.onkeydown = function(e) {
      let key = window.event.keyCode;

      if (key === 13) {
        _this.login(); //登录的方法
      }
    };
  },
  methods: {
    //登录异步操作
    login() {
      //校验登录表单是否合理
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;

        let msg = "";
        let status = 200;

        //发送登入请求

        //如果成功则全局存储登录信息
        if (status === 200) {
          window.sessionStorage.setItem("login", "true");
          window.sessionStorage.setItem("userType", "admin");
          window.sessionStorage.setItem("loginTime", new Date().getTime());
          window.sessionStorage.setItem("name", this.loginForm.username);
          await this.$router.push({ path: "/AdminPage" });
        } else {
          this.$message.info(msg);
        }
      });
    },
  },
};
</script>
<style scoped>
#poster {
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  color: rgba(255, 255, 255, 0.65);
  background-color: #24292e;
  /* background-image: url(../../assets/img/star-bg.svg),
        linear-gradient(#191c20, #24292e 15%); */
  background-repeat: repeat-x;
  background-position: center 0, 0 0, 0 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 150px auto;
  width: 300px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
}

.login_title {
  letter-spacing: 10px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
