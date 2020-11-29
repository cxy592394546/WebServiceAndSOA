<template>
  <el-container>
    <el-main>
      <el-card shadow="never">
        <img src="../../assets/img/logo.png" class="image" />
        <div slot="header" class="clearfix">
          <span>{{ movieName }}</span>
        </div>
        <div clas="text">
          <span>上映时间：{{ releaseTime }}</span>
        </div>
        <div class="text item">{{ movieInfo }}</div>
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
// import wangEditor from "wangeditor";
export default {
  data() {
    return {
      movieName: window.sessionStorage.getItem("movieName"),
      releaseTime: window.sessionStorage.getItem("releaseTime"),
      movieInfo: window.sessionStorage.getItem("movieInfo"),
      movieId: window.sessionStorage.getItem("movieId"),

      websites: "",
      // comments: "",
      likeFlag: false,
      date: "",
      // editor: null,
      // editorData: "",
    };
  },

  props: ["catchData"],

  mounted() {
    this.loadButton();
    // this.loadComment();
    this.getDate();

    // const editor = new wangEditor(`#demo`);
    // // 配置 onchange 回调函数，将数据同步到 vue 中
    // editor.config.onchange = (newHtml) => {
    //   this.editorData = newHtml;
    // };
    // // 创建编辑器
    // editor.create();
    // this.editor = editor;
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
    // getEditorData() {
    //   // 通过代码获取编辑器内容
    //   let data = this.editor.txt.html();
    //   alert(data);
    // },
    handleCommand(command) {
      this.showDot = true;
    },
  },

  // beforeDestroy() {
  //   // 调用销毁 API 对当前编辑器实例进行销毁
  //   this.editor.destroy();
  //   this.editor = null;
  // },
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
  width: 25%;
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
