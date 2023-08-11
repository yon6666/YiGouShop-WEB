import request from '@/utils/request'
// 获取所有分类
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}

export const findTopCategory = (id) => {
    return request('/home/category/head', 'get')
}
