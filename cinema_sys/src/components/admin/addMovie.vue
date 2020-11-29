<template>
  <el-card>
    <p><b>添加影片</b></p>
    <el-input
      placeholder="请输入影片介绍"
      :autosize="{ minRows: 2, maxRows: 4 }"
      v-model="mInfo"
      clearable
    ></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input placeholder="请输入影片名称" v-model="mName" clearable></el-input>
    <div style="margin: 20px 0;"></div>
    <el-input placeholder="请输入上映时间" v-model="mTime" clearable></el-input>
    <div style="margin: 20px 0;"></div>
    <el-button type="success" @click="deleteMovie()">确认提交</el-button>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      mInfo: "",
      mName: "",
      mTime: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      setInterval(this.CurentTime, 1000);
    });
  },

  methods: {
    addMovie() {
      this.$axios
        .post(
          "http://cinema.qingxu.website:8083/demo/addNewMovie?movie_info=" +
            this.mInfo + "&movie_name=" + this.mName + "&movie_time=" + this.mTime
        )
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
  },
};
</script>

<style></style>
