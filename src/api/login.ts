import { request } from "./request";

// 返回res.data的interface
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
}

export function login(data:any) {
    return request({
        url: 'api/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data
    })
}