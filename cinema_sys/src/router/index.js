import Vue from 'vue'
import VueRouter from 'vue-router'

//顾客相关组件
import Home from '../views/Home.vue'
import movieMess from '../components/customer/movieMess.vue'
import movieDetail from '../components/customer/movieDetail.vue'
import customerIndex from '../components/customer/customerIndex.vue'
import favourites from '../components/customer/favourites.vue'

//注册、登陆相关组件
import Welcome from '../views/Welcome.vue'
import welcomeIndex from '../components/login/welcomeIndex.vue'
import login from '../components/login/login.vue'
import register from '../components/login/register.vue'

//个人信息界面
import PersonalPage from '../views/PersonalPage.vue'
import personalIndex from '../components/personalPage/personalIndex.vue'
import personalMess from '../components/personalPage/personalMess.vue'
import ticketMess from '../components/personalPage/ticketMess.vue'
import noticeList from '../components/personalPage/noticeList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/Welcome'
  },
  {
    path:'/Welcome',
    component:Welcome,
    redirect:'/welcomeIndex',
    children:[
      {path:'/welcomeIndex',component:welcomeIndex},
      {path:'/login',component:login},
      {path:'/register',component:register}
    ]
  },
  {
    path: '/Home',
    component: Home,
    redirect:'/customerIndex',
    children:[
      {path:'/customerIndex',component:customerIndex},
      {path:'/movieMess',component:movieMess,},
      {path:'/movieDetail',component:movieDetail},
      {path:'/favourites',component:favourites},
    ]
  },
  {
    path: '/PersonalPage',
    component: PersonalPage,
    redirect:'/personalIndex',
    children:[
      {path:'/personalIndex',component:personalIndex},
      {path:'/personalMess',component:personalMess},
      {path:'/ticketMess',component:ticketMess},
      {path:'/noticeList',component:noticeList}
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
