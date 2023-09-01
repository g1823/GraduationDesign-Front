// 测试api封装请求
import request from '@/request'

export function addLikeComment(picId) {
    return request({
        url: '/like/' + picId,
        method: 'get',

    })
}