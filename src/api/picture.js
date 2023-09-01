// 测试api封装请求
import request from '@/request'

//查询所有公开的图片
export function getPublicPicturePage(page) {
    return request({
        url: '/pictures',
        method: 'get',
        params: {
            current: page.currentPage,
            size: page.pageSize
        }
    })
}

//查询某个分类的图片
export function getCategoryPics(id) {
    return request({
        url: '/pictures/getCategoryPics',
        method: 'get',
        params: {
            id: id
        }
    })
}

//更新图片的观看量
export function updateViewCount(id) {
    return request({
        url: '/pictures/updateView/' + id,
        method: 'get',

    })
}

export function getHotLike() {
    return request({
        url: '/pictures/hot',
        method: 'get',

    })
}

export function getHotComment() {
    return request({
        url: '/pictures/Comment',
        method: 'get',

    })
}

export function getHotView() {
    return request({
        url: '/pictures/view',
        method: 'get',

    })
}

export function queryPics(name) {
    return request({
        url: '/pictures/search/' + name,
        method: 'get',

    })
}

// //修改某个图片的信息
// export function updatePictureMsg(page){
//     return request({
//         url:'/pictures/update',
//         method:'get',
//         params:{
//             id:picId,
//             category:categoryId,
//             tag:
//         }
//     })
// }

