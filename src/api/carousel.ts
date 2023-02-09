/*
 * @Author: LX_DUG
 * @Date: 2022-12-01 09:29:22
 * @LastEditors: LX_DUG
 * @LastEditTime: 2022-12-01 09:34:13
 * @Description: description
 */
import { request } from "./request";

export function CarouselList(data:any) {
    return request({
        url: 'api/sildeshow/list',
        headers: {
            isToken: true
        },
        method: 'post',
        data
    })
}