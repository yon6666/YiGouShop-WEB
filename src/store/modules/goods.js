import request from '@/utils/request'

export const findRelGoods = (id, limit = 16) => {
    return request('/goods/relevant', 'get', { id, limit })
  }

/**
 * 获取商品的specs和skus
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
