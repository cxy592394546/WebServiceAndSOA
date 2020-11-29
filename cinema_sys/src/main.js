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

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
