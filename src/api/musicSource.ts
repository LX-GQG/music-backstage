/*
 * @Author: LX_DUG
 * @Date: 2022-12-28 14:22:49
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-28 14:24:17
 * @Description: description
 */
import { request } from "./request";

export function getMusicList(data:any) {
    return request({
        url: '/api/music/list',
        method: 'post',
        data
    })
}

// 添加用户
export function addMusic (data: any) {
    return request({
      url: '/api/music/add',
      method: 'post',
      data
    })
  }

// 修改用户
export function editMusic (data: any) {
    return request({
      url: '/api/music/update',
      method: 'post',
      data
    })
  }

// 删除用户
export function removeMusic (id: number) {
    return request({
      url: '/api/music/delete',
      method: 'post',
      params: {
        id
      }
    })
  }
  
  // 批量删除用户
  export function removeBatchMusic (data: any) {
    return request({
      url: '/api/music/delete/batch',
      method: 'post',
      data
    })
  }
  