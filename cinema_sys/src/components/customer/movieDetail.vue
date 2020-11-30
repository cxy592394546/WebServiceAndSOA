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
        <div class="text item">{{ movieInfo }}</div>
        <template v-if="detectButton0">
          <el-button type="success" round>
            <span @click="jumpToShiGuang()">
              从时光网购票
            </span>
          </el-button>
        </template>
        <template v-else>
          <el-button type="success" round disabled>
            <span @click="jumpToShiGuang()">
              从时光网购票
            </span>
          </el-button>
        </template>
        <template v-if="detectButton1">
          <el-button type="success" round>
            <span @click="jumpToJingDong()">
              从京东电影购票
            </span>
          </el-button>
        </template>
        <template v-else>
          <el-button type="success" round disabled>
            <span @click="jumpToJingDong()">
              从京东电影购票
            </span>
          </el-button>
        </template>
        <el-button type="warning" round>
          <span @click="likeMovie()">收藏</span>
        </el-button>
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
      movieLogo: window.sessionStorage.getItem("movieLogo"),

      websites: "",
      // comments: "",
      likeFlag: false,
      date: "",
    };
  },

  props: ["catchData"],

  computed: {
    detectButton0() {
      return this.websites.hasOwnProperty("时光网");
    },
    detectButton1() {
      return this.websites.hasOwnProperty("京东电影");
    },
  },

  mounted() {
    this.loadButton();
    // this.loadComment();
    this.getDate();
  },

  methods: {
    //退出按钮
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/welcomeIndex");
    },
    loadButton() {
      this.$axios
        .get(
          "http://channel.qingxu.website:8084/testGetApi?movieName=" +
            this.movieName
        )
        .then((response) => (this.websites = response.data));
    },
    jumpToShiGuang() {
      window.open(this.websites["时光网"].buyurl, "_blank");
    },
    jumpToJingDong() {
      window.open(this.websites["京东电影"].buyurl, "_blank");
    },
    likeMovie() {
      this.$axios
        // .post(
        //   "http://cinema.qingxu.website:20086/demo/addNewCMovie",
        //   { cmovie_name: this.movieName, cmovie_time: this.date }
        // )
        .post(
          "http://cinema.qingxu.website:8083/demo/addNewCMovie?cmovie_name="+
          this.movieName + "&cmovie_time=" + this.date
        )
        .then((response) => {
          alert(response.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    getDate() {
      var today = new Date();
      this.date = this.zeroPadding(today.getFullYear(), 4) + '-' + this.zeroPadding(today.getMonth() + 1, 2) + '-' + this.zeroPadding(today.getDate(), 2)
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
