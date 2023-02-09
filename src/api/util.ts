/*
 * @Author: LX_DUG
 * @Date: 2022-12-28 17:59:35
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-28 17:59:35
 * @Description: description
 */

import { request } from "./request";

export function upload(data:any) {
    return request({
        url: '/api/upload',
        method: 'post',
        data
    })
}
