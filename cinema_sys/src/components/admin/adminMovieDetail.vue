<template>
  <el-container>
    <el-main>
      <el-card shadow="never">
        <img :src="movieLogo" style="width: 25%;display: block;" />
        <div slot="header" class="clearfix">
          <span>{{ movieName }}</span>
        </div>
        <div clas="text">
          <span>上映时间：{{ releaseTime }}</span>
        </div>
        <!-- <div class="text item">{{ movieInfo }}</div> -->
        <div v-html="this.movieInfo">{{this.movieInfo}}</div>
        <el-button type="danger" @click="deleteMovie()">删除影片</el-button>
      </el-card>
    </el-main>
    <!-- <el-footer>
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>影片评论</span>
        </div>
      </el-card>
      <div>
        <div id="demo"></div>
        <el-button type="info" round @click="getEditorData">
          提交审核
        </el-button>
      </div>
    </el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      movieName: window.sessionStorage.getItem("movieName"),
      releaseTime: window.sessionStorage.getItem("releaseTime"),
      movieInfo: window.sessionStorage.getItem("movieInfo"),
      movieId: window.sessionStorage.getItem("movieId"),
      movieLogo: window.sessionStorage.getItem("movieLogo"),

      websites: "",
      // comments: "",
      likeFlag: false,
      date: "",
    };
  },

  props: ["catchData"],

  mounted() {
    // this.loadButton();
    // this.loadComment();
    this.getDate();
  },

  methods: {
    //退出按钮
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/welcomeIndex");
    },
    deleteMovie() {
      this.$axios
        .post("http://cinema.qingxu.website:8083/demo/deleteMovie?id="+
          this.movieId
        )
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    // loadComment() {
    //    this.$axios
    //     .get(
    //       "http://channel.qingxu.website:20086/demo/allComment"
    //     )
    //     .then((response) => (this.comments = response.data));
    // },
    handleCommand(command) {
      this.showDot = true;
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
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
</style>
