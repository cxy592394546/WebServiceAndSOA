<template>
  <el-card class="box-card">
    <img src="../../assets/img/logo.png" class="image" />
    <div slot="header" class="clearfix">
      <span>{{ movieName }}</span>
    </div>
    <div clas="text">
      <span>上映时间：{{ releaseTime }}</span>
    </div>
    <div class="text item">
      {{ movieInfo }}
    </div>
    <el-button type="success" round
      ><span @click="jumpTo()">从xxx购票</span></el-button
    >
    <el-button type="success" round>从xxx购票</el-button>
    <el-button type="success" round>从xxx购票</el-button>
    <el-button type="warning" round>收藏</el-button>
    <div class="home">
    <h3>richText</h3>
    <div id="demo1"></div>
    <button type="button" @click="getEditorData">获取当前内容</button>
  </div>
  </el-card>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      movieName: window.sessionStorage.getItem("movieName"),
      releaseTime: window.sessionStorage.getItem("releaseTime"),
      movieInfo: window.sessionStorage.getItem("movieInfo"),
      editor: null,
      editorData: "",
    };
  },

  props: ["catchData"],

  mounted() {
    const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.editorData = newHtml
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    //退出按钮
    logOut() {
      window.sessionStorage.clear();
      this.$router.push("/welcomeIndex");
    },
    jumpTo() {
      window.open("https://www.baidu.com/", "_blank");
    },
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    },
    handleCommand(command) {
      this.showDot = true;
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
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

.box-card {
  width: 480px;
}

</style>
