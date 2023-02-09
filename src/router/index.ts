/*
 * @Author: LX_DUG
 * @Date: 2022-11-24 20:51:51
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-29 15:36:18
 * @Description: description
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const Index = () => import('@/views/Index.vue')

interface routerType {
  path: string,
  name: string,
  icon: string,
  component: any,
  meta: object,
  child: any
}

export const menuRouter = [
  {
    path: "/user",
    name: "User",
    icon: 'UserFilled',
    component: () => import("@/views/user/user.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    child:[
      
    ]
  },
  {
    path: "/carousel",
    name: "Carousel",
    icon: 'SwitchFilled',
    component: () => import("@/views/carousel/carousel.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    child:[
      
    ]
  },
  {
    path: "/musicSource",
    name: "MusicSource",
    icon: 'Headset',
    component: () => import("@/views/musicSource/musicSource.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    child:[
      
    ]
  },
  {
    path: "/songList",
    name: "songList",
    component: () => import("@/views/songList/songList.vue"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    hidden: true,
    child:[
      
    ]
  },
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '玥愔管理后台'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: "",
    name: "index",
    component: Index,
    children: menuRouter
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
