import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import ('@/views/login')
  },
  {
    path: '/user/:id',
    component: () => import ('@/views/user')
  },
  {
    path: '/',
    component: () => import ('@/views/tab-bar'),
    children: [{
      path: 'home',
      component: () => import ('@/views/home')
    },
    {
      path: 'questionAndAnswer',
      component: () => import ('@/views/questionAndAnswer')
    },
    {
      path: 'video',
      component: () => import ('@/views/video')
    },
    {
      path: 'my',
      component: () => import ('@/views/my')
    }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
