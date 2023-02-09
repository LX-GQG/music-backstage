/*
 * @Author: LX_DUG
 * @Date: 2023-01-29 17:03:06
 * @LastEditors: LX_DUG
 * @LastEditTime: 2023-01-29 17:04:44
 * @Description: description
 */
import { request } from "./request";

export function getSongList(data:any) {
    return request({
        url: '/api/song/list',
        method: 'post',
        data
    })
}

// 添加歌曲
export function addSong (data: any) {
    return request({
      url: '/api/song/add',
      method: 'post',
      data
    })
  }

// 修改歌曲
export function editSong (data: any) {
    return request({
      url: '/api/song/update',
      method: 'post',
      data
    })
  }

// 删除歌曲
export function removeSong (id: number) {
    return request({
      url: '/api/song/delete',
      method: 'post',
      params: {
        id
      }
    })
  }
  
  // 批量删除歌曲
  export function removeBatchSong (data: any) {
    return request({
      url: '/api/song/delete/batch',
      method: 'post',
      data
    })
  }
  