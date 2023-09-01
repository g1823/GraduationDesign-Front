// 测试api封装请求
import request from '@/request'

export function addComment(comment) {
    return request({
        url: '/comment',
        method: 'post',
        data: {
            content: comment.content,
            picId: comment.picId,
            fatherId: comment.fatherId
        }
    })
}

export function getComments(picId) {
    return request({
        url: '/comment/list/' + picId,
        method: 'get',
    })
}