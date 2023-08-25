import request from '@/utils/request'

export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
  }

  export const findHotGoods = (id, type, limit = 3) => {
    return request('/goods/hot', 'get', { id, type, limit })
  }

  export const findCommentInfoByGoods = (id) => {
 //   return request(`/goods/${id}/evaluate`)
   return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
  }
/**
 *
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @returns
 */
export const findGoodsCommentInfo = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
