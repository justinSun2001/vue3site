import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
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
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/article/Articles.vue'),
    meta: {
      deepth:2,
      keepAlive: true //需要被缓存
  }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router