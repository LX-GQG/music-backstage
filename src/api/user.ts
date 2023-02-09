/*
 * @Author: LX_DUG
 * @Date: 2022-11-25 11:16:01
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-17 16:45:28
 * @Description: description
 */
import { request } from "./request";

export function getUser(data:any) {
    return request({
        url: '/api/user/list',
        method: 'post',
        data
    })
}

export function getUserId (data:number | String) {
  return request({
    url: '/api/user/selectId',
    method: 'post',
    data
  })
}

// 添加用户
export function addUser (data: any) {
    return request({
      url: '/api/user/add',
      method: 'post',
      data
    })
  }

// 修改用户
export function editUser (data: any) {
    return request({
      url: '/api/user/update',
      method: 'post',
      data
    })
  }

// 删除用户
export function removeUser (id: number) {
    return request({
      url: '/api/user/delete',
      method: 'post',
      params: {
        id
      }
    })
  }
  
  // 批量删除用户
  export function removeBatchUser (data: any) {
    return request({
      url: '/api/user/delete/batch',
      method: 'post',
      data
    })
  }
  