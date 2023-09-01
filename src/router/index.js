import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/homePage',
    name: 'homepage',
    component: () => import('@/views/home_page/homepage')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/search')
  },
  {
    path: '/notice',
    name: "Notice",
    component: () => import('@/views/notice/notice')
  },
  {
    path: '/shareAlbum',
    name: 'ShareAlbum',
    component: () => import("@/views/ShareAlbum/ShareAlbum.vue"),
    children: [
      {
        path: 'createAlbum',
        component: () => import('@/views/ShareAlbum/createAlbum.vue')
      }
    ]
  },
  {
    path: '/picManagement',
    name: 'picManagement',
    component: () => import('@/views/picture_management/picManagement')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register')
  },
  {
    path: '/userMessage',
    name: 'UserMessage',
    component: () => import('@/views/user/userMessage')
  },
  {
    path: '/classification',
    name: 'Classification',
    component: () => import('@/views/classification/classification')
  },
  {
    path: '/pictureDetail',
    name: 'PictureDetail',
    component: () => import('@/components/PictureDetail')
  },
  {
    path: '/friend',
    name: "Friend",
    component: () => import('@/views/user/friend.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
