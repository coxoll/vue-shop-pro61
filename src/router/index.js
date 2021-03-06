import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/User'

Vue.use(Router)

var router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home, redirect: '/welcome', children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: User}
    ]}
  ]
})
// 路由导航守卫，检测token如果不存在，就跳转到login登录组件中去
router.beforeEach((to, from, next) => {
  // 判断访问是/login 就直接通过
  if (to.path === '/login') {
    return next()
  }
  // 访问非login，判断token
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next() // token存在，跳转
})

export default router
