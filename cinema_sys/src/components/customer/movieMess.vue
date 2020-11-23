<template>
  <el-row :gutter="20"  class="el-row" type="flex">
  <el-col :span="8" v-for="(o, index) in info.length" :key="o" :offset="index = 0">  
    <el-card :body-style="{ padding: '0px' }">
      <img src="../../assets/img/logo.png" class="image">
      <div style="padding: 14px;">
        <span>{{ info[o-1].name }}</span>
        <div class="bottom clearfix">
          <time class="time">上映时间：{{ info[o-1].time }}</time>
          <el-button type="text" class="button" @click.native="movieDetail(o)">查看详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  mounted() {
    this.loadData();
  },
  beforeDestroy() {},
  methods: {
    loadData() {
      this.$ajax
        .get(
          "http://cors-anywhere.herokuapp.com/http://cinema.qingxu.website:20086/demo/allMovies"
        )
        // this.$ajax.get('https://geoapi.qweather.com/v2/city/top?number=5&range=cn&key=e52a94e351194d439cc2d7a46095551b')
        .then((response) => (this.info = response.data.Movies));
    },
    movieDetail(o){
      window.sessionStorage.setItem("movieName", this.info[o-1].name);
      window.sessionStorage.setItem("releaseTime", this.info[o-1].time);
      window.sessionStorage.setItem("movieInfo", this.info[o-1].info);
      this.$router.push({path: "/movieDetail"});
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
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
      clear: both
  }
</style>
