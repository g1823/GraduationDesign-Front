// 测试api封装请求
import request from '@/request'

//查询是否已经登录或者登录是否过期
export function isLogin(token) {
    return request({
        url: '/login',
        method: 'get',
        headers: {
            token: token
        }
    })
}

//用户登录
export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
            username: username,
            password: password
        }
    })
}

//用户注册
export function register(username, password, nickname) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            username,
            password,
            nickname
        }
    })
}

//获取用户个人信息
export function getUserDetail() {
    return request({
        url: '/user',
        method: 'get',
    })
}

//修改密码
export function updatePassword(passwordDto) {
    return request({
        url: '/user/changePassword',
        method: 'post',
        data: {
            newPassword: passwordDto.newPassword,
            oldPassword: passwordDto.oldPassword
        }
    })
}

//修改基础信息
export function updateUserMessage(userMes) {
    return request({
        url: '/user',
        method: 'post',
        data: {
            username: userMes.username,
            nickname: userMes.nickname,
            age: userMes.age,
            sex: userMes.sex,
            introduction: userMes.introduction
        }
    })
}


//查找好友
export function findFriend(finduser) {
    return request({
        url: '/user/list',
        method: 'post',
        data: {
            keyWord: finduser.keyWord,
            byUsername: finduser.byUsername
        }
    })
}

