/*
 * @Author: LX_DUG
 * @Date: 2022-11-28 17:48:40
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-11-28 22:34:06
 * @Description: 全局权限管理
 */
import { ElMessage } from 'element-plus';
import router from './router';
// import store from './store';
import { getCurrentUser, getToken, removeCurrentUser, removeToken, setToken } from './utils/auth.js';

// 白名单
const whiteList = ['/login','/404'];

// 路由守卫
router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()

    if(hasToken) {
        if (to.path === '/login') {
            next({path: '/'})
        } else {
            // const userInfo = getCurrentUser()
            // console.log(userInfo)
            // 可以在这里获取用户的权限并生成访问的路由
            // const adminRole =  userInfo.find((item: { username: string; }) => {
            //     return item.username === 'ADMIN'
            // })
            // if(adminRole) {
            //     next()
            // } else {
            //     const removeUser = removeCurrentUser()
            //     const removeTokens =  removeToken()
            //     await removeTokens && removeUser
            //     ElMessage.error({
            //         message: '无访问权限'
            //     })
            //     next(`/login?redirect=${to.path}`)
            // }
            next()
        }
    } else {
        // 没有Token
        if(whiteList.indexOf(to.path) !== -1) {
            // 免登录白名单
            next()
        } else {
            // 全部重定向到登录页面
            next(`/login?redirect=${to.fullPath}`) 
        }
    }
})