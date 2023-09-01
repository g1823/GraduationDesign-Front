// 测试api封装请求
import request from '@/request'

export function addFriend(id) {
    return request({
        url: '/friend/add/' + id,
        method: 'get',

    })
}
export function getApply() {
    return request({
        url: '/friend/list/apply',
        method: 'get',
    })
}
export function receiveApply(id) {
    return request({
        url: '/friend/update/' + id,
        method: 'get',
    })
}
export function getFriends() {
    return request({
        url: '/friend/list',
        method: 'get',
    })
}
export function deleteFriends(id) {
    return request({
        url: '/friend/delete/' + id,
        method: 'get',
    })
}