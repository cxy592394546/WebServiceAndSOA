import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.defaults.withCredentials=false
axios.defaults.crossDomain=true

//导入ElementUI相关内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局样式表
import "./assets/css/global.css"

// 富文本编辑器
import quillEditor from 'vue-quill-editor'
Vue.use(quillEditor)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
