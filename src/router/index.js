import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/home/:id',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      deepth:1,
      keepAlive: true //需要被缓存
    }
  },
  {
    path: '/articles/:id',
    name: 'ArticleContent',
    component: () => import('../components/ArticleContent.vue'),
    props: true,
    meta: {
      deepth:0.5,
      keepAlive: true //需要被缓存
  }
  },
  {
    path: '/articleList/:id',
    name: 'Articles',
    component: () => import('../views/article/Articles.vue'),
    meta: {
      deepth:2,
      keepAlive: true //需要被缓存
  }
  },
  {
    path: '/about/:id*',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  /* {
    path: '/nbadata/:id*',
    name: 'Nbadata',
    component: () => import('../views/NBAData.vue')
  }, */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
