import request from '@/utils/request'

export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
