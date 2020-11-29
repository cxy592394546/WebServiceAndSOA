import Vue from 'vue'
import VueRouter from 'vue-router'

//顾客相关组件
import Home from '../views/Home.vue'
import customerIndex from '../components/customer/customerIndex.vue'
import favourites from '../components/customer/favourites.vue'
import movieDetail from '../components/customer/movieDetail.vue'
import movieMess from '../components/customer/movieMess.vue'
import searchList from '../components/customer/searchList.vue'

//注册、登陆相关组件
import Welcome from '../views/Welcome.vue'
import adminLogin from '../components/login/adminLogin.vue'
import customerLogin from '../components/login/customerLogin.vue'
import register from '../components/login/register.vue'
import welcomeIndex from '../components/login/welcomeIndex.vue'

//个人信息界面
import PersonalPage from '../views/PersonalPage.vue'
import noticeList from '../components/personalPage/noticeList.vue'
import personalIndex from '../components/personalPage/personalIndex.vue'
import personalMess from '../components/personalPage/personalMess.vue'
import ticketMess from '../components/personalPage/ticketMess.vue'

//管理员界面
import AdminPage from '../views/AdminPage.vue'
import addMovie from '../components/admin/addMovie.vue'
import adminIndex from '../components/admin/adminIndex.vue'
import adminMovieDetail from '../components/admin/adminMovieDetail.vue'
import movieManage from '../components/admin/movieManage.vue'
import searchMovie from '../components/admin/searchMovie.vue'

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
      {path:'/adminLogin',component:adminLogin},
      {path:'/customerLogin',component:customerLogin},
      {path:'/register',component:register},
      {path:'/welcomeIndex',component:welcomeIndex},
    ]
  },
  {
    path: '/Home',
    component: Home,
    redirect:'/customerIndex',
    children:[
      {path:'/customerIndex',component:customerIndex}, 
      {path:'/favourites',component:favourites},
      {path:'/movieDetail',component:movieDetail},
      {path:'/movieMess',component:movieMess,},
      {path:'/searchList',component:searchList}
    ]
  },
  {
    path: '/PersonalPage',
    component: PersonalPage,
    redirect:'/personalIndex',
    children:[
      {path:'/noticeList',component:noticeList},
      {path:'/personalIndex',component:personalIndex},
      {path:'/personalMess',component:personalMess},
      {path:'/ticketMess',component:ticketMess},
    ]
  },
  {
    path: '/AdminPage',
    component: AdminPage,
    redirect:'/adminIndex',
    children:[
      {path:'/addMovie',component:addMovie},
      {path:'/adminIndex',component:adminIndex},
      {path:'/adminMovieDetail',component:adminMovieDetail},
      {path:'/movieManage',component:movieManage},
      {path:'/searchMovie',component:searchMovie},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
