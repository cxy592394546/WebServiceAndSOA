<template>
  <div>
    <h3>richText</h3>
    <div id="demo1"></div>
    <button type="button" @click="getEditorData">获取当前内容</button>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      editorData: "",
    };
  },

  props: ["catchData"],

  mounted() {
    const editor = new wangEditor(`#demo1`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },

  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html();
      alert(data);
    },
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style></style>
