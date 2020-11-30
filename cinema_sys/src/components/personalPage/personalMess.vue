<template>
  <el-card class="box-card">
    <div class="block">
      <el-avatar shape="square" icon="el-icon-user-solid" :size="150"></el-avatar>
    </div>
    <div clas="text">用户名：{{ username }}</div>
    <div class="text item"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      username: window.sessionStorage.getItem("name"),
    };
  },

  mounted() {},
  methods: {
    //退出按钮
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/welcomeIndex");
    },
    handleCommand(command) {
      this.showDot = true;
    },
  },
};
</script>

<style>
.text {
  font-size: 24px;
}

.item {
  margin-bottom: 18px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
