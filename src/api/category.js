// 测试api封装请求
import request from '@/request'

//查询请求1，之后可以写成登录请求、注册请求.....，即与登录注册相关的所有请求
export function getCategory(isGetAll) {
    return request({
        url: '/category',
        method: 'get',
        params: {
            isGetAll: isGetAll
        }
    })
}

export function creatCategory(category) {
    return request({
        url: '/category',
        method: 'post',
        data: {
            name: category.name,
            description: category.description
        }
    })
}

export function deleteCategory(id) {
    return request({
        url: "/category/delete",
        method: 'get',
        params: {
            categoryId: id
        }
    })
}