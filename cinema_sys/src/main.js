import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'

//导入ElementUI相关内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局样式表
import "./assets/css/global.css"

Vue.prototype.$ajax = axios
Vue.prototype.$qs=qs
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
